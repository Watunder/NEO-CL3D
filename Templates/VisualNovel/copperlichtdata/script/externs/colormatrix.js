CL3D.ColorMatrix = function()
{
    this.m00 = 1;
    this.m01 = 0;
    this.m02 = 0;
    this.m03 = 0;
    this.m04 = 0;

    this.m05 = 0;
    this.m06 = 1;
    this.m07 = 0;
    this.m08 = 0;
    this.m09 = 0;

    this.m10 = 0;
    this.m11 = 0;
    this.m12 = 1;
    this.m13 = 0;
    this.m14 = 0;

    this.m15 = 0;
    this.m16 = 0;
    this.m17 = 0;
    this.m18 = 1;
    this.m19 = 0;
};

CL3D.ColorMatrix.prototype.fromArray = function(array)
{
    var me = this;

    if(array.length != 20)
    {
        return;
    }

    for (var i = 0; i < 20; ++i)
    {
        if(i < 10)
            me['m'+'0'+i.toString()] = array[i];
        else
            me['m'+i.toString()] = array[i];
    }

};

CL3D.ColorMatrix.prototype.asArray = function()
{
    return [this.m00, this.m01, this.m02, this.m03, this.m04,
            this.m05, this.m06, this.m07, this.m08, this.m09,
            this.m10, this.m11, this.m12, this.m13, this.m14,
            this.m15, this.m16, this.m17, this.m18, this.m19];
};
