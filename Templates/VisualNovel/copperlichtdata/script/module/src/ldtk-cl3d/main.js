const LUA = String.raw;
const JSON = String.raw;

export const factory = Wasmoon.getFactory();
export const engine = await factory.createEngine();

engine.global.set('js_console', console);
engine.global.set('js_cl3d_TextureManager', CL3D.ScriptingInterface.getScriptingInterface().Engine.getTextureManager());

await factory.mountFile(`classic.lua`,LUA`
--
-- classic
--
-- Copyright (c) 2014, rxi
--
-- This module is free software; you can redistribute it and/or modify it under
-- the terms of the MIT license. See LICENSE for details.
--


local Object = {}
Object.__index = Object


function Object:new()
end


function Object:extend()
  local cls = {}
  for k, v in pairs(self) do
    if k:find("__") == 1 then
      cls[k] = v
    end
  end
  cls.__index = cls
  cls.super = self
  setmetatable(cls, self)
  return cls
end


function Object:implement(...)
  for _, cls in pairs({...}) do
    for k, v in pairs(cls) do
      if self[k] == nil and type(v) == "function" then
        self[k] = v
      end
    end
  end
end


function Object:is(T)
  local mt = getmetatable(self)
  while mt do
    if mt == T then
      return true
    end
    mt = getmetatable(mt)
  end
  return false
end


function Object:__tostring()
  return "Object"
end


function Object:__call(...)
  local obj = setmetatable({}, self)
  obj:new(...)
  return obj
end


return Object
`);

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

await factory.mountFile(`main.lua`,LUA`
--loading ldtk library
local ldtk = require 'ldtk'

--objects table
local objects = {}


-------- ENTITIES --------
--classes are used for the example
local class = require 'classic'

--object class 
local object = class:extend()

function object:new(entity)
    -- setting up the object using the entity data
    self.x, self.y = entity.x, entity.y
    self.w, self.h = entity.width, entity.height
    self.visible = entity.visible
end

function object:draw()
    if self.visible then
        --draw a rectangle to represent the entity
        --love.graphics.rectangle('fill', self.x, self.y, self.w, self.h)
    end
end
`);

await factory.mountFile(`ldtk.lua`,LUA`
-- A basic LDtk loader for LÖVE created by Hamdy Elzonqali
-- Last tested with LDtk 0.9.3
--
-- ldtk.lua
--
-- Copyright (c) 2021 Hamdy Elzonqali
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



----------- Loading JSON ------------
-- Remember to put json.lua in the same directory as ldtk.lua

-- Current folder trick
local currentFolder = (...):gsub('%.[^%.]+$', '')

local jsonLoaded = false

if json then
    jsonLoaded = true
end

-- Try to load json
if not jsonLoaded then
    jsonLoaded, json = pcall(require, "json")
end

-- Try to load relatively
if not jsonLoaded then
    jsonLoaded, json = pcall(require, currentFolder .. ".json")
end

local cache = {
    tilesets = {

    },
}

local ldtk = {
    levels = {},
    levelsNames = {},
    tilesets = {},
    currentLevelIndex = nil,
    currentLevelName  = '',
    flipped = false,
    cache = cache
}

local _path

--------- LAYER OBJECT ---------
--This is used as a switch statement for lua. Much better than if-else pairs.
local flipX = {
    [0] = 1,
    [1] = -1,
    [2] = 1,
    [3] = -1
}

local flipY = {
    [0] = 1,
    [1] = 1,
    [2] = -1,
    [3] = -1
}

local oldColor = {}

--creates the layer object from data. only used here. ignore it
local function create_layer_object(self, data, auto)
    
    self._offsetX = {
        [0] = 0,
        [1] = data.__gridSize,
        [2] = 0,
        [3] = data.__gridSize,
    }

    self._offsetY = {
        [0] = 0,
        [1] = 0,
        [2] = data.__gridSize,
        [3] = data.__gridSize,
    }

    --getting tiles information
    if auto then
        self.tiles = data.autoLayerTiles
    else 
        self.tiles = data.gridTiles
    end

    self._tilesLen = #self.tiles

    self.relPath = data.__tilesetRelPath
    self.path = ldtk.getPath(data.__tilesetRelPath)

    self.id = data.__identifier
    self.x, self.y = data.__pxTotalOffsetX, data.__pxTotalOffsetY
    self.visible = data.visible
    self.color = {1, 1, 1, data.__opacity}

    self.width = data.__cWid
    self.height = data.__cHei
    self.gridSize = data.__gridSize

    --getting tileset information
    self.tileset = ldtk.tilesets[data.__tilesetDefUid]
    self.tilesetID = data.__tilesetDefUid

    --creating new tileset if not created yet
    if not cache.tilesets[data.__tilesetDefUid] then
        --loading tileset
        --cache.tilesets[data.__tilesetDefUid] = love.graphics.newImage(self.path)
        --creating spritebatch
        --cache.batch[data.__tilesetDefUid] = love.graphics.newSpriteBatch(cache.tilesets[data.__tilesetDefUid])

        --creating quads for the tileset
        --cache.quods[data.__tilesetDefUid] = {}
        local count = 0
        for ty = 0, self.tileset.__cHei - 1, 1 do
            for tx = 0, self.tileset.__cWid - 1, 1 do
                --[[cache.quods[data.__tilesetDefUid][count] =
                love.graphics.newQuad(
                    self.tileset.padding + tx * (self.tileset.tileGridSize + self.tileset.spacing),
                    self.tileset.padding + ty * (self.tileset.tileGridSize + self.tileset.spacing),
                    self.tileset.tileGridSize,
                    self.tileset.tileGridSize,
                    cache.tilesets[data.__tilesetDefUid]:getWidth(),
                    cache.tilesets[data.__tilesetDefUid]:getHeight()
                )]]
                count = count + 1
            end
        end
    end
end

--draws tiles
local function draw_layer_object(self)
    if self.visible then
        --Saving old color
        --oldColor[1], oldColor[2], oldColor[3], oldColor[4] = love.graphics.getColor()

        --Clear batch
        --cache.batch[self.tileset.uid]:clear()

        -- Fill batch with quads
         for i = 1, self._tilesLen do
            --[[cache.batch[self.tileset.uid]:add(
                cache.quods[self.tileset.uid][self.tiles[i].t],
                self.x + self.tiles[i].px[1] + self._offsetX[self.tiles[i].f],
                self.y + self.tiles[i].px[2] + self._offsetY[self.tiles[i].f],
                0,
                flipX[self.tiles[i].f],
                flipY[self.tiles[i].f]
            )]]
        end
        
        --Setting layer color 
        --love.graphics.setColor(self.color)
        --Draw batch
        --love.graphics.draw(cache.batch[self.tileset.uid])

        --Resotring old color
        --love.graphics.setColor(oldColor)
    end
end

----------- HELPER FUNCTIONS ------------
--LDtk uses hex colors while LÖVE uses RGB (on a scale of 0 to 1)
-- Converts hex color to RGB
function ldtk.hex2rgb(color)
    local r = load("return {0x" .. color:sub(2, 3) .. ",0x" .. color:sub(4, 5) .. 
                ",0x" .. color:sub(6, 7) .. "}")()
    return {r[1] / 255, r[2] / 255, r[3] / 255}
end


--Checks if a table is empty.
local function is_empty(t)
    for _, _ in pairs(t) do
        return false
    end
    return true
end

----------- LDTK Functions -------------
--loads project settings
local function read_file(path)
    local file, err = io.open(path, 'r')
    assert(file, err)
    local str = file:read('*a')
    file:close()
    return str
end

function ldtk.load(file, level)
    ldtk.data = json.decode(read_file(file))
    ldtk.entities = {}
    ldtk.x, ldtk.y = ldtk.x or 0, ldtk.x or 0
    ldtk.countOfLevels = #ldtk.data.levels
    ldtk.countOfLayers = #ldtk.data.defs.layers
    
    --creating a table with the path to .ldtk file separated by '/', 
    --used to get the path relative to main.lua instead of the .ldtk file. Ignore it.
    _path = {}
    for str in string.gmatch(file, "([^"..'/'.."]+)") do
        table.insert(_path, str)
    end
    _path[#_path] = nil

    for index, value in ipairs(ldtk.data.levels) do
      ldtk.levels[value.identifier] = index
    end

    for key, value in pairs(ldtk.levels) do
      ldtk.levelsNames[value] = key
    end

    for index, value in ipairs(ldtk.data.defs.tilesets) do
      ldtk.tilesets[value.uid] = ldtk.data.defs.tilesets[index]
    end

    if level then
      ldtk.goTo(level)
    end

end

--getting relative file path to main.lua instead of .ldtk file
function ldtk.getPath(relPath)
    local newPath = ''
    local newRelPath = {}
    local pathLen = #_path

    for str in string.gmatch(relPath, "([^"..'/'.."]+)") do
        table.insert(newRelPath, str)
    end

    for i = #newRelPath, 1, -1 do
        if newRelPath[i] == '..' then
            pathLen = pathLen - 1
            newRelPath[i] = nil
        end
    end

    for i = 1, pathLen, 1 do
        newPath = newPath .. (i > 1 and '/' or '') .. _path[i]
    end

    local keys = {}
    for key, _ in pairs(newRelPath) do
        table.insert(keys, key)
    end
    table.sort(keys)


    local len = #keys
    for i = 1, len, 1 do
        newPath = newPath .. (newPath ~= '' and '/' or '') .. newRelPath[keys[i]]
    end

    return newPath
end


local types = {
    Entities = function (currentLayer, order, level)
        for _, value in ipairs(currentLayer.entityInstances) do
            local props = {}

            for _, p in ipairs(value.fieldInstances) do
                props[p.__identifier] = p.__value
            end

            ldtk.onEntity({
                id = value.__identifier,
                x = value.px[1],
                y = value.px[2],
                width = value.width,
                height = value.height,
                px = value.__pivot[1],
                py = value.__pivot[2],
                order = order,
                visible = currentLayer.visible,
                props = props
            }, level)
        end
    end,

    Tiles = function (currentLayer, order, level)
        if not is_empty(currentLayer.gridTiles) then
            local layer = {draw = draw_layer_object}
            create_layer_object(layer, currentLayer, false)
            layer.order = order
            ldtk.onLayer(layer, level)
        end
    end,

    IntGrid = function (currentLayer, order, level)
        if not is_empty(currentLayer.autoLayerTiles) and currentLayer.__tilesetDefUid then
            local layer = {draw = draw_layer_object}
            create_layer_object(layer, currentLayer, true)
            layer.order = order
            ldtk.onLayer(layer, level)
        end
    end,

    AutoLayer = function (currentLayer, order, level)
        if not is_empty(currentLayer.autoLayerTiles) and currentLayer.__tilesetDefUid then
            local layer = {draw = draw_layer_object}
            create_layer_object(layer, currentLayer, true)
            layer.order = order
            ldtk.onLayer(layer, level)
        end
    end
}


--Load a level by its index (int)
function ldtk.goTo(index)
    if index > ldtk.countOfLevels or index < 1 then
        error('There are no levels with that index.')
    end

    ldtk.currentLevelIndex = index
    ldtk.currentLevelName  = ldtk.levelsNames[index]

    local layers
    if ldtk.data.externalLevels then
        layers = json.decode(read_file(ldtk.getPath(ldtk.data.levels[index].externalRelPath))).layerInstances
    else
        layers = ldtk.data.levels[index].layerInstances
    end
    
    local levelProps = {}
    for _, p in ipairs(ldtk.data.levels[index].fieldInstances) do
        levelProps[p.__identifier] = p.__value
    end



    local levelEntry = {
        backgroundColor = ldtk.hex2rgb(ldtk.data.levels[index].__bgColor),
        id = ldtk.data.levels[index].identifier,
        worldX  = ldtk.data.levels[index].worldX,
        worldY = ldtk.data.levels[index].worldY,
        width = ldtk.data.levels[index].pxWid,
        height = ldtk.data.levels[index].pxHei,
        neighbours = ldtk.data.levels[index].__neighbours,
        index = index,
        props = levelProps
    }

    ldtk.onLevelLoaded(levelEntry)

    

    if ldtk.flipped then
        for i = ldtk.countOfLayers, 1, -1 do
            types[layers[i].__type](layers[i], i, levelEntry)
        end    
    else
        for i = 1, ldtk.countOfLayers do
            types[layers[i].__type](layers[i], i, levelEntry)
        end
    end
    

    ldtk.onLevelCreated(levelEntry)
end


--loads a level by its name (string)
function ldtk.level(name)
  ldtk.goTo(ldtk.levels[tostring(name)] or error('There are no levels with the name: "' .. tostring(name) .. '".\nDid you save? (ctrl +s)'))
end

--loads next level
function ldtk.next()
  ldtk.goTo(ldtk.currentLevelIndex + 1 <= ldtk.countOfLevels and ldtk.currentLevelIndex + 1 or 1)
end

--loads previous level
function ldtk.previous()
  ldtk.goTo(ldtk.currentLevelIndex - 1 >= 1 and ldtk.currentLevelIndex - 1 or ldtk.countOfLevels)
end

--reloads current level
function ldtk.reload()
  ldtk.goTo(ldtk.currentLevelIndex)
end


--gets the index of a specific level
function ldtk.getIndex(name)
    return ldtk.levels[name]
end

--get the name of a specific level
function ldtk.getName(index)
    return ldtk.levelsNames[index]
end

--gets the current level index
function ldtk.getCurrent()
    return ldtk.currentLevelIndex
end

--get the current level name
function ldtk.getCurrentName()
    return ldtk.levelsNames[ldtk.getCurrent()]
end

--sets whether to invert the loop or not
function ldtk.setFlipped(flipped)
  ldtk.flipped = flipped
end

--gets whether the loop is inverted or not
function ldtk.getFlipped()
    return ldtk.flipped
end

--remove the cahced tiles and quods. you may use it if you have multiple .ldtk files
function ldtk.removeCache()
    cache = {
        tilesets = {
            
        },
    }
    collectgarbage()
end



--------- CALLBACKS ----------
--[[
    This library depends heavily on callbacks. It works by overriding the default callbacks.
]]

--[[
    ldtk.onEntity is called when a new entity is created.
    
    entity = {
        id          = (string), 
        x           = (int), 
        y           = (int), 
        width       = (int), 
        height      = (int), 
        visible     = (bool)
        px          = (int),    --pivot x
        py          = (int),    --pivot y
        order       = (int), 
        props       = (table)   --custom fields defined in LDtk
    }
    
    Remember that colors are saved in HEX format and not RGB. 
    You can use ldtk ldtk.hex2rgb(color) to get an RGB table like {0.21, 0.57, 0.92}
]]
function ldtk.onEntity(entity, level)
    
end

--[[
    ldtk.onLayer is called when a new layer is created.    

    layer:draw() --used to draw the layer

    layer = {
        id          = (string), 
        x           = (int), 
        y           = (int), 
        visible     = (bool)
        color       = (table),  --the color of the layer {r,g,b,a}. Usually used for opacity.
        order       = (int),
        draw        = (function) -- used to draw the layer
    }
]]
function ldtk.onLayer(layer, level)
    
end

--[[
    ldtk.onLevelLoaded is called after the level data is loaded but before it's created.

    It's usually useful when you need to remove old objects and change some settings like background color

    level = {
        id          = (string), 
        worldX      = (int), 
        worldY      = (int), 
        width       = (int), 
        height      = (int), 
        props       = (table), --custom fields defined in LDtk
        backgroundColor = (table) --the background color of the level as defined in LDtk
    }
    
    props table has the custom fields defined in LDtk
]]
function ldtk.onLevelLoaded(levelData)
    
end

--[[
    ldtk.onLevelCreated is called after the level is created.

    It's usually useful when you need to call a function or manipulate the objects after they are created.

    level = {
        id          = (string), 
        worldX      = (int), 
        worldY      = (int), 
        width       = (int), 
        height      = (int), 
        props       = (table), --custom fields defined in LDtk
        backgroundColor = (table) --the background color of the level as defined in LDtk
    }
]]
function ldtk.onLevelCreated(levelData)
    
end




return ldtk
`);

