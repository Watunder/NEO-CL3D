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

behavior_Slider = function()
{
    this.mouseX = false;
    this.mouseY = false;
    this.init = false;
    this.drag = false;
    this.valueboxOverlay = false;
    this.hover = false;
    this.KnobData = false;
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

// Map value from one range to another
function mapValue(value, inMin, inMax, outMin, outMax)
{
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
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

// Function to scale down the height of a slider while keeping it centered
function JIC_Scale_Slider_Height(Slider, scale)
{
    var newHeight = Slider.height * scale;
    var heightDiff = Slider.height - newHeight;
    Slider.y += Math.round(heightDiff / 2);
    Slider.height = newHeight;

    return Slider;
}

behavior_Slider.prototype.onAnimate = function (currentNode)
{
    this.KnobVisibility = ccbGetSceneNodeProperty(this.Knob, "Visible");
    this.Slider_Visibility = ccbGetSceneNodeProperty(this.Bar, "Visible");
    if (!this.KnobVisibility && !this.Slider_Visibility) { return false; }
    if (!this.Slider_Visibility) { return false; }
    if (!this.init)
    {
        this.Platform = ccbGetPlatform();
        this.Slider = this.Bar;
        ccbSetCopperCubeVariable(this.Variable, this.Initial_Value);
        ccbSetSceneNodeProperty(this.Knob, "Position Mode", "absolute (pixels)");
        ccbSetSceneNodeProperty(this.Slider, "Position Mode", "absolute (pixels)");
        this.screenX = ccbGetScreenWidth();
        this.screenY = ccbGetScreenHeight();
        this.init = true;
    }
    this.mouseX = ccbGetMousePosX() * CL3D.engine.DPR;
    this.mouseY = ccbGetMousePosY() * CL3D.engine.DPR;

    this.posX_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos X (pixels)");
    this.posY_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos Y (pixels)");
    this.posX_Slider = ccbGetSceneNodeProperty(this.Slider, "Pos X (pixels)");
    this.posY_Slider = ccbGetSceneNodeProperty(this.Slider, "Pos Y (pixels)");

    this.Width_Knob = ccbGetSceneNodeProperty(this.Knob, "Width (pixels)");
    this.Height_Knob = ccbGetSceneNodeProperty(this.Knob, "Height (pixels)");
    this.Width_Slider = ccbGetSceneNodeProperty(this.Slider, "Width (pixels)");
    this.Height_Slider = ccbGetSceneNodeProperty(this.Slider, "Height (pixels)");

    if (this.Platform == "webgl")
    {
        var bgEnable = true;
    }
    else
    {
        var bgEnable = ccbGetSceneNodeProperty(this.Slider, "Draw Background");
    }
    
    if (!this.valueboxOverlay)
    {
        this.valueboxOverlay = true;
        var sliderFill = ccbCloneSceneNode(this.Slider);
        ccbSetSceneNodeParent(sliderFill, this.Slider);

        if (this.Use_Image)
        {
            ccbSetSceneNodeProperty(sliderFill, "Image", this.SliderFill_Image);
            ccbSetSceneNodeProperty(sliderFill, "Draw Background", false);
            ccbSetSceneNodeProperty(this.Knob, "Draw Background", false);
            ccbSetSceneNodeProperty(this.Slider, "Draw Background", false);
        }
        else ccbSetSceneNodeProperty(sliderFill, "Image", "");

        this.posX_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Pos X (pixels)");
        this.posY_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Pos Y (pixels)");

        this.Width_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Width (pixels)");
        this.Height_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Height (pixels)");

        ccbSetSceneNodeProperty(sliderFill, "Name", ccbGetSceneNodeProperty(this.Slider, "Name") + "#JIC_slider_fill");
        if (!this.Use_Image && bgEnable == true)
        {
            var color = ccbGetSceneNodeProperty(sliderFill, "Background Color");
            var colorAlpha = ccbGetSceneNodeProperty(sliderFill, "Alpha");

            var SliderFillColor = intToRgba(this.SliderFillColor);
            SliderFillColor = rgbaToInt(SliderFillColor.r, SliderFillColor.g, SliderFillColor.b, colorAlpha);
            if (this.AutoFillColor)
            {
                color = intToRgba(color);
                color = rgbaToInt((color.r + 255) / 2, (color.g + 255) / 2, (color.b + 255) / 2, color.a);
                ccbSetSceneNodeProperty(sliderFill, "Background Color", color);
            }
            else ccbSetSceneNodeProperty(sliderFill, "Background Color", SliderFillColor);
            
        }
    }
    var sliderFill = ccbGetSceneNodeFromName(ccbGetSceneNodeProperty(this.Slider, "Name") + "#JIC_slider_fill");
    var rectangle = { x: this.posX_SliderFill, y: this.posY_SliderFill, width: this.Width_SliderFill, height: this.Height_SliderFill };
    var newheight = JIC_Scale_Slider_Height(rectangle, this.SliderFillHeight);
    ccbSetSceneNodeProperty(sliderFill, "Pos Y (pixels)", newheight.y);
    ccbSetSceneNodeProperty(sliderFill, "Height (pixels)", newheight.height - this.AdditionalHeight);
    
    if (this.FillFromCenter)
    {
        if (this.posX_Knob < this.posX_Slider + this.Width_Slider / 2) {
            ccbSetSceneNodeProperty(sliderFill, "Pos X (pixels)", this.posX_Knob + this.Width_Knob);
            ccbSetSceneNodeProperty(sliderFill, "Width (pixels)", this.posX_Slider - this.posX_Knob + this.Width_Slider / 2 - this.Width_Knob);
        }
        if (this.posX_Knob > this.posX_Slider + this.Width_Slider / 2) {
            ccbSetSceneNodeProperty(sliderFill, "Pos X (pixels)", this.posX_Slider + this.Width_Slider / 2);
            ccbSetSceneNodeProperty(sliderFill, "Width (pixels)", this.posX_Knob - this.posX_SliderFill - this.Width_Slider / 2 + 1);
        }
    }
    else ccbSetSceneNodeProperty(sliderFill, "Width (pixels)", this.posX_Knob - this.posX_Slider + (this.Width_Knob / 2));

    if (this.Reverse_SliderFill)
    {
        ccbSetSceneNodeProperty(sliderFill, "Pos X (pixels)", this.posX_Knob + this.Width_Knob);
        ccbSetSceneNodeProperty(sliderFill, "Width (pixels)", this.posX_Slider - this.posX_Knob + this.Width_Slider - this.Width_Knob);
    }

    var variable = ccbGetCopperCubeVariable(this.variable);
    variable = parseFloat(variable);
    this.sliderMax = this.posX_Slider + this.Width_Slider - this.Width_Knob;
    this.sliderMin = this.posX_Slider;

    // New code to fix the bug from the previous code that was causing issue when we have knob scaled on hover and click
    // Check if dragging
    if (this.drag)
    {
        // Calculate position based on mouseX
        var newPos = ccbGetMousePosX() * CL3D.engine.DPR - (this.Width_Knob / 2);
        if (newPos < this.sliderMin) newPos = this.sliderMin;
        else if (newPos > this.sliderMax) newPos = this.sliderMax;

        // Set position of the Knob
        ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", newPos);
        var clampedValue = Math.round(clamp(newPos, this.sliderMin, this.sliderMax, this.Min, this.Max));
        ccbSetCopperCubeVariable(this.Variable, clampedValue);
    }

    var variableValue = ccbGetCopperCubeVariable(this.Variable);
    var newPos = mapValue(variableValue, this.Min, this.Max, this.sliderMin, this.sliderMax);
    ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", newPos);
    if (variableValue > this.Max)
        ccbSetCopperCubeVariable(this.Variable, this.Max);
    
    if (variableValue < this.Min)
        ccbSetCopperCubeVariable(this.Variable, this.Min);

    // faulty code that was updating variable on the basis of knob position
    // if (this.drag) {

    // 	if (this.mouseX <= this.sliderMax+(this.Width_Knob/2) && this.mouseX >= this.sliderMin+(this.Width_Knob/2)) {
    // 		ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", ccbGetMousePosX() - (this.Width_Knob / 2));
    // 	}
    // 	if (this.mouseX >= this.sliderMax+(this.Width_Knob/2)) { ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", this.sliderMax); }
    // 	if (this.mouseX <= this.sliderMin) { ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", this.sliderMin); }
    // }
    // if (this.posX_Knob >= this.sliderMax+(this.Width_Knob/2)) { ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", this.sliderMax);}
    // if (this.posX_Knob+1 <= this.sliderMin) { ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", this.sliderMin); }
    // var clampedValue = Math.round(clamp(this.posX_Knob, this.sliderMin, this.sliderMax, this.Min,this.Max));
    // ccbSetCopperCubeVariable(this.Variable, clampedValue);

    if (!this.KnobData)
        this.KnobData = { x: this.posX_Knob, y: this.posY_Knob, width: this.Width_Knob, height: this.Height_Knob };
}

behavior_Slider.prototype.onMouseEvent = function (mouseEvent, mouseWheelDelta, node)
{
    if (!this.KnobVisibility && !this.Slider_Visibility) return false;
    if (!this.Slider_Visibility) return false;

    this.scaleX_Knob = this.posX_Knob + this.Width_Knob;
    this.scaleY_Knob = this.posY_Knob + this.Height_Knob;
    if (this.mouseX >= this.posX_Knob && this.mouseX <= this.scaleX_Knob && this.mouseY >= this.posY_Knob && this.mouseY <= this.scaleY_Knob)
    {
        if (!this.scaledKnob)
        {
            this.originalKnob = scaleOverlay(this.KnobData, 1).originalOverlay;
            var scaledKnob = scaleOverlay(this.originalKnob, this.Scale_Hover_Knob).scaledOverlay;

            //ccbSetSceneNodeProperty(this.Knob,"Pos X (pixels)",scaledKnob.x);
            ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", scaledKnob.y);
            ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", scaledKnob.width);
            ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", scaledKnob.height);

            this.scaledKnob = true;
        }
        this.KnobHover = true;
        ccbInvokeAction(this.Hover_Action);
        if (mouseEvent == 3)
        {
            if (!this.scaledup)
            {
                this.originalClickedKnob = scaleOverlay(this.originalKnob, 1).originalOverlay;
                var scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob).scaledOverlay;
                
                //ccbSetSceneNodeProperty(this.Knob,"Pos X (pixels)",scaledClickKnob.x);
                ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", scaledClickKnob.y);
                ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", scaledClickKnob.width);
                ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", scaledClickKnob.height);
                
                this.scaledKnob = true;
            }
            this.drag = true;
            ccbInvokeAction(this.Drag_Action);
        }
    }
    else
    {
        this.KnobHover = false;

        if (this.scaledKnob && !this.drag)
        {
            //ccbSetSceneNodeProperty(this.Knob,"Pos X (pixels)",this.KnobData.x);
            ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", this.KnobData.y);
            ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", this.KnobData.width);
            ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", this.KnobData.height);
        }
        this.scaledKnob = false;
    }
    if (mouseEvent == 2)
    {
        this.drag = false;
        if (this.scaledKnob && this.originalClickedKnob)
        {
            //ccbSetSceneNodeProperty(this.Knob,"Pos X (pixels)",this.originalClickedKnob.x);
            ccbSetSceneNodeProperty(this.Knob, "Pos Y (pixels)", this.originalClickedKnob.y);
            ccbSetSceneNodeProperty(this.Knob, "Width (pixels)", this.originalClickedKnob.width);
            ccbSetSceneNodeProperty(this.Knob, "Height (pixels)", this.originalClickedKnob.height);

            this.scaledKnob = false;
        }
    }

    this.scaleX_Slider = this.posX_Slider + this.Width_Slider;
    this.scaleY_Slider = this.posY_Slider + this.Height_Slider;
    if ((this.mouseX >= this.posX_Slider && this.mouseX <= this.scaleX_Slider && this.mouseY >= this.posY_Slider && this.mouseY <= this.scaleY_Slider) || this.KnobHover == true)
    {
        if (mouseEvent == 3)
        {
            ccbInvokeAction(this.Drag_Action);
            if (!this.drag)
            {
                ccbSetSceneNodeProperty(this.Knob, "Pos X (pixels)", this.mouseX + (this.posX_Knob - this.scaleX_Knob));
                this.drag = true;
            }
        }
        if (this.EnableMouseScroll)
        {
            if (this.posX_Knob + (1 * this.ScrollMultiplier) > this.sliderMin && this.posX_Knob < this.sliderMax)
            {
                if (mouseWheelDelta == 1)
                {
                    var val = ccbGetCopperCubeVariable(this.Variable);
                    ccbSetCopperCubeVariable(this.Variable, val + (1 * this.ScrollMultiplier));
                }
            }
            if (this.posX_Knob > this.sliderMin && this.posX_Knob - (1 * this.ScrollMultiplier) < this.sliderMax)
            {
                if (mouseWheelDelta == -1)
                {
                    var val = ccbGetCopperCubeVariable(this.Variable);
                    ccbSetCopperCubeVariable(this.Variable, val - (1 * this.ScrollMultiplier));
                }
            }
        }
    }
}
