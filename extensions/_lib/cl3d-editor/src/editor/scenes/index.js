import * as CL3D from "cl3d";

const canvas = document.getElementById('3darea');
const engine = new CL3D.CopperLicht(canvas, null, null, null, true);

if (!engine.initRenderer(1920, 1080, { alpha: false }, canvas))
    throw new Error("this browser doesn't support WebGL");

const editorScene = new CL3D.Scene();
engine.addScene(editorScene);

editorScene.setBackgroundColor(CL3D.createColor(255, 65, 65, 65));
editorScene.setRedrawMode(CL3D.Scene.REDRAW_EVERY_FRAME);