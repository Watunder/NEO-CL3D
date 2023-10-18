const LUA = String.raw;
const JSON = String.raw;

const factory = Wasmoon.getFactory();
const engine = await factory.createEngine();

await factory.mountFile(`json.lua`,LUA`
--
-- json.lua
--
-- Copyright (c) 2020 rxi
--
-- Permission is hereby granted, free of charge, to any person obtaining a copy of
-- this software and associated documentation files (the "Software"), to deal in
-- the Software without restriction, including without limitation the rights to
-- use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
-- of the Software, and to permit persons to whom the Software is furnished to do
-- so, subject to the following conditions:
--
-- The above copyright notice and this permission notice shall be included in all
-- copies or substantial portions of the Software.
--
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
-- SOFTWARE.
--

local json = { _version = "0.1.2" }

-------------------------------------------------------------------------------
-- Encode
-------------------------------------------------------------------------------

local encode

local escape_char_map = {
  [ "\\" ] = "\\",
  [ "\"" ] = "\"",
  [ "\b" ] = "b",
  [ "\f" ] = "f",
  [ "\n" ] = "n",
  [ "\r" ] = "r",
  [ "\t" ] = "t",
}

local escape_char_map_inv = { [ "/" ] = "/" }
for k, v in pairs(escape_char_map) do
  escape_char_map_inv[v] = k
end


local function escape_char(c)
  return "\\" .. (escape_char_map[c] or string.format("u%04x", c:byte()))
end


local function encode_nil(val)
  return "null"
end


local function encode_table(val, stack)
  local res = {}
  stack = stack or {}

  -- Circular reference?
  if stack[val] then error("circular reference") end

  stack[val] = true

  if rawget(val, 1) ~= nil or next(val) == nil then
    -- Treat as array -- check keys are valid and it is not sparse
    local n = 0
    for k in pairs(val) do
      if type(k) ~= "number" then
        error("invalid table: mixed or invalid key types")
      end
      n = n + 1
    end
    if n ~= #val then
      error("invalid table: sparse array")
    end
    -- Encode
    for i, v in ipairs(val) do
      table.insert(res, encode(v, stack))
    end
    stack[val] = nil
    return "[" .. table.concat(res, ",") .. "]"

  else
    -- Treat as an object
    for k, v in pairs(val) do
      if type(k) ~= "string" then
        error("invalid table: mixed or invalid key types")
      end
      table.insert(res, encode(k, stack) .. ":" .. encode(v, stack))
    end
    stack[val] = nil
    return "{" .. table.concat(res, ",") .. "}"
  end
end


local function encode_string(val)
  return '"' .. val:gsub('[%z\1-\31\\"]', escape_char) .. '"'
end


local function encode_number(val)
  -- Check for NaN, -inf and inf
  if val ~= val or val <= -math.huge or val >= math.huge then
    error("unexpected number value '" .. tostring(val) .. "'")
  end
  return string.format("%.14g", val)
end


local type_func_map = {
  [ "nil"     ] = encode_nil,
  [ "table"   ] = encode_table,
  [ "string"  ] = encode_string,
  [ "number"  ] = encode_number,
  [ "boolean" ] = tostring,
}


encode = function(val, stack)
  local t = type(val)
  local f = type_func_map[t]
  if f then
    return f(val, stack)
  end
  error("unexpected type '" .. t .. "'")
end


function json.encode(val)
  return ( encode(val) )
end


-------------------------------------------------------------------------------
-- Decode
-------------------------------------------------------------------------------

local parse

local function create_set(...)
  local res = {}
  for i = 1, select("#", ...) do
    res[ select(i, ...) ] = true
  end
  return res
end

local space_chars   = create_set(" ", "\t", "\r", "\n")
local delim_chars   = create_set(" ", "\t", "\r", "\n", "]", "}", ",")
local escape_chars  = create_set("\\", "/", '"', "b", "f", "n", "r", "t", "u")
local literals      = create_set("true", "false", "null")

local literal_map = {
  [ "true"  ] = true,
  [ "false" ] = false,
  [ "null"  ] = nil,
}


local function next_char(str, idx, set, negate)
  for i = idx, #str do
    if set[str:sub(i, i)] ~= negate then
      return i
    end
  end
  return #str + 1
end


local function decode_error(str, idx, msg)
  local line_count = 1
  local col_count = 1
  for i = 1, idx - 1 do
    col_count = col_count + 1
    if str:sub(i, i) == "\n" then
      line_count = line_count + 1
      col_count = 1
    end
  end
  error( string.format("%s at line %d col %d", msg, line_count, col_count) )
end


local function codepoint_to_utf8(n)
  -- http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=iws-appendixa
  local f = math.floor
  if n <= 0x7f then
    return string.char(n)
  elseif n <= 0x7ff then
    return string.char(f(n / 64) + 192, n % 64 + 128)
  elseif n <= 0xffff then
    return string.char(f(n / 4096) + 224, f(n % 4096 / 64) + 128, n % 64 + 128)
  elseif n <= 0x10ffff then
    return string.char(f(n / 262144) + 240, f(n % 262144 / 4096) + 128,
                       f(n % 4096 / 64) + 128, n % 64 + 128)
  end
  error( string.format("invalid unicode codepoint '%x'", n) )
end


local function parse_unicode_escape(s)
  local n1 = tonumber( s:sub(1, 4),  16 )
  local n2 = tonumber( s:sub(7, 10), 16 )
   -- Surrogate pair?
  if n2 then
    return codepoint_to_utf8((n1 - 0xd800) * 0x400 + (n2 - 0xdc00) + 0x10000)
  else
    return codepoint_to_utf8(n1)
  end
end


local function parse_string(str, i)
  local res = ""
  local j = i + 1
  local k = j

  while j <= #str do
    local x = str:byte(j)

    if x < 32 then
      decode_error(str, j, "control character in string")

    elseif x == 92 then -- '\': Escape
      res = res .. str:sub(k, j - 1)
      j = j + 1
      local c = str:sub(j, j)
      if c == "u" then
        local hex = str:match("^[dD][89aAbB]%x%x\\u%x%x%x%x", j + 1)
                 or str:match("^%x%x%x%x", j + 1)
                 or decode_error(str, j - 1, "invalid unicode escape in string")
        res = res .. parse_unicode_escape(hex)
        j = j + #hex
      else
        if not escape_chars[c] then
          decode_error(str, j - 1, "invalid escape char '" .. c .. "' in string")
        end
        res = res .. escape_char_map_inv[c]
      end
      k = j + 1

    elseif x == 34 then -- '"': End of string
      res = res .. str:sub(k, j - 1)
      return res, j + 1
    end

    j = j + 1
  end

  decode_error(str, i, "expected closing quote for string")
end


local function parse_number(str, i)
  local x = next_char(str, i, delim_chars)
  local s = str:sub(i, x - 1)
  local n = tonumber(s)
  if not n then
    decode_error(str, i, "invalid number '" .. s .. "'")
  end
  return n, x
end


local function parse_literal(str, i)
  local x = next_char(str, i, delim_chars)
  local word = str:sub(i, x - 1)
  if not literals[word] then
    decode_error(str, i, "invalid literal '" .. word .. "'")
  end
  return literal_map[word], x
end


local function parse_array(str, i)
  local res = {}
  local n = 1
  i = i + 1
  while 1 do
    local x
    i = next_char(str, i, space_chars, true)
    -- Empty / end of array?
    if str:sub(i, i) == "]" then
      i = i + 1
      break
    end
    -- Read token
    x, i = parse(str, i)
    res[n] = x
    n = n + 1
    -- Next token
    i = next_char(str, i, space_chars, true)
    local chr = str:sub(i, i)
    i = i + 1
    if chr == "]" then break end
    if chr ~= "," then decode_error(str, i, "expected ']' or ','") end
  end
  return res, i
end


local function parse_object(str, i)
  local res = {}
  i = i + 1
  while 1 do
    local key, val
    i = next_char(str, i, space_chars, true)
    -- Empty / end of object?
    if str:sub(i, i) == "}" then
      i = i + 1
      break
    end
    -- Read key
    if str:sub(i, i) ~= '"' then
      decode_error(str, i, "expected string for key")
    end
    key, i = parse(str, i)
    -- Read ':' delimiter
    i = next_char(str, i, space_chars, true)
    if str:sub(i, i) ~= ":" then
      decode_error(str, i, "expected ':' after key")
    end
    i = next_char(str, i + 1, space_chars, true)
    -- Read value
    val, i = parse(str, i)
    -- Set
    res[key] = val
    -- Next token
    i = next_char(str, i, space_chars, true)
    local chr = str:sub(i, i)
    i = i + 1
    if chr == "}" then break end
    if chr ~= "," then decode_error(str, i, "expected '}' or ','") end
  end
  return res, i
end


local char_func_map = {
  [ '"' ] = parse_string,
  [ "0" ] = parse_number,
  [ "1" ] = parse_number,
  [ "2" ] = parse_number,
  [ "3" ] = parse_number,
  [ "4" ] = parse_number,
  [ "5" ] = parse_number,
  [ "6" ] = parse_number,
  [ "7" ] = parse_number,
  [ "8" ] = parse_number,
  [ "9" ] = parse_number,
  [ "-" ] = parse_number,
  [ "t" ] = parse_literal,
  [ "f" ] = parse_literal,
  [ "n" ] = parse_literal,
  [ "[" ] = parse_array,
  [ "{" ] = parse_object,
}


parse = function(str, idx)
  local chr = str:sub(idx, idx)
  local f = char_func_map[chr]
  if f then
    return f(str, idx)
  end
  decode_error(str, idx, "unexpected character '" .. chr .. "'")
end


function json.decode(str)
  if type(str) ~= "string" then
    error("expected argument of type string, got " .. type(str))
  end
  local res, idx = parse(str, next_char(str, 1, space_chars, true))
  idx = next_char(str, idx, space_chars, true)
  if idx <= #str then
    decode_error(str, idx, "trailing garbage")
  end
  return res
end


return json
`);

await factory.mountFile(`behavior3/behavior_node.lua`,LUA`
local bret = require 'behavior3.behavior_ret'
local process = require 'behavior3.sample_process'

local sformat = string.format
local table = table
local print = print

local mt = {}
mt.__index = mt

local function new_node(...)
    local obj = setmetatable({}, mt)
    obj:init(...)
    return obj
end

function mt:init(node_data, tree)
    self.tree = tree
    self.name = node_data.name
    self.id = node_data.id
    self.info = sformat('node %s.%s %s', tree.name, self.id, self.name)

    self.data = node_data
    self.args = self.data.args or {}
    self.children = {}
    for _, child_data in ipairs(node_data.children or {}) do
        local child = new_node(child_data, tree)
        table.insert(self.children, child)
    end
end

function mt:run(env)
    --print("start", self.name, self.node_id)
    if env:get_inner_var(self, "YIELD") == nil then
        env:push_stack(self)
    end
    local vars = {}
    for i, var_name in ipairs(self.data.input or {}) do
        vars[i] = env:get_var(var_name)
    end
    local func = assert(process[self.name].run, self.name)
    if self.data.input then
        vars = table.pack(func(self, env, table.unpack(vars, 1, #self.data.input)))
    else
        vars = table.pack(func(self, env, table.unpack(vars)))
    end
    local ret = vars[1]
    assert(ret, self.info)
    if ret ~= bret.RUNNING then
        env:set_inner_var(self, "YIELD", nil)
        env:pop_stack()
    end
    for i, var_name in ipairs(self.data.output or {}) do
        env:set_var(var_name, vars[i + 1])
    end
    env.last_ret = ret
    --print("fini", self.name, self.node_id, table.unpack(vars, 1, #self.data.input))

    if self.data.debug then
        local var_str = ''
        for k, v in pairs(env.vars) do
            var_str = sformat("[%s]=%s,", k, v)
        end
        print(sformat("[DEBUG] btree:%s, node:%s, ret:%s vars:{%s}",
        self.tree.name, self.id, ret, var_str))
    end
    return ret
end

function mt:yield(env, arg)
    env:set_inner_var(self, "YIELD", arg or true)
    return bret.RUNNING
end

function mt:resume(env)
    return env:get_inner_var(self, "YIELD"), env.last_ret
end

local M = {}
function M.new(...)
    return new_node(...)
end
function M.process(custom)
    process = custom
end
return M
`);

await factory.mountFile(`behavior3/behavior_ret.lua`,LUA`
return {
    FAIL    = "FAIL",     -- 失败
    SUCCESS = "SUCCESS",  -- 成功
    RUNNING = "RUNNING",  -- 正在运行
}
`);

await factory.mountFile(`behavior3/behavior_tree.lua`,LUA`
local behavior_node = require 'behavior3.behavior_node'
local behavior_ret = require 'behavior3.behavior_ret'
local json = require 'json'

local meta = {
    __newindex = function(_, k)
        error(string.format('readonly:%s', k), 2)
    end
}
local function const(t)
    setmetatable(t, meta)
    for _, v in pairs(t) do
        if type(v) == 'table' then
            const(v)
        end
    end
    return t
end

local trees = {}

local mt = {}
mt.__index = mt
function mt:init(name, tree_data)

    self.name = name
    self.tick = 0
    local data = const(tree_data)
    self.root = behavior_node.new(data.root, self)
end

function mt:run(env)
    -- print(string.format('===== tree:%s, tick:%s, stack:%d =====', self.name, self.tick, #env.stack))
    if #env.stack > 0 then
        local last_node = env.stack[#env.stack]
        while last_node do
            local ret = last_node:run(env)
            if ret == behavior_ret.RUNNING then
                break
            end
            last_node = env.stack[#env.stack]
        end
    else
        self.root:run(env)
    end
    self.tick = self.tick + 1
end

function mt:interrupt(env)
    if #env.stack > 0 then
        env.inner_vars = {}
        env.stack = {}
    end
end

local function new_tree(name, tree_data)
    local tree = setmetatable({}, mt)
    tree:init(name, tree_data)
    trees[name] = tree
    return tree
end

local function new_env(params)
    local env = {
        inner_vars = {}, -- [k.."_"..node.id] => vars
        vars = {},
        stack = {},
        last_ret = nil
    }
    for k, v in pairs(params) do
        env[k] = v
    end

    function env:get_var(k)
        return env.vars[k]
    end
    function env:set_var(k, v)
        self.vars[k] = v
    end
    function env:get_inner_var(node, k)
        return self.inner_vars[k .. '_' .. node.id]
    end
    function env:set_inner_var(node, k, v)
        self.inner_vars[k .. '_' .. node.id] = v
    end
    function env:push_stack(node)
        self.stack[#self.stack + 1] = node
    end
    function env:pop_stack()
        local node = self.stack[#self.stack]
        self.stack[#self.stack] = nil
        return node
    end
    return env
end

local M = {}
function M.new(name, tree_data, env_params)
    local env = new_env(env_params)
    local tree = trees[name] or new_tree(name, tree_data)
    return {
        tree = tree,
        run = function()
            tree:run(env)
        end,
        interrupt = function()
            tree:interrupt(env)
        end,
        is_running = function ()
            return #env.stack > 0
        end,
        set_env = function (_, k, v)
            env[k] = v
        end
    }
end
return M
`);

