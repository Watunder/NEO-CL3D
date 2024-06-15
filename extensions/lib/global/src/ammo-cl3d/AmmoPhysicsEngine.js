import * as CL3D from "cl3d";
import { Ammo } from "../../global";

export class AmmoPhysicsEngine {
    /**
     * @type {Ammo.btRigidBody[]}
     */
    Bodies = [];

    /**
     * @type {Number}
     */
    Gravity = 10.0;

    /**
     * @type {CL3D.TriangleSelector} 
     */
    World = null;

    /**
     * @type {Ammo.btRigidBody}
     */
    WorldBody = null;


    constructor() {
        this._collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        this._dispatcher = new Ammo.btCollisionDispatcher(_collisionConfiguration);
        this._broadphase = new Ammo.btDbvtBroadphase();
        this._solver = new Ammo.btSequentialImpulseConstraintSolver();
        this._dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(
            this._dispatcher, this._broadphase, this._solver, this._collisionConfiguration
        );

        this._dynamicsWorld.setGravity(Ammo.btVector3(0, this.Gravity, 0));
    }


    updateWorld(world) {
        this.World = world;

        if (this.WorldBody) {
            this._dynamicsWorld.removeRigidBody(this.WorldBody);
        }

        // TODO
        let groundShape = null;

        let groundTransform = new Ammo.btTransform();
        groundTransform.setIdentity();
        groundTransform.setOrigin(Ammo.btVector3(0, 0, 0));

        let mass = 0.0;
        let isDynamic = (mass != 0.0);
        let localInertia = new Ammo.btVector3(0, 0, 0);

        if (isDynamic)
            groundShape.calculateLocalInertia(mass, localInertia);

        let myMotionState = new Ammo.btDefaultMotionState(groundTransform);

        let rbInfo = Ammo.btRigidBodyConstructionInfo(mass, myMotionState, groundShape, localInertia);
        this.WorldBody = new Ammo.btRigidBody(rbInfo);

        this._dynamicsWorld.addRigidBody(this.WorldBody);
    }

    addBody(body) {
        if (!body)
            return;

        this._dynamicsWorld.addRigidBody(body);
    }

    removeBody(body) {
        if (!body)
            return;

        let index = this.Bodies.findIndex(body);
        if (index == -1)
            return;

        this._dynamicsWorld.removeRigidBody(this.Bodies[index]);
    }
};
