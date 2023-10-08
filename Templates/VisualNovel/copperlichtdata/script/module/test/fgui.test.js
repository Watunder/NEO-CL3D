import * as fgui from '../dist/fairygui.mjs'

async function fguiMain()
{
    await fgui.UIPackage.loadPackage("copperlichtdata/ui/sample/Package1");

    let view = fgui.UIPackage.createObject("Package1", "Main");
    view.makeFullScreen();

    fgui.GRoot.inst.addChild(view);
}

fguiMain();