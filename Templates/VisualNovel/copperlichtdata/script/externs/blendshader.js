if(!this.GLSL)
	this.GLSL = String.raw;

CL3D.BlendShader = function()
{
	
};

CL3D.BlendShader.prototype.addColorMatrixFilter = function(self)
{
	var vertexShader = GLSL`
	`;

	var fragmentShader = GLSL`
	`;

	self.shaderCallBack = function()
	{
		var m = self.filters["colorMatrix"];

		ccbSetShaderConstant("colorMatrix", false, m);
	}

	self.newMaterial = ccbCreateMaterial(vertexShader, fragmentShader, 0, shaderCallBack);
};
