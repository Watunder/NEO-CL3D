const LUA_LOG = '"[LUA]"';

const factory = Lua.getFactory();
const engine = await factory.createEngine();
engine.global.set('potato',
{
    test: true,
    hello: ['world'],
});
engine.global.get('potato');
engine.doStringSync(`print(${LUA_LOG}, potato.hello[1], potato.test)`);

await factory.mountFile('test.lua', 'return 42');
await engine.doString(`print(${LUA_LOG}, require('test'))`);

let ret;
ret = await engine.doFile('test.lua');
console.log(`[LUA]   ${ret}`);