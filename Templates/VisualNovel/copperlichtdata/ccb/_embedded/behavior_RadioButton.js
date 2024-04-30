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

behavior_RadioButton = function()
{
    this.mouseX = false;
    this.mouseY = false;
    this.init = false;
    this.scaled = false;
    this.overlayData = false;
}

function rgbaToInt(r, g, b, a)
{
    a = typeof a !== 'undefined' ? a : 255;
    return (a << 24) + (r << 16) + (g << 8) + b;
}

function intToRgba(intValue)
{
    var r = (intValue >> 16) & 255;
    var g = (intValue >> 8) & 255;
    var b = intValue & 255;
    var a = (intValue >> 24) & 255; // Alpha channel

    return { r: r, g: g, b: b, a: a };
}

function RGB(decimalcolorcode)
{
    var color = (decimalcolorcode); // use the property type or put a decimal color value.
    var Rr = (color & 0xff0000) >> 16; // get red color by bitwise operation  
    var Gg = (color & 0x00ff00) >> 8; // get green color by bitwise operation 
    var Bb = (color & 0x0000ff); // get blue color by bitwise operation 
    var RrGgBb = new vector3d(Rr, Gg, Bb);
    var r = (Rr / 255); // dividing red by 255 to clamp b/w 0-1 
    var g = (Gg / 255); // dividing green by 255 to clamp b/w 0-1 
    var b = (Bb / 255); // dividing blue by 255 to clamp b/w 0-1 
    var rgb = new vector3d(r, g, b); // final rgb value to use in the editor

    return RrGgBb;
}
// Function to animate overlay by scaling it equally while maintaining it at center
function scaleOverlay(overlay, scaleFactor)
{
    var originalX = overlay.x;
    var originalY = overlay.y;
    var originalWidth = overlay.width;
    var originalHeight = overlay.height;
    var newWidth = originalWidth * scaleFactor;
    var newHeight = originalHeight * scaleFactor;
    var widthDiff = originalWidth - newWidth;
    var heightDiff = originalHeight - newHeight;
    var newX = originalX + (widthDiff / 2);
    var newY = originalY + (heightDiff / 2);
    overlay.x = newX;
    overlay.y = newY;
    overlay.width = newWidth;
    overlay.height = newHeight;

    return {
        scaledOverlay: overlay,
        originalOverlay: {
            x: originalX,
            y: originalY,
            width: originalWidth,
            height: originalHeight
        }
    };
}

behavior_RadioButton.prototype.onAnimate = function(currentNode)
{

    this.Radio = currentNode;
    this.Platform = ccbGetPlatform();
    if (!this.init)
    {
        ccbSetSceneNodeProperty(this.Radio, "Position Mode", "absolute (pixels)");
        this.InActiveImage = ccbGetSceneNodeProperty(this.Radio, "Image");
        if (!this.Use_Image)
        {
            ccbSetSceneNodeProperty(this.Radio, "Draw Background", true);
            this.InActiveColor = ccbGetSceneNodeProperty(this.Radio, "Background Color");
            this.Alpha = ccbGetSceneNodeProperty(this.Radio, "Alpha");
        }

        this.screenX = ccbGetScreenWidth();
        this.screenY = ccbGetScreenHeight();
        this.init = true;
    }
    this.mouseX = ccbGetMousePosX() * CL3D.engine.DPR;
    this.mouseY = ccbGetMousePosY() * CL3D.engine.DPR;

    this.posX_Radio = ccbGetSceneNodeProperty(this.Radio, "Pos X (pixels)");
    this.posY_Radio = ccbGetSceneNodeProperty(this.Radio, "Pos Y (pixels)");

    var variable = ccbGetCopperCubeVariable(this.Variable);
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
            var Color = intToRgba(this.Active_Color);
            Color = rgbaToInt(Color.r, Color.g, Color.b, this.Alpha);
            ccbSetSceneNodeProperty(this.Radio, "Background Color", Color);
        }
    }
    this.Width_Radio = ccbGetSceneNodeProperty(this.Radio, "Width (pixels)");
    this.Height_Radio = ccbGetSceneNodeProperty(this.Radio, "Height (pixels)");
    
    if (!this.overlayData) this.overlayData =
    {
        x: this.posX_Radio,
        y: this.posY_Radio,
        width: this.Width_Radio,
        height: this.Height_Radio
    }

}

behavior_RadioButton.prototype.onMouseEvent = function(mouseEvent, mouseWheelDelta, node)
{
    this.scaleX_Radio = this.posX_Radio + this.Width_Radio;
    this.scaleY_Radio = this.posY_Radio + this.Height_Radio;
    if (this.mouseX >= this.posX_Radio && this.mouseX <= this.scaleX_Radio && this.mouseY >= this.posY_Radio && this.mouseY <= this.scaleY_Radio)
    {
        if (!this.scaled)
        {
            this.originalOverlay = scaleOverlay(this.overlayData, 1).originalOverlay;
            var scaled = scaleOverlay(this.originalOverlay, this.Scale_Hover).scaledOverlay;

            ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", scaled.x);
            ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", scaled.y);
            ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", scaled.width);
            ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", scaled.height);

            this.scaled = true;
        }
        if (mouseEvent == 3)
        {
            if (!this.scaledup)
            {
                this.originalClicked = scaleOverlay(this.originalOverlay, 1).originalOverlay;
                var scaledClick = scaleOverlay(this.originalOverlay, this.Scale_Click).scaledOverlay;

                ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", scaledClick.x);
                ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", scaledClick.y);
                ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", scaledClick.width);
                ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", scaledClick.height);
                
                this.scaled = true;
            }

            ccbSetCopperCubeVariable(this.Variable, this.Value);
            if (ccbGetCopperCubeVariable(this.Variable) == this.Value)
            {
                ccbInvokeAction(this.Action);
            }
        }
    }
    else
    {
        if (this.scaled)
        {
            ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", this.overlayData.x);
            ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", this.overlayData.y);
            ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", this.overlayData.width);
            ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", this.overlayData.height);
            
            this.scaled = false;
        }
    }
    if (mouseEvent == 2)
    {
        if (this.scaled)
        {
            ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", this.originalClicked.x);
            ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", this.originalClicked.y);
            ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", this.originalClicked.width);
            ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", this.originalClicked.height);
            
            this.scaled = false;
        }
    }

}