await factory.mountFile(`behavior3/sample_process.lua`,LUA`
return {
    -- 复合节点
    Parallel = require "behavior3.nodes.composites.parallel",
    Selector = require "behavior3.nodes.composites.selector",
    Sequence = require "behavior3.nodes.composites.sequence",
  
    -- 装饰节点
    Not           = require "behavior3.nodes.decorators.not",
    AlwaysFail    = require "behavior3.nodes.decorators.always_fail",
    AlwaysSuccess = require "behavior3.nodes.decorators.always_success",
  
    -- 条件节点
    Cmp = require "behavior3.nodes.conditions.cmp",
  
    -- 行为节点
    Log  = require "behavior3.nodes.actions.log",
    Wait = require "behavior3.nodes.actions.wait",
  }
`);

await factory.mountFile(`behavior3/nodes/actions/log.lua`,LUA`
-- Log
--

local bret = require "behavior3.behavior_ret"

local M = {
    name = "Log",
    type = "Action",
    desc = "打印日志",
    args = {
        {"str", "string", "日志"}
    },
}

function M.run(node, env)
    print(node.args.str)
    return bret.SUCCESS
end

return M

`);

await factory.mountFile(`behavior3/nodes/actions/wait.lua`,LUA`
-- Wait
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'Wait',
    type = 'Action',
    desc = '等待',
    args = {
        {'time', 'int', '时间/tick'}
    }
}

local abs = math.abs
local SPEED = 50

function M.run(node, env)
    local args = node.args
    local t = node:resume(env)
    if t then
        if env.ctx.time >= t then
            print('CONTINUE')
            return bret.SUCCESS
        else
            print('WAITING')
            return bret.RUNNING
        end
    end
    print('Wait', args.time)
    return node:yield(env, env.ctx.time + args.time)
end

return M
`);

await factory.mountFile(`behavior3/nodes/composites/foreach.lua`,LUA`
local bret = require "behavior3.behavior_ret"

local M = {
    name = "ForEach",
    type = 'Composite',
    desc = "遍历数组",
    input = { "[{数组}]" },
    output = { "{变量}" },
    doc = [[
        + 每次执行子节点前会设置当前遍历到的变量
        + 会执行所有子节点
        + 永远返回成功/正在运行
    ]]
}

function M.run(node, env, arr)
    local resume_data, resume_ret = node:resume(env)
    local last_i = 1
    local last_j = 1
    if resume_data then
        last_i = resume_data[1]
        last_j = resume_data[2]
        if resume_ret == bret.RUNNING then
            return
        else
            last_j = last_j + 1
            if last_j > #node.children then
                last_j = 1
                last_i = last_i + 1
            end
        end
    end

    for i = last_i, #arr do
        local var = arr[i]
        env:set_var(node.data.output[1], var)
        for j = last_j, #node.children do
            local child = node.children[j]
            local r = child:run(env)
            if r == bret.RUNNING then
                return node:yield(env, { i, j })
            end
        end
    end
    return bret.SUCCESS
end

return M
`);

await factory.mountFile(`behavior3/nodes/composites/ifelse.lua`,LUA`
-- IfElse
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'IfElse',
    type = 'Composite',
    desc = 'If判断',
    doc = [[
        + 拥有三个子节点(至少两个)
        + 当第一个子节点返回SUCCESS的时候执行第二个子节点并返回此子节点的返回值
        + 否则执行第三个子节点并返回这个节点的返回值,若无第三个子节点,则返回FAIL
    ]]
}

local function child_ret(node, env, idx)
    local r = node.children[idx]:run(env)
    return r == bret.RUNNING and node:yield(env, idx) or r
end

local function ifelse(node, env, ret)
    if ret == bret.RUNNING then
        return ret
    end
    if ret == bret.SUCCESS then
        return child_ret(node, env, 2)
    elseif node.children[3] then
        return child_ret(node, env, 3)
    end
end

function M.run(node, env)
    assert(#node.children >= 2, "at least two children")

    local last_idx, last_ret = node:resume(env)
    if last_ret == bret.RUNNING then
        return last_ret
    end
    if last_idx == 1 then
        return ifelse(node, env, last_ret)
    elseif last_idx == 2 or last_idx == 3 then
        return last_ret
    end

    local r = node.children[1]:run(env)
    if r == bret.RUNNING then
        return node:yield(env)
    end
    return ifelse(node, env, r)
end

return M
`);

await factory.mountFile(`behavior3/nodes/composites/loop.lua`,LUA`
local bret = require "behavior3.behavior_ret"

local M = {
    name = "Loop",
    type = 'Composite',
    desc = "循环执行",
    args = {
        {"count", "int?", "次数"},
    },
    input = {"次数(int)?"},
}

function M.run(node, env, count)
    count = count or node.args.count
    local resume_data, resume_ret = node:resume(env)
    local last_i = 1
    local last_j = 1
    if resume_data then
        last_i = resume_data[1]
        last_j = resume_data[2]
        if resume_ret == bret.RUNNING then
            return
        else
            last_j = last_j + 1
            if last_j > #node.children then
                last_j = 1
                last_i = last_i + 1
            end
        end
    end

    for i = last_i, count do
        for j = last_j, #node.children do
            local child = node.children[j]
            local r = child:run(env)
            if r == bret.RUNNING then
                return node:yield(env, { i, j })
            end
        end
    end
    return bret.SUCCESS
end

return M`);

await factory.mountFile(`behavior3/nodes/composites/parallel.lua`,LUA`
-- Parallel
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'Parallel',
    type = 'Composite',
    desc = '并行执行',
    doc = [[
        执行所有子节点并返回成功
    ]]
}
function M.run(node, env)
    local last_idx, last_ret = node:resume(env)
    if last_idx then
        if last_ret == bret.RUNNING then
            return last_ret
        end
        last_idx = last_idx + 1
    else
        last_idx = 1
    end

    for i = last_idx, #node.children do
        local child = node.children[i]
        local r = child:run(env)
        if r == bret.RUNNING then
            return node:yield(env, i)
        end
    end
    return bret.SUCCESS
end

return M
`);

await factory.mountFile(`behavior3/nodes/composites/selector.lua`,LUA`
-- Selector
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'Selector',
    type = 'Composite',
    desc = '选择执行',
    doc = [[
        + 一直往下执行，有子节点返回成功则返回成功，若全部节点返回失败则返回失败
        + 子节点是或的关系
    ]]
}
function M.run(node, env)
    local last_idx, last_ret = node:resume(env)
    if last_idx then
        if last_ret == bret.SUCCESS or last_ret == bret.RUNNING then
            return last_ret
        elseif last_ret == bret.FAIL then
            last_idx = last_idx + 1
        else
            error('wrong ret')
        end
    else
        last_idx = 1
    end

    for i = last_idx, #node.children do
        local child = node.children[i]
        local r = child:run(env)
        if r == bret.RUNNING then
            return node:yield(env, i)
        end
        if r == bret.SUCCESS then
            return r
        end
    end
    return bret.FAIL
end

return M
`);

await factory.mountFile(`behavior3/nodes/composites/sequence.lua`,LUA`
-- Sequence
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'Sequence',
    type = 'Composite',
    desc = '顺序执行',
    doc = [[
        + 一直往下执行，有子节点返回成功则返回成功，若全部节点返回失败则返回失败
        + 子节点是或的关系
    ]]
}

function M.run(node, env)
    local last_idx, last_ret = node:resume(env)
    if last_idx then
        -- print("last", last_idx, last_ret)
        if last_ret == bret.FAIL or last_ret == bret.RUNNING then
            return last_ret
        elseif last_ret == bret.SUCCESS then
            last_idx = last_idx + 1
        else
            error('wrong ret')
        end
    else
        last_idx = 1
    end

    for i = last_idx, #node.children do
        local child = node.children[i]
        local r = child:run(env)
        if r == bret.RUNNING then
            return node:yield(env, i)
        end
        if r == bret.FAIL then
            return r
        end
    end
    return bret.SUCCESS
end

return M
`);

await factory.mountFile(`behavior3/nodes/conditions/cmp.lua`,LUA`
-- Cmp

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'Cmp',
    type = 'Condition',
    desc = '比较值大小',
    args = {
        {'value', 'lua?', '值'},
        {'gt', 'int?', '>'},
        {'ge', 'int?', '>='},
        {'eq', 'int?', '=='},
        {'le', 'int?', '<='},
        {'lt', 'int?', '<'}
    },
    input = {'值(int)'},
    doc = [[
        + 若值为空，返回失败
        + 非整数类型可能会报错
    ]]
}

local function ret(r)
    return r and bret.SUCCESS or bret.FAIL
end

function M.run(node, env, value)
    assert(type(value) == 'number')
    local args = node.args
    if args.gt then
        return ret(value > args.gt)
    elseif args.ge then
        return ret(value >= args.ge)
    elseif args.eq then
        return ret(value == args.eq)
    elseif args.lt then
        return ret(value < args.lt)
    elseif args.le then
        return ret(value <= args.le)
    else
        error('args error')
    end
end

return M
`);

await factory.mountFile(`behavior3/nodes/decorators/always_fail.lua`,LUA`
-- AlwaysSuccess
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'AlwaysFail',
    type = 'Decorator',
    desc = '始终返回失败',
    doc = [[
        + 只能有一个子节点,多个仅执行第一个
        + 不管子节点是否成功都返回失败
    ]]
}
function M.run(node, env, enemy)
    local yeild, last_ret = node:resume(env)
    if yeild then
        if last_ret == bret.RUNNING then
            return last_ret
        end
        return bret.FAIL
    end

    local r = node.children[1]:run(env)
    if r == bret.RUNNING then
        return node:yield(env)
    end
    return bret.FAIL
end

return M
`);

await factory.mountFile(`behavior3/nodes/decorators/always_success.lua`,LUA`
-- AlwaysSuccess
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'AlwaysSuccess',
    type = 'Decorator',
    desc = '始终返回成功',
    doc = [[
        + 只能有一个子节点,多个仅执行第一个
        + 不管子节点是否成功都返回成功
    ]]
}

function M.run(node, env)
    local yeild, last_ret = node:resume(env)
    if yeild then
        if last_ret == bret.RUNNING then
            return last_ret
        end
        return bret.SUCCESS
    end

    local r = node.children[1]:run(env)
    if r == bret.RUNNING then
        return node:yield(env)
    end
    return bret.SUCCESS
end

return M
`);

await factory.mountFile(`behavior3/nodes/decorators/not.lua`,LUA`
-- Not
--

local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'Not',
    type = 'Decorator',
    desc = '取反',
    doc = [[
        + 将子节点的返回值取反
    ]]
}

function M.run(node, env)
    local yield = node:resume(env)
    local r
    if node:resume(env) then
        r = env.last_ret
    else
        r = node.children[1]:run(env)
    end

    if r == bret.SUCCESS then
        return bret.FAIL
    elseif r == bret.FAIL then
        return bret.SUCCESS
    elseif r == bret.RUNNING then
        return node:yield(env)
    end
end

return M
`);

await factory.mountFile(`example/process.lua`,LUA`
return {
    -- 复合节点
    Parallel = require "behavior3.nodes.composites.parallel",
    Selector = require "behavior3.nodes.composites.selector",
    Sequence = require "behavior3.nodes.composites.sequence",
    IfElse   = require "behavior3.nodes.composites.ifelse",
    ForEach  = require "behavior3.nodes.composites.foreach",
    Loop     = require "behavior3.nodes.composites.loop",

    -- 装饰节点
    Not           = require "behavior3.nodes.decorators.not",
    AlwaysFail    = require "behavior3.nodes.decorators.always_fail",
    AlwaysSuccess = require "behavior3.nodes.decorators.always_success",

    -- 条件节点
    Cmp       = require "behavior3.nodes.conditions.cmp",
    FindEnemy = require "example.conditions.find_enemy",

    -- 行为节点
    Log          = require "behavior3.nodes.actions.log",
    Wait         = require "behavior3.nodes.actions.wait",
    GetHp        = require "example.actions.get_hp",
    Attack       = require "example.actions.attack",
    MoveToTarget = require "example.actions.move_to_target",
    MoveToPos    = require "example.actions.move_to_pos",
    Idle         = require "example.actions.idle",
}
`);

await factory.mountFile(`example/actions/attack.lua`,LUA`
-- Attack
--

local bret = require "behavior3.behavior_ret"
local M = {
    name = "Attack",
    type = "Action",
    desc = "攻击",
    input = {"{目标}"},
}

function M.run(node, env, enemy)
    if not enemy then
        return bret.FAIL
    end
    local owner = env.owner

    print "Do Attack"
    enemy.hp = enemy.hp - 100

    env.vars.ATTACKING = true

    return bret.SUCCESS
end

return M
`);

await factory.mountFile(`example/actions/get_hp.lua`,LUA`
-- GetHp
--

local bret = require "behavior3.behavior_ret"

local M = {
    name = "GetHp",
    type = "Action",
    desc = "获取生命值",
    output = {"生命值"},
}

function M.run(node, env)
    return bret.SUCCESS, env.owner.hp
end

return M
`);

await factory.mountFile(`example/actions/idle.lua`,LUA`
-- Idle
--

local bret = require "behavior3.behavior_ret"

local M = {
    name = "Idle",
    type = "Action",
    desc = "待机",
}

function M.run(node, env)
    print "Do Idle"
    return bret.SUCCESS
end

return M
`);

await factory.mountFile(`example/actions/move_to_pos.lua`,LUA`
local bret = require 'behavior3.behavior_ret'

local M = {
    name = 'MoveToPos',
    type = 'Action',
    desc = '移动到坐标',
    args = {
        {'x', 'int', 'x'},
        {'y', 'int', 'y'}
    }
}

function M.run(node, env)
    local args = node.args
    local owner = env.owner
    owner.x = args.x
    owner.y = args.y
    return bret.SUCCESS
end

return M
`);

await factory.mountFile(`example/actions/move_to_target.lua`,LUA`
-- MoveToTarget
--

local bret = require "behavior3.behavior_ret"

local M = {
    name = "MoveToTarget",
    type = "Action",
    desc = "移动到目标",
    input = {"{目标}"},
}

local abs     = math.abs
local sformat = string.format

local SPEED = 50

function M.run(node, env, target)
    if not target then
        return bret.FAIL
    end
    local owner = env.owner

    local x, y = owner.x, owner.y
    local tx, ty = target.x, target.y

    if abs(x - tx) < SPEED and abs(y - ty) < SPEED  then
        print("Moving reach target")
        return bret.SUCCESS
    end

    print(sformat("Moving (%d, %d) => (%d, %d)", x, y, tx, ty))

    if abs(x - tx) >= SPEED then
        owner.x = owner.x + SPEED * (tx > x and 1 or -1)
    end

    if abs(y - ty) >= SPEED then
        owner.y = owner.y + SPEED * (ty > y and 1 or -1)
    end

    return node:yield(env)
end

return M
`);

await factory.mountFile(`example/conditions/find_enemy.lua`,LUA`
-- FindEnemy

local bret = require "behavior3.behavior_ret"

local M = {
    name = "FindEnemy",
    type = "Condition",
    desc = "查找敌人",
    args = {
        {"x",     "int?",     "x"},
        {"y",     "int?",     "y"},
        {"w",     "int?",     "宽"},
        {"h",     "int?",     "高"},
        {"count", "string?",  "查找上限"},
    },
    output = {"目标单位"},
    doc = [[
        + 没找到返回失败
    ]]
}

local function ret(r)
    return r and bret.SUCCESS or bret.FAIL
end

function M.run(node, env)
    local args = node.args
    local x, y = env.owner.x, env.owner.y
    local w, h = args.w, args.h
    local list = env.ctx:find(function(t)
        if t == env.owner then
            return false
        end
        local tx, ty = t.x, t.y
        return math.abs(x - tx) <= w and math.abs(y - ty) <= h
    end, args.count)

    local enemy = list[1]
    return ret(enemy), enemy
end

return M
`);

await factory.mountFile(`workspace/trees/hero.json`,JSON`{"name":"hero","root":{"id":1,"name":"Selector","desc":"英雄测试AI","args":{},"children":[{"id":2,"name":"Sequence","desc":"攻击","args":{},"children":[{"id":3,"name":"FindEnemy","args":{"x":0,"y":0,"w":100,"h":50},"output":["enemy"]},{"id":4,"name":"Attack","args":{},"input":["enemy"]},{"id":5,"name":"Wait","args":{"time":10}}]},{"id":6,"name":"Sequence","desc":"移动","args":{},"children":[{"id":7,"name":"FindEnemy","args":{"w":1000,"h":500,"x":0,"y":0},"output":["enemy"]},{"id":8,"name":"MoveToTarget","args":{},"input":["enemy"]}]},{"id":9,"name":"Sequence","desc":"逃跑","args":{},"children":[{"id":10,"name":"GetHp","args":{},"output":["hp"]},{"id":11,"name":"Cmp","args":{"lt":50},"input":["hp"]},{"id":12,"name":"MoveToPos","args":{"x":0,"y":0}}]},{"id":13,"name":"Idle"}]},"desc":"英雄测试AI"}`);

await factory.mountFile(`workspace/trees/monster.json`,JSON`{"name":"monster","root":{"id":1,"name":"Sequence","desc":"怪物测试AI","args":{},"children":[{"id":2,"name":"GetHp","args":{},"output":["hp"],"debug":true},{"id":3,"name":"IfElse","args":{},"debug":true,"children":[{"id":4,"name":"Cmp","args":{"gt":50},"input":["hp"],"debug":false},{"id":5,"name":"Sequence","args":{},"debug":false,"children":[{"id":6,"name":"Log","desc":"攻击","args":{"str":"Attack!"}},{"id":7,"name":"Wait","args":{"time":5}}]},{"id":8,"name":"Log","desc":"逃跑","args":{"str":"Run!"},"children":[]}]},{"id":9,"name":"Log","desc":"test","args":{"str":"if true"},"children":[]}]},"desc":"怪物测试AI"}`);

await factory.mountFile(`test.lua`,LUA`
local behavior_tree = require "behavior3.behavior_tree"
local behavior_node = require "behavior3.behavior_node"
behavior_node.process(require "example.process")

local json = require "json"

local function load_tree(path)
    local file, err = io.open(path, 'r')
    assert(file, err)
    local str = file:read('*a')
    file:close()
    return json.decode(str)
end

local monster = {
    hp = 100,
    x = 200,
    y = 0,
}

local hero = {
    hp = 100,
    x = 0,
    y = 0,
}

local ctx = {
    time = 0,
    avatars = {monster, hero},
}
function ctx:find(func)
    local list = {}
    for _, v in pairs(ctx.avatars) do
        if func(v) then
            list[#list+1] = v
        end
    end
    return list
end

local function test_hero()
    print("=================== test hero ========================")
    local btree = behavior_tree.new("hero", load_tree("workspace/trees/hero.json"), {
        ctx   = ctx,
        owner = hero,
    })

    -- 移动到目标并攻击
    btree:run()
    btree:run()
    btree:run()
    btree:run()
    btree:run()
    btree:run()

    -- 后摇
    btree:run()
    btree:interrupt()
    btree:run()
    ctx.time = 20
    btree:run()
end

test_hero()


local function test_moster()
    print("=================== test monster ========================")
    local btree = behavior_tree.new("monster", load_tree("workspace/trees/monster.json"), {
        ctx   = ctx,
        owner = monster,
    })

    monster.hp = 100
    btree:run()

    monster.hp = 20
    btree:run()
    ctx.time = 40
    btree:run()
    btree:run()
end

test_moster()
`);

await engine.doFile('test.lua');