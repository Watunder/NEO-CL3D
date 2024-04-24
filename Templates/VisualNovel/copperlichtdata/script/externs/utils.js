var nameList =
{

};

function rename(name)
{
    if (typeof name !== "string")
        return;

    if (nameList.hasOwnProperty(name))
    {
        var order = String(++nameList[name]);
        var _name = name + "_" + order;

        return _name;
    }

    nameList[name] = 1;
    var _name = name + "_1";

    return _name;
}

Array.prototype.flatAll = function()
{
    var array = this;

	while (array.some(item => Array.isArray(item)))
        array = [].concat(...array);
    
	return array;
}

function createVertex(x, y, z, s, t)
{
    var vtx = new CL3D.Vertex3D(true);

    vtx.Pos.X = x;
    vtx.Pos.Y = y;
    vtx.Pos.Z = z;
    vtx.TCoords.X = s;
    vtx.TCoords.Y = t;
    
    return vtx;
}

function _getVariable(event)
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
}

function _dispatch(macro, event)
{
    var _event = [];

    for (var i = 0; i < event.length; ++i)
    {
        var index = event[i].indexOf(" ");
        var name = event[i].slice(0, index);

        if (macro[name] == null)
        {
            var obj = _getVariable(event[i]);
            _event.push(obj);
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
            
            var obj = _getVariable(tmp_macroEvent);
            _event.push(obj);
        }
    }

    return _event;
}