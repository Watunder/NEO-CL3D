import * as CL3D from "cl3d";

export class SimpleMeshSceneNode extends CL3D.SceneNode {
    constructor(texture, vertices, uvs, indices) {
        super();

        this.init();

        this._Mesh = new CL3D.Mesh();
        let buf = new CL3D.MeshBuffer();
        this._Mesh.AddMeshBuffer(buf);

        // set indices and vertices
        buf.Indices = indices;

        this.vertices = vertices;
        this.uvs = uvs;

        this.update(vertices);

        // set the texture of the material
        buf.Mat.Type = CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL;
        buf.Mat.BackfaceCulling = false;
        buf.Mat.Tex1 = CL3D.ScriptingInterface.getScriptingInterface().Engine.getTextureManager().getTexture(texture, true);
    }

    update(vertices) {
        const me = this;
        me._Mesh.GetMeshBuffers()[0].Vertices = [];
        me._Mesh.GetMeshBuffers()[0].update(true, true);

        for (let i = 0, len = vertices.length / 2; i < len; i++) {
            me._Mesh.GetMeshBuffers()[0].Vertices.push(CL3D.createSimpleVertex(vertices[i * 2], vertices[i * 2 + 1], 0, this.uvs[i * 2], this.uvs[i * 2 + 1]));
        }

        me.vertices = vertices;
    }

    OnRegisterSceneNode(scene) {
        if (this.Visible) {
            if (this.Parent._Type == "ss6" || this.Parent._Type == "cp") {
                scene.registerNodeForRendering(this, CL3D.Scene.TRANSPARENT_SOLID_AFTER_ZBUFFER_CLEAR);
                CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene);
            }

            else if (this.Parent._Type == "ss6ui") {
                scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_2DOVERLAY);
                CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene);
            }
        }
    }

    render(renderer) {
        renderer.setWorld(this.getAbsoluteTransformation());
        renderer.drawMesh(this._Mesh);
    }
};
