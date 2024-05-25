/*
	<behavior jsname="behavior_Menu2" description="Menu2">
		<property name="Enable_RESIZE" type="bool" default="false" />
		<property name="Font" type="string" default="10; Arial; Normal; Bold; Not Underlined; Swiss" />
	</behavior>
*/

// Global variables

let g_self = null;

class _action_OnEnter
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{
		
	}
};

class _action_OnClick
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{
		if (currentNode.getAnimatorOfType("menu2"))
		{
			this.animater.run();
		}
	}
};

class _action_OnLeave
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{
		Global.IsMenu = false;
	}
};

class _animator_menu2
{
	constructor(currentNode, type)
	{
		this.Type = "menu2";

		this.EVENT_HANDLER = function() {};
		this.currentNode = currentNode;

		this.Enable_MOVE = false;
		this.State = "nothing";

		this.lastUpdate = 0;

		this.saveLock = false;
		this.saveData = {};
		this.screenShotName = "";
		this.saveName = rename("save");

		this.saveDialogNode = ccbGetChildSceneNode(this.currentNode, 0);
		this.saveInfoNode = ccbGetChildSceneNode(this.currentNode, 1);
		this.saveSlotNode = ccbGetChildSceneNode(this.currentNode, 2);

		this._init(type);
	}

	_init(type)
	{
		const me = this;

		switch (type)
		{
			case "saveSlot":
			{
				me.Type2 = "saveSlot";
				me.EVENT_HANDLER = function(timeMs)
				{
					me._runSaveSlot(timeMs);
				};
			}
			break;

			case "close":
			{
				me.Type2 = "close";
				me.EVENT_HANDLER = function(timeMs)
				{
					me._runClose();
				};
			}
			break;
		}
	}

	getType()
	{
		return this.Type;
	}

	_runSaveSlot(timeMs)
	{
		const me = this;

		if (Global.IsLoad)
		{
			ccbGetSceneNodeFromName("Option 1").Visible = false;
			ccbGetSceneNodeFromName("Option 2").Visible = false;
			ccbGetSceneNodeFromName("Option 3").Visible = false;

			console.log(me.saveData.line - 1);
			Global.Emitter.emit("display_dialogue", me.saveData.line - 1);

			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
		}
		else
		if (Global.IsSave)
		{
			if (this.saveLock)
			{
				// over write saveData?
			}
			else
			{
				this.saveLock = true;

				CL3D.Enable_ScreenShot = true;

				Global.Emitter.on("pass_screenshot_name", (screenShotName) =>
				{
					me.screenShotName = screenShotName;
					Global.Emitter.off("pass_screenshot_name");
				});
			}

			if (me.screenShotName)
			{
				for (let i = 0; i < Global.SaveData.define.jscode.length; ++i)
				{
					let array = Global.SaveData.define.jscode[i].split("=");

					let name = array[0];
					let value = String(globalThis[array[0]]);
					let _jscode = name + "=" + value;

					Global.SaveData.define.jscode[i] = _jscode;
				}

				ccbSetSceneNodeProperty(me.saveDialogNode, 'Text', "Blank");
				ccbSetSceneNodeProperty(me.saveInfoNode, 'Text', "Blank");
				ccbSetSceneNodeProperty(me.saveSlotNode, 'Text', "Blank");
				ccbSetSceneNodeProperty(me.currentNode, 'Image', ccbLoadTexture(me.screenShotName));

				ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);

				this.saveData = {
					...Global.SaveData
				};

				// localStorage.setItem(rename("save"), JSON.stringify(this.saveData));
				// localforage.setItem(this.saveName, JSON.stringify(this.saveData));
			}
		}
	}
	_runClose()
	{
		const me = this;

		g_self.Visible = false;
		g_self.Load = false;
		g_self.Save = false;

		ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
	}

	run()
	{
		const me = this;

		ccbRegisterOnFrameEvent(me.EVENT_HANDLER);
	}
	
	animateNode(currentNode, timeMs)
	{

	}
};

class _animator_SS6Player
{
	constructor()
	{
		this.Type = "ss6";
	}

	getType()
	{
		return this.Type;
	}

	animateNode(currentNode, timeMs)
	{

	}
};

globalThis.behavior_Menu2 = class behavior_Menu2
{
	constructor()
	{
		this.Type = "font";
		this.Index = null;

		this._Font = new Object();

		this.LastTime = null;

		g_self = this;
	}

	getVariable()
	{
		let array = this.Font.split(/[;]\s/);

		this._Font["Size"] = array[0];
		this._Font["Family"] = array[1];
		this._Font["Name"] = array[2];
		this._Font["Style"] = array[3];
		this._Font["Weight"] = array[4];
		this._Font["Underlined"] = "False";
	}

	setVariable(font)
	{
		let fontname = "#fnt_";

		for (let i in font)
		{
			fontname += font[i] + ";";
		}

		return fontname;
	}

	onAnimate(currentNode, timeMs)
	{
		// first time
		if (this.LastTime == null)
		{
			this.getVariable(this.Font);

			let w = ccbGetScreenWidth();
			let h = ccbGetScreenHeight();

			g_self = currentNode;
			let childNode = null;
			this.buttonNodes = [];
			this.Load = false;
			this.Save = false;
			for (let i = 0; i < currentNode.Children.length; ++i)
			{
				childNode = ccbGetChildSceneNode(currentNode, i);

				let animator0 = null;
				if (i >= 2 && i <= 6)
				{
					animator0 = new _animator_menu2(childNode, childNode.Name);
					childNode.addAnimator(animator0);
				}

				let animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, () =>
				{
					Global.IsMenu = true;
				});
				animator1.TheActionHandler = new _action_OnClick(animator0);

				let animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine);
				animator2.ActionHandlerOnEnter = new _action_OnEnter(animator0);
				animator2.ActionHandlerOnLeave = new _action_OnLeave(animator0);

				let posX = childNode.PosRelativeX * w;
				let posY = childNode.PosRelativeY * h;
				let width = childNode.SizeRelativeWidth * w;
				let height = childNode.SizeRelativeHeight * h;

				childNode.addAnimator(new _animator_SS6Player(posX, posY, width, height, childNode));
				childNode.addAnimator(animator1);
				childNode.addAnimator(animator2);
			}

			this.LastTime = timeMs;
		}

		// enable when event call
		if (this.Enable_RESIZE)
		{
			let font = {
				...this._Font
			};
			font.Size = this._Font.Size * CL3D.gScriptingInterface.Engine.DPR;

			let childNode = null;
			for (let i = 0; i < currentNode.Children.length; i++)
			{
				childNode = ccbGetChildSceneNode(currentNode, i);

				childNode.FontName = this.setVariable(font);
			}

			this.Enable_RESIZE = false;
		}
	}

	// mouseEvent: 0=mouse moved, 1=mouse wheel moved, 2=left mouse up,  3=left mouse down, 4=right mouse up, 5=right mouse down
	onMouseEvent(mouseEvent, mouseWheelDelta)
	{
		if (mouseEvent == 4)
		{
			g_self.Visible = false;
			g_self.Load = false;
			g_self.Save = false;

			Global.IsSave = false;
			Global.IsLoad = false;
		}
	}

	// parameters: key: key id pressed or left up.  pressed: true if the key was pressed down, false if left up
	onKeyEvent(key, pressed)
	{
		if (key == 27)
		{
			g_self.Visible = false;
			g_self.Load = false;
			g_self.Save = false;

			Global.IsSave = false;
			Global.IsLoad = false;
		}
	}
};
