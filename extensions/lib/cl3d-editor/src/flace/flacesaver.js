import * as CL3D from "cl3d";
import BinaryStream from "binarystream";
import { saveFile } from "../share/saveFile.js";

export class FlaceSaver {
    constructor() {
        this.Data = new BinaryStream();
    }

    saveDocumentToFile(filepath) {
        this.saveHeader();

        let pos = 0;

        pos = this.startTag(1);
        {
            let pos = this.startTag(1004);
            {
                this.Data.writeInt32LE(0);
            }
            this.endTag(pos);

            this.savePublishSettings();

            for (let index = 0; index < (CL3D.gDocument.Scenes.length); ++index) {
                this.Data.write(new Uint8Array(18)); // unknown data definition
                let pos = this.startTag(2);
                {
                    this.Data.writeInt32LE(0);
                    this.saveSceneParams(CL3D.gDocument.Scenes[index]);
                    let pos = this.startTag(8);
                    {
                        let pos = this.startTag(9);
                        {
                            if (CL3D.gDocument.Scenes[index])
                                this.saveSceneNode(CL3D.gDocument.Scenes[index], CL3D.gDocument.Scenes[index].RootNode, 0);
                        }
                        this.endTag(pos);
                    }
                    this.endTag(pos);
                }
                this.endTag(pos);
            }
        }
        this.endTag(pos);

        pos = this.startTag(12);
        {
            this.saveEmbeddedFiles();
        }
        this.endTag(pos);

        saveFile(filepath, this.Data.buffer);
    }

	ArrayBufferToString(buffer)
	{
		let data = "";
		let array = new Uint8Array(buffer);
		for(let index = 0; index < array.byteLength; index++) data += String.fromCharCode(array[index]);
		return data;
	}

	StringToUint8Array(str)
	{
		let buf = new ArrayBuffer(str.length);
		let bufView = new Uint8Array(buf);
		for (let index=0; index < str.length; index++) {
		  bufView[index] = str.charCodeAt(index);
		}
		return bufView;
	}

	StringToUint16Array(str)
	{
		let buf = new ArrayBuffer(str.length*2);
		let bufView = new Uint16Array(buf);
		for (let index=0; index < str.length; index++) {
		  bufView[index] = str.charCodeAt(index);
		}
		return bufView;
	}

    saveString(str) {
        let buffer = this.StringToUint8Array(str);
        this.Data.writeUInt32LE(buffer.length).write(buffer);
    }

    rgbToInt = function (r, g, b)
    {
        r = r & 0xff;
        g = g & 0xff;
        b = b & 0xff;

        return (r << 16) | (g << 8) | b ;
    }

    /**
     * @param {CL3D.Vect3d} vect3d
     */
	write3DVectF(vect3d)
	{
		this.Data.writeFloat32LE(vect3d.X);
		this.Data.writeFloat32LE(vect3d.Y);
		this.Data.writeFloat32LE(vect3d.Z);
	}

    /**
     * @param {CL3D.Box3d} box3d
     */
	write3DBoxF(box3d)
	{
		this.write3DVectF(box3d.MinEdge);
		this.write3DVectF(box3d.MaxEdge);
	}

	startTag(value)
	{
		let tag = value;
        console.log(tag)
		this.Data.writeUShortLE(tag);
        let pos = this.Data.offset;
        this.Data.writeUInt32LE();
		return pos;
	}

    endTag(pos)
    {
        //console.log(`tag:${this.Data.view.getInt16(pos - 2, true)} size:${this.Data.length - pos - 4}`);
        this.Data.view.setUint32(pos, this.Data.length - pos - 4, true);
    }

    startFlag()
    {
        let pos = this.Data.offset;
        this.Data.writeInt32LE();
        return pos;
    }

    endFlag(pos, value)
    {
        this.Data.view.setUint32(pos, value, true);
    }

    saveHeader()
    {
        this.Data.write(this.StringToUint16Array("flce"));
        this.Data.write(this.StringToUint16Array("0650"));
        this.Data.writeUInt32LE();
    }

    saveEmbeddedFiles()
    {
        let pos = this.startTag(13);
        {
            let flag = 0;
            let name = "";
            let filesize = 0;
            let pos = this.startFlag();
            {
                if (false) {
                    // mesh cache
                    flag += 4;
                }

                if (false) {
                    // script
                    flag += 8;
                }
            }
            this.endFlag(pos, flag);
        }
        this.endTag(pos);
    }

    savePublishSettings()
    {
        // do nothing
    }

    /**
     * @param {CL3D.ActionHandler} actionHandler
     */
    saveActionHandler(actionHandler)
    {
        if (actionHandler) this.Data.writeInt32LE(1);
        else this.Data.writeInt32LE(0);

        let pos = this.startTag(29);
        {
            let pos = this.startTag(30);
            {
                for (let index = 0; index < actionHandler.Actions.length; ++index) {
                    this.saveAction(actionHandler.Actions[index]);
                }
            }
            this.endTag(pos);
        }
        this.endTag(pos);
    }

    /**
     * @param {CL3D.Action} action
     */
    saveAction(action)
    {
        let type = action.Type;
        //console.log(`Action - ${type}`);
        switch(type)
        {
            case "SetOrChangeAVariable":
                this.Data.writeInt32LE(16);
                this.Data.writeInt32LE();
				this.saveString(action.VariableName);
				this.Data.writeInt32LE(action.Operation);
				this.Data.writeInt32LE(action.ValueType);
				this.saveString(action.Value);
                break;
        }
    }

    /**
     * @param {CL3D.Animator} animator
     */
    saveAnimator(animator)
    {
        let type = animator.getType();
        let flag = 0;
        let pos = 0;
        //console.log(`Animator - ${type}`);
        switch(type)
        {
            case "rotation":
                this.Data.writeInt32LE(100);
                this.write3DVectF(animator.Rotation);
                break;
            case "flystraight":
                this.Data.writeInt32LE(101);
                this.write3DVectF(animator.Start);
                this.write3DVectF(animator.End);
                this.Data.writeInt32LE(animator.TimeForWay);
                this.Data.writeBoolean(animator.Loop);
                break;
            case "flycircle":
                this.Data.writeInt32LE(102);
                this.write3DVectF(animator.Center);
                this.write3DVectF(animator.Direction);
                this.Data.writeFloat32LE(animator.Radius);
                this.Data.writeFloat32LE(animator.Speed);
                break;
            case "collisionresponse":
                this.Data.writeInt32LE(103);
                this.write3DVectF(animator.Radius);
                this.Data.writeFloat32LE();
                this.Data.writeFloat32LE(animator.AffectedByGravity);
                this.Data.writeFloat32LE();
                this.write3DVectF(animator.Translation);
                flag = 0;
                pos = this.startFlag();
                {
                    this.Data.writeInt32LE();
                    this.Data.writeInt32LE();
                    this.Data.writeFloat32LE(animator.SlidingSpeed);
                    if (animator.UseInclination) {
                        flag += 1;
                    }
                }
                this.endFlag(pos, flag);
                break;
            case "camerafps":
                this.Data.writeInt32LE(104);
                this.Data.writeFloat32LE(animator.MaxVerticalAngle);
                this.Data.writeFloat32LE(animator.MoveSpeed);
                this.Data.writeFloat32LE(animator.RotateSpeed);
                this.Data.writeFloat32LE(animator.JumpSpeed);
                this.Data.writeBoolean(animator.NoVerticalMovement);
                flag = 0;
                pos = this.startFlag();
                {
                    if (animator.moveByMouseMove == false && animator.moveByMouseDown == true) {
                        flag += 1;
                    }
                    if(animator.MoveSmoothing > 0) {
                        flag += 2;
                        this.Data.writeInt32LE(animator.MoveSmoothing);
                    }
                    if(animator.ChildrenDontUseZBuffer) {
                        flag += 4;
                    }
                }
                this.endFlag(pos, flag);
                break;
            case "cameramodelviewer":
                this.Data.writeInt32LE(105);
                this.Data.writeFloat32LE(animator.Radius);
                this.Data.writeFloat32LE(animator.RotateSpeed);
                this.Data.writeBoolean(animator.NoVerticalMovement);
                flag = 0;
                pos = this.startFlag();
                {
                    if (animator.SlideAfterMovementEnd) {
                        flag += 2;
                        this.Data.writeFloat32LE(animator.SlidingSpeed);
                    }
                    if (animator.AllowZooming) {
                        falg += 4;
                        this.Data.writeFloat32LE(animator.MinZoom);
                        this.Data.writeFloat32LE(animator.MaxZoom);
                        this.Data.writeFloat32LE(animator.ZoomSpeed);
                    }
                }
                this.endFlag(pos, flag);
                break;
            case "followpath":
                this.Data.writeInt32LE(106);
                this.Data.writeInt32LE(animator.TimeNeeded);
                this.Data.writeBoolean(animator.LookIntoMovementDirection);
                this.saveString(animator.PathToFollow);
                this.Data.writeBoolean(animator.OnlyMoveWhenCameraActive);
                this.write3DVectF(animator.AdditionalRotation);
                this.Data.writeByte(animator.EndMode);
                this.saveString(animator.CameraToSwitchTo);
                flag = 0;
                pos = this.startFlag();
                {
                    if (animator.TimeDisplacement) {
                        flag += 1;
                        this.Data.writeInt32LE(TimeDisplacement);
                    }

                    if(animator.EndMode == 3 || animator.EndMode == 4) {
                        this.saveActionHandler(animator.TheActionHandler);
                    }
                }
                this.endFlag(pos, flag);
                break;
            case "onfirstframe":
                this.Data.writeInt32LE(116);
                this.Data.writeBoolean(animator.AlsoOnReload);
                this.Data.writeInt32LE();
                this.saveActionHandler(animator.TheActionHandler);
                break;
        }
    }

    /**
     * @param {CL3D.Material} mat
     */
    saveMaterial(mat) {
        this.Data.writeInt32LE(mat.Type);
		this.Data.writeInt32LE();
		this.Data.writeInt32LE();
		this.Data.writeInt32LE();
		this.Data.writeInt32LE();
		this.Data.writeFloat32LE();
		this.Data.writeInt32LE();
		this.Data.writeInt32LE();
		this.Data.writeBoolean();
		this.Data.writeBoolean();
        this.Data.writeBoolean(mat.Lighting);
		this.Data.writeBoolean(mat.ZWriteEnabled);
        this.Data.writeByte();
        this.Data.writeBoolean(mat.BackfaceCulling);
		this.Data.writeBoolean();
		this.Data.writeBoolean();
		this.Data.writeBoolean();
		for(let index = 0; index < 4; ++index)
		{
            switch (index)
			{
				case 0:
                    mat.Tex1 ? this.saveString(mat.Tex1.Name) : this.saveString("");
					break;
				case 1:
                    mat.Tex2 ? this.saveString(mat.Tex2.Name) : this.saveString("");
					break;
                default:
                    this.saveString("");
                    break;
			}
			this.Data.writeBoolean();
			this.Data.writeBoolean();
			this.Data.writeBoolean();
            switch (index)
			{
				case 0:
					this.Data.writeShortLE(mat.ClampTexture1);
					break;
				case 1:
					break;
			}
		}
    }

    /**
     * @param {CL3D.Free3dScene} scene
     */
    saveSceneParams(scene) {
        let pos = 0;

        pos = this.startTag(26);
        {
            this.saveString(scene.Name);
            this.Data.writeInt32LE(this.rgbToInt(65, 65, 65));
        }
        this.endTag(pos);

        pos = this.startTag(1007);
        {
            this.write3DVectF(new CL3D.Vect3d());
            this.write3DVectF(new CL3D.Vect3d());
        }
        this.endTag(pos);

        pos = this.startTag(1008);
        {
            this.Data.writeFloat32LE(10.0);
        }
        this.endTag(pos);

        pos = this.startTag(1009);
        {
            this.Data.writeBoolean(false);
            this.Data.writeFloat32LE(0.007);
            this.Data.writeInt32LE(this.rgbToInt(200,200,200));
        }
        this.endTag(pos);

        pos = this.startTag(1010);
        {
            this.Data.writeBoolean(false);
            this.Data.writeFloat32LE(1.0);
            this.Data.writeFloat32LE(2.0);
        }
        this.endTag(pos);

        pos = this.startTag(1011);
        {
            this.Data.writeBoolean(false);
            this.Data.writeFloat32LE(0.5);
            this.Data.writeFloat32LE(0.2);
            this.Data.writeFloat32LE(0.001);
            this.Data.writeFloat32LE(0.005);
            this.Data.writeFloat32LE(0.5);
        }
        this.endTag(pos);

        pos = this.startTag(1012);
        {
            for(let index = 0; index < 6; ++index)
                this.Data.writeBoolean(false);
            this.Data.writeInt32LE(2);
            this.Data.writeFloat32LE(0.7);
            this.Data.writeInt32LE(2);
            this.Data.writeInt32LE(this.rgbToInt(255, 0, 0));
            this.Data.writeFloat32LE(0.8);
            this.Data.writeFloat32LE(0.4);
            this.Data.writeFloat32LE(0.55);
        }
        this.endTag(pos);
    }

    /**
     * @param {CL3D.SceneNode} node
     */
    saveSceneNodeParams(node) {
        this.Data.writeInt32LE(node.Type);
        this.Data.writeInt32LE(node.Id);
        this.saveString(node.Name);
        this.write3DVectF(node.Pos);
        this.write3DVectF(node.Rot);
        this.write3DVectF(node.Scale);
        this.Data.writeBoolean(node.Visible);
        this.Data.writeInt32LE(node.Culling);
        console.log(node.Name, node.Type);
    }

    /**
     * @param {CL3D.ColorF} color
     */
    saveColorF(color) {
        this.Data.writeFloatLE(color.R);
        this.Data.writeFloat32LE(color.G);
        this.Data.writeFloat32LE(color.B);
        this.Data.writeFloat32LE(color.A);
    }

    /**
     * @param {CL3D.Free3dScene} scene
     * @param {CL3D.SceneNode} node
     * @param {Number} depth
     */
    saveSceneNode(scene, node, depth) {
        if (depth == 0) {
            this.saveSceneNodeParams(node);

            let pos = 0;

            pos = this.startTag(10);
            {
                this.saveColorF(scene.AmbientLight);
            }
            this.endTag(pos);

            if (node.Animators.length > 0) {
                pos = this.startTag(25);
                {
                    for (let index = 0; index < node.Animators.length; ++index) {
                        this.saveAnimator(node.Animators[index]);
                    }
                }
                this.endTag(pos);

            }

            this.saveSceneNode(scene, node, depth + 1);
        }
        else if (node.Children != null) {
            let currentNode = null;
            let childrenCount = node.Children.length;
            for (let index = 0; index < childrenCount; ++index) {
                currentNode = node.Children[index];

                let pos = 0;

                pos = this.startTag(9);
                {
                    this.saveSceneNodeParams(currentNode);

                    let pos = 0;

                    pos = this.startTag(10)
                    {
                        switch (currentNode.Type) {
                            case 2037085030:
                                console.log("SkyBoxSceneNode");
                                break;
                            case 1752395110:
                                console.log("MeshSceneNode");
                                break;
                            case 1835950438:
                                console.log("AnimatedMeshSceneNode");
                                break;
                            case 1953526632:
                                console.log("HotspotSceneNode");
                                break;
                            case 1819042406:
                                this.saveFlaceBillBoardNode(currentNode);
                                console.log("BillboardSceneNode");
                                break;
                            case 1835098982:
                                this.saveFlaceCameraNode(currentNode);
                                console.log("CameraSceneNode");
                                break;
                            case 1751608422:
                                console.log("LightSceneNode");
                                break;
                            case 1935946598:
                                console.log("SoundSceneNode");
                                break;
                            case 1752461414:
                                console.log("PathSceneNode");
                                break;
                            case 1954112614:
                                console.log("DummyTransformationSceneNode");
                                break;
                            case 1868837478:
                                this.saveFlaceOverlay2DNode(currentNode);
                                console.log("Overlay2DSceneNode");
                                break;
                            case 1668575334:
                                console.log("ParticleSystemSceneNode");
                                break;
                            case 1835283046:
                                console.log("Mobile2DInputSceneNode");
                                break;
                            case 1920103526:
                                console.log("TerrainSceneNode");
                                break;
                            case 1920235366:
                                console.log("WaterSurfaceSceneNode");
                                break;
                            default:
                                console.log("");
                                break;
                        }
                    }
                    this.endTag(pos);

                    if (currentNode.Animators.length > 0) {
                        pos = this.startTag(25);
                        {
                            for (let index = 0; index < currentNode.Animators.length; ++index) {
                                this.saveAnimator(currentNode.Animators[index]);
                            }
                        }
                        this.endTag(pos);
                    }

                    if (currentNode.MeshBuffer) {
                        let pos = this.startTag(11);
                        {
                            this.saveMaterial(currentNode.MeshBuffer.Mat);
                        }
                        this.endTag(pos);
                        this.Data.write(new Uint8Array(18)); // unknown data definition
                    }
                    else if (currentNode.OwnedMesh && currentNode.OwnedMesh.MeshBuffers.length > 0) {
                        let pos = this.startTag(11);
                        {
                            for (let index = 0; index < currentNode.OwnedMesh.MeshBuffers.length; ++index) {
                                this.saveMaterial(currentNode.OwnedMesh.MeshBuffers[index].Mat);
                            }
                        }
                        this.endTag(pos);
                        this.Data.write(new Uint8Array(18)); // unknown data definition
                    }

                    if (currentNode.Children.length > 0) {
                        this.saveSceneNode(scene, currentNode, depth + 1);
                    }
                }
                this.endTag(pos);
            }
        }
    }

	/**
	 * @param {CL3D.BillboardSceneNode} node
	 */
	saveFlaceBillBoardNode(node)
	{
		this.write3DBoxF(node.MeshBuffer.Box);
		this.Data.writeFloat32LE(node.SizeX);
		this.Data.writeFloat32LE(node.SizeY);
		this.Data.writeByte(node.IsVertical + 1);
	}

	/**
	 * @param {CL3D.CameraSceneNode} node
	 */
	saveFlaceCameraNode(node)
	{
		this.write3DBoxF(node.Box);
		this.write3DVectF(node.Target);
		this.write3DVectF(node.UpVector);
		this.Data.writeFloat32LE(node.Fovy);
		this.Data.writeFloat32LE(node.Aspect);
		this.Data.writeFloat32LE(node.ZNear);
		this.Data.writeFloat32LE(node.ZFar);
		this.Data.writeBoolean(node.Active);
	}

	/**
	 * @param {CL3D.Overlay2DSceneNode} node
	 */
    saveFlaceOverlay2DNode(node)
    {
        node.BlurImage ? this.Data.writeInt32LE(1) : this.Data.writeInt32LE(0);
        this.Data.writeBoolean(node.SizeModeIsAbsolute);
		if(node.SizeModeIsAbsolute)
		{
            this.Data.writeInt32LE(node.PosAbsoluteX);
            this.Data.writeInt32LE(node.PosAbsoluteY);
            this.Data.writeInt32LE(node.SizeAbsoluteWidth);
            this.Data.writeInt32LE(node.SizeAbsoluteHeight);
		}
		else
		{
            this.Data.writeFloat32LE(node.PosRelativeX);
            this.Data.writeFloat32LE(node.PosRelativeY);
            this.Data.writeFloat32LE(node.SizeRelativeWidth);
            this.Data.writeFloat32LE(node.SizeRelativeHeight);
		}
        this.Data.writeBoolean(node.ShowBackGround);
        this.Data.writeInt32LE(node.BackGroundColor);
        node.Texture ? this.saveString(node.Texture.Name) : this.saveString("");
        node.TextureHover ? this.saveString(node.TextureHover.Name) : this.saveString("");
        this.Data.writeBoolean(node.RetainAspectRatio);
        this.Data.writeBoolean(node.DrawText);
        this.Data.writeByte(node.TextAlignment);
        this.saveString(node.Text);
        this.saveString(node.FontName);
        this.Data.writeInt32LE(node.TextColor);
        this.Data.writeBoolean(node.AnimateOnHover);
        this.Data.writeBoolean(node.OnHoverSetFontColor);
        this.Data.writeInt32LE(node.HoverFontColor);
        this.Data.writeBoolean(node.OnHoverSetBackgroundColor);
        this.Data.writeInt32LE(node.HoverBackgroundColor);
        this.Data.writeBoolean(node.OnHoverDrawTexture);
    }
};
