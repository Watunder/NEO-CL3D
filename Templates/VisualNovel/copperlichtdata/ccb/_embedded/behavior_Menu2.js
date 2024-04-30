/*
	<behavior jsname="behavior_Menu2" description="Menu2">
		<property name="Enable_RESIZE" type="bool" default="false" />
		<property name="Font" type="string" default="10; Arial; Normal; Bold; Not Underlined; Swiss" />
	</behavior>
*/
// Global variables
var g_self = null;

var _action_OnEnter = function(animater)
{
	this.animater = animater;
};

_action_OnEnter.prototype.execute = function(currentNode)
{

};

var _action_OnClick = function(animater)
{
	this.animater = animater;
};

_action_OnClick.prototype.execute = function(currentNode)
{
	if (currentNode.getAnimatorOfType("menu2"))
	{
		this.animater.run();
	}
};

var _action_OnLeave = function(animater)
{
	this.animater = animater;
};

_action_OnLeave.prototype.execute = function(currentNode)
{

};

var _animator_menu2 = function(currentNode, type)
{
	this.Type = "menu2";

	this.EVENT_HANDLER = function(){};
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
};

_animator_menu2.prototype._init = function(type)
{
	var me = this;

	switch (type)
	{
		case "saveSlot":
		{
			me.Type2 = "saveSlot";
			me.EVENT_HANDLER = function(timeMs){me._runSaveSlot(timeMs)};
		}
		break;

		case "close":
		{
			me.Type2 = "close";
			me.EVENT_HANDLER = function(timeMs){me._runClose()};
		}
		break;
	}
};

_animator_menu2.prototype.getType = function()
{
	return this.Type;
};

_animator_menu2.prototype._runSaveSlot = function(timeMs)
{
	var me = this;
	
	if (Global.IsLoad)
	{
		ccbGetSceneNodeFromName("Option 1").Visible = false;
		ccbGetSceneNodeFromName("Option 2").Visible = false;
		ccbGetSceneNodeFromName("Option 3").Visible = false;

		console.log(me.saveData.line - 1)
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
			for (var i = 0; i < Global.SaveData.define.jscode.length; ++i)
			{
				var array = Global.SaveData.define.jscode[i].split("=");
		
				var name = array[0];
				var value = String(globalThis[array[0]]);
				var _jscode = name + "=" + value;
		
				Global.SaveData.define.jscode[i] = _jscode;
			}
	
			ccbSetSceneNodeProperty(me.saveDialogNode, 'Text', "Blank");
			ccbSetSceneNodeProperty(me.saveInfoNode, 'Text', "Blank");
			ccbSetSceneNodeProperty(me.saveSlotNode, 'Text', "Blank");
			ccbSetSceneNodeProperty(me.currentNode, 'Image', ccbLoadTexture(me.screenShotName));
	
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
	
			this.saveData = {...Global.SaveData};
	
			// localStorage.setItem(rename("save"), JSON.stringify(this.saveData));
			// localforage.setItem(this.saveName, JSON.stringify(this.saveData));
		}
	}
};

_animator_menu2.prototype._runClose = function()
{
	var me = this;

	g_self.Visible = false;
	g_self.Load = false;
	g_self.Save = false;

	ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
};

_animator_menu2.prototype.run = function()
{
	var me = this;

	ccbRegisterOnFrameEvent(me.EVENT_HANDLER);
};

_animator_menu2.prototype.animateNode = function(currentNode, timeMs)
{
	
};

var _animator_SS6Player = function()
{
	this.Type = "ss6";
};

_animator_SS6Player.prototype.getType = function()
{
	return this.Type;
};

_animator_SS6Player.prototype.animateNode = function(currentNode, timeMs)
{

};

behavior_Menu2 = function()
{
	this.Type = "font";
	this.Index = null;

	this._Font = new Object();

	this.LastTime = null;

	g_self = this;
};

behavior_Menu2.prototype.getVariable = function()
{
	var array = this.Font.split(/[;]\s/);

	this._Font["Size"] = array[0];
	this._Font["Family"] = array[1];
	this._Font["Name"] = array[2];
	this._Font["Style"] = array[3];
	this._Font["Weight"] = array[4];
	this._Font["Underlined"] = "False";
};

behavior_Menu2.prototype.setVariable = function(font)
{
	var fontname = "#fnt_";

	for(var i in font)
	{
		fontname += font[i] + ";"
	}

	return fontname;
};

behavior_Menu2.prototype.onAnimate = function(currentNode, timeMs)
{
	// first time
	if (this.LastTime == null)
	{
		this.getVariable(this.Font);

		var w = ccbGetScreenWidth();
		var h = ccbGetScreenHeight();

		g_self = currentNode;
		var childNode = null;
		this.buttonNodes = [];
		this.Load = false;
		this.Save = false;
		for(var i = 0; i < currentNode.Children.length; ++i)
		{
			childNode = ccbGetChildSceneNode(currentNode, i);
	
			var animator0 = null;
			if (i >= 2 && i <= 6)
			{
				animator0 = new _animator_menu2(childNode, childNode.Name);
				childNode.addAnimator(animator0);
			}

			var animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine);
			animator1.TheActionHandler = new _action_OnClick(animator0);
			
			var animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine);
			animator2.ActionHandlerOnEnter = new _action_OnEnter(animator0);
			animator2.ActionHandlerOnLeave = new _action_OnLeave(animator0);

			var posX = childNode.PosRelativeX * w;
			var posY = childNode.PosRelativeY * h;
			var width = childNode.SizeRelativeWidth * w;
			var height = childNode.SizeRelativeHeight * h;
			
			childNode.addAnimator(new _animator_SS6Player(posX, posY, width, height, childNode));
			childNode.addAnimator(animator1);
			childNode.addAnimator(animator2);
		}

		this.LastTime = timeMs;
	}

	// enable when event call
	if (this.Enable_RESIZE)
	{
		var font = {...this._Font};
		font.Size = this._Font.Size * CL3D.gScriptingInterface.Engine.DPR;
	
		var childNode = null;
		for(var i = 0; i < currentNode.Children.length; i++)
		{
			childNode = ccbGetChildSceneNode(currentNode, i);
	
			childNode.FontName = this.setVariable(font);
		}
	
		this.Enable_RESIZE = false;
	}
};

// mouseEvent: 0=mouse moved, 1=mouse wheel moved, 2=left mouse up,  3=left mouse down, 4=right mouse up, 5=right mouse down
behavior_Menu2.prototype.onMouseEvent = function(mouseEvent, mouseWheelDelta)
{
	if (mouseEvent == 4)
	{
		g_self.Visible = false;
		g_self.Load = false;
		g_self.Save = false;

		Global.IsSave = false;
		Global.IsLoad = false;
	}
};

// parameters: key: key id pressed or left up.  pressed: true if the key was pressed down, false if left up
behavior_Menu2.prototype.onKeyEvent = function(key, pressed)
{
	if (key == 27)
	{
		g_self.Visible = false;
		g_self.Load = false;
		g_self.Save = false;

		Global.IsSave = false;
		Global.IsLoad = false;
	}
};