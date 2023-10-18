import { EntityManager } from '../yuka-lib/dist/yuka.module.js';

import { YukaEntity } from './YukaEntity.js';

export class YukaManager
{
    // Properties
    #EntityManager;

    constructor()
    {
        this.#EntityManager = new EntityManager();
    }

    Add(actor, animtions)
    {
        let entity = new YukaEntity(actor.CP, animtions);

        entity.setRenderComponent(actor, this.Sync);
        
        actor.Entity = entity;
        this.#EntityManager.add(entity);
    }

    Remove(actor)
    {
        this.#EntityManager.remove(actor.Entity);
    }

	/**
     * @param {YukaEntity} entity
	 * @param {CL3D.SceneNode} actor
	*/
    Sync(entity, actor)
    {
        entity.position;
        entity.rotation;
        entity.scale;
    }

    Update(actor, timeMs)
    {
        // delta time
        if (this.lastTime == null)
            this.lastTime = timeMs;
        
        const elapsedTime = timeMs - this.lastTime;
        this.lastTime = timeMs;

        this.#EntityManager.updateEntity(elapsedTime, actor.Entity);
    }
};
