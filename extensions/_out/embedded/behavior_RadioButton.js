import * as CL3D from '__dirname/cl3d.js';

/*
    <behavior jsname="behavior_RadioButton" description="Radio Button">         
        <property name="Active_Color" type="color" />        
        <property name="Variable" type="string" />        
        <property name="Value" type="string" />     
        <property name="Action" type="action" />     
        <property name="Use_Image" type="bool" />     
        <property name="Active_Image" type="texture" />      
        <property name="Scale_Hover" type="float" default = "1" />     
        <property name="Scale_Click" type="float" default = "0.9" />     
    </behavior>
*/


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
class _action_OnEnter
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{

	}
}
class _action_OnClick
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{
		if (this.animater.scaled)
		{
			ccbSetSceneNodeProperty(this.animater.Radio, "Pos X (percent)", this.animater.originalClicked.x);
			ccbSetSceneNodeProperty(this.animater.Radio, "Pos Y (percent)", this.animater.originalClicked.y);
			ccbSetSceneNodeProperty(this.animater.Radio, "Width (percent)", this.animater.originalClicked.width);
			ccbSetSceneNodeProperty(this.animater.Radio, "Height (percent)", this.animater.originalClicked.height);

			this.animater.scaled = false;
		}
	}
}
class _action_OnLeave
{
	constructor(animater)
	{
		this.animater = animater;
	}

	execute(currentNode)
	{
		if (this.animater.scaled)
		{
			ccbSetSceneNodeProperty(this.animater.Radio, "Pos X (percent)", this.animater.overlayData.x);
			ccbSetSceneNodeProperty(this.animater.Radio, "Pos Y (percent)", this.animater.overlayData.y);
			ccbSetSceneNodeProperty(this.animater.Radio, "Width (percent)", this.animater.overlayData.width);
			ccbSetSceneNodeProperty(this.animater.Radio, "Height (percent)", this.animater.overlayData.height);

			this.animater.scaled = false;
		}
	}
}
class behavior_RadioButton
{
	constructor()
	{
		this.mouseX = false;
		this.mouseY = false;
		this.init = false;
		this.scaled = false;
		this.overlayData = false;
	}

	onAnimate(currentNode)
	{
		this.Radio = currentNode;

		if (!this.init)
		{
			ccbSetSceneNodeProperty(this.Radio, "Position Mode", "relative (percent)");
			this.InActiveImage = ccbGetSceneNodeProperty(this.Radio, "Image");
			if (!this.Use_Image)
			{
				ccbSetSceneNodeProperty(this.Radio, "Draw Background", true);
				this.InActiveColor = ccbGetSceneNodeProperty(this.Radio, "Background Color");
				this.Alpha = ccbGetSceneNodeProperty(this.Radio, "Alpha");
			}

			this.screenX = ccbGetScreenWidth();
			this.screenY = ccbGetScreenHeight();

			let animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, () =>
			{
				if (!this.scaledup)
				{
					this.originalOverlay = { ...this.overlayData };
					this.originalClicked = scaleOverlay(this.originalOverlay, 1).originalOverlay;
					let scaledClick = scaleOverlay(this.originalOverlay, this.Scale_Click).scaledOverlay;

					ccbSetSceneNodeProperty(this.Radio, "Pos X (percent)", scaledClick.x);
					ccbSetSceneNodeProperty(this.Radio, "Pos Y (percent)", scaledClick.y);
					ccbSetSceneNodeProperty(this.Radio, "Width (percent)", scaledClick.width);
					ccbSetSceneNodeProperty(this.Radio, "Height (percent)", scaledClick.height);

					this.scaled = true;
				}

				ccbSetCopperCubeVariable(this.Variable, this.Value);
				if (ccbGetCopperCubeVariable(this.Variable) == this.Value)
				{
					ccbInvokeAction(this.Action);
				}
			});
			animator1.UseCustomEvent = true;
			animator1.TheActionHandler = new _action_OnClick(this);

			let animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine);
			animator2.ActionHandlerOnEnter = new _action_OnEnter(this);
			animator2.ActionHandlerOnLeave = new _action_OnLeave(this);

			currentNode.addAnimator(animator1);
			currentNode.addAnimator(animator2);

			this.init = true;
		}

		this.mouseX = ccbGetMousePosX() * ccbGetDevicePixelRatio();
		this.mouseY = ccbGetMousePosY() * ccbGetDevicePixelRatio();

		this.posX_Radio = ccbGetSceneNodeProperty(this.Radio, "Pos X (percent)");
		this.posY_Radio = ccbGetSceneNodeProperty(this.Radio, "Pos Y (percent)");

		let variable = ccbGetCopperCubeVariable(this.Variable);
		if (variable != this.Value)
		{
			if (this.Use_Image) ccbSetSceneNodeProperty(this.Radio, "Image", this.InActiveImage);
			else ccbSetSceneNodeProperty(this.Radio, "Background Color", this.InActiveColor);
		}
		else
		{
			if (this.Use_Image) ccbSetSceneNodeProperty(this.Radio, "Image", this.Active_Image);
			else
			{
				let Color = CL3D.convertIntColor(this.Active_Color);
				Color = CL3D.createColor(this.Alpha, Color.r, Color.g, Color.b);
				ccbSetSceneNodeProperty(this.Radio, "Background Color", Color);
			}
		}

		this.Width_Radio = ccbGetSceneNodeProperty(this.Radio, "Width (percent)");
		this.Height_Radio = ccbGetSceneNodeProperty(this.Radio, "Height (percent)");

		if (!this.overlayData)
            this.overlayData = {
			x: this.posX_Radio,
			y: this.posY_Radio,
			width: this.Width_Radio,
			height: this.Height_Radio
		};

	}

	onMouseEvent(mouseEvent, mouseWheelDelta, node)
	{

    }
}

export { behavior_RadioButton as default };
