(function(){

var guid = (function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return function() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
})();

function _h( f, c ) {
	return function() {
		var res;
		if( !c.apply( this, arguments ) ) {
			res = f.apply( this, arguments );
		} else {
			//console.log( f.name + ' cached' );
      		//CL3D.gCCDebugOutput
		}
		return res;
	}
}

function _h2( f, c ) {
	return function() {
		var res = f.apply( this, arguments );
		c.apply( res || this, arguments );
		return res;
	}
}

CL3D.cache = {
	uniform1f: {},
	pixelStorei: {},
	bufferDataArraySizeOrData: {},
	bufferDataArrayUsage: {},
	bufferDataElementArraySizeOrData: {},
	bufferDataElementArrayUsage: {},
	enable: {},
	blendColor: {},
	blendEquationSeparate: {},
	blendFuncSeparate: {},
	colorMask: {}

};

WebGL2RenderingContext.prototype.enable = _h( WebGL2RenderingContext.prototype.enable, function( cap ) {

	var cached = ( CL3D.cache.enable[ cap ] === true );
	CL3D.cache.enable[ cap ] = true;
	return cached;

} );

WebGL2RenderingContext.prototype.disable = _h( WebGL2RenderingContext.prototype.disable, function( cap ) {

	var cached = ( CL3D.cache.enable[ cap ] === false );
	CL3D.cache.enable[ cap ] = false;
	return cached;

} );

WebGL2RenderingContext.prototype.useProgram = _h( WebGL2RenderingContext.prototype.useProgram, function( program ) {

	var cached = ( CL3D.cache.useProgramProgram === program );
	CL3D.cache.useProgramProgram = program;
	return cached;

} );

WebGL2RenderingContext.prototype.bindBuffer = _h( WebGL2RenderingContext.prototype.bindBuffer, function( target, buffer ) {

	var cached;

	switch (target) {
		case this.ARRAY_BUFFER:
			cached = ( CL3D.cache.bindBufferTargetArray ===  buffer );
			CL3D.cache.bindBufferTargetArray = buffer;
			break;
		case this.ELEMENT_ARRAY_BUFFER:
			cached = ( CL3D.cache.bindBufferTargetElementArray ===  buffer );
			CL3D.cache.bindBufferTargetElementArray = buffer;
			break;
	}

	return cached;

} );

/*

Commented because data content can change, but the object itself doesn't

WebGL2RenderingContext.prototype.bufferData = _h( WebGL2RenderingContext.prototype.bufferData, function( target, sizeOrData, usage ) {

	var cached = false;

	switch (target) {
		case this.ARRAY_BUFFER:
			cached = ( CL3D.cache.bufferDataArraySizeOrData[ target ] === sizeOrData && CL3D.cache.bufferDataArrayUsage[ target ] === usage );
			CL3D.cache.bufferDataArraySizeOrData[ target ] = sizeOrData;
			CL3D.cache.bufferDataArrayUsage[ target ] = usage;
			break;
		case this.ELEMENT_ARRAY_BUFFER:
			cached = ( CL3D.cache.bufferDataElementArraySizeOrData[ target ] === sizeOrData && CL3D.cache.bufferDataElementArrayUsage[ target ] === usage );
			CL3D.cache.bufferDataElementArraySizeOrData[ target ] = sizeOrData;
			CL3D.cache.bufferDataElementArrayUsage[ target ] = usage;
			break;
	}

	return cached;

} );
*/

WebGL2RenderingContext.prototype.bindRenderbuffer = _h( WebGL2RenderingContext.prototype.bindRenderbuffer, function( target, buffer ) {

	var cached = ( CL3D.cache.bindRenderbufferTarget === target ) && ( CL3D.cache.bindRenderbufferBuffer === buffer );
	CL3D.cache.bindRenderbufferTarget = target;
	CL3D.cache.bindRenderbufferBuffer = buffer;
	return cached;

} );

WebGL2RenderingContext.prototype.bindFramebuffer = _h( WebGL2RenderingContext.prototype.bindFramebuffer, function( target, framebuffer ) {

	var cached = ( CL3D.cache.bindFramebufferTarget === target ) && ( CL3D.cache.bindFramebufferFramebuffer === framebuffer );
	CL3D.cache.bindFramebufferTarget = target;
	CL3D.cache.bindFramebufferFramebuffer = framebuffer;
	return cached;

} );

/*WebGL2RenderingContext.prototype.createFramebuffer = _h2( WebGL2RenderingContext.prototype.createFramebuffer, function() {

	this.id = guid();
	console.log( 'create framebuffer' );

} );*/

WebGL2RenderingContext.prototype.bindTexture = _h( WebGL2RenderingContext.prototype.bindTexture, function( target, texture ) {

	var cached;

	switch (target) {
		case this.TEXTURE_2D:
			cached = ( CL3D.cache.bindTexture2D === texture );
			CL3D.cache.bindTexture2D = texture;
			break;
		case this.TEXTURE_CUBE_MAP:
			cached = ( CL3D.cache.bindTextureCubeMap === texture );
			CL3D.cache.bindTextureCubeMap = texture;
	}

	return cached;

} );

WebGL2RenderingContext.prototype.activeTexture = _h( WebGL2RenderingContext.prototype.activeTexture, function( texture ) {

	var cached = ( CL3D.cache.activeTexture === texture );
	CL3D.cache.activeTexture = texture;
	return cached;

} );

WebGL2RenderingContext.prototype.blendEquation = _h( WebGL2RenderingContext.prototype.blendEquation, function( mode ) {

	var cached = ( CL3D.cache.blendEquation === mode );
	CL3D.cache.blendEquation = mode;
	return cached;

} );

WebGL2RenderingContext.prototype.viewport = _h( WebGL2RenderingContext.prototype.viewport, function( x, y, w, h ) {

	var cached = ( CL3D.cache.viewportX === x ) && ( CL3D.cache.viewportY === y ) && ( CL3D.cache.viewportW === w ) && ( CL3D.cache.viewportH === h );

	CL3D.cache.viewportX = x;
	CL3D.cache.viewportY = y;
	CL3D.cache.viewportW = w;
	CL3D.cache.viewportH = h;

	return cached;

} );

WebGL2RenderingContext.prototype.scissor = _h( WebGL2RenderingContext.prototype.scissor, function( x, y, w, h ) {

	var cached = ( CL3D.cache.scissorX === x ) && ( CL3D.cache.scissorY === y ) && ( CL3D.cache.scissorW === w ) && ( CL3D.cache.scissorH === h );

	CL3D.cache.scissorX = x;
	CL3D.cache.scissorY = y;
	CL3D.cache.scissorW = w;
	CL3D.cache.scissorH = h;

	return cached;

} );

WebGL2RenderingContext.prototype.depthRange = _h( WebGL2RenderingContext.prototype.depthRange, function( near, far ) {

	var cached = CL3D.cache.depthRangeNear === near && CL3D.cache.depthRangeFar === far;
	CL3D.cache.depthRangeNear = near;
	CL3D.cache.depthRangeFar = far;

	return cached;

} );

WebGL2RenderingContext.prototype.cullFace = _h( WebGL2RenderingContext.prototype.cullFace, function( mode ) {

	var cached = CL3D.cache.cullFaceMode === mode;
	CL3D.cache.cullFaceMode = mode;

	return cached;

} );

WebGL2RenderingContext.prototype.frontFace = _h( WebGL2RenderingContext.prototype.frontFace, function( mode ) {

	var cached = CL3D.cache.frontFaceMode === mode;
	CL3D.cache.frontFaceMode = mode;

	return cached;

} );

WebGL2RenderingContext.prototype.lineWidth = _h( WebGL2RenderingContext.prototype.lineWidth, function( width ) {

	var cached = CL3D.cache.lineWidthWidth === width;
	CL3D.cache.lineWidthWidth = width;

	return cached;

} );

WebGL2RenderingContext.prototype.polygonOffset = _h( WebGL2RenderingContext.prototype.polygonOffset, function( factor, units ) {

	var cached = CL3D.cache.polygonOffsetFactor === factor && CL3D.cache.polygonOffsetUnits === units;
	CL3D.cache.polygonOffsetFactor = factor;
	CL3D.cache.polygonOffsetUnits = units;

	return cached;

} );

WebGL2RenderingContext.prototype.disableVertexAttribArray = _h( WebGL2RenderingContext.prototype.disableVertexAttribArray, function( index ) {

	var cached = ( CL3D.cache.disableVertexAttribArrayIndex === index );
	CL3D.cache.disableVertexAttribArrayIndex = index;
	return cached;

} );

WebGL2RenderingContext.prototype.enableVertexAttribArray = _h( WebGL2RenderingContext.prototype.enableVertexAttribArray, function( index ) {

	var cached = ( CL3D.cache.enableVertexAttribArrayIndex === index );
	CL3D.cache.enableVertexAttribArrayIndex = index;
	return cached;

} );

/*
WebGL2RenderingContext.prototype.uniform1f = _h( WebGL2RenderingContext.prototype.uniform1f, function( location, value ) {

	var cached = ( CL3D.cache.uniform1f[ location ] === value );
	CL3D.cache.uniform1f[ location ] = value;
	if( cached ) { console.log( location + ' is ' + value ); }
	return cached;

} );
*/

WebGL2RenderingContext.prototype.pixelStorei = _h( WebGL2RenderingContext.prototype.pixelStorei, function( pname, param ) {

	var cached = ( CL3D.cache.pixelStorei[ pname ] === param );
	CL3D.cache.pixelStorei[ pname ] = param;
	//if( cached ) { console.log( pname + ' is ' + param ); }
	//else { console.log( 'setting ' + pname + ' to ' +param )}
	return cached;

} );

WebGL2RenderingContext.prototype.blendColor = _h( WebGL2RenderingContext.prototype.blendColor, ( r, g, b, a ) => {

	const cached = ( CL3D.cache.blendColor.r === r && CL3D.cache.blendColor.g === g && CL3D.cache.blendColor.b === b && CL3D.cache.blendColor.a === a );
	Object.assign( CL3D.cache.blendColor, {
		r, g, b, a,
	} );
	return cached;

} );

WebGL2RenderingContext.prototype.blendEquationSeparate = _h( WebGL2RenderingContext.prototype.blendEquationSeparate, ( modeRGB, modeAlpha ) => {

	const cached = ( CL3D.cache.blendEquationSeparate.modeRGB === modeRGB && CL3D.cache.blendEquationSeparate.modeAlpha === modeAlpha );
	Object.assign( CL3D.cache.blendEquationSeparate, {
		modeRGB, modeAlpha,
	} );
	return cached;

} );

WebGL2RenderingContext.prototype.blendFuncSeparate = _h( WebGL2RenderingContext.prototype.blendFuncSeparate, ( srcRGB, dstRGB, srcAlpha, dstAlpha ) => {

	const cached = ( CL3D.cache.blendFuncSeparate.srcRGB === srcRGB && CL3D.cache.blendFuncSeparate.dstRGB === dstRGB && CL3D.cache.blendFuncSeparate.srcAlpha === srcAlpha && CL3D.cache.blendFuncSeparate.dstAlpha === dstAlpha );
	Object.assign( CL3D.cache.blendFuncSeparate, {
		srcRGB, dstRGB, srcAlpha, dstAlpha,
	} );
	return cached;

} );

WebGL2RenderingContext.prototype.colorMask = _h( WebGL2RenderingContext.prototype.colorMask, ( r, g, b, a ) => {

	const cached = ( CL3D.cache.colorMask.r === r && CL3D.cache.colorMask.g === g && CL3D.cache.colorMask.b === b && CL3D.cache.colorMask.a === a );
	Object.assign( CL3D.cache.colorMask, {
		r, g, b, a,
	} );
	return cached;

} );

WebGL2RenderingContext.prototype.depthFunc = _h( WebGL2RenderingContext.prototype.depthFunc, ( func ) => {

	const cached = ( CL3D.cache.depthFuncFunc === func );
	CL3D.cache.depthFuncFunc = func;
	return cached;

} );

WebGL2RenderingContext.prototype.depthMask = _h( WebGL2RenderingContext.prototype.depthMask, ( v ) => {

	const cached = ( CL3D.cache.depthMaskEnable === v );
	CL3D.cache.depthMaskEnable = v;
	return cached;

} );

})();