import mitt from "mitt";
import { Rekapi } from "rekapi";

export { Actor } from "rekapi";

export * from "./src/utils.js";
export * from "./src/ss6player-cl3d/main.js";

export { FrameEvent } from "./src/frameevent.js";
export { ImmediateEvent } from "./src/immediateevent.js";

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
