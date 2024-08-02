import * as CL3D from "cl3d";
import { Ammo } from "../../index";

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
     * @type {CL3D.MetaTriangleSelector} 
     */
    World = null;

    /**
     * @type {Ammo.btRigidBody}
     */
    WorldBody = null;

    constructor() {
        this._collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        this._dispatcher = new Ammo.btCollisionDispatcher(this._collisionConfiguration);
        this._broadphase = new Ammo.btDbvtBroadphase();
        this._solver = new Ammo.btSequentialImpulseConstraintSolver();
        this._dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(
            this._dispatcher, this._broadphase, this._solver, this._collisionConfiguration
        );

        this._dynamicsWorld.setGravity(Ammo.btVector3(0, this.Gravity, 0));
    }

    setWorld(world) {
        this.World = world;

        this.updateWorld();
    }

    /**
     * @param {CL3D.Vect3d} vector3d 
     * @returns 
     */
    getBulletVector(vector3d) {
        return new Ammo.btVector3(vector3d.X, vector3d.Y, vector3d.Z);
    }

    updateWorld() {
        if (this.WorldBody) {
            this._dynamicsWorld.removeRigidBody(this.WorldBody);
        }

        /**
         * @type {CL3D.Triangle3d[]}
         */
        let triangles = [];
        this.World.getAllTriangles(null, triangles);
        let pTriMesh = new Ammo.btTriangleMesh();
        for (let index = 0; index < triangles.length; ++index) {
            pTriMesh.addTriangle(this.getBulletVector(triangles[index].pointA),
                                 this.getBulletVector(triangles[index].pointB),
                                 this.getBulletVector(triangles[index].pointC));
        }

        let bvhTriShape = new Ammo.btBvhTriangleMeshShape(pTriMesh, true);
        let groundTransform = new Ammo.btTransform();
        groundTransform.setIdentity();
        groundTransform.setOrigin(Ammo.btVector3(0, 0, 0));

        let mass = 0.0;
        let localInertia = new Ammo.btVector3(0, 0, 0);

        let myMotionState = new Ammo.btDefaultMotionState(groundTransform);

        let rbInfo = Ammo.btRigidBodyConstructionInfo(mass, myMotionState, bvhTriShape, localInertia);
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
