import * as CL3D from '__dirname/cl3d.js';

/*
    <behavior jsname="behavior_ToggleButton" description="Toggle Button">
        <property name="Bar" type="scenenode" />
        <property name="Knob" type="scenenode" />
        <property name="Variable" type="string" />
        <property name="Bar_ON_Color" type="color" />
        <property name="Auto_Color_Bar" type="bool" default="true" />
        <property name="Knob_ON_Color" type="color" />
        <property name="Scale_Hover_Knob" type="float" default = "1" />
        <property name="Scale_Click_Knob" type="float" default = "1" />
        <property name="Additional_Position" type="float" default = "10" />
        <property name="Use_Image" type="bool" default = "false" />
        <property name="Bar_ON_Image" type="texture" />
        <property name="Knob_ON_Image" type="texture"  />
        <property name="InitialState" type="bool" default = "true" />
        <property name="Animated" type="bool" default = "true" />
    </behavior>
*/


function lerp(start, end, t)
{
	return start * (1 - t) + end * t;
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
}
class _action_Knob_OnEnter
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{

    }
}
class _action_Knob_OnClick
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute()
	{
		if (this.animater.scaledKnob)
		{
			if (this.animater.KnobName == this.animater.BarName) ccbSetSceneNodeProperty(this.animater.Knob, "Pos X (percent)", this.animater.originalClickedKnob.x);
			ccbSetSceneNodeProperty(this.animater.Knob, "Pos Y (percent)", this.animater.originalClickedKnob.y);
			ccbSetSceneNodeProperty(this.animater.Knob, "Width (percent)", this.animater.originalClickedKnob.width);
			ccbSetSceneNodeProperty(this.animater.Knob, "Height (percent)", this.animater.originalClickedKnob.height);

			this.animater.scaledKnob = false;
		}
	}
}
class _action_Knob_OnLeave
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{
		if (this.animater.scaledKnob)
		{
			if (this.animater.KnobName == this.animater.BarName) ccbSetSceneNodeProperty(this.animater.Knob, "Pos X (percent)", this.animater.KnobData.x);
			ccbSetSceneNodeProperty(this.animater.Knob, "Pos Y (percent)", this.animater.KnobData.y);
			ccbSetSceneNodeProperty(this.animater.Knob, "Width (percent)", this.animater.KnobData.width);
			ccbSetSceneNodeProperty(this.animater.Knob, "Height (percent)", this.animater.KnobData.height);

			this.animater.scaledKnob = false;
		}
	}
}
class behavior_ToggleButton
{
	constructor()
	{
		this.mouseX = false;
		this.mouseY = false;
		this.init = false;
		this.scaledKnob = false;
	}

	onAnimate(currentNode)
	{

		if (!this.init)
		{
			ccbSetSceneNodeProperty(this.Knob, "Position Mode", "relative (percent)");
			ccbSetSceneNodeProperty(this.Bar, "Position Mode", "relative (percent)");

			if (!this.Use_Image)
			{
				this.Knob_OFF_Color = ccbGetSceneNodeProperty(this.Knob, "Background Color");
				this.Knob_Alpha = ccbGetSceneNodeProperty(this.Knob, "Alpha");
				this.Bar_Alpha = ccbGetSceneNodeProperty(this.Bar, "Alpha");
				this.Bar_OFF_Color = ccbGetSceneNodeProperty(this.Bar, "Background Color");
			}

			this.Bar_OFF_Image = ccbGetSceneNodeProperty(this.Bar, "Image");
			this.Knob_OFF_Image = ccbGetSceneNodeProperty(this.Knob, "Image");
			this.screenX = ccbGetScreenWidth();
			this.screenY = ccbGetScreenHeight();
			this.toggle = this.InitialState;

			let animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, () =>
			{
				if (!this.scaledup)
				{
					this.originalKnob = { ...this.KnobData };
					this.originalClickedKnob = scaleOverlay(this.originalKnob, 1)
						.originalOverlay;
					let scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob)
						.scaledOverlay;
					if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", scaledClickKnob.x);
					ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", scaledClickKnob.y);
					ccbSetSceneNodeProperty(this.Knob, "Width (percent)", scaledClickKnob.width);
					ccbSetSceneNodeProperty(this.Knob, "Height (percent)", scaledClickKnob.height);

					this.scaledKnob = true;

					this.toggle = !this.toggle;
				}
			});
			animator1.TheActionHandler = new _action_Knob_OnClick(this);

			let animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine);
			animator2.ActionHandlerOnEnter = new _action_Knob_OnEnter(this);
			animator2.ActionHandlerOnLeave = new _action_Knob_OnLeave(this);

			this.Knob.addAnimator(animator1);
			this.Knob.addAnimator(animator2);

			this.init = true;
		}
		this.mouseX = ccbGetMousePosX() * ccbGetDevicePixelRatio();
		this.mouseY = ccbGetMousePosY() * ccbGetDevicePixelRatio();

		this.posX_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos X (percent)");
		this.posY_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos Y (percent)");
		this.posX_Bar = ccbGetSceneNodeProperty(this.Bar, "Pos X (percent)");
		this.posY_Bar = ccbGetSceneNodeProperty(this.Bar, "Pos Y (percent)");

		this.Width_Knob = ccbGetSceneNodeProperty(this.Knob, "Width (percent)");
		this.Height_Knob = ccbGetSceneNodeProperty(this.Knob, "Height (percent)");
		this.Width_Bar = ccbGetSceneNodeProperty(this.Bar, "Width (percent)");
		this.Height_Bar = ccbGetSceneNodeProperty(this.Bar, "Height (percent)");

		this.Width_Bar_Texture = ccbGetSceneNodeProperty(currentNode, "Texture Width (percent)");

		if (this.Animated)
		{
			if (this.toggle)
			{
				ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", lerp(this.posX_Knob, this.posX_Bar + this.Width_Bar_Texture - this.Width_Knob - this.Additional_Position, 0.4));
			}
			else
			{
				ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", lerp(this.posX_Knob, this.posX_Bar + this.Additional_Position, 0.4));
			}
		}

		if (this.toggle)
		{

			if (this.Use_Image)
			{
				ccbSetSceneNodeProperty(this.Knob, "Image", this.Knob_ON_Image);
				ccbSetSceneNodeProperty(this.Bar, "Image", this.Bar_ON_Image);
			}
			else
			{
				let color = ccbGetSceneNodeProperty(this.Knob, "Background Color");
				let Knob_ON_Color = CL3D.convertIntColor(this.Knob_ON_Color);
				Knob_ON_Color = CL3D.createColor(this.Knob_Alpha, Knob_ON_Color.r, Knob_ON_Color.g, Knob_ON_Color.b);
				let Bar_ON_Color = CL3D.convertIntColor(this.Bar_ON_Color);
				Bar_ON_Color = CL3D.createColor(this.Bar_Alpha, Bar_ON_Color.r, Bar_ON_Color.g, Bar_ON_Color.b);
				ccbSetSceneNodeProperty(this.Knob, "Background Color", Knob_ON_Color);
				if (this.Auto_Color_Bar)
				{
					color = CL3D.convertIntColor(color);
					color = CL3D.createColor(color.a, (color.r + 255) / 2, (color.g + 255) / 2, (color.b + 255) / 2);
					ccbSetSceneNodeProperty(this.Bar, "Background Color", color);
				}
				else ccbSetSceneNodeProperty(this.Bar, "Background Color", Bar_ON_Color);
			}
		}
		else
		{
			if (this.Use_Image)
			{
				ccbSetSceneNodeProperty(this.Knob, "Image", this.Knob_OFF_Image);
				ccbSetSceneNodeProperty(this.Bar, "Image", this.Bar_OFF_Image);
			}
			else
			{
				let color = ccbGetSceneNodeProperty(this.Knob, "Background Color");
				let Knob_OFF_Color = CL3D.convertIntColor(this.Knob_OFF_Color);
				Knob_OFF_Color = CL3D.createColor(this.Knob_Alpha, Knob_OFF_Color.r, Knob_OFF_Color.g, Knob_OFF_Color.b);
				let Bar_OFF_Color = CL3D.convertIntColor(this.Bar_OFF_Color);
				Bar_OFF_Color = CL3D.createColor(this.Bar_Alpha, Bar_OFF_Color.r, Bar_OFF_Color.g, Bar_OFF_Color.b);
				ccbSetSceneNodeProperty(this.Knob, "Background Color", Knob_OFF_Color);
				if (this.Auto_Color_Bar)
				{
					color = CL3D.convertIntColor(color);
					color = CL3D.createColor(color.a, (color.r + 255) / 2, (color.g + 255) / 2, (color.b + 255) / 2);
					ccbSetSceneNodeProperty(this.Bar, "Background Color", color);
				}
				else ccbSetSceneNodeProperty(this.Bar, "Background Color", Bar_OFF_Color);
			}
		}

		ccbSetCopperCubeVariable(this.Variable, String(this.toggle));

		if (!this.KnobData)
		{
			this.KnobData = {
				x: this.posX_Knob,
				y: this.posY_Knob,
				width: this.Width_Knob,
				height: this.Height_Knob
			};
		}
		this.BarName = ccbGetSceneNodeProperty(this.Bar, "Name");
		this.KnobName = ccbGetSceneNodeProperty(this.Knob, "Name");
	}

	onMouseEvent(mouseEvent, mouseWheelDelta, node)
	{

	}
}

export { behavior_ToggleButton as default };
