import * as CL3D from "./cl3d.js";
import { Global } from "./global.js";

// CL3D
const canvas = document.getElementById('3darea');
const file = './scenes/copperlichtdata/main_ui.ccbz';
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
