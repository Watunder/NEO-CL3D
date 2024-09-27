import * as CL3D from "cl3d";
import { Global } from "../../index";

/**
 * @param {HTMLCanvasElement} canvas 
 */
CL3D.Extensions.doScreenShot = (canvas) => {
    if (Global.EnableScreenShot == true) {
        Global.EnableScreenShot = false;
        canvas.toBlob((blob) => {
            let data = URL.createObjectURL(blob);

            let tex = new CL3D.Texture();
            tex.Name = rename("ScreenShot");

            Global.SaveData.screenshot.name = tex.Name;
            Global.SaveData.screenshot.base64 = data;

            tex.Image = new Image();
            tex.Image.onload = function () {
                const engine = CL3D.ScriptingInterface.getScriptingInterface().Engine;
                engine.getTextureManager().addTexture(tex);
                engine.getRenderer().finalizeLoadedImageTexture(tex);

                tex.Loaded = true;

                Global.Emitter.emit("pass_screenshot_name", Global.SaveData.screenshot.name);
            }
            tex.Image.src = data;
        }, "image/jpg", 0.3);
    }
}