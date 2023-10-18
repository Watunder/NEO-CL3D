import { CreaturePackage } from './CreaturePackage.js';

export class CreaturePlayer
{
    // Properties
    playerId;
    creaturepackage;

    animations = [];

    startTime;
    endTime;
    isLoop;
    
    set loop(loop)
    {
      this.isLoop = loop;
    }
  
    get loop()
    {
      return this.isLoop;
    }

    /**
     * CreaturePlayer
     * @constructor
     * @param {CreaturePackage} creaturepackage - CreaturePackage that contains animations.
     * @param {string} animePackName - The name of animePack.
     * @param {string} animeName - The name of animation.
     */
    constructor(node, creaturepackage, animePackName, animeName)
    {
        if (!CreatureModule)
            return;

        this.node = node;
        this.creaturepackage = creaturepackage;

        if (animePackName !== null && animeName !== null)
            this.Setup(animePackName, animeName);
    }

    Setup(animePackName, animeName)
    {
        this.playerId = CreatureModule.packageMgr.addPackPlayer(animePackName);
        this.animations.push(CreatureModule.packageMgr.getAllAnimNames(this.playerId));

        CreatureModule.packageMgr.setPlayerActiveAnimation(this.playerId, animeName);

        let texture = this.creaturepackage.resources[this.creaturepackage.name];
        let vertices = CreatureModule.packageMgr.getPlayerPoints(this.playerId);
        let uvs = CreatureModule.packageMgr.getPlayerUVs(this.playerId);
        let indices = CreatureModule.packageMgr.getPlayerIndices(this.playerId);
        
        let mesh = new CL3D.SimpleMesh(texture, vertices, uvs, indices);
        mesh.name = this.creaturepackage.name;

        this.node.addChild(mesh);
    }

    Update(timeMs)
    {
        // delta time
        if (this.lastTime == null)
            this.lastTime = timeMs;
        
        const elapsedTime = timeMs - this.lastTime;
        this.lastTime = timeMs;

        CreatureModule.packageMgr.stepPlayer(this.playerId, 1.0);
        
        let vertices = CreatureModule.packageMgr.getPlayerPoints(this.playerId);
        this.node.Children[0].update(vertices);
    }

    SetAnimationSelection(startTime = 0, endTime = 1000, isLoop = false)
    {
        this.startTime = startTime;
        this.endTime = endTime;

        // CreatureModule.getActiveAnimStartTime(this.playerId);
        // CreatureModule.getActiveAnimEndTime(this.playerId);

        CreatureModule.packageMgr.setPlayerLoop(this.playerId, this.isLoop);
    }
};
