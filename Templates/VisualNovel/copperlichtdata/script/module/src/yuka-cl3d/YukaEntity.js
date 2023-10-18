import { Vehicle, State, StateMachine, Goal, CompositeGoal, Think } from '../yuka-lib/dist/yuka.module.js';
import { CreatureModule } from '../_reference/creature.js';

class _State extends State
{
	// Properties
	animation;

	constructor(animation)
	{
		super();

		this.animation = animation;
	}

	enter(owner)
	{
		if(!CreatureModule)
			return;
		
		CreatureModule.packageMgr.setPlayerActiveAnimation(owner.player.playerId, this.animation);
	}

	execute(owner)
	{

	}

	exit(owner)
	{

	}
};

class _SubGoal extends Goal
{
	constructor(owner)
	{
		super(owner);
	}

	activate()
	{

	}

	execute()
	{

	}

	terminate()
	{

	}
}

class _MainGoal extends CompositeGoal
{
	// Properties
	status;

	constructor(owner)
	{
		super(owner);
	}

	activate()
	{
		this.clearSubgoals();

		const owner = this.owner;

		this.addSubgoal();
	}

	execute()
	{
		this.status = this.executeSubgoals();

		this.replanIfFailed();
	}

	terminate()
	{

	}
};

export class YukaEntity extends Vehicle
{
	// Properties
	player;
	animations;

	brain;
	stateMachine;

	currentTime;
	stateDuration;
	crossFadeDuration;

	constructor(player, animations)
    {
		super();

		this.player = player;
		this.animations = animations;

		this.brain = new Think(this);
		this.stateMachine = new StateMachine(this);

		for(let i = 0; i < this.animations.length; ++i)
		{
			let state = new _State(this.animations[i]);
			this.stateMachine.add(state.animation, state);
		}

		this.currentTime = 0;

		this.stateMachine.changeTo("default");
	}

	/**
	* This method is responsible for updating the position based on the force produced
	* by the internal steering manager.
	*
	* @param {Number} delta - The time delta.
	* @return {Vehicle} A reference to this vehicle.
	*/
    update(delta)
    {
		super.update(delta);

		this.currentTime += delta;

		this.stateMachine.update();

        return this;
    }
};