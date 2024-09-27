import * as CL3D from "cl3d";

export class AnimatorRigidPhysicsBody extends CL3D.Animator {
    constructor() {
        super();

        this.BodyType = "";

        this.AdditionalRotation = new CL3D.Vect3d(0, 0, 0);
        this.AdditionalPosition = new CL3D.Vect3d(0, 0, 0);

        this.Density = 1;

        this.Radius = 10;
        this.Height = 10;
        this.Size = new CL3D.Vect3d(0, 0, 0);

        this.DoActionImpact = false;
        this.ActionOnImpact = null;
    }

    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.SceneNode} node The Scene node which needs to be animated this frame.
     * @param {Integer} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(node, timeMs) {

    }
};
