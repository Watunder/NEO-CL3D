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
var g_self = this;

var _action_Knob_OnEnter = function(animater)
{
    this.animater = animater;
};

_action_Knob_OnEnter.prototype.execute = function(currentNode)
{

};

var _action_Knob_OnClick = function(animater)
{
    this.animater = animater;
};

_action_Knob_OnClick.prototype.execute = function()
{
    if (this.animater.scaledKnob && this.animater.originalClickedKnob)
    {
        if (this.animater.KnobName == this.animater.BarName) ccbSetSceneNodeProperty(this.animater.Knob, "Pos X (percent)", this.animater.originalClickedKnob.x);
        ccbSetSceneNodeProperty(this.animater.Knob, "Pos Y (percent)", this.animater.originalClickedKnob.y);
        ccbSetSceneNodeProperty(this.animater.Knob, "Width (percent)", this.animater.originalClickedKnob.width);
        ccbSetSceneNodeProperty(this.animater.Knob, "Height (percent)", this.animater.originalClickedKnob.height);

        this.animater.scaledKnob = false;
    }
};

var _action_Knob_OnLeave = function(animater)
{
    this.animater = animater;
};

_action_Knob_OnLeave.prototype.execute = function(currentNode)
{
    if (this.animater.scaledKnob)
    {
        if (this.animater.KnobName == this.animater.BarName) ccbSetSceneNodeProperty(this.animater.Knob, "Pos X (percent)", this.animater.KnobData.x);

        ccbSetSceneNodeProperty(this.animater.Knob, "Pos Y (percent)", this.animater.KnobData.y);
        ccbSetSceneNodeProperty(this.animater.Knob, "Width (percent)", this.animater.KnobData.width);
        ccbSetSceneNodeProperty(this.animater.Knob, "Height (percent)", this.animater.KnobData.height);
        
        this.animater.scaledKnob = false;
    }
    this.animater.KnobHover = false;
};

var _action_Bar_OnClick = function(animater)
{
    this.animater = animater;
};

_action_Bar_OnClick.prototype.execute = function(currentNode)
{

};

var _action_Bar_OnEnter = function(animater)
{
    this.animater = animater;
};

_action_Bar_OnEnter.prototype.execute = function(currentNode)
{
    this.animater.BarHover = true;
};

var _action_Bar_OnLeave = function(animater)
{
    this.animater = animater;
};

_action_Bar_OnLeave.prototype.execute = function(currentNode)
{

};

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

        var animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {
            if (this.KnobHover || this.BarHover)
            {
                if (!this.scaledup)
                {
                    this.originalKnob = {...this.KnobData};
                    this.originalClickedKnob = scaleOverlay(this.originalKnob, 1).originalOverlay;
                    var scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob).scaledOverlay;
                    if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", scaledClickKnob.x);
                    ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", scaledClickKnob.y);
                    ccbSetSceneNodeProperty(this.Knob, "Width (percent)", scaledClickKnob.width);
                    ccbSetSceneNodeProperty(this.Knob, "Height (percent)", scaledClickKnob.height);
                    
                    this.scaledKnob = true;
                }
            }
            this.KnobHover = true;

            if (this.KnobHover || this.BarHover)
                this.toggle = !this.toggle;
        });
        animator1.TheActionHandler = new _action_Knob_OnClick(this);
        
        var animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {

        });
        animator2.ActionHandlerOnEnter = new _action_Knob_OnEnter(this);
        animator2.ActionHandlerOnLeave = new _action_Knob_OnLeave(this);

        this.Knob.addAnimator(animator1);
        this.Knob.addAnimator(animator2);

        var animator3 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {

        });
        animator3.TheActionHandler = new _action_Bar_OnClick(this);

        var animator4 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {
            this.BarHover = false;
        });
        animator4.ActionHandlerOnEnter = new _action_Bar_OnEnter(this);
        animator4.ActionHandlerOnLeave = new _action_Bar_OnLeave(this);

        this.Bar.addAnimator(animator3);
        this.Bar.addAnimator(animator4);

        this.init = true;
    }
    this.mouseX = ccbGetMousePosX() * CL3D.engine.DPR;
    this.mouseY = ccbGetMousePosY() * CL3D.engine.DPR;

    this.posX_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos X (percent)");
    this.posY_Knob = ccbGetSceneNodeProperty(this.Knob, "Pos Y (percent)");
    this.posX_Bar = ccbGetSceneNodeProperty(this.Bar, "Pos X (percent)");
    this.posY_Bar = ccbGetSceneNodeProperty(this.Bar, "Pos Y (percent)");

    this.Width_Knob = ccbGetSceneNodeProperty(this.Knob, "Width (percent)");
    this.Height_Knob = ccbGetSceneNodeProperty(this.Knob, "Height (percent)");
    this.Width_Bar = ccbGetSceneNodeProperty(this.Bar, "Width (percent)");
    this.Height_Bar = ccbGetSceneNodeProperty(this.Bar, "Height (percent)");
    
    if (this.Animated)
    {
        if (this.toggle)
        {
            ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", lerp(this.posX_Knob, this.posX_Bar + this.Width_Bar - this.Width_Knob - this.Additional_Position, 0.4));
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
            var color = ccbGetSceneNodeProperty(this.Knob, "Background Color");
            var Knob_ON_Color = CL3D.convertIntColor(this.Knob_ON_Color);
            Knob_ON_Color = CL3D.createColor(this.Knob_Alpha, Knob_ON_Color.r, Knob_ON_Color.g, Knob_ON_Color.b);
            var Bar_ON_Color = CL3D.convertIntColor(this.Bar_ON_Color);
            Bar_ON_Color = CL3D.createColor(this.Bar_Alpha, Bar_ON_Color.r, Bar_ON_Color.g, Bar_ON_Color.b);
            ccbSetSceneNodeProperty(this.Knob, "Background Color", Knob_ON_Color);
            if (this.Auto_Color_Bar)
            {
                color = CL3D.convertIntColor(color);
                color = CL3D.createColor(color.a, (color.r + 255) / 2, (color.g + 255) / 2, (color.b + 255) / 2);
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
            var Knob_OFF_Color = CL3D.convertIntColor(this.Knob_OFF_Color);
            Knob_OFF_Color = CL3D.createColor(this.Knob_Alpha, Knob_OFF_Color.r, Knob_OFF_Color.g, Knob_OFF_Color.b);
            var Bar_OFF_Color = CL3D.convertIntColor(this.Bar_OFF_Color);
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
        this.KnobData = { x: this.posX_Knob, y: this.posY_Knob, width: this.Width_Knob, height: this.Height_Knob };
    }
    this.BarName = ccbGetSceneNodeProperty(this.Bar, "Name");
    this.KnobName = ccbGetSceneNodeProperty(this.Knob, "Name");
}

behavior_ToggleButton.prototype.onMouseEvent = function(mouseEvent, mouseWheelDelta, node)
{
    // this.scaleX_Knob = this.posX_Knob + this.Width_Knob;
    // this.scaleY_Knob = this.posY_Knob + this.Height_Knob;
    // if (this.mouseX >= this.posX_Knob && this.mouseX <= this.scaleX_Knob && this.mouseY >= this.posY_Knob && this.mouseY <= this.scaleY_Knob)
    // {
    //     if (!this.scaledKnob)
    //     {
    //         // this.originalKnob = scaleOverlay(this.KnobData, 1).originalOverlay;
    //         // var scaledKnob = scaleOverlay(this.originalKnob, this.Scale_Hover_Knob).scaledOverlay;
    //         // if (this.KnobName == this.BarName)
    //         // {
    //         //     ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", scaledKnob.x);
    //         // }
    //         // ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", scaledKnob.y);
    //         // ccbSetSceneNodeProperty(this.Knob, "Width (percent)", scaledKnob.width);
    //         // ccbSetSceneNodeProperty(this.Knob, "Height (percent)", scaledKnob.height);
            
    //         // this.scaledKnob = true;
    //     }
    //     if (mouseEvent == 3)
    //     {
    //         // if (this.KnobHover || this.BarHover)
    //         // {
    //         //     if (!this.scaledup)
    //         //     {
    //         //         this.originalClickedKnob = scaleOverlay(this.originalKnob, 1).originalOverlay;
    //         //         var scaledClickKnob = scaleOverlay(this.originalKnob, this.Scale_Click_Knob).scaledOverlay;
    //         //         if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", scaledClickKnob.x);
    //         //         ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", scaledClickKnob.y);
    //         //         ccbSetSceneNodeProperty(this.Knob, "Width (percent)", scaledClickKnob.width);
    //         //         ccbSetSceneNodeProperty(this.Knob, "Height (percent)", scaledClickKnob.height);
                    
    //         //         this.scaledKnob = true;
    //         //     }
    //         // }
    //     }
    //     //this.KnobHover = true;
    // }
    // else
    // {
    //     // if (this.scaledKnob)
    //     // {
    //     //     if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", this.KnobData.x);

    //     //     ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", this.KnobData.y);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Width (percent)", this.KnobData.width);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Height (percent)", this.KnobData.height);
            
    //     //     this.scaledKnob = false;
    //     // }
    //     // this.KnobHover = false;
    // }

    // this.scaleX_Bar = this.posX_Bar + this.Width_Bar;
    // this.scaleY_Bar = this.posY_Bar + this.Height_Bar;
    // if ((this.mouseX >= this.posX_Bar && this.mouseX <= this.scaleX_Bar && this.mouseY >= this.posY_Bar && this.mouseY <= this.scaleY_Bar) || this.KnobHover == true)
    // {
    //     this.BarHover = true;
    // }
    // else
    // {
    //     this.BarHover = false;
    // }
    // if (mouseEvent == 3)
    // {
    //     if (this.KnobHover || this.BarHover)
    //         this.toggle = !this.toggle;
    // }
    // if (mouseEvent == 2)
    // {
    //     // if (this.scaledKnob && this.originalClickedKnob)
    //     // {
    //     //     if (this.KnobName == this.BarName) ccbSetSceneNodeProperty(this.Knob, "Pos X (percent)", this.originalClickedKnob.x);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Pos Y (percent)", this.originalClickedKnob.y);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Width (percent)", this.originalClickedKnob.width);
    //     //     ccbSetSceneNodeProperty(this.Knob, "Height (percent)", this.originalClickedKnob.height);

    //     //     this.scaledKnob = false;
    //     // }
    // }
}
