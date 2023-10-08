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

CL3D.SimpleMesh = function(texture, vertices, uvs, indices)
{
    this.init();
    this.name = "";

    this._Mesh = new CL3D.Mesh();
    var buf = new CL3D.MeshBuffer();
    this._Mesh.AddMeshBuffer(buf);

    // set indices and vertices
    buf.Indices = indices;

    this.vertices = vertices;
    this.uvs = uvs;

    this.update(vertices);

	// set the texture of the material
    buf.Mat.Type = 13;
    buf.Mat.BackfaceCulling = false;
	buf.Mat.Tex1 = CL3D.ScriptingInterface.getScriptingInterface().Engine.getTextureManager().getTexture(texture, true);
};
CL3D.SimpleMesh.prototype = new CL3D.SceneNode();

CL3D.SimpleMesh.prototype.update = function(vertices)
{
    var me = this;
    me._Mesh.GetMeshBuffers()[0].Vertices = [];
    me._Mesh.GetMeshBuffers()[0].update(true, true);

    for(var i = 0, len = vertices.length / 2; i < len; i++)
    {
        me._Mesh.GetMeshBuffers()[0].Vertices.push(createVertex( vertices[i * 2], vertices[i * 2 + 1], 0, this.uvs[i * 2], this.uvs[i * 2 + 1]));
    }

    me.vertices = vertices;
};

CL3D.SimpleMesh.prototype.OnRegisterSceneNode = function(scene)
{
    if(this.Visible)
    {
        scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFALUT);
        CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene);
    }
};

CL3D.SimpleMesh.prototype.render = function(renderer)
{
    renderer.setWorld(this.getAbsoluteTransformation());
    renderer.drawMesh(this._Mesh);
};
