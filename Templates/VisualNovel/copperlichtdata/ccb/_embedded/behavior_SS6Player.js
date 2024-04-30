// The following embedded xml is for the editor and describes how the behavior can be edited:
// Supported types are: int, float, string, bool, color, vect3d, scenenode, texture, action
/*
	<behavior jsname="behavior_SS6Player" description="SS6Player">
        <property name="ProjectName" type="string" default="" />
        <property name="AnimePackName" type="string" default="" />
        <property name="AnimeName" type="string" default="" />
	</behavior>
*/

behavior_SS6Player = function()
{
    this.refStartframe = 0;
    this.refEndframe = 0;
    this.refSpeed = 1.0;
    this.refloopNum = 0;
    this.infinity = false;
    this.reverse = false;
    this.pingpong = false;
    this.independent = false;
    
    this.Type = "fg";
};

behavior_SS6Player.prototype.getAllAnimes = function()
{
    if (!this.SS)
        return;

    var obj = {};

    var animePacksLength = this.SS.fbObj.animePacksLength();
    for (var i = 0; i < animePacksLength; ++i)
    {
        var j;
        var name = this.SS.fbObj.animePacks(i).name();
        var animationsLength = this.SS.fbObj.animePacks(i).animationsLength() - 1;
        for (j = 0, obj[name] = []; j < animationsLength; ++j)
            obj[name].push(this.SS.fbObj.animePacks(i).animations(j).name());
    }

    return obj;
};

// called every frame. 
//   'node' is the scene node where this behavior is attached to.
//   'timeMs' the current time in milliseconds of the scene.
// Returns 'true' if something changed, and 'false' if not.
behavior_SS6Player.prototype.onAnimate = function(node, timeMs)
{
    var self = this;

	// first time
	if (this.LastTime == null)
	{
        if (!Global.SS6Project)
            return;
        
        node.Type = this.Type;

        this.SS = new Global.SS6Project("copperlichtdata/sprite/" + self.ProjectName,function()
        {
            self.SP = new Global.SS6Player(node, self.SS, self.AnimePackName, self.AnimeName);
            self.SP.SetAnimationSpeed(60, false);
            self.SP.Play();
        });
        
        this.LastTime = timeMs;
    }
    
    if (self.SP)
        self.SP.Update(timeMs);
};
