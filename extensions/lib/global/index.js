import AmmoLib from "ammo";
import effekseerLib from "effekseer";

import mitt from "mitt";
import { Rekapi, Actor } from "rekapi";

//import * as FGUI from "fairygui-dom";
//import { toImage, toCanvas, toPng } from "html-to-image";

export * from "./src/ammo-cl3d/main.js";

export * from "./src/utils.js";
export * from "./src/ss6player-cl3d/main.js";

export { FrameEvent } from "./src/frameevent.js";
export { ImmediateEvent } from "./src/immediateevent.js";

/**
 * @type {import("ammo").default}
 */
export const Ammo = await AmmoLib();

/**
 * @type {import("effekseer").default}
 */
export const effekseer = effekseerLib;

export class RekapiActor extends Actor {
    constructor(config) {
        super(config)
    }
};

export const Global = {
    Emitter: mitt(),
    Rekapi: new Rekapi(),

    StateIndex: 0,
    StateList: [],
    StateList: [],

    SaveData:
    {
        "line": 0,
        "define": { "jscode": [] },
        "screenshot": { "name": "", "base64": "" }
    },

    IsSave: false,
    IsLoad: false,
    IsMenu: false,
    IsOption: false,

    MouseOut: false
}

Global.Emitter.on("set_behavior_state", (behavior) => {
    Global.StateList[behavior.StateIndex] = behavior.State;
});
