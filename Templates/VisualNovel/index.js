document.oncontextmenu = function(event)
{
    event.preventDefault();
};

document.addEventListener("mouseout", (event) =>
{
    Global.MouseOut = true;
});

// CL3D
var canvas = '3darea';
var file = 'scenes/copperlichtdata/main.ccbz';
var loading = '\
Loading $PROGRESS$...<br/><br/>\
<img style="max-width:50%" src="scenes/copperlichtdata/coppercubeloadinglogo.png" />';
var error = '\
Error: This browser does not support WebGL (or it is disabled).<br/>\
See <a href=\"http://www.ambiera.com/copperlicht/browsersupport.html\">here</a> for details.';

CL3D.engine = startCopperLichtFromFile(canvas, file, loading, error, true, true, "#000000");

CL3D.engine.OnLoadingComplete = function()
{
    _addScenesFromDocument("scenes/copperlichtdata/main_menu.ccbz", ccbGetSceneNodeFromName("dialogue"));
}

// CreateJS
var queue = new createjs.LoadQueue(false);
queue.on("fileload", handleFileComplete);
queue.loadManifest([
    "copperlichtdata/face/NVL Girl/idle.png",
    "copperlichtdata/face/NVL Girl/smile.png",
    "copperlichtdata/sprite/MeshBone/Knight.png",
    "copperlichtdata/sprite/MeshBone/Effect.png",
    "copperlichtdata/sprite/raptor.png"
]);

function handleFileComplete(event)
{
    var tex = new CL3D.Texture();
    tex.Image = event.result;
    tex.Name = event.item.src;

    CL3D.ScriptingInterface.getScriptingInterface().Engine.getTextureManager().addTexture(tex);
    CL3D.engine.getRenderer().finalizeLoadedImageTexture(tex);

    tex.Loaded = true;
};

// Wasmoon
// var Wasmoon = {};
// Wasmoon.getFactory = function(env)
// {
// 	return new wasmoon.LuaFactory(undefined, env);
// }

// FMOD
var FMOD = {};
FMOD.core = null;
FMOD.system = null;
FMOD['INITIAL_MEMORY'] = 64*1024*1024;

FMOD.onRuntimeInitialized = function()
{
    fmodMain();
};

// Simple error checking function for all FMOD return values.
FMOD.CHECK_RESULT = function(result)
{
    if (result != FMOD.OK)
    {
        var msg = "Error!!! '" + FMOD.ErrorString(result) + "'";

        alert(msg);

        throw msg;
    }
};

FMOD.prerun = function()
{
    var fileUrl = "/copperlichtdata/sound/bank/";
    var fileName;
    var folderName = "/";
    var canRead = true;
    var canWrite = false;

    fileName =
    [
        "Dialogue_CN.bank",
        "Dialogue_EN.bank",
        "Dialogue_JP.bank",
    ];

    for (var count = 0; count < fileName.length; count++)
        FMOD.FS_createPreloadedFile(folderName, fileName[count], fileUrl + fileName[count], canRead, canWrite);
};
FMODModule(FMOD);

function fmodMain()
{
    // A temporary empty object to hold our FMOD.system
    var outObj = {};
    var result;

    console.log("Creating FMOD System object\n");

    // Create the FMOD.system and check the result
    result = FMOD.Studio_System_Create(outObj);
    FMOD.CHECK_RESULT(result);

    console.log("grabbing FMOD.system object from temporary and storing it\n");

    // Take out our System object
    FMOD.system = outObj.val;

    result = FMOD.system.getCoreSystem(outObj);
    FMOD.CHECK_RESULT(result);

    FMOD.core = outObj.val;

    // Optional.  Setting DSP Buffer size can affect latency and stability.
    // Processing is currently done in the main thread so anything lower than 2048 samples can cause stuttering on some devices.
    console.log("set DSP Buffer size.\n");
    result = FMOD.core.setDSPBufferSize(2048, 2);
    FMOD.CHECK_RESULT(result);

    // Optional.  Set sample rate of mixer to be the same as the OS output rate.
    // This can save CPU time and latency by avoiding the automatic insertion of a resampler at the output stage.
    // console.log("Set mixer sample rate");
    // result = gSystemCore.getDriverInfo(0, null, null, outObj, null, null);
    // FMOD.CHECK_RESULT(result);
    // result = gSystemCore.setSoftwareFormat(outObj.val, FMOD.SPEAKERMODE_DEFAULT, 0)
    // FMOD.CHECK_RESULT(result);

    console.log("initialize FMOD\n");

    // 1024 virtual channels
    result = FMOD.system.initialize(1024, FMOD.STUDIO_INIT_NORMAL, FMOD.INIT_NORMAL, null);
    FMOD.CHECK_RESULT(result);

    // Starting up your typical JavaScript application loop
    console.log("initialize Application\n");

    (function fmodLoop()
    {
        requestAnimationFrame(fmodLoop);
    })();

    return FMOD.OK;
};

// Creature
/*
var CreatureModule = {};
CreatureModule.packageMgr = null;

CreatureModule.loadFile = function(filePath, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = function () { return callback(this.response); };
    xhr.open("GET", filePath, true);
    xhr.responseType = "arraybuffer";
    xhr.send();
};

CreatureModule.heapBytes = function(wasmModule, typedArray)
{
    var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    var ptr = wasmModule._malloc(numBytes);
    var heapBytes = new Uint8Array(wasmModule.HEAPU8.buffer, ptr, numBytes);
    heapBytes.set(new Uint8Array(typedArray.buffer));
    return heapBytes;
};

CreatureModule.onRuntimeInitialized = function()
{
    CreatureMain();
};

function CreatureMain()
{
    CreatureModule.packageMgr = new CreatureModule.PackManager();
    console.log("initialize Creature\n");
};
*/

// Effekseer
var EFK = {};
EFK.context = null;
effekseer.initRuntime('copperlichtdata/script/wasm/effekseer.wasm', () =>
{
    effekseerMain();
});

function effekseerMain()
{
    // var canvas = document.getElementById("effect");
    // var gl = canvas.getContext("webgl2");
    var gl = CL3D.engine.getRenderer().getWebGL();

    EFK.context = effekseer.createContext();
    EFK.context.init(gl);

    // Load effect data
    EFK["ToonHit"] = EFK.context.loadEffect("copperlichtdata/effect/sample/ToonHit.efkefc", 1.0, () =>
    {
        // Play the loaded effect
        var handle = EFK["ToonHit"]["handle"] = EFK.context.play(EFK["ToonHit"]);

        // Change a position
        handle.setLocation(10.0, 0.0, 30.0);
        handle.setRotation(0,0,0);
    });

    // fast rendering by skipping state fetching.
    // If there is a problem with the drawing, please set this flag to false.
    EFK.context.setRestorationOfStatesFlag(false);

    CL3D.engine.OnEffekseerDraw = function()
    {
        if(EFK.hasOwnProperty('ToonHit'))
        {
            if(EFK["ToonHit"].hasOwnProperty('handle'))
            {
                if(!EFK["ToonHit"]["handle"].exists)
                {
                    var handle = EFK["ToonHit"]["handle"] = EFK.context.play(EFK["ToonHit"]);

                    handle.setLocation(10.0, 0.0, 30.0);
                    handle.setRotation(0,0,0);
                }
            }
        }

        // Effekseer Update
        EFK.context.update(0.016 * 60.0);

        // Rendering Settings
        if(CL3D.engine.getScene().getActiveCamera() != null)
        {
            var camera = CL3D.engine.getScene().getActiveCamera();
            EFK.context.setProjectionMatrix(camera.Projection.asArray());
            EFK.context.setCameraMatrix(camera.ViewMatrix.asArray());
        }

        // Effekseer Rendering
        EFK.context.draw();

        // Viewport Resize
        // if (EFK.width != canvas.width || EFK.height != canvas.height)
        // {
        // 	EFK.width = canvas.width;
        // 	EFK.height = canvas.height;

        // 	gl.viewport(0, 0, EFK.width, EFK.height);
        // }
    };
};

CL3D.engine.OnAfterDrawAll = function()
{

};
