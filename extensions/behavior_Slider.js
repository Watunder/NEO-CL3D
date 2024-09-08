/*
    <behavior jsname="behavior_Slider" description="Slider">
        <property name="Bar" type="scenenode" />
        <property name="Knob" type="scenenode" />
        <property name="Variable" type="string" />
        <property name="Initial_Value" type="int" default = "0" />
        <property name="Min" type="int" default = "-100" />
        <property name="Max" type="int" default  = "100" />
        <property name="SliderFillColor" type="color" />
        <property name="AutoFillColor" type="bool" default = "true" />
        <property name="SliderFillHeight" type="float" default = "0.8" />
        <property name="AdditionalHeight" type="float" default = "0" />
        <property name="Reverse_SliderFill" type="bool" default = "false" />
        <property name="FillFromCenter" type="bool" default = "false" />
        <property name="EnableMouseScroll" type="bool" default = "true" />
        <property name="ScrollMultiplier" type="int" default = "1" />
        <property name="Scale_Hover_Knob" type="float" default = "1" />
        <property name="Scale_Click_Knob" type="float" default = "1" />
        <property name="Use_Image" type="bool" default = "false" />
        <property name="SliderFill_Image" type="texture" />
    <property name="Hover_Action" type="action" />
<property name="Drag_Action" type="action" />
    </behavior>
*/

// Global variables

import { Global } from "./lib/global";
import * as CL3D from "cl3d";

function clamp(value, minValue, maxValue, clampMin, clampMax)
{
	let normalizedValue = (value - minValue) / (maxValue - minValue);
	let clampedValue = normalizedValue * (clampMax - clampMin) + clampMin;

	return Math.max(clampMin, Math.min(clampMax, clampedValue));
}

// Map value from one range to another
function mapValue(value, inMin, inMax, outMin, outMax)
{
	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Function to animate overlay by scaling it equally while maintaining it at center
function scaleOverlay(overlay, scaleFactor)
{
	let originalX = overlay.x;
	let originalY = overlay.y;
	let originalWidth = overlay.width;
	let originalHeight = overlay.height;
	let newWidth = originalWidth * scaleFactor;
	let newHeight = originalHeight * scaleFactor;
	let widthDiff = originalWidth - newWidth;
	let heightDiff = originalHeight - newHeight;
	let newX = originalX + (widthDiff / 2);
	let newY = originalY + (heightDiff / 2);
	overlay.x = newX;
	overlay.y = newY;
	overlay.width = newWidth;
	overlay.height = newHeight;

	return {
		scaledOverlay: overlay,
		originalOverlay:
		{
			x: originalX,
			y: originalY,
			width: originalWidth,
			height: originalHeight
		}
	};
};

class _action_OnEnter
{
	constructor(animater)
	{
		this.animater = animater;
	}
    
	execute(currentNode)
	{
		this.animater.KnobHover = true;
		ccbInvokeAction(this.animater.Hover_Action);
	}
};


class _action_OnClick
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{

    }
};


class _action_OnLeave
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{
		this.animater.KnobHover = false;

		if (this.animater.scaledKnob && !this.animater.drag)
		{
			//ccbSetSceneNodeProperty(this.Knob,"Pos X (percent)",this.KnobData.x);
			ccbSetSceneNodeProperty(this.animater.Knob, "Pos Y (percent)", this.animater.KnobData.y);
			ccbSetSceneNodeProperty(this.animater.Knob, "Width (percent)", this.animater.KnobData.width);
			ccbSetSceneNodeProperty(this.animater.Knob, "Height (percent)", this.animater.KnobData.height);

			this.animater.scaledKnob = false;
		}
	}
};

export default class behavior_Slider
{
	constructor()
	{
		this.mouseX = false;
		this.mouseY = false;
		this.init = false;
		this.drag = false;
		this.valueboxOverlay = false;
		this.hover = false;
		this.KnobData = false;
	}

	onAnimate(currentNode)
	{
		this.KnobVisibility = ccbGetSceneNodeProperty(this.Knob, "Visible");
		this.Slider_Visibility = ccbGetSceneNodeProperty(this.Bar, "Visible");

		if (!this.KnobVisibility && !this.Slider_Visibility)
		{
			return false;
		}

		if (!this.Slider_Visibility)
		{
			return false;
		}

		if (!this.init)
		{
			this.Slider = this.Bar;
			ccbSetCopperCubeVariable(this.Variable, this.Initial_Value);
			ccbSetSceneNodeProperty(this.Knob, "Position Mode", "relative (percent)");
			ccbSetSceneNodeProperty(this.Slider, "Position Mode", "relative (percent)");
			this.screenX = ccbGetScreenWidth();
			this.screenY = ccbGetScreenHeight();

			let animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, () =>
			{
				if (!this.scaledup)
				{
					this.originalKnob = { ...this.KnobData };
					this.originalClickedKnob = scaleOverlay(this.originalKnob, 1)
						.originalOverlay;
					let scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob)
						.scaledOverlay;

					//ccbSetSceneNodeProperty(this.Knob,"Pos X (percent)",scaledClickKnob.x);
					ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", scaledClickKnob.y);
					ccbSetSceneNodeProperty(this.Knob, "Width (percent)", scaledClickKnob.width);
					ccbSetSceneNodeProperty(this.Knob, "Height (percent)", scaledClickKnob.height);

					this.scaledKnob = true;
				}
				this.drag = true;
				ccbInvokeAction(this.Drag_Action);
			});
			animator1.TheActionHandler = new _action_OnClick(this);

			let animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, () =>
			{});
			animator2.ActionHandlerOnEnter = new _action_OnEnter(this);
			animator2.ActionHandlerOnLeave = new _action_OnLeave(this);

			currentNode.addAnimator(animator1);
			currentNode.addAnimator(animator2);

			this.init = true;
		}
		this.mouseX = ccbGetMousePosX() * ccbGetDevicePixelRatio();
		this.mouseY = ccbGetMousePosY() * ccbGetDevicePixelRatio();

		ccbSetSceneNodeProperty(this.Slider, "Width (percent)", ccbGetSceneNodeProperty(currentNode, "Texture Width (percent)"));
		ccbSetSceneNodeProperty(this.Slider, "Height (percent)", ccbGetSceneNodeProperty(currentNode, "Texture Height (percent)"));

		this.posX_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos X (percent)");
		this.posY_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos Y (percent)");
		this.posX_Slider = ccbGetSceneNodeProperty(this.Slider, "Pos X (percent)");
		this.posY_Slider = ccbGetSceneNodeProperty(this.Slider, "Pos Y (percent)");

		this.Width_Knob = ccbGetSceneNodeProperty(this.Knob, "Width (percent)");
		this.Height_Knob = ccbGetSceneNodeProperty(this.Knob, "Height (percent)");
		this.Width_Slider = ccbGetSceneNodeProperty(this.Slider, "Width (percent)");
		this.Height_Slider = ccbGetSceneNodeProperty(this.Slider, "Height (percent)");

		if (!this.valueboxOverlay)
		{
			this.valueboxOverlay = true;
			let sliderFill = ccbCloneSceneNode(this.Slider);
			ccbSetSceneNodeParent(sliderFill, this.Slider);

			if (this.Use_Image)
			{
				ccbSetSceneNodeProperty(sliderFill, "Image", this.SliderFill_Image);
				ccbSetSceneNodeProperty(sliderFill, "Draw Background", false);
				ccbSetSceneNodeProperty(this.Knob, "Draw Background", false);
				ccbSetSceneNodeProperty(this.Slider, "Draw Background", false);
			}
			else ccbSetSceneNodeProperty(sliderFill, "Image", "");

			this.posX_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Pos X (percent)");
			this.posY_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Pos Y (percent)");

			this.Width_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Width (percent)");
			this.Height_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Height (percent)");

			ccbSetSceneNodeProperty(sliderFill, "Name", ccbGetSceneNodeProperty(this.Slider, "Name") + "#JIC_slider_fill");
			if (!this.Use_Image)
			{
				let color = ccbGetSceneNodeProperty(sliderFill, "Background Color");
				let colorAlpha = ccbGetSceneNodeProperty(sliderFill, "Alpha");

				let SliderFillColor = CL3D.convertIntColor(this.SliderFillColor);
				SliderFillColor = CL3D.createColor(colorAlpha, SliderFillColor.r, SliderFillColor.g, SliderFillColor.b);
				if (this.AutoFillColor)
				{
					color = CL3D.convertIntColor(color);
					color = CL3D.createColor(color.a, (color.r + 255) / 2, (color.g + 255) / 2, (color.b + 255) / 2);
					ccbSetSceneNodeProperty(sliderFill, "Background Color", color);
				}
				else ccbSetSceneNodeProperty(sliderFill, "Background Color", SliderFillColor);
			}
		}
		let sliderFill = ccbGetSceneNodeFromName(ccbGetSceneNodeProperty(this.Slider, "Name") + "#JIC_slider_fill");
		ccbSetSceneNodeProperty(sliderFill, "Width (percent)", ccbGetSceneNodeProperty(currentNode, "Texture Width (percent)"));
		ccbSetSceneNodeProperty(sliderFill, "Height (percent)", ccbGetSceneNodeProperty(currentNode, "Texture Height (percent)"));

		if (this.FillFromCenter)
		{
			if (this.posX_Knob < this.posX_Slider + this.Width_Slider / 2)
			{
				ccbSetSceneNodeProperty(sliderFill, "Pos X (percent)", this.posX_Knob + this.Width_Knob);
				ccbSetSceneNodeProperty(sliderFill, "Width (percent)", this.posX_Slider - this.posX_Knob + this.Width_Slider / 2 - this.Width_Knob);
			}
			if (this.posX_Knob > this.posX_Slider + this.Width_Slider / 2)
			{
				ccbSetSceneNodeProperty(sliderFill, "Pos X (percent)", this.posX_Slider + this.Width_Slider / 2);
				ccbSetSceneNodeProperty(sliderFill, "Width (percent)", this.posX_Knob - this.posX_SliderFill - this.Width_Slider / 2 + 1);
			}
		}
		else ccbSetSceneNodeProperty(sliderFill, "Width (percent)", this.posX_Knob - this.posX_Slider + (this.Width_Knob / 2));

		if (this.Reverse_SliderFill)
		{
			ccbSetSceneNodeProperty(sliderFill, "Pos X (percent)", this.posX_Knob + this.Width_Knob);
			ccbSetSceneNodeProperty(sliderFill, "Width (percent)", this.posX_Slider - this.posX_Knob + this.Width_Slider - this.Width_Knob);
		}

		let variable = ccbGetCopperCubeVariable(this.variable);
		variable = parseFloat(variable);
		this.sliderMax = this.posX_Slider + this.Width_Slider - this.Width_Knob;
		this.sliderMin = this.posX_Slider;

		// New code to fix the bug from the previous code that was causing issue when we have knob scaled on hover and click
		// Check if dragging
		if (this.drag)
		{
			// Calculate position based on mouseX
			let newPos = (ccbGetMousePosX() * ccbGetDevicePixelRatio()) / ccbGetScreenWidth() * 100 - (this.Width_Knob / 2);
			if (newPos < this.sliderMin) newPos = this.sliderMin;
			else if (newPos > this.sliderMax) newPos = this.sliderMax;

			// Set position of the Knob
			ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", newPos);
			let clampedValue = Math.round(clamp(newPos, this.sliderMin, this.sliderMax, this.Min, this.Max));
			ccbSetCopperCubeVariable(this.Variable, clampedValue);
		}

		let variableValue = ccbGetCopperCubeVariable(this.Variable);
		let newPos = mapValue(variableValue, this.Min, this.Max, this.sliderMin, this.sliderMax);
		ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", newPos);

		if (variableValue > this.Max)
			ccbSetCopperCubeVariable(this.Variable, this.Max);

		if (variableValue < this.Min)
			ccbSetCopperCubeVariable(this.Variable, this.Min);

		if (!this.KnobData)
			this.KnobData = {
				x: this.posX_Knob,
				y: this.posY_Knob,
				width: this.Width_Knob,
				height: this.Height_Knob
			};
	}

	onMouseEvent(mouseEvent, mouseWheelDelta, node)
	{
		if (!this.KnobVisibility && !this.Slider_Visibility)
		{
			return false;
		}

		if (!this.Slider_Visibility)
		{
			return false;
		}

		if (mouseEvent == 2 || Global.MouseOut)
		{
			this.drag = false;
			if (this.scaledKnob && this.originalClickedKnob)
			{
				//ccbSetSceneNodeProperty(this.Knob,"Pos X (percent)",this.originalClickedKnob.x);
				ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", this.originalClickedKnob.y);
				ccbSetSceneNodeProperty(this.Knob, "Width (percent)", this.originalClickedKnob.width);
				ccbSetSceneNodeProperty(this.Knob, "Height (percent)", this.originalClickedKnob.height);

				this.scaledKnob = false;
			}
			Global.MouseOut = false;
		}
	}
};
