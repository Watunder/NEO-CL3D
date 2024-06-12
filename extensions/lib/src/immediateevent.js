export class ImmediateEvent {
	constructor() {
		const me = this;

		me.EVENT_ARRAY = [];

		me.action = new _ccb_action_StoryPrivate();
		me.action._init();
	}

	_run() {
		const me = this;

		for (let index = 0; index < me.EVENT_ARRAY.length; ++index) {
			me.action.Event = me.EVENT_ARRAY[index];
			me.action.execute();
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
			me._run();

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
		me._run();
	}
};
