CL3D.AnimatorBehavior = function(behavior)
{
	this.Type = -1;

    this.bAcceptsMouseEvents = true;
    this.bAcceptsKeyboardEvents = true;

    this.Behavior = new behavior();
    this.Behavior._init();
}

CL3D.AnimatorBehavior.prototype.getType = function()
{
	return 'behavior';
}

/**
 * Animates the scene node it is attached to and returns true if scene node was modified.
 * @public
 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
 * @param {Integer} timeMs The time in milliseconds since the start of the scene.
 */
CL3D.AnimatorBehavior.prototype.animateNode = function(n, timeMs)
{
	if (n == null)
		return false;

    try
    {
        this.Behavior['onAnimate']( n, timeMs );
    }
    catch ( e )
    {
        CL3D.gCCDebugOutput.jsConsolePrint(this.JsClassName + ": " + e);
    }
}

CL3D.AnimatorBehavior.prototype.sendMouseEvent = function(mouseEvtId, wheelDelta)
{
	if (this.bAcceptsMouseEvents)
		this.Behavior['onMouseEvent'](mouseEvtId, wheelDelta);
}

CL3D.AnimatorBehavior.prototype.sendKeyEvent = function(keycode, pressed)
{
	if (this.bAcceptsKeyboardEvents)
		this.Behavior['onKeyEvent'](keycode, pressed);
}

CL3D.AnimatorBehavior.prototype.onMouseDown = function(event)
{
	var wasRightButton = false;
	if (event && event.button == 2) //2: Secondary button pressed, usually the right button
		wasRightButton = true;

	this.sendMouseEvent(wasRightButton ? 5 : 3, 0);
}

CL3D.AnimatorBehavior.prototype.onMouseWheel = function(delta)
{
    this.sendMouseEvent(1, delta);
}

CL3D.AnimatorBehavior.prototype.onMouseUp = function(event)
{
	var wasRightButton = false;
	if (event && event.button == 2) //2: Secondary button pressed, usually the right button
		wasRightButton = true;

	this.sendMouseEvent(wasRightButton ? 4 : 2, 0);
}

CL3D.AnimatorBehavior.prototype.onMouseMove = function(event)
{
    this.sendMouseEvent(0, 0);
}

CL3D.AnimatorBehavior.prototype.onKeyDown = function(event)
{
    this.sendKeyEvent(evt.keyCode, true);
}

CL3D.AnimatorBehavior.prototype.onKeyUp = function(event)
{
	this.sendKeyEvent(evt.keyCode, false);
}

CL3D.AnimatorBehavior.prototype.reset = function(event)
{
    return null;
}

CL3D.AnimatorBehavior.prototype.findActionByType = function(type)
{
	return null;
}

CL3D.AnimatorBehavior.prototype.createClone = function(node, scene, oldNodeId, newNodeId)
{
	return null;
}
