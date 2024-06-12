/*
	<behavior jsname="behavior_MeshAnimation" description="Mesh Animation">
	</behavior>
*/

//Global Variables

import { Global, Actor } from "./lib/global.js";

export default class behavior_MeshAnimation
{
	constructor()
	{
		this.Type = "move";
		this.Index = null;

		this.Enable_MOVE = false;
		this.Speed = 0.0;
		this.Acceleration = 0.002;
		this.LastTime = null;
		this.MoveTime = 0;
		this.StartPos = null;
		this.EndPos = null;

		this.Actor = null;
		this.State = "nothing";
	}

	onAnimate(node, timeMs)
	{
		// first time
		if (this.LastTime == null)
		{
			if (!Global.Rekapi)
				return;

			this.Actor = new Actor(
			{
				context: node,
				render: (context, state) =>
				{
					if (state.x == null || state.y == null || state.z == null)
						return;

					ccbSetSceneNodeProperty(context, 'Position', state);
				}
			});
			Global.Rekapi.addActor(this.Actor);

			this.LastTime = timeMs;
			this.Index = Number(node.Name.split("_")[1]);
			this.StateIndex = Global.StateIndex++;
			this.StartPos = ccbGetSceneNodeProperty(node, 'Position');
			this.EndPos = ccbGetSceneNodeProperty(node, 'Position');
		}

		// delta time
		let delta = timeMs - this.LastTime;
		this.LastTime = timeMs;
		if (delta > 200) delta = 200;

		this.State = "nothing";

		// enable when event call
		if (this.Enable_SHOW)
		{

		}
		else
		if (this.Enable_HIDE)
		{

		}
		else
		if (this.Enable_MOVE)
		{
			this.State = "moving";

			let NodePos = ccbGetSceneNodeProperty(node, "Position");

			// vect3d(up/down,front/back,left/right)
			let MovePos = this.EndPos.substract(this.StartPos);

			if (NodePos.substract(this.StartPos)
				.getLength() >= MovePos.getLength())
			{
				// lighting(on/off)
				//ccbSetSceneNodeProperty(node, "Position", this.EndPos.x, this.EndPos.y, this.EndPos.z);
				if (NodePos.y >= 5)
					ccbSetSceneNodeMaterialProperty(node, 0, "Lighting", false);
				else
				if (NodePos.y <= 1)
					ccbSetSceneNodeMaterialProperty(node, 0, "Lighting", true);

				// end move
				let tmp = this.StartPos;
				this.StartPos = this.EndPos;
				this.EndPos = tmp;

				// reset
				this.Speed = 0.0;
				this.Enable_MOVE = false;
				this.MoveTime = 0;

				this.Actor.removeAllKeyframes();
			}

			// // do move
			// MovePos.normalize();
			// this.Speed += this.Acceleration;
			// NodePos.x += MovePos.x * delta * this.Speed;
			// NodePos.y += MovePos.y * delta * this.Speed;
			// NodePos.z += MovePos.z * delta * this.Speed;
			// //update pos
			// ccbSetSceneNodeProperty(node, 'Position', NodePos);
			this.Actor._updateState(this.MoveTime);

			if (this.Actor.wasActive)
				this.Actor.render(this.Actor.context, this.Actor.get());

			this.MoveTime += delta;
		}

		Global.Emitter.emit("set_behavior_state", this);
	}
};
