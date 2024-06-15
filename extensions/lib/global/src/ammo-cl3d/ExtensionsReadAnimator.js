import * as CL3D from "cl3d";
import { AnimatorRigidPhysicsBody } from "./AnimatorRigidPhysicsBody.js";

/**
* @param {CL3D.FlaceLoader} loader 
* @param {Number} type 
* @param {CL3D.SceneNode} rootSceneNode 
* @param {CL3D.Free3dScene} sceneManager 
* @returns {CL3D.Animator?}
*/
CL3D.Extensions.readAnimator = (loader, type, rootSceneNode, sceneManager) => {
    if (rootSceneNode == null)
        return;

    let animator = null;
    switch (type) {
        case 118:
            animator = new AnimatorRigidPhysicsBody();
            animator.BodyType = loader.Data.readInt();
            animator.Density = loader.Data.readInt();

            switch (animator.BodyType) {
                case /*Sphere*/0:
                    animator.Radius = loader.Data.readFloat();
                    break;
                case /*Box*/1:
                    animator.Size = loader.Read3DVectF();
                    break;
                case /*Cylinder*/2:
                    animator.Radius = loader.Data.readFloat();
                    animator.Height = loader.Data.readFloat();
                case /*Capsule*/3:
                    animator.Radius = loader.Data.readFloat();
                    animator.Height = loader.Data.readFloat();
                    break;
            }

            animator.AdditionalPosition = loader.Read3DVectF();
            animator.AdditionalRotation = loader.Read3DVectF();

            animator.DoActionImpact = loader.Data.readBoolean();
            if (animator.DoActionImpact) {
                animator.ActionOnImpact = loader.ReadActionHandlerSection(sceneManager);
            }
            break;
    }

    return animator;
}
