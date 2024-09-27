import * as CL3D from "cl3d";
import { getDefinedType } from "./define.js"
import { SceneData, SceneNodeData, DocumentData, SceneParamPanelData, SceneNodeParamPanelData, MaterialPanelData, AnimatorPanelData } from "./data.js";

export class Loader {
    constructor() {
        this.document = new DocumentData();
    }

    readDocument() {
        for (let index = 0; index < CL3D.gDocument.Scenes.length; ++index) {
            const sceneData = this.readSceneParams(CL3D.gDocument.Scenes[index]);
            this.document.Scenes.push(sceneData);
            this.readSceneNode(CL3D.gDocument.Scenes[index], CL3D.gDocument.Scenes[index].RootNode, sceneData, sceneData.RootSceneNode, 0);
        }
    }

    /**
     * @param {CL3D.Action} action
     */
    readAction(action) {

    }

    /**
     * @param {CL3D.Animator} animator
     */
    readAnimator(animator) {
        const animatorPanelData = new AnimatorPanelData();

        animatorPanelData.TheAnimator = animator;

        return animatorPanelData;
    }

    /**
     * @param {CL3D.Material} mat
     */
    readMaterial(mat) {
        const materialPanelData = new MaterialPanelData();

        materialPanelData.TheMat = mat;

        mat.Type;
        mat.Lighting;
        mat.ZWriteEnabled;
        mat.BackfaceCulling;
        // mat.Tex1.Name;
        // mat.Tex2.Name;
        mat.ClampTexture1;

        return materialPanelData;
    }

    /**
     * @param {CL3D.Free3dScene} scene
     */
    readSceneParams(scene) {
        const sceneData = new SceneData();
        const sceneParamPanelData = new SceneParamPanelData();

        sceneParamPanelData.TheScene = scene;

        sceneData.RootSceneNode = this.readSceneNodeParams(scene.RootNode);
        sceneData.SceneParamPanel = sceneParamPanelData;

        return sceneData;
    }

    /**
     * @param {CL3D.SceneNode} node
     */
    readSceneNodeParams(node) {
        const currentNodeData = new SceneNodeData();
        const sceneNodeParamPanelData = new SceneNodeParamPanelData();

        sceneNodeParamPanelData.TheSceneNode = node;

        node.Type;
        node.Id;
        node.Name;
        node.Pos;
        node.Rot;
        node.Scale;
        node.Visible;
        node.Culling;

        currentNodeData.SceneNodeParamPanel = sceneNodeParamPanelData;

        return currentNodeData;
    }

    /**
     * @param {CL3D.Free3dScene} scene
     * @param {CL3D.SceneNode} node
     * @param {Scene} sceneData
     * @param {SceneNode} nodeData
     * @param {Number} depth
     */
    readSceneNode(scene, node, sceneData, nodeData, depth) {
        if (depth == 0) {
            const nodeData = this.readSceneNodeParams(node);
            sceneData.RootSceneNode = nodeData;

            if (node.Animators.length > 0) {
                for (let index = 0; index < node.Animators.length; ++index) {
                    const animatorPanelData = this.readAnimator(node.Animators[index]);
                    nodeData.AnimatorPanels.push(animatorPanelData);
                }
            }

            this.readSceneNode(scene, node, sceneData, nodeData, depth + 1);
        }
        else if (node.Children != null) {
            let currentNode = null;
            let childrenCount = node.Children.length;
            for (let index = 0; index < childrenCount; ++index) {
                currentNode = node.Children[index];

                const currentNodeData = this.readSceneNodeParams(currentNode);
                nodeData.Children.push(currentNodeData);

                if (currentNode.Animators.length > 0) {
                    for (let index = 0; index < currentNode.Animators.length; ++index) {
                        const animatorPanelData = this.readAnimator(currentNode.Animators[index]);
                        currentNodeData.AnimatorPanels.push(animatorPanelData);
                    }
                }

                if (currentNode.MeshBuffer) {
                    const materialPanelData = this.readMaterial(currentNode.MeshBuffer.Mat);
                    currentNodeData.MaterialPanels.push(materialPanelData);
                }
                else if (currentNode.OwnedMesh && currentNode.OwnedMesh.MeshBuffers.length > 0) {
                    for (let index = 0; index < currentNode.OwnedMesh.MeshBuffers.length; ++index) {
                        const materialPanelData = this.readMaterial(currentNode.OwnedMesh.MeshBuffers[index].Mat);
                        currentNodeData.MaterialPanels.push(materialPanelData);
                    }
                }

                if (currentNode.Children.length > 0) {
                    this.readSceneNode(scene, currentNode, sceneData, currentNodeData, depth + 1);
                }
            }
        }
    }
};