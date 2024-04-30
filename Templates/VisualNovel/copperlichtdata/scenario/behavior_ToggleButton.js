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

behavior_ToggleButton = function()
{
    this.mouseX = false;
    this.mouseY = false;
    this.init = false;
    this.drag = false;
    this.valueboxOverlay = false;
    this.hover = false;
    this.init = false;
}
function clamp(value, minValue, maxValue, clampMin, clampMax)
{
    var normalizedValue = (value - minValue) / (maxValue - minValue);
    var clampedValue = normalizedValue * (clampMax - clampMin) + clampMin;
    return Math.max(clampMin, Math.min(clampMax, clampedValue));
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

function lerp(start, end, t)
{
    return start * (1 - t) + end * t;
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

behavior_ToggleButton.prototype.onAnimate = function(currentNode)
{

    if (!this.init)
    {
        this.Platform = ccbGetPlatform();
        ccbSetSceneNodeProperty(this.Knob, "Position Mode", "absolute (pixels)");
        ccbSetSceneNodeProperty(this.Bar, "Position Mode", "absolute (pixels)");
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
        this.init = true;
    }
    this.mouseX = ccbGetMousePosX() * CL3D.engine.DPR;
    this.mouseY = ccbGetMousePosY() * CL3D.engine.DPR;

    this.posX_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos X (pixels)");
    this.posY_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos Y (pixels)");
    this.posX_Bar = ccbGetSceneNodeProperty(this.Bar, "Pos X (pixels)");
    this.posY_Bar = ccbGetSceneNodeProperty(this.Bar, "Pos Y (pixels)");

    this.Width_Knob = ccbGetSceneNodeProperty(this.Knob, "Width (pixels)");
    this.Height_Knob = ccbGetSceneNodeProperty(this.Knob, "Height (pixels)");
    this.Width_Bar = ccbGetSceneNodeProperty(this.Bar, "Width (pixels)");
    this.Height_Bar = ccbGetSceneNodeProperty(this.Bar, "Height (pixels)");
    
    if (this.Animated)
    {
        if (this.toggle)
        {

            ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", lerp(this.posX_Knob, this.posX_Bar + this.Width_Bar - this.Width_Knob + 1 - this.Additional_Position, 0.4));
        }
        else
        {
            ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", lerp(this.posX_Knob, this.posX_Bar + this.Additional_Position, 0.4));
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
            var color = ccbGetSceneNodeProperty(this.Knob, "Background Color");
            var Knob_ON_Color = intToRgba(this.Knob_ON_Color);
            Knob_ON_Color = rgbaToInt(Knob_ON_Color.r, Knob_ON_Color.g, Knob_ON_Color.b, this.Knob_Alpha);
            var Bar_ON_Color = intToRgba(this.Bar_ON_Color);
            Bar_ON_Color = rgbaToInt(Bar_ON_Color.r, Bar_ON_Color.g, Bar_ON_Color.b, this.Bar_Alpha);
            ccbSetSceneNodeProperty(this.Knob, "Background Color", Knob_ON_Color);
            if (this.Auto_Color_Bar)
            {
                color = intToRgba(color);
                color = rgbaToInt((color.r + 255) / 2, (color.g + 255) / 2, (color.b + 255) / 2, color.a);
                ccbSetSceneNodeProperty(this.Bar, "Background Color", color);
            }
            else ccbSetSceneNodeProperty(this.Bar, "Background Color", Bar_ON_Color);
            //ccbSetSceneNodeProperty(this.Bar, "Background Color", Bar_ON_Color);
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
            var Knob_OFF_Color = intToRgba(this.Knob_OFF_Color);
            Knob_OFF_Color = rgbaToInt(Knob_OFF_Color.r, Knob_OFF_Color.g, Knob_OFF_Color.b, this.Knob_Alpha);
            var Bar_OFF_Color = intToRgba(this.Bar_OFF_Color);
            Bar_OFF_Color = rgbaToInt(Bar_OFF_Color.r, Bar_OFF_Color.g, Bar_OFF_Color.b, this.Bar_Alpha);
            ccbSetSceneNodeProperty(this.Knob, "Background Color", Knob_OFF_Color);
            if (this.Auto_Color_Bar)
            {
                color = intToRgba(color);
                color = rgbaToInt((color.r + 255) / 2, (color.g + 255) / 2, (color.b + 255) / 2, color.a);
                ccbSetSceneNodeProperty(this.Bar, "Background Color", color);
            }
            else ccbSetSceneNodeProperty(this.Bar, "Background Color", Bar_OFF_Color);
        }
    }

    ccbSetCopperCubeVariable(this.Variable, String(this.toggle));

    if (!this.KnobData)
    {
        this.KnobData = { x: this.posX_Knob, y: this.posY_Knob, width: this.Width_Knob, height: this.Height_Knob };
    }
    this.BarName = ccbGetSceneNodeProperty(this.Bar, "Name");
    this.KnobName = ccbGetSceneNodeProperty(this.Knob, "Name");
}

behavior_ToggleButton.prototype.onMouseEvent = function(mouseEvent, mouseWheelDelta, node)
{
    this.scaleX_Knob = this.posX_Knob + this.Width_Knob;
    this.scaleY_Knob = this.posY_Knob + this.Height_Knob;
    if (this.mouseX >= this.posX_Knob && this.mouseX <= this.scaleX_Knob && this.mouseY >= this.posY_Knob && this.mouseY <= this.scaleY_Knob)
    {
        if (!this.scaledKnob)
        {
            this.originalKnob = scaleOverlay(this.KnobData, 1).originalOverlay;
            var scaledKnob = scaleOverlay(this.originalKnob, this.Scale_Hover_Knob).scaledOverlay;
            if (this.KnobName == this.BarName)
            {
                ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", scaledKnob.x);
            }
            ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", scaledKnob.y);
            ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", scaledKnob.width);
            ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", scaledKnob.height);
            
            this.scaledKnob = true;
        }
        if (mouseEvent == 3)
        {
            if (this.KnobHover || this.BarHover)
            {
                if (!this.scaledup)
                {
                    this.originalClickedKnob = scaleOverlay(this.originalKnob, 1).originalOverlay;
                    var scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob).scaledOverlay;
                    if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", scaledClickKnob.x);
                    ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", scaledClickKnob.y);
                    ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", scaledClickKnob.width);
                    ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", scaledClickKnob.height);
                    
                    this.scaledKnob = true;
                }
            }
        }
        this.KnobHover = true;
    }
    else
    {
        if (this.scaledKnob)
        {
            if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", this.KnobData.x);

            ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", this.KnobData.y);
            ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", this.KnobData.width);
            ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", this.KnobData.height);
            
            this.scaledKnob = false;
        }
        this.KnobHover = false;
    }

    this.scaleX_Bar = this.posX_Bar + this.Width_Bar;
    this.scaleY_Bar = this.posY_Bar + this.Height_Bar;
    if ((this.mouseX >= this.posX_Bar && this.mouseX <= this.scaleX_Bar && this.mouseY >= this.posY_Bar && this.mouseY <= this.scaleY_Bar) || this.KnobHover == true)
        this.BarHover = true;
    else this.BarHover = false;

    if (mouseEvent == 3)
    {
        if (this.KnobHover || this.BarHover)
            this.toggle = !this.toggle;
    }
    if (mouseEvent == 2)
    {
        if (this.scaledKnob && this.originalClickedKnob)
        {
            if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", this.originalClickedKnob.x);
            ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", this.originalClickedKnob.y);
            ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", this.originalClickedKnob.width);
            ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", this.originalClickedKnob.height);

            this.scaledKnob = false;
        }
    }
}
