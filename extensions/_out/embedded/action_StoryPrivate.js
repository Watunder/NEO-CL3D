import { Global } from '__dirname/global.js';

// This is a scripted coppercube action.
/*
	<action jsname="action_StoryPrivate" description="Story">
		<property name="BTN_overlayFolder" type="scenenode" />
		<property name="FX_overlayFolder" type="scenenode" />
		<property name="FG_overlayFolder" type="scenenode" />
		<property name="BG_overlayFolder" type="scenenode" />
	    <property name="Event" type="string" default="" />
	</action>
*/


class action_StoryPrivate
{
	constructor()
	{
		
	}

	// called when the action is executed
	execute(currentNode)
	{
		//var scene = CL3D.gScriptingInterface.CurrentlyActiveScene;
		let obj = null;

		if (typeof (this.Event) == "string")
			obj = JSON.parse(this.Event || "{}");

		else if (typeof (this.Event) == "object")
			obj = this.Event;

		if (obj == null)
			return;

		switch (obj.name)
		{
			case "SHOW":
			{
				let node_bg;
				let node_fg;
				if (obj.bg != null)
				{
					node_bg = ccbGetChildSceneNode(this.BG_overlayFolder, Number(obj.bg));
					_ccbScriptCache[node_bg.getAnimatorOfType("?").ScriptIndex];
				}
				if (obj.fg != null)
				{
					node_fg = ccbGetChildSceneNode(this.FG_overlayFolder, Number(obj.fg));
					_ccbScriptCache[node_fg.getAnimatorOfType("?").ScriptIndex];
				}
			}
			break;

			case "HIDE":
			{
				let node_bg;
				let node_fg;
				if (obj.bg != null) {
					node_bg = ccbGetChildSceneNode(this.BG_overlayFolder, Number(obj.bg));
					_ccbScriptCache[node_bg.getAnimatorOfType("?").ScriptIndex];
				}
				if (obj.fg != null) {
					node_fg = ccbGetChildSceneNode(this.FG_overlayFolder, Number(obj.fg));
					_ccbScriptCache[node_fg.getAnimatorOfType("?").ScriptIndex];
				}
			}
			break;

			case "MOVE":
			{
				let node = ccbGetChildSceneNode(this.FG_overlayFolder, Number(obj.fg));
				let behavior = _ccbScriptCache[node.getAnimatorOfType("extensionscript").ScriptIndex];

				Global.Emitter.emit("pass_behavior", behavior);

				behavior.Enable_MOVE = true;
				behavior.EndPos.x = Number(obj.x);
				behavior.EndPos.y = Number(obj.y);
				behavior.EndPos.z = Number(obj.z);

				behavior.Actor.removeAllKeyframes();
				behavior.Actor.keyframe(0, behavior.StartPos);
				behavior.Actor.keyframe(obj.t, behavior.EndPos, "easeOutSine");
			}
			break;

			case "BTN":
			{
				/// TODO
				let node = ccbGetChildSceneNode(ccbGetSceneNodeFromName("menu"), Number(obj.index) + 7);
				let behavior = node.getAnimatorOfType("button");

				Global.Emitter.emit("pass_behavior", behavior);

				node.Visible = true;
				node.Text = obj.text;
				node.PosRelativeX = obj.x;
				node.PosRelativeY = obj.y;
				node.SizeRelativeWidth = obj.w;
				node.SizeRelativeHeight = obj.h;

				behavior.JSCode = obj.js;
				///
				Global.IsOption = true;
			}
			break;

			// Dialog
			case "character":
			{
				let behavior = _ccbScriptCache[3];

				Global.Emitter.emit("pass_behavior", behavior);

				ccbSetSceneNodeProperty(ccbGetChildSceneNode(ccbGetSceneNodeFromName("character"), 0), 'Text', obj.default);
			}
			break;

			case "expression":
			{
				let behavior = _ccbScriptCache[3];

				Global.Emitter.emit("pass_behavior", behavior);

				ccbSetSceneNodeProperty(ccbGetChildSceneNode(ccbGetSceneNodeFromName("expression"), 0), 'Text', obj.default);
			}
			break;

			case "text":
			{
				let behavior = _ccbScriptCache[3];

				Global.Emitter.emit("pass_behavior", behavior);

				if (Object.keys(obj).length > 2) {
					let _style = {};
					if (obj.color)
						_style.color = obj.color;
					if (obj.size)
						_style.size = obj.size;

					Global.Emitter.emit("set_dialogue_obj", { text: obj.default + " ", style: _style });
				}
				else
					Global.Emitter.emit("set_dialogue_text", obj.default + " ");
			}
			break;

			case "sound":
			break;

			case "console":
			{
				console.log(obj.text);
			}
			break;
		}
	}
}

export { action_StoryPrivate as default };
