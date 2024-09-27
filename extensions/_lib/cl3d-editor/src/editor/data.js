import * as CL3D from "cl3d";

export class SceneNodeData {
    /**
     * @type {SceneNodeParamPanelData}
     */
    SceneNodeParamPanel;
    /**
     * @type {MaterialPanelData[]}
     */
    MaterialPanels = [];
    /**
     * @type {AnimatorPanelData[]}
     */
    AnimatorPanels = [];
    /**
     * @type {SceneNodeData[]}
     */
    Children = [];
};

export class SceneData {
    /**
     * @type {SceneParamPanelData}
     */
    SceneParamPanel;

    /**
     * @type {SceneNodeData}
     */
    RootSceneNode = new SceneNodeData();
};

export class DocumentData {
    /**
     * @type {SceneData[]}
     */
    Scenes = [];
};

class PanelData {
    constructor() {

    }
};

export class SceneParamPanelData extends PanelData {
    /**
     * @type {CL3D.Scene}
     */
    TheScene;

    constructor() {
        super();
    }
};

export class SceneNodeParamPanelData extends PanelData {
    /**
     * @type {CL3D.SceneNode}
     */
    TheSceneNode;

    constructor() {
        super();
    }
};

export class MaterialPanelData extends PanelData {
    /**
     * @type {CL3D.Material}
     */
    TheMat;

    constructor() {
        super();
    }
};

export class AnimatorPanelData extends PanelData {
    /**
     * @type {CL3D.Animator}
     */
    TheAnimator;

    constructor() {
        super();
    }
};
