CL3D.FrameEvent = function(context, type = "seque")
{
	var me = this;

    me.context = context;
	me.firstTime = true;
	me.behavior = null;

	me.EVENT_ARRAY = [];
	me.EVENT_INDEX = 0;

	me.EVENT_HANDLER = function(){};

	me._init(type);
};

CL3D.FrameEvent.prototype._init = function(type)
{
	var me = this;

	me.action =  new _ccb_action_StoryPrivate();
	me.action._init();

	switch (type)
	{
		case "seque":
		me.EVENT_HANDLER = function(){me._runSeque()};
		break;

		case "sync":
		me.EVENT_HANDLER = function(){me._runSync()};
		break;

		case "dialog":
		me.EVENT_HANDLER = function(){me._runDialog()};
		break;
	}
};

CL3D.FrameEvent.prototype._runSeque = function()
{
	var me = this;

	if (me.firstTime == true)
	{
		Global.Emitter.on("pass_behavior", (behavior) =>
		{
			me.behavior = behavior;
			Global.Emitter.off("pass_behavior");
		});

		// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
		me.action.Event = me.EVENT_ARRAY[0];
		me.action.execute();
		
		me.firstTime = false;
	}
	else
	{
		for (var i = 0; i < Global.StateList.length; ++i)
		{
			if (Global.StateList[i] != "nothing")
				return;
		}
		
		// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
		me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
		me.action.execute();
	}

	if (me.EVENT_INDEX == me.EVENT_ARRAY.length)
	{
		me.EVENT_INDEX = 0;
		ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
	}
};

CL3D.FrameEvent.prototype._runSync = function()
{
	var me = this;

	if (me.firstTime == true)
	{
		Global.Emitter.on("pass_behavior", (behavior) =>
		{
			me.behavior = behavior;
			Global.Emitter.off("pass_behavior");
		});

		// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
		me.action.Event = me.EVENT_ARRAY[0];
		me.action.execute();
		
		me.firstTime = false;
	}
	else
	if (me.behavior.State == "nothing")
	{
		// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
		me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
		me.action.execute();
	}
	
	if (me.EVENT_INDEX == me.EVENT_ARRAY.length)
	{
		me.EVENT_INDEX = 0;
		ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
	}
};

CL3D.FrameEvent.prototype._runDialog = function()
{
	var me = this;

	if (me.firstTime == true)
	{
		Global.Emitter.on("pass_behavior", (behavior) =>
		{
			me.behavior = behavior;
			Global.Emitter.off("pass_behavior");
		});

		// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
		me.action.Event = me.EVENT_ARRAY[0];
		me.action.execute();
		
		me.firstTime = false;
	}
	else
	if (me.behavior.State == "nothing")
	{
		// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
		me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
		me.action.execute();
	}

	if (me.EVENT_INDEX == me.EVENT_ARRAY.length)
	{
		me.EVENT_INDEX = 0;
		ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
	}
};

CL3D.FrameEvent.prototype.getVariable = function(event)
{
	if (event.length == 0)
		return null;

	if (event[0] == " ")
		return;

	var array1 = event.split(/\s/);

	var obj = new Object();

	obj["name"] = array1[0];

	var array2 = array1.slice(1);
	for (var i=0; i<array2.length; ++i)
	{
		var array3 = array2[i].split("=");

		if (array3[0] == "")
			continue;

		if (array3[0][0] == "#")
		{
			var define = array2[i].slice(1);
			obj["define"] += ";" + define;
			continue;
		}

        if (array3[1] == null)
            obj["default"] = array3[0];
        else
            obj[array3[0]] = array3[1];
	}

	return obj;
};

CL3D.FrameEvent.prototype.dispatch = function(macro, event)
{
	var me = this;

	if (event[0].toString() == "[object Object]")
	{
		me.EVENT_ARRAY = event;
		ccbRegisterOnFrameEvent(me.EVENT_HANDLER);

		return;
	}

	var _event = [];

	for (var i = 0; i < event.length; ++i)
	{
		var index = event[i].indexOf(" ");
		var name = event[i].slice(0, index);

		if (macro[name] == null)
		{
			var obj = me.getVariable(event[i]);
			_event.push(JSON.stringify(obj));
			continue;
		};

		var flat_macroObj = macro[name].flatAll();

		for (var p = 0; p < flat_macroObj.length; ++p)
		{
			var tmp_macroEvent = flat_macroObj[p];
			
			for (var c = 0; c < macro[name+"_Param"].length; ++c)
			{
				tmp_macroEvent = tmp_macroEvent.replaceAll(macro[name+"_Param"][c], event[i].split(/\s/)[c+1].split("=")[1]);
			}
			
			var obj = me.getVariable(tmp_macroEvent);
			_event.push(JSON.stringify(obj));
		}
	}
	
	me.EVENT_ARRAY = _event;
	ccbRegisterOnFrameEvent(me.EVENT_HANDLER);
};