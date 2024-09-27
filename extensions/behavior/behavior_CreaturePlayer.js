// The following embedded xml is for the editor and describes how the behavior can be edited:
// Supported types are: int, float, string, bool, color, vect3d, scenenode, texture, action
/*
    <behavior jsname="behavior_CreaturePlayer" description="CreaturePlayer">
    </behavior>
*/

import Creature from "creature";
import { CreaturePackage, CreaturePlayer } from "global";

export default class behavior_CreaturePlayer {
	/**
	 * @type {CreaturePackage}
	 */
	package = null;

	/**
	 * @type {CreaturePlayer}
	 */
	player = null;

    constructor() {
        this.Type = "cp";
    }

    getAllAnimes() {
        if (!this.package || !this.player)
            return;

        var obj = {};

        obj[this.package.name] = Creature.PackManager.getAllAnimNames(this.player.playerId);

        return obj;
    }

    // called every frame.
    //   'node' is the scene node where this behavior is attached to.
    //   'timeMs' the current time in milliseconds of the scene.
    // Returns 'true' if something changed, and 'false' if not.
    onAnimate(node, timeMs) {
        // first time
        if (this.LastTime == null) {

            node._Type = this.Type;

            this.package = new CreaturePackage("copperlichtdata/sprite/raptor.creature_pack", () => {
                this.player = new CreaturePlayer(node, this.package, "raptor", "default");
            });

            this.LastTime = timeMs;
        }

        if (this.player)
            this.player.Update(timeMs);
    }
};
