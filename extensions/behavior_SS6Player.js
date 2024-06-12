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

import { SS6Project, SS6Player, SS6PlayerInstanceKeyParam } from "./lib/global.js";

export default class behavior_SS6Player extends SS6PlayerInstanceKeyParam
{
	/**
	 * @type {SS6Project}
	 */
	project = null;

	/**
	 * @type {SS6Player}
	 */
	player = null;

	constructor()
	{
		this.Type = "ss6";
	}

	getAllAnimes()
	{
		if (!this.project)
			return;

		let obj = {};

		let animePacksLength = this.project.fbObj.animePacksLength();
		for (let i = 0; i < animePacksLength; ++i)
		{
			let j;
			let name = this.project.fbObj.animePacks(i).name();
			let animationsLength = this.project.fbObj.animePacks(i).animationsLength() - 1;
			for (j = 0, obj[name] = []; j < animationsLength; ++j)
				obj[name].push(this.project.fbObj.animePacks(i).animations(j).name());
		}

		return obj;
	}

	// called every frame.
	//   'node' is the scene node where this behavior is attached to.
	//   'timeMs' the current time in milliseconds of the scene.
	// Returns 'true' if something changed, and 'false' if not.
	onAnimate(node, timeMs)
	{
		// first time
		if (this.LastTime == null)
		{
			node.Type = this.Type;

			this.project = new SS6Project(this.ProjectName, () =>
			{
				this.player = new SS6Player(node, this.project, this.AnimePackName, this.AnimeName);
				this.player.SetAnimationSpeed(60, false);
				this.player.Play();
			});

			this.LastTime = timeMs;
		}

		if (this.player)
			this.player.Update(timeMs);
	}
};
