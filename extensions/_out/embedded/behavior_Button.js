import { Global } from '__dirname/global.js';

/*
	<behavior jsname="behavior_Button" description="Button">
	</behavior>
*/


class behavior_Button {
	constructor() {
		this.Type = "button";
		this.Index = null;

		this.Enable_MOVE = false;

		this.JSCode = "";

		this.State = "nothing";
	}

	onAnimate(node, timeMs) {
		// first time
		if (this.LastTime == null) {
			this.LastTime = timeMs;
		}

		// delta time
		timeMs - this.LastTime;
		this.LastTime = timeMs;

		this.State = "nothing";

		// enable when event call
		if (this.Enable_SHOW) ;

		else if (this.Enable_HIDE) ;

		else if (this.Enable_MOVE) ;

		Global.Emitter.emit("set_behavior_state", this);
	}
}

export { behavior_Button as default };
