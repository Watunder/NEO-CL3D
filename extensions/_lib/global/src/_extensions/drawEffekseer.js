import * as CL3D from "cl3d";
import EffekseerLib from "effekseer";

/**
 * @type {import("effekseer").default}
 */
const Effekseer = EffekseerLib;

export const EFK = {
    context: null
};

export const initEffekseer = () => {
    Effekseer.initRuntime(() => {
        const engine = CL3D.ScriptingInterface.getScriptingInterface().Engine;
        let gl = engine.getRenderer().getWebGL();

        EFK.context = Effekseer.createContext();
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
}