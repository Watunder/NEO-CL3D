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
var g_self = this;

var _action_OnEnter = function(animater)
{
    this.animater = animater;
};

_action_OnEnter.prototype.execute = function(currentNode)
{
    // console.log("[Custom:Enter]")
};

var _action_OnClick = function(animater)
{
    this.animater = animater;
};

_action_OnClick.prototype.execute = function(currentNode)
{   
    // console.log("[Custom:Click]")
    if (this.animater.scaled)
    {
        ccbSetSceneNodeProperty(this.animater.Radio, "Pos X (percent)", this.animater.originalClicked.x);
        ccbSetSceneNodeProperty(this.animater.Radio, "Pos Y (percent)", this.animater.originalClicked.y);
        ccbSetSceneNodeProperty(this.animater.Radio, "Width (percent)", this.animater.originalClicked.width);
        ccbSetSceneNodeProperty(this.animater.Radio, "Height (percent)", this.animater.originalClicked.height);
        
        this.animater.scaled = false;
        // console.log("[Origin:Click]")
    }
};

var _action_OnLeave = function(animater)
{
    this.animater = animater;
};

_action_OnLeave.prototype.execute = function(currentNode)
{
    // console.log("[Custom:Leave]")
    if (this.animater.scaled)
    {
        ccbSetSceneNodeProperty(this.animater.Radio, "Pos X (percent)", this.animater.overlayData.x);
        ccbSetSceneNodeProperty(this.animater.Radio, "Pos Y (percent)", this.animater.overlayData.y);
        ccbSetSceneNodeProperty(this.animater.Radio, "Width (percent)", this.animater.overlayData.width);
        ccbSetSceneNodeProperty(this.animater.Radio, "Height (percent)", this.animater.overlayData.height);
        
        this.animater.scaled = false;
        // console.log("[Origin:Leave]")
    }
};

behavior_RadioButton = function()
{
    this.mouseX = false;
    this.mouseY = false;
    this.init = false;
    this.scaled = false;
    this.overlayData = false;

    g_self = this;
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

        var __action_OnClick = new _action_OnClick(this);
        var animator1 = new CL3D.AnimatorOnClick(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {
            if (!this.scaledup)
            {
                this.originalOverlay = {...this.overlayData};
                this.originalClicked = scaleOverlay(this.originalOverlay, 1).originalOverlay;
                var scaledClick = scaleOverlay(this.originalOverlay, this.Scale_Click).scaledOverlay;

                ccbSetSceneNodeProperty(this.Radio, "Pos X (percent)", scaledClick.x);
                ccbSetSceneNodeProperty(this.Radio, "Pos Y (percent)", scaledClick.y);
                ccbSetSceneNodeProperty(this.Radio, "Width (percent)", scaledClick.width);
                ccbSetSceneNodeProperty(this.Radio, "Height (percent)", scaledClick.height);
                
                this.scaled = true;
                // console.log("[Origin:Pressed]")
            }

            ccbSetCopperCubeVariable(this.Variable, this.Value);
            if (ccbGetCopperCubeVariable(this.Variable) == this.Value)
            {
                ccbInvokeAction(this.Action);
            }
        });
        animator1.TheActionHandler = __action_OnClick;
        
        var animator2 = new CL3D.AnimatorOnMove(CL3D.gScriptingInterface.CurrentlyActiveScene, CL3D.gScriptingInterface.Engine, ()=>
        {
            if (this.scaled)
            {
                ccbSetSceneNodeProperty(this.Radio, "Pos X (percent)", this.overlayData.x);
                ccbSetSceneNodeProperty(this.Radio, "Pos Y (percent)", this.overlayData.y);
                ccbSetSceneNodeProperty(this.Radio, "Width (percent)", this.overlayData.width);
                ccbSetSceneNodeProperty(this.Radio, "Height (percent)", this.overlayData.height);
                
                this.scaled = false;
                // console.log("[Origin:Leave]")
            }
        });
        animator2.ActionHandlerOnEnter = new _action_OnEnter(this);
        animator2.ActionHandlerOnLeave = new _action_OnLeave(this);

        currentNode.addAnimator(animator1);
        currentNode.addAnimator(animator2);

        this.init = true;
    }
    this.mouseX = ccbGetMousePosX() * CL3D.engine.DPR;
    this.mouseY = ccbGetMousePosY() * CL3D.engine.DPR;

    this.posX_Radio = ccbGetSceneNodeProperty(this.Radio, "Pos X (percent)");
    this.posY_Radio = ccbGetSceneNodeProperty(this.Radio, "Pos Y (percent)");

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
            var Color = CL3D.convertIntColor(this.Active_Color);
            Color = CL3D.createColor(this.Alpha, Color.r, Color.g, Color.b);
            ccbSetSceneNodeProperty(this.Radio, "Background Color", Color);
        }
    }
    this.Width_Radio = ccbGetSceneNodeProperty(this.Radio, "Width (percent)");
    this.Height_Radio = ccbGetSceneNodeProperty(this.Radio, "Height (percent)");
    
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
    // this.scaleX_Radio = this.posX_Radio + this.Width_Radio;
    // this.scaleY_Radio = this.posY_Radio + this.Height_Radio;
    // if (this.mouseX >= this.posX_Radio && this.mouseX <= this.scaleX_Radio && this.mouseY >= this.posY_Radio && this.mouseY <= this.scaleY_Radio)
    // {
    //     if (!this.scaled)
    //     {
    //         this.originalOverlay = scaleOverlay(this.overlayData, 1).originalOverlay;
    //         var scaled = scaleOverlay(this.originalOverlay, this.Scale_Hover).scaledOverlay;

    //         ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", scaled.x);
    //         ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", scaled.y);
    //         ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", scaled.width);
    //         ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", scaled.height);

    //         this.scaled = true;
    //         // console.log("[Origin:????]")
    //     }
    //     if (mouseEvent == 3)
    //     {
    //         if (!this.scaledup)
    //         {
    //             this.originalClicked = scaleOverlay(this.originalOverlay, 1).originalOverlay;
    //             var scaledClick = scaleOverlay(this.originalOverlay, this.Scale_Click).scaledOverlay;

    //             ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", scaledClick.x);
    //             ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", scaledClick.y);
    //             ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", scaledClick.width);
    //             ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", scaledClick.height);
                
    //             this.scaled = true;
    //             console.log("[Origin:Pressed]")
    //         }

    //         ccbSetCopperCubeVariable(this.Variable, this.Value);
    //         if (ccbGetCopperCubeVariable(this.Variable) == this.Value)
    //         {
    //             ccbInvokeAction(this.Action);
    //         }
    //     }
    // }
    // else
    // {
    //     if (this.scaled)
    //     {
    //         ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", this.overlayData.x);
    //         ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", this.overlayData.y);
    //         ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", this.overlayData.width);
    //         ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", this.overlayData.height);
            
    //         this.scaled = false;
    //         console.log("[Origin:Leave]")
    //     }
    // }
    // if (mouseEvent == 2)
    // {
    //     if (this.scaled)
    //     {
    //         ccbSetSceneNodeProperty(this.Radio, "Pos X (pixels)", this.originalClicked.x);
    //         ccbSetSceneNodeProperty(this.Radio, "Pos Y (pixels)", this.originalClicked.y);
    //         ccbSetSceneNodeProperty(this.Radio, "Width (pixels)", this.originalClicked.width);
    //         ccbSetSceneNodeProperty(this.Radio, "Height (pixels)", this.originalClicked.height);
            
    //         this.scaled = false;
    //         console.log("[Origin:Click]")
    //     }
    // }
}
