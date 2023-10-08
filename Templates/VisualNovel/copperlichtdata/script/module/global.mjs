import mitt from './dist/mitt.mjs';
import * as Comlink from "./dist/comlink.mjs";
import { Rekapi, Actor, KeyframeProperty } from './dist/rekapi.mjs';

Global.Emitter = mitt();
Global.Comlink = Comlink;
Global.Actor = Actor;
Global.KeyframeProperty = KeyframeProperty;
Global.Rekapi = Rekapi;

//

import * as fgui from './dist/fairygui.mjs'

Global.fgui = fgui;

//

import { SS6PlayerInstanceKeyParam, SS6Project, SS6Player} from './dist/ss6player-cl3d.mjs';

Global.SS6PlayerInstanceKeyParam = SS6PlayerInstanceKeyParam;
Global.SS6Project = SS6Project;
Global.SS6Player = SS6Player;

//

import Sparticles from './dist/sparticles.mjs';

Global.Sparticles = new Sparticles(document.getElementById("top"));
Global.Sparticles.start();
