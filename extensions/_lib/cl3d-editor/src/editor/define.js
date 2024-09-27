/**
 * @typedef {'Scene'|
 * 'Free3dScene'} SceneType
 */

/**
 * @typedef {'SceneNode'|
 * 'AnimatedMeshSceneNode'|
 * 'BillboardSceneNode'|
 * 'CameraSceneNode'|
 * 'CubeSceneNode'|
 * 'HotspotSceneNode'|
 * 'LightSceneNode'|
 * 'MeshSceneNode'|
 * 'Mobile2DInputSceneNode'|
 * 'Overlay2DSceneNode'|
 * 'ParticleSystemSceneNode'|
 * 'PathSceneNode'|
 * 'SkyBoxSceneNode'|
 * 'SoundSceneNode'|
 * 'WaterSurfaceSceneNode'} SceneNodeType
 */

/**
 * @typedef {'Animator'|
 * 'AnimatorAnimateTexture'|
 * 'AnimatorCameraFPS'|
 * 'AnimatorCameraModelViewer'|
 * 'AnimatorCollisionResponse'|
 * 'AnimatorFlyCircle'|
 * 'AnimatorFlyStraight'|
 * 'AnimatorFollowPath'|
 * 'AnimatorOnClick'|
 * 'AnimatorOnProximity'|
 * 'AnimatorOnMove'|
 * 'AnimatorRotation'|
 * 'Animator3rdPersonCamera'|
 * 'AnimatorGameAI'|
 * 'AnimatorKeyboardControlled'|
 * 'AnimatorMobileInput'|
 * 'AnimatorOnFirstFrame'|
 * 'AnimatorOnKeyPress'|
 * 'AnimatorTimer'} AnimatorType
 */

/**
 * @typedef {'Action'|'ActionHandler'|
 * 'ActionChangeSceneNodePosition'|
 * 'ActionChangeSceneNodeRotation'|
 * 'ActionChangeSceneNodeScale'|
 * 'ActionChangeSceneNodeTexture'|
 * 'ActionCloneSceneNode'|
 * 'ActionDeleteSceneNode'|
 * 'ActionExecuteJavaScript'|
 * 'ActionIfVariable'|
 * 'ActionMakeSceneNodeInvisible'|
 * 'ActionOpenWebpage'|
 * 'ActionPlayMovie'|
 * 'ActionPlaySound'|
 * 'ActionRestartBehaviors'|
 * 'ActionRestartScene'|
 * 'ActionSetActiveCamera'|
 * 'ActionSetCameraTarget'|
 * 'ActionSetOrChangeAVariable'|
 * 'ActionSetOverlayText'|
 * 'ActionSetSceneNodeAnimation'|
 * 'ActionShoot'|
 * 'ActionStopSound'|
 * 'ActionStopSpecificSound'|
 * 'ActionStoreLoadVariable'|
 * 'ActionSwitchToScene'} ActionType
 */

/**
 * @typedef {SceneType|SceneNodeType|AnimatorType|ActionType} DefinedType
 */

/**
 * @param {any} object 
 * @returns {DefinedType}
 */
export function getDefinedType(object) {
    return object.constructor.name;
}
