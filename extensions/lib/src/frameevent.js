import { Global } from "../global.js";

export class FrameEvent {
	constructor(context, type = "seque") {
		const me = this;

		me.context = context;
		me.firstTime = true;
		me.behavior = null;

		me.EVENT_ARRAY = [];
		me.EVENT_INDEX = 0;

		me.EVENT_HANDLER = () => { };

		me._init(type);
	}

	_init(type) {
		const me = this;

		me.action = new action_StoryPrivate();
		me.action._init();

		switch (type) {
			case "seque":
				me.EVENT_HANDLER = () => { me._runSeque(); };
				break;

			case "sync":
				me.EVENT_HANDLER = () => { me._runSync(); };
				break;

			case "dialog":
				me.EVENT_HANDLER = () => { me._runDialog(); };
				break;
		}
	}

	_runSeque() {
		const me = this;

		if (me.firstTime == true) {
			Global.Emitter.on("pass_behavior", (behavior) => {
				me.behavior = behavior;
				Global.Emitter.off("pass_behavior");
			});

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
			me.action.Event = me.EVENT_ARRAY[0];
			me.action.execute();

			me.firstTime = false;
		}

		else {
			for (let i = 0; i < Global.StateList.length; ++i) {
				if (Global.StateList[i] != "nothing")
					return;
			}

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
			me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
			me.action.execute();
		}

		if (me.EVENT_INDEX == me.EVENT_ARRAY.length) {
			me.EVENT_INDEX = 0;
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
		}
	}

	_runSync() {
		const me = this;

		if (me.firstTime == true) {
			Global.Emitter.on("pass_behavior", (behavior) => {
				me.behavior = behavior;
				Global.Emitter.off("pass_behavior");
			});

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
			me.action.Event = me.EVENT_ARRAY[0];
			me.action.execute();

			me.firstTime = false;
		}

		else if (me.behavior.State == "nothing") {
			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
			me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
			me.action.execute();
		}

		if (me.EVENT_INDEX == me.EVENT_ARRAY.length) {
			me.EVENT_INDEX = 0;
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
		}
	}

	_runDialog() {
		const me = this;

		if (me.firstTime == true) {
			Global.Emitter.on("pass_behavior", (behavior) => {
				me.behavior = behavior;
				Global.Emitter.off("pass_behavior");
			});

			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[0]);
			me.action.Event = me.EVENT_ARRAY[0];
			me.action.execute();

			me.firstTime = false;
		}

		else if (me.behavior.State == "nothing") {
			// ccbCallAction(me.context.StoryAction, me.EVENT_ARRAY[++me.EVENT_INDEX]);
			me.action.Event = me.EVENT_ARRAY[++me.EVENT_INDEX];
			me.action.execute();
		}

		if (me.EVENT_INDEX == me.EVENT_ARRAY.length) {
			me.EVENT_INDEX = 0;
			ccbUnregisterOnFrameEvent(me.EVENT_HANDLER);
		}
	}

	getVariable(event) {
		if (event.length == 0)
			return null;

		if (event[0] == " ")
			return;

		let array1 = event.split(/\s/);

		let obj = new Object();

		obj["name"] = array1[0];

		let array2 = array1.slice(1);
		for (let i = 0; i < array2.length; ++i) {
			let array3 = array2[i].split("=");

			if (array3[0] == "")
				continue;

			if (array3[0][0] == "#") {
				let define = array2[i].slice(1);
				obj["define"] += ";" + define;
				continue;
			}

			if (array3[1] == null)
				obj["default"] = array3[0];

			else
				obj[array3[0]] = array3[1];
		}

		return obj;
	}

	dispatch(macro, event) {
		const me = this;

		if (event[0].toString() == "[object Object]") {
			me.EVENT_ARRAY = event;
			ccbRegisterOnFrameEvent(me.EVENT_HANDLER);

			return;
		}

		let _event = [];

		for (let i = 0; i < event.length; ++i) {
			let index = event[i].indexOf(" ");
			let name = event[i].slice(0, index);

			if (macro[name] == null) {
				let obj = me.getVariable(event[i]);
				_event.push(JSON.stringify(obj));
				continue;
			};

			let flat_macroObj = macro[name].flatAll();

			for (let p = 0; p < flat_macroObj.length; ++p) {
				let tmp_macroEvent = flat_macroObj[p];

				for (let c = 0; c < macro[name + "_Param"].length; ++c) {
					tmp_macroEvent = tmp_macroEvent.replaceAll(macro[name + "_Param"][c], event[i].split(/\s/)[c + 1].split("=")[1]);
				}

				let obj = me.getVariable(tmp_macroEvent);
				_event.push(JSON.stringify(obj));
			}
		}

		me.EVENT_ARRAY = _event;
		ccbRegisterOnFrameEvent(me.EVENT_HANDLER);
	}
};
