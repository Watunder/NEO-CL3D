import FmodLib from './fmodstudio.js';

/**
 * @type {import('./fmodstudio.js').FMOD}
 */
const FMOD = await FmodLib({
    core: null,
    system: null
});

let outObj = {
    val: null
};
let result = 0;

result = FMOD.Studio_System_Create(outObj);

FMOD.system = outObj.val;

result = FMOD.system.getCoreSystem(outObj);

FMOD.core = outObj.val;

console.log(FMOD);
