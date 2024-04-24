CL3D.ImmediateEvent = function()
{
    var me = this;

    me.EVENT_ARRAY = [];

	me.action =  new _ccb_action_StoryPrivate();
	me.action._init();
};

CL3D.ImmediateEvent.prototype._run = function()
{
    var me = this;

    for (var index = 0; index < me.EVENT_ARRAY.length; ++index)
    {
        me.action.Event = me.EVENT_ARRAY[index];
		me.action.execute();
    }
};

CL3D.ImmediateEvent.prototype.getVariable = function(event)
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

CL3D.ImmediateEvent.prototype.dispatch = function(macro, event)
{
	var me = this;

	if (event[0].toString() == "[object Object]")
	{
		me.EVENT_ARRAY = event;
		me._run();

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
    me._run();
};