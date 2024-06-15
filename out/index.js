import * as CL3D from "./cl3d.js";
import { Global, effekseer } from "./global.js";

// CL3D
const canvas = document.getElementById('3darea');
const file = './scenes/copperlichtdata/main.ccbz';
const loading = '\
Loading $PROGRESS$...<br/><br/>\
<img style="max-width:50%" src="scenes/copperlichtdata/coppercubeloadinglogo.png" />';
const color = "#000000";
const error = '\
Error: This browser does not support WebGL (or it is disabled).<br/>\
See <a href=\"http://www.ambiera.com/copperlicht/browsersupport.html\">here</a> for details.';

const engine = CL3D.startCopperLichtFromFile(file, canvas, loading, color, error, true);

engine.OnLoadingComplete = () => {

}

document.oncontextmenu = function(event)
{
    event.preventDefault();
};

document.addEventListener("mouseout", (event) =>
{
    Global.MouseOut = true;
});

globalThis.set_dialogue_text = () => {
    Global.Emitter.emit("set_dialogue_text", "TEST");
}

// Effekseer
const EFK = {};
EFK.context = null;
effekseer.initRuntime(() => {
    let gl = engine.getRenderer().getWebGL();

    EFK.context = effekseer.createContext();
    EFK.context.init(gl);

    // Load effect data
    EFK["example"] = EFK.context.loadEffect("copperlichtdata/effect/Simple_Ring_Shape1.efk", 1.0, () => {
        // Play the loaded effect
        let handle = EFK["example"]["handle"] = EFK.context.play(EFK["example"]);

        // Change a position
        handle.setLocation(10.0, 0.0, 30.0);
        handle.setRotation(0, 0, 0);
    });

    // fast rendering by skipping state fetching.
    // If there is a problem with the drawing, please set this flag to false.
    EFK.context.setRestorationOfStatesFlag(false);

    CL3D.Extensions.draw = () => {
        if (EFK.hasOwnProperty("example")) {
            if (EFK["example"].hasOwnProperty("handle")) {
                if (!EFK["example"]["handle"].exists) {
                    let handle = EFK["example"]["handle"] = EFK.context.play(EFK["example"]);
    
                    handle.setLocation(10.0, 0.0, 30.0);
                    handle.setRotation(0, 0, 0);
                }
            }
        }
    
        // Effekseer Update
        EFK.context.update(0.016 * 60.0);
    
        // Rendering Settings
        if (engine.getScene().getActiveCamera() != null) {
            let camera = engine.getScene().getActiveCamera();
            EFK.context.setProjectionMatrix(camera.Projection.asArray());
            EFK.context.setCameraMatrix(camera.ViewMatrix.asArray());
        }
    
        // Effekseer Rendering
        EFK.context.draw();
    }
});
