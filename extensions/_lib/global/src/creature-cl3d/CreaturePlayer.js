import Creature from "creature";
import { CreaturePackage } from './CreaturePackage.js';
import { SimpleMeshSceneNode } from '../simplemeshscenenode.js';

export class CreaturePlayer {
    // Properties
    playerId;
    creaturepackage;

    animations = [];

    startTime;
    endTime;
    isLoop;

    set loop(loop) {
        this.isLoop = loop;
    }

    get loop() {
        return this.isLoop;
    }

    /**
     * CreaturePlayer
     * @constructor
     * @param {CreaturePackage} creaturepackage - CreaturePackage that contains animations.
     * @param {string} animePackName - The name of animePack.
     * @param {string} animeName - The name of animation.
     */
    constructor(node, creaturepackage, animePackName, animeName) {
        this.node = node;
        this.creaturepackage = creaturepackage;

        if (animePackName !== null && animeName !== null)
            this.Setup(animePackName, animeName);
    }

    Setup(animePackName, animeName) {
        this.playerId = Creature.PackManager.addPackPlayer(animePackName);
        this.animations.push(Creature.PackManager.getAllAnimNames(this.playerId));

        Creature.PackManager.setPlayerActiveAnimation(this.playerId, animeName);

        let texture = this.creaturepackage.resources[this.creaturepackage.name];
        let vertices = Creature.PackManager.getPlayerPoints(this.playerId);
        let uvs = Creature.PackManager.getPlayerUVs(this.playerId);
        let indices = Creature.PackManager.getPlayerIndices(this.playerId);

        let mesh = new SimpleMeshSceneNode(texture, vertices, uvs, indices);
        mesh.name = this.creaturepackage.name;

        this.node.addChild(mesh);
    }

    Update(timeMs) {
        // delta time
        if (this.lastTime == null)
            this.lastTime = timeMs;

        const elapsedTime = timeMs - this.lastTime;
        this.lastTime = timeMs;

        Creature.PackManager.stepPlayer(this.playerId, 1.0);

        let vertices = Creature.PackManager.getPlayerPoints(this.playerId);
        this.node.Children[0].update(vertices);
    }

    SetAnimationSelection(startTime = 0, endTime = 1000, isLoop = false) {
        this.startTime = startTime;
        this.endTime = endTime;

        // Creature.PackManager.getActiveAnimStartTime(this.playerId);
        // Creature.PackManager.getActiveAnimEndTime(this.playerId);

        Creature.PackManager.setPlayerLoop(this.playerId, this.isLoop);
    }
};
