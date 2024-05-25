// The following embedded xml is for the editor and describes how the behavior can be edited:
// Supported types are: int, float, string, bool, color, vect3d, scenenode, texture, action
/*
	<behavior jsname="behavior_Dialogue" description="Dialogue">
		<property name="ImageExtension" type="string" default=".png" description="Enter the file format for image"/>
		<property name="AudioExtension" type="string" default=".ogg" description="Enter the file format for audio"/>
		<property name="Dialogue_overlayFolder" type="scenenode" />
		<property name="CharacterName_overlayFolder" type="scenenode" />
		<property name="Expression_overlayFolder" type="scenenode" />
		<property name="Avatar_overlayFolder" type="scenenode" />
		<property name="Menu_overlayFolder" type="scenenode" />
		<property name="StoryAction" type="action" />
		<property name="Use_JSON" type="bool" default="false" />
	</behavior>
*/

// Global variables

let g_file = "copperlichtdata/scenario/start.story";
let g_text = "";
let g_start_time = new Date().getTime();
let g_end_time = 0;
let g_sound = "";
let g_line = 0;
let g_defineJSON = "";
let g_defineObj = {};
let g_macroJSON = "";
let g_macroObj = {};

let events = [];
let isSync = false;
let syncEvents = [];
let isBranch = false;
let isBranchCondition = false;
let branchs = [];
let isDefine = false;
let defines = [];
let defineObj = {JSCode:[]};
let isMacro = false;
let isMacroParameter = false;
let macroEvents = [];
let macroObj = {};
let isDialog = false;
let dialogEvents = [];

function waiting(frameEvents, buttonNodes)
{
	for (let i = 0; i < frameEvents.length; ++i)
	{
		if (frameEvents[i].behavior.Enable_MOVE == true)
			return true;
	}

	for (let n = 0; n < buttonNodes.length; ++n)
	{
		if (buttonNodes[n].Visible == true)
			return true;
	}

	return false;
}

function unexpected(reject, line = null, info = null)
{
	reject
	(
	`==================================================\n` +
	`Error Unexpected Syntax\n` +
	`Time: ${g_end_time}\n` +
	`File: ${g_file}\n` +
	`Line: ${line}\n` +
	`Info: ${info}\n` +
	`==================================================\n`
	);
}

globalThis.behavior_Dialogue = class behavior_Dialogue
{
	constructor()
	{
		const me = this;

		Promise.resolve()
		.then(() =>
		{
			return new Promise((resolve) =>
			{
				ccbDoHTTPRequest(`${g_file}`, (data) =>
				{
					ccbSetSceneNodeProperty(ccbGetSceneNodeFromName("TempText"), 'Text', data);
					resolve();
				});
			});
		})
		.then(() =>
		{
			if (!this.Use_JSON)
				return;

			return new Promise((resolve) =>
			{
				ccbDoHTTPRequest(`${g_file}.json`, (data) =>
				{
					ccbSetSceneNodeProperty(ccbGetSceneNodeFromName("TempText"), 'Text', data);
					resolve();
				});
			});
		})
		.then(() =>
		{
			return new Promise((resolve) =>
			{
				ccbDoHTTPRequest("copperlichtdata/scenario/" + "define.json", (data) =>
				{
					g_defineJSON = data;
					g_defineObj = JSON.parse(data);

					Global.SaveData.define.jscode = g_defineObj.JSCode;
					resolve();
				});
			});
		})
		.then(() =>
		{
			return new Promise((resolve) =>
			{
				ccbDoHTTPRequest("copperlichtdata/scenario/" + "macro.json", (data) =>
				{
					g_macroJSON = data;
					g_macroObj = JSON.parse(data);
					resolve();
				});
			});
		})
		.then(() =>
		{
			let text = ccbGetSceneNodeProperty(ccbGetSceneNodeFromName("TempText"), "Text");

			me.frameEvents = [];
			me.buttonNodes = [
				/// TODO
				// ccbGetSceneNodeFromName("menu2"),
				// ccbGetChildSceneNode(this.Menu_overlayFolder, 7),
				// ccbGetChildSceneNode(this.Menu_overlayFolder, 8),
				// ccbGetChildSceneNode(this.Menu_overlayFolder, 9)
			];

			Global.Emitter.on("display_dialogue", (line) =>
			{
				Global.Emitter.emit("do_dialogue_general_event");

				if (waiting(this.frameEvents, this.buttonNodes))
				{
					if (!Global.IsLoad) return;
				}

				if (line >= 0)
				{
					for (let i = 0; i < Global.SaveData.define.jscode.length; ++i)
					{
						let _jscode = Global.SaveData.define.jscode[i];
						CL3D.gScriptingInterface.executeCode(_jscode);
					}

					g_line = line;
					me.displayDialogue(g_line++);
				}

				else
					me.displayDialogue(g_line++);
			});

			if (this.Use_JSON)
			{
				me.readDialogueJSON(text);

				return;
			}

			let lines = text.split('\n');
			let dialogues = [];

			Promise.all(lines.map(async (line, index) =>
			{
				let ret = await me.readDialogueLine(line, index);
				if (ret)
					dialogues.push(ret);
			}))
			.then(() =>
			{
				let defineJSON = JSON.stringify(defineObj);
				if (defineJSON != g_defineJSON)
				{
					g_defineObj = defineObj;
					// let blob = new Blob([defineJSON], {type: "text/plain;charset=utf-8"});
					// saveAs(blob, "define.json");
				}

				let macroJSON = JSON.stringify(macroObj);
				if (macroJSON != g_macroJSON)
				{
					g_macroObj = macroObj;
					// let blob = new Blob([macroJSON], {type: "text/plain;charset=utf-8"});
					// saveAs(blob, "macro.json");
				}

				me.dialogues = dialogues;

				me.dialogues_done = true;
			});
		});
	}
	parseDialogue(line, events, branchs)
	{
		let elements = line.split(':');
		let character = elements[0];
		let expression = elements[1];
		let dialogue = elements[2];
		let sound = elements[3];
		let event = events;
		let branch = branchs;

		// To change text inside $$ to Coppercube variable value if the variable exist
		let startIndex = 0;
		while (startIndex !== -1)
		{
			startIndex = dialogue.indexOf("$", startIndex);
			if (startIndex !== -1)
			{
				let endIndex = dialogue.indexOf("$", startIndex + 1);
				if (endIndex !== -1)
				{
					let variable = dialogue.slice(startIndex + 1, endIndex);
					if (ccbGetCopperCubeVariable(variable))
						dialogue = dialogue.slice(0, startIndex) + ccbGetCopperCubeVariable(variable) + dialogue.slice(endIndex + 1);

					startIndex = startIndex + ccbGetCopperCubeVariable(variable).length;
				}
			}
			else break;
		}

		return (
		{
			character: character,
			expression: expression,
			dialogue: dialogue,
			sound: sound,
			event: event,
			branch: branch
		});
	}
	
	readDialogueLine(line, index)
	{
		const me = this;

		return new Promise((resolve, reject) =>
		{
			// header
			if (line == "\r" || line == "")
			{
				resolve();
			}
			else
			if (line.indexOf("~sync", 0) != -1)
			{
				isSync = isSync ? unexpected(reject, index + 1, "Sync无法嵌套") : true;

				resolve();
			}
			else
			if (line.indexOf("~dialog", 0) != -1)
			{
				isDialog = isDialog ? unexpected(reject, index + 1, "Dialog无法嵌套") : true;

				resolve();
			}
			else
			if (line.indexOf("#define", 0) != -1)
			{
				isDefine = isDefine ? unexpected(reject, index + 1, "Define无法嵌套") : true;

				resolve();
			}
			else
			if (line.indexOf("#branch", 0) != -1)
			{
				isBranch = isBranch ? unexpected(reject, index + 1, "Branch无法嵌套") : true;
				isBranchCondition = true;
			}
			else
			if (line.indexOf("@macro", 0) != -1)
			{
				isMacro = isMacro ? unexpected(reject, index + 1, "Macro无法嵌套") : true;
				isMacroParameter = true;
			}

			// event
			if (line.indexOf("|", 0) != -1)
			{
				let tmp = line.split('|');

				events = tmp.slice(1, tmp.length - 1);

				if (isSync == true)
					syncEvents.push(events);
				else
				if (isDialog == true)
				{
					dialogEvents.push(events);
					events = [];
				}
				else
				if (isBranchCondition == true)
				{
					branchs = [...events];
					isBranchCondition = false;

					events = [];
				}
				else
				if (isDefine == true)
					defines.push(events);
				else
				if (isMacroParameter == true)
				{
					macroEvents.push(events);
					isMacroParameter = false;
				}
				else
				if (isMacro == true)
					macroEvents.push(events);

				resolve();
			}

			// footer
			if (line.indexOf("@endmacro", 0) != -1)
			{
				isMacro = isMacro ? false : unexpected(reject, index + 1, "Macro结构错误");

				if (macroEvents.length <= 1)
				{
					unexpected(reject, index + 1, "Macro结构缺失");
				}
				else
				if (macroEvents[0].length == 0)
				{
					unexpected(reject, index + 1, "Macro结构错误");
				}
				else
				if (macroEvents.length >= 2)
				{
					let macro = macroEvents[0][0].split(/\s/);
					let name = macro[0];

					macroObj[name] = macroEvents.slice(1, macroEvents.length);
					macroObj[name + "_Param"] = [];

					for (let p = 1; p < macro.length; ++p)
					{
						let _macro = macro[p].split("=");
						macroObj[name + "_Param"].push(_macro[1]);
					}
				}

				macroEvents = [];

				resolve();
			}
			else
			if (line.indexOf("#endbranch", 0) != -1)
			{
				isBranch = isBranch ? false : unexpected(reject, index + 1, "Branch无法生效");
				branchs = [];

				resolve();
			}
			else
			if (line.indexOf("#enddefine", 0) != -1)
			{
				isDefine = isDefine ? false : unexpected(reject, index + 1, "Define无法生效");

				let flat_defines = defines.flatAll();

				for (let d = 0; d < flat_defines.length; d++)
				{
					let define = flat_defines[d];
					CL3D.gScriptingInterface.executeCode(define);

					defineObj["JSCode"].push(define);
				}

				defines = [];

				resolve();
			}
			else
			if (line.indexOf("~enddialog", 0) != -1)
			{
				isDialog = isDialog ? false : unexpected(reject, index + 1, "Dialog无法生效");

				let ret = {
					branch: [],
					event: dialogEvents,
					dialog2: true
				};

				dialogEvents = [];

				resolve(ret);
			}
			else
			if (line.indexOf("~endsync", 0) != -1)
			{
				isSync = isSync ? false : unexpected(reject, index + 1, "Sync无法生效");

				events = syncEvents;
				syncEvents = [];

				resolve();
			}

			// dialogue
			if (line.indexOf(":", 0) != -1)
			{
				let ret = me.parseDialogue(line, events, branchs);

				if (events.length != 0)
					events = [];

				resolve(ret);
			}
		})
		.catch((e) =>
		{
			console.log(e);
		});
	}

	readDialogueJSON(text)
	{
		const me = this;

		me.dialogues = JSON.parse(text);

		for (let c = 0; c < g_defineObj.JSCode.length; ++c)
		{
			CL3D.gScriptingInterface.executeCode(g_defineObj.JSCode[c]);
		}
	}

	saveDialogueJSON()
	{
		const me = this;

		for (let l = 0; l < me.dialogues.length; ++l)
		{
			let event = me.dialogues[l].event;
			let eventObj = [];

			if (Array.isArray(event[0]))
			{
				for (let i = 0; i < event.length; ++i)
				{
					eventObj.push(_dispatch(g_macroObj, event[i]));
				}
			}
			else
			if (event.length != 0)
			{
				eventObj = _dispatch(g_macroObj, event);
			}

			me.dialogues[l].event = eventObj;
			eventObj = [];
		}

		let dialoguesJSON = JSON.stringify(me.dialogues);
		let blob = new Blob([dialoguesJSON],
		{
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, "dialogues.json");
	}
	
	displayDialogue(lineIndex)
	{
		const me = this;

		if (me.dialogues.length < g_line)
			return;

		Global.SaveData.line = g_line;

		let index = lineIndex;
		let tmp_branch = me.dialogues[index]["branch"];
		if (tmp_branch.length != 0)
		{
			let ret = CL3D.gScriptingInterface.executeCode(tmp_branch[0]);

			if (!ret)
			{
				me.displayDialogue(g_line++);
				return;
			}
		}

		let dialogue = me.dialogues[index];
		let character = dialogue.character;
		let expression = dialogue.expression;
		let dialogueText = dialogue.dialogue;
		let sound = dialogue.sound;
		let event = dialogue.event;
		let dialog2 = dialogue.dialog2;

		if (!dialog2)
		{
			// TODO: mitt
			Global.Emitter.emit("clear_dialogue");
			Global.Emitter.emit("set_dialogue_mode", "CLEAR");
			let AvatarImage = ccbLoadTexture("copperlichtdata/face/" + character + "/" + expression + me.ImageExtension);
			ccbSetSceneNodeProperty(ccbGetChildSceneNode(this.CharacterName_overlayFolder, 0), 'Text', character);
			ccbSetSceneNodeProperty(ccbGetChildSceneNode(this.Expression_overlayFolder, 0), 'Text', expression);
			ccbSetSceneNodeProperty(ccbGetChildSceneNode(this.Avatar_overlayFolder, 0), 'Image', AvatarImage);
			// ccbSetSceneNodeProperty(ccbGetChildSceneNode(this.Dialogue_overlayFolder, 1), "Draw Text", true);
			// ccbSetSceneNodeProperty(ccbGetChildSceneNode(this.Dialogue_overlayFolder, 1), "Text", dialogueText);
			Global.Emitter.emit("set_dialogue_text", dialogueText);

			// sound playback
			ccbStopSound("copperlichtdata/voice/" + character + "/" + g_sound + me.AudioExtension);
			g_sound = sound;
			ccbPlaySound("copperlichtdata/voice/" + character + "/" + sound + me.AudioExtension);
			Global.Emitter.emit("pass_sound", "copperlichtdata/voice/" + character + "/" + sound + me.AudioExtension);
		}

		if (dialog2)
		{
			Global.Emitter.emit("clear_dialogue");
			Global.Emitter.emit("set_dialogue_mode", "UNCLEAR");

			for (let i = 0; i < event.length; ++i)
			{
				let evt = new CL3D.FrameEvent(me, "dialog");
				evt.dispatch(g_macroObj, event[i]);
			}
		}
		else
		if (Array.isArray(event[0]))
		{
			for (let i = 0; i < event.length; ++i)
			{
				let evt = new CL3D.FrameEvent(me, "sync");
				evt.dispatch(g_macroObj, event[i]);

				me.frameEvents.push(evt);
			}
		}
		else
		if (event.length != 0)
		{
			let evt = new CL3D.FrameEvent(me, "seque");
			evt.dispatch(g_macroObj, event);

			me.frameEvents.push(evt);
		}
	}

	// called every frame. 
	//   'node' is the scene node where this behavior is attached to.
	//   'timeMs' the current time in milliseconds of the scene.
	// Returns 'true' if something changed, and 'false' if not.
	onAnimate(node, timeMs)
	{
		g_end_time = timeMs;
	}

	// parameters: key: key id pressed or left up.  pressed: true if the key was pressed down, false if left up
	onKeyEvent(key, pressed)
	{
		if (Global.IsMenu == true || Global.IsOption == true)
		{
			return;
		}

		// when space pressed
		if (key == 32 && pressed)
		{
			if (!this.dialogues_done)
				return;

			if (waiting(this.frameEvents, this.buttonNodes))
			{
				return;
			}

			this.displayDialogue(g_line++);
		}
	}
	// mouseEvent: 0=mouse moved, 1=mouse wheel moved, 2=left mouse up,  3=left mouse down, 4=right mouse up, 5=right mouse down
	onMouseEvent(mouseEvent, mouseWheelDelta)
	{
		/// TODO
		if (Global.IsMenu == true || Global.IsOption == true)
		{
			return;
		}
		///

		// when left mouse button down
		if (mouseEvent == 2)
		{
			if (!this.dialogues_done)
				return;

			if (waiting(this.frameEvents, this.buttonNodes))
			{
				return;
			}

			this.displayDialogue(g_line++);
		}
		else
		// when right mouse button down
		if (mouseEvent == 4 && Global.IsSave == false && Global.IsLoad == false)
		{
			/// TODO
			this.Dialogue_overlayFolder.Visible = this.Dialogue_overlayFolder.Visible ? false : true;
			this.CharacterName_overlayFolder.Visible = this.CharacterName_overlayFolder.Visible ? false : true;
			this.Expression_overlayFolder.Visible = this.Expression_overlayFolder.Visible ? false : true;
			this.Avatar_overlayFolder.Visible = this.Avatar_overlayFolder.Visible ? false : true;
			//this.Menu_overlayFolder.Visible = this.Menu_overlayFolder.Visible ? false : true;
			////
			CL3D.engine.TextElement.style.opacity = CL3D.engine.TextElement.style.opacity == "0" ? "1" : "0";
		}
	}
};
