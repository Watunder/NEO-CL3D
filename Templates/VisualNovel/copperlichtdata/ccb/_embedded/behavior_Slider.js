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
var g_self = this;

var _action_OnEnter = function(animater)
{
    this.animater = animater;
};

_action_OnEnter.prototype.execute = function(currentNode)
{
    this.animater.KnobHover = true;
    ccbInvokeAction(this.animater.Hover_Action);
};

var _action_OnClick = function(animater)
{
    this.animater = animater;
};

_action_OnClick.prototype.execute = function(currentNode)
{

};

var _action_OnLeave = function(animater)
{
    this.animater = animater;
};

_action_OnLeave.prototype.execute = function(currentNode)
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
};

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

behavior_Slider.prototype.onAnimate = function (currentNode)
{
    this.KnobVisibility = ccbGetSceneNodeProperty(this.Knob, "Visible");
    this.Slider_Visibility = ccbGetSceneNodeProperty(this.Bar, "Visible");
    if (!this.KnobVisibility && !this.Slider_Visibility) { return false; }
    if (!this.Slider_Visibility) { return false; }
    if (!this.init)
    {
        this.Slider = this.Bar;
        ccbSetCopperCubeVariable(this.Variable, this.Initial_Value);
        ccbSetSceneNodeProperty(this.Knob, "Position Mode", "relative (percent)");
        ccbSetSceneNodeProperty(this.Slider, "Position Mode", "relative (percent)");
        this.screenX = ccbGetScreenWidth();
        this.screenY = ccbGetScreenHeight();

        var animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {
            if (!this.scaledup)
            {
                this.originalKnob = {...this.KnobData};
                this.originalClickedKnob = scaleOverlay(this.originalKnob, 1).originalOverlay;
                var scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob).scaledOverlay;

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
        
        var animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {

        });
        animator2.ActionHandlerOnEnter = new _action_OnEnter(this);
        animator2.ActionHandlerOnLeave = new _action_OnLeave(this);

        currentNode.addAnimator(animator1);
        currentNode.addAnimator(animator2);
        
        this.init = true;
    }
    this.mouseX = ccbGetMousePosX() * CL3D.engine.DPR;
    this.mouseY = ccbGetMousePosY() * CL3D.engine.DPR;
    
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

        this.posX_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Pos X (percent)");
        this.posY_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Pos Y (percent)");

        this.Width_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Width (percent)");
        this.Height_SliderFill = ccbGetSceneNodeProperty(sliderFill, "Height (percent)");

        ccbSetSceneNodeProperty(sliderFill, "Name", ccbGetSceneNodeProperty(this.Slider, "Name") + "#JIC_slider_fill");
        if (!this.Use_Image)
        {
            var color = ccbGetSceneNodeProperty(sliderFill, "Background Color");
            var colorAlpha = ccbGetSceneNodeProperty(sliderFill, "Alpha");

            var SliderFillColor = CL3D.convertIntColor(this.SliderFillColor);
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
    var sliderFill = ccbGetSceneNodeFromName(ccbGetSceneNodeProperty(this.Slider, "Name") + "#JIC_slider_fill");
    ccbSetSceneNodeProperty(sliderFill, "Width (percent)", ccbGetSceneNodeProperty(currentNode, "Texture Width (percent)"));
    ccbSetSceneNodeProperty(sliderFill, "Height (percent)", ccbGetSceneNodeProperty(currentNode, "Texture Height (percent)"));

    if (this.FillFromCenter)
    {
        if (this.posX_Knob < this.posX_Slider + this.Width_Slider / 2) {
            ccbSetSceneNodeProperty(sliderFill, "Pos X (percent)", this.posX_Knob + this.Width_Knob);
            ccbSetSceneNodeProperty(sliderFill, "Width (percent)", this.posX_Slider - this.posX_Knob + this.Width_Slider / 2 - this.Width_Knob);
        }
        if (this.posX_Knob > this.posX_Slider + this.Width_Slider / 2) {
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

    var variable = ccbGetCopperCubeVariable(this.variable);
    variable = parseFloat(variable);
    this.sliderMax = this.posX_Slider + this.Width_Slider - this.Width_Knob;
    this.sliderMin = this.posX_Slider;

    // New code to fix the bug from the previous code that was causing issue when we have knob scaled on hover and click
    // Check if dragging
    if (this.drag)
    {
        // Calculate position based on mouseX
        var newPos = (ccbGetMousePosX() * CL3D.engine.DPR) / ccbGetScreenWidth() * 100 - (this.Width_Knob / 2);
        if (newPos < this.sliderMin) newPos = this.sliderMin;
        else if (newPos > this.sliderMax) newPos = this.sliderMax;

        // Set position of the Knob
        ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", newPos);
        var clampedValue = Math.round(clamp(newPos, this.sliderMin, this.sliderMax, this.Min, this.Max));
        ccbSetCopperCubeVariable(this.Variable, clampedValue);
    }

    var variableValue = ccbGetCopperCubeVariable(this.Variable);
    var newPos = mapValue(variableValue, this.Min, this.Max, this.sliderMin, this.sliderMax);
    ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", newPos);
    if (variableValue > this.Max)
        ccbSetCopperCubeVariable(this.Variable, this.Max);
    
    if (variableValue < this.Min)
        ccbSetCopperCubeVariable(this.Variable, this.Min);

    // faulty code that was updating variable on the basis of knob position
    // if (this.drag) {

    // 	if (this.mouseX <= this.sliderMax+(this.Width_Knob/2) && this.mouseX >= this.sliderMin+(this.Width_Knob/2)) {
    // 		ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", ccbGetMousePosX() - (this.Width_Knob / 2));
    // 	}
    // 	if (this.mouseX >= this.sliderMax+(this.Width_Knob/2)) { ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", this.sliderMax); }
    // 	if (this.mouseX <= this.sliderMin) { ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", this.sliderMin); }
    // }
    // if (this.posX_Knob >= this.sliderMax+(this.Width_Knob/2)) { ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", this.sliderMax);}
    // if (this.posX_Knob+1 <= this.sliderMin) { ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", this.sliderMin); }
    // var clampedValue = Math.round(clamp(this.posX_Knob, this.sliderMin, this.sliderMax, this.Min,this.Max));
    // ccbSetCopperCubeVariable(this.Variable, clampedValue);

    if (!this.KnobData)
        this.KnobData = { x: this.posX_Knob, y: this.posY_Knob, width: this.Width_Knob, height: this.Height_Knob };
}

behavior_Slider.prototype.onMouseEvent = function (mouseEvent, mouseWheelDelta, node)
{
    if (!this.KnobVisibility && !this.Slider_Visibility)
    {
        return false;
    }
    if (!this.Slider_Visibility)
    {
        return false;
    }
    // this.scaleX_Knob = this.posX_Knob + this.Width_Knob;
    // this.scaleY_Knob = this.posY_Knob + this.Height_Knob;
    // if (this.mouseX >= this.posX_Knob && this.mouseX <= this.scaleX_Knob && this.mouseY >= this.posY_Knob && this.mouseY <= this.scaleY_Knob)
    // {
    //     if (!this.scaledKnob)
    //     {
    //         // this.originalKnob = scaleOverlay(this.KnobData, 1).originalOverlay;
    //         // var scaledKnob = scaleOverlay(this.originalKnob, this.Scale_Hover_Knob).scaledOverlay;
            
    //         // //ccbSetSceneNodeProperty(this.Knob,"Pos X (percent)",scaledKnob.x);
    //         // ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", scaledKnob.y);
    //         // ccbSetSceneNodeProperty(this.Knob, "Width (percent)", scaledKnob.width);
    //         // ccbSetSceneNodeProperty(this.Knob, "Height (percent)", scaledKnob.height);

    //         // this.scaledKnob = true;
    //     }
    //     // this.KnobHover = true;
    //     // ccbInvokeAction(this.Hover_Action);
    //     if (mouseEvent == 3)
    //     {
    //         // if (!this.scaledup)
    //         // {
    //         //     this.originalClickedKnob = scaleOverlay(this.originalKnob, 1).originalOverlay;
    //         //     var scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob).scaledOverlay;

    //         //     //ccbSetSceneNodeProperty(this.Knob,"Pos X (percent)",scaledClickKnob.x);
    //         //     ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", scaledClickKnob.y);
    //         //     ccbSetSceneNodeProperty(this.Knob, "Width (percent)", scaledClickKnob.width);
    //         //     ccbSetSceneNodeProperty(this.Knob, "Height (percent)", scaledClickKnob.height);

    //         //     this.scaledKnob = true;
    //         // }
    //         // this.drag = true;
    //         // ccbInvokeAction(this.Drag_Action);
    //     }
    // }
    // else
    // {
    //     // this.KnobHover = false;
    
    //     // if (this.scaledKnob && !this.drag)
    //     // {
    //     //     //ccbSetSceneNodeProperty(this.Knob,"Pos X (percent)",this.KnobData.x);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", this.KnobData.y);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Width (percent)", this.KnobData.width);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Height (percent)", this.KnobData.height);

    //     //     this.scaledKnob = false;
    //     // }
    // }
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
    
    // this.scaleX_Slider = this.posX_Slider + this.Width_Slider;
    // this.scaleY_Slider = this.posY_Slider + this.Height_Slider;
    // if ((this.mouseX >= this.posX_Slider && this.mouseX <= this.scaleX_Slider && this.mouseY >= this.posY_Slider && this.mouseY <= this.scaleY_Slider) || this.KnobHover == true)
    // {
    //     if (mouseEvent == 3)
    //     {
    //         ccbInvokeAction(this.Drag_Action);
    //         if (!this.drag)
    //         {
    //             ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", this.mouseX + (this.posX_Knob - this.scaleX_Knob));
    //             this.drag = true;
    //         }
    //     }
    //     if (this.EnableMouseScroll)
    //     {
    //         if (this.posX_Knob + (1 * this.ScrollMultiplier) > this.sliderMin && this.posX_Knob < this.sliderMax)
    //         {
    //             if (mouseWheelDelta == 1)
    //             {
    //                 var val = ccbGetCopperCubeVariable(this.Variable);
    //                 ccbSetCopperCubeVariable(this.Variable, val + (1 * this.ScrollMultiplier));
    //             }
    //         }
    //         if (this.posX_Knob > this.sliderMin && this.posX_Knob - (1 * this.ScrollMultiplier) < this.sliderMax)
    //         {
    //             if (mouseWheelDelta == -1)
    //             {
    //                 var val = ccbGetCopperCubeVariable(this.Variable);
    //                 ccbSetCopperCubeVariable(this.Variable, val - (1 * this.ScrollMultiplier));
    //             }
    //         }
    //     }
    // }
}
