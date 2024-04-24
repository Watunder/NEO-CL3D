import mitt from './dist/mitt.mjs';
import * as Comlink from "./dist/comlink.mjs";
import { Rekapi, Actor, KeyframeProperty } from './dist/rekapi.mjs';

Global.Emitter = mitt();
Global.Comlink = Comlink;
Global.Actor = Actor;
Global.KeyframeProperty = KeyframeProperty;
Global.Rekapi = new Rekapi();

//

import * as FairyGUI from './dist/fairygui.mjs'

Global.FairyGUI = FairyGUI;

//

import { VideoContext } from './dist/videocontext.mjs'

let canvas = document.getElementById("video");
Global.VideoContext = new VideoContext(canvas);

//

import { SS6PlayerInstanceKeyParam, SS6Project, SS6Player} from './dist/ss6player-cl3d.mjs';

Global.SS6PlayerInstanceKeyParam = SS6PlayerInstanceKeyParam;
Global.SS6Project = SS6Project;
Global.SS6Player = SS6Player;

// import { CreaturePackage, CreaturePlayer } from './dist/creature-cl3d.mjs';

// Global.CreaturePackage = CreaturePackage;
// Global.CreaturePlayer = CreaturePlayer;

Global.StateIndex = 0;
Global.StateList = [];

Global.Emitter.on("set_behavior_state", (behavior) =>
{
	Global.StateList[behavior.StateIndex] = behavior.State;
});

Global.SaveData =
{
	"line": 0,
	"define": {"jscode": []},
	"screenshot": {"name": "", "base64": ""}
};

Global.IsSave = false;
Global.IsLoad = false;

// //not used

// import { YukaManager } from './dist/yuka-cl3d.mjs'

// Global.YukaManager = new YukaManager();

// import { factory, engine } from './dist/behavior3-cl3d.mjs';

// Global.LuaFactory = factory;
// Global.LuaEngine = engine;

// import { factory as factory1, engine as engine1 } from './dist/ldtk-cl3d.mjs';

// Global.TEST = engine1;