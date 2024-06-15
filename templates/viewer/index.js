import * as CL3D from "../../externals/cl3d/dist/cl3d.js";

// create the 3d engine
const canvas = document.getElementById('3darea');
const engine = new CL3D.CopperLicht(canvas);

if (!engine.initRenderer(1280, 720, { alpha: false }, canvas))
    throw new Error("this browser doesn't support WebGL");

// add a new 3d scene

let scene = new CL3D.Scene();
engine.addScene(scene);

scene.setBackgroundColor(CL3D.createColor(0, 0, 0, 0));
scene.setRedrawMode(CL3D.Scene.REDRAW_EVERY_FRAME);

// add a user controlled camera with a first person shooter style camera controller
let cam = new CL3D.CameraSceneNode();
cam.Pos = new CL3D.Vect3d(10, 10, 10);
cam.Target = new CL3D.Vect3d(0, 0, 0);

let animator = new CL3D.AnimatorCameraModelViewer(cam, engine);
animator.Radius = 20;
animator.SlidingSpeed = 1000;
animator.RotateSpeed = 1000;
cam.addAnimator(animator);

scene.getRootSceneNode().addChild(cam);
scene.setActiveCamera(cam);

effekseer.initRuntime("effekseerdata/effekseer.wasm", () => {
    let gl = engine.getRenderer().getWebGL();

    EFK.context = effekseer.createContext();
    EFK.context.init(gl);

    // Load effect data
    const effects = [
        "Arrow1.efkefc",
        "Blow1.efkefc",
        "Cure1.efkefc",
        "Light.efkefc",
        "ToonHit.efkefc",
        "ToonWater.efkefc",
        "block.efk",
        "Laser01.efk",
        "Laser02.efk",
        "Simple_Ring_Shape1.efk",
        //"Simple_Ring_Shape2.efk",
        "Simple_Track1.efk",
        "Simple_Ribbon_Parent.efk",
        "Simple_Ribbon_Sword.efk",
        "Simple_Sprite_FixedYAxis.efk"
    ];
    effects.forEach(effect => {
        EFK[effect] = EFK.context.loadEffect(`effekseerdata/Resources/${effect}`);

        let button = document.createElement("input");
        button.type = "button";
        button.value = effect;
        button.onclick = () => { EFK.context.play(EFK[button.value], 0, 0, 0) };

        document.getElementById("buttons").appendChild(button);
    });

    // fast rendering by skipping state fetching.
    // If there is a problem with the drawing, please set this flag to false.
    EFK.context.setRestorationOfStatesFlag(false);

    CL3D.Extensions.draw = () => {
        if (EFK.hasOwnProperty("example")) {
            if (EFK["example"].hasOwnProperty("handle")) {
                if (!EFK["example"]["handle"].exists) {
                    let handle = EFK["example"]["handle"] = EFK.context.play(EFK["example"]);

                    handle.setLocation(0.0, 0.0, 0.0);
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