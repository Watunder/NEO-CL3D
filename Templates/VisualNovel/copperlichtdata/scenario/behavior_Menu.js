/*
	<behavior jsname="behavior_Menu" description="Menu">
		<property name="Enable_RESIZE" type="bool" default="false" />
		<property name="Font" type="string" default="10; Arial; Normal; Bold; Not Underlined; Swiss" />
		<property name="Menu2_overlayFolder" type="scenenode" />
	</behavior>
*/
// Global variables
var g_self = null;
var g_buttonNodes = [];
var g_save_exisit = false;
var g_load_exisit = false;

function waiting(buttonNodes)
{
	for (var n = 0; n < buttonNodes.length; ++n)
	{
		if (buttonNodes[n].Visible == true)
			return true;
	}

	return false;
}

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

		Global.Emitter.emit("display_dialogue");
	}
};

var _action_OnLeave = function(animater)
{
	this.animater = animater;
};

_action_OnLeave.prototype.execute = function(currentNode)
{

};

var _animator_button = function(parentNode)
{
	this.Type = "button";

	this.JSCode = "";
	this.parentNode = parentNode;

	this.Enable_MOVE = false;
	this.State = "nothing";
};

_animator_button.prototype.getType = function()
{
	return this.Type;
};

_animator_button.prototype.animateNode = function(currentNode, timeMs)
{
	
};

var _animator_slot = function(parentNode)
{
	this.Type = "slot";

	this.parentNode = parentNode;

	this.Enable_MOVE = false;
	this.State = "nothing";
};

_animator_slot.prototype.getType = function()
{
	return this.Type;
};

_animator_slot.prototype.animateNode = function(currentNode, timeMs)
{
	
};

var _animator_menu = function(parentNode, type)
{
	this.Type = "menu";

	this.EVENT_HANDLER = function(){};
	this.parentNode = parentNode;

	this.Enable_MOVE = false;
	this.State = "nothing";

	this.lastUpdate = 0;
	this.sound = "";
	this.duration = 0;

	this._init(type);
};

_animator_menu.prototype._init = function(type)
{
	var me = this;

	Global.Emitter.on("pass_sound", (sound) =>
	{
		me.sound = sound;
	});

	switch (type)
	{
		case "skip":
		{
			me.Type2 = "skip";
			me.EVENT_HANDLER = function(timeMs){me._runSkip(timeMs)};
			CL3D.gScriptingInterface.CurrentlyActiveScene.registerSceneNodeAnimatorForEvents(me);
		}
		break;

		case "auto":
		{
			me.Type2 = "auto";
			me.EVENT_HANDLER = function(timeMs){me._runAuto(timeMs)};
			CL3D.gScriptingInterface.CurrentlyActiveScene.registerSceneNodeAnimatorForEvents(me);
		}
		break;

		case "save":
		{
			me.Type2 = "save";
			me.EVENT_HANDLER = function(){me._runSave()};
		}
		break;

		case "load":
		{
			me.Type2 = "load";
			me.EVENT_HANDLER = function(){me._runLoad()};
		}
		break;
	}
};

_animator_menu.prototype._runSkip = function(timeMs)
{
	var me = this;

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
};

_animator_menu.prototype._runAuto = function(timeMs)
{
	var me = this;

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
};

_animator_menu.prototype._runSave = function()
{
	var me = this;

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

	var node = ccbGetChildSceneNode(g_self.Menu2_overlayFolder, 1);
	ccbSetSceneNodeProperty(node, 'Text', "SAVE");
	g_self.Menu2_overlayFolder.Visible = true;
	g_self.Menu2_overlayFolder.Load = false;
	g_self.Menu2_overlayFolder.Save = true;

	ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
};

_animator_menu.prototype._runLoad = function()
{
	var me = this;

	Global.IsSave = false;

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

	var node = ccbGetChildSceneNode(g_self.Menu2_overlayFolder, 1);
	ccbSetSceneNodeProperty(node, 'Text', "LOAD");
	g_self.Menu2_overlayFolder.Visible = true;
	g_self.Menu2_overlayFolder.Load = true;
	g_self.Menu2_overlayFolder.Save = false;

	ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
};

_animator_menu.prototype.run = function()
{
	var me = this;

	ccbRegisterOnFrameEvent(me.EVENT_HANDLER);
};

_animator_menu.prototype.getType = function()
{
	return this.Type;
};

_animator_menu.prototype.animateNode = function(currentNode, timeMs)
{
	
};

_animator_menu.prototype.onMouseDown = function(event) 
{
};

_animator_menu.prototype.onMouseWheel = function(delta) 
{
};

_animator_menu.prototype.onMouseUp = function(event) 
{
	if (this.Type2 == "skip" || this.Type2 == "auto")
	{
		if (event.button == 0)
		{
			ccbUnregisterOnFrameEvent(this.EVENT_HANDLER);
		}
	}
};

_animator_menu.prototype.onMouseMove = function(event)
{
};

_animator_menu.prototype.onKeyDown = function(event)
{
	return false;
};

_animator_menu.prototype.onKeyUp = function(event)
{
	return false;
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

behavior_Menu = function()
{
	this.Type = "font";
	this.Index = null;

	this._Font = new Object();

	this.LastTime = null;

	g_self = this;
};

behavior_Menu.prototype.getVariable = function()
{
	var array = this.Font.split(/[;]\s/);

	this._Font["Size"] = array[0];
	this._Font["Family"] = array[1];
	this._Font["Name"] = array[2];
	this._Font["Style"] = array[3];
	this._Font["Weight"] = array[4];
	this._Font["Underlined"] = "False";
};

behavior_Menu.prototype.setVariable = function(font)
{
	var fontname = "#fnt_";

	for(var i in font)
	{
		fontname += font[i] + ";"
	}

	return fontname;
};

behavior_Menu.prototype.onAnimate = function(currentNode, timeMs)
{
	// first time
	if (this.LastTime == null)
	{
		this.getVariable(this.Font);

		var w = ccbGetScreenWidth();
		var h = ccbGetScreenHeight();

		var childNode = null;
		this.buttonNodes = [];
		for(var i = 0; i < currentNode.Children.length; ++i)
		{
			childNode = ccbGetChildSceneNode(currentNode, i);
	
			var animator0 = null;
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
behavior_Menu.prototype.onMouseEvent = function(mouseEvent, mouseWheelDelta)
{

};

// parameters: key: key id pressed or left up.  pressed: true if the key was pressed down, false if left up
behavior_Menu.prototype.onKeyEvent = function(key, pressed)
{

};