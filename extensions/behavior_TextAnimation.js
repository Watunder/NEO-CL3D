// The following is a scripted behaviour for "CopperCube 3D".
//The Behaviour Provides an option to CopperCube Users, This behaviour provides an option to add "Animation Effect to Static Text of 2D Overlays" to CopperCube Projects.
//This Behaviour is Created by a non-Programmer:- Vazahat Pathan.
/*
	<behavior jsname="behavior_TextAnimation" description="Text Animation">
		<property name="Text" type="string" value="text" />
		<property name="Dialogue_overlayFolder" type="scenenode" />
		<property name="SceneNode" type="scenenode" />
        <property name="Interval" type="integer" default="10"  />
		<property name="Speed" type="integer" default="5"  />
		<property name="Enable_Animation" type="bool" default="false"  />
	</behavior>
*/

// Global variables

import { Global } from "./lib/global.js";

export default class behavior_TextAnimation
{
	constructor()
	{
		const me = this;

		me.delay = true;
		me.length = 0;
		me.index = 0;

		me.mode = "CLEAR";
		me.message = "";
		me.active = false;

		me.speed = 0;
		me.interval = 0;
		me.style = {};

		me.element = document.getElementById("text");

		me.State = "nothing";

		Global.Emitter.on("set_dialogue_text", (dialogueText) =>
		{
			me.message = dialogueText;
			me.active = true;
		});

		Global.Emitter.on("set_dialogue_obj", (dialogueObj) =>
		{
			me.message = dialogueObj.text;
			me.active = true;

			if (dialogueObj.speed)
				me.speed = dialogueObj.speed;
			if (dialogueObj.interval)
				me.interval = dialogueObj.interval;
			if (dialogueObj.style)
				me.style = dialogueObj.style;
		});

		Global.Emitter.on("set_dialogue_mode", (mode) =>
		{
			// CLEAR/UNCLEAR
			me.mode = mode;
		});

		Global.Emitter.on("clear_dialogue", () =>
		{
			me.clear();
		});

		Global.Emitter.on("do_dialogue_general_event", () =>
		{
			me.doGeneralEvent();
		});
	}

	clear()
	{
		this.length = 0;
		this.index = 0;
		this.element.innerHTML = "";

		this.speed = 0;
		this.interval = 0;
		this.style = {};
	}

	doGeneralEvent()
	{
		if (this.mode == "UNCLEAR" && this.Animation_Done == false)
		{
			return;
		}

		if (this.Animation_Done == false)
		{
			if (this.Enable_Animation == true)
			{
				this.Enable_Animation = false;
				return;
			}
			this.Enable_Animation = true;
		}
		else
		if (this.Animation_Done == true)
		{
			this.Enable_Animation = true;
		}
	}

	onAnimate(node, timeMs)
	{
		// to Controll Interval, animation of text
		if (this.delay)
		{
			if (this.interval)
				this.time = this.interval + timeMs;
			else
				this.time = this.Interval + timeMs;

			this.delay = false;
		}

		// Variables and properties items
		if (this.active)
		{
			this.Animation_Done = false;

			let arr = this.message.split("");

			switch (this.mode)
			{
				case "CLEAR":
				{
					this.length = this.message.length;
					this.index = 0;
					this.element.innerHTML = arr.map((char) =>
					{
						return `<span class="text-char">${char}</span>`;
					})
					.join("");

					this.nodeList = document.querySelectorAll(".text-char");
				}
				break;

				case "UNCLEAR":
				{
					this.length += this.message.length;
					this.element.innerHTML += arr.map((char) =>
					{
						return `<span class="text-char">${char}</span>`;
					})
					.join("");

					this.nodeList = document.querySelectorAll(".text-char");
				}
				break;

			}

			this.active = false;
		}

		if (this.length == this.index)
		{
			this.State = "nothing";
			this.Animation_Done = true;
			return;
		}

		// TODO: innerHtml
		// Printing/animating String Characters at 2d Overlay
		if (this.time <= timeMs)
		{
			this.State = "printing";

			if (this.style.color)
				this.nodeList[this.index].style.color = this.style.color;
			if (this.style.size)
				this.nodeList[this.index].style.fontSize = this.style.size;

			this.nodeList[this.index].style.opacity = 1;
			// let result = this.message.slice(0,this.index);
			// ccbSetSceneNodeProperty(this.SceneNode, 'Text', result);
			if (this.Enable_Animation)
			{
				if (this.speed)
					this.index += this.speed;
				else
					this.index += this.Speed;

				this.delay = true;
			}
			else
			{
				// this.index += this.message.length;
				this.index = this.length;
				this.delay = true;

				this.nodeList.forEach((charElemt) =>
				{
					charElemt.style.opacity = 1;
				});
			}
		}
	}

	onKeyEvent(key, pressed)
	{
		// when space pressed
		if (key == 32 && pressed)
		{
			this.doGeneralEvent();
		}
	}

	onMouseEvent(mouseEvent, mouseWheelDelta)
	{
		if (mouseEvent == 2)
		{
			this.doGeneralEvent();
		}
	}
};
