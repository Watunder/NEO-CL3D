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