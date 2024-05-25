/*
	<behavior jsname="behavior_Menu" description="Menu">
		<property name="Enable_RESIZE" type="bool" default="false" />
		<property name="Font" type="string" default="10; Arial; Normal; Bold; Not Underlined; Swiss" />
		<property name="Menu2_overlayFolder" type="scenenode" />
	</behavior>
*/

// Global variables

let g_self = null;
let g_buttonNodes = [];

function waiting(buttonNodes)
{
	for (let n = 0; n < buttonNodes.length; ++n)
	{
		if (buttonNodes[n].Visible == true)
			return true;
	}

	return false;
}

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
		if (currentNode.getAnimatorOfType("menu"))
		{
			this.animater.run();
		}
		else
		if (currentNode.getAnimatorOfType("slot"))
		{
			console.log(0);
		}
		else
		if (currentNode.getAnimatorOfType("button"))
		{
			ccbGetSceneNodeFromName("Option 1").Visible = false;
			ccbGetSceneNodeFromName("Option 2").Visible = false;
			ccbGetSceneNodeFromName("Option 3").Visible = false;

			CL3D.gScriptingInterface.executeCode(this.animater.JSCode);

			Global.IsMenu = false;
			Global.IsOption = false;

			Global.Emitter.emit("display_dialogue");
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

class _animator_button
{
	constructor(parentNode)
	{
		this.Type = "button";

		this.JSCode = "";
		this.parentNode = parentNode;

		this.Enable_MOVE = false;
		this.State = "nothing";
	}

	getType()
	{
		return this.Type;
	}

	animateNode(currentNode, timeMs)
	{

	}
};

class _animator_slot
{
	constructor(parentNode)
	{
		this.Type = "slot";

		this.parentNode = parentNode;

		this.Enable_MOVE = false;
		this.State = "nothing";
	}

	getType()
	{
		return this.Type;
	}

	animateNode(currentNode, timeMs)
	{

	}
};

class _animator_menu
{
	constructor(parentNode, type)
	{
		this.Type = "menu";

		this.EVENT_HANDLER = function() {};
		this.parentNode = parentNode;

		this.Enable_MOVE = false;
		this.State = "nothing";

		this.lastUpdate = 0;
		this.sound = "";
		this.duration = 0;

		this._init(type);
	}

	_init(type)
	{
		const me = this;

		Global.Emitter.on("pass_sound", (sound) =>
		{
			me.sound = sound;
		});

		switch (type)
		{
			case "skip":
				{
					me.Type2 = "skip";
					me.EVENT_HANDLER = function(timeMs)
					{
						me._runSkip(timeMs);
					};
					CL3D.gScriptingInterface.CurrentlyActiveScene.registerSceneNodeAnimatorForEvents(me);
				}
				break;

			case "auto":
				{
					me.Type2 = "auto";
					me.EVENT_HANDLER = function(timeMs)
					{
						me._runAuto(timeMs);
					};
					CL3D.gScriptingInterface.CurrentlyActiveScene.registerSceneNodeAnimatorForEvents(me);
				}
				break;

			case "save":
				{
					me.Type2 = "save";
					me.EVENT_HANDLER = function()
					{
						me._runSave();
					};
				}
				break;

			case "load":
				{
					me.Type2 = "load";
					me.EVENT_HANDLER = function()
					{
						me._runLoad();
					};
				}
				break;
		}
	}

	_runSkip(timeMs)
	{
		const me = this;

		if (waiting(g_buttonNodes))
		{
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
			return;
		}

		if (timeMs - this.lastUpdate >= 150)
		{
			this.lastUpdate = timeMs;
			Global.Emitter.emit("display_dialogue");
		}
	}

	_runAuto(timeMs)
	{
		const me = this;

		if (waiting(g_buttonNodes))
		{
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
			return;
		}

		if (timeMs - this.lastUpdate >= ccbGetSoundDuration(me.sound))
		{
			this.lastUpdate = timeMs;

			Global.Emitter.emit("display_dialogue");
		}
	}

	_runSave()
	{
		const me = this;

		Global.IsLoad = false;

		if (g_self.Menu2_overlayFolder.Save)
		{
			g_self.Menu2_overlayFolder.Visible = false;
			g_self.Menu2_overlayFolder.Load = false;
			g_self.Menu2_overlayFolder.Save = false;

			Global.IsSave = false;

			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
			return;
		}

		Global.IsSave = true;

		let node = ccbGetChildSceneNode(g_self.Menu2_overlayFolder, 1);
		ccbSetSceneNodeProperty(node, 'Text', "SAVE");
		g_self.Menu2_overlayFolder.Visible = true;
		g_self.Menu2_overlayFolder.Load = false;
		g_self.Menu2_overlayFolder.Save = true;

		ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
	}

	_runLoad()
	{
		const me = this;

		Global.IsSave = false;
		Global.IsMenu = false;
		Global.IsOption = false;

		if (g_self.Menu2_overlayFolder.Load)
		{
			g_self.Menu2_overlayFolder.Visible = false;
			g_self.Menu2_overlayFolder.Load = false;
			g_self.Menu2_overlayFolder.Save = false;

			Global.IsLoad = false;

			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
			return;
		}

		Global.IsLoad = true;

		let node = ccbGetChildSceneNode(g_self.Menu2_overlayFolder, 1);
		ccbSetSceneNodeProperty(node, 'Text', "LOAD");
		g_self.Menu2_overlayFolder.Visible = true;
		g_self.Menu2_overlayFolder.Load = true;
		g_self.Menu2_overlayFolder.Save = false;

		ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
	}

	run()
	{
		const me = this;

		ccbRegisterOnFrameEvent(me.EVENT_HANDLER);
	}

	getType()
	{
		return this.Type;
	}

	animateNode(currentNode, timeMs)
	{

	}

	onMouseDown(event)
	{

	}

	onMouseWheel(delta)
	{

	}

	onMouseUp(event)
	{
		if (this.Type2 == "skip" || this.Type2 == "auto")
		{
			if (event.button == 0)
			{
				ccbUnregisterOnFrameEvent(this.EVENT_HANDLER);
			}
		}
	}

	onMouseMove(event)
	{

	}

	onKeyDown(event)
	{
		return false;
	}

	onKeyUp(event)
	{
		return false;
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

globalThis.behavior_Menu = class behavior_Menu
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

			let childNode = null;
			this.buttonNodes = [];
			for (let i = 0; i < currentNode.Children.length; ++i)
			{
				childNode = ccbGetChildSceneNode(currentNode, i);

				let animator0 = null;
				if (i >= 0 && i <= 3)
				{
					animator0 = new _animator_menu(currentNode, childNode.Name);
					childNode.addAnimator(animator0);
				}
				else
				if (i >= 4 && i <= 6)
				{
					animator0 = new _animator_slot(currentNode);
					childNode.addAnimator(animator0);
				}
				else
				if (i >= 7 && i <= 9)
				{
					g_buttonNodes.push(childNode);
					animator0 = new _animator_button(currentNode);
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

	}

	// parameters: key: key id pressed or left up.  pressed: true if the key was pressed down, false if left up
	onKeyEvent(key, pressed)
	{

	}
};
