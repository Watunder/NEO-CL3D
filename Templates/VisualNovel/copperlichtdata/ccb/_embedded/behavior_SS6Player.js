// The following embedded xml is for the editor and describes how the behavior can be edited:
// Supported types are: int, float, string, bool, color, vect3d, scenenode, texture, action
/*
	<behavior jsname="behavior_SS6Player" description="SS6Player">
        <property name="ProjectName" type="string" default="" />
        <property name="AnimePackName" type="string" default="" />
        <property name="AnimeName" type="string" default="" />
	</behavior>
*/

//Global Variables

globalThis.behavior_SS6Player = class behavior_SS6Player
{
	constructor()
	{
		this.refStartframe = 0;
		this.refEndframe = 0;
		this.refSpeed = 1.0;
		this.refloopNum = 0;
		this.infinity = false;
		this.reverse = false;
		this.pingpong = false;
		this.independent = false;

		this.Type = "fg";
	}

	getAllAnimes()
	{
		if (!this.SS)
			return;

		let obj = {};

		let animePacksLength = this.SS.fbObj.animePacksLength();
		for (let i = 0; i < animePacksLength; ++i)
		{
			let j;
			let name = this.SS.fbObj.animePacks(i).name();
			let animationsLength = this.SS.fbObj.animePacks(i).animationsLength() - 1;
			for (j = 0, obj[name] = []; j < animationsLength; ++j)
				obj[name].push(this.SS.fbObj.animePacks(i).animations(j).name());
		}

		return obj;
	}

	// called every frame. 
	//   'node' is the scene node where this behavior is attached to.
	//   'timeMs' the current time in milliseconds of the scene.
	// Returns 'true' if something changed, and 'false' if not.
	onAnimate(node, timeMs)
	{
		const me = this;

		// first time
		if (this.LastTime == null)
		{
			if (!Global.SS6Project)
				return;

			node.Type = this.Type;

			this.SS = new Global.SS6Project("copperlichtdata/sprite/" + me.ProjectName, () =>
			{
				me.SP = new Global.SS6Player(node, me.SS, me.AnimePackName, me.AnimeName);
				me.SP.SetAnimationSpeed(60, false);
				me.SP.Play();
			});

			this.LastTime = timeMs;
		}

		if (this.SP)
			this.SP.Update(timeMs);
	}
};