await factory.mountFile(`copperlichtdata/level/ldtk/game.ldtk`,JSON`{"__header__":{"fileType":"LDtk Project JSON","app":"LDtk","doc":"https://ldtk.io/json","schema":"https://ldtk.io/files/JSON_SCHEMA.json","appAuthor":"Sebastien 'deepnight' Benard","appVersion":"0.9.3","url":"https://ldtk.io"},"jsonVersion":"0.9.3","nextUid":71,"worldLayout":"LinearVertical","worldGridWidth":256,"worldGridHeight":256,"defaultPivotX":0,"defaultPivotY":0,"defaultGridSize":8,"defaultLevelWidth":256,"defaultLevelHeight":256,"bgColor":"#40465B","defaultLevelBgColor":"#21263F","minifyJson":true,"externalLevels":true,"exportTiled":false,"imageExportMode":"None","pngFilePattern":null,"backupOnSave":false,"backupLimit":10,"levelNamePattern":"Level_%idx","flags":["DiscardPreCsvIntGrid","IgnoreBackupSuggest"],"defs":{"layers":[{"__type":"Entities","identifier":"Entities","type":"Entities","uid":68,"gridSize":8,"displayOpacity":1,"pxOffsetX":0,"pxOffsetY":0,"requiredTags":[],"excludedTags":[],"intGridValues":[{"value":1,"identifier":null,"color":"#000000"}],"autoTilesetDefUid":null,"autoRuleGroups":[],"autoSourceLayerDefUid":null,"tilesetDefUid":null,"tilePivotX":0,"tilePivotY":0},{"__type":"Tiles","identifier":"Tiles","type":"Tiles","uid":2,"gridSize":8,"displayOpacity":1,"pxOffsetX":0,"pxOffsetY":0,"requiredTags":[],"excludedTags":[],"intGridValues":[{"value":1,"identifier":null,"color":"#000000"}],"autoTilesetDefUid":null,"autoRuleGroups":[],"autoSourceLayerDefUid":null,"tilesetDefUid":1,"tilePivotX":0,"tilePivotY":0}],"entities":[{"identifier":"Entity","uid":65,"tags":[],"width":16,"height":16,"resizableX":false,"resizableY":false,"keepAspectRatio":false,"fillOpacity":1,"lineOpacity":1,"hollow":false,"color":"#94D9B3","renderMode":"Rectangle","showName":true,"tilesetId":null,"tileId":null,"tileRenderMode":"FitInside","maxCount":0,"limitScope":"PerLevel","limitBehavior":"MoveLastOne","pivotX":0,"pivotY":0,"fieldDefs":[]}],"tilesets":[{"__cWid":8,"__cHei":12,"identifier":"Tiles_no_bleeding","uid":1,"relPath":"../tileset/tiles-no-bleeding.png","pxWid":80,"pxHei":120,"tileGridSize":8,"spacing":2,"padding":1,"tagsSourceEnumUid":null,"enumTags":[],"customData":[],"savedSelections":[],"cachedPixelData":{"opaqueTiles":"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111000","averageColors":"f224f334f334f334f234f334f334f334f564f444f344f555f445f334f434f544f344f234f334f334f334f445f544f434f344f234f234f334f224f667f334f534f334f555f556f764f544f544f434f434f334f335f334f544f444f644f434f334f235f335f334f544f334f224f654f555f335f334f334f224f854f334f335f445f335f348f335f534fb42f555f988f777f887f779f877f668fc97fbbafa99f555f668f679f669f347fc86f344f344f344f335f224f347f235f424000000000000"}}],"enums":[{"identifier":"Enum","uid":43,"values":[{"id":"Enemy","tileId":31,"color":5058622,"__tileSrcRect":[71,31,8,8]},{"id":"Friend","tileId":41,"color":2896982,"__tileSrcRect":[11,51,8,8]},{"id":"Water","tileId":90,"color":3752048,"__tileSrcRect":[21,111,8,8]},{"id":"Ground","tileId":9,"color":3950398,"__tileSrcRect":[11,11,8,8]}],"iconTilesetUid":1,"externalRelPath":null,"externalFileChecksum":null}],"externalEnums":[],"levelFields":[{"identifier":"stupid_int","__type":"Int","uid":13,"type":"F_Int","isArray":false,"canBeNull":false,"arrayMinLength":null,"arrayMaxLength":null,"editorDisplayMode":"Hidden","editorDisplayPos":"Above","editorAlwaysShow":false,"editorCutLongValues":true,"min":null,"max":null,"regex":null,"acceptFileTypes":null,"defaultOverride":null,"textLanguageMode":null},{"identifier":"load","__type":"String","uid":16,"type":"F_Text","isArray":false,"canBeNull":false,"arrayMinLength":null,"arrayMaxLength":null,"editorDisplayMode":"Hidden","editorDisplayPos":"Above","editorAlwaysShow":false,"editorCutLongValues":true,"min":null,"max":null,"regex":null,"acceptFileTypes":null,"defaultOverride":null,"textLanguageMode":"LangLua"},{"identifier":"create","__type":"String","uid":18,"type":"F_Text","isArray":false,"canBeNull":false,"arrayMinLength":null,"arrayMaxLength":null,"editorDisplayMode":"Hidden","editorDisplayPos":"Above","editorAlwaysShow":false,"editorCutLongValues":true,"min":null,"max":null,"regex":null,"acceptFileTypes":null,"defaultOverride":null,"textLanguageMode":"LangLua"}]},"levels":[{"identifier":"Level_0","uid":48,"worldX":0,"worldY":0,"pxWid":256,"pxHei":256,"__bgColor":"#21263F","bgColor":null,"useAutoIdentifier":true,"bgRelPath":null,"bgPos":null,"bgPivotX":0.5,"bgPivotY":0.5,"__bgPos":null,"externalRelPath":"game/0000-Level_0.ldtkl","fieldInstances":[{"__identifier":"stupid_int","__value":0,"__type":"Int","defUid":13,"realEditorValues":[]},{"__identifier":"load","__value":"","__type":"String","defUid":16,"realEditorValues":[]},{"__identifier":"create","__value":"","__type":"String","defUid":18,"realEditorValues":[]}],"layerInstances":null,"__neighbours":[{"levelUid":63,"dir":"s"}]},{"identifier":"Level_1","uid":63,"worldX":0,"worldY":288,"pxWid":256,"pxHei":256,"__bgColor":"#21263F","bgColor":null,"useAutoIdentifier":true,"bgRelPath":null,"bgPos":null,"bgPivotX":0.5,"bgPivotY":0.5,"__bgPos":null,"externalRelPath":"game/0001-Level_1.ldtkl","fieldInstances":[{"__identifier":"stupid_int","__value":0,"__type":"Int","defUid":13,"realEditorValues":[]},{"__identifier":"load","__value":"","__type":"String","defUid":16,"realEditorValues":[]},{"__identifier":"create","__value":"","__type":"String","defUid":18,"realEditorValues":[]}],"layerInstances":null,"__neighbours":[{"levelUid":64,"dir":"s"},{"levelUid":48,"dir":"n"}]},{"identifier":"Level_2","uid":64,"worldX":0,"worldY":576,"pxWid":256,"pxHei":256,"__bgColor":"#21263F","bgColor":null,"useAutoIdentifier":true,"bgRelPath":null,"bgPos":null,"bgPivotX":0.5,"bgPivotY":0.5,"__bgPos":null,"externalRelPath":"game/0002-Level_2.ldtkl","fieldInstances":[{"__identifier":"stupid_int","__value":0,"__type":"Int","defUid":13,"realEditorValues":[]},{"__identifier":"load","__value":"","__type":"String","defUid":16,"realEditorValues":[]},{"__identifier":"create","__value":"","__type":"String","defUid":18,"realEditorValues":[]}],"layerInstances":null,"__neighbours":[{"levelUid":63,"dir":"n"}]}]}`);

await factory.mountFile(`copperlichtdata/level/ldtk/game/0000-Level_0.ldtkl`,JSON`{"__header__":{"fileType":"LDtk Project JSON","app":"LDtk","doc":"https://ldtk.io/json","schema":"https://ldtk.io/files/JSON_SCHEMA.json","appAuthor":"Sebastien 'deepnight' Benard","appVersion":"0.9.3","url":"https://ldtk.io"},"identifier":"Level_0","uid":48,"worldX":0,"worldY":0,"pxWid":256,"pxHei":256,"__bgColor":"#21263F","bgColor":null,"useAutoIdentifier":true,"bgRelPath":null,"bgPos":null,"bgPivotX":0.5,"bgPivotY":0.5,"__bgPos":null,"externalRelPath":null,"fieldInstances":[{"__identifier":"stupid_int","__value":0,"__type":"Int","defUid":13,"realEditorValues":[]},{"__identifier":"load","__value":"","__type":"String","defUid":16,"realEditorValues":[]},{"__identifier":"create","__value":"","__type":"String","defUid":18,"realEditorValues":[]}],"layerInstances":[{"__identifier":"Entities","__type":"Entities","__cWid":32,"__cHei":32,"__gridSize":8,"__opacity":1,"__pxTotalOffsetX":0,"__pxTotalOffsetY":0,"__tilesetDefUid":null,"__tilesetRelPath":null,"levelId":48,"layerDefUid":68,"pxOffsetX":0,"pxOffsetY":0,"visible":true,"optionalRules":[],"intGridCsv":[],"autoLayerTiles":[],"seed":1179771,"overrideTilesetUid":null,"gridTiles":[],"entityInstances":[{"__identifier":"Entity","__grid":[3,15],"__pivot":[0,0],"__tile":null,"width":16,"height":16,"defUid":65,"px":[24,120],"fieldInstances":[]},{"__identifier":"Entity","__grid":[22,24],"__pivot":[0,0],"__tile":null,"width":16,"height":16,"defUid":65,"px":[176,192],"fieldInstances":[]}]},{"__identifier":"Tiles","__type":"Tiles","__cWid":32,"__cHei":32,"__gridSize":8,"__opacity":1,"__pxTotalOffsetX":0,"__pxTotalOffsetY":0,"__tilesetDefUid":1,"__tilesetRelPath":"../tileset/tiles-no-bleeding.png","levelId":48,"layerDefUid":2,"pxOffsetX":0,"pxOffsetY":0,"visible":true,"optionalRules":[],"intGridCsv":[],"autoLayerTiles":[],"seed":3620187,"overrideTilesetUid":null,"gridTiles":[{"px":[200,40],"src":[11,51],"f":0,"t":41,"d":[185]},{"px":[168,72],"src":[11,61],"f":0,"t":49,"d":[309]},{"px":[96,80],"src":[1,81],"f":0,"t":64,"d":[332]},{"px":[96,88],"src":[21,81],"f":0,"t":66,"d":[364]},{"px":[96,96],"src":[21,81],"f":0,"t":66,"d":[396]},{"px":[128,96],"src":[21,31],"f":0,"t":26,"d":[400]},{"px":[96,104],"src":[1,11],"f":0,"t":8,"d":[428]},{"px":[104,104],"src":[11,11],"f":0,"t":9,"d":[429]},{"px":[112,104],"src":[11,11],"f":0,"t":9,"d":[430]},{"px":[120,104],"src":[11,11],"f":0,"t":9,"d":[431]},{"px":[128,104],"src":[1,11],"f":1,"t":8,"d":[432]},{"px":[96,112],"src":[1,31],"f":0,"t":24,"d":[460]},{"px":[104,112],"src":[11,31],"f":0,"t":25,"d":[461]},{"px":[112,112],"src":[11,31],"f":0,"t":25,"d":[462]},{"px":[120,112],"src":[11,31],"f":0,"t":25,"d":[463]},{"px":[128,112],"src":[1,31],"f":1,"t":24,"d":[464]},{"px":[112,120],"src":[21,111],"f":0,"t":90,"d":[494]},{"px":[120,120],"src":[61,101],"f":0,"t":86,"d":[495]},{"px":[112,128],"src":[21,111],"f":0,"t":90,"d":[526]},{"px":[112,136],"src":[11,81],"f":0,"t":65,"d":[558]},{"px":[112,144],"src":[21,111],"f":0,"t":90,"d":[590]},{"px":[32,152],"src":[1,61],"f":0,"t":48,"d":[612]},{"px":[112,152],"src":[21,111],"f":0,"t":90,"d":[622]},{"px":[0,160],"src":[11,11],"f":0,"t":9,"d":[640]},{"px":[8,160],"src":[11,11],"f":0,"t":9,"d":[641]},{"px":[16,160],"src":[11,11],"f":0,"t":9,"d":[642]},{"px":[24,160],"src":[11,11],"f":0,"t":9,"d":[643]},{"px":[32,160],"src":[11,11],"f":0,"t":9,"d":[644]},{"px":[40,160],"src":[11,11],"f":0,"t":9,"d":[645]},{"px":[48,160],"src":[11,11],"f":0,"t":9,"d":[646]},{"px":[56,160],"src":[11,11],"f":0,"t":9,"d":[647]},{"px":[64,160],"src":[11,11],"f":0,"t":9,"d":[648]},{"px":[72,160],"src":[11,11],"f":0,"t":9,"d":[649]},{"px":[80,160],"src":[11,11],"f":0,"t":9,"d":[650]},{"px":[88,160],"src":[1,11],"f":1,"t":8,"d":[651]},{"px":[112,160],"src":[21,111],"f":0,"t":90,"d":[654]},{"px":[136,160],"src":[1,11],"f":0,"t":8,"d":[657]},{"px":[144,160],"src":[11,11],"f":0,"t":9,"d":[658]},{"px":[152,160],"src":[11,11],"f":0,"t":9,"d":[659]},{"px":[160,160],"src":[11,11],"f":0,"t":9,"d":[660]},{"px":[168,160],"src":[11,11],"f":0,"t":9,"d":[661]},{"px":[176,160],"src":[11,11],"f":0,"t":9,"d":[662]},{"px":[184,160],"src":[11,11],"f":0,"t":9,"d":[663]},{"px":[192,160],"src":[11,11],"f":0,"t":9,"d":[664]},{"px":[200,160],"src":[11,11],"f":0,"t":9,"d":[665]},{"px":[208,160],"src":[11,11],"f":0,"t":9,"d":[666]},{"px":[216,160],"src":[11,11],"f":0,"t":9,"d":[667]},{"px":[224,160],"src":[11,11],"f":0,"t":9,"d":[668]},{"px":[232,160],"src":[11,11],"f":0,"t":9,"d":[669]},{"px":[240,160],"src":[11,11],"f":0,"t":9,"d":[670]},{"px":[248,160],"src":[11,11],"f":0,"t":9,"d":[671]},{"px":[88,168],"src":[1,21],"f":1,"t":16,"d":[683]},{"px":[104,168],"src":[1,91],"f":0,"t":72,"d":[685]},{"px":[112,168],"src":[11,91],"f":0,"t":73,"d":[686]},{"px":[120,168],"src":[21,91],"f":0,"t":74,"d":[687]},{"px":[136,168],"src":[1,21],"f":0,"t":16,"d":[689]},{"px":[88,176],"src":[1,21],"f":1,"t":16,"d":[715]},{"px":[96,176],"src":[31,101],"f":0,"t":83,"d":[716]},{"px":[104,176],"src":[1,101],"f":0,"t":80,"d":[717]},{"px":[112,176],"src":[11,101],"f":0,"t":81,"d":[718]},{"px":[120,176],"src":[21,101],"f":0,"t":82,"d":[719]},{"px":[128,176],"src":[31,101],"f":0,"t":83,"d":[720]},{"px":[136,176],"src":[21,21],"f":0,"t":18,"d":[721]},{"px":[88,184],"src":[1,21],"f":1,"t":16,"d":[747]},{"px":[96,184],"src":[21,111],"f":0,"t":90,"d":[748]},{"px":[104,184],"src":[21,111],"f":0,"t":90,"d":[749]},{"px":[112,184],"src":[21,111],"f":0,"t":90,"d":[750]},{"px":[120,184],"src":[21,111],"f":0,"t":90,"d":[751]},{"px":[128,184],"src":[21,111],"f":0,"t":90,"d":[752]},{"px":[136,184],"src":[1,21],"f":0,"t":16,"d":[753]},{"px":[208,184],"src":[11,21],"f":0,"t":17,"d":[762]},{"px":[48,192],"src":[11,21],"f":0,"t":17,"d":[774]},{"px":[88,192],"src":[1,21],"f":1,"t":16,"d":[779]},{"px":[96,192],"src":[21,111],"f":0,"t":90,"d":[780]},{"px":[104,192],"src":[21,111],"f":0,"t":90,"d":[781]},{"px":[112,192],"src":[21,111],"f":0,"t":90,"d":[782]},{"px":[120,192],"src":[21,111],"f":0,"t":90,"d":[783]},{"px":[128,192],"src":[21,111],"f":0,"t":90,"d":[784]},{"px":[136,192],"src":[1,21],"f":0,"t":16,"d":[785]},{"px":[88,200],"src":[1,21],"f":1,"t":16,"d":[811]},{"px":[96,200],"src":[21,111],"f":0,"t":90,"d":[812]},{"px":[104,200],"src":[21,111],"f":0,"t":90,"d":[813]},{"px":[112,200],"src":[21,111],"f":0,"t":90,"d":[814]},{"px":[120,200],"src":[21,111],"f":0,"t":90,"d":[815]},{"px":[128,200],"src":[21,111],"f":0,"t":90,"d":[816]},{"px":[136,200],"src":[1,21],"f":0,"t":16,"d":[817]},{"px":[88,208],"src":[1,21],"f":1,"t":16,"d":[843]},{"px":[96,208],"src":[21,111],"f":0,"t":90,"d":[844]},{"px":[104,208],"src":[21,111],"f":0,"t":90,"d":[845]},{"px":[112,208],"src":[21,111],"f":0,"t":90,"d":[846]},{"px":[120,208],"src":[21,111],"f":0,"t":90,"d":[847]},{"px":[128,208],"src":[21,111],"f":0,"t":90,"d":[848]},{"px":[136,208],"src":[1,21],"f":0,"t":16,"d":[849]},{"px":[88,216],"src":[1,21],"f":1,"t":16,"d":[875]},{"px":[96,216],"src":[21,111],"f":0,"t":90,"d":[876]},{"px":[104,216],"src":[21,111],"f":0,"t":90,"d":[877]},{"px":[112,216],"src":[21,111],"f":0,"t":90,"d":[878]},{"px":[120,216],"src":[21,111],"f":0,"t":90,"d":[879]},{"px":[128,216],"src":[21,111],"f":0,"t":90,"d":[880]},{"px":[136,216],"src":[1,21],"f":0,"t":16,"d":[881]},{"px":[88,224],"src":[1,21],"f":1,"t":16,"d":[907]},{"px":[96,224],"src":[21,111],"f":0,"t":90,"d":[908]},{"px":[104,224],"src":[21,111],"f":0,"t":90,"d":[909]},{"px":[112,224],"src":[21,111],"f":0,"t":90,"d":[910]},{"px":[120,224],"src":[21,111],"f":0,"t":90,"d":[911]},{"px":[128,224],"src":[21,111],"f":0,"t":90,"d":[912]},{"px":[136,224],"src":[1,21],"f":0,"t":16,"d":[913]},{"px":[176,224],"src":[11,21],"f":0,"t":17,"d":[918]},{"px":[88,232],"src":[21,21],"f":1,"t":18,"d":[939]},{"px":[96,232],"src":[21,111],"f":0,"t":90,"d":[940]},{"px":[104,232],"src":[21,111],"f":0,"t":90,"d":[941]},{"px":[112,232],"src":[21,111],"f":0,"t":90,"d":[942]},{"px":[120,232],"src":[21,111],"f":0,"t":90,"d":[943]},{"px":[128,232],"src":[1,111],"f":0,"t":88,"d":[944]},{"px":[136,232],"src":[21,21],"f":0,"t":18,"d":[945]},{"px":[88,240],"src":[21,21],"f":1,"t":18,"d":[971]},{"px":[96,240],"src":[1,111],"f":0,"t":88,"d":[972]},{"px":[104,240],"src":[21,111],"f":0,"t":90,"d":[973]},{"px":[112,240],"src":[21,111],"f":0,"t":90,"d":[974]},{"px":[120,240],"src":[21,111],"f":0,"t":90,"d":[975]},{"px":[136,240],"src":[21,21],"f":0,"t":18,"d":[977]},{"px":[88,248],"src":[21,21],"f":1,"t":18,"d":[1003]},{"px":[104,248],"src":[1,111],"f":0,"t":88,"d":[1005]},{"px":[112,248],"src":[1,111],"f":0,"t":88,"d":[1006]},{"px":[120,248],"src":[1,111],"f":0,"t":88,"d":[1007]},{"px":[136,248],"src":[21,21],"f":0,"t":18,"d":[1009]}],"entityInstances":[]}],"__neighbours":[{"levelUid":63,"dir":"s"}]}`);

await factory.mountFile(`copperlichtdata/level/ldtk/game/0001-Level_1.ldtkl`,JSON`{"__header__":{"fileType":"LDtk Project JSON","app":"LDtk","doc":"https://ldtk.io/json","schema":"https://ldtk.io/files/JSON_SCHEMA.json","appAuthor":"Sebastien 'deepnight' Benard","appVersion":"0.9.3","url":"https://ldtk.io"},"identifier":"Level_1","uid":63,"worldX":0,"worldY":288,"pxWid":256,"pxHei":256,"__bgColor":"#21263F","bgColor":null,"useAutoIdentifier":true,"bgRelPath":null,"bgPos":null,"bgPivotX":0.5,"bgPivotY":0.5,"__bgPos":null,"externalRelPath":null,"fieldInstances":[{"__identifier":"stupid_int","__value":0,"__type":"Int","defUid":13,"realEditorValues":[]},{"__identifier":"load","__value":"","__type":"String","defUid":16,"realEditorValues":[]},{"__identifier":"create","__value":"","__type":"String","defUid":18,"realEditorValues":[]}],"layerInstances":[{"__identifier":"Entities","__type":"Entities","__cWid":32,"__cHei":32,"__gridSize":8,"__opacity":1,"__pxTotalOffsetX":0,"__pxTotalOffsetY":0,"__tilesetDefUid":null,"__tilesetRelPath":null,"levelId":63,"layerDefUid":68,"pxOffsetX":0,"pxOffsetY":0,"visible":true,"optionalRules":[],"intGridCsv":[],"autoLayerTiles":[],"seed":9990654,"overrideTilesetUid":null,"gridTiles":[],"entityInstances":[{"__identifier":"Entity","__grid":[29,15],"__pivot":[0,0],"__tile":null,"width":16,"height":16,"defUid":65,"px":[232,120],"fieldInstances":[]}]},{"__identifier":"Tiles","__type":"Tiles","__cWid":32,"__cHei":32,"__gridSize":8,"__opacity":1,"__pxTotalOffsetX":0,"__pxTotalOffsetY":0,"__tilesetDefUid":1,"__tilesetRelPath":"../tileset/tiles-no-bleeding.png","levelId":63,"layerDefUid":2,"pxOffsetX":0,"pxOffsetY":0,"visible":true,"optionalRules":[],"intGridCsv":[],"autoLayerTiles":[],"seed":1761564,"overrideTilesetUid":null,"gridTiles":[{"px":[144,48],"src":[71,31],"f":0,"t":31,"d":[210]},{"px":[56,64],"src":[61,41],"f":0,"t":38,"d":[263]},{"px":[16,88],"src":[51,51],"f":0,"t":45,"d":[354]},{"px":[16,96],"src":[51,61],"f":0,"t":53,"d":[386]},{"px":[48,96],"src":[41,51],"f":0,"t":44,"d":[390]},{"px":[152,96],"src":[41,51],"f":0,"t":44,"d":[403]},{"px":[168,96],"src":[71,41],"f":0,"t":39,"d":[405]},{"px":[0,104],"src":[41,41],"f":0,"t":36,"d":[416]},{"px":[8,104],"src":[41,41],"f":0,"t":36,"d":[417]},{"px":[16,104],"src":[41,41],"f":0,"t":36,"d":[418]},{"px":[24,104],"src":[41,41],"f":0,"t":36,"d":[419]},{"px":[32,104],"src":[41,41],"f":0,"t":36,"d":[420]},{"px":[40,104],"src":[41,41],"f":0,"t":36,"d":[421]},{"px":[48,104],"src":[41,41],"f":0,"t":36,"d":[422]},{"px":[56,104],"src":[41,41],"f":0,"t":36,"d":[423]},{"px":[64,104],"src":[31,41],"f":1,"t":35,"d":[424]},{"px":[136,104],"src":[31,41],"f":0,"t":35,"d":[433]},{"px":[144,104],"src":[41,41],"f":0,"t":36,"d":[434]},{"px":[152,104],"src":[41,41],"f":0,"t":36,"d":[435]},{"px":[160,104],"src":[61,61],"f":0,"t":54,"d":[436]},{"px":[168,104],"src":[41,41],"f":0,"t":36,"d":[437]},{"px":[176,104],"src":[31,41],"f":1,"t":35,"d":[438]},{"px":[64,112],"src":[31,51],"f":1,"t":43,"d":[456]},{"px":[136,112],"src":[31,61],"f":0,"t":51,"d":[465]},{"px":[144,112],"src":[41,61],"f":0,"t":52,"d":[466]},{"px":[152,112],"src":[41,61],"f":0,"t":52,"d":[467]},{"px":[160,112],"src":[61,61],"f":0,"t":54,"d":[468]},{"px":[168,112],"src":[41,61],"f":0,"t":52,"d":[469]},{"px":[176,112],"src":[31,61],"f":1,"t":51,"d":[470]},{"px":[64,120],"src":[31,51],"f":1,"t":43,"d":[488]},{"px":[160,120],"src":[61,61],"f":0,"t":54,"d":[500]},{"px":[64,128],"src":[31,51],"f":1,"t":43,"d":[520]},{"px":[160,128],"src":[61,61],"f":0,"t":54,"d":[532]},{"px":[64,136],"src":[31,51],"f":1,"t":43,"d":[552]},{"px":[72,136],"src":[71,11],"f":1,"t":15,"d":[553]},{"px":[80,136],"src":[61,11],"f":0,"t":14,"d":[554]},{"px":[88,136],"src":[61,11],"f":0,"t":14,"d":[555]},{"px":[160,136],"src":[61,61],"f":0,"t":54,"d":[564]},{"px":[64,144],"src":[31,51],"f":1,"t":43,"d":[584]},{"px":[160,144],"src":[61,61],"f":0,"t":54,"d":[596]},{"px":[208,144],"src":[51,51],"f":0,"t":45,"d":[602]},{"px":[64,152],"src":[31,51],"f":1,"t":43,"d":[616]},{"px":[112,152],"src":[41,51],"f":0,"t":44,"d":[622]},{"px":[136,152],"src":[41,51],"f":0,"t":44,"d":[625]},{"px":[160,152],"src":[61,61],"f":0,"t":54,"d":[628]},{"px":[208,152],"src":[51,61],"f":0,"t":53,"d":[634]},{"px":[64,160],"src":[31,51],"f":1,"t":43,"d":[648]},{"px":[96,160],"src":[31,41],"f":0,"t":35,"d":[652]},{"px":[104,160],"src":[41,41],"f":0,"t":36,"d":[653]},{"px":[112,160],"src":[41,41],"f":0,"t":36,"d":[654]},{"px":[120,160],"src":[41,41],"f":0,"t":36,"d":[655]},{"px":[128,160],"src":[41,41],"f":0,"t":36,"d":[656]},{"px":[136,160],"src":[41,41],"f":0,"t":36,"d":[657]},{"px":[144,160],"src":[41,41],"f":0,"t":36,"d":[658]},{"px":[152,160],"src":[41,41],"f":0,"t":36,"d":[659]},{"px":[160,160],"src":[41,41],"f":0,"t":36,"d":[660]},{"px":[168,160],"src":[41,41],"f":0,"t":36,"d":[661]},{"px":[176,160],"src":[41,41],"f":0,"t":36,"d":[662]},{"px":[184,160],"src":[41,41],"f":0,"t":36,"d":[663]},{"px":[192,160],"src":[41,41],"f":0,"t":36,"d":[664]},{"px":[200,160],"src":[41,41],"f":0,"t":36,"d":[665]},{"px":[208,160],"src":[41,41],"f":0,"t":36,"d":[666]},{"px":[216,160],"src":[41,41],"f":0,"t":36,"d":[667]},{"px":[224,160],"src":[41,41],"f":0,"t":36,"d":[668]},{"px":[232,160],"src":[41,41],"f":0,"t":36,"d":[669]},{"px":[240,160],"src":[41,41],"f":0,"t":36,"d":[670]},{"px":[248,160],"src":[41,41],"f":0,"t":36,"d":[671]},{"px":[64,168],"src":[31,51],"f":1,"t":43,"d":[680]},{"px":[96,168],"src":[31,51],"f":0,"t":43,"d":[684]},{"px":[64,176],"src":[31,51],"f":1,"t":43,"d":[712]},{"px":[96,176],"src":[31,51],"f":0,"t":43,"d":[716]},{"px":[0,184],"src":[41,41],"f":0,"t":36,"d":[736]},{"px":[8,184],"src":[41,41],"f":0,"t":36,"d":[737]},{"px":[16,184],"src":[41,41],"f":0,"t":36,"d":[738]},{"px":[24,184],"src":[41,41],"f":0,"t":36,"d":[739]},{"px":[32,184],"src":[41,41],"f":0,"t":36,"d":[740]},{"px":[40,184],"src":[41,41],"f":0,"t":36,"d":[741]},{"px":[48,184],"src":[41,41],"f":0,"t":36,"d":[742]},{"px":[56,184],"src":[41,41],"f":0,"t":36,"d":[743]},{"px":[64,184],"src":[41,41],"f":0,"t":36,"d":[744]},{"px":[72,184],"src":[41,41],"f":0,"t":36,"d":[745]},{"px":[80,184],"src":[41,41],"f":0,"t":36,"d":[746]},{"px":[88,184],"src":[41,41],"f":0,"t":36,"d":[747]},{"px":[96,184],"src":[31,41],"f":1,"t":35,"d":[748]},{"px":[96,192],"src":[31,51],"f":1,"t":43,"d":[780]},{"px":[96,200],"src":[31,51],"f":1,"t":43,"d":[812]},{"px":[96,208],"src":[31,51],"f":1,"t":43,"d":[844]},{"px":[96,216],"src":[31,51],"f":1,"t":43,"d":[876]},{"px":[96,224],"src":[31,51],"f":1,"t":43,"d":[908]},{"px":[96,232],"src":[31,51],"f":1,"t":43,"d":[940]},{"px":[96,240],"src":[31,51],"f":1,"t":43,"d":[972]},{"px":[96,248],"src":[31,51],"f":1,"t":43,"d":[1004]}],"entityInstances":[]}],"__neighbours":[{"levelUid":64,"dir":"s"},{"levelUid":48,"dir":"n"}]}`);

await factory.mountFile(`copperlichtdata/level/ldtk/game/0002-Level_2.ldtkl`,JSON`{"__header__":{"fileType":"LDtk Project JSON","app":"LDtk","doc":"https://ldtk.io/json","schema":"https://ldtk.io/files/JSON_SCHEMA.json","appAuthor":"Sebastien 'deepnight' Benard","appVersion":"0.9.3","url":"https://ldtk.io"},"identifier":"Level_2","uid":64,"worldX":0,"worldY":576,"pxWid":256,"pxHei":256,"__bgColor":"#21263F","bgColor":null,"useAutoIdentifier":true,"bgRelPath":null,"bgPos":null,"bgPivotX":0.5,"bgPivotY":0.5,"__bgPos":null,"externalRelPath":null,"fieldInstances":[{"__identifier":"stupid_int","__value":0,"__type":"Int","defUid":13,"realEditorValues":[]},{"__identifier":"load","__value":"","__type":"String","defUid":16,"realEditorValues":[]},{"__identifier":"create","__value":"","__type":"String","defUid":18,"realEditorValues":[]}],"layerInstances":[{"__identifier":"Entities","__type":"Entities","__cWid":32,"__cHei":32,"__gridSize":8,"__opacity":1,"__pxTotalOffsetX":0,"__pxTotalOffsetY":0,"__tilesetDefUid":null,"__tilesetRelPath":null,"levelId":64,"layerDefUid":68,"pxOffsetX":0,"pxOffsetY":0,"visible":true,"optionalRules":[],"intGridCsv":[],"autoLayerTiles":[],"seed":7280534,"overrideTilesetUid":null,"gridTiles":[],"entityInstances":[{"__identifier":"Entity","__grid":[17,14],"__pivot":[0,0],"__tile":null,"width":16,"height":16,"defUid":65,"px":[136,112],"fieldInstances":[]}]},{"__identifier":"Tiles","__type":"Tiles","__cWid":32,"__cHei":32,"__gridSize":8,"__opacity":1,"__pxTotalOffsetX":0,"__pxTotalOffsetY":0,"__tilesetDefUid":1,"__tilesetRelPath":"../tileset/tiles-no-bleeding.png","levelId":64,"layerDefUid":2,"pxOffsetX":0,"pxOffsetY":0,"visible":true,"optionalRules":[],"intGridCsv":[],"autoLayerTiles":[],"seed":8359793,"overrideTilesetUid":null,"gridTiles":[{"px":[232,0],"src":[41,81],"f":0,"t":68,"d":[29]},{"px":[232,8],"src":[41,81],"f":0,"t":68,"d":[61]},{"px":[232,16],"src":[41,81],"f":0,"t":68,"d":[93]},{"px":[232,24],"src":[41,81],"f":0,"t":68,"d":[125]},{"px":[232,32],"src":[41,81],"f":0,"t":68,"d":[157]},{"px":[232,40],"src":[41,81],"f":0,"t":68,"d":[189]},{"px":[232,48],"src":[41,81],"f":0,"t":68,"d":[221]},{"px":[232,56],"src":[41,81],"f":0,"t":68,"d":[253]},{"px":[232,64],"src":[41,81],"f":0,"t":68,"d":[285]},{"px":[128,72],"src":[71,31],"f":0,"t":31,"d":[304]},{"px":[232,72],"src":[41,81],"f":0,"t":68,"d":[317]},{"px":[232,80],"src":[41,81],"f":0,"t":68,"d":[349]},{"px":[64,88],"src":[11,51],"f":0,"t":41,"d":[360]},{"px":[232,88],"src":[41,81],"f":0,"t":68,"d":[381]},{"px":[232,96],"src":[41,81],"f":0,"t":68,"d":[413]},{"px":[32,104],"src":[61,41],"f":0,"t":38,"d":[420]},{"px":[232,104],"src":[41,81],"f":0,"t":68,"d":[445]},{"px":[232,112],"src":[41,81],"f":0,"t":68,"d":[477]},{"px":[232,120],"src":[41,81],"f":0,"t":68,"d":[509]},{"px":[232,128],"src":[41,81],"f":0,"t":68,"d":[541]},{"px":[168,136],"src":[1,61],"f":0,"t":48,"d":[565]},{"px":[232,136],"src":[41,81],"f":0,"t":68,"d":[573]},{"px":[96,144],"src":[51,31],"f":0,"t":29,"d":[588]},{"px":[168,144],"src":[41,21],"f":0,"t":20,"d":[597]},{"px":[232,144],"src":[41,81],"f":0,"t":68,"d":[605]},{"px":[0,152],"src":[41,11],"f":0,"t":12,"d":[608]},{"px":[8,152],"src":[41,11],"f":0,"t":12,"d":[609]},{"px":[16,152],"src":[41,11],"f":0,"t":12,"d":[610]},{"px":[24,152],"src":[41,11],"f":0,"t":12,"d":[611]},{"px":[32,152],"src":[41,11],"f":0,"t":12,"d":[612]},{"px":[40,152],"src":[41,11],"f":0,"t":12,"d":[613]},{"px":[48,152],"src":[41,11],"f":0,"t":12,"d":[614]},{"px":[56,152],"src":[41,11],"f":0,"t":12,"d":[615]},{"px":[64,152],"src":[41,11],"f":0,"t":12,"d":[616]},{"px":[72,152],"src":[41,11],"f":0,"t":12,"d":[617]},{"px":[80,152],"src":[41,11],"f":0,"t":12,"d":[618]},{"px":[88,152],"src":[41,11],"f":0,"t":12,"d":[619]},{"px":[96,152],"src":[41,11],"f":0,"t":12,"d":[620]},{"px":[104,152],"src":[41,11],"f":0,"t":12,"d":[621]},{"px":[112,152],"src":[41,11],"f":0,"t":12,"d":[622]},{"px":[120,152],"src":[41,11],"f":0,"t":12,"d":[623]},{"px":[128,152],"src":[41,11],"f":0,"t":12,"d":[624]},{"px":[136,152],"src":[41,11],"f":0,"t":12,"d":[625]},{"px":[144,152],"src":[41,11],"f":0,"t":12,"d":[626]},{"px":[152,152],"src":[31,11],"f":1,"t":11,"d":[627]},{"px":[232,152],"src":[41,81],"f":0,"t":68,"d":[637]},{"px":[152,160],"src":[31,21],"f":1,"t":19,"d":[659]},{"px":[184,160],"src":[41,21],"f":0,"t":20,"d":[663]},{"px":[192,160],"src":[41,21],"f":0,"t":20,"d":[664]},{"px":[200,160],"src":[41,21],"f":0,"t":20,"d":[665]},{"px":[208,160],"src":[41,21],"f":0,"t":20,"d":[666]},{"px":[232,160],"src":[41,81],"f":0,"t":68,"d":[669]},{"px":[152,168],"src":[31,21],"f":1,"t":19,"d":[691]},{"px":[232,168],"src":[41,81],"f":0,"t":68,"d":[701]},{"px":[152,176],"src":[31,21],"f":1,"t":19,"d":[723]},{"px":[232,176],"src":[41,81],"f":0,"t":68,"d":[733]},{"px":[152,184],"src":[31,21],"f":1,"t":19,"d":[755]},{"px":[160,184],"src":[71,11],"f":1,"t":15,"d":[756]},{"px":[168,184],"src":[61,11],"f":0,"t":14,"d":[757]},{"px":[232,184],"src":[41,81],"f":0,"t":68,"d":[765]},{"px":[152,192],"src":[31,21],"f":1,"t":19,"d":[787]},{"px":[232,192],"src":[41,81],"f":0,"t":68,"d":[797]},{"px":[152,200],"src":[31,21],"f":1,"t":19,"d":[819]},{"px":[232,200],"src":[41,81],"f":0,"t":68,"d":[829]},{"px":[88,208],"src":[51,71],"f":0,"t":61,"d":[843]},{"px":[152,208],"src":[31,21],"f":1,"t":19,"d":[851]},{"px":[160,208],"src":[41,11],"f":0,"t":12,"d":[852]},{"px":[168,208],"src":[41,11],"f":0,"t":12,"d":[853]},{"px":[176,208],"src":[41,11],"f":0,"t":12,"d":[854]},{"px":[184,208],"src":[41,11],"f":0,"t":12,"d":[855]},{"px":[192,208],"src":[31,11],"f":1,"t":11,"d":[856]},{"px":[232,208],"src":[41,81],"f":0,"t":68,"d":[861]},{"px":[152,216],"src":[31,21],"f":1,"t":19,"d":[883]},{"px":[192,216],"src":[31,21],"f":1,"t":19,"d":[888]},{"px":[232,216],"src":[41,81],"f":0,"t":68,"d":[893]},{"px":[152,224],"src":[31,21],"f":1,"t":19,"d":[915]},{"px":[192,224],"src":[31,21],"f":1,"t":19,"d":[920]},{"px":[224,224],"src":[1,91],"f":0,"t":72,"d":[924]},{"px":[232,224],"src":[41,91],"f":0,"t":76,"d":[925]},{"px":[240,224],"src":[21,91],"f":0,"t":74,"d":[926]},{"px":[152,232],"src":[31,21],"f":1,"t":19,"d":[947]},{"px":[192,232],"src":[31,21],"f":1,"t":19,"d":[952]},{"px":[200,232],"src":[41,101],"f":0,"t":84,"d":[953]},{"px":[208,232],"src":[41,101],"f":0,"t":84,"d":[954]},{"px":[216,232],"src":[41,101],"f":0,"t":84,"d":[955]},{"px":[224,232],"src":[41,101],"f":0,"t":84,"d":[956]},{"px":[232,232],"src":[41,101],"f":0,"t":84,"d":[957]},{"px":[240,232],"src":[41,101],"f":0,"t":84,"d":[958]},{"px":[248,232],"src":[41,101],"f":0,"t":84,"d":[959]},{"px":[152,240],"src":[31,21],"f":1,"t":19,"d":[979]},{"px":[192,240],"src":[31,21],"f":1,"t":19,"d":[984]},{"px":[200,240],"src":[41,81],"f":0,"t":68,"d":[985]},{"px":[208,240],"src":[41,81],"f":0,"t":68,"d":[986]},{"px":[216,240],"src":[41,81],"f":0,"t":68,"d":[987]},{"px":[224,240],"src":[41,81],"f":0,"t":68,"d":[988]},{"px":[232,240],"src":[41,81],"f":0,"t":68,"d":[989]},{"px":[240,240],"src":[41,81],"f":0,"t":68,"d":[990]},{"px":[248,240],"src":[41,81],"f":0,"t":68,"d":[991]},{"px":[152,248],"src":[31,21],"f":1,"t":19,"d":[1011]},{"px":[192,248],"src":[31,21],"f":1,"t":19,"d":[1016]},{"px":[200,248],"src":[41,71],"f":2,"t":60,"d":[1017]},{"px":[208,248],"src":[41,71],"f":2,"t":60,"d":[1018]},{"px":[216,248],"src":[41,71],"f":2,"t":60,"d":[1019]},{"px":[224,248],"src":[41,71],"f":2,"t":60,"d":[1020]},{"px":[232,248],"src":[41,71],"f":2,"t":60,"d":[1021]},{"px":[240,248],"src":[41,71],"f":2,"t":60,"d":[1022]},{"px":[248,248],"src":[41,71],"f":2,"t":60,"d":[1023]}],"entityInstances":[]}],"__neighbours":[{"levelUid":63,"dir":"n"}]}`);

await factory.mountFile(`test.lua`, LUA`
-- Require the library
ldtk = require 'ldtk'

-- Load the .ldtk file
ldtk.load('copperlichtdata/level/ldtk/game.ldtk')

-- Override the callbacks with your game logic.
function ldtk.onEntity(entity)
    -- A new entity is created.
    js_console.log(entity)
end

function ldtk.onLayer(layer)
    -- A new layer is created.
    --[[ 
        The "layer" object has a draw function to draw the whole layer.
        Used like:
            layer:draw()
    ]]
    js_console.log(layer)
end

function ldtk.onLevelLoaded(level)
    -- Current level is about to be changed.
    js_console.log(level)
end

function ldtk.onLevelCreated(level)
    -- Current level has changed.
    js_console.log(level)
end

-- Flip the loading order if needed.
ldtk.setFlipped(true) --false by default

-- Load a level
ldtk.goTo(2)          --loads the second level
ldtk.level('Level_2') --loads the level named cat
ldtk.next()           --loads the next level (or the first if we are in the last)
ldtk.previous()       --loads the previous level (or the last if we are in the first)
ldtk.reload()         --reloads the current level
`);

await engine.doFile('test.lua');