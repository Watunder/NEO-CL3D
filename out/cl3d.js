//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt

/*
 * This file Contains basic helper functions to convert between angles, finding minima and maxima of numbers and similar
 */

const gCCDebugInfoEnabled = true;
const DebugPostEffects = false;
const UseShadowCascade = true;
const Extensions = {
	draw: () => { },
	setWorld: (world) => { },
	readAnimator: (loader, type, rootSceneNode, sceneManager) => { return null },
};

/** 
 * @const 
 * @public
 * The value PI
 */
const PI = 3.14159265359;

/** 
 * @const 
 * @public
 * reciprocal PI value
 */
const RECIPROCAL_PI = 1.0 / 3.14159265359;

/** 
 * @const 
 * @public
 * Half of PI
 */
const HALF_PI = 3.14159265359 / 2.0;

/** 
 * @const 
 * @public
 * Hih precision PI value
 */
const PI64 = 3.1415926535897932384626433832795028841971693993751;

/** 
 * @const 
 * @public
 * Value to convert degrees to grad. Use {@link degToRad} to do this.
 */
const DEGTORAD = 3.14159265359 / 180.0;

/** 
 * @const 
 * @public
 */
const RADTODEG = 180.0 / 3.14159265359;

/** 
 * Low tolerance value deciding which floating point values are considered equal.
 * @const 
 */
const TOLERANCE = 0.00000001;



/** 
 * Converts an angle from radians to degrees. 
 */
const radToDeg = function (radians) {
	return radians * RADTODEG;
};


/** 
 * Converts an angle from degrees to radians.
 */
const degToRad = function (deg) {
	return deg * DEGTORAD;
};

/** 
 * Returns if a floating point value is considered similar to 0, depending on {@link TOLERANCE}.
 */
const iszero = function (a) {
	return (a < 0.00000001) && (a > -0.00000001);
};

/** 
 * Returns if a floating point value is considered similar to 0, depending on {@link TOLERANCE}.
 */
const isone = function (a) {
	return (a + 0.00000001 >= 1) && (a - 0.00000001 <= 1);
};

/** 
 * Returns if two floating point values are considered similar, depending on {@link TOLERANCE}.
 */
const equals = function (a, b) {
	return (a + 0.00000001 >= b) && (a - 0.00000001 <= b);
};


/** 
 * Returns a new value which is clamped between low and high. 
 */
const clamp = function (n, low, high) {
	if (n < low)
		return low;

	if (n > high)
		return high;

	return n;
};

/** 
 * Returns the fraction part of a floating point value. Given for example 6.788, this would return 0.788.
 */
const fract = function (n) {
	return n - Math.floor(n);
};

/** 
 * Returns the maximum value of 3 input values.
 */
const max3 = function (a, b, c) {
	if (a > b) {
		if (a > c)
			return a;

		return c;
	}

	if (b > c)
		return b;

	return c;
};

/** 
 * Returns the minimum of 3 input values. 
 */
const min3 = function (a, b, c) {
	if (a < b) {
		if (a < c)
			return a;

		return c;
	}

	if (b < c)
		return b;

	return c;
};

/**
 * Returns the alpha component of a color compressed into one 32bit integer value
 * @param {Number} clr color
 * @returns {Number} color component value, a value between 0 and 255  
 */
const getAlpha = function (clr) {
	return ((clr & 0xFF000000) >>> 24);
};

/**
 * Returns the red component of a color compressed into one 32bit integer value
 * @param clr {Number} color
 * @returns {Number} color component value, a value between 0 and 255  
 */
const getRed = function (clr) {
	return ((clr & 0x00FF0000) >> 16);
};

/**
 * Returns the green component of a color compressed into one 32bit integer value
 * @param clr {Number} color
 * @returns {Number} color component value, a value between 0 and 255   
 */
const getGreen = function (clr) {
	return ((clr & 0x0000FF00) >> 8);
};

/**
 * Returns the blue component of a color compressed into one 32bit integer value
 * @param clr {Number} 32 bit color
 * @returns {Number} color component value, a value between 0 and 255  
 */
const getBlue = function (clr) {
	return ((clr & 0x000000FF));
};

/**
 * Creates a 32bit value representing a color
 * @param a {Number} Alpha component of the color (value between 0 and 255)
 * @param r {Number} Red component of the color (value between 0 and 255)
 * @param g {Number} Green component of the color (value between 0 and 255)
 * @param b {Number} Blue component of the color (value between 0 and 255)
 * @returns {Number} 32 bit color 
 */
const createColor = function (a, r, g, b) {
	a = a & 0xff;
	r = r & 0xff;
	g = g & 0xff;
	b = b & 0xff;

	return (a << 24) | (r << 16) | (g << 8) | b;
};


/**
 * Creates a export const ColorF from 32bit value representing a color
 */
const createColorF = function (c) {
	var r = new ColorF();
	r.A = getAlpha(c) / 255.0;
	r.R = getRed(c) / 255.0;
	r.G = getGreen(c) / 255.0;
	r.B = getBlue(c) / 255.0;
	return r;
};

const convertIntColor = function (c) {
	var a = (c >> 24) & 255.0;
	var r = (c >> 16) & 255.0;
	var g = (c >> 8) & 255.0;
	var b = (c) & 255.0;
	return { r: r, g: g, b: b, a: a };
};

/**
 * @public
 */
const getInterpolatedColor = function (clr1, clr2, f) {
	var invf = 1.0 - f;

	return createColor(
		getAlpha(clr1) * f + getAlpha(clr2) * invf,
		getRed(clr1) * f + getRed(clr2) * invf,
		getGreen(clr1) * f + getGreen(clr2) * invf,
		getBlue(clr1) * f + getBlue(clr2) * invf);
};

/**
 * @public
 */
const sgn = function (a) {
	if (a > 0.0)
		return 1.0;

	if (a < 0.0)
		return -1.0;

	return 0.0;
};

/**
 * A class holding a floating point color, consisting of four Numbers, for r, g, b and alpha
 * @constructor
 * @class A class holding a floating point color, consisting of four Numbers, for r, g, b and alpha
 */
/**
 * A class holding a floating point color, consisting of four Numbers, for r, g, b and alpha
 * @constructor
 * @class A class holding a floating point color, consisting of four Numbers, for r, g, b and alpha
 */
class ColorF {
	/**
	 * alpha value of the color
	 * @public
	 * @type Number
	 */
	A = 1.0;

	/**
	 * red value of the color
	 * @public
	 * @type Number
	 */
	R = 1.0;

	/**
	 * green value of the color
	 * @public
	 * @type Number
	 */
	G = 1.0;

	/**
	 * blue value of the color
	 * @public
	 * @type Number
	 */
	B = 1.0;

	constructor() {
		this.A = 1.0;
		this.R = 1.0;
		this.G = 1.0;
		this.B = 1.0;
	}

	/**
	 * Creates a copy of this color
	 * @public
	 */
	clone = function () {
		var r = new ColorF();
		r.A = this.A;
		r.R = this.R;
		r.G = this.G;
		r.B = this.B;
		return r;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt

/**
 * A simple class for receiving the current time in milliseconds. Used by the animators for example.
 * @constructor
 * @public
 */
class CLTimer {
	constructor() {
	}
	/**
	 * Returns the current time in milliseconds.
	 * @public
	 */
	static getTime() {
		//var d = new Date();
		//return d.getTime();
		return performance.now();
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * 3d vector class with lots of operators and methods. Usually used to store 3d positions and directions.
 * @class 3d vector class with lots of operators and methods
 * @public
 * @constructor
 * @param {Number} x x coordinate, can be null.
 * @param {Number} y y coordinate, can be null.
 * @param {Number} z z coordinate, can be null.
 */
class Vect3d {

	/**
	 * X coordinate of the vector
	 * @public
	 * @type Number
	 */
	X = 0;

	/**
	 * Y coordinate of the vector
	 * @public
	 * @type Number 
	 */
	Y = 0;

	/**
	 * Z coordinate of the vector
	 * @public
	 * @type Number
	 */
	Z = 0;
	constructor(x, y, z) {
		if (x != null) {
			this.X = x;
			this.Y = y;
			this.Z = z;
		}
	}
	/**
	 * Sets all 3 coordinates to new values
	 * @public
	 */
	set(x, y, z) {
		this.X = x;
		this.Y = y;
		this.Z = z;
	}
	/**
	 * Creates a copy of this vector and returns it
	 * @public
	 * @returns {CL3D.Vect3d}
	 */
	clone() {
		return new Vect3d(this.X, this.Y, this.Z);
	}
	/**
	 * Copies the content of this vector to another vector
	 * @public
	 * @param {CL3D.Vect3d} tgt Target vector
	 */
	copyTo(tgt) {
		tgt.X = this.X;
		tgt.Y = this.Y;
		tgt.Z = this.Z;
	}
	/**
	 * Substracts another vector from this vector and returns a new vector
	 * param other {CL3D.Vect3d} other vector
	 * @public
	 * @returns {CL3D.Vect3d} new vector with the result
	 */
	substract(other) {
		return new Vect3d(this.X - other.X, this.Y - other.Y, this.Z - other.Z);
	}
	/**
	 * Substracts another vector from this vector, modifying this vector
	 * param other {CL3D.Vect3d} other vector
	 * @public
	 */
	substractFromThis(other) {
		this.X -= other.X;
		this.Y -= other.Y;
		this.Z -= other.Z;
	}
	/**
	 * Adds another vector to this vector and returns a new vector
	 * param other {CL3D.Vect3d} other vector
	 * @public
	 * @returns {CL3D.Vect3d} new vector with the result
	 */
	add(other) {
		return new Vect3d(this.X + other.X, this.Y + other.Y, this.Z + other.Z);
	}
	/**
	 * Adds another vector to this vector, modifying this vector
	 * param other {CL3D.Vect3d} other vector
	 * @public
	 */
	addToThis(other) {
		this.X += other.X;
		this.Y += other.Y;
		this.Z += other.Z;
	}
	/**
	 * @public
	 */
	addToThisReturnMe(other) {
		this.X += other.X;
		this.Y += other.Y;
		this.Z += other.Z;
		return this;
	}
	/**
	 * Normalizes this vector, setting it to a length of 1, modifying this vector
	 * @public
	 */
	normalize() {
		let l = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
		if (l > -0.0000001 && l < 0.0000001)
			return;

		l = 1.0 / Math.sqrt(l);
		this.X *= l;
		this.Y *= l;
		this.Z *= l;
	}
	/**
	 * Creates a new vector which is the normalized version of this vector (set to a length of 1)
	 * param other {CL3D.Vect3d} other vector
	 * @returns {CL3D.Vect3d} Returns a new vector with the result
	 * @public
	 */
	getNormalized() {
		let l = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
		if (l > -0.0000001 && l < 0.0000001)
			return new Vect3d(0, 0, 0);

		l = 1.0 / Math.sqrt(l);
		return new Vect3d(this.X * l, this.Y * l, this.Z * l);
	}
	/**
	 * Sets the lengthh of this vector to the specified value
	 * @public
	 */
	setLength(n) {
		let l = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
		if (l > -0.0000001 && l < 0.0000001)
			return;

		l = n / Math.sqrt(l);
		this.X *= l;
		this.Y *= l;
		this.Z *= l;
	}
	/**
	 * Sets all coordinates of this vector to the coordinates of the other vector
	 * @public
	 * @param {CL3D.Vect3d} other other vector
	 */
	setTo(other) {
		this.X = other.X;
		this.Y = other.Y;
		this.Z = other.Z;
	}
	/**
	 * Returns true if this vector equals another vector. Doesn't use the comparison operator but the {@link equals} function.
	 * @public
	 * @param other {CL3D.Vect3d} other vector
	 */
	equals(other) {
		return equals(this.X, other.X) &&
			equals(this.Y, other.Y) &&
			equals(this.Z, other.Z);
	}
	/**
	 * Returns true if this vector equals zero. Doesn't use the comparison operator but the {@link iszero} function.
	 * @public
	 */
	equalsZero() {
		return iszero(this.X) && iszero(this.Y) && iszero(this.Z);
	}
	/**
	 * Returns true if this vector equals x, y, and z given as argument. Doesn't use the comparison operator but the {@link equals} function.
	 * @public
	 */
	equalsByNumbers(x, y, z) {
		return equals(this.X, x) &&
			equals(this.Y, y) &&
			equals(this.Z, z);
	}
	/**
	 * Returns true if this vector == zero.
	 * @public
	 */
	isZero() {
		//return CL3D.iszero(X) && CL3D.iszero(Y) && CL3D.iszero(Z);
		return this.X == 0 && this.Y == 0 && this.Z == 0;
	}
	/**
	 * Returns the lenght of this vector
	 * @public
	 */
	getLength() {
		return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z);
	}
	/**
	 * Returns the distance to another point
	 * @public
	 * @param {CL3D.Vect3d} v another point
	 */
	getDistanceTo(v) {
		let x = v.X - this.X;
		let y = v.Y - this.Y;
		let z = v.Z - this.Z;

		return Math.sqrt(x * x + y * y + z * z);
	}
	/**
	 * Returns the squared distance to another point
	 * @public
	 * @param {CL3D.Vect3d} v another point
	 */
	getDistanceFromSQ(v) {
		let x = v.X - this.X;
		let y = v.Y - this.Y;
		let z = v.Z - this.Z;

		return x * x + y * y + z * z;
	}
	/**
	 * Returns the squared lenght of this vector, is faster than {@link Vect3d.getLength}.
	 * @public
	 */
	getLengthSQ() {
		return this.X * this.X + this.Y * this.Y + this.Z * this.Z;
	}
	/**
	 * Multiplies this vector with a scalar value (= a number) and returns the result as a new vector
	 * @public
	 */
	multiplyWithScal(v) {
		return new Vect3d(this.X * v, this.Y * v, this.Z * v);
	}
	/**
	 * Multiplies this vector with a scalar value (= a number), modifying this vector
	 * @public
	 */
	multiplyThisWithScal(v) {
		this.X *= v;
		this.Y *= v;
		this.Z *= v;
	}
	/**
	 * @public
	 */
	multiplyThisWithScalReturnMe(v) {
		this.X *= v;
		this.Y *= v;
		this.Z *= v;
		return this;
	}
	/**
	 * Multiplies each coordinate with the coordinate of another vector, modifying this vector.
	 * @public
	 */
	multiplyThisWithVect(v) {
		this.X *= v.X;
		this.Y *= v.Y;
		this.Z *= v.Z;
	}
	/**
	 * Multiplies each coordinate with the coordinate of another vector, returning the result as a new vector.
	 * @public
	 */
	multiplyWithVect(v) {
		return new Vect3d(this.X * v.X, this.Y * v.Y, this.Z * v.Z);
	}
	/**
	 * Divides each coordinate with the coordinate of another vector, modifying this vector.
	 * @public
	 */
	divideThisThroughVect(v) {
		this.X /= v.X;
		this.Y /= v.Y;
		this.Z /= v.Z;
	}
	/**
	 * Divides each coordinate with the coordinate of another vector, returning the result as a new vector.
	 * @public
	 */
	divideThroughVect(v) {
		return new Vect3d(this.X / v.X, this.Y / v.Y, this.Z / v.Z);
	}
	/**
	 * returns the cross product of this vector with another vector as new vector.
	 * @public
	 * @returns {CL3D.Vect3d} a new vector with the result cross product
	 */
	crossProduct(p) {
		return new Vect3d(this.Y * p.Z - this.Z * p.Y, this.Z * p.X - this.X * p.Z, this.X * p.Y - this.Y * p.X);
	}
	/**
	 * returns the dot procduct of this vector with another vector
	 * @public
	 */
	dotProduct(other) {
		return this.X * other.X + this.Y * other.Y + this.Z * other.Z;
	}
	/**
	 * Get the rotations that would make a (0,0,1) direction vector point in the same direction as this direction vector.
	 * This utility method is very useful for
	 * orienting scene nodes towards specific targets.  For example, if this vector represents the difference
	 * between two scene nodes, then applying the result of getHorizontalAngle() to one scene node will point
	 * it at the other one.
	 * @public
	 */
	getHorizontalAngle() {
		let angle = new Vect3d();

		angle.Y = radToDeg(Math.atan2(this.X, this.Z));

		if (angle.Y < 0.0)
			angle.Y += 360.0;
		if (angle.Y >= 360.0)
			angle.Y -= 360.0;

		let z1 = Math.sqrt(this.X * this.X + this.Z * this.Z);

		angle.X = radToDeg(Math.atan2(z1, this.Y)) - 90.0;

		if (angle.X < 0.0)
			angle.X += 360.0;
		if (angle.X >= 360.0)
			angle.X -= 360.0;

		return angle;
	}
	/**
	 * Rotates the vector around XY by a specic angle
	 * @public
	 */
	rotateXYBy(degrees) {
		degrees *= DEGTORAD;
		let cs = Math.cos(degrees);
		let sn = Math.sin(degrees);

		let oldX = this.X;
		let oldY = this.Y;

		this.X = oldX * cs - oldY * sn;
		this.Y = oldX * sn + oldY * cs;
	}
	/**
	 * Rotates the vector around YZ by a specic angle
	 * @public
	 */
	rotateYZBy(degrees) {
		degrees *= DEGTORAD;
		let cs = Math.cos(degrees);
		let sn = Math.sin(degrees);

		let oldY = this.Y;
		let oldZ = this.Z;

		this.Y = oldY * cs - oldZ * sn;
		this.Z = oldY * sn + oldZ * cs;
	}
	/**
	 * Rotates the vector around XZ by a specic angle
	 * @public
	 */
	rotateXZBy(degrees) {
		degrees *= DEGTORAD;
		let cs = Math.cos(degrees);
		let sn = Math.sin(degrees);

		let oldX = this.X;
		let oldZ = this.Z;

		this.X = oldX * cs - oldZ * sn;
		this.Z = oldX * sn + oldZ * cs;
	}
	/**
	 * returns a new interpolated vector, between this and another vector.
	 * @param {CL3D.Vect3d} other another point or vector
	 * @param {Number} d value between 0 and 1, specifying the interpolation
	 * @public
	 */
	getInterpolated(other, d) {
		let inv = 1.0 - d;
		return new Vect3d(other.X * inv + this.X * d, other.Y * inv + this.Y * d, other.Z * inv + this.Z * d);
	}
	/**
	 * Returns a string representation of this vector.
	 * @public
	 */
	toString() {
		return "(x: " + this.X + " y:" + this.Y + " z:" + this.Z + ")";
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * 2d vector class, used for example for texture coordinates.
 * @class 2d vector class, used for example for texture coordinates.
 * @constructor
 * @param {Number} x x coordinate. Can be null.
 * @param {Number} y y coordinate.
 */
class Vect2d {
	/**
	 * X coordinate of the vector
	 * @public
	 * @type Number
	 */
	X = 0;

	/**
	 * Y coordinate of the vector
	 * @public
	 * @type Number 
	 */
	Y = 0;

	constructor(x, y) {
		if (x == null) {
			this.X = 0;
			this.Y = 0;
		}

		else {
			this.X = x;
			this.Y = y;
		}
	}
	/**
	 * Sets all 2 coordinates to new values
	 * @public
	 */
	set(x, y) {
		this.X = x;
		this.Y = y;
	}
	/**
	 * Creates a copy of this vector and returns it
	 * @public
	 * @returns {Vect2d}
	 */
	clone() {
		return new Vect2d(this.X, this.Y);
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * An axis aligned bounding box with a min and a maximal edge.
 * @constructor
 * @class Axis aligned bounding box.
 */
class Box3d {
	/**
	 * Minimal Edge of the bounding box
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	MinEdge = null;

	/**
	 * Maximal Edge of the bounding box
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	MaxEdge = null;

	constructor() {
		this.MinEdge = new Vect3d();
		this.MaxEdge = new Vect3d();
	}
	/**
	 * Creates a clone of the box
	 * @public
	 * @returns {CL3D.Box3d} clone
	 */
	clone() {
		let c = new Box3d();
		c.MinEdge = this.MinEdge.clone();
		c.MaxEdge = this.MaxEdge.clone();
		return c;
	}
	/**
	 * Returns the center of the box
	 * @public
	 * @returns {CL3D.Vect3d} center
	 */
	getCenter() {
		let ret = this.MinEdge.add(this.MaxEdge);
		ret.multiplyThisWithScal(0.5);
		return ret;
	}
	/**
	 * Returns the extent (or size) of the box
	 * @public
	 * @returns {CL3D.Vect3d} extent
	 */
	getExtent() {
		return this.MaxEdge.substract(this.MinEdge);
	}
	/**
	 * Returns all 8 edges of the bounding box
	 * @public
	 * @returns {Array} edges
	 */
	getEdges() {
		let middle = this.getCenter();
		let diag = middle.substract(this.MaxEdge);

		let edges = new Array();
		edges.push(new Vect3d(middle.X + diag.X, middle.Y + diag.Y, middle.Z + diag.Z));
		edges.push(new Vect3d(middle.X + diag.X, middle.Y - diag.Y, middle.Z + diag.Z));
		edges.push(new Vect3d(middle.X + diag.X, middle.Y + diag.Y, middle.Z - diag.Z));
		edges.push(new Vect3d(middle.X + diag.X, middle.Y - diag.Y, middle.Z - diag.Z));
		edges.push(new Vect3d(middle.X - diag.X, middle.Y + diag.Y, middle.Z + diag.Z));
		edges.push(new Vect3d(middle.X - diag.X, middle.Y - diag.Y, middle.Z + diag.Z));
		edges.push(new Vect3d(middle.X - diag.X, middle.Y + diag.Y, middle.Z - diag.Z));
		edges.push(new Vect3d(middle.X - diag.X, middle.Y - diag.Y, middle.Z - diag.Z));

		return edges;
	}
	/**
	 * Returns if the box intersects with a line
	 * @param lineStart {CL3D.Vect3d} start of the line
	 * @param lineEnd {CL3D.Vect3d} end of the line
	 * @public
	 */
	intersectsWithLine(lineStart, lineEnd) {
		let vect = lineEnd.substract(lineStart);
		let len = vect.getLength();

		vect.normalize();

		let middle = lineStart.add(lineEnd).multiplyWithScal(0.5);

		return this.intersectsWithLineImpl(middle, vect, len * 0.5);
	}
	/**
	 * @public
	 */
	intersectsWithLineImpl(linemiddle, linevect, halflength) {
		let e = this.getExtent().multiplyWithScal(0.5);
		let t = this.getCenter().substract(linemiddle);

		if ((Math.abs(t.X) > e.X + halflength * Math.abs(linevect.X)) ||
			(Math.abs(t.Y) > e.Y + halflength * Math.abs(linevect.Y)) ||
			(Math.abs(t.Z) > e.Z + halflength * Math.abs(linevect.Z)))
			return false;

		let r = e.Y * Math.abs(linevect.Z) + e.Z * Math.abs(linevect.Y);
		if (Math.abs(t.Y * linevect.Z - t.Z * linevect.Y) > r)
			return false;

		r = e.X * Math.abs(linevect.Z) + e.Z * Math.abs(linevect.X);
		if (Math.abs(t.Z * linevect.X - t.X * linevect.Z) > r)
			return false;

		r = e.X * Math.abs(linevect.Y) + e.Y * Math.abs(linevect.X);
		if (Math.abs(t.X * linevect.Y - t.Y * linevect.X) > r)
			return false;

		return true;
	}
	/**
	 * Adds a point to the bounding box, increasing the box if the point is outside of the box
	  * @public
	 */
	addInternalPoint(x, y, z) {
		if (x > this.MaxEdge.X) this.MaxEdge.X = x;
		if (y > this.MaxEdge.Y) this.MaxEdge.Y = y;
		if (z > this.MaxEdge.Z) this.MaxEdge.Z = z;

		if (x < this.MinEdge.X) this.MinEdge.X = x;
		if (y < this.MinEdge.Y) this.MinEdge.Y = y;
		if (z < this.MinEdge.Z) this.MinEdge.Z = z;
	}
	/**
	 * Adds a point to the bounding box, increasing the box if the point is outside of the box
	  * @public
	  * @param v {CL3D.Vect3d} 3d vector representing the point
	 */
	addInternalPointByVector(v) {
		this.addInternalPoint(v.X, v.Y, v.Z);
	}
	/**
	 * Adds a box to the bounding box
	  * @public
	  * @param v {CL3D.Box3d} 3d bounding box to add
	 */
	addInternalBox(box) {
		this.addInternalPointByVector(box.MinEdge);
		this.addInternalPointByVector(box.MaxEdge);
	}
	/**
	 * Returns if the box intersects with another box
	 * @param box {CL3D.Box3d} other box
	 * @public
	 */
	intersectsWithBox(box) {
		return this.MinEdge.X <= box.MaxEdge.X && this.MinEdge.Y <= box.MaxEdge.Y && this.MinEdge.Z <= box.MaxEdge.Z &&
			this.MaxEdge.X >= box.MinEdge.X && this.MaxEdge.Y >= box.MinEdge.Y && this.MaxEdge.Z >= box.MinEdge.Z;
	}
	/**
	 * Returns if a point is inside this box
	 * @param p {CL3D.Vect3d} point to test
	 * @public
	 */
	isPointInside(p) {
		return p.X >= this.MinEdge.X && p.X <= this.MaxEdge.X &&
			p.Y >= this.MinEdge.Y && p.Y <= this.MaxEdge.Y &&
			p.Z >= this.MinEdge.Z && p.Z <= this.MaxEdge.Z;
	}
	/**
	 * Resets the bounding box
	 * @public
	 */
	reset(x, y, z) {
		this.MaxEdge.set(x, y, z);
		this.MinEdge.set(x, y, z);
	}
	/**
	 * Returns true if the box is empty (MinEdge == MaxEdge)
	 * @public
	 */
	isEmpty() {
		return this.MaxEdge.equals(this.MinEdge);
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A 4x4 matrix. Mostly used as transformation matrix for 3d calculations. 
 * The matrix is a D3D style matrix, row major with translations in the 4th row.
 * @constructor
 * @public
 * @class A 4x4 matrix, mostly used as transformation matrix for 3d calculations.
 * @param {Boolean} bMakeIdentity If set to true, the matrix will initially have stored the identity matrix.
 */
class Matrix4 {
	constructor(bMakeIdentity) {
		if (bMakeIdentity == null)
			bMakeIdentity = true;

		this.m00 = 0;
		this.m01 = 0;
		this.m02 = 0;
		this.m03 = 0;
		this.m04 = 0;
		this.m05 = 0;
		this.m06 = 0;
		this.m07 = 0;
		this.m08 = 0;
		this.m09 = 0;
		this.m10 = 0;
		this.m11 = 0;
		this.m12 = 0;
		this.m13 = 0;
		this.m14 = 0;
		this.m15 = 0;

		this.bIsIdentity = false;

		if (bMakeIdentity) {
			this.m00 = 1;
			this.m05 = 1;
			this.m10 = 1;
			this.m15 = 1;
			this.bIsIdentity = true;
		}
	}
	/**
	 * Makes this matrix the identitiy matrix
	 * @public
	 */
	makeIdentity() {
		this.m00 = 1; this.m01 = 0; this.m02 = 0; this.m03 = 0;
		this.m04 = 0; this.m05 = 1; this.m06 = 0; this.m07 = 0;
		this.m08 = 0; this.m09 = 0; this.m10 = 1; this.m11 = 0;
		this.m12 = 0; this.m13 = 0; this.m14 = 0; this.m15 = 1;
		this.bIsIdentity = true;
	}
	/**
	 * Returns if this matrix is the identity matrix
	 * @public
	 */
	isIdentity() {
		if (this.bIsIdentity)
			return true;

		this.bIsIdentity = (isone(this.m00) && iszero(this.m01) && iszero(this.m02) && iszero(this.m03) &&
			iszero(this.m04) && isone(this.m05) && iszero(this.m06) && iszero(this.m07) &&
			iszero(this.m08) && iszero(this.m09) && isone(this.m10) && iszero(this.m11) &&
			iszero(this.m12) && iszero(this.m13) && iszero(this.m14) && isone(this.m15));

		return this.bIsIdentity;
	}
	/**
	 * returns if only the translation is set in the matrix
	 * @public
	 */
	isTranslateOnly() {
		if (this.bIsIdentity)
			return true;

		return (isone(this.m00) && iszero(this.m01) && iszero(this.m02) && iszero(this.m03) &&
			iszero(this.m04) && isone(this.m05) && iszero(this.m06) && iszero(this.m07) &&
			iszero(this.m08) && iszero(this.m09) && isone(this.m10) && iszero(this.m11) &&
			isone(this.m15));
	}
	/**
	 * Returns if this matrix equals another matrix, uses {@link equals} as comparison operator.
	 * @public
	 */
	equals(mat) {
		return equals(this.m00, mat.m00) &&
			equals(this.m01, mat.m01) &&
			equals(this.m02, mat.m02) &&
			equals(this.m03, mat.m03) &&
			equals(this.m04, mat.m04) &&
			equals(this.m05, mat.m05) &&
			equals(this.m06, mat.m06) &&
			equals(this.m07, mat.m07) &&
			equals(this.m08, mat.m08) &&
			equals(this.m09, mat.m09) &&
			equals(this.m10, mat.m10) &&
			equals(this.m11, mat.m11) &&
			equals(this.m12, mat.m12) &&
			equals(this.m13, mat.m13) &&
			equals(this.m14, mat.m14) &&
			equals(this.m15, mat.m15);
	}
	/**
	 * Returns the translation stored in the matrix as 3d vector
	 * @returns {CL3D.Vect3d} translation vector
	 * @public
	 */
	getTranslation() {
		return new Vect3d(this.m12, this.m13, this.m14);
	}
	/**
	 * Returns the scle stored in the matrix as 3d vector
	 * @returns {CL3D.Vect3d} scale vector
	 * @public
	 */
	getScale() {
		return new Vect3d(this.m00, this.m05, this.m10);
	}
	/**
	 * Rotates a 3d vector by this matrix.
	 * @public
	 */
	rotateVect(v) {
		let tmp = v.clone();
		v.X = tmp.X * this.m00 + tmp.Y * this.m04 + tmp.Z * this.m08;
		v.Y = tmp.X * this.m01 + tmp.Y * this.m05 + tmp.Z * this.m09;
		v.Z = tmp.X * this.m02 + tmp.Y * this.m06 + tmp.Z * this.m10;
	}
	/**
	 * Rotates an input vector and stores the result in the output paramter
	 * @public
	 */
	rotateVect2(out, inp) {
		out.X = inp.X * this.m00 + inp.Y * this.m04 + inp.Z * this.m08;
		out.Y = inp.X * this.m01 + inp.Y * this.m05 + inp.Z * this.m09;
		out.Z = inp.X * this.m02 + inp.Y * this.m06 + inp.Z * this.m10;
	}
	/**
	 * Rotate a vector by the inverse of the rotation part of this matrix.
	 * @public
	 */
	inverseRotateVect(v) {
		let tmp = v.clone();
		v.X = tmp.X * this.m00 + tmp.Y * this.m01 + tmp.Z * this.m02;
		v.Y = tmp.X * this.m04 + tmp.Y * this.m05 + tmp.Z * this.m06;
		v.Z = tmp.X * this.m08 + tmp.Y * this.m09 + tmp.Z * this.m10;
	}
	/**
	 * Returns a new vector, rotated from the input vector by this matrix
	 * @public
	 */
	getRotatedVect(v) {
		return new Vect3d(v.X * this.m00 + v.Y * this.m04 + v.Z * this.m08,
			v.X * this.m01 + v.Y * this.m05 + v.Z * this.m09,
			v.X * this.m02 + v.Y * this.m06 + v.Z * this.m10);
	}
	/**
	 * returns a new transformed vector from the input vector
	 * @public
	 */
	getTransformedVect(v) {
		return new Vect3d(v.X * this.m00 + v.Y * this.m04 + v.Z * this.m08 + this.m12,
			v.X * this.m01 + v.Y * this.m05 + v.Z * this.m09 + this.m13,
			v.X * this.m02 + v.Y * this.m06 + v.Z * this.m10 + this.m14);
	}
	/**
	 * Transforms the input vector by this matrix
	 * @public
	 */
	transformVect(v) {
		let tmpx = v.X * this.m00 + v.Y * this.m04 + v.Z * this.m08 + this.m12;
		let tmpy = v.X * this.m01 + v.Y * this.m05 + v.Z * this.m09 + this.m13;
		let tmpz = v.X * this.m02 + v.Y * this.m06 + v.Z * this.m10 + this.m14;

		v.X = tmpx;
		v.Y = tmpy;
		v.Z = tmpz;
	}
	/**
	 * Transforms the input vector by this matrix and stores the result in the ouput parameter
	 * @public
	 */
	transformVect2(out, inp) {
		out.X = inp.X * this.m00 + inp.Y * this.m04 + inp.Z * this.m08 + this.m12;
		out.Y = inp.X * this.m01 + inp.Y * this.m05 + inp.Z * this.m09 + this.m13;
		out.Z = inp.X * this.m02 + inp.Y * this.m06 + inp.Z * this.m10 + this.m14;
	}
	/**
	 * Translates a input vector by this matrix and returns it as new vector.
	 * @public
	 */
	getTranslatedVect(v) {
		return new Vect3d(v.X + this.m12,
			v.Y + this.m13,
			v.Z + this.m14);
	}
	/**
	 * Translates a vector by this matrix
	 * @public
	 */
	translateVect(v) {
		v.X = v.X + this.m12;
		v.Y = v.Y + this.m13;
		v.Z = v.Z + this.m14;
	}
	/**
	 * Transforms a 3d plane by this matrix
	 * @public
	 */
	transformPlane(plane) {
		// this works with all matrices except those with a scale:

		/*let member = plane.getMemberPoint();
		transformVect(member);
	    
		let origin = new CL3D.Vect3d();
		transformVect(plane.Normal);
		transformVect(origin);
    
		plane.Normal = plane.Normal.substract(origin);
		plane.D = - member.dotProduct(plane.Normal);
	    
		plane.Normal.normalize();*/
		// this works as well, bit without scale:
		/*let member = plane.getMemberPoint();
		transformVect(member);
	    
		let normal = plane.Normal.clone();
		rotateVect(normal);
	    
		plane.setPlane(member, normal);*/
		let member = plane.getMemberPoint();

		// Fully transform the plane member point, i.e. rotate, translate and scale it.
		this.transformVect(member);

		let normal = plane.Normal.clone();
		normal.normalize();

		// The normal needs to be rotated and inverse scaled, but not translated.
		let scale = this.getScale();

		if (!equals(scale.X, 0.0) && !equals(scale.Y, 0.0) && !equals(scale.Z, 0.0)
			&& (!equals(scale.X, 1.0) || !equals(scale.Y, 1.0) || !equals(scale.Z, 1.0))) {
			// Rotating the vector will also apply the scale, so we have to invert it twice.
			normal.X *= 1.0 / (scale.X * scale.X);
			normal.Y *= 1.0 / (scale.Y * scale.Y);
			normal.Z *= 1.0 / (scale.Z * scale.Z);
		}

		this.rotateVect(normal);

		normal.normalize();
		plane.setPlane(member, normal);
	}
	/**
	 * Multiplies this matrix with another matrix, returns the result as a new matrix.
	 * @public
	 */
	multiply(m2) {
		let mat = new Matrix4(false);

		if (this.bIsIdentity) {
			m2.copyTo(mat);
			return mat;
		}

		if (m2.bIsIdentity) {
			this.copyTo(mat);
			return mat;
		}

		mat.m00 = this.m00 * m2.m00 + this.m04 * m2.m01 + this.m08 * m2.m02 + this.m12 * m2.m03;
		mat.m01 = this.m01 * m2.m00 + this.m05 * m2.m01 + this.m09 * m2.m02 + this.m13 * m2.m03;
		mat.m02 = this.m02 * m2.m00 + this.m06 * m2.m01 + this.m10 * m2.m02 + this.m14 * m2.m03;
		mat.m03 = this.m03 * m2.m00 + this.m07 * m2.m01 + this.m11 * m2.m02 + this.m15 * m2.m03;

		mat.m04 = this.m00 * m2.m04 + this.m04 * m2.m05 + this.m08 * m2.m06 + this.m12 * m2.m07;
		mat.m05 = this.m01 * m2.m04 + this.m05 * m2.m05 + this.m09 * m2.m06 + this.m13 * m2.m07;
		mat.m06 = this.m02 * m2.m04 + this.m06 * m2.m05 + this.m10 * m2.m06 + this.m14 * m2.m07;
		mat.m07 = this.m03 * m2.m04 + this.m07 * m2.m05 + this.m11 * m2.m06 + this.m15 * m2.m07;

		mat.m08 = this.m00 * m2.m08 + this.m04 * m2.m09 + this.m08 * m2.m10 + this.m12 * m2.m11;
		mat.m09 = this.m01 * m2.m08 + this.m05 * m2.m09 + this.m09 * m2.m10 + this.m13 * m2.m11;
		mat.m10 = this.m02 * m2.m08 + this.m06 * m2.m09 + this.m10 * m2.m10 + this.m14 * m2.m11;
		mat.m11 = this.m03 * m2.m08 + this.m07 * m2.m09 + this.m11 * m2.m10 + this.m15 * m2.m11;

		mat.m12 = this.m00 * m2.m12 + this.m04 * m2.m13 + this.m08 * m2.m14 + this.m12 * m2.m15;
		mat.m13 = this.m01 * m2.m12 + this.m05 * m2.m13 + this.m09 * m2.m14 + this.m13 * m2.m15;
		mat.m14 = this.m02 * m2.m12 + this.m06 * m2.m13 + this.m10 * m2.m14 + this.m14 * m2.m15;
		mat.m15 = this.m03 * m2.m12 + this.m07 * m2.m13 + this.m11 * m2.m14 + this.m15 * m2.m15;

		return mat;
	}
	/**
	 * Multiplies this matrix with a 4D Vector (expects components X, Y, Z and W), result is stored in the input vector
	 * @public
	 */
	multiplyWith1x4Matrix(v) {
		let tmp = v.clone();
		tmp.W = v['W'];

		v.X = tmp.X * this.m00 + tmp.Y * this.m04 + tmp.Z * this.m08 + tmp.W * this.m12;
		v.Y = tmp.X * this.m01 + tmp.Y * this.m05 + tmp.Z * this.m09 + tmp.W * this.m13;
		v.Z = tmp.X * this.m02 + tmp.Y * this.m06 + tmp.Z * this.m10 + tmp.W * this.m14;
		v['W'] = tmp.X * this.m03 + tmp.Y * this.m07 + tmp.Z * this.m11 + tmp.W * this.m15;
	}
	/**
	 * same as multiplyWith1x4Matrix, but faster and returns w as value
	 * @public
	 */
	multiplyWith1x4Matrix2(v) {
		let tmpX = v.X;
		let tmpY = v.Y;
		let tmpZ = v.Z;

		v.X = tmpX * this.m00 + tmpY * this.m04 + tmpZ * this.m08 + this.m12;
		v.Y = tmpX * this.m01 + tmpY * this.m05 + tmpZ * this.m09 + this.m13;
		v.Z = tmpX * this.m02 + tmpY * this.m06 + tmpZ * this.m10 + this.m14;

		return tmpX * this.m03 + tmpY * this.m07 + tmpZ * this.m11 + this.m15;
	}
	/**
	 * Copies the inverse of this matrix into the output matrix, returns true succcessful.
	 * @public
	 */
	getInverse(out) {
		if (this.bIsIdentity) {
			this.copyTo(out);
			return true;
		}

		let d = (this.m00 * this.m05 - this.m01 * this.m04) * (this.m10 * this.m15 - this.m11 * this.m14) -
			(this.m00 * this.m06 - this.m02 * this.m04) * (this.m09 * this.m15 - this.m11 * this.m13) +
			(this.m00 * this.m07 - this.m03 * this.m04) * (this.m09 * this.m14 - this.m10 * this.m13) +
			(this.m01 * this.m06 - this.m02 * this.m05) * (this.m08 * this.m15 - this.m11 * this.m12) -
			(this.m01 * this.m07 - this.m03 * this.m05) * (this.m08 * this.m14 - this.m10 * this.m12) +
			(this.m02 * this.m07 - this.m03 * this.m06) * (this.m08 * this.m13 - this.m09 * this.m12);

		if (d > -0.0000001 && d < 0.0000001)
			return false;

		d = 1.0 / d;

		out.m00 = d * (this.m05 * (this.m10 * this.m15 - this.m11 * this.m14) + this.m06 * (this.m11 * this.m13 - this.m09 * this.m15) + this.m07 * (this.m09 * this.m14 - this.m10 * this.m13));
		out.m01 = d * (this.m09 * (this.m02 * this.m15 - this.m03 * this.m14) + this.m10 * (this.m03 * this.m13 - this.m01 * this.m15) + this.m11 * (this.m01 * this.m14 - this.m02 * this.m13));
		out.m02 = d * (this.m13 * (this.m02 * this.m07 - this.m03 * this.m06) + this.m14 * (this.m03 * this.m05 - this.m01 * this.m07) + this.m15 * (this.m01 * this.m06 - this.m02 * this.m05));
		out.m03 = d * (this.m01 * (this.m07 * this.m10 - this.m06 * this.m11) + this.m02 * (this.m05 * this.m11 - this.m07 * this.m09) + this.m03 * (this.m06 * this.m09 - this.m05 * this.m10));
		out.m04 = d * (this.m06 * (this.m08 * this.m15 - this.m11 * this.m12) + this.m07 * (this.m10 * this.m12 - this.m08 * this.m14) + this.m04 * (this.m11 * this.m14 - this.m10 * this.m15));
		out.m05 = d * (this.m10 * (this.m00 * this.m15 - this.m03 * this.m12) + this.m11 * (this.m02 * this.m12 - this.m00 * this.m14) + this.m08 * (this.m03 * this.m14 - this.m02 * this.m15));
		out.m06 = d * (this.m14 * (this.m00 * this.m07 - this.m03 * this.m04) + this.m15 * (this.m02 * this.m04 - this.m00 * this.m06) + this.m12 * (this.m03 * this.m06 - this.m02 * this.m07));
		out.m07 = d * (this.m02 * (this.m07 * this.m08 - this.m04 * this.m11) + this.m03 * (this.m04 * this.m10 - this.m06 * this.m08) + this.m00 * (this.m06 * this.m11 - this.m07 * this.m10));
		out.m08 = d * (this.m07 * (this.m08 * this.m13 - this.m09 * this.m12) + this.m04 * (this.m09 * this.m15 - this.m11 * this.m13) + this.m05 * (this.m11 * this.m12 - this.m08 * this.m15));
		out.m09 = d * (this.m11 * (this.m00 * this.m13 - this.m01 * this.m12) + this.m08 * (this.m01 * this.m15 - this.m03 * this.m13) + this.m09 * (this.m03 * this.m12 - this.m00 * this.m15));
		out.m10 = d * (this.m15 * (this.m00 * this.m05 - this.m01 * this.m04) + this.m12 * (this.m01 * this.m07 - this.m03 * this.m05) + this.m13 * (this.m03 * this.m04 - this.m00 * this.m07));
		out.m11 = d * (this.m03 * (this.m05 * this.m08 - this.m04 * this.m09) + this.m00 * (this.m07 * this.m09 - this.m05 * this.m11) + this.m01 * (this.m04 * this.m11 - this.m07 * this.m08));
		out.m12 = d * (this.m04 * (this.m10 * this.m13 - this.m09 * this.m14) + this.m05 * (this.m08 * this.m14 - this.m10 * this.m12) + this.m06 * (this.m09 * this.m12 - this.m08 * this.m13));
		out.m13 = d * (this.m08 * (this.m02 * this.m13 - this.m01 * this.m14) + this.m09 * (this.m00 * this.m14 - this.m02 * this.m12) + this.m10 * (this.m01 * this.m12 - this.m00 * this.m13));
		out.m14 = d * (this.m12 * (this.m02 * this.m05 - this.m01 * this.m06) + this.m13 * (this.m00 * this.m06 - this.m02 * this.m04) + this.m14 * (this.m01 * this.m04 - this.m00 * this.m05));
		out.m15 = d * (this.m00 * (this.m05 * this.m10 - this.m06 * this.m09) + this.m01 * (this.m06 * this.m08 - this.m04 * this.m10) + this.m02 * (this.m04 * this.m09 - this.m05 * this.m08));

		out.bIsIdentity = this.bIsIdentity;

		return true;
	}
	/**
	 * Inverts this matrix, returns true if successful
	 * @public
	 */
	makeInverse() {
		let mat = new Matrix4(false);
		if (this.getInverse(mat)) {
			mat.copyTo(this);
			return true;
		}

		return false;
	}
	/**
	 * Returns a transposed version of this matrix
	 * @public
	 */
	getTransposed() {
		let mat = new Matrix4(false);
		mat.m00 = this.m00;
		mat.m01 = this.m04;
		mat.m02 = this.m08;
		mat.m03 = this.m12;

		mat.m04 = this.m01;
		mat.m05 = this.m05;
		mat.m06 = this.m09;
		mat.m07 = this.m13;

		mat.m08 = this.m02;
		mat.m09 = this.m06;
		mat.m10 = this.m10;
		mat.m11 = this.m14;

		mat.m12 = this.m03;
		mat.m13 = this.m07;
		mat.m14 = this.m11;
		mat.m15 = this.m15;

		mat.bIsIdentity = this.bIsIdentity;

		return mat;
	}
	/**
	 * Returns the content of this matrix as array
	 * @public
	 * @returns {Array} array of this matrix.
	 */
	asArray() {
		return [
			this.m00, this.m01, this.m02, this.m03,
			this.m04, this.m05, this.m06, this.m07,
			this.m08, this.m09, this.m10, this.m11,
			this.m12, this.m13, this.m14, this.m15
		];
	}
	/**
	 * Sets a value of the matrix by index
	 * @param i Index in the matrix, a value between 0 and 15
	 * @param n Value to set
	 * @public
	 */
	setByIndex(i, n) {
		this.bIsIdentity = false;

		switch (i) {
			case 0: this.m00 = n; break;
			case 1: this.m01 = n; break;
			case 2: this.m02 = n; break;
			case 3: this.m03 = n; break;
			case 4: this.m04 = n; break;
			case 5: this.m05 = n; break;
			case 6: this.m06 = n; break;
			case 7: this.m07 = n; break;
			case 8: this.m08 = n; break;
			case 9: this.m09 = n; break;
			case 10: this.m10 = n; break;
			case 11: this.m11 = n; break;
			case 12: this.m12 = n; break;
			case 13: this.m13 = n; break;
			case 14: this.m14 = n; break;
			case 15: this.m15 = n; break;
		}
	}
	/**
	 * Creates a clone of this matrix
	 * @public
	 */
	clone() {
		let m = new Matrix4(false);
		this.copyTo(m);
		return m;
	}
	/**
	 * Copies the content of this matrix to a target matrix
	 * @public
	 */
	copyTo(mat) {
		mat.m00 = this.m00; mat.m01 = this.m01; mat.m02 = this.m02; mat.m03 = this.m03;
		mat.m04 = this.m04; mat.m05 = this.m05; mat.m06 = this.m06; mat.m07 = this.m07;
		mat.m08 = this.m08; mat.m09 = this.m09; mat.m10 = this.m10; mat.m11 = this.m11;
		mat.m12 = this.m12; mat.m13 = this.m13; mat.m14 = this.m14; mat.m15 = this.m15;
		mat.bIsIdentity = this.bIsIdentity;
	}
	/**
	 * Builds a left-handed perspective projection matrix based on a field of view.
	 * @public
	 */
	buildProjectionMatrixPerspectiveFovLH(fieldOfViewRadians,
		aspectRatio, zNear, zFar) {
		let h = 1.0 / Math.tan(fieldOfViewRadians / 2.0);
		let w = (h / aspectRatio);

		this.m00 = w;
		this.m01 = 0;
		this.m02 = 0;
		this.m03 = 0;

		this.m04 = 0;
		this.m05 = h;
		this.m06 = 0;
		this.m07 = 0;

		this.m08 = 0;
		this.m09 = 0;
		this.m10 = (zFar / (zFar - zNear));
		this.m11 = 1;

		this.m12 = 0;
		this.m13 = 0;
		this.m14 = (-zNear * zFar / (zFar - zNear));
		this.m15 = 0;

		this.bIsIdentity = false;
	}
	/**
	 * Builds a left-handed orthogonal projection matrix.
	 * @public
	 */
	buildProjectionMatrixPerspectiveOrthoLH(widthOfViewVolume, heightOfViewVolume,
		zNear, zFar) {
		this.m00 = 2.0 / widthOfViewVolume;
		this.m01 = 0;
		this.m02 = 0;
		this.m03 = 0;

		this.m04 = 0;
		this.m05 = 2.0 / heightOfViewVolume;
		this.m06 = 0;
		this.m07 = 0;

		this.m08 = 0;
		this.m09 = 0;
		this.m10 = 1.0 / (zFar - zNear);
		this.m11 = 0;

		this.m12 = 0;
		this.m13 = 0;
		this.m14 = (zNear / (zNear - zFar));
		this.m15 = 1;

		this.bIsIdentity = false;
	}
	/**
	 * Builds a left-handed orthogonal projection matrix.
	 * @public
	 */
	buildProjectionMatrixPerspectiveOrthoRH(widthOfViewVolume, heightOfViewVolume,
		zNear, zFar) {
		this.m00 = 2.0 / widthOfViewVolume;
		this.m01 = 0;
		this.m02 = 0;
		this.m03 = 0;

		this.m04 = 0;
		this.m05 = 2.0 / heightOfViewVolume;
		this.m06 = 0;
		this.m07 = 0;

		this.m08 = 0;
		this.m09 = 0;
		this.m10 = 1.0 / (zNear - zFar);
		this.m11 = 0;

		this.m12 = 0;
		this.m13 = 0;
		this.m14 = (zNear / (zNear - zFar));
		this.m15 = 1;

		this.bIsIdentity = false;
	}
	/**
	 * Builds a left-handed look-at matrix.
	 * @public
	 */
	buildCameraLookAtMatrixLH(position, target, upVector) {
		let zaxis = target.substract(position);
		zaxis.normalize();

		let xaxis = upVector.crossProduct(zaxis);
		xaxis.normalize();

		let yaxis = zaxis.crossProduct(xaxis);

		this.m00 = xaxis.X;
		this.m01 = yaxis.X;
		this.m02 = zaxis.X;
		this.m03 = 0;

		this.m04 = xaxis.Y;
		this.m05 = yaxis.Y;
		this.m06 = zaxis.Y;
		this.m07 = 0;

		this.m08 = xaxis.Z;
		this.m09 = yaxis.Z;
		this.m10 = zaxis.Z;
		this.m11 = 0;

		this.m12 = -xaxis.dotProduct(position);
		this.m13 = -yaxis.dotProduct(position);
		this.m14 = -zaxis.dotProduct(position);
		this.m15 = 1;

		this.bIsIdentity = false;
	}
	/**
	 * Make a rotation matrix from Euler angles. The 4th row and column are unmodified.
	 * @public
	 * @param {CL3D.Vect3d} v rotation vector
	 */
	setRotationDegrees(v) {
		this.setRotationRadians(v.multiplyWithScal(DEGTORAD));
	}
	/**
	 * Make a rotation matrix from Euler angles. The 4th row and column are unmodified.
	 * @public
	 * @param {CL3D.Vect3d} rotation rotation vector
	 */
	setRotationRadians(rotation) {
		let cr = Math.cos(rotation.X);
		let sr = Math.sin(rotation.X);
		let cp = Math.cos(rotation.Y);
		let sp = Math.sin(rotation.Y);
		let cy = Math.cos(rotation.Z);
		let sy = Math.sin(rotation.Z);

		this.m00 = (cp * cy);
		this.m01 = (cp * sy);
		this.m02 = (-sp);

		let srsp = sr * sp;
		let crsp = cr * sp;

		this.m04 = (srsp * cy - cr * sy);
		this.m05 = (srsp * sy + cr * cy);
		this.m06 = (sr * cp);

		this.m08 = (crsp * cy + sr * sy);
		this.m09 = (crsp * sy - sr * cy);
		this.m10 = (cr * cp);

		this.bIsIdentity = false;
	}
	/**
	 * Returns the rotation, as set by setRotation().
	 * Returns a rotation that is equivalent to that set by setRotationDegrees().
	 * @public
	 * @returns {CL3D.Vect3d} rotation vector
	 */
	getRotationDegrees() {
		let Y = -Math.asin(this.m02);
		let C = Math.cos(Y);
		Y *= RADTODEG;

		let rotx;
		let roty;
		let X;
		let Z;

		if (Math.abs(C) > 0.00000001) {
			let invC = (1.0 / C);
			rotx = this.m10 * invC;
			roty = this.m06 * invC;
			X = Math.atan2(roty, rotx) * RADTODEG;
			rotx = this.m00 * invC;
			roty = this.m01 * invC;
			Z = Math.atan2(roty, rotx) * RADTODEG;
		}

		else {
			X = 0.0;
			rotx = this.m05;
			roty = -this.m04;
			Z = Math.atan2(roty, rotx) * RADTODEG;
		}

		// fix values that get below zero
		// before it would set (!) values to 360
		// that where above 360:
		if (X < 0.0) X += 360.0;
		if (Y < 0.0) Y += 360.0;
		if (Z < 0.0) Z += 360.0;

		return new Vect3d(X, Y, Z);
	}
	/**
	 * Set the translation of the current matrix. Will erase any previous values.
	 * @public
	 * @param {CL3D.Vect3d} v translation vector
	 */
	setTranslation(v) {
		this.m12 = v.X;
		this.m13 = v.Y;
		this.m14 = v.Z;

		this.bIsIdentity = false;
	}
	/**
	 * Sets the scale of the matrix
	 * @param {CL3D.Vect3d} v translation vector
	 * @public
	 */
	setScale(v) {
		this.m00 = v.X;
		this.m05 = v.Y;
		this.m10 = v.Z;

		this.bIsIdentity = false;
	}
	/**
	 * Sets the scale of the matrix
	 * @public
	 */
	setScaleXYZ(x, y, z) {
		this.m00 = x;
		this.m05 = y;
		this.m10 = z;

		this.bIsIdentity = false;
	}
	/**
	 * Transforms a 3d box
	 * @param {CL3D.Box3d} box
	 */
	transformBoxEx(box) {
		let edges = box.getEdges();

		let i;
		for (i = 0; i < 8; ++i)
			this.transformVect(edges[i]);

		let v = edges[0];
		box.MinEdge = v.clone();
		box.MaxEdge = v.clone();

		for (i = 1; i < 8; ++i)
			box.addInternalPointByVector(edges[i]);
	}
	/**
	 * Transforms a 3d box with another method which is more exact than transformBoxEx
	 * @param {CL3D.Box3d} box
	 */
	transformBoxEx2(box) {
		let Amin = [box.MinEdge.X, box.MinEdge.Y, box.MinEdge.Z];
		let Amax = [box.MaxEdge.X, box.MaxEdge.Y, box.MaxEdge.Z];

		let Bmin = [this.m12, this.m13, this.m14];
		let Bmax = [this.m12, this.m13, this.m14];

		let asarr = this.asArray();

		for (let i = 0; i < 3; ++i) {
			for (let j = 0; j < 3; ++j) {
				let mv = asarr[j * 4 + i];
				let a = mv * Amin[j];
				let b = mv * Amax[j];

				if (a < b) {
					Bmin[i] += a;
					Bmax[i] += b;
				}

				else {
					Bmin[i] += b;
					Bmax[i] += a;
				}
			}
		}

		box.MinEdge.X = Bmin[0];
		box.MinEdge.Y = Bmin[1];
		box.MinEdge.Z = Bmin[2];

		box.MaxEdge.X = Bmax[0];
		box.MaxEdge.Y = Bmax[1];
		box.MaxEdge.Z = Bmax[2];
	}
	/**
	 * Returns a string representation of this matrix.
	 * @public
	 */
	toString() {
		return this.m00 + " " + this.m01 + " " + this.m02 + " " + this.m03 + "\n" +
			this.m04 + " " + this.m05 + " " + this.m06 + " " + this.m07 + "\n" +
			this.m08 + " " + this.m09 + " " + this.m10 + " " + this.m11 + "\n" +
			this.m12 + " " + this.m13 + " " + this.m14 + " " + this.m15;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt
// This file is part of the CopperLicht engine, (c) by N.Gebhardt


/**
 * A 3d vertex, ususally used in {@link MeshBuffer}s
 * @constructor
 * @class A 3d vertex, ususally used in {@link MeshBuffer}s
 * @param {Boolean} init set to true to let the vertex members (Position, Normal etc) be initialized with instances of classes, false if not.
 */
class Vertex3D {
	/** 
	 * 3D Position of the vertex
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	Pos = null;

	/** 
	 * Normal of the vertex
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	Normal = null;

	/** 
	 * Color of the vertex
	 * @public
	 * @type {Number}
	 */
	Color = 0;

	/** 
	 * Texture coordinate 1 of the vertex
	 * @public
	 * @type {CL3D.Vect2d}
	 */
	TCoords = null;

	/** 
	 * Texture coordinate 2 of the vertex
	 * @public
	 * @type {CL3D.Vect2d}
	 */
	TCoords2 = null;

	constructor(init) {
		if (init) {
			this.Pos = new Vect3d();
			this.Normal = new Vect3d();
			this.Color = 0xff404040; //0xffffffff;
			this.TCoords = new Vect2d();
			this.TCoords2 = new Vect2d();
		}
	}
}

const cloneVertex3D = function (c) {
	let r = new Vertex3D();
	r.Pos = c.Pos.clone();
	r.Color = c.Color;
	r.Normal = c.Normal.clone();
	r.TCoords = c.TCoords.clone();
	r.TCoords2 = c.TCoords2.clone();
	return r;
};

/**
 * @public
 */
const createVertex = function (x, y, z, nx, ny, nz, clr, s, t) {
	let vtx = new Vertex3D(true);
	vtx.Pos.X = x;
	vtx.Pos.Y = y;
	vtx.Pos.Z = z;
	vtx.Normal.X = nx;
	vtx.Normal.Y = ny;
	vtx.Normal.Z = nz;
	vtx.Color = clr;
	vtx.TCoords.X = s;
	vtx.TCoords.Y = t;
	vtx.TCoords2.X = s;
	vtx.TCoords2.Y = t;
	return vtx;
};

/**
 * @public
 */
const createSimpleVertex = function (x, y, z, s, t) {
	let vtx = new Vertex3D(true);
	vtx.Pos.X = x;
	vtx.Pos.Y = y;
	vtx.Pos.Z = z;
	vtx.TCoords.X = s;
	vtx.TCoords.Y = t;
	return vtx;
};

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Class which holds the geometry of an object.
 * A Mesh is nothing more than a collection of some {@link MeshBuffer}s. 
 * A mesh is usually used in a {@link MeshSceneNode} in order to be rendered.
 * @constructor
 * @public
 * @class Class which holds the geometry of an object
 */
class Mesh {
	constructor() {
		this.Box = new Box3d();
		this.MeshBuffers = new Array();
	}
	/**
	 * Adds a {@link MeshBuffer} to a mesh.
	 * @public
	 */
	AddMeshBuffer(m) {
		this.MeshBuffers.push(m);
	}
	/**
	 * Returns an Array of all {@link MeshBuffer}s in this mesh.
	 * @public
	 * @returns {CL3D.MeshBuffer[]} array of {@link MeshBuffer}s
	 */
	GetMeshBuffers() {
		return this.MeshBuffers;
	}
	/**
	 * Returns the amount of polygons in the mesh
	 * @public
	 * @returns {Number} number of polygons in this mesh
	 */
	GetPolyCount() {
		let cnt = 0;

		if (this.MeshBuffers) {
			for (let i = 0; i < this.MeshBuffers.length; ++i)
				if (this.MeshBuffers[i].Indices)
					cnt += this.MeshBuffers[i].Indices.length;
		}

		return cnt / 3;
	}
	/**
	 * Creates a clone of this mesh, a copy
	 * @public
	 */
	createClone() {
		let ret = new Mesh();
		ret.Box = this.Box.clone();

		if (this.MeshBuffers) {
			for (let i = 0; i < this.MeshBuffers.length; ++i)
				if (this.MeshBuffers[i])
					ret.MeshBuffers.push(this.MeshBuffers[i].createClone());
		}

		return ret;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


//const EVT_STANDARD = 0;
//const EVT_2TCOORDS = 1;
//const EVT_TANGENTS = 2;

/**
 * A buffer containing a set of geometry with one material, usually part of a {@link Mesh}. 
 * @class A buffer containing a set of geometry with one material. 
 * @constructor
 * @public
 *
 */
class MeshBuffer {
	/**
	 * Axis aligned bounding box enclosing the geometry in this mesh buffer
	 * @public
	 * @type {CL3D.Box3d}
	 */
	Box = null;

	/**
	 * Material of the geometry, of type {@link Material}.
	 * @public
	 * @type {CL3D.Material}
	 */
	Mat = null;

	/**
	 * Array of Indices into the {@link Vertices} array. Each 3 indices in this array form a triangle to be rendered.
	 * @public
	 * @type {Array}
	 */
	Indices = null;

	/**
	 * Array of Vertices of this mesh buffer. The members of this array must all be of type {@link Vertex3D}.
	 * @public
	 * @type {Array}
	 */
	Vertices = null;

	/**
	 * Object for the renderer to store renderer created arrays for rendering the geometry. 
	 * @public
	 */
	RendererNativeArray = null;

	/**
	 * Storing if the mesh buffers vertices tangents if available. This is only needed for normal mapped geometry, and null otherwise.
	 * @public
	 */
	Tangents = null;

	/**
	 * Storing if the mesh buffers vertices binormals if available. This is only needed for normal mapped geometry, and null otherwise.
	 * @public
	 */
	Binormals = null;

	//MeshBuffer.prototype.VertexType = null;

	constructor() {
		this.Box = new Box3d();
		this.Mat = new Material();
		this.Indices = new Array();
		this.Vertices = new Array();
		this.RendererNativeArray = null;
		this.OnlyPositionsChanged = false;
		this.OnlyUpdateBufferIfPossible = false;
		this.Tangents = null;
		this.Binormals = null;
	}
	/**
	 * Needs to be called when the Vertices or Indices have been changed so that the {@link RendererNativeArray} gets recreated.
	 * @public
	 * @param {Boolean} onlyPositionsChanged set to true if only the positions changed in the mesh buffer. This will trigger a faster update then
	 */
	update(onlyPositionsChanged, onlyUpdateBufferIfPossible) {
		if (onlyPositionsChanged)
			this.OnlyPositionsChanged = true;

		else if (onlyUpdateBufferIfPossible)
			this.OnlyUpdateBufferIfPossible = true;

		else
			this.RendererNativeArray = null;
	}
	/**
	 * Clears the native render array and frees up memory
	 * @public
	 */
	freeNativeArray() {
		let obj = this.RendererNativeArray;
		if (obj && obj.gl) {
			// firefox doesn't garbage collect these arrays (Obviously a bug). So we need to collect them here ourselves.
			if (obj.positionBuffer)
				obj.gl.deleteBuffer(obj.positionBuffer);

			if (obj.positionsArray)
				delete obj.positionsArray;

			if (obj.texcoordsBuffer)
				obj.gl.deleteBuffer(obj.texcoordsBuffer);

			if (obj.texcoordsBuffer2)
				obj.gl.deleteBuffer(obj.texcoordsBuffer2);

			if (obj.normalBuffer)
				obj.gl.deleteBuffer(obj.normalBuffer);

			if (obj.colorBuffer)
				obj.gl.deleteBuffer(obj.colorBuffer);

			if (obj.indexBuffer)
				obj.gl.deleteBuffer(obj.colorBuffer);

			if (this.Tangents)
				obj.gl.deleteBuffer(obj.gl.tangentBuffer);

			if (this.Binormals)
				obj.gl.deleteBuffer(obj.gl.binormalBuffer);
		}

		delete this.RendererNativeArray;
	}
	/**
	 * Recalculates the bounding box
	 * @public
	 */
	recalculateBoundingBox() {
		if (!this.Vertices || this.Vertices.length == 0)
			this.Box.reset(0, 0, 0);

		else {
			let vtx = this.Vertices[0];

			this.Box.MinEdge = vtx.Pos.clone();
			this.Box.MaxEdge = vtx.Pos.clone();

			for (let i = 1; i < this.Vertices.length; ++i) {
				vtx = this.Vertices[i];
				this.Box.addInternalPointByVector(vtx.Pos);
			}
		}
	}
	/**
	 * Clones this Mesh buffer, creating a copy of it
	 * @public
	 */
	createClone() {
		let ret = new MeshBuffer();
		ret.Box = this.Box.clone();
		ret.Mat = this.Mat.clone();

		if (this.Vertices) {
			for (let i = 0; i < this.Vertices.length; ++i) {
				ret.Vertices.push(this.Vertices[i]);
				/*
				let v = new CL3D.Vertex3D();
				let vold = this.Vertices[i];
				v.Pos = vold.Pos.clone();
				v.Normal = vold.Normal.clone();
				v.Color = vold.Color;
				v.TCoords = new CL3D.Vect2d(vold.TCoords.x, vold.TCoords.y);
				v.TCoords2 = new CL3D.Vect2d(vold.TCoords2.x, vold.TCoords2.y);
				ret.Vertices.push(v);*/
			}
		}

		if (this.Indices) {
			for (let i = 0; i < this.Indices.length; ++i)
				ret.Indices.push(this.Indices[i]);
		}

		if (this.Tangents) {
			for (let i = 0; i < this.Tangents.length; ++i)
				ret.Tangents.push(this.Tangents[i].clone());
		}

		if (this.Binormals) {
			for (let i = 0; i < this.Binormals.length; ++i)
				ret.Binormals.push(this.Binormals[i].clone());
		}

		return ret;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


// ------------------------------------------------------------------------------------------------
// MeshCache
// Holds list of already loaded animated meshes
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class MeshCache {
	constructor() {
		this.Meshes = new Array();
	}

	/**
	 * @public
	 */
	getMeshFromName(name) {
		for (var i = 0; i < this.Meshes.length; ++i) {
			var t = this.Meshes[i]; // as AnimatedMesh;
			if (t.Name == name)
				return t;
		}

		return null;
	}

	/**
	 * @public
	 */
	addMesh(t) {
		if (t != null) {
			//if (this.getMeshFromName(t.Name) != null)
			//	Debug.print("ERROR! Cannot add the mesh multiple times: " + t.Name);
			//else
			//	Debug.print("adding mesh: " + t.Name);
			this.Meshes.push(t);
		}
	}
}
// ------------------------------------------------------------------------------------------------
// SkinnedMeshJoint
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class SkinnedMeshJoint {
	constructor() {
		this.Name = ''; //;
		this.LocalMatrix = new Matrix4();
		this.Children = new Array(); // SkinnedMeshJoint
		this.AttachedMeshes = new Array(); // int
		this.PositionKeys = new Array(); // SkinnedMeshPositionKey
		this.ScaleKeys = new Array(); // SkinnedMeshScaleKey
		this.RotationKeys = new Array(); // SkinnedMeshRotationKey
		this.Weights = new Array(); // SkinnedMeshWeight
		this.StaticCollisionBoundingBox = new Box3d(); // box used by CopperCube as collision proxy object, when the object is static and if it is set at all (not always)
		
		// runtime:
		this.GlobalMatrix = new Matrix4();
		this.GlobalAnimatedMatrix = new Matrix4();
		this.LocalAnimatedMatrix = new Matrix4();
		this.Animatedposition = new Vect3d(0,0,0);
		this.Animatedscale = new Vect3d(1,1,1);
		this.Animatedrotation = new Quaternion();
		this.GlobalInversedMatrix = new Matrix4(); //the x format pre-calculates this

		this.GlobalSkinningSpace = false;
		
		this.positionHint = -1;
		this.scaleHint = -1;
		this.rotationHint = -1;
	}
}
// ------------------------------------------------------------------------------------------------
// SkinnedMeshWeight
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class SkinnedMeshWeight {
	constructor() {
		this.buffer_id = 0; //;
		this.vertex_id = 0; //;
		this.strength = 0; //;
		
		// private, to be used during skinning only
		this.StaticPos = new Vect3d();
		this.StaticNormal = new Vect3d();
	}
}	
// ------------------------------------------------------------------------------------------------
// SkinnedMeshScaleKey
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class SkinnedMeshScaleKey {
	constructor() {

		this.frame = 0; //;
		this.scale = new Vect3d();
	}
}
// ------------------------------------------------------------------------------------------------
// SkinnedMeshPositionKey
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class SkinnedMeshPositionKey {	
	constructor() {
		this.frame = 0; //;
		this.position = new Vect3d();
	}
}
// ------------------------------------------------------------------------------------------------
// SkinnedMeshRotationKey
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class SkinnedMeshRotationKey {	
	constructor() {
		this.frame = 0; //;
		this.rotation = new Quaternion();
	}
}
// ------------------------------------------------------------------------------------------------
// NamedAnimationRange
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class NamedAnimationRange {
	Name = '';
	Begin = 0;
	End = 0;
	FPS = 0;

	constructor() {
		this.Name = '';
		this.Begin = 0;
		this.End = 0;
		this.FPS = 0;
	}
}
// ------------------------------------------------------------------------------------------------
// SkinnedMesh
// ------------------------------------------------------------------------------------------------

/**
 * @public
 */
class SkinnedMesh {
	constructor() {
		/*private const EIM_CONSTANT = 0;
		private const EIM_LINEAR = 1;
		private const EIM_COUNT = 2;*/
		this.Name = '';
		this.AnimatedMeshesToLink = new Array();

		this.AnimationFrames = 0.0;
		this.LocalBuffers = new Array(); // MeshBuffer
		this.AllJoints = new Array(); // Joints
		this.RootJoints = new Array(); // Joints
		this.DefaultFPS = 0;

		this.HasAnimation = false;
		this.PreparedForSkinning = false;

		this.LastAnimatedFrame = 0;
		this.LastSkinnedFrame = 0;
		this.BoneControlUsed = 0;
		this.BoundingBox = new Box3d();
		this.InterpolationMode = 1; //EIM_LINEAR;

		this.Vertices_Moved = new Array(); // Vector.< Vector.<Boolean> > = new Vector.< Vector.<Boolean> >;
		this.skinDoesNotMatchJointPositions = true;

		this.NamedAnimationRanges = new Array(); // NamedAnimationRange
	}

	/**
	 * @public
	 */
	AddMeshBuffer(buf) {
		this.LocalBuffers.push(buf);
	}

	/**
	 * @public
	 */
	getFrameCount() {
		return Math.floor(this.AnimationFrames);
	}

	/**
	 * @public
	 */
	getBoundingBox() {
		return this.BoundingBox;
	}

	/**
	 * @public
	 */
	finalize() {
		this.LastAnimatedFrame = -1;
		this.LastSkinnedFrame = -1;

		// populate RootJoints
		var i = 0;
		var j = 0;
		var mbuffer;
		var joint;

		for (var CheckingIdx = 0; CheckingIdx < this.AllJoints.length; ++CheckingIdx) {
			var foundParent = false;

			for (i = 0; i < this.AllJoints.length; ++i) {
				joint = this.AllJoints[i];

				for (var n = 0; n < joint.Children.length; ++n) {
					if (joint.Children[n] === this.AllJoints[CheckingIdx])
						foundParent = true;
				}
			}

			if (!foundParent)
				this.RootJoints.push(this.AllJoints[CheckingIdx]);
		}

		// Set array sizes
		for (i = 0; i < this.LocalBuffers.length; ++i) {
			var buf = new Array(); // :Vector.<Boolean>

			this.Vertices_Moved.push(buf);

			mbuffer = this.LocalBuffers[i]; // as MeshBuffer;
			var vtxcount = mbuffer.Vertices.length;
			for (var v = 0; v < vtxcount; ++v)
				buf.push(false);
		}

		this.checkForAnimation();
		this.CalculateGlobalMatrices(null, null);

		// rigid animation for non animated meshes
		for (i = 0; i < this.AllJoints.length; ++i) {
			joint = this.AllJoints[i];
			for (j = 0; j < joint.AttachedMeshes.length; ++j) {
				mbuffer = this.LocalBuffers[joint.AttachedMeshes[j]]; // as MeshBuffer;
				mbuffer.Transformation = joint.GlobalAnimatedMatrix.clone();
			}
		}

		// calculate bounding box
		if (this.LocalBuffers.length == 0) {
			this.BoundingBox.MinEdge.set(0, 0, 0);
			this.BoundingBox.MaxEdge.set(0, 0, 0);
		}

		else {
			mbuffer = this.LocalBuffers[0]; // as MeshBuffer;
			this.BoundingBox.MinEdge = mbuffer.Box.MinEdge.clone();
			this.BoundingBox.MaxEdge = mbuffer.Box.MaxEdge.clone();

			for (i = 1; i < this.LocalBuffers.length; ++i) {
				mbuffer = this.LocalBuffers[i]; // as MeshBuffer;
				if (mbuffer.Transformation == null) {
					this.BoundingBox.addInternalPointByVector(mbuffer.Box.MinEdge);
					this.BoundingBox.addInternalPointByVector(mbuffer.Box.MaxEdge);
				}

				else {
					var newbox = mbuffer.Box.clone();
					mbuffer.Transformation.transformBoxEx(newbox);

					this.BoundingBox.addInternalPointByVector(newbox.MinEdge);
					this.BoundingBox.addInternalPointByVector(newbox.MaxEdge);
				}
			}
		}

		// debug output infos
		//console.log("HasAnimation:" + this.HasAnimation + " Roots:" + this.RootJoints.length + " Frames:" + this.AnimationFrames);
	}

	/**
	 * @public
	 */
	checkForAnimation() {
		this.HasAnimation = false;

		var i = 0;
		var j = 0;
		var mbuffer;
		var joint;

		for (i = 0; i < this.AllJoints.length; ++i) {
			joint = this.AllJoints[i]; // as SkinnedMeshJoint;
			if (joint.PositionKeys.length ||
				joint.ScaleKeys.length ||
				joint.RotationKeys.length ||
				joint.Weights.length) {
				this.HasAnimation = true;
				break;
			}
		}

		if (this.HasAnimation) {
			// Find the length of the animation
			this.AnimationFrames = 0;

			for (i = 0; i < this.AllJoints.length; ++i) {
				joint = this.AllJoints[i];

				if (joint.PositionKeys.length) {
					var poskey = joint.PositionKeys[joint.PositionKeys.length - 1];
					if (poskey.frame > this.AnimationFrames)
						this.AnimationFrames = poskey.frame;
				}

				if (joint.ScaleKeys.length) {
					var scalekey = joint.ScaleKeys[joint.ScaleKeys.length - 1];
					if (scalekey.frame > this.AnimationFrames)
						this.AnimationFrames = scalekey.frame;
				}

				if (joint.RotationKeys.length) {
					var rotkey = joint.RotationKeys[joint.RotationKeys.length - 1];
					if (rotkey.frame > this.AnimationFrames)
						this.AnimationFrames = rotkey.frame;
				}
			}
		}

		if (this.HasAnimation && !this.PreparedForSkinning) {
			this.PreparedForSkinning = true;

			// For skinning: cache weight values for speed
			for (i = 0; i < this.AllJoints.length; ++i) {
				joint = this.AllJoints[i]; // as SkinnedMeshJoint;
				for (j = 0; j < joint.Weights.length; ++j) {
					var w = joint.Weights[j]; // SkinnedMeshWeight

					var buffer_id = w.buffer_id;
					var vertex_id = w.vertex_id;

					//w.Moved = 
					mbuffer = this.LocalBuffers[buffer_id];
					var vtx = mbuffer.Vertices[vertex_id];
					w.StaticPos = vtx.Pos.clone();
					w.StaticNormal = vtx.Normal.clone();
				}
			}
		}

	}

	/**
	 * @public
	 */
	CalculateGlobalMatrices(joint, parentJoint) {
		if (joint == null && parentJoint != null)
			return;

		if (joint == null) {
			// go trough root joints
			for (var i = 0; i < this.RootJoints.length; ++i)
				this.CalculateGlobalMatrices(this.RootJoints[i], null);
			return;
		}

		if (parentJoint == null)
			joint.GlobalMatrix = joint.LocalMatrix.clone();

		else
			joint.GlobalMatrix = parentJoint.GlobalMatrix.multiply(joint.LocalMatrix);

		joint.LocalAnimatedMatrix = joint.LocalMatrix.clone();
		joint.GlobalAnimatedMatrix = joint.GlobalMatrix.clone();

		if (joint.GlobalInversedMatrix.isIdentity()) // might be pre calculated
		{
			joint.GlobalInversedMatrix = joint.GlobalMatrix.clone();
			joint.GlobalInversedMatrix.makeInverse(); // slow
		}

		for (var j = 0; j < joint.Children.length; ++j)
			this.CalculateGlobalMatrices(joint.Children[j], joint);
	}

	/**
	 * returns if this mesh isn't animated but actually static
	 * @public
	 */
	isStatic() {
		return !this.HasAnimation;
	}

	/**
	 * Animates this mesh's joints based on frame input
	 * blend: {0-old position, 1-New position}
	 * returns if animation has changed
	 * @public
	 */
	animateMesh(frame, blend) {
		if (!this.HasAnimation ||
			(equals(this.LastAnimatedFrame, frame) && (blend == 1.0))) {
			return false;
		}

		this.LastAnimatedFrame = frame;

		if (blend < 0.0)
			return false; //No need to animate

		if (equals(blend, 1.0)) {
			// no animation blending
			for (var i = 0; i < this.AllJoints.length; ++i) {
				var joint = this.AllJoints[i];

				var position = joint.Animatedposition.clone();
				var scale = joint.Animatedscale.clone();
				var rotation = joint.Animatedrotation.clone(); // Quaternion

				this.getFrameData(frame, joint,
					position, joint.positionHint,
					scale, joint.scaleHint,
					rotation, joint.rotationHint);

				joint.Animatedposition = position.clone();
				joint.Animatedscale = scale.clone();
				joint.Animatedrotation = rotation.clone();
			}
		}

		else {
			// with animation blending
			for (var i = 0; i < this.AllJoints.length; ++i) {
				var joint = this.AllJoints[i];

				var oldposition = joint.Animatedposition.clone();
				var oldscale = joint.Animatedscale.clone();
				var oldrotation = joint.Animatedrotation.clone(); // Quaternion

				var position = oldposition.clone();
				var scale = oldscale.clone();
				var rotation = oldrotation.clone(); // Quaternion

				this.getFrameData(frame, joint,
					position, joint.positionHint,
					scale, joint.scaleHint,
					rotation, joint.rotationHint);

				joint.Animatedposition = oldposition.getInterpolated(position, blend);
				joint.Animatedscale = oldscale.getInterpolated(scale, blend);
				joint.Animatedrotation.slerp(oldrotation, rotation, blend);
			}
		}

		this.buildAll_LocalAnimatedMatrices();
		this.skinDoesNotMatchJointPositions = true;

		return true;
	}

	/**
	 * @public
	 */
	getFrameData(frame, joint,
		position, positionHint,
		scale, scaleHint,
		rotation, rotationHint) {
		var foundPositionIndex = -1;
		var foundScaleIndex = -1;
		var foundRotationIndex = -1;

		var PositionKeys = joint.PositionKeys;
		var ScaleKeys = joint.ScaleKeys;
		var RotationKeys = joint.RotationKeys;

		var poskey;
		var scalekey; //:SkinnedMeshScaleKey;
		var rotkey; //:SkinnedMeshRotationKey;

		var i;
		var fd1;
		var fd2;

		if (PositionKeys.length) {
			foundPositionIndex = -1;

			// test the Hints...
			/*if (positionHint>=0 && positionHint < PositionKeys.length)
			{
				//check this hint
				if (positionHint>0 &&
					PositionKeys[positionHint].frame >= frame &&
					PositionKeys[positionHint-1].frame < frame )
				{
					foundPositionIndex=positionHint;
				}
				else
				if (positionHint+1 < (int)PositionKeys.length)
				{
					//check the next index
					if ( PositionKeys[positionHint+1].frame>=frame &&
						 PositionKeys[positionHint+0].frame<frame)
					{
						positionHint++;
						foundPositionIndex=positionHint;
					}
				}
			}*/
			//The hint test failed, do a full scan...
			if (foundPositionIndex == -1) {
				for (i = 0; i < PositionKeys.length; ++i) {
					poskey = PositionKeys[i];
					if (poskey.frame >= frame) //Keys should to be sorted by frame
					{
						foundPositionIndex = i;
						break;
					}
				}
			}

			//Do interpolation...
			if (foundPositionIndex != -1) {
				if (this.InterpolationMode == 0 /*EIM_CONSTANT*/ || foundPositionIndex == 0) {
					poskey = PositionKeys[foundPositionIndex];
					position = poskey.position.clone();
				}
				else if (this.InterpolationMode == 1 /*EIM_LINEAR*/) {
					poskey = PositionKeys[foundPositionIndex];
					var poskeyb = PositionKeys[foundPositionIndex - 1];

					fd1 = frame - poskey.frame;
					fd2 = poskeyb.frame - frame;

					//position = ((poskeyb.position-poskey.position)/(fd1+fd2))*fd1 + poskey.position;
					position.setTo(
						poskeyb.position.
							substract(poskey.position).
							multiplyThisWithScalReturnMe(1.0 / (fd1 + fd2)).
							multiplyThisWithScalReturnMe(fd1).
							addToThisReturnMe(poskey.position));
				}

				//if (Config.isDebugCompilation)
				//{
				//	Debug.print(
				//		"joint: " + joint.Name + 
				//		" position: " + position + 
				//		", key:%d" + foundPositionIndex +
				//		", frame:" + frame + 
				//		", keyposition: " + PositionKeys[foundPositionIndex-1].position);
				//}
			}
		}

		//------------------------------------------------------------
		if (ScaleKeys.length) {
			foundScaleIndex = -1;

			//Test the Hints...
			/*if (scaleHint>=0 && (u32)scaleHint < ScaleKeys.length)
			{
				//check this hint
				if (scaleHint>0 && ScaleKeys[scaleHint].frame>=frame && ScaleKeys[scaleHint-1].frame<frame )
					foundScaleIndex=scaleHint;
				else if (scaleHint+1 < (s32)ScaleKeys.length)
				{
					//check the next index
					if ( ScaleKeys[scaleHint+1].frame>=frame &&
							ScaleKeys[scaleHint+0].frame<frame)
					{
						scaleHint++;
						foundScaleIndex=scaleHint;
					}
				}
			}*/
			//The hint test failed, do a full scan...
			if (foundScaleIndex == -1) {
				for (i = 0; i < ScaleKeys.length; ++i) {
					scalekey = ScaleKeys[i];
					if (scalekey.frame >= frame) //Keys should to be sorted by frame
					{
						foundScaleIndex = i;
						break;
					}
				}
			}

			//Do interpolation...
			if (foundScaleIndex != -1) {
				if (this.InterpolationMode == 0 /*EIM_CONSTANT*/ || foundScaleIndex == 0) {
					scalekey = ScaleKeys[foundScaleIndex];
					scale = scalekey.scale.clone();
				}

				else if (this.InterpolationMode == 1 /*EIM_LINEAR*/) {
					scalekey = ScaleKeys[foundScaleIndex];
					var scalekeyb = ScaleKeys[foundScaleIndex - 1]; // SkinnedMeshScaleKey

					fd1 = frame - scalekey.frame;
					fd2 = scalekeyb.frame - frame;

					//scale = ((scalekeyb.scale-scalekey.scale)/(fd1+fd2))*fd1 + scalekey.scale;
					scale.setTo(
						scalekeyb.scale.
							substract(scalekey.scale).
							multiplyThisWithScalReturnMe(1.0 / (fd1 + fd2)).
							multiplyThisWithScalReturnMe(fd1).
							addToThisReturnMe(scalekey.scale));
				}
			}
		}

		//-------------------------------------------------------------
		if (RotationKeys.length) {
			foundRotationIndex = -1;

			//Test the Hints...
			/*if (rotationHint>=0 && (u32)rotationHint < RotationKeys.length)
			{
				//check this hint
				if (rotationHint>0 && RotationKeys[rotationHint].frame>=frame && RotationKeys[rotationHint-1].frame<frame )
					foundRotationIndex=rotationHint;
				else if (rotationHint+1 < (s32)RotationKeys.length)
				{
					//check the next index
					if ( RotationKeys[rotationHint+1].frame>=frame &&
							RotationKeys[rotationHint+0].frame<frame)
					{
						rotationHint++;
						foundRotationIndex=rotationHint;
					}
				}
			}*/
			//The hint test failed, do a full scan...
			if (foundRotationIndex == -1) {
				for (i = 0; i < RotationKeys.length; ++i) {
					rotkey = RotationKeys[i];
					if (rotkey.frame >= frame) //Keys should be sorted by frame
					{
						foundRotationIndex = i;
						break;
					}
				}
			}

			//Do interpolation...
			if (foundRotationIndex != -1) {
				if (this.InterpolationMode == 0 /*EIM_CONSTANT*/ || foundRotationIndex == 0) {
					rotkey = RotationKeys[foundRotationIndex];
					rotation = rotkey.rotation.clone();
				}
				else if (this.InterpolationMode == 1 /*EIM_LINEAR*/) {
					rotkey = RotationKeys[foundRotationIndex];
					var rotkeyb = RotationKeys[foundRotationIndex - 1]; // SkinnedMeshRotationKey

					fd1 = frame - rotkey.frame;
					fd2 = rotkeyb.frame - frame;

					rotation.slerp(rotkey.rotation, rotkeyb.rotation, fd1 / (fd1 + fd2));
				}
			}
		}
	}

	/**
	 * @public
	 */
	buildAll_LocalAnimatedMatrices() {
		for (var i = 0; i < this.AllJoints.length; ++i) {
			var joint = this.AllJoints[i];

			if (joint.PositionKeys.length ||
				joint.ScaleKeys.length ||
				joint.RotationKeys.length) {
				if (!joint.Animatedrotation)
					joint.Animatedrotation = new Quaternion();
				if (!joint.Animatedposition)
					joint.Animatedposition = new Vect3d();

				/*var translateMatrix = new CL3D.Matrix4(true);
				translateMatrix.setTranslation(joint.Animatedposition);
				joint.LocalAnimatedMatrix = joint.LocalMatrix.multiply(joint.Animatedrotation.getMatrix());
				joint.LocalAnimatedMatrix = joint.LocalAnimatedMatrix.multiply(translateMatrix);	*/
				joint.LocalAnimatedMatrix = joint.Animatedrotation.getMatrix();

				// --- joint->LocalAnimatedMatrix *= joint->Animatedrotation.getMatrix() ---
				var mptr = joint.LocalAnimatedMatrix;
				var Pos = joint.Animatedposition;

				mptr.m00 += Pos.X * mptr.m03;
				mptr.m01 += Pos.Y * mptr.m03;
				mptr.m02 += Pos.Z * mptr.m03;
				mptr.m04 += Pos.X * mptr.m07;
				mptr.m05 += Pos.Y * mptr.m07;
				mptr.m06 += Pos.Z * mptr.m07;
				mptr.m08 += Pos.X * mptr.m11;
				mptr.m09 += Pos.Y * mptr.m11;
				mptr.m10 += Pos.Z * mptr.m11;
				mptr.m12 += Pos.X * mptr.m15;
				mptr.m13 += Pos.Y * mptr.m15;
				mptr.m14 += Pos.Z * mptr.m15;

				mptr.bIsIdentity = false;

				// -----------------------------------
				joint.GlobalSkinningSpace = false;

				if (joint.ScaleKeys.length && joint.Animatedscale &&
					!joint.Animatedscale.equalsByNumbers(1, 1, 1)) {

					//var scalematrix = new CL3D.Matrix4(true);
					//scalematrix.setScale(joint.Animatedscale);
					//joint.LocalAnimatedMatrix = joint.LocalAnimatedMatrix.multiply(scalematrix);
					// -------- joint->LocalAnimatedMatrix *= scaleMatrix -----------------
					Pos = joint.Animatedscale;
					mptr.m00 *= Pos.X;
					mptr.m01 *= Pos.X;
					mptr.m02 *= Pos.X;
					mptr.m03 *= Pos.X;
					mptr.m04 *= Pos.Y;
					mptr.m05 *= Pos.Y;
					mptr.m06 *= Pos.Y;
					mptr.m07 *= Pos.Y;
					mptr.m08 *= Pos.Z;
					mptr.m09 *= Pos.Z;
					mptr.m10 *= Pos.Z;
					mptr.m11 *= Pos.Z;
					// -----------------------------------
				}
			}

			else {
				joint.LocalAnimatedMatrix = joint.LocalMatrix.clone(); // no copy necessary, reference is ok
			}
		}
	}

	/**
	 * @public
	 */
	updateBoundingBox() {
		this.BoundingBox.MinEdge.set(0, 0, 0);
		this.BoundingBox.MaxEdge.set(0, 0, 0);

		if (this.LocalBuffers.length) {
			var mbuffer = this.LocalBuffers[0]; // as MeshBuffer;
			mbuffer.recalculateBoundingBox();
			this.BoundingBox.MinEdge = mbuffer.Box.MinEdge.clone();
			this.BoundingBox.MaxEdge = mbuffer.Box.MaxEdge.clone();

			for (var i = 1; i < this.LocalBuffers.length; ++i) {
				mbuffer = this.LocalBuffers[i]; // as MeshBuffer;

				mbuffer.recalculateBoundingBox();

				if (mbuffer.Transformation == null) {
					this.BoundingBox.addInternalPointByVector(mbuffer.Box.MinEdge);
					this.BoundingBox.addInternalPointByVector(mbuffer.Box.MaxEdge);
				}

				else {
					var newbox = mbuffer.Box.clone();
					mbuffer.Transformation.transformBoxEx(newbox);

					this.BoundingBox.addInternalPointByVector(newbox.MinEdge);
					this.BoundingBox.addInternalPointByVector(newbox.MaxEdge);
				}
			}
		}
	}

	/**
	 * @public
	 */
	buildAll_GlobalAnimatedMatrices(joint, parentJoint) {
		if (joint == null) {
			for (var i = 0; i < this.RootJoints.length; ++i) {
				var root = this.RootJoints[i];
				this.buildAll_GlobalAnimatedMatrices(root, null);
			}
			return;
		}

		else {
			// Find global matrix
			if (parentJoint == null || joint.GlobalSkinningSpace)
				joint.GlobalAnimatedMatrix = joint.LocalAnimatedMatrix.clone();

			else
				joint.GlobalAnimatedMatrix = parentJoint.GlobalAnimatedMatrix.multiply(joint.LocalAnimatedMatrix);

		}

		for (var j = 0; j < joint.Children.length; ++j)
			this.buildAll_GlobalAnimatedMatrices(joint.Children[j], joint);
	}

	/**
	 * @public
	 */
	skinMesh(animateNormals) {
		if (!this.HasAnimation)
			return;

		this.skinDoesNotMatchJointPositions = false;
		this.buildAll_GlobalAnimatedMatrices(null, null);

		var i = 0;
		var j = 0;
		var mbuffer;

		// rigid animation
		for (i = 0; i < this.AllJoints.length; ++i) {
			var joint = this.AllJoints[i]; // as SkinnedMeshJoint;
			for (j = 0; j < joint.AttachedMeshes.length; ++j) {
				mbuffer = this.LocalBuffers[joint.AttachedMeshes[j]];
				mbuffer.Transformation = joint.GlobalAnimatedMatrix.clone();
			}
		}

		// clear skinning helper array
		for (i = 0; i < this.LocalBuffers.length; ++i) {
			//var buf:Vector.<Boolean> = Vertices_Moved[i];
			var buf = this.Vertices_Moved[i];
			for (j = 0; j < buf.length; ++j)
				buf[j] = false;
		}

		// start skinning with root joints
		for (i = 0; i < this.RootJoints.length; ++i) {
			var root = this.RootJoints[i];
			this.skinJoint(root, null, animateNormals);
		}
	}

	/**
	 * @public
	 */
	skinJoint(joint, parentJoint, animateNormals) {
		if (joint.Weights.length) {
			//Find this joints pull on vertices...
			var jointVertexPull = joint.GlobalAnimatedMatrix.multiply(joint.GlobalInversedMatrix);

			var thisVertexMove = new Vect3d();
			var thisNormalMove = new Vect3d();

			var buffersUsed = this.LocalBuffers;
			var mbuffer;
			var vtx;

			//Skin Vertices Positions and Normals...
			for (var i = 0; i < joint.Weights.length; ++i) {
				var weight = joint.Weights[i]; // SkinnedMeshWeight


				// Pull this vertex...
				jointVertexPull.transformVect2(thisVertexMove, weight.StaticPos);

				if (animateNormals)
					jointVertexPull.rotateVect2(thisNormalMove, weight.StaticNormal);

				mbuffer = buffersUsed[weight.buffer_id];
				vtx = mbuffer.Vertices[weight.vertex_id];

				if (!this.Vertices_Moved[weight.buffer_id][weight.vertex_id]) {
					this.Vertices_Moved[weight.buffer_id][weight.vertex_id] = true;

					vtx.Pos = thisVertexMove.multiplyWithScal(weight.strength);

					if (animateNormals)
						vtx.Normal = thisNormalMove.multiplyWithScal(weight.strength);
				}

				else {
					vtx.Pos.addToThis(thisVertexMove.multiplyWithScal(weight.strength));

					if (animateNormals)
						vtx.Normal.addToThis(thisNormalMove.multiplyWithScal(weight.strength));
				}
			}
		}

		// skin childen
		for (var j = 0; j < joint.Children.length; ++j)
			this.skinJoint(joint.Children[j], joint, animateNormals);
	}

	/**
	 * @public
	 */
	getNamedAnimationRangeByName(thename) {
		if (!thename)
			return null;

		var count = this.NamedAnimationRanges.length;
		var lwrname = thename.toLowerCase();

		for (var j = 0; j < count; ++j) {
			var n = this.NamedAnimationRanges[j];
			if (n.Name && n.Name.toLowerCase() == lwrname)
				return n;
		}

		return null;
	}

	/**
	 * @public
	 */
	addNamedAnimationRange(n) {
		this.NamedAnimationRanges.push(n);
	}

	/**
	 * @public
	 * Used to see by the loader if this model already has been loaded before
	 */
	containsData(buf) {
		return this.AllJoints.length > 0 ||
			this.LocalBuffers.length > 0;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Structure describing a material with a couple of textures and several settings.
 * Simply create an instance of the material class and set the {@link Type} value to
 * one of the known material types or an own material type, created for example with 
 * {@link CopperLicht.createMaterialType}.
 * @class Material description, usually for a {@link MeshBuffer}.
 * @constructor
 * @public
 */
class Material {
	/**
	 * Type of the material. Default value is {@link Material.EMT_SOLID}. You
	 * can set any value of the predefined materials to this type, or even create
	 * your own material types using {@link Renderer.createMaterialType}.
	 * @public
	 * @type Number
	 */
	Type = 0;

	/**
	 * Texture 1 of this material of type {@link Texture}.
	 * @public
	 * @type {CL3D.Texture}.
	 */
	Tex1 = null;

	/**
	 * Texture 2 of this material of type {@link Texture}.
	 * @public
	 * @type {CL3D.Texture}.
	 */
	Tex2 = null;

	/**
	 * Specifies if the material is allowed to write into the ZBuffer
	 * @public
	 * @type Boolean
	 */
	ZWriteEnabled = true;

	/**
	 * Specifies if the material is allowed to read from the ZBuffer (DepthTest)
	 * @public
	 * @type Boolean
	 */
	ZReadEnabled = true;

	/**
	 * Specifies if the texture wrapping is enabled or not for Texture 1.
	 * In OpenGL terms, this simply sets TEXTURE_WRAP to REPEAT or CLAMP_TO_EDGE
	 * @public
	 * @type Boolean
	 */
	ClampTexture1 = false;

	/**
	 * Specifies if backface culling is enabled for the material. Default is true.
	 * @public
	 * @type Boolean
	 */
	BackfaceCulling = true;

	/**
	 * Specifies if lighting is enabled for the material. Default is false.
	 * @public
	 * @type Boolean
	 */
	Lighting = false;


	/** 
	 * Solid material, constant for using in {@link Material.Type}, specifying the type of the material.
	 * Simply a single texture shown as diffuse material.
	 * @static 
	 * @public
	 */
	static EMT_SOLID = 0;

	//Material.EMT_SOLID_2_LAYER						= 1;

	/** 
	 * Lightmapped material, constant for using in {@link Material.Type}, specifying the type of the material.
	 * There should be 2 textures: The first texture layer is a diffuse map, the second is a light map. This is 
	 * the standard lightmap technique: The lightmap is multiplied onto the first texture.
	 * @static 
	 * @public
	 */
	static EMT_LIGHTMAP = 2;

	//Material.EMT_LIGHTMAP_ADD						= 3;
	//Material.EMT_LIGHTMAP_M2						= 4;
	//Material.EMT_LIGHTMAP_M4						= 5;

	//Material.EMT_LIGHTMAP_LIGHTING					= 6;
	//Material.EMT_LIGHTMAP_LIGHTING_M2				= 7;
	//Material.EMT_LIGHTMAP_LIGHTING_M4				= 8;
	//Material.EMT_DETAIL_MAP							= 9;
	//Material.EMT_SPHERE_MAP							= 10;
	//Material.EMT_REFLECTION_2_LAYER					= 11;


	/** 
	 * Reflective material for creating metallic looking survaces, constant for using in {@link Material.Type}, specifying the type of the material.
	 * There should be 2 textures: The first texture layer is a diffuse map, the second is the refleced surface.
	 * @static 
	 * @public
	 */
	static EMT_REFLECTION_2_LAYER = 11;

	/** 
	 * Transparent additive material, constant for using in {@link Material.Type}, specifying the type of the material.
	 * Only the first texture is used. The new color is calculated by simply adding the source color and the destination color.
	 * This means if for example a billboard using a texture with black background and a red circle on it is drawn with this material,
	 * the result is that only the red circle will be drawn a little bit transparent, and everything which was black is 100% transparent and not visible.
	 * @static 
	 * @public
	 */
	static EMT_TRANSPARENT_ADD_COLOR = 12;

	/** 
	 * Transparent material based on the texture alpha channel, constant for using in {@link Material.Type}, specifying the type of the material.
	 * The final color is blended together from the destination color and the texture color, using the alpha channel value as blend factor. Only first texture is used
	 * @static 
	 * @public
	 */
	static EMT_TRANSPARENT_ALPHA_CHANNEL = 13;


	/** 
	 * Transparent reflective material for creating metallic looking survaces, constant for using in {@link Material.Type}, specifying the type of the material.
	 * There should be 2 textures: The first texture layer is a diffuse map including an alpha channel for transparency, the second is the refleced surface.
	 * @static 
	 * @public
	 */
	static EMT_TRANSPARENT_REFLECTION_2_LAYER = 16;

	/** 
	 * Normal mapped material. Expects tangents and binormals to be existing in the mesh buffer, they are usually precalculated by the CopperCube editor.
	 * There should be 2 textures: The first texture layer is a diffuse map, the second is the normal map.
	 * @static 
	 * @public
	 */
	static EMT_NORMAL_MAP_SOLID = 17;

	/** 
	 * Transparent material based on the texture alpha channel, constant for using in {@link Material.Type}, specifying the type of the material.
	 * The final color is blended together from the destination color and the texture color, using the alpha channel value as blend factor. Only first texture is used.
	 * If the alpha value is < 0.5, the pixel is discarded.
	 * @static 
	 * @public
	 */
	static EMT_TRANSPARENT_ALPHA_CHANNEL_REF = 14;

	//Material.EMT_TRANSPARENT_VERTEX_ALPHA			= 15;
	//Material.EMT_NORMAL_MAP_SOLID					= 17;
	//Material.EMT_NORMAL_MAP_TRANSPARENT_ADD_COLOR	= 18;
	//Material.EMT_NORMAL_MAP_TRANSPARENT_VERTEX_ALPHA	= 19;
	//Material.EMT_PARALLAX_MAP_SOLID					= 20;
	//Material.EMT_PARALLAX_MAP_TRANSPARENT_ADD_COLOR	= 21;
	//Material.EMT_PARALLAX_MAP_TRANSPARENT_VERTEX_ALPHA= 22;
	//Material.EMT_ONETEXTURE_BLEND					= 23;

	/** 
	 * Solid material, blends based on vertex alpha between the two set textures. Used for terrain rendering.
	 * @static 
	 * @public
	 */
	static EMT_SOLID_VERTEX_ALPHA_TWO_TEXTURE_BLEND = 25;

	/** 
	 * Like EMT_TRANSPARENT_ALPHA_CHANNEL_REF but moves by the wind, like for  moving grass or leaves.
	 * @static 
	 * @public
	 */
	static EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS = 26;

	constructor() {
		this.Type = 0;

		this.Tex1 = null; //:Texture;
		this.Tex2 = null; //:Texture;
		this.ZWriteEnabled = true;

		this.ClampTexture1 = false; //:Boolean;
		this.Lighting = false; //:Boolean;
		this.BackfaceCulling = true;
	}
	setFrom(mat) {
		if (!mat)
			return;

		this.Type = mat.Type;
		this.ZWriteEnabled = mat.ZWriteEnabled;
		this.Tex1 = mat.Tex1;
		this.Tex2 = mat.Tex2;
		this.ClampTexture1 = mat.ClampTexture1;
		this.Lighting = mat.Lighting;
		this.BackfaceCulling = mat.BackfaceCulling;
	}
	clone() {
		let mat = new Material();

		mat.Type = this.Type;
		mat.ZReadEnabled = this.ZReadEnabled;
		mat.ZWriteEnabled = this.ZWriteEnabled;
		mat.Tex1 = this.Tex1;
		mat.Tex2 = this.Tex2;
		mat.ClampTexture1 = this.ClampTexture1;
		mat.Lighting = this.Lighting;
		mat.BackfaceCulling = this.BackfaceCulling;

		return mat;
	}
	/**
	 * Returns true if the described material does not use the depth map by default.
	 * @public
	 */
	doesNotUseDepthMap() {
		return this.Type == Material.EMT_TRANSPARENT_ADD_COLOR ||
			this.Type == Material.EMT_TRANSPARENT_ALPHA_CHANNEL ||
			this.Type == Material.EMT_TRANSPARENT_REFLECTION_2_LAYER;
	}
	/**
	 * Returns true if the described material is transparent, used by SceneNodes to check if they
	 * need to register for rendering in transparent or solid mode.
	 * @public
	 */
	isTransparent() {
		return this.Type == Material.EMT_TRANSPARENT_ADD_COLOR ||
			this.Type == Material.EMT_TRANSPARENT_ALPHA_CHANNEL ||
			this.Type == Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF ||
			this.Type == Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS ||
			this.Type == Material.EMT_TRANSPARENT_REFLECTION_2_LAYER;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Class representing a texture which can be loaded from an URL.
 * @constructor
 * @class Class representing a texture which can be loaded from an URL.
 * @public
 */
class Texture {
	constructor() {
		this.Name = '';
		this.Loaded = false;

		this.Image = null;
		this.Texture = null; // webgl texture object
		this.RTTFrameBuffer = null; // when used as RTT


		this.CachedWidth = null; // used if the texture was created from a 2d canvas
		this.CachedHeight = null; // used if the texture was created from a 2d canvas

		this.OriginalWidth = null; // original with of the texture, before scaling up to power of two
		this.OriginalHeight = null; // original with of the texture, before scaling up to power of two
	}
	/**
	 * returns the image of the texture
	 * @public
	 * @returns {Image}
	 */
	getImage() {
		return this.Image;
	}
	/**
	 * returns the webGL texture object of the texture, only available if the texture has been loaded already.
	 * @public
	 * @returns {CL3D.Texture}
	 */
	getWebGLTexture() {
		return this.Texture;
	}
	/**
	 * returns the width of this texture, or null if not loaded yet
	 * @public
	 * @returns {Number}
	 */
	getWidth() {
		if (this.Image)
			return this.Image.width;

		if (this.CachedWidth != null)
			return this.CachedWidth;

		return 0;
	}
	/**
	 * returns the height of this texture, or null if not loaded yet
	 * @public
	 * @returns {Number}
	 */
	getHeight() {
		if (this.Image)
			return this.Image.height;

		if (this.CachedHeight != null)
			return this.CachedHeight;

		return 0;
	}
	/**
	 * returns the URL of this texture
	 * @public
	 * @returns {String}
	 */
	getURL() {
		return this.Name;
	}
	/**
	 * returns if the texture has been sucessfully loaded
	 * @public
	 * @returns {Boolean}
	 */
	isLoaded() {
		return this.Loaded;
	}
}

let loadImageImpl = () => { };

if (typeof globalThis.Image == "undefined") {
    await import('canvas').then(async (module) => {
        loadImageImpl = (src, options) => {
            return module.default.loadImage(src, options);
        };
    });
}
else {
    loadImageImpl = (src, options) => {
        return new Promise(function (resolve, reject) {
            const image = Object.assign(document.createElement('img'), options);

            function cleanup() {
                image.onload = null;
                image.onerror = null;
            }

            image.onload = () => { cleanup(); resolve(image); };
            image.onerror = () => { cleanup(); reject(new Error('Failed to load the image "' + src + '"')); };

            image.src = src;
        })
    };
}

/**
 * 
 * @param {string|Buffer} src 
 * @param {any} options 
 * @returns {Promise<Image>}
 */
const loadImage = (src, options) => {
    return loadImageImpl(src, options);
};

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Texture manager containing all {@link Texture}s and able to load new ones, accessible via {@link CopperLicht.getTextureManager}().
 * @constructor
 * @class texture manager containing all {@link Texture}s and able to load new ones, accessible via {@link CopperLicht.getTextureManager}().
 * @public
 */
class TextureManager {
	constructor() {
		this.Textures = new Array(); // texure
		this.TheRenderer = null;
		this.PathRoot = '';
	}
	/**
	 * Returns a new CL3D.Texture object from an URL and starts loading it.
	 * If the texture has been already loaded, it doesn't load it a second time but returns the
	 * reference to the old texture.
	 * @public
	 * @param url {String} Url of the image. Can be relative like 'path/to/image/mytexture.jpg' or absolute like 'http://www.ambiera.com/images/ambiera_logo_big.png'
	 * @param createIfNotFound {Boolean} set to true to create a new CL3D.Texture object and start loading it if an existing once wasn't found with this url.
	 * @returns {CL3D.Texture} texture object
	 *
	 */
	getTexture(url, createIfNotFound) {
		if (url == null || url == "")
			return null;

		let t = this.getTextureFromName(url);

		if (t != null)
			return t;

		if (createIfNotFound) {
			t = new Texture();
			t.Name = url;
			this.addTexture(t);

			// start loading texture
			let me = this;
			loadImage(t.Name).then((image) => {
				t.Image = image;
				me.onTextureLoaded(t);
			});
			// t.Image = new Image();
			// t.Image.onload = function () { me.onTextureLoaded(t); };
			// t.Image.src = t.Name;

			//console.log("starting loading texture: " + t.Image.src);
			return t;
		}

		return null;
	}
	/**
	 * Returns the amount of textures
	 * @public
	 */
	getTextureCount() {
		return this.Textures.length;
	}
	/**
	 * @public
	 */
	onTextureLoaded(t) {
		//console.log("http loaded texture: " + t.Name);
		let r = this.TheRenderer;
		if (r == null)
			return;
		r.finalizeLoadedImageTexture(t);
		t.Loaded = true;
	}
	/**
	 * Returns the amount of textures which still need to be loaded
	 * @public
	 */
	getCountOfTexturesToLoad() {
		let ret = 0;

		for (let i = 0; i < this.Textures.length; ++i) {
			let t = this.Textures[i];
			if (t.Loaded == false)
				++ret;
		}

		return ret;
	}
	/**
	 * @public
	 */
	getTextureFromName(name) {
		for (let i = 0; i < this.Textures.length; ++i) {
			let t = this.Textures[i];
			if (t.Name == name)
				return t;
		}

		return null;
	}
	/**
	 * @public
	 */
	addTexture(t) {
		if (t != null) {
			if (this.getTextureFromName(t.Name) != null)
				console.log("ERROR! Cannot add the texture multiple times: " + t.Name);
			//else
			//	console.log("adding texture: " + t.Name);
			this.Textures.push(t);
		}
	}
	/**
	 * use renderer.deleteTexture instead, this is just for removing it from the list of registered textures
	 * @public
	 */
	removeTexture(tex) {
		for (let i = 0; i < this.Textures.length; ++i) {
			let t = this.Textures[i];
			if (t == tex) {
				this.Textures.splice(i, 1);
				return true;
			}
		}

		return false;
	}
}
const gTextureManager = new TextureManager();

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * @constructor
 * @public
 */
class SoundManager {
	constructor() {
		this.Sounds = new Array();
		this.PlayingSounds = new Array();
		this.GlobalVolume = 1.0;
	}

	/**
	 * @public
	 */
	getSoundFromName(name) {
		for (var i = 0; i < this.Sounds.length; ++i) {
			var t = this.Sounds[i];
			if (t.Name == name)
				return t;
		}

		return null;
	}

	/**
	 * @public
	 */
	addSound(t) {
		if (t != null) {
			if (this.getSoundFromName(t.Name) != null && gCCDebugInfoEnabled)
				console.log("ERROR! Cannot add the sound multiple times: " + t.Name);

			this.Sounds.push(t);
		}
	}

	/**
	 * @public
	 * name is the url
	 */
	getSoundFromSoundName(name, createIfNotFound) {
		if (name == null || name == "")
			return null;

		var t = this.getSoundFromName(name);

		if (t != null)
			return t;

		if (createIfNotFound) {
			t = new SoundSource(name);
			this.addSound(t);
			return t;
		}

		return null;
	}
	
	/**
	 * @public
	 * s can either be the URL or the SoundSource object
	 */
	play2D(s, looped, volume) {
		if (s == null)
			return null;

		// s can be the url or the sound source	
		var soundSrc = null;
		if (typeof (s) == 'string')
			soundSrc = this.getSoundFromSoundName(s, true);

		else
			soundSrc = s;

		if (soundSrc == null ||
			soundSrc.audioElem == null)
			return null;

		// if there is already an audio source playing with this file, stop that one.
		// a limitation by the HTML 5 audio api
		this.clearFinishedPlayingSounds();

		for (var i = 0; i < this.PlayingSounds.length;)
			if (this.PlayingSounds[i].src === soundSrc) {
				this.PlayingSounds[i].src.audioElem.pause();
				this.PlayingSounds.splice(i, 1);
			}

			else
				++i;

		// the HTML 5 audio tag doesn't support volume or other fance stuff unfortunately.
		try {
			soundSrc.audioElem.currentTime = 0;
		}
		catch (err) { }

		// play
		if (typeof volume === 'undefined')
			volume = 1.0;

		soundSrc.audioElem.volume = volume * this.GlobalVolume;
		soundSrc.audioElem.play();

		// create playing sound
		var pl = new PlayingSound(soundSrc);
		pl.ownVolume = volume;
		this.PlayingSounds.push(pl);

		// a.audioElem.loop = looped; // this is only supported in chrome, firefox 
		// happily this, so we do this on our own with the next lines of code
		if (soundSrc.lastListener)
			soundSrc.audioElem.removeEventListener('ended', soundSrc.lastListener, false);
		soundSrc.audioElem.lastListener = null;

		if (looped) {
			pl.looping = true;

			var endFunction = () => {
				if (!pl.hasStopped) {
					try { this.currentTime = 0; }
					catch (err) { }
					this.play2D();
					//CL3D.Debug.print('foobar');
				}
			};

			soundSrc.audioElem.addEventListener('ended', endFunction, false);
			soundSrc.audioElem.lastListener = endFunction;
		}

		// return playing sound
		return pl;
	}

	/**
	 * @public
	 */
	stop(playingSnd) {
		if (!playingSnd)
			return;

		playingSnd.src.audioElem.pause();
		playingSnd.hasStopped = true;
		this.clearFinishedPlayingSounds();
	}

	/**
	 * @public
	 */
	getGlobalVolume() {
		return this.GlobalVolume;
	}

	/**
	 * @public
	 */
	setGlobalVolume(v) {
		this.GlobalVolume = v;
		if (this.GlobalVolume < 0.0) this.GlobalVolume = 0.0;
		if (this.GlobalVolume > 1.0) this.GlobalVolume = 1.0;

		try {
			// update volume for all playing sounds
			for (var i = 0; i < this.PlayingSounds.length; ++i) {
				var pl = this.PlayingSounds[i];
				pl.src.audioElem.volume = pl.ownVolume * this.GlobalVolume;
			}
		}
		catch (err) { }
	}

	/**
	 * @public
	 */
	setVolume(playingSnd, v) {
		if (!playingSnd)
			return;

		try {
			playingSnd.src.audioElem.volume = v;
		}
		catch (err) { }
	}

	/**
	 * @public
	 */
	stopAll() {
		for (var i = 0; i < this.PlayingSounds.length; ++i) {
			var pl = this.PlayingSounds[i];
			pl.hasStopped = true;
			pl.src.audioElem.pause();
		}

		this.PlayingSounds = new Array();
	}

	/**
	 * @public
	 */
	clearFinishedPlayingSounds() {
		for (var i = 0; i < this.PlayingSounds.length;)
			if (this.PlayingSounds[i].hasPlayingCompleted())
				this.PlayingSounds.splice(i, 1);

			else
				++i;
	}

	/**
	 * @public
	 */
	stopSpecificPlayingSound(name) {
		for (var i = 0; i < this.PlayingSounds.length; ++i) {
			var pl = this.PlayingSounds[i];
			if (pl && pl.src && pl.src.Name == name) {
				this.PlayingSounds.splice(i, 1);

				pl.hasStopped = true;
				pl.src.audioElem.pause();
				return;
			}
		}
	}
}

const gSoundManager = new SoundManager();

// -----------------------------------------------------------------------------------------
// SoundSource
// -----------------------------------------------------------------------------------------

/**
 * @constructor
 * @public
 */
class SoundSource {
	constructor(name) {
		this.Name = name;

		var a = null;
		try
		{
			a = new Audio();
			a.src = name;
		}
		catch (err) { }

		//var a = document.createElement('audio');
		//a.src = name;		
		//a.controls = 1;
		this.loaded = true;
		// this.loaded = false;
		//var me = this;
		//a.addEventListener('canplaythrough', function() { me.onAudioLoaded() ;}, false);
		this.audioElem = a;
	}

	onAudioLoaded() {
		//this.loaded = true;
	}
}
// -----------------------------------------------------------------------------------------
// Playing Sound
// -----------------------------------------------------------------------------------------

/**
 * @constructor
 * @public
 */
class PlayingSound {
	constructor(source) {
		this.src = source;
		this.hasStopped = false;
		this.looping = false;
		this.ownVolume = 1.0;

		var d = new Date();
		this.startTime = d.getTime();
	}

	hasPlayingCompleted() {
		if (this.hasStopped)
			return true;

		if (this.looping)
			return false;

		var d = new Date();
		var now = d.getTime();
		var dur = this.src.duration;

		return dur > 0 && (now > this.startTime + dur);
	}
}

///////////////////////////////////////////////////////////////////////////
// Line3D
///////////////////////////////////////////////////////////////////////////


/**
 * 3d line class, decribing a line between two 3d points
 * @class 3d line class, decribing a line between two 3d points
 * @public
 * @constructor
 */
class Line3d {
    /**
     * Start point of the line
     * @public
     * @type {CL3D.Vect3d}
     */
    Start = null;

    /**
     * End point of the line
     * @public
     * @type {CL3D.Vect3d}
     */
    End = null;
    
    constructor() {
        this.Start = new Vect3d();
        this.End = new Vect3d();
    }

    /**
     * Returns the vector representing the line
     * @public
     * @returns {CL3D.Vect3d} center
     */
    getVector() {
        return this.End.substract(this.Start);
    }

    /**
     * Returns the length of the line
     * @public
     * @returns {Number} center
     */
    getLength() {
        return this.getVector().getLength();
    }
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * 3d plane class with lots of operators and methods. 
 * @class 3d plane class with lots of operators and methods
 * @public
 * @constructor
 */
class Plane3d {
	/**
	 * plane distance to origin
	 * @public
	 * @type Number
	 */
	D = 0;

	/**
	 * plane normal
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	Normal = null;

	/**
	 * front plane relation, used in {@link Plane3d.classifyPointRelation}
	 * @static
	 * @public
	 */
	static ISREL3D_FRONT = 0;

	/**
	 * back plane relation, used in {@link Plane3d.classifyPointRelation}
	 * @static
	 * @public
	 */
	static ISREL3D_BACK = 1;

	/**
	 * planar plane relation, used in {@link Plane3d.classifyPointRelation}
	 * @static
	 * @public
	 */
	static ISREL3D_PLANAR = 2;

	constructor() {
		this.Normal = new Vect3d(0, 1, 0);
		this.recalculateD(new Vect3d(0, 0, 0));
	}

	/**
	 * Creates a clone of the plane
	 * @returns {Plane3d} the cloned plane
	 * @public
	 */
	clone() {
		var pl = new Plane3d();
		pl.Normal = this.Normal.clone();
		pl.D = this.D;
		return pl;
	}

	/**
	 * Recalculates the distance from origin by applying a new member point to the plane.
	 * @public
	 */
	recalculateD(mpoint) {
		this.D = -mpoint.dotProduct(this.Normal);
	}

	/**
	 * Gets a member point of the plane.
	 * @public
	 */
	getMemberPoint() {
		return this.Normal.multiplyWithScal(-this.D);
	}

	/**
	 * Sets initial values
	 * @public
	 */
	setPlane(point, nvector) {
		this.Normal = nvector.clone();
		this.recalculateD(point);
	}

	/**
	 * creates a plane from 3 points
	 * @public
	 */
	setPlaneFrom3Points(point1, point2, point3) {
		// creates the plane from 3 memberpoints
		this.Normal = (point2.substract(point1)).crossProduct(point3.substract(point1));
		this.Normal.normalize();

		this.recalculateD(point1);
	}

	/**
	 * normalizes the plane
	 * @public
	 */
	normalize() {
		var len = (1.0 / this.Normal.getLength());
		this.Normal = this.Normal.multiplyWithScal(len);
		this.D *= len;
	}

	/**
	 * Classifies the relation of a point to this plane.
	 * @public
	 * @param point Point to classify its relation.
	 * @returns ISREL3D_FRONT if the point is in front of the plane,
	 * ISREL3D_BACK if the point is behind of the plane, and
	 * ISREL3D_PLANAR if the point is within the plane.
	 */
	classifyPointRelation(point) {
		var d = this.Normal.dotProduct(point) + this.D;

		if (d < -0.000001)
			return Plane3d.ISREL3D_BACK;

		if (d > 0.000001)
			return Plane3d.ISREL3D_FRONT;

		return Plane3d.ISREL3D_PLANAR;
	}
	

	/**
	 * Get the intersection point with two other planes if there is one.
	 * @public
	 * @returns {Boolean} true if intersection found, false if not
	 */
	getIntersectionWithPlanes(o1, o2, outPoint) {
		var linePoint = new Vect3d();
		var lineVect = new Vect3d();

		if (this.getIntersectionWithPlane(o1, linePoint, lineVect))
			return o2.getIntersectionWithLine(linePoint, lineVect, outPoint);

		return false;
	}

	/**
	 * Intersects this plane with another.
	 * @public
	 * @param other Other plane to intersect with.
	 * @param outLinePoint Base point of intersection line.
	 * @param outLineVect Vector of intersection.
	 * @returns True if there is a intersection, false if not.
	 */
	getIntersectionWithPlane(other, outLinePoint, outLineVect) {
		var fn00 = this.Normal.getLength();
		var fn01 = this.Normal.dotProduct(other.Normal);
		var fn11 = other.Normal.getLength();
		var det = fn00 * fn11 - fn01 * fn01;

		if (Math.abs(det) < 0.00000001)
			return false;

		var invdet = 1.0 / det;
		var fc0 = (fn11 * -this.D + fn01 * other.D) * invdet;
		var fc1 = (fn00 * -other.D + fn01 * this.D) * invdet;

		this.Normal.crossProduct(other.Normal).copyTo(outLineVect);

		var tmp1 = this.Normal.multiplyWithScal(fc0);
		var tmp2 = other.Normal.multiplyWithScal(fc1);
		tmp1.add(tmp2).copyTo(outLinePoint);
		return true;
	}

	/**
	 * Get an intersection with a 3d line.
	 * @public
	 * @param lineVect Vector of the line to intersect with.
	 * @param linePoint Point of the line to intersect with.
	 * @param outIntersection Place to store the intersection point, if there is one.
	 * @returns True if there was an intersection, false if there was not.
	 */
	getIntersectionWithLine(linePoint, lineVect, outIntersection) {
		var t2 = this.Normal.dotProduct(lineVect);

		if (t2 == 0)
			return false;

		var t = -(this.Normal.dotProduct(linePoint) + this.D) / t2;
		linePoint.add((lineVect.multiplyWithScal(t))).copyTo(outIntersection);
		return true;
	}

	/**
	 * Get the distance to a point.
	 * Note that this only works if the normal is normalized.
	 * @public
	 */
	getDistanceTo(point) {
		return point.dotProduct(this.Normal) + this.D;
	}

	/**
	 * Returns true if the plane is frontfacing to the look direction.
	 * @public
	 * @param lookDirection {CL3D.Vect3d} look direction
	 */
	isFrontFacing(lookDirection) {
		var d = this.Normal.dotProduct(lookDirection);
		return d <= 0;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * 3d triangle class consisting of 3 points in space, formin a triangle
 * @class 3d triangle class consisting of 3 points in space, formin a triangle
 * @public
 * @constructor
 * @param {CL3D.Vect3d} a first point of the triangle, can be null.
 * @param {CL3D.Vect3d} b second point of the triangle, can be null.
 * @param {CL3D.Vect3d} c third point of the triangle, can be null.
 */
class Triangle3d {
	/**
	 * First point of the triangle
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	pointA = null;

	/**
	 * Second point of the triangle
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	pointB = null;

	/**
	 * Third point of the triangle
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	pointC = null;

	constructor(a, b, c) {
		if (a)
			this.pointA = a;

		else
			this.pointA = new Vect3d();

		if (b)
			this.pointB = b;

		else
			this.pointB = new Vect3d();

		if (c)
			this.pointC = c;

		else
			this.pointC = new Vect3d();
	}

	/**
	 * Creates a copy of this vector and returns it
	 * @public
	 * @returns the new CL3D.Triangle3d
	 */
	clone() {
		return new Triangle3d(this.pointA, this.pointB, this.pointC);
	}

	/**
	 * Creates a 3d plane based on this triangle
	 * @public
	 * @returns Triangle3d
	 */
	getPlane() {
		var p = new Plane3d();
		p.setPlaneFrom3Points(this.pointA, this.pointB, this.pointC);
		return p;
	}

	/**
	 * Returns if a point is in this triangle using a fast method
	 * @public
	 * @param {CL3D.Vect3d} p point to test
	 * @returns {Boolean} true if inside, false if not
	 */
	isPointInsideFast(p) {
		var f = this.pointB.substract(this.pointA);
		var g = this.pointC.substract(this.pointA);

		var a = f.dotProduct(f);
		var b = f.dotProduct(g);
		var c = g.dotProduct(g);

		var vp = p.substract(this.pointA);
		var d = vp.dotProduct(f);
		var e = vp.dotProduct(g);

		var x = (d * c) - (e * b);
		var y = (e * a) - (d * b);
		var ac_bb = (a * c) - (b * b);
		var z = x + y - ac_bb;

		// return sign(z) && !(sign(x)||sign(y))
		//return (( (IR(z)) & ~((IR(x))|(IR(y))) ) & 0x80000000)!=0;
		return (z < 0) && !((x < 0) || (y < 0));
	}

	/**
	 * Returns if a point is in this triangle using a slow method
	 * @public
	 * @param {CL3D.Vect3d} p point to test
	 * @returns {Boolean} true if inside, false if not
	 */
	isPointInside(p) {
		return (this.isOnSameSide(p, this.pointA, this.pointB, this.pointC) &&
			this.isOnSameSide(p, this.pointB, this.pointA, this.pointC) &&
			this.isOnSameSide(p, this.pointC, this.pointA, this.pointB));
	}

	/**
	 * @public
	 */
	isOnSameSide(p1, p2, a, b) {
		var bminusa = b.substract(a);
		var cp1 = bminusa.crossProduct(p1.substract(a));
		var cp2 = bminusa.crossProduct(p2.substract(a));
		return (cp1.dotProduct(cp2) >= 0.0);
	}

	/**
	 * Returns the normal of this triangle
	 * @public
	 * @returns {CL3D.Vect3d} the normal.
	 */
	getNormal() {
		return this.pointB.substract(this.pointA).crossProduct(this.pointC.substract(this.pointA));
	}

	/**
	 * Returns the intersection of the plane described by this triangle and a line.
	 * @public
	 * @param {CL3D.Vect3d} linePoint point on the line
	 * @param {CL3D.Vect3d} lineVect vector of the line
	 * @returns null if there is no intersection or a vect3d describing the point of intersection
	 */
	getIntersectionOfPlaneWithLine(linePoint, lineVect) {
		var normal = this.getNormal();
		normal.normalize();
		var t2 = normal.dotProduct(lineVect);

		if (iszero(t2))
			return null;

		var d = this.pointA.dotProduct(normal);
		var t = -(normal.dotProduct(linePoint) - d) / t2;
		return linePoint.add(lineVect.multiplyWithScal(t));
	}

	/**
	 * Returns the intersection of the triangle and a line.
	 * @public
	 * @param {CL3D.Vect3d} linePoint point on the line
	 * @param {CL3D.Vect3d} lineVect vector of the line
	 * @returns null if there is no intersection or a vect3d describing the point of intersection
	 */
	getIntersectionWithLine(linePoint, lineVect) {
		var ret = this.getIntersectionOfPlaneWithLine(linePoint, lineVect);
		if (ret == null)
			return null;

		if (this.isPointInside(ret))
			return ret;

		return null;
	}

	/**
	 * Returns the the triangle is totally inside a box
	 * @public
	 * @param {CL3D.Box3d} box
	 */
	isTotalInsideBox(box) {
		return box.isPointInside(this.pointA) &&
			box.isPointInside(this.pointB) &&
			box.isPointInside(this.pointC);
	}

	/**
	 * Copies the content of this triangle to another triangle
	 * @public
	 * @param {CL3D.Triangle3d} tgt Target vector
	 */
	copyTo(tgt) {
		this.pointA.copyTo(tgt.pointA);
		this.pointB.copyTo(tgt.pointB);
		this.pointC.copyTo(tgt.pointC);
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Quaternion class for representing rotations
 * @constructor
 * @public
 * @class Quaternion class for representing rotations
 */
class Quaternion {
	/**
	 * X component of the Quaternion
	 * @public
	 * @type Number
	 */
	X = 0;

	/**
	 * Y component of the Quaternion
	 * @public
	 * @type Number 
	 */
	Y = 0;

	/**
	 * Z component of the Quaternion
	 * @public
	 * @type Number
	 */
	Z = 0;

	/**
	 * W component of the Quaternion
	 * @public
	 * @type Number
	 */
	W = 0;

	constructor(x, y, z, w) {
		this.X = 0;
		this.Y = 0;
		this.Z = 0;
		this.W = 1;

		if (x != null)
			this.X = x;

		if (y != null)
			this.Y = y;

		if (z != null)
			this.Z = z;

		if (w != null)
			this.W = w;
	}

	/**
	 * Creates a clone of this Quaternion
	 * @public
	 */
	clone() {
		var m = new Quaternion();
		this.copyTo(m);
		return m;
	}

	/**
	 * Copies the content of this Quaternion to a target Quaternion
	 * @public
	 */
	copyTo(tgt) {
		tgt.X = this.X;
		tgt.Y = this.Y;
		tgt.Z = this.Z;
		tgt.W = this.W;
	}

	/**
	 * Multiplication operator, multiplies with a float (scalar).
	 * @public
	 */
	multiplyWith(s) {
		return new Quaternion(this.X * s, this.Y * s, this.Z * s, this.W * s);
	}

	/**
	 * Multiplication operator, multiplies with a float (scalar).
	 * @public
	 */
	multiplyThisWith(s) {
		this.X = this.X * s;
		this.Y = this.Y * s;
		this.Z = this.Z * s;
		this.W = this.W * s;
	}

	/**
	 * Addition operator, adds another quaternion to this one
	 * @public
	 */
	addToThis(b) {
		this.X += b.X;
		this.Y += b.Y;
		this.Z += b.Z;
		this.W += b.W;
		return this;
	}

	/**
	 * set this quaternion to the result of the interpolation between two quaternions. Time is a float between 0 and 1
	 * @public
	 */
	slerp(q1, q2, time) {
		var angle = q1.dotProduct(q2);

		if (angle < 0.0) {
			q1 = q1.multiplyWith(-1.0);
			angle *= -1.0;
		}

		var scale;
		var invscale;

		if ((angle + 1.0) > 0.05) {
			if ((1.0 - angle) >= 0.05) // spherical interpolation
			{
				var theta = Math.acos(angle);
				var invsintheta = 1.0 / Math.sin(theta);
				scale = Math.sin(theta * (1.0 - time)) * invsintheta;
				invscale = Math.sin(theta * time) * invsintheta;
			}
			else // linear interploation
			{
				scale = 1.0 - time;
				invscale = time;
			}
		}

		else {
			q2 = new Quaternion(-q1.Y, q1.X, -q1.W, q1.Z);
			scale = Math.sin(PI * (0.5 - time));
			invscale = Math.sin(PI * time);
		}

		// return (*this = (q1*scale) + (q2*invscale));
		var res = q1.multiplyWith(scale).addToThis(q2.multiplyWith(invscale));
		this.X = res.X;
		this.Y = res.Y;
		this.Z = res.Z;
		this.W = res.W;
	}

	/**
	 * calculates to dot product with another quaternion
	 * @public
	 */
	dotProduct(q2) {
		return (this.X * q2.X) + (this.Y * q2.Y) + (this.Z * q2.Z) + (this.W * q2.W);
	}

	/**
	 * Creates a matrix from this quaternion
	 * @public
	 */
	getMatrix() {
		var m = new Matrix4(false);
		this.getMatrix_transposed(m);
		return m;
	}

	/**
	 * Creates a matrix from this quaternion
	 * @public
	 */
	getMatrix_transposed(dest) {
		var X = this.X;
		var Y = this.Y;
		var Z = this.Z;
		var W = this.W;

		dest.m00 = 1.0 - 2.0 * Y * Y - 2.0 * Z * Z;
		dest.m04 = 2.0 * X * Y + 2.0 * Z * W;
		dest.m08 = 2.0 * X * Z - 2.0 * Y * W;
		dest.m12 = 0.0;

		dest.m01 = 2.0 * X * Y - 2.0 * Z * W;
		dest.m05 = 1.0 - 2.0 * X * X - 2.0 * Z * Z;
		dest.m09 = 2.0 * Z * Y + 2.0 * X * W;
		dest.m13 = 0.0;

		dest.m02 = 2.0 * X * Z + 2.0 * Y * W;
		dest.m06 = 2.0 * Z * Y - 2.0 * X * W;
		dest.m10 = 1.0 - 2.0 * X * X - 2.0 * Y * Y;
		dest.m14 = 0.0;

		dest.m03 = 0.0;
		dest.m07 = 0.0;
		dest.m11 = 0.0;
		dest.m15 = 1.0;

		dest.bIsIdentity = false;
	}

	/**
	 * Fills a 3D vector with euler coodinates representing this quaternion
	 * @param {CL3D.Vect3d} dest 3d vector to be filled with the euler coordinates
	 * @public
	 */
	toEuler(dest) {
		var sqw = this.W * this.W;
		var sqx = this.X * this.X;
		var sqy = this.Y * this.Y;
		var sqz = this.Z * this.Z;

		// heading = rotation about z-axis
		dest.Z = (Math.atan2(2.0 * (this.X * this.Y + this.Z * this.W), (sqx - sqy - sqz + sqw)));

		// bank = rotation about x-axis
		dest.X = (Math.atan2(2.0 * (this.Y * this.Z + this.X * this.W), (-sqx - sqy + sqz + sqw)));

		// attitude = rotation about y-axis
		dest.Y = Math.asin(clamp(-2.0 * (this.X * this.Z - this.Y * this.W), -1.0, 1.0));
	}

	/**
	 * Sets the quaternion from euler coordinates
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} z 
	 * @public
	 */
	setFromEuler(x, y, z) {
		var angle = x * 0.5;
		var sr = Math.sin(angle);
		var cr = Math.cos(angle);

		angle = y * 0.5;
		var sp = Math.sin(angle);
		var cp = Math.cos(angle);

		angle = z * 0.5;
		var sy = Math.sin(angle);
		var cy = Math.cos(angle);

		var cpcy = cp * cy;
		var spcy = sp * cy;
		var cpsy = cp * sy;
		var spsy = sp * sy;

		this.X = (sr * cpcy - cr * spsy);
		this.Y = (cr * spcy + sr * cpsy);
		this.Z = (cr * cpsy - sr * spcy);
		this.W = (cr * cpcy + sr * spsy);

		this.normalize();
	}
	// sets from euler coordinates
	normalize() {
		var n = this.X * this.X + this.Y * this.Y + this.Z * this.Z + this.W * this.W;

		if (n == 1)
			return;

		n = 1.0 / Math.sqrt(n);
		this.multiplyThisWith(n);
	}

	/**
	 * Creates a matrix from this quaternion
	 * @public
	 */
	toString() {
		return "(x: " + this.X + " y:" + this.Y + " z:" + this.Z + " w:" + this.W + ")";
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A view frustrum defining the area of view
 * @constructor
 * @public
 * @class A view frustrum defining the area of view
 */
class ViewFrustrum {
	planes = null; //:Array; // Plane3d

	/**
	 * Far plane of the frustum. That is the plane farest away from the eye.
	 * @public
	 * @static
	 */
	static VF_FAR_PLANE = 0;
	
	/**
	 * Near plane of the frustum. That is the plane nearest to the eye.
	 * @public
	 * @static
	 */
	static VF_NEAR_PLANE = 1;
	
	/**
	 * Left plane of the frustum.
	 * @public
	 * @static
	 */
	static VF_LEFT_PLANE = 2;
	
	/**
	 * Right plane of the frustum.
	 * @public
	 * @static
	 */
	static VF_RIGHT_PLANE = 3;
	
	/**
	 * Bottom plane of the frustum.
	 * @public
	 * @static
	 */
	static VF_BOTTOM_PLANE = 4;
	
	/**
	 * Top plane of the frustum.
	 * @public
	 * @static
	 */
	static VF_TOP_PLANE = 5;
	
	/**
	 * Amount of planes enclosing the view frustum. Should be 6.
	 * @public
	 * @static
	 */
	static VF_PLANE_COUNT = 6;

	constructor() {
		this.planes = new Array();
		for (var i = 0; i < ViewFrustrum.VF_PLANE_COUNT; ++i)
			this.planes.push(new Plane3d());
	}
	/**
	 * @public
	 */
	setFrom(mat) {
		// left clipping plane
		var plane;

		plane = this.planes[ViewFrustrum.VF_LEFT_PLANE];
		plane.Normal.X = mat.m03 + mat.m00;
		plane.Normal.Y = mat.m07 + mat.m04;
		plane.Normal.Z = mat.m11 + mat.m08;
		plane.D = mat.m15 + mat.m12;

		// right clipping plane
		plane = this.planes[ViewFrustrum.VF_RIGHT_PLANE];
		plane.Normal.X = mat.m03 - mat.m00;
		plane.Normal.Y = mat.m07 - mat.m04;
		plane.Normal.Z = mat.m11 - mat.m08;
		plane.D = mat.m15 - mat.m12;

		// top clipping plane
		plane = this.planes[ViewFrustrum.VF_TOP_PLANE];
		plane.Normal.X = mat.m03 - mat.m01;
		plane.Normal.Y = mat.m07 - mat.m05;
		plane.Normal.Z = mat.m11 - mat.m09;
		plane.D = mat.m15 - mat.m13;

		// bottom clipping plane
		plane = this.planes[ViewFrustrum.VF_BOTTOM_PLANE];
		plane.Normal.X = mat.m03 + mat.m01;
		plane.Normal.Y = mat.m07 + mat.m05;
		plane.Normal.Z = mat.m11 + mat.m09;
		plane.D = mat.m15 + mat.m13;

		// far clipping plane
		plane = this.planes[ViewFrustrum.VF_FAR_PLANE];
		plane.Normal.X = mat.m03 - mat.m02;
		plane.Normal.Y = mat.m07 - mat.m06;
		plane.Normal.Z = mat.m11 - mat.m10;
		plane.D = mat.m15 - mat.m14;

		// near clipping plane
		plane = this.planes[ViewFrustrum.VF_NEAR_PLANE];
		plane.Normal.X = mat.m02;
		plane.Normal.Y = mat.m06;
		plane.Normal.Z = mat.m10;
		plane.D = mat.m14;

		// normalize normals
		var i = 0;
		for (i = 0; i < ViewFrustrum.VF_PLANE_COUNT; ++i) {
			plane = this.planes[i];
			var len = -(1.0 / plane.Normal.getLength());
			plane.Normal = plane.Normal.multiplyWithScal(len);
			plane.D *= len;
		}
	}
	/**
	 * @public
	 */
	getFarLeftUp() {
		var p = new Vect3d();

		this.planes[ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(
			this.planes[ViewFrustrum.VF_TOP_PLANE], this.planes[ViewFrustrum.VF_LEFT_PLANE], p);

		return p;
	}
	/**
	 * @public
	 */
	getFarRightUp() {
		var p = new Vect3d();

		this.planes[ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(
			this.planes[ViewFrustrum.VF_TOP_PLANE], this.planes[ViewFrustrum.VF_RIGHT_PLANE], p);

		return p;
	}
	/**
	 * @public
	 */
	getFarRightDown() {
		var p = new Vect3d();

		this.planes[ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(
			this.planes[ViewFrustrum.VF_BOTTOM_PLANE], this.planes[ViewFrustrum.VF_RIGHT_PLANE], p);

		return p;
	}
	/**
	 * @public
	 */
	getFarLeftDown() {
		var p = new Vect3d();

		this.planes[ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(
			this.planes[ViewFrustrum.VF_BOTTOM_PLANE], this.planes[ViewFrustrum.VF_LEFT_PLANE], p);

		return p;
	}
	/**
	 * @public
	 */
	getBoundingBox(campos) {
		var b = new Box3d();
		b.reset(campos.X, campos.Y, campos.Z);

		b.addInternalPointByVector(this.getFarLeftUp());
		b.addInternalPointByVector(this.getFarRightUp());
		b.addInternalPointByVector(this.getFarLeftDown());
		b.addInternalPointByVector(this.getFarRightDown());

		return b;
	}
	/**
	 * @public
	 */
	isBoxInside(box) {
		var edges = box.getEdges();

		for (var p = 0; p < 6; ++p) {
			var boxInFrustum = false;

			for (var j = 0; j < 8; ++j) {
				if (this.planes[p].classifyPointRelation(edges[j]) != Plane3d.ISREL3D_FRONT) {
					boxInFrustum = true;
					break;
				}
			}

			if (!boxInFrustum)
				return false;
		}

		return true;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Interface to return triangles with specific properties, useful for collision detection.
 * Every {@link SceneNode} may have a triangle selector, available with SceneNode::Selector. This is used for doing collision detection: 
 * For example if you know that a collision may have happened in the area between (1,1,1) and (10,10,10), you can get all triangles of the scene
 * node in this area with the TriangleSelector easily and check every triangle if it collided.<br/>
 * <br/>
 * This is the base class of all triangle selector implementations. Use {@link MeshTriangleSelector} for an implementation for mesh scene
 * nodes, and {@link MetaTriangleSelector} for a selector for multiple other triangle selectors and {@link OctTreeTriangleSelector} for
 * an implementation for huge meshes.
 * @class Interface to return triangles with specific properties, useful for collision detection.
 * @public
 * @constructor
 */
class TriangleSelector {
	constructor() {
		this.Node = null;
	}

	/**
	 * Returns all triangles for the scene node associated with this selector
	 * @public
	 * @param {CL3D.Matrix4} transform a transformation matrix which transforms all triangles before returning them
	 * @param {Array} outArray output array of the triangles
	 */
	getAllTriangles(transform, outArray) {
	}

	/**
	 * Returns all triangles inside a bounding box, for the scene node associated with this selector. This method will
	 * return at least the triangles that intersect the box, but may return other triangles as well.
	 * @public
	 * @param box {CL3D.Box3d}
	 * @param transform {CL3D.Matrix4} a transformation matrix which transforms all triangles before returning them
	 * @param outArray {Array} output array of the triangles
	 * @returns the new CL3D.TriangleSelector
	 */
	getTrianglesInBox(box, transform, outArray) {
		this.getAllTriangles(transform, outArray);
	}

	/**
	 * Returns the collision 3d point of a 3d line with the 3d geometry in this triangle selector.
	 * @public
	 * @param {CL3D.Vect3d} start 3d point representing the start of the 3d line
	 * @param {CL3D.Vect3d} end 3d point representing the end of the 3d line
	 * @param {Boolean} bIgnoreBackFaces if set to true, this will ignore back faced polygons, making the query twice as fast
	 * @param {CL3D.Triangle3d} outTriangle if set to a triangle, this will contain the 3d triangle with which the line collided
	 * @param {Boolean} ignoreInvisibleItems set to true to ignore invisible scene nodes for collision test
	 * @returns {CL3D.Vect3d}  a 3d position as {@link Vect3d} if a collision was found or null if no collision was found
	 */
	getCollisionPointWithLine(start, end, bIgnoreBackFaces, outTriangle, ignoreInvisibleItems) {
		if (!start || !end)
			return null;

		if (this.Node != null && ignoreInvisibleItems && this.Node.Visible == false)
			return null;

		var box = new Box3d();
		box.MinEdge = start.clone();
		box.MaxEdge = start.clone();
		box.addInternalPointByVector(end);

		var triangles = new Array();

		this.getTrianglesInBox(box, null, triangles);

		var linevect = end.substract(start);
		linevect.normalize();

		var intersection;
		var nearest = 999999999.9; //FLT_MAX;
		var raylength = end.substract(start).getLengthSQ();

		var minX = Math.min(start.X, end.X);
		var maxX = Math.max(start.X, end.X);
		var minY = Math.min(start.Y, end.Y);
		var maxY = Math.max(start.Y, end.Y);
		var minZ = Math.min(start.Z, end.Z);
		var maxZ = Math.max(start.Z, end.Z);

		var returnPoint = null;

		for (var i = 0; i < triangles.length; ++i) {
			var triangle = triangles[i];

			if (bIgnoreBackFaces && !triangle.getPlane().isFrontFacing(linevect))
				continue;

			if (minX > triangle.pointA.X && minX > triangle.pointB.X && minX > triangle.pointC.X)
				continue;
			if (maxX < triangle.pointA.X && maxX < triangle.pointB.X && maxX < triangle.pointC.X)
				continue;
			if (minY > triangle.pointA.Y && minY > triangle.pointB.Y && minY > triangle.pointC.Y)
				continue;
			if (maxY < triangle.pointA.Y && maxY < triangle.pointB.Y && maxY < triangle.pointC.Y)
				continue;
			if (minZ > triangle.pointA.Z && minZ > triangle.pointB.Z && minZ > triangle.pointC.Z)
				continue;
			if (maxZ < triangle.pointA.Z && maxZ < triangle.pointB.Z && maxZ < triangle.pointC.Z)
				continue;

			if (start.getDistanceFromSQ(triangle.pointA) >= nearest &&
				start.getDistanceFromSQ(triangle.pointB) >= nearest &&
				start.getDistanceFromSQ(triangle.pointC) >= nearest)
				continue;

			intersection = triangle.getIntersectionWithLine(start, linevect);
			if (intersection) {
				var tmp = intersection.getDistanceFromSQ(start);
				var tmp2 = intersection.getDistanceFromSQ(end);

				if (tmp < raylength && tmp2 < raylength && tmp < nearest) {
					nearest = tmp;
					if (outTriangle)
						triangle.copyTo(outTriangle);
					returnPoint = intersection;
				}
			}
		}

		if (returnPoint)
			return returnPoint.clone();
		return null;
	}

	/**
	  * Returns the scenenode this selector is for
	  * @returns returns {@link SceneNode} if this selector is for a specific scene node
	 */
	getRelatedSceneNode() {
		return null;
	}

	/**
	  * If there are multiple scene nodes in this selector, it is possible to let it ignore one
	  * specific node, for example to prevent colliding it against itself.
	 */
	setNodeToIgnore(n) {
		// to be implemented in derived classes
	}

	/**
	  * Creates a clone of this triangle selector, for a new scene node
	  * @param {CL3D.SceneNode} node scene node the selector is based on
	  * @returns {CL3D.TriangleSelector} returns triangleSelector if this selector can be cloned or null if not
	 */
	createClone(node) {
		// to be implemented in derived classes
		return null;
	}
}
// ------------------------------------------------------------------------------------------------------
// MeshTriangleSelector
// ------------------------------------------------------------------------------------------------------

/**
 * Implementation of TriangleSelector for meshes, useful for collision detection.<br/>
 * Note use {@link OctTreeTriangleSelector} instead of this one if your mesh is huge, otherwise collision detection might be slow.
 * Every {@link SceneNode} may have a triangle selector, available with SceneNode::Selector. This is used for doing collision detection: 
 * For example if you know that a collision may have happened in the area between (1,1,1) and (10,10,10), you can get all triangles of the scene
 * node in this area with the TriangleSelector easily and check every triangle if it collided.<br/>
 * @class Interface to return triangles with specific properties, useful for collision detection.
 * @public
 * @constructor
 * @extends CL3D.TriangleSelector
 * @param {CL3D.Mesh} Mesh the {@link Mesh} representing the geometry
 * @param {Number} materialToIgnore (optional) material type to ignore for collision. Can be set to null.
 * @param {Number} materialToIgnore2 (optional) material type to ignore for collision. Can be set to null.
 * @param {CL3D.SceneNode} scenenode the {@link SceneNode} representing the position of the geometry
 */
class MeshTriangleSelector extends TriangleSelector {
	constructor(mesh, scenenode, materialToIgnore, materialToIgnore2) {
		super();

		if (!mesh)
			return;

		this.Node = scenenode;

		// create triangle array
		this.Triangles = new Array();

		if (mesh != null) {
			for (var b = 0; b < mesh.MeshBuffers.length; ++b) {
				var mb = mesh.MeshBuffers[b];
				if (mb) {
					if (materialToIgnore != null && mb.Mat && mb.Mat.Type == materialToIgnore)
						continue;

					if (materialToIgnore2 != null && mb.Mat && mb.Mat.Type == materialToIgnore2)
						continue;

					var idxcnt = mb.Indices.length;
					for (var j = 0; j < idxcnt; j += 3) {
						var vtx1 = mb.Vertices[mb.Indices[j]];
						var vtx2 = mb.Vertices[mb.Indices[j + 1]];
						var vtx3 = mb.Vertices[mb.Indices[j + 2]];

						this.Triangles.push(new Triangle3d(vtx1.Pos, vtx2.Pos, vtx3.Pos));
					}
				}
			}
		}
	}

	/**
	 * Returns all triangles for the scene node associated with this selector
	 * @public
	 * @param {CL3D.Matrix4} transform a transformation matrix which transforms all triangles before returning them
	 * @param {Array} outArray output array of the triangles
	 */
	getAllTriangles(transform, outArray) {
		if (!this.Node.AbsoluteTransformation)
			return;

		var mat; // Matrix4

		if (transform)
			mat = transform.multiply(this.Node.AbsoluteTransformation);

		else
			mat = this.Node.AbsoluteTransformation;

		var i; //:int;

		if (mat.isIdentity()) {
			// copy directly
			for (i = 0; i < this.Triangles.length; ++i)
				outArray.push(this.Triangles[i]);
		}

		else {
			// transform before copying
			if (mat.isTranslateOnly()) {
				// translate only
				for (i = 0; i < this.Triangles.length; ++i) {
					outArray.push(new Triangle3d(
						mat.getTranslatedVect(this.Triangles[i].pointA),
						mat.getTranslatedVect(this.Triangles[i].pointB),
						mat.getTranslatedVect(this.Triangles[i].pointC)));
				}
			}

			else {
				// do full transform
				for (i = 0; i < this.Triangles.length; ++i) {
					outArray.push(new Triangle3d(
						mat.getTransformedVect(this.Triangles[i].pointA),
						mat.getTransformedVect(this.Triangles[i].pointB),
						mat.getTransformedVect(this.Triangles[i].pointC)));
				}
			}
		}
	}

	/**
	 * Returns all triangles inside a bounding box, for the scene node associated with this selector. This method will
	 * return at least the triangles that intersect the box, but may return other triangles as well.
	 * @public
	 * @param box {CL3D.Box3d}
	 * @param transform {CL3D.Matrix4} a transformation matrix which transforms all triangles before returning them
	 * @param outArray {Array} output array of the triangles
	 * @returns the new CL3D.TriangleSelector
	 */
	getTrianglesInBox(box, transform, outArray) {
		// TODO: do a getTrianglesInBox implementation
		this.getAllTriangles(transform, outArray);
	}

	/**
	  * Returns the scenenode this selector is for
	  * @returns returns {@link SceneNode} if this selector is for a specific scene node
	 */
	getRelatedSceneNode() {
		return this.Node;
	}

	/**
	  * Creates a clone of this triangle selector, for a new scene node
	  * @param node {CL3D.SceneNode} scene node the selector is based on
	  * @returns returns {@link TriangleSelector} if this selector can be cloned or null if not
	 */
	createClone(node) {
		var clone = new MeshTriangleSelector(null, node);
		clone.Node = node;
		clone.Triangles = this.Triangles;
		return clone;
	}
}
// ------------------------------------------------------------------------------------------------------
// BoundingBoxTriangleSelector
// ------------------------------------------------------------------------------------------------------

/**
 * Implementation of TriangleSelector based on a simple, static bounding box, useful for collision detection.<br/>
 * Every {@link SceneNode} may have a triangle selector, available with SceneNode::Selector. This is used for doing collision detection: 
 * For example if you know that a collision may have happened in the area between (1,1,1) and (10,10,10), you can get all triangles of the scene
 * node in this area with the TriangleSelector easily and check every triangle if it collided.<br/>
 * @class Interface to return triangles with specific properties, useful for collision detection.
 * @public
 * @constructor
 * @extends CL3D.MeshTriangleSelector
 * @param Box {@link Box3d} representing the simpliefied collision object of the node
 */
class BoundingBoxTriangleSelector extends MeshTriangleSelector {
	constructor(box, scenenode) {
		super();

		if (!scenenode)
			return;

		this.Node = scenenode;

		// create triangle array
		this.Triangles = new Array();

		if (box != null) {
			var edges = box.getEdges();

			this.Triangles.push(new Triangle3d(edges[3], edges[0], edges[2]));
			this.Triangles.push(new Triangle3d(edges[3], edges[1], edges[0]));

			this.Triangles.push(new Triangle3d(edges[3], edges[2], edges[7]));
			this.Triangles.push(new Triangle3d(edges[7], edges[2], edges[6]));

			this.Triangles.push(new Triangle3d(edges[7], edges[6], edges[4]));
			this.Triangles.push(new Triangle3d(edges[5], edges[7], edges[4]));

			this.Triangles.push(new Triangle3d(edges[5], edges[4], edges[0]));
			this.Triangles.push(new Triangle3d(edges[5], edges[0], edges[1]));

			this.Triangles.push(new Triangle3d(edges[1], edges[3], edges[7]));
			this.Triangles.push(new Triangle3d(edges[1], edges[7], edges[5]));

			this.Triangles.push(new Triangle3d(edges[0], edges[6], edges[2]));
			this.Triangles.push(new Triangle3d(edges[0], edges[4], edges[6]));
		}
	}

	/**
	  * Creates a clone of this triangle selector, for a new scene node
	  * @param node {CL3D.SceneNode} scene node the selector is based on
	  * @returns returns {@link TriangleSelector} if this selector can be cloned or null if not
	 */
	createClone(node) {
		var clone = new BoundingBoxTriangleSelector(null, node);
		clone.Node = node;
		clone.Triangles = this.Triangles;
		return clone;
	}
}
// ------------------------------------------------------------------------------------------------------
// MetaTriangleSelector
// ------------------------------------------------------------------------------------------------------

/**
 * Interface for making multiple triangle selectors work as one big selector. 
 * This is nothing more than a collection of one or more triangle selectors providing together the interface of one triangle selector.
 * In this way, collision tests can be done with different triangle soups in one pass.
 * See {@link MeshTriangleSelector} for an implementation of a triangle selector for meshes.<br/>
 * @class Interface for making multiple triangle selectors work as one big selector. 
 * @public
 * @extends CL3D.TriangleSelector
 * @constructor
 */
class MetaTriangleSelector extends TriangleSelector{
	constructor() {
		super();

		this.Selectors = new Array();
		this.NodeToIgnore = null;
	}

	/**
	 * Returns all triangles for the scene node associated with this selector
	 * @public
	 * @param {CL3D.Matrix4} transform a transformation matrix which transforms all triangles before returning them
	 * @param {Array} outArray output array of the triangles
	 */
	getAllTriangles(transform, outArray) {
		var nodeToIgnore = this.NodeToIgnore;

		for (var i = 0; i < this.Selectors.length; ++i) {
			var sel = this.Selectors[i];

			if (nodeToIgnore != null && nodeToIgnore == sel.getRelatedSceneNode())
				continue;

			sel.getAllTriangles(transform, outArray);
		}
	}

	/**
	 * Returns all triangles inside a bounding box, for the scene node associated with this selector. This method will
	 * return at least the triangles that intersect the box, but may return other triangles as well.
	 * @public
	 * @param box {CL3D.Box3d}
	 * @param transform {CL3D.Matrix4} a transformation matrix which transforms all triangles before returning them
	 * @param outArray {Array} output array of the triangles
	 * @returns the new CL3D.TriangleSelector
	 */
	getTrianglesInBox(box, transform, outArray) {
		var nodeToIgnore = this.NodeToIgnore;

		for (var i = 0; i < this.Selectors.length; ++i) {
			var sel = this.Selectors[i];

			if (nodeToIgnore != null && nodeToIgnore == sel.getRelatedSceneNode())
				continue;

			sel.getTrianglesInBox(box, transform, outArray);
		}
	}

	/**
	 * Adds a triangle selector to the collection of triangle selectors.
	 * @public
	 * @param {CL3D.TriangleSelector} t a {@link TriangleSelector} to add
	 */
	addSelector(t) {
		this.Selectors.push(t);
	}

	/**
	 * Removes a triangle selector from the collection of triangle selectors.
	 * @public
	 * @param {CL3D.TriangleSelector} t a {@link TriangleSelector} to remove
	 */
	removeSelector(t) {
		for (var i = 0; i < this.Selectors.length;) {
			var e = this.Selectors[i];

			if (e === t) {
				this.Selectors.splice(i, 1);
				return;
			}

			else
				++i;
		}
	}

	/**
	 * Removes all triangle selectors from the collection of triangle selectors.
	 * @public
	 */
	clear() {
		this.Selectors = new Array();
	}

	/**
	 * Returns the collision 3d point of a 3d line with the 3d geometry in this triangle selector.
	 * @public
	 * @param {CL3D.Vect3d} start 3d point representing the start of the 3d line
	 * @param {CL3D.Vect3d} end 3d point representing the end of the 3d line
	 * @param {Boolean} bIgnoreBackFaces if set to true, this will ignore back faced polygons, making the query twice as fast
	 * @param {CL3D.Triangle3d} outTriangle if set to a triangle, this will contain the 3d triangle with which the line collided
	 * @param {Boolean} ignoreInvisibleItems set to true to ignore invisible scene nodes for collision test
	 * @returns {CL3D.Vect3d} a 3d position as {@link Vect3d} if a collision was found or null if no collision was found
	 */
	getCollisionPointWithLine(start, end, bIgnoreBackFaces, outTriangle, ignoreInvisibleItems) {
		// we would not need to re-implement this function here, because it would also work from the base class, since it calls getAllTriangles().
		// but we call it for every node separately, so that the 'ignoreInvisibleItems' also can be used
		var nearest = 999999999.9; //FLT_MAX;
		var returnPos = null;
		var tritmp = null;
		if (outTriangle)
			tritmp = new Triangle3d();

		for (var i = 0; i < this.Selectors.length; ++i) {
			var pos = this.Selectors[i].getCollisionPointWithLine(start, end, bIgnoreBackFaces, tritmp, ignoreInvisibleItems);

			if (pos != null) {
				var tmp = pos.getDistanceFromSQ(start);
				if (tmp < nearest) {
					returnPos = pos.clone();
					nearest = tmp;

					if (outTriangle)
						tritmp.copyTo(outTriangle);
				}
			}
		}

		return returnPos;
	}

	/**
	  * If there are multiple scene nodes in this selector, it is possible to let it ignore one
	  * specific node, for example to prevent colliding it against itself.
	 */
	setNodeToIgnore(n) {
		this.NodeToIgnore = n;
	}
}
// ------------------------------------------------------------------------------------------------------
// Octtree selector
// ------------------------------------------------------------------------------------------------------

/**
 * @public
 */
class SOctTreeNode {
	constructor() {
		this.Triangles = new Array();
		this.Box = new Box3d();
		this.Child = new Array(); // always 8 childs
	}
}
/**
 * Implementation of TriangleSelector for huge meshes, useful for collision detection.
 * The internal structure of this mesh is an occtree, speeding up queries using an axis aligne box ({@link getTrianglesInBox}).
 * Every {@link SceneNode} may have a triangle selector, available with SceneNode::Selector. This is used for doing collision detection: 
 * For example if you know that a collision may have happened in the area between (1,1,1) and (10,10,10), you can get all triangles of the scene
 * node in this area with the TriangleSelector easily and check every triangle if it collided.<br/>
 * @class OctTree implementation of a triangle selector, useful for collision detection.
 * @public
 * @constructor
 * @extends CL3D.TriangleSelector
 * @param {CL3D.Mesh} Mesh the {@link Mesh} representing the geometry
 * @param {CL3D.SceneNode} scenenode the {@link SceneNode} representing the position of the geometry
 * @param {Number} minimalPolysPerNode (optional) minmal polygons per oct tree node. Default is 64.
 * @param materialToIgnore {Number} (optional) material type to ignore for collision. Can be set to null.
 * @param materialToIgnore2 {Number} (optional) material type to ignore for collision. Can be set to null.
 */
class OctTreeTriangleSelector extends TriangleSelector {
	constructor(mesh, scenenode, minimalPolysPerNode, materialToIgnore, materialToIgnore2) {
		super();

		this.DebugNodeCount = 0;
		this.DebugPolyCount = 0;

		if (minimalPolysPerNode == null)
			this.MinimalPolysPerNode = 64;

		else
			this.MinimalPolysPerNode = minimalPolysPerNode;

		if (!mesh)
			return;

		this.Node = scenenode;
		this.Root = new SOctTreeNode();
		this.Triangles = new Array(); // Additional array to store all triangles to be able to return all quickly without iterating the tree



		// create triangle array
		for (var b = 0; b < mesh.MeshBuffers.length; ++b) {
			var mb = mesh.MeshBuffers[b];
			if (mb) {
				if (materialToIgnore != null && mb.Mat && mb.Mat.Type == materialToIgnore)
					continue;

				if (materialToIgnore2 != null && mb.Mat && mb.Mat.Type == materialToIgnore2)
					continue;

				var idxcnt = mb.Indices.length;
				for (var j = 0; j < idxcnt; j += 3) {
					var vtx1 = mb.Vertices[mb.Indices[j]];
					var vtx2 = mb.Vertices[mb.Indices[j + 1]];
					var vtx3 = mb.Vertices[mb.Indices[j + 2]];

					var tri = new Triangle3d(vtx1.Pos, vtx2.Pos, vtx3.Pos);
					this.Root.Triangles.push(tri);
					this.Triangles.push(tri); // also store all triangles in a separate array to be able to retrieve all later
				}
			}
		}

		this.constructTree(this.Root);

		//console.log("Constructed Octtree with " + this.DebugNodeCount + 
		//	" nodes and triangles:" + this.DebugPolyCount);
	}

	/**
	 * @public
	 */
	constructTree(node) {
		++this.DebugNodeCount;

		node.Box.MinEdge = node.Triangles[0].pointA.clone();
		node.Box.MaxEdge = node.Box.MinEdge.clone();

		var tri;
		var cnt = node.Triangles.length;

		for (var i = 0; i < cnt; ++i) {
			tri = node.Triangles[i];
			node.Box.addInternalPointByVector(tri.pointA);
			node.Box.addInternalPointByVector(tri.pointB);
			node.Box.addInternalPointByVector(tri.pointC);
		}

		if (!node.Box.MinEdge.equals(node.Box.MaxEdge) && cnt > this.MinimalPolysPerNode) {
			var middle = node.Box.getCenter();
			var edges = node.Box.getEdges();
			var box = new Box3d();

			for (var ch = 0; ch < 8; ++ch) {
				var keepTriangles = new Array();
				box.MinEdge = middle.clone();
				box.MaxEdge = middle.clone();
				box.addInternalPointByVector(edges[ch]);

				node.Child.push(new SOctTreeNode());

				for (var i = 0; i < node.Triangles.length; ++i) {
					tri = node.Triangles[i];

					if (tri.isTotalInsideBox(box))
						node.Child[ch].Triangles.push(tri);

					else
						keepTriangles.push(tri);
				}

				node.Triangles = keepTriangles;

				if (node.Child[ch].Triangles.length == 0)
					node.Child[ch] = null;

				else
					this.constructTree(node.Child[ch]);
			}
		}

		this.DebugPolyCount += node.Triangles.length;
	}

	/**
	 * Returns all triangles for the scene node associated with this selector
	 * @public
	 * @param transform {CL3D.Matrix4} a transformation matrix which transforms all triangles before returning them
	 * @param outArray {Array} output array of the triangles
	 * @returns the new CL3D.TriangleSelector
	 */
	getAllTriangles(transform, outArray) {
		MeshTriangleSelector.prototype.getAllTriangles.call(this, transform, outArray);
	}

	/**
	 * Returns all triangles inside a bounding box, for the scene node associated with this selector. This method will
	 * return at least the triangles that intersect the box, but may return other triangles as well.
	 * @public
	 * @param {CL3D.Box3d}  box
	 * @param {CL3D.Matrix4} transform a transformation matrix which transforms all triangles before returning them
	 * @param {Array} outArray output array of the triangles
	 */
	getTrianglesInBox(box, transform, outArray) {
		if (!this.Node.AbsoluteTransformation)
			return;

		var mat = new Matrix4();
		var invbox = box.clone();

		if (this.Node) {
			mat = this.Node.getAbsoluteTransformation().clone();
			mat.makeInverse();
			mat.transformBoxEx(invbox);
		}

		mat.makeIdentity();

		if (transform)
			mat = transform.clone();

		if (this.Node)
			mat = mat.multiply(this.Node.getAbsoluteTransformation());

		if (this.Root) {
			this.getTrianglesFromOctTree(this.Root, outArray, invbox, mat);
		}
	}

	/**
	 * @public
	 */
	getTrianglesFromOctTree(node, outArray, box, transform) {
		if (!node.Box.intersectsWithBox(box))
			return;

		var cnt = node.Triangles.length;

		var i;

		if (transform.isIdentity()) {
			// copy directly
			for (i = 0; i < cnt; ++i)
				outArray.push(node.Triangles[i]);
		}

		else {
			// transform before copying
			if (transform.isTranslateOnly()) {
				// translate only
				for (i = 0; i < cnt; ++i) {
					outArray.push(new Triangle3d(
						transform.getTranslatedVect(node.Triangles[i].pointA),
						transform.getTranslatedVect(node.Triangles[i].pointB),
						transform.getTranslatedVect(node.Triangles[i].pointC)));
				}
			}

			else {
				// do full transform
				for (i = 0; i < cnt; ++i) {
					outArray.push(new Triangle3d(
						transform.getTransformedVect(node.Triangles[i].pointA),
						transform.getTransformedVect(node.Triangles[i].pointB),
						transform.getTransformedVect(node.Triangles[i].pointC)));
				}
			}
		}

		// also for children
		for (i = 0; i < node.Child.length; ++i) {
			var c = node.Child[i];
			if (c != null)
				this.getTrianglesFromOctTree(c, outArray, box, transform);
		}
	}

	/**
	  * Returns the scenenode this selector is for
	  * @returns returns {@link SceneNode} if this selector is for a specific scene node
	 */
	getRelatedSceneNode() {
		return this.Node;
	}

	/**
	 * @public
	 */
	createOcTreeNodeClone(toclone) {
		var clone = new SOctTreeNode();
		clone.Triangles = toclone.Triangles;
		clone.Box = toclone.Box.clone();

		for (var i = 0; i < toclone.Child.length; ++i) {
			var c = toclone.Child[i];
			var clonedchild = null;

			if (c)
				clonedchild = this.createOcTreeNodeClone(c);

			clone.Child.push(clonedchild);
		}

		return clone;
	}

	/**
	  * Creates a clone of this triangle selector, for a new scene node
	  * @param node {CL3D.SceneNode} scene node the selector is based on
	  * @returns returns {@link TriangleSelector} if this selector can be cloned or null if not
	 */
	createClone(node) {
		var clone = new OctTreeTriangleSelector(null, node, this.MinimalPolysPerNode);

		clone.Node = node;
		clone.Triangles = this.Triangles;
		clone.Root = null;

		if (this.Root)
			clone.Root = this.createOcTreeNodeClone(this.Root);

		return clone;
	}
}

let createContextImpl = () => { };

if (typeof globalThis.WebGLRenderingContext == "undefined") ;
else {
    createContextImpl = (width, height, options, canvas) => {
        width = width | 0;
        height = height | 0;
        if (!(width > 0 && height > 0)) {
            return null;
        }

        if (!canvas) {
            return null;
        }

        /**
         * @type WebGLRenderingContext
         */
        let gl;
        canvas.width = width;
        canvas.height = height;

        try {
            gl = canvas.getContext('webgl2', options);
        } catch (e) {
            console.log(e);
        }

        const _getExtension = gl.getExtension;
        const extDestroy = {
            destroy: function () {
                const loseContext = _getExtension.call(gl, 'WEBGL_lose_context');
                if (loseContext) {
                    loseContext.loseContext();
                }
            }
        };

        const extResize = {
            resize: function (w, h) {
                canvas.width = w;
                canvas.height = h;
            }
        };

        const _supportedExtensions = gl.getSupportedExtensions().slice();
        _supportedExtensions.push(
            'STACKGL_destroy_context',
            'STACKGL_resize_drawingbuffer');
        gl.getSupportedExtensions = function () {
            return _supportedExtensions.slice();
        };

        gl.getExtension = function (extName) {
            const name = extName.toLowerCase();
            if (name === 'stackgl_resize_drawingbuffer') {
                return extResize;
            }
            if (name === 'stackgl_destroy_context') {
                return extDestroy;
            }
            return _getExtension.call(gl, extName);
        };

        return gl || null;
    };
}

/**
 * @param {Number} width 
 * @param {Number} height 
 * @param {WebGLContextAttributes} options 
 * @param {HTMLCanvasElement} canvas 
 * @returns {WebGLRenderingContext|WebGL2RenderingContext|import('3d-core-raub').TCore3D}
 */
const createContext = (width, height, options, canvas) => {
    return createContextImpl(width, height, options, canvas);
};

let createCanvasImpl = () => { };

if (typeof globalThis.HTMLCanvasElement == "undefined") {
    await import('canvas').then(async (module) => {
        createCanvasImpl = (width, height) => {
            return module.default.createCanvas(width, height);
        };
    });
}
else {
    createCanvasImpl = (width, height) => {
        return Object.assign(document.createElement('canvas'), { width: width, height: height });
    };
}

/**
 * @param {Number=} width 
 * @param {Number=} height 
 * @returns {HTMLCanvasElement}
 */
const createCanvas = (width, height) => {
    return createCanvasImpl(width, height);
};

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt
// This file is part of the CopperLicht engine, (c) by N.Gebhardt


const GLSL$2 = String.raw;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Renderer
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 3D renderer, interface for drawing 3d geometry.
 * @constructor
 * @class 3D renderer, interface for drawing 3d geometry. You can access this using {@link CopperLicht}.getRenderer().
 * @public
 */
class Renderer {
	// to add shader validation compatible shaders:
	// http://www.khronos.org/webgl/public-mailing-list/archives/1007/msg00034.html
	// add this on top of every shader:
	// #ifdef GL_ES
	// precision highp float;
	// #endif
	// The GL_ES define is not present on desktop, so that line is ignored; however it is present
	// when running under validation, because the translator implements GLSL ES.  Note that the precision qualifiers will have // no effect on the desktop (I believe they're just ignored by the translator), but may have an impact on mobile.

	// drawing 2d rectangles with a color and a position only
	vs_shader_2ddrawing_coloronly = GLSL$2`
	//#version 100
	precision mediump float;

	attribute vec4 vPosition;

    void main()
    {
        gl_Position = vPosition;
    }`;

	// drawing 2d rectangles with an image only
	vs_shader_2ddrawing_texture = GLSL$2`
	//#version 100
	precision mediump float;

	attribute vec4 vPosition;
	attribute vec4 vTexCoord1;
	varying vec2 v_texCoord1;

    void main()
    {
        gl_Position = vPosition;
		v_texCoord1 = vTexCoord1.st;
    }`;

	// 2D Fragment shader: simply set the color from a shader parameter (used for 2d drawing rectangles)
	fs_shader_simplecolor = GLSL$2`
	//#version 100
	precision mediump float;

	uniform vec4 vColor;

    void main()
    {
        gl_FragColor = vColor;
	}`;

	// 2D fragment shader for drawing fonts: The font texture is white/gray on black. Draw the font using the white as alpha,
	// multiplied by a color as parameter
	fs_shader_2ddrawing_canvasfont = GLSL$2`
	//#version 100
	precision mediump float;

	uniform vec4 vColor;
	uniform sampler2D texture1;
	uniform sampler2D texture2;

    varying vec2 v_texCoord1;

    void main()
    {
	    vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
        float alpha = texture2D(texture1, texCoord).r;
        gl_FragColor = vec4(vColor.rgb, alpha);
    }`;


	// simple normal 3d world 3d transformation shader
	vs_shader_normaltransform = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;

	attribute vec4 vPosition;
    attribute vec4 vNormal;
	attribute vec4 vColor;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
		v_color = vColor;
        gl_Position = worldviewproj * vPosition;
        v_texCoord1 = vTexCoord1.st;
		v_texCoord2 = vTexCoord2.st;
    }`;

	// just like vs_shader_normaltransform but moves the positions a bit, like grass by the wind
	vs_shader_normaltransform_movegrass = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;
	uniform mat4 worldtransform;
	uniform float grassMovement;
	uniform float windStrength;

	attribute vec4 vPosition;
    attribute vec4 vNormal;
	attribute vec4 vColor;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
		v_color = vColor;
		vec4 grasspos = vPosition;
		grasspos.x += sin(grassMovement + ((worldtransform[3].x + vPosition.x) / 10.0)) * (1.0 - vTexCoord1.y) * windStrength;
        gl_Position = worldviewproj * grasspos;
        v_texCoord1 = vTexCoord1.st;
		v_texCoord2 = vTexCoord2.st;
    }`;

	// reusable part of vertex shaders calculating the light from directional, ambient and up to 4 point lights
	// our lighting works like this:
	// vertexToLight = lightPos - vertexPos;
	// distance = length(vertexToLight)
	// distanceFact = 1 /( lightAttenuation * distance )
	// vertexToLight = normalize(vertexToLight)
	// angle = sin(normal.dotproduct(vertexToLight));
	// if (angle < 0) angle = 0;
	// intensity = angle * distanceFact;
	// color = intensity * lightcolor;
	vs_shader_light_part = GLSL$2`
	vec3 n = normalize(vec3(vNormal.xyz));
	vec4 currentLight = vec4(0, 0, 0, 1.0);
	for(int i=0; i<4; ++i)
	{
		vec3 lPos = vec3(arrLightPositions[i].xyz);
		vec3 vertexToLight = lPos - vec3(vPosition.xyz);
		float distance = length( vertexToLight );
		float distanceFact = 1.0 / (arrLightPositions[i].w * distance);
		vertexToLight = normalize(vertexToLight);
		float angle = max(0.0, dot(n, vertexToLight));
		float intensity = angle * distanceFact * 0.25;
		currentLight = currentLight + vec4(arrLightColors[i].x*intensity, arrLightColors[i].y*intensity, arrLightColors[i].z*intensity, 1.0);
	}

	// directional light
	float dirlight = max(0.0, dot(n, vecDirLight));
	currentLight = currentLight + vec4(colorDirLight.x*dirlight, colorDirLight.y*dirlight, colorDirLight.z*dirlight, 1.0) * vec4(0.25, 0.25, 0.25, 1.0);

	// ambient light
	//currentLight = max(currentLight,arrLightColors[4]);
	//currentLight = min(currentLight, vec4(1.0,1.0,1.0,1.0));
	currentLight = currentLight + arrLightColors[4];

	// backface value for shadow map back culling
	v_backfaceValue = dirlight;
	`;

	// simple normal 3d world 3d transformation shader, which also calculates the light of up to 4 point light sources
	vs_shader_normaltransform_with_light = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;
	uniform vec4 arrLightPositions[4];
	uniform vec4 arrLightColors[5];
	uniform vec3 vecDirLight;
	uniform vec4 colorDirLight;

	attribute vec4 vPosition;
    attribute vec4 vNormal;
	attribute vec4 vColor;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;
	varying float v_backfaceValue;

    void main()
    {
        gl_Position = worldviewproj * vPosition;
        v_texCoord1 = vTexCoord1.st;
		v_texCoord2 = vTexCoord2.st;

		${this.vs_shader_light_part}

		currentLight = currentLight * vec4(vColor.x, vColor.y, vColor.z, 1.0) * 4.0;
		v_color = min(currentLight, vec4(1.0,1.0,1.0,1.0));
		v_color.a = vColor.a;	// preserve vertex alpha
    }`;

	// simple normal 3d world 3d transformation shader
	vs_shader_normaltransform_gouraud = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;

	attribute vec4 vPosition;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;
	attribute vec4 vNormal;
	attribute vec4 vColor;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        gl_Position = worldviewproj * vPosition;
        v_texCoord1 = vTexCoord1.st;
		v_texCoord2 = vTexCoord2.st;
		v_color = vColor;
    }`;


	// 3d world 3d transformation shader generating a reflection in texture coordinate 2
	// normaltransform is the inverse transpose of the upper 3x3 part of the modelview matrix.
	//
	// this is based on
	// D3DTSS_TCI_CAMERASPACEREFLECTIONVECTOR from D3D9:
	// Use the reflection vector, transformed to camera space, as input texture coordinates.
	// The reflection vector is computed from the input vertex position and normal vector.
	vs_shader_reflectiontransform = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;
	uniform mat4 normaltransform;
	uniform mat4 modelviewtransform;
	uniform mat4 worldtransform;

	attribute vec4 vPosition;
    attribute vec3 vNormal;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
		gl_Position = worldviewproj * vPosition;

		//	use reflection
		vec3 pos = normalize((modelviewtransform * vPosition).xyz);
		vec3 n = normalize((normaltransform * vec4(vNormal, 1)).xyz);
		vec3 r = reflect( pos.xyz, n.xyz );
		float m = sqrt( r.x*r.x + r.y*r.y + (r.z+1.0)*(r.z+1.0) );

		//	texture coordinates
		v_texCoord1 = vTexCoord1.st;
		v_texCoord2.x = (r.x / (2.0 * m)  + 0.5);
		v_texCoord2.y = (r.y / (2.0 * m)  + 0.5);
	}`;


	// same shader as before, but now with light
	vs_shader_reflectiontransform_with_light = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;
	uniform mat4 normaltransform;
	uniform mat4 modelviewtransform;
	uniform vec4 arrLightPositions[4];
	uniform vec4 arrLightColors[5];
	uniform vec3 vecDirLight;
	uniform vec4 colorDirLight;

	attribute vec4 vPosition;
    attribute vec3 vNormal;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;
	varying float v_backfaceValue;

    void main()
    {
        gl_Position = worldviewproj * vPosition;

		//	use reflection
		vec3 pos = normalize((modelviewtransform * vPosition).xyz);
		vec3 nt = normalize((normaltransform * vec4(vNormal, 1)).xyz);
		vec3 r = reflect( pos.xyz, nt.xyz );
		float m = sqrt( r.x*r.x + r.y*r.y + (r.z+1.0)*(r.z+1.0) );
		//	texture coordinates
		v_texCoord1 = vTexCoord1.st;
		v_texCoord2.x = r.x / (2.0 * m)  + 0.5;
		v_texCoord2.y = r.y / (2.0 * m)  + 0.5;

		${this.vs_shader_light_part}

		v_color = min(currentLight, vec4(1.0,1.0,1.0,1.0));
    }`;

	// same as vs_shader_normaltransform_with_light but alsow with grass movement
	vs_shader_normaltransform_with_light_movegrass = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;
	uniform mat4 worldtransform;
	uniform vec4 arrLightPositions[4];
	uniform vec4 arrLightColors[5];
	uniform vec3 vecDirLight;
	uniform vec4 colorDirLight;
	uniform float grassMovement;
	uniform float windStrength;

	attribute vec4 vPosition;
    attribute vec4 vNormal;
	attribute vec4 vColor;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;
	varying float v_backfaceValue;

    void main()
    {
		vec4 grasspos = vPosition;
		grasspos.x += sin(grassMovement + ((worldtransform[3].x + vPosition.x) / 10.0)) * (1.0 - vTexCoord1.y) * windStrength;
        gl_Position = worldviewproj * grasspos;
        v_texCoord1 = vTexCoord1.st;
		v_texCoord2 = vTexCoord2.st;

		${this.vs_shader_light_part}

		currentLight = currentLight * vec4(vColor.x, vColor.y, vColor.z, 1.0);

		v_color = min(currentLight * 4.0, vec4(1.0,1.0,1.0,1.0));
		v_color.a = vColor.a;	// preserve vertex alpha
    }`;

	// normal mapped material
	vs_shader_normalmappedtransform = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;
	uniform mat4 normaltransform;
	uniform mat4 worldtransform;
	uniform vec4 arrLightPositions[4];
	uniform vec4 arrLightColors[5];

	attribute vec4 vPosition;
    attribute vec3 vNormal;
	attribute vec4 vColor;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;
	attribute vec3 vBinormal;
	attribute vec3 vTangent;

	// Output:
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;
	varying vec3 v_lightVector[4];
	varying vec3 v_lightColor[4];
	varying vec3 ambientLight;

    void main()
    {
        gl_Position = worldviewproj * vPosition;
        v_texCoord1 = vTexCoord1.st;
		v_texCoord2 = vTexCoord2.st;

		vec4 pos = vec4(dot(vPosition, worldtransform[0]), dot(vPosition, worldtransform[1]), dot(vPosition, worldtransform[2]), dot(vPosition, worldtransform[3]));

		// transform normal, binormal and tangent
		vec3 normal = vec3(dot(vNormal.xyz, worldtransform[0].xyz), dot(vNormal.xyz, worldtransform[1].xyz), dot(vNormal.xyz, worldtransform[2].xyz));
		vec3 tangent = vec3(dot(vTangent.xyz, worldtransform[0].xyz), dot(vTangent.xyz, worldtransform[1].xyz), dot(vTangent.xyz, worldtransform[2].xyz));
		vec3 binormal = vec3(dot(vBinormal.xyz, worldtransform[0].xyz), dot(vBinormal.xyz, worldtransform[1].xyz), dot(vBinormal.xyz, worldtransform[2].xyz));

		vec3 temp = vec3(0.0, 0.0, 0.0);
		for(int i=0; i<4; ++i)
		{
			vec3 lightPos = vec3(arrLightPositions[i].xyz);
			vec3 vertexToLight = lightPos - vec3(pos.xyz);

			// transform the light vector 1 with U, V, W
			temp.x = dot(tangent.xyz, vertexToLight);
			temp.y = dot(binormal.xyz, vertexToLight);
			temp.z = dot(normal.xyz, vertexToLight);

			// normalize light vector
			temp = normalize(temp);

			// move from -1..1 to 0..1 and put into output
			temp = temp * 0.5;
			temp = temp + vec3(0.5,0.5,0.5);
			v_lightVector[i] = temp;

			// calculate attenuation
			float distanceFact = 1.0 / sqrt(dot(vertexToLight, vertexToLight) * arrLightPositions[i].w);
			v_lightColor[i] = min(vec3(arrLightColors[i].x*distanceFact, arrLightColors[i].y*distanceFact, arrLightColors[i].z*distanceFact), vec3(1,1,1));
		}
		// ambient light
		ambientLight = arrLightColors[4].xyz;
    }`;

	fs_shader_onlyfirsttexture = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
        gl_FragColor = texture2D(texture1, texCoord);
    }`;

	fs_shader_onlyfirsttexture_gouraud = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
        gl_FragColor = texture2D(texture1, texCoord) * v_color * 4.0;
	}`;

	fs_shader_onlyfirsttexture_gouraud_alpharef = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 clr = texture2D(texture1, texCoord) * v_color;
		if(clr.a < 0.5)
			discard;
        gl_FragColor = clr * 4.0;
    }`;

	fs_shader_lightmapcombine = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);
		vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);
        vec4 col1 = texture2D(texture1, texCoord1);
		vec4 col2 = texture2D(texture2, texCoord2);
		gl_FragColor = col1 * col2 * 4.0;
    }`;

	fs_shader_lightmapcombine_m4 = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);
		vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);
        vec4 col1 = texture2D(texture1, texCoord1);
		vec4 col2 = texture2D(texture2, texCoord2);
		gl_FragColor = col1 * col2 * 3.0;
    }`;

	fs_shader_lightmapcombine_gouraud = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);
		vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);
        vec4 col1 = texture2D(texture1, texCoord1);
		vec4 col2 = texture2D(texture2, texCoord2);
		vec4 final = col1 * col2 * v_color * 4.0;
		gl_FragColor = vec4(final.x, final.y, final.z, col1.w);
    }`;

	fs_shader_normalmapped = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;
	varying vec3 v_lightVector[4];
	varying vec3 v_lightColor[4];
	varying vec3 ambientLight;

    void main()
    {
		vec4 colorMapSample = texture2D(texture1, v_texCoord1);
		vec3 normalMapVector = texture2D(texture2, v_texCoord1).xyz;
		//normalMapVector -= vec3(0.5, 0.5, 0.5);
		//normalMapVector = normalize(normalMapVector);
		normalMapVector *= vec3(2.0, 2.0, 2.0);
		normalMapVector -= vec3(1.0, 1.0, 1.0);

		vec3 totallight = vec3(0.0, 0.0, 0.0);
		for(int i=0; i<4; ++i)
		{
			// process light
			//vec3 lightvect = v_lightVector[i] + vec3(-0.5, -0.5, -0.5);
			vec3 lightvect = (v_lightVector[i] * vec3(2.0, 2.0, 2.0)) - vec3(1.0, 1.0, 1.0);
			lightvect = normalize(lightvect);
			float luminance = dot(lightvect, normalMapVector); // normal DOT light
			luminance = clamp(luminance, 0.0, 1.0);	// clamp result to positive numbers
			lightvect = luminance * v_lightColor[i];	// luminance * light color

			// add to previously calculated lights
			totallight = totallight + lightvect;
		}

		totallight = totallight + ambientLight;
		// 0.25 because of new modulatex4 mode
		gl_FragColor = colorMapSample * 0.25 * vec4(totallight.x, totallight.y, totallight.z, 0.0) * 4.0;
    }`;

	fs_shader_vertex_alpha_two_textureblend = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 color1 = texture2D(texture1, texCoord);
		vec4 color2 = texture2D(texture2, texCoord);
		color1 = ((1.0 - v_color.w) * color1) + (v_color.w * color2);	// interpolate texture colors based on vertex alpha
		gl_FragColor = color1 * v_color * 4.0;
    }`;

	// ----------------------------------------------------------------------------
	// Same shaders as above, but with fog
	// ----------------------------------------------------------------------------

	// the 1.442695 is because we use fixed function like exponential fog, like this:
	// Exponantial fog:
	//   const float LOG2E = 1.442695; // = 1 / log(2)
	//   fog = exp2(-gl_Fog.density * gl_FogFragCoord * LOG2E);
	// Exponantial squared fog:
	//   fog = exp2(-gl_Fog.density * gl_Fog.density * gl_FogFragCoord * gl_FogFragCoord * LOG2E);
	fs_shader_onlyfirsttexture_gouraud_fog = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
	uniform vec4 fogColor;
	uniform float fogDensity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 tmpFragColor = texture2D(texture1, texCoord) * v_color;
		float z = gl_FragCoord.z / gl_FragCoord.w;
		float fogFactor = clamp(exp2( -fogDensity * z * 1.442695), 0.0, 1.0);
		gl_FragColor = mix(fogColor, tmpFragColor * 4.0, fogFactor);
		gl_FragColor.a = tmpFragColor.a;
    }`;

	// see fs_shader_onlyfirsttexture_gouraud_fog for details
	fs_shader_lightmapcombine_fog = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
	uniform vec4 fogColor;
	uniform float fogDensity;

    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);
		vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);
        vec4 col1 = texture2D(texture1, texCoord1);
		vec4 col2 = texture2D(texture2, texCoord2);
		vec4 tmpFragColor = col1 * col2;
		float z = gl_FragCoord.z / gl_FragCoord.w;
		float fogFactor = clamp(exp2( -fogDensity * z * 1.442695), 0.0, 1.0);
		gl_FragColor = mix(fogColor, tmpFragColor * 4.0, fogFactor);
		gl_FragColor.a = tmpFragColor.a;
    }`;

	fs_shader_onlyfirsttexture_gouraud_alpharef_fog = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform vec4 fogColor;
	uniform float fogDensity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 tmpFragColor = texture2D(texture1, texCoord) * v_color;
		if(tmpFragColor.a < 0.5)
			discard;
		float z = gl_FragCoord.z / gl_FragCoord.w;
		float fogFactor = clamp(exp2( -fogDensity * z * 1.442695), 0.0, 1.0);
		gl_FragColor = mix(fogColor, tmpFragColor * 4.0, fogFactor);
		gl_FragColor.a = tmpFragColor.a;
    }`;

	fs_shader_lightmapcombine_m4_fog = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
	uniform vec4 fogColor;
	uniform float fogDensity;

    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);
		vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);
        vec4 col1 = texture2D(texture1, texCoord1);
		vec4 col2 = texture2D(texture2, texCoord2);
		vec4 tmpFragColor = col1 * col2 * 3.0;
		float z = gl_FragCoord.z / gl_FragCoord.w;
		float fogFactor = clamp(exp2( -fogDensity * z * 1.442695), 0.0, 1.0);
		gl_FragColor = mix(fogColor, tmpFragColor * 4.0, fogFactor);
		gl_FragColor.a = tmpFragColor.a;
    }`;

	fs_shader_vertex_alpha_two_textureblend_fog = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
	uniform vec4 fogColor;
	uniform float fogDensity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 color1 = texture2D(texture1, texCoord);
		vec4 color2 = texture2D(texture2, texCoord);
		color1 = ((1.0 - v_color.w) * color1) + (v_color.w * color2);	// interpolate texture colors based on vertex alpha
		vec4 tmpFragColor = color1 * v_color;
		float z = gl_FragCoord.z / gl_FragCoord.w;
		float fogFactor = clamp(exp2( -fogDensity * z * 1.442695), 0.0, 1.0);
		gl_FragColor = mix(fogColor, tmpFragColor * 4.0, fogFactor);
		gl_FragColor.a = tmpFragColor.a;
    }`;

	fs_shader_lightmapcombine_gouraud_fog = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
	uniform vec4 fogColor;
	uniform float fogDensity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;

    void main()
    {
        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);
		vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);
        vec4 col1 = texture2D(texture1, texCoord1);
		vec4 col2 = texture2D(texture2, texCoord2);
		vec4 final = col1 * col2 * v_color;
		vec4 tmpFragColor = vec4(final.x, final.y, final.z, col1.w);
		float z = gl_FragCoord.z / gl_FragCoord.w;
		float fogFactor = clamp(exp2( -fogDensity * z * 1.442695), 0.0, 1.0);
		gl_FragColor = mix(fogColor, tmpFragColor * 4.0, fogFactor);
		gl_FragColor.a = tmpFragColor.a;
    }`;

	// ----------------------------------------------------------------------------
	// Shadow map related shaders
	// ----------------------------------------------------------------------------

	// normal 3d world 3d transformation shader for drawing depth into a shadow map texture
	vs_shader_normaltransform_for_shadowmap = GLSL$2`
	//#version 100
	precision highp float;

	uniform mat4 worldviewproj;
	attribute vec4 vPosition;

    void main()
    {
        gl_Position = worldviewproj * vPosition;
    }`;

	fs_shader_draw_depth_shadowmap_depth = GLSL$2`
	//#version 100
	precision highp float;

    void main()
    {
		gl_FragColor = vec4(gl_FragCoord.z);
	}`;

	// like vs_shader_normaltransform_for_shadowmap but for alpha ref materials
	vs_shader_normaltransform_alpharef_for_shadowmap = GLSL$2`
	//#version 100
	precision highp float;

	uniform mat4 worldviewproj;
	attribute vec4 vPosition;
	attribute vec2 vTexCoord1;

	varying vec2 v_texCoord1;

    void main()
    {
		v_texCoord1 = vTexCoord1.st;
        gl_Position = worldviewproj * vPosition;
    }`;

	// like vs_shader_normaltransform_alpharef_for_shadowmap but with moving grass
	vs_shader_normaltransform_alpharef_moving_grass_for_shadowmap = GLSL$2`
	//#version 100
	precision highp float;

	uniform mat4 worldviewproj;
	attribute vec4 vPosition;
	attribute vec2 vTexCoord1;
	uniform float grassMovement;
	uniform float windStrength;
	uniform mat4 worldtransform;

	varying vec2 v_texCoord1;

    void main()
    {
		vec4 grasspos = vPosition;
		grasspos.x += sin(grassMovement + ((worldtransform[3].x + vPosition.x) / 10.0)) * (1.0 - vTexCoord1.y) * windStrength;
        gl_Position = worldviewproj * grasspos;
		v_texCoord1 = vTexCoord1.st;
	}`;

	// like fs_shader_draw_depth_shadowmap_depth but for alpha ref materials
	fs_shader_alpharef_draw_depth_shadowmap_depth = GLSL$2`
	//#version 100
	precision highp float;

	varying vec2 v_texCoord1;
	uniform sampler2D texture1;

    void main()
    {
		vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 diffuseColor = texture2D(texture1, texCoord);
		if (diffuseColor.a < 0.5) discard;
		gl_FragColor = vec4(gl_FragCoord.z);
	}`;

	// we only need to write gl_FragCoord.z for float rtt, but dont
	// use those and pack this into rgba in case we have no floating point support:
	fs_shader_draw_depth_shadowmap_rgbapack = GLSL$2`
	//#version 100
	precision highp float;

    void main()
    {
		 const vec4 bitShift = vec4(1.0, 256.0, 256.0*256.0, 256.0*256.0*256.0);
		 const vec4 bitMask = vec4(1.0/256.0, 1.0/256.0, 1.0/256.0, 0.0);
		 vec4 rgbavalue = fract(gl_FragCoord.z * bitShift);
		 rgbavalue -= rgbavalue.gbaa * bitMask;
		 gl_FragColor = rgbavalue;
    }`;

	// normal transformation and lighting of an object (like vs_shader_normaltransform_with_light)
	// with additional computation of the lookup coordinate in the rendered shadow map.
	vs_shader_normaltransform_with_shadowmap_lookup = GLSL$2`
	//#version 100
	precision highp float;

	uniform mat4 worldviewproj;
	uniform mat4 worldviewprojLight;
	uniform mat4 worldviewprojLight2;
	uniform vec4 arrLightPositions[4];
	uniform vec4 arrLightColors[5];
	uniform vec3 vecDirLight;
	uniform vec4 colorDirLight;

	attribute vec4 vPosition;
    attribute vec4 vNormal;
	attribute vec4 vColor;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying float v_backfaceValue;
	varying vec4 v_posFromLight;	 // position on shadow map
	varying vec4 v_posFromLight2;	 // position on 2nd shadow map

    void main()
    {
        gl_Position = worldviewproj * vPosition;
        v_texCoord1 = vTexCoord1.st;

		// Calculate position on shadow map
		v_posFromLight = worldviewprojLight * vPosition;
		v_posFromLight2 = worldviewprojLight2 * vPosition;

		${this.vs_shader_light_part}

		currentLight = currentLight * vec4(vColor.x, vColor.y, vColor.z, 1.0);
		v_color = min(currentLight * 4.0, vec4(1.0,1.0,1.0,1.0));
		v_color.a = vColor.a;	// preserve vertex alpha
    }`;

	// like fs_shader_onlyfirsttexture_gouraud_fog but also with shadow map
	fs_shader_onlyfirsttexture_gouraud_fog_shadow_map_rgbpack = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D shadowmap;
	uniform sampler2D shadowmap2;
	uniform vec4 fogColor;
	uniform float fogDensity;
	uniform float shadowMapBias1;
	uniform float shadowMapBias2;
	uniform float shadowMapBackFaceBias;
	uniform float shadowOpacity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying float v_backfaceValue;
	varying vec4 v_posFromLight;

	float unpackFromRGBA(const in vec4 valuein) {
		const vec4 bitShift = vec4(1.0, 1.0/256.0, 1.0/(256.0*256.0), 1.0/(256.0*256.0*256.0));
		return dot(valuein, bitShift);
	}

    void main()
    {
		// diffuse texture
		vec4 diffuseColor = texture2D(texture1, v_texCoord1) * v_color;

		// shadow map lookup
		float perpDiv = v_posFromLight.w;
		vec3 shadowCoord = (v_posFromLight.xyz / perpDiv) * 0.5 + 0.5;
		shadowCoord = clamp(shadowCoord, vec3(0.0,0.0,0.0), vec3(1.0,1.0,1.0));
		vec4 shadowMapColor = texture2D(shadowmap, shadowCoord.xy);
		float shadowDepth = unpackFromRGBA(shadowMapColor);

		float distanceFromLight = shadowCoord.z;
		float visibility = 1.0 - (shadowOpacity * step(shadowMapBias1, shadowCoord.z - shadowDepth));

		gl_FragColor = diffuseColor * visibility;
		gl_FragColor.a = diffuseColor.a;
	}`;

	// header part for shadow maps above main function. Can be used to add test functions for shadow mapping
	fs_shader_shadowmap_header_part = GLSL$2`
	`;

	// reusable part for calculating the shadow color
	// version for testing cascade shadow maps:
	// version with cascade shadow maps

	fs_shader_shadowmap_part = GLSL$2`
		// shadow map 1 lookup
		vec3 shadowCoord = (v_posFromLight.xyz / v_posFromLight.w) * 0.5 + 0.5;
		float brightnessFactor = 1.0; // when we have shadows, everthing is a bit darker, so compensate for this

		float visibility = 0.0;

		// now decide which map to use
		if (v_backfaceValue < shadowMapBackFaceBias)
		{
			// backface, no shadow needed there
			visibility = 1.0;
		}
		else
		// if (shadowCoord.x < 0.0 || shadowCoord.x > 1.0 || shadowCoord.y < 0.0 || shadowCoord.y > 1.0)
		// same as:
		if ( ((1.0 - step(1.0, shadowCoord.x)) * (step(0.0, shadowCoord.x)) *
				(1.0 - step(1.0, shadowCoord.y)) * (step(0.0, shadowCoord.y))) < 0.5)
		{
			// use shadowmap 2
			vec3 shadowCoord2 = (v_posFromLight2.xyz / v_posFromLight2.w) * 0.5 + 0.5;
			vec4 shadowMapColor = texture2D(shadowmap2, shadowCoord2.xy);
			float shadowDepth = shadowMapColor.r;

			visibility = 1.0 - (shadowOpacity * step(shadowMapBias2, shadowCoord2.z - shadowDepth));
		}
		else
		{
			// use shadowmap 1
			vec4 shadowMapColor = texture2D(shadowmap, shadowCoord.xy);
			float shadowDepth = shadowMapColor.r;

			visibility = 1.0 - (shadowOpacity * step(shadowMapBias1, shadowCoord.z - shadowDepth));
		}

		vec4 colorWithShadow = diffuseColor * visibility * brightnessFactor;
		`;
	// version without cascade shadow maps




	// reusable part for mixing fog and shadow
	fs_shader_mixdiffusefogandshadow_part = GLSL$2`
	// fog
	float z = gl_FragCoord.z / gl_FragCoord.w;
	float fogFactor = clamp(exp2( -fogDensity * z * 1.442695), 0.0, 1.0);
	colorWithShadow = mix(fogColor, colorWithShadow, fogFactor);

	gl_FragColor = colorWithShadow * 4.0;
	gl_FragColor.a = diffuseColor.a;
	`;


	// Like fs_shader_onlyfirsttexture_gouraud_fog_shadow_map_rgbpack but with floating point tests
	fs_shader_onlyfirsttexture_gouraud_fog_shadow_map = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D shadowmap;
	uniform sampler2D shadowmap2;
	uniform vec4 fogColor;
	uniform float fogDensity;
	uniform float shadowMapBias1;
	uniform float shadowMapBias2;
	uniform float shadowMapBackFaceBias;
	uniform float shadowOpacity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying float v_backfaceValue;
	varying vec4 v_posFromLight;
	varying vec4 v_posFromLight2;

	${this.fs_shader_shadowmap_header_part}

    void main()
    {
		// diffuse texture
		vec4 diffuseColor = texture2D(texture1, v_texCoord1) * v_color;

    	${this.fs_shader_shadowmap_part}
		${this.fs_shader_mixdiffusefogandshadow_part}
	}`;

	// like fs_shader_vertex_alpha_two_textureblend_fog but with shadow map support
	fs_shader_vertex_alpha_two_textureblend_fog_shadow_map = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
	uniform sampler2D shadowmap;
	uniform sampler2D shadowmap2;
	uniform vec4 fogColor;
	uniform float fogDensity;
	uniform float shadowMapBias1;
	uniform float shadowMapBias2;
	uniform float shadowMapBackFaceBias;
	uniform float shadowOpacity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;
	varying float v_backfaceValue;
	varying vec4 v_posFromLight;
	varying vec4 v_posFromLight2;

	${this.fs_shader_shadowmap_header_part}

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 color1 = texture2D(texture1, texCoord);
		vec4 color2 = texture2D(texture2, texCoord);
		color1 = ((1.0 - v_color.w) * color1) + (v_color.w * color2);	// interpolate texture colors based on vertex alpha
		vec4 diffuseColor = color1 * v_color;

    ${this.fs_shader_shadowmap_part}
	${this.fs_shader_mixdiffusefogandshadow_part}
	}`;

	// like fs_shader_onlyfirsttexture_gouraud_alpharef_fog but with shadow map support
	fs_shader_onlyfirsttexture_gouraud_alpharef_fog_shadow_map = GLSL$2`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform sampler2D shadowmap;
	uniform sampler2D shadowmap2;
	uniform vec4 fogColor;
	uniform float fogDensity;
	uniform float shadowMapBias1;
	uniform float shadowMapBias2;
	uniform float shadowMapBackFaceBias;
	uniform float shadowOpacity;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying float v_backfaceValue;
	varying vec4 v_posFromLight;
	varying vec4 v_posFromLight2;

	${this.fs_shader_shadowmap_header_part}

    void main()
    {
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);
		vec4 diffuseColor = texture2D(texture1, texCoord) * vec4(v_color.r, v_color.g, v_color.b, 1.0);
		if (diffuseColor.a < 0.5) discard;

	${this.fs_shader_shadowmap_part}
	${this.fs_shader_mixdiffusefogandshadow_part}
	}`;

	// same as vs_shader_normaltransform_with_light_movegrass but with shadow map loopup
	vs_shader_normaltransform_with_light_movegrass_with_shadowmap_lookup = GLSL$2`
	//#version 100
	precision mediump float;

	uniform mat4 worldviewproj;
	uniform mat4 worldtransform;
	uniform mat4 worldviewprojLight;
	uniform mat4 worldviewprojLight2;
	uniform vec4 arrLightPositions[4];
	uniform vec4 arrLightColors[5];
	uniform vec3 vecDirLight;
	uniform vec4 colorDirLight;
	uniform float grassMovement;
	uniform float windStrength;

	attribute vec4 vPosition;
    attribute vec4 vNormal;
	attribute vec4 vColor;
    attribute vec2 vTexCoord1;
	attribute vec2 vTexCoord2;

	varying vec4 v_color;
    varying vec2 v_texCoord1;
	varying vec2 v_texCoord2;
	varying float v_backfaceValue;
	varying vec4 v_posFromLight;	 // position on shadow map
	varying vec4 v_posFromLight2;	 // position on 2nd shadow map

    void main()
    {
		vec4 grasspos = vPosition;
		grasspos.x += sin(grassMovement + ((worldtransform[3].x + vPosition.x) / 10.0)) * (1.0 - vTexCoord1.y) * windStrength;
        gl_Position = worldviewproj * grasspos;
        v_texCoord1 = vTexCoord1.st;
		v_texCoord2 = vTexCoord2.st;
		// Calculate position on shadow map
		v_posFromLight = worldviewprojLight * vPosition;
		v_posFromLight2 = worldviewprojLight2 * vPosition;

		${this.vs_shader_light_part}

		currentLight = currentLight * vec4(vColor.x, vColor.y, vColor.z, 1.0);
		v_color = min(currentLight * 4.0, vec4(1.0,1.0,1.0,1.0));
		v_color.a = vColor.a;	// preserve vertex alpha
	}`;

	OnChangeMaterial = null;

	/**
	 * Event handler called after the renderer switches to a specific material, useful for shader programming.
	 * You can use this to set the variables and uniforms in a custom shader by using this callback.
	 * The first parameter of the function is the material type id, which gets returned for example by createMaterialType().
	 * @example
	 * let engine = startCopperLichtFromFile(document.getElementById('3darea'), 'test.ccbjs');
	 *
	 * // [...] create a shader and material here using for example
	 * // let newMaterialType = engine.getRenderer().
	 * //    createMaterialType(vertex_shader_source, fragment_shader_source);
	 *
	 * // register callback function to set a variable in the new shader:
	 * // note that createMaterialType() also accepts a shadercallback function as parameters
	 * // which you could use instead of this approach.
	 * engine.getRenderer().OnChangeMaterial = function(mattype)
	 * {
	 *   let renderer = engine.getRenderer();
	 *   if (renderer && mattype == newMaterialType)
	 *   {
	 *      let gl = renderer.getWebGL();
	 *
	 *      // get variable location
	 *      let program = renderer.getGLProgramFromMaterialType(newMaterialType);
	 *      let variableLocation = gl.getUniformLocation(program, "test");
	 *
	 *      // set the content of the variable
	 *      gl.uniform1f(location, 1.23);
	 *   }
	 * };
	 * @public
	 */
	constructor(textureManager) {
		this.TheTextureManager = textureManager;
		/**
		 * @type {HTMLCanvasElement}
		 */
		this.canvas = null;
		/**
		 * @type {WebGLRenderingContext|WebGL2RenderingContext}
		 */
		this.gl = null;
		this.width = 0;
		this.height = 0;
		this.textureWasLoadedFlag = false;

		this.Projection = new Matrix4();
		this.View = new Matrix4();
		this.World = new Matrix4();

		this.AmbientLight = new ColorF();
		this.AmbientLight.R = 0.0;
		this.AmbientLight.G = 0.0;
		this.AmbientLight.B = 0.0;

		this.programStandardMaterial = null;
		this.programLightmapMaterial = null;

		this.MaterialPrograms = new Array();
		this.MaterialProgramsWithLight = new Array();
		this.MaterialProgramsFog = new Array();
		this.MaterialProgramsWithLightFog = new Array();
		this.MaterialProgramsWithShadowMap = new Array();
		this.MinExternalMaterialTypeId = 30;

		this.Program2DDrawingColorOnly = null;
		this.Program2DDrawingTextureOnly = null;
		this.Program2DDrawingCanvasFontColor = null;

		this.OnChangeMaterial = null;

		this.StaticBillboardMeshBuffer = null;

		this.Lights = new Array();
		this.DirectionalLight = null;

		// webgl specific
		this.currentGLProgram = null;

		this.domainTextureLoadErrorPrinted = false;

		this.printShaderErrors = true;

		this.CurrentRenderTarget = null;
		this.InvertedDepthTest = false;

		this.FogEnabled = false;
		this.FogColor = new ColorF();
		this.FogDensity = 0.01;

		this.WindSpeed = 1.0;
		this.WindStrength = 4.0;

		this.ShadowMapEnabled = false;
		this.ShadowMapTexture = null;
		this.ShadowMapTexture2 = null; // for second shadow buffer in case CL3D.UseShadowCascade is true
		this.ShadowMapLightMatrix = null;
		this.ShadowMapLightMatrix2 = null; // for second shadow buffer in case CL3D.UseShadowCascade is true
		this.ShadowMapUsesRGBPacking = false;
		this.ShadowMapBias1 = 0.000003;
		this.ShadowMapBias2 = 0.000003;
		this.ShadowMapBackFaceBias = 0.5;
		this.ShadowMapOpacity = 0.5;

		this.UsesWebGL2 = false;
	}
	/**
	 * Returns the current width of the rendering surface in pixels.
	 * @public
	 **/
	getWidth() {
		return this.width;
	}
	/**
	 * @public
	 */
	getAndResetTextureWasLoadedFlag() {
		let b = this.textureWasLoadedFlag;
		this.textureWasLoadedFlag = false;
		return b;
	}
	/**
	 * Returns access to the webgl interface. This should not be needed.
	 * @public
	 **/
	getWebGL() {
		return this.gl;
	}
	/**
	 * Returns the current height of the rendering surface in pixels.
	 * @public
	 **/
	getHeight() {
		return this.height;
	}
	/**
	 * @public
	 */
	registerFrame() {
		// TODO: fps counter here
	}
	/**
	 * Draws a {@link Mesh} with the current world, view and projection matrix.
	 * @public
	 * @param {CL3D.Mesh} mesh the mesh to draw
	 */
	drawMesh(mesh, forceNoShadowMap) {
		if (mesh == null)
			return;

		for (let i = 0; i < mesh.MeshBuffers.length; ++i) {
			let buf = mesh.MeshBuffers[i];
			this.setMaterial(buf.Mat, forceNoShadowMap);
			this.drawMeshBuffer(buf);
		}
	}
	/**
	 * Sets a material to activate for drawing 3d graphics.
	 * All 3d drawing functions will draw geometry using this material thereafter.
	 * @param {CL3D.Material} mat Material to set
	 * @public
	 */
	setMaterial(mat, forceNoShadowMap) {
		if (mat == null) {
			return;
		}

		let gl = this.gl;
		if (gl == null)
			return;

		// --------------------------------------------
		// set material
		let program = null;
		try {
			if (this.ShadowMapEnabled && !forceNoShadowMap)
				program = this.MaterialProgramsWithShadowMap[mat.Type];

			else if (this.FogEnabled) {
				if (mat.Lighting)
					program = this.MaterialProgramsWithLightFog[mat.Type];

				else
					program = this.MaterialProgramsFog[mat.Type];
			}

			else {
				if (mat.Lighting)
					program = this.MaterialProgramsWithLight[mat.Type];

				else
					program = this.MaterialPrograms[mat.Type];
			}
		}
		catch (e) {
		}

		if (program == null)
			return;

		this.currentGLProgram = program;
		gl.useProgram(program);

		// call callback function
		if (this.OnChangeMaterial != null) {
			try {
				this.OnChangeMaterial(mat.Type);
			}
			catch (e) { }
		}

		if (program.shaderCallback != null)
			program.shaderCallback();

		// set program blend mode
		if (program.blendenabled) {
			gl.enable(gl.BLEND);
			gl.blendFunc(program.blendsfactor, program.blenddfactor);
		}

		else
			gl.disable(gl.BLEND);

		// zwrite mode
		if (!mat.ZWriteEnabled || mat.doesNotUseDepthMap())
			gl.depthMask(false);

		else
			gl.depthMask(true);

		// zread mode
		if (mat.ZReadEnabled)
			gl.enable(gl.DEPTH_TEST);

		else
			gl.disable(gl.DEPTH_TEST);

		// depth function
		gl.depthFunc(this.InvertedDepthTest ? gl.GREATER : gl.LEQUAL);

		// backface culling
		if (mat.BackfaceCulling)
			gl.enable(gl.CULL_FACE);

		else
			gl.disable(gl.CULL_FACE);

		// -------------------------------------------
		// set textures
		// texture 1
		if (mat.Tex1 && mat.Tex1.Loaded) {
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, mat.Tex1.Texture);

			// texture clamping
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, mat.ClampTexture1 ? gl.CLAMP_TO_EDGE : gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, mat.ClampTexture1 ? gl.CLAMP_TO_EDGE : gl.REPEAT);
		}

		else {
			// not yet loaded or inactive
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0);

		// texture 2
		if (mat.Tex2 && mat.Tex2.Loaded) {
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, mat.Tex2.Texture);
		}

		else {
			// not yet loaded or inactive
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		gl.uniform1i(gl.getUniformLocation(program, "texture2"), 1);
	}
	/**
	 * Sets cull mode
	 * @param mode 1:font, 2:back (default), 3:front_and_back
	 * @public
	 */
	setCullMode(mode) {
		let gl = this.gl;
		let m = 0;

		if (mode == 1)
			m = gl.FRONT;

		else if (mode == 2)
			m = gl.BACK;

		else if (mode == 3)
			m = gl.FRONT_AND_BACK;

		gl.cullFace(m);
	}
	/**
	 * Draws a mesh buffer.
	 * Note, you might want to set the material of the mesh buffer before drawing it, use {@link setMaterial}()
	 * to do this before calling this function.
	 * @param {CL3D.MeshBuffer} buf the mesh buffer to draw.
	 * @public
	 */
	drawMeshBuffer(buf, indexCountToUse) {
		if (buf == null)
			return;

		if (this.gl == null)
			return;

		if (buf.RendererNativeArray == null)
			this.createRendererNativeArray(buf);

		else if (buf.OnlyUpdateBufferIfPossible)
			this.updateRendererNativeArray(buf);

		else if (buf.OnlyPositionsChanged)
			this.updatePositionsInRendererNativeArray(buf);

		buf.OnlyPositionsChanged = false;
		buf.OnlyUpdateBufferIfPossible = false;

		this.drawWebGlStaticGeometry(buf.RendererNativeArray, indexCountToUse);
	}
	/**
	 * Creates a mesh buffer native render array
	 * @public
	 */
	updateRendererNativeArray(buf) {
		if (buf.Vertices.length == 0 || buf.Indices.length == 0)
			return;

		if (buf.RendererNativeArray.vertexCount < buf.Vertices.length ||
			buf.RendererNativeArray.indexCount < buf.Indices.length) {
			buf.RendererNativeArray = null;
			this.createRendererNativeArray(buf);
			return;
		}

		if (buf.RendererNativeArray != null) {
			let gl = this.gl;
			let len = buf.Vertices.length;

			let positionsArray = buf.RendererNativeArray.positionsArray;
			let colorArray = buf.RendererNativeArray.colorArray;

			for (let i = 0; i < len; ++i) {
				let v = buf.Vertices[i];

				positionsArray[i * 3 + 0] = v.Pos.X;
				positionsArray[i * 3 + 1] = v.Pos.Y;
				positionsArray[i * 3 + 2] = v.Pos.Z;

				colorArray[i * 4 + 0] = getRed(v.Color) / 255.0;
				colorArray[i * 4 + 1] = getGreen(v.Color) / 255.0;
				colorArray[i * 4 + 2] = getBlue(v.Color) / 255.0;
				colorArray[i * 4 + 3] = getAlpha(v.Color) / 255.0;
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, buf.RendererNativeArray.positionBuffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, positionsArray);

			gl.bindBuffer(gl.ARRAY_BUFFER, buf.RendererNativeArray.colorBuffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, colorArray);

			// this is used for particle systems. The indices only update when size of the array changes
			if (buf.RendererNativeArray.indexCount < buf.Indices.length) {
				let indexCount = buf.Indices.length;
				let indexArray = new Uint16Array(indexCount);

				for (let j = 0; j < indexCount; j += 3) {
					indexArray[j + 0] = buf.Indices[j + 0];
					indexArray[j + 1] = buf.Indices[j + 2];
					indexArray[j + 2] = buf.Indices[j + 1];
				}

				buf.RendererNativeArray.indexBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buf.RendererNativeArray.indexBuffer);
				gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
			}

			buf.RendererNativeArray.indexCount = buf.Indices.length;
			buf.RendererNativeArray.vertexCount = buf.Vertices.length;
		}
	}
	/**
	 * Creates a mesh buffer native render array
	 * @public
	 */
	updatePositionsInRendererNativeArray(buf) {
		if (buf.RendererNativeArray != null) {
			let gl = this.gl;
			let len = buf.Vertices.length;

			let positionsArray = buf.RendererNativeArray.positionsArray;

			for (let i = 0; i < len; ++i) {
				let v = buf.Vertices[i];

				positionsArray[i * 3 + 0] = v.Pos.X;
				positionsArray[i * 3 + 1] = v.Pos.Y;
				positionsArray[i * 3 + 2] = v.Pos.Z;
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, buf.RendererNativeArray.positionBuffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, positionsArray);
		}
	}
	/**
	 * Creates a mesh buffer native render array
	 * @public
	 */
	createRendererNativeArray(buf) {
		if (buf.RendererNativeArray == null) {
			let gl = this.gl;
			let obj = new Object();
			let len = buf.Vertices.length;

			let positionsArray = new Float32Array(len * 3);
			let normalsArray = new Float32Array(len * 3);
			let tcoordsArray = new Float32Array(len * 2);
			let tcoordsArray2 = new Float32Array(len * 2);
			let colorArray = new Float32Array(len * 4);

			let tangentsArray = null;
			let binormalsArray = null;
			if (buf.Tangents)
				tangentsArray = new Float32Array(len * 3);
			if (buf.Binormals)
				binormalsArray = new Float32Array(len * 3);

			for (let i = 0; i < len; ++i) {
				let v = buf.Vertices[i];

				positionsArray[i * 3 + 0] = v.Pos.X;
				positionsArray[i * 3 + 1] = v.Pos.Y;
				positionsArray[i * 3 + 2] = v.Pos.Z;

				normalsArray[i * 3 + 0] = v.Normal.X;
				normalsArray[i * 3 + 1] = v.Normal.Y;
				normalsArray[i * 3 + 2] = v.Normal.Z;

				tcoordsArray[i * 2 + 0] = v.TCoords.X;
				tcoordsArray[i * 2 + 1] = v.TCoords.Y;

				tcoordsArray2[i * 2 + 0] = v.TCoords2.X;
				tcoordsArray2[i * 2 + 1] = v.TCoords2.Y;

				colorArray[i * 4 + 0] = getRed(v.Color) / 255.0;
				colorArray[i * 4 + 1] = getGreen(v.Color) / 255.0;
				colorArray[i * 4 + 2] = getBlue(v.Color) / 255.0;
				colorArray[i * 4 + 3] = getAlpha(v.Color) / 255.0;
			}

			if (tangentsArray && binormalsArray) {
				for (let i = 0; i < len; ++i) {
					let t = buf.Tangents[i];

					tangentsArray[i * 3 + 0] = t.X;
					tangentsArray[i * 3 + 1] = t.Y;
					tangentsArray[i * 3 + 2] = t.Z;

					let b = buf.Binormals[i];

					binormalsArray[i * 3 + 0] = b.X;
					binormalsArray[i * 3 + 1] = b.Y;
					binormalsArray[i * 3 + 2] = b.Z;
				}
			}

			let indexCount = buf.Indices.length;
			let indexArray = new Uint16Array(indexCount);

			for (let j = 0; j < indexCount; j += 3) {
				indexArray[j + 0] = buf.Indices[j + 0];
				indexArray[j + 1] = buf.Indices[j + 2];
				indexArray[j + 2] = buf.Indices[j + 1];
			}

			// create render arrays
			obj.positionBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, obj.positionBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, positionsArray, gl.DYNAMIC_DRAW); //gl.STATIC_DRAW); // set to dynamic draw to make it possible to update it later
			obj.positionsArray = positionsArray; // storing it for making it possible to update this later

			obj.texcoordsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, obj.texcoordsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, tcoordsArray, gl.STATIC_DRAW);

			obj.texcoordsBuffer2 = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, obj.texcoordsBuffer2);
			gl.bufferData(gl.ARRAY_BUFFER, tcoordsArray2, gl.STATIC_DRAW);

			obj.normalBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, normalsArray, gl.STATIC_DRAW);

			if (tangentsArray && binormalsArray) {
				obj.tangentBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, obj.tangentBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, tangentsArray, gl.STATIC_DRAW);

				obj.binormalBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, obj.binormalBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, binormalsArray, gl.STATIC_DRAW);
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, null);

			obj.colorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);
			obj.colorArray = colorArray; // storing it for making it possible to update this later

			gl.bindBuffer(gl.ARRAY_BUFFER, null);

			obj.indexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

			// finalize
			obj.gl = gl;
			obj.indexCount = indexCount;
			obj.vertexCount = len;

			buf.RendererNativeArray = obj;
			buf.OnlyPositionsChanged = false;
			buf.OnlyUpdateBufferIfPossible = false;
		}
	}
	/**
	 * @public
	 */
	drawWebGlStaticGeometry(b, indexCountToUse) {
		//console.log("drawElementsBegin with " + b.indexCount + " indices " + b.positionBuffer + " " + b.texcoordsBuffer + " " + b.normalBuffer);
		let gl = this.gl;

		let withTangentsAndBinormals = b.tangentBuffer && b.binormalBuffer;

		// enable all of the vertex attribute arrays.
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		gl.enableVertexAttribArray(2);
		gl.enableVertexAttribArray(3);
		gl.enableVertexAttribArray(4);

		// set up all the vertex attributes for vertices, normals and texCoords
		gl.bindBuffer(gl.ARRAY_BUFFER, b.positionBuffer);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, b.texcoordsBuffer);
		gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, b.texcoordsBuffer2);
		gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, b.normalBuffer);
		gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, b.colorBuffer);
		gl.vertexAttribPointer(4, 4, gl.FLOAT, false, 0, 0);

		if (withTangentsAndBinormals) {
			gl.enableVertexAttribArray(5);
			gl.enableVertexAttribArray(6);

			gl.bindBuffer(gl.ARRAY_BUFFER, b.tangentBuffer);
			gl.vertexAttribPointer(5, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, b.binormalBuffer);
			gl.vertexAttribPointer(6, 3, gl.FLOAT, false, 0, 0);
		}

		// bind the index array
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indexBuffer);

		// matrices
		let mat = new Matrix4(false);
		this.Projection.copyTo(mat);
		mat = mat.multiply(this.View);
		mat = mat.multiply(this.World);

		// set world view projection matrix
		let program = this.currentGLProgram;
		if (program.locWorldViewProj != null)
			gl.uniformMatrix4fv(program.locWorldViewProj, false, this.getMatrixAsWebGLFloatArray(mat));

		// set normal matrix
		if (program.locNormalMatrix != null) {
			// set the normal matrix
			let matnormal = new Matrix4(true);
			this.Projection.copyTo(matnormal);
			matnormal = matnormal.multiply(this.View);
			matnormal = matnormal.multiply(this.World);
			matnormal.makeInverse();
			matnormal = matnormal.getTransposed(); // the second argument below, 'false', cannot be set to true because it doesn't work, so we have to transpose it ourselves

			gl.uniformMatrix4fv(program.locNormalMatrix, false, this.getMatrixAsWebGLFloatArray(matnormal));
		}

		// set model view
		if (program.locModelViewMatrix != null) {
			// set the model view matrix
			let matmodelview = new Matrix4(true);
			matmodelview = matmodelview.multiply(this.View);
			matmodelview = matmodelview.multiply(this.World);

			gl.uniformMatrix4fv(program.locModelViewMatrix, false, this.getMatrixAsWebGLFloatArray(matmodelview));
		}

		// set model view
		if (program.locModelWorldMatrix != null) {
			// set the model world matrix
			gl.uniformMatrix4fv(program.locModelWorldMatrix, false, this.getMatrixAsWebGLFloatArray(this.World.getTransposed()));
		}

		// set light values
		if (program.locLightPositions != null)
			this.setDynamicLightsIntoConstants(program, withTangentsAndBinormals, withTangentsAndBinormals); // when using normal maps, we need word space coordinates of the light positions


		// set fog values
		if (program.locFogColor != null)
			this.gl.uniform4f(program.locFogColor, this.FogColor.R, this.FogColor.G, this.FogColor.B, 1.0);
		if (program.locFogDensity != null)
			this.gl.uniform1f(program.locFogDensity, this.FogDensity);

		// set shadow map values
		if (this.ShadowMapEnabled)
			this.setShadowMapDataIntoConstants(program);

		// set grass movement values
		if (program.locGrassMovement != null) {
			let grassMovement = ((CLTimer.getTime() * this.WindSpeed) / 500.0) % 1000.0;
			this.gl.uniform1f(program.locGrassMovement, grassMovement);
			this.gl.uniform1f(program.locWindStrength, this.WindStrength);
		}

		// draw
		if (indexCountToUse == null)
			indexCountToUse = b.indexCount;

		gl.drawElements(gl.TRIANGLES, indexCountToUse, gl.UNSIGNED_SHORT, 0);

		//console.log("drawElementsEnd");
		// unbind optional buffers
		if (withTangentsAndBinormals) {
			gl.disableVertexAttribArray(5);
			gl.disableVertexAttribArray(6);

			/*gl.bindBuffer(gl.ARRAY_BUFFER, null);
			gl.vertexAttribPointer(5, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, null);
			gl.vertexAttribPointer(6, 3, gl.FLOAT, false, 0, 0);*/
		}
	}
	/**
	 * @public
	 */
	setShadowMapDataIntoConstants(program) {
		let gl = this.gl;

		if (this.ShadowMapLightMatrix && program.locWorldviewprojLight) {
			let m = new Matrix4(true);
			m = m.multiply(this.ShadowMapLightMatrix);
			m = m.multiply(this.World);

			gl.uniformMatrix4fv(program.locWorldviewprojLight, false, this.getMatrixAsWebGLFloatArray(m));
		}

		if (this.ShadowMapLightMatrix2 && program.locWorldviewprojLight2) {
			let m = new Matrix4(true);
			m = m.multiply(this.ShadowMapLightMatrix2);
			m = m.multiply(this.World);

			gl.uniformMatrix4fv(program.locWorldviewprojLight2, false, this.getMatrixAsWebGLFloatArray(m));
		}

		if (program.locShadowMapBias1)
			gl.uniform1f(program.locShadowMapBias1, this.ShadowMapBias1);

		if (program.locShadowMapBias2)
			gl.uniform1f(program.locShadowMapBias2, this.ShadowMapBias2);

		if (this.canvas || false )
			gl.uniform1f(program.locShadowMapBackFaceBias, this.ShadowMapBackFaceBias);

		if (program.locShadowMapOpacity)
			gl.uniform1f(program.locShadowMapOpacity, this.ShadowMapOpacity);

		// shadow map texture
		if (this.ShadowMapTexture) {
			gl.activeTexture(gl.TEXTURE2);
			gl.bindTexture(gl.TEXTURE_2D, this.ShadowMapTexture.Texture);
		}

		else {
			// not yet loaded or inactive
			gl.activeTexture(gl.TEXTURE2);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		gl.uniform1i(gl.getUniformLocation(program, "shadowmap"), 2);


		{
			if (this.ShadowMapTexture2) {
				gl.activeTexture(gl.TEXTURE3);
				gl.bindTexture(gl.TEXTURE_2D, this.ShadowMapTexture2.Texture);
			}

			else {
				// not yet loaded or inactive
				gl.activeTexture(gl.TEXTURE3);
				gl.bindTexture(gl.TEXTURE_2D, null);
			}

			gl.uniform1i(gl.getUniformLocation(program, "shadowmap2"), 3);
		}
	}
	/**
	 * @public
	 */
	setDynamicLightsIntoConstants(program, useWorldSpacePositionsForLights, useOldNormalMappingAttenuationCalculation) {
		// we use two contants per light, where we pack Position, Color and Attenuation into, like this:
		// (px, py, pz, att) and (cr, cg, cb, 1)
		let buf1 = new ArrayBuffer(4 * 4 * Float32Array.BYTES_PER_ELEMENT);
		let positionArray = new Float32Array(buf1);

		let buf2 = new ArrayBuffer(5 * 4 * Float32Array.BYTES_PER_ELEMENT);
		let colorArray = new Float32Array(buf2);

		// calculate matrix to transform light position into object space (unless useWorldSpacePositionsForLights is true)
		let mat = new Matrix4(true);

		if (!useWorldSpacePositionsForLights && ((this.Lights != null && this.Lights.length > 0) || this.DirectionalLight != null))
			this.World.getInverse(mat);

		// add all lights
		for (let i = 0; i < 4; ++i) {
			let idx = i * 4;

			if (this.Lights != null && i < this.Lights.length) {
				let l = this.Lights[i];

				let vt = mat.getTransformedVect(l.Position); // we need to set the position of the light in the current object's space

				positionArray[idx] = vt.X;
				positionArray[idx + 1] = vt.Y;
				positionArray[idx + 2] = vt.Z;

				let attenuation = 1.0;

				if (useOldNormalMappingAttenuationCalculation)
					attenuation = 1.0 / (l.Radius * l.Radius);

				else
					attenuation = l.Attenuation;

				positionArray[idx + 3] = attenuation;

				colorArray[idx] = l.Color.R;
				colorArray[idx + 1] = l.Color.G;
				colorArray[idx + 2] = l.Color.B;
				colorArray[idx + 3] = 1;
			}

			else {
				// add a dark light, since the shader expects 4 lights
				positionArray[idx] = 1;
				positionArray[idx + 1] = 0;
				positionArray[idx + 2] = 0;
				positionArray[idx + 3] = 1.0;

				colorArray[idx] = 0;
				colorArray[idx + 1] = 0;
				colorArray[idx + 2] = 0;
				colorArray[idx + 3] = 1;
			}
		}

		// add ambient light
		colorArray[16] = this.AmbientLight.R;
		colorArray[17] = this.AmbientLight.G;
		colorArray[18] = this.AmbientLight.B;
		colorArray[19] = 1.0;

		// send point lights and ambient light to 3d card
		this.gl.uniform4fv(program.locLightPositions, positionArray);
		this.gl.uniform4fv(program.locLightColors, colorArray);

		// add directional light
		if (program.locDirectionalLight != null) {
			let dirlight = this.DirectionalLight;

			let dir = null;

			if (dirlight && dirlight.Direction)
				dir = dirlight.Direction.clone();

			else
				dir = new Vect3d(1, 0, 0);

			dir.multiplyThisWithScal(-1.0);

			mat.rotateVect(dir);
			dir.normalize();

			this.gl.uniform3f(program.locDirectionalLight, dir.X, dir.Y, dir.Z);

			if (dirlight)
				this.gl.uniform4f(program.locDirectionalLightColor, dirlight.Color.R, dirlight.Color.G, dirlight.Color.B, 1.0);

			else
				this.gl.uniform4f(program.locDirectionalLightColor, 0.0, 0.0, 0.0, 1.0);
		}
	}
	/**
	 * @public
	 * Draws a 3d line with the current material
	 */
	draw3DLine(vect3dFrom, vect3dTo) {
		// TODO: implement
		//gl.drawElements(gl.LINES, b.indexCount, gl.UNSIGNED_SHORT, 0);
	}
	/**
	 * Draws a 2d rectangle
	 * @public
	 * @param x {Number} x coordinate in pixels
	 * @param y {Number} y coordinate in pixels
	 * @param width {Number} width of the rectangle in pixels
	 * @param height {Number} height of the rectangle in pixels
	 * @param color {Number} color of the rectangle. See CL3D.createColor()
	 * @param blend {Boolean} (optional) set to true to enable alpha blending (using the alpha component of the color) and false not to blend
	 */
	draw2DRectangle(x, y, width, height, color, blend) {
		if (width <= 0 || height <= 0 || this.width == 0 || this.height == 0)
			return;

		let doblend = true;
		if (blend == null || blend == false)
			doblend = false;

		let gl = this.gl;

		gl.enableVertexAttribArray(0);
		gl.disableVertexAttribArray(1);
		gl.disableVertexAttribArray(2);
		gl.disableVertexAttribArray(3);
		gl.disableVertexAttribArray(4);

		// transform to view
		y = this.height - y; // upside down
		let xFact = 2.0 / this.width;
		let yFact = 2.0 / this.height;

		x = (x * xFact) - 1;
		y = (y * yFact) - 1;
		width *= xFact;
		height *= yFact;

		// positions
		let positionsArray = new Float32Array(4 * 3);

		positionsArray[0] = x;
		positionsArray[1] = y;
		positionsArray[2] = 0;

		positionsArray[3] = x + width;
		positionsArray[4] = y;
		positionsArray[5] = 0;

		positionsArray[6] = x + width;
		positionsArray[7] = y - height;
		positionsArray[8] = 0;

		positionsArray[9] = x;
		positionsArray[10] = y - height;
		positionsArray[11] = 0;

		// indices
		let indexCount = 6;
		let indexArray = new Uint16Array(indexCount);
		indexArray[0] = 0;
		indexArray[1] = 2;
		indexArray[2] = 1;
		indexArray[3] = 0;
		indexArray[4] = 3;
		indexArray[5] = 2;

		// create render arrays
		let positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, positionsArray, gl.STATIC_DRAW);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

		let indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

		// set shader
		this.currentGLProgram = this.Program2DDrawingColorOnly;
		gl.useProgram(this.currentGLProgram);

		// set color
		gl.uniform4f(gl.getUniformLocation(this.currentGLProgram, "vColor"),
			getRed(color) / 255,
			getGreen(color) / 255,
			getBlue(color) / 255,
			doblend ? (getAlpha(color) / 255) : 1.0);


		// set blend mode and other tests
		gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);

		if (!doblend) {
			gl.disable(gl.BLEND);
		}

		else {
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		}

		// draw
		gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);

		// clean up again
		gl.deleteBuffer(positionBuffer);
		gl.deleteBuffer(indexBuffer);
	}
	/**
	 * Draws a 2d image
	 * @public
	 * @param {Number} x x coordinate in pixels
	 * @param {Number} y y coordinate in pixels
	 * @param {Number} width width of the rectangle in pixels
	 * @param {Number} height height of the rectangle in pixels
	 * @param {CL3D.Texture} tex texture to draw
	 * @param {Boolean} blend (optional) set to true to enable alpha blending (using the alpha component of the color) and false not to blend
	 * @param shaderToUse (optional) shader to be used or null if the default shader should be used. Set this to something returned by getGLProgramFromMaterialType() for example.
	 */
	draw2DImage(x, y, width, height, tex, blend, shaderToUse, srcRightX, srcBottomY, sharp) {
		if (tex == null || tex.isLoaded() == false || width <= 0 || height <= 0 || this.width == 0 || this.height == 0)
			return;

		if (srcRightX == null)
			srcRightX = 1.0;
		if (srcBottomY == null)
			srcBottomY = 1.0;

		let doblend = true;
		if (blend == null || blend == false)
			doblend = false;

		let gl = this.gl;

		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		gl.disableVertexAttribArray(2);
		gl.disableVertexAttribArray(3);
		gl.disableVertexAttribArray(4);

		// transform to view
		y = this.height - y; // upside down
		let xFact = 2.0 / this.width;
		let yFact = 2.0 / this.height;

		x = (x * xFact) - 1;
		y = (y * yFact) - 1;
		width *= xFact;
		height *= yFact;

		// positions
		let positionsArray = new Float32Array(4 * 3);

		positionsArray[0] = x;
		positionsArray[1] = y;
		positionsArray[2] = 0;

		positionsArray[3] = x + width;
		positionsArray[4] = y;
		positionsArray[5] = 0;

		positionsArray[6] = x + width;
		positionsArray[7] = y - height;
		positionsArray[8] = 0;

		positionsArray[9] = x;
		positionsArray[10] = y - height;
		positionsArray[11] = 0;

		// texture coordinates
		let tcoordsArray = new Float32Array(4 * 2);

		tcoordsArray[0] = 0;
		tcoordsArray[1] = 0;

		tcoordsArray[2] = srcRightX;
		tcoordsArray[3] = 0;

		tcoordsArray[4] = srcRightX;
		tcoordsArray[5] = srcBottomY;

		tcoordsArray[6] = 0;
		tcoordsArray[7] = srcBottomY;

		// indices
		let indexCount = 6;
		let indexArray = new Uint16Array(indexCount);
		indexArray[0] = 0;
		indexArray[1] = 2;
		indexArray[2] = 1;
		indexArray[3] = 0;
		indexArray[4] = 3;
		indexArray[5] = 2;

		// create render arrays
		let positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, positionsArray, gl.STATIC_DRAW);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

		let tcoordsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, tcoordsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, tcoordsArray, gl.STATIC_DRAW);
		gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

		let indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

		// set shader
		if (shaderToUse == null)
			this.currentGLProgram = this.Program2DDrawingTextureOnly;

		else
			this.currentGLProgram = shaderToUse;

		gl.useProgram(this.currentGLProgram);

		// set blend mode and other tests
		gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);

		if (!doblend) {
			gl.disable(gl.BLEND);
		}

		else {
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		}

		// set texture
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, tex.getWebGLTexture());

		// disable blur
		if (sharp) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		}

		else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}

		// texture clamping
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		// disable texture 2
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, null);

		// draw
		gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);

		// clean up again
		gl.deleteBuffer(tcoordsBuffer);
		gl.deleteBuffer(positionBuffer);
		gl.deleteBuffer(indexBuffer);

		//if (disableBlur)
		{
			// reset to default again
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, tex.getWebGLTexture());
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		}
	}
	/**
	 * @public
	 * internal drawing function for drawing 2d overlay fonts
	 */
	draw2DFontImage(x, y, width, height, tex, color) {
		if (tex == null || tex.isLoaded() == false || width <= 0 || height <= 0 || this.width == 0 || this.height == 0)
			return;

		let doblend = true;
		let gl = this.gl;

		this.currentGLProgram = this.Program2DDrawingCanvasFontColor;
		gl.useProgram(this.currentGLProgram);

		// TODO: in the latest release, non-power-of-two textures do not work anymore, so ALL
		// out font textures are scaled up. we need to fix this later by drawing them with the actual size and not scaling them up
		// set color
		gl.uniform4f(gl.getUniformLocation(this.currentGLProgram, "vColor"),
			getRed(color) / 255,
			getGreen(color) / 255,
			getBlue(color) / 255,
			(getAlpha(color) / 255) );

		//this.draw2DImage(x, y, width, height, tex, doblend, this.Program2DDrawingCanvasFontColor, );
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		this.draw2DImage(x, y, width, height, tex, doblend, this.Program2DDrawingCanvasFontColor, tex.OriginalWidth / tex.CachedWidth, tex.OriginalHeight / tex.CachedHeight, true);
	}
	/**
	 * Starts the drawing process by clearing the whole scene. Is called by {@link CopperLicht.draw3dScene}(),
	 * so it shouldn't be necessary to call this yourself.
	 * @public
	 * @param clearColor {Number} Color for the background. See {@link createColor}.
	 */
	beginScene(clearColor) {
		if (this.gl == null)
			return;

		//console.log("drawBegin");
		// adjust size
		this.ensuresizeok(this.width, this.height);

		// clear graphics here
		let gl = this.gl;

		gl.clearDepth(this.InvertedDepthTest ? 0.0 : 1.0);
		gl.depthMask(true);
		gl.clearColor(getRed(clearColor) / 255.0,
			getGreen(clearColor) / 255.0,
			getBlue(clearColor) / 255.0,
			1); //CL3D.getAlpha(clearColor) / 255.0);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}
	/**
	 * Clears the z buffer
	 * @public
	 */
	clearZBuffer() {
		let gl = this.gl;
		gl.clearDepth(this.InvertedDepthTest ? 0.0 : 1.0);
		gl.depthMask(true);
		gl.clear(gl.DEPTH_BUFFER_BIT);
	}
	/**
	 * Ends the drawing process by flushing the renderin instructions. Is called by {@link CopperLicht.draw3dScene}(),
	 * so it shouldn't be necessary to call this yourself.
	 * @public
	 */
	endScene() {
		if (this.gl == null)
			return;

		this.gl;

		//console.log("drawEnd");
	}
	/**
	 * Clears all dynamic lights in the rendering pipeline. Is called by {@link CopperLicht.draw3dScene}(),
	 * so it shouldn't be necessary to call this yourself.
	 * @public
	 */
	clearDynamicLights() {
		this.Lights = new Array();
		this.DirectionalLight = null;
	}
	/**
	 * Adds a new dynamic light to the rendering pipeline.
	 * @public
	  * @param {CL3D.Light} l light data of the light to add
	 */
	addDynamicLight(l) {
		this.Lights.push(l);
	}
	/**
	 * Sets the current dynamic directional light to the rendering pipeline.
	 * The renderer supports an unlimited amount of point lights and one directional light.
	 * @public
	  * @param {CL3D.Light} l light data of the light to add
	 */
	setDirectionalLight(l) {
		this.DirectionalLight = l;
	}
	/**
	 * @public
	 */
	ensuresizeok(width, height) {
		if (this.gl == null)
			return;

		if (this.canvas) {
			if (this.width == this.canvas.width &&
				this.height == this.canvas.height)
				return;

			this.width = this.canvas.width;
			this.height = this.canvas.height;
		} else {
			this.width = width;
			this.height = height;
		}

		let gl = this.gl;

		// Set the viewport and projection matrix for the scene
		if (gl.viewport)
			gl.viewport(0, 0, this.width, this.height);

		//console.log("adjusted size: " + this.width + " " + this.height);
	}
	/**
	 * @public
	 */
	init(width, height, options, canvas) {
		this.width = width;
		this.height = height;
		this.canvas = canvas;

		this.gl = null;
		let obj = createContext(width, height, options, canvas);
		if (obj.gl) {
			this.gl = obj.gl;
			this.glfw = obj.glfw;
			this.window = obj.window;

			this.window.on('resize', (event) => {
				this.ensuresizeok(event.width, event.height);
			});

			this.UsesWebGL2 = true;
		}
		else
			this.gl = obj;

		if (canvas)
			this.UsesWebGL2 = true;

		if (this.gl == null) {
			return false;
		}

		else {
			this.removeCompatibilityProblems();
			this.initWebGL();
			this.ensuresizeok(width, height);
		}

		return true;
	}
	/**
	 * @public
	 */
	removeCompatibilityProblems() {
	}
	/**
	 * @public
	 */
	loadShader(shaderType, shaderSource) {
		let gl = this.gl;
		let shader = gl.createShader(shaderType);
		if (shader == null)
			return null;

		gl.shaderSource(shader, shaderSource);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			if (this.printShaderErrors) {
				let strType = (shaderType == gl.VERTEX_SHADER) ? "vertex" : "fragment";
				let msg = "Error loading " + strType + " shader: " + gl.getShaderInfoLog(shader);
				console.log(msg);
			}
			return null;
		}

		return shader;
	}
	/**
	 * @public
	 */
	createShaderProgram(vertexShaderSource, fragmentShaderSource, useBinormalsAndTangents) {
		// create shader
		let gl = this.gl;

		let finalVertexShader = vertexShaderSource;
		let finalFramentShader = fragmentShaderSource;

		let head_append = GLSL$2`
		//#version 100
		precision mediump float;
		`;

		if (finalVertexShader.indexOf('#version 100') == -1)
			finalVertexShader = head_append + vertexShaderSource;

		if (finalFramentShader.indexOf('#version 100') == -1)
			finalFramentShader = head_append + fragmentShaderSource;

		let vertexShader = this.loadShader(gl.VERTEX_SHADER, finalVertexShader);
		let fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, finalFramentShader);

		if (!vertexShader || !fragmentShader) {
			if (this.printShaderErrors)
				console.log("Could not create shader program");
			return null;
		}

		// create program
		// create program object
		let program = gl.createProgram();

		// attach our two shaders to the program
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);

		// setup attributes (optional)
		gl.bindAttribLocation(program, 0, "vPosition");
		gl.bindAttribLocation(program, 1, "vTexCoord1");
		gl.bindAttribLocation(program, 2, "vTexCoord2");
		gl.bindAttribLocation(program, 3, "vNormal");
		gl.bindAttribLocation(program, 4, "vColor");

		if (useBinormalsAndTangents) {
			gl.bindAttribLocation(program, 5, "vBinormal");
			gl.bindAttribLocation(program, 6, "vTangent");
		}

		//gl.bindTexture(gl.TEXTURE_2D, mat.Tex1.Texture);
		// linking
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			if (this.printShaderErrors)
				console.log("Could not link program:" + gl.getProgramInfoLog(program));
		}

		else {
			gl.useProgram(program);
			gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0);
			gl.uniform1i(gl.getUniformLocation(program, "texture2"), 1);
		}

		// setup uniforms (optional)
		//this.gl.useProgram(program);
		//this.gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
		return program;
	}
	/**
	 * Creates a new CL3D.Material type with custom shaders. Returns an id which can be used in {@link Material.Type}.
	 * There is a tutorial showing how to create a new CL3D.Material in the documentation, but also this short
	 * example may give an overview:
	 * @public
	 * @example
	 * // add a cube to test out
	 * let cubenode = new CubeSceneNode();
	 * scene.getRootSceneNode().addChild(cubenode);
	 * cubenode.getMaterial(0).Tex1 =
	 *   engine.getTextureManager().getTexture("crate_wood.jpg", true);
	 *
	 * // now, we want to use a custom material for our cube, lets write
	 * // a vertex and a fragment shader:
	 * // (note: there must be no character, even no space behind
	 * // the '\' characters).
	 * let vertex_shader = "           \
	 *   uniform mat4 worldviewproj;   \
	 *   attribute vec4 vPosition;     \
	 *   attribute vec4 vNormal;       \
	 *   attribute vec2 vTexCoord1;    \
	 *   attribute vec2 vTexCoord2;    \
	 *   varying vec2 v_texCoord1;     \
	 *   varying vec2 v_texCoord2;     \
	 *   void main()                   \
	 *   {                             \
	 *     gl_Position = worldviewproj * vPosition;\
	 *     v_texCoord1 = vTexCoord1.st; \
	 *     v_texCoord2 = vTexCoord2.st; \
	 *   }";
	 *
	 *  let fragment_shader = "        \
	 *   uniform sampler2D texture1;   \
	 *   uniform sampler2D texture2;   \
	 *                                 \
	 *   varying vec2 v_texCoord1;     \
	 *   varying vec2 v_texCoord2;     \
	 *                                 \
	 *   void main()                   \
	 *   {                             \
	 *     vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t); \
	 *     gl_FragColor = texture2D(texture1, texCoord) * 2; \
	 *   }";
	 *
	 *  // create a solid material using the shaders. For transparent materials,
	 *  // take a look at the other parameters of createMaterialType
	 *  let newMaterialType = engine.getRenderer().createMaterialType(vertex_shader, fragment_shader);
	 *  if (newMaterialType != -1)
	 *    cubenode.getMaterial(0).Type = newMaterialType;
	 *  else
	 *    alert('could not create shader');
	 * @param vertexShaderSource {String} Source for the vertex shader of the new CL3D.Material. CopperLicht will set the current
	 *  World-View-Projection matrix in an attribute named 'worldviewproj' (if existing), the world transformation matrix into 'worldtransform', the normal transformation matrix in an attribute named
	 *  'normaltransform' if available, and the concatenated view model transformation into an attribute named 'modelviewtransform', if available.
	 * Positions will be stored in vPosition,
	 * normals in vNormal, the first texture coordinate in vTexCoord1 and the second in vTexCoord2.
	 * All other variables will need to be set manually by you. Use {@link getGLProgramFromMaterialType} to do this.
	 * @param fragmentShaderSource {String} Source for the fragment shader of the new CL3D.Material. If the fragment shader uses a variable 'texture1' and 'texture2' as in the example above, CopperLicht will set this to the textures of the current material.
	 * @param blendenabled  {Boolean} this is optional and can be set to true to enable blending. See next two parameters. Note: When creating
	 * a transparent material, in order to let it be sorted correctly by CopperLicht, override the {@link Material.isTransparent} to return true for
	 * your material type.
	 * @param blendsfactor this is optional. Blend source factor, when blending is enabled. Set to a webGL blend factor like gl.ONE or gl.SRC_ALPHA. You can get the gl object by using {@link getWebGL()}.
	 * @param blenddfactor this is optional. Blend destination factor, when blending is enabled. Set to a webGL blend factor like gl.ONE_MINUS_SRC_ALPHA or gl.ONE_MINUS_SRC_COLOR. You can get the gl object by using {@link getWebGL()}.
	 * @param functionShaderCallback {function} an optional function which should be called when the material is being used. Can be used to set shader variables.
	 */
	createMaterialType(vertexShaderSource, fragmentShaderSource, blendenabled,
		blendsfactor, blenddfactor, functionShaderCallback) {
		let program = this.createMaterialTypeInternal(vertexShaderSource, fragmentShaderSource, blendenabled, blendsfactor, blenddfactor);
		if (!program)
			return -1;

		program.shaderCallback = functionShaderCallback;

		this.MinExternalMaterialTypeId += 1;
		this.MaterialPrograms[this.MinExternalMaterialTypeId] = program;
		this.MaterialProgramsWithLight[this.MinExternalMaterialTypeId] = program;
		this.MaterialProgramsFog[this.MinExternalMaterialTypeId] = program;
		this.MaterialProgramsWithLightFog[this.MinExternalMaterialTypeId] = program;
		this.MaterialProgramsWithShadowMap[this.MinExternalMaterialTypeId] = program;

		return this.MinExternalMaterialTypeId;
	}
	/**
	 * Returns the webgl shader program from a material type. This is useful when you are using {@link createMaterialType} to create your
	 * own shaders and need to set material constants using for example uniform1i.
	 * @public
	 * @param {Number} mattype The material type, like for example {@link Material.EMT_SOLID}, or your own material type returned by {@link createMaterialType}.
	 * @returns {program} Returns the WebGL shader program or null if not found.
	 */
	getGLProgramFromMaterialType(mattype) {
		let program = null;
		try {
			program = this.MaterialPrograms[mattype];
		}
		catch (e) { }

		return program;
	}
	/**
	 * @public
	 */
	createMaterialTypeInternal(vsshader, fsshader, blendenabled, blendsfactor, blenddfactor, useBinormalsAndTangents) {
		if (useBinormalsAndTangents == null)
			useBinormalsAndTangents = false;

		let program = this.createShaderProgram(vsshader, fsshader, useBinormalsAndTangents);
		if (program) {
			// store blend mode
			program.blendenabled = blendenabled ? blendenabled : false;
			program.blendsfactor = blendsfactor;
			program.blenddfactor = blenddfactor;

			let gl = this.gl;

			// store preset shader attribute locations
			program.locWorldViewProj = gl.getUniformLocation(program, "worldviewproj");
			program.locNormalMatrix = gl.getUniformLocation(program, "normaltransform");
			program.locModelViewMatrix = gl.getUniformLocation(program, "modelviewtransform");
			program.locModelWorldMatrix = gl.getUniformLocation(program, "worldtransform");
			program.locLightPositions = gl.getUniformLocation(program, "arrLightPositions");
			program.locLightColors = gl.getUniformLocation(program, "arrLightColors");
			program.locDirectionalLight = gl.getUniformLocation(program, "vecDirLight");
			program.locDirectionalLightColor = gl.getUniformLocation(program, "colorDirLight");
			program.locFogColor = gl.getUniformLocation(program, "fogColor");
			program.locFogDensity = gl.getUniformLocation(program, "fogDensity");
			program.locGrassMovement = gl.getUniformLocation(program, "grassMovement");
			program.locWindStrength = gl.getUniformLocation(program, "windStrength");

			// locations for shadow maps related attributes
			program.locWorldviewprojLight = gl.getUniformLocation(program, "worldviewprojLight");
			program.locWorldviewprojLight2 = gl.getUniformLocation(program, "worldviewprojLight2");
			program.locShadowMapBias1 = gl.getUniformLocation(program, "shadowMapBias1");
			program.locShadowMapBias2 = gl.getUniformLocation(program, "shadowMapBias2");
			program.locShadowMapBackFaceBias = gl.getUniformLocation(program, "shadowMapBackFaceBias");
			program.locShadowMapOpacity = gl.getUniformLocation(program, "shadowOpacity");


			// shader callback function default to null
			program.shaderCallback = null;
		}

		return program;
	}
	/**
	 * @public
	 */
	initWebGL() {
		let gl = this.gl;

		// don't console.log shader errors
		this.printShaderErrors = true;

		// -------------------------------------------------------------
		// create shaders without lighting
		let fallbackShader = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud);

		let programStandardMaterial = fallbackShader;
		let programLightmapMaterial = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_lightmapcombine);
		let programLightmapMaterial_m4 = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_lightmapcombine_m4);
		let programTransparentAlphaChannel = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programTransparentAlphaChannelRef = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud_alpharef, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programTransparentAlphaChannelRefMoveGrass = this.createMaterialTypeInternal(this.vs_shader_normaltransform_movegrass, this.fs_shader_onlyfirsttexture_gouraud_alpharef, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programTransparentAdd = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud, true, gl.ONE, gl.ONE_MINUS_SRC_COLOR);
		let programReflectionMaterial = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform, this.fs_shader_lightmapcombine);
		let programTranspReflectionMaterial = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform, this.fs_shader_lightmapcombine, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programGouraudShaded = this.createMaterialTypeInternal(this.vs_shader_normaltransform_gouraud, this.fs_shader_onlyfirsttexture_gouraud);
		let programNormalmappedMaterial = this.createMaterialTypeInternal(this.vs_shader_normalmappedtransform, this.fs_shader_normalmapped);
		let programSolidVertexAlphaTwoTextureBlendMaterial = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_vertex_alpha_two_textureblend);

		this.Program2DDrawingColorOnly = this.createMaterialTypeInternal(this.vs_shader_2ddrawing_coloronly, this.fs_shader_simplecolor);
		this.Program2DDrawingTextureOnly = this.createMaterialTypeInternal(this.vs_shader_2ddrawing_texture, this.fs_shader_onlyfirsttexture);
		this.Program2DDrawingCanvasFontColor = this.createMaterialTypeInternal(this.vs_shader_2ddrawing_texture, this.fs_shader_2ddrawing_canvasfont);

		this.MaterialPrograms[Material.EMT_SOLID] = programStandardMaterial;
		this.MaterialPrograms[Material.EMT_SOLID + 1] = programStandardMaterial;
		this.MaterialPrograms[Material.EMT_LIGHTMAP] = programLightmapMaterial;
		this.MaterialPrograms[Material.EMT_LIGHTMAP + 1] = programLightmapMaterial;
		this.MaterialPrograms[Material.EMT_LIGHTMAP + 2] = programLightmapMaterial;
		this.MaterialPrograms[Material.EMT_LIGHTMAP + 3] = programLightmapMaterial_m4;
		this.MaterialPrograms[Material.EMT_TRANSPARENT_ADD_COLOR] = programTransparentAdd;
		this.MaterialPrograms[Material.EMT_TRANSPARENT_ALPHA_CHANNEL] = programTransparentAlphaChannel;
		this.MaterialPrograms[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF] = programTransparentAlphaChannelRef;
		this.MaterialPrograms[Material.EMT_REFLECTION_2_LAYER] = programReflectionMaterial;
		this.MaterialPrograms[Material.EMT_TRANSPARENT_REFLECTION_2_LAYER] = programTranspReflectionMaterial;
		this.MaterialPrograms[Material.EMT_NORMAL_MAP_SOLID] = programNormalmappedMaterial;
		this.MaterialPrograms[Material.EMT_SOLID_VERTEX_ALPHA_TWO_TEXTURE_BLEND] = programSolidVertexAlphaTwoTextureBlendMaterial;
		this.MaterialPrograms[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS] = programTransparentAlphaChannelRefMoveGrass;

		// EMT_ONETEXTURE_BLEND
		this.MaterialPrograms[23] = programGouraudShaded;

		// -------------------------------------------------------------
		// now do the same with materials with lighting
		programStandardMaterial = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud);
		programTransparentAlphaChannel = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAlphaChannelRef = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud_alpharef, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAlphaChannelRefMoveGrass = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light_movegrass, this.fs_shader_onlyfirsttexture_gouraud_alpharef, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAdd = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud, true, gl.ONE, gl.ONE_MINUS_SRC_COLOR);

		programReflectionMaterial = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud);
		programTranspReflectionMaterial = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programSolidVertexAlphaTwoTextureBlendMaterial = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_vertex_alpha_two_textureblend);

		this.MaterialProgramsWithLight[Material.EMT_SOLID] = programStandardMaterial;
		this.MaterialProgramsWithLight[Material.EMT_SOLID + 1] = programStandardMaterial;
		this.MaterialProgramsWithLight[Material.EMT_LIGHTMAP] = programLightmapMaterial;
		this.MaterialProgramsWithLight[Material.EMT_LIGHTMAP + 1] = programLightmapMaterial;
		this.MaterialProgramsWithLight[Material.EMT_LIGHTMAP + 2] = programLightmapMaterial;
		this.MaterialProgramsWithLight[Material.EMT_LIGHTMAP + 3] = programLightmapMaterial_m4;
		this.MaterialProgramsWithLight[Material.EMT_TRANSPARENT_ADD_COLOR] = programTransparentAdd;
		this.MaterialProgramsWithLight[Material.EMT_TRANSPARENT_ALPHA_CHANNEL] = programTransparentAlphaChannel;
		this.MaterialProgramsWithLight[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF] = programTransparentAlphaChannelRef;
		this.MaterialProgramsWithLight[Material.EMT_REFLECTION_2_LAYER] = programReflectionMaterial;
		this.MaterialProgramsWithLight[Material.EMT_TRANSPARENT_REFLECTION_2_LAYER] = programTranspReflectionMaterial;
		this.MaterialProgramsWithLight[Material.EMT_NORMAL_MAP_SOLID] = programNormalmappedMaterial;
		this.MaterialProgramsWithLight[Material.EMT_SOLID_VERTEX_ALPHA_TWO_TEXTURE_BLEND] = programSolidVertexAlphaTwoTextureBlendMaterial;
		this.MaterialProgramsWithLight[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS] = programTransparentAlphaChannelRefMoveGrass;


		// -------------------------------------------------------------
		// now create both material types also with fog support
		let programStandardMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud_fog);
		let programLightmapMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_lightmapcombine_fog);
		let programLightmapMaterial_m4Fog = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_lightmapcombine_m4_fog);
		let programTransparentAlphaChannelFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programTransparentAlphaChannelRefFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud_alpharef_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programTransparentAlphaChannelRefFogMoveGrass = this.createMaterialTypeInternal(this.vs_shader_normaltransform_movegrass, this.fs_shader_onlyfirsttexture_gouraud_alpharef_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programTransparentAddFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_onlyfirsttexture_gouraud_fog, true, gl.ONE, gl.ONE_MINUS_SRC_COLOR);
		let programReflectionMaterialFog = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform, this.fs_shader_lightmapcombine_fog);
		let programTranspReflectionMaterialFog = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform, this.fs_shader_lightmapcombine_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		let programGouraudShadedFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_gouraud, this.fs_shader_onlyfirsttexture_gouraud_fog);
		let programNormalmappedMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normalmappedtransform, this.fs_shader_normalmapped);
		let programSolidVertexAlphaTwoTextureBlendMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform, this.fs_shader_vertex_alpha_two_textureblend_fog);

		this.MaterialProgramsFog[Material.EMT_SOLID] = programStandardMaterialFog;
		this.MaterialProgramsFog[Material.EMT_SOLID + 1] = programStandardMaterialFog;
		this.MaterialProgramsFog[Material.EMT_LIGHTMAP] = programLightmapMaterialFog;
		this.MaterialProgramsFog[Material.EMT_LIGHTMAP + 1] = programLightmapMaterialFog;
		this.MaterialProgramsFog[Material.EMT_LIGHTMAP + 2] = programLightmapMaterialFog;
		this.MaterialProgramsFog[Material.EMT_LIGHTMAP + 3] = programLightmapMaterial_m4Fog;
		this.MaterialProgramsFog[Material.EMT_TRANSPARENT_ADD_COLOR] = programTransparentAddFog;
		this.MaterialProgramsFog[Material.EMT_TRANSPARENT_ALPHA_CHANNEL] = programTransparentAlphaChannelFog;
		this.MaterialProgramsFog[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF] = programTransparentAlphaChannelRefFog;
		this.MaterialProgramsFog[Material.EMT_REFLECTION_2_LAYER] = programReflectionMaterialFog;
		this.MaterialProgramsFog[Material.EMT_TRANSPARENT_REFLECTION_2_LAYER] = programTranspReflectionMaterialFog;
		this.MaterialProgramsFog[Material.EMT_NORMAL_MAP_SOLID] = programNormalmappedMaterialFog;
		this.MaterialProgramsFog[Material.EMT_SOLID_VERTEX_ALPHA_TWO_TEXTURE_BLEND] = programSolidVertexAlphaTwoTextureBlendMaterialFog;
		this.MaterialProgramsFog[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS] = programTransparentAlphaChannelRefFogMoveGrass;

		// EMT_ONETEXTURE_BLEND
		this.MaterialProgramsFog[23] = programGouraudShadedFog;

		// -------------------------------------------------------------
		// dynamic light shaders with fog support
		programStandardMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud_fog);
		programTransparentAlphaChannelFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAlphaChannelRefFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud_alpharef_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAlphaChannelRefFogMoveGrass = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light_movegrass, this.fs_shader_onlyfirsttexture_gouraud_alpharef_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAddFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_onlyfirsttexture_gouraud_fog, true, gl.ONE, gl.ONE_MINUS_SRC_COLOR);

		programReflectionMaterialFog = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud_fog);
		programTranspReflectionMaterialFog = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programSolidVertexAlphaTwoTextureBlendMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light, this.fs_shader_vertex_alpha_two_textureblend_fog);

		this.MaterialProgramsWithLightFog[Material.EMT_SOLID] = programStandardMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_SOLID + 1] = programStandardMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_LIGHTMAP] = programLightmapMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_LIGHTMAP + 1] = programLightmapMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_LIGHTMAP + 2] = programLightmapMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_LIGHTMAP + 3] = programLightmapMaterial_m4Fog;
		this.MaterialProgramsWithLightFog[Material.EMT_TRANSPARENT_ADD_COLOR] = programTransparentAddFog;
		this.MaterialProgramsWithLightFog[Material.EMT_TRANSPARENT_ALPHA_CHANNEL] = programTransparentAlphaChannelFog;
		this.MaterialProgramsWithLightFog[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF] = programTransparentAlphaChannelRefFog;
		this.MaterialProgramsWithLightFog[Material.EMT_REFLECTION_2_LAYER] = programReflectionMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_TRANSPARENT_REFLECTION_2_LAYER] = programTranspReflectionMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_NORMAL_MAP_SOLID] = programNormalmappedMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_SOLID_VERTEX_ALPHA_TWO_TEXTURE_BLEND] = programSolidVertexAlphaTwoTextureBlendMaterialFog;
		this.MaterialProgramsWithLightFog[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS] = programTransparentAlphaChannelRefFogMoveGrass;

		// -------------------------------------------------------------
		// dynamic light + fog + shadow map shaders
		let vsshaderShadowMap = this.ShadowMapUsesRGBPacking ?
			this.fs_shader_onlyfirsttexture_gouraud_fog_shadow_map_rgbpack :
			this.fs_shader_onlyfirsttexture_gouraud_fog_shadow_map;

		programStandardMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_shadowmap_lookup, vsshaderShadowMap);
		programTransparentAlphaChannelFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_shadowmap_lookup, vsshaderShadowMap, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAlphaChannelRefFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_shadowmap_lookup, this.fs_shader_onlyfirsttexture_gouraud_alpharef_fog_shadow_map, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAlphaChannelRefFogMoveGrass = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_light_movegrass_with_shadowmap_lookup, this.fs_shader_onlyfirsttexture_gouraud_alpharef_fog_shadow_map, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programTransparentAddFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_shadowmap_lookup, vsshaderShadowMap, true, gl.ONE, gl.ONE_MINUS_SRC_COLOR);

		// TODO: this material needs  shadow map support
		programReflectionMaterialFog = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud_fog);
		programTranspReflectionMaterialFog = this.createMaterialTypeInternal(this.vs_shader_reflectiontransform_with_light, this.fs_shader_lightmapcombine_gouraud_fog, true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		programSolidVertexAlphaTwoTextureBlendMaterialFog = this.createMaterialTypeInternal(this.vs_shader_normaltransform_with_shadowmap_lookup, this.fs_shader_vertex_alpha_two_textureblend_fog_shadow_map);

		this.MaterialProgramsWithShadowMap[Material.EMT_SOLID] = programStandardMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_SOLID + 1] = programStandardMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_LIGHTMAP] = programLightmapMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_LIGHTMAP + 1] = programLightmapMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_LIGHTMAP + 2] = programLightmapMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_LIGHTMAP + 3] = programLightmapMaterial_m4Fog;
		this.MaterialProgramsWithShadowMap[Material.EMT_TRANSPARENT_ADD_COLOR] = programTransparentAddFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_TRANSPARENT_ALPHA_CHANNEL] = programTransparentAlphaChannelFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF] = programTransparentAlphaChannelRefFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_REFLECTION_2_LAYER] = programReflectionMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_TRANSPARENT_REFLECTION_2_LAYER] = programTranspReflectionMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_NORMAL_MAP_SOLID] = programNormalmappedMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_SOLID_VERTEX_ALPHA_TWO_TEXTURE_BLEND] = programSolidVertexAlphaTwoTextureBlendMaterialFog;
		this.MaterialProgramsWithShadowMap[Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS] = programTransparentAlphaChannelRefFogMoveGrass;


		// -------------------------------------------------------------
		// reset shader error output
		this.printShaderErrors = true;

		// set fallback materials
		for (let f = 0; f < this.MinExternalMaterialTypeId; ++f) {
			if (this.MaterialPrograms[f] == null)
				this.MaterialPrograms[f] = fallbackShader;

			if (this.MaterialProgramsWithLight[f] == null)
				this.MaterialProgramsWithLight[f] = fallbackShader;

			if (this.MaterialProgramsFog[f] == null)
				this.MaterialProgramsFog[f] = fallbackShader;

			if (this.MaterialProgramsWithLightFog[f] == null)
				this.MaterialProgramsWithLightFog[f] = fallbackShader;

			if (this.MaterialProgramsWithShadowMap[f] == null)
				this.MaterialProgramsWithShadowMap[f] = fallbackShader;
		}

		// set WebGL default values
		gl.useProgram(programStandardMaterial);
		this.currentGLProgram = programStandardMaterial;

		gl.clearColor(0, 0, 1, 1);
		gl.clearDepth(1.0);

		gl.depthMask(true);
		gl.enable(gl.DEPTH_TEST);
		gl.disable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		//gl.enable(gl.TEXTURE_2D); invalid in webgl
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
	}
	/**
	 * Sets the projection transformation matrix. This is automatically called by {@link CopperLicht.draw3dScene}(),
	 * so it shouldn't be necessary to call this yourself.
	 * @param {CL3D.Matrix4} m matrix representing the transformation matrix.
	 * @public
	 */
	setProjection(m) {
		m.copyTo(this.Projection);
	}
	/**
	 * Returns the currently used projection matrix.
	 * @public
	 */
	getProjection() {
		return this.Projection;
	}
	/**
	 * Sets the view transformation matrix. This is automatically called by {@link CopperLicht.draw3dScene}(),
	 * so it shouldn't be necessary to call this yourself.
	 * @param {CL3D.Matrix4} m matrix representing the transformation matrix.
	 * @public
	 */
	setView(m) {
		m.copyTo(this.View);
	}
	/**
	 * Returns the currently used view matrix.
	 * @public
	 */
	getView() {
		return this.View;
	}
	/**
	 * Returns the currently used view matrix.
	 * @public
	 */
	getWorld() {
		return this.World;
	}
	/**
	 * Sets the world transformation matrix. This is automatically called by {@link CopperLicht.draw3dScene}(),
	 * so it shouldn't be necessary to call this yourself.
	 * @param {CL3D.Matrix4} m matrix representing the transformation matrix.
	 * @public
	 */
	setWorld(m) {
		if (m)
			m.copyTo(this.World);
	}
	/**
	 * @public
	 */
	getMatrixAsWebGLFloatArray(mat) {
		return new Float32Array(mat.asArray());
	}
	/**
	 * @public
	 */
	findTexture(name) {
		return this.TheTextureManager.getTextureFromName(name);
	}
	/**
	 * Deletes a {@link Texture}, freeing a lot of memory
	 * @public
	 * @param {CL3D.Texture} tex the texture to draw
	 */
	deleteTexture(tex) {
		if (tex == null)
			return;

		let gl = this.gl;
		gl.deleteTexture(tex.getWebGLTexture());

		tex.Texture = null;
		tex.Loaded = false;

		if (tex.RTTFrameBuffer)
			gl.deleteFramebuffer(tex.RTTFrameBuffer);

		this.TheTextureManager.removeTexture(tex);

		tex.RTTFrameBuffer = null;
	}
	/**
	 * Creates a new render target {@link Texture}
	 * @public
	 * @param sx width of the texture
	 * @param sy height of the texture
	 */
	addRenderTargetTexture(sx, sy, createFloatingPointTexture, createDepthTexture, registerInTextureManagerWithThisName) {
		let gl = this.gl;

		// check for floating point extension
		if (createFloatingPointTexture) {
			// In WebGL1 to check for support for rendering to a floating point texture:
			// - first check for and enable the OES_texture_float extension
			// - then create a floating point texture
			// - attach it to a framebuffer
			// - call gl.checkFramebufferStatus to see if it returned gl.FRAMEBUFFER_COMPLETE
			// In WebGL2 you need to check for and enable EXT_color_buffer_float
			// or else gl.checkFramebufferStatus will never return gl.FRAMEBUFFER_COMPLETE for a floating point texture
			if (!this.UsesWebGL2) {
				// webgl 1
				let ext1 = gl.getExtension('OES_texture_float');
				if (!ext1)
					return null;
				this.ExtFloat = ext1;

				let ext2 = gl.getExtension('OES_texture_float_linear'); // for linear filtering
				if (!ext2)
					return null;
				this.ExtFloatLinear = ext2;
			}

			else {
				// webgl 2
				let ext1 = gl.getExtension('EXT_color_buffer_float');
				if (!ext1)
					return null;
				this.ExtFloat2 = ext1;

				let ext2 = gl.getExtension('OES_texture_float_linear'); // for linear filtering
				if (!ext2)
					return null;
				this.ExtFloatLinear = ext2;
			}
		}

		if (createDepthTexture && !this.UsesWebGL2) // in webgl 2, this is built-in
		{
			let ext = gl.getExtension('WEBGL_depth_texture');
			if (!ext)
				return null;
			this.ExtDepth = ext;
		}

		// texture
		let texture = gl.createTexture();

		gl.bindTexture(gl.TEXTURE_2D, texture);
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}

		if (createDepthTexture)
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, sx, sy, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

		else if (createFloatingPointTexture) {
			if (this.UsesWebGL2)
				// @ts-ignore
				gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA32F, sx, sy);

			else
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sx, sy, 0, gl.RGBA, gl.FLOAT, null);
		}

		else
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sx, sy, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

		// frame buffer
		let rttFramebuffer = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);
		rttFramebuffer.width = sx;
		rttFramebuffer.height = sy;

		if (createDepthTexture) {
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, texture, 0);
		}

		else {
			// render buffer
			let renderbuffer = gl.createRenderbuffer();
			gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, sx, sy);

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
		}

		// for floating point buffers, we need to check if it worked (it won't on old mobile devices although
		// they report it worked)
		if (createFloatingPointTexture) {
			let fbstatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
			if (fbstatus != gl.FRAMEBUFFER_COMPLETE) {
				gl.bindTexture(gl.TEXTURE_2D, null);
				gl.bindRenderbuffer(gl.RENDERBUFFER, null);
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				return null;
			}
		}

		// reset
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		// store
		let t = new Texture();
		t.Name = "";
		t.Texture = texture;
		t.Image = null;
		t.Loaded = true;
		t.CachedWidth = sx;
		t.CachedHeight = sy;
		t.OriginalWidth = sx;
		t.OriginalHeight = sy;
		t.RTTFrameBuffer = rttFramebuffer;
		t.IsFloatingPoint = createFloatingPointTexture;

		if (registerInTextureManagerWithThisName != null) {
			t.Name = registerInTextureManagerWithThisName;
			this.TheTextureManager.addTexture(t);
		}

		return t;
	}
	/**
	 * Sets the current render target
	 * @public
	 * @param {CL3D.Texture?} texture Texture or null, which will become the new render target
	 * @param clearBackBuffer To clear the buffer or not
	 * @param clearZBuffer To clear the zbuffer or not
	 * @param bgcolor Background color to set if clearBackBuffer is true
	 */
	setRenderTarget(texture, clearBackBuffer, clearZBuffer, bgcolor) {
		let gl = this.gl;

		if (texture != null) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, texture.RTTFrameBuffer);
			gl.viewport(0, 0, texture.CachedWidth, texture.CachedHeight);
		}

		else {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.viewport(0, 0, this.width, this.height);
		}

		if (this.CurrentRenderTarget != null) {
			// update mip maps of render target
			gl.bindTexture(gl.TEXTURE_2D, this.CurrentRenderTarget.Texture);
			gl.generateMipmap(gl.TEXTURE_2D);
		}

		this.CurrentRenderTarget = texture;

		if (clearBackBuffer || clearZBuffer) {
			let mask = 0;

			if (clearBackBuffer) {
				mask = mask | gl.COLOR_BUFFER_BIT;

				gl.clearColor(getRed(bgcolor) / 255.0,
					getGreen(bgcolor) / 255.0,
					getBlue(bgcolor) / 255.0,
					1);
			}

			if (clearZBuffer) {
				gl.clearDepth(this.InvertedDepthTest ? 0.0 : 1.0);
				mask = mask | gl.DEPTH_BUFFER_BIT;
			}

			gl.clear(mask);
		}

		return true;
	}
	/**
	 * Returns the current render target, usually a {@link Texture} texture or null
	 * @public
	 */
	getRenderTarget() {
		return this.CurrentRenderTarget;
	}
	/**
	 * Returns the size of the current render target, or screen size if no render target
	 * @public
	 */
	getRenderTargetSize() {
		if (this.CurrentRenderTarget)
			return new Vect2d(this.CurrentRenderTarget.CachedWidth, this.CurrentRenderTarget.CachedHeight);

		return new Vect2d(this.width, this.height);
	}
	/**
	 * Sets if the depth test should be enabled or not.
	 * @public
	 */
	setInvertedDepthTest(enable) {
		this.InvertedDepthTest = enable;
	}
	/**
	 * Replaces the content of a placeholder texture with the content of a new texture.
	 * The new texture shouldn't be used anymore after this.
	 * Useful for creating placeholder textures for videos, for example.
	 * @public
	 */
	replacePlaceholderTextureWithNewTextureContent(placeholderTexture, newtexture) {
		placeholderTexture.Texture = newtexture.Texture;
		placeholderTexture.CachedWidth = newtexture.CachedWidth;
		placeholderTexture.CachedHeight = newtexture.CachedHeight;
		placeholderTexture.OriginalWidth = newtexture.OriginalWidth;
		placeholderTexture.OriginalHeight = newtexture.OriginalHeight;
	}
	/**
	 * Fills an existing {@link Texture} with the content of a from a 2d canvas
	 * @public
	 * @param {HTMLCanvasElement} canvas a 2d canvas to be converted into a texture
	 * @param {boolean} nonscaling optional parameter, if set to true, and the texture don't have a power-of-two size, the texture will not be scaled up, but copied without scaling.
	 *        This is useful for font or 2D textures, for example, to make them less blurry.
	 */
	updateTextureFrom2DCanvas(t, canvas, nonscaling) {
		let gl = this.gl;

		let texture = t.Texture;
		gl.bindTexture(gl.TEXTURE_2D, texture);

		let origwidth = canvas.width;
		let origheight = canvas.height;

		if (canvas.videoWidth)
			origwidth = canvas.videoWidth;
		if (canvas.videoHeight)
			origheight = canvas.videoHeight;

		if (!this.isPowerOfTwo(origwidth) || !this.isPowerOfTwo(origheight)) {
			// Scale up the texture to the next highest power of two dimensions.
			let tmpcanvas = createCanvas();
			tmpcanvas.width = this.nextHighestPowerOfTwo(origwidth);
			tmpcanvas.height = this.nextHighestPowerOfTwo(origheight);
			let tmpctx = tmpcanvas.getContext("2d");

			tmpctx.fillStyle = "rgba(0, 255, 255, 1)";
			tmpctx.fillRect(0, 0, tmpcanvas.width, tmpcanvas.height);

			if (nonscaling)
				tmpctx.drawImage(canvas, 0, 0, origwidth, origheight, 0, 0, origwidth, origheight);

			else
				tmpctx.drawImage(canvas, 0, 0, origwidth, origheight, 0, 0, tmpcanvas.width, tmpcanvas.height);

			canvas = tmpcanvas;
			tmpcanvas.width;
			tmpcanvas.height;
		}

		//console.log("createTextureFrom2DCanvas orig " + origwidth + "x" + origheight + " and scaled" + scaledUpWidth + "x" + scaledUpHeight);
		this.fillTextureFromDOMObject(texture, canvas);

		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	/**
	 * Creates a {@link Texture} from a 2d canvas
	 * @public
	 * @param {HTMLCanvasElement} canvas a 2d canvas to be converted into a texture
	 * @param {boolean} nonscaling optional parameter, if set to true, and the texture don't have a power-of-two size, the texture will not be scaled up, but copied without scaling.
	 *        This is useful for font or 2D textures, for example, to make them less blurry.
	 */
	createTextureFrom2DCanvas(canvas, nonscaling) {
		let gl = this.gl;

		let texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		let origwidth = canvas.width;
		let origheight = canvas.height;

		if (globalThis.HTMLVideoElement && canvas instanceof HTMLVideoElement) {
			if (canvas.videoWidth)
				origwidth = canvas.videoWidth;
			if (canvas.videoHeight)
				origheight = canvas.videoHeight;
		}

		let scaledUpWidth = origwidth;
		let scaledUpHeight = origheight;

		if (!this.isPowerOfTwo(origwidth) || !this.isPowerOfTwo(origheight)) {
			// Scale up the texture to the next highest power of two dimensions.
			let tmpcanvas = createCanvas();
			tmpcanvas.width = this.nextHighestPowerOfTwo(origwidth);
			tmpcanvas.height = this.nextHighestPowerOfTwo(origheight);
			let tmpctx = tmpcanvas.getContext("2d");

			//tmpctx.fillStyle = "rgba(0, 255, 255, 1)";
			//tmpctx.fillRect(0, 0, tmpcanvas.width, tmpcanvas.height);
			if (nonscaling)
				tmpctx.drawImage(canvas, 0, 0, origwidth, origheight, 0, 0, origwidth, origheight);

			else
				tmpctx.drawImage(canvas, 0, 0, origwidth, origheight, 0, 0, tmpcanvas.width, tmpcanvas.height);

			canvas = tmpcanvas;
			scaledUpWidth = tmpcanvas.width;
			scaledUpHeight = tmpcanvas.height;
		}

		//console.log("createTextureFrom2DCanvas orig " + origwidth + "x" + origheight + " and scaled" + scaledUpWidth + "x" + scaledUpHeight);
		this.fillTextureFromDOMObject(texture, canvas);

		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);

		let t = new Texture();
		t.Name = "";
		t.Texture = texture;
		t.Image = null;
		t.Loaded = true;
		t.CachedWidth = scaledUpWidth;
		t.CachedHeight = scaledUpHeight;
		t.OriginalWidth = origwidth;
		t.OriginalHeight = origheight;

		return t;
	}
	/**
	 * Creates a {@link Texture} from pixels
	 * @public
	 * @param {ArrayBufferView} pixels source data for the texture
	 * @param {Number} width the width of the texture
	 * @param {Number} height the height of the texture
	 */
	createTextureFromPixels(pixels, width, height) {
		let gl = this.gl;

		let texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, pixels);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);

		let t = new Texture();
		t.Name = "";
		t.Texture = texture;
		t.Image = null;
		t.Loaded = true;
		t.CachedWidth = width;
		t.CachedHeight = height;
		t.OriginalWidth = width;
		t.OriginalHeight = height;

		return t;
	}
	/**
	 * @public
	 */
	isPowerOfTwo(x) {
		return (x & (x - 1)) == 0;
	}
	/**
	 * @public
	 */
	nextHighestPowerOfTwo(x) {
		--x;
		for (let i = 1; i < 32; i <<= 1) {
			x = x | x >> i;
		}
		return x + 1;
	}
	/**
	 * @public
	 * domobj is an image or a canvas element
	 */
	fillTextureFromDOMObject(wgltex, domobj) {
		let gl = this.gl;

		// new version replaced the old:
		//  texImage2D(target, level, HTMLImageElement, [optional] flipY, [optional] premultiplyAlpha)
		//  with the new
		// texImage2D(target, level, internalformat, format, type, HTMLImageElement)
		// concrete:
		try {
			// new version
			//void texImage2D(GLenum target, GLint level, GLenum internalformat,
			//           GLenum format, GLenum type, HTMLImageElement image) raises (DOMException);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, domobj);

		}
		catch (e) {
			if (e.code != null && DOMException != null && DOMException['SECURITY_ERR'] != null &&
				e.code == DOMException['SECURITY_ERR']) {
				if (this.domainTextureLoadErrorPrinted == false)
					console.log("<i>A security setting in the browser prevented loading a texture.<br/>Workaround: run this from a webserver, change security settings, or allow the specific domain.</i>", true);

				this.domainTextureLoadErrorPrinted = true;
				return;
			}
			//console.log(browserVersion + "Could not texImage2D texture: " + e);
		}

	}
	/**
	 * @public
	 */
	finalizeLoadedImageTexture(t) {
		let gl = this.gl;

		let texture = gl.createTexture();
		let objToCopyFrom = t.Image;

		// Scale up the texture to the next highest power of two dimensions.
		if (!this.isPowerOfTwo(objToCopyFrom.width) || !this.isPowerOfTwo(objToCopyFrom.height)) {
			let tmpcanvas = createCanvas();
			if (tmpcanvas != null) {
				tmpcanvas.width = this.nextHighestPowerOfTwo(objToCopyFrom.width);
				tmpcanvas.height = this.nextHighestPowerOfTwo(objToCopyFrom.height);
				let tmpctx = tmpcanvas.getContext("2d");
				tmpctx.drawImage(objToCopyFrom,
					0, 0, objToCopyFrom.width, objToCopyFrom.height,
					0, 0, tmpcanvas.width, tmpcanvas.height);
	
				objToCopyFrom = tmpcanvas;
			}
		}

		gl.bindTexture(gl.TEXTURE_2D, texture);

		this.fillTextureFromDOMObject(texture, objToCopyFrom);

		//  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		//	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_2D);

		// TODO: enable these lines for anisotropic filtering (looks much nicer)
		/*let ext = gl.getExtension('EXT_texture_filter_anisotropic');
		if (ext)
		{
			gl.texParameterf(gl.TEXTURE_2D, ext['TEXTURE_MAX_ANISOTROPY_EXT'], 4);
		}*/
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

		gl.bindTexture(gl.TEXTURE_2D, null);

		this.textureWasLoadedFlag = true;

		t.Texture = texture;
	}
	/**
	 * @public
	 */
	getStaticBillboardMeshBuffer() {
		if (this.StaticBillboardMeshBuffer == null)
			this.createStaticBillboardMeshBuffer();

		return this.StaticBillboardMeshBuffer;
	}
	/**
	 * @public
	 */
	createStaticBillboardMeshBuffer() {
		if (this.StaticBillboardMeshBuffer != null)
			return;

		let mb = null;

		mb = new MeshBuffer();
		let vtx1 = new Vertex3D(true);
		let vtx2 = new Vertex3D(true);
		let vtx3 = new Vertex3D(true);
		let vtx4 = new Vertex3D(true);

		let indices = mb.Indices;
		indices.push(0);
		indices.push(2);
		indices.push(1);
		indices.push(0);
		indices.push(3);
		indices.push(2);

		let vertices = mb.Vertices;
		vertices.push(vtx1);
		vertices.push(vtx2);
		vertices.push(vtx3);
		vertices.push(vtx4);

		vtx1.TCoords.X = 1;
		vtx1.TCoords.Y = 1;
		vtx1.Pos.set(1, -1, 0);

		vtx2.TCoords.X = 1;
		vtx2.TCoords.Y = 0;
		vtx2.Pos.set(1, 1, 0);

		vtx3.TCoords.X = 0;
		vtx3.TCoords.Y = 0;
		vtx3.Pos.set(-1, 1, 0);

		vtx4.TCoords.X = 0;
		vtx4.TCoords.Y = 1;
		vtx4.Pos.set(-1, -1, 0);

		this.StaticBillboardMeshBuffer = mb;
	}
	/**
	 * Quickly enables / Disables rendering with shadow map support without any state changes. If enabled, all materials drawn will
	 * Use the shadow map and the light matrix for rendering their geometry from a light.
	 * @public
	 **/
	quicklyEnableShadowMap(enable) {
		this.ShadowMapEnabled = enable;
	}
	/**
	 * @public
	 **/
	isShadowMapEnabled() {
		return this.ShadowMapEnabled;
	}
	/**
	 * Enables / Disables rendering with shadow map support. If enabled, all materials drawn will
	 * Use the shadow map and the light matrix for rendering their geometry from a light.
	 * @public
	 **/
	enableShadowMap(enable,
		shadowMapTexture,
		shadowMapLightMatrix,
		shadowMapTexture2,
		shadowMapLightMatrix2) {
		this.ShadowMapEnabled = enable;
		this.ShadowMapTexture = shadowMapTexture;
		this.ShadowMapTexture2 = shadowMapTexture2;

		if (shadowMapLightMatrix != null)
			this.ShadowMapLightMatrix = shadowMapLightMatrix.clone();

		else
			this.ShadowMapLightMatrix = null;

		if (shadowMapLightMatrix2 != null)
			this.ShadowMapLightMatrix2 = shadowMapLightMatrix2.clone();

		else
			this.ShadowMapLightMatrix2 = null;
	}
}

/**
 * @constructor
 * @public
 */
class Action
{
    constructor()
    {
        this.Type = '';
    }
    
    /**
     * @public
     * @param {CL3D.SceneNode} node 
     * @param {CL3D.Scene=} mgr 
     */
    execute(node, mgr)
    {

    }

    /**
     * @public
     * @param {Number} oldNodeId 
     * @param {Number} newNodeId 
     */
    createClone(oldNodeId, newNodeId)
    {
        return null;
    }
}

// ---------------------------------------------------------------------
// Action Handler
// ---------------------------------------------------------------------


/**
 * @constructor
 * @public
 * @class
 */
class ActionHandler {
    /**
     * @param {CL3D.Scene} scene 
     */
    constructor(scene) {

        /**
         * @type {CL3D.Action[]}
         */
        this.Actions = new Array();
        this.SMGr = scene;
    }

    /**
     * @public
     * @param {CL3D.SceneNode} node 
     */
    execute(node) {
        for (var i = 0; i < this.Actions.length; ++i) {
            this.Actions[i].execute(node, this.SMGr);
        }
    }

    /**
     * @public
     * @param {CL3D.Action} a 
     */
    addAction(a) {
        if (a == null)
            return;

        this.Actions.push(a);
    }

    /**
     * @public
     * @param {String} type 
     */
    findAction(type) {
        for (var i = 0; i < this.Actions.length; ++i) {
            var a = this.Actions[i];
            if (a.Type == type)
                return a;
        }

        return null;
    }
    
    /**
     * @public
     * @param {Number} oldNodeId 
     * @param {Number} newNodeId 
     */
    createClone(oldNodeId, newNodeId) {
        var c = new ActionHandler(this.SMGr);

        for (var i = 0; i < this.Actions.length; ++i) {
            var a = this.Actions[i];
            if (a.createClone != null)
                c.addAction(a.createClone(oldNodeId, newNodeId));
        }

        return c;
    }
}

// ---------------------------------------------------------------------
// Action CloneSceneNode
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionCloneSceneNode extends Action {
    /**
     * @type {Number}
     */
    SceneNodeToClone;
    /**
     * @type {boolean}
     */
    CloneCurrentSceneNode;
    /**
     * @type {CL3D.ActionHandler}
     */
    TheActionHandler;

    constructor() {
        super();

        this.Type = 'CloneSceneNode';
    }

    /**
     * @param {Number} oldNodeId
     * @param {Number} newNodeId
     */
    createClone(oldNodeId, newNodeId) {
        var a = new ActionCloneSceneNode();
        a.SceneNodeToClone = this.SceneNodeToClone;
        a.CloneCurrentSceneNode = this.CloneCurrentSceneNode;
        a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;

        if (a.SceneNodeToClone == oldNodeId)
            a.SceneNodeToClone = newNodeId;
        return a;
    }

    /**
     * @param {CL3D.SceneNode} currentNode
     * @param {CL3D.Scene} sceneManager
     */
    execute(currentNode, sceneManager) {
        if (!currentNode || !sceneManager)
            return;

        var nodeToHandle = null;
        if (this.CloneCurrentSceneNode)
            nodeToHandle = currentNode;
        else
            if (this.SceneNodeToClone != -1)
                nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToClone);

        if (nodeToHandle) {
            var oldId = nodeToHandle.Id;
            var newId = -1;

            // get new, unused id
            newId = sceneManager.getUnusedSceneNodeId();

            // clone
            var cloned = nodeToHandle.createClone(nodeToHandle.Parent, oldId, newId);

            if (cloned != null) {
                cloned.Id = newId;
                nodeToHandle.Parent.addChild(cloned);

                // update refernced ids which haven't been updated yet
                sceneManager.replaceAllReferencedNodes(nodeToHandle, cloned);

                // also clone collision detection of the node in the world
                var selector = nodeToHandle.Selector;
                if (selector) {
                    var newSelector = selector.createClone(cloned);
                    if (newSelector) {
                        // set to node
                        cloned.Selector = newSelector;

                        // also, copy into world
                        if (sceneManager.getCollisionGeometry())
                            sceneManager.getCollisionGeometry().addSelector(newSelector);
                    }
                }

                // run action on clone
                if (this.TheActionHandler)
                    this.TheActionHandler.execute(cloned);
            }
        }
    }
}

// ---------------------------------------------------------------------
// Action DeleteSceneNode
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionDeleteSceneNode extends Action {
    /**
     * @type {Number}
     */
    SceneNodeToDelete;
    /**
     * @type {boolean}
     */
    DeleteCurrentSceneNode;
    /**
     * @type {Number}
     */
    TimeAfterDelete;
    
    constructor() {
        super();

        this.Type = 'DeleteSceneNode';
    }

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
    createClone(oldNodeId, newNodeId) {
        var a = new ActionDeleteSceneNode();
        a.SceneNodeToDelete = this.SceneNodeToDelete;
        a.DeleteCurrentSceneNode = this.DeleteCurrentSceneNode;
        a.TimeAfterDelete = this.TimeAfterDelete;

        if (a.SceneNodeToDelete == oldNodeId)
            a.SceneNodeToDelete = newNodeId;

        return a;
    }

	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
    execute(currentNode, sceneManager) {
        if (!currentNode || !sceneManager)
            return;

        var nodeToHandle = null;
        if (this.DeleteCurrentSceneNode)
            nodeToHandle = currentNode;
        else
            if (this.SceneNodeToDelete != -1)
                nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToDelete);

        if (nodeToHandle != null)
            sceneManager.addToDeletionQueue(nodeToHandle, this.TimeAfterDelete);
    }
}

// ---------------------------------------------------------------------
// Action SetSceneNodeAnimation
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionSetSceneNodeAnimation extends Action {
	/**
	 * @type {Number}
	 */
	SceneNodeToChangeAnim;
	/**
	 * @type {boolean}
	 */
	ChangeCurrentSceneNode;
	/**
	 * @type {boolean}
	 */
	Loop;
	/**
	 * @type {String}
	 */
	AnimName;

	constructor() {
        super();

		this.Type = 'SetSceneNodeAnimation';
	}
    
	/**
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionSetSceneNodeAnimation();
		a.SceneNodeToChangeAnim = this.SceneNodeToChangeAnim;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
		a.Loop = this.Loop;
		a.AnimName = this.AnimName;

		if (a.SceneNodeToChangeAnim == oldNodeId)
			a.SceneNodeToChangeAnim = newNodeId;

		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToChangeAnim != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToChangeAnim);

		if (nodeToHandle) {
			// set animation
			var animatedMesh = nodeToHandle;
			if (animatedMesh instanceof AnimatedMeshSceneNode && animatedMesh.getType() == 'animatedmesh') {
				animatedMesh.setAnimationByEditorName(this.AnimName, this.Loop);
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action ChangeSceneNodeTexture
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionChangeSceneNodeTexture extends Action {
	/**
	 * @type {Number}
	 */
	TextureChangeType;
	/**
	 * @type {Number}
	 */
	SceneNodeToChange;
	/**
	 * @type {boolean}
	 */
	ChangeCurrentSceneNode;
	/**
	 * @type {CL3D.Texture}
	 */
	TheTexture;
	/**
	 * @type {Number}
	 */
	IndexToChange;
	
	constructor() {
        super();

		this.Type = 'ChangeSceneNodeTexture';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionChangeSceneNodeTexture();
		a.TextureChangeType = this.TextureChangeType;
		a.SceneNodeToChange = this.SceneNodeToChange;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
		a.TheTexture = this.TheTexture;
		a.IndexToChange = this.IndexToChange;

		if (a.SceneNodeToChange == oldNodeId)
			a.SceneNodeToChange = newNodeId;

		return a;
	}
    
	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToChange != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToChange);

		if (nodeToHandle) {
			if (nodeToHandle instanceof Overlay2DSceneNode && nodeToHandle.getType() == '2doverlay') {
				nodeToHandle.setShowImage(this.TheTexture);
			}

			else {
				var mcnt = nodeToHandle.getMaterialCount();

				if (this.TextureChangeType == 0) // EIT_REPLACE_ALL
				{
					for (var i = 0; i < mcnt; ++i) {
						var mat = nodeToHandle.getMaterial(i);
						mat.Tex1 = this.TheTexture;
					}
				}

				else if (this.TextureChangeType == 1) // EIT_CHANGE_SPECIFIC_INDEX
				{
					var mat = nodeToHandle.getMaterial(this.IndexToChange);
					if (mat != null)
						mat.Tex1 = this.TheTexture;
				}
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action ChangeSceneNodeScale
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionChangeSceneNodeScale extends Action {
	/**
	 * @type {Number}
	 */
	ScaleChangeType;
	/**
	 * @type {Number}
	 */
	SceneNodeToChangeScale;
	/**
	 * @type {boolean}
	 */
	ChangeCurrentSceneNode;
	/**
	 * @type {CL3D.Vect3d}
	 */
	Vector;
	
	constructor() {
        super();

		this.Type = 'ChangeSceneNodeScale';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionChangeSceneNodeScale();
		a.ScaleChangeType = this.ScaleChangeType;
		a.SceneNodeToChangeScale = this.SceneNodeToChangeScale;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
		a.Vector = this.Vector ? this.Vector.clone() : null;

		if (a.SceneNodeToChangeScale == oldNodeId)
			a.SceneNodeToChangeScale = newNodeId;

		return a;
	}
    
	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToChangeScale != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToChangeScale);

		if (nodeToHandle) {
			switch (this.ScaleChangeType) {
				case 0: //EIT_ABSOLUTE_SCALE:
					nodeToHandle.Scale = this.Vector.clone();
					break;
				case 1: //EIT_RELATIVE_SCALE:
					nodeToHandle.Scale = nodeToHandle.Scale.multiplyWithVect(this.Vector);
					break;
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action ChangeSceneNodeRotation
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionChangeSceneNodeRotation extends Action {
	/**
	 * @type {Number}
	 */
	RotationChangeType;
	/**
	 * @type {Number}
	 */
	SceneNodeToChangeRotation;
	/**
	 * @type {boolean}
	 */
	ChangeCurrentSceneNode;
	/**
	 * @type {CL3D.Vect3d}
	 */
	Vector;
	/**
	 * @type {boolean}
	 */
	RotateAnimated;
	/**
	 * @type {Number}
	 */
	TimeNeededForRotationMs;
	

	constructor() {
        super();

		this.Type = 'ChangeSceneNodeRotation';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionChangeSceneNodeRotation();
		a.RotationChangeType = this.RotationChangeType;
		a.SceneNodeToChangeRotation = this.SceneNodeToChangeRotation;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
		a.Vector = this.Vector ? this.Vector.clone() : null;
		a.RotateAnimated = this.RotateAnimated;
		a.TimeNeededForRotationMs = this.TimeNeededForRotationMs;

		if (a.SceneNodeToChangeRotation == oldNodeId)
			a.SceneNodeToChangeRotation = newNodeId;
		return a;
	}
    
	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToChangeRotation != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToChangeRotation);

		if (nodeToHandle) {
			var finalRot = null;

			switch (this.RotationChangeType) {
				case 0: //EIT_ABSOLUTE_ROTATION:
					finalRot = this.Vector.clone();
					break;
				case 1: //EIT_RELATIVE_ROTATION:
					finalRot = nodeToHandle.Rot.add(this.Vector);
					break;
			}

			if (finalRot) {
				if (!this.RotateAnimated) {
					// not animated, set rotation directly
					nodeToHandle.Rot = finalRot;
				}

				else {
					// rotate animated to target
					var anim = new AnimatorRotation();
					anim.setRotateToTargetAndStop(finalRot, nodeToHandle.Rot, this.TimeNeededForRotationMs);

					nodeToHandle.addAnimator(anim);
				}
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action ChangeSceneNodePosition
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionChangeSceneNodePosition extends Action {
	/**
	 * @type {Number}
	 */
	PositionChangeType;
	/**
	 * @type {Number}
	 */
	SceneNodeToChangePosition;
	/**
	 * @type {boolean}
	 */
	ChangeCurrentSceneNode;
	/**
	 * @type {CL3D.Vect3d}
	 */
	Vector;
	/**
	 * @type {CL3D.Vect3d}
	 */
	Area3DEnd;
	/**
	 * @type {boolean}
	 */
	RelativeToCurrentSceneNode;
	/**
	 * @type {Number}
	 */
	SceneNodeRelativeTo;


	constructor() {
		super();

		this.UseAnimatedMovement = false;
		this.TimeNeededForMovementMs = 0;
		this.Type = 'ChangeSceneNodePosition';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionChangeSceneNodePosition();
		a.PositionChangeType = this.PositionChangeType;
		a.SceneNodeToChangePosition = this.SceneNodeToChangePosition;
		a.SceneNodeRelativeTo = this.SceneNodeRelativeTo;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
		a.RelativeToCurrentSceneNode = this.RelativeToCurrentSceneNode;
		a.Vector = this.Vector ? this.Vector.clone() : null;
		a.Area3DEnd = this.Area3DEnd ? this.Area3DEnd.clone() : null;
		a.UseAnimatedMovement = this.UseAnimatedMovement;
		a.TimeNeededForMovementMs = this.TimeNeededForMovementMs;

		if (a.SceneNodeToChangePosition == oldNodeId)
			a.SceneNodeToChangePosition = newNodeId;
		if (a.SceneNodeRelativeTo == oldNodeId)
			a.SceneNodeRelativeTo = newNodeId;

		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToChangePosition != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToChangePosition);

		if (nodeToHandle) {
			var finalpos = null;

			switch (this.PositionChangeType) {
				case 0: //EIT_ABSOLUTE_POSITION:
					finalpos = this.Vector.clone();
					break;
				case 1: //EIT_RELATIVE_POSITION:
					finalpos = nodeToHandle.Pos.add(this.Vector);
					break;
				case 2: //EIT_RELATIVE_TO_SCENE_NODE:
					{
						var nodeRelativeTo = null;
						if (this.RelativeToCurrentSceneNode)
							nodeRelativeTo = currentNode;

						else if (this.SceneNodeRelativeTo != -1)
							nodeRelativeTo = sceneManager.getSceneNodeFromId(this.SceneNodeRelativeTo);

						if (nodeRelativeTo)
							finalpos = nodeRelativeTo.Pos.add(this.Vector);
					}
					break;
				case 3: //EIT_RELATIVE_IN_FACING_DIRECTION:
					{
						var len = this.Vector.getLength();
						var matr = nodeToHandle.AbsoluteTransformation;

						var moveVect = new Vect3d(1, 0, 0);
						matr.rotateVect(moveVect);

						if (nodeToHandle instanceof CameraSceneNode && nodeToHandle.getType() == 'camera')
							moveVect = nodeToHandle.Target.substract(nodeToHandle.Pos);

						moveVect.setLength(len);

						finalpos = nodeToHandle.Pos.add(moveVect);
					}
					break;
				case 4: //EIT_RANDOM_POSITION:
					{
						var box = new Box3d();
						box.reset(this.Vector.X, this.Vector.Y, this.Vector.Z);
						box.addInternalPointByVector(this.Area3DEnd);

						finalpos = new Vect3d();
						finalpos.X = box.MinEdge.X + (Math.random() * (box.MaxEdge.X - box.MinEdge.X));
						finalpos.Y = box.MinEdge.Y + (Math.random() * (box.MaxEdge.Y - box.MinEdge.Y));
						finalpos.Z = box.MinEdge.Z + (Math.random() * (box.MaxEdge.Z - box.MinEdge.Z));
					}
					break;
				case 5: //EIT_RELATIVE_TO_LAST_BULLET_IMPACT:
					{
						finalpos = sceneManager.LastBulletImpactPosition.add(this.Vector);
					}
					break;
			}

			if (finalpos != null) {
				if (this.UseAnimatedMovement && this.TimeNeededForMovementMs > 0) {
					// move animated to target
					var anim = new AnimatorFlyStraight();
					anim.Start = nodeToHandle.Pos.clone();
					anim.End = finalpos;
					anim.TimeForWay = this.TimeNeededForMovementMs;
					anim.DeleteMeAfterEndReached = true;
					anim.recalculateImidiateValues();

					nodeToHandle.addAnimator(anim);
				}

				else {
					// set position directly
					nodeToHandle.Pos = finalpos;
				}
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action MakeSceneNodeInvisible
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionMakeSceneNodeInvisible extends Action {
	constructor() {
        super();

		this.InvisibleMakeType = 0;
		this.SceneNodeToMakeInvisible = null;
		this.ChangeCurrentSceneNode = false;
		this.Type = 'MakeSceneNodeInvisible';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionMakeSceneNodeInvisible();
		a.InvisibleMakeType = this.InvisibleMakeType;
		a.SceneNodeToMakeInvisible = this.SceneNodeToMakeInvisible;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;

		if (a.SceneNodeToMakeInvisible == oldNodeId)
			a.SceneNodeToMakeInvisible = newNodeId;

		return a;
	}
    
	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToMakeInvisible != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToMakeInvisible);

		if (nodeToHandle) {
			switch (this.InvisibleMakeType) {
				case 0: //EIT_MAKE_INVISIBLE:
					nodeToHandle.Visible = false;
					break;
				case 1: //EIT_MAKE_VISIBLE:
					nodeToHandle.Visible = true;
					break;
				case 2: //EIT_TOGGLE_VISIBILITY:
					{
						nodeToHandle.Visible = !nodeToHandle.Visible;
					}
					break;
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action IfVariable
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionIfVariable extends Action {
	/**
	 * @type {String}
	 */
	VariableName;
	/**
	 * @type {Number}
	 */
	ComparisonType;
	/**
	 * @type {Number}
	 */
	ValueType;
	/**
	 * @type {String}
	 */
	Value;
	/**
	 * @type {CL3D.ActionHandler}
	 */
	TheActionHandler;
	/**
	 * @type {CL3D.ActionHandler}
	 */
	TheElseActionHandler;

	constructor() {
        super();

		// variables set in loader
		// this.VariableName = this.ReadString();
		// this.ComparisonType = this.Data.readInt();
		// this.ValueType = this.Data.readInt();
		// this.Value = this.ReadString();
		// this.TheActionHandler
		this.Type = 'IfVariable';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionIfVariable();
		a.VariableName = this.VariableName;
		a.ComparisonType = this.ComparisonType;
		a.ValueType = this.ValueType;
		a.Value = this.Value;
		a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;
		a.TheElseActionHandler = this.TheElseActionHandler ? this.TheElseActionHandler.createClone(oldNodeId, newNodeId) : null;
		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		if (this.VariableName == null)
			return;

		var var1 = CopperCubeVariable.getVariable(this.VariableName, true, sceneManager);
		if (var1 == null) // should not happen since the function above creates if not found
			return;

		var var2 = null;

		if (this.ValueType == 1) //EO_VARIABLE)
		{
			var2 = CopperCubeVariable.getVariable(this.Value, false, sceneManager);
			if (var2 == null)
				return; // operand variable not existing
		}

		if (var2 == null) {
			var2 = new CopperCubeVariable();
			var2.setValueAsString(this.Value);
		}

		var execute = false;

		switch (this.ComparisonType) {
			case 0: //EO_EQUAL:
			case 1: //EO_NOT_EQUAL:
				{
					if (var1.isString() && var2.isString())
						// string compare
						execute = var1.getValueAsString() == var2.getValueAsString();

					else
						// number compare
						execute = equals(var1.getValueAsFloat(), var2.getValueAsFloat());

					if (this.ComparisonType == 1) //EO_NOT_EQUAL)
						execute = !execute;
					break;
				}
			case 2: //EO_BIGGER_THAN:
				{
					execute = var1.getValueAsFloat() > var2.getValueAsFloat();
				}
				break;
			case 3: //EO_SMALLER_THAN:
				{
					execute = var1.getValueAsFloat() < var2.getValueAsFloat();
				}
				break;
		}

		if (execute) {
			if (this.TheActionHandler)
				this.TheActionHandler.execute(currentNode);
		}

		else {
			if (this.TheElseActionHandler)
				this.TheElseActionHandler.execute(currentNode);
		}
	}
}

// ---------------------------------------------------------------------
// Action Store Load Variable
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionStoreLoadVariable extends Action {
    /**
     * @type {boolean}
     */
    Load;
    /**
     * @type {String}
     */
    VariableName;

    constructor() {
        super();

        this.Type = 'StoreLoadVariable';
    }

    /**
     * @param {Number} oldNodeId
     * @param {Number} newNodeId
     */
    createClone(oldNodeId, newNodeId) {
        var a = new ActionStoreLoadVariable();
        a.Load = this.Load;
        a.VariableName = this.VariableName;
        return a;
    }

    /**
     * @param {String} cookieName
     * @param {String} value
     * @param {Number} expdays
     */
    setCookie(cookieName, value, expdays) {
        var expdate = new Date();
        expdate.setDate(expdate.getDate() + expdays);
        var cvalue = encodeURIComponent(value) + ("; expires=" + expdate.toUTCString());
        document.cookie = cookieName + "=" + cvalue;
    }

    /**
     * @param {String} cookieName
     */
    getCookie(cookieName) {
        var ARRcookies = document.cookie.split(";");
        for (var i = 0; i < ARRcookies.length; ++i) {
            var cookie = ARRcookies[i];
            var equalspos = cookie.indexOf("=");
            var varname = cookie.substr(0, equalspos);

            varname = varname.replace(/^\s+|\s+$/g, "");

            if (varname == cookieName)
                return unescape(cookie.substr(equalspos + 1));
        }

        return null;
    }

    /**
     * @param {CL3D.SceneNode} currentNode
     * @param {CL3D.Scene} sceneManager
     */
    execute(currentNode, sceneManager) {
        if (this.VariableName == null || this.VariableName == "")
            return;

        var var1 = CopperCubeVariable.getVariable(this.VariableName, this.Load, sceneManager);

        if (var1 != null) {
            try {
                if (this.Load) {
                    // load
                    var1.setValueAsString(this.getCookie(var1.getName()));
                }

                else {
                    // save
                    this.setCookie(var1.getName(), var1.getValueAsString(), 99);
                }
            }
            catch (e) {
                //Debug.print("error loading/saving data");
            }
        }
    }
}

// ---------------------------------------------------------------------
// Action SetOrChangeAVariable
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionSetOrChangeAVariable extends Action {
	/**
	 * @type {String}
	 */
	VariableName;
	/**
	 * @type {Number}
	 */
	Operation;
	/**
	 * @type {Number}
	 */
	ValueType;
	/**
	 * @type {String}
	 */
	Value;

	constructor() {
        super();

		// variables set in loader
		//this.VariableName = this.ReadString();
		//this.Operation = this.Data.readInt();
		//this.ValueType = this.Data.readInt();
		//this.Value = this.ReadString();
		this.Type = 'SetOrChangeAVariable';
	}

	/**
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionSetOrChangeAVariable();
		a.VariableName = this.VariableName;
		a.Operation = this.Operation;
		a.ValueType = this.ValueType;
		a.Value = this.Value;
		return a;
	}
    
	/** 
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		if (this.VariableName == null)
			return;

		var var1 = CopperCubeVariable.getVariable(this.VariableName, true, sceneManager);
		if (var1 == null)
			return;

		var var2 = null;

		if (this.ValueType == 1) //EO_VARIABLE)
		{
			var2 = CopperCubeVariable.getVariable(this.Value, false, sceneManager);
			if (var2 == null)
				return; // operand variable not existing
		}

		if (var2 == null) {
			var2 = new CopperCubeVariable();
			var2.setValueAsString(this.Value);
		}

		switch (this.Operation) {
			case 0: //EO_SET:
				var1.setAsCopy(var2);
				break;
			case 1: //EO_ADD:
				var1.setValueAsFloat(var1.getValueAsFloat() + var2.getValueAsFloat());
				break;
			case 2: //EO_SUBSTRACT:
				var1.setValueAsFloat(var1.getValueAsFloat() - var2.getValueAsFloat());
				break;
			case 3: //EO_DIVIDE:
				{
					var diva = var2.getValueAsFloat();
					var1.setValueAsFloat((diva != 0) ? (var1.getValueAsFloat() / diva) : 0);
				}
				break;
			case 4: //EO_DIVIDE_INT:
				{
					var divb = var2.getValueAsFloat();
					var1.setValueAsInt((divb != 0) ? Math.floor(var1.getValueAsFloat() / divb) : 0);
				}
				break;
			case 5: //EO_MULTIPLY:
				var1.setValueAsFloat(var1.getValueAsFloat() * var2.getValueAsFloat());
				break;
			case 6: //EO_MULTIPLY_INT:
				var1.setValueAsInt(Math.floor(var1.getValueAsFloat() * var2.getValueAsFloat()));
				break;
		}

		CopperCubeVariable.saveContentOfPotentialTemporaryVariableIntoSource(var1, sceneManager);
	}
}

// ---------------------------------------------------------------------
// Action PlayMovie
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionPlayMovie extends Action {
    /**
     * @type {boolean}
     */
    PlayLooped;
    /**
     * @type {Number}
     */
    Command;
    /**
     * @type {String}
     */
    VideoFileName;
    /**
     * @type {Number}
     */
    SceneNodeToPlayAt;
    /**
     * @type {boolean}
     */
    PlayAtCurrentSceneNode;
    /**
     * @type {Number}
     */
    MaterialIndex;
    /**
     * @type {CL3D.ActionHandler}
     */
    ActionHandlerFinished;
    /**
     * @type {CL3D.ActionHandler}
     */
    ActionHandlerFailed;

    /**
     * @param {CL3D.CopperLicht} [engine]
     */
    constructor(engine) {
        super();

        this.Type = 'ActionPlayMovie';
        this.Engine = engine;
    }

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
    createClone(oldNodeId, newNodeId) {
        var a = new ActionPlayMovie();
        a.PlayLooped = this.PlayLooped;
        a.Command = this.Command;
        a.VideoFileName = this.VideoFileName;
        a.SceneNodeToPlayAt = this.SceneNodeToPlayAt;
        a.PlayAtCurrentSceneNode = this.PlayAtCurrentSceneNode;
        a.MaterialIndex = this.MaterialIndex;
        a.ActionHandlerFinished = this.ActionHandlerFinished ? this.ActionHandlerFinished.createClone(oldNodeId, newNodeId) : null;
        a.ActionHandlerFailed = this.ActionHandlerFailed ? this.ActionHandlerFailed.createClone(oldNodeId, newNodeId) : null;

        if (a.SceneNodeToPlayAt == oldNodeId)
            a.SceneNodeToPlayAt = newNodeId;

        return a;
    }

	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
    execute(currentNode, sceneManager) {
        if (!currentNode || !sceneManager)
            return;

        var nodeToHandle = null;
        if (this.PlayAtCurrentSceneNode)
            nodeToHandle = currentNode;
        else
            if (this.SceneNodeToPlayAt != -1)
                nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToPlayAt);

        // create video stream
        var stream = this.Engine.getOrCreateVideoStream(this.VideoFileName, this.Command == 0, this.ActionHandlerFinished, this.ActionHandlerFailed);

        if (stream != null) {
            switch (this.Command) {
                case 0: // play
                    {
                        stream.play(this.PlayLooped);

                        // set texture
                        if (nodeToHandle) {
                            if (nodeToHandle instanceof Overlay2DSceneNode && nodeToHandle.getType() == '2doverlay')
                                nodeToHandle.setShowImage(stream.texture);
                            else {
                                var mat = nodeToHandle.getMaterial(this.MaterialIndex);
                                if (mat != null)
                                    mat.Tex1 = stream.texture;
                            }
                        }
                    }
                    break;

                case 1: // pause
                    stream.pause();
                    break;

                case 2: // stop
                    stream.stop();
                    break;
            }
        }
    }
}

// ---------------------------------------------------------------------
// Action PlaySound
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionPlaySound extends Action {
	/**
	 * @type {Number}
	 */
	SceneNodeToPlayAt;
	/**
	 * @type {boolean}
	 */
	PlayAtCurrentSceneNode;
	/**
	 * @type {CL3D.Vect3d}
	 */
	Position3D;
	/**
	 * @type {Number}
	 */
	MinDistance;
	/**
	 * @type {Number}
	 */
	MaxDistance;
	/**
	 * @type {boolean}
	 */
	PlayLooped;
	/**
	 * @type {Number}
	 */
	Volume;
	/**
	 * @type {boolean}
	 */
	PlayAs2D;
	/**
	 * @type {null}
	 */
	TheSound;

	constructor() {
		super();

		this.Type = 'PlaySound';
	}

	/**
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionPlaySound();
		a.SceneNodeToPlayAt = this.SceneNodeToPlayAt;
		a.PlayAtCurrentSceneNode = this.PlayAtCurrentSceneNode;
		a.Position3D = this.Position3D ? this.Position3D.clone() : null;
		a.MinDistance = this.MinDistance;
		a.MaxDistance = this.MaxDistance;
		a.PlayLooped = this.PlayLooped;
		a.Volume = this.Volume;
		a.PlayAs2D = this.PlayAs2D;
		a.TheSound = this.TheSound;

		if (a.SceneNodeToPlayAt == oldNodeId)
			a.SceneNodeToPlayAt = newNodeId;

		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (sceneManager == null || this.TheSound == null)
			return;

		if (this.PlayAs2D || true) // currently no 3d playing supported
		{
			this.PlayingSound = gSoundManager.play2D(this.TheSound, this.PlayLooped, this.Volume);
		}
	}
}

// ---------------------------------------------------------------------
// Action StopSound
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionStopSound extends Action {
    /**
     * @type {Number}
     */
    SoundChangeType;
    /**
     * @type {any}
     */
    SoundFileName;

    constructor() {
        super();

        this.Type = 'StopSound';
    }
    
    /**
     * @param {Number} oldNodeId
     * @param {Number} newNodeId
     */
    createClone(oldNodeId, newNodeId) {
        var a = new ActionStopSound();
        a.SoundChangeType = this.SoundChangeType;
        a.SoundFileName = this.SoundFileName;
        return a;
    }

    /**
     * @param {CL3D.SceneNode} currentNode
     * @param {CL3D.Scene} sceneManager
     */
    execute(currentNode, sceneManager) {
        gSoundManager.stopAll();
    }
}

// ---------------------------------------------------------------------
// Action StopSpecificSound
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionStopSpecificSound extends Action {
    /**
     * @type {{ Name: any; }}
     */
    TheSound;

    constructor() {
        super();

        this.Type = 'StopSpecificSound';
    }

    /**
     * @param {Number} oldNodeId
     * @param {Number} newNodeId
     */
    createClone(oldNodeId, newNodeId) {
        var a = new ActionStopSpecificSound();
        a.TheSound = this.TheSound;

        return a;
    }

    /**
     * @param {CL3D.SceneNode} currentNode
     * @param {CL3D.Scene} sceneManager
     */
    execute(currentNode, sceneManager) {
        if (sceneManager == null || this.TheSound == null)
            return;

        gSoundManager.stopSpecificPlayingSound(this.TheSound.Name);
    }
}

// ---------------------------------------------------------------------
// Action RestartBehaviors
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionRestartBehaviors extends Action {
	constructor() {
        super();

		/**
		 * @type {Number}
		 */
		this.SceneNodeToRestart = null;
		this.ChangeCurrentSceneNode = false;
		this.Type = 'RestartBehaviors';
	}

	/**
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 * @param {boolean} bChangeCurrentSceneNode
	 */
	createClone(oldNodeId, newNodeId, bChangeCurrentSceneNode = false) {
		var a = new ActionRestartBehaviors();
		a.SceneNodeToRestart = this.SceneNodeToRestart;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;

		if (a.ChangeCurrentSceneNode != bChangeCurrentSceneNode)
			a.ChangeCurrentSceneNode = bChangeCurrentSceneNode;
		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToRestart != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToRestart);

		if (nodeToHandle) {
			for (var i = 0; i < nodeToHandle.Animators.length; ++i) {
				var a = nodeToHandle.Animators[i];
				if (a != null)
					a.reset();
			}
		}
	}
}

/**
 * @public
 * @constructor
 * @class
 */
class ActionRestartScene extends Action {
    /**
     * @type {String}
     */
    SceneName;

    /**
     * @param {CL3D.CopperLicht} [engine]
     */
    constructor(engine) {
        super();

        this.Engine = engine;
        this.Type = 'RestartScene';
    }

    /**
     * @param {Number} oldNodeId
     * @param {Number} newNodeId
     */
    createClone(oldNodeId, newNodeId) {
        var a = new ActionRestartScene();
        a.SceneName = this.SceneName;
        return a;
    }

    /**
     * @param {CL3D.SceneNode} currentNode
     * @param {CL3D.Scene} sceneManager
     */
    execute(currentNode, sceneManager) {
        if (this.Engine)
            this.Engine.reloadScene(this.SceneName);
    }
}

// ---------------------------------------------------------------------
// Action SwitchToScene
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionSwitchToScene extends Action {
	/**
	 * @type {String}
	 */
	SceneName;

	/**
	 * @param {CL3D.CopperLicht} [engine]
	 */
	constructor(engine) {
        super();

		this.Engine = engine;
		this.Type = 'SwitchToScene';
	}

	/**
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionSwitchToScene();
		a.SceneName = this.SceneName;
		return a;
	}
    
	/**
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (this.Engine)
			this.Engine.gotoSceneByName(this.SceneName, true);
	}
}

let openWebpageImpl = () => { };

if (typeof globalThis.open == "undefined") {
    await import('child_process').then(async (module) => {
        openWebpageImpl = (url) => {
            module.default.exec("start " + url);
        };
    });
}
else {
    openWebpageImpl = (url) => {
        globalThis.open(url);
    };
}

const openWebpage = (url) => {
    return openWebpageImpl(url);
};

// ---------------------------------------------------------------------
// Action OpenWebpage
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionOpenWebpage extends Action {
	/**
	 * @type {String}
	 */
	Webpage;
	/**
	 * @type {String}
	 */
	Target;
	
	constructor() {
        super();

		this.Type = 'OpenWebpage';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionOpenWebpage();
		a.Webpage = this.Webpage;
		a.Target = this.Target;
		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		//console.log("opening" + this.Webpage + " with:" + this.Target);
		openWebpage(this.Webpage, this.Target);
	}
}

// ---------------------------------------------------------------------
// Action ExecuteJavaScript
// ---------------------------------------------------------------------


/**
 * @type {CL3D.SceneNode}
 */
let gCurrentJScriptNode = null;

/**
 * @public
 * @constructor
 * @class
 */
class ActionExecuteJavaScript extends Action {
	/**
	 * @type {String}
	 */
	JScript;

	constructor() {
        super();

		this.Type = 'ExecuteJavaScript';
	}

	/**
	 * @param {Number} oldNodeId 
	 * @param {Number} newNodeId 
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionExecuteJavaScript();
		a.JScript = this.JScript;
		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode 
	 * @param {CL3D.Scene} sceneManager 
	 */
	execute(currentNode, sceneManager) {
		gCurrentJScriptNode = currentNode;

		(new Function(this.JScript))();

		gCurrentJScriptNode = null;
	}
}

// ---------------------------------------------------------------------
// Action SetCameraTarget
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionSetCameraTarget extends Action {
	/**
	 * @type {Number}
	 */
	PositionChangeType;
	/**
	 * @type {Number}
	 */
	SceneNodeToChangePosition;
	/**
	 * @type {Number}
	 */
	SceneNodeRelativeTo;
	/**
	 * @type {boolean}
	 */
	ChangeCurrentSceneNode;
	/**
	 * @type {boolean}
	 */
	RelativeToCurrentSceneNode;
	/**
	 * @type {CL3D.Vect3d}
	 */
	Vector;

	constructor() {
		super();

		this.UseAnimatedMovement = false;
		this.TimeNeededForMovementMs = 0;
		this.Type = 'SetCameraTarget';
	}

	/** 
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionSetCameraTarget();
		a.PositionChangeType = this.PositionChangeType;
		a.SceneNodeToChangePosition = this.SceneNodeToChangePosition;
		a.SceneNodeRelativeTo = this.SceneNodeRelativeTo;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;
		a.RelativeToCurrentSceneNode = this.RelativeToCurrentSceneNode;
		a.Vector = this.Vector ? this.Vector.clone() : null;
		a.UseAnimatedMovement = this.UseAnimatedMovement;
		a.TimeNeededForMovementMs = this.TimeNeededForMovementMs;
		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToChangePosition != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToChangePosition);

		var cam = nodeToHandle;
		if (cam instanceof CameraSceneNode && cam.getType() == 'camera') {
			var finalpos = cam.getTarget().clone();

			switch (this.PositionChangeType) {
				case 0: //EIT_ABSOLUTE_POSITION:
					finalpos = this.Vector.clone();
					break;
				case 1: //EIT_RELATIVE_POSITION:
					finalpos = nodeToHandle.Pos.add(this.Vector);
					break;
				case 2: //EIT_RELATIVE_TO_SCENE_NODE:
					{
						var nodeRelativeTo = null;
						if (this.RelativeToCurrentSceneNode)
							nodeRelativeTo = currentNode;

						else if (this.SceneNodeRelativeTo != -1)
							nodeRelativeTo = sceneManager.getSceneNodeFromId(this.SceneNodeRelativeTo);

						if (nodeRelativeTo)
							finalpos = nodeRelativeTo.Pos.add(this.Vector);
					}
					break;
			}

			if (finalpos != null) {
				if (this.UseAnimatedMovement && this.TimeNeededForMovementMs > 0) {
					// move animated to target
					var anim = new AnimatorFlyStraight();
					anim.Start = cam.getTarget().clone();
					anim.End = finalpos;
					anim.TimeForWay = this.TimeNeededForMovementMs;
					anim.DeleteMeAfterEndReached = true;
					anim.AnimateCameraTargetInsteadOfPosition = true;
					anim.recalculateImidiateValues();

					nodeToHandle.addAnimator(anim);
				}

				else {
					// set target directly
					cam.setTarget(finalpos);

					var animfps = cam.getAnimatorOfType('camerafps');
					if (animfps != null && animfps instanceof AnimatorCameraFPS)
						animfps.lookAt(finalpos);
				}
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action SetActiveCamera
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionSetActiveCamera extends Action {
	/**
	 * @type {Number}
	 */
	CameraToSetActive;

	/**
	 * @param {CL3D.CopperLicht} [engine]
	 */
	constructor(engine) {
        super();

		this.Engine = engine;
		this.Type = 'SetActiveCamera';
	}

	/**
	 * 
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionSetActiveCamera();
		a.CameraToSetActive = this.CameraToSetActive;

		if (a.CameraToSetActive == oldNodeId)
			a.CameraToSetActive = newNodeId;

		return a;
	}
    
	/**
	 * 
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.CameraToSetActive != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.CameraToSetActive);

		if (nodeToHandle != null) {
			if (nodeToHandle.getType() == 'camera') {
				if (this.Engine) {
					//console.log("Setting camera to" + nodeToHandle.Name);
					this.Engine.setActiveCameraNextFrame(nodeToHandle);
				}
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action SetOverlayText
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionSetOverlayText extends Action {
	constructor() {
        super();

		this.Text = "";
		this.SceneNodeToChange = null;
		this.ChangeCurrentSceneNode = false;
		this.Type = 'SetOverlayText';
	}

	/**
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionSetOverlayText();
		a.Text = this.Text;
		a.SceneNodeToChange = this.SceneNodeToChange;
		a.ChangeCurrentSceneNode = this.ChangeCurrentSceneNode;

		if (a.SceneNodeToChange == oldNodeId)
			a.SceneNodeToChange = newNodeId;

		return a;
	}
    
	/**
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		var nodeToHandle = null;
		if (this.ChangeCurrentSceneNode)
			nodeToHandle = currentNode;

		else if (this.SceneNodeToChange != -1)
			nodeToHandle = sceneManager.getSceneNodeFromId(this.SceneNodeToChange);

		if (nodeToHandle && nodeToHandle instanceof Overlay2DSceneNode) {
			var posVar = this.Text.indexOf('$');
			if (posVar != -1) {
				// text probably contains variables. Find and replace them with their values
				var textModified = this.Text;
				var currentPos = 0;
				var found = true;

				while (found) {
					found = false;

					posVar = textModified.indexOf('$', currentPos);
					if (posVar != -1) {
						currentPos = posVar + 1;
						var posEndVar = textModified.indexOf('$', posVar + 1);
						if (posEndVar != -1) {
							found = true;

							var varName = textModified.substr(posVar + 1, posEndVar - (posVar + 1));
							var v = CopperCubeVariable.getVariable(varName, false, sceneManager);

							if (v) {
								// replace with content of v
								var newStr = textModified.substr(0, posVar);
								newStr += v.getValueAsString();
								currentPos = newStr.length + 1;
								newStr += textModified.substr(posEndVar + 1, textModified.length - posEndVar);

								textModified = newStr;
							}
						}
					}
				}

				nodeToHandle.setText(textModified);
			}

			else {
				// text doesn't contain variables, set it as it is
				nodeToHandle.setText(this.Text);
			}
		}
	}
}

// ---------------------------------------------------------------------
// Action Shoot
// ---------------------------------------------------------------------


/**
 * @public
 * @constructor
 * @class
 */
class ActionShoot extends Action {
	constructor() {
		super();

		this.ShootType = 0;
		this.Damage = 0;
		this.BulletSpeed = 0.0;
		this.SceneNodeToUseAsBullet = -1;
		this.WeaponRange = 100.0;
		this.Type = 'Shoot';
		this.SceneNodeToShootFrom = -1;
		this.ShootToCameraTarget = false;
		this.AdditionalDirectionRotation = null;
		this.ActionHandlerOnImpact = null;
		this.ShootDisplacement = new Vect3d();
	}

	/**
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionShoot();
		a.ShootType = this.ShootType;
		a.Damage = this.Damage;
		a.BulletSpeed = this.BulletSpeed;
		a.SceneNodeToUseAsBullet = this.SceneNodeToUseAsBullet;
		a.WeaponRange = this.WeaponRange;
		a.SceneNodeToShootFrom = this.SceneNodeToShootFrom;
		a.ShootToCameraTarget = this.ShootToCameraTarget;
		a.AdditionalDirectionRotation = this.AdditionalDirectionRotation;
		a.ActionHandlerOnImpact = this.ActionHandlerOnImpact ? this.ActionHandlerOnImpact.createClone(oldNodeId, newNodeId) : null;
		a.ShootDisplacement = this.ShootDisplacement.clone();

		if (a.SceneNodeToUseAsBullet == oldNodeId)
			a.SceneNodeToUseAsBullet = newNodeId;
		if (a.SceneNodeToShootFrom == oldNodeId)
			a.SceneNodeToShootFrom = newNodeId;

		return a;
	}

	/**
	 * @param {CL3D.SceneNode} currentNode
	 * @param {CL3D.Scene} sceneManager
	 */
	execute(currentNode, sceneManager) {
		if (!currentNode || !sceneManager)
			return;

		// calculate ray, depending on how we were shot: If shot by an AI, use its target.
		// it not, use the active camera and shoot into the center of the screen.
		var ray = new Line3d();
		var rayFound = false;
		var shooterNode = null;
		var cam = null; // temp variable, used multiple times below

		var ainodes = sceneManager.getAllSceneNodesWithAnimator('gameai');

		if (this.SceneNodeToShootFrom != -1) {
			var userSpecifiedNode = sceneManager.getSceneNodeFromId(this.SceneNodeToShootFrom);

			if (userSpecifiedNode != null) {
				rayFound = true;
				shooterNode = userSpecifiedNode;

				// ray.Start = userSpecifiedNode.getTransformedBoundingBox().getCenter();
				ray.Start = userSpecifiedNode.getBoundingBox().getCenter();
				ray.Start.addToThis(this.ShootDisplacement);
				userSpecifiedNode.AbsoluteTransformation.transformVect(ray.Start);

				cam = sceneManager.getActiveCamera();

				if (this.ShootToCameraTarget && cam) {
					// in order to shoot to the camera target, we need to collide the camera with the world and
					// all AIs to test were to shoot at
					var lookLine = new Line3d();
					lookLine.Start = cam.getAbsolutePosition();
					lookLine.End = cam.getTarget();
					var lineVct = lookLine.getVector();
					lineVct.setLength(this.WeaponRange);
					lookLine.End = lookLine.Start.add(lineVct);

					this.shortenRayToClosestCollisionPointWithWorld(lookLine, ainodes, this.WeaponRange, sceneManager);
					this.shortenRayToClosestCollisionPointWithAIAnimator(lookLine, ainodes, this.WeaponRange, shooterNode, sceneManager);

					// now simply shoot from shooter node center to ray end
					ray.End = lookLine.End;
				}

				else {
					// set ray end based on rotation of scene node and add AdditionalDirectionRotation
					var matrot = userSpecifiedNode.AbsoluteTransformation;

					if (this.AdditionalDirectionRotation) {
						var matrot2 = new Matrix4();
						matrot2.setRotationDegrees(this.AdditionalDirectionRotation);
						matrot = matrot.multiply(matrot2);
					}

					ray.End.set(1, 0, 0);
					matrot.rotateVect(ray.End);
					ray.End.addToThis(ray.Start);
				}
			}
		}

		else if (currentNode != null) {
			shooterNode = currentNode;

			var shootingAI = currentNode.getAnimatorOfType('gameai');
			if (shootingAI && shootingAI instanceof AnimatorGameAI && shootingAI.isCurrentlyShooting()) {
				ray = shootingAI.getCurrentlyShootingLine();
				rayFound = true;
			}
		}

		if (!rayFound) {
			cam = sceneManager.getActiveCamera();
			if (cam) {
				shooterNode = cam;
				ray.Start = cam.getAbsolutePosition();
				ray.End = cam.getTarget();
				rayFound = true;
			}
		}

		if (!rayFound)
			return; // no current node?



		// normalize ray to weapon range
		var vect = ray.getVector();
		vect.setLength(this.WeaponRange);
		ray.End = ray.Start.add(vect);

		// get all game ai nodes and get the world from them, to
		// shorten the shoot distance again until the nearest wall
		this.shortenRayToClosestCollisionPointWithWorld(ray, ainodes, this.WeaponRange, sceneManager);

		// decide if we do a bullet or direct shot
		if (this.ShootType == 1) //ESIT_BULLET)
		{
			var bulletTemplate = null;

			if (this.SceneNodeToUseAsBullet != -1)
				bulletTemplate = sceneManager.getSceneNodeFromId(this.SceneNodeToUseAsBullet);

			if (bulletTemplate) {
				// create bullet now
				var cloned = bulletTemplate.createClone(sceneManager.getRootSceneNode(), -1, -1);
				sceneManager.getRootSceneNode().addChild(cloned);

				if (cloned != null) {
					cloned.Pos = ray.Start;
					cloned.updateAbsolutePosition();
					cloned.Visible = true;
					cloned.Id = -1;
					cloned.Name = "";

					// rotate to target
					var rotvect = ray.getVector();
					rotvect = rotvect.getHorizontalAngle();
					cloned.Rot = rotvect;

					// move to target
					var speed = this.BulletSpeed;
					if (speed == 0) speed = 1.0;

					var anim = new AnimatorFlyStraight();
					anim.Start = ray.Start;
					anim.End = ray.End;
					anim.TimeForWay = ray.getLength() / speed;
					anim.DeleteMeAfterEndReached = true;
					anim.recalculateImidiateValues();

					anim.TestShootCollisionWithBullet = true;
					anim.ShootCollisionNodeToIgnore = shooterNode; //currentNode;
					anim.ShootCollisionDamage = this.Damage;
					anim.DeleteSceneNodeAfterEndReached = true;
					anim.ActionToExecuteOnEnd = this.ActionHandlerOnImpact;
					anim.ExecuteActionOnEndOnlyIfTimeSmallerThen = this.WeaponRange / speed;

					cloned.addAnimator(anim);
				}
			}
		}

		else if (this.ShootType == 0) //EST_DIRECT)
		{
			// directly hit the target instead of creating a bullet
			// only check the nearest collision point with all the nodes
			// and take the nearest hit node as target
			this.WeaponRange;
			var bestHitNode = this.shortenRayToClosestCollisionPointWithAIAnimator(ray, ainodes, this.WeaponRange, shooterNode, sceneManager);

			if (bestHitNode != null) {
				sceneManager.LastBulletImpactPosition = ray.End.clone();

				// finally found a node to hit. Hit it.
				var targetanimAi = bestHitNode.getAnimatorOfType('gameai');

				if (targetanimAi)
					targetanimAi.OnHit(this.Damage, bestHitNode);
			}

		} // end direct shot
	}

	/**
	 * 
	 * @param {CL3D.Line3d} ray
	 * @param {string | any[]} ainodes
	 * @param {Number} maxLen
	 * @param {any} sceneManager
	 */
	shortenRayToClosestCollisionPointWithWorld(ray, ainodes, maxLen, sceneManager) {
		if (ainodes.length != 0) {
			// find world to test against collision so we do not need to do this with every
			// single node, to improve performance
			var animAi = ainodes[0].getAnimatorOfType('gameai');
			if (animAi) {
				var world = animAi.World;
				if (world) {
					var len = AnimatorOnClick.prototype.static_getDistanceToNearestCollisionPointWithWorld(sceneManager, ray.Start, ray.End, world, true);

					if (len < maxLen) {
						// shorten our ray because it collides with a world wall
						var vect2 = ray.getVector();
						vect2.setLength(len);
						ray.End = ray.Start.add(vect2);
					}
				}
			}
		}
	}

	/**
	 * 
	 * @param {CL3D.Line3d} ray
	 * @param {string | any[]} ainodes
	 * @param {Number} maxLen
	 * @param {any} toIgnore
	 * @param {any} sceneManager
	 */
	shortenRayToClosestCollisionPointWithAIAnimator(ray, ainodes, maxLen, toIgnore, sceneManager) {
		var bestDistance = maxLen;
		var bestHitNode = null;

		for (var i = 0; i < ainodes.length; ++i) {
			if (ainodes[i] === toIgnore) // don't collide against myself
				continue;

			var enemyAI = ainodes[i].getAnimatorOfType('gameai');

			if (enemyAI && !enemyAI.isAlive()) // don't test collision against dead items
				continue;

			var collisionDistance = { N: 0 };
			if (AnimatorOnClick.prototype.static_getCollisionDistanceWithNode(sceneManager, ainodes[i], ray, false,
				false, null, collisionDistance)) {
				if (collisionDistance.N < bestDistance) {
					bestDistance = collisionDistance.N;
					bestHitNode = ainodes[i];
				}
			}
		}

		if (bestHitNode) {
			var vect2 = ray.getVector();
			vect2.setLength(bestDistance);
			ray.End = ray.Start.add(vect2);
		}

		return bestHitNode;
	}

	/**
	 * @public
	 * @constructor
	 * @class
	 */
	getWeaponRange() {
		return this.WeaponRange;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * An animator animates a scene node. It can animate position, rotation, material, and so on. 
 * A scene node animator is able to animate a {@link SceneNode} in a very simple way: It may change its position,
 * rotation, scale and/or material. There are lots of animators to choose from. You can create scene node animators 
 * and attach them to a scene node using {@link SceneNode.addAnimator()}.<br/>
 * Note that this class is only the base class of all Animators, it doesn't do anything itself. See
 * {@link AnimatorCameraFPS} for a concrete Animator example.
 * @class An animator can be attached to a scene node and animates it.
 * @constructor
 * @public
 */
class Animator {
	constructor() {
		this.Type = -1;
	}

	/**
	 * Returns the type of the animator.
	 * Usual values are 'none', 'camerafps', etc. See the concreate animator implementations for type strings.
	 * @public
	 */
	getType() {
		return 'none';
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		return false;
	}

	/**
	 * Event handler called by the engine so the animator can react to mouse and key input
	 * 
	 * @param {any} event
	 */
	onMouseDown(event) {
	}
	
	/**
	 * Event handler called by the engine so the animator can react to mouse and key input
	 * 
	 * @param {any} delta
	 */
	onMouseWheel(delta) {
	}

	/**
	 * Event handler called by the engine so the animator can react to mouse and key input
	 * 
	 * @param {any} event
	 */
	onMouseUp(event) {
	}

	/**
	 * Event handler called by the engine so the animator can react to mouse and key input
	 * 
	 * @param {any} event
	 */
	onMouseMove(event) {
	}

	/**
	 * Event handler called by the engine so the animator can react to mouse and key input.
	 * Returns false if the event has not been processed.
	 * 
	 * @param {any} event
	 */
	onKeyDown(event) {
		return false;
	}

	/**
	 * Event handler called by the engine so the animator can react to mouse and key input
	 * Returns false if the event has not been processed.
	 * 
	 * @param {any} event
	 */
	onKeyUp(event) {
		return false;
	}

	/**
	 * Resets the animator, if supported
	 * 
	 * @param {undefined} [event]
	 */
	reset(event) {
	}

	/**
	 * @param {String} type
	 */
	findActionByType(type) {
		return null;
	}

	/**
	 * Creates an exact, deep copy of this animator
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		return null;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator which invokes a callback function when the scene node has been clicked.
 * <b>Note</b>: In this version, only bounding box checks are working, this will change in one of the next releases.
 * It works like in this example:
 * @example
 * var yourFunction = function(){ alert('your scene node has been clicked!'); }
 * var animator = new CL3D.AnimatorOnClick(engine.getScene(), engine, yourFunction);
 * yourSceneNode.addAnimator(animator);
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class  Scene node animator which invokes a callback function when the scene node has been clicked.
 */
class AnimatorOnClick extends Animator {
	/**
 	 * @param {CL3D.Scene} scene The scene of the animator.
 	 * @param {CL3D.CopperLicht} engine an instance of the 3d engine
 	 * @param {Function=} functionToCall a function which should be called when the scene node has been clicked
 	 * @param {Boolean=} donotregister (optional) set to true to prevent registering at the scene using registerSceneNodeAnimatorForEvents
	 */
	constructor(scene, engine, functionToCall, donotregister) {
		super();

		this.engine = engine;
		this.TimeLastClicked = 0;
		this.Registered = false;
		this.LastUsedSceneNode = null;
		this.SMGr = scene;
		this.FunctionToCall = functionToCall;
		this.LastTimeDoneSomething = false;
		this.BoundingBoxTestOnly = true;
		this.CollidesWithWorld = false;
		this.TheActionHandler = null;
		this.World = null;
		this.TheObject = null;

		if (!(donotregister == true))
			scene.registerSceneNodeAnimatorForEvents(this);
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorOnClick, this will return 'onclick'.
	 * @public
	 */
	getType() {
		return 'onclick';
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorOnClick(this.SMGr, this.engine);
		a.BoundingBoxTestOnly = this.BoundingBoxTestOnly;
		a.CollidesWithWorld = this.CollidesWithWorld;
		a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;
		a.World = this.World;
		return a;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		this.TheObject = n;
		var done = this.LastTimeDoneSomething;
		this.LastTimeDoneSomething = false;
		return done;
	}

	/**
	 * @public
	 */
	onMouseDown(event) {
		var n = this.TheObject;
		if (!n)
			return false;

		if (!(n.scene === this.SMGr))
			return false;

		if (event.button == 2) {
			return false;
		}

		var now = CLTimer.getTime();

		if (now - this.engine.LastCameraDragTime < 250)
			return false;

		var x = this.engine.getMousePosXFromEvent(event);
		var y = this.engine.getMousePosYFromEvent(event);

		if (this.engine.isInPointerLockMode()) {
			var renderer = this.SMGr.getLastUsedRenderer();
			if (!renderer)
				return false;
			x = renderer.getWidth() / 2;
			y = renderer.getHeight() / 2;
		}

		if (this.TheObject.Parent == null) {
			// object seems to be deleted 
			this.TheObject = null;
			return false;
		}

		if (n.isActuallyVisible() &&
			this.isOverNode(n, x, y)) {
			this.LastTimeDoneSomething = true;

			if (this.FunctionToCall)
				this.FunctionToCall();

			this.SMGr.forceRedrawNextFrame(); // the animate might not be recalled after this element has been made invisible in this invokeAction()
			return true;
		}
	}

	/**
	 * @public
	 */
	onMouseUp(event) {
		var n = this.TheObject;
		if (!n)
			return false;

		if (!(n.scene === this.SMGr))
			return false;

		if (event.button == 2) {
			return false;
		}

		var now = CLTimer.getTime();

		if (now - this.engine.LastCameraDragTime < 250)
			return false;

		var x = this.engine.getMousePosXFromEvent(event);
		var y = this.engine.getMousePosYFromEvent(event);

		if (this.engine.isInPointerLockMode()) {
			var renderer = this.SMGr.getLastUsedRenderer();
			if (!renderer)
				return false;
			x = renderer.getWidth() / 2;
			y = renderer.getHeight() / 2;
		}

		if (this.TheObject.Parent == null) {
			// object seems to be deleted 
			this.TheObject = null;
			return false;
		}

		if (n.isActuallyVisible() &&
			this.isOverNode(n, x, y)) {
			this.LastTimeDoneSomething = true;

			this.invokeAction(n);

			this.SMGr.forceRedrawNextFrame(); // the animate might not be recalled after this element has been made invisible in this invokeAction()
			return true;
		}
	}

	/**
	 * @public
	 */
	invokeAction(node) {
		if (this.TheActionHandler)
			this.TheActionHandler.execute(node);
	}

	/**
	 * @public
	 */
	isOverNode(node, positionX, positionY) {
		if (node == null)
			return false;

		positionX *= this.engine.DPR;
		positionY *= this.engine.DPR;

		if (node.getType() == '2doverlay') {
			var r = node.getScreenCoordinatesRect(false, this.engine.getRenderer());
			if (r.x <= positionX && r.y <= positionY &&
				r.x + r.w >= positionX &&
				r.y + r.h >= positionY) {
				return true;
			}
		}

		var posRayEnd = this.engine.get3DPositionFrom2DPosition(positionX, positionY);
		if (posRayEnd == null)
			return false;

		var cam = this.SMGr.getActiveCamera();
		if (cam == null)
			return false;

		var campos = cam.getAbsolutePosition();

		var ray = new Line3d();
		ray.Start = campos;
		ray.End = posRayEnd;

		return this.static_getCollisionDistanceWithNode(this.SMGr, node, ray, this.BoundingBoxTestOnly, this.CollidesWithWorld, this.World, null);
	}

	/**
	 * @public
	 */
	static_getDistanceToNearestCollisionPointWithWorld(smgr, begin, end, world, ignoreInvisibleItems) {
		var maxdist = 999999999999.0;

		if (!world || !smgr)
			return maxdist;

		var collisionPoint = world.getCollisionPointWithLine(begin, end, true, null, ignoreInvisibleItems);
		if (collisionPoint) {
			return begin.getDistanceTo(collisionPoint);
		}

		return maxdist;
	}

	/**
	 * @public
	 */
	getDistanceToNearestCollisionPointWithWorld(begin, end) {
		return this.static_getDistanceToNearestCollisionPointWithWorld(this.SMGr, begin, end, this.World, true);
	}
	
	/**
	 * @public
	 * returns true if collides (and no wall between), false if not
	 */
	static_getCollisionDistanceWithNode(smgr, node, ray, bBoundingBoxTestOnly, collidesWithWorld,
		world, outDistance) {
		var box = node.getBoundingBox();
		var distance = 0; // temporary variable

		var mat = new Matrix4(false);
		if (node.AbsoluteTransformation.getInverse(mat)) {
			if (box.intersectsWithLine(mat.getTransformedVect(ray.Start), mat.getTransformedVect(ray.End))) {
				// the click was inside the bounding box 
				//Debug.print("Click was in BB!");
				var meshSceneNode = null;
				if (node.getMesh && node.OwnedMesh) meshSceneNode = node; // instead of checking for the type, we are checking for the method, that should be enough

				var bDoBoundingBoxTestOnly = (meshSceneNode == null) || bBoundingBoxTestOnly;

				if (!bDoBoundingBoxTestOnly) {
					var selector = meshSceneNode.Selector;

					if (selector == null) {
						// create and cache triangle selector
						if (meshSceneNode.OwnedMesh && meshSceneNode.OwnedMesh.GetPolyCount() > 100)
							selector = new OctTreeTriangleSelector(meshSceneNode.OwnedMesh, meshSceneNode, 0);

						else
							selector = new MeshTriangleSelector(meshSceneNode.OwnedMesh, meshSceneNode);

						meshSceneNode.Selector = selector;
					}

					if (selector) {
						var collisionPoint = selector.getCollisionPointWithLine(ray.Start, ray.End, true, null, true);

						if (collisionPoint != null) {
							// collision found!
							if (collidesWithWorld) {
								// test if there is a wall of the world between us and the collision point
								distance = this.static_getDistanceToNearestCollisionPointWithWorld(smgr, ray.Start, collisionPoint, world, true);
								var collisionDistance = collisionPoint.getDistanceTo(ray.Start);

								if (distance + TOLERANCE < collisionDistance) {
									return false; // a wall was between us 
								}

								else {
									if (outDistance != null)
										outDistance.N = collisionPoint.getDistanceTo(ray.Start);

									return true; // no wall between us, collision ok
								}
							}

							else {
								// no world collision wanted, we are done here
								if (outDistance != null)
									outDistance.N = ray.Start.getDistanceTo(node.getTransformedBoundingBox().getCenter());

								return true;
							}
						}
						//else
						//	Debug.print("no colluided with geometry!");
					}

					else {
						// no selector possible, but it collided with the bounding box.
						// so check below for collision with world before this one.
						bDoBoundingBoxTestOnly = true;
					}

				}


				if (bDoBoundingBoxTestOnly) {
					if (!collidesWithWorld) {
						// no world collision wanted, we are done here
						if (outDistance != null)
							outDistance.N = ray.Start.getDistanceTo(node.getTransformedBoundingBox().getCenter());

						return true;
					}

					else {
						// test if there is a wall of the world between us and the collision point on the
						// bounding box
						var rayworldteststart = ray.Start.clone();
						box = node.getTransformedBoundingBox();
						var extend = box.getExtent();
						extend.multiplyThisWithScal(0.5);

						var maxradius = max3(extend.X, extend.Y, extend.Z);
						maxradius = Math.sqrt((maxradius * maxradius) + (maxradius * maxradius));

						var rayworldtestend = node.getTransformedBoundingBox().getCenter();

						distance = this.static_getDistanceToNearestCollisionPointWithWorld(smgr, rayworldteststart, rayworldtestend, world, true);
						var raytestlen = rayworldtestend.getDistanceTo(rayworldteststart) - maxradius;

						if (distance < raytestlen)
							return false; // a wall was between us 

						else {
							if (outDistance != null)
								outDistance.N = raytestlen;

							return true; // no wall between us, collision ok
						}
					}
				}
			}
		}

		return false;
	}

	/**
	 * @public
	 */
	findActionByType(type) {
		if (this.TheActionHandler)
			return this.TheActionHandler.findAction(type);

		return null;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator which invokes an action when the mouse enters or leaves a 3d scene node. 
 * Private, only used to implement the coppercube editor animator.
 * @constructor
 * @public
 * @extends CL3D.AnimatorOnClick
 * @class  Scene node animator which invokes a callback function when the scene node has been clicked.
 */
class AnimatorOnMove extends AnimatorOnClick {
	/**
 	 * @param {CL3D.Scene} scene The scene of the animator.
 	 * @param {CL3D.CopperLicht} engine an instance of the 3d engine
 	 * @param {Function=} functionToCall a function which should be called when the scene node has been clicked
	 */
	constructor(scene, engine, functionToCall) {
		super(null, null, null, true);
		
		this.engine = engine;
		this.SMGr = scene;
		this.FunctionToCall = functionToCall;

		this.ActionHandlerOnEnter = null;
		this.ActionHandlerOnLeave = null;
		this.TimeLastChecked = 0;
		this.bLastTimeWasInside = false;
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorOnMove, this will return 'onmove'.
	 * @public
	 */
	getType() {
		return 'onmove';
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorOnMove(this.SMGr, this.engine);
		a.BoundingBoxTestOnly = this.BoundingBoxTestOnly;
		a.CollidesWithWorld = this.CollidesWithWorld;
		a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;
		a.World = this.World;
		a.ActionHandlerOnEnter = this.ActionHandlerOnEnter ? this.ActionHandlerOnEnter.createClone(oldNodeId, newNodeId) : null;
		a.ActionHandlerOnLeave = this.ActionHandlerOnLeave ? this.ActionHandlerOnLeave.createClone(oldNodeId, newNodeId) : null;
		return a;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} node The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(node, timeMs) {
		var firstCheck = (this.TimeLastChecked == 0);
		var now = CLTimer.getTime();

		if (firstCheck || now - this.TimeLastChecked > 100) {
			this.TimeLastChecked = now;

			//  now test for collision
			var bIsInside = this.isOverNode(node, this.engine.getMouseX(), this.engine.getMouseY());

			if (firstCheck)
				this.bLastTimeWasInside = bIsInside;

			else {
				// invoke action
				if (bIsInside != this.bLastTimeWasInside) {
					this.bLastTimeWasInside = bIsInside;

					if (bIsInside && this.ActionHandlerOnEnter)
						this.ActionHandlerOnEnter.execute(node);

					else if (!bIsInside && this.ActionHandlerOnLeave)
						this.ActionHandlerOnLeave.execute(node);

					return true;
				}

				else if (!bIsInside && this.FunctionToCall)
					this.FunctionToCall();
			}
		}

		return false;
	}

	/**
	 * @public
	 */
	findActionByType(type) {
		var ret = null;

		if (this.ActionHandlerOnLeave) {
			ret = this.ActionHandlerOnLeave.findAction(type);
			if (ret)
				return ret;
		}

		if (this.ActionHandlerOnEnter) {
			ret = this.ActionHandlerOnEnter.findAction(type);
			if (ret)
				return ret;
		}

		return null;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator which invokes a callback function when the scene node gets near another scene node.
 * It works like in this example:
 * @example
 * var yourFunction = function(){ alert('now near your scene node!'); }
 * var animator = new CL3D.AnimatorOnProximity(engine.getScene(), 100,
 *     34534, yourFunction, false);
 * yourSceneNode.addAnimator(animator);
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class  Scene node animator which invokes a callback function when the scene node gets near another scene node.
 */
class AnimatorOnProximity extends Animator {
	/**
	 * @param {CL3D.Scene} scene the current scene
	 * @param {Number=} radius the proximity radius to use
	 * @param {Number=} idOfSceneNode The unique id (see {@link SceneNode.id} of the scene node which will trigger this
	 * @param {Function=} functionToCall a function which should be called when the scene node has been clicked. The function will be given two parameters: The node this is attached to and the node colliding.
	 * @param {Boolean=} triggerOnLeave set to false to let this trigger when the radius is entered, to true if when the radius is left
	 */
	constructor(scene, radius, idOfSceneNode, functionToCall, triggerOnLeave) {
		super();

		this.TimeLastClicked = 0;
		this.sceneManager = scene;

		/*private static const EPT_THE_ACTIVE_CAMERA:int = 0;
		private static const EPT_SOME_SCENE_NODE:int = 1;
		private static const EPT_SCENE_NODE_LIKE:int = 2;
		private static const EPET_ENTER:int = 0;
		private static const EPET_LEAVE: int = 1;*/
		this.EnterType = 0;
		this.ProximityType = 0;
		this.AreaType = 0; // sphere
		this.Range = 0;
		this.RangeBox = null; // in case AreaType is a box
		this.SceneNodeToTest = 0;
		this.TheActionHandler = null;
		this.FunctionToCall = functionToCall;

		if (radius)
			this.Range = radius;
		if (idOfSceneNode)
			this.SceneNodeToTest = idOfSceneNode;
		if (triggerOnLeave)
			this.EnterType = 1; //this.EPET_LEAVE;

		this.IsInsideRadius = false;
	}
	/**
	 * Returns the type of the animator.
	 * For the AnimatorOnProximity, this will return 'oncollide'.
	 * @public
	 */
	getType() {
		return 'oncollide';
	}
	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorOnProximity(this.sceneManager);
		a.EnterType = this.EnterType;
		a.ProximityType = this.ProximityType;
		a.Range = this.Range;
		a.SceneNodeToTest = this.SceneNodeToTest;
		a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;
		return a;
	}
	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		if (n == null || this.sceneManager == null)
			return false;

		var actionInvoked = false;

		var nodeToHandle = null;
		if (this.ProximityType == 0) //EPT_THE_ACTIVE_CAMERA)
			nodeToHandle = this.sceneManager.getActiveCamera();

		else if (this.SceneNodeToTest != -1)
			nodeToHandle = this.sceneManager.getSceneNodeFromId(this.SceneNodeToTest);

		if (nodeToHandle) {
			if (n === nodeToHandle)
				return false; // same node

			var posNode1 = nodeToHandle.getAbsolutePosition();
			var posNode2 = n.getAbsolutePosition();

			var isInside = false;

			switch (this.AreaType) {
				case 0: // sphere
					isInside = posNode1.getDistanceTo(posNode2) < this.Range;
					break;
				case 1: // box
					{
						var mat = new Matrix4(false);
						if (n.getAbsoluteTransformation().getInverse(mat)) {
							var test = posNode1.clone();
							mat.transformVect(test);
							var box = new Box3d();
							box.MinEdge = this.RangeBox.multiplyWithScal(-0.5);
							box.MaxEdge = this.RangeBox.multiplyWithScal(0.5);
							isInside = box.isPointInside(test);
						}
					}
			}

			switch (this.EnterType) {
				case 0: // EPET_ENTER:
					if (isInside && !this.IsInsideRadius) {
						this.invokeAction(nodeToHandle, n);
						actionInvoked = true;
					}
					break;
				case 1: //EPET_LEAVE:
					if (!isInside && this.IsInsideRadius) {
						this.invokeAction(nodeToHandle, n);
						actionInvoked = true;
					}
					break;
			}

			this.IsInsideRadius = isInside;
		}

		return actionInvoked;
	}
	/**
	 * @public
	 */
	invokeAction(node, n) {
		if (this.FunctionToCall)
			this.FunctionToCall.call(node, n);

		if (this.TheActionHandler)
			this.TheActionHandler.execute(node);
	}
	/**
	 * @public
	 */
	findActionByType(type) {
		if (this.TheActionHandler)
			return this.TheActionHandler.findAction(type);

		return null;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Special scene node animator for doing automatic collision detection and response.<br/>
 * <br/>
 * This {@link SceneNode} animator can be attached to any single {@link SceneNode} and will then prevent it from moving
 * through specified collision geometry (e.g. walls and floors of the) world, as well as having it fall under 
 * gravity. This animator provides a simple implementation of first person shooter cameras. Attach it to a camera, 
 * and the camera will behave as the player control in a first person shooter game: The camera stops and slides at 
 * walls, walks up stairs, falls down if there is no floor under it, and so on.<br/>
 * <br/>
 * The animator will treat any change in the position of its target scene node as movement, including changing the .Pos attribute,
 * as movement. If you want to teleport the target scene node manually to a location without it being effected by 
 * collision geometry, then call reset() after changing the position of the node.<br/>
 * <br/>
 * The algorithm used here is a very fast but simple one. Sometimes, it is possible to get stuck in the geometry when moving.
 * To prevent this, always place the object at a position so that the yellow ellipsoid isn't colliding with a wall in the beginning,
 * so that it is not stuck. <br/>
 * If the object gets stuck during movement, then the problem might be the 3d collision mesh: One needs to be a bit careful 
 * when modelling the static geometry the object collides against. The geometry should be closed, and there should not be any 
 * one sided polygons sticking out anywhere, those are usually the places where one gets stuck. <br/>
 * Also, if the points of vertices which should be together are not exactly at the same point could cause problems.
 * If the used 3d modelling software supports a feature like 'Merge Points' to make neighbour vertices be exactly at the same place, it is
 * recommended to do this, it also usually helps.
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class Scene node animator making {@link SceneNode}s move using autoamtic collision detection and response
 */
class AnimatorCollisionResponse extends Animator {
	/**
	 * @param {CL3D.Vect3d=} radius 3d vector describing the radius of the scene node as ellipsoid.	
	 * @param {CL3D.Vect3d=} translation Set translation of the collision ellipsoid. By default, the ellipsoid for collision 
	 * detection is created around the center of the scene node, which means that the ellipsoid surrounds it completely. 
	 * If this is not what you want, you may specify a translation for the ellipsoid.
	 * @param {CL3D.TriangleSelector=} world Representing the world, the collision geometry, represented by a {@link TriangleSelector}.
	 * @param {Number=} slidingspeed (optional) A very small value, set to 0.0005 for example. This affects how the ellipsoid is moved 
	 * when colliding with a wall. Affects movement smoothness and friction. If set to a too big value, this will also may cause the 
	 * ellipsoid to be stuck.
	 */
	constructor(radius, translation, world, slidingspeed) {
		super();

		this.Radius = radius;
		this.AffectedByGravity = true;
		this.Translation = translation;
		this.World = world;
		this.SlidingSpeed = slidingspeed;
		this.UseFixedSlidingSpeed = false;
		this.Node = null;
		this.LastAnimationTime = null;
		this.LastPosition = new Vect3d(0, 0, 0);
		this.Falling = false;
		this.FallStartTime = 0;
		this.JumpForce = 0;
		this.UseInclination = false;

		if (this.Radius == null)
			this.Radius = new Vect3d(30, 50, 30);
		if (this.Translation == null)
			this.Translation = new Vect3d(0, 0, 0);
		if (this.SlidingSpeed == null)
			this.SlidingSpeed = 0.0005;

		this.reset();
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorCollisionResponse, this will return 'collisionresponse'.
	 * @public
	 */
	getType() {
		return 'collisionresponse';
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorCollisionResponse();
		a.Radius = this.Radius.clone();
		a.AffectedByGravity = this.AffectedByGravity;
		a.Translation = this.Translation.clone();
		a.LastPosition = this.LastPosition.clone();
		a.UseInclination = this.UseInclination;
		a.World = this.World;
		return a;
	}

	/**
	 * Resets the collision system. Use this for example to make it possible to set a scene node postition
	 * while moving through walls: Simply change the position of the scene node and call reset() to this
	 * animator afterwards.
	 * @public
	 */
	reset() {
		this.Node = null;
		this.LastAnimationTime = CLTimer.getTime();
	}

	/**
	 * Sets the triangle selector representing the world collision data
	 * @public
	 */
	setWorld(selector) {
		this.World = selector;
	}

	/**
	 * Returns the triangle selector representing the world collision data
	 * @public
	 */
	getWorld() {
		return this.World;
	}

	/**
	 * Returns if the scene node attached to this animator is currently falling
	 * @public
	 */
	isFalling() {
		return this.Falling;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		var difftime = (timeMs - this.LastAnimationTime);

		if (!this.World)
			return false;

		if (difftime > 150) difftime = 150;
		if (difftime == 0)
			return false;

		this.LastAnimationTime = timeMs;

		if (!(this.Node === n)) {
			this.Node = n;
			this.LastPosition = n.Pos.clone();
			return false;
		}

		var pos = n.Pos.clone();
		var vel = n.Pos.substract(this.LastPosition);

		var gravity = new Vect3d(0.0, -0.1 * n.scene.Gravity, 0.0);
		if (!this.AffectedByGravity)
			gravity.Y = 0.0;

		var gravityPerFrame = gravity.multiplyWithScal(difftime);

		// calculate acceleration of gravity when falling
		if (!this.Falling) {
			gravityPerFrame.multiplyThisWithScal(0.001); // disable acceleration of gravity
		}

		else {
			var fact = ((timeMs - this.FallStartTime) / 1000.0);
			if (fact > 5) fact = 5;
			gravityPerFrame.multiplyThisWithScal(fact);
		}

		// jump
		if (this.JumpForce > 0) {
			vel.Y += (this.JumpForce * 0.001 * difftime);

			this.JumpForce -= difftime;
			if (this.JumpForce < 0) this.JumpForce = 0;
		}

		// now finally collide
		var force = vel.add(gravityPerFrame);

		if (!force.equalsZero()) {
			if (!this.UseFixedSlidingSpeed)
				this.SlidingSpeed = this.Radius.getLength() * 0.001; //0.000001;


			//this.SlidingSpeed = force.getLength() * 0.0001;
			var cam = null;
			if (n && n instanceof CameraSceneNode && n.getType() == 'camera')
				cam = n;

			var camvect;
			if (cam)
				camvect = cam.Target.substract(cam.Pos);

			var triangle = new Triangle3d();
			var objFalling = { N: 0 }; // used for passing the object falling value by reference

			this.World.setNodeToIgnore(n);

			pos = this.getCollisionResultPosition(
				this.World, this.LastPosition.substract(this.Translation), this.Radius, vel,
				triangle, objFalling, this.SlidingSpeed, gravityPerFrame);

			this.World.setNodeToIgnore(null);

			pos.addToThis(this.Translation);

			if (objFalling.N < 0.5) {
				this.Falling = false;
			}

			else {
				if (!this.Falling)
					this.FallStartTime = timeMs;

				this.Falling = true;
			}

			if (n.Pos.equals(pos)) {
				this.LastPosition = n.Pos.clone();
				return false;
			}

			n.Pos = pos.clone();

			// rotate object if inclination is enabled (for vehicles)
			if (this.UseInclination) {
				if (!this.Falling) {
					if (!(triangle.pointA.equalsZero() && triangle.pointB.equalsZero() && triangle.pointC.equalsZero())) {
						// rotate triangle with rotation of car 
						var rot = n.Rot.Y;
						var center = triangle.pointA.add(triangle.pointB).add(triangle.pointC);
						center.multiplyThisWithScal(1.0 / 3.0);

						triangle.pointA.X -= center.X;
						triangle.pointA.Z -= center.Z;
						triangle.pointB.X -= center.X;
						triangle.pointB.Z -= center.Z;
						triangle.pointC.X -= center.X;
						triangle.pointC.Z -= center.Z;

						triangle.pointA.rotateXZBy(rot);
						triangle.pointB.rotateXZBy(rot);
						triangle.pointC.rotateXZBy(rot);

						triangle.pointA.X += center.X;
						triangle.pointA.Z += center.Z;
						triangle.pointB.X += center.X;
						triangle.pointB.Z += center.Z;
						triangle.pointC.X += center.X;
						triangle.pointC.Z += center.Z;

						// get rotation of triangle normal
						var nrm = triangle.getNormal();
						var wantedRot = new Vect3d();

						wantedRot.X = Math.atan2(nrm.Z, nrm.Y) * RADTODEG;
						wantedRot.Y = n.Rot.Y;
						wantedRot.Z = -Math.atan2(nrm.X, nrm.Y) * RADTODEG;

						n.Rot = wantedRot;
					}
				}
			}

			if (cam && camvect) {
				var bAnimateTarget = true;
				for (var i = 0; i < n.Animators.length; ++i) {
					var a = n.Animators[i];
					if (a && a.getType() == 'cameramodelviewer') {
						bAnimateTarget = false;
						break;
					}
				}

				if (bAnimateTarget)
					cam.Target = n.Pos.add(camvect);
			}
		}

		this.LastPosition.equals(n.Pos);
		this.LastPosition = n.Pos.clone();
		return false; // || this.Falling;
	}

	/**
	 * @public
	 */
	getCollisionResultPosition(selector, //:TriangleSelector,
		position, //:Vect3d, 
		radius, //:Vect3d, 
		velocity, //:Vect3d, 
		triout, //:Triangle3d, 
		outFalling, //:FloatRef, 
		slidingSpeed, //:Number,
		gravity) {
		if (!selector || radius.X == 0 || radius.Y == 0 || radius.Z == 0)
			return position;

		// now collide ellipsoid with world
		var colData = {}; //var colData:CollisionData = new CollisionData();
		colData.R3Position = position.clone();
		colData.R3Velocity = velocity.clone();
		colData.eRadius = radius.clone();
		colData.nearestDistance = 99999999.9; //FLT_MAX;
		colData.selector = selector;
		colData.slidingSpeed = slidingSpeed;
		colData.triangleHits = 0;
		colData.intersectionPoint = new Vect3d();

		var eSpacePosition = colData.R3Position.divideThroughVect(colData.eRadius);
		var eSpaceVelocity = colData.R3Velocity.divideThroughVect(colData.eRadius);

		// iterate until we have our final position
		var finalPos = this.collideWithWorld(0, colData, eSpacePosition, eSpaceVelocity);
		outFalling.N = 0;

		// add gravity
		if (!gravity.equalsZero()) {
			colData.R3Position = finalPos.multiplyWithVect(colData.eRadius);
			colData.R3Velocity = gravity.clone();
			colData.triangleHits = 0;

			eSpaceVelocity = gravity.divideThroughVect(colData.eRadius);

			finalPos = this.collideWithWorld(0, colData, finalPos, eSpaceVelocity);

			outFalling.N = (colData.triangleHits == 0) ? 1 : 0;

			if (outFalling.N < 0.5 && colData.intersectionTriangle) {
				// collision thinks we are not falling because we collided with a poly.
				// now test if that poly has its normal vector up, so this is right.
				var normal = colData.intersectionTriangle.getNormal();
				normal.normalize();
				if (!(Math.abs(normal.Y) > Math.abs(normal.X) &&
					Math.abs(normal.Y) > Math.abs(normal.Z))) {
					outFalling.N = 1.0;
				}
			}
		}

		if (colData.triangleHits && triout != null) {
			// note: be careful to keep the reference and only overwrite the points
			// instead of triout = colData.intersectionTriangle; do this:
			triout.pointA = colData.intersectionTriangle.pointA.clone();
			triout.pointB = colData.intersectionTriangle.pointB.clone();
			triout.pointC = colData.intersectionTriangle.pointC.clone();

			triout.pointA.multiplyThisWithVect(colData.eRadius);
			triout.pointB.multiplyThisWithVect(colData.eRadius);
			triout.pointC.multiplyThisWithVect(colData.eRadius);
		}

		finalPos.multiplyThisWithVect(colData.eRadius);
		return finalPos;
	}

	/**
	 * @public
	 */
	collideWithWorld(recursionDepth, //:int,
		colData, //:CollisionData, 
		pos, //:Vect3d, 
		vel) {
		var veryCloseDistance = colData.slidingSpeed;

		// original collision detection code. will sometimes cause objects to get stuck.
		//if (recursionDepth > 5)
		//	return pos.clone();
		// new, sloppy collision detection, preventing getting stuck.		
		if (recursionDepth > 5) {
			var velshort = vel.clone();
			velshort.setLength(veryCloseDistance);
			return pos.add(velshort);
		}

		colData.velocity = vel.clone();
		colData.normalizedVelocity = vel.clone();
		colData.normalizedVelocity.normalize();
		colData.basePoint = pos.clone();
		colData.foundCollision = false;
		colData.nearestDistance = 99999999.9; //FLT_MAX;




		//------------------ collide with world
		// get all triangles with which we might collide
		var box = new Box3d();
		colData.R3Position.copyTo(box.MinEdge);
		colData.R3Position.copyTo(box.MaxEdge);
		box.addInternalPointByVector(colData.R3Position.add(colData.R3Velocity));
		box.MinEdge.substractFromThis(colData.eRadius);
		box.MaxEdge.addToThis(colData.eRadius);

		var triangles = new Array();

		var scaleMatrix = new Matrix4();
		scaleMatrix.setScaleXYZ(1.0 / colData.eRadius.X, 1.0 / colData.eRadius.Y, 1.0 / colData.eRadius.Z);

		colData.selector.getTrianglesInBox(box, scaleMatrix, triangles);

		for (var i = 0; i < triangles.length; ++i)
			this.testTriangleIntersection(colData, triangles[i]);

		//---------------- end collide with world
		if (!colData.foundCollision)
			return pos.add(vel);

		// original destination point
		var destinationPoint = pos.add(vel);
		var newBasePoint = pos.clone();

		// only update if we are not already very close
		// and if so only move very close to intersection, not to the
		// exact point
		if (colData.nearestDistance >= veryCloseDistance) {
			var v = vel.clone();
			v.setLength(colData.nearestDistance - veryCloseDistance);
			newBasePoint = colData.basePoint.add(v);

			v.normalize();
			colData.intersectionPoint.substractFromThis(v.multiplyWithScal(veryCloseDistance));
		}

		// calculate sliding plane
		var slidePlaneOrigin = colData.intersectionPoint.clone();
		var slidePlaneNormal = newBasePoint.substract(colData.intersectionPoint);
		slidePlaneNormal.normalize();
		var slidingPlane = new Plane3d();
		slidingPlane.setPlane(slidePlaneOrigin, slidePlaneNormal);

		var newDestinationPoint = destinationPoint.substract(slidePlaneNormal.multiplyWithScal(slidingPlane.getDistanceTo(destinationPoint)));

		// generate slide vector
		var newVelocityVector = newDestinationPoint.substract(colData.intersectionPoint);

		if (newVelocityVector.getLength() < veryCloseDistance)
			return newBasePoint;

		return this.collideWithWorld(recursionDepth + 1, colData, newBasePoint, newVelocityVector);
	}

	/**
	 * @public
	 */
	testTriangleIntersection(colData, triangle) {
		var trianglePlane = triangle.getPlane();

		// only check front facing polygons
		if (!trianglePlane.isFrontFacing(colData.normalizedVelocity))
			return;

		// get interval of plane intersection
		var t1 = 0; //:Number;
		var t0 = 0; //:Number;
		var embeddedInPlane = false;
		var f = 0; //:Number;


		// calculate signed distance from sphere position to triangle plane
		var signedDistToTrianglePlane = trianglePlane.getDistanceTo(colData.basePoint);

		var normalDotVelocity = trianglePlane.Normal.dotProduct(colData.velocity);

		if (iszero(normalDotVelocity)) {
			// sphere is traveling parallel to plane
			if (Math.abs(signedDistToTrianglePlane) >= 1.0)
				return; // no collision possible

			else {
				// sphere is embedded in plane
				embeddedInPlane = true;
				t0 = 0.0;
				t1 = 1.0;
			}
		}

		else {
			normalDotVelocity = 1.0 / normalDotVelocity;

			// N.D is not 0. Calculate intersection interval
			t0 = (-1.0 - signedDistToTrianglePlane) * normalDotVelocity;
			t1 = (1.0 - signedDistToTrianglePlane) * normalDotVelocity;

			// Swap so t0 < t1
			if (t0 > t1) {
				var tmp = t1;
				t1 = t0;
				t0 = tmp;
			}

			// check if at least one value is within the range
			if (t0 > 1.0 || t1 < 0.0)
				return; // both t values are outside 1 and 0, no collision possible


			// clamp to 0 and 1
			t0 = clamp(t0, 0.0, 1.0);
			t1 = clamp(t1, 0.0, 1.0);
		}

		// at this point we have t0 and t1, if there is any intersection, it
		// is between this interval
		var collisionPoint = new Vect3d();
		var foundCollision = false;
		var t = 1.0;

		// first check the easy case: Collision within the triangle;
		// if this happens, it must be at t0 and this is when the sphere
		// rests on the front side of the triangle plane. This can only happen
		// if the sphere is not embedded in the triangle plane.
		if (!embeddedInPlane) {
			var planeIntersectionPoint = (colData.basePoint.substract(trianglePlane.Normal)).add(colData.velocity.multiplyWithScal(t0));

			if (triangle.isPointInsideFast(planeIntersectionPoint)) {
				foundCollision = true;
				t = t0;
				collisionPoint = planeIntersectionPoint.clone();
			}
		}

		// if we havent found a collision already we will have to sweep
		// the sphere against points and edges of the triangle. Note: A
		// collision inside the triangle will always happen before a
		// vertex or edge collision.
		if (!foundCollision) {
			var velocity = colData.velocity.clone();
			var base = colData.basePoint.clone();

			var velocitySqaredLength = velocity.getLengthSQ();
			var a = 0; //:Number;
			var b = 0; //:Number;
			var c = 0; //:Number;
			var newTObj = { N: 0 };

			// for each edge or vertex a quadratic equation has to be solved:
			// a*t^2 + b*t + c = 0. We calculate a,b, and c for each test.
			// check against points
			a = velocitySqaredLength;

			// p1
			b = 2.0 * (velocity.dotProduct(base.substract(triangle.pointA)));
			c = (triangle.pointA.substract(base)).getLengthSQ() - 1.0;
			if (this.getLowestRoot(a, b, c, t, newTObj)) {
				t = newTObj.N;
				foundCollision = true;
				collisionPoint = triangle.pointA.clone();
			}

			// p2
			if (!foundCollision) {
				b = 2.0 * (velocity.dotProduct(base.substract(triangle.pointB)));
				c = (triangle.pointB.substract(base)).getLengthSQ() - 1.0;
				if (this.getLowestRoot(a, b, c, t, newTObj)) {
					t = newTObj.N;
					foundCollision = true;
					collisionPoint = triangle.pointB.clone();
				}
			}

			// p3
			if (!foundCollision) {
				b = 2.0 * (velocity.dotProduct(base.substract(triangle.pointC)));
				c = (triangle.pointC.substract(base)).getLengthSQ() - 1.0;
				if (this.getLowestRoot(a, b, c, t, newTObj)) {
					t = newTObj.N;
					foundCollision = true;
					collisionPoint = triangle.pointC.clone();
				}
			}

			// check against edges:
			// p1 --- p2
			var edge = triangle.pointB.substract(triangle.pointA);
			var baseToVertex = triangle.pointA.substract(base);
			var edgeSqaredLength = edge.getLengthSQ();
			var edgeDotVelocity = edge.dotProduct(velocity);
			var edgeDotBaseToVertex = edge.dotProduct(baseToVertex);

			// calculate parameters for equation
			a = edgeSqaredLength * -velocitySqaredLength +
				edgeDotVelocity * edgeDotVelocity;
			b = edgeSqaredLength * (2.0 * velocity.dotProduct(baseToVertex)) -
				2.0 * edgeDotVelocity * edgeDotBaseToVertex;
			c = edgeSqaredLength * (1.0 - baseToVertex.getLengthSQ()) +
				edgeDotBaseToVertex * edgeDotBaseToVertex;

			// does the swept sphere collide against infinite edge?
			if (this.getLowestRoot(a, b, c, t, newTObj)) {
				f = (edgeDotVelocity * newTObj.N - edgeDotBaseToVertex) / edgeSqaredLength;
				if (f >= 0.0 && f <= 1.0) {
					// intersection took place within segment
					t = newTObj.N;
					foundCollision = true;
					collisionPoint = triangle.pointA.add(edge.multiplyWithScal(f));
				}
			}

			// p2 --- p3
			edge = triangle.pointC.substract(triangle.pointB);
			baseToVertex = triangle.pointB.substract(base);
			edgeSqaredLength = edge.getLengthSQ();
			edgeDotVelocity = edge.dotProduct(velocity);
			edgeDotBaseToVertex = edge.dotProduct(baseToVertex);

			// calculate parameters for equation
			a = edgeSqaredLength * -velocitySqaredLength +
				edgeDotVelocity * edgeDotVelocity;
			b = edgeSqaredLength * (2.0 * velocity.dotProduct(baseToVertex)) -
				2.0 * edgeDotVelocity * edgeDotBaseToVertex;
			c = edgeSqaredLength * (1.0 - baseToVertex.getLengthSQ()) +
				edgeDotBaseToVertex * edgeDotBaseToVertex;

			// does the swept sphere collide against infinite edge?
			if (this.getLowestRoot(a, b, c, t, newTObj)) {
				f = (edgeDotVelocity * newTObj.N - edgeDotBaseToVertex) / edgeSqaredLength;
				if (f >= 0.0 && f <= 1.0) {
					// intersection took place within segment
					t = newTObj.N;
					foundCollision = true;
					collisionPoint = triangle.pointB.add(edge.multiplyWithScal(f));
				}
			}


			// p3 --- p1
			edge = triangle.pointA.substract(triangle.pointC);
			baseToVertex = triangle.pointC.substract(base);
			edgeSqaredLength = edge.getLengthSQ();
			edgeDotVelocity = edge.dotProduct(velocity);
			edgeDotBaseToVertex = edge.dotProduct(baseToVertex);

			// calculate parameters for equation
			a = edgeSqaredLength * -velocitySqaredLength +
				edgeDotVelocity * edgeDotVelocity;
			b = edgeSqaredLength * (2.0 * velocity.dotProduct(baseToVertex)) -
				2.0 * edgeDotVelocity * edgeDotBaseToVertex;
			c = edgeSqaredLength * (1.0 - baseToVertex.getLengthSQ()) +
				edgeDotBaseToVertex * edgeDotBaseToVertex;

			// does the swept sphere collide against infinite edge?
			if (this.getLowestRoot(a, b, c, t, newTObj)) {
				f = (edgeDotVelocity * newTObj.N - edgeDotBaseToVertex) / edgeSqaredLength;
				if (f >= 0.0 && f <= 1.0) {
					// intersection took place within segment
					t = newTObj.N;
					foundCollision = true;
					collisionPoint = triangle.pointC.add(edge.multiplyWithScal(f));
				}
			}
		} // end no collision found


		// set result:  
		if (foundCollision) {
			// distance to collision is t
			var distToCollision = t * colData.velocity.getLength();

			// does this triangle qualify for closest hit?
			if (!colData.foundCollision ||
				distToCollision < colData.nearestDistance) {
				colData.nearestDistance = distToCollision;
				colData.intersectionPoint = collisionPoint.clone();
				colData.foundCollision = true;
				colData.intersectionTriangle = triangle;
				++colData.triangleHits;
			}

		} // end found collision 
	}

	/**
	 * @public
	 */
	getLowestRoot(a, b, c, maxR, outRoot) {
		// check if solution exists
		var determinant = b * b - (4.0 * a * c);

		// if determinant is negative, no solution
		if (determinant < 0.0) return false;

		// calculate two roots: (if det==0 then x1==x2
		// but lets disregard that slight optimization)
		// burningwater: sqrt( 0) is an illegal operation.... smth should be done...
		var sqrtD = Math.sqrt(determinant);

		var r1 = (-b - sqrtD) / (2 * a);
		var r2 = (-b + sqrtD) / (2 * a);

		// sort so x1 <= x2
		if (r1 > r2) {
			var tmp = r2;
			r2 = r1;
			r1 = tmp;
		}

		// get lowest root
		if (r1 > 0 && r1 < maxR) {
			outRoot.N = r1;
			return true;
		}

		// its possible that we want x2, this can happen if x1 < 0
		if (r2 > 0 && r2 < maxR) {
			outRoot.N = r2;
			return true;
		}

		return false;
	}

	/**
	 * @public
	 */
	jump(jumpspeed) {
		if (this.JumpForce == 0)
			this.JumpForce = jumpspeed * 100;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator making {@link SceneNode}s move along a path.
 * Uses {@link PathSceneNode} to define the path.
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class  Scene node animator making {@link SceneNode}s move along a path, uses {@link PathSceneNode} to define the path.
 */
class AnimatorFollowPath extends Animator {
	/** 
	 * Constant for {@link AnimatorFollowPath.EndMode}, specifying to start the movement again when the end of the path has been reached.
	 * @static 
	 * @public
	 */
	static EFPFEM_START_AGAIN = 0;

	/** 
	 * Constant for {@link AnimatorFollowPath.EndMode}, specifying to start the movement again when the end of the path has been reached.
	 * @static 
	 * @public
	 */
	static EFPFEM_STOP = 1;

	/** 
	 * Constant for {@link AnimatorFollowPath.EndMode}, specifying to start the movement again when the end of the path has been reached.
	 * @static 
	 * @public
	 */
	static EFPFEM_SWITCH_TO_CAMERA = 2;

	/**
	 * @type {CL3D.ActionHandler}
	 */
	TheActionHandler;

	/**
	 * @param {CL3D.Scene} scene The scene the animator is in
	 */
	constructor(scene) {
		super();

		this.TimeNeeded = 5000;
		this.TriedToLinkWithPath = false;
		this.IsCamera = false;
		this.LookIntoMovementDirection = false;
		this.OnlyMoveWhenCameraActive = true;
		this.TimeDisplacement = 0;
		this.LastTimeCameraWasInactive = true;
		this.EndMode = AnimatorFollowPath.EFPFEM_START_AGAIN;
		this.SwitchedToNextCamera = false;
		this.Manager = scene;

		this.StartTime = 0;
		this.TriedToLinkWithPath = false;
		this.LastObject = null;
		this.PathNodeToFollow = null;
		this.SwitchedToNextCamera = false;

		this.PathToFollow = null; // string!
		this.TimeDisplacement = 0;
		this.AdditionalRotation = null; //;
		this.CameraToSwitchTo = null; //string	

		this.LastPercentageDoneActionFired = 0;
		this.bActionFired = false;
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorFollowPath, this will return 'followpath'.
	 * @public
	 */
	getType() {
		return 'followpath';
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorFollowPath(newManager);
		a.TimeNeeded = this.TimeNeeded;
		a.LookIntoMovementDirection = this.LookIntoMovementDirection;
		a.OnlyMoveWhenCameraActive = this.OnlyMoveWhenCameraActive;
		a.PathToFollow = this.PathToFollow;
		a.TimeDisplacement = this.TimeDisplacement;
		a.AdditionalRotation = this.AdditionalRotation ? this.AdditionalRotation.clone() : null;
		a.EndMode = this.EndMode;
		a.CameraToSwitchTo = this.CameraToSwitchTo;
		a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;
		return a;
	}

	/**
	 * Sets the options for animating the node along the path
	 * @public
	 * @param endmode {Number} Mode specifying what should happen when the end of the path has been reached.
	 * Can be {@link AnimatorFollowPath.EFPFEM_START_AGAIN} or {@link AnimatorFollowPath.EFPFEM_STOP}
	 * @param timeNeeded {Number} Time in milliseconds needed for following the whole path, for example 10000 for 10 seconds.
	 * @param lookIntoMovementDirection {Boolean} true if the node should look into the movement direction or false
	 * if not.
	 *
	 */
	setOptions(endmode, timeNeeded, lookIntoMovementDirection) {
		this.EndMode = endmode;
		this.LookIntoMovementDirection = lookIntoMovementDirection;
		this.TimeNeeded = timeNeeded;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		if (n == null || !this.Manager || !this.TimeNeeded)
			return false;

		if (!(n === this.LastObject)) {
			this.setNode(n);
			return false;
		}

		this.linkWithPath();

		if (this.PathNodeToFollow == null)
			return false;

		var changed = false;
		var cam = null;

		if (this.IsCamera && this.OnlyMoveWhenCameraActive) {
			// only move the camera when the active flag is set
			var oldActive = !this.LastTimeCameraWasInactive;

			cam = n;
			if (!(this.Manager.getActiveCamera() === cam)) {
				if (this.PathNodeToFollow.Nodes.length) // for the editor only, set the position to the first path node
					cam.Pos = this.PathNodeToFollow.getPathNodePosition(0);

				this.LastTimeCameraWasInactive = true;
				return false;
			}

			else
				this.LastTimeCameraWasInactive = false;

			if (!this.StartTime || !oldActive)
				this.StartTime = timeMs;
		}

		if (!this.StartTime) {
			// use start time of scene
			this.StartTime = this.Manager.getStartTime();
		}

		var percentageDone = (timeMs - this.StartTime + this.TimeDisplacement) / this.TimeNeeded;

		// when path finished, do what set in settings
		if (percentageDone > 1.0 && !this.PathNodeToFollow.IsClosedCircle) {
			switch (this.EndMode) {
				case AnimatorFollowPath.EFPFEM_START_AGAIN:
					percentageDone = percentageDone % 1.0;
					break;
				case AnimatorFollowPath.EFPFEM_STOP:
					percentageDone = 1.0;
					break;
				case AnimatorFollowPath.EFPFEM_SWITCH_TO_CAMERA:
					percentageDone = 1.0;
					if (!this.SwitchedToNextCamera) {
						this.switchToNextCamera();
						this.SwitchedToNextCamera = true;
					}
					break;
				case 3: // EFPFEM_START_AGAIN_AND_DO_ACTION
					if (percentageDone > this.LastPercentageDoneActionFired + 1.0 && this.TheActionHandler != null) {
						this.TheActionHandler.execute(n);
						this.LastPercentageDoneActionFired = percentageDone;
					}
					percentageDone = percentageDone % 1.0;
					break;
				case 4: // EFPFEM_STOP_AND_DO_ACTION
					percentageDone = 1.0;
					if (!this.bActionFired && this.TheActionHandler != null) {
						this.TheActionHandler.execute(n);
						this.bActionFired = true;
					}
					break;
			}
		}

		else
			this.SwitchedToNextCamera = false;

		// advance node on path
		var pos = this.PathNodeToFollow.getPointOnPath(percentageDone);
		changed = !pos.equals(n.Pos);
		n.Pos = pos;

		if (this.LookIntoMovementDirection && this.PathNodeToFollow.Nodes.length) {
			// set lookat target of moving object
			var nextOnWay = percentageDone + 0.001;
			var nextPos;

			if (this.PathNodeToFollow.IsClosedCircle) {
				nextPos = this.PathNodeToFollow.getPointOnPath(nextOnWay);
			}

			else
				nextPos = this.PathNodeToFollow.getPointOnPath(nextOnWay);

			if (!iszero(nextPos.getDistanceTo(pos))) {
				var lookvector = nextPos.substract(pos);
				lookvector.setLength(100.0);

				if (n instanceof CameraSceneNode) {
					cam = n;
					var newTarget = pos.add(lookvector);
					changed = changed || !newTarget.equals(cam.Target);
					cam.setTarget(newTarget);
				}

				else {
					//node->setRotation(AdditionalRotation + lookvector.getHorizontalAngle());
					var newRot;

					if (!this.AdditionalRotation || this.AdditionalRotation.equalsZero()) {
						newRot = lookvector.getHorizontalAngle();
						changed = changed || !newRot.equals(n.Rot);
						n.Rot = newRot;
					}

					else {
						// TODO: in this part, there is a bug somewhere, but only in the flash version.
						// that's because the above version is implemented which at least works correctly
						// when AdditionalRotation is zero, and is faster additionally.
						var matrot = new Matrix4();
						matrot.setRotationDegrees(lookvector.getHorizontalAngle());
						var matrot2 = new Matrix4();
						matrot2.setRotationDegrees(this.AdditionalRotation);
						matrot = matrot.multiply(matrot2);

						newRot = matrot.getRotationDegrees();
						changed = changed || !newRot.equals(n.Rot);
						n.Rot = newRot;
					}
				}
			}
		}

		return changed;
	}

	/**
	* @public
	*/
	setNode(n) {
		this.LastObject = n;
		if (this.LastObject)
			this.IsCamera = (this.LastObject.getType() == 'camera');
	}

	/**
	* @public
	*/
	linkWithPath() {
		if (this.PathNodeToFollow)
			return;

		if (this.TriedToLinkWithPath)
			return;

		if (!this.PathToFollow.length)
			return;

		if (!this.Manager)
			return;

		var node = this.Manager.getSceneNodeFromName(this.PathToFollow);
		if (node && node instanceof PathSceneNode && node.getType() == 'path') {
			this.setPathToFollow(node);
		}
	}

	/**
	 * Define the path this animator should follow
	 * @param path {CL3D.PathSceneNode} scene node representing the path
	 * @public
	 */
	setPathToFollow(path) {
		this.PathNodeToFollow = path;
	}

	/**
	 * @public
	 */
	switchToNextCamera() {
		if (!this.Manager)
			return;

		if (!this.CameraToSwitchTo.length)
			return;

		var node = this.Manager.getSceneNodeFromName(this.CameraToSwitchTo);
		if (node && node instanceof CameraSceneNode && node.getType() == 'camera') {
			var renderer = this.Manager.getLastUsedRenderer();
			if (renderer)
				node.setAutoAspectIfNoFixedSet(renderer.getWidth(), renderer.getHeight());
			this.Manager.setActiveCamera(node);
		}
	}

	/**
	 * @public
	 */
	findActionByType(type) {
		if (this.TheActionHandler)
			return this.TheActionHandler.findAction(type);

		return null;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator making {@link SceneNode}s move along straight line between two points.
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class Scene node animator making {@link SceneNode}s move along straight line between two points.
 */
class AnimatorFlyStraight extends Animator {
	/**
 	 * @param {CL3D.Vect3d=} start Start 3d position of the line
 	 * @param {CL3D.Vect3d=} end End 3d position of the line
 	 * @param {Number=} timeforway Time for moving along the whole line in milliseconds. For example 2000 for 2 seconds.
 	 * @param {Boolean=} loop set to true for looping along the line, false for stopping movement when the end has been reached.
 	 * @param {Boolean=} deleteMeAfterEndReached set to true if the animator should delete itself after the end has been reached.
 	 * @param {Boolean=} animateCameraTargetInsteadOfPosition if the animated node is a camera, set to true to animate the camera target instead of the position of the camera.
	 */
	constructor(start, end, timeforway, loop, deleteMeAfterEndReached, animateCameraTargetInsteadOfPosition) {
		super();

		this.Start = new Vect3d(0, 0, 0);
		this.End = new Vect3d(40, 40, 40);
		this.StartTime = CLTimer.getTime();
		this.TimeForWay = 3000;
		this.Loop = false;
		this.DeleteMeAfterEndReached = false;
		this.AnimateCameraTargetInsteadOfPosition = false;

		this.TestShootCollisionWithBullet = false;
		this.ShootCollisionNodeToIgnore = null;
		this.ShootCollisionDamage = 0;
		this.DeleteSceneNodeAfterEndReached = false;
		/**
		 * @type {CL3D.Action}
		 */
		this.ActionToExecuteOnEnd = null;
		this.ExecuteActionOnEndOnlyIfTimeSmallerThen = 0;

		if (start)
			this.Start = start.clone();
		if (end)
			this.End = end.clone();
		if (timeforway)
			this.TimeForWay = timeforway;
		if (loop)
			this.Loop = loop;

		this.recalculateImidiateValues();

		if (deleteMeAfterEndReached)
			this.DeleteMeAfterEndReached = deleteMeAfterEndReached;
		if (animateCameraTargetInsteadOfPosition)
			this.AnimateCameraTargetInsteadOfPosition = animateCameraTargetInsteadOfPosition;
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorFlyStraight, this will return 'flystraight'.
	 * @public
	 */
	getType() {
		return 'flystraight';
	}

	/**
	 * @public
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorFlyStraight();
		a.Start = this.Start.clone();
		a.End = this.End.clone();
		a.Vector = this.Vector.clone();
		a.WayLength = this.WayLength;
		a.TimeFactor = this.TimeFactor;
		a.TimeForWay = this.TimeForWay;
		a.Loop = this.Loop;
		a.AnimateCameraTargetInsteadOfPosition = this.AnimateCameraTargetInsteadOfPosition;
		a.DeleteSceneNodeAfterEndReached = this.DeleteSceneNodeAfterEndReached;
		a.ActionToExecuteOnEnd = this.ActionToExecuteOnEnd ? this.ActionToExecuteOnEnd.createClone(oldNodeId, newNodeId) : null;
		a.ExecuteActionOnEndOnlyIfTimeSmallerThen = this.ExecuteActionOnEndOnlyIfTimeSmallerThen;
		return a;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		var t = (timeMs - this.StartTime);
		var endReached = false;

		if (t != 0) {
			var pos = this.Start.clone();

			if (!this.Loop && t >= this.TimeForWay) {
				pos = this.End.clone();
				endReached = true;
			}

			else {
				pos.addToThis(this.Vector.multiplyWithScal((t % this.TimeForWay) * this.TimeFactor));
			}

			if (this.AnimateCameraTargetInsteadOfPosition) {
				if (n instanceof CameraSceneNode && n.getType() == 'camera') {
					n.setTarget(pos);

					var animfps = n.getAnimatorOfType('camerafps');
					if (animfps != null && animfps instanceof AnimatorCameraFPS)
						animfps.lookAt(pos);
				}
			}

			else {
				n.Pos = pos;
			}

			if (this.TestShootCollisionWithBullet && this.StartTime != timeMs) // the node must not be in the exact same frame it was created in,

			// otherwise, we risk an endless loop if the bullet is shot in the onHit handler
			{
				endReached = this.doShootCollisionTest(n) || endReached;
			}

			if (endReached) {
				if (n.scene)
					n.scene.LastBulletImpactPosition = n.Pos.clone();

				if (this.ActionToExecuteOnEnd) {
					var runAction = true;
					if (this.ExecuteActionOnEndOnlyIfTimeSmallerThen > 0 && t > this.ExecuteActionOnEndOnlyIfTimeSmallerThen)
						runAction = false;

					if (runAction)
						this.ActionToExecuteOnEnd.execute(n);
				}

				if (this.DeleteMeAfterEndReached)
					n.removeAnimator(this);

				if (this.DeleteSceneNodeAfterEndReached && n.scene)
					n.scene.addToDeletionQueue(n, 0);
			}

			return true;
		}

		return false;
	}

	/**
	 * @public
	 */
	doShootCollisionTest(bulletNode) {
		if (!bulletNode)
			return false;

		bulletNode.updateAbsolutePosition();
		var box = bulletNode.getTransformedBoundingBox();

		var hit = false;

		var nodes = bulletNode.scene.getAllSceneNodesWithAnimator('gameai');

		for (var i = 0; i < nodes.length; ++i) {
			if (nodes[i] === this.ShootCollisionNodeToIgnore)
				continue;

			var enemyAI = nodes[i].getAnimatorOfType('gameai');

			if (enemyAI && !enemyAI.isAlive()) // don't test collision against dead items
				continue;

			if (box.intersectsWithBox(nodes[i].getTransformedBoundingBox())) {
				// hit found
				enemyAI.OnHit(this.ShootCollisionDamage, nodes[i]);
				hit = true;
				break;
			}
		}

		return hit;
	}
	
	/**
	 * @public
	 */
	recalculateImidiateValues() {
		this.Vector = this.End.substract(this.Start);
		this.WayLength = this.Vector.getLength();
		this.Vector.normalize();
		this.TimeFactor = this.WayLength / this.TimeForWay;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator making {@link SceneNode}s move in a circle
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class Scene node animator making {@link SceneNode}s move in a circle
 */
class AnimatorFlyCircle extends Animator {
	/**
	 * 
	 * @param {CL3D.Vect3d=} center 3d position of the center of the circle
	 * @param {Number=} radius radius of the circle
	 * @param {CL3D.Vect3d=} direction direction of the circle. For example (0,1,0) for up.
	 * @param {Number=} speed movement speed, for example 0.01
	 */
	constructor(center, radius, direction, speed) {
		super();

		this.Center = new Vect3d();
		this.Direction = new Vect3d(0, 1, 0);
		this.VecU = new Vect3d();
		this.VecV = new Vect3d();
		this.StartTime = CLTimer.getTime();
		this.Speed = 0.01;
		this.Radius = 100;

		if (center)
			this.Center = center.clone();
		if (radius)
			this.Radius = radius;
		if (direction)
			this.Direction = direction.clone();
		if (speed)
			this.Speed = speed;

		this.init();
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorFlyCircle, this will return 'flycircle'.
	 * @public
	 */
	getType() {
		return 'flycircle';
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorFlyCircle();
		a.Center = this.Center.clone();
		a.Direction = this.Direction.clone();
		a.VecU = this.VecU.clone();
		a.VecV = this.VecV.clone();
		a.Speed = this.Speed;
		a.Radius = this.Radius;
		return a;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		var diff = (timeMs - this.StartTime);

		if (diff != 0) {
			var t = diff * this.Speed;

			var v = this.VecU.multiplyWithScal(Math.cos(t)).add(this.VecV.multiplyWithScal(Math.sin(t)));
			v.multiplyThisWithScal(this.Radius);
			n.Pos = this.Center.add(v);
			return true;
		}

		return false;
	}
	
	init() {
		this.Direction.normalize();

		if (this.Direction.Y != 0) {
			this.VecV = new Vect3d(50, 0, 0);
			this.VecV = this.VecV.crossProduct(this.Direction);
			this.VecV.normalize();
		}

		else {
			this.VecV = new Vect3d(0, 50, 0);
			this.VecV = this.VecV.crossProduct(this.Direction);
			this.VecV.normalize();
		}

		this.VecU = this.VecV.crossProduct(this.Direction);
		this.VecU.normalize();
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator changing the texture of {@link SceneNode}s so that they appear animated.
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class  Scene node animator changing the texture of {@link SceneNode}s so that they appear animated.
 */
class AnimatorAnimateTexture extends Animator {
	/**
	 * @param {CL3D.Texture[]=} textures array of {@link Texture}s to set
	 * @param {Number=} timeperframe time to switch to the next texture in the texture array, in milliseconds. For example 500 for half a second per  frame.
	 * @param {Boolean=} donotloop if set to true, the animation will only be played once
	 */
	constructor(textures, timeperframe, donotloop) {
		super();

		//private static const ETCT_CHANGE_ALL = 0;
		//private static const ETCT_CHANGE_WITH_INDEX = 1;
		this.Textures = new Array(); // Textures

		this.Loop = true;
		this.TimePerFrame = 20;
		this.TextureChangeType = 0;
		this.TextureIndexToChange = 0;
		this.MyStartTime = 0;

		if (textures)
			this.Textures = textures;
		if (timeperframe)
			this.TimePerFrame = timeperframe;
		if (donotloop == true)
			this.loop = false;
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorAnimateTexture, this will return 'animatetexture'.
	 * @public
	 */
	getType() {
		return 'animatetexture';
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorAnimateTexture();
		a.Textures = this.Textures;
		a.Loop = this.Loop;
		a.TimePerFrame = this.TimePerFrame;
		a.TextureChangeType = this.TextureChangeType;
		a.TextureIndexToChange = this.TextureIndexToChange;
		return a;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		if (n == null || this.Textures == null)
			return false;

		var changedSomething = false;
		var mat = null;

		if (this.Textures.length) {
			var startTime = (this.MyStartTime == 0) ? n.scene.getStartTime() : this.MyStartTime;

			var t = (timeMs - startTime);
			var endTime = startTime + (this.TimePerFrame * this.Textures.length);

			var idx = 0;
			if (!this.Loop && timeMs >= endTime)
				idx = this.Textures.length - 1;

			else {
				if (this.TimePerFrame > 0)
					idx = Math.floor((t / this.TimePerFrame) % this.Textures.length);

				else
					idx = 0;
			}

			if (idx < this.Textures.length) {
				if (this.TextureChangeType == 1) //ETCT_CHANGE_WITH_INDEX)
				{
					// change only the material with the index
					if (this.TextureIndexToChange >= 0 && this.TextureIndexToChange < n.getMaterialCount()) {
						mat = n.getMaterial(this.TextureIndexToChange);
						if (mat && !(mat.Tex1 === this.Textures[idx])) {
							mat.Tex1 = this.Textures[idx];
							changedSomething = true;
						}
					}
				}

				else {
					// change all materials
					var mcount = n.getMaterialCount();
					for (var i = 0; i < mcount; ++i) {
						mat = n.getMaterial(i);
						if (mat && !(mat.Tex1 === this.Textures[idx])) {
							mat.Tex1 = this.Textures[idx];
							changedSomething = true;
						}
					}
				}
			}
		}

		return changedSomething;
	}

	/**
	 * @public
	 */
	reset() {
		this.MyStartTime = CLTimer.getTime();
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Scene node animator making {@link SceneNode}s rotate
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class  Scene node animator making {@link SceneNode}s rotate
 */
class AnimatorRotation extends Animator {
	/**
	 * 
	 * @param {CL3D.Vect3d=} speed vector defining the RotationSpeed in each direction
	 */
	constructor(speed) {
		super();

		this.Rotation = new Vect3d();
		if (speed)
			this.Rotation = speed.clone();

		this.StartTime = CLTimer.getTime();

		this.RotateToTargetAndStop = false; // for setRotateToTargetAndStop
		this.RotateToTargetEndTime = 0; // for setRotateToTargetAndStop
		this.BeginRotation = null; // for setRotateToTargetAndStop
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorRotation, this will return 'rotation'.
	 * @public
	 */
	getType() {
		return 'rotation';
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorRotation();
		a.Rotation = this.Rotation.clone();
		a.StartTime = this.StartTime;
		return a;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param timeMs: The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		var difftime = timeMs - this.StartTime;

		if (!this.RotateToTargetAndStop) {
			if (difftime != 0) {
				n.Rot.addToThis(this.Rotation.multiplyWithScal(difftime / 10.0));

				this.StartTime = timeMs;
				return true;
			}
		}

		else {
			// rotate to a target rotation and then stop
			if (this.RotateToTargetEndTime - this.StartTime == 0)
				return false;

			var interpol = (timeMs - this.StartTime) / (this.RotateToTargetEndTime - this.StartTime);
			if (interpol > 1.0) {
				// end reached, destroy this animator
				n.Rot = this.Rotation.clone();
				n.removeAnimator(this);
			}

			else {
				// interpolate 
				var q1 = new Quaternion();
				var vtmp = this.Rotation.multiplyWithScal(DEGTORAD);

				q1.setFromEuler(vtmp.X, vtmp.Y, vtmp.Z);

				var q2 = new Quaternion();
				vtmp = this.BeginRotation.multiplyWithScal(DEGTORAD);
				q2.setFromEuler(vtmp.X, vtmp.Y, vtmp.Z);

				q2.slerp(q2, q1, interpol);
				vtmp = new Vect3d();
				q2.toEuler(vtmp);

				vtmp.multiplyThisWithScal(RADTODEG);
				n.Rot = vtmp;

				return true;
			}
		}

		return false;
	}

	/**
	 * Makes the animator rotate the scene node to a specific target and then stop there
	 * @public
	 */
	setRotateToTargetAndStop(targetRot, beginRot, timeForMovement) {
		this.RotateToTargetAndStop = true;
		this.Rotation = targetRot.clone();
		this.BeginRotation = beginRot.clone();
		this.RotateToTargetEndTime = this.StartTime + timeForMovement;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Special scene node animator making cameras user controlled model viewrs around a pivot point on a fixed radius.
 * This scene node animator can be attached to a {@link CameraSceneNode} to make it act like a user controlled model viewer.
 * Simply set the target of the camera to the pivot point and attach this animator to make it work.
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class Special scene node animator for model viewer cameras. 
 */
class AnimatorCameraModelViewer extends Animator {
	/**
	 * Rotation speed of the camera
	 * @public
	 * @type Number
	 * @default 0.06
	 */
	RotateSpeed = 0.06;

	/**
	 * Radius of the camera
	 * @default 100
	 * @public
	 * @type Number
	 */
	Radius = 100;

	/**
	 * Defines if the animator may only move the camera horizontally
	 * @default false
	 * @public
	 * @type Boolean
	 */
	NoVerticalMovement = false;

	/**
 	 * @param {CL3D.CameraSceneNode} cam an instance of a {@link CameraSceneNode} this animator will be attached to. Can be null if the camera is not yet known.
 	 * @param {CL3D.CopperLicht} engine An instance of the {@link CopperLicht} 3d engine, for receiving the mouse and keyboard input.
	 */
	constructor(cam, engine) {
		super();

		this.Type = -1;

		this.RotateSpeed = 10000;
		this.Radius = 100;
		this.NoVerticalMovement = false;

		this.lastAnimTime = CLTimer.getTime();
		this.Camera = cam;
		this.CursorControl = engine;

		this.SlideAfterMovementEnd = false;
		this.SlidingSpeed = 0;
		this.SlidingMoveX = 0;
		this.SlidingMoveY = 0;

		this.AllowZooming = false;
		this.MinZoom = 0;
		this.MaxZoom = 0;
		this.ZoomSpeed = 0;
		this.TargetZoomValue = 90;

		this.NoVerticalMovementYPos = -66666.0;

		this.LastMouseDownLookX = -1;
		this.LastMouseDownLookY = -1;
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorCameraModelViewer, this will return 'cameramodelviewer'.
	 * @public
	 */
	getType() {
		return 'cameramodelviewer';
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		if (this.Camera == null)
			return false;

		if (!(this.Camera.scene.getActiveCamera() === this.Camera))
			return false;

		var now = CLTimer.getTime();
		var timeDiff = now - this.lastAnimTime;
		if (timeDiff > 250)
			timeDiff = 250;
		this.lastAnimTime = now;

		// move forwards/backwards
		var pos = this.Camera.Pos.clone();
		var target = this.Camera.Target.clone();
		var targetvect = target.substract(this.Camera.getAbsolutePosition());

		var moveX = 0;
		var moveY = 0;

		if (this.CursorControl.isMouseDown()) {
			var mx = this.CursorControl.getMouseX();
			var my = this.CursorControl.getMouseY();

			moveX = (this.LastMouseDownLookX == -1 ? 0 : (mx - this.LastMouseDownLookX)) * this.RotateSpeed / 50000;
			moveY = (this.LastMouseDownLookY == -1 ? 0 : (my - this.LastMouseDownLookY)) * this.RotateSpeed / 50000;

			this.LastMouseDownLookX = mx;
			this.LastMouseDownLookY = my;
		}

		else {
			this.LastMouseDownLookX = -1;
			this.LastMouseDownLookY = -1;
		}

		// sliding after movement ended
		if (this.SlideAfterMovementEnd &&
			this.SlidingSpeed != 0) {
			if (iszero(moveX)) {
				// slide a bit after movement has finished
				moveX = this.SlidingMoveX;

				this.SlidingMoveX *= 0.9; // this is not frame independent, but since the fps is capped, its quite ok

				if (this.SlidingMoveX > 0)
					this.SlidingMoveX = Math.max(0.0, this.SlidingMoveX - (timeDiff / this.SlidingSpeed));

				else if (this.SlidingMoveX < 0)
					this.SlidingMoveX = Math.min(0.0, this.SlidingMoveX + (timeDiff / this.SlidingSpeed));
			}

			else
				this.SlidingMoveX = moveX * (this.SlidingSpeed / 1000.0);

			if (iszero(moveY)) {
				// slide a bit after movement has finished
				moveY = this.SlidingMoveY;

				this.SlidingMoveY *= 0.9; // this is not frame independent, but since the fps is capped, its quite ok

				if (this.SlidingMoveY > 0)
					this.SlidingMoveY = Math.max(0.0, this.SlidingMoveY - (timeDiff / this.SlidingSpeed));

				else if (this.SlidingMoveY < 0)
					this.SlidingMoveY = Math.min(0.0, this.SlidingMoveY + (timeDiff / this.SlidingSpeed));
			}

			else
				this.SlidingMoveY = moveY * (this.SlidingSpeed / 1000.0);
		}

		// horizontal movement
		var strafevect = targetvect.crossProduct(this.Camera.UpVector);
		strafevect.Y = 0.0;
		strafevect.normalize();

		if (!iszero(moveX)) {
			strafevect.multiplyThisWithScal(timeDiff * moveX);
			pos.addToThis(strafevect);
		}

		// vertical movement
		if (!this.NoVerticalMovement && !iszero(moveY)) {
			var upv = this.Camera.UpVector.clone();
			upv.normalize();

			var newpos = pos.add(upv.multiplyWithScal(timeDiff * moveY));
			var newPosNoY = newpos.clone();
			newPosNoY.Y = target.Y;

			var minRadius = this.Radius / 10.0;
			if (newPosNoY.getDistanceTo(target) > minRadius)
				pos = newpos;
		}

		// also correct vertical position if bool NoVerticalMovement is on
		if (this.NoVerticalMovement) {
			if (equals(this.NoVerticalMovementYPos, -66666.0))
				this.NoVerticalMovementYPos = pos.Y;

			pos.Y = this.NoVerticalMovementYPos;
		}

		// set mouse
		this.CursorControl.setMouseDownWhereMouseIsNow();

		// zoom
		if (this.AllowZooming) {
			var newFov = radToDeg(this.Camera.getFov());

			if (this.TargetZoomValue < this.MinZoom)
				this.TargetZoomValue = this.MinZoom;
			if (this.TargetZoomValue > this.MaxZoom)
				this.TargetZoomValue = this.MaxZoom;

			var localZoomSpeed = this.ZoomSpeed;
			localZoomSpeed = Math.abs(this.TargetZoomValue - newFov) / 8.0;
			if (localZoomSpeed < this.ZoomSpeed)
				localZoomSpeed = this.ZoomSpeed;

			if (newFov < this.MaxZoom - localZoomSpeed && newFov < this.TargetZoomValue) {
				newFov += localZoomSpeed;
				if (newFov > this.MaxZoom)
					newFov = this.MaxZoom;
			}

			if (newFov > this.MinZoom + localZoomSpeed && newFov > this.TargetZoomValue) {
				newFov -= localZoomSpeed;
				if (newFov < this.MinZoom)
					newFov = this.MinZoom;
			}

			this.Camera.setFov(degToRad(newFov));
		}

		// force circle on radius
		targetvect = pos.substract(target);
		targetvect.setLength(this.Radius);
		pos = target.add(targetvect);

		this.Camera.Pos = pos;

		return false;
	}

	/**
	 * @public
	 */
	onMouseWheel(delta) {
		this.TargetZoomValue += delta * this.ZoomSpeed;

		if (this.TargetZoomValue < this.MinZoom)
			this.TargetZoomValue = this.MinZoom;

		if (this.TargetZoomValue > this.MaxZoom)
			this.TargetZoomValue = this.MaxZoom;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * Special scene node animator for first person shooter cameras.
 * This scene node animator can be attached to a {@link CameraSceneNode} to make it act like a first person shooter.
 * By pressing the cursor keys or WASD, the camera will move and by having the mouse button pressed while moving, the camera
 * will look around.
 * @constructor
 * @public
 * @extends CL3D.Animator
 * @class Special scene node animator for first person shooter cameras.
 */
class AnimatorCameraFPS extends Animator {
	/**
	 * Maximal vertical angle the user is able to look.
	 * @public
	 * @type Number
	 * @default 88
	 */
	MaxVerticalAngle = 88.0;

	/**
	 * Maximal movment speed of the camera.
	 * @default 0.06
	 * @public
	 * @type Number
	 */
	MoveSpeed = 0.06;

	/**
	 * Maximal rotation speed the user is able to look.
	 * @default 200.0
	 * @public
	 * @type Number
	 */
	RotateSpeed = 200.0;

	/**
	 * Maximal jump speed the user is able to jump with this camera.
	 * @default 0
	 * @public
	 * @type Number
	 */
	JumpSpeed = 0;

	/**
	 * Defines if the animator may only move the camera horizontally
	 * @default false
	 * @public
	 * @type Boolean
	 */
	NoVerticalMovement = false;

	/**
	 * Defines if the animator may move  the camera
	 * @default true
	 * @public
	 * @type Boolean
	 * @default true
	 */
	MayMove = true;

	/**
	 * Defines if the animator may zoom the camera
	 * @public
	 * @type Boolean
	 * @default true
	 */
	MayZoom = true;

	/**
	 * @param {CL3D.CameraSceneNode} cam an instance of a {@link CameraSceneNode} this animator will be attached to. Can be null if the camera is not yet known.
 	 * @param {CL3D.CopperLicht} engine An instance of the {@link CopperLicht} 3d engine, for receiving the mouse and keyboard input.
	 */
	constructor(cam, engine) {
		super();

		this.Type = -1;
		this.lastAnimTime = 0;
		this.NoVerticalMovement = false;

		this.moveByMouseDown = true; // move camera look direction only when the mouse is dragged and down
		this.moveByMouseMove = false; // move camera look direction by mouse movement, relative to distance of screen center
		this.moveByPanoDrag = false; // move camera look direction only when the mouse is dragged and down, but don't reset down position

		this.leftKeyDown = false;
		this.rightKeyDown = false;
		this.upKeyDown = false;
		this.downKeyDown = false;
		this.jumpKeyDown = false;

		this.MoveSmoothing = 0; // milliseconds needed to slow down movement
		this.lastMoveVector = new Vect3d(0, 0, 0);
		this.lastMoveTime = 0;

		this.ChildrenDontUseZBuffer = true;

		this.relativeRotationX = 0;
		this.relativeRotationY = 0;

		this.minZoom = 20;
		this.maxZoom = 100;
		this.zoomSpeed = (this.maxZoom - this.minZoom) / 50.0;

		this.targetZoomValue = 90;

		this.lastAnimTime = CLTimer.getTime();
		this.Camera = cam;
		this.CursorControl = engine;

		this.LastMouseDownLookX = -1;
		this.LastMouseDownLookY = -1;

		this.LastTimeJumpKeyWasUp = true;

		if (cam)
			this.lookAt(cam.getTarget());
	}

	/**
	 * Returns the type of the animator.
	 * For the AnimatorCameraFPS, this will return 'camerafps'.
	 * @public
	 */
	getType() {
		return 'camerafps';
	}

	/**
	 * Sets if the animator may move the camera
	 * @public
	 * @param {Boolean} b
	 * @default true
	 */
	setMayMove(b) {
		this.MayMove = b;
	}

	/**
	 * Sets if the camera look direction is moved by the cursor when the mouse is down or not
	 * @public
	 * @param {Boolean} b
	 * @default true
	 */
	setLookByMouseDown(b) {
		this.moveByMouseDown = b;
		this.moveByMouseMove = !b;
	}

	/**
	 * Lets the camera look at the specified point.
	 * @public
	 * @param target target 3d position of type {@link Vect3d}.
	 */
	lookAt(target) {
		if (this.Camera == null)
			return;

		var vect = target.substract(this.Camera.Pos);
		vect = vect.getHorizontalAngle();
		this.relativeRotationX = vect.X;
		this.relativeRotationY = vect.Y;

		if (this.relativeRotationX > this.MaxVerticalAngle)
			this.relativeRotationX -= 360.0;
	}

	/**
	 * Animates the scene node it is attached to and returns true if scene node was modified.
	 * @public
	 * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
	 * @param {Number} timeMs The time in milliseconds since the start of the scene.
	 */
	animateNode(n, timeMs) {
		if (this.Camera == null)
			return false;

		if (!(this.Camera.scene.getActiveCamera() === this.Camera))
			return false;

		var now = CLTimer.getTime();
		var timeDiff = now - this.lastAnimTime;
		if (timeDiff == 0)
			return false;

		if (timeDiff > 250)
			timeDiff = 250;
		this.lastAnimTime = now;

		// move forwards/backwards
		// var pos = this.Camera.Pos.clone();
		var tomove = new Vect3d(0, 0, 0);

		if (this.MayMove && (this.upKeyDown || this.downKeyDown)) {
			var moveVect = this.Camera.Pos.substract(this.Camera.getTarget());

			if (this.NoVerticalMovement)
				moveVect.Y = 0;

			moveVect.normalize();


			if (this.upKeyDown) {
				tomove.addToThis(moveVect.multiplyWithScal(this.MoveSpeed * -timeDiff));
			}

			if (this.downKeyDown) {
				tomove.addToThis(moveVect.multiplyWithScal(this.MoveSpeed * timeDiff));
			}
		}

		// strafe
		if (this.MayMove && (this.leftKeyDown || this.rightKeyDown)) {
			var strafeVect = this.Camera.Pos.substract(this.Camera.getTarget()).crossProduct(this.Camera.getUpVector());
			strafeVect.normalize();

			if (this.leftKeyDown) {
				strafeVect = strafeVect.multiplyWithScal(this.MoveSpeed * -timeDiff);

				tomove.addToThis(strafeVect);
				//this.Camera.setTarget(this.Camera.getTarget().add(strafeVect));
			}

			if (this.rightKeyDown) {
				strafeVect = strafeVect.multiplyWithScal(this.MoveSpeed * timeDiff);

				tomove.addToThis(strafeVect);
				//this.Camera.setTarget(this.Camera.getTarget().add(strafeVect));
			}
		}


		// move smoothing
		if (this.MoveSmoothing != 0) {
			var lastMove = tomove.clone(); //pos.substract(this.Camera.Pos);
			if (!lastMove.equalsZero()) {
				// moved by user this frame, no smoothing, but record movement
				this.lastMoveVector = lastMove;
				this.lastMoveVector.multiplyThisWithScal(1.0 / timeDiff);
				this.lastMoveTime = now;
			}

			else {
				// not moved by user this frame, add movement smoothing
				if (this.lastMoveTime != 0 && !this.lastMoveVector.equalsZero()) {
					var smoothTime = now - this.lastMoveTime;
					if (smoothTime > 0 && smoothTime < this.MoveSmoothing) {
						var smoothLength = this.lastMoveVector.getLength() * (1.0 - (smoothTime / this.MoveSmoothing)) * timeDiff;

						var v = this.lastMoveVector.clone();
						v.normalize();
						v.multiplyThisWithScal(smoothLength * 0.5);

						tomove.addToThis(v);
					}

					else
						this.lastMoveVector.set(0, 0, 0);
				}
			}
		}

		// add everything
		tomove.normalize();
		tomove.multiplyThisWithScal(timeDiff * this.MoveSpeed);
		this.Camera.Pos.addToThis(tomove);
		this.Camera.setTarget(this.Camera.getTarget().add(tomove));

		// this.Camera.Pos = pos;
		// zoom
		/*
		if (this.MayZoom)
		{
			var newFov = CL3D.radToDeg(this.Camera.getFov());

			this.targetZoomValue += this.getAdditionalZoomDiff() * timeDiff;

			if (this.targetZoomValue < this.minZoom)
				this.targetZoomValue = this.minZoom;
			if (this.targetZoomValue > this.maxZoom)
				this.targetZoomValue = this.maxZoom;

			var localZoomSpeed = this.zoomSpeed;
			localZoomSpeed = Math.abs(this.targetZoomValue - newFov) / 8.0;
			if (localZoomSpeed  < this.zoomSpeed)
				localZoomSpeed  = this.zoomSpeed;

			if (newFov < this.maxZoom-localZoomSpeed && newFov < this.targetZoomValue)
			{
				newFov += localZoomSpeed;
				if (newFov > this.maxZoom)
					newFov = this.maxZoom;
			}

			if (newFov > this.minZoom+localZoomSpeed && newFov > this.targetZoomValue)
			{
				newFov -= localZoomSpeed;
				if (newFov < this.minZoom)
					newFov = this.minZoom;
			}

			this.Camera.setFov(CL3D.degToRad(newFov));
		}*/
		// change camera target with mouse
		var target = new Vect3d(0, 0, 1);
		var mat = new Matrix4();
		mat.setRotationDegrees(new Vect3d(this.relativeRotationX, this.relativeRotationY, 0));
		mat.transformVect(target);

		// move lookat target up / down
		var pointerLocked = false;
		if (this.CursorControl != null)
			pointerLocked = this.CursorControl.isInPointerLockMode();

		var maxdiff = 300; // to limit the maximum diff in pixels
		var ydiff = 0;
		var RotateSpeedFactX = 1 / 50000.0;
		var RotateSpeedFactY = 1 / 50000.0;

		var bOver2DOverlay = false;
		if (this.CursorControl != null && n.scene != null && !pointerLocked)
			bOver2DOverlay = n.scene.isCoordOver2DOverlayNode(this.CursorControl.getMouseX(), this.CursorControl.getMouseY(), true) != null;

		if (this.moveByMouseDown) {
			// this is inconsistent, removed in 2.5.4 temporarily, but it simply feels better
			RotateSpeedFactX *= 3.0;
			RotateSpeedFactY *= 3.0;
		}

		if (!bOver2DOverlay) {
			if (pointerLocked) {
				ydiff = this.CursorControl.getMouseMoveY();
			}

			else if (this.moveByMouseMove) {
				var frameHeight = this.CursorControl.getRenderer().getHeight();
				var mousey = this.CursorControl.getMouseY();
				//if (frameHeight > 0 && mousey > 0)
				//	ydiff = ((mousey - (frameHeight / 2))  / frameHeight) * 100.0;
				if (frameHeight > 0 && mousey > 0 && this.CursorControl.isMouseOverCanvas()) {
					ydiff = Math.sin((mousey - (frameHeight / 2)) / frameHeight) * 100.0 * 0.5;
				}
			}

			else if (this.moveByMouseDown || this.moveByPanoDrag) {
				if (this.CursorControl.isMouseDown()) {
					// this works nice, but not for touch controls
					//ydiff = this.CursorControl.getMouseY() - this.CursorControl.getMouseDownY();
					//if (ydiff != 0)
					//	this.CursorControl.LastCameraDragTime = now;
					var my = this.CursorControl.getMouseY();
					ydiff = this.LastMouseDownLookY == -1 ? 0 : (my - this.LastMouseDownLookY);
					if (ydiff != 0)
						this.CursorControl.LastCameraDragTime = now;

					this.LastMouseDownLookY = my;
				}

				else {
					this.LastMouseDownLookY = -1;
				}
			}
		}

		ydiff += this.getAdditionalYLookDiff();

		var lookTimeDiff = timeDiff;
		if (lookTimeDiff > 100) lookTimeDiff = 100; // make jumps in frame not look completely away

		if (ydiff > maxdiff) ydiff = maxdiff;
		if (ydiff < -maxdiff) ydiff = -maxdiff;
		this.relativeRotationX += ydiff * (lookTimeDiff * (this.RotateSpeed * RotateSpeedFactY));

		if (this.relativeRotationX < -this.MaxVerticalAngle)
			this.relativeRotationX = -this.MaxVerticalAngle;
		if (this.relativeRotationX > this.MaxVerticalAngle)
			this.relativeRotationX = this.MaxVerticalAngle;

		// move lookat target left / right
		var xdiff = 0;

		if (!bOver2DOverlay) {
			if (pointerLocked) {
				xdiff = this.CursorControl.getMouseMoveX();
			}

			else if (this.moveByMouseMove) {
				var frameWidth = this.CursorControl.getRenderer().getWidth();
				var mousex = this.CursorControl.getMouseX();

				//if (frameWidth > 0 && mousex > 0)
				//	xdiff = ((mousex - (frameWidth / 2)) / frameWidth) * 100.0;
				if (frameWidth > 0 && mousex > 0 && this.CursorControl.isMouseOverCanvas()) {
					xdiff = Math.sin((mousex - (frameWidth / 2)) / frameWidth) * 100.0 * 0.5;
				}
			}

			else if (this.moveByMouseDown || this.moveByPanoDrag) {
				if (this.CursorControl.isMouseDown()) {
					// this works nice, but not for touch controls
					// xdiff = (this.CursorControl.getMouseX() - this.CursorControl.getMouseDownX());
					// if (xdiff != 0)
					//	this.CursorControl.LastCameraDragTime = now;
					// so do it like this now:
					var mx = this.CursorControl.getMouseX();
					xdiff = this.LastMouseDownLookX == -1 ? 0 : (mx - this.LastMouseDownLookX);
					if (xdiff != 0)
						this.CursorControl.LastCameraDragTime = now;

					this.LastMouseDownLookX = mx;
				}

				else {
					this.LastMouseDownLookX = -1;
				}
			}
		}

		xdiff += this.getAdditionalXLookDiff();

		if (xdiff > maxdiff) xdiff = maxdiff;
		if (xdiff < -maxdiff) xdiff = -maxdiff;
		this.relativeRotationY += xdiff * (lookTimeDiff * (this.RotateSpeed * RotateSpeedFactX));

		if (pointerLocked || this.moveByMouseDown || this.moveByPanoDrag)
			this.CursorControl.setMouseDownWhereMouseIsNow();

		// jump
		if (this.MayMove) {
			if (this.jumpKeyDown) {
				if (this.LastTimeJumpKeyWasUp) {
					var a = n.getAnimatorOfType('collisionresponse');
					if (a && a instanceof AnimatorCollisionResponse && !a.isFalling()) {
						this.LastTimeJumpKeyWasUp = false;
						a.jump(this.JumpSpeed);
					}
				}
			}

			else
				this.LastTimeJumpKeyWasUp = true;
		}

		// finally set target
		this.Camera.setTarget(this.Camera.Pos.add(target));

		return false;
	}

	/**
	 * @public
	 */
	onMouseDown(event) {
		//super.onMouseDown(event);
		Animator.prototype.onMouseDown.call(this, event);

		if (this.moveByMouseMove && this.CursorControl.pointerLockForFPSCameras && !this.CursorControl.isInPointerLockMode())
			this.CursorControl.requestPointerLock();
	}

	/**
	 * @public
	 */
	onMouseWheel(delta) {
		/*this.targetZoomValue += delta * this.zoomSpeed;

		 if (this.targetZoomValue < this.minZoom)
			this.targetZoomValue = this.minZoom;

		 if (this.targetZoomValue > this.maxZoom)
			this.targetZoomValue = this.maxZoom;*/
	}

	/**
	 * @public
	 */
	onMouseUp(event) {
		//super.onMouseUp(event);
		Animator.prototype.onMouseUp.call(this, event);
	}

	/**
	 * @public
	 */
	onMouseMove(event) {
		//super.onMouseMove(event);
		Animator.prototype.onMouseMove.call(this, event);
	}

	/**
	 * @public
	 */
	setKeyBool(down, code) {
		if (code)
			code = code.toLowerCase();
		if (code == "a" || code == "left" || code == "arrowleft") {
			this.leftKeyDown = down;

			// fix chrome key down problem (key down sometimes doesn't arrive)
			if (down) this.rightKeyDown = false;
			return true;
		}

		if (code == "d" || code == "right" || code == "arrowright") {
			this.rightKeyDown = down;

			// fix chrome key down problem (key down sometimes doesn't arrive)
			if (down) this.leftKeyDown = false;
			return true;
		}

		if (code == "w" || code == "up" || code == "arrowup") {
			this.upKeyDown = down;

			// fix chrome key down problem (key down sometimes doesn't arrive)
			if (down) this.downKeyDown = false;
			return true;
		}

		if (code == "s" || code == "down" || code == "arrowdown") {
			this.downKeyDown = down;

			// fix chrome key down problem (key down sometimes doesn't arrive)
			if (down) this.upKeyDown = false;
			return true;
		}

		if (code == "space" || code == " ") {
			// jump key
			this.jumpKeyDown = down;
			return true;
		}

		return false;
	}

	/**
	 * @public
	 */
	onKeyDown(event) {
		return this.setKeyBool(true, event.key);
	}

	/**
	 * @public
	 */
	onKeyUp(event) {
		return this.setKeyBool(false, event.key);
	}

	/**
	 * @public
	 * for adding force to look up or down
	 */
	getAdditionalXLookDiff() {
		return 0;
	}

	/**
	 * @public
	 * for adding force to look up or down
	 */
	getAdditionalYLookDiff() {
		return 0;
	}

	/**
	 * @public
	 * for adding force to look left or right
	 */
	getAdditionalZoomDiff() {
		return 0;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////
// CopperCube Variable
// not really an animator, but needed only for coppercube
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * @public
 * Array containing instances of CL3D.CopperCubeVariable. A container for holding coppercube variables, which
 * can also be set and changed using the Actions in the editor.
 */
const CopperCubeVariables = new Array();

/**
 * Interface class for accessing CopperCube variables, which can be set and changed using the Actions and
 * Behaviors in the CopperCube editor. Use the static function CL3D.CopperCubeVariable.getVariable to get an
 * instance of a variable.
 * @constructor
 * @class Interface class for accessing CopperCube variables
 * @public
 */
class CopperCubeVariable {
    constructor() {
        this.Name = '';
        this.StringValue = '';
        this.ActiveValueType = 0; // 0=string, 1=int, 2=float
        this.IntValue = 0;
        this.FloatValue = 0.0;
    }
   
    /**
     * Static function, returns the instance of an existing CopperCube variable or creates one if not existing.
     * @public
     * @param {String} n Name of the variable
     * @param {Boolean} createIfNotExisting if the variable is not found, it will be created if this is set to true.
     * @param {CL3D.Scene} scene The current scene. This parameter is optional, this can be 0. It is used for getting runtime variables such as #player1.health
     * @returns {CL3D.CopperCubeVariable} Returns instance of the variable or null if not found
     */
    static getVariable(n, createIfNotExisting, scene) {
        if (n == null)
            return null;

        var toFind = n.toLowerCase();
        var ar = CopperCubeVariables;

        for (var i = 0; i < ar.length; ++i) {
            var v = ar[i];
            if (v != null && v.getName().toLowerCase() == toFind)
                return v;
        }

        // for temporary virtual variables like "#player.health", create one now
        var tmpvar = CopperCubeVariable.createTemporaryVariableIfPossible(n, scene);
        if (tmpvar)
            return tmpvar;

        // not found, so create new
        if (createIfNotExisting == true) {
            var nv = new CopperCubeVariable();
            nv.setName(n);
            ar.push(nv);

            return nv;
        }

        return null;
    }
        
    /**
     * @public
     * Creates a coppercube variable of the type "#player.health" with the correct expected content
     */
    static createTemporaryVariableIfPossible(varname, scene) {
        var ret = CopperCubeVariable.getSceneNodeAndAttributeNameFromTemporaryVariableName(varname, scene);
        if (ret == null)
            return null;

        var nv = new CopperCubeVariable();
        nv.setName(varname);
        nv.setValueAsInt(0);
        var node = ret.node;

        if (ret.attrname == 'health' && node != null) {
            var gameai = node.getAnimatorOfType('gameai');
            if (gameai != null)
                nv.setValueAsInt(gameai.Health);
        }

        else if (ret.attrname == 'movementspeed' && node != null) {
            var an = node.getAnimatorOfType('gameai');
            var an2 = node.getAnimatorOfType('keyboardcontrolled');
            var an3 = node.getAnimatorOfType('camerafps');

            if (an3)
                nv.setValueAsFloat(an3.MoveSpeed);

            else if (an2)
                nv.setValueAsFloat(an2.MoveSpeed);

            else if (an)
                nv.setValueAsFloat(an.MovementSpeed);
        }

        else if (ret.attrname == 'damage' && node != null) {
            var theaction = node.findActionOfType('Shoot');
            if (theaction)
                nv.setValueAsInt(theaction.Damage);
        }

        else if (ret.attrname == 'colsmalldistance' && node != null) {
            var acr = node.getAnimatorOfType('collisionresponse');
            if (acr != null)
                nv.setValueAsFloat(acr.SlidingSpeed);
        }

        else if (ret.attrname == 'soundvolume') {
            nv.setValueAsFloat(gSoundManager.getGlobalVolume() * 100.0);
        }

        return nv;
    }
        
    /**
     * @public
     * Saves the content of a coppercube variable of the type "#player.health" back into the correct scene node
     */
    static saveContentOfPotentialTemporaryVariableIntoSource(thevar, scene) {
        var ret = CopperCubeVariable.getSceneNodeAndAttributeNameFromTemporaryVariableName(thevar.Name, scene);
        if (ret == null)
            return;

        var node = ret.node;

        if (ret.attrname == 'health' && node != null) {
            var gameai = node.getAnimatorOfType('gameai');
            if (gameai != null) {
                var healthBefore = gameai.Health;
                var healthNew = thevar.getValueAsInt();
                var damage = healthBefore - healthNew;

                if (damage > 0)
                    gameai.OnHit(damage, node);

                else
                    gameai.Health = healthNew;
            }
        }

        else if (ret.attrname == 'movementspeed' && node != null) {
            var an = node.getAnimatorOfType('gameai');
            var an2 = node.getAnimatorOfType('keyboardcontrolled');
            var an3 = node.getAnimatorOfType('camerafps');

            if (an3)
                an3.MoveSpeed = thevar.getValueAsFloat();

            else if (an2)
                an2.MoveSpeed = thevar.getValueAsFloat();

            else if (an)
                an.MovementSpeed = thevar.getValueAsFloat();
        }

        else if (ret.attrname == 'damage' && node != null) {
            var theaction = node.findActionOfType('Shoot');
            if (theaction)
                theaction.Damage = thevar.getValueAsInt();
        }

        else if (ret.attrname == 'damage' && node != null) {
            var theaction = node.findActionOfType('Shoot');
            if (theaction)
                theaction.Damage = thevar.getValueAsInt();
        }

        else if (ret.attrname == 'colsmalldistance' && node != null) {
            var acr = node.getAnimatorOfType('collisionresponse');
            if (acr != null) {
                acr.SlidingSpeed = thevar.getValueAsInt();
                acr.UseFixedSlidingSpeed = true;
            }
        }

        else if (ret.attrname == 'soundvolume') {
            gSoundManager.setGlobalVolume(thevar.getValueAsFloat() / 100.0);
        }
    }
        
    /**
     * @public
     * Parses the variable name of the type "#player.health" and returns attribute name and scene node in the scene
     */
    static getSceneNodeAndAttributeNameFromTemporaryVariableName(varname, scene) {
        if (varname.length == 0 || scene == null)
            return null;

        // temporary virtual variables have the layout like "#player.health"
        if (varname[0] != '#')
            return null;

        var pos = varname.indexOf('.');
        if (pos == -1)
            return null;

        // get attibute name
        var attrname = varname.substr(pos + 1, varname.length - pos);
        if (attrname.length == 0)
            return null;

        // find scene node	
        var sceneNodeName = varname.substr(1, pos - 1);
        var node = null;

        if (sceneNodeName == 'system') ;

        else {
            node = scene.getSceneNodeFromName(sceneNodeName);

            if (node == null)
                return null;
        }

        // return
        var retobj = {}; // used for passing scene node and attribute name back if available
        retobj.node = node;
        retobj.attrname = attrname;
        return retobj;
    }
        
    /**
     * Returns if this variable is a string
     * @public
     */
    isString() {
        return this.ActiveValueType == 0;
    }
        
    /**
     * Returns if this variable is a float value
     * @public
     */
    isFloat() {
        return this.ActiveValueType == 2;
    }
        
    /**
     * Returns if this variable is an int value
     * @public
     */
    isInt() {
        return this.ActiveValueType == 1;
    }
        
    /**
     * Returns the name of the variable
     * @public
     */
    getName() {
        return this.Name;
    }
        
    /**
     * Sets the name of the variable
     * @public
     * @param n Name
     */
    setName(n) {
        this.Name = n;
    }
        
    /**
     * @public
     */
    setAsCopy(copyFrom) {
        if (copyFrom == null)
            return;

        this.ActiveValueType = copyFrom.ActiveValueType;

        this.StringValue = copyFrom.StringValue;
        this.IntValue = copyFrom.IntValue;
        this.FloatValue = copyFrom.FloatValue;
    }
        
    /**
     * Returns the value of the variable as string
     * @public
     */
    getValueAsString() {
        switch (this.ActiveValueType) {
            case 1: // int
                return String(this.IntValue);
            case 2: // float
                if ((this.FloatValue % 1) == 0.0)
                    return String(this.FloatValue);

                else
                    return this.FloatValue.toFixed(6);
        }

        return this.StringValue;
    }
        
    /**
     * Returns the value of the variable as int
     * @public
     */
    getValueAsInt() {
        switch (this.ActiveValueType) {
            case 0: // string
                return Math.floor(Number(this.StringValue));
            case 1: // int
                return this.IntValue;
            case 2: // float
                return this.FloatValue;
        }

        return 0;
    }
        
    /**
     * Returns the value of the variable as float
     * @public
     */
    getValueAsFloat() {
        switch (this.ActiveValueType) {
            case 0: // string
                return Number(this.StringValue);
            case 1: // int
                return this.IntValue;
            case 2: // float
                return this.FloatValue;
        }

        return 0;
    }
        
    /**
     * Sets the value of the variable as string
     * @public
     * @param v the new value
     */
    setValueAsString(v) {
        this.ActiveValueType = 0;
        this.StringValue = v;
    }
        
    /**
     * Sets the value of the variable as int
     * @public
     * @param v the new value
     */
    setValueAsInt(v) {
        this.ActiveValueType = 1;
        this.IntValue = v;
    }
        
    /**
     * Sets the value of the variable as float
     * @public
     * @param v the new value
     */
    setValueAsFloat(v) {
        this.ActiveValueType = 2;
        this.FloatValue = v;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// Keyboard controlled animator
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * @constructor
 * @class
 * @public
 * @extends CL3D.Animator
 */
class AnimatorKeyboardControlled extends Animator {
    constructor(scene, engine) {
        super();

        this.lastAnimTime = 0;
        this.SMGr = scene;

        this.MoveSpeed = 0;
        this.RunSpeed = 0;
        this.RotateSpeed = 0;
        this.JumpSpeed = 0;
        this.PauseAfterJump = false;

        this.UseAcceleration = false;
        this.AccelerationSpeed = 0;
        this.DecelerationSpeed = 0;

        this.FollowSmoothingSpeed = 15;
        this.AdditionalRotationForLooking = new Vect3d();

        this.StandAnimation = "";
        this.WalkAnimation = "";
        this.JumpAnimation = "";
        this.RunAnimation = "";

        this.LastAnimationTime = CLTimer.getTime();
        this.LastJumpTime = this.LastAnimationTime;
        this.WasMovingLastFrame = false;
        this.ShiftIsDown = false;

        this.Registered = false;

        this.leftKeyDown = false;
        this.rightKeyDown = false;
        this.upKeyDown = false;
        this.downKeyDown = false;
        this.jumpKeyDown = false;

        this.AcceleratedSpeed = 0;
        this.AccelerationIsForward = false;

        this.firstUpdate = true;
        this.DisableWithoutActiveCamera = false;

        this.Engine = engine;
        engine.registerAnimatorForKeyUp(this);
        engine.registerAnimatorForKeyDown(this);
    }

    /**
     * Returns the type of the animator.
     * For the AnimatorTimer, this will return 'keyboardcontrolled'.
     * @public
     */
    getType() {
        return 'keyboardcontrolled';
    }

    /**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
     */
    createClone(node, newManager, oldNodeId, newNodeId) {
        var a = new AnimatorKeyboardControlled(this.SMGr, this.Engine);
        a.MoveSpeed = this.MoveSpeed;
        a.RunSpeed = this.RunSpeed;
        a.RotateSpeed = this.RotateSpeed;
        a.JumpSpeed = this.JumpSpeed;
        a.FollowSmoothingSpeed = this.FollowSmoothingSpeed;
        a.AdditionalRotationForLooking = this.AdditionalRotationForLooking ? this.AdditionalRotationForLooking.clone() : null;
        a.StandAnimation = this.StandAnimation;
        a.WalkAnimation = this.WalkAnimation;
        a.JumpAnimation = this.JumpAnimation;
        a.RunAnimation = this.RunAnimation;
        a.UseAcceleration = this.UseAcceleration;
        a.AccelerationSpeed = this.AccelerationSpeed;
        a.DecelerationSpeed = this.DecelerationSpeed;
        a.DisableWithoutActiveCamera = this.DisableWithoutActiveCamera;

        return a;
    }

    /**
     * @public
     */
    setKeyBool(down, code) {
        if (code)
            code = code.toLowerCase();
        if (code == "a" || code == "left" || code == "arrowleft") {
            this.leftKeyDown = down;

            // fix chrome key down problem (key down sometimes doesn't arrive)
            if (down) this.rightKeyDown = false;
            return true;
        }

        if (code == "d" || code == "right" || code == "arrowright") {
            this.rightKeyDown = down;

            // fix chrome key down problem (key down sometimes doesn't arrive)
            if (down) this.leftKeyDown = false;
            return true;
        }

        if (code == "w" || code == "up" || code == "arrowup") {
            this.upKeyDown = down;

            // fix chrome key down problem (key down sometimes doesn't arrive)
            if (down) this.downKeyDown = false;
            return true;
        }

        if (code == "s" || code == "down" || code == "arrowdown") {
            this.downKeyDown = down;

            // fix chrome key down problem (key down sometimes doesn't arrive)
            if (down) this.upKeyDown = false;
            return true;
        }

        if (code == "space" || code == " ") {
            // jump key
            this.jumpKeyDown = down;
            return true;
        }

        return false;
    }

    /**
     * @public
     */
    onKeyDown(event) {
        this.ShiftIsDown = (event.shiftKey == 1);
        return this.setKeyBool(true, event.key);
    }

    /**
     * @public
     */
    onKeyUp(event) {
        this.ShiftIsDown = (event.shiftKey == 1);
        return this.setKeyBool(false, event.key);
    }

    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.SceneNode} node The Scene node which needs to be animated this frame.
     * @param {Number} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(node, timeMs) {
        var timeDiff = timeMs - this.lastAnimTime;
        if (timeDiff > 250)
            timeDiff = 250;

        this.lastAnimTime = timeMs;

        var bChanged = false;

        this.LastAnimationTime = timeMs;

        // disable if user wants disabled without active camera following the object we are controlling
        if (this.DisableWithoutActiveCamera) {
            var cam = node.scene.getActiveCamera();
            if (cam != null) {
                var an = cam.getAnimatorOfType('3rdpersoncamera');
                if (an != null) {
                    if (!(an.NodeToFollow === node))
                        return false;
                }

                else
                    return false;
            }
        }

        // Update rotation
        var currentRot = node.Rot;

        if (this.leftKeyDown) {
            currentRot.Y -= timeDiff * this.RotateSpeed * 0.001;
            bChanged = true;
        }

        if (this.rightKeyDown) {
            currentRot.Y += timeDiff * this.RotateSpeed * 0.001;
            bChanged = true;
        }

        // move forward/backward
        node.Pos;

        var matrot = new Matrix4();
        matrot.setRotationDegrees(currentRot);
        var directionForward = new Vect3d(0, 0, 1);

        var matrot2 = new Matrix4();
        matrot2.setRotationDegrees(this.AdditionalRotationForLooking);
        matrot = matrot.multiply(matrot2);

        matrot.rotateVect(directionForward);

        var bRun = this.ShiftIsDown;
        var speed = (bRun ? this.RunSpeed : this.MoveSpeed) * timeDiff;
        var origSpeed = 0;

        var bBackward = this.downKeyDown;
        var bForward = this.upKeyDown;

        if (this.UseAcceleration && timeDiff) {
            if (bForward || bBackward) {
                // accelerate normally
                if (this.AccelerationIsForward != bForward) {
                    // user change direction.
                    if (this.DecelerationSpeed == 0)
                        this.AcceleratedSpeed *= -1.0; //  We need to invert the force so he has to work against it

                    else
                        this.AcceleratedSpeed = 0.0; // no deceleration, stop immediately
                }

                this.AccelerationIsForward = !bBackward;

                origSpeed = speed / timeDiff;
                this.AcceleratedSpeed += (this.AccelerationSpeed) * origSpeed * (timeDiff / 1000.0);
                if (this.AcceleratedSpeed > origSpeed) this.AcceleratedSpeed = origSpeed;

                speed = this.AcceleratedSpeed * timeDiff;
            }

            else {
                // no key pressed, decellerate
                if (this.DecelerationSpeed == 0.0)
                    this.AcceleratedSpeed = 0;

                else {
                    origSpeed = speed / Number(timeDiff);
                    this.AcceleratedSpeed -= (this.DecelerationSpeed) * origSpeed * (timeDiff / 1000.0);
                    if (this.AcceleratedSpeed < 0) this.AcceleratedSpeed = 0;
                    speed = this.AcceleratedSpeed * timeDiff;
                }
            }
        }

        directionForward.setLength(speed);

        if (bForward || bBackward || (this.UseAcceleration && this.AcceleratedSpeed != 0)) {
            var moveVect = directionForward.clone();

            if (bBackward || (!(bForward || bBackward) && !this.AccelerationIsForward))
                moveVect.multiplyThisWithScal(-1.0);

            node.Pos.addToThis(moveVect);
            bChanged = true;
            this.WasMovingLastFrame = true;
        }

        if (bForward || bBackward) {
            this.setAnimation(node, bRun ? 3 : 1, bBackward);

            this.WasMovingLastFrame = true;
            bChanged = true;
        }

        else {
            // no key pressed
            // stand animation, only if not falling
            var bFalling = false;

            var a = node.getAnimatorOfType('collisionresponse');
            if (a && a instanceof AnimatorCollisionResponse)
                bFalling = a.isFalling();

            if (!bFalling && (this.hasAnimationType(node, 1) || this.hasAnimationType(node, 3) || this.hasAnimationType(node, 2)))
                this.setAnimation(node, 0, false);
        }

        // jump
        // For jumping, we find the collision response animator attached to our camera
        // and if it's not falling, we tell it to jump.
        if (this.jumpKeyDown) {
            var b = node.getAnimatorOfType('collisionresponse');
            if (b && b instanceof AnimatorCollisionResponse && !b.isFalling()) {
                var minJumpTime = 0;
                if (this.SMGr && this.SMGr.Gravity != 0)
                    minJumpTime = Math.floor((this.JumpSpeed * (1.0 / this.SMGr.Gravity)) * 2000);

                if (!this.PauseAfterJump ||
                    (this.PauseAfterJump && (timeMs - this.LastJumpTime) > minJumpTime)) {
                    b.jump(this.JumpSpeed);
                    this.setAnimation(node, 2, false);

                    this.LastJumpTime = timeMs;

                    bChanged = true;
                }
            }
        }

        return bChanged;
    }

    /**
     * @public
     */
    getAnimationNameFromType(n) {
        switch (n) {
            case 0: return this.StandAnimation;
            case 1: return this.WalkAnimation;
            case 2: return this.JumpAnimation;
            case 3: return this.RunAnimation;
        }

        return "";
    }

    /**
     * @public
     */
    hasAnimationType(node, animationType) {
        return this.setAnimation(node, animationType, false, true);
    }

    /**
     * @public
     */
    setAnimation(node, animationType, breverse, testIfIsSetOnly) {
        if (!node || node.getType() != 'animatedmesh')
            return false;

        // find mesh and node type
        var animatedMesh = node;

        var skinnedmesh = animatedMesh.Mesh; // as SkinnedMesh;
        if (!skinnedmesh)
            return false;

        // find range for animation
        var range = skinnedmesh.getNamedAnimationRangeByName(this.getAnimationNameFromType(animationType));

        if (range) {
            var wantedFPS = 1.0 * range.FPS;
            if (breverse)
                wantedFPS *= -1.0;

            if (testIfIsSetOnly) {
                return animatedMesh.EndFrame == range.End &&
                    animatedMesh.StartFrame == range.Begin;
            }

            if (!(animatedMesh.EndFrame == range.End &&
                animatedMesh.StartFrame == range.Begin &&
                equals(animatedMesh.FramesPerSecond, wantedFPS))) {
                animatedMesh.setFrameLoop(range.Begin, range.End);
                if (wantedFPS)
                    animatedMesh.setAnimationSpeed(wantedFPS);

                animatedMesh.setLoopMode(animationType == 0 || animationType == 1 || animationType == 3);
            }

            return false;
        }

        else {
            // note: temporary bug fix. The flash animation player is
            // not able to stop an animation at (0,0), so we stop at (1,1)
            if (!testIfIsSetOnly) {
                animatedMesh.setFrameLoop(1, 1);
                animatedMesh.setLoopMode(false);
            }
        }

        return false;
    }
}

// ----------------------------------------------------------------------------------------------
// Animator for moving cursor position of Mobile2DInputSceneNode
// ----------------------------------------------------------------------------------------------
// moved to coppercubeprivate.js since it is needing the animator definition first


/**
* @constructor
* @extends CL3D.Animator
* @class  Scene node animator which animated a mobile input 2d node
* @public
*/
class AnimatorMobileInput extends Animator {
    constructor(engine, scene, obj) {
        super();

        this.SMGr = scene;
        this.Obj = obj;
        this.engine = engine;
        this.MouseDown = false;
        scene.registerSceneNodeAnimatorForEvents(this);

        this.KeyDown = new Array();
        for (var i = 0; i < 255; ++i)
            this.KeyDown.push(false);

        this.CoordArray = new Array();
        this.CoordArray.push(new Vect2d(-1, 0)); // left
        this.CoordArray.push(new Vect2d(0, -1)); // up
        this.CoordArray.push(new Vect2d(1, 0)); // right
        this.CoordArray.push(new Vect2d(0, 1)); // down
    }

    /**
     * Returns the type of the animator.
     * For the AnimatorOnClick, this will return 'mobileinput'.
     * @public
     */
    getType() {
        return 'mobileinput';
    }

    /**
     * @public
     */
    animateNode(n, timeMs) {
        var ret = false;

        if (this.Obj.InputMode == 1) // specific key
        {
            this.postKey(this.MouseDown && this.Obj.MouseOverButton, this.Obj.KeyCode);
        }

        else {
            // cursor key mode
            var len = Math.sqrt(this.Obj.CursorPosX * this.Obj.CursorPosX + this.Obj.CursorPosY * this.Obj.CursorPosY);
            var minLen = 0.3;

            if (len < minLen || !this.MouseDown) {
                if (!this.MouseDown) {
                    ret = (this.Obj.CursorPosX != 0 && this.Obj.CursorPosY != 0);
                    this.Obj.CursorPosX = 0;
                    this.Obj.CursorPosY = 0;
                }

                this.postKey(false, 37);
                this.postKey(false, 38);
                this.postKey(false, 39);
                this.postKey(false, 40);
            }

            else {
                for (var i = 0; i < 4; ++i) {
                    var distanceX = this.CoordArray[i].X - this.Obj.CursorPosX;
                    var distanceY = this.CoordArray[i].Y - this.Obj.CursorPosY;

                    var isPointInside = Math.sqrt(distanceX * distanceX + distanceY * distanceY) < 1;
                    this.postKey(isPointInside, 37 + i);
                }
            }
        }

        return ret;
    }

    /**
     * @public
     */
    postKey(down, key) {
        if (this.KeyDown[key] == down)
            return;

        this.KeyDown[key] = down;

        var e = { keyCode: key};

        if (down)
            this.engine.handleKeyDown(e);

        else
            this.engine.handleKeyUp(e);
    }

    /**
     * @public
     */
    onMouseUp(event) {
        this.MouseDown = false;
    }

    /**
     * @public
     */
    onMouseDown(event) {
        this.MouseDown = true;
    }
    
    /**
     * @public
     */
    onMouseMove(event) {
        if (this.MouseDown && this.Obj.MouseOverButton &&
            this.Obj.RealWidth != 0 && this.Obj.RealHeight != 0) {
            var x = this.engine.getMousePosXFromEvent(event) - this.Obj.RealPosX;
            var y = this.engine.getMousePosYFromEvent(event) - this.Obj.RealPosY;

            this.Obj.CursorPosX = x / this.Obj.RealWidth;
            this.Obj.CursorPosY = y / this.Obj.RealHeight;

            this.Obj.CursorPosX = clamp(this.Obj.CursorPosX, 0.0, 1.0);
            this.Obj.CursorPosY = clamp(this.Obj.CursorPosY, 0.0, 1.0);

            // move coordinates from 0..1 to -1..1 range
            this.Obj.CursorPosX = (this.Obj.CursorPosX * 2.0) - 1.0;
            this.Obj.CursorPosY = (this.Obj.CursorPosY * 2.0) - 1.0;
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// Keypress animator
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * @constructor
 * @class
 * @public
 * @extends CL3D.Animator
 */
class AnimatorOnKeyPress extends Animator{
    /**
     * @type {number}
     */
    KeyPressType;
    /**
     * @type {number}
     */
    KeyCode;

    constructor(scene, engine) {
        super();

        this.SMGr = scene;
        this.Engine = engine;
        this.TheActionHandler = null;
        this.TickEverySeconds = 0;
        this.Object = null;
        this.LastTimeDoneSomething = false;

        engine.registerAnimatorForKeyUp(this);
        engine.registerAnimatorForKeyDown(this);

        scene.registerSceneNodeAnimatorForEvents(this);
    }
    
    /**
     * Returns the type of the animator.
     * For the AnimatorOnKeyPress, this will return 'keypress'.
     * @public
     */
    getType() {
        return 'keypress';
    }
    
    /**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
     */
    createClone(node, newManager, oldNodeId, newNodeId) {
        var a = new AnimatorOnKeyPress(this.SMGr, this.Engine);
        a.KeyPressType = this.KeyPressType;
        //a.IfCameraOnlyDoIfActive = this.IfCameraOnlyDoIfActive;
        a.KeyCode = this.KeyCode;
        a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;
        return a;
    }
    
    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
     * @param {Number} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(n, timeMs) {
        this.Object = n;
        var done = this.LastTimeDoneSomething;
        this.LastTimeDoneSomething = false;
        return done;
    }
    
    /**
     * @public
     */
    onKeyDown(evt) {
        if (this.KeyPressType == 0 && evt.keyCode == this.KeyCode) {
            this.directlyRunKeypressEvent();
            return true;
        }

        return false;
    }
    
    /**
     * @public
     */
    onKeyUp(evt) {
        if (this.KeyPressType == 1 && evt.keyCode == this.KeyCode) {
            this.directlyRunKeypressEvent();
            return true;
        }

        return false;
    }
    
    /**
     * @public
     */
    onMouseUp(evt) {
        if (this.KeyPressType == 1) {
            if (evt.button > 1 && this.KeyCode == 0x2) // right click
                this.directlyRunKeypressEvent();

            else if (evt.button <= 1 && this.KeyCode == 0x1) // left click
                this.directlyRunKeypressEvent();
        }
    }
    
    /**
     * @public
     */
    onMouseDown(evt) {
        if (this.KeyPressType == 0) {
            if (evt.button > 1 && this.KeyCode == 0x2) // right click
                this.directlyRunKeypressEvent();

            else if (evt.button <= 1 && this.KeyCode == 0x1) // left click
                this.directlyRunKeypressEvent();
        }
    }
    
    /**
     * @public
     */
    findActionByType(type) {
        if (this.TheActionHandler)
            return this.TheActionHandler.findAction(type);

        return null;
    }
    
    /**
     * @public
     */
    directlyRunKeypressEvent(type) {
        if (this.Object &&
            this.Object.scene === this.SMGr &&
            this.Object.isActuallyVisible() &&
            this.Engine.getScene() === this.Object.scene) {
            if (this.Object.Parent == null && // deleted
                !(this.Object.Type == -1)) // root scene node
            {
                // object seems to be deleted 
                this.Object = null;
                return;
            }

            this.LastTimeDoneSomething = true;

            if (this.TheActionHandler)
                this.TheActionHandler.execute(this.Object);

            this.SMGr.forceRedrawNextFrame(); // the animate might not be recalled after this element has been made invisible in this invokeAction()			
            return true;
        }

        return null;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// Animator3rdPersonCamera
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * @constructor
 * @class
 * @public
 * @extends CL3D.Animator
 */
class Animator3rdPersonCamera extends Animator {
    constructor() {
        super();

        this.lastAnimTime = 0;

        this.SceneNodeIDToFollow = -1;
        this.FollowSmoothingSpeed = 15;
        this.AdditionalRotationForLooking = new Vect3d();
        this.FollowMode = 0;
        this.TargetHeight = 0;
        this.CollidesWithWorld = false;
        this.World = null;

        // runtime variables
        this.LastAnimationTime = 0.0;
        this.InitialDeltaToObject = new Vect3d();
        this.DeltaToCenterOfFollowObject = new Vect3d();
        this.NodeToFollow = null;
        this.TriedToLinkWithNode = false;

        this.firstUpdate = true;
    }

    /**
     * Returns the type of the animator.
     * For the AnimatorTimer, this will return '3rdpersoncamera'.
     * @public
     */
    getType() {
        return '3rdpersoncamera';
    }

    /**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
     */
    createClone(node, newManager, oldNodeId, newNodeId) {
        var a = new Animator3rdPersonCamera();
        a.SceneNodeIDToFollow = this.SceneNodeIDToFollow;
        a.FollowSmoothingSpeed = this.FollowSmoothingSpeed;
        a.AdditionalRotationForLooking = this.AdditionalRotationForLooking.clone();
        a.FollowMode = this.FollowMode;
        a.TargetHeight = this.TargetHeight;
        a.CollidesWithWorld = this.CollidesWithWorld;
        a.World = this.World;

        return a;
    }

    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.CameraSceneNode} node The Scene node which needs to be animated this frame.
     * @param {Number} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(node, timeMs) {
        var timeDiff = timeMs - this.lastAnimTime;
        if (timeDiff > 250)
            timeDiff = 250;
        this.lastAnimTime = timeMs;

        var bChanged = false;

        if (node == null)
            return false;

        var camera = node;

        this.linkWithNode(node.scene);

        if (!this.NodeToFollow)
            return false;

        var bChanged = false;

        var oldTarget = camera.Target.clone();

        camera.Target = this.NodeToFollow.getAbsolutePosition();
        camera.Target.addToThis(this.DeltaToCenterOfFollowObject);
        camera.Target.Y += this.TargetHeight;

        if (!camera.Target.equals(oldTarget))
            bChanged = true;

        if (this.firstUpdate) {
            this.NodeToFollow.updateAbsolutePosition();
            camera.updateAbsolutePosition();

            this.DeltaToCenterOfFollowObject = this.NodeToFollow.getBoundingBox().getExtent();
            this.DeltaToCenterOfFollowObject.Y = this.DeltaToCenterOfFollowObject.Y / 2;
            this.DeltaToCenterOfFollowObject.X = 0;
            this.DeltaToCenterOfFollowObject.Z = 0;

            this.lastAnimTime = timeMs;
            this.firstUpdate = false;
        }

        if (!(camera.scene.getActiveCamera() === camera))
            return false;

        if (this.InitialDeltaToObject.equalsZero()) {
            this.InitialDeltaToObject = this.NodeToFollow.getAbsolutePosition().substract(camera.getAbsolutePosition());

            // this line didn't work with scale
            //this.NodeToFollow.AbsoluteTransformation.inverseRotateVect(this.InitialDeltaToObject);
            // this one does
            var matrotinit = new Matrix4();
            matrotinit.setRotationDegrees(this.NodeToFollow.Rot);
            matrotinit.inverseRotateVect(this.InitialDeltaToObject);
        }

        var currentRot = this.NodeToFollow.Rot;

        var matrot = new Matrix4();
        matrot.setRotationDegrees(currentRot);

        var matrot2 = new Matrix4();
        matrot2.setRotationDegrees(this.AdditionalRotationForLooking);
        matrot = matrot.multiply(matrot2);

        // animate camera position
        var finalpos = camera.Pos.clone();

        switch (this.FollowMode) {
            case 0: //ECFM_FIXED:
                // don't change position
                break;
            case 2: //ECFM_FOLLOW_FIXED:
                {
                    // only add position
                    finalpos = this.NodeToFollow.getAbsolutePosition().substract(this.InitialDeltaToObject);
                }
                break;
            case 1: //ECFM_FOLLOW:
                {
                    // add position and rotation
                    var newdelta = this.InitialDeltaToObject.clone();
                    matrot.rotateVect(newdelta);

                    var desiredPos = this.NodeToFollow.getAbsolutePosition().substract(newdelta);
                    var distanceToDesiredPos = camera.getAbsolutePosition().getDistanceTo(desiredPos);
                    var userSetDefaultCameraDistance = this.InitialDeltaToObject.getLength();

                    var bTooFarAway = distanceToDesiredPos > userSetDefaultCameraDistance * 2.2;

                    if (equals(this.FollowSmoothingSpeed, 0.0) || bTooFarAway) {
                        // smoothing speed is disabled or camera is too far away from the object
                        // directly set position of camera		
                        finalpos = desiredPos;
                    }

                    else {
                        // move camera position smoothly to desired position
                        // the more away the distance is, the faster move toward the new target
                        var distanceToMove = Math.sqrt(distanceToDesiredPos) * (timeDiff / 1000.0) * this.FollowSmoothingSpeed;
                        if (distanceToMove > distanceToDesiredPos)
                            distanceToMove = distanceToDesiredPos;

                        var moveVect = desiredPos.substract(camera.Pos);
                        moveVect.setLength(distanceToMove);
                        moveVect.addToThis(camera.Pos);

                        finalpos = moveVect;
                    }
                }
                break;
        }

        // collide with world
        if (this.CollidesWithWorld &&
            this.World != null &&
            !camera.Pos.equals(finalpos)) {
            this.World.setNodeToIgnore(this.NodeToFollow);

            var ray = new Line3d();

            ray.Start = camera.Target.clone();
            ray.End = finalpos.clone();

            var rayVect = ray.getVector();
            var wantedDistanceToTarget = rayVect.getLength();
            var distanceToNextWall = this.InitialDeltaToObject.getLength() / 10.0;

            rayVect.setLength(distanceToNextWall);
            ray.End.addToThis(rayVect);

            var triangle = new Triangle3d();

            var pos = this.World.getCollisionPointWithLine(ray.Start, ray.End, true, triangle, true);
            if (pos != null) {
                // ensure final collision position is at least distanceToNextWall away from the collision point.
                var collisionVect = pos.substract(ray.Start);
                var collisionVectLen = collisionVect.getLength();
                if (collisionVectLen < distanceToNextWall) collisionVectLen = distanceToNextWall;
                collisionVectLen -= distanceToNextWall;
                if (collisionVectLen > wantedDistanceToTarget) collisionVectLen = wantedDistanceToTarget;

                collisionVect.setLength(collisionVectLen);
                finalpos = ray.Start.add(collisionVect);
            }

            this.World.setNodeToIgnore(null);
        }

        // set final position
        if (!camera.Pos.equals(finalpos)) {
            bChanged = true;
            camera.Pos = finalpos;
        }

        return bChanged;
    }

    /**
     * @public
     */
    linkWithNode(smgr) {
        if (this.TriedToLinkWithNode)
            return;

        if (this.SceneNodeIDToFollow == -1)
            return;

        if (smgr == null)
            return;

        var node = smgr.getSceneNodeFromId(this.SceneNodeIDToFollow);
        if (node && !(node === this.NodeToFollow)) {
            this.NodeToFollow = node;
            this.firstUpdate = true;
        }

        this.TriedToLinkWithNode = true;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// Game AI Animator
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * @constructor
 * @class
 * @public
 * @extends CL3D.Animator
 */
class AnimatorGameAI extends Animator {
    constructor(scene, engine) {
        super();

        // constants for the commands (from coppercube editor):
        // private static const EMT_PLAYER:int = 0;
        // private static const EMT_STAND_STILL:int = 1;
        // private static const EMT_RANDOMLY_PATROL:int = 2;
        // private static const EMT_DO_NOTHING:int = 0;
        // private static const EMT_REACH_POSITION:int = 1;
        // private static const EMT_ATTACK_ITEM:int = 2;
        // private static const EMT_DIE_AND_STOP:int = 3;
        // private static const EAT_STAND:int = 0;
        // private static const EAT_WALK:int = 1;
        // private static const EAT_ATTACK:int = 2;
        // private static const EAT_DIE:int = 3;
        this.AIType = 0;
        this.MovementSpeed = 0;
        this.ActivationRadius = 0;
        this.CanFly = false;
        this.Health = 100;
        this.PatrolWaitTimeMs = 3000;
        this.PathIdToFollow = -1;
        this.Tags = "";
        this.AttacksAIWithTags = "";
        this.PatrolRadius = 100;
        this.RotationSpeedMs = 0;
        this.AdditionalRotationForLooking = new Vect3d();
        this.StandAnimation = "";
        this.WalkAnimation = "";
        this.DieAnimation = "";
        this.AttackAnimation = "";

        this.ActionHandlerOnAttack = null;
        this.ActionHandlerOnActivate = null;
        this.ActionHandlerOnHit = null;
        this.ActionHandlerOnDie = null;

        // runtime data
        this.CurrentCommand = 0;

        this.NextAttackTargetScanTime = 0;
        this.LastPatrolStartTime = 0;

        this.CurrentCommandTargetPos = null;
        this.CurrentCommandStartTime = 0;
        this.CurrentCommandTicksDone = 0;
        this.CurrentCommandExpectedTickCount = 0;
        this.BeginPositionWhenStartingCurrentCommand = null;
        this.HandleCurrentCommandTargetNode = null;
        this.AttackCommandExecuted = false;
        this.Activated = false;
        this.CurrentlyShooting = false; // flag to be queried shoot action
        this.CurrentlyShootingLine = new Line3d(); // data to be queried shoot action
        this.NextPathPointToGoTo = 0;

        this.World = null;
        this.TheObject = null;
        this.TheSceneManager = scene;
        this.LastTime = 0;
        this.StartPositionOfActor = new Vect3d();

        this.NearestSceneNodeFromAIAnimator_NodeOut = null;
        this.NearestSceneNodeFromAIAnimator_maxDistance = 0;

    }

    /**
     * Returns the type of the animator.
     * For the AnimatorGameAI, this will return 'gameai'.
     * @public
     */
    getType() {
        return 'gameai';
    }

    /**
     * @public
     */
    createClone(node, newManager, oldNodeId, newNodeId) {
        var a = new AnimatorGameAI(this.TheSceneManager);
        a.AIType = this.AIType;
        a.MovementSpeed = this.MovementSpeed;
        a.ActivationRadius = this.ActivationRadius;
        a.CanFly = this.CanFly;
        a.Health = this.Health;
        a.Tags = this.Tags;
        a.AttacksAIWithTags = this.AttacksAIWithTags;
        a.PatrolRadius = this.PatrolRadius;
        a.RotationSpeedMs = this.RotationSpeedMs;
        a.PathIdToFollow = this.PathIdToFollow;
        a.PatrolWaitTimeMs = this.PatrolWaitTimeMs;
        a.AdditionalRotationForLooking = this.AdditionalRotationForLooking ? this.AdditionalRotationForLooking.clone() : null;
        a.StandAnimation = this.StandAnimation;
        a.WalkAnimation = this.WalkAnimation;
        a.DieAnimation = this.DieAnimation;
        a.AttackAnimation = this.AttackAnimation;

        a.ActionHandlerOnAttack = this.ActionHandlerOnAttack ? this.ActionHandlerOnAttack.createClone(oldNodeId, newNodeId) : null;
        a.ActionHandlerOnActivate = this.ActionHandlerOnActivate ? this.ActionHandlerOnActivate.createClone(oldNodeId, newNodeId) : null;
        a.ActionHandlerOnHit = this.ActionHandlerOnHit ? this.ActionHandlerOnHit.createClone(oldNodeId, newNodeId) : null;
        a.ActionHandlerOnDie = this.ActionHandlerOnDie ? this.ActionHandlerOnDie.createClone(oldNodeId, newNodeId) : null;

        return a;
    }

    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.SceneNode} node The Scene node which needs to be animated this frame.
     * @param {Number} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(node, timeMs) {
        if (node == null || this.TheSceneManager == null)
            return false;

        var diff = timeMs - this.LastTime;
        if (diff > 150) diff = 150;
        this.LastTime = timeMs;

        var characterSize = 0;
        var changedNode = false;

        if (!(this.TheObject === node)) {
            this.TheObject = node;
            node.updateAbsolutePosition();
            this.StartPositionOfActor = node.getAbsolutePosition();
        }

        var currentPos = node.getAbsolutePosition();

        if (this.CurrentCommand == 3) //EMT_DIE_AND_STOP)
        ;

        else if (this.CurrentCommand == 1) //EMT_REACH_POSITION)
        {
            // check if we reached the position
            characterSize = this.getCharacterWidth(node);
            if (this.CurrentCommandTargetPos.substract(currentPos).getLength() < characterSize) {
                // target reached.
                this.CurrentCommand = 0; //EMT_DO_NOTHING;
                this.setAnimation(node, 0); //EAT_STAND);
                changedNode = true;
            }

            else {
                // not reached position yet
                // check if we possibly hit a wall. This can be done easily by getting the moving speed and
                // checking the start position and start time
                var cancelled = false;

                if (this.CurrentCommandTicksDone > 2) {
                    var expectedLengthMoved = this.CurrentCommandTicksDone * (this.MovementSpeed / 1000.0);
                    var lengthMoved = this.BeginPositionWhenStartingCurrentCommand.substract(currentPos).getLength();

                    if (lengthMoved * 1.2 < expectedLengthMoved) {
                        // cancel movement, moved twice as long as we should have already.
                        this.CurrentCommand = 0; //EMT_DO_NOTHING;
                        this.setAnimation(node, 0); //EAT_STAND);
                        cancelled = true;
                    }
                }

                if (!cancelled) {
                    // move on to the position
                    this.CurrentCommandTicksDone += diff;

                    var movementVec = this.CurrentCommandTargetPos.substract(currentPos);
                    movementVec.setLength((this.MovementSpeed / 1000.0) * diff);

                    if (!this.CanFly)
                        movementVec.Y = 0;

                    node.Pos.addToThis(movementVec);
                }

                // additionally, animate looking direction
                changedNode = this.animateRotation(node, (timeMs - this.CurrentCommandStartTime),
                    this.CurrentCommandTargetPos.substract(currentPos), this.RotationSpeedMs);
            }
        }

        else if (this.CurrentCommand == 2) //EMT_ATTACK_ITEM)
        {
            // attack enemy in the middle of the animation
            this.CurrentCommandTicksDone += diff;

            if (!this.AttackCommandExecuted &&
                this.CurrentCommandTicksDone > (this.CurrentCommandExpectedTickCount / 2)) {
                // execute attack action
                this.CurrentlyShooting = true;

                if (this.ActionHandlerOnAttack)
                    this.ActionHandlerOnAttack.execute(node);

                this.CurrentlyShooting = false;
                this.AttackCommandExecuted = true;
                changedNode = true;
            }

            if (this.CurrentCommandTicksDone > this.CurrentCommandExpectedTickCount) {
                // finished
                this.CurrentCommand = 0; //EMT_DO_NOTHING;
            }

            else {
                // rotate to attack target
                changedNode = this.animateRotation(node, (timeMs - this.CurrentCommandStartTime),
                    this.CurrentCommandTargetPos.substract(currentPos),
                    Math.min(this.RotationSpeedMs, this.CurrentCommandExpectedTickCount));
            }
        }

        else if (this.CurrentCommand == 0) //EMT_DO_NOTHING)
        {
            // see if we can check for the target
            // now do high level ai calculation here
            if (this.AIType == 1 || //EMT_STAND_STILL ||
                this.AIType == 2 || //EMT_RANDOMLY_PATROL)
                this.AIType == 3) {
                var attackTargetNode = this.scanForAttackTargetIfNeeded(timeMs, currentPos);
                if (attackTargetNode != null) {
                    // found an attack target
                    var weaponDistance = this.getAttackDistanceFromWeapon();

                    if (!this.Activated && this.ActionHandlerOnActivate)
                        this.ActionHandlerOnActivate.execute(node);
                    this.Activated = true;
                    changedNode = true;

                    if (attackTargetNode.getAbsolutePosition().getDistanceTo(currentPos) < weaponDistance) {
                        // attack target is in distance to be attacked by our weapon. Attack now, but
                        // first check if there is a wall between us.
                        if (this.isNodeVisibleFromNode(attackTargetNode, node)) {
                            // attack target is visible, attack now
                            this.CurrentlyShootingLine.Start = node.getTransformedBoundingBox().getCenter();
                            this.CurrentlyShootingLine.End = attackTargetNode.getTransformedBoundingBox().getCenter();

                            this.attackTarget(node, attackTargetNode, attackTargetNode.getAbsolutePosition(), currentPos, timeMs);
                        }

                        else {
                            // attack target is not visible. move to it.
                            this.moveToTarget(node, attackTargetNode.getAbsolutePosition(), currentPos, timeMs);
                        }
                    }

                    else {
                        // attack target is not in distance to be attacked by the weapon. move to it.
                        this.moveToTarget(node, attackTargetNode.getAbsolutePosition(), currentPos, timeMs);
                    }
                }

                else {
                    // no attack target found. Do something idle, maybe patrol a bit.
                    if (this.AIType == 2 || this.AIType == 3) //EMT_RANDOMLY_PATROL or EMT_FOLLOW_PATH_ROUTE)
                    {
                        if (!this.LastPatrolStartTime || timeMs > this.LastPatrolStartTime + this.PatrolWaitTimeMs) {
                            characterSize = this.getCharacterWidth(node);
                            var newPos = null;

                            if (this.AIType == 3) {
                                // find next path point to go to
                                var path = null;

                                if (this.PathIdToFollow != -1 && this.TheSceneManager != null)
                                    path = this.TheSceneManager.getSceneNodeFromId(this.PathIdToFollow);

                                if (path != null && path.getType() == 'path') {
                                    if (this.NextPathPointToGoTo >= path.getPathNodeCount())
                                        this.NextPathPointToGoTo = 0;

                                    newPos = path.getPathNodePosition(this.NextPathPointToGoTo);
                                }

                                ++this.NextPathPointToGoTo;
                            }

                            else {
                                // find random position to patrol to
                                var walklen = this.PatrolRadius;
                                this.LastPatrolStartTime = timeMs;
                                newPos = new Vect3d((Math.random() - 0.5) * walklen,
                                    (Math.random() - 0.5) * walklen,
                                    (Math.random() - 0.5) * walklen);

                                newPos.addToThis(this.StartPositionOfActor);

                                if (!this.CanFly)
                                    newPos.Y = this.StartPositionOfActor.Y;
                            }

                            if (!(newPos.substract(currentPos).getLength() < characterSize)) {
                                // move to patrol target
                                this.moveToTarget(node, newPos, currentPos, timeMs);
                                changedNode = true;
                            }
                        }
                    }
                }
            }
        }

        return changedNode;
    }

    /**
     * returns if rotation changed, returns true/false
     * @public
     */
    animateRotation(node, timeSinceStartRotation,
        lookvector, rotationSpeedMs) {
        if (!node)
            return false;

        var isCamera = (node.getType() == 'camera');
        if (isCamera)
            return false;

        if (!this.CanFly)
            lookvector.Y = 0;

        var matrot = new Matrix4();
        matrot.setRotationDegrees(lookvector.getHorizontalAngle());
        var matrot2 = new Matrix4();
        matrot2.setRotationDegrees(this.AdditionalRotationForLooking);
        matrot = matrot.multiply(matrot2);

        // matrot now is the wanted rotation, now interpolate with the current rotation
        var wantedRot = matrot.getRotationDegrees();
        var currentRot = node.Rot.clone();

        var interpol = Math.min(timeSinceStartRotation, rotationSpeedMs) / rotationSpeedMs;
        interpol = clamp(interpol, 0.0, 1.0);

        //node->setRotation(wantedRot.getInterpolated(currentRot, interpol));
        wantedRot.multiplyThisWithScal(DEGTORAD);
        currentRot.multiplyThisWithScal(DEGTORAD);

        var q1 = new Quaternion();
        q1.setFromEuler(wantedRot.X, wantedRot.Y, wantedRot.Z);

        var q2 = new Quaternion();
        q2.setFromEuler(currentRot.X, currentRot.Y, currentRot.Z);

        q2.slerp(q2, q1, interpol);
        q2.toEuler(wantedRot);

        wantedRot.multiplyThisWithScal(RADTODEG);

        if (node.Rot.equals(wantedRot))
            return false;

        node.Rot = wantedRot;
        return true;
    }

    /**
     * @public
     */
    moveToTarget(node, target, currentPos, now) {
        this.CurrentCommand = 1; //EMT_REACH_POSITION;
        this.CurrentCommandTargetPos = target;
        this.CurrentCommandStartTime = now;
        this.BeginPositionWhenStartingCurrentCommand = currentPos;
        this.CurrentCommandTicksDone = 0;
        this.CurrentCommandExpectedTickCount = 0; // invalid for this command
        this.setAnimation(node, 1); //EAT_WALK);
    }

    /**
     * @public
     */
    attackTarget(node, targetnode, target, currentPos, now) {
        this.CurrentCommand = 2; //EMT_ATTACK_ITEM;
        this.CurrentCommandTargetPos = target;
        this.CurrentCommandStartTime = now;
        this.HandleCurrentCommandTargetNode = targetnode;
        this.BeginPositionWhenStartingCurrentCommand = currentPos;
        this.CurrentCommandTicksDone = 0;
        this.CurrentCommandExpectedTickCount = 500; // seems to be a nice default value
        this.AttackCommandExecuted = false;

        var animDuration = this.setAnimation(node, 2); //EAT_ATTACK);

        if (animDuration != 0) {
            this.CurrentCommandExpectedTickCount = animDuration;
        }
    }

    /**
     * @public
     */
    aiCommandCancel(node) {
        this.CurrentCommand = 0; //EMT_DO_NOTHING;
        this.setAnimation(node, 0); //EAT_STAND);
    }

    /**
     * @public
     */
    die(node, currentPos, now) {
        this.CurrentCommand = 3; //EMT_DIE_AND_STOP;
        this.CurrentCommandStartTime = now;
        this.BeginPositionWhenStartingCurrentCommand = currentPos;
        this.CurrentCommandTicksDone = 0;
        this.CurrentCommandExpectedTickCount = 500; // seems to be a nice default value

        this.setAnimation(node, 3); //EAT_DIE);
    }

    /**
     * @public
     */
    isNodeVisibleFromNode(node1, node2) {
        if (!node1 || !node2)
            return false;

        // instead of checking the positions of the nodes, we use the centers of the boxes of the nodes
        var pos1 = node1.getTransformedBoundingBox().getCenter();
        var pos2 = node2.getTransformedBoundingBox().getCenter();

        // if this is a node with collision box enabled, move the test start position outside of the collision box (otherwise the test would collide with itself)
        if (this.TheObject == node2) {
            if (node2.getType() == 'mesh') {
                if (node2.DoesCollision) {
                    var extendLen = node2.getBoundingBox().getExtent().getLength() * 0.5;
                    var vect = pos2.substract(pos1);
                    vect.normalize();
                    vect.multiplyThisWithScal(extendLen + (extendLen * 0.02));
                    pos1.addToThis(vect);
                }
            }
        }

        return this.isPositionVisibleFromPosition(pos1, pos2);
    }

    /**
     * @public
     */
    isPositionVisibleFromPosition(pos1, pos2) {
        if (!this.World || !this.TheSceneManager)
            return true;

        if (this.World.getCollisionPointWithLine(pos1, pos2, true, null, true) != null) {
            return false;
        }

        return true;
    }

    /**
     * @public
     */
    getNearestSceneNodeFromAIAnimatorAndDistance(node,
        currentpos,
        tag) {
        if (!node || !node.Visible)
            return;

        // check if the node is in the max distance
        var isMatching = false;
        var dist = currentpos.getDistanceTo(node.getAbsolutePosition());

        if (dist < this.NearestSceneNodeFromAIAnimator_maxDistance) {
            // find ai animator in the node
            var ainode = node.getAnimatorOfType('gameai');

            if (ainode && tag != "" &&
                !(ainode === this) &&
                ainode.isAlive()) {
                // check if animator tags are the ones we need
                isMatching = ainode.Tags.indexOf(tag) != -1;
            }
        }

        if (isMatching) {
            this.NearestSceneNodeFromAIAnimator_maxDistance = dist;
            this.NearestSceneNodeFromAIAnimator_NodeOut = node;
        }

        // search children of the node
        for (var i = 0; i < node.Children.length; ++i) {
            var child = node.Children[i];
            this.getNearestSceneNodeFromAIAnimatorAndDistance(child, currentpos, tag);
        }
    }

    /**
     * @public
     */
    scanForAttackTargetIfNeeded(timems, currentpos) {
        if (this.ActivationRadius <= 0 || !this.TheObject || this.AttacksAIWithTags.length == 0 || !this.TheSceneManager)
            return null;

        if (!this.NextAttackTargetScanTime || timems > this.NextAttackTargetScanTime) {
            this.NearestSceneNodeFromAIAnimator_maxDistance = this.ActivationRadius;
            this.NearestSceneNodeFromAIAnimator_NodeOut = null;

            this.getNearestSceneNodeFromAIAnimatorAndDistance(this.TheSceneManager.getRootSceneNode(),
                currentpos, this.AttacksAIWithTags);

            this.NextAttackTargetScanTime = timems + 500 + (Math.random() * 1000);

            return this.NearestSceneNodeFromAIAnimator_NodeOut;
        }

        return null;
    }

    /**
     * @public
     */
    getAttackDistanceFromWeapon() {
        var ret = 1000;

        if (this.ActionHandlerOnAttack) {
            var action = this.ActionHandlerOnAttack.findAction('Shoot');
            if (action)
                ret = action.getWeaponRange();
        }

        return ret;
    }

    /**
     * @public
     */
    getCharacterWidth(node) {
        if (node != null)
            return 10;

        var sz = node.getTransformedBoundingBox().getExtent();
        sz.Y = 0;
        return sz.getLength();
    }

    /**
     * @public
     */
    getAnimationNameFromType(t) {
        switch (t) {
            case 0: return this.StandAnimation;
            case 1: return this.WalkAnimation;
            case 2: return this.AttackAnimation;
            case 3: return this.DieAnimation;
        }

        return "";
    }

    /**
     * @public
     */
    setAnimation(node, animationType) {
        if (!node || node.getType() != 'animatedmesh')
            return 0;

        // find mesh and node type
        var animatedMesh = node;

        var skinnedmesh = animatedMesh.Mesh; // as SkinnedMesh;
        if (!skinnedmesh)
            return 0;

        // find range for animation
        var range = skinnedmesh.getNamedAnimationRangeByName(this.getAnimationNameFromType(animationType));

        if (range) {
            animatedMesh.setFrameLoop(range.Begin, range.End);
            if (range.FPS != 0)
                animatedMesh.setAnimationSpeed(range.FPS);
            animatedMesh.setLoopMode(animationType == 1 || animationType == 0); //animationType == EAT_WALK || animationType == EAT_STAND);

            return (range.End - range.Begin) * range.FPS * 1000;
        }

        else {
            // note: temporary bug fix. The flash animation player is
            // not able to stop an animation at (0,0), so we stop at (1,1)
            animatedMesh.setFrameLoop(1, 1);
            animatedMesh.setLoopMode(false);
        }

        return 0;
    }

    /**
     * @public
     */
    isCurrentlyShooting() {
        return this.CurrentlyShooting;
    }

    /**
     * @public
     */
    getCurrentlyShootingLine() {
        return this.CurrentlyShootingLine;
    }

    /**
     * @public
     */
    isAlive() {
        return this.Health > 0;
    }

    /**
     * @public
     */
    OnHit(damage, node) {
        if (!node)
            return;

        if (this.Health == 0)
            return; // already dead

        this.Health -= damage;
        if (this.Health < 0)
            this.Health = 0;

        if (this.Health == 0) {
            if (this.ActionHandlerOnDie != null)
                this.ActionHandlerOnDie.execute(node);

            this.die(node, node.getAbsolutePosition(), 0);
        }

        else {
            if (this.ActionHandlerOnHit != null)
                this.ActionHandlerOnHit.execute(node);
        }
    }

    /**
     * @public
     */
    findActionByType(type) {
        var ret = null;

        if (this.ActionHandlerOnAttack) {
            ret = this.ActionHandlerOnAttack.findAction(type);
            if (ret)
                return ret;
        }

        if (this.ActionHandlerOnActivate) {
            ret = this.ActionHandlerOnActivate.findAction(type);
            if (ret)
                return ret;
        }

        if (this.ActionHandlerOnHit) {
            ret = this.ActionHandlerOnHit.findAction(type);
            if (ret)
                return ret;
        }

        if (this.ActionHandlerOnDie) {
            ret = this.ActionHandlerOnDie.findAction(type);
            if (ret)
                return ret;
        }

        return null;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// AnimatorOnFirstFrame
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * @constructor
 * @class
 * @public
 * @extends CL3D.Animator
 */
class AnimatorOnFirstFrame extends Animator {
    constructor(scene) {
        super();

        this.RunAlready = false;
        this.AlsoOnReload = false;
        this.SMGr = scene;
        this.TheActionHandler = null;
    }

    /**
     * Returns the type of the animator.
     * For the AnimatorOnFirstFrame, this will return 'onfirstframe'.
     * @public
     */
    getType() {
        return 'onfirstframe';
    }

    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.SceneNode} node The Scene node which needs to be animated this frame.
     * @param {Number} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(node, timeMs) {
        if (this.RunAlready)
            return false;

        this.RunAlready = true;

        if (this.TheActionHandler) {
            this.TheActionHandler.execute(node);
            return true;
        }

        return false;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// Timer animator
/////////////////////////////////////////////////////////////////////////////////////////


/**
 * @constructor
 * @class
 * @public
 * @extends CL3D.Animator
 */
class AnimatorTimer extends Animator {
    constructor(scene) {
        super();

        this.TimeLastTimed = 0;
        this.SMGr = scene;
        this.TheActionHandler = null;
        this.TickEverySeconds = 0;
        this.TimeLastTimed = CLTimer.getTime();
    }
    
    /**
     * Returns the type of the animator.
     * For the AnimatorTimer, this will return 'timer'.
     * @public
     */
    getType() {
        return 'timer';
    }
    
    /**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} newManager
	 * @param {Number} oldNodeId
	 * @param {Number} newNodeId
     */
    createClone(node, newManager, oldNodeId, newNodeId) {
        var a = new AnimatorTimer(this.SMGr);
        a.TheActionHandler = this.TheActionHandler ? this.TheActionHandler.createClone(oldNodeId, newNodeId) : null;
        a.TimeLastTimed = this.TimeLastTimed;
        a.TickEverySeconds = this.TickEverySeconds;
        return a;
    }
    
    /**
     * Animates the scene node it is attached to and returns true if scene node was modified.
     * @public
     * @param {CL3D.SceneNode} n The Scene node which needs to be animated this frame.
     * @param {Number} timeMs The time in milliseconds since the start of the scene.
     */
    animateNode(n, timeMs) {
        if (n == null)
            return false;

        if (this.TickEverySeconds > 0) {
            var now = CLTimer.getTime();

            if (now - this.TimeLastTimed > this.TickEverySeconds) {
                this.TimeLastTimed = now;

                if (this.TheActionHandler)
                    this.TheActionHandler.execute(n);
                return true;
            }
        }
        return false;
    }
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A scene node is a node in the hierarchical scene graph. Every scene node may have children, which are also scene
 * nodes. Children move relative to their parent's position. If the parent of a node is not visible, its children
 * won't be visible either. In this way, it is for example easily possible to attach a light to a moving car,
 * or to place a walking character on a moving platform on a moving ship.
 * <br/> <br/>
 * Concrete implementations are for example: {@link CameraSceneNode}, {@link BillboardSceneNode}, {@link PathSceneNode}, {@link MeshSceneNode}, {@link SkyBoxSceneNode}.
 * @constructor
 * @class The base class for scene nodes, a node in the hierarchical 3d scene rendering graph.
 */
class SceneNode {
	/**
	 * Position of the scene node, relative to its parent.
	 * If you want the position in world coordinates, use {@link getAbsolutePosition}().
	 * If you change this value, be sure to call {@link updateAbsolutePosition}() afterwards to make the change be reflected immediately.
	 * @type {CL3D.Vect3d}
	 * @public
	 */
	Pos = null;

	/**
	 * Rotation of the scene node, relative to its parent, in degrees.
	 * Note that this is the relative rotation of the node. If you want the absolute rotation, use {@link getAbsoluteTransformation}().getRotation()
	 * If you change this value, be sure to call {@link updateAbsolutePosition}() afterwards to make the change be reflected immediately.
	 * @type {CL3D.Vect3d}
	 * @public
	 */
	Rot = null;

	/**
	 * Scale of the scene node, relative to its parent, in degrees. Default is (1,1,1)
	 * This is the scale of this node relative to its parent. If you want the absolute scale, use {@link getAbsoluteTransformation}().getScale()
	 * If you change this value, be sure to call {@link updateAbsolutePosition}() afterwards to make the change be reflected immediately.
	 * @type {CL3D.Vect3d}
	 * @public
	 */
	Scale = null;

	/**
	 * Defines whether the node should be visible (if all of its parents are visible).
	 * This is only an option set by the user, but has nothing to do with geometry culling.
	 * @type Boolean
	 * @public
	 */
	Visible = true;

	/**
	 * Defines the name of the scene node, completely freely usable by the user.
	 * @type String
	 * @public
	 */
	Name = '';

	/**
	 * Defines the id of the scene node, completely freely usable by the user.
	 * @type Number
	 * @public
	 */
	Id = -1;

	/**
	 * An optional {@link TriangleSelector}, giving access to the collision geometry of this scene node.
	 * @type {CL3D.TriangleSelector}
	 * @public
	 */
	Selector = null;

	/**
	 * @public
	 */
	Parent = null;

	constructor() {
		this.Type = -1;
		this.Pos = new Vect3d();
		this.Rot = new Vect3d();
		this.Scale = new Vect3d(1, 1, 1);
		this.Visible = true;
		this.Name = '';
		this.Culling = 0;
		this.Id = -1;
		this.Parent = null;
		/**
		 * @type {CL3D.SceneNode[]}
		 */
		this.Children = new Array();
		/**
		 * @type {CL3D.Animator[]}
		 */
		this.Animators = new Array();

		this.AbsoluteTransformation = new Matrix4();
		this.scene = null;
		this.Selector = null;
	}

	/**
	 * Initializes the scene node, can be called by scene nodes derived from this class.
	 * @public
	 */
	init() {
		this.Pos = new Vect3d();
		this.Rot = new Vect3d();
		this.Scale = new Vect3d(1, 1, 1);
		this.Children = new Array();
		this.Animators = new Array();
		this.AbsoluteTransformation = new Matrix4();
	}

	/**
	 * Returns the parent scene node of this scene node.
	 * @public
	 * @returns {CL3D.SceneNode}
	 */
	getParent() {
		return this.Parent;
	}

	/**
	 * Returns an array with all child scene nodes of this node
	 * @public
	 * @returns {CL3D.SceneNode[]}
	 */
	getChildren() {
		return this.Children;
	}

	/**
	 * Returns the type string of the scene node.
	 * For example 'camera' if this is a camera, or 'mesh' if it is a mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'none';
	}

	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return new Box3d();
	}

	/**
	 * Returns an array of {@link Animator}s which are animating this scene node.
	 * @public
	 * @returns {CL3D.Animator[]} Bounding box of this scene node.
	 */
	getAnimators() {
		return this.Animators;
	}

	/**
	 * Returns the first {@link Animator} attached to this scene node with the specified type.
	 * @param type is a string with the type returned by {@link Animator}.getType(). A possible value
	 * is for example 'camerafps'. See the concreate animator implementations for type strings.
	 * @public
	 * @returns {CL3D.Animator} The animator if found, or null if not.
	 */
	getAnimatorOfType(type) {
		for (var i = 0; i < this.Animators.length; ++i) {
			var oa = this.Animators[i];
			if (oa.getType() == type) {
				return oa;
			}
		}

		return null;
	}

	/**
	 * @public
	 */
	findActionOfType(type) {
		for (var i = 0; i < this.Animators.length; ++i) {
			var oa = this.Animators[i];
			var ac = oa.findActionByType(type);
			if (ac != null)
				return ac;
		}

		return null;
	}

	/**
	 * Returns the bounding box of this scene node, transformed with the absolute transformation of this scene node.
	 * @returns {CL3D.Box3d} The axis aligned, transformed and animated absolute bounding box of this node.
	 * @public
	 */
	getTransformedBoundingBox() {
		var b = this.getBoundingBox().clone();
		this.AbsoluteTransformation.transformBoxEx(b);
		return b;
	}

	/**
	 * @public
	 */
	cloneMembers(b, newparent, oldNodeId, newNodeId) {
		b.Name = new String(this.Name);
		b.Visible = this.Visible;
		b.Culling = this.Culling;
		b.Pos = this.Pos.clone();
		b.Rot = this.Rot.clone();
		b.Scale = this.Scale.clone();
		b.Type = this.Type;
		b.scene = this.scene;

		if (newparent)
			newparent.addChild(b);

		for (var i = 0; i < this.Children.length; ++i) {
			var c = this.Children[i];
			if (c) {
				var newId = -1;
				if (newparent && newparent.scene)
					newId = newparent.scene.getUnusedSceneNodeId();

				var nc = c.createClone(b, c.Id, newId);
				if (nc != null) {
					nc.Id = newId;
					b.addChild(nc);
				}
			}
		}

		//try {
		for (var i = 0; i < this.Animators.length; ++i) {
			var oa = this.Animators[i];
			b.addAnimator(oa.createClone(this, this.scene, oldNodeId, newNodeId));
		}
		//} catch(e) {};
		if (this.AbsoluteTransformation)
			b.AbsoluteTransformation = this.AbsoluteTransformation.clone();
	}

	/**
	 * Creates a clone of this scene node and its children.
	 * @param {CL3D.SceneNode} newparent The new parent of the cloned scene node.
	 * @returns {CL3D.SceneNode} the cloned version of this scene node
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		return null;
	}

	/**
	 * Adds a scene node animator to the list of animators manipulating this scene node.
	 * @param {CL3D.Animator} a the new CL3D.Animator to add.
	 * @public
	 */
	addAnimator(a) {
		if (a != null)
			this.Animators.push(a);
	}

	/**
	 * Removes an animator from this scene node.
	 * @public
	 * @param {CL3D.Animator} a the new CL3D.Animator to remove.
	 */
	removeAnimator(a) {
		if (a == null)
			return;

		var i;

		for (i = 0; i < this.Animators.length; ++i) {
			var oa = this.Animators[i];
			if (oa === a) {
				this.Animators.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * Adds a child to this scene node.
	 * If the scene node already has a parent it is first removed from the other parent.
	 * @public
	 * @param {CL3D.SceneNode} n the child scene node to add.
	 */
	addChild(n) {
		if (n) {
			n.scene = this.scene;

			if (n.Parent)
				n.Parent.removeChild(n);
			n.Parent = this;
			this.Children.push(n);
		}
	}

	/**
	 * Removes a child from this scene node.
	 * @public
	 * @param {CL3D.SceneNode} n the child scene node to remove.
	 */
	removeChild(n) {
		for (var i = 0; i < this.Children.length; ++i) {
			if (this.Children[i] === n) {
				n.Parent = null;
				this.Children.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * This method is called just before the rendering process of the whole scene.
	 * Nodes may register themselves in the rendering pipeline during this call, precalculate
	 * the geometry which should be renderered, and prevent their children from being able to register
	 * themselves if they are clipped by simply not calling their OnRegisterSceneNode method. If you are implementing
	 * your own scene node, you should overwrite this method with an implementation code looking like this:
	 * @example
	 * if (this.Visible)
	 * {
	 *  // register for rendering
	 *  scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
	 *
	 *  // call base class to register childs (if needed)
	 *	CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene);
	 * }
	 * @param {CL3D.Scene} scene the current scene
	 * @public
	 */
	OnRegisterSceneNode(scene) {
		if (this.Visible) {
			for (var i = 0; i < this.Children.length; ++i) {
				var c = this.Children[i];
				c.OnRegisterSceneNode(scene);
			}
		}
	}

	/**
	 * OnAnimate() is called just before rendering the whole scene.
	 * Nodes may calculate or store animations here, and may do other useful things,
	 * depending on what they are. Also, OnAnimate() should be called for all child scene nodes here.
	 * This method will be called once per frame, independent of whether the scene node is visible or not.
	 * @param {CL3D.Scene} scene the current scene
	 * @param {Number} timeMs current time in milliseconds
	 * @public
	 */
	OnAnimate(scene, timeMs) {
		var modified = false;

		if (this.Visible) {
			var i;
			var animcount = this.Animators.length;
			for (i = 0; i < animcount;) {
				var a = this.Animators[i];
				modified = a.animateNode(this, timeMs) || modified;

				// if the animator deleted itself, don't move forward
				var oldanimcount = animcount;
				animcount = this.Animators.length;
				if (oldanimcount >= animcount)
					++i;
			}

			this.updateAbsolutePosition();

			for (i = 0; i < this.Children.length; ++i) {
				var c = this.Children[i];
				modified = c.OnAnimate(scene, timeMs) || modified;
			}
		}

		return modified;
	}

	/**
	 * Returns the relative transformation of the scene node.
	 * The relative transformation is stored internally as 3 vectors: translation, rotation and scale.
	 * To get the relative transformation matrix, it is calculated from these values.
	 * @public
	 * @returns {CL3D.Matrix4} the relative transformation
	 */
	getRelativeTransformation() {
		var mat = new Matrix4();

		mat.setRotationDegrees(this.Rot);
		mat.setTranslation(this.Pos);

		if (this.Scale.X != 1 || this.Scale.Y != 1 || this.Scale.Z != 1) {
			var smat = new Matrix4();
			smat.setScale(this.Scale);
			mat = mat.multiply(smat);
		}

		return mat;
	}

	/**
	 * Updates the absolute position based on the relative and the parents position.
	 * Note: This does not recursively update the parents absolute positions, so if you have a deeper hierarchy you might
	 * want to update the parents first.
	 * @public
	*/
	updateAbsolutePosition() {
		if (this.Parent != null) {
			this.AbsoluteTransformation =
				this.Parent.AbsoluteTransformation.multiply(this.getRelativeTransformation());
		}

		else
			this.AbsoluteTransformation = this.getRelativeTransformation();
	}

	/**
	 * Renders the node. Override to implement rendering your own scene node.
	 * @public
	 * @param {CL3D.Renderer} renderer the currently used renderer.
	 */
	render(renderer) {
		// TODO: implement in sub scene nodes
	}

	/**
	 * Returns the absolute transformation matrix of the node, also known as world matrix.
	 * Note: If local changes to the position, scale or rotation have been made to this scene node in this frame,
	 * call {@link updateAbsolutePosition}() to ensure this transformation is up to date.
	 * @public
	 * @returns {CL3D.Matrix4} the absolute matrix
	 */
	getAbsoluteTransformation() {
		return this.AbsoluteTransformation;
	}

	/**
	 * Gets the absolute position of the node in world coordinates.
	 * If you want the position of the node relative to its parent, use {@link Pos} instead, this is much faster as well.
	 * Note: If local changes to the position, scale or rotation have been made to this scene node in this frame,
	 * call {@link updateAbsolutePosition}() to ensure this position is up to date.
	 * @public
	 * @returns {CL3D.Vect3d} the absolute position
	 */
	getAbsolutePosition() {
		return this.AbsoluteTransformation.getTranslation();
	}

	/**
	 * Get amount of materials used by this scene node.
	 * @returns {Number} the amount of materials.
	 * @public
	 */
	getMaterialCount() {
		return 0;
	}

	/**
	 * Returns the material based on the zero based index i.
	 * To get the amount of materials used by this scene node, use {@link getMaterialCount}().
	 * This function is needed for inserting the node into the scene hierarchy at an optimal position for
	 * minimizing renderstate changes, but can also be used to directly modify the material of a scene node.
	 * @returns {CL3D.Material} the material with the specified index or null.
	 * @public
	 */
	getMaterial(i) {
		return null;
	}

	/**
	 * Returns if the scene node and all its parents are actually visible.
	 * For a quicker way, simply check the Visible property of this class. This method
	 * Checks the flags for this node and all its parents and maybe a bit slower.
	 * @returns {boolean} if the scene node and all its parents are visible
	 * @public
	 */
	isActuallyVisible() {
		var node = this;

		while (node) {
			if (!node.Visible)
				return false;

			node = node.Parent;
		}

		return true;
	}

	/**
	 * Called after the deserialization process. Internal method used so that linked nodes link them with the deserialized other nodes.
	 * @public
	 */
	onDeserializedWithChildren() {
		// to be implemented in a specific node if at all.
	}

	/**
	 * replaces all referenced ids of referenced nodes when the referenced node was a child and was cloned
	 * @public
	 */
	replaceAllReferencedNodes(nodeChildOld, nodeChildNew) {
		// to be implemented in a specific node if at all.
	}

	/**
	 * replaces all referenced ids of referenced nodes when the referenced node was a child and was cloned
	 * @public
	 */
	isParentActiveFPSCameraToRenderChildrenWithoutZBuffer() {
		if (!this.scene)
			return false;

		if (!(this.scene.ActiveCamera === this.Parent))
			return false;

		var an = this.Parent.getAnimatorOfType('camerafps');
		if (an == null)
			return false;

		return an.ChildrenDontUseZBuffer;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * The scene is usually rendered from the currently active camera. Some cameras have an {@link Animator} attached to
 * them which controlls the position and look target of the camera, for example a {@link AnimatorCameraFPS}. You can 
 * get access to this animator using camera.getAnimatorOfType('camerafps');. 
 * @class Scene Node which is a (controlable) camera.
 * @constructor
 * @extends CL3D.SceneNode
 * @public
 */
class CameraSceneNode extends SceneNode {
	constructor() {
		super();

		this.init();

		this.Type = 1835098982;
		this.Box = new Box3d();
		this.DoesCollision = false;
		this.Active = false;

		this.Target = new Vect3d(0, 0, 10);
		this.UpVector = new Vect3d(0, 1, 0);
		this.Projection = new Matrix4();
		this.ViewMatrix = new Matrix4();

		this.Fovy = PI / 2.5; // Field of view, in radians. 
		this.Aspect = 4.0 / 3.0; // Aspect ratio. 
		this.ZNear = 0.1; // value of the near view-plane. 
		this.ZFar = 3000; // Z-value of the far view-plane.
		this.TargetAndRotationAreBound = true;
		this.AutoAdjustAspectratio = true;
		this.ViewMatrixIsSetByUser = false;

		//this.recalculateProjectionMatrix();
		//this.recalculateViewArea();
	}
	/**
	 * @public
	 */
	recalculateProjectionMatrix() {
		this.Projection.buildProjectionMatrixPerspectiveFovLH(this.Fovy, this.Aspect, this.ZNear, this.ZFar);
		// TODO: 0.05?
		// this.viewVolume = screen.width / globalThis.innerWidth * 0.05;
		// this.Projection.buildProjectionMatrixPerspectiveOrthoLH(globalThis.innerWidth * this.viewVolume, globalThis.innerHeight * this.viewVolume, this.ZNear, this.ZFar);
	}
	/**
	 * Returns the type string of the scene node.
	 * Returns 'camera' for the camera scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'camera';
	}
	/**
	 * Sets the aspect ratio of the camera. The default is 4 / 3
	 * @public
	 */
	setAspectRatio(a) {
		if (!equals(this.Aspect, a)) {
			this.AutoAdjustAspectratio = false;
			this.Aspect = a;
			this.recalculateProjectionMatrix();
		}
	}
	/**
	 * Gets the aspect ratio of the camera. The default is 4 / 3
	 * @public
	 */
	getAspectRatio() {
		return this.Aspect;
	}
	/**
	 * Gets the field of view of the camera. Field of view is measured in radians.
	 * @public
	 */
	getFov() {
		return this.Fovy;
	}
	/**
	 * Sets the field of view of the camera. Field of view is measured in radians.
	 * @public
	 */
	setFov(fov) {
		if (!equals(this.Fovy, fov)) {
			if (isNaN(fov))
				return;

			this.Fovy = fov;
			this.recalculateProjectionMatrix();
		}
	}
	/**
	 * Sets target position of the camera.
	 * @param {CL3D.Vect3d} target new target position of the camera.
	 * @public
	 */
	setTarget(target) {
		if (target) {
			this.Target = target.clone();

			if (this.TargetAndRotationAreBound) {
				this.updateAbsolutePosition(); // if we don't update the absolute position before, children attached to the camera won't move correctly
				this.Rot = target.substract(this.getAbsolutePosition()).getHorizontalAngle();
			}
		}
	}
	/**
	 * Sets target position of the camera.
	 * @returns {CL3D.Vect3d} Target position of the camera.
	 * @public
	 */
	getTarget() {
		return this.Target;
	}
	/**
	 * Returns the up vector of the camera. The default is (0,1,0), pointing up.
	 * @returns {CL3D.Vect3d} Up vector of the camera.
	 * @public
	 */
	getUpVector() {
		return this.UpVector;
	}
	/**
	 * Sets up vector of the camera, a direction pointing to where 'up' is. Default is (0,1,0)
	 * @param {CL3D.Vect3d} upvector new up vector of the camera.
	 * @public
	 */
	setUpVector(upvector) {
		if (upvector)
			this.UpVector = upvector.clone();
	}
	/**
	 * Gets the value of the near plane of the camera. All geometry before this plane is clipped away.
	 * @default 0.1
	 * @public
	 */
	getNearValue() {
		return this.ZNear;
	}
	/**
	 * Sets the value of the near plane of the camera. All geometry before this plane is clipped away.
	 * @default 0.1
	 * @public
	 */
	setNearValue(nv) {
		if (!equals(this.ZNear, nv)) {
			this.ZNear = nv;
			this.recalculateProjectionMatrix();
		}
	}
	/**
	 * Gets the value of the far plane of the camera. All geometry behind this plane is clipped away.
	 * @default 3000
	 * @public
	 */
	getFarValue() {
		return this.ZFar;
	}
	/**
	 * Sets the value of the far plane of the camera. All geometry behind this plane is clipped away.
	 * @default 3000
	 * @public
	 */
	setFarValue(nv) {
		if (!equals(this.ZFar, nv)) {
			this.ZFar = nv;
			this.recalculateProjectionMatrix();
		}
	}
	/**
	 * @public
	 */
	recalculateViewArea() {
		// TODO: implement
	}
	/**
	 * @public
	 */
	OnAnimate(mgr, timeMs) {
		// old, simple version:
		//var ret:Boolean = super.OnAnimate(mgr, timeMs);
		//ViewMatrix.buildCameraLookAtMatrixLH(Pos, Target, UpVector);
		//recalculateViewArea();
		//return ret;
		// new, more valid version
		//var ret = super.OnAnimate(mgr, timeMs);
		var ret = SceneNode.prototype.OnAnimate.call(this, mgr, timeMs);

		if (!this.ViewMatrixIsSetByUser)
			this.calculateViewMatrix();

		return ret;
	}
	/**
	 * @public
	 */
	calculateViewMatrix() {
		var pos = this.getAbsolutePosition();
		var targetToSet = this.Target.clone();
		if (pos.equals(targetToSet))
			targetToSet.X += 1;

		this.ViewMatrix.buildCameraLookAtMatrixLH(pos, targetToSet, this.UpVector);
		this.recalculateViewArea();
	}
	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (mgr.getActiveCamera() === this) {
			mgr.registerNodeForRendering(this, 2); //REGISTER_MODE_CAMERA);
			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}
	/**
	 * @public
	 */
	render(renderer) {
		// we need to rebuild the camera lookat matrix again because the user might have changed 
		// the camera position, target or upvector in OnBeforeDraw
		if (!this.ViewMatrixIsSetByUser)
			this.calculateViewMatrix();

		// if auto aspect, set now
		if (this.Aspect == 0 || this.AutoAdjustAspectratio) {
			this.setAutoAspectIfNoFixedSet(renderer.width, renderer.height);
			if (this.Aspect == 0)
				this.setAspectRatio(3.0 / 4.0);
		}

		// render finally
		renderer.setProjection(this.Projection);
		renderer.setView(this.ViewMatrix);
	}
	/**
	 * @public
	 */
	onMouseDown(event) {
		for (var i = 0; i < this.Animators.length; ++i) {
			this.Animators[i].onMouseDown(event);
		}
	}
	/**
	 * @public
	 */
	onMouseWheel(delta) {
		for (var i = 0; i < this.Animators.length; ++i) {
			this.Animators[i].onMouseWheel(delta);
		}
	}
	/**
	 * @public
	 */
	onMouseUp(event) {
		for (var i = 0; i < this.Animators.length; ++i) {
			this.Animators[i].onMouseUp(event);
		}
	}
	/**
	 * @public
	 */
	onMouseMove(event) {
		for (var i = 0; i < this.Animators.length; ++i) {
			this.Animators[i].onMouseMove(event);
		}
	}
	/**
	 * @public
	 */
	onKeyDown(event) {
		var ret = false;

		for (var i = 0; i < this.Animators.length; ++i) {
			if (this.Animators[i].onKeyDown(event))
				ret = true;
		}

		return ret;
	}
	/**
	 * @public
	 */
	onKeyUp(event) {
		var ret = false;

		for (var i = 0; i < this.Animators.length; ++i) {
			if (this.Animators[i].onKeyUp(event))
				ret = true;
		}

		return ret;
	}
	/**
	 * Creates a clone of the camera.
	 * @public
	 * @param {CL3D.SceneNode} newparent The new parent of the clone. Must be a scene node as well.
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new CameraSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.Target)
			c.Target = this.Target.clone();

		if (this.UpVector)
			c.UpVector = this.UpVector.clone();

		if (this.Projection)
			c.Projection = this.Projection.clone();

		if (this.ViewMatrix)
			c.ViewMatrix = this.ViewMatrix.clone();

		c.Fovy = this.Fovy;
		c.Aspect = this.Aspect;
		c.ZNear = this.ZNear;
		c.ZFar = this.ZFar;

		if (this.Box)
			c.Box = this.Box.clone();

		return c;
	}
	/**
	 * @public
	 */
	setAutoAspectIfNoFixedSet(viewPortWidth, viewPortHeight) {
		if (viewPortWidth == 0 || viewPortHeight == 0)
			return;

		var casp = this.Aspect;

		if (!equals(casp, 0) && !this.AutoAdjustAspectratio) {
			// preset aspect ratio in the editor
			return;
		}

		var newaspect = viewPortWidth / viewPortHeight;

		this.setAspectRatio(newaspect);
		this.AutoAdjustAspectratio = true;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A scene node displaying a static {@link Mesh}.
 * @class A scene node displaying a static {@link Mesh}.
 * @constructor
 * @extends CL3D.SceneNode
 */
class MeshSceneNode extends SceneNode {
	constructor() {
		super();

		this.init();

		this.Type = 1752395110;
		this.Box = new Box3d();
		this.DoesCollision = false;
		this.OwnedMesh = null;
		this.ReadOnlyMaterials = true;
		this.Selector = null;
		this.OccludesLight = true;
		this.ReceivesStaticShadows = false;
	}

	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		if (this.OwnedMesh)
			return this.OwnedMesh.Box;
		return this.Box;
	}

	/**
	 * Returns the {@link Mesh} drawn by this scene node.
	 * @public
	 * @returns {CL3D.Mesh} the 3d mesh of this scene node
	 */
	getMesh() {
		return this.OwnedMesh;
	}
	
	/**
	 * Sets the {@link Mesh} which should be drawn by this scene node.
	 * @public
	 * @param {CL3D.Mesh} m the mesh to draw from now on
	 */
	setMesh(m) {
		this.OwnedMesh = m;
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns 'mesh' for the mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'mesh';
	}

	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		var mesh = this.OwnedMesh;

		if (this.Visible && mesh) {
			var hasTransparentMaterials = false;
			var hasSolidMaterials = false;

			for (var i = 0; i < mesh.MeshBuffers.length; ++i) {
				var buf = mesh.MeshBuffers[i];
				if (buf.Mat.isTransparent())
					hasTransparentMaterials = true;

				else
					hasSolidMaterials = true;
			}

			if (hasTransparentMaterials) {
				if (this.isParentActiveFPSCameraToRenderChildrenWithoutZBuffer())
					mgr.registerNodeForRendering(this, Scene.RENDER_MODE_TRANSPARENT_AFTER_ZBUFFER_CLEAR);

				else
					mgr.registerNodeForRendering(this, Scene.RENDER_MODE_TRANSPARENT);
			}

			if (hasSolidMaterials) {
				if (this.isParentActiveFPSCameraToRenderChildrenWithoutZBuffer())
					mgr.registerNodeForRendering(this, Scene.TRANSPARENT_SOLID_AFTER_ZBUFFER_CLEAR);

				else
					mgr.registerNodeForRendering(this, Scene.RENDER_MODE_DEFAULT);
			}

			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}

	/**
	 * @public
	 */
	render(renderer) {
		renderer.setWorld(this.AbsoluteTransformation);

		var bShadowMapEnabled = renderer.isShadowMapEnabled();

		for (var i = 0; i < this.OwnedMesh.MeshBuffers.length; ++i) {
			var buf = this.OwnedMesh.MeshBuffers[i];

			if (buf.Mat.isTransparent() == (this.scene.getCurrentRenderMode() == Scene.RENDER_MODE_TRANSPARENT)) {
				if (this.ReceivesStaticShadows || !buf.Mat.Lighting)
					renderer.quicklyEnableShadowMap(false);

				renderer.setMaterial(buf.Mat);
				renderer.drawMeshBuffer(buf);
			}
		}

		// reset shadow map to previous setting
		if (bShadowMapEnabled)
			renderer.quicklyEnableShadowMap(true);
	}

	/**
	 * @public
	 */
	getMaterialCount() {
		if (this.OwnedMesh)
			return this.OwnedMesh.MeshBuffers.length;

		return 0;
	}

	/**
	 * @public
	 */
	getMaterial(i) {
		if (this.OwnedMesh != null) {
			if (i >= 0 && i < this.OwnedMesh.MeshBuffers.length) {
				var buf = this.OwnedMesh.MeshBuffers[i];
				return buf.Mat;
			}
		}
		return null;
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new MeshSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.OwnedMesh)
			c.OwnedMesh = this.OwnedMesh.createClone();
		//c.OwnedMesh = this.OwnedMesh;
		c.ReadonlyMaterials = this.ReadonlyMaterials;
		c.DoesCollision = this.DoesCollision;

		if (this.Box)
			c.Box = this.Box.clone();

		return c;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A class rendering a simple 3d cube, used for testing purposes.
 * Example showing how to add this to the current scene:
 * @constructor
 * @extends CL3D.MeshSceneNode 
 * @class A class rendering a simple cube of default size 10 with one material.
 * @param size Size of the cube, default this is 10.
 * @example
 * // add a cube to the scene
 * var cubenode = new CL3D.CubeSceneNode();
 * scene.getRootSceneNode().addChild(cubenode);
 *
 * // set material texture of the cube:
 * cubenode.getMaterial(0).Tex1 = 
 *    engine.getTextureManager().getTexture("crate_wood.jpg", true);
 */
class CubeSceneNode extends MeshSceneNode {
	constructor(sizex, sizey, sizez) {
		super();

		if (sizex == null)
			sizex = 10;

		if (sizey == null)
			sizey = sizex;

		if (sizez == null)
			sizez = sizey;

		this.OwnedMesh = new Mesh();
		var buf = new MeshBuffer();

		var indices = [0, 2, 1, 0, 3, 2, 1, 5, 4, 1, 2, 5, 4, 6, 7, 4, 5, 6,
			7, 3, 0, 7, 6, 3, 9, 5, 2, 9, 8, 5, 0, 11, 10, 0, 10, 7];
		// front side
		this.OwnedMesh.AddMeshBuffer(buf);

		var clr = createColor(255, 255, 255, 255);

		var vertices = new Array();

		vertices.push(this.createVertex(0, 0, 0, -1, -1, -1, clr, 0, 1));
		vertices.push(this.createVertex(1, 0, 0, 1, -1, -1, clr, 1, 1));
		vertices.push(this.createVertex(1, 1, 0, 1, 1, -1, clr, 1, 0));
		vertices.push(this.createVertex(0, 1, 0, -1, 1, -1, clr, 0, 0));
		vertices.push(this.createVertex(1, 0, 1, 1, -1, 1, clr, 0, 1));
		vertices.push(this.createVertex(1, 1, 1, 1, 1, 1, clr, 0, 0));
		vertices.push(this.createVertex(0, 1, 1, -1, 1, 1, clr, 1, 0));
		vertices.push(this.createVertex(0, 0, 1, -1, -1, 1, clr, 1, 1));
		vertices.push(this.createVertex(0, 1, 1, -1, 1, 1, clr, 0, 1));
		vertices.push(this.createVertex(0, 1, 0, -1, 1, -1, clr, 1, 1));
		vertices.push(this.createVertex(1, 0, 1, 1, -1, 1, clr, 1, 0));
		vertices.push(this.createVertex(1, 0, 0, 1, -1, -1, clr, 0, 0));

		for (var i = 0; i < 12; ++i) {
			var v = vertices[i].Pos;
			v.X *= sizex;
			v.Y *= sizey;
			v.Z *= sizez;
			v.X -= sizex * 0.5;
			v.Y -= sizey * 0.5;
			v.Z -= sizez * 0.5;

			vertices[i].Normal.normalize();
		}

		// duplicate so that vertices have correct normals
		{
			var outvertices = buf.Vertices;
			buf.Indices;
			var plane = new Plane3d();

			for (var i = 0; i < indices.length; i += 3) {
				var cln1 = cloneVertex3D(vertices[indices[i]]);
				var cln2 = cloneVertex3D(vertices[indices[i + 1]]);
				var cln3 = cloneVertex3D(vertices[indices[i + 2]]);

				plane.setPlaneFrom3Points(cln1.Pos, cln2.Pos, cln3.Pos);
				cln1.Normal = plane.Normal.clone();
				cln2.Normal = plane.Normal.clone();
				cln3.Normal = plane.Normal.clone();

				outvertices.push(cln1);
				outvertices.push(cln2);
				outvertices.push(cln3);

				buf.Indices.push(i);
				buf.Indices.push(i + 1);
				buf.Indices.push(i + 2);
			}
		}

		// calculate box
		buf.recalculateBoundingBox();
		this.OwnedMesh.Box = buf.Box.clone();

		this.init();
	}

	/**
	 * @public
	 */
	createVertex(x, y, z, nx, ny, nz, clr, s, t) {
		var vtx = new Vertex3D(true);
		vtx.Pos.X = x;
		vtx.Pos.Y = y;
		vtx.Pos.Z = z;
		vtx.Normal.X = nx;
		vtx.Normal.Y = ny;
		vtx.Normal.Z = nz;
		vtx.TCoords.X = s;
		vtx.TCoords.Y = t;
		return vtx;
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new CubeSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		c.OwnedMesh = this.OwnedMesh;

		c.ReadonlyMaterials = this.ReadonlyMaterials;
		c.DoesCollision = this.DoesCollision;

		if (this.Box)
			c.Box = this.Box.clone();

		return c;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A class rendering a sky box around the whole scene. It is a cube with 6 faces and six textures, which
 * can be accessed using {@link SceneNode}.getMaterial().
 * @constructor
 * @extends CL3D.MeshSceneNode 
 * @class A class rendering a sky box around the whole scene. 
 */
class SkyBoxSceneNode extends MeshSceneNode  {
	constructor() {
		super();

		this.Type = 2037085030;

		this.OwnedMesh = new Mesh();

		var baseindices = [0, 1, 2, 0, 2, 3];

		// front side
		var buf = new MeshBuffer();
		this.OwnedMesh.AddMeshBuffer(buf);
		buf.Mat.ClampTexture1 = true;
		buf.Indices = baseindices;
		buf.Vertices.push(this.createVertex(-1, -1, -1, 0, 0, 1, 1, 1));
		buf.Vertices.push(this.createVertex(1, -1, -1, 0, 0, 1, 0, 1));
		buf.Vertices.push(this.createVertex(1, 1, -1, 0, 0, 1, 0, 0));
		buf.Vertices.push(this.createVertex(-1, 1, -1, 0, 0, 1, 1, 0));

		// left side
		buf = new MeshBuffer();
		this.OwnedMesh.AddMeshBuffer(buf);
		buf.Mat.ClampTexture1 = true;
		buf.Indices = baseindices;
		buf.Vertices.push(this.createVertex(1, -1, -1, -1, 0, 0, 1, 1));
		buf.Vertices.push(this.createVertex(1, -1, 1, -1, 0, 0, 0, 1));
		buf.Vertices.push(this.createVertex(1, 1, 1, -1, 0, 0, 0, 0));
		buf.Vertices.push(this.createVertex(1, 1, -1, -1, 0, 0, 1, 0));

		// right side
		buf = new MeshBuffer();
		this.OwnedMesh.AddMeshBuffer(buf);
		buf.Mat.ClampTexture1 = true;
		buf.Indices = baseindices;
		buf.Vertices.push(this.createVertex(-1, -1, 1, 1, 0, 0, 1, 1));
		buf.Vertices.push(this.createVertex(-1, -1, -1, 1, 0, 0, 0, 1));
		buf.Vertices.push(this.createVertex(-1, 1, -1, 1, 0, 0, 0, 0));
		buf.Vertices.push(this.createVertex(-1, 1, 1, 1, 0, 0, 1, 0));

		// back side
		buf = new MeshBuffer();
		this.OwnedMesh.AddMeshBuffer(buf);
		buf.Mat.ClampTexture1 = true;
		buf.Indices = baseindices;
		buf.Vertices.push(this.createVertex(1, -1, 1, 0, 0, -1, 1, 1));
		buf.Vertices.push(this.createVertex(-1, -1, 1, 0, 0, -1, 0, 1));
		buf.Vertices.push(this.createVertex(-1, 1, 1, 0, 0, -1, 0, 0));
		buf.Vertices.push(this.createVertex(1, 1, 1, 0, 0, -1, 1, 0));

		// top side
		buf = new MeshBuffer();
		this.OwnedMesh.AddMeshBuffer(buf);
		buf.Mat.ClampTexture1 = true;
		buf.Indices = baseindices;
		buf.Vertices.push(this.createVertex(1, 1, -1, 0, -1, 0, 1, 1));
		buf.Vertices.push(this.createVertex(1, 1, 1, 0, -1, 0, 0, 1));
		buf.Vertices.push(this.createVertex(-1, 1, 1, 0, -1, 0, 0, 0));
		buf.Vertices.push(this.createVertex(-1, 1, -1, 0, -1, 0, 1, 0));

		// bottom side
		buf = new MeshBuffer();
		this.OwnedMesh.AddMeshBuffer(buf);
		buf.Mat.ClampTexture1 = true;
		buf.Indices = baseindices;
		buf.Vertices.push(this.createVertex(1, -1, 1, 0, 1, 0, 1, 1));
		buf.Vertices.push(this.createVertex(1, -1, -1, 0, 1, 0, 0, 1));
		buf.Vertices.push(this.createVertex(-1, -1, -1, 0, 1, 0, 0, 0));
		buf.Vertices.push(this.createVertex(-1, -1, 1, 0, 1, 0, 1, 0));
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns 'sky' for the mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'sky';
	}

	/**
	 * @public
	 */
	createVertex(x, y, z, nx, ny, nz, s, t) {
		var vtx = new Vertex3D(true);
		vtx.Pos.X = x;
		vtx.Pos.Y = y;
		vtx.Pos.Z = z;
		vtx.TCoords.X = s;
		vtx.TCoords.Y = t;
		return vtx;
	}

	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible) {
			mgr.registerNodeForRendering(this, 1); //SceneManager.REGISTER_MODE_SKYBOX);
			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}

	/**
	 * @public
	 */
	render(renderer) {
		//renderer.setWorld(this.AbsoluteTransformation);
		//renderer.drawMesh(this.OwnedMesh);
		var cam = this.scene.getActiveCamera();
		if (!cam || !this.OwnedMesh)
			return;

		var translate = new Matrix4(false);
		this.AbsoluteTransformation.copyTo(translate);
		translate.setTranslation(cam.getAbsolutePosition());

		var viewDistance = (cam.getNearValue() + cam.getFarValue()) * 0.5;
		var scale = new Matrix4();
		scale.setScale(new Vect3d(viewDistance, viewDistance, viewDistance));

		// Draw the sky box between the near and far clip plane
		renderer.setWorld(translate.multiply(scale));
		renderer.drawMesh(this.OwnedMesh, true);
	}
	
	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new SkyBoxSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.OwnedMesh)
			c.OwnedMesh = this.OwnedMesh.clone();

		c.ReadonlyMaterials = this.ReadonlyMaterials;
		c.DoesCollision = this.DoesCollision;

		if (this.Box)
			c.Box = this.Box.clone();

		return c;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A billboard is like a 3d sprite: A 2d element, which always looks to the camera. 
 * It is usually used for explosions, fire, lensflares, particles and things like that.
 * @class A billboard is like a 3d sprite: A 2d element, which always looks to the camera. 
 * @constructor
 * @extends CL3D.SceneNode
 */
class BillboardSceneNode extends SceneNode {
	constructor() {
		super();

		this.init();

		this.Type = 1819042406;
		this.Box = new Box3d();
		this.SizeX = 10;
		this.SizeY = 10;
		this.IsVertical = false;
		this.MeshBuffer = new MeshBuffer();
		this.vtx1 = new Vertex3D(true);
		this.vtx2 = new Vertex3D(true);
		this.vtx3 = new Vertex3D(true);
		this.vtx4 = new Vertex3D(true);

		var indices = this.MeshBuffer.Indices;
		indices.push(0);
		indices.push(2);
		indices.push(1);
		indices.push(0);
		indices.push(3);
		indices.push(2);

		var vertices = this.MeshBuffer.Vertices;
		vertices.push(this.vtx1);
		vertices.push(this.vtx2);
		vertices.push(this.vtx3);
		vertices.push(this.vtx4);

		this.vtx1.TCoords.X = 1;
		this.vtx1.TCoords.Y = 1;

		this.vtx2.TCoords.X = 1;
		this.vtx2.TCoords.Y = 0;

		this.vtx3.TCoords.X = 0;
		this.vtx3.TCoords.Y = 0;

		this.vtx4.TCoords.X = 0;
		this.vtx4.TCoords.Y = 1;

		// construct bounding box
		for (var i = 0; i < 4; ++i)
			this.Box.addInternalPointByVector(vertices[i].Pos);
	}

	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return this.Box;
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns 'billboard' for the mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'billboard';
	}

	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible) {
			if (this.isParentActiveFPSCameraToRenderChildrenWithoutZBuffer())
				mgr.registerNodeForRendering(this, this.MeshBuffer.Mat.isTransparent() ? Scene.RENDER_MODE_TRANSPARENT_AFTER_ZBUFFER_CLEAR : Scene.TRANSPARENT_SOLID_AFTER_ZBUFFER_CLEAR);

			else
				mgr.registerNodeForRendering(this, this.MeshBuffer.Mat.isTransparent() ? Scene.RENDER_MODE_TRANSPARENT : Scene.RENDER_MODE_DEFAULT);

			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}

	/**
	 * @public
	 */
	render(renderer) {
		var cam = this.scene.getActiveCamera();
		if (!cam)
			return;

		var bShadowMapEnabled = renderer.isShadowMapEnabled();
		renderer.quicklyEnableShadowMap(false);

		var useOldMethod = this.IsVertical;
		if (!useOldMethod) {
			// new hardware drawing of the billboard, which only needs the update of the transformation every frame
			var pos = this.getAbsolutePosition();

			var mb = renderer.getStaticBillboardMeshBuffer();

			var mbillboard = new Matrix4(true);
			mbillboard.setScale(new Vect3d(this.SizeX * 0.5, this.SizeY * 0.5, 0));

			var mView = renderer.getView().clone();
			mView.setTranslation(new Vect3d(0, 0, 0));
			var minvView = new Matrix4(true);
			mView.getInverse(minvView);
			minvView.setTranslation(pos);

			mbillboard = minvView.multiply(mbillboard);

			renderer.setWorld(mbillboard);

			renderer.setMaterial(this.MeshBuffer.Mat);
			renderer.drawMeshBuffer(mb);
		}

		else {
			// old software drawing of billboard, which needs a mesh buffer update of it every frame:
			var pos = this.getAbsolutePosition();

			var campos = cam.getAbsolutePosition();
			var target = cam.getTarget();
			var up = cam.getUpVector();
			var view = target.substract(campos);
			view.normalize();

			var horizontal = up.crossProduct(view);
			if (horizontal.getLengthSQ() == 0)
				horizontal.set(up.Y, up.X, up.Z);

			horizontal.normalize();
			horizontal.multiplyThisWithScal(0.5 * this.SizeX);

			var vertical = horizontal.crossProduct(view);
			vertical.normalize();
			vertical.multiplyThisWithScal(0.5 * this.SizeY);

			if (this.IsVertical)
				vertical.set(0, -0.5 * this.SizeY, 0);

			view.multiplyThisWithScal(1.0);

			//for (s32 i=0; i<4; ++i)
			//	vertices[i].Normal = view;
			this.vtx1.Pos.setTo(pos);
			this.vtx1.Pos.addToThis(horizontal);
			this.vtx1.Pos.addToThis(vertical);

			this.vtx2.Pos.setTo(pos);
			this.vtx2.Pos.addToThis(horizontal);
			this.vtx2.Pos.substractFromThis(vertical);

			this.vtx3.Pos.setTo(pos);
			this.vtx3.Pos.substractFromThis(horizontal);
			this.vtx3.Pos.substractFromThis(vertical);

			this.vtx4.Pos.setTo(pos);
			this.vtx4.Pos.substractFromThis(horizontal);
			this.vtx4.Pos.addToThis(vertical);

			this.MeshBuffer.update(true);

			// draw
			var identity = new Matrix4(true);
			renderer.setWorld(identity);

			renderer.setMaterial(this.MeshBuffer.Mat);
			renderer.drawMeshBuffer(this.MeshBuffer);
		}

		if (bShadowMapEnabled)
			renderer.quicklyEnableShadowMap(true);
	}

	/**
	 * @public
	 */
	getMaterialCount() {
		return 1;
	}

	/**
	 * @public
	 */
	getMaterial(i) {
		return this.MeshBuffer.Mat;
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new BillboardSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.Box)
			c.Box = this.Box.clone();

		c.SizeX = this.SizeX;
		c.SizeY = this.SizeY;
		c.IsVertical = this.IsVertical;
		c.MeshBuffer.Mat = this.MeshBuffer.Mat.clone();

		return c;
	}

	/**
	 * gets the size of the billboard
	 * @public
	 * @returns {CL3D.Vect2d}
	 */
	getSize() {
		return new Vect2d(this.SizeX, this.SizeY);
	}

	/**
	 * sets the size of the billboard
	 * @public
	 */
	setSize(x, y) {
		this.SizeX = x;
		this.SizeY = y;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


const GLSL$1 = String.raw;

/**
 * A class rendering a reflective water surface.
 * @constructor
 * @extends CL3D.MeshSceneNode 
 * @class A class rendering a reflective water surface.
 */
class WaterSurfaceSceneNode extends MeshSceneNode {
	// simple normal 3d world 3d transformation shader
	vs_shader_water = GLSL$1`
		uniform mat4 worldviewproj;
		uniform float mWaveLength;
		uniform vec2 mWaveMovement;

		attribute vec4 vPosition;
		attribute vec4 vNormal;
		attribute vec4 vColor;
		attribute vec2 vTexCoord1;
		attribute vec2 vTexCoord2;

		varying vec2 WavesTexCoord;
		varying vec3 TexCoord;

		void main()
		{
			vec4 pos = worldviewproj * vPosition;
			gl_Position = pos;
			WavesTexCoord = (vPosition.xz / mWaveLength) + mWaveMovement;
			TexCoord.x = 0.5 * (pos.w + pos.x);
			TexCoord.y = 0.5 * (pos.w + pos.y);
			TexCoord.z = pos.w;
		}`;
		
	fs_shader_water = GLSL$1`
		//#version 100
		precision mediump float;

		uniform sampler2D texture1;
		uniform sampler2D texture2;
		uniform float mWaveHeight;
		uniform vec4 mWaterColor;

		varying vec2 WavesTexCoord;
		varying vec3 TexCoord;

		void main()
		{
			vec4 normalClr = texture2D(texture2, WavesTexCoord.xy);
			vec2 waveMovement = mWaveHeight * (normalClr.xy - 0.5);

			vec2 projTexCoord = clamp((TexCoord.xy / TexCoord.z) + waveMovement, 0.0, 1.0);
			vec4 reflectiveColor = texture2D(texture1, vec2(projTexCoord.x, -projTexCoord.y));

			gl_FragColor = mWaterColor * reflectiveColor;
			gl_FragColor.a = mWaterColor.a;
		}`;

	constructor() {
		super();

		this.Type = 1920235366;

		// settings
		this.Details = 0;
		this.WaterFlowDirection = new Vect2d(1.0, 1.0);
		this.WaveLength = 0.5;
		this.WaveHeight = 0.5;
		this.WaterColor = createColor(190, 255, 255, 255);
		this.ColorWhenUnderwater = true;
		this.UnderWaterColor = createColor(190, 0, 100, 0);

		this.DrawDebugTexture = false;

		// runtime
		this.LastRTTUpdateTime = 0;
		this.LastRTTUpdateViewMatrix = new Matrix4();
		this.CurrentlyRenderingIntoRTT = false;

		this.Mat = new Material();
		this.Mat.Lighting = false;
		this.Mat.Type = -1;
		this.Mat.BackfaceCulling = false;

		this.RTTexture = null;
		this.FrustumCullingProjection = null;
	}
	/**
	 * Returns the type string of the scene node.
	 * Returns 'water' for the water scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'water';
	}
	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible) {
			mgr.registerNodeForRendering(this, Scene.RENDER_MODE_TRANSPARENT);
			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);

			// also, register for RTT rendering, so we can update our render texture. But only
			// do this every few frames, if possible
			var cam = mgr.getActiveCamera();
			var now = CLTimer.getTime();

			var bNeedsRTTUpdate = false;

			if (!this.LastRTTUpdateTime)
				bNeedsRTTUpdate = true;

			else {
				var updateEveryMs = 100;

				if (cam) {
					// based on distance from camera, update not that often
					var camWorldPos = cam.getAbsolutePosition();
					var waterSize = this.getBoundingBox().getExtent().getLength();
					var pos = this.getAbsolutePosition();
					var centerDistanceFromCamera = pos.getDistanceTo(camWorldPos);

					if (centerDistanceFromCamera > waterSize)
						updateEveryMs *= (centerDistanceFromCamera / waterSize);

					if (updateEveryMs > 1000)
						updateEveryMs = 1000;

					// also, update if camera position / rotation changed a lot 
					if (!cam.ViewMatrix.equals(this.LastRTTUpdateViewMatrix))
						updateEveryMs = 10;

					this.LastRTTUpdateViewMatrix = cam.ViewMatrix.clone();
				}

				bNeedsRTTUpdate = this.LastRTTUpdateTime + updateEveryMs < now;
			}

			if (bNeedsRTTUpdate) {
				this.LastRTTUpdateTime = now;
				mgr.registerNodeForRendering(this, Scene.RENDER_MODE_RTT_SCENE);
			}

			// register for water color if camera is below water surface
			if (this.DrawDebugTexture)
				mgr.registerNodeForRendering(this, Scene.RENDER_MODE_2DOVERLAY);

			else if (cam) {
				var camPos = cam.getAbsolutePosition();
				var waterPos = this.getAbsolutePosition();
				if (camPos.Y < waterPos.Y) {
					var box = this.getTransformedBoundingBox();
					if (camPos.X >= box.MinEdge.X && camPos.X <= box.MaxEdge.X &&
						camPos.Z >= box.MinEdge.Z && camPos.Z <= box.MaxEdge.Z) {
						mgr.registerNodeForRendering(this, Scene.RENDER_MODE_2DOVERLAY);
					}
				}
			}
		}
	}
	OnAnimate(scene, timeMs) {
		MeshSceneNode.prototype.OnAnimate.call(this, scene, timeMs);
		return true; // water is animated, so force redraw
	}
	/**
	 * @public
	 */
	render(renderer) {
		var cam = this.scene.getActiveCamera();
		if (!cam || !this.OwnedMesh)
			return;

		// skip if the mesh isn't visible in the frustum
		var frustrum = this.scene.getCurrentCameraFrustrum();
		if (frustrum && this.scene.CurrentRenderMode != Scene.RENDER_MODE_2DOVERLAY) // always render underwater stuff
		{
			if (!frustrum.isBoxInside(this.getTransformedBoundingBox()))
				return;
		}

		// draw
		if (this.scene.CurrentRenderMode == Scene.RENDER_MODE_TRANSPARENT) {
			if (this.Mat.Type == -1 || this.RTTexture == null)
				return;

			// render normally
			if (!this.CurrentlyRenderingIntoRTT) {
				renderer.setWorld(this.AbsoluteTransformation);

				var mesh = this.OwnedMesh;
				if (!mesh)
					return;

				this.Box = mesh.Box;
				this.Mat.Tex1 = this.RTTexture;

				if (mesh && mesh.MeshBuffers && mesh.MeshBuffers.length > 0)
					this.Mat.Tex2 = mesh.MeshBuffers[0].Mat.Tex1;

				for (var i = 0; i < mesh.MeshBuffers.length; ++i) {
					var mb = mesh.MeshBuffers[i];
					if (mb) {
						renderer.setMaterial(this.Mat);
						renderer.drawMeshBuffer(mb);
					}
				}
			}
		}

		else if (this.scene.CurrentRenderMode == Scene.RENDER_MODE_RTT_SCENE) {
			// render scene into our RTT
			if (!this.prepareForRendering(renderer))
				return;

			var oldRenderTarget = renderer.getRenderTarget();

			renderer.setInvertedDepthTest(true);

			if (renderer.setRenderTarget(this.RTTexture, true, true, this.scene.getBackgroundColor())) {
				this.CurrentlyRenderingIntoRTT = true;

				// set reflection and culling matrices
				var cam = this.scene.getActiveCamera();
				var origProjection = cam.Projection;
				var origView = cam.ViewMatrix;
				var origUpVector = cam.UpVector;
				var origTarget = cam.Target;
				var origPosition = cam.Pos;
				var origBinding = cam.TargetAndRotationAreBound;
				var origByUser = cam.ViewMatrixIsSetByUser;

				cam.ViewMatrixIsSetByUser = true;
				cam.TargetAndRotationAreBound = false;

				var planeY = this.getAbsolutePosition().Y;

				var reflTarget = origTarget.clone();
				var reflPosition = origPosition.clone();

				reflPosition.Y = -origPosition.Y + 2 * planeY; //position of the water
				cam.Pos = reflPosition;

				reflTarget.Y = -origTarget.Y + 2 * planeY;
				cam.Target = reflTarget;

				var viewMatrixRefl = new Matrix4();
				viewMatrixRefl.buildCameraLookAtMatrixLH(reflPosition, reflTarget, new Vect3d(0.0, 1.0, 0.0));
				cam.ViewMatrix = viewMatrixRefl;


				// cull by plane
				var reflectionPlane = new Plane3d();
				reflectionPlane.setPlane(new Vect3d(0, planeY, 0), new Vect3d(0, 1.0, 0));

				var reflectionPlaneInCameraSpace = reflectionPlane.clone();
				viewMatrixRefl.transformPlane(reflectionPlaneInCameraSpace);

				var culledProjection = new Matrix4();
				culledProjection = origProjection.clone();

				{
					var m = culledProjection;
					var x = sgn(reflectionPlaneInCameraSpace.Normal.X + m.m08) / m.m00;
					var y = sgn(reflectionPlaneInCameraSpace.Normal.Y + m.m09) / m.m05;
					var z = -1.0;
					var w = (1.0 + m.m10) / m.m14;

					var dotproduct = -2.0 / (x * reflectionPlaneInCameraSpace.Normal.X +
						y * reflectionPlaneInCameraSpace.Normal.Y +
						z * reflectionPlaneInCameraSpace.Normal.Z +
						w * reflectionPlaneInCameraSpace.D);

					m.m02 = reflectionPlaneInCameraSpace.Normal.X * dotproduct;
					m.m06 = reflectionPlaneInCameraSpace.Normal.Y * dotproduct;
					m.m10 = (reflectionPlaneInCameraSpace.Normal.Z * dotproduct) + 1.0;
					m.m14 = reflectionPlaneInCameraSpace.D * dotproduct;
				}

				this.FrustumCullingProjection = culledProjection;


				// draw everything
				this.scene.drawRegistered3DNodes(renderer, this);

				// reset old view and settings
				cam.ViewMatrixIsSetByUser = origByUser;
				cam.Projection = origProjection;
				cam.ViewMatrix = origView;
				cam.Target = origTarget;
				cam.Pos = origPosition;
				cam.UpVector = origUpVector;
				cam.TargetAndRotationAreBound = origBinding;

				renderer.setInvertedDepthTest(false);
				renderer.setRenderTarget(oldRenderTarget, false, true);

				this.CurrentlyRenderingIntoRTT = false;
			}

			renderer.setInvertedDepthTest(false); // set back
		}

		else if (this.scene.CurrentRenderMode == Scene.RENDER_MODE_2DOVERLAY && !this.CurrentlyRenderingIntoRTT) {
			if (this.ColorWhenUnderwater && !this.DrawDebugTexture)
				renderer.draw2DRectangle(0, 0, renderer.getWidth(), renderer.getHeight(), this.UnderWaterColor, true);

			if (this.DrawDebugTexture)
				renderer.draw2DImage(10, 10, 250, 200, this.RTTexture, false);
		}
	}
	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new WaterSurfaceSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.OwnedMesh)
			c.OwnedMesh = this.OwnedMesh.clone();

		c.ReadonlyMaterials = this.ReadonlyMaterials;
		c.DoesCollision = this.DoesCollision;

		if (this.Box)
			c.Box = this.Box.clone();

		return c;
	}
	/**
	 * @public
	 */
	prepareForRendering(renderer) {
		if (this.PreparedForRendering)
			return this.RTTexture != null;

		this.PreparedForRendering = true;

		this.initRTT(renderer);

		if (!this.RTTexture)
			return false;

		var me = this;
		var gl = renderer.getWebGL();

		this.Mat.Type = renderer.createMaterialType(
			this.vs_shader_water,
			this.fs_shader_water,
			true, gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
			function () { me.setShaderConstants(renderer); });

		return true;
	}
	/**
	 * @public
	 */
	setShaderConstants(renderer) {
		var gl = renderer.getWebGL();

		var program = renderer.getGLProgramFromMaterialType(this.Mat.Type);
		if (!program)
			return;

		var locWaterColor = gl.getUniformLocation(program, "mWaterColor");
		gl.uniform4f(locWaterColor,
			getRed(this.WaterColor) / 255.0,
			getGreen(this.WaterColor) / 255.0,
			getBlue(this.WaterColor) / 255.0,
			getAlpha(this.WaterColor) / 255.0);

		var currentTime = (CLTimer.getTime() / 1000.0) % 1000.0;

		var locmWaveMovement = gl.getUniformLocation(program, "mWaveMovement");
		gl.uniform2f(locmWaveMovement,
			this.WaterFlowDirection.X * currentTime,
			this.WaterFlowDirection.Y * currentTime);

		var locmWaveLength = gl.getUniformLocation(program, "mWaveLength");
		gl.uniform1f(locmWaveLength, this.WaveLength * 100.0);

		var locmWaveHeight = gl.getUniformLocation(program, "mWaveHeight");
		gl.uniform1f(locmWaveHeight, this.WaveHeight);
	}
	/**
	 * @public
	 */
	initRTT(renderer) {
		if (renderer == null)
			return;

		var sx = renderer.getWidth();
		var sy = renderer.getHeight();
		var rttX = 512;
		var rttY = 512;

		switch (this.Details) {
			case 0: // high
				rttX = sx / 2; rttY = sy / 2;
				break;
			case 1: // middle
				rttX = sx / 3; rttY = sy / 3;
				break;
			case 2: // low
				rttX = sx / 4; rttY = sy / 4;
				break;
		}
		rttX = renderer.nextHighestPowerOfTwo(rttX);
		rttY = renderer.nextHighestPowerOfTwo(rttY);

		rttX = Math.min(rttX, rttY);
		rttY = Math.min(rttX, rttY);

		if (rttX < 64) rttX = 64;
		if (rttY < 64) rttY = 64;

		this.RTTexture = renderer.addRenderTargetTexture(rttX, rttY);
	}
	/*
	 * @public
	 */
	OnAfterDrawSkyboxes(renderer) {
		renderer.setProjection(this.FrustumCullingProjection);
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A scene node displaying an animated Mesh, usually a skeletal animated character.
 * @class A scene node displaying an animated Mesh, usually a skeletal animated character.
 * @constructor
 * @extends CL3D.SceneNode
 */
class AnimatedMeshSceneNode extends SceneNode {
	constructor() {
		super();

		this.init();

		this.Type = 1835950438;
		this.Box = new Box3d();
		this.DoesCollision = false;
		this.Mesh = null;
		this.Selector = null;

		this.LastLODSkinnedAnimationTime = 0;
		this.Materials = new Array();
		this.FramesPerSecond = 25.0 / 100.0;
		this.BeginFrameTime = CLTimer.getTime();
		this.FrameWhenCurrentMeshWasGenerated = 0.0;

		this.StartFrame = 0;
		this.EndFrame = 0;
		this.Looping = false;
		this.CurrentFrameNr = 0;

		this.BlendTimeMs = 250;
		this.AnimationBlendingEnabled = true;
		this.CurrentlyBlendingAnimation = false;
		this.JointStatesBeforeBlendingBegin = new Array();
		this.BeginBlendTime = 0;
		this.WasAnimatedBefore = false;

		this.MinimalUpdateDelay = 20;

		this.AnimatedDummySceneNodes = new Array(); // list of items of type SAnimatedDummySceneNodeChild to be attached to an animated joint.
	}
	
	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return this.Box;
	}
	
	/**
	 * Returns the amount of named animations in the animated mesh.
	 * @public
	 * @returns {Number} Amount of named animations.
	 */
	getNamedAnimationCount() {
		if (this.Mesh && this.Mesh.NamedAnimationRanges)
			return this.Mesh.NamedAnimationRanges.length;
		return 0;
	}
	
	/**
	 * Returns information about a named animation in the animated mesh by index
	 * @public
	 * @param {Number} idx index of the animation. Must be a value >=0 and <getNamedAnimationCount().
	 * @returns {Object} returns an object with info about the animation or null if there is no such animation. The object
	 * will have the members .Name for the animation name, .Begin for the begin frame, .End for the end frame and
	 * .FPS for the frames per second.
	 */
	getNamedAnimationInfo(idx) {
		var len = this.getNamedAnimationCount();

		if (idx >= 0 && idx < len)
			return this.Mesh.NamedAnimationRanges[idx];

		return null;
	}
	
	/**
	 * Sets the animation to a new one by name.
	 * @public
	 * @returns {Boolean} True if successful, false if not
	 */
	setAnimation(name) {
		if (!this.Mesh)
			return false;

		var animinfo = this.Mesh.getNamedAnimationRangeByName(name);
		if (!animinfo)
			return false;

		this.setFrameLoop(animinfo.Begin, animinfo.End);
		this.setAnimationSpeed(animinfo.FPS);
		return true;
	}
	
	/**
	 * Enables or disables animation blending.
	 * When playing new animations, they are automatically blended when this is enabled (it is by default).
	 * @public
	 * @param {Boolean} enable true to enable, false for not enabling
	 * @param {int} blendtime milliseconds needed for blending one animation into the next one. Default is 250.
	 */
	setAnimationBlending(enable, blendtime) {
		this.BlendTimeMs = blendtime == null ? 250 : blendtime;
		this.AnimationBlendingEnabled = enable;
	}
	
	/**
	 * Sets the animation to a new one by name, also includes 'none' and 'all' as parameters
	 * @public
	 * @returns {Boolean} True if successful, false if not
	 */
	setAnimationByEditorName(name, loop) {
		if (!this.Mesh)
			return false;

		var smesh = this.Mesh; // as SkinnedMesh;
		if (!smesh)
			return false;

		var range = smesh.getNamedAnimationRangeByName(name);

		if (range) {
			this.setFrameLoop(range.Begin, range.End);
			if (range.FPS != 0)
				this.setAnimationSpeed(range.FPS);
			this.setLoopMode(loop);
		}

		else if (name) {
			// set 'all' or 'none' animation
			var lwrAnimName = name.toLowerCase();
			if (lwrAnimName == "all") {
				this.setFrameLoop(0, smesh.getFrameCount());
				if (smesh.DefaultFPS != 0)
					this.setAnimationSpeed(smesh.DefaultFPS);
				this.setLoopMode(loop);
			}

			else if (lwrAnimName == "none") {
				this.setFrameLoop(0, 0);
				this.setLoopMode(loop);
			}
		}

		return true;
	}
	
	/**
	 * @public
	 */
	setMesh(m) {
		if (!m)
			return;

		this.Mesh = m;

		this.Box = m.getBoundingBox();

		// copy materials here. HERE: ignored, animated meshes don't store materials here
		this.setFrameLoop(0, m.getFrameCount());
	}
	
	/**
	 * Returns the type string of the scene node.
	 * Returns 'animatedmesh' for the mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'animatedmesh';
	}
	
	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible && this.Mesh) {
			var mats = this.Materials;

			var hasTransparentMaterials = false;
			var hasSolidMaterials = false;
			if (mats != null) {
				for (var i = 0; i < mats.length; ++i) {
					if (mats[i].isTransparent())
						hasTransparentMaterials = true;

					else
						hasSolidMaterials = true;
				}
			}

			if (hasTransparentMaterials) {
				if (this.isParentActiveFPSCameraToRenderChildrenWithoutZBuffer())
					mgr.registerNodeForRendering(this, Scene.RENDER_MODE_TRANSPARENT_AFTER_ZBUFFER_CLEAR);

				else
					mgr.registerNodeForRendering(this, Scene.RENDER_MODE_TRANSPARENT);
			}

			if (hasSolidMaterials) {
				if (this.isParentActiveFPSCameraToRenderChildrenWithoutZBuffer())
					mgr.registerNodeForRendering(this, Scene.TRANSPARENT_SOLID_AFTER_ZBUFFER_CLEAR);

				else
					mgr.registerNodeForRendering(this, Scene.RENDER_MODE_DEFAULT);
			}

			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}
	
	/**
	 * @public
	 */
	getMaterialCount() {
		if (this.Materials != null)
			return this.Materials.length;

		if (this.OwnedMesh)
			return this.OwnedMesh.MeshBuffers.length;

		return 0;
	}
	
	/**
	 * @public
	 */
	getMaterial(i) {
		if (this.Materials) {
			if (i >= 0 && i < this.Materials.length) {
				return this.Materials[i];
			}

			else {
				if (this.Mesh && this.Mesh.AnimatedMeshesToLink &&
					(i >= 0) && (this.Materials.length == i) && (i < 256)) {
					// the mesh has not yet been loaded, add this as a new CL3D.Material and return it.
					// we assume this material is in there
					var newMat = new Material();
					this.Materials.push(newMat);
					return newMat;
				}
			}
		}
		return null;
	}
	
	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new AnimatedMeshSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		c.Mesh = this.Mesh;

		if (this.Box)
			c.Box = this.Box.clone();

		c.DoesCollision = this.DoesCollision;
		c.Selector = this.Selector;

		c.LastLODSkinnedAnimationTime = this.LastLODSkinnedAnimationTime;
		c.Materials = new Array();

		for (var i = 0; i < this.Materials.length; ++i)
			c.Materials.push(this.Materials[i].clone());

		c.FramesPerSecond = this.FramesPerSecond;
		c.BeginFrameTime = this.BeginFrameTime;
		c.FrameWhenCurrentMeshWasGenerated = this.FrameWhenCurrentMeshWasGenerated;

		c.StartFrame = this.StartFrame;
		c.EndFrame = this.EndFrame;
		c.Looping = this.Looping;
		c.CurrentFrameNr = this.CurrentFrameNr;

		c.MinimalUpdateDelay = this.MinimalUpdateDelay;

		c.BlendTimeMs = this.BlendTimeMs;
		c.AnimationBlendingEnabled = this.AnimationBlendingEnabled;
		c.CurrentlyBlendingAnimation = false;
		c.JointStatesBeforeBlendingBegin = new Array();
		c.BeginBlendTime = 0;

		for (var i = 0; i < this.AnimatedDummySceneNodes.length; ++i) {
			var h = new SAnimatedDummySceneNodeChild();
			h.Node = this.AnimatedDummySceneNodes[i].Node; // will be replaced with the correct cloned item later in replaceAllReferencedNodes
			h.JointIdx = this.AnimatedDummySceneNodes[i].JointIdx;
			h.NodeIDToLink = this.AnimatedDummySceneNodes[i].NodeIDToLink;

			c.AnimatedDummySceneNodes.push(h);
		}

		return c;
	}

	/**
	 * Sets the speed of the animation
	 * @public
	 * @param {Float} speed a floating point value specifying the frames per second to display
	 */
	setAnimationSpeed(speed) {
		this.FramesPerSecond = speed;
	}
	
	/**
	 * Sets if the animation should be playbed back looped
	 * @public
	 * @param {Boolean} loop true to loop, false if not
	 */
	setLoopMode(loop) {
		this.Looping = loop;
	}

	/**
	 * Sets the begin and end frame for a looped animation
	 * @public
	 * @param {Number} begin start frame of the loop
	 * @param {Number} end end frame of the loop
	 */
	setFrameLoop(begin, end) {
		if (!this.Mesh)
			return false;

		var maxFrameCount = this.Mesh.getFrameCount() - 1;
		var oldStart = this.StartFrame;
		var oldEnd = this.EndFrame;

		if (end < begin) {
			this.StartFrame = clamp(end, 0, maxFrameCount);
			this.EndFrame = clamp(begin, this.StartFrame, maxFrameCount);
		}

		else {
			this.StartFrame = clamp(begin, 0, maxFrameCount);
			this.EndFrame = clamp(end, this.StartFrame, maxFrameCount);
		}

		if (oldStart != this.StartFrame || oldEnd != this.EndFrame)
			this.setCurrentFrame(this.StartFrame);

		return true;
	}

	/**
	 * Sets the current frame to display
	 * @public
	 * @param {Float} frame current frame to display
	 */
	setCurrentFrame(frame) {
		var oldFrameNumber = this.CurrentFrameNr;

		this.CurrentFrameNr = clamp(frame, this.StartFrame, this.EndFrame);
		this.BeginFrameTime = CLTimer.getTime() - Math.floor((this.CurrentFrameNr - this.StartFrame) / this.FramesPerSecond);

		if (this.AnimationBlendingEnabled && this.BlendTimeMs)
			this.startAnimationBlending(oldFrameNumber);
	}

	/**
	 * @public
	 */
	buildFrameNr(timeMs) {
		var deltaFrame = 0; //:Number;

		if (this.StartFrame == this.EndFrame)
			return this.StartFrame; //Support for non animated meshes

		if (this.FramesPerSecond == 0.0)
			return this.StartFrame;

		var valueToReturn = 0;

		if (this.Looping) {
			// play animation looped
			var restartedLoop = false;

			var lenInMs = Math.abs(Math.floor((this.EndFrame - this.StartFrame) / this.FramesPerSecond));
			if (this.FramesPerSecond > 0.0) // forwards
			{
				valueToReturn = this.StartFrame + ((timeMs - this.BeginFrameTime) % lenInMs) * this.FramesPerSecond;

				restartedLoop = valueToReturn < this.CurrentFrameNr;
			}
			else // backwards
			{
				valueToReturn = this.EndFrame - ((timeMs - this.BeginFrameTime) % lenInMs) * -this.FramesPerSecond;

				restartedLoop = valueToReturn > this.CurrentFrameNr;
			}

			if (restartedLoop && this.AnimationBlendingEnabled) // blend animations on loop end
				this.startAnimationBlending(this.CurrentFrameNr);
		}

		else {
			// play animation non looped
			if (this.FramesPerSecond > 0.0) // forwards
			{
				deltaFrame = (timeMs - this.BeginFrameTime) * this.FramesPerSecond;

				valueToReturn = this.StartFrame + deltaFrame;

				if (valueToReturn > this.EndFrame) {
					valueToReturn = this.EndFrame;

					//if (LoopCallBack)
					//	LoopCallBack.OnAnimationEnd(this);
				}
			}
			else // backwards
			{
				deltaFrame = (timeMs - this.BeginFrameTime) * (-this.FramesPerSecond);

				valueToReturn = this.EndFrame - deltaFrame;

				if (valueToReturn < this.StartFrame) {
					valueToReturn = this.StartFrame;

					//if (LoopCallBack)
					//	LoopCallBack.OnAnimationEnd(this);
				}

			}
		}

		return valueToReturn;
	}
	
	/**
	 * Returns the currently displayed frame number.
	 * @public
	 */
	getFrameNr() {
		return this.CurrentFrameNr;
	}
	
	/**
	 * @public
	 */
	hasDynamicLightedMaterials() {
		for (var i = 0; i < this.Materials.length; ++i)
			if (this.Materials[i].Lighting)
				return true;

		return false;
	}
	
	/**
	 * @public
	 */
	calculateMeshForCurrentFrame() {
		// As multiple scene nodes may be sharing the same skinned mesh, we have to
		// re-animated it every frame to ensure that this node gets the mesh that it needs.
		var skinnedMesh = this.Mesh; // as SkinnedMesh;
		if (!skinnedMesh)
			return;

		var animationChanged = false;

		animationChanged = this.animateJointsWithCurrentBlendingSettings(this.getFrameNr());

		// Update the skinned mesh for the current joint transforms.
		if (animationChanged || skinnedMesh.skinDoesNotMatchJointPositions) {
			skinnedMesh.skinMesh(this.hasDynamicLightedMaterials());
			skinnedMesh.updateBoundingBox();
			this.Box = skinnedMesh.getBoundingBox().clone();

			// update all changed buffers
			for (var i = 0; i < skinnedMesh.LocalBuffers.length; ++i) {
				var buf = skinnedMesh.LocalBuffers[i]; // as MeshBuffer;	
				buf.update(true);
			}
		}

		this.FrameWhenCurrentMeshWasGenerated = this.CurrentFrameNr;
	}
	
	/**
	 * Sets the minimal update delay. The animated mesh is only updated every few milliseconds, in order to increase
	 * performance. The default value is 60 milli seconds (= 16 frames per second). Set it to 0 to enable instant updates.
	 * @public
	 * @param {Float} frame current frame to display
	 */
	setMinimalUpdateDelay(delayMs) {
		this.MinimalUpdateDelay = delayMs;
	}
	
	/**
	 * @public
	 */
	OnAnimate(mgr, timeMs) {
		var now = CLTimer.getTime();

		if (this.LastLODSkinnedAnimationTime == 0 ||
			now - this.LastLODSkinnedAnimationTime > this.MinimalUpdateDelay) {
			var newFrameNr = this.buildFrameNr(timeMs);
			this.CurrentFrameNr != newFrameNr;
			this.CurrentFrameNr = newFrameNr;
			this.LastLODSkinnedAnimationTime = now;
		}

		//return super.OnAnimate(mgr, timeMs) || framechanged;
		var changed = SceneNode.prototype.OnAnimate.call(this, mgr, timeMs);

		if (this.AnimatedDummySceneNodes.length != 0)
			this.updatePositionsOfAttachedNodes();

		return changed;
	}
	
	/**
	 * @public
	 */
	render(renderer) {
		// skip if the mesh isn't visible in the frustum
		var frustrum = this.scene.getCurrentCameraFrustrum();
		if (frustrum) {
			if (!frustrum.isBoxInside(this.getTransformedBoundingBox()))
				return;
		}

		//this.scene.SkinnedMeshesRenderedLastTime += 1;
		// go drawing
		var skinnedMesh = this.Mesh; // as SkinnedMesh;
		if (skinnedMesh) {
			renderer.setWorld(this.AbsoluteTransformation);

			// calculate skin
			if (!skinnedMesh.isStatic())
				this.calculateMeshForCurrentFrame();

			this.WasAnimatedBefore = true;

			var isForShadowBuffer = this.scene.getCurrentRenderMode() == Scene.RENDER_MODE_SHADOW_BUFFER;

			var bShadowMapEnabled = renderer.isShadowMapEnabled();

			// draw all buffers of the skinned mesh
			for (var i = 0; i < skinnedMesh.LocalBuffers.length; ++i) {
				var buf = skinnedMesh.LocalBuffers[i]; // as MeshBuffer;			
				if (i < this.Materials.length)
					buf.Mat = this.Materials[i];

				if (isForShadowBuffer ||
					buf.Mat.isTransparent() == (this.scene.getCurrentRenderMode() == Scene.RENDER_MODE_TRANSPARENT)) {
					if (buf.Transformation != null)
						renderer.setWorld(this.AbsoluteTransformation.multiply(buf.Transformation)); // rigid transformation of the whole buffer

					if (!isForShadowBuffer) {
						if (!buf.Mat.Lighting && bShadowMapEnabled)
							renderer.quicklyEnableShadowMap(false);

						renderer.setMaterial(buf.Mat);
					}

					else {
						var matType = buf.Mat.Type;
						if (matType == Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS) {
							this.scene.ShadowDrawMaterialAlphaRefMovingGrass.Tex1 = buf.Mat.Tex1;
							renderer.setMaterial(this.scene.ShadowDrawMaterialAlphaRefMovingGrass);
						}

						else if (matType == Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF) {
							this.scene.ShadowDrawMaterialAlphaRef.Tex1 = buf.Mat.Tex1;
							renderer.setMaterial(this.scene.ShadowDrawMaterialAlphaRef);
						}

						else
							renderer.setMaterial(this.scene.ShadowDrawMaterialSolid);
					}

					renderer.drawMeshBuffer(buf);

					if (buf.Transformation != null)
						renderer.setWorld(this.AbsoluteTransformation); // set back old transformation
				}
			}

			if (bShadowMapEnabled)
				renderer.quicklyEnableShadowMap(true);
		}
	}
	
	/**
	 * @public
	 */
	ensureJointCopyArrayHasCorrectSize(joints) {
		var sz1 = joints.length;
		if (sz1 > this.JointStatesBeforeBlendingBegin.length) {
			while (this.JointStatesBeforeBlendingBegin.length < sz1) {
				var o = new Object();
				o.Animatedposition = new Vect3d(0, 0, 0);
				o.Animatedscale = new Vect3d(1, 1, 1);
				o.Animatedrotation = new Quaternion();
				this.JointStatesBeforeBlendingBegin.push(o);
			}
		}
	}
	
	/**
	 * @public
	 */
	startAnimationBlending(frameNumberBeforeAnimationChange) {
		if (!this.WasAnimatedBefore)
			return;

		var skinnedMesh = this.Mesh; // as SkinnedMesh;
		if (!skinnedMesh)
			return;

		// be sure joints have animations stored before animation was switched
		this.animateJointsWithCurrentBlendingSettings(frameNumberBeforeAnimationChange);

		// change blending settings
		this.BeginBlendTime = CLTimer.getTime();
		this.CurrentlyBlendingAnimation = true;

		// copy current joints
		this.ensureJointCopyArrayHasCorrectSize(skinnedMesh.AllJoints);

		for (var i = 0; i < skinnedMesh.AllJoints.length; ++i) {
			var rState = this.JointStatesBeforeBlendingBegin[i];
			var j = skinnedMesh.AllJoints[i];

			rState.Animatedposition = j.Animatedposition.clone();
			rState.Animatedscale = j.Animatedscale.clone();
			rState.Animatedrotation = j.Animatedrotation.clone();
		}
	}
	
	/**
	 * @public
	 */
	animateJointsWithCurrentBlendingSettings(framenumber) {
		var skinnedMesh = this.Mesh; // as SkinnedMesh;
		if (!skinnedMesh)
			return;

		var blendFactor = 1.0;

		if (this.CurrentlyBlendingAnimation) {
			var now = CLTimer.getTime();
			if ((now - this.BeginBlendTime) > this.BlendTimeMs)
				this.CurrentlyBlendingAnimation = false;

			else {
				blendFactor = (now - this.BeginBlendTime) / this.BlendTimeMs;

				// copy our saved joint positions so the skinned mesh can interpolate between them
				this.ensureJointCopyArrayHasCorrectSize(skinnedMesh.AllJoints);

				for (var i = 0; i < skinnedMesh.AllJoints.length; ++i) {
					var rState = this.JointStatesBeforeBlendingBegin[i];
					var j = skinnedMesh.AllJoints[i];

					j.Animatedposition = rState.Animatedposition.clone();
					j.Animatedscale = rState.Animatedscale.clone();
					j.Animatedrotation = rState.Animatedrotation.clone();
				}
			}
		}

		// animate with the current frame number
		return skinnedMesh.animateMesh(framenumber, blendFactor);
	}
	
	/**
	 * Called after the deserialization process. Internal method used so that linked nodes link them with the deserialized other nodes.
	 * @public
	 */
	onDeserializedWithChildren() {
		if (this.scene == null)
			return;

		for (var i = 0; i < this.AnimatedDummySceneNodes.length;) {
			var node = 0;
			var id = this.AnimatedDummySceneNodes[i].NodeIDToLink;

			if (id != -1)
				node = this.scene.getSceneNodeFromIdImpl(this, id);

			if (node && node.getType() == 'dummytrans') {
				this.AnimatedDummySceneNodes[i].Node = node;
				++i;
			}

			else
				this.AnimatedDummySceneNodes.splice(i, 1);
		}
	}
	
	/**
	 * Called after the deserialization process. Internal method used so that linked nodes link them with the deserialized other nodes.
	 * @public
	 */
	updatePositionsOfAttachedNodes() {
		var skinnedMesh = this.Mesh; // as SkinnedMesh;
		if (!skinnedMesh || skinnedMesh.isStatic())
			return;

		this.animateJointsWithCurrentBlendingSettings(this.getFrameNr());
		skinnedMesh.buildAll_GlobalAnimatedMatrices(null, null);

		var joints = skinnedMesh.AllJoints;

		for (var i = 0; i < this.AnimatedDummySceneNodes.length; ++i) {
			var rEntry = this.AnimatedDummySceneNodes[i];

			if (rEntry.JointIdx >= 0 && rEntry.JointIdx < joints.length && rEntry.Node != null) {
				var pJoint = joints[rEntry.JointIdx];
				if (pJoint) {
					rEntry.Node.RelativeTransformationMatrix = pJoint.GlobalAnimatedMatrix.clone();
				}
			}
		}
	}
	
	/**
	 * replaces all referenced ids of referenced nodes when the referenced node was a child and was cloned
	 * @public
	 */
	replaceAllReferencedNodes(nodeChildOld, nodeChildNew) {
		for (var i = 0; i < this.AnimatedDummySceneNodes.length; ++i) {
			if (this.AnimatedDummySceneNodes[i].Node == nodeChildOld) {
				if (nodeChildNew && nodeChildNew.getType() == 'dummytrans')
					this.AnimatedDummySceneNodes[i].Node = nodeChildNew;

				else
					this.AnimatedDummySceneNodes[i].Node = null;
			}
		}
	}
}
/**
 * Structure storing data about scene nodes attached to a joint of this item
 * @public
 */
class SAnimatedDummySceneNodeChild {
	constructor() {
		this.Node = null; // child node to be animated by joint
		this.JointIdx = -1; // index of the joint to be used
		this.NodeIDToLink = -1; // only used for linking the children after the serialization process
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


// -------------------------------------------------------------------
// Hotspot scene node: this one is actually not used anymore
// -------------------------------------------------------------------
/**
 * @constructor
 * @extends CL3D.SceneNode
 */
class HotspotSceneNode extends SceneNode {
	constructor(engine, scene) {
		super();

		this.Type = 1953526632;
		this.Box = new Box3d();
		this.Width = 0;
		this.Height = 0;
	}
}
// -------------------------------------------------------------------
// Dummy scene node
// -------------------------------------------------------------------
/**
 * @constructor
 * @extends CL3D.SceneNode
 * @public
 */
class DummyTransformationSceneNode extends SceneNode {
	constructor() {
		super();

		this.init();

		this.Type = 1954112614;
		this.Box = new Box3d();
		this.RelativeTransformationMatrix = new Matrix4();
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new DummyTransformationSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.Box)
			c.Box = this.Box.clone();

		if (this.RelativeTransformationMatrix)
			c.RelativeTransformationMatrix = this.RelativeTransformationMatrix;

		return c;
	}

	/**
	 * @public
	 */
	getRelativeTransformation() {
		return this.RelativeTransformationMatrix;
	}

	/**
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'dummytrans';
	}
}
// -------------------------------------------------------------------
// Terrain scene node: Also does basically nothing, 
// mostly everything is set up in the scene graph by the editor
// -------------------------------------------------------------------

/**
 * @constructor
 * @extends CL3D.SceneNode
 */
class TerrainSceneNode extends SceneNode {
	constructor() {
		super();

		this.init();
		this.Box = new Box3d();
	}

	getType() {
		return 'terrain';
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A class holding the data of a point light. This is used by the {@link LightSceneNode} to send data to the renderer.
 * @public
 * @constructor
 * @class A class holding the data of a point light.
 */
class Light {
	/**
	 * 3D Position of the light
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	Position = null;

	/**
	 * Color of the light
	 * @public
	 * @type {CL3D.ColorF}
	 */
	Color = null;

	/**
	 * Attenuation of the light. Default is 1 / 100.
	 * @public
	 * @type Number
	 */
	Attenuation = null;

	/**
	 * Radius of the light. Currently ignored.
	 * @public
	 * @type Number
	 */
	Radius = null;

	/**
	 * Direction of the light. Only used if this is a directional light
	 * @public
	 * @type {CL3D.Vect3d}
	 */
	Direction = null;

	/**
	 * Set this to true to make this a directional light
	 * @public
	 * @type Boolean
	 */
	IsDirectional = false;

	constructor() {
		this.Position = new Vect3d(0, 0, 0);
		this.Color = new ColorF();

		this.Radius = 100;
		this.Attenuation = 1 / 100.0;
		this.Direction = null;
		this.IsDirectional = false;
	}

	/**
	 * Creates an exact copy of this light data
	 * @public
	 */
	clone() {
		var r = new Light();
		r.Position = this.Position.clone();
		r.Color = this.Color.clone();
		r.Radius = this.Radius;
		r.Attenuation = this.Attenuation;
		r.IsDirectional = this.IsDirectional;
		r.Direction = this.Direction != null ? this.Direction.clone() : null;
		return r;
	}
}
/**
 * A class rendering a point light.
 * Lighting works like this: Simply add a light scene node to the scene (as shown in the example below), and
 * set the 'Lighting' flag of the material of the scene nodes you want to be lighted to 'true'. That's it,
 * your scene will now by lit by dynamic light. For changing how the light looks like, change the LightData
 * structure of the light, it holds the attenuation, position, and color of the light. 
 * Example showing how to add this to the current scene:
 * @constructor
 * @extends CL3D.SceneNode 
 * @class class rendering a point light.
 * @example
 * // add a cube to the scene
 * var lightnode = new CL3D.LightSceneNode();
 * scene.getRootSceneNode().addChild(lightnode);
 *
 */
class LightSceneNode extends SceneNode {
	/**
	 * Radius, Position, Color and Attenuation of the light
	 * @public
	 * @type CL3D.Light
	 */
	LightData = null;

	constructor(size) {
		super();

		this.Type = 1751608422;
		this.LightData = new Light();
		this.Box = new Box3d();
		this.init();
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns 'light' for the light scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'light';
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new LightSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		c.LightData = this.LightData.clone();
		c.Box = this.Box.clone();

		return c;
	}

	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible)
			mgr.registerNodeForRendering(this, Scene.RENDER_MODE_LIGHTS);

		SceneNode.prototype.OnRegisterSceneNode.call(this, mgr); // register children 

		this.LightData.Position = this.getAbsolutePosition();
	}

	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return this.Box;
	}

	/**
	 * @public
	 */
	render(renderer) {
		if (this.LightData.IsDirectional)
			renderer.setDirectionalLight(this.LightData);

		else
			renderer.addDynamicLight(this.LightData);
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A simple node derived from Mobile2DInputSceneNode to emulate keyboard input for games on touchscreen devices like phones, tablets and similar 
 * @class Scene Node which draws a 2d mobile input control
 * @constructor
 * @extends CL3D.SceneNode
 */
class Mobile2DInputSceneNode extends SceneNode {
	constructor(engine, scene) {
		super();

		Overlay2DSceneNode.call(this, engine);

		this.Type = 1835283046;
		this.CursorTex = null;
		this.CursorPosX = 0;
		this.CursorPosY = 0;
		this.MouseOverButton = false;

		this.RealWidth = 0;
		this.RealHeight = 0;
		this.RealPosX = 0;
		this.RealPosY = 0;

		this.InputMode = 0;
		this.KeyCode = 0;

		this.addAnimator(new AnimatorMobileInput(engine, scene, this));
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns 'mobile2dinput' for the scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'mobile2dinput';
	}

	/**
	 * @public
	 */
	blocksCameraInput() {
		return true;
	}

	/**
	 * @public
	 */
	render(renderer) {
		var rctTarget = this.getScreenCoordinatesRect(true, renderer);

		// test for hovering
		var bHovering = false;

		if (this.engine != null) {
			var mposx = this.engine.getMouseX();
			var mposy = this.engine.getMouseY();

			this.MouseOverButton = (rctTarget.x <= mposx && rctTarget.y <= mposy &&
				rctTarget.x + rctTarget.w >= mposx &&
				rctTarget.y + rctTarget.h >= mposy);

			// is point inside rect
			if (this.AnimateOnHover)
				bHovering = this.MouseOverButton;
		}

		// draw background
		if (bHovering && this.OnHoverSetBackgroundColor)
			renderer.draw2DRectangle(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, this.HoverBackgroundColor, true);

		else if (this.ShowBackGround)
			renderer.draw2DRectangle(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, this.BackGroundColor, true);

		// draw texture
		var tex = this.Texture;
		if (bHovering && this.TextureHover && this.OnHoverDrawTexture)
			tex = this.TextureHover;

		var usedWidth = 0;
		var usedHeight = 0;

		if (tex != null && tex.isLoaded()) {
			var w = tex.getWidth();
			var h = tex.getHeight();

			if (!this.RetainAspectRatio) {
				// ignore aspect ratio
				renderer.draw2DImage(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, tex, true);

				usedWidth = rctTarget.w;
				usedHeight = rctTarget.h;
			}

			else {
				//rctTarget = this.getScreenCoordinatesRect(false, renderer);
				if (w && h && rctTarget.h && rctTarget.w) {
					var aspectRatio = h / w;
					var width = rctTarget.w;
					var height = width * aspectRatio;

					if (height > rctTarget.h) {
						// height to big with this scale, scale by height then
						var fact = rctTarget.h / height;
						width *= fact;
						height *= fact;
					}

					rctTarget.w = width;
					rctTarget.h = height;

					renderer.draw2DImage(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, tex, true);

					usedWidth = rctTarget.w;
					usedHeight = rctTarget.h;
				}
			}
		}

		this.RealWidth = usedWidth;
		this.RealHeight = usedHeight;
		this.RealPosX = rctTarget.x;
		this.RealPosY = rctTarget.y;

		if (this.InputMode == 0 &&
			this.CursorTex != null &&
			this.CursorTex.isLoaded() &&
			tex != null && tex.isLoaded()) {
			// map square coordinates to the visual circle
			var xCircle = this.CursorPosX * Math.sqrt(1.0 - 0.5 * (this.CursorPosY * this.CursorPosY));
			var yCircle = this.CursorPosY * Math.sqrt(1.0 - 0.5 * (this.CursorPosX * this.CursorPosX));

			// move from -1..1 to 0..1 range
			xCircle = (xCircle + 1.0) * 0.5;
			yCircle = (yCircle + 1.0) * 0.5;

			var sizeDeltaX = 1.0 / (tex.getWidth() / Number(this.CursorTex.getWidth()));
			var sizeDeltaY = 1.0 / (tex.getHeight() / Number(this.CursorTex.getHeight()));
			var cursorImgWidth = sizeDeltaX * usedWidth;
			var cursorImgHeight = sizeDeltaY * usedHeight;
			var xPos = rctTarget.x + (xCircle * (usedWidth)) - (cursorImgWidth * 0.5);
			var yPos = rctTarget.y + (yCircle * (usedHeight)) - (cursorImgHeight * 0.5);

			renderer.draw2DImage(xPos, yPos, cursorImgWidth, cursorImgHeight, this.CursorTex, true);
		}
	}
}
// ----------------------------------------------------------------------------------------------
// Animator for moving cursor position of Mobile2DInputSceneNode
// ----------------------------------------------------------------------------------------------
// moved to animatorscoppercubeprivate.js since it is needing the animator definition first

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A simple 2d overlay scene node which draws a 2d area over the 3d scene. Useful for displaying text, images and similar.
 * @class Scene Node which draws a 2d overlay with color, image and/or text
 * @constructor
 * @extends CL3D.SceneNode
 * @example
 * // how to add a 2D overlay with text
 * var overlay = new CL3D.Overlay2DSceneNode();
 * scene.getRootSceneNode().addChild(overlay);
 *
 * overlay.set2DPosition(10,10,200,70);
 * overlay.setText('Hello World!');
 * overlay.FontName = "12;default;arial;normal;bold;true";
 * overlay.TextColor = CL3D.createColor(255, 150, 232, 249);
 */
class Overlay2DSceneNode extends SceneNode {
	/**
	 * Font string to be used when drawing text. It uses the following format:
	 * PointSize;Family(Default|Decorative|Roman|Script|Swiss|Modern);FaceName(Arial etc);Style(Normal|Slant|Italic);Weight(Normal|Light|Bold);Underlined(True|false)
	 * Example: "12;default;arial;normal;bold;true"
	 * @public
	 * @type String.
	 * @default ""
	 */
	FontName = "";

	/**
	 * Text color to be used. Use for example CL3D.createColor(255, 150, 232, 249); to create a nice color.
	 * @public
	 * @type Number
	 * @default 0
	 */
	TextColor = 0;

	/**
	 * Text alignment to be used. Use 0 for left align, 1 for center and 2 for multiline with word wrap.
	 * @public
	 * @type Number
	 * @default 0
	 */
	TextAlignment = 1;

	constructor(engine) {
		super();

		this.init();

		this.Type = 1868837478;

		this.engine = engine;

		/*private static const ETA_TOP_LEFT:int					= 0;
		private static const ETA_CENTER:int						= 1;
		private static const ETA_MULTILINE:int					= 2;*/
		this.Box = new Box3d();

		// size and position
		this.TextureWidth = 0.5;
		this.TextureHeight = 0.5;

		this.PosAbsoluteX = 100;
		this.PosAbsoluteY = 100;
		this.SizeAbsoluteWidth = 50;
		this.SizeAbsoluteHeight = 50;

		this.PosRelativeX = 0.5;
		this.PosRelativeY = 0.5;
		this.SizeRelativeWidth = 1.0 / 6.0;
		this.SizeRelativeHeight = 1.0 / 6.0;

		this.SizeModeIsAbsolute = true;

		// what it looks like
		this.ShowBackGround = true; //:Boolean;
		this.BackGroundColor = 0; //:int;

		this.Texture = null; //:Texture;
		this.TextureHover = null; // :Texture;
		this.TextureMask = null; // TODO: mask
		this.RetainAspectRatio = true; // :Boolean;
		this.BlurImage = false;

		this.DrawText = false; //:Boolean;
		this.TextAlignment = 1; //:int;
		this.Text = ""; //:String;
		this.FontName = ""; //:String;
		this.TextColor = 0; //:int;

		this.AnimateOnHover = false; //:Boolean;
		this.OnHoverSetFontColor = false; //:Boolean;
		this.HoverFontColor = 0; //:int;
		this.OnHoverSetBackgroundColor = false; //:Boolean;
		this.HoverBackgroundColor = 0; //:int;
		this.OnHoverDrawTexture = false; //:Boolean;



		// runtime
		this.TextTexture = null;
		this.TextHoverTexture = null;
		this.CreatedTextTextureText = "";
		this.CreatedTextTextureFontName = "";

		this.CurrentFontPixelHeight = 0;
		//this.CreatedTextColor = 0;
		//this.CreatedTextHoverColor = 0;
	}

	/**
	 * @public
	 */
	blocksCameraInput() {
		return false;
	}

	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return this.Box;
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns '2doverlay' for the scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return '2doverlay';
	}

	/**
	 * Sets the position of the overlay in pixels
	 * @public
	 * @param x {Number} x position of the overlay in pixels
	 * @param y {Number} y position of the overlay in pixels
	 * @param width {Number} width of the overlay in pixels
	 * @param height {Number} height of the overlay in pixels
	 */
	set2DPosition(x, y, width, height) {
		this.PosAbsoluteX = x;
		this.PosAbsoluteY = y;
		this.SizeAbsoluteWidth = width;
		this.SizeAbsoluteHeight = height;

		this.SizeModeIsAbsolute = true;
	}

	/**
	 * Sets if the overlay scene node should show a colored background
	 * @public
	 * @param showBackground {Boolean} true to show the backgroundcolor, false if not
	 * @param color {Number} a color created with CL3D.createColor defining the color to show
	 */
	setShowBackgroundColor(showBackground, color) {
		this.ShowBackGround = showBackground;
		if (this.ShowBackGround)
			this.BackGroundColor = color;
	}

	/**
	 * Sets if the overlay scene node should show a image
	 * @public
	 * @param {CL3D.Texture} tex a {@link Texture} to show as image on the 2d overlay
	 */
	setShowImage(tex) {
		this.Texture = tex;
	}

	/**
	 * Sets the text which should be shown on the overlay 2D node.
	 * Note that you can also set a text color using the .TextColor property and a
	 * font using the FontName property.
	 * @public
	 * @param text {String}
	 */
	setText(text) {
		this.Text = text;
		this.DrawText = this.Text != null && this.Text != "";

		if (this.FontName == "")
			this.FontName = "12;default;arial;normal;bold;true";
	}

	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible) {
			mgr.registerNodeForRendering(this, Scene.RENDER_MODE_2DOVERLAY);
			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}

	/**
	 * @public
	 */
	render(renderer) {
		// TODO: ScreenShot
		var rctTarget = this.getScreenCoordinatesRect(true, renderer);

		// test for hovering
		var bHovering = false;

		if (this.engine != null && this.AnimateOnHover) {
			var mposx = this.engine.getMouseX() * this.engine.DPR;
			var mposy = this.engine.getMouseY() * this.engine.DPR;

			// is point inside rect
			bHovering = (rctTarget.x <= mposx && rctTarget.y <= mposy &&
				rctTarget.x + rctTarget.w >= mposx &&
				rctTarget.y + rctTarget.h >= mposy);
		}

		// draw background
		if (bHovering && this.OnHoverSetBackgroundColor)
			renderer.draw2DRectangle(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, this.HoverBackgroundColor, true);

		else if (this.ShowBackGround)
			renderer.draw2DRectangle(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, this.BackGroundColor, true);

		//renderer.draw2DRectangle(100,100,100,100, CL3D.createColor(100, 255, 0, 0), true); // TODO: remove
		// draw texture
		var tex = this.Texture;
		if (bHovering && this.TextureHover && this.OnHoverDrawTexture)
			tex = this.TextureHover;

		if (tex != null && tex.isLoaded()) {
			var w = tex.getWidth();
			var h = tex.getHeight();

			if (!this.RetainAspectRatio) {
				// ignore aspect ratio
				renderer.draw2DImage(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, tex, true, null, null, null, !this.BlurImage);
			}

			else {
				//rctTarget = this.getScreenCoordinatesRect(false, renderer);
				if (w && h && rctTarget.h && rctTarget.w) {
					var aspectRatio = h / w;
					var width = rctTarget.w;
					var height = width * aspectRatio;

					if (height > rctTarget.h) {
						// height to big with this scale, scale by height then
						var fact = rctTarget.h / height;
						width *= fact;
						height *= fact;
					}

					rctTarget.w = width;
					rctTarget.h = height;

					this.TextureWidth = width / rctTarget.sw;
					this.TextureHeight = height / rctTarget.sh;

					renderer.draw2DImage(rctTarget.x, rctTarget.y, rctTarget.w, rctTarget.h, tex, true, null, null, null, !this.BlurImage);
				}
			}
		}

		// draw text
		if (this.DrawText && this.FontName && this.Text != "") {
			this.createNewTextTexturesIfNecessary(renderer, rctTarget.w);

			var textureToUse = this.TextTexture;
			var colorToUse = this.TextColor;

			if (bHovering) {
				if (this.TextHoverTexture)
					textureToUse = this.TextHoverTexture;

				colorToUse = this.HoverFontColor;
			}

			if (textureToUse) {
				var fw = textureToUse.OriginalWidth;
				var fh = textureToUse.OriginalHeight;

				if (this.TextAlignment == 1) // center
				{
					renderer.draw2DFontImage(rctTarget.x + ((rctTarget.w - fw) / 2),
						rctTarget.y + ((rctTarget.h - fh) / 2),
						fw, fh, textureToUse, colorToUse);
				}

				else {
					// top left
					renderer.draw2DFontImage(rctTarget.x, rctTarget.y, fw, fh, textureToUse, colorToUse);
				}

			}
		}

		else
			this.destroyTextTextures(renderer);
	}

	/**
	 * @public
	 */
	destroyTextTextures(renderer) {
		renderer.deleteTexture(this.TextTexture);
		renderer.deleteTexture(this.TextHoverTexture);
		this.TextTexture = null;
		this.TextHoverTexture = null;
	}

	/**
	 * @public
	 */
	createNewTextTexturesIfNecessary(renderer, forcedwidth) {
		var needsDifferentHoverTexture = false;
		var createNewTexture = this.TextTexture == null || (needsDifferentHoverTexture );

		if (!createNewTexture) {
			// also check for text content
			createNewTexture = this.CreatedTextTextureText != this.Text ||
				this.CreatedTextTextureFontName != this.FontName;
			//this.TextColor != this.CreatedTextColor ||
			//this.HoverFontColor != this.CreatedTextHoverColor;
		}

		if (!createNewTexture)
			return;

		// delete old textures
		this.destroyTextTextures(renderer);

		// create new CL3D.Textures
		var canvas = createCanvas();
		if (canvas == null)
			return;

		canvas.width = 1;
		canvas.height = 1;

		var ctx = null;

		try
		{
			ctx = canvas.getContext("2d");
			if (ctx == null)
				return;
		}
		catch (err) {
			return;
		}
		var fontStr = this.parseCopperCubeFontString(this.FontName); // fontSize + "pt " + "Arial";
		ctx.font = fontStr;
		// we could also draw the text with alpha into the texture, unfortunately, firefox doesn't like this
		// and creates random green pixels at the border at the font. So we draw it with white onto
		// black and factor the color in the shader
		if (this.TextAlignment == 2) // multiline
		{
			// multiline text
			var BrokenText = new Array();
			this.breakText(BrokenText, forcedwidth, this.Text, ctx);

			var lineheight = this.CurrentFontPixelHeight * 1.2;
			var lineCount = BrokenText.length;
			var y = 0;

			canvas.width = forcedwidth;
			canvas.height = Math.max(1, lineCount * lineheight);

			ctx.fillStyle = "rgba(0, 0, 0, 1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.textBaseline = "top";
			ctx.font = fontStr;

			for (var i = 0; i < BrokenText.length; ++i) {
				ctx.fillText(BrokenText[i], 0, y);
				y += lineheight;
			}
		}

		else {
			// single line
			var dim = ctx.measureText(this.Text);
			canvas.width = dim.width;
			canvas.height = this.CurrentFontPixelHeight * 1.2;

			// black background
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.textBaseline = "top";
			ctx.font = fontStr;
			ctx.fillText(this.Text, 0, 0);
		}

		var tex = renderer.createTextureFrom2DCanvas(canvas, true);
		this.TextTexture = tex;
		this.TextHoverTexture = tex;

		this.CreatedTextTextureText = this.Text;
		this.CreatedTextTextureFontName = this.FontName;
	}
	/**
	 * @public
	 * Breaks the text into multiple lines for text rendering
	 */
	breakText(BrokenText, rectWidth, text, ctx) {
		var line = "";
		var word = "";
		var whitespace = "";
		var size = text.length;
		var length = 0;
		var elWidth = rectWidth - 6;
		var c = 'c';

		for (var i = 0; i < size; ++i) {
			c = text.charAt(i);
			var lineBreak = false;

			if (c == '\r') // Mac or Windows breaks
			{
				lineBreak = true;
				c = ' ';
				if (text.charAt(i + 1) == '\n') // Windows breaks
				{
					text = text.substr(0, i).concat(text.substr(i + 2)); // == text.erase(i+1);
					--size;
				}
			}
			else if (c == '\n') // Unix breaks
			{
				lineBreak = true;
				c = ' ';
			}

			if (c == ' ' || c == 0 || i == (size - 1)) {
				if (word.length) {
					// here comes the next whitespace, look if
					// we can break the last word to the next line.
					var whitelgth = ctx.measureText(whitespace).width;
					var worldlgth = ctx.measureText(word).width;

					if (length + worldlgth + whitelgth > elWidth) {
						// break to next line
						length = worldlgth;
						BrokenText.push(line);

						i - word.length;
						line = word;
					}

					else {
						// add word to line
						line = line.concat(whitespace);
						line = line.concat(word);
						length += whitelgth + worldlgth;
					}

					word = "";
					whitespace = "";
				}

				whitespace = whitespace.concat(c);

				// compute line break
				if (lineBreak) {
					line = line.concat(whitespace);
					line = line.concat(word);

					BrokenText.push(line);
					line = "";
					word = "";
					whitespace = "";
					length = 0;
				}
			}

			else {
				// yippee this is a word..
				word = word.concat(c);
			}
		}

		line = line.concat(whitespace);
		line = line.concat(word);
		BrokenText.push(line);
	}

	/**
	 * @public
	 */
	getMaterialCount() {
		return 0;
	}

	/**
	 * @public
	 * Calculates 2d screen position from a 3d position, including displacement from view ports drawn in editors
	 * Returns rectangle object with x, y, w, and h
	 */
	getScreenCoordinatesRect(adjustForViewPortRendering, renderer) {
		var w = renderer.getWidth();
		var h = renderer.getHeight();
		//core::dimension2d<s32> screensize = driver->getScreenSize();
		var retobj = new Object();

		retobj.sw = w;
		retobj.sh = h;

		if (this.SizeModeIsAbsolute) {
			// use absolute coordinates
			retobj.x = this.PosAbsoluteX;
			retobj.y = this.PosAbsoluteY;
			retobj.w = this.SizeAbsoluteWidth;
			retobj.h = this.SizeAbsoluteHeight;
		}

		else {
			// use relative coordinates
			retobj.x = this.PosRelativeX * w;
			retobj.y = this.PosRelativeY * h;
			retobj.w = this.SizeRelativeWidth * w;
			retobj.h = this.SizeRelativeHeight * h;
		}

		return retobj;
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new Overlay2DSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		c.PosAbsoluteX = this.PosAbsoluteX;
		c.PosAbsoluteY = this.PosAbsoluteY;
		c.SizeAbsoluteWidth = this.SizeAbsoluteWidth;
		c.SizeAbsoluteHeight = this.SizeAbsoluteHeight;

		c.PosRelativeX = this.PosRelativeX;
		c.PosRelativeY = this.PosRelativeY;
		c.SizeRelativeWidth = this.SizeRelativeWidth;
		c.SizeRelativeHeight = this.SizeRelativeHeight;

		c.SizeModeIsAbsolute = this.SizeModeIsAbsolute;

		// other properties
		c.ShowBackGround = this.ShowBackGround;
		c.BackGroundColor = this.BackGroundColor;

		c.Texture = this.Texture;
		c.TextureHover = this.TextureHover;
		c.RetainAspectRatio = this.RetainAspectRatio;

		c.DrawText = this.DrawText;
		c.TextAlignment = this.TextAlignment;
		c.Text = this.Text;
		c.FontName = this.FontName;
		c.TextColor = this.TextColor;

		c.AnimateOnHover = this.AnimateOnHover;
		c.OnHoverSetFontColor = this.OnHoverSetFontColor;
		c.HoverFontColor = this.HoverFontColor;
		c.OnHoverSetBackgroundColor = this.OnHoverSetBackgroundColor;
		c.HoverBackgroundColor = this.HoverBackgroundColor;
		c.OnHoverDrawTexture = this.OnHoverDrawTexture;

		return c;
	}

	/**
	 * @public
	 */
	parseCopperCubeFontString(fontStr) {
		// we only need to return something like
		// italic 12pt Arial;
		// input format:
		// example format: #fnt_23;default;arial;normal;bold;true
		// with parameters:
		//Point Size
		//Family (Default|Decorative|Roman|Script|Swiss|Modern)
		//Face Name (Arial etc)
		//Style (Normal|Slant|Italic)
		//Weight (Normal|Light|Bold)
		//Underlined (True|False)
		var outSize = 12;
		var outName = "Arial";
		var outItalic = false;
		var outBold = false;

		if (fontStr.indexOf('#fnt_') == 0)
			fontStr = fontStr.substr(5);

		var res = fontStr.split(';');
		for (var i = 0; i < res.length; ++i) {
			var value = res[i];
			var valuelwr = value.toLowerCase();

			if (i == 0) // point size
			{
				var ptSize = parseInt(valuelwr);
				outSize = ptSize;
			}

			else if (i == 2) // face name
				outName = value;

			else if (i == 3) // style
			{
				if (valuelwr.indexOf('italic') != -1)
					outItalic = true;
			}

			else if (i == 4) // weight
			{
				if (valuelwr.indexOf('bold') != -1)
					outBold = true;
			}
		}

		// all data extracted, build style string
		// example: "italic 12pt Arial"
		var ret = "";
		if (outItalic)
			ret += "italic ";
		if (outBold)
			ret += "bold ";

		//ret += outSize + "pt ";
		// in 96dpi: (we assume this for the display here)
		// points = pixels * 72 / 96
		// pixels = (points * 96) / 72
		this.CurrentFontPixelHeight = (outSize * 96 / 72);
		ret += this.CurrentFontPixelHeight + "px ";

		ret += outName;

		return ret;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A particle system is a simple way to simulate things like fire, smoke, rain, etc in your 3d scene.
  * @class A particle system is a simple way to simulate things like fire, smoke, rain, etc in your 3d scene.
 * @constructor
 * @extends CL3D.SceneNode
 * @example 
 * // Example showing how to create a particle system:
 * // create the 3d engine
 * var engine = new CL3D.CopperLicht(document.getElementById('3darea'));
 * 
 * if (!engine.initRenderer())
 * 	return; // this browser doesn't support WebGL
 * 	
 * // add a new 3d scene
 * 
 * var scene = new CL3D.Scene();
 * engine.addScene(scene);
 * 
 * scene.setBackgroundColor(CL3D.createColor(1, 0, 0, 64));
 * 
 * // add a user controlled camera with a first person shooter style camera controller
 * var cam = new CL3D.CameraSceneNode();
 * cam.Pos.X = 50;
 * cam.Pos.Y = 20;
 * 
 * var animator = new CL3D.AnimatorCameraFPS(cam, engine);										
 * cam.addAnimator(animator);										
 * animator.lookAt(new CL3D.Vect3d(0,20,0));			
 * 
 * scene.getRootSceneNode().addChild(cam);
 * scene.setActiveCamera(cam);		
 * 
 * // add a particle system to the scene
 * var psystem = new CL3D.ParticleSystemSceneNode();
 * scene.getRootSceneNode().addChild(psystem);
 * 
 * psystem.Direction = new CL3D.Vect3d(0, 0.03, 0);
 * psystem.MaxAngleDegrees = 20;
 * 
 * // set material and texture of the partcle system:
 * psystem.getMaterial(0).Tex1 = engine.getTextureManager().getTexture("crate_wood.jpg", true);
 * psystem.getMaterial(0).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
*/
class ParticleSystemSceneNode extends SceneNode {
	/**
	 * Default direction the particles will be emitted to.
	 * @public
	 * @type CL3D.Vect3d()
	 * @default (0, 0.03, 0)
	 */
	Direction = null;
				
	/**
	 * Maximal amount of degrees the emitting direction is ignored
	 * @public
	 * @type Number
	 * @default 10
	 */
	MaxAngleDegrees = 10;

	/**
	 * Area the particles are emitted in. By default, this area has a size of 0, causing this to be a point emitter.
	 * @public
	 * @type CL3D.Vect3d()
	 * @default (0, 0, 0)
	 */
	EmittArea = null;

	/**
	 * Minimal life time of a particle in milli seconds
	 * @public
	 * @type Number
	 * @default 1000
	 */
	MinLifeTime = 1000;

	/**
	 * Maximal life time of a particle in milli seconds
	 * @public
	 * @type Number
	 * @default 2000
	 */
	MaxLifeTime = 2000;

	/**
	 * Maximal amounts of particles in the system
	 * @public
	 * @type Number
	 * @default 200
	 */
	MaxParticles = 200;

	/**
	 * Minimal amounts of particles emitted per second
	 * @public
	 * @type Number
	 * @default 10
	 */
	MinParticlesPerSecond = 10;

	/**
	 * Maximal amounts of particles emitted per second
	 * @public
	 * @type Number
	 * @default 20
	 */
	MaxParticlesPerSecond = 20;

	/**
	 * Minimal color of a particle when starting. Set to 0xffffffff to make it white.
	 * @public
	 * @type Number
	 * @default 0xff000000
	 */
	MinStartColor = 0xff000000;

	/**
	 * Maximal color of a particle when starting. Set to 0xffffffff to make it white.
	 * @public
	 * @type Number
	 * @default 0xff000000
	 */
	MaxStartColor = 0xffffffff;

	/**
	 * Minimal width of a particle when starting
	 * @public
	 * @type Number
	 * @default 5
	 */
	MinStartSizeX = 5;

	/**
	 * Minimal height of a particle when starting
	 * @public
	 * @type Number
	 * @default 5
	 */
	MinStartSizeY = 5;

	/**
	 * Maximal width of a particle when starting
	 * @public
	 * @type Number
	 * @default 7
	 */
	MaxStartSizeX = 7;

	/**
	 * Maximal height of a particle when starting
	 * @public
	 * @type Number
	 * @default 5
	 */
	MaxStartSizeY = 7;

	/**
	 * Setting if the fade out affector is active, i.e. if particles should be faded out at the end of their lifetime
	 * @public
	 * @type Boolean
	 * @default false
	 */
	FadeOutAffector = false;

	/**
	 * If FadeOutAffector is true, this defines the time in milli seconds used for the fade out effect.
	 * @public
	 * @type Number
	 * @default 500
	 */
	FadeOutTime = 500;

	/**
	 * If FadeOutAffector is true, this defines the target color of the fade out effect.
	 * @public
	 * @type Number
	 * @default 0x00000000
	 */
	FadeTargetColor = 0x00000000;

	/**
	 * Setting if the gravity affector is active, i.e. if should be affected by gravity during their lifetime.
	 * @public
	 * @type Boolean
	 * @default false
	 */
	GravityAffector = false;

	/**
	 * If GravityAffector is true, this defines the time in milli seconds after the gravity will have affect
	 * @public
	 * @type Number
	 * @default 500
	 */
	GravityAffectingTime = 500;

	/**
	 * If GravityAffector is true, this will define the gravity vector. A useful value would be (0,-0.03,0), for example.
	 * @public
	 * @type {CL3D.Vect3d}
	 * @default null
	 */
	Gravity = null;

	/**
	 * Setting if the scale affector is active, i.e. if should be scaled their lifetime.
	 * @public
	 * @type Boolean
	 * @default false
	 */
	ScaleAffector = false;

	/**
	 * If ScaleAffector is true, this defines the target scale X value.
	 * @public
	 * @type Number
	 * @default 20
	 */
	ScaleToX = 20;

	/**
	 * If ScaleAffector is true, this defines the target scale Y value.
	 * @public
	 * @type Number
	 * @default 20
	 */
	ScaleToY = 20;

	/**
	 * Option to disable fog for particle system rendering
	 * @public
	 * @type Number
	 * @default 10
	 */
	DisableFog = false;

	constructor() {
		super();

		this.init();

		this.Type = 1668575334;
		this.Box = new Box3d();
		this.Buffer = new MeshBuffer();

		this.Direction = new Vect3d(0, -0.03, 0);
		this.EmittArea = new Vect3d(0, 0, 0);

		// runtime values
		this.LastEmitTime = 0;
		this.TimeSinceLastEmitting = 0;
		this.Particles = new Array();
	}
	
	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new ParticleSystemSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.Box)
			c.Box = this.Box.clone();

		c.Direction = this.Direction.clone();
		c.MaxAngleDegrees = this.MaxAngleDegrees;
		c.EmittArea = this.EmittArea.clone();
		c.MinLifeTime = this.MinLifeTime;
		c.MaxLifeTime = this.MaxLifeTime;
		c.MaxParticles = this.MaxParticles;
		c.MinParticlesPerSecond = this.MinParticlesPerSecond;
		c.MaxParticlesPerSecond = this.MaxParticlesPerSecond;
		c.MinStartColor = this.MinStartColor;
		c.MaxStartColor = this.MaxStartColor;
		c.MinStartSizeX = this.MinStartSizeX;
		c.MinStartSizeY = this.MinStartSizeY;
		c.MaxStartSizeX = this.MaxStartSizeX;
		c.MaxStartSizeY = this.MaxStartSizeY;
		c.FadeOutAffector = true;
		c.FadeOutTime = this.FadeOutTime;
		c.FadeTargetColor = this.FadeTargetColor;
		c.GravityAffector = this.GravityAffector;
		c.GravityAffectingTime = this.GravityAffectingTime;
		c.Gravity = this.Gravity;
		c.ScaleAffector = this.ScaleAffector;
		c.ScaleToX = this.ScaleToX;
		c.ScaleToY = this.ScaleToY;
		c.Buffer.Mat = this.Buffer.Mat.clone();

		return c;
	}
	
	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return this.Box;
	}
	
	/**
	 * Returns the type string of the scene node.
	 * Returns 'billboard' for the mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'particlesystem';
	}
	
	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible) {
			mgr.registerNodeForRendering(this, this.Buffer.Mat.isTransparent() ? Scene.RENDER_MODE_TRANSPARENT : Scene.RENDER_MODE_DEFAULT);
			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}

	/**
	 * @public
	 */
	OnRegisterSceneNode = function(mgr) {
		if (this.Visible) {				
			if (this.Particles.length != 0)
				mgr.registerNodeForRendering(this, this.Buffer.Mat.isTransparent() ? Scene.RENDER_MODE_TRANSPARENT : Scene.RENDER_MODE_DEFAULT);
			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr); 
		}
	}

	/**
	 * @public
	 */
	getMaterialCount() {
		return 1;
	}
	
	/**
	 * @public
	 */
	getMaterial(i) {
		return this.Buffer.Mat;
	}
	
	/**
	 * @public
	 */
	OnAnimate(mgr, timeMs) {
		var framechanged = false;

		if (this.Visible)
			framechanged = this.doParticleSystem(timeMs);

		return SceneNode.prototype.OnAnimate.call(this, mgr, timeMs) || framechanged;
	}
	
	/**
	 * @public
	 */
	render(renderer) {
		var cam = this.scene.getActiveCamera();
		if (!cam)
			return;

		if (this.Particles.length == 0)
			return;

		var oldFog = renderer.FogEnabled;
		if (this.DisableFog)
			renderer.FogEnabled = false;

		var bShadowMapEnabled = renderer.isShadowMapEnabled();
		renderer.quicklyEnableShadowMap(false);


		// reallocate arrays, if they are too small
		this.reallocateBuffers();

		var m = renderer.getView();
		var view = new Vect3d(-m.m02, -m.m06, -m.m10);

		// create particle vertex data
		var idx = 0;
		var v = null;

		for (var i = 0; i < this.Particles.length; ++i) {
			var particle = this.Particles[i];

			var f = 0.5 * particle.sizeX;
			var horizontal = new Vect3d(m.m00 * f, m.m04 * f, m.m08 * f);

			f = -0.5 * particle.sizeY;
			var vertical = new Vect3d(m.m01 * f, m.m05 * f, m.m09 * f);

			var clr = createColor(getAlpha(particle.color), getRed(particle.color) / 4.0, getGreen(particle.color) / 4.0, getBlue(particle.color) / 4.0);

			v = this.Buffer.Vertices[0 + idx];
			v.Pos = particle.pos.add(horizontal).add(vertical);
			v.Color = clr;
			v.Normal = view; // clone?

			v = this.Buffer.Vertices[1 + idx];
			v.Pos = particle.pos.add(horizontal).substract(vertical);
			v.Color = clr;
			v.Normal = view; // clone?

			v = this.Buffer.Vertices[2 + idx];
			v.Pos = particle.pos.substract(horizontal).substract(vertical);
			v.Color = clr;
			v.Normal = view; // clone?

			v = this.Buffer.Vertices[3 + idx];
			v.Pos = particle.pos.substract(horizontal).add(vertical);
			v.Color = clr;
			v.Normal = view; // clone?

			idx += 4;
		}

		// render all
		var mat = new Matrix4(true);

		//if (!this.ParticlesAreGlobal)
		//mat.setTranslation(this.AbsoluteTransformation.getTranslation());
		renderer.setWorld(mat);

		this.Buffer.update(false, true); // TODO performance: we could also tell the engine only to update the data if the size hasn't changed
		renderer.setMaterial(this.Buffer.Mat);
		renderer.drawMeshBuffer(this.Buffer, this.Particles.length * 2 * 3);

		if (this.DisableFog)
			renderer.FogEnabled = oldFog;

		if (bShadowMapEnabled)
			renderer.quicklyEnableShadowMap(true);
	}
	
	/**
	 * @public
	 */
	doParticleSystem(time) {
		if (this.LastEmitTime == 0) {
			this.LastEmitTime = time;
			return false;
		}

		var now = time;
		var timediff = time - this.LastEmitTime;
		this.LastEmitTime = time;

		if (!this.Visible)
			return false;

		var changed = false;

		// run emitter
		changed = this.emit(time, timediff);

		// run affectors
		changed = this.affect(time, timediff) || changed;

		// animate all particles
		var trans = this.AbsoluteTransformation.getTranslation();
		this.Buffer.Box.reset(trans.X, trans.Y, trans.Z);

		var scale = timediff;

		if (this.Particles.length != 0)
			changed = true;

		for (var i = 0; i < this.Particles.length;) {
			var p = this.Particles[i];

			if (now > p.endTime)
				this.Particles.splice(i, 1);

			else {
				p.pos.addToThis(p.vector.multiplyWithScal(scale));
				this.Buffer.Box.addInternalPointByVector(p.pos);
				++i;
			}
		}


		// correct bounding box
		var m = this.MaxStartSizeX * 0.5;

		this.Buffer.Box.MaxEdge.X += m;
		this.Buffer.Box.MaxEdge.Y += m;
		this.Buffer.Box.MaxEdge.Z += m;

		this.Buffer.Box.MinEdge.X -= m;
		this.Buffer.Box.MinEdge.Y -= m;
		this.Buffer.Box.MinEdge.Z -= m;

		//if (true) //ParticlesAreGlobal)
		{
			var absinv = new Matrix4(false);
			this.AbsoluteTransformation.getInverse(absinv);

			absinv.transformBoxEx(this.Buffer.Box);
		}

		return changed;
	}
	
	/**
	 * @public
	 */
	emit(time, diff) {
		var pps = (this.MaxParticlesPerSecond - this.MinParticlesPerSecond);
		var perSecond = pps ? (this.MinParticlesPerSecond + (Math.random() * pps)) : this.MinParticlesPerSecond;
		var everyWhatMillisecond = 1000.0 / perSecond;

		var oldParticleAmount = this.Particles.length;

		this.TimeSinceLastEmitting += diff;

		if (this.TimeSinceLastEmitting <= everyWhatMillisecond)
			return false;

		var amountNewParticles = ((this.TimeSinceLastEmitting / everyWhatMillisecond) + 0.5);

		this.TimeSinceLastEmitting = 0;

		if (oldParticleAmount + amountNewParticles > this.MaxParticles) {
			var delta = (oldParticleAmount + amountNewParticles) - this.MaxParticles;
			amountNewParticles -= delta;
		}

		if (amountNewParticles <= 0)
			return false;

		//Particles.set_used(oldParticleAmount + amountNewParticles);
		//Particles.reallocate(oldParticleAmount + amountNewParticles);
		var rotatedDirection = this.Direction.clone();
		this.AbsoluteTransformation.rotateVect(rotatedDirection);

		var transScale = this.AbsoluteTransformation.getScale().getLength();

		var bPointEmitter = this.EmittArea.equalsZero();

		for (var i = oldParticleAmount; i < oldParticleAmount + amountNewParticles; ++i) {
			var p = new Particle();
			p.pos = new Vect3d(0, 0, 0);

			if (!bPointEmitter) {
				if (this.EmittArea.X != 0.0)
					p.pos.X = (Math.random() * this.EmittArea.X) - this.EmittArea.X * 0.5;
				if (this.EmittArea.Y != 0.0)
					p.pos.Y = (Math.random() * this.EmittArea.Y) - this.EmittArea.Y * 0.5;
				if (this.EmittArea.Z != 0.0)
					p.pos.Z = (Math.random() * this.EmittArea.Z) - this.EmittArea.Z * 0.5;
			}

			p.startTime = time;
			p.vector = rotatedDirection.clone();

			if (this.MaxAngleDegrees) {
				var tgt = rotatedDirection.clone();
				tgt.rotateXYBy((Math.random() * this.MaxAngleDegrees * 2) - this.MaxAngleDegrees);
				tgt.rotateYZBy((Math.random() * this.MaxAngleDegrees * 2) - this.MaxAngleDegrees);
				tgt.rotateXZBy((Math.random() * this.MaxAngleDegrees * 2) - this.MaxAngleDegrees);
				p.vector = tgt;
			}

			if (this.MaxLifeTime - this.MinLifeTime == 0)
				p.endTime = time + this.MinLifeTime;

			else
				p.endTime = time + this.MinLifeTime + (Math.random() * (this.MaxLifeTime - this.MinLifeTime));

			p.color = getInterpolatedColor(this.MinStartColor, this.MaxStartColor, (Math.random() * 100) / 100.0);

			p.startColor = p.color;
			p.startVector = p.vector.clone();

			if (this.MinStartSizeX == this.MaxStartSizeX && this.MinStartSizeY == this.MaxStartSizeY) {
				p.startSizeX = this.MinStartSizeX;
				p.startSizeY = this.MinStartSizeY;
			}

			else {
				var f = (Math.random() * 100) / 100.0;
				var inv = 1.0 - f;
				p.startSizeX = this.MinStartSizeX * f + this.MaxStartSizeX * inv;
				p.startSizeY = this.MinStartSizeY * f + this.MaxStartSizeY * inv;
			}

			p.startSizeX *= transScale;
			p.startSizeY *= transScale;

			p.sizeX = p.startSizeX;
			p.sizeY = p.startSizeY;

			//AbsoluteTransformation.rotateVect(p.startVector);
			//if (this.ParticlesAreGlobal)
			this.AbsoluteTransformation.transformVect(p.pos);

			//Particles[i] = p;
			this.Particles.unshift(p); // = push_front
		}

		return true;
	}
	
	/**
	 * @public
	 */
	affect(now, diff) {
		if (!this.FadeOutAffector && !this.GravityAffector && !this.ScaleAffector)
			return false;

		var i = 0;
		var p = null;

		if (this.FadeOutAffector) {
			for (i = 0; i < this.Particles.length; ++i) {
				p = this.Particles[i];

				if (p.endTime - now < this.FadeOutTime) {
					var d = (p.endTime - now) / this.FadeOutTime;
					p.color = getInterpolatedColor(p.startColor, this.FadeTargetColor, d);
				}
			}
		}

		if (this.GravityAffector) {
			var g = this.Gravity.multiplyWithVect(this.AbsoluteTransformation.getScale());

			for (i = 0; i < this.Particles.length; ++i) {
				p = this.Particles[i];

				var u = (now - p.startTime) / this.GravityAffectingTime;
				u = clamp(u, 0.0, 1.0);
				u = 1.0 - u;

				p.vector = p.startVector.getInterpolated(g, u);
			}
		}

		if (this.ScaleAffector) {
			var transScale = this.AbsoluteTransformation.getScale().X;

			for (i = 0; i < this.Particles.length; ++i) {
				p = this.Particles[i];

				var maxdiff = p.endTime - p.startTime;
				var curdiff = now - p.startTime;
				var newscale = curdiff / maxdiff;

				p.sizeX = p.startSizeX + this.ScaleToX * newscale * transScale;
				p.sizeY = p.startSizeY + this.ScaleToY * newscale * transScale;
			}
		}

		return true;
	}
	
	/**
	 * @public
	 */
	reallocateBuffers() {
		if (this.Particles.length * 4 > this.Buffer.Vertices.length ||
			this.Particles.length * 6 > this.Buffer.Indices.length) {
			var oldSize = this.Buffer.Vertices.length;
			var va = this.Buffer.Vertices;

			while (this.Buffer.Vertices.length < this.Particles.length * 4) {
				var v = null;

				v = new Vertex3D(true);
				v.TCoords.set(0.0, 0.0);
				va.push(v);

				v = new Vertex3D(true);
				v.TCoords.set(0.0, 1.0);
				va.push(v);

				v = new Vertex3D(true);
				v.TCoords.set(1.0, 1.0);
				va.push(v);

				v = new Vertex3D(true);
				v.TCoords.set(1.0, 0.0);
				va.push(v);
			}

			// fill remaining indices
			var oldIdxSize = this.Buffer.Indices.length;
			var oldvertices = oldSize;
			var newIndexSize = this.Particles.length * 6;

			var ia = this.Buffer.Indices;

			for (var i = oldIdxSize; i < newIndexSize; i += 6) {
				ia.push(0 + oldvertices);
				ia.push(2 + oldvertices);
				ia.push(1 + oldvertices);
				ia.push(0 + oldvertices);
				ia.push(3 + oldvertices);
				ia.push(2 + oldvertices);

				oldvertices += 4;
			}
		}
	}
}
// ------------------------------------------------------------------------

/**
 * A 3d particle, internally used in {@link ParticleSystemSceneNode}
 * @constructor
 * @class A 3d particle, internally used in {@link ParticleSystemSceneNode}
 * @public
 */
class Particle {
	constructor (init) {
		this.pos = null; //:Vect3dF;
		this.vector = null;		
		this.startTime = 0;
		this.endTime = 0;
		this.color = 0;
		this.startColor = 0;
		this.startVector = null;
		this.sizeX = 0.0;
		this.sizeY = 0.0;
		this.startSizeX = 0.0;
		this.startSizeY = 0.0;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A path scene node stores a 3d path which can be used for example by {@link Animator}s to move {@link SceneNode}s along it.
 * @class A path scene node stores a 3d path which can be used for example by {@link Animator}s to move {@link SceneNode}s along it.
 * @constructor
 * @extends CL3D.SceneNode
 */
class PathSceneNode extends SceneNode {
	/**
	 * Tightness of the spline, specifies how the line is interpolated between the path nodes.
	 * With this, you can create for example either cardinal splines (tightness != 0.5) or catmull-rom-splines (tightness == 0.5).
	 * @public
	 * @type Number
	 */
	Tightness = 0;

	/**
	 * Specifies if the path is a closed circle or a unclosed line.
	 * @public
	 * @type Boolean
	 */
	IsClosedCircle = false;

	/**
	 * Array of path nodes, of type {@link Vect3d}.
	 * @public
	 * @type Array
	 */
	Nodes = new Array();

	constructor() {
		super();

		this.init();

		this.Type = 1752461414;
		this.Box = new Box3d();
		this.Tightness = 0; //;
		this.IsClosedCircle = false; //:Boolean;
		this.Nodes = new Array(); // Vect3d
	}

	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return this.Box;
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns 'path' for the mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'path';
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new PathSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.Box)
			c.Box = this.Box.clone();

		c.Tightness = this.Tightness; //;
		c.IsClosedCircle = this.IsClosedCircle; //:Boolean;
		c.Nodes = new Array(); // Vect3d

		for (var i = 0; i < this.Nodes.length; ++i) {
			var n = this.Nodes[i];
			c.Nodes.push(n.clone());
		}

		return c;
	}

	/**
	 * @public
	 */
	getPathNodeCount() {
		return this.Nodes.length;
	}

	/**
	 * @public
	 * returns the absolute position of a path node in the path
	 * @param idx {Number} Index of the path node
	 * @returns {CL3D.Vect3d} returns the 3d vector of the position of the specified path node
	 */
	getPathNodePosition(idx) {
		if (idx < 0 || idx >= this.Nodes.length)
			return new Vect3d(0, 0, 0);

		if (!this.AbsoluteTransformation)
			this.updateAbsolutePosition();

		var pos = this.Nodes[idx];
		pos = pos.clone();
		this.AbsoluteTransformation.transformVect(pos);

		return pos;
	}

	/**
	 * @public
	 */
	clampPathIndex(idx, size) {
		if (this.IsClosedCircle)
			return (idx < 0 ? (size + idx) : ((idx >= size) ? (idx - size) : idx));

		return ((idx < 0) ? 0 : ((idx >= size) ? (size - 1) : idx));
	}

	/**
	 * @public
	 * Returns the position of a point on the path, based on a value between 0 and 1. Can be
	 * Used to interpolate a position on the path.
	 * @param {Number} posOnPath Value between 0 and 1, meaning 0 is the start of the path and 1 is the end of the path.
	 * @param {Boolean=} relative set to true to get the position relative to the position of the path scene node, set to
	 * false to receive the position in absolute world space.
	 * @returns {CL3D.Vect3d} returns the 3d vector of the position
	 */
	getPointOnPath(posOnPath, relative) {
		var pSize = this.Nodes.length;

		if (this.IsClosedCircle)
			posOnPath *= pSize;

		else {
			posOnPath = clamp(posOnPath, 0.0, 1.0);
			posOnPath *= pSize - 1;
		}

		var finalPos = new Vect3d();

		if (pSize == 0)
			return finalPos;

		if (pSize == 1)
			return finalPos;

		var dt = posOnPath;
		var u = fract(dt);
		var idx = Math.floor(dt) % pSize;

		var p0 = this.Nodes[this.clampPathIndex(idx - 1, pSize)];
		var p1 = this.Nodes[this.clampPathIndex(idx + 0, pSize)]; // starting point
		var p2 = this.Nodes[this.clampPathIndex(idx + 1, pSize)]; // end point
		var p3 = this.Nodes[this.clampPathIndex(idx + 2, pSize)];

		// hermite polynomials
		var h1 = 2.0 * u * u * u - 3.0 * u * u + 1.0;
		var h2 = -2.0 * u * u * u + 3.0 * u * u;
		var h3 = u * u * u - 2.0 * u * u + u;
		var h4 = u * u * u - u * u;

		// tangents
		var t1 = p2.substract(p0);
		t1.multiplyThisWithScal(this.Tightness);
		var t2 = p3.substract(p1);
		t2.multiplyThisWithScal(this.Tightness);

		// interpolated point
		finalPos = p1.multiplyWithScal(h1);
		finalPos.addToThis(p2.multiplyWithScal(h2));
		finalPos.addToThis(t1.multiplyWithScal(h3));
		finalPos.addToThis(t2.multiplyWithScal(h4));

		if (!relative) {
			if (!this.AbsoluteTransformation)
				this.updateAbsolutePosition();

			this.AbsoluteTransformation.transformVect(finalPos);
		}

		return finalPos;
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * A sound scene node represents and plays a 3d sound  
 * @class A sound scene node represents and plays a 3d sound  
 * @constructor
 * @extends CL3D.SceneNode
 */
class SoundSceneNode extends SceneNode {
	constructor() {
		super();

		this.init();

		this.Type = 1935946598;
		this.Box = new Box3d();
		this.TheSound = "";
		this.MinDistance = 0;
		this.MaxDistance = 0;
		this.PlayMode = 0;
		this.DeleteWhenFinished = false;
		this.MaxTimeInterval = 0;
		this.MinTimeInterval = 0;
		this.Volume = 0;
		this.PlayAs2D = false;

		this.PlayingSound = null;

		//private var PlayingSoundTransform:SoundTransform;
		//private const RollOffFactor:Number = 1.0;
		this.SoundPlayCompleted = false;
		this.TimeMsDelayFinished = 0;
		this.PlayedCount = 0;
	}

	/**
	 * If you need to find the smallest amount to turn a gun or head or whatever
	 * to a certain angle, or find the smallest amount to turn to go a certain direction,
	 * you shouldn't have to go more than 180 degrees in either direction.
	 * @public
	 */
	static normalizeRelativeAngle(angleInGrad) {
		return ((angleInGrad + 7 * 180.0) % (360.0)) - 1800.0;
	}

	/**
	 * Get the axis aligned, not transformed bounding box of this node.
	 * This means that if this node is an animated 3d character, moving in a room, the bounding box will
	 * always be around the origin. To get the box in real world coordinates, just transform it with the matrix
	 * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
	 * @public
	 * @returns {CL3D.Box3d} Bounding box of this scene node.
	 */
	getBoundingBox() {
		return this.Box;
	}

	/**
	 * Returns the type string of the scene node.
	 * Returns 'sound' for the mesh scene node.
	 * @public
	 * @returns {String} type name of the scene node.
	 */
	getType() {
		return 'sound';
	}

	/**
	 * @public
	 */
	OnRegisterSceneNode(mgr) {
		if (this.Visible) {
			mgr.registerNodeForRendering(this, Scene.RENDER_MODE_DEFAULT);

			SceneNode.prototype.OnRegisterSceneNode.call(this, mgr);
		}
	}

	/**
	 * @public
	 */
	get2DAngle(X, Y) {
		if (Y == 0)
			return X < 0 ? 180 : 0;
		else if (X == 0)
			return Y < 0 ? 90 : 270;

		var tmp = Y / Math.sqrt(X * X + Y * Y);
		tmp = Math.atan(Math.sqrt(1 - tmp * tmp) / tmp) * RADTODEG;

		if (X > 0 && Y > 0)
			return tmp + 270;

		else if (X > 0 && Y < 0)
			return tmp + 90;

		else if (X < 0 && Y < 0)
			return 90 - tmp;

		else if (X < 0 && Y > 0)
			return 270 - tmp;

		return tmp;
	}

	/**
	 * normalizes an angle, returns the same angle clamped into (0;360)
	 * @public
	 */
	normalizeAngle(angleInGrad) {
		return ((angleInGrad % 360.0) + 360.0) % 360.0;
	}

	/**
	 * @public
	 */
	updateSoundFor3DSound(playingSnd, Position, mgr) {
		// unfortunately, HTML5 audio currently is very primitive, so we can only set the volume for this right now
		var effectiveVolume = this.Volume;

		if (!mgr)
			return;

		if (!playingSnd)
			return;

		// calculate distance
		var cam = mgr.getActiveCamera();
		if (!cam)
			return;
		var listenerPos = cam.getAbsolutePosition();
		cam.getTarget().substract(listenerPos);
		var distanceToListener = listenerPos.getDistanceTo(Position);

		if (distanceToListener < this.MinDistance) ;

		else {
			// calculate volume attenuation/rolloff
			distanceToListener -= this.MinDistance;
			var fact = this.MaxDistance - this.MinDistance;

			if (fact > 0) {
				{
					// logarithmic rolloff
					if (distanceToListener > fact) // keep volume at same level at max distance
						distanceToListener = fact;

					var loga = 10.0;

					if (distanceToListener != 0)
						loga = this.MinDistance / distanceToListener;

					distanceToListener *= this.RollOffFactor;

					effectiveVolume = effectiveVolume * loga;
				}

				if (effectiveVolume > 10.0)
					effectiveVolume = 10.0;
			}

			else
				effectiveVolume = 10.0;
		}

		// set pan
		// we assume here that the upvector will either be (1,0,0), (0,1,0) or (0,0,1)
		// TODO: transform point into that plane if not
		/*
		var lookangle:Number = 0;
		var toSoundAngle:Number = 0;
    
		var normUp:Vect3dF = cam.getUpVector().clone();
		normUp.normalize();
		normUp.X *= normUp.X;
		normUp.Y *= normUp.Y;
		normUp.Z *= normUp.Z;
    
		if (normUp.Y >= normUp.X && normUp.Y >= normUp.Z)
		{
			// irrlicht default, Y is up
			lookangle = get2DAngle(lookdir.X, lookdir.Z);
			toSoundAngle = get2DAngle(Position.X - listenerPos.X, Position.Z - listenerPos.Z);
		}
		else
		if (normUp.X >= normUp.Y && normUp.X >= normUp.Z)
		{
			// X is up
			lookangle = get2DAngle(lookdir.Y, lookdir.Z);
			toSoundAngle = get2DAngle(Position.Y - listenerPos.Y, Position.Z - listenerPos.Z);
		}
		else
		{
			// Z is up
			lookangle = get2DAngle(lookdir.X, lookdir.Y);
			toSoundAngle = get2DAngle(Position.X - listenerPos.X, Position.Y - listenerPos.Y);
		}
    
		lookangle = normalizeAngle(lookangle);
		toSoundAngle = normalizeAngle(toSoundAngle);
    
		var lookAngleToSoundAngle:Number = lookangle - toSoundAngle;
    
		lookAngleToSoundAngle = normalizeRelativeAngle(lookAngleToSoundAngle);
    
		// we need to set the pan between -1.0 and 1.0, the realAngle
		var effectivePan:Number = (lookAngleToSoundAngle / 180.0);
		if (effectivePan > 1.0)
			effectivePan = 1.0;
		if (effectivePan < -1.0)
			effectivePan = -1.0;
		    
		playingSnd.pan = effectivePan;
		*/
		// set volume
		if (effectiveVolume > 1.0)
			effectiveVolume = 1.0;

		gSoundManager.setVolume(playingSnd, effectiveVolume);
	}

	/**
	 * @public
	 */
	startSound(loop) {
		if (!this.PlayingSound && this.TheSound) {
			this.SoundPlayCompleted = false;
			this.PlayingSound = gSoundManager.play2D(this.TheSound, loop);

			if (!this.PlayAs2D) {
				var pos = this.getAbsolutePosition();
				this.updateSoundFor3DSound(this.PlayingSound, pos, this.scene);
			}
		}
	}

	/**
	 * @public
	 */
	OnAnimate(scene, timeMs) {
		try {
			var pos = this.getAbsolutePosition();

			if (this.PlayingSound && !this.PlayAs2D) {
				// update 3d position of the sound
				this.updateSoundFor3DSound(this.PlayingSound, pos, scene);
			}


			switch (this.PlayMode) {
				case 0: //EPM_NOTHING:
					break;
				case 1: //EPM_RANDOM:
					{
						if (this.PlayingSound && this.PlayingSound.hasPlayingCompleted()) {
							this.PlayingSound = null;

							// calculate next play time
							var delta = this.MaxTimeInterval - this.MinTimeInterval;

							if (delta < 2)
								delta = 2;

							this.TimeMsDelayFinished = timeMs + (Math.random() * delta) + this.MinTimeInterval;
						}

						else if (!this.PlayingSound && (!this.TimeMsDelayFinished || timeMs > this.TimeMsDelayFinished)) {
							// play new sound		
							if (this.TheSound) {
								this.startSound(false);
							}
						}
					}
					break;
				case 2: //EPM_LOOPING:
					{
						if (!this.PlayingSound) {
							if (this.TheSound) {
								this.startSound(true);
							}
						}
					}
					break;
				case 3: //EPM_ONCE:
					{
						if (this.PlayedCount) {
							// stop
						}

						else {
							// start
							if (this.TheSound) {
								this.startSound(false);
								++this.PlayedCount;
							}
						}
					}
					break;
			}
		}
		catch (e) {
			//Debug.print("Error:" + e);
		}

		return false;
	}

	/**
	 * @public
	 */
	createClone(newparent, oldNodeId, newNodeId) {
		var c = new SoundSceneNode();
		this.cloneMembers(c, newparent, oldNodeId, newNodeId);

		if (this.Box)
			c.Box = this.Box.clone();

		// TODO: copy other members
		return c;
	}
}

// ---------------------------------------------------------------------
// Playing video stream
// ---------------------------------------------------------------------

/**
 * @public
 * @constructor
 * @class
 */
class VideoStream {
    constructor(filename, renderer) {
        this.filename = filename;
        this.videoElement = null;
        this.renderer = renderer;
        this.texture = null;
        this.handlerOnVideoEnded = null;
        this.handlerOnVideoFailed = null;
        this.readyToShow = false;
        this.playBackEnded = false;
        this.stopped = false;
        this.state = 0; // 0=stopped, 1=loading, 2=playing, 3=paused
        this.playLooped = false;
        this.isError = false;
    }

    videoBufferReady() {
        this.state = 2; // playing


        // start video
        this.videoElement.play();
        this.readyToShow = true;

        var oldTexture = this.texture;
        var newTexture = this.renderer.createTextureFrom2DCanvas(this.videoElement, true);

        // now replace content of the new texture with the old placeholder texture
        this.renderer.replacePlaceholderTextureWithNewTextureContent(oldTexture, newTexture);
    }

    videoPlaybackDone() {
        this.state = 0; // 0=stopped, 1=loading, 2=playing, 3=paused
        this.playBackEnded = true;
    }

    errorHappened() {
        this.state = 0;
        this.playBackEnded = true;
        this.isError = true;
    }

    play(playLooped) {
        if (this.state == 2 || this.state == 1) // playing or loading
            return;

        if (this.videoElement) {
            if (this.state == 3) // paused
            {
                // unpause
                this.videoElement.play();
                this.state = 2;
                this.playBackEnded = false;
                return;
            }
            else
                if (this.state == 0) // stopped
                {
                    this.videoElement.currentTime = 0;
                    this.videoElement.play();
                    this.state = 2;
                    this.playBackEnded = false;
                    return;
                }
        }

        var v = document.createElement('video');

        var me = this;

        this.videoElement = v;
        this.playLooped = playLooped;

        v.addEventListener("canplaythrough", function () { me.videoBufferReady(); }, true);
        v.addEventListener("ended", function () { me.videoPlaybackDone(); }, true);
        v.addEventListener("error", function () { me.errorHappened(); }, true);

        v['preload'] = "auto";
        v.src = this.filename; // works with .ogv and .mp4
        v.style.display = 'none';

        if (this.playLooped)
            v.loop = true;

        this.state = 1; // loading



        // create placeholder texture
        var canvas = document.createElement("canvas");
        if (canvas == null)
            return;
        canvas.width = 16;
        canvas.height = 16;

        //ctx = canvas.getContext("2d");
        //ctx.fillStyle = "rgba(255, 0, 255, 1)";
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.texture = this.renderer.createTextureFrom2DCanvas(canvas, true);
    }

    pause() {
        if (this.state != 2)
            return;

        this.videoElement.pause();
        this.state = 3;
    }

    stop() {
        if (this.state != 2)
            return;

        this.videoElement.pause();
        this.state = 0;
    }

    updateVideoTexture() {
        if (!this.readyToShow)
            return;

        if (this.state != 2) // playing
            return;

        this.renderer.updateTextureFrom2DCanvas(this.texture, this.videoElement);
    }

    hasPlayBackEnded() {
        if (this.state == 0) // 0=stopped, 1=loading, 2=playing, 3=paused
            return true;

        return this.playBackEnded;
    }
}

/**
 * data is the .responseText of a GET operation
 * @constructor
 * @public
 */
class StringBinary {
	constructor(data) {
		this._buffer = data;
		this._length = data.length;
		this._offset = 0;
		this._bitBuffer = null;
		this._bitOffset = 8;

		this.bigEndian = false;
	}

	/**
	 * @public
	 */
	bytesAvailable() {
		return this._length - this._offset;
	}

	getPosition() {
		return this._offset;
	}

	readInt() {
		return this.readSI32();
	}

	readByte() {
		return this.readSI8();
	}

	readByteAt(position) {
		return this._buffer.charCodeAt(position) & 0xff;
	}

	readBoolean() {
		return this.readSI8() != 0;
	}

	readShort() {
		return this.readUnsignedShort();
	}

	readNumber(numBytes) {
		var value = 0;
		var p = this._offset;
		var i = p + numBytes;
		while (i > p) { value = value * 256 + this.readByteAt(--i); }
		this._offset += numBytes;
		return value;
	}

	readSNumber(numBytes) {
		var value = this.readNumber(numBytes);
		var mask = 0x01 << (numBytes * 8 - 1);
		if (value & mask) { value = (~value + 1) * -1; }
		return value;
	}

	readUnsignedShort() {
		return this.readUI16();
	}

	readUnsignedInt() {
		return this.readUI32();
	}

	readSI8() {
		return this.readSNumber(1);
	}

	readSI16() {
		return this.readSNumber(2);
	}

	readSI32() {
		return this.readSNumber(4);
	}

	readUI8() {
		return this.readNumber(1);
	}

	readUI16() {
		return this.readNumber(2);
	}

	readUI24() {
		return this.readNumber(3);
	}

	readUI32() {
		return this.readNumber(4);
	}

	readFixed() {
		return this._readFixedPoint(32, 16);
	}

	readFixed8() {
		return this._readFixedPoint(16, 8);
	}

	_readFixedPoint(numBits, precision) {
		var value = this.readSB(numBits);
		value = value * Math.pow(2, -precision);
		return value;
	}
	
	readFloat16() {
		//return this._readFloatingPoint(5, 10);
		return this.decodeFloat32fast(5, 10);

	}

	readFloat() {
		//var data = this._buffer.substring(this._offset, this._offset+4);
		//var d = this.decodeFloat(data, 23, 8);
		//this._offset += 4;
		//return d;
		var f = this.decodeFloat32fast(this._buffer, this._offset);
		this._offset += 4;
		return f;
	}

	readDouble() {
		var data = this._buffer.substring(this._offset, this._offset + 8);
		var d = this.decodeFloat(data, 52, 11);
		this._offset += 8;
		return d;
	}

	decodeFloat32fast(data, offset) {
		var b1 = data.charCodeAt(offset + 3) & 0xFF, b2 = data.charCodeAt(offset + 2) & 0xFF, b3 = data.charCodeAt(offset + 1) & 0xFF, b4 = data.charCodeAt(offset + 0) & 0xFF;
		var sign = 1 - (2 * (b1 >> 7)); // sign = bit 0
		var exp = (((b1 << 1) & 0xff) | (b2 >> 7)) - 127; // exponent = bits 1..8
		var sig = ((b2 & 0x7f) << 16) | (b3 << 8) | b4; // significand = bits 9..31
		if (sig == 0 && exp == -127)
			return 0.0;
		return sign * (1 + sig * Math.pow(2, -23)) * Math.pow(2, exp);
	}

	decodeFloat(data, precisionBits, exponentBits) {
		var b = ((b = new Buffer(this.bigEndian, data)), b), bias = Math.pow(2, exponentBits - 1) - 1, signal = b.readBits(precisionBits + exponentBits, 1), exponent = b.readBits(precisionBits, exponentBits), significand = 0, divisor = 2, curByte = b.buffer.length + (-precisionBits >> 3) - 1, byteValue, startBit, mask;

		do {
			for (byteValue = b.buffer[++curByte], startBit = precisionBits % 8 || 8, mask = 1 << startBit; mask >>= 1; (byteValue & mask) && (significand += 1 / divisor), divisor *= 2) { }
		}
		while (precisionBits -= startBit);

		return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
			: (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
				: Math.pow(2, exponent - bias) * (1 + significand) : 0);
	}

	readSB(numBits) {
		var value = this.readUB(numBits);
		var mask = 0x01 << (numBits - 1);
		if (value & mask) { value -= Math.pow(2, numBits); }
		return value;
	}

	readUB(numBits) {
		var value = 0;
		var t = this;
		var i = numBits;
		while (i--) {
			if (t._bitOffset == 8) {
				t._bitBuffer = t.readUI8();
				t._bitOffset = 0;
			}
			var mask = 0x80 >> t._bitOffset;
			value = value * 2 + (t._bitBuffer & mask ? 1 : 0);
			t._bitOffset++;
		}
		return value;
	}

	readFB(numBits) {
		return this._readFixedPoint(numBits, 16);
	}

	readString(numChars) {
		var chars = [];
		var i = numChars || this._length - this._offset;
		while (i--) {
			var code = this.readNumber(1);
			if (numChars || code) { chars.push(String.fromCharCode(code)); }
			else { break; }
		}
		return chars.join('');
	}

	readBool(numBits) {
		return !!this.readUB(numBits || 1);
	}

	tell() {
		return this._offset;
	}

	seek(offset, absolute) {
		this._offset = (absolute ? 0 : this._offset) + offset;
		return this;
	}

	reset() {
		this._offset = 0;
		return this;
	}
}
class Buffer {
	constructor(bigEndian, buffer) {
		this.bigEndian = bigEndian || 0, this.buffer = [], this.setBuffer(buffer);
	}

	readBits(start, length)
	{
		function shl(a, b)
		{
			for(++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1)
			{}
			return a;
		}
		
		if(start < 0 || length <= 0)
			return 0;
			
		for(var offsetLeft, offsetRight = start % 8, curByte = this.buffer.length - (start >> 3) - 1,
			lastByte = this.buffer.length + (-(start + length) >> 3), diff = curByte - lastByte,
			sum = ((this.buffer[ curByte ] >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1))
			+ (diff && (offsetLeft = (start + length) % 8) ? (this.buffer[ lastByte++ ] & ((1 << offsetLeft) - 1))
			<< (diff-- << 3) - offsetRight : 0); diff; sum += shl(this.buffer[ lastByte++ ], (diff-- << 3) - offsetRight)
		) {}
		return sum;
	};
	
	setBuffer(data)
	{
		if(data)
		{
			for(var l, i = l = data.length, b = this.buffer = new Array(l); i; b[l - i] = data.charCodeAt(--i))
			{

			}
			this.bigEndian && b.reverse();
		}
	}
	
	hasNeededBits(neededBits)
	{
		return this.buffer.length >= -(-neededBits >> 3);
	}
}

// JSInflate
// inflate zlib data directly in JavaScript.
// created originally by Masanao Izumo, simplified by August Lilleaas, a bit optimized for CopperLicht by Nikolaus Gebhardt
//
// example on how to use:
// var decompressedBinaryString = JSInflate.inflate(compressedBinaryString);
// ------------------------------------------------------------------
//
// license:
//
//Copyright (c) 2010 August Lilleaas
//Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
//
//Permission is hereby granted, free of charge, to any person obtaining
//a copy of this software and associated documentation files (the
//"Software"), to deal in the Software without restriction, including
//without limitation the rights to use, copy, modify, merge, publish,
//distribute, sublicense, and/or sell copies of the Software, and to
//permit persons to whom the Software is furnished to do so, subject to
//the following conditions:
//
//The above copyright notice and this permission notice shall be
//included in all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

// sensless function preventing jsinflace overriding concatenated files for compression

/**
 * @type {{inflate: (data: string) => string}} JSInflate
 */
globalThis.JSInflate = null;

((GLOBAL) => {
    /*
     * Port of script by Masanao Izumo.
     *
     * Wrapped all the variables in a function, created a
     * constructor for interacting with the lib. Everything
     * else was written by M. Izumo.
     *
     * Original code can be found here: http://www.onicos.com/staff/iz/amuse/javascript/expert/inflate.txt
     *
     */

    var zip_WSIZE = 32768;		// Sliding Window size
    var zip_STORED_BLOCK = 0;

    /* for inflate */
    var zip_lbits = 9; 		// bits in base literal/length lookup table
    var zip_dbits = 6; 		// bits in base distance lookup table

    /* variables (inflate) */
    var zip_slide;
    var zip_wp;			// current position in slide
    var zip_fixed_tl = null;	// inflate static
    var zip_fixed_td;		// inflate static
    var zip_fixed_bl, zip_fixed_bd;	// inflate static
    var zip_bit_buf;		// bit buffer
    var zip_bit_len;		// bits in bit buffer
    var zip_method;
    var zip_eof;
    var zip_copy_leng;
    var zip_copy_dist;
    var zip_tl, zip_td;	// literal/length and distance decoder tables
    var zip_bl, zip_bd;	// number of bits decoded by tl and td

    var zip_inflate_data;
    var zip_inflate_pos;


    /* constant tables (inflate) */
    var zip_MASK_BITS = new Array(
        0x0000,
        0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff,
        0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff);
    // Tables for deflate from PKZIP's appnote.txt.
    var zip_cplens = new Array( // Copy lengths for literal codes 257..285
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
        35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0);
    /* note: see note #13 above about the 258 in this list. */
    var zip_cplext = new Array( // Extra bits for literal codes 257..285
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
        3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99); // 99==invalid
    var zip_cpdist = new Array( // Copy offsets for distance codes 0..29
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
        257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
        8193, 12289, 16385, 24577);
    var zip_cpdext = new Array( // Extra bits for distance codes
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
        7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
        12, 12, 13, 13);
    var zip_border = new Array(  // Order of the bit length code lengths
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
    /* objects (inflate) */

    function zip_HuftList() {
        this.next = null;
        this.list = null;
    }

    function zip_HuftNode() {
        this.e = 0; // number of extra bits or operation
        this.b = 0; // number of bits in this code or subcode

        // union
        this.n = 0; // literal, length base, or distance base
        this.t = null; // (zip_HuftNode) pointer to next level of table
    }

    function zip_HuftBuild(b,	// code lengths in bits (all assumed <= BMAX)
        n,	// number of codes (assumed <= N_MAX)
        s,	// number of simple-valued codes (0..s-1)
        d,	// list of base values for non-simple codes
        e,	// list of extra bits for non-simple codes
        mm	// maximum lookup bits
    ) {
        this.BMAX = 16;   // maximum bit length of any code
        this.N_MAX = 288; // maximum number of codes in any set
        this.status = 0;	// 0: success, 1: incomplete table, 2: bad input
        this.root = null;	// (zip_HuftList) starting table
        this.m = 0;		// maximum lookup bits, returns actual

        /* Given a list of code lengths and a maximum table size, make a set of
           tables to decode that set of codes.	Return zero on success, one if
           the given code set is incomplete (the tables are still built in this
           case), two if the input is invalid (all zero length codes or an
           oversubscribed set of lengths), and three if not enough memory.
           The code with value 256 is special, and the tables are constructed
           so that no bits beyond that code are fetched when that code is
           decoded. */
        {
            var a;			// counter for codes of length k
            var c = new Array(this.BMAX + 1);	// bit length count table
            var el;			// length of EOB code (value 256)
            var f;			// i repeats in table every f entries
            var g;			// maximum code length
            var h;			// table level
            var i;			// counter, current code
            var j;			// counter
            var k;			// number of bits in current code
            var lx = new Array(this.BMAX + 1);	// stack of bits per table
            var p;			// pointer into c[], b[], or v[]
            var pidx;		// index of p
            var q;			// (zip_HuftNode) points to current table
            var r = new zip_HuftNode(); // table entry for structure assignment
            var u = new Array(this.BMAX); // zip_HuftNode[BMAX][]  table stack
            var v = new Array(this.N_MAX); // values in order of bit length
            var w;
            var x = new Array(this.BMAX + 1);// bit offsets, then code stack
            var xp;			// pointer into x or c
            var y;			// number of dummy codes added
            var z;			// number of entries in current table
            var o;
            var tail;		// (zip_HuftList)

            tail = this.root = null;
            for (i = 0; i < c.length; i++)
                c[i] = 0;
            for (i = 0; i < lx.length; i++)
                lx[i] = 0;
            for (i = 0; i < u.length; i++)
                u[i] = null;
            for (i = 0; i < v.length; i++)
                v[i] = 0;
            for (i = 0; i < x.length; i++)
                x[i] = 0;

            // Generate counts for each bit length
            el = n > 256 ? b[256] : this.BMAX; // set length of EOB code, if any
            p = b; pidx = 0;
            i = n;
            do {
                c[p[pidx]]++;	// assume all entries <= BMAX
                pidx++;
            } while (--i > 0);
            if (c[0] == n) {	// null input--all zero length codes
                this.root = null;
                this.m = 0;
                this.status = 0;
                return;
            }

            // Find minimum and maximum length, bound *m by those
            for (j = 1; j <= this.BMAX; j++)
                if (c[j] != 0)
                    break;
            k = j;			// minimum code length
            if (mm < j)
                mm = j;
            for (i = this.BMAX; i != 0; i--)
                if (c[i] != 0)
                    break;
            g = i;			// maximum code length
            if (mm > i)
                mm = i;

            // Adjust last length count to fill out codes, if needed
            for (y = 1 << j; j < i; j++, y <<= 1)
                if ((y -= c[j]) < 0) {
                    this.status = 2;	// bad input: more codes than bits
                    this.m = mm;
                    return;
                }
            if ((y -= c[i]) < 0) {
                this.status = 2;
                this.m = mm;
                return;
            }
            c[i] += y;

            // Generate starting offsets into the value table for each length
            x[1] = j = 0;
            p = c;
            pidx = 1;
            xp = 2;
            while (--i > 0)		// note that i == g from above
                x[xp++] = (j += p[pidx++]);

            // Make a table of values in order of bit lengths
            p = b; pidx = 0;
            i = 0;
            do {
                if ((j = p[pidx++]) != 0)
                    v[x[j]++] = i;
            } while (++i < n);
            n = x[g];			// set n to length of v

            // Generate the Huffman codes and for each, make the table entries
            x[0] = i = 0;		// first Huffman code is zero
            p = v; pidx = 0;		// grab values in bit order
            h = -1;			// no tables yet--level -1
            w = lx[0] = 0;		// no bits decoded yet
            q = null;			// ditto
            z = 0;			// ditto

            // go through the bit lengths (k already is bits in shortest code)
            for (; k <= g; k++) {
                a = c[k];
                while (a-- > 0) {
                    // here i is the Huffman code of length k bits for value p[pidx]
                    // make tables up to required level
                    while (k > w + lx[1 + h]) {
                        w += lx[1 + h]; // add bits already decoded
                        h++;

                        // compute minimum size table less than or equal to *m bits
                        z = (z = g - w) > mm ? mm : z; // upper limit
                        if ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
                            // too few codes for k-w bit table
                            f -= a + 1;	// deduct codes from patterns left
                            xp = k;
                            while (++j < z) { // try smaller tables up to z bits
                                if ((f <<= 1) <= c[++xp])
                                    break;	// enough codes to use up j bits
                                f -= c[xp];	// else deduct codes from patterns
                            }
                        }
                        if (w + j > el && w < el)
                            j = el - w;	// make EOB code end at table
                        z = 1 << j;	// table entries for j-bit table
                        lx[1 + h] = j; // set table size in stack

                        // allocate and link in new table
                        q = new Array(z);
                        for (o = 0; o < z; o++) {
                            q[o] = new zip_HuftNode();
                        }

                        if (tail == null)
                            tail = this.root = new zip_HuftList();
                        else
                            tail.next = tail = new zip_HuftList();
                        tail.next = null;
                        tail.list = q;
                        u[h] = q;	// table starts after link

                        /* connect to last table, if there is one */
                        if (h > 0) {
                            x[h] = i;		// save pattern for backing up
                            r.b = lx[h];	// bits to dump before this table
                            r.e = 16 + j;	// bits in this table
                            r.t = q;		// pointer to this table
                            j = (i & ((1 << w) - 1)) >> (w - lx[h]);
                            u[h - 1][j].e = r.e;
                            u[h - 1][j].b = r.b;
                            u[h - 1][j].n = r.n;
                            u[h - 1][j].t = r.t;
                        }
                    }

                    // set up table entry in r
                    r.b = k - w;
                    if (pidx >= n)
                        r.e = 99;		// out of values--invalid code
                    else if (p[pidx] < s) {
                        r.e = (p[pidx] < 256 ? 16 : 15); // 256 is end-of-block code
                        r.n = p[pidx++];	// simple code is just the value
                    } else {
                        r.e = e[p[pidx] - s];	// non-simple--look up in lists
                        r.n = d[p[pidx++] - s];
                    }

                    // fill code-like entries with r //
                    f = 1 << (k - w);
                    for (j = i >> w; j < z; j += f) {
                        q[j].e = r.e;
                        q[j].b = r.b;
                        q[j].n = r.n;
                        q[j].t = r.t;
                    }

                    // backwards increment the k-bit code i
                    for (j = 1 << (k - 1); (i & j) != 0; j >>= 1)
                        i ^= j;
                    i ^= j;

                    // backup over finished tables
                    while ((i & ((1 << w) - 1)) != x[h]) {
                        w -= lx[h];		// don't need to update q
                        h--;
                    }
                }
            }

            /* return actual size of base table */
            this.m = lx[1];

            /* Return true (1) if we were given an incomplete table */
            this.status = ((y != 0 && g != 1) ? 1 : 0);
        } /* end of constructor */
    }


    /* routines (inflate) */

    function zip_GET_BYTE() {
        if (zip_inflate_data.length == zip_inflate_pos)
            return -1;
        return zip_inflate_data.charCodeAt(zip_inflate_pos++) & 0xff;
    }

    function zip_NEEDBITS(n) {
        while (zip_bit_len < n) {
            zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
            zip_bit_len += 8;
        }
    }

    function zip_GETBITS(n) {
        return zip_bit_buf & zip_MASK_BITS[n];
    }

    function zip_DUMPBITS(n) {
        zip_bit_buf >>= n;
        zip_bit_len -= n;
    }

    function zip_inflate_codes(buff, off, size) {
        /* inflate (decompress) the codes in a deflated (compressed) block.
           Return an error code or zero if it all goes ok. */
        var e;		// table entry flag/number of extra bits
        var t;		// (zip_HuftNode) pointer to table entry
        var n;

        if (size == 0)
            return 0;

        // inflate the coded data
        n = 0;
        for (; ;) {			// do until end of block
            zip_NEEDBITS(zip_bl);
            t = zip_tl.list[zip_GETBITS(zip_bl)];
            e = t.e;
            while (e > 16) {
                if (e == 99)
                    return -1;
                zip_DUMPBITS(t.b);
                e -= 16;
                zip_NEEDBITS(e);
                t = t.t[zip_GETBITS(e)];
                e = t.e;
            }
            zip_DUMPBITS(t.b);

            if (e == 16) {		// then it's a literal
                zip_wp &= zip_WSIZE - 1;
                buff[off + n++] = zip_slide[zip_wp++] = t.n;
                if (n == size)
                    return size;
                continue;
            }

            // exit if end of block
            if (e == 15)
                break;

            // it's an EOB or a length

            // get length of block to copy
            zip_NEEDBITS(e);
            zip_copy_leng = t.n + zip_GETBITS(e);
            zip_DUMPBITS(e);

            // decode distance of block to copy
            zip_NEEDBITS(zip_bd);
            t = zip_td.list[zip_GETBITS(zip_bd)];
            e = t.e;

            while (e > 16) {
                if (e == 99)
                    return -1;
                zip_DUMPBITS(t.b);
                e -= 16;
                zip_NEEDBITS(e);
                t = t.t[zip_GETBITS(e)];
                e = t.e;
            }
            zip_DUMPBITS(t.b);
            zip_NEEDBITS(e);
            zip_copy_dist = zip_wp - t.n - zip_GETBITS(e);
            zip_DUMPBITS(e);

            // do the copy
            while (zip_copy_leng > 0 && n < size) {
                zip_copy_leng--;
                zip_copy_dist &= zip_WSIZE - 1;
                zip_wp &= zip_WSIZE - 1;
                buff[off + n++] = zip_slide[zip_wp++]
                    = zip_slide[zip_copy_dist++];
            }

            if (n == size)
                return size;
        }

        zip_method = -1; // done
        return n;
    }

    function zip_inflate_stored(buff, off, size) {
        /* "decompress" an inflated type 0 (stored) block. */
        var n;

        // go to byte boundary
        n = zip_bit_len & 7;
        zip_DUMPBITS(n);

        // get the length and its complement
        zip_NEEDBITS(16);
        n = zip_GETBITS(16);
        zip_DUMPBITS(16);
        zip_NEEDBITS(16);
        if (n != ((~zip_bit_buf) & 0xffff))
            return -1;			// error in compressed data
        zip_DUMPBITS(16);

        // read and output the compressed data
        zip_copy_leng = n;

        n = 0;
        while (zip_copy_leng > 0 && n < size) {
            zip_copy_leng--;
            zip_wp &= zip_WSIZE - 1;
            zip_NEEDBITS(8);
            buff[off + n++] = zip_slide[zip_wp++] =
                zip_GETBITS(8);
            zip_DUMPBITS(8);
        }

        if (zip_copy_leng == 0)
            zip_method = -1; // done
        return n;
    }

    function zip_inflate_fixed(buff, off, size) {
        /* decompress an inflated type 1 (fixed Huffman codes) block.  We should
           either replace this with a custom decoder, or at least precompute the
           Huffman tables. */

        // if first time, set up tables for fixed blocks
        if (zip_fixed_tl == null) {
            var i;			// temporary variable
            var l = new Array(288);	// length list for huft_build
            var h;	// zip_HuftBuild

            // literal table
            for (i = 0; i < 144; i++)
                l[i] = 8;
            for (; i < 256; i++)
                l[i] = 9;
            for (; i < 280; i++)
                l[i] = 7;
            for (; i < 288; i++)	// make a complete, but wrong code set
                l[i] = 8;
            zip_fixed_bl = 7;

            h = new zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext,
                zip_fixed_bl);
            if (h.status != 0) {
                alert("HufBuild error: " + h.status);
                return -1;
            }
            zip_fixed_tl = h.root;
            zip_fixed_bl = h.m;

            // distance table
            for (i = 0; i < 30; i++)	// make an incomplete code set
                l[i] = 5;
            zip_fixed_bd = 5;

            h = new zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
            if (h.status > 1) {
                zip_fixed_tl = null;
                alert("HufBuild error: " + h.status);
                return -1;
            }
            zip_fixed_td = h.root;
            zip_fixed_bd = h.m;
        }

        zip_tl = zip_fixed_tl;
        zip_td = zip_fixed_td;
        zip_bl = zip_fixed_bl;
        zip_bd = zip_fixed_bd;
        return zip_inflate_codes(buff, off, size);
    }

    function zip_inflate_dynamic(buff, off, size) {
        // decompress an inflated type 2 (dynamic Huffman codes) block.
        var i;		// temporary variables
        var j;
        var l;		// last length
        var n;		// number of lengths to get
        var t;		// (zip_HuftNode) literal/length code table
        var nb;		// number of bit length codes
        var nl;		// number of literal/length codes
        var nd;		// number of distance codes
        var ll = new Array(286 + 30); // literal/length and distance code lengths
        var h;		// (zip_HuftBuild)

        for (i = 0; i < ll.length; i++)
            ll[i] = 0;

        // read in table lengths
        zip_NEEDBITS(5);
        nl = 257 + zip_GETBITS(5);	// number of literal/length codes
        zip_DUMPBITS(5);
        zip_NEEDBITS(5);
        nd = 1 + zip_GETBITS(5);	// number of distance codes
        zip_DUMPBITS(5);
        zip_NEEDBITS(4);
        nb = 4 + zip_GETBITS(4);	// number of bit length codes
        zip_DUMPBITS(4);
        if (nl > 286 || nd > 30)
            return -1;		// bad lengths

        // read in bit-length-code lengths
        for (j = 0; j < nb; j++) {
            zip_NEEDBITS(3);
            ll[zip_border[j]] = zip_GETBITS(3);
            zip_DUMPBITS(3);
        }
        for (; j < 19; j++)
            ll[zip_border[j]] = 0;

        // build decoding table for trees--single level, 7 bit lookup
        zip_bl = 7;
        h = new zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
        if (h.status != 0)
            return -1;	// incomplete code set

        zip_tl = h.root;
        zip_bl = h.m;

        // read in literal and distance code lengths
        n = nl + nd;
        i = l = 0;
        while (i < n) {
            zip_NEEDBITS(zip_bl);
            t = zip_tl.list[zip_GETBITS(zip_bl)];
            j = t.b;
            zip_DUMPBITS(j);
            j = t.n;
            if (j < 16)		// length of code in bits (0..15)
                ll[i++] = l = j;	// save last length in l
            else if (j == 16) {	// repeat last length 3 to 6 times
                zip_NEEDBITS(2);
                j = 3 + zip_GETBITS(2);
                zip_DUMPBITS(2);
                if (i + j > n)
                    return -1;
                while (j-- > 0)
                    ll[i++] = l;
            } else if (j == 17) {	// 3 to 10 zero length codes
                zip_NEEDBITS(3);
                j = 3 + zip_GETBITS(3);
                zip_DUMPBITS(3);
                if (i + j > n)
                    return -1;
                while (j-- > 0)
                    ll[i++] = 0;
                l = 0;
            } else {		// j == 18: 11 to 138 zero length codes
                zip_NEEDBITS(7);
                j = 11 + zip_GETBITS(7);
                zip_DUMPBITS(7);
                if (i + j > n)
                    return -1;
                while (j-- > 0)
                    ll[i++] = 0;
                l = 0;
            }
        }

        // build the decoding tables for literal/length and distance codes
        zip_bl = zip_lbits;
        h = new zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
        if (zip_bl == 0)	// no literals or lengths
            h.status = 1;
        if (h.status != 0) {
            if (h.status == 1) ;

            return -1;		// incomplete code set
        }
        zip_tl = h.root;
        zip_bl = h.m;

        for (i = 0; i < nd; i++)
            ll[i] = ll[i + nl];
        zip_bd = zip_dbits;
        h = new zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
        zip_td = h.root;
        zip_bd = h.m;

        if (zip_bd == 0 && nl > 257) {   // lengths but no distances
            // **incomplete distance tree**
            return -1;
        }

        if (h.status == 1) ;
        if (h.status != 0)
            return -1;

        // decompress until an end-of-block code
        return zip_inflate_codes(buff, off, size);
    }

    function zip_inflate_start() {

        if (zip_slide == null)
            zip_slide = new Array(2 * zip_WSIZE);
        zip_wp = 0;
        zip_bit_buf = 0;
        zip_bit_len = 0;
        zip_method = -1;
        zip_eof = false;
        zip_copy_leng = zip_copy_dist = 0;
        zip_tl = null;
    }

    function zip_inflate_internal(buff, off, size) {
        // decompress an inflated entry
        var n, i;

        n = 0;
        while (n < size) {
            if (zip_eof && zip_method == -1)
                return n;

            if (zip_copy_leng > 0) {
                if (zip_method != zip_STORED_BLOCK) {
                    // STATIC_TREES or DYN_TREES
                    while (zip_copy_leng > 0 && n < size) {
                        zip_copy_leng--;
                        zip_copy_dist &= zip_WSIZE - 1;
                        zip_wp &= zip_WSIZE - 1;
                        buff[off + n++] = zip_slide[zip_wp++] =
                            zip_slide[zip_copy_dist++];
                    }
                } else {
                    while (zip_copy_leng > 0 && n < size) {
                        zip_copy_leng--;
                        zip_wp &= zip_WSIZE - 1;
                        zip_NEEDBITS(8);
                        buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
                        zip_DUMPBITS(8);
                    }
                    if (zip_copy_leng == 0)
                        zip_method = -1; // done
                }
                if (n == size)
                    return n;
            }

            if (zip_method == -1) {
                if (zip_eof)
                    break;

                // read in last block bit
                zip_NEEDBITS(1);
                if (zip_GETBITS(1) != 0)
                    zip_eof = true;
                zip_DUMPBITS(1);

                // read in block type
                zip_NEEDBITS(2);
                zip_method = zip_GETBITS(2);
                zip_DUMPBITS(2);
                zip_tl = null;
                zip_copy_leng = 0;
            }

            switch (zip_method) {
                case 0: // zip_STORED_BLOCK
                    i = zip_inflate_stored(buff, off + n, size - n);
                    break;

                case 1: // zip_STATIC_TREES
                    if (zip_tl != null)
                        i = zip_inflate_codes(buff, off + n, size - n);
                    else
                        i = zip_inflate_fixed(buff, off + n, size - n);
                    break;

                case 2: // zip_DYN_TREES
                    if (zip_tl != null)
                        i = zip_inflate_codes(buff, off + n, size - n);
                    else
                        i = zip_inflate_dynamic(buff, off + n, size - n);
                    break;

                default: // error
                    i = -1;
                    break;
            }

            if (i == -1) {
                if (zip_eof)
                    return 0;
                return -1;
            }
            n += i;
        }
        return n;
    }


    var JSInflate = {};
    GLOBAL['JSInflate'] = JSInflate;

    JSInflate.inflate = function (data) {
        var out, buff;
        var i, j;

        zip_inflate_start();
        zip_inflate_data = data;
        zip_inflate_pos = 0;

        buff = new Array(1024);
        out = "";
        while ((i = zip_inflate_internal(buff, 0, buff.length)) > 0) {
            for (j = 0; j < i; j++)
                out += String.fromCharCode(buff[j]);
        }
        zip_inflate_data = null; // G.C.

        return out;
    };


})(globalThis);

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */


/*
 * Interfaces:
 * data = base64decode(b64);
 */

/**
 * @const
 * @public
 */
const base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

/**
 * @public
 */
const base64decode = function(str) {
    var c1, c2, c3, c4;
    var i, len, out;
	var decodearr = base64DecodeChars;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = decodearr[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = decodearr[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = decodearr[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = decodearr[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
};

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt

// ------------------------------------------------------------------------------------------------
// ScriptingInterface
// public API implementation for CopperCube script extensions and generic JavaScript API
// ------------------------------------------------------------------------------------------------

globalThis._ccbScriptCache = new Array();

/**
 * @type {CL3D.ScriptingInterface}
 */
let gScriptingInterface = null;

/**
 * @public
 */
class vector3d {
	/**
	 * X coordinate of the vector
	 * @public
	 * @type Number
	 */
	x = 0;

	/**
	 * Y coordinate of the vector
	 * @public
	 * @type Number
	 */
	y = 0;

	/**
	 * Z coordinate of the vector
	 * @public
	 * @type Number
	 */
	z = 0;

	constructor(_x, _y, _z) {
		if (!(_x === null)) {
			this.x = _x;
			this.y = _y;
			this.z = _z;
		}

		else {
			this.x = 0;
			this.y = 0;
			this.z = 0;
		}
	}

	/**
	 * @public
	 */
	add(other) {
		return new vector3d(this.x + other.x, this.y + other.y, this.z + other.z);
	}

	/**
	 * @public
	 */
	substract(other) {
		return new vector3d(this.x - other.x, this.y - other.y, this.z - other.z);
	}

	/**
	 * @public
	 */
	getLength() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	/**
	 * @public
	 */
	normalize() {
		var l = this.getLength();
		if (l != 0) {
			l = 1 / l;
			this.x *= l;
			this.y *= l;
			this.z *= l;
		}
	}

	/**
	 * @public
	 */
	toString() {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
}
// ------------------------------------------------------------------------------------------------
// ScriptingInterface class
// ------------------------------------------------------------------------------------------------

/**
 * @public
 * @constructor
 * @class
 */
class ScriptingInterface {
	constructor() {
		this.nUniqueCounterID = -1;
		this.StoredExtensionScriptActionHandlers = new Array();
		this.IsInDrawCallback = false;
		this.CurrentlyActiveScene = null;
		this.CurrentlyRunningExtensionScriptAnimator = null;
		this.TheTextureManager = null;
		this.TheRenderer = null;
		this.Engine = null;
		this.ccbRegisteredFunctionArray = new Array();
		this.ccbRegisteredHTTPCallbackArray = new Array();
		this.LastHTTPRequestId = 0;

		// shader callback stuff
		this.ShaderCallBackSet = false;
		this.OriginalShaderCallBack = null;
		this.ShaderCallbacks = new Object();
		this.CurrentShaderMaterialType = 0;

		//this.registerScriptingFunctions();
	}
	/**
	 * @public
	 */
	static getScriptingInterface() {
		if (gScriptingInterface == null)
			gScriptingInterface = new ScriptingInterface();

		return gScriptingInterface;
	}
	/**
	 * @public
	 */
	static getScriptingInterfaceReadOnly() {
		return gScriptingInterface;
	}
	/**
	 * @public
	 */
	setTextureManager(t) {
		this.TheTextureManager = t;
	}
	/**
	 * @public
	 */
	setEngine(t) {
		this.Engine = t;
	}
	/**
	 * @public
	 */
	needsRedraw() {
		return this.ccbRegisteredFunctionArray.length != 0;
	}
	/**
	 * @public
	 */
	setCurrentlyRunningExtensionScriptAnimator(s) {
		this.CurrentlyRunningExtensionScriptAnimator = s;
	}
	/**
	 * @public
	 */
	setActiveScene(s) {
		this.CurrentlyActiveScene = s;
	}
	/**
	 * @public
	 */
	executeCode(code) {
		try {
			return (new Function(code))();
		}
		catch (err) {
			console.log(err);
		}
	}
	/**
	 * @public
	 */
	async importCode(code) {
		try {
			await import("data:text/javascript;charset=utf-8," + encodeURIComponent(code)).then(async (module) => {
				if (module.default) {
					globalThis[module.default.name] = module.default;
				}
			});
		}
		catch (err) {
			console.log(err);
		}
	}
	/**
	 * @public
	 */
	getUniqueCounterID() {
		++this.nUniqueCounterID;
		return this.nUniqueCounterID;
	}
	/**
	 * @public
	 */
	registerExtensionScriptActionHandler(handler) {
		for (var i = 0; i < this.StoredExtensionScriptActionHandlers.length; ++i) {
			var a = this.StoredExtensionScriptActionHandlers[i];
			if (a === handler)
				return i;
		}

		this.StoredExtensionScriptActionHandlers.push(handler);

		var actionid = this.StoredExtensionScriptActionHandlers.length - 1;
		if (this.StoredExtensionScriptActionHandlers[actionid])
		{
			var node = gScriptingInterface.CurrentlyActiveScene.getRootSceneNode();
			this.StoredExtensionScriptActionHandlers[actionid].execute(node, null);
		}

		return actionid;
	}
	/**
	 * @public
	 */
	runDrawCallbacks(theRenderer, timeMs) {
		this.IsInDrawCallback = true;

		if (this.ccbRegisteredFunctionArray.length != null) {
			this.TheRenderer = theRenderer;

			for (var i = 0; i < this.ccbRegisteredFunctionArray.length; ++i)
				this.ccbRegisteredFunctionArray[i](timeMs);

			this.TheRenderer = null;
		}

		this.IsInDrawCallback = false;
	}
	/**
	 * @public
	 */
	setSceneNodePropertyFromOverlay(overlaynode, propName, arg0, argsAsColor) {
		switch (propName) {
			case 'Position Mode': //    <- relative (percent) | absolute (pixels)
				overlaynode.SizeModeIsAbsolute = (arg0 == 'absolute (pixels)');
				break;
			case 'Pos X (percent)':
				overlaynode.PosRelativeX = arg0 / 100.0; break;
			case 'Pos Y (percent)':
				overlaynode.PosRelativeY = arg0 / 100.0; break;
			case 'Width (percent)':
				overlaynode.SizeRelativeWidth = arg0 / 100.0; break;
			case 'Height (percent)':
				overlaynode.SizeRelativeHeight = arg0 / 100.0; break;
			case 'Pos X (pixels)':
				overlaynode.PosAbsoluteX = arg0; break;
			case 'Pos Y (pixels)':
				overlaynode.PosAbsoluteY = arg0; break;
			case 'Width (pixels)':
				overlaynode.SizeAbsoluteWidth = arg0; break;
			case 'Height (pixels)':
				overlaynode.SizeAbsoluteHeight = arg0; break;
			case 'Alpha':
				overlaynode.BackGroundColor = ((arg0 & 0xff) << 24) | (overlaynode.BackGroundColor & 0x00ffffff);
				break;
			case 'Image':
				{
					var tex = this.TheTextureManager.getTextureFromName(arg0);
					overlaynode.Texture = tex;
				}
				break;
			case 'Background Color':
				overlaynode.BackGroundColor = argsAsColor;
				break;
			case 'Draw Text': // (true/false)
				overlaynode.DrawText = arg0 ? true : false;
				break;
			case 'TextColor':
				overlaynode.TextColor = argsAsColor;
				break;
			case 'Text':
				overlaynode.Text = arg0;
				break;
		}
	}
	/**
	 * @public
	 */
	getSceneNodePropertyFromOverlay(overlaynode, propName) {
		switch (propName) {
			case 'Position Mode': //    <- relative (percent) | absolute (pixels)
				return overlaynode.SizeModeIsAbsolute;
			case 'Pos X (percent)':
				return overlaynode.PosRelativeX * 100.0;
			case 'Pos Y (percent)':
				return overlaynode.PosRelativeY * 100.0;
			case 'Width (percent)':
				return overlaynode.SizeRelativeWidth * 100.0;
			case 'Height (percent)':
				return overlaynode.SizeRelativeHeight * 100.0;
			case 'Pos X (pixels)':
				return overlaynode.PosAbsoluteX;
			case 'Pos Y (pixels)':
				return overlaynode.PosAbsoluteY;
			case 'Width (pixels)':
				return overlaynode.SizeAbsoluteWidth;
			case 'Height (pixels)':
				return overlaynode.SizeAbsoluteHeight;
			case 'Alpha':
				return getAlpha(overlaynode.BackGroundColor);
			case 'Image':
				return overlaynode.Texture ? overlaynode.Texture.Name : null;
			case 'Background Color':
				return overlaynode.BackGroundColor;
			case 'Draw Text': // (true/false)
				return overlaynode.DrawText;
			case 'TextColor':
				return overlaynode.TextColor;
			case 'Text':
				return overlaynode.Text;
			case 'Texture Width (percent)':
				return overlaynode.TextureWidth * 100.0;
			case 'Texture Height (percent)':
				return overlaynode.TextureHeight * 100.0;
		}

		return null;
	}
}

// --------------------------------------------------------------
// AnimatorExtensionScript
// --------------------------------------------------------------

/**
 * @public
 */
class AnimatorExtensionScript extends Animator {
	constructor(scenemanager) {
		super();

		this.JsClassName = null;
		this.Properties = new Array();
		this.bAcceptsMouseEvents = false;
		this.bAcceptsKeyboardEvents = false;
		this.ScriptIndex = -1;
		this.bIsAttachedToCamera = false;
		this.SMGr = scenemanager;
	}

	/**
	 * @public
	 */
	setAcceptsEvents(bForMouse, bForKeyboard) {
		this.bAcceptsMouseEvents = bForMouse;
		this.bAcceptsKeyboardEvents = bForKeyboard;

		if (!this.bIsAttachedToCamera && this.SMGr) {
			var engine = ScriptingInterface.getScriptingInterface().Engine;
			if (bForKeyboard) {
				engine.registerAnimatorForKeyUp(this);
				engine.registerAnimatorForKeyDown(this);
			}

			this.SMGr.registerSceneNodeAnimatorForEvents(this);
		}
	}

	/**
	 * @public
	 */
	getType() {
		return 'extensionscript';
	}

	/**
	 * @public
	 */
	createClone(node, newManager, oldNodeId, newNodeId) {
		var a = new AnimatorExtensionScript(newManager);

		a.JsClassName = this.JsClassName;

		for (var i = 0; i < this.Properties.length; ++i) {
			var prop = this.Properties[i];

			if (prop != null)
				a.Properties.push(prop.createClone(oldNodeId, newNodeId));

			else
				a.Properties.push(null);
		}

		return a;
	}

	/**
	 * @public
	 */
	animateNode(n, timeMs) {
		if (n == null)
			return false;

		if (this.JsClassName == null || this.JsClassName.length == 0)
			return false;

		var engine = ScriptingInterface.getScriptingInterface();

		engine.setCurrentlyRunningExtensionScriptAnimator(this);

		if (this.ScriptIndex == -1)
			this.initScript(n, engine);

		if (this.ScriptIndex != -1) {
			// run script like this:
			// _ccbScriptCache[0].onAnimate(ccbGetSceneNodeFromId(thescenenodeid), timeMs);
			try {
				// _ccbScriptCache[this.ScriptIndex].onAnimate( n, timeMs );
				_ccbScriptCache[this.ScriptIndex]['onAnimate'](n, timeMs); // <-- closure working function call (won't get obfuscated)
			}
			catch (e) {
				console.log(this.JsClassName + ": " + e);
			}
		}

		engine.setCurrentlyRunningExtensionScriptAnimator(null);

		return true;
	}

	/**
	 * @public
	 */
	initScript(n, engine) {
		if (engine.executeCode(`typeof ${this.JsClassName} == 'undefined'`))
			return;

		let code = "";

		// we need to init the instance with the properties the user set for this extension
		const objPrefix = "this.";

		code = `
		try {
			${this.JsClassName}.prototype._init = function() {
				${ExtensionScriptProperty.generateInitJavaScriptCode(objPrefix, this.Properties)}
			};
		} catch(e) {
			console.log(e);
		}
		`;

		engine.executeCode(code);

		this.ScriptIndex = engine.getUniqueCounterID();

		let ccbScriptName = `_ccbScriptCache[${this.ScriptIndex}]`;

		code = `
		${ccbScriptName} = new ${this.JsClassName}();
		`;

		engine.executeCode(code);

		code = `
		try {
			${ccbScriptName}._init();
			ccbRegisterBehaviorEventReceiver(typeof ${ccbScriptName}.onMouseEvent != 'undefined',
												typeof ${ccbScriptName}.onKeyEvent != 'undefined');
		} catch (e) {
			console.log(e);
		}
		`;

		engine.executeCode(code);

		// we need to register for getting events if the script has this feature
		let bNodeIsCamera = false;
		if (n.getType() == 'camera') {
			bNodeIsCamera = true;
		}

		this.bIsAttachedToCamera = bNodeIsCamera;
	}

	/**
	 * @public
	 */
	sendMouseEvent(mouseEvtId, wheelDelta) {
		if (this.bAcceptsMouseEvents)
			// the following line would work, but not with the closure compiler
			//_ccbScriptCache[this.ScriptIndex].onMouseEvent(mouseEvtId);
			//CL3D.ScriptingInterface.getScriptingInterface().executeCode('_ccbScriptCache[' + this.ScriptIndex + '].onMouseEvent(' + mouseEvtId + ');');
			_ccbScriptCache[this.ScriptIndex]['onMouseEvent'](mouseEvtId, wheelDelta); // <-- closure working function call (won't get obfuscated)
	}

	/**
	 * @public
	 */
	sendKeyEvent(keycode, pressed) {
		if (this.bAcceptsKeyboardEvents)
			// the following line would work, but not with the closure compiler
			//_ccbScriptCache[this.ScriptIndex].onKeyEvent(keycode, pressed);
			//CL3D.ScriptingInterface.getScriptingInterface().executeCode('_ccbScriptCache[' + this.ScriptIndex + '].onKeyEvent(' + keycode + ',' + pressed + ');');
			_ccbScriptCache[this.ScriptIndex]['onKeyEvent'](keycode, pressed); // <-- closure working function call (won't get obfuscated)
	}

	/**
	 * @public
	 */
	onMouseUp(event) {
		var wasRightButton = false;
		if (event && event.button == 2) //2: Secondary button pressed, usually the right button
			wasRightButton = true;

		this.sendMouseEvent(wasRightButton ? 4 : 2, 0);
	}

	/**
	 * @public
	 */
	onMouseWheel(delta) {
		this.sendMouseEvent(1, delta);
	}

	/**
	 * @public
	 */
	onMouseDown(event) {
		var wasRightButton = false;
		if (event && event.button == 2) //2: Secondary button pressed, usually the right button
			wasRightButton = true;

		this.sendMouseEvent(wasRightButton ? 5 : 3, 0);
	}

	/**
	 * @public
	 */
	onMouseMove(event) {
		this.sendMouseEvent(0, 0);
	}

	/**
	 * @public
	 */
	onKeyDown(evt) {
		this.sendKeyEvent(evt.keyCode, true);
		return false;
	}

	/**
	 * @public
	 */
	onKeyUp(evt) {
		this.sendKeyEvent(evt.keyCode, false);
		return false;
	}
}
// --------------------------------------------------------------
// ExtensionScriptProperty
// --------------------------------------------------------------

/**
 * @public
 * @constructor
 * @class
 */
class ExtensionScriptProperty {
	constructor() {
		this.Type = -1;
		this.Name = null;

		this.StringValue = null;
		this.VectorValue = null;
		this.FloatValue = 0.0;
		this.IntValue = 0;
		this.ActionHandlerValue = null;
		this.TextureValue = null;
	}

	/**
	 * @public
	 */
	static stringReplace(source, find, replacement) {
		return source.split(find).join(replacement);
	}

	/**
	 * @public
	 */
	static generateInitJavaScriptCode(objPrefix, properties) {
		let code = "";

		for (let i = 0; i < properties.length; ++i) {
			let prop = properties[i];
			if (prop == null)
				continue;

			let value = null;
			switch (prop.Type) {
				case 1: //irr::scene::EESAT_FLOAT:
					value = prop.FloatValue;
					break;
				case 2: //irr::scene::EESAT_STRING:
					value = "\"" + ExtensionScriptProperty.stringReplace(prop.StringValue, "\"", "\\\"") + "\"";
					break;
				case 3: //irr::scene::EESAT_BOOL:
					value = prop.IntValue ? "true" : "false";
					break;
				case 6: //irr::scene::EESAT_VECTOR3D:
					value = `new vector3d(${prop.VectorValue.X}, ${prop.VectorValue.Y}, ${prop.VectorValue.Z})`;
					break;
				case 7: //irr::scene::EESAT_TEXTURE:
					value = "\"" + (prop.TextureValue ? prop.TextureValue.Name : "") + "\"";
					break;
				case 8: //irr::scene::EESAT_SCENE_NODE_ID:
					value = `ccbGetSceneNodeFromId(${prop.IntValue})`;
					break;
				case 9: //irr::scene::EESAT_ACTION_REFERENCE:
					value = ScriptingInterface.getScriptingInterface().registerExtensionScriptActionHandler(prop.ActionHandlerValue);
					break;
				case 0: //irr::scene::EESAT_INT:
				case 5: //irr::scene::EESAT_COLOR:
				case 4: //irr::scene::EESAT_ENUM:
				default:
					value = prop.IntValue;
					break;
			}

			code += `
				${objPrefix}${prop.Name} = ${value};
			`;
		}

		return code;
	}

	/**
	 * @public
	 */
	createClone(oldNodeId, newNodeId) {
		var c = new ExtensionScriptProperty();

		c.Type = this.Type;
		c.Name = this.Name;

		c.StringValue = this.StringValue;
		c.VectorValue = this.VectorValue ? this.VectorValue.clone() : null;
		c.FloatValue = this.FloatValue;
		c.IntValue = this.IntValue;

		if (this.ActionHandlerValue)
			c.ActionHandlerValue = this.ActionHandlerValue.createClone(oldNodeId, newNodeId);

		c.TextureValue = this.TextureValue;

		return c;
	}
}

// --------------------------------------------------------------
// ActionExtensionScript
// --------------------------------------------------------------

/**
 * @public
 * @constructor
 * @class
 */
class ActionExtensionScript extends Action {
	constructor() {
		super();

		this.Type = 'ExtensionScript';
		this.Properties = new Array();
		this.JsClassName = null;
	}

	/**
	 * @public
	 */
	createClone(oldNodeId, newNodeId) {
		var a = new ActionExtensionScript();

		a.JsClassName = this.JsClassName;

		for (var i = 0; i < this.Properties.length; ++i) {
			var prop = this.Properties[i];

			if (prop != null)
				a.Properties.push(prop.createClone(oldNodeId, newNodeId));

			else
				a.Properties.push(null);
		}

		return a;
	}

	/**
	 * @public
	 */
	execute(currentNode, sceneManager) {
		if (this.JsClassName == null || this.JsClassName.length == 0 || currentNode == null)
			return;

		let engine = ScriptingInterface.getScriptingInterface();

		if (engine.executeCode(`typeof ${this.JsClassName} == 'undefined'`))
			return;

		let code = "";

		// we need to init the instance with the properties the user set for this extension
		const objPrefix = "this.";

		code = `
		try {
			${this.JsClassName}.prototype._init = function() {
				${ExtensionScriptProperty.generateInitJavaScriptCode(objPrefix, this.Properties)}
			}
		} catch(e) {
			console.log(e);
		}
		`;

		engine.executeCode(code);

		this.ScriptIndex = engine.getUniqueCounterID();

		let ccbScriptName = `_ccbScriptCache[${this.ScriptIndex}]`;

		code = `
			${ccbScriptName} = new ${this.JsClassName}();
		`;

		engine.executeCode(code);

		code = `
		try {
			${ccbScriptName}._init();
			${ccbScriptName}.execute(ccbGetSceneNodeFromId(${currentNode.Id}));
		} catch(e) {
			console.log(e);
		}
		`;

		engine.executeCode(code);
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * @type {Boolean}
 * Global flag disabling post effects if hardware or browser is not capable of doing them.
 */
let Global_PostEffectsDisabled = false;

const GLSL = String.raw;

/**
 * @constructor
 * @class A 3d scene, containing all {@link SceneNode}s.
 * The scene holds all {@link SceneNode}s and is able to draw and animate them.
 */
class Scene {
	/**
	 * Constant for using in {@link Scene.setRedrawMode}, specifying the scene should be redrawn only when the camera changed
	 * @static
	 * @public
	 */
	static REDRAW_WHEN_CAM_MOVED = 2;

	/**
	 * Constant for using in {@link Scene.setRedrawMode}, specifying the scene should be redrawn only when the scene has changed
	 * @static
	 * @public
	 */
	static REDRAW_WHEN_SCENE_CHANGED = 1;

	/**
	 * Constant for using in {@link Scene.setRedrawMode}, specifying the scene should be redrawn every frame.
	 * @static
	 * @public
	 */
	static REDRAW_EVERY_FRAME = 2;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static RENDER_MODE_SKYBOX = 1;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static RENDER_MODE_DEFAULT = 0;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static RENDER_MODE_LIGHTS = 2;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static RENDER_MODE_CAMERA = 3;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static RENDER_MODE_TRANSPARENT = 4;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static RENDER_MODE_2DOVERLAY = 5;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * Used by objects in order to render the fully animated scene as separate pass into their
	 * own render target texture. They can call drawRegistered3DNodes() for this once this pass is called.
	 * @static
	 * @public
	 */
	static RENDER_MODE_RTT_SCENE = 6;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * Used by the scene manager to indicate that the current rendering call is for drawing into a shadow buffer
	 * @static
	 * @public
	 */
	static RENDER_MODE_SHADOW_BUFFER = 8;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static TRANSPARENT_SOLID_AFTER_ZBUFFER_CLEAR = 9;

	/**
	 * Constant for using in {@link Scene.registerNodeForRendering}, specifying the render mode of a scene node.
	 * @static
	 * @public
	 */
	static RENDER_MODE_TRANSPARENT_AFTER_ZBUFFER_CLEAR = 10;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_BLOOM = 0;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_BLACK_AND_WHITE = 1;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_INVERT = 2;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_BLUR = 3;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_COLORIZE = 4;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_VIGNETTE = 5;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_LIGHT_TRESHOLD = 6;

	/**
	 * Constant for post effect mode
	 * @static
	 * @public
	 */
	static EPOSTEFFECT_BLUR_HORIZONTAL = 7;

	/**
	 * Constant for post effect mode
	 * @const
	 * @public
	 */
	static EPOSTEFFECT_BLUR_VERTICAL = 8;

	/**
	 * Constant for post effect mode
	 * @const
	 * @public
	 */
	static EPOSTEFFECT_COUNT = 9;

	/**
	 * @public
	 */
	TriedShadowInit = false;

	/**
	 * @public
	 * Render target texture for creating shadow maps
	 */
	ShadowBuffer = null;

	/**
	 * @public
	 * Second eender target texture for creating shadow maps, but only used in case CL3D.UseShadowCascade is true
	 */
	ShadowBuffer2 = null;

	/**
	 * @public
	 */
	ShadowDrawMaterialSolid = null;

	/**
	 * @public
	 */
	ShadowDrawMaterialAlphaRef = null;

	/**
	 * @public
	 */
	ShadowMapLightMatrix = null;

	/**
	 * Enable for rendering realtime 3D shadows in this scene. The scene must have a directional light for this.
	 * @public
	 * @type Boolean
	 */
	ShadowMappingEnabled = false;

	/**
	 * Value for influencing which pixels are taken for in shadow and which are not.
	 * Depends on your scene. Tweak it so that the shadows in your scene look the way you want them to,
	 * values like 0.001, 0.0001 or even 0.00001 are usual.
	 * @public
	 * @type Number
	 */
	ShadowMapBias1 = 0.001; // use a value like 0.000003 for non-orthogonal cameras
	ShadowMapBias2 = 0.0001; // use a value like 0.000003 for non-orthogonal cameras

	/**
	 * Controls the transparency with which the shadows are being drawn.
	 * @public
	 * @type Number
	 */
	ShadowMapOpacity = 0.5;

	/**
	 * Controls shadowmap backface bias. 0.5 culls backfaces for shadows nicely looking, 0 not at all, and 1 culls all shadows away.
	 * @public
	 * @type Number
	 */
	ShadowMapBackFaceBias = 0.5;

	/**
	 * Use orthogonal light for shadows. Usually leave this 'true'.
	 * @public
	 */
	ShadowMapOrthogonal = true;

	/**
	 * this gives a way to adjust the detail: Between how long are shadows visible in
	 * the distance and how detailed the shadow map is in close vicinity. Make the value bigger
	 * (like 1.0) for longer viewable shadows but with smaller details, and smaller (like 0.2)
	 * for detailed shadow which don't have a big view distance.
	 * @public
	 * @type Number
	 */
	ShadowMapCameraViewDetailFactor = 0.2;

	/**
	 * Texture size of the shadow map, usually 1024
	 * @public
	 * @type Number
	 */
	ShadowMapResolution = 1024;

	POSTPROCESS_SHADER_COLORIZE = GLSL`
	//#version 100
	precision mediump float;

	uniform vec4 PARAM_Colorize_Color;
	uniform sampler2D texture1;
	varying vec2 v_texCoord1;

	void main()
	{
		vec4 col = texture2D( texture1, v_texCoord1.xy );
		gl_FragColor = col * PARAM_Colorize_Color;
	}`;

	POSTPROCESS_SHADER_BLUR_HORIZONTAL = GLSL`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform float PARAM_SCREENX;
	varying vec2 v_texCoord1;

	void main()
	{
		const int sampleCount = 4;
		const float sampleFactor = 2.0;
		const float sampleStart = (float(sampleCount)*sampleFactor) / -2.0;
		vec2 halfPixel = vec2(0.5 / PARAM_SCREENX, 0.5 / PARAM_SCREENX);
		vec4 col = vec4(0.0, 0.0, 0.0, 0.0);
		for(int i=0; i<sampleCount; ++i)
		{
			vec2 tcoord = v_texCoord1.xy + vec2((sampleStart + float(i)*sampleFactor) / PARAM_SCREENX, 0.0) + halfPixel;
			col += texture2D( texture1, clamp(tcoord, vec2(0.0, 0.0), vec2(1.0, 1.0) ) );
		}
		col /= float(sampleCount);
		gl_FragColor = col;
	}`;

	POSTPROCESS_SHADER_BLUR_VERTICAL = GLSL`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform float PARAM_SCREENY;
	varying vec2 v_texCoord1;

	void main()
	{
		const int sampleCount = 4;
		const float sampleFactor = 2.0;
		const float sampleStart = (float(sampleCount)*sampleFactor) / -2.0;
		vec2 halfPixel = vec2(0.5 / PARAM_SCREENY, 0.5 / PARAM_SCREENY);
		vec4 col = vec4(0.0, 0.0, 0.0, 0.0);
		for(int i=0; i<sampleCount; ++i)
		{
			vec2 tcoord = v_texCoord1.xy + vec2(0.0, (sampleStart + float(i)*sampleFactor) / PARAM_SCREENY) + halfPixel;
			col += texture2D( texture1, clamp(tcoord, vec2(0.0, 0.0), vec2(1.0, 1.0) ) );
		}
		col /= float(sampleCount);
		gl_FragColor = col;
	}`;

	POSTPROCESS_SHADER_LIGHT_TRESHOLD = GLSL`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	uniform float PARAM_LightTreshold_Treshold;
	varying vec2 v_texCoord1;

	void main()
	{
		vec4 col = texture2D( texture1, v_texCoord1.xy );
		float lum = 0.3*col.r + 0.59*col.g + 0.11*col.b;
		if (lum > PARAM_LightTreshold_Treshold)
			gl_FragColor = col;
		else
			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	}`;

	POSTPROCESS_SHADER_BLACK_AND_WHITE = GLSL`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	varying vec2 v_texCoord1;

	void main()
	{
		vec4 col = texture2D( texture1, v_texCoord1.xy );
		float lum = 0.3*col.r + 0.59*col.g + 0.11*col.b;
		gl_FragColor = vec4(lum, lum, lum, 1.0);
	}`;

	POSTPROCESS_SHADER_VIGNETTE = GLSL`
	//#version 100
	precision mediump float;

	uniform float PARAM_Vignette_Intensity;
	uniform float PARAM_Vignette_RadiusA;
	uniform float PARAM_Vignette_RadiusB;
	uniform sampler2D texture1;
	varying vec2 v_texCoord1;

	void main()
	{
		vec4 col = texture2D( texture1, v_texCoord1.xy );
		float e1 =  ( v_texCoord1.x - 0.5 ) / ( PARAM_Vignette_RadiusA );
		float e2 =  ( v_texCoord1.y - 0.5 ) / ( PARAM_Vignette_RadiusB );
		float d  = clamp(2.0 - ((e1 * e1) + (e2 * e2)), 0.0, 1.0);
		gl_FragColor = col * ((1.0 - PARAM_Vignette_Intensity) + (PARAM_Vignette_Intensity * d));
	}`;

	POSTPROCESS_SHADER_INVERT = GLSL`
	//#version 100
	precision mediump float;

	uniform sampler2D texture1;
	varying vec2 v_texCoord1;

	void main()
	{
		vec4 col = texture2D( texture1, v_texCoord1 );
		gl_FragColor = vec4(1.0 - col.rgb, 1.0);
	}`;

	constructor() {
		this.init();
	}

	/**
	 * Initializes the scene node, can be called by scene nodes derived from this class.
	 * @public
	 */
	init() {
		this.RootNode = new SceneNode();
		this.RootNode.scene = this;
		this.Name = '';
		this.BackgroundColor = 0;
		this.CollisionWorld = null;

		this.AmbientLight = new ColorF();
		this.AmbientLight.R = 0.0;
		this.AmbientLight.G = 0.0;
		this.AmbientLight.B = 0.0;

		this.Gravity = 1.0;

		this.FogEnabled = false;
		this.FogColor = createColor(255, 200, 200, 200);
		this.FogDensity = 0.001;

		this.WindSpeed = 1.0;
		this.WindStrength = 4.0;

		/**
		 * @type {Array.<{Active: boolean}>}
		 */
		this.PostEffectData = new Array();
		for (var ip = 0; ip < 6; ++ip) {
			var peo = { Active: false };
			this.PostEffectData.push(peo);
		}

		this.PE_bloomBlurIterations = 1;
		this.PE_bloomTreshold = 0.5;
		this.PE_blurIterations = 1;
		this.PE_colorizeColor = 0xffff0000;
		this.PE_vignetteIntensity = 0.8;
		this.PE_vignetteRadiusA = 0.5;
		this.PE_vignetteRadiusB = 0.5;

		// scene manager related
		this.LastUsedRenderer = null;
		this.StartTime = 0;
		this.ActiveCamera = null;
		this.ForceRedrawThisFrame = false;
		this.LastViewProj = new Matrix4();
		this.TheSkyBoxSceneNode = null;
		this.RedrawMode = 2;

		this.CurrentRenderMode = 0;
		this.SceneNodesToRender = new Array();
		this.SceneNodesToRenderTransparent = new Array();
		this.SceneNodesToRenderAfterZClearForFPSCamera = new Array();
		this.SceneNodesToRenderTransparentAfterZClearForFPSCamera = new Array();
		this.LightsToRender = new Array();
		this.RenderToTextureNodes = new Array();
		this.Overlay2DToRender = new Array();
		this.RegisteredSceneNodeAnimatorsForEventsList = new Array();

		this.NodeCountRenderedLastTime = 0;
		this.SkinnedMeshesRenderedLastTime = 0;
		this.UseCulling = false;
		this.CurrentCameraFrustrum = null;

		// runtime
		this.WasAlreadyActivatedOnce = false;
		/**
		 * @type {Array.<{node: CL3D.SceneNode, timeAfterToDelete: Number}>}
		 */
		this.DeletionList = new Array();
		this.LastBulletImpactPosition = new Vect3d; // hack for IRR_SCENE_MANAGER_LAST_BULLET_IMPACT_POSITION parameter


		// runtime post processing
		this.RTTSizeWhenStartingPostEffects = null;
		this.CurrentPostProcessRTTTargetIndex = -1;
		this.CurrentPostProcessRTTTargetSizeFactor = 1.0;
		this.PostProcessingVerticesQuadBuffer = new MeshBuffer();
		this.PostEffectsInitialized = false;
		this.PostProcessingShaderInstances = [];
	}

	/**
	  * Returns the type string of the current scene.
	  * @public
	*/
	getCurrentCameraFrustrum() {
		return this.CurrentCameraFrustrum;
	}

	/**
	  * Returns the type string of the current scene.
	  * @public
	*/
	getSceneType() {
		return "unknown";
	}

	/**
	  * returns true if rendering needs to be done at all
	  * @public
	*/
	doAnimate(renderer) {
		this.LastUsedRenderer = renderer;

		if (this.StartTime == 0)
			this.StartTime = CLTimer.getTime();

		// clear
		this.TheSkyBoxSceneNode = null;

		// animate
		var sceneChanged = false;

		if (this.clearDeletionList(false))
			sceneChanged = true;

		if (this.RootNode.OnAnimate(this, CLTimer.getTime()))
			sceneChanged = true;

		var viewHasChanged = this.HasViewChangedSinceLastRedraw();
		var textureLoadWasFinished = renderer ? renderer.getAndResetTextureWasLoadedFlag() : false;

		// check if we need to redraw at all
		var needToRedraw = this.ForceRedrawThisFrame ||
			(this.RedrawMode == 0 /*REDRAW_WHEN_CAM_MOVED*/ && (viewHasChanged || textureLoadWasFinished)) ||
			(this.RedrawMode == 1 /*REDRAW_WHEN_SCENE_CHANGED*/ && (viewHasChanged || sceneChanged || textureLoadWasFinished)) ||
			(this.RedrawMode == 2 /*REDRAW_EVERY_FRAME*/) ||
			ScriptingInterface.getScriptingInterface().needsRedraw();

		if (!needToRedraw) {
			//Debug.print("Don't need to redraw at all.");
			return false;
		}

		this.ForceRedrawThisFrame = false;
		return true;
	}

	/**
	  * Returns the current mode of rendering, can be for example {@link Scene.RENDER_MODE_TRANSPARENT}.
	  * Is useful for scene nodes which render themselves for example both solid and transparent.
	  * @public
	*/
	getCurrentRenderMode() {
		return this.CurrentRenderMode;
	}

	initShadowMapRendering(renderer) {
		if (this.ShadowBuffer)
			return true;

		if (this.TriedShadowInit)
			return false;

		this.TriedShadowInit = true;

		if (!this.ShadowBuffer) {
			// create RTT
			var bufferSize = this.ShadowMapResolution;
			var useFloatingPointTexture = !renderer.ShadowMapUsesRGBPacking;

			this.ShadowBuffer = renderer.addRenderTargetTexture(
				bufferSize, bufferSize, useFloatingPointTexture);

			if (!this.ShadowBuffer)
				return false;

			// if using a shadow cascade, create a second buffer for that
			{
				var tSize2 = bufferSize;
				if (tSize2 > 1000) tSize2 = tSize2 / 2;

				this.ShadowBuffer2 = renderer.addRenderTargetTexture(
					tSize2, tSize2, useFloatingPointTexture);

				if (!this.ShadowBuffer2) {
					this.ShadowBuffer = null;
					return false;
				}
			}

			// create shader for rendering into shadow map
			this.ShadowDrawMaterialSolid = new Material();
			this.ShadowDrawMaterialAlphaRef = new Material();
			this.ShadowDrawMaterialAlphaRefMovingGrass = new Material();

			var newMaterialTypeSolid = renderer.createMaterialType(
				renderer.vs_shader_normaltransform_for_shadowmap,
				useFloatingPointTexture ? renderer.fs_shader_draw_depth_shadowmap_depth :
					renderer.fs_shader_draw_depth_shadowmap_rgbapack
			);


			var newMaterialTypeAlphaRef = renderer.createMaterialType(
				renderer.vs_shader_normaltransform_alpharef_for_shadowmap,
				renderer.fs_shader_alpharef_draw_depth_shadowmap_depth
			);

			var newMaterialTypeAlphaRefMovingGrass = renderer.createMaterialType(
				renderer.vs_shader_normaltransform_alpharef_moving_grass_for_shadowmap,
				renderer.fs_shader_alpharef_draw_depth_shadowmap_depth
			);


			if (newMaterialTypeSolid == -1 ||
				newMaterialTypeAlphaRef == -1 ||
				newMaterialTypeAlphaRefMovingGrass == -1) {
				this.ShadowBuffer = null;
				this.ShadowBuffer2 = null;
				return false;
			}

			this.ShadowDrawMaterialSolid.Type = newMaterialTypeSolid;
			this.ShadowDrawMaterialAlphaRef.Type = newMaterialTypeAlphaRef;
			this.ShadowDrawMaterialAlphaRefMovingGrass.Type = newMaterialTypeAlphaRefMovingGrass;
		}

		return true;
	}

	renderShadowMap(renderer) {
		// The code in this method is unfinished for now and only creates shadow map renderings for
		// the internal test cases. It will be extended in future updates.
		if (!this.initShadowMapRendering(renderer))
			return false;

		// find directional light
		var lightDirection = null;

		for (var i = 0; i < this.LightsToRender.length; ++i) {
			var lnode = this.LightsToRender[i];

			if (lnode.LightData && lnode.LightData.IsDirectional) {
				lightDirection = lnode.LightData.Direction.clone();
				break;
			}
		}

		if (!lightDirection)
			return false; // we only support shadow maps from directional light for now

		// go through everything and draw it using shadow buffer from light
		// setup camera
		var cam = this.getActiveCamera();
		var origProjection = cam.Projection.clone();
		var origView = cam.ViewMatrix.clone();
		var origUpVector = cam.UpVector.clone();
		var origTarget = cam.Target.clone();
		var origPosition = cam.Pos.clone();
		var origBinding = cam.TargetAndRotationAreBound;
		var origByUser = cam.ViewMatrixIsSetByUser;

		cam.ViewMatrixIsSetByUser = true;
		cam.TargetAndRotationAreBound = false;

		// calculate positions
		// calculate BBox around visible objects
		// This will simply include all objects. Which means if the scene gets too big,
		// the shadow map will not be detailed enough.
		var bbBox = new Box3d();
		var boxesAdded = 0;

		for (var i = 0; i < this.SceneNodesToRender.length; ++i) {
			var s = this.SceneNodesToRender[i];
			var transformedBox = s.getTransformedBoundingBox();

			if (boxesAdded == 0)
				bbBox = transformedBox;

			else
				bbBox.addInternalBox(transformedBox);

			++boxesAdded;
		}

		// set target
		var oldRenderTarget = renderer.getRenderTarget();

		for (var pass = 0; pass < (2 ); ++pass) {
			if (!renderer.setRenderTarget(pass == 0 ? this.ShadowBuffer : this.ShadowBuffer2, true, true))
				break;

			// find a good position for directional light so that all shadows are in the light/camera frustrum:
			// frustrum should be minimal (to keep resolution high) and contain all objects.
			// Best approach would be like this:
			// 	- calculate BBox around visible objects
			//	- transform the corners of the box light space (using light view matrix)
			//  - calculate BBox (ideally an obb) of this transformed box
			//  - use that oriented bounding box as the orthographic frustrum
			var lightpos = new Vect3d(40, 100, 40);
			var lightTarget = new Vect3d(0, 0, 0);

			var orthoViewWidth = 120;

			// get light position and target from box
			var frustrumLength = bbBox.getExtent().getLength();
			var center = bbBox.getCenter();

			if (pass == 0) {
				// follow camera with shadow camera and keep frustrum small
				var camVector = origTarget.substract(origPosition);
				camVector.setLength(orthoViewWidth);
				center = origPosition.add(camVector);

				orthoViewWidth = frustrumLength * this.ShadowMapCameraViewDetailFactor;
			}

			else {
				// make frustrum contain basically everything
				orthoViewWidth = frustrumLength * 0.9;
			}

			var lightdir = lightDirection.clone();
			lightdir.setLength(frustrumLength * 1.0);
			lightpos = center.substract(lightdir);
			lightdir.setLength(frustrumLength * -1.0);
			lightTarget = center.substract(lightdir);

			// set matrix for directional light
			var upVector = new Vect3d(0.0, 1.0, 0.0);

			// move upvector a bit if it is perpendicular to the light direction
			var dot = lightTarget.substract(lightpos).getNormalized().dotProduct(upVector);
			if (dot == -1)
				upVector.X += 0.01;

			cam.ViewMatrix.buildCameraLookAtMatrixLH(lightpos, lightTarget, upVector);

			var zNear = 1.0; // cam.ZNear default is 0.1, but it works much better with 1.0
			var zFar = Math.max(100.0, frustrumLength) * 2.0; //cam.ZFar;

			if (this.ShadowMapOrthogonal)
				cam.Projection.buildProjectionMatrixPerspectiveOrthoLH(orthoViewWidth, orthoViewWidth, zNear, zFar);

			else
				cam.Projection.buildProjectionMatrixPerspectiveFovLH(PI / 3.5, 4.0 / 3.0, zNear, zFar);

			var smatrix = new Matrix4();
			smatrix = smatrix.multiply(cam.Projection);
			smatrix = smatrix.multiply(cam.ViewMatrix);

			if (pass == 0)
				this.ShadowMapLightMatrix = smatrix;

			else
				this.ShadowMapLightMatrix2 = smatrix;


			// render geometry similar to in drawRegistered3DNodes()
			// camera
			// active camera
			this.CurrentRenderMode = Scene.RENDER_MODE_CAMERA;
			if (this.ActiveCamera) {
				//this.ActiveCamera.render(renderer);
				renderer.setProjection(cam.Projection);
				renderer.setView(cam.ViewMatrix);
			}

			// Calculate culling
			var cullingBox = this.getCullingBBoxAndStoreCameraFrustrum(renderer,
				renderer.getProjection(), renderer.getView(), lightpos);

			// draw everything with custom shader into shadow buffer
			this.CurrentRenderMode = Scene.RENDER_MODE_SHADOW_BUFFER; // CL3D.Scene.RENDER_MODE_DEFAULT;

			for (var i = 0; i < this.SceneNodesToRender.length; ++i) {
				var s = this.SceneNodesToRender[i];
				var type = s.getType();

				var isStaticMesh = type == 'mesh';
				var isAnimated = type == 'animatedmesh';

				if (isStaticMesh || isAnimated) // only for static meshes for now
				{
					if (cullingBox == null || cullingBox.intersectsWithBox(s.getTransformedBoundingBox())) {
						if (isStaticMesh) {
							if (!s.OccludesLight)
								continue;

							renderer.setWorld(s.AbsoluteTransformation);

							for (var b = 0; b < s.OwnedMesh.MeshBuffers.length; ++b) {
								var buf = s.OwnedMesh.MeshBuffers[b];
								var matType = buf.Mat.Type;

								if (matType == Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF) {
									this.ShadowDrawMaterialAlphaRef.Tex1 = buf.Mat.Tex1;
									renderer.setMaterial(this.ShadowDrawMaterialAlphaRef);
									renderer.drawMeshBuffer(buf);
								}

								else if (matType == Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS) {
									this.ShadowDrawMaterialAlphaRefMovingGrass.Tex1 = buf.Mat.Tex1;
									renderer.setMaterial(this.ShadowDrawMaterialAlphaRefMovingGrass);
									renderer.drawMeshBuffer(buf);
								}

								else if (!buf.Mat.isTransparent()) {
									renderer.setMaterial(this.ShadowDrawMaterialSolid);
									renderer.drawMeshBuffer(buf);
								}
							}
						}

						else if (isAnimated) {
							s.render(renderer);
						}
					}
				}
			}

		} // end for all passes

		renderer.setRenderTarget(oldRenderTarget, false, true);

		// reset old view and settings
		cam.ViewMatrixIsSetByUser = origByUser;
		cam.Projection = origProjection;
		cam.ViewMatrix = origView;
		cam.Target = origTarget;
		cam.Pos = origPosition;
		cam.UpVector = origUpVector;
		cam.TargetAndRotationAreBound = origBinding;


		return true;
	}

	/**
	 * Draws and animates the whole 3D scene. Not necessary to call usually, CopperLicht is doing this
	 * itself by default.
	 * @param {CL3D.Renderer} renderer used for drawing.
	 */
	drawAll(renderer) {
		// register for rendering
		this.SceneNodesToRender = new Array();
		this.SceneNodesToRenderTransparent = new Array();
		this.SceneNodesToRenderAfterZClearForFPSCamera = new Array();
		this.SceneNodesToRenderTransparentAfterZClearForFPSCamera = new Array();
		this.LightsToRender = new Array();
		this.RenderToTextureNodes = new Array();
		this.Overlay2DToRender = new Array();

		this.RootNode.OnRegisterSceneNode(this);

		this.CurrentCameraFrustrum = null;
		this.SkinnedMeshesRenderedLastTime = 0;

		// use post effects if enabled
		var bUsingPostEffects = false;
		var prePostEffectRenderTarget = renderer.getRenderTarget();
		renderer.getRenderTargetSize();

		if (this.isAnyPostEffectActive()) {
			if (!this.PostEffectsInitialized)
				this.initPostProcessingEffects();

			this.initPostProcessingQuad();

			var rctViewPort = renderer.getRenderTargetSize();
			this.RTTSizeWhenStartingPostEffects = rctViewPort;

			var postEffectRTT = this.createOrGetPostEffectRTT(0, true);
			this.CurrentPostProcessRTTTargetIndex = 0;
			this.CurrentPostProcessRTTTargetSizeFactor = 1.0;

			if (postEffectRTT) {
				if (renderer.setRenderTarget(postEffectRTT, true, true, this.BackgroundColor)) {
					//irr::core::dimension2di rttSz = postEffectRTT->getSize();
					//renderer.setViewPort(irr::core::rect<irr::s32>(0, 0, rttSz.Width, rttSz.Height));
					bUsingPostEffects = true;
				}
			}
		}

		// draw everything into shadow map if enabled
		if (this.ShadowMappingEnabled &&
			this.renderShadowMap(renderer)) {
			renderer.enableShadowMap(true, this.ShadowBuffer, this.ShadowMapLightMatrix,
				this.ShadowBuffer2, this.ShadowMapLightMatrix2);

			renderer.ShadowMapBias1 = this.ShadowMapBias1;
			renderer.ShadowMapBias2 = this.ShadowMapBias2;
			renderer.ShadowMapOpacity = this.ShadowMapOpacity;
			renderer.ShadowMapBackFaceBias = this.ShadowMapBackFaceBias;
		}

		// now do normal drawing
		var i = 0;

		// draws all render to texture passes of the scene
		for (i = 0; i < this.RenderToTextureNodes.length; ++i) {
			this.CurrentRenderMode = Scene.RENDER_MODE_RTT_SCENE; // note: this is done inside the loop because calling the 'render'

			// method might likely cause this object to render the scene into
			// a RTT, and then this gets set to something differently
			// before the next RTT, so we set it back
			this.RenderToTextureNodes[i].render(renderer);
		}

		this.drawRegistered3DNodes(renderer);

		this.StoreViewMatrixForRedrawCheck();

		// disable shadow map drawing again
		if (this.ShadowMappingEnabled)
			renderer.enableShadowMap(false, null, null);

		// disable post effect drawing again
		if (bUsingPostEffects) {
			// process post effects
			this.processPostEffects();

			// set old render target and viewport
			renderer.setRenderTarget(prePostEffectRenderTarget, false, false);

			//renderer.setViewPort(prePostEffectsViewPort);
			// present post processed image on screen
			var postEffectRTT = this.createOrGetPostEffectRTT(this.CurrentPostProcessRTTTargetIndex, false, this.CurrentPostProcessRTTTargetSizeFactor);
			if (postEffectRTT) {
				var matWorld = renderer.getWorld().clone();
				var matView = renderer.getView().clone();
				var matProj = renderer.getProjection().clone();

				var mat = new Matrix4();
				renderer.setWorld(mat);
				renderer.setView(mat);
				renderer.setProjection(mat);

				this.PostProcessingVerticesQuadBuffer.Mat.Type = Material.EMT_SOLID;
				this.PostProcessingVerticesQuadBuffer.Mat.Tex1 = postEffectRTT;
				this.drawPostprocessingQuad();

				renderer.setWorld(matWorld);
				renderer.setView(matView);
				renderer.setProjection(matProj);
			}
		}

		// draw extensions
		Extensions.draw();

		// draw overlays
		this.CurrentRenderMode = Scene.RENDER_MODE_2DOVERLAY;
		for (i = 0; i < this.Overlay2DToRender.length; ++i) {
			this.Overlay2DToRender[i].render(renderer);
		}
	}

	getCullingBBoxAndStoreCameraFrustrum(renderer, projectionMatrix, viewMatrix, camPos, alwaysReturnBox) {
		var cullingBox = null;

		{
			var frustrum = null;
			var proj = projectionMatrix;
			var view = viewMatrix;

			if (proj != null && view != null && camPos != null) {
				frustrum = new ViewFrustrum();
				frustrum.setFrom(proj.multiply(view)); // calculate view frustum planes

				if (this.UseCulling || alwaysReturnBox)
					cullingBox = frustrum.getBoundingBox(camPos);
			}

			this.CurrentCameraFrustrum = frustrum;
		}

		return cullingBox;
	}

	/**
	 * /implementation part of drawAll(), which usually gets called during drawAll() for drawing the reigered 3d nodes.
	 * can be called separately by special nodes like water or reflections, which needs to render everything a bit differently
	 * into a RTT
	 * @param {CL3D.Renderer} renderer used for drawing.
	 */
	drawRegistered3DNodes(renderer, callbackForOnAfterSkyboxRendering) {
		// active camera
		this.CurrentRenderMode = Scene.RENDER_MODE_CAMERA;
		var camPos = null;
		if (this.ActiveCamera) {
			camPos = this.ActiveCamera.getAbsolutePosition();
			this.ActiveCamera.render(renderer);
		}

		// skybox
		this.CurrentRenderMode = Scene.RENDER_MODE_SKYBOX;
		if (this.SkyBoxSceneNode)
			this.SkyBoxSceneNode.render(renderer);

		renderer.clearDynamicLights();
		renderer.AmbientLight = this.AmbientLight.clone();
		renderer.FogEnabled = this.FogEnabled;
		renderer.FogColor.A = 1.0;
		renderer.FogColor.R = getRed(this.FogColor) / 255.0;
		renderer.FogColor.G = getGreen(this.FogColor) / 255.0;
		renderer.FogColor.B = getBlue(this.FogColor) / 255.0;
		renderer.FogDensity = this.FogEnabled ? this.FogDensity : 0.0;
		renderer.WindSpeed = this.WindSpeed;
		renderer.WindStrength = this.WindStrength;

		var i; // i
		var nodesRendered = 0;

		// draw lights
		// sort lights
		if (camPos != null && this.LightsToRender.length > 0) {
			this.LightsToRender.sort(function (a, b) {
				var distance1 = camPos.getDistanceFromSQ(a.getAbsolutePosition());
				var distance2 = camPos.getDistanceFromSQ(b.getAbsolutePosition());
				if (distance1 > distance2)
					return 1;
				if (distance1 < distance2)
					return -1;
				return 0;
			});
		}

		this.CurrentRenderMode = Scene.RENDER_MODE_LIGHTS;

		for (i = 0; i < this.LightsToRender.length; ++i)
			this.LightsToRender[i].render(renderer);

		nodesRendered += this.LightsToRender.length;

		// call callback
		if (callbackForOnAfterSkyboxRendering)
			callbackForOnAfterSkyboxRendering.OnAfterDrawSkyboxes(renderer);

		// prepare for frustrum culling
		var cullingBox = this.getCullingBBoxAndStoreCameraFrustrum(renderer, renderer.getProjection(), renderer.getView(), camPos);

		// draw nodes
		this.CurrentRenderMode = Scene.RENDER_MODE_DEFAULT;

		for (i = 0; i < this.SceneNodesToRender.length; ++i) {
			var s = this.SceneNodesToRender[i];
			if (cullingBox == null || cullingBox.intersectsWithBox(s.getTransformedBoundingBox())) {
				s.render(renderer);
				nodesRendered += 1;
			}
		}

		// draw transparent nodes
		this.CurrentRenderMode = Scene.RENDER_MODE_TRANSPARENT;

		// sort transparent nodes
		var sortfunc = function (a, b) {
			var distance1 = camPos.getDistanceFromSQ(a.getAbsolutePosition());
			var distance2 = camPos.getDistanceFromSQ(b.getAbsolutePosition());
			if (distance1 < distance2)
				return 1;
			if (distance1 > distance2)
				return -1;
			return 0;
		};

		if (camPos != null && this.SceneNodesToRenderTransparent.length > 0) {
			this.SceneNodesToRenderTransparent.sort(sortfunc);
		}

		// draw them
		for (i = 0; i < this.SceneNodesToRenderTransparent.length; ++i) {
			var s = this.SceneNodesToRenderTransparent[i];
			if (cullingBox == null || cullingBox.intersectsWithBox(s.getTransformedBoundingBox())) {
				s.render(renderer);
				nodesRendered += 1;
			}
		}

		// now for objects with SolidNodeListAfterZClearForFPSCamera and TransparentNodeListAfterZClearForFPSCamera
		if (this.SceneNodesToRenderAfterZClearForFPSCamera.length ||
			this.SceneNodesToRenderTransparentAfterZClearForFPSCamera.length) {
			renderer.clearZBuffer();

			this.CurrentRenderMode = Scene.RENDER_MODE_DEFAULT;

			for (i = 0; i < this.SceneNodesToRenderAfterZClearForFPSCamera.length; ++i) {
				var s = this.SceneNodesToRenderAfterZClearForFPSCamera[i];
				if (cullingBox == null || cullingBox.intersectsWithBox(s.getTransformedBoundingBox())) {
					s.render(renderer);
					nodesRendered += 1;
				}
			}

			this.CurrentRenderMode = Scene.RENDER_MODE_TRANSPARENT;

			if (camPos != null && this.SceneNodesToRenderTransparentAfterZClearForFPSCamera.length > 0) {
				this.SceneNodesToRenderTransparentAfterZClearForFPSCamera.sort(sortfunc);

				for (i = 0; i < this.SceneNodesToRenderTransparentAfterZClearForFPSCamera.length; ++i) {
					var s = this.SceneNodesToRenderTransparentAfterZClearForFPSCamera[i];
					if (cullingBox == null || cullingBox.intersectsWithBox(s.getTransformedBoundingBox())) {
						s.render(renderer);
						nodesRendered += 1;
					}
				}
			}
		}

		// stats
		this.NodeCountRenderedLastTime = nodesRendered;
	}

	/**
	 * @public
	 */
	HasViewChangedSinceLastRedraw() {
		if (!this.ActiveCamera)
			return true;

		var mat = new Matrix4(false);
		this.ActiveCamera.Projection.copyTo(mat);
		mat = mat.multiply(this.ActiveCamera.ViewMatrix);

		return !mat.equals(this.LastViewProj);
	}

	/**
	 * @public
	 */
	StoreViewMatrixForRedrawCheck() {
		if (!this.ActiveCamera)
			return;

		this.ActiveCamera.Projection.copyTo(this.LastViewProj);
		this.LastViewProj = this.LastViewProj.multiply(this.ActiveCamera.ViewMatrix);
	}

	/**
	 * @public
	 */
	getLastUsedRenderer() {
		return this.LastUsedRenderer;
	}

	/**
	 * Sets the background color for the scene
	 * @param clr {Number} New color. See {@link createColor} on how to create such a color value.
	 * @public
	 */
	setBackgroundColor(clr) {
		this.BackgroundColor = clr;
	}

	/**
	 * Gets the background color of the scene
	 * @returns {Number} Background color. See {@link createColor} on how to create such a color value.
	 * @public
	 */
	getBackgroundColor() {
		return this.BackgroundColor;
	}

	/**
	 * Returns the name of the scene
	 * @public
	 */
	getName() {
		return this.Name;
	}

	/**
	 * Sets the name of the scene
	 * @public
	 */
	setName(name) {
		this.Name = name;
	}

	/**
	 * Specifies when the scene should be redrawn.
	 * @param mode Possible values are {@link Scene.REDRAW_WHEN_CAM_MOVED},
	 * {@link Scene.REDRAW_WHEN_SCENE_CHANGED} and {@link Scene.REDRAW_EVERY_FRAME}.
	 * @public
	 */
	setRedrawMode(mode) {
		this.RedrawMode = mode;
	}

	/**
	 * Sets the currently active {CL3D.CameraSceneNode} in the scene.
	 * @param {CL3D.CameraSceneNode} activeCamera The new active camera
	 * @public
	 */
	setActiveCamera(activeCamera) {
		this.ActiveCamera = activeCamera;
	}

	/**
	 * Returns the currently active {CL3D.CameraSceneNode} in the scene.
	 * @returns {CL3D.CameraSceneNode} active camera
	 * @public
	 */
	getActiveCamera() {
		return this.ActiveCamera;
	}

	/**
	 * Forces the renderer to redraw this scene the next frame, independent of the currently used redraw mode.
	 * @public
	 */
	forceRedrawNextFrame() {
		this.ForceRedrawThisFrame = true;
	}

	/**
	 * Returns the start time in milliseconds of this scene. Useful for {@link Animators}.
	 * @public
	 */
	getStartTime() {
		return this.StartTime;
	}

	/**
	 * Used for Scene nodes to register themselves for rendering
	 * When called {@link SceneNode.OnRegisterSceneNode}, a scene node should call
	 * this method to register itself for rendering if it decides that it wants to be rendered.
	 * In this way, scene nodes can be rendered in the optimal order.
	 * @param {CL3D.SceneNode} s Node which registers itself for rendering
	 * @param {Number} mode render mode the scene node wishes to register itself. Usually, use {@link Scene.RENDER_MODE_DEFAULT}. For
	 * transparent nodes, {@link Scene.RENDER_MODE_TRANSPARENT} is ideal.
	 * @public
	 */
	registerNodeForRendering(s, mode) {
		if (mode == null)
			mode = Scene.RENDER_MODE_DEFAULT;

		switch (mode) {
			case Scene.RENDER_MODE_SKYBOX:
				this.SkyBoxSceneNode = s;
				break;
			case Scene.RENDER_MODE_DEFAULT:
				this.SceneNodesToRender.push(s);
				break;
			case Scene.RENDER_MODE_LIGHTS:
				this.LightsToRender.push(s);
				break;
			case Scene.TRANSPARENT_SOLID_AFTER_ZBUFFER_CLEAR:
				this.SceneNodesToRenderAfterZClearForFPSCamera.push(s);
				break;
			case Scene.RENDER_MODE_TRANSPARENT_AFTER_ZBUFFER_CLEAR:
				this.SceneNodesToRenderTransparentAfterZClearForFPSCamera.push(s);
				break;
			case Scene.RENDER_MODE_CAMERA:
				// ignore for now
				break;
			case Scene.RENDER_MODE_TRANSPARENT:
				this.SceneNodesToRenderTransparent.push(s);
				break;
			case Scene.RENDER_MODE_2DOVERLAY:
				this.Overlay2DToRender.push(s);
				break;
			case Scene.RENDER_MODE_RTT_SCENE:
				this.RenderToTextureNodes.push(s);
				break;
		}
	}

	/**
	 * Returns all scene nodes in this scene with the specified type {@link SceneNode}s.
	 * @public
	 * @param type {String} type name of the {@link SceneNode}. See {@link SceneNode}.getType().
	 * @returns {Array} array with all scene nodes found with this type.
	 */
	getAllSceneNodesOfType(type) {
		if (this.RootNode == null)
			return null;

		var ar = new Array();
		this.getAllSceneNodesOfTypeImpl(this.RootNode, type, ar);
		return ar;
	}

	/**
	 * @public
	 */
	getAllSceneNodesOfTypeImpl(n, c, a) {
		if (n.getType() == c)
			a.push(n);

		for (var i = 0; i < n.Children.length; ++i) {
			var child = n.Children[i];
			this.getAllSceneNodesOfTypeImpl(child, c, a);
		}
	}

	/**
	 * Returns all scene nodes in this scene with the specified animator type {@link SceneNode}s.
	 * @public
	 * @param type {String} type name of the animator
	 * @returns {Array} array with all scene nodes found with this type.
	 */
	getAllSceneNodesWithAnimator(type) {
		if (this.RootNode == null)
			return null;

		var ar = new Array();
		this.getAllSceneNodesWithAnimatorImpl(this.RootNode, type, ar);
		return ar;
	}

	/**
	 * @public
	 */
	getAllSceneNodesWithAnimatorImpl(n, t, a) {
		if (n.getAnimatorOfType(t) != null)
			a.push(n);

		for (var i = 0; i < n.Children.length; ++i) {
			var child = n.Children[i];
			this.getAllSceneNodesWithAnimatorImpl(child, t, a);
		}
	}

	/**
	 * Returns the first {@link SceneNode} in this scene with the specified name.
	 * @public
	 * @param name {String} name of the {@link SceneNode}. See {@link SceneNode}.getName().
	 * @returns {CL3D.SceneNode} the found scene node or null if not found.
	 */
	getSceneNodeFromName(name) {
		if (this.RootNode == null)
			return null;

		return this.getSceneNodeFromNameImpl(this.RootNode, name);
	}

	/**
	 * @public
	 */
	getSceneNodeFromNameImpl(n, name) {
		if (n.Name == name)
			return n;

		for (var i = 0; i < n.Children.length; ++i) {
			var child = n.Children[i];
			var s = this.getSceneNodeFromNameImpl(child, name);
			if (s)
				return s;
		}

		return null;
	}

	/**
	 * Returns the first {@link SceneNode} in this scene with the specified id.
	 * @public
	 * @param id {Number} name of the {@link SceneNode}. See {@link SceneNode}.getId().
	 * @returns {CL3D.SceneNode} the found scene node or null if not found.
	 */
	getSceneNodeFromId(id) {
		if (this.RootNode == null)
			return null;

		return this.getSceneNodeFromIdImpl(this.RootNode, id);
	}

	/**
	 * @public
	 */
	getSceneNodeFromIdImpl(n, id) {
		if (n.Id == id)
			return n;

		for (var i = 0; i < n.Children.length; ++i) {
			var child = n.Children[i];
			var s = this.getSceneNodeFromIdImpl(child, id);
			if (s)
				return s;
		}

		return null;
	}

	/**
	 * Returns the root {@link SceneNode}, the root of the whole scene graph.
	 * @public
	 * @returns {CL3D.SceneNode} The root scene node.
	 */
	getRootSceneNode() {
		return this.RootNode;
	}

	/**
	 * @public
	 */
	registerSceneNodeAnimatorForEvents(a) {
		if (a == null)
			return;

		for (var i = 0; i < this.RegisteredSceneNodeAnimatorsForEventsList.length; ++i) {
			var s = this.RegisteredSceneNodeAnimatorsForEventsList[i];
			if (s === a)
				return;
		}

		this.RegisteredSceneNodeAnimatorsForEventsList.push(a);
	}

	/**
	 * @public
	 */
	unregisterSceneNodeAnimatorForEvents(a) {
		if (a == null)
			return;

		for (var i = 0; i < this.RegisteredSceneNodeAnimatorsForEventsList.length; ++i) {
			var s = this.RegisteredSceneNodeAnimatorsForEventsList[i];
			if (s === a) {
				this.RegisteredSceneNodeAnimatorsForEventsList.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * @public
	 */
	postMouseWheelToAnimators(delta) {
		for (var i = 0; i < this.RegisteredSceneNodeAnimatorsForEventsList.length; ++i) {
			var s = this.RegisteredSceneNodeAnimatorsForEventsList[i];
			s.onMouseWheel(delta);
		}
	}

	/**
	 * @public
	 */
	postMouseDownToAnimators(event) {
		for (var i = 0; i < this.RegisteredSceneNodeAnimatorsForEventsList.length; ++i) {
			var s = this.RegisteredSceneNodeAnimatorsForEventsList[i];
			s.onMouseDown(event);
		}
	}

	/**
	 * @public
	 */
	postMouseUpToAnimators(event) {
		for (var i = 0; i < this.RegisteredSceneNodeAnimatorsForEventsList.length; ++i) {
			var s = this.RegisteredSceneNodeAnimatorsForEventsList[i];
			s.onMouseUp(event);
		}
	}

	/**
	 * @public
	 */
	postMouseMoveToAnimators(event) {
		for (var i = 0; i < this.RegisteredSceneNodeAnimatorsForEventsList.length; ++i) {
			var s = this.RegisteredSceneNodeAnimatorsForEventsList[i];
			s.onMouseMove(event);
		}
	}

	/**
	 * Returns the automatically generated collision geometry containing all scene nodes with had the collision flag set to true
	 * in the editor.
	 * @returns Returns a {@link MetaTriangleSelector} providing access to all to collision geomertry in this scene.
	 */
	getCollisionGeometry() {
		return this.CollisionWorld;
	}

	/**
	 * @public
	 * @param storeInNodes: Boolean, if set to true the selector for each node is stored in the scene nodes
	 * @param selectorToReuse: Metatriangle selector, can be null. If not null, will be cleared and used to be filled with geometry
	 * @returns Returns a meta triangle selector with the collision geomertry
	 */
	createCollisionGeometry(storeInNodes, selectorToReuse) {
		var ar = this.getAllSceneNodesOfType('mesh');
		if (ar == null)
			return null;

		var metaselector = null;
		if (selectorToReuse) {
			selectorToReuse.clear();
			metaselector = selectorToReuse;
		}

		else {
			metaselector = new MetaTriangleSelector();
		}

		// static meshes
		for (var i = 0; i < ar.length; ++i) {
			var fnode = ar[i];

			if (fnode && fnode.DoesCollision) {
				var selector = null;

				if (fnode.Selector)
					selector = fnode.Selector;

				else {
					var materialTypeToIgnore = null;
					var materialTypeToIgnore2 = null;
					if (fnode.Parent && fnode.Parent.getType() == 'terrain') {
						materialTypeToIgnore = Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF;
						materialTypeToIgnore2 = Material.EMT_TRANSPARENT_ALPHA_CHANNEL_REF_MOVING_GRASS;
					}

					if (fnode.OwnedMesh && fnode.OwnedMesh.GetPolyCount() > 100)
						selector = new OctTreeTriangleSelector(fnode.OwnedMesh, fnode, 64, materialTypeToIgnore, materialTypeToIgnore2);

					else
						selector = new MeshTriangleSelector(fnode.OwnedMesh, fnode, materialTypeToIgnore, materialTypeToIgnore2);
				}

				if (storeInNodes && fnode.Selector == null)
					fnode.Selector = selector;

				metaselector.addSelector(selector);
			}
		}

		// static animated meshes
		ar = this.getAllSceneNodesOfType('animatedmesh');

		for (var i = 0; i < ar.length; ++i) {
			var fanimnode = ar[i];

			if (fanimnode && fanimnode.Mesh && fanimnode.Mesh.isStatic() &&
				fanimnode.Mesh.StaticCollisionBoundingBox &&
				!fanimnode.Mesh.StaticCollisionBoundingBox.isEmpty()) {
				var selector = null;

				if (fanimnode.Selector)
					selector = fanimnode.Selector;

				else
					selector = new BoundingBoxTriangleSelector(fanimnode.Mesh.StaticCollisionBoundingBox, fanimnode);

				if (storeInNodes && fanimnode.Selector == null)
					fanimnode.Selector = selector;

				metaselector.addSelector(selector);
			}
		}

		return metaselector;
	}

	/**
	 * @public
	 * @param {CL3D.SceneNode} node 
	 * @param {Number} afterTimeMs 
	 */
	addToDeletionQueue(node, afterTimeMs) {
		var e = {
			node: node,
			timeAfterToDelete: afterTimeMs + CLTimer.getTime()
		};

		this.DeletionList.push(e);
	}

	/**
	 @public
	*/
	clearDeletionList(deleteAll) {
		if (this.DeletionList.length == 0)
			return false;

		var now = CLTimer.getTime();
		var ret = false;

		for (var i = 0; i < this.DeletionList.length;) {
			var e = this.DeletionList[i];

			if (deleteAll || e.timeAfterToDelete < now) {
				if (e.node.Parent)
					e.node.Parent.removeChild(e.node);
				this.DeletionList.splice(i, 1);
				ret = true;

				if (this.CollisionWorld && e.node.Selector)
					this.CollisionWorld.removeSelector(e.node.Selector);
			}

			else
				++i;
		}

		return ret;
	}

	/**
	 @public
	*/
	isCoordOver2DOverlayNode(x, y, onlyThoseWhoBlockCameraInput) {
		if (this.RootNode == null || this.LastUsedRenderer == null)
			return null;

		return this.isCoordOver2DOverlayNodeImpl(this.RootNode, x, y, onlyThoseWhoBlockCameraInput);
	}

	/**
	 @public
	*/
	isCoordOver2DOverlayNodeImpl(n, x, y, onlyThoseWhoBlockCameraInput) {
		if (n && n.Visible && (n.getType() == '2doverlay' || n.getType() == 'mobile2dinput')) {
			if (!onlyThoseWhoBlockCameraInput || (onlyThoseWhoBlockCameraInput && n.blocksCameraInput())) {
				var r = n.getScreenCoordinatesRect(true, this.LastUsedRenderer);
				if (r.x <= x && r.y <= y &&
					r.x + r.w >= x &&
					r.y + r.h >= y) {
					return n;
				}
			}
		}

		for (var i = 0; i < n.Children.length; ++i) {
			var child = n.Children[i];
			var s = this.isCoordOver2DOverlayNodeImpl(child, x, y, onlyThoseWhoBlockCameraInput);
			if (s)
				return s;
		}

		return null;
	}

	/**
	 @public
	*/
	getUnusedSceneNodeId() {
		for (var tries = 0; tries < 1000; ++tries) {
			var testId = Math.round((Math.random() * 10000) + 10);

			if (this.getSceneNodeFromId(testId) == null)
				return testId;
		}

		return -1;
	}

	/**
	 @public
	*/
	replaceAllReferencedNodes(nold, nnew) {
		if (!nold || !nnew)
			return;

		for (var i = 0; i < nold.getChildren().length && i < nnew.getChildren().length; ++i) {
			var cold = nold.getChildren()[i];
			var cnew = nnew.getChildren()[i];

			if (cold && cnew && cold.getType() == cnew.getType()) {
				nnew.replaceAllReferencedNodes(cold, cnew);
			}
		}

		return -1;
	}

	/**
	  * Enables/disables fog for this whole scene and changes its color and density
	  * @public
	  * @example
	  * scene.setFog(true, CL3D.createColor(1, 100, 100, 100), 0.1);
	  * @param enabled {Boolean} (optional) set to true to enable fog and false not to enable
	  * @param color {Number} Fog color. See {@link createColor} on how to create such a color value.
	  * @param density {Number} Density of the fog. A value like 0.001 is default.
	*/
	setFog(enabled, color, density) {
		this.FogEnabled = enabled;

		if (!(color == null))
			this.FogColor = color;

		if (!(density == null))
			this.FogDensity = density;
	}

	/**
	 @public
	*/
	isAnyPostEffectActive() {
		if (Global_PostEffectsDisabled)
			return false;

		if (this.isAnyPostEffectEnabledByUser())
			return true;

		return false;
	}

	/**
	 @public
	*/
	isAnyPostEffectEnabledByUser() {
		for (var ip = 0; ip < this.PostEffectData.length; ++ip) {
			if (this.PostEffectData[ip].Active)
				return true;
		}

		return false;
	}

	/**
	 @public
	*/
	initPostProcessingQuad() {
		this.LastUsedRenderer.getRenderTargetSize();

		var shiftX = 0.0;
		var shiftY = 0.0;

		var clr = createColor(255, 64, 64, 64);

		if (this.PostProcessingVerticesQuadBuffer.Vertices == null ||
			this.PostProcessingVerticesQuadBuffer.Vertices.length == 0) {
			this.PostProcessingVerticesQuadBuffer.Vertices = [];
			this.PostProcessingVerticesQuadBuffer.Vertices.push(null);
			this.PostProcessingVerticesQuadBuffer.Vertices.push(null);
			this.PostProcessingVerticesQuadBuffer.Vertices.push(null);
			this.PostProcessingVerticesQuadBuffer.Vertices.push(null);
		}

		this.PostProcessingVerticesQuadBuffer.Vertices[0] = createVertex(
			-1.0, -1.0, 0.0, 0.0, 0.0, -1.0, clr,
			shiftX, shiftY);

		this.PostProcessingVerticesQuadBuffer.Vertices[1] = createVertex(
			1.0, -1.0, 0.0, 0.0, 0.0, -1.0, clr,
			1.0 + shiftX, shiftY);

		this.PostProcessingVerticesQuadBuffer.Vertices[2] = createVertex(
			-1.0, 1.0, 0.0, 0.0, 0.0, -1.0, clr,
			shiftX, 1.0 + shiftY);

		this.PostProcessingVerticesQuadBuffer.Vertices[3] = createVertex(
			1.0, 1.0, 0.0, 0.0, 0.0, -1.0, clr,
			1.0 + shiftX, 1.0 + shiftY);
	}

	/**
	 @public
	*/
	getNextPowerOfTwo(aSize) {
		return Math.pow(2, Math.ceil(Math.log(aSize) / Math.log(2)));

		// nearest would work like this:
		// return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) );
	}

	/**
	 @public
	*/
	createOrGetPostEffectRTT(nCopyNumber, bCreateIfNotExisting, sizeFactor) {
		if (sizeFactor == null)
			sizeFactor = 1.0;

		var rttSizeNeeded = new Vect2d(
			(this.RTTSizeWhenStartingPostEffects.X * sizeFactor) >> 0,
			(this.RTTSizeWhenStartingPostEffects.Y * sizeFactor) >> 0);

		if (!this.LastUsedRenderer.UsesWebGL2) {
			// webgl 1 can only use power of two RTT because of the needed mipmaps, so round up
			rttSizeNeeded.X = this.getNextPowerOfTwo(rttSizeNeeded.X);
			rttSizeNeeded.Y = this.getNextPowerOfTwo(rttSizeNeeded.Y);
		}

		var bufName = "postEffectRTT";
		bufName += nCopyNumber;
		bufName += "s" + sizeFactor; // prevents deleting textures too often, which causes some browser to lose the D3D context sometimes.

		var tex = this.LastUsedRenderer.findTexture(bufName);

		if (!bCreateIfNotExisting)
			return tex;

		if (!tex || tex.OriginalWidth != rttSizeNeeded.X || tex.OriginalHeight != rttSizeNeeded.Y) {
			if (tex) {
				this.LastUsedRenderer.deleteTexture(tex);
			}

			tex = this.LastUsedRenderer.addRenderTargetTexture(rttSizeNeeded.X, rttSizeNeeded.Y, false, false, bufName);
		}

		return tex;
	}

	/**
	 @public
	*/
	processPostEffects() {
		if (!this.PostEffectsInitialized)
			this.initPostProcessingEffects();

		var renderer = this.LastUsedRenderer;

		// save matrices
		var matWorld = renderer.getWorld().clone();
		var matView = renderer.getView().clone();
		var matProj = renderer.getProjection().clone();

		// set to units
		var mat = new Matrix4();
		renderer.setWorld(mat);
		renderer.setView(mat);
		renderer.setProjection(mat);

		// run
		for (var i = 0; i < this.PostEffectData.length; ++i) {
			var bActive = this.PostEffectData[i].Active;

			if (bActive)
				this.runPostProcessEffect(i, 1.0);
		}

		// set back matrices
		renderer.setWorld(matWorld);
		renderer.setView(matView);
		renderer.setProjection(matProj);
	}

	/**
	 @public
	*/
	runPostProcessEffect(type, rttSizeFactor) {
		var renderer = this.LastUsedRenderer;

		switch (type) {
			case Scene.EPOSTEFFECT_BLOOM:
				{
					// create a copy of the current world image
					var texWhereCurrentWorldWasRendered = this.createOrGetPostEffectRTT(this.CurrentPostProcessRTTTargetIndex, false, this.CurrentPostProcessRTTTargetSizeFactor);
					var copyWorld = this.createOrGetPostEffectRTT(3, true, rttSizeFactor);

					this.copyPostProcessingTexture(texWhereCurrentWorldWasRendered, copyWorld);

					// create light treshold image
					this.runPostProcessEffect(Scene.EPOSTEFFECT_LIGHT_TRESHOLD, rttSizeFactor);

					// blur light treshold image
					for (var i = 0; i < this.PE_bloomBlurIterations; ++i) {
						// use bilinear filtering to use higher gaussian blur by scaling texture by half:
						this.runPostProcessEffect(Scene.EPOSTEFFECT_BLUR_HORIZONTAL, 0.25);
						this.runPostProcessEffect(Scene.EPOSTEFFECT_BLUR_VERTICAL, 0.25);

						// run in normal size again to make it look nicer
						this.runPostProcessEffect(Scene.EPOSTEFFECT_BLUR_HORIZONTAL, 1.0);
						this.runPostProcessEffect(Scene.EPOSTEFFECT_BLUR_VERTICAL, 1.0);
					}

					// add as bloom to original image
					var texWithBurredTresholdImage = this.createOrGetPostEffectRTT(this.CurrentPostProcessRTTTargetIndex, false, this.CurrentPostProcessRTTTargetSizeFactor);

					renderer.setRenderTarget(copyWorld, false, false);

					this.PostProcessingVerticesQuadBuffer.Mat.Type = Material.EMT_TRANSPARENT_ADD_COLOR;
					this.PostProcessingVerticesQuadBuffer.Mat.Tex1 = texWithBurredTresholdImage;
					this.drawPostprocessingQuad();

					// pesent on final rendering target
					if (!equals(this.CurrentPostProcessRTTTargetSizeFactor, 1.0)) {
						// be sure last iteration is full size
						this.CurrentPostProcessRTTTargetIndex = (this.CurrentPostProcessRTTTargetIndex + 1) % 2;
						this.CurrentPostProcessRTTTargetSizeFactor = rttSizeFactor;
						this.createOrGetPostEffectRTT(this.CurrentPostProcessRTTTargetIndex, true, rttSizeFactor);
					}

					this.copyPostProcessingTexture(copyWorld, this.createOrGetPostEffectRTT(this.CurrentPostProcessRTTTargetIndex, false, this.CurrentPostProcessRTTTargetSizeFactor));
				}
				break;
			case Scene.EPOSTEFFECT_BLUR:
				{
					var iterations = this.PE_blurIterations;
					iterations = clamp(iterations, 1, 100);

					for (var i = 0; i < iterations; ++i) {
						this.runPostProcessEffect(Scene.EPOSTEFFECT_BLUR_HORIZONTAL, rttSizeFactor);
						this.runPostProcessEffect(Scene.EPOSTEFFECT_BLUR_VERTICAL, rttSizeFactor);
					}
				}
				break;
			default:
				{
					if (type < this.PostProcessingShaderInstances.length && this.PostProcessingShaderInstances[type] != -1) {
						// select source and target texture
						var texWhereCurrentWorldWasRendered = this.createOrGetPostEffectRTT(this.CurrentPostProcessRTTTargetIndex, false, this.CurrentPostProcessRTTTargetSizeFactor);
						if (!texWhereCurrentWorldWasRendered)
							return;

						this.CurrentPostProcessRTTTargetIndex = (this.CurrentPostProcessRTTTargetIndex + 1) % 2;
						this.CurrentPostProcessRTTTargetSizeFactor = rttSizeFactor;

						var texWhereWeAreRenderingTo = this.createOrGetPostEffectRTT(this.CurrentPostProcessRTTTargetIndex, true, rttSizeFactor);
						if (!texWhereWeAreRenderingTo)
							return;

						renderer.setRenderTarget(texWhereWeAreRenderingTo, false, false);

						// draw quad with our shader
						this.PostProcessingVerticesQuadBuffer.Mat.Type = this.PostProcessingShaderInstances[type];
						this.PostProcessingVerticesQuadBuffer.Mat.Tex1 = texWhereCurrentWorldWasRendered;
						this.drawPostprocessingQuad();
					}
				}
				break;
		}
	}

	/**
	 @public
	*/
	initPostProcessingEffects() {
		if (this.PostEffectsInitialized)
			return;

		this.PostEffectsInitialized = true;

		var renderer = this.LastUsedRenderer;
		var gl = renderer.getWebGL();
		var me = this;

		// quad data
		this.PostProcessingVerticesQuadBuffer.Mat.Lighting = false;
		this.PostProcessingVerticesQuadBuffer.Mat.ZReadEnabled = false;
		this.PostProcessingVerticesQuadBuffer.Mat.ZWriteEnabled = false;
		this.PostProcessingVerticesQuadBuffer.Mat.BackfaceCulling = false;

		this.initPostProcessingQuad();

		this.PostProcessingVerticesQuadBuffer.Indices.push(0);
		this.PostProcessingVerticesQuadBuffer.Indices.push(1);
		this.PostProcessingVerticesQuadBuffer.Indices.push(2);
		this.PostProcessingVerticesQuadBuffer.Indices.push(3);
		this.PostProcessingVerticesQuadBuffer.Indices.push(1);
		this.PostProcessingVerticesQuadBuffer.Indices.push(2);

		// create shaders
		for (var i = 0; i < Scene.EPOSTEFFECT_COUNT; ++i) {
			Material.EMT_SOLID;
			var shadercontent = '';
			var nPostProcessingShader = -1;
			var shaderCallBack = null;

			switch (i) {
				case Scene.EPOSTEFFECT_BLOOM:
					// special type, will call EPOSTEFFECT_LIGHT_TRESHOLD, EPOSTEFFECT_BLUR_HORIZONTAL and EPOSTEFFECT_BLUR_VERTICAL in iterations
					break;

				case Scene.EPOSTEFFECT_INVERT:
					shadercontent = this.POSTPROCESS_SHADER_INVERT;
					break;

				case Scene.EPOSTEFFECT_COLORIZE:
					shadercontent = this.POSTPROCESS_SHADER_COLORIZE;
					shaderCallBack = function () {
						var loc = gl.getUniformLocation(renderer.currentGLProgram, "PARAM_Colorize_Color");
						gl.uniform4f(loc, getRed(me.PE_colorizeColor) / 255.0, getGreen(me.PE_colorizeColor) / 255.0, getBlue(me.PE_colorizeColor) / 255.0, 1.0);
					};
					break;

				case Scene.EPOSTEFFECT_BLUR:
					// special type, will call EPOSTEFFECT_BLUR_HORIZONTAL and EPOSTEFFECT_BLUR_VERTICAL in iterations
					break;

				case Scene.EPOSTEFFECT_BLUR_HORIZONTAL:
					shadercontent = this.POSTPROCESS_SHADER_BLUR_HORIZONTAL;
					shaderCallBack = function () {
						var loc = gl.getUniformLocation(renderer.currentGLProgram, "PARAM_SCREENX");
						gl.uniform1f(loc, renderer.getRenderTargetSize().X);
					};
					break;

				case Scene.EPOSTEFFECT_BLUR_VERTICAL:
					shadercontent = this.POSTPROCESS_SHADER_BLUR_VERTICAL;
					shaderCallBack = function () {
						var loc = gl.getUniformLocation(renderer.currentGLProgram, "PARAM_SCREENY");
						gl.uniform1f(loc, renderer.getRenderTargetSize().Y);
					};
					break;

				case Scene.EPOSTEFFECT_LIGHT_TRESHOLD:
					shadercontent = this.POSTPROCESS_SHADER_LIGHT_TRESHOLD;
					shaderCallBack = function () {
						var loc = gl.getUniformLocation(renderer.currentGLProgram, "PARAM_LightTreshold_Treshold");
						gl.uniform1f(loc, me.PE_bloomTreshold);
					};
					break;

				case Scene.EPOSTEFFECT_BLACK_AND_WHITE:
					shadercontent = this.POSTPROCESS_SHADER_BLACK_AND_WHITE;
					break;

				case Scene.EPOSTEFFECT_VIGNETTE:
					shadercontent = this.POSTPROCESS_SHADER_VIGNETTE;
					shaderCallBack = function () {
						var loc = gl.getUniformLocation(renderer.currentGLProgram, "PARAM_Vignette_Intensity");
						gl.uniform1f(loc, me.PE_vignetteIntensity);

						loc = gl.getUniformLocation(renderer.currentGLProgram, "PARAM_Vignette_RadiusA");
						gl.uniform1f(loc, me.PE_vignetteRadiusA);

						loc = gl.getUniformLocation(renderer.currentGLProgram, "PARAM_Vignette_RadiusB");
						gl.uniform1f(loc, me.PE_vignetteRadiusB);
					};
					break;
			}

			if (shadercontent != '') {
				// create shader
				nPostProcessingShader = renderer.createMaterialType(renderer.vs_shader_normaltransform, shadercontent, null, null, null, shaderCallBack);

				if (nPostProcessingShader == -1)
					Global_PostEffectsDisabled = true;
			}

			this.PostProcessingShaderInstances.push(nPostProcessingShader);
		}
	}

	/**
	 @public
	*/
	drawPostprocessingQuad() {
		var renderer = this.LastUsedRenderer;

		renderer.setMaterial(this.PostProcessingVerticesQuadBuffer.Mat);
		renderer.drawMeshBuffer(this.PostProcessingVerticesQuadBuffer);
	}

	/**
	 @public
	*/
	copyPostProcessingTexture(source, target) {
		var renderer = this.LastUsedRenderer;

		renderer.setRenderTarget(target, false, false);

		this.PostProcessingVerticesQuadBuffer.Mat.Type = Material.EMT_SOLID;
		this.PostProcessingVerticesQuadBuffer.Mat.Tex1 = source;

		this.drawPostprocessingQuad();
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * @constructor
 * @public
 */
class CCDocument {
	constructor() {
		this.CurrentScene = -1;
		this.ApplicationTitle = "";
		/**
		 * @type {CL3D.Free3dScene[]}
		 */
		this.Scenes = new Array();
		/**
		 * @type {String[]}
		 */
		this.Scripts = new Array();
		//this.UpdateMode = CL3D.Scene.REDRAW_WHEN_SCENE_CHANGED;
		this.UpdateMode = Scene.REDRAW_EVERY_FRAME;
		this.WaitUntilTexturesLoaded = false;

		this.CanvasWidth = 320;
		this.CanvasHeight = 200;
	}

	addScene(s)
	{
		this.Scenes.push(s);
	}

	getCurrentScene(s)
	{
		if (this.CurrentScene < 0 || this.CurrentScene >= this.Scenes.length)
			return null;
		return this.Scenes[this.CurrentScene];
	}

	setCurrentScene(s)
	{
		for (var i=0; i<this.Scenes.length; ++i)
		{
			if (this.Scenes[i] === s)
			{
				this.CurrentScene = i;
				return;
			}
		}
	}
}

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * @constructor
 * @extends CL3D.Scene
 * @public
 */
class Free3dScene extends Scene {
	constructor() {
		super();

		this.init();
		this.DefaultCameraPos = new Vect3d();
		this.DefaultCameraTarget = new Vect3d();
	}

	/**
	  * returns the type string of the current scene. For free 3d scenes, this is 'free'.
	  * @public
	*/
	getSceneType() {
		return "free";
	}
}

let doFetchImpl = () => { };

if (typeof globalThis.Image == "undefined") {
    await import('file-fetch').then(async (module) => {
        doFetchImpl = (input, init) => {
            return module.default(input, init);
        };
    });
}
else {
    doFetchImpl = (input, init) => {
        return fetch(input, init);
    };
}

/**
 * 
 * @param {string | URL | globalThis.Request} input This defines the resource that you wish to fetch.
 * @param {RequestInit=} init An object containing any custom settings you want to apply to the request.
 * @returns {Promise<Response>}
 */
const doFetch = (input, init) => {
    return doFetchImpl(input, init);
};

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * @constructor
 * @public
 */
class CCFileLoader {
	constructor(filetoload, useArrayBufferReturn, isBrowser) {
		this.FileToLoad = filetoload;
		this.useArrayBufferReturn = useArrayBufferReturn;
		this.isBrowser = isBrowser;
	}

	load(functionCallBack, functionCallBackOnError) {
		const me = this;

		me.Controller = new AbortController();
		const signal = me.Controller.signal;

		try {
			if (!me.isBrowser) {
				let path = me.FileToLoad.replaceAll('\\', '/');
				me.FileToLoad = `file:///${path}`;
			}
			
			doFetch(me.FileToLoad, { signal })
				.then(async (response) => {
					if (!response.ok) {
						let reportedError = false;

						if (response.status != 200 && response.status != 0 && response.status != null) {
							if (functionCallBackOnError) {
								functionCallBackOnError('');
								reportedError = true;
							}
							else
								console.log("Could not open file " + me.FileToLoad + " (status:" + response.status + ")");
						}
					}
					if (me.useArrayBufferReturn)
						return await response.arrayBuffer();
					else
						return await response.text();
				})
				.then((data) => {
					if (functionCallBack)
						functionCallBack(data);
				});
		}
		catch (e) {
			if (functionCallBackOnError)
				functionCallBackOnError(e.message);
			else {
				console.log("Could not open file " + this.FileToLoad + ": " + e.message);
			}
		}
	};

	abort() {
		try {
			this.Controller.abort();
		}
		catch (e) {
			console.log("Could not abort " + this.FileToLoad);
		}
	}
}

let getDirNameImpl = () => { };

if (typeof globalThis.location == "undefined") {
    await import('path').then(async (module) => {
        getDirNameImpl = () => {
            const __filename = import.meta.url;
            const __dirname = module.dirname(__filename);
    
            return __dirname;
        };
    });
}
else {
    getDirNameImpl = () => {
        const __filename = globalThis.location.href;
        const __dirname = __filename.slice(0, __filename.lastIndexOf("/"));
        return __dirname;
    };
}

/**
 * @returns {String}
 */
const getDirName = () => {
    return getDirNameImpl();
};

class FlaceLoader {
	constructor () {
		this.Data = this.Document = null;
		this.Filename = "";
		this.CurrentTagSize = 0;
		this.NextTagPos = 0;
		this.CursorControl = null;
		this.TheTextureManager = null;
		this.PathRoot = "";
		this.StoredFileContent = null;
		this.TheMeshCache = null;
		this.LoadedAReloadAction = false;
		this.trailingUTF8Bytes = [
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2, 3,3,3,3,3,3,3,3,4,4,4,4,5,5,5,5,
		];
	}

	/**
	 * @param {ArrayBuffer} buffer
	 * @returns
	 */
	ArrayBufferToString(buffer)
	{
		let data = "";
		let array = new Uint8Array(buffer);
		for(let index = 0; index < array.byteLength; index++) data += String.fromCharCode(array[index]);
		return data;
	}

	StringToUint8Array(str)
	{
		let buf = new ArrayBuffer(str.length);
		let bufView = new Uint8Array(buf);
		for (let index=0; index < str.length; index++) {
		  bufView[index] = str.charCodeAt(index);
		}
		return bufView;
	}

	StringToUint16Array(str)
	{
		let buf = new ArrayBuffer(str.length*2);
		let bufView = new Uint16Array(buf);
		for (let index=0; index < str.length; index++) {
		  bufView[index] = str.charCodeAt(index);
		}
		return bufView;
	}

	/**
	 * @param {ArrayBuffer|String} filecontent
	 * @param {String} filename
	 * @param {CL3D.TextureManager} textureManager
	 * @param {CL3D.MeshCache} meshCache
	 * @param {CL3D.CopperLicht} cursorControl
	 * @param {Boolean} copyRootNodeChildren
	 * @param {CL3D.SceneNode} newRootNodeChildrenParent
	 * @returns
	 */
	async loadFile(filecontent, filename, textureManager, meshCache, cursorControl, copyRootNodeChildren, newRootNodeChildrenParent)
	{
		this.CopyRootNodeChildren = copyRootNodeChildren;
		this.NewRootNodeChildrenParent = newRootNodeChildrenParent;

		this.Filename = filename;
		this.TheTextureManager = textureManager;
		this.TheMeshCache = meshCache;
		this.CursorControl = cursorControl;
		this.TheTextureManager != null && ScriptingInterface.getScriptingInterface().setTextureManager(this.TheTextureManager);

		let loadedfile = null;

		if(typeof filecontent == 'string')
		{
			loadedfile = filecontent;
		}
		else if(filecontent instanceof ArrayBuffer)
		{
			if(this.Filename.indexOf(".ccbz") != -1 || this.Filename.indexOf(".ccp") != -1)
			{
				loadedfile = this.ArrayBufferToString(filecontent);
			}
		}
		if(loadedfile == null || loadedfile.length == 0)
		{
			console.log("Error: Could not load file '" + this.Filename + "'");
			return null;
		}
		if(this.Filename.indexOf(".ccbz") != -1) loadedfile = JSInflate.inflate(loadedfile);
		else if(this.Filename.indexOf(".ccbjs") != -1) loadedfile = base64decode(loadedfile);
		this.Document = new CCDocument;
		this.setRootPath();
		this.Data = new StringBinary(loadedfile);
		if(!await this.parseFile()) return null;
		this.StoredFileContent = loadedfile;
		return this.Document;
	}

	setRootPath()
	{
		let path = this.Filename;
		let end = path.lastIndexOf("/");
		if(end == -1)
			end = path.lastIndexOf("\\");
		if(end != -1) path = path.substring(0, end + 1);
		this.PathRoot = path;
	}

	async parseFile()
	{
		let magic = this.Data.readSI32();
		this.Data.readSI32();
		this.Data.readUI32();
		if(magic != 1701014630) return false;

		for(let index = 0; this.Data.bytesAvailable() > 0;)
		{
			let tag = this.readTag();
			++index;
			if(index == 1 && tag != 1) return false;
			switch (tag)
			{
				case 1:
					if (this.CopyRootNodeChildren)
					{
						this.readDocument2();
					}
					else
					{
						this.readDocument();
					}
					break;
				case 12:
					await this.readEmbeddedFiles();
					break;
				default:
					this.SkipToNextTag();
			}
		}
		return true;
	}

	SkipToNextTag()
	{
		this.Data.seek(this.NextTagPos, true);
	}

	readTag()
	{
		let tag = 0;
		tag = this.Data.readUnsignedShort();
		this.CurrentTagSize = this.Data.readUnsignedInt();
		this.NextTagPos = this.Data.getPosition() + this.CurrentTagSize;
		return tag;
	}

	ReadMatrix()
	{
		let mat4 = new Matrix4(false);
		this.ReadIntoExistingMatrix(mat4);
		return mat4;
	}

	/**
	 * @param {CL3D.Matrix4} mat4
	 */
	ReadIntoExistingMatrix(mat4)
	{
		for(let index = 0; index < 16; ++index) mat4.setByIndex(index, this.Data.readFloat());
	}

	ReadQuaternion()
	{
		let quat = new Quaternion;
		quat.W = this.Data.readFloat();
		quat.X = this.Data.readFloat();
		quat.Y = this.Data.readFloat();
		quat.Z = this.Data.readFloat();
		return quat;
	}

	readUTFBytes(sourceEnd)
	{
		let sourceRead = 0;
		let chars = [];
		let offsetsFromUTF8 = [0, 12416, 925824, 63447168, 4194836608, 2181570688];
		let bytes = [];
		for(let index = 0; index < sourceEnd; ++index) bytes.push(this.Data.readNumber(1));
		for(; sourceRead < sourceEnd;)
		{
			let ch = 0;
			let extraBytesToRead = this.trailingUTF8Bytes[bytes[sourceRead]];
			if(sourceRead + extraBytesToRead >= sourceEnd) return chars.join("");
			for(let z = extraBytesToRead; z >= 0; --z)
			{
				ch += bytes[sourceRead];
				++sourceRead;
				if(z != 0) ch <<= 6;
			}
			if(sourceRead > sourceEnd) break;
			ch -= offsetsFromUTF8[extraBytesToRead];
			if(ch < 1114111) chars.push(this.fixedFromCharCode(ch));
			else return chars.join("");
		}
		return chars.join("");
	}

	ReadString()
	{
		let int = this.Data.readUnsignedInt();
		if(int > 104857600) return "";
		if(int <= 0) return "";
		return this.readUTFBytes(int);
	}

	fixedFromCharCode(int)
	{
		if(int > 65535)
		{
			int -= 65536;
			return String.fromCharCode(55296 + (int >> 10), 56320 + (int & 1023));
		}
		else return String.fromCharCode(int);
	}

	readDocument()
	{
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 1004:
				this.Document.CurrentScene = this.Data.readInt();
				break;
			case 20:
				this.readPublishSettings();
				break;
			case 2:
				let flacescene = null;
				switch (this.Data.readInt())
				{
					case 0:
						flacescene = new Free3dScene;
						this.readFreeScene(flacescene);
						break;
					case 1:
						/// TODO
						break;
					default:
						this.SkipToNextTag();
				}
				this.Document.addScene(flacescene);
				break;
			default:
				this.SkipToNextTag();
		}
	}

	readDocument2()
	{
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 2:
				let flacescene = null;
				switch (this.Data.readInt())
				{
					case 0:
						flacescene = new class {
							constructor() {
								this.RootNode = null;
								this.CurrentScene = gDocument.getCurrentScene();
								this.registerSceneNodeAnimatorForEvents = this.CurrentScene.registerSceneNodeAnimatorForEvents;
								this.RegisteredSceneNodeAnimatorsForEventsList = this.CurrentScene.RegisteredSceneNodeAnimatorsForEventsList;
							}

							getRootSceneNode() {
								return this.CurrentScene.RootNode;
							}
						};

						// @ts-ignore
						this.readFreeScene2(flacescene);
						break;
					default:
						this.SkipToNextTag();
				}
				this.Document.addScene(flacescene);
				break;
			default:
				this.SkipToNextTag();
		}
	}

	/**
	 * @param {ArrayBuffer|String} filecontent
	 * @param {CL3D.Free3dScene} scene
	 * @param {Number} sceneindex
	 * @param {String} filename
	 * @param {CL3D.TextureManager} textureManager
	 * @param {CL3D.MeshCache} meshCache
	 * @param {CL3D.CopperLicht} cursorControl
	 * @returns
	 */
	reloadScene(filecontent, scene, sceneindex, filename, textureManager, meshCache, cursorControl)
	{
		this.Filename = filename;
		this.TheTextureManager = textureManager;
		this.TheMeshCache = meshCache;
		this.CursorControl = cursorControl;
		this.Data = new StringBinary(filecontent);
		this.setRootPath();
		this.Data.readSI32();
		this.Data.readSI32();
		this.Data.readUI32();
		let loadedSceneCount = -1;
		let tag = this.readTag();
		if(tag != 1) return null;
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;)
		{
			tag = this.readTag();
			switch (tag)
			{
				case 2:
					let sceneType = this.Data.readInt();
					++loadedSceneCount;
					if(loadedSceneCount == sceneindex)
					{
						let flacescene = null;
						switch (sceneType)
						{
							case 0:
								flacescene = new Free3dScene;
								this.readFreeScene(flacescene);
								break;
							case 1:
								/// TODO
								break;
							default:
								this.SkipToNextTag();
						}
						return flacescene;
					}
					else this.SkipToNextTag();
				default:
					this.SkipToNextTag();
			}
		}
		return null;
	}

	readPublishSettings()
	{
		this.Data.readInt(); // Target
		this.Document.ApplicationTitle = this.ReadString();
		let flag = 0;
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 35:
				this.Data.readInt();
				this.Data.readInt();
				this.Data.readInt();
				this.Data.readInt();
				flag = this.Data.readInt();
				if((flag & 1) != 0) this.Document.WaitUntilTexturesLoaded = true;
				if((flag & 16) != 0) console.log(`CL3D.Global_PostEffectsDisabled = true`);
				this.SkipToNextTag();
				break;
			case 37:
				flag = this.Data.readInt();
				this.Data.readInt();
				if((flag & 1) != 0)
					console.log(`CL3D.gCCDebugInfoEnabled = true`);
				if((flag & 2) != 0)
				{
					this.Data.readInt();
					this.ReadString();
				}(flag & 4) != 0 && this.ReadString();
				break;
			default:
				this.SkipToNextTag();
		}
	}

	/**
	 * @param {CL3D.Free3dScene} scene
	 */
	readFreeScene(scene)
	{
		let nextTagPos = this.NextTagPos;
		for(this.readScene(scene); this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 1007:
				scene.DefaultCameraPos = this.Read3DVectF();
				scene.DefaultCameraTarget = this.Read3DVectF();
				break;
			case 8:
				this.ReadSceneGraph(scene);
				break;
			case 1008:
				scene.Gravity = this.Data.readFloat();
				break;
			case 1009:
				scene.FogEnabled = this.Data.readBoolean();
				scene.FogDensity = this.Data.readFloat();
				scene.FogColor = this.Data.readInt();
				break;
			case 1010:
				this.Data.readBoolean();
				scene.WindSpeed = this.Data.readFloat();
				scene.WindStrength = this.Data.readFloat();
				break;
			case 1011:
				scene.ShadowMappingEnabled = this.Data.readBoolean();
				scene.ShadowMapBias1 = this.Data.readFloat();
				scene.ShadowMapBias2 = this.Data.readFloat();
				scene.ShadowMapBackFaceBias = this.Data.readFloat();
				scene.ShadowMapOpacity = this.Data.readFloat();
				scene.ShadowMapCameraViewDetailFactor = this.Data.readFloat();
				break;
			case 1012:
				if (this.CopyRootNodeChildren)
				{
					this.SkipToNextTag();
				}
				else
				{
					for(let index = 0; index < 6; ++index) scene.PostEffectData[index].Active = this.Data.readBoolean();
					scene.PE_bloomBlurIterations = this.Data.readInt();
					scene.PE_bloomTreshold = this.Data.readFloat();
					scene.PE_blurIterations = this.Data.readInt();
					scene.PE_colorizeColor = this.Data.readInt();
					scene.PE_vignetteIntensity = this.Data.readFloat();
					scene.PE_vignetteRadiusA = this.Data.readFloat();
					scene.PE_vignetteRadiusB = this.Data.readFloat();
				}
				break;
			default:
				this.SkipToNextTag();
		}
	}

	/**
	 * @param {CL3D.Free3dScene} scene
	 */
	readFreeScene2(scene)
	{
		let nextTagPos = this.NextTagPos;
		for(this.readScene(scene); this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 8:
				this.ReadSceneGraph(scene);
				break;
			default:
				this.SkipToNextTag();
		}
	}

	Read3DVectF()
	{
		let vect3d = new Vect3d;
		vect3d.X = this.Data.readFloat();
		vect3d.Y = this.Data.readFloat();
		vect3d.Z = this.Data.readFloat();
		return vect3d;
	}

	ReadColorF()
	{
		let color = new ColorF;
		color.R = this.Data.readFloat();
		color.G = this.Data.readFloat();
		color.B = this.Data.readFloat();
		color.A = this.Data.readFloat();
		return color;
	}

	ReadColorFAsInt()
	{
		let A = this.Data.readFloat(),
			R = this.Data.readFloat(),
			G = this.Data.readFloat(),
			B = this.Data.readFloat();
		if(A > 1) A = 1;
		if(R > 1) R = 1;
		if(G > 1) G = 1;
		if(B > 1) B = 1;
		return createColor(A * 255, R * 255, G * 255, B * 255);
	}

	Read2DVectF()
	{
		let vect2d = new Vect2d;
		vect2d.X = this.Data.readFloat();
		vect2d.Y = this.Data.readFloat();
		return vect2d;
	}

	Read3DBoxF()
	{
		let box3d = new Box3d;
		box3d.MinEdge = this.Read3DVectF();
		box3d.MaxEdge = this.Read3DVectF();
		return box3d;
	}

	readScene(scene)
	{
		if(this.readTag() == 26)
		{
			if (this.CopyRootNodeChildren)
			{
				scene.Name = this.ReadString();
				let folder = new DummyTransformationSceneNode();
				folder.Name = scene.Name;
				//folder.Visible = false;
				this.NewRootNodeChildrenParent.addChild(folder);
				scene.RootNode = folder;
				this.SkipToNextTag();
			}
			else
			{
				scene.Name = this.ReadString();
				scene.BackgroundColor = this.Data.readInt();
			}
		}
		else this.JumpBackFromTagReading();
	}

	JumpBackFromTagReading()
	{
		this.Data._offset -= 10;
	}

	/**
	 * @param {CL3D.Free3dScene} scene
	 */
	ReadSceneGraph(scene)
	{
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 9:
				this.ReadSceneNode(scene, scene.RootNode, 0);
				break;
			default:
				this.SkipToNextTag();
		}
	}

	/**
	 * @param {Object} params
	 */
	AddSceneNodeParams(node, params)
	{
		node.Type = params.nodeType;
		node.Pos = params.pos;
		node.Rot = params.rot;
		node.Scale = params.scale;
		node.Visible = params.bIsVisible;
		node.Name = params.name;
		node.Culling = params.culling;
		node.Id = params.nodeId;
		node.scene = params.scene;
	}

	/**
	 * @param {CL3D.Free3dScene} scene
	 * @param {CL3D.SceneNode} node
	 * @param {Number} depth
	 */
	ReadSceneNode(scene, node, depth)
	{
		if(node != null)
		{
			let nextTagPos = this.NextTagPos;
			let lastCreatedSceneNode = null;
			let materialCountRead = 0;
			let params = {
				nodeType: this.Data.readInt(),
				nodeId: this.Data.readInt(),
				name: this.ReadString(),
				pos: this.Read3DVectF(),
				rot: this.Read3DVectF(),
				scale: this.Read3DVectF(),
				bIsVisible: this.Data.readBoolean(),
				culling: this.Data.readInt()
			};

			if(depth == 0)
			{
				if (!this.CopyRootNodeChildren)
				{
					node.Visible = params.bIsVisible;
					node.Name = params.name;
					node.Culling = params.culling;
				}
			}
			for(; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
			{
				case 9:
					this.ReadSceneNode(scene, lastCreatedSceneNode ? lastCreatedSceneNode : node, depth + 1);
					break;
				case 10:
					switch (params.nodeType)
					{
						case 2037085030:
							lastCreatedSceneNode = new SkyBoxSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlaceMeshNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1752395110:
							lastCreatedSceneNode = new MeshSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlaceMeshNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1835950438:
							lastCreatedSceneNode = new AnimatedMeshSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlaceAnimatedMeshNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1953526632:
							lastCreatedSceneNode = new HotspotSceneNode(this.CursorControl, null);
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlaceHotspotNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1819042406:
							lastCreatedSceneNode = new BillboardSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlaceBillBoardNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1835098982:
							lastCreatedSceneNode = new CameraSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlaceCameraNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1751608422:
							lastCreatedSceneNode = new LightSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlaceLightNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1935946598:
							lastCreatedSceneNode = new SoundSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlace3DSoundNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1752461414:
							lastCreatedSceneNode = new PathSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlacePathNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1954112614:
							lastCreatedSceneNode = new DummyTransformationSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							lastCreatedSceneNode.Box = this.Read3DBoxF();
							this.ReadIntoExistingMatrix(lastCreatedSceneNode.RelativeTransformationMatrix);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1868837478:
							lastCreatedSceneNode = new Overlay2DSceneNode(this.CursorControl);
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlace2DOverlay(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1668575334:
							lastCreatedSceneNode = new ParticleSystemSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readParticleSystemSceneNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1835283046:
							lastCreatedSceneNode = new Mobile2DInputSceneNode(this.CursorControl, scene);
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readFlace2DMobileInput(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						case 1920103526:
							lastCreatedSceneNode = new TerrainSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							lastCreatedSceneNode.Box = this.Read3DBoxF();
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode.updateAbsolutePosition();
							this.SkipToNextTag();
							break;
						case 1920235366:
							lastCreatedSceneNode = new WaterSurfaceSceneNode;
							this.AddSceneNodeParams(lastCreatedSceneNode, params);
							this.readWaterNode(lastCreatedSceneNode);
							node.addChild(lastCreatedSceneNode);
							lastCreatedSceneNode = lastCreatedSceneNode;
							lastCreatedSceneNode.updateAbsolutePosition();
							break;
						default:
							if(depth == 0 && !this.CopyRootNodeChildren) scene.AmbientLight = this.ReadColorF();
							this.SkipToNextTag();
							break
					}
					break;
				case 11:
					let mat = this.ReadMaterial();
					lastCreatedSceneNode && lastCreatedSceneNode.getMaterial(materialCountRead) && lastCreatedSceneNode.getMaterial(materialCountRead).setFrom(mat);
					++materialCountRead;
					break;
				case 25:
					if(lastCreatedSceneNode == null && depth == 0) lastCreatedSceneNode = scene.getRootSceneNode();
					this.ReadAnimator(lastCreatedSceneNode, scene);
					break;
				default:
					this.SkipToNextTag();
			}
			lastCreatedSceneNode && lastCreatedSceneNode.onDeserializedWithChildren();
		}
	}

	/**
	 * @param {CL3D.MeshSceneNode} node
	 */
	readFlaceMeshNode(node)
	{
		let nextTagPos = this.NextTagPos;
		node.Box = this.Read3DBoxF();
		this.Data.readBoolean();
		node.ReceivesStaticShadows = this.Data.readBoolean();
		node.DoesCollision = this.Data.readBoolean();
		node.OccludesLight = this.Data.readBoolean();
		for(; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 14:
				node.OwnedMesh = this.ReadMesh();
				break;
			default:
				this.SkipToNextTag();
		}
	}

	ReadMesh()
	{
		let mesh = new Mesh;
		mesh.Box = this.Read3DBoxF();
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 15:
				let buffer = this.ReadMeshBuffer();
				buffer != null && mesh.AddMeshBuffer(buffer);
				break;
			default:
				this.SkipToNextTag();
		}
		return mesh;
	}

	ReadMeshBuffer()
	{
		let buffer = new MeshBuffer;
		buffer.Box = this.Read3DBoxF();
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 11:
				buffer.Mat = this.ReadMaterial();
				break;
			case 16:
				let indicesCount = Math.floor(this.CurrentTagSize / 2);
				for(let index = 0; index < indicesCount; ++index) buffer.Indices.push(this.Data.readShort());
				break;
			case 17:
				let verticesCount = Math.floor(this.CurrentTagSize / 36);
				for(let index = 0; index < verticesCount; ++index)
				{
					let vertex3d = new Vertex3D;
					vertex3d.Pos = this.Read3DVectF();
					vertex3d.Normal = this.Read3DVectF();
					vertex3d.Color = this.Data.readInt();
					vertex3d.TCoords = this.Read2DVectF();
					vertex3d.TCoords2 = new Vect2d;
					buffer.Vertices.push(vertex3d);
				}
				break;
			case 18:
				let tCoordsVerticesCount = Math.floor(this.CurrentTagSize / 44);
				for(let index = 0; index < tCoordsVerticesCount; ++index)
				{
					let vertex3d = new Vertex3D;
					vertex3d.Pos = this.Read3DVectF();
					vertex3d.Normal = this.Read3DVectF();
					vertex3d.Color = this.Data.readInt();
					vertex3d.TCoords = this.Read2DVectF();
					vertex3d.TCoords2 = this.Read2DVectF();
					buffer.Vertices.push(vertex3d);
				}
				break;
			case 19:
				let TangentsVerticesCount = this.CurrentTagSize / 60;
				buffer.Tangents = [];
				buffer.Binormals = [];
				for(let index = 0; index < TangentsVerticesCount; ++index)
				{
					let vertex3d = new Vertex3D;
					vertex3d.Pos = this.Read3DVectF();
					vertex3d.Normal = this.Read3DVectF();
					vertex3d.Color = this.Data.readInt();
					vertex3d.TCoords = this.Read2DVectF();
					vertex3d.TCoords2 = new Vect2d;
					buffer.Tangents.push(this.Read3DVectF());
					buffer.Binormals.push(this.Read3DVectF());
					buffer.Vertices.push(vertex3d);
				}
				break;
			default:
				this.SkipToNextTag();
		}
		return buffer;
	}

	ReadMaterial()
	{
		let mat = new Material;
		mat.Type = this.Data.readInt();
		this.Data.readInt();
		this.Data.readInt();
		this.Data.readInt();
		this.Data.readInt();
		this.Data.readFloat();
		this.Data.readInt();
		this.Data.readInt();
		this.Data.readBoolean();
		this.Data.readBoolean();
		mat.Lighting = this.Data.readBoolean();
		mat.ZWriteEnabled = this.Data.readBoolean();
		this.Data.readByte();
		mat.BackfaceCulling = this.Data.readBoolean();
		this.Data.readBoolean();
		this.Data.readBoolean();
		this.Data.readBoolean();
		for(let index = 0; index < 4; ++index)
		{
			let texture = this.ReadTextureRef();
			switch (index)
			{
				case 0:
					mat.Tex1 = texture;
					break;
				case 1:
					mat.Tex2 = texture;
					break;
			}
			this.Data.readBoolean();
			this.Data.readBoolean();
			this.Data.readBoolean();
			if(this.Data.readShort() != 0) switch (index)
			{
				case 0:
					mat.ClampTexture1 = true;
					break;
			}
		}
		return mat;
	}

	ReadFileStrRef()
	{
		return this.ReadString();
	}

	ReadSoundRef()
	{
		let sound = this.PathRoot + this.ReadFileStrRef();
		return gSoundManager.getSoundFromSoundName(sound, true);
	}

	ReadTextureRef()
	{
		let texturePath = "";
		let texture = this.ReadFileStrRef();
		if (this.Filename.indexOf(".ccp") != -1) texturePath = texture;
		else texturePath = this.PathRoot + texture;
		if(this.TheTextureManager != null && texture != "") return this.TheTextureManager.getTexture(texturePath, true);
		return null;
	}

	/**
	 * @ignore
	 * @param {CL3D.HotspotSceneNode} node
	 */
	readFlaceHotspotNode(node)
	{
		let nextTagPos = this.NextTagPos;
		node.Box = this.Read3DBoxF();
		node.Width = this.Data.readInt();
		node.Height = this.Data.readInt();
		for(; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 3:
				this.readHotspotData(node);
				break;
			default:
				this.SkipToNextTag();
		}
	}

	/**
	 * @ignore
	 * @param {CL3D.HotspotSceneNode} node
	 */
	readHotspotData(node)
	{
		let nextTagPos = this.NextTagPos;
		node.caption = this.ReadString();
		node.TheTexture = this.ReadTextureRef();
		this.Read2DVectF();
		this.Data.readInt();
		node.dateLimit = this.ReadString();
		node.useDateLimit = this.Data.readBoolean();
		for(; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 6:
				node.bExecuteJavaScript = true;
				node.executeJavaScript = this.ReadString();
				break;
			case 4:
				node.bGotoScene = true;
				node.gotoScene = this.ReadString();
				break;
			case 5:
				node.bOpenWebsite = true;
				node.website = this.ReadString();
				node.websiteTarget = this.ReadString();
				break;
			default:
				this.SkipToNextTag();
		}
	}

	/**
	 * @param {CL3D.CameraSceneNode} node
	 */
	readFlaceCameraNode(node)
	{
		node.Box = this.Read3DBoxF();
		node.Target = this.Read3DVectF();
		node.UpVector = this.Read3DVectF();
		node.Fovy = this.Data.readFloat();
		node.Aspect = this.Data.readFloat();
		node.ZNear = this.Data.readFloat();
		node.ZFar = this.Data.readFloat();
		node.Active = this.Data.readBoolean();
		node.recalculateProjectionMatrix();
	}

	/**
	 * @param {CL3D.WaterSurfaceSceneNode} node
	 */
	readWaterNode(node)
	{
		this.Data.readInt();
		node.Details = this.Data.readInt();
		node.WaterFlowDirection.X = this.Data.readFloat();
		node.WaterFlowDirection.Y = this.Data.readFloat();
		node.WaveLength = this.Data.readFloat();
		node.WaveHeight = this.Data.readFloat();
		node.WaterColor = this.Data.readInt();
		node.ColorWhenUnderwater = this.Data.readBoolean();
		node.UnderWaterColor = this.Data.readInt();
		this.readFlaceMeshNode(node);
	}

	/**
	 * @param {CL3D.LightSceneNode} node
	 */
	readFlaceLightNode(node)
	{
		node.Box = this.Read3DBoxF();
		if(this.Data.readInt() == 2) node.LightData.IsDirectional = true;
		node.LightData.Color = this.ReadColorF();
		this.ReadColorF();
		this.Data.readBoolean();
		node.LightData.Direction = this.Read3DVectF();
		node.LightData.Radius = this.Data.readFloat();
		if(node.LightData.Radius != 0) node.LightData.Attenuation = 1 / node.LightData.Radius;
	}

	/**
	 * @param {CL3D.BillboardSceneNode} node
	 */
	readFlaceBillBoardNode(node)
	{
		node.MeshBuffer.Box = this.Read3DBoxF();
		node.Box = node.MeshBuffer.Box;
		node.SizeX = this.Data.readFloat();
		node.SizeY = this.Data.readFloat();
		node.IsVertical = (this.Data.readByte() & 2) != 0;
	}

	/**
	 * @param {CL3D.SoundSceneNode} node
	 */
	readFlace3DSoundNode(node)
	{
		node.Box = this.Read3DBoxF();
		node.TheSound = this.ReadSoundRef();
		node.MinDistance = this.Data.readFloat();
		node.MaxDistance = this.Data.readFloat();
		node.PlayMode = this.Data.readInt();
		node.DeleteWhenFinished = this.Data.readBoolean();
		node.MaxTimeInterval = this.Data.readInt();
		node.MinTimeInterval = this.Data.readInt();
		node.Volume = this.Data.readFloat();
		node.PlayAs2D = this.Data.readBoolean();
		this.Data.readInt();
	}

	/**
	 * @param {CL3D.PathSceneNode} node
	 */
	readFlacePathNode(node)
	{
		node.Box = this.Read3DBoxF();
		node.Tightness = this.Data.readFloat();
		node.IsClosedCircle = this.Data.readBoolean();
		this.Data.readInt();
		let countNodes = this.Data.readInt();
		for(let index = 0; index < countNodes; ++index) node.Nodes.push(this.Read3DVectF());
	}

	/**
	 * @param {CL3D.ParticleSystemSceneNode} node
	 */
	readParticleSystemSceneNode(node)
	{
		node.Direction = this.Read3DVectF();
		node.MaxAngleDegrees = this.Data.readInt();
		node.EmittArea = this.Read3DVectF();
		node.MinLifeTime = this.Data.readInt();
		node.MaxLifeTime = this.Data.readInt();
		node.MaxParticles = this.Data.readInt();
		node.MinParticlesPerSecond = this.Data.readInt();
		node.MaxParticlesPerSecond = this.Data.readInt();
		node.MinStartColor = this.Data.readInt();
		node.MaxStartColor = this.Data.readInt();
		node.MinStartSizeX = this.Data.readFloat();
		node.MinStartSizeY = this.Data.readFloat();
		node.MaxStartSizeX = this.Data.readFloat();
		node.MaxStartSizeY = this.Data.readFloat();
		let flag = this.Data.readInt();
		if(flag & 1)
		{
			node.FadeOutAffector = true;
			node.FadeOutTime = this.Data.readInt();
			node.FadeTargetColor = this.Data.readInt();
		}
		else node.FadeOutAffector = false;
		if(flag & 2)
		{
			node.GravityAffector = true;
			node.GravityAffectingTime = this.Data.readInt();
			node.Gravity = this.Read3DVectF();
		}
		else node.GravityAffector = false;
		if(flag & 4)
		{
			node.ScaleAffector = true;
			node.ScaleToX = this.Data.readFloat();
			node.ScaleToY = this.Data.readFloat();
		}
		else node.ScaleAffector = false;
	}

	/**
	 * @param {CL3D.Mobile2DInputSceneNode} node
	 */
	readFlace2DMobileInput(node)
	{
		this.Data.readInt();
		node.SizeModeIsAbsolute = this.Data.readBoolean();
		if(node.SizeModeIsAbsolute)
		{
			node.PosAbsoluteX = this.Data.readInt();
			node.PosAbsoluteY = this.Data.readInt();
			node.SizeAbsoluteWidth = this.Data.readInt();
			node.SizeAbsoluteHeight = this.Data.readInt();
		}
		else
		{
			node.PosRelativeX = this.Data.readFloat();
			node.PosRelativeY = this.Data.readFloat();
			node.SizeRelativeWidth = this.Data.readFloat();
			node.SizeRelativeHeight = this.Data.readFloat();
		}
		node.ShowBackGround = this.Data.readBoolean();
		node.BackGroundColor = this.Data.readInt();
		node.Texture = this.ReadTextureRef();
		node.TextureHover = this.ReadTextureRef();
		node.RetainAspectRatio = this.Data.readBoolean();
		node.CursorTex = this.ReadTextureRef();
		node.InputMode = this.Data.readInt();
		if(node.InputMode == 1) node.KeyCode = this.Data.readInt();
	}

	/**
	 * @param {CL3D.Overlay2DSceneNode} node
	 */
	readFlace2DOverlay(node)
	{
		if(this.Data.readInt() & 1) node.BlurImage = true;
		node.SizeModeIsAbsolute = this.Data.readBoolean();
		if(node.SizeModeIsAbsolute)
		{
			node.PosAbsoluteX = this.Data.readInt();
			node.PosAbsoluteY = this.Data.readInt();
			node.SizeAbsoluteWidth = this.Data.readInt();
			node.SizeAbsoluteHeight = this.Data.readInt();
		}
		else
		{
			node.PosRelativeX = this.Data.readFloat();
			node.PosRelativeY = this.Data.readFloat();
			node.SizeRelativeWidth = this.Data.readFloat();
			node.SizeRelativeHeight = this.Data.readFloat();
		}
		node.ShowBackGround = this.Data.readBoolean();
		node.BackGroundColor = this.Data.readInt();
		node.Texture = this.ReadTextureRef();
		node.TextureHover = this.ReadTextureRef();
		node.RetainAspectRatio = this.Data.readBoolean();
		node.DrawText = this.Data.readBoolean();
		node.TextAlignment = this.Data.readByte();
		node.Text = this.ReadString();
		node.FontName = this.ReadString();
		node.TextColor = this.Data.readInt();
		node.AnimateOnHover = this.Data.readBoolean();
		node.OnHoverSetFontColor = this.Data.readBoolean();
		node.HoverFontColor = this.Data.readInt();
		node.OnHoverSetBackgroundColor = this.Data.readBoolean();
		node.HoverBackgroundColor = this.Data.readInt();
		node.OnHoverDrawTexture = this.Data.readBoolean();
	}

	/**
	 * @param {CL3D.SceneNode} node
	 * @param {CL3D.Scene} scene
	 * @returns
	 */
	ReadAnimator(node, scene)
	{
		if(node)
		{
			let animator = null;
			let flag = 0;
			let type = this.Data.readInt();
			switch (type)
			{
				case 100:
					animator = new AnimatorRotation;
					animator.Rotation = this.Read3DVectF();
					break;
				case 101:
					animator = new AnimatorFlyStraight;
					animator.Start = this.Read3DVectF();
					animator.End = this.Read3DVectF();
					animator.TimeForWay = this.Data.readInt();
					animator.Loop = this.Data.readBoolean();
					animator.recalculateImidiateValues();
					break;
				case 102:
					animator = new AnimatorFlyCircle;
					animator.Center = this.Read3DVectF();
					animator.Direction = this.Read3DVectF();
					animator.Radius = this.Data.readFloat();
					animator.Speed = this.Data.readFloat();
					animator.init();
					break;
				case 103:
					animator = new AnimatorCollisionResponse;
					animator.Radius = this.Read3DVectF();
					this.Data.readFloat();
					animator.AffectedByGravity = !equals(this.Data.readFloat(), 0);
					this.Data.readFloat();
					animator.Translation = this.Read3DVectF();
					flag = this.Data.readInt();
					this.Data.readInt();
					this.Data.readInt();
					if(flag & 1) animator.UseInclination = true;
					animator.SlidingSpeed = this.Data.readFloat();
					break;
				case 104:
					animator = new AnimatorCameraFPS(node instanceof CameraSceneNode && node, this.CursorControl);
					animator.MaxVerticalAngle = this.Data.readFloat();
					animator.MoveSpeed = this.Data.readFloat();
					animator.RotateSpeed = this.Data.readFloat();
					animator.JumpSpeed = this.Data.readFloat();
					animator.NoVerticalMovement = this.Data.readBoolean();
					flag = this.Data.readInt();
					if(flag & 1)
					{
						animator.moveByMouseMove = false;
						animator.moveByMouseDown = true;
					}
					else
					{
						animator.moveByMouseMove = true;
						animator.moveByMouseDown = false;
					}
					if(flag & 2) animator.MoveSmoothing = this.Data.readInt();
					if(flag & 4) animator.ChildrenDontUseZBuffer = true;
					if(node instanceof CameraSceneNode && node.getType() == "camera")
					;
					break;
				case 105:
					animator = new AnimatorCameraModelViewer(node instanceof CameraSceneNode && node, this.CursorControl);
					animator.Radius = this.Data.readFloat();
					animator.RotateSpeed = this.Data.readFloat();
					animator.NoVerticalMovement = this.Data.readBoolean();
					flag = this.Data.readInt();
					if(flag & 2)
					{
						animator.SlideAfterMovementEnd = true;
						animator.SlidingSpeed = this.Data.readFloat();
					}
					if(flag & 4)
					{
						animator.AllowZooming = true;
						animator.MinZoom = this.Data.readFloat();
						animator.MaxZoom = this.Data.readFloat();
						animator.ZoomSpeed = this.Data.readFloat();
					}
					break;
				case 106:
					animator = new AnimatorFollowPath(scene);
					animator.TimeNeeded = this.Data.readInt();
					animator.LookIntoMovementDirection = this.Data.readBoolean();
					animator.PathToFollow = this.ReadString();
					animator.OnlyMoveWhenCameraActive = this.Data.readBoolean();
					animator.AdditionalRotation = this.Read3DVectF();
					animator.EndMode = this.Data.readByte();
					animator.CameraToSwitchTo = this.ReadString();
					flag = this.Data.readInt();
					if(flag & 1) animator.TimeDisplacement = this.Data.readInt();
					if(animator.EndMode == 3 || animator.EndMode == 4) animator.TheActionHandler = this.ReadActionHandlerSection(scene);
					break;
				case 107:
					animator = new AnimatorOnClick(scene, this.CursorControl);
					animator.BoundingBoxTestOnly = this.Data.readBoolean();
					animator.CollidesWithWorld = this.Data.readBoolean();
					this.Data.readInt();
					animator.TheActionHandler = this.ReadActionHandlerSection(scene);
					break;
				case 108:
					animator = new AnimatorOnProximity(scene);
					animator.EnterType = this.Data.readInt();
					animator.ProximityType = this.Data.readInt();
					animator.Range = this.Data.readFloat();
					animator.SceneNodeToTest = this.Data.readInt();
					flag = this.Data.readInt();
					if(flag & 1)
					{
						animator.AreaType = 1;
						animator.RangeBox = this.Read3DVectF();
					}
					animator.TheActionHandler = this.ReadActionHandlerSection(scene);
					break;
				case 109:
					animator = new AnimatorAnimateTexture;
					animator.TextureChangeType = this.Data.readInt();
					animator.TimePerFrame = this.Data.readInt();
					animator.TextureIndexToChange = this.Data.readInt();
					animator.Loop = this.Data.readBoolean();
					let tanimcount = this.Data.readInt();
					animator.Textures = [];
					for(let index = 0; index < tanimcount; ++index) animator.Textures.push(this.ReadTextureRef());
					break;
				case 110:
					animator = new AnimatorOnMove(scene, this.CursorControl);
					animator.BoundingBoxTestOnly = this.Data.readBoolean();
					animator.CollidesWithWorld = this.Data.readBoolean();
					this.Data.readInt();
					animator.ActionHandlerOnLeave = this.ReadActionHandlerSection(scene);
					animator.ActionHandlerOnEnter = this.ReadActionHandlerSection(scene);
					break;
				case 111:
					animator = new AnimatorTimer(scene);
					animator.TickEverySeconds = this.Data.readInt();
					this.Data.readInt();
					animator.TheActionHandler = this.ReadActionHandlerSection(scene);
					break;
				case 112:
					animator = new AnimatorOnKeyPress(scene, this.CursorControl);
					animator.KeyPressType = this.Data.readInt();
					animator.KeyCode = this.Data.readInt();
					animator.IfCameraOnlyDoIfActive = this.Data.readBoolean();
					this.Data.readInt();
					animator.TheActionHandler = this.ReadActionHandlerSection(scene);
					break;
				case 113:
					animator = new AnimatorGameAI(scene);
					animator.AIType = this.Data.readInt();
					animator.MovementSpeed = this.Data.readFloat();
					animator.ActivationRadius = this.Data.readFloat();
					animator.CanFly = this.Data.readBoolean();
					animator.Health = this.Data.readInt();
					animator.Tags = this.ReadString();
					animator.AttacksAIWithTags = this.ReadString();
					animator.PatrolRadius = this.Data.readFloat();
					animator.RotationSpeedMs = this.Data.readInt();
					animator.AdditionalRotationForLooking = this.Read3DVectF();
					animator.StandAnimation = this.ReadString();
					animator.WalkAnimation = this.ReadString();
					animator.DieAnimation = this.ReadString();
					animator.AttackAnimation = this.ReadString();
					if(animator.AIType == 3) animator.PathIdToFollow = this.Data.readInt();
					flag = this.Data.readInt();
					if(flag & 1) animator.PatrolWaitTimeMs = this.Data.readInt();
					else
					{
						animator.PatrolWaitTimeMs = 1E4;
						if(animator.MovementSpeed != 0) animator.PatrolWaitTimeMs = animator.PatrolRadius / (animator.MovementSpeed / 1E3);
					}
					animator.ActionHandlerOnAttack = this.ReadActionHandlerSection(scene);
					animator.ActionHandlerOnActivate = this.ReadActionHandlerSection(scene);
					animator.ActionHandlerOnHit = this.ReadActionHandlerSection(scene);
					animator.ActionHandlerOnDie = this.ReadActionHandlerSection(scene);
					break;
				case 114:
					animator = new Animator3rdPersonCamera;
					animator.SceneNodeIDToFollow = this.Data.readInt();
					animator.AdditionalRotationForLooking = this.Read3DVectF();
					animator.FollowMode = this.Data.readInt();
					animator.FollowSmoothingSpeed = this.Data.readFloat();
					animator.TargetHeight = this.Data.readFloat();
					flag = this.Data.readInt();
					animator.CollidesWithWorld = flag & 1 ? true : false;
					break;
				case 115:
					animator = new AnimatorKeyboardControlled(scene, this.CursorControl);
					this.Data.readInt();
					animator.RunSpeed = this.Data.readFloat();
					animator.MoveSpeed = this.Data.readFloat();
					animator.RotateSpeed = this.Data.readFloat();
					animator.JumpSpeed = this.Data.readFloat();
					animator.AdditionalRotationForLooking = this.Read3DVectF();
					animator.StandAnimation = this.ReadString();
					animator.WalkAnimation = this.ReadString();
					animator.JumpAnimation = this.ReadString();
					animator.RunAnimation = this.ReadString();
					flag = this.Data.readInt();
					if(flag & 1) animator.DisableWithoutActiveCamera = true;
					if(flag & 2)
					{
						animator.UseAcceleration = true;
						animator.AccelerationSpeed = this.Data.readFloat();
						animator.DecelerationSpeed = this.Data.readFloat();
					}
					if(flag & 4) animator.PauseAfterJump = true;
					break;
				case 116:
					animator = new AnimatorOnFirstFrame(scene);
					animator.AlsoOnReload = this.Data.readBoolean();
					this.Data.readInt();
					animator.TheActionHandler = this.ReadActionHandlerSection(scene);
					break;
				case 117:
					animator = new AnimatorExtensionScript(scene);
					animator.JsClassName = this.ReadString();
					this.Data.readInt();
					this.ReadExtensionScriptProperties(animator.Properties, scene);
					break;
				default:
					animator = Extensions.readAnimator(this, type, node, scene);
					animator || this.SkipToNextTag();
					return;
			}
			animator && node.addAnimator(animator);
		}
		else this.SkipToNextTag();
	}

	/**
	 * @param {Array} props
	 * @param {CL3D.Scene} scene
	 */
	ReadExtensionScriptProperties(props, scene)
	{
		let propCount = this.Data.readInt();
		for(let index = 0; index < propCount; ++index)
		{
			let prop = new ExtensionScriptProperty;
			prop.Type = this.Data.readInt();
			prop.Name = this.ReadString();
			switch (prop.Type)
			{
				case 1:
					prop.FloatValue = this.Data.readFloat();
					break;
				case 2:
					prop.StringValue = this.ReadString();
					break;
				case 6:
					prop.VectorValue = this.Read3DVectF();
					break;
				case 7:
					prop.TextureValue = this.ReadTextureRef();
					break;
				case 9:
					prop.ActionHandlerValue = this.ReadActionHandlerSection(scene);
					break;
				case 0:
				case 4:
				case 5:
				case 8:
				case 3:
				default:
					prop.IntValue = this.Data.readInt();
					break;
			}
			props.push(prop);
		}
	}

	/**
	 * @param {CL3D.Scene} scene
	 * @returns
	 */
	ReadActionHandlerSection(scene)
	{
		if(this.Data.readInt())
		{
			let actionHandler = new ActionHandler(scene);
			this.ReadActionHandler(actionHandler, scene);
			return actionHandler;
		}
		return null;
	}

	/**
	 * @param {CL3D.ActionHandler} actionHandler
	 * @param {CL3D.Scene} scene
	 */
	ReadActionHandler(actionHandler, scene)
	{
		let tag = this.readTag();
		if(tag != 29) this.SkipToNextTag();
		else
			for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;)
			{
				let tag = this.readTag();
				if(tag == 30) {
					let action = this.ReadAction(this.Data.readInt(), scene);
				  	if(action) actionHandler.addAction(action);
				}
				else this.SkipToNextTag();
			}
	}

	async readEmbeddedFiles()
	{
		for(let nextTagPos = this.NextTagPos; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos;) switch (this.readTag())
		{
			case 13:
				let flag = this.Data.readInt(),
					name = this.ReadString(),
					filesize = this.Data.readInt();
				if(flag & 4)
				{
					let mesh = this.TheMeshCache.getMeshFromName(name);
					if (mesh) mesh.containsData() ? this.SkipToNextTag() : this.readSkinnedMesh(mesh, filesize);
				}
				else if(flag & 8)
				{
					let code = "";
					try
					{
						code = this.readUTFBytes(filesize);
					}
					catch (error)
					{
						console.log("error reading script: " + error);
					}

					code = code.replaceAll("__dirname", getDirName());
					code != null && await ScriptingInterface.getScriptingInterface().importCode(code);
				}
				this.SkipToNextTag();
				break;
			default:
				this.SkipToNextTag();
		}
	}

	/**
	 * @param {CL3D.AnimatedMeshSceneNode} node
	 */
	readFlaceAnimatedMeshNode(node)
	{
		node.Box = this.Read3DBoxF();
		this.Data.readBoolean();
		this.Data.readInt();
		let startFrame = this.Data.readInt(),
			endFrame = this.Data.readInt();
		node.FramesPerSecond = this.Data.readFloat();
		this.Data.readByte();
		node.Looping = this.Data.readBoolean();
		let flag = this.Data.readInt();
		if(flag == 0)
		{
			node.BlendTimeMs = 250;
			node.AnimationBlendingEnabled = true;
		}
		else if(flag & 1)
		{
			node.BlendTimeMs = this.Data.readInt();
			node.AnimationBlendingEnabled = node.BlendTimeMs > 0;
		}
		node.setMesh(this.ReadAnimatedMeshRef(node));
		node.StartFrame = startFrame;
		node.EndFrame = endFrame;
		if(flag & 2)
		{
			let dummyCount = this.Data.readInt();
			for(let index = 0; index < dummyCount; ++index)
			{
				let dummy = new SAnimatedDummySceneNodeChild;
				dummy.NodeIDToLink = this.Data.readInt();
				dummy.JointIdx = this.Data.readInt();
				node.AnimatedDummySceneNodes.push(dummy);
			}
		}
	}

	/**
	 * @param {CL3D.AnimatedMeshSceneNode} nodeToLink
	 * @returns
	 */
	ReadAnimatedMeshRef(nodeToLink)
	{
		let name = this.ReadFileStrRef(),
			mesh = this.TheMeshCache.getMeshFromName(name);
		if(mesh == null)
		{
			mesh = new SkinnedMesh;
			mesh.Name = name;			this.TheMeshCache.addMesh(mesh);
		}
		if(nodeToLink != null && mesh != null)
		{
			if(mesh.AnimatedMeshesToLink == null) mesh.AnimatedMeshesToLink = [];
			mesh.AnimatedMeshesToLink.push(nodeToLink);
		}
		return mesh;
	}

	/**
	 * @param {CL3D.SkinnedMesh|CL3D.SkinnedMeshJoint} mesh
	 * @param {Number} size
	 */
	readSkinnedMesh(mesh, size)
	{
		if(mesh != null)
		{
			let flag = this.Data.readInt();
			mesh.DefaultFPS = this.Data.readFloat();
			if(flag & 1) mesh.StaticCollisionBoundingBox = this.Read3DBoxF();
			let nextTagPos = this.NextTagPos;
			let endSkinnedMeshPos = this.Data.getPosition() + size;
			let loadedJoints = [];
			for(let index = 0; this.Data.bytesAvailable() > 0 && this.Data.getPosition() < nextTagPos && this.Data.getPosition() < endSkinnedMeshPos;)
			{
				let tag = this.readTag();
				if(tag == 33)
				{
					let joint = new SkinnedMeshJoint;
					joint.Name = this.ReadString();
					joint.LocalMatrix = this.ReadMatrix();
					joint.GlobalInversedMatrix = this.ReadMatrix();
					mesh.AllJoints.push(joint);

					let parentIndex = this.Data.readInt();
					loadedJoints.push(joint);
					parentIndex >= 0 && parentIndex < loadedJoints.length && loadedJoints[parentIndex].Children.push(joint);

					let attachedMeshesCount = this.Data.readInt();
					for(let index = 0; index < attachedMeshesCount; ++index) joint.AttachedMeshes.push(this.Data.readInt());

					let keycount = this.Data.readInt();
					for(index = 0; index < keycount; ++index)
					{
						let posKey = new SkinnedMeshPositionKey;
						posKey.frame = this.Data.readFloat();
						posKey.position = this.Read3DVectF();
						joint.PositionKeys.push(posKey);
					}

					keycount = this.Data.readInt();
					for(index = 0; index < keycount; ++index)
					{
						let scaleKey = new SkinnedMeshScaleKey;
						scaleKey.frame = this.Data.readFloat();
						scaleKey.scale = this.Read3DVectF();
						joint.ScaleKeys.push(scaleKey);
					}

					keycount = this.Data.readInt();
					for(index = 0; index < keycount; ++index)
					{
						let rotKey = new SkinnedMeshRotationKey;
						rotKey.frame = this.Data.readFloat();
						rotKey.rotation = this.ReadQuaternion();
						joint.RotationKeys.push(rotKey);
					}

					keycount = this.Data.readInt();
					for(index = 0; index < keycount; ++index)
					{
						let weight = new SkinnedMeshWeight;
						weight.buffer_id = this.Data.readUnsignedShort();
						weight.vertex_id = this.Data.readInt();
						weight.strength = this.Data.readFloat();
						joint.Weights.push(weight);
					}
				}
				else if(tag == 15)
				{
					let buffer = this.ReadMeshBuffer();
					buffer != null && mesh.AddMeshBuffer(buffer);
				}
				else if(tag == 34)
				{
					let range = new NamedAnimationRange;
					range.Name = this.ReadString();
					range.Begin = this.Data.readFloat();
					range.End = this.Data.readFloat();
					range.FPS = this.Data.readFloat();
					mesh.addNamedAnimationRange(range);
				}
				else this.SkipToNextTag();
			}
			try
			{
				mesh.finalize();
			}
			catch (error)
			{
				console.log("error finalizing skinned mesh: " + error);
			}
			if(mesh.AnimatedMeshesToLink && mesh.AnimatedMeshesToLink.length)
			{
				for(let index = 0; index < mesh.AnimatedMeshesToLink.length; ++index) {
					let node = mesh.AnimatedMeshesToLink[index];
					if (node) node.setFrameLoop(node.StartFrame, node.EndFrame);
				}

				mesh.AnimatedMeshesToLink = null;
			}
		}
	}

	/**
	 * @param {Number} actionType
	 * @param {CL3D.Scene} scene
	 * @returns
	 */
	ReadAction(actionType, scene)
	{
		let action = null;
		let flag = 0;
		switch (actionType)
		{
			case 0:
				action = new ActionMakeSceneNodeInvisible;
				action.InvisibleMakeType = this.Data.readInt();
				action.SceneNodeToMakeInvisible = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				this.Data.readInt();
				return action;
			case 1:
				action = new ActionChangeSceneNodePosition;
				action.PositionChangeType = this.Data.readInt();
				action.SceneNodeToChangePosition = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				action.Vector = this.Read3DVectF();
				if(action.PositionChangeType == 4) action.Area3DEnd = this.Read3DVectF();
				action.RelativeToCurrentSceneNode = this.Data.readBoolean();
				action.SceneNodeRelativeTo = this.Data.readInt();
				flag = this.Data.readInt();
				if(flag & 1)
				{
					action.UseAnimatedMovement = true;
					action.TimeNeededForMovementMs = this.Data.readInt();
				}
				return action;
			case 2:
				action = new ActionChangeSceneNodeRotation;
				action.RotationChangeType = this.Data.readInt();
				action.SceneNodeToChangeRotation = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				action.Vector = this.Read3DVectF();
				action.RotateAnimated = false;
				flag = this.Data.readInt();
				if(flag & 1)
				{
					action.RotateAnimated = true;
					action.TimeNeededForRotationMs = this.Data.readInt();
				}
				return action;
			case 3:
				action = new ActionChangeSceneNodeScale;
				action.ScaleChangeType = this.Data.readInt();
				action.SceneNodeToChangeScale = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				action.Vector = this.Read3DVectF();
				this.Data.readInt();
				return action;
			case 4:
				action = new ActionChangeSceneNodeTexture;
				action.TextureChangeType = this.Data.readInt();
				action.SceneNodeToChange = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				action.TheTexture = this.ReadTextureRef();
				if(action.TextureChangeType == 1) action.IndexToChange = this.Data.readInt();
				this.Data.readInt();
				return action;
			case 5:
				action = new ActionPlaySound;
				flag = this.Data.readInt();
				action.PlayLooped = (flag & 1) != 0;
				action.TheSound = this.ReadSoundRef();
				action.MinDistance = this.Data.readFloat();
				action.MaxDistance = this.Data.readFloat();
				action.Volume = this.Data.readFloat();
				action.PlayAs2D = this.Data.readBoolean();
				action.SceneNodeToPlayAt = this.Data.readInt();
				action.PlayAtCurrentSceneNode = this.Data.readBoolean();
				action.Position3D = this.Read3DVectF();
				return action;
			case 6:
				action = new ActionStopSound;
				action.SoundChangeType = this.Data.readInt();
				return action;
			case 7:
				action = new ActionExecuteJavaScript;
				this.Data.readInt();
				action.JScript = this.ReadString();
				return action;
			case 8:
				action = new ActionOpenWebpage;
				this.Data.readInt();
				action.Webpage = this.ReadString();
				action.Target = this.ReadString();
				return action;
			case 9:
				action = new ActionSetSceneNodeAnimation;
				action.SceneNodeToChangeAnim = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				action.Loop = this.Data.readBoolean();
				action.AnimName = this.ReadString();
				this.Data.readInt();
				return action;
			case 10:
				action = new ActionSwitchToScene(this.CursorControl);
				action.SceneName = this.ReadString();
				this.Data.readInt();
				return action;
			case 11:
				action = new ActionSetActiveCamera(this.CursorControl);
				action.CameraToSetActive = this.Data.readInt();
				this.Data.readInt();
				return action;
			case 12:
				action = new ActionSetCameraTarget;
				action.PositionChangeType = this.Data.readInt();
				action.SceneNodeToChangePosition = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				action.Vector = this.Read3DVectF();
				action.RelativeToCurrentSceneNode = this.Data.readBoolean();
				action.SceneNodeRelativeTo = this.Data.readInt();
				flag = this.Data.readInt();
				if(flag & 1)
				{
					action.UseAnimatedMovement = true;
					action.TimeNeededForMovementMs = this.Data.readInt();
				}
				return action;
			case 13:
				action = new ActionShoot;
				action.ShootType = this.Data.readInt();
				action.Damage = this.Data.readInt();
				action.BulletSpeed = this.Data.readFloat();
				action.SceneNodeToUseAsBullet = this.Data.readInt();
				action.WeaponRange = this.Data.readFloat();
				flag = this.Data.readInt();
				if(flag & 1)
				{
					action.SceneNodeToShootFrom = this.Data.readInt();
					action.ShootToCameraTarget = this.Data.readBoolean();
					action.AdditionalDirectionRotation = this.Read3DVectF();
				}
				if(flag & 2) action.ActionHandlerOnImpact = this.ReadActionHandlerSection(scene);
				if(flag & 4) action.ShootDisplacement = this.Read3DVectF();
				return action;
			case 14:
				/// TODO
				// quit application
				this.SkipToNextTag();
				return null;
			case 15:
				action = new ActionSetOverlayText;
				this.Data.readInt();
				action.SceneNodeToChange = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				action.Text = this.ReadString();
				return action;
			case 16:
				action = new ActionSetOrChangeAVariable;
				this.Data.readInt();
				action.VariableName = this.ReadString();
				action.Operation = this.Data.readInt();
				action.ValueType = this.Data.readInt();
				action.Value = this.ReadString();
				return action;
			case 17:
				action = new ActionIfVariable;
				flag = this.Data.readInt();
				action.VariableName = this.ReadString();
				action.ComparisonType = this.Data.readInt();
				action.ValueType = this.Data.readInt();
				action.Value = this.ReadString();
				action.TheActionHandler = this.ReadActionHandlerSection(scene);
				if(flag & 1) action.TheElseActionHandler = this.ReadActionHandlerSection(scene);
				return action;
			case 18:
				action = new ActionRestartBehaviors;
				action.SceneNodeToRestart = this.Data.readInt();
				action.ChangeCurrentSceneNode = this.Data.readBoolean();
				this.Data.readInt();
				return action;
			case 19:
				action = new ActionStoreLoadVariable;
				this.Data.readInt();
				action.VariableName = this.ReadString();
				action.Load = this.Data.readBoolean();
				return action;
			case 20:
				action = new ActionRestartScene(this.CursorControl);
				this.Data.readInt();
				action.SceneName = this.ReadString();
				this.LoadedAReloadAction = true;
				return action;
			case 22:
				action = new ActionCloneSceneNode;
				action.SceneNodeToClone = this.Data.readInt();
				action.CloneCurrentSceneNode = this.Data.readBoolean();
				this.Data.readInt();
				action.TheActionHandler = this.ReadActionHandlerSection(scene);
				return action;
			case 23:
				action = new ActionDeleteSceneNode;
				action.SceneNodeToDelete = this.Data.readInt();
				action.DeleteCurrentSceneNode = this.Data.readBoolean();
				action.TimeAfterDelete = this.Data.readInt();
				this.Data.readInt();
				return action;
			case 24:
				action = new ActionExtensionScript;
				action.JsClassName = this.ReadString();
				this.Data.readInt();
				this.ReadExtensionScriptProperties(action.Properties, scene);
				return action;
			case 25:
				action = new ActionPlayMovie(this.CursorControl);
				flag = this.Data.readInt();
				action.PlayLooped = (flag & 1) != 0;
				action.Command = this.Data.readInt();
				action.VideoFileName = this.ReadString();
				this.Data.readInt();
				action.SceneNodeToPlayAt = this.Data.readInt();
				action.PlayAtCurrentSceneNode = this.Data.readBoolean();
				action.MaterialIndex = this.Data.readInt();
				action.ActionHandlerFinished = this.ReadActionHandlerSection(scene);
				action.ActionHandlerFailed = this.ReadActionHandlerSection(scene);
				return action;
			case 26:
				action = new ActionStopSpecificSound;
				this.Data.readInt();
				action.TheSound = this.ReadSoundRef();
				return action;
			default:
				this.SkipToNextTag();
		}
		return null;
	}
}

let getDevicePixelRatioImpl = () => { };

if (typeof globalThis.devicePixelRatio == "undefined") {
    await import('nc-screen').then(async (module) => {
        getDevicePixelRatioImpl = () => {
            return module.default.getInfo().isRetina && 2.0;
        };
    });
}
else {
    getDevicePixelRatioImpl = () => {
        return globalThis.devicePixelRatio;
    };
}

/**
 * @returns {Number} the ratio of the resolution in physical pixels and in pixels for the current display device.
 */
const getDevicePixelRatio = () => {
    return getDevicePixelRatioImpl() || 1.0;
};

//+ Nikolaus Gebhardt
// This file is part of the CopperLicht library, copyright by Nikolaus Gebhardt


/**
 * @type {CL3D.CCDocument}
 */
let gDocument = new CCDocument();

/**
 * Creates an instance of the CopperLicht 3D engine by loading the scene from a CopperCube file.
 * @param {String} filetoload a filename such as 'test.ccbjs' or 'test.ccbz' which will be loaded, displayed and animated by the 3d engine.
 * .ccbjs and .ccbz files can be created using {@link http://www.ambiera.com/coppercube/index.html | the CopperCube editor}.
 * @param {HTMLCanvasElement} mainElement The id of the canvas in your html document.
 * @param {String=} loadingScreenText specifying a loadingScreen text. Setting this to a text like "Loading" will cause
 * a loading screen with this text to appear while the file is being loaded.
 * @param {String=} loadingScreenBackgroundColor  specifying a loadingScreen backfround color.
 * @param {String=} noWebGLText specifying a text to show when there is no webgl.
 * @param {Boolean=} fullpage set to true to expand canvas automatically to the full browser size.
 * @public
 * @returns {CL3D.CopperLicht} the instance of the CopperLicht engine
 */
const startCopperLichtFromFile = function (filetoload, mainElement, loadingScreenText, loadingScreenBackgroundColor, noWebGLText, fullpage) {
	let engine = new CopperLicht(mainElement, loadingScreenText, loadingScreenBackgroundColor, noWebGLText, fullpage);
	engine.load(filetoload);
	return engine;
};

/**
 * @description The main class of the CopperLicht 3D engine.
 * You can create an instance of this class using for example {@link startCopperLichtFromFile}, but using
 * code like this will work of course as well:
 * @example
 * var engine = new CL3D.CopperLicht(document.getElementById('yourCanvasID'));
 * engine.load('somefile.ccbz');
 * @class The main class of the CopperLicht engine, representing the 3D engine itself.
 * @constructor
 */
class CopperLicht {
	/**
	 * Event handler called before animating the scene. You can use this to manipulate the 3d scene every frame.
	 * An example how to use it looks like this:
	 * @example
	 * var engine = startCopperLichtFromFile('test.ccbz', document.getElementById('3darea'));
	 *
	 * engine.OnAnimate = function()
	 * {
	 *   var scene = engine.getScene();
	 *   if (scene)
	 *   {
	 *     // TODO: do your game logic here
	 *   }
	 * };
	 * @public
	 */
	OnAnimate = null;

	/**
	 * Event handler called before sending a received "mouse up" event to the scene graph. You can use this to intercept
	 * mouse events in your game. Return 'true' if you handled the event yourself and don't want the 3D scene to reveive this
	 * event. An example how to use it looks like this:
	 * @example
	 * var engine = startCopperLichtFromFile('test.ccbz', document.getElementById('3darea'));
	 *
	 * engine.OnMouseUp = function()
	 * {
	 *   var scene = engine.getScene();
	 *   if (scene)
	 *   {
	 *     // TODO: do your game logic here
	 *     // return true; // <- return true here if you handled the event yourself
	 *   }
	 *
	 *   return false; // let the engine handle this click
	 * };
	 * @public
	 */
	OnMouseUp = null;

	/**
	 * Event handler called before sending a received "mouse down" event to the scene graph. You can use this to intercept
	 * mouse events in your game. Return 'true' if you handled the event yourself and don't want the 3D scene to reveive this
	 * event. An example how to use it looks like this:
	 * @example
	 * var engine = startCopperLichtFromFile('test.ccbz', document.getElementById('3darea'));
	 *
	 * engine.OnMouseDown = function()
	 * {
	 *   var scene = engine.getScene();
	 *   if (scene)
	 *   {
	 *     // TODO: do your game logic here
	 *     // return true; // <- return true here if you handled the event yourself
	 *   }
	 *
	 *   return false; // let the engine handle this click
	 * };
	 * @public
	 */
	OnMouseDown = null;

	/**
	 * Event handler called after the scene has been completely drawn. You can use this to draw some additional stuff like
	 * 2d overlays or similar. Use it for example like here:
	 * @example
	 * var engine = startCopperLichtFromFile('test.ccbz', document.getElementById('3darea'));
	 *
	 * engine.OnAfterDrawAll = function()
	 * {
	 *   var renderer = engine.getRenderer();
	 *   if (renderer)
	 *   {
	 *     // TODO: draw something additionally here
	 *   }
	 * };
	 * @public
	 */
	OnAfterDrawAll = null;

	/**
	 * Event handler called before the scene will be completely drawn. You can use this to draw some additional stuff like
	 * weapons or similar. Use it for example like here:
	 * @example
	 * var engine = startCopperLichtFromFile('test.ccbz', document.getElementById('3darea'));
	 *
	 * engine.OnBeforeDrawAll = function()
	 * {
	 *   var renderer = engine.getRenderer();
	 *   if (renderer)
	 *   {
	 *     // TODO: draw something here
	 *   }
	 * };
	 * @public
	 */
	OnBeforeDrawAll = null;

	/**
	 * Event handler called after the scene description file has been loaded sucessfully (see {@link CopperLicht.load}().
	 * Can be used to hide a loading screen after loading of the file has been finished. Use it for example like here:
	 * @example
	 * var engine = startCopperLichtFromFile('test.ccbz', document.getElementById('3darea'));
	 *
	 * engine.OnLoadingComplete = function()
	 * {
	 *   // Do something here
	 * };
	 * @public
	 */
	OnLoadingComplete = null;

	/**
	 * @param {HTMLCanvasElement} mainElement id of the canvas element embedded in the html, used to draw 3d graphics.
	 * @param {String=} loadingScreenText optional parameter specifying a loadingScreen text. Setting this to a text like "Loading" will cause
	 * a loading screen with this text to appear while the file is being loaded.
	 * @param {String=} loadingScreenBackgroundColor
	 * @param {String=} noWebGLText optional parameter specifying a text to show when there is no webgl.
	 * @param {Boolean=} fullpage optional parameter, set to true to expand canvas automatically to the full browser size.
	 * @param {Boolean=} pointerLockForFPSCameras optional parameter, set to true to automatically use pointer lock for FPS cameras
	 */
	constructor(mainElement, loadingScreenText, loadingScreenBackgroundColor, noWebGLText, fullpage, pointerLockForFPSCameras) {
		//
		this.FPS = 60;
		this.DPR = getDevicePixelRatio();

		//
		this.MainElement = mainElement;
		this.TheRenderer = null;
		this.IsBrowser = this.MainElement ? true : false;
		this.IsPaused = false;
		this.NextCameraToSetActive = null;
		this.TheTextureManager = new TextureManager();
		this.TheMeshCache = new MeshCache();
		this.LoadingAFile = false;
		this.WaitingForTexturesToBeLoaded = false;
		this.LoadingAnimationCounter = 0;
		this.OnAnimate = null;
		this.OnBeforeDrawAll = null;
		this.OnAfterDrawAll = null;
		this.OnLoadingComplete = null;
		this.requestPointerLockAfterFullscreen = false;
		this.pointerIsCurrentlyLocked = false;
		this.playingVideoStreams = new Array();
		this.pointerLockForFPSCameras = pointerLockForFPSCameras;

		//
		this.RegisteredAnimatorsForKeyUp = new Array();
		this.RegisteredAnimatorsForKeyDown = new Array();

		this.MouseIsDown = false;
		this.MouseX = 0;
		this.MouseY = 0;
		this.MouseMoveX = 0;
		this.MouseMoveY = 0;
		this.MouseDownX = 0;
		this.MouseDownY = 0;
		this.MouseIsInside = true;
		this.IsTouchPinching = false;
		this.StartTouchPinchDistance = 0;

		this.LastCameraDragTime = 0; // flag to disable AnimatorOnClick actions when an AnimatorCameraFPS is currently dragging the camera

		if (noWebGLText == null)
			this.NoWebGLText = "Error: This browser does not support WebGL (or it is disabled).<br/>See <a href=\"www.ambiera.com/copperlicht/browsersupport.html\">here</a> for details.";
		else
			this.NoWebGLText = noWebGLText;

		this.fullpage = fullpage ? true : false;
		if (this.fullpage)
			this.initMakeWholePageSize();

		this.LoadingDialog = null;
		if (loadingScreenText != null)
			this.createTextDialog(true, loadingScreenText, loadingScreenBackgroundColor);

		this.updateCanvasTopLeftPosition();

		// redraw loading animator every few seconds
		const me = this;
		setInterval(() => { me.loadingUpdateIntervalHandler(); }, 500);

		// init scripting
		ScriptingInterface.getScriptingInterface().setEngine(this);
	}

	mainLoop() {
		// redraw every few seconds
		const me = this;
		const interval = 1000.0 / this.FPS;

		if (typeof globalThis.requestAnimationFrame == 'undefined' || false) {
			setInterval(() => { me.draw3DIntervalHandler(interval); }, interval);
		}
		else {
			let lastUpdate = CLTimer.getTime();
			const running = (now) => {
				let elapsed = now - lastUpdate;
				globalThis.requestAnimationFrame(running);

				if (elapsed >= interval) {
					me.draw3DIntervalHandler(now);

					lastUpdate = now - (elapsed % interval);
					// also adjusts for your interval not being
					// a multiple of requestAnimationFrame's interval (usually 16.7ms)
				}
			};
			globalThis.requestAnimationFrame(running);
		}
	}

	/**
	 * Initializes the renderer, you need to call this if you create the engine yourself without
	 * using one of the startup functions like {@link startCopperLichtFromFile}.
	 * @public
	 * @param {Number} width the width of the rendering surface in pixels.
	 * @param {Number} height the height of the rendering surface in pixels.
	 * @param {WebGLContextAttributes} options
	 * @param {HTMLCanvasElement=} canvas
	 * @return returns true if successful and false if not (if the browser does not support webgl,
	 * for example).
	 */
	initRenderer(width, height, options, canvas) {
		return this.createRenderer(width, height, options, canvas);
	}

	/**
	 * return a reference to the currently used {@link Renderer}.
	 * @public
	 */
	getRenderer() {
		return this.TheRenderer;
	}

	/**
	 * return a reference to the currently active {@link Scene}.
	 * @public
	 * @return {CL3D.Scene}
	 */
	getScene() {
		return gDocument.getCurrentScene();
	}

	/**
	 * @public
	 */
	registerEventHandlers() {
		if (this.IsBrowser) {
			// key evt receiver
			const me = this;
			document.onkeydown = (evt) => { me.handleKeyDown(evt); };
			document.onkeyup = (evt) => { me.handleKeyUp(evt); };

			const canvas = this.MainElement;
			if (canvas != null) {
				canvas.onmousemove = (evt) => { me.handleMouseMove(evt); };
				canvas.onmousedown = (evt) => { me.handleMouseDown(evt); };
				canvas.onmouseup = (evt) => { me.handleMouseUp(evt); };

				canvas.onmouseover = (evt) => { me.MouseIsInside = true; };
				canvas.onmouseout = (evt) => { me.MouseIsInside = false; };

				this.setupEventHandlersForFullscreenChange();

				try {
					const w = (evt) => { me.handleMouseWheel(evt); };
					canvas.addEventListener('mousewheel', w, false);
					canvas.addEventListener('DOMMouseScroll', w, false);
				} catch (e) {
					console.log(e);
				}

				// additionally, add touch support
				try {
					const touchstart = (evt) => {
						// detect pinch start
						if (evt.touches != null) {
							me.IsTouchPinching = evt.touches.length == 2;
							if (me.IsTouchPinching)
								me.StartTouchPinchDistance = me.getPinchDistance(evt);
						}

						// emulate normal mouse down
						if (me.handleMouseDown(evt.changedTouches[0]))
							me.handleEventPropagation(evt, true);
					};
					const touchend = (evt) => {
						me.IsTouchPinching = false;

						// emulate normal mouse up
						if (me.handleMouseUp(evt.changedTouches[0]))
							me.handleEventPropagation(evt, true);
					};
					const touchmove = (evt) => {
						if (me.IsTouchPinching && evt.touches != null && evt.touches.length >= 2) {
							// emulate mouse wheel, user it pinching
							let dist = me.getPinchDistance(evt);
							let delta = dist - me.StartTouchPinchDistance;
							me.StartTouchPinchDistance = dist;
							me.sendMouseWheelEvent(delta);
						}

						else {
							// emular normal mouse move
							if (me.handleMouseMove(evt.changedTouches[0]))
								me.handleEventPropagation(evt, true);
						}
					};

					canvas.addEventListener("touchstart", touchstart, false);
					canvas.addEventListener("touchend", touchend, false);
					canvas.addEventListener("touchcancel", touchend, false);
					canvas.addEventListener("touchleave", touchend, false);
					canvas.addEventListener("touchmove", touchmove, false);
				} catch (e) {
					console.log(e);
				}
			}
		}
	}

	/**
	 * @public
	 */
	getPinchDistance(evt) {
		var t = evt.touches;
		if (t[0].pageX == null)
			return 0;

		return Math.sqrt((t[0].pageX - t[1].pageX) * (t[0].pageX - t[1].pageX) + (t[0].pageY - t[1].pageY) * (t[0].pageY - t[1].pageY));
	}

	/**
	 * Loads a the scene from a <a href="http://www.ambiera.com/coppercube/index.html" target="_blank">CopperCube</a> file and displays it.
	 * This will also initialize the renderer if this has not been done before. You can also use the event handler {@link CopperLicht.OnLoadingComplete} to
	 * check if the loading of the file has completed.
	 * @param filetoload a filename such as 'test.ccbjs' or 'test.ccbz' which will be loaded, displayed and animated by the 3d engine.
	 * .ccbjs and .ccbz files can be created using the <a href="http://www.ambiera.com/coppercube/index.html" target="_blank">CopperCube editor</a>,
	 * it is free to use for 21 days.
	 * @param importIntoExistingDocument if set to true, this will load all scenes into the existing document. It won't replace the current
	 * loaded data with the data from that file, but append it. This means that the scenes in the .ccbjs or .ccbz file will be added to the list of
	 * existing scenes, instead of replacing them.
	 * @param functionToCallWhenLoaded (optional) a function to call when the file has been loaded
	*/
	load(filetoload, importIntoExistingDocument, functionToCallWhenLoaded) {
		if (this.MainElement) {
			if (!this.createRenderer(this.MainElement.width, this.MainElement.height, { alpha: false }, this.MainElement)) {
				this.createTextDialog(false, this.NoWebGLText);
				return false;
			}
		}

		var me = this;
		this.LoadingAFile = true;
		var l = new CCFileLoader(filetoload, filetoload.indexOf('.ccbz') != -1 || filetoload.indexOf('.ccp') != -1, this.IsBrowser);
		l.load(async (p) => { await me.parseFile(p, filetoload, importIntoExistingDocument); if (functionToCallWhenLoaded) functionToCallWhenLoaded(); });

		return true;
	}

	/**
	 * @public
	 */
	createRenderer(width, height, options, canvas) {
		if (this.TheRenderer != null)
			return true;

		this.TheRenderer = new Renderer(this.TheTextureManager);
		this.TheRenderer.init(width, height, options, canvas);

		if (this.TheTextureManager)
			this.TheTextureManager.TheRenderer = this.TheRenderer;

		this.registerEventHandlers();

		this.mainLoop();

		return true;
	}

	/**
	 * @public
	 */
	initMakeWholePageSize() {
		document.body.style.margin = "0";
		document.body.style.padding = "0";
		document.body.style.overflow = 'hidden';
	}

	/**
	 * @public
	 */
	makeWholePageSize() {
		if (this.tmpWidth != globalThis.innerWidth || this.tmpHeight != globalThis.innerHeight) {
			this.tmpWidth = globalThis.innerWidth;
			this.tmpHeight = globalThis.innerHeight;

			this.MainElement.style.width = this.tmpWidth + "px";
			this.MainElement.style.height = this.tmpHeight + "px";

			this.DPR = getDevicePixelRatio();

			this.MainElement.setAttribute("width", String(Math.floor(this.tmpWidth * this.DPR)));
			this.MainElement.setAttribute("height", String(Math.floor(this.tmpHeight * this.DPR)));
		}
	}

	/**
	 * @public
	 */
	makeWholeCanvasSize() {
		if (this.MainElement && (this.tmpWidth != this.MainElement.width || this.tmpHeight != this.MainElement.height)) {
			var w = this.MainElement.width;
			var h = this.MainElement.height;

			this.MainElement.style.width = w + "px";
			this.MainElement.style.height = h + "px";

			this.DPR = getDevicePixelRatio();

			this.tmpWidth = Math.floor(w * this.DPR);
			this.tmpHeight = Math.floor(h * this.DPR);

			this.MainElement.setAttribute("width",  String(this.tmpWidth));
			this.MainElement.setAttribute("height", String(this.tmpHeight));
		}
	}

	/**
	 * @public
	 */
	draw3DIntervalHandler(timeMs) {
		// resize
		if (this.fullpage)
			this.makeWholePageSize();
		else
			this.makeWholeCanvasSize();

		// draw
		this.draw3dScene(timeMs);
	}

	/**
	 * @public
	 */
	loadingUpdateIntervalHandler() {
		if (this.LoadingDialog != null)
			this.updateLoadingDialog();

		++this.LoadingAnimationCounter;
		var texturesToLoad = 0;

		if (this.TheTextureManager) {
			texturesToLoad = this.TheTextureManager.getCountOfTexturesToLoad();
			this.TheTextureManager.getTextureCount();
		}

		if (this.WaitingForTexturesToBeLoaded && texturesToLoad == 0) {
			this.WaitingForTexturesToBeLoaded = false;
			this.startFirstSceneAfterEverythingLoaded();
		}

		if (this.LoadingAFile || texturesToLoad) {

			switch (this.LoadingAnimationCounter % 4) {
							}

			/// TODO
		}
	}

	/**
	 * Returns true of CopperLicht is currently loading a scene file
	 * @public
	 */
	isLoading() {
		return this.LoadingAFile || this.WaitingForTexturesToBeLoaded;
	}

	/**
	 * @public
	 */
	async parseFile(filecontent, filename, importIntoExistingDocument, copyRootNodeChildren, newRootNodeChildrenParent) {
		this.LoadingAFile = false;

		var loader = new FlaceLoader();
		var doc = await loader.loadFile(filecontent, filename, this.TheTextureManager, this.TheMeshCache, this, copyRootNodeChildren, newRootNodeChildrenParent);
		if (doc != null) {
			// var docJSON = JSON.stringify(JSON.decycle(doc));
			// var blob = new Blob([docJSON], {type: "text/plain;charset=utf-8"});
			// saveAs(blob, "doc.json");
			if (!importIntoExistingDocument ||
				gDocument == null ||
				(gDocument != null && gDocument.Scenes.length == 0)) {
				// default behavior, load document and replace all data.
				// Also, this is forced to do if there isn't a current document or scene.
				gDocument = doc;

				// store fileconent for later possible reload (RestartSceneAction)
				if (loader.LoadedAReloadAction) {
					this.LastLoadedFileContent = loader.StoredFileContent;
					this.LastLoadedFilename = filename;
				}

				if (!doc.WaitUntilTexturesLoaded) {
					this.startFirstSceneAfterEverythingLoaded();
				}

				else
					this.WaitingForTexturesToBeLoaded = true;
			}

			else {
				// import all scenes loaded into this current, already existing document.
				if (!copyRootNodeChildren || !newRootNodeChildrenParent) {
					for (var sceneNr = 0; sceneNr < doc.Scenes.length; ++sceneNr) {
						// console.log("imported scene " + doc.Scenes[sceneNr].Name);
						gDocument.addScene(doc.Scenes[sceneNr]);
					}

				}
			}
		}
	}

	/**
	 * @public
	 */
	startFirstSceneAfterEverythingLoaded() {
		// set active scene
		this.gotoScene(gDocument.getCurrentScene());

		// draw
		this.draw3dScene();

		// notify loading complete handler
		if (this.OnLoadingComplete != null)
			this.OnLoadingComplete();
	}

	/**
	 * Draws and animates the 3d scene.
	 * To be called if you are using your own rendering loop, usually this has not to be called at all.
	 * This will also call {@link OnAnimate}() before starting to draw anything, and call {@link OnAfterDrawAll}() after everything
	 * has been drawn.
	 * @public
	 */
	draw3dScene(timeMs) {
		if (gDocument == null || this.TheRenderer == null)
			return;


		if (this.isLoading())
			return;

		this.updateCanvasTopLeftPosition();

		this.internalOnBeforeRendering();
		var renderScene = gDocument.getCurrentScene();

		if (!this.IsPaused && renderScene) {
			if (this.updateAllVideoStreams()) // at least one video is playing if it returns true
				renderScene.forceRedrawNextFrame();

			if (this.OnAnimate)
				this.OnAnimate();

			this.TheRenderer.registerFrame();

			if (renderScene.doAnimate(this.TheRenderer)) {
				this.TheRenderer.beginScene(renderScene.BackgroundColor);

				if (this.OnBeforeDrawAll)
					this.OnBeforeDrawAll();

				// draw scene
				renderScene.drawAll(this.TheRenderer);

				// callback
				if (this.OnAfterDrawAll)
					this.OnAfterDrawAll();

				// scripting frame
				var sc = ScriptingInterface.getScriptingInterfaceReadOnly();
				if (sc != null)
					sc.runDrawCallbacks(this.TheRenderer, timeMs);

				// finished
				this.TheRenderer.endScene();
			}
		}

		this.internalOnAfterRendering();
	}

	/**
	 * @public
	 */
	internalOnAfterRendering() {
		this.setNextCameraActiveIfNeeded();
	}

	/**
	 * @public
	 */
	internalOnBeforeRendering() {
		this.setNextCameraActiveIfNeeded();
	}

	/**
	 * Returns all available scenes.
	 * Returns an array containing all {@link Scene}s.
	 * @public
	 */
	getScenes() {
		if (gDocument)
			return gDocument.Scenes;

		return 0;
	}

	/**
	 * Adds a new CL3D.Scene
	 * @public
	 */
	addScene(scene) {
		if (gDocument) {
			gDocument.Scenes.push(scene);
			if (gDocument.Scenes.length == 1)
				gDocument.setCurrentScene(scene);
		}
	}

	/**
	 * Switches the current scene to a new CL3D.Scene by scene name.
	 * @param scene {String} The name of the new CL3D.Scene to be activated.
	 * @param ignorecase {Boolean} set to true to ignore the case of the name
	 * @public
	 */
	gotoSceneByName(scenename, ignorecase) {
		if (!gDocument)
			return false;

		var scenes = gDocument.Scenes;
		var name = scenename;
		if (ignorecase)
			name = name.toLowerCase();

		for (var i = 0; i < scenes.length; ++i) {
			var sname = scenes[i].Name;
			if (ignorecase)
				sname = sname.toLowerCase();

			if (name == sname) {
				this.gotoScene(scenes[i]);
				return true;
			}
		}

		return false;
	}

	/**
	 * Switches the current scene to a new CL3D.Scene.
	 * @param {CL3D.Free3dScene} scene The new CL3D.Scene to be activated.
	 * @public
	 */
	gotoScene(scene) {
		if (!scene)
			return false;

		// set active camera
		// TODO: handle panorama scenes later
		//var panoScene = typeof scene == FlacePanoramaScene;
		var isPanoScene = scene.getSceneType() == 'panorama';
		var isFree3dScene = scene.getSceneType() == 'free';

		var activeCamera = null;

		gDocument.setCurrentScene(scene);

		// make sprites of old scene invisible
		//if (CurrentActiveScene)
		//	CurrentActiveScene.setSpriteChildrenVisible(false);
		// init cameras and create default ones if there is none yet
		if (scene.WasAlreadyActivatedOnce) {
			activeCamera = scene.getActiveCamera();
			//scene.setSpriteChildrenVisible(true);
		}

		else {
			scene.WasAlreadyActivatedOnce = true;

			//setActionHandlerForHotspots(scene.RootNode);
			var foundActiveCamera = false;
			var cameras = scene.getAllSceneNodesOfType('camera');
			if (cameras) {
				//console.log("Found " + cameras.length + " cameras!");
				for (var i = 0; i < cameras.length; ++i) {
					var fcam = cameras[i];
					if (fcam && fcam.Active) {
						// found a camera to activate
						activeCamera = fcam;
						foundActiveCamera = true;

						activeCamera.setAutoAspectIfNoFixedSet(this.TheRenderer.width, this.TheRenderer.height);
						//console.log("activated camera from file:" + fcam.Name);
						break;
					}
				}
			}

			if (!foundActiveCamera) {
				var aspect = 4.0 / 3.0;
				if (this.TheRenderer.width && this.TheRenderer.height)
					aspect = this.TheRenderer.width / this.TheRenderer.height;

				activeCamera = new CameraSceneNode();
				activeCamera.setAspectRatio(aspect);
				scene.RootNode.addChild(activeCamera);
				var createdAnimator = null;

				if (!isPanoScene) {
					createdAnimator = new AnimatorCameraFPS(activeCamera, this);
					activeCamera.addAnimator(createdAnimator);
				}
				//else
				//{
				//interfaceTexture = panoScene.InterfaceTexture;
				//createdAnimator = new CL3D.AnimatorCameraPano(activeCamera, this, interfaceTexture);
				//activeCamera.addAnimator(createdAnimator);
				//}
				if (isFree3dScene) {
					if (scene.DefaultCameraPos != null)
						activeCamera.Pos = scene.DefaultCameraPos.clone();

					if (scene.DefaultCameraTarget != null) {
						if (createdAnimator != null)
							createdAnimator.lookAt(scene.DefaultCameraTarget);

						else
							activeCamera.setTarget(scene.DefaultCameraTarget);
					}
				}

				if (createdAnimator)
					createdAnimator.setMayMove(!isPanoScene);
			}

			scene.setActiveCamera(activeCamera);

			// create collision geometry
			scene.CollisionWorld = scene.createCollisionGeometry(true);
			Extensions.setWorld(scene.CollisionWorld);
			this.setCollisionWorldForAllSceneNodes(scene.getRootSceneNode(), scene.CollisionWorld);
		}

		// let scripting manager know about this
		ScriptingInterface.getScriptingInterface().setActiveScene(scene);

		// set upate mode
		scene.setRedrawMode(gDocument.UpdateMode);
		scene.forceRedrawNextFrame();

		// done
		//console.log("Scene ready.");
		return true;
	}

	/**
	 * @public
	 */
	setNextCameraActiveIfNeeded() {
		if (this.NextCameraToSetActive == null)
			return;

		var scene = gDocument.getCurrentScene();
		if (scene == null)
			return;

		if (this.NextCameraToSetActive.scene === scene) {
			if (this.TheRenderer)
				this.NextCameraToSetActive.setAutoAspectIfNoFixedSet(this.TheRenderer.getWidth(), this.TheRenderer.getHeight());

			scene.setActiveCamera(this.NextCameraToSetActive);
			this.NextCameraToSetActive = null;
		}
	}

	/**
	 * When CopperLicht is created, it will register the document.onkeydown event with this function.
	 * If you need to handle it yourself, you should call this function with the event parameter so
	 * that all animators still work correctly.
	 * @public
	 */
	handleKeyDown(evt) {
		var scene = this.getScene();
		if (scene == null)
			return false;

		var usedToDoAction = false;

		var cam = scene.getActiveCamera();
		if (cam != null)
			usedToDoAction = cam.onKeyDown(evt);

		for (var i = 0; i < this.RegisteredAnimatorsForKeyDown.length; ++i)
			if (this.RegisteredAnimatorsForKeyDown[i].onKeyDown(evt))
				usedToDoAction = true;

		return this.handleEventPropagation(evt, usedToDoAction);
	}

	/**
	 * When CopperLicht is created, it will register the document.onkeyup event with this function.
	 * If you need to handle it yourself, you should call this function with the event parameter so
	 * that all animators still work correctly.
	 * @public
	 */
	handleKeyUp(evt) {
		var scene = this.getScene();
		if (scene == null)
			return false;

		var usedToDoAction = false;

		var cam = scene.getActiveCamera();
		if (cam != null)
			usedToDoAction = cam.onKeyUp(evt);

		for (var i = 0; i < this.RegisteredAnimatorsForKeyUp.length; ++i)
			if (this.RegisteredAnimatorsForKeyUp[i].onKeyUp(evt))
				usedToDoAction = true;

		return this.handleEventPropagation(evt, usedToDoAction);
	}

	/**
	 * Causes a key event to stop propagating if it has been used inside an animator
	 * @public
	 */
	handleEventPropagation(evt, usedToDoAction) {
		if (this.IsBrowser && usedToDoAction) {
			try {
				evt.preventDefault();
			}
			catch (e) {
				console.log(e);
			}

			return true;
		}

		return false;
	}

	/**
	 * @public
	 */
	registerAnimatorForKeyUp(an) {
		if (an != null)
			this.RegisteredAnimatorsForKeyUp.push(an);
	}

	/**
	 * @public
	 */
	registerAnimatorForKeyDown(an) {
		if (an != null)
			this.RegisteredAnimatorsForKeyDown.push(an);
	}

	/**
	 * @public
	 */
	updateCanvasTopLeftPosition(e) {
		var x = 0;
		var y = 0;

		var obj = this.MainElement;

		while (obj != null) {
			x += obj.offsetLeft;
			y += obj.offsetTop;
			// @ts-ignore
			obj = obj.offsetParent;
		}

		this.CanvasTopLeftX = x;
		this.CanvasTopLeftY = y;
	}

	/**
	 * @public
	 * @description Returns true if the current document has the mouse pointer locked or not. Useful for first person shooters
	 */
	isInPointerLockMode() {
		return this.pointerIsCurrentlyLocked;
	}

	/**
	 * @public
	 */
	getMousePosXFromEvent(evt) {
		if (this.isInPointerLockMode()) {
			var w = this.TheRenderer.getWidth();
			return (w / 2.0);
		}

		if (this.IsBrowser) {
			if (evt.pageX)
				return evt.pageX - this.CanvasTopLeftX;
			else
				return evt.clientX - this.MainElement.offsetLeft + document.body.scrollLeft;
		}
		else {
			return evt.x;
		}
	}

	/**
	 * @public
	 */
	getMousePosYFromEvent(evt) {
		if (this.isInPointerLockMode()) {
			var h = this.TheRenderer.getHeight();
			return (h / 2.0);
		}

		if (this.IsBrowser) {
			if (evt.pageY)
				return evt.pageY - this.CanvasTopLeftY;
			else
				return evt.clientY - this.MainElement.offsetTop + document.body.scrollTop;
		}
		else {
			return evt.y;
		}
	}

	/**
	 * When CopperLicht is created, it will register the onmousedown event of the canvas with this function.
	 * If you need to handle it yourself, you should call this function with the event parameter so
	 * that all animators still work correctly.
	 * @public
	 */
	handleMouseDown(evt) {
		this.MouseIsDown = true;
		this.MouseIsInside = true;

		if (evt) //  && !this.isInPointerLockMode())
		{
			this.MouseDownX = this.getMousePosXFromEvent(evt);
			this.MouseDownY = this.getMousePosYFromEvent(evt);

			this.MouseX = this.MouseDownX;
			this.MouseY = this.MouseDownY;
		}

		//console.log("MouseDown " + this.MouseDownX + " " + this.MouseDownY);
		//console.log("e.offsetX:" + evt.offsetX + " e.layerX:" + evt.layerX + " e.clientX:" + evt.clientX);
		var scene = this.getScene();
		if (scene == null)
			return false;

		var handledByUser = false;
		if (this.OnMouseDown)
			handledByUser = this.OnMouseDown();

		if (!handledByUser) {
			var cam = scene.getActiveCamera();
			if (cam != null)
				cam.onMouseDown(evt);

			scene.postMouseDownToAnimators(evt);
		}

		return this.handleEventPropagation(evt, true);
	}

	/**
	 * Returns if the mouse is overt the canvas at all
	 * @public
	 */
	isMouseOverCanvas() {
		return this.MouseIsInside;
	}

	/**
	 * Returns the last X movement coordinate when in pointer lock mode
	 * @public
	 */
	getMouseMoveX() {
		return this.MouseMoveX;
	}

	/**
	 * Returns the last Y movement coordinate when in pointer lock mode
	 * @public
	 */
	getMouseMoveY() {
		return this.MouseMoveY;
	}

	/**
	 * Returns the last X coordinate in pixels of the cursor over the canvas, relative to the canvas.
	 * see also {@link CopperLicht.OnMouseDown} and {@link CopperLicht.OnMouseUp}.
	 * @public
	 */
	getMouseX() {
		return this.MouseX;
	}

	/**
	 * Returns the last Y coordinate in pixels of the cursor over the canvas, relative to the canvas.
	 * see also {@link CopperLicht.OnMouseDown} and {@link CopperLicht.OnMouseUp}.
	 * @public
	 */
	getMouseY() {
		return this.MouseY;
	}

	/**
	 * Returns if the mouse is currently pressed over the canvas.
	 * @public
	 */
	isMouseDown() {
		return this.MouseIsDown;
	}

	/**
	 * Returns the last X coordinate where the mouse was pressed over the canvas.
	 * see also {@link CopperLicht.OnMouseDown} and {@link CopperLicht.OnMouseUp}.
	 * @public
	 */
	getMouseDownX() {
		return this.MouseDownX;
	}

	/**
	 * Returns the last Y coordinate where the mouse was pressed over the canvas.
	 * see also {@link CopperLicht.OnMouseDown} and {@link CopperLicht.OnMouseUp}.
	 * @public
	 */
	getMouseDownY() {
		return this.MouseDownY;
	}

	/**
	 * @public
	 */
	setMouseDownWhereMouseIsNow() {
		if (this.isInPointerLockMode()) {
			this.MouseMoveX = 0;
			this.MouseMoveY = 0;
		}

		else {
			this.MouseDownX = this.MouseX;
			this.MouseDownY = this.MouseY;
		}
	}

	/**
	 * When CopperLicht is created, it will register the onmouseup event of the canvas with this function.
	 * If you need to handle it yourself, you should call this function with the event parameter so
	 * that all animators still work correctly.
	 * @public
	 */
	handleMouseUp(evt) {
		this.MouseIsDown = false;

		var scene = this.getScene();
		if (scene == null)
			return false;

		if (evt) {
			this.MouseX = this.getMousePosXFromEvent(evt);
			this.MouseY = this.getMousePosYFromEvent(evt);
		}

		var handledByUser = false;
		if (this.OnMouseUp)
			handledByUser = this.OnMouseUp();

		if (!handledByUser) {
			var cam = scene.getActiveCamera();
			if (cam != null)
				cam.onMouseUp(evt);

			//console.log("MouseUp " + this.MouseDownX + " " + this.MouseDownY);
			scene.postMouseUpToAnimators(evt);
		}

		return this.handleEventPropagation(evt, true);
	}
	sendMouseWheelEvent(delta) {
		var scene = this.getScene();
		if (scene == null)
			return;

		var cam = scene.getActiveCamera();
		if (cam != null)
			cam.onMouseWheel(delta);

		scene.postMouseWheelToAnimators(delta);
	}
	handleMouseWheel(evt) {
		if (!evt) evt = event;
		if (!evt) return;
		var delta = (evt.detail < 0 || evt.wheelDelta > 0) ? 1 : -1;

		this.sendMouseWheelEvent(delta);
	}

	/**
	 * When CopperLicht is created, it will register the onmousemove event of the canvas with this function.
	 * If you need to handle it yourself, you should call this function with the event parameter so
	 * that all animators still work correctly.
	 * @public
	 */
	handleMouseMove(evt) {
		if (this.isInPointerLockMode()) {
			this.MouseMoveX = (evt['movementX'] || evt['mozMovementX'] || evt['webkitMovementX'] || 0);
			this.MouseMoveY = (evt['movementY'] || evt['mozMovementY'] || evt['webkitMovementY'] || 0);
		}

		if (evt) {
			this.MouseX = this.getMousePosXFromEvent(evt);
			this.MouseY = this.getMousePosYFromEvent(evt);
		}

		var scene = this.getScene();
		if (scene == null)
			return false;

		//console.log("MouseMove " + this.MouseX + " " + this.MouseY);
		var cam = scene.getActiveCamera();
		if (cam != null)
			cam.onMouseMove(evt);

		scene.postMouseMoveToAnimators(evt);

		return this.handleEventPropagation(evt, true);
	}

	/**
	 * Returns a 3D point from a 2D pixel coordinate on the screen. Note: A 2D position on the screen does not represent one
	 * single 3D point, but a actually a 3d line. So in order to get this line, use the 3d point returned by this function and the position
	 * of the current camera to form this line.
	 * @param x {Number} x coordinate on the canvas. You can use {@link CopperLicht.getMouseX} for the current mouse cursor position.
	 * @param y {Number} y coordinate on the canvas. You can use {@link CopperLicht.getMouseY} for the current mouse cursor position.
	 * @returns {CL3D.Vect3d} returns a 3d vector as described above, or null if not possible to do this calculation (for example if the browser
	 * does not support WebGL).
	 * @public
	 */
	get3DPositionFrom2DPosition(x, y) {
		var r = this.TheRenderer;
		if (r == null)
			return null;

		var proj = r.getProjection();
		var view = r.getView();

		if (proj == null || view == null)
			return null;

		var viewProjection = proj.multiply(view);
		var frustrum = new ViewFrustrum();
		frustrum.setFrom(viewProjection); // calculate view frustum planes

		var farLeftUp = frustrum.getFarLeftUp();
		var lefttoright = frustrum.getFarRightUp().substract(farLeftUp);
		var uptodown = frustrum.getFarLeftDown().substract(farLeftUp);

		var w = r.getWidth();
		var h = r.getHeight();

		var dx = x / w;
		var dy = y / h;

		var ret = farLeftUp.add(lefttoright.multiplyWithScal(dx)).add(uptodown.multiplyWithScal(dy));
		return ret;
	}

	/**
	 * Returns the 2D pixel position on the screen from a 3D position. Uses the current projection and view matrices stored in the renderer,
	 * so the 3d scene should have been rendered at least once before to return a correct result.
	 * @public
	 * @param {CL3D.Vect3d} pos3d 3d position as {@link Vect3d}.
	 * @return {CL3D.Vect2d} returns a 2d position as {@link Vect2d} if a 2d pixel position can be found, and null if not (if the pixel would be behind the screen, for example).
	 */
	get2DPositionFrom3DPosition(pos3d) {
		var mat = new Matrix4(false);
		var r = this.TheRenderer;
		if (!r.Projection)
			return null;

		r.Projection.copyTo(mat);
		mat = mat.multiply(r.View);
		//mat = mat.multiply(World);
		var hWidth = r.getWidth() / 2;
		var hHeight = r.getHeight() / 2;
		var render2DTranslationX = hWidth;
		var render2DTranslationY = hHeight;

		if (hHeight == 0 || hWidth == 0)
			return null;

		var v4df = new Vect3d(pos3d.X, pos3d.Y, pos3d.Z);
		v4df['W'] = 1;

		mat.multiplyWith1x4Matrix(v4df);
		var zDiv = v4df['W'] == 0.0 ? 1.0 : (1.0 / v4df['W']);

		if (v4df.Z < 0)
			return null;

		var ret = new Vect2d();

		ret.X = hWidth * (v4df.X * zDiv) + render2DTranslationX;
		ret.Y = render2DTranslationY - (hHeight * (v4df.Y * zDiv));

		return ret;
	}

	/**
	 * @public
	 */
	setActiveCameraNextFrame(cam) {
		if (cam == null)
			return;

		this.NextCameraToSetActive = cam;
	}

	/**
	 * Returns the {@link TextureManager} used to load textures.
	 * @public
	 * @returns {CL3D.TextureManager} returns the reference to the used texture manager.
	 */
	getTextureManager() {
		return this.TheTextureManager;
	}

	/**
	 * @public
	 * @param n: Current scene node
	 * @param {CL3D.TriangleSelector} world: TriangleSelector
	 */
	setCollisionWorldForAllSceneNodes(n, world) {
		if (!n)
			return;

		for (var ai = 0; ai < n.Animators.length; ++ai) {
			var coll = n.Animators[ai];
			if (coll) {
				if (coll.getType() == 'collisionresponse')
					coll.setWorld(world);

				else {
					if (coll.getType() == 'onclick' || coll.getType() == 'onmove')
						coll.World = world;

					else if (coll.getType() == 'gameai')
						coll.World = world;

					else if (coll.getType() == '3rdpersoncamera')
						coll.World = world;
				}
			}
		}

		for (var i = 0; i < n.Children.length; ++i) {
			var c = n.Children[i];
			if (c)
				this.setCollisionWorldForAllSceneNodes(c, world);
		}
	}

	/**
	 * Reloads a scene, triggered only by the CopperCube Action 'RestartScene'
	 * @param {String} sceneName The new CL3D.Scene to be reloaded.
	 * @public
	 */
	reloadScene(sceneName) {
		if (!sceneName || !gDocument)
			return false;

		if (this.LastLoadedFileContent == null)
			return false;

		var scene = null;
		var sceneidx = -1;

		for (var i = 0; i < gDocument.Scenes.length; ++i) {
			if (sceneName == gDocument.Scenes[i].Name) {
				sceneidx = i;
				scene = gDocument.Scenes[i];
				break;
			}
		}

		if (sceneidx == -1)
			return false;

		var loader = new FlaceLoader();
		var newscene = loader.reloadScene(this.LastLoadedFileContent, scene, sceneidx,
			this.LastLoadedFilename, this.TheTextureManager, this.TheMeshCache, this);

		if (newscene != null) {
			var currentlyActive = gDocument.getCurrentScene() == scene;

			// replace old scene with new scene
			gDocument.Scenes[sceneidx] = newscene;

			// restart the scene if it is currently active
			if (currentlyActive)
				this.gotoScene(newscene);
		}

		return true;
	}

	/**
	 * @public
	 * Updates the loading dialog if it is existing
	 */
	updateLoadingDialog() {
		if (!this.LoadingAFile && !this.WaitingForTexturesToBeLoaded) {
			this.LoadingDialog.style.display = 'none';
			this.LoadingDialog = null;
		}
	}

	/**
	 * @public
	 * Creates a nicely looking loading dialog, with the specified loading text
	 */
	createTextDialog(forLoadingDlg, text, loadingScreenBackgroundColor) {
		if (this.MainElement == null)
			return;

		if (this.fullpage) {
			this.MainElement.setAttribute("width", String(globalThis.innerWidth));
			this.MainElement.setAttribute("height", String(globalThis.innerHeight));
		}

		var dlg_div = document.createElement("div");
		this.MainElement.parentNode.appendChild(dlg_div);

		var dlg = document.createElement("div");

		this.updateCanvasTopLeftPosition();
		var w = 200;
		var h = forLoadingDlg ? 23 : 100;
		var paddingleft = forLoadingDlg ? 30 : 0;
		var x = this.CanvasTopLeftX + ((this.MainElement.width - w) / 2);
		var y = this.CanvasTopLeftY + (this.MainElement.height / 2);

		if (!forLoadingDlg)
			y += 30;

		var containsLogo = forLoadingDlg && text.indexOf('<img') != -1;

		text = text.replace('$PROGRESS$', '');

		var content = '';

		if (containsLogo) {
			// force preload image
			var li = new Image();
			this.LoadingImage = li;
			var imgsrcPos = text.indexOf('src="');
			var imgurl = text.substring(imgsrcPos + 5, text.indexOf('"', imgsrcPos + 5));
			li.src = imgurl;

			// loading screen with logo image
			var bgColor = "#000000";
			if (typeof loadingScreenBackgroundColor !== "undefined")
				bgColor = loadingScreenBackgroundColor;

			dlg.style.cssText = "position: absolute; left:" + this.CanvasTopLeftX + "px; top:" + this.CanvasTopLeftY + "px; color:#ffffff; padding:5px; height:" + this.MainElement.height + "px; width:" + this.MainElement.width + "px; background-color:" + bgColor + ";";

			content = "<div style=\"position: relative; top: 50%;  transform: translateY(-50%);\">" + text + "</div>";
		}

		else {
			// normal dialog
			dlg.style.cssText = "position: absolute; left:" + x + "px; top:" + y + "px; color:#ffffff; padding:5px; background-color:#000000; height:" + h + "px; width:" + w + "px; border-radius:5px; border:1px solid #777777;  opacity:0.5;";

			content = "<p style=\"margin:0; padding-left:" + paddingleft + "px; padding-bottom:5px;\">" + text + "</p> ";

			if (forLoadingDlg && !containsLogo)
				content += "<img style=\"position:absolute; left:5px; top:3px;\" src=\"scenes/copperlichtdata/loading.gif\" />";
		}

		dlg.innerHTML = content;

		dlg_div.appendChild(dlg);

		if (forLoadingDlg)
			this.LoadingDialog = dlg_div;
	}

	/**
	 * @public
	 * Enables pointer lock after fullscreen change, if whished
	 */
	onFullscreenChanged() {
		// request pointer lock
		if (this.requestPointerLockAfterFullscreen) {
			this.requestPointerLock();
		}
	}

	/**
	 * @public
	 * Notifies the engine if a pointer lock was used
	 */
	requestPointerLock() {
		const canvas = this.MainElement;

		if (canvas) {
			canvas.requestPointerLock =
				canvas['requestPointerLock'] ||
				canvas['mozRequestPointerLock'] ||
				canvas['webkitRequestPointerLock'];

			canvas.requestPointerLock();
		}
	}

	/**
	 * @public
	 * Notifies the engine if a pointer lock was used
	 */
	onPointerLockChanged() {
		const canvas = this.MainElement;

		if (document['PointerLockElement'] === canvas ||
			document['pointerLockElement'] === canvas ||
			document['mozPointerLockElement'] === canvas ||
			document['webkitPointerLockElement'] === canvas) {
			// pointer locked
			this.pointerIsCurrentlyLocked = true;
		}

		else {
			// pointer lock lost
			this.pointerIsCurrentlyLocked = false;
		}
	}

	/**
	 * @public
	 * Handlers for pointer lock and fullscreen change
	 */
	setupEventHandlersForFullscreenChange() {
		const me = this;
		const fullscreenChange = () => { me.onFullscreenChanged(); };
		const pointerLockChange = () => { me.onPointerLockChanged(); };

		document.addEventListener('fullscreenchange', fullscreenChange, false);
		document.addEventListener('mozfullscreenchange', fullscreenChange, false);
		document.addEventListener('webkitfullscreenchange', fullscreenChange, false);

		document.addEventListener('pointerlockchange', pointerLockChange, false);
		document.addEventListener('mozpointerlockchange', pointerLockChange, false);
		document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
	}

	/**
	 * Switches to fullscreen and locks the pointer if wanted. Note: This function must be called in reaction of a user interaction,
	 * otherwise the browser will ignore this. The best is to call it from the event handler of for example an onClick even of a button.
	 * @public
	 * @param withPointerLock If set to 'true', the mouse pointer will be locked, otherwise the app only switches to full screen.
	 * @param elementToSetToFullsceen the element which should be fullscreen. Set this to null to make the canvas fullscreen. But you can also
	 * set it to - for example - the parent of the canvas for showing some more info.
	 */
	switchToFullscreen(withPointerLock, elementToSetToFullsceen) {
		if (elementToSetToFullsceen == null)
			elementToSetToFullsceen = this.MainElement;

		this.requestPointerLockAfterFullscreen = withPointerLock;

		elementToSetToFullsceen.requestFullscreen = elementToSetToFullsceen.requestFullscreen ||
			elementToSetToFullsceen.mozRequestFullscreen ||
			elementToSetToFullsceen.mozRequestFullScreen || // Older API upper case 'S'.
			elementToSetToFullsceen.msRequestFullscreen ||
			elementToSetToFullsceen.webkitRequestFullscreen;
		elementToSetToFullsceen.requestFullscreen();
	}

	/**
	 * @public
	 * Internal video playback handler
	 */
	getOrCreateVideoStream(filename, createIfNotFound, handlerOnVideoEnded, handlerOnVideoFailed) {
		for (var i = 0; i < this.playingVideoStreams.length; ++i) {
			var v = this.playingVideoStreams[i];
			if (v.filename == filename)
				return v;
		}

		if (createIfNotFound) {
			var nv = new VideoStream(filename, this.TheRenderer);
			nv.handlerOnVideoEnded = handlerOnVideoEnded;
			nv.handlerOnVideoFailed = handlerOnVideoFailed;

			this.playingVideoStreams.push(nv);

			return nv;
		}

		return null;
	}

	/**
	 * @public
	 * update all video streams
	 */
	updateAllVideoStreams() {
		var aVideoIsPlaying = false;

		for (var i = 0; i < this.playingVideoStreams.length; ++i) {
			var v = this.playingVideoStreams[i];

			// update
			v.updateVideoTexture();

			// execute action on end if ended
			if (v.hasPlayBackEnded()) {
				if (v.handlerOnVideoEnded != null && !v.isError) {
					var s = this.getScene();
					v.handlerOnVideoEnded.execute(s.getRootSceneNode(), s);
					v.handlerOnVideoEnded = null;
				}

				if (v.handlerOnVideoFailed != null && v.isError) {
					var s = this.getScene();
					v.handlerOnVideoFailed.execute(s.getRootSceneNode(), s);
					v.handlerOnVideoFailed = null;
				}

				// remove
				this.playingVideoStreams.splice(i, 1);
				--i;
			}

			else
				aVideoIsPlaying = true;
		}

		return aVideoIsPlaying;
	}
}

let getSdlInfoImpl = () => { };

if (typeof globalThis.NodeJS != 'undefined') {
    await import('@kmamal/sdl').then(async (module) => {
        getSdlInfoImpl = () => {
            return module.default.info;
        };
    });
}

const getSdlInfo = () => {
    return getSdlInfoImpl();
};

let endProgramImpl = () => { };

if (typeof globalThis.open == "undefined") {
    endProgramImpl = (url) => {
        process.exit();
    };
}
else {
    endProgramImpl = (url) => {
        globalThis.close();
    };
}

const endProgram = (url) => {
    return endProgramImpl(url);
};

// ============================================================================================================================
// ----------------------------------------------------------------------------------------------------------------------------
// Implementation of all the scripting functions
// ----------------------------------------------------------------------------------------------------------------------------
// ============================================================================================================================


/**
 * @returns {Number} the ratio of the resolution in physical pixels and in pixels for the current display device.
 */
globalThis.ccbGetDevicePixelRatio = () => {
	return getDevicePixelRatio();
};

/**
 * @param {Number} id Searches the whole scene graph for a scene node with this 'id'.
 * @returns {CL3D.SceneNode} If it is found, it is returned, otherwise null is returned.
 */
globalThis.ccbGetSceneNodeFromId = (id) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (scene == null)
		return null;

	return scene.getSceneNodeFromId(id);
};

/**
 * Creates a new scene node based on an existing scene node.
 * @param {CL3D.SceneNode} node The parameter 'node' must be an exiting scene node.
 * You can get an existing scene node forexample with {@link ccbGetSceneNodeFromName}
 * @returns {CL3D.SceneNode} The new scene node.
 */
globalThis.ccbCloneSceneNode = (node) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (node == null)
		return null;

	var oldId = node.Id;
	var newId = scene.getUnusedSceneNodeId();

	var cloned = node.createClone(node.Parent, oldId, newId);

	if (cloned != null) {
		cloned.Id = newId;
		scene.replaceAllReferencedNodes(node, cloned);
	}

	// also clone collision detection of the node in the world

	var selector = node.Selector;
	if (selector && scene) {
		var newSelector = selector.createClone(cloned);
		if (newSelector) {
			// set to node

			cloned.Selector = newSelector;

			// also, copy into world

			if (scene.getCollisionGeometry())
				scene.getCollisionGeometry()
				.addSelector(newSelector);
		}
	}

	return cloned;
};

/**
 * @returns {CL3D.CameraSceneNode} the currently active camera of the scene.
 */
globalThis.ccbGetActiveCamera = () => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (scene == null)
		return null;

	return scene.getActiveCamera();
};

/**
 * Sets the currently active camera to the scene.
 * @param {CL3D.CameraSceneNode} node The parameter 'node' must be a camera scene node.
 * @returns 
 */
globalThis.ccbSetActiveCamera = (node) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (scene == null)
		return;

	if (node != null && node.getType() == 'camera')
		scene.setActiveCamera(node);
};

/**
 * @param {CL3D.SceneNode} node 
 * @param {Number} childidx ChildIndex must be >= 0 and < {@link ccbGetSceneNodeChildCount}.
 * @returns {CL3D.SceneNode} the child scene node of a parent scene node.
 */
globalThis.ccbGetChildSceneNode = (node, childidx) => {
	if (node == null)
		return -1;

	if (childidx < 0 || childidx >= node.Children.length)
		return null;

	return node.Children[childidx];
};

/**
 * You cannot remove it and it does not make a lot of sense to change its attributes
 * but you can use it as starting point to iterate the whole scene graph.
 * Take a look at {@link ccbGetSceneNodeChildCount} for an example.
 * @returns {CL3D.SceneNode} the root scene node.
 */
globalThis.ccbGetRootSceneNode = () => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (scene == null)
		return null;

	return scene.getRootSceneNode();
};

/**
 * @param {CL3D.SceneNode} node 
 * @returns {Number} the amount of children of a scene node.
 */
globalThis.ccbGetSceneNodeChildCount = (node) => {
	if (node == null)
		return 0;

	return node.Children.length;
};

/**
 * @param {String} name Searches the whole scene graph for a scene node with this 'name'.
 * Please note that the name is case sensitive.
 * @returns {CL3D.SceneNode} If it is found, it is returned, otherwise null is returned.
 */
globalThis.ccbGetSceneNodeFromName = (name) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (scene == null)
		return null;

	return scene.getSceneNodeFromName(name);
};

/**
 * @param {CL3D.SceneNode} node Removes the scene node from the scene, deleting it.
 * Doesn't work for the root scene node.
 * @returns 
 */
globalThis.ccbRemoveSceneNode = (node) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (scene == null)
		return;

	scene.addToDeletionQueue(node, 0);
};

/**
 * Sets the parent scene node of a scene node.
 * If this node has already a parent, it will be removed from that parent.
 * Note that by setting a new parent, position, rotation and scale of this node becomes relative to that of the new parent.
 * @param {CL3D.SceneNode} node 
 * @param {CL3D.SceneNode} parent 
 */
globalThis.ccbSetSceneNodeParent = (node, parent) => {
	if (node && parent)
		parent.addChild(node);
};

/**
 * @param {CL3D.SceneNode} node 
 * @returns {Number} the amount of materials of the scene node.
 */
globalThis.ccbGetSceneNodeMaterialCount = (node) => {
	if (node == null)
		return 0;

	return node.getMaterialCount();
};

/**
 * @param {CL3D.SceneNode} node A scene node.
 * @param {Number} matidx The index of the material. Must be a value greater or equal 0 and smaller than {@link ccbGetSceneNodeMaterialCount}.
 * @param {String} propName The propertyName in a material. Can be `Type`, `Texture1`, `Texture2`, `Lighting`, `Backfaceculling`. See {@link ccbSetSceneNodeMaterialProperty} for details.
 * @returns {any} the property of the material of a scene node.
 */
globalThis.ccbGetSceneNodeMaterialProperty = (node, matidx, propName) => {
	if (node == null)
		return null;

	if (matidx < 0 || matidx >= node.getMaterialCount())
		return null;

	var mat = node.getMaterial(matidx);
	if (mat == null)
		return null;

	if (propName == "Type") {
		switch (mat.Type) {
			case 0:
				return 'solid';
			case 2:
				return 'lightmap';
			case 3:
				return 'lightmap_add';
			case 4:
				return 'lightmap_m2';
			case 5:
				return 'lightmap_m4';
			case 11:
				return 'reflection_2layer';
			case 12:
				return 'trans_add';
			case 13:
				return 'trans_alphach';
			case 16:
				return 'trans_reflection_2layer';
		}
	} else
	if (propName == "Texture1")
		return (mat.Tex1 == null) ? "" : mat.Tex1.Name;
	else
	if (propName == "Texture2")
		return (mat.Tex2 == null) ? "" : mat.Tex2.Name;
	else
	if (propName == "Lighting")
		return mat.Lighting;
	else
	if (propName == "Backfaceculling")
		return mat.Backfaceculling;

	return null;
};

/**
 * @ignore
 * Cleans up the current memory usage.
 * Tries to free up as much memory as possible by freeing up unused textures, vertex and index buffers and similar.
 * This is useful for calling it for example after switching scenes to increase performance of the app.
 * May have different effects on different platforms.
 */
globalThis.ccbCleanMemory = () => {
	// not implemented for browser
};

/**
 * @param {CL3D.SceneNode} node A scene node.
 * @param {Number} matidx The index of the material. Must be a value greater or equal 0 and smaller than {@link ccbGetSceneNodeMaterialCount}.
 * @param {String} propName The propertyName in a material. Can be `Type`, `Texture1`, `Texture2`, `Lighting`, `Backfaceculling`.
 * @param {any} arg0 
 * @param {any} arg2 
 * @param {any} arg3 
 * @returns 
 */
globalThis.ccbSetSceneNodeMaterialProperty = (node, matidx, propName, arg0, arg2, arg3) => {
	if (node == null)
		return;

	if (matidx < 0 || matidx >= node.getMaterialCount())
		return;

	var mat = node.getMaterial(matidx);
	if (mat == null)
		return;

	var firstParam = arg0;
	var paramAsString = (typeof arg0 == 'string') ? arg0 : null;
	var tex = null;
	var sc = ScriptingInterface.getScriptingInterface();

	if (propName == "Type") {
		if (paramAsString) {
			switch (paramAsString) {
				case 'solid':
					mat.Type = 0;
					break;
				case 'lightmap':
				case 'lightmap_add':
				case 'lightmap_m2':
				case 'lightmap_m4':
					mat.Type = 2;
					break;
				case 'reflection_2layer':
					mat.Type = 11;
					break;
				case 'trans_add':
					mat.Type = 12;
					break;
				case 'trans_alphach':
					mat.Type = 13;
					break;
				case 'trans_reflection_2layer':
					mat.Type = 16;
					break;
			}
		} else {
			// together with ccbCreateMaterial, users are setting an interger parameter sometimes
			var i = parseInt(arg0);
			if (i != NaN)
				mat.Type = i;
		}
	} else
	if (propName == "Texture1") {
		if (paramAsString != null && sc.TheTextureManager != null) {
			tex = sc.TheTextureManager.getTextureFromName(paramAsString);
			if (tex != null)
				mat.Tex1 = tex;
		}
	} else
	if (propName == "Texture2") {
		if (paramAsString != null && sc.TheTextureManager != null) {
			tex = sc.TheTextureManager.getTextureFromName(paramAsString);
			if (tex != null)
				mat.Tex2 = tex;
		}
	} else
	if (propName == "Lighting")
		mat.Lighting = firstParam;
	else
	if (propName == "Backfaceculling")
		mat.Backfaceculling = firstParam;
};

/**
 * Sets the property value of a scene node.
 * @param {CL3D.SceneNode} node 
 * @param {String} propName 
 * @param {any} arg0 
 * @param {any} arg1 
 * @param {any} arg2 
 * @returns 
 */
globalThis.ccbSetSceneNodeProperty = (node, propName, arg0, arg1, arg2) => {
	if (node == null)
		return;

	// get vector if possible

	var firstParam = arg0;
	var x = 0.0;
	var y = 0.0;
	var z = 0.0;

	var argsAsColor = 0;
	if (arg0 != null)
		argsAsColor = arg0;

	if (arg1 == null && firstParam != null && typeof firstParam.x != 'undefined') {
		x = firstParam.x;
		y = firstParam.y;
		z = firstParam.z;
	}

	if (arg1 != null && arg2 != null) {
		x = arg0;
		y = arg1;
		z = arg2;

		argsAsColor = createColor(255, Math.floor(arg0), Math.floor(arg1), Math.floor(arg2));
	}

	// get type

	var cam = null;
	var animnode = null;
	var lightnode = null;
	var overlaynode = null;
	var type = node.getType();

	if (type == 'camera')
		cam = node;
	else
	if (type == 'animatedmesh')
		animnode = node;
	else
	if (type == 'light')
		lightnode = node;
	else
	if (type == '2doverlay')
		overlaynode = node;

	// set property

	if (propName == "Visible")
		node.Visible = firstParam;
	else
	if (propName == "Position") {
		node.Pos.X = x;
		node.Pos.Y = y;
		node.Pos.Z = z;
	} else
	if (propName == "Rotation") {
		node.Rot.X = x;
		node.Rot.Y = y;
		node.Rot.Z = z;
	} else
	if (propName == "Scale") {
		node.Scale.X = x;
		node.Scale.Y = y;
		node.Scale.Z = z;
	} else
	if (propName == "Target") {
		if (cam != null)
			cam.setTarget(new Vect3d(x, y, z));
	} else
	if (propName == "UpVector") {
		if (cam != null)
			cam.UpVector = new Vect3d(x, y, z);
	} else
	if (propName == "FieldOfView_Degrees") {
		if (cam != null)
			cam.setFov(degToRad(firstParam));
	} else
	if (propName == "AspectRatio") {
		if (cam != null)
			cam.setAspectRatio(firstParam);
	} else
	if (propName == "Animation") {
		if (animnode != null)
			animnode.setAnimationByEditorName(firstParam, animnode.Looping);
	} else
	if (propName == "Looping") {
		if (animnode != null)
			animnode.setLoopMode(firstParam);
	} else
	if (propName == "FramesPerSecond") {
		if (animnode != null)
			animnode.setAnimationSpeed(firstParam * 0.001);
	} else
	if (propName == "AnimationBlending") {
		if (animnode != null)
			animnode.AnimationBlendingEnabled = firstParam;
	} else
	if (propName == "BlendTimeMs") {
		if (animnode != null)
			animnode.BlendTimeMs = firstParam;
	} else
	if (propName == "Radius") {
		if (lightnode != null)
			lightnode.LightData.Radius = firstParam;
	} else
	if (propName == "Color") {
		if (lightnode != null)
			lightnode.LightData.Color = createColorF(argsAsColor);
	} else
	if (propName == "Direction") {
		if (lightnode != null) {
			lightnode.LightData.Direction = new Vect3d(x, y, z);
			lightnode.LightData.Direction.normalize();
		}
	} else
	if (propName == "FogColor") {
		gScriptingInterface.CurrentlyActiveScene.FogColor = argsAsColor;
	} else
	if (propName == "Realtime Shadows" && node === ccbGetRootSceneNode()) {
		gScriptingInterface.CurrentlyActiveScene.ShadowMappingEnabled = arg0 == true;
	} else
	if (propName == "BackgroundColor" && node === ccbGetRootSceneNode()) {
		gScriptingInterface.CurrentlyActiveScene.BackgroundColor = argsAsColor;
	} else
	if (propName == "AmbientLight") {
		gScriptingInterface.CurrentlyActiveScene.AmbientLight = createColorF(argsAsColor);
	} else
	if (propName == "Bloom") {
		gScriptingInterface.CurrentlyActiveScene.PostEffectData[Scene.EPOSTEFFECT_BLOOM].Active = arg0 == true;
	} else
	if (propName == "Black and White") {
		gScriptingInterface.CurrentlyActiveScene.PostEffectData[Scene.EPOSTEFFECT_BLACK_AND_WHITE].Active = arg0 == true;
	} else
	if (propName == "Invert") {
		gScriptingInterface.CurrentlyActiveScene.PostEffectData[Scene.EPOSTEFFECT_INVERT].Active = arg0 == true;
	} else
	if (propName == "Blur") {
		gScriptingInterface.CurrentlyActiveScene.PostEffectData[Scene.EPOSTEFFECT_BLUR].Active = arg0 == true;
	} else
	if (propName == "Colorize") {
		gScriptingInterface.CurrentlyActiveScene.PostEffectData[Scene.EPOSTEFFECT_COLORIZE].Active = arg0 == true;
	} else
	if (propName == "Vignette") {
		gScriptingInterface.CurrentlyActiveScene.PostEffectData[Scene.EPOSTEFFECT_VIGNETTE].Active = arg0 == true;
	} else
	if (propName == "Bloom_BlurIterations") {
		gScriptingInterface.CurrentlyActiveScene.PE_bloomBlurIterations = firstParam >> 0;
	} else
	if (propName == "Bloom_Treshold") {
		gScriptingInterface.CurrentlyActiveScene.PE_bloomTreshold = firstParam;
	} else
	if (propName == "Blur_Iterations") {
		gScriptingInterface.CurrentlyActiveScene.PE_blurIterations = firstParam >> 0;
	} else
	if (propName == "Colorize_Color") {
		gScriptingInterface.CurrentlyActiveScene.PE_colorizeColor = firstParam;
	} else
	if (propName == "Vignette_Intensity") {
		gScriptingInterface.CurrentlyActiveScene.PE_vignetteIntensity = firstParam >> 0;
	} else
	if (propName == "Vignette_RadiusA") {
		gScriptingInterface.CurrentlyActiveScene.PE_vignetteRadiusA = firstParam >> 0;
	} else
	if (propName == "Vignette_RadiusB") {
		gScriptingInterface.CurrentlyActiveScene.PE_vignetteRadiusB = firstParam >> 0;
	} else
	if (propName == "Name") {
		node.Name = firstParam;
	} else
	if (overlaynode != null) {
		ScriptingInterface.getScriptingInterface()
			.setSceneNodePropertyFromOverlay(overlaynode, propName, arg0, argsAsColor);
	}
};

/**
 * Gets the property value of a scene node.
 * @param {CL3D.SceneNode} node 
 * @param {String} propName 
 * @returns {vector3d}
 */
globalThis.ccbGetSceneNodeProperty = (node, propName) => {
	if (node == null)
		return null;

	// get type

	var cam = null;
	var animnode = null;
	var lightnode = null;
	var overlaynode = null;
	var type = node.getType();

	if (type == 'camera')
		cam = node;
	else
	if (type == 'animatedmesh')
		animnode = node;
	else
	if (type == 'light')
		lightnode = node;
	else
	if (type == '2doverlay')
		overlaynode = node;


	if (propName == "Visible")
		return node.Visible;
	else
	if (propName == "Position")
		return new vector3d(node.Pos.X, node.Pos.Y, node.Pos.Z);
	else
	if (propName == "PositionAbs") {
		var abspos = node.getAbsolutePosition();
		return new vector3d(abspos.X, abspos.Y, abspos.Z);
	} else
	if (propName == "Rotation")
		return new vector3d(node.Rot.X, node.Rot.Y, node.Rot.Z);
	else
	if (propName == "Scale")
		return new vector3d(node.Scale.X, node.Scale.Y, node.Scale.Z);
	else
	if (propName == "Target") {
		if (cam != null)
			return new vector3d(cam.Target.X, cam.Target.Y, cam.Target.Z);
	} else
	if (propName == "UpVector") {
		if (cam != null)
			return new vector3d(cam.UpVector.X, cam.UpVector.Y, cam.UpVector.Z);
	} else
	if (propName == "FieldOfView_Degrees") {
		if (cam != null)
			return radToDeg(cam.Fovy);
	} else
	if (propName == "AspectRatio") {
		if (cam != null)
			return cam.Aspect;
	} else
	if (propName == "Animation")
		return ""; // not implemented yet
	else
	if (propName == "Looping") {
		if (animnode != null)
			return animnode.Looping;
	} else
	if (propName == "FramesPerSecond") {
		if (animnode != null)
			return animnode.FramesPerSecond * 1000.0;
	} else
	if (propName == "AnimationBlending") {
		if (animnode != null)
			return animnode.AnimationBlendingEnabled;
	} else
	if (propName == "BlendTimeMs") {
		if (animnode != null)
			return animnode.BlendTimeMs;
	} else
	if (propName == "Radius") {
		if (lightnode != null)
			return lightnode.LightData.Radius;
	} else
	if (propName == "Color") {
		if (lightnode != null)
			return createColor(255, lightnode.LightData.Color.R * 255, lightnode.LightData.Color.G * 255, lightnode.LightData.Color.B * 255);
	} else
	if (propName == "Direction") {
		if (lightnode != null)
			return lightnode.LightData.Direction;
	} else
	if (propName == "Name") {
		return node.Name;
	} else
	if (propName == "Type") {
		return node.getType();
	} else
	if (propName == "FogColor") {
		return gScriptingInterface.CurrentlyActiveScene.FogColor;
	} else
	if (propName == "Realtime Shadows" && node === ccbGetRootSceneNode()) {
		return gScriptingInterface.CurrentlyActiveScene.ShadowMappingEnabled;
	} else
	if (propName == "BackgroundColor" && node === ccbGetRootSceneNode()) {
		return gScriptingInterface.CurrentlyActiveScene.BackgroundColor;
	} else
	if (overlaynode != null)
		return ScriptingInterface.getScriptingInterface()
			.getSceneNodePropertyFromOverlay(overlaynode, propName);

	return null;
};

/**
 * Sets a new position of a scene node, even if the scene node has a 'collide with walls' behavior attached to it. So it it possible to move such a scene node through walls.
 * Note that you have to ensure that the new position of the scene node is not inside a wall, otherwise the node will be stuck.
 * @param {CL3D.SceneNode} node 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @returns 
 */
globalThis.ccbSetSceneNodePositionWithoutCollision = (node, x, y, z) => {
	if (node == null)
		return;

	node.Pos.X = x;
	node.Pos.Y = y;
	node.Pos.Z = z;

	for (var ai = 0; ai < node.Animators.length; ++ai) {
		var a = node.Animators[ai];
		if (a != null && a.getType() == 'collisionresponse')
			a.reset();
	}
};

/**
 * registers a function for receiving a 'on frame' event, an event which is called every frame the screen drawn.
 * @param {function} fobj The function registered must take no parameters.
 * Inside this function, it is possible to draw own, custom things like user interfaces.
 * After you no longer need events, call {@link ccbUnregisterOnFrameEvent} to unregister your function.
 */
globalThis.ccbRegisterOnFrameEvent = (fobj) => {
	var engine = ScriptingInterface.getScriptingInterface();
	engine.ccbRegisteredFunctionArray.push(fobj);
};

/**
 * unregisters a function from a 'on frame' event.
 * @param {function} fobj The function registered
 * @returns 
 */
globalThis.ccbUnregisterOnFrameEvent = (fobj) => {
	var engine = ScriptingInterface.getScriptingInterface();
	var pos = engine.ccbRegisteredFunctionArray.indexOf(fobj);

	if (pos == -1)
		return;

	engine.ccbRegisteredFunctionArray.splice(pos, 1);
};

/**
 * Draws a colored rectangle. This function can only be used inside a frame event function which must have been registered with {@link ccbRegisterOnFrameEvent}.
 * @param {Number} c The color is a 32 bit value with alpha `0xaarrggbb`
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns 
 */
globalThis.ccbDrawColoredRectangle = (c, x, y, x2, y2) => {
	var engine = ScriptingInterface.getScriptingInterface();
	if (!engine.IsInDrawCallback || engine.TheRenderer == null)
		return;

	engine.TheRenderer.draw2DRectangle(x, y, x2 - x, y2 - y, c, true);
};

/**
 * @ignore
 * Draws a textured rectangle. This function can only be used inside a frame event function which must have been registered with {@link ccbRegisterOnFrameEvent}.
 * This function will ignore the alpha channel of the texture. Use {@link ccbDrawTextureRectangleWithAlpha} if you want the alpha channel to be taken into account as well.
 * @param {*} f 
 * @param {*} x 
 * @param {*} y 
 * @param {*} x2 
 * @param {*} y2 
 * @returns 
 */
globalThis.ccbDrawTextureRectangle = (f, x, y, x2, y2) => {
	var engine = ScriptingInterface.getScriptingInterface();
	if (!engine.IsInDrawCallback || engine.TheRenderer == null)
		return;

	// TODO: implement
	engine.TheRenderer.draw2DRectangle(x, y, x2 - x, y2 - y, 0xff000000, true);
};

/**
 * @ignore
 * Draws a textured rectangle with alpha channel. This function can only be used inside a frame event function which must have been registered with {@link ccbRegisterOnFrameEvent}.
 * @param {*} f 
 * @param {*} x 
 * @param {*} y 
 * @param {*} x2 
 * @param {*} y2 
 * @returns 
 */
globalThis.ccbDrawTextureRectangleWithAlpha = (f, x, y, x2, y2) => {
	var engine = ScriptingInterface.getScriptingInterface();
	if (!engine.IsInDrawCallback || engine.TheRenderer == null)
		return;

	// TODO: implement
	engine.TheRenderer.draw2DRectangle(x, y, x2 - x, y2 - y, 0xff000000, true);
};

/**
 * @param {Number} x 
 * @param {Number} y 
 * @returns {vector3d} the 3d position of a 2d position on the screen.
 * Note: A 2d position on the screen does not represent one single 3d point, but a actually a 3d line.
 * So in order to get this line, use the 3d point returned by this function and the position of the current camera to form this line.
 */
globalThis.ccbGet3DPosFrom2DPos = (x, y) => {
	var engine = ScriptingInterface.getScriptingInterface()
		.Engine;
	var ret = engine.get3DPositionFrom2DPosition(x, y);

	if (ret != null)
		return new vector3d(ret.X, ret.Y, ret.Z);

	return null;
};

/**
 * @param {Number} x
 * @param {Number} y 
 * @param {Number} z 
 * @returns {vector3d} the 2D position of a 3D position or nothing if the position would not be on the screen (for example behind the camera).
 */
globalThis.ccbGet2DPosFrom3DPos = (x, y, z) => {
	var engine = ScriptingInterface.getScriptingInterface()
		.Engine;
	var ret = engine.get2DPositionFrom3DPosition(new Vect3d(x, y, z));
	return new vector3d(ret.X, ret.Y, 0);

};

/**
 * @param {Number} startX 
 * @param {Number} startY 
 * @param {Number} startZ 
 * @param {Number} endX 
 * @param {Number} endY 
 * @param {Number} endZ 
 * @returns {vector3d} the collision point with a line and the world. Returns null if there is no collision.
 */
globalThis.ccbGetCollisionPointOfWorldWithLine = (startX, startY, startZ,
	endX, endY, endZ) => {
	var ray = new Line3d();
	ray.Start = new Vect3d(startX, startY, startZ);
	ray.End = new Vect3d(endX, endY, endZ);
	var scene = gScriptingInterface.CurrentlyActiveScene;

	var len = AnimatorOnClick.prototype.static_getDistanceToNearestCollisionPointWithWorld(
		scene, ray.Start, ray.End, scene.CollisionWorld, true);

	if (len < 999999999) {
		// shorten our ray because it collides with a world wall

		var vect2 = ray.getVector();
		vect2.setLength(len);
		var pos = ray.Start.add(vect2);
		return new vector3d(pos.X, pos.Y, pos.Z);
	}

	return null;
};

/**
 * @param {CL3D.SceneNode} node 
 * @param {Number} startX 
 * @param {Number} startY 
 * @param {Number} startZ 
 * @param {Number} endX 
 * @param {Number} endY 
 * @param {Number} endZ 
 * @returns {vector3d} if the bounding box of the given scene node collides with the line between two given points.
 */
globalThis.ccbDoesLineCollideWithBoundingBoxOfSceneNode = (node, startX, startY, startZ,
	endX, endY, endZ) => {
	if (node == null)
		return false;

	if (node.AbsoluteTransformation == null)
		return false;

	var lineStart = new Vect3d(startX, startY, startZ);
	var lineEnd = new Vect3d(endX, endY, endZ);

	return node.getTransformedBoundingBox()
		.intersectsWithLine(lineStart, lineEnd);
};

/**
 * @returns {Sdl.Info}
 */
globalThis.ccbGetSdlInfo = () => {
	return getSdlInfo();
};

/**
 * Closes the window.
 */
globalThis.ccbEndProgram = () => {
	endProgram();
};

/**
 * @ignore
 * Sets the linear velocity of an object simulated by the physics engine.
 * This only works when physics simulation is turned on and available for the current platform.
 * @param {*} nodeid 
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 */
globalThis.ccbSetPhysicsVelocity = (nodeid, x, y, z) => {
	// ignore
};

/**
 * @ignore
 * Updates the collision geometry of the physics simulation. Call this when you modified the static geometry of the world and want the physics simulation to respect that.
 * This only works when physics simulation is turned on and available for the current platform.
 * @ignore
 * @param {*} nodeid 
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 */
globalThis.ccbUpdatePhysicsGeometry = (nodeid, x, y, z) => {
	// ignore
};

/**
 * Loads a texture into the texture cache.
 * @param {String} filename Name of the texture to load.
 * @returns the texture object if sucessful, which then can be used for example in {@link ccbSetSceneNodeMaterialProperty} calls with the texture parameter.
 * Note that the texture is only loaded once. You can call this multiple times with the same texture file
 * but CopperCube won't try to load it multiple times if it has been loaded once already.
 */
globalThis.ccbLoadTexture = (filename) => {
	var sc = ScriptingInterface.getScriptingInterface();
	var tex = sc.TheTextureManager.getTexture(filename, true); // start loading

	if (tex != null)
		return tex.Name;

	return null;
};

/**
 * @returns the current X position of the mouse cursor in pixels.
 */
globalThis.ccbGetMousePosX = () => {
	var engine = ScriptingInterface.getScriptingInterface().Engine;
	if (engine)
		return engine.getMouseX();

	return 0;
};

/**
 * @returns the current Y position of the mouse cursor in pixels.
 */
globalThis.ccbGetMousePosY = () => {
	var engine = ScriptingInterface.getScriptingInterface().Engine;
	if (engine)
		return engine.getMouseY();

	return 0;
};

/**
 * @returns the current with of the screen in pixels.
 */
globalThis.ccbGetScreenWidth = () => {
	var engine = ScriptingInterface.getScriptingInterface().Engine;
	if (engine != null && engine.getRenderer())
		return engine.getRenderer().getWidth();

	return 0;
};

/**
 * @returns the current height of the screen in pixels.
 */
globalThis.ccbGetScreenHeight = () => {
	var engine = ScriptingInterface.getScriptingInterface().Engine;
	if (engine != null && engine.getRenderer())
		return engine.getRenderer().getHeight();

	return 0;
};

/**
 * @ignore
 */
globalThis.ccbSetCloseOnEscapePressed = () => {
	// not used
};

/**
 * @ignore
 */
globalThis.ccbSetCursorVisible = () => {
	// not used
};

/**
 * Switch to the scene with the specified name.
 * @example
 * ccbSwitchToScene("my scene") //will switch to a scene named "my scene" if there is one.
 * @param {String} name The name is case sensitive.
 * @returns {Boolean}
 */
globalThis.ccbSwitchToScene = (name) => {
	var engine = ScriptingInterface.getScriptingInterface().Engine;
	if (engine != null)
		return engine.gotoSceneByName(name, true);

	return false;
};

/**
 * Will play a sound or music file.
 * @param {String} name 
 */
globalThis.ccbPlaySound = (name) => {
	var sndmgr = gSoundManager;
	//var snd = sndmgr.getSoundFromName(name);
	var snd = sndmgr.getSoundFromSoundName(name, true);
	if (snd != null)
		sndmgr.play2D(snd, false, 1.0);
};

/**
 * Will get the duration of a music file.
 * @param {String} name 
 * @returns 
 */
globalThis.ccbGetSoundDuration = (name) => {
	if (name == "")
		return 0;

	var sndmgr = gSoundManager;
	var snd = sndmgr.getSoundFromSoundName(name, true);

	if (snd.audioElem.duration)
		return snd.audioElem.duration * 1000;

	return 1000;
};

/**
 * Will stop a sound or music, which has been started either by {@link ccbPlaySound} or the "Play Sound" action.
 * @param {String} name 
 */
globalThis.ccbStopSound = (name) => {
	gSoundManager.stopSpecificPlayingSound(name);
};

/**
 * Will get the value of a CopperCube variable.
 * @param {String} varname 
 * @returns 
 */
globalThis.ccbGetCopperCubeVariable = (varname) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;

	var var1 = CopperCubeVariable.getVariable(varname, true, scene);

	if (var1 == null)
		return null;

	if (var1.isString())
		return var1.getValueAsString();

	if (var1.isInt())
		return var1.getValueAsInt();

	if (var1.isFloat())
		return var1.getValueAsFloat();

	return null;
};

/**
 * Will set a CopperCube variable to a certain value.
 * @param {String} varname 
 * @param {any} value 
 * @returns 
 */
globalThis.ccbSetCopperCubeVariable = (varname, value) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;

	var var1 = CopperCubeVariable.getVariable(varname, true, scene);
	if (var1 == null)
		return;

	if (typeof value == 'number')
		var1.setValueAsFloat(value);
	else
		var1.setValueAsString(value);

	// also, save if it was a temporary variable
	CopperCubeVariable.saveContentOfPotentialTemporaryVariableIntoSource(var1, scene);
};

/**
 * Switches the window to fullscreen, and also enables pointer lock.
 * @param {Boolean} enablePointerLock 
 * @param {Canvas} elementToSwitchToFullscreen 
 */
globalThis.ccbSwitchToFullscreen = (enablePointerLock, elementToSwitchToFullscreen) => {
	var engine = ScriptingInterface.getScriptingInterface()
		.Engine;
	if (engine)
		engine.switchToFullscreen(enablePointerLock, elementToSwitchToFullscreen);
};

/**
 * @ignore
 * @param {String} filename 
 * @returns 
 */
globalThis.ccbReadFileContent = (filename) => {
	// not possible for browser
	return null;
};

/**
 * @ignore
 * @param {String} filename 
 * @param {String} content 
 */
globalThis.ccbWriteFileContent = (filename, content) => {
	// not possible for browser
};

/**
 * @returns a string identifying the system the CopperCube app is running on.
 */
globalThis.ccbGetPlatform = () => {
	return "webgl";
};

/**
 * Starts a CopperCube action.
 * @param {Number} actionid The id of the action to be run. Is stored by the coppercube runtime in the property with the type 'action'.
 * @param {CL3D.SceneNode=} node Optional reference to the 'current scene node'. Actions which which are set to use the 'current' scene node will then use this scene node as current one.
 * @returns 
 */
globalThis.ccbInvokeAction = (actionid, node) => {
	var scene = gScriptingInterface.CurrentlyActiveScene;
	if (scene == null)
		return;

	if (node == null)
		node = scene.getRootSceneNode();

	if (actionid >= 0 && actionid < gScriptingInterface.StoredExtensionScriptActionHandlers.length) {
		var a = gScriptingInterface.StoredExtensionScriptActionHandlers[actionid];
		if (a != null)
			a.execute(node);
	}
};

/**
 * @param {Boolean} bForMouse 
 * @param {Boolean} bForKeyboard 
 */
globalThis.ccbRegisterBehaviorEventReceiver = (bForMouse, bForKeyboard) => {
	if (gScriptingInterface.CurrentlyRunningExtensionScriptAnimator != null) {
		gScriptingInterface.CurrentlyRunningExtensionScriptAnimator.setAcceptsEvents(bForMouse, bForKeyboard);
	}
};

/**
 * makes a GET network request via HTTP to any web server, and {@link ccbCancelHTTPRequest} can cancel this request while it is running.
 * @param {String} url  set it an URL to request, like {@link http://www.example.com} or similar.
 * @param {function} fobj A callback function which will be called with the received data once the request is finished. This will also be called if the request ailed, with an empty string as parameter.
 * @returns {Number} The function returns an unique Id, for identifying this request.
 */
globalThis.ccbDoHTTPRequest = (url, fobj, useArrayBufferReturn = false, isBrowser = true) => {
	++gScriptingInterface.LastHTTPRequestId;
	var id = gScriptingInterface.LastHTTPRequestId;

	var loader = new CCFileLoader(url, useArrayBufferReturn, isBrowser);

	var itemarray = gScriptingInterface.ccbRegisteredHTTPCallbackArray;
	var f = new Object();
	f.loader = loader;
	f.id = id;
	itemarray.push(f);

	var myCallback = function(p) {
		if (fobj)
			fobj(p);

		for (var i = 0; i < itemarray.length; ++i)
			if (itemarray[i].id == id) {
				itemarray.splice(i, 1);
				break;
			}
	};

	loader.load(myCallback);
	return id;
};

/**
 * Cancel the running request, if it takes too long for example.
 * @param {Number} id 
 */
globalThis.ccbCancelHTTPRequest = (id) => {
	var itemarray = gScriptingInterface.ccbRegisteredHTTPCallbackArray;

	for (var i = 0; i < itemarray.length; ++i)
		if (itemarray[i].id == id) {
			itemarray[i].loader.abort();
			itemarray.splice(i, 1);
			break;
		}
};

/**
 * creates a new material based on vertex and pixel shaders.
 * @param {String} vertexShader code of the vertex shader, or an empty string "".
 * @param {String} fragmentShader code of the vertex shader, or an empty string "".
 * @param {Number} baseMaterialType usually 0 for the solid material. (2 for lightmap, 12 for additive transparency).
 * @param {function} shaderCallback a function to be called before the material is used. In the function, call {@link ccbSetShaderConstant} to set your shader constants.
 * @returns an unique material id, which you can use to set the material type of any node to your new material using {@link ccbSetSceneNodeMaterialProperty}. It returns -1 if an error happened.
 */
globalThis.ccbCreateMaterial = (vertexShader, fragmentShader, baseMaterialType, shaderCallback) => {
	var scripting = ScriptingInterface.getScriptingInterface();
	var engine = scripting.Engine;
	var renderer = engine.getRenderer();
	if (renderer == null)
		return -1;

	var basemat = renderer.MaterialPrograms[baseMaterialType];

	var matid = renderer.createMaterialType(vertexShader, fragmentShader, basemat.blendenabled, basemat.blendsfactor, basemat.blenddfactor);
	if (matid != -1) {
		if (shaderCallback != null)
			scripting.ShaderCallbacks["_" + matid] = shaderCallback;

		if (!scripting.ShaderCallBackSet) {
			scripting.ShaderCallBackSet = true;
			scripting.OriginalShaderCallBack = renderer.OnChangeMaterial;

			renderer.OnChangeMaterial = function(mattype) {
				if (scripting.OriginalShaderCallBack)
					scripting.OriginalShaderCallBack();

				var c = scripting.ShaderCallbacks["_" + mattype];
				if (c != null) {
					scripting.CurrentShaderMaterialType = mattype;
					c();
				}
			};
		}
	}

	return matid;
};

/**
 * may only be called during the material callback
 * @param {String} name name of the variable to set
 * @param {any} value1 
 * @param {any} value2 
 * @param {any} value3 
 * @param {any} value4 
 * @returns 
 */
globalThis.ccbSetShaderConstant = (name, value1, value2, value3, value4) => {
	var scripting = ScriptingInterface.getScriptingInterface();
	var engine = scripting.Engine;
	var renderer = engine.getRenderer();
	if (renderer == null)
		return;

	var gl = renderer.getWebGL();

	var program = renderer.getGLProgramFromMaterialType(scripting.CurrentShaderMaterialType);
	var variableLocation = gl.getUniformLocation(program, name);
	gl.uniform4f(variableLocation, value1, value2, value3, value4);
};

/**
 * @returns the current scene node.
 * When running some JavaScript code via an 'execute JavaScript' action, there is always a "current node" set, usually the node in which the action is being run.
 */
globalThis.ccbGetCurrentNode = () => {
	return gCurrentJScriptNode;
};

/**
 * 
 * @param {CL3D.SceneNode} node Node where this is applied to. The node has to have a Game Actor with Health behavior attached to it.
 * @param {String} command 
 * @param {any} param 
 * @returns 
 */
globalThis.ccbAICommand = (node, command, param) => {
	if (!node)
		return;

	var gameai = node.getAnimatorOfType('gameai');
	if (!gameai)
		return;

	if (command == 'cancel')
		gameai.aiCommandCancel(node);
	else
	if (command == 'moveto') {
		var v = new Vect3d(0, 0, 0);
		if (param != null && typeof param.x != 'undefined') {
			v.X = param.x;
			v.Y = param.y;
			v.Z = param.z;
		}

		gameai.moveToTarget(node, v, node.getAbsolutePosition(), CLTimer.getTime());
	} else
	if (command == 'attack') {
		gameai.attackTarget(node, param, param.getAbsolutePosition(), node.getAbsolutePosition(), CLTimer.getTime());
	}
};

globalThis.moduleLog = async (moduleName, exportName) => {
    const __dirName = getDirName();
    const modulePath = `${__dirName}/${moduleName}`;

    await doFetch(modulePath).then((response) => {
        if (!response.ok)
            throw new Error(`Could not open file '${modulePath}' (status: ${response.status})`);
    });

    const module = await import(modulePath);

    return console.log({ [exportName]: module[exportName] });
};

export { Action, ActionChangeSceneNodePosition, ActionChangeSceneNodeRotation, ActionChangeSceneNodeScale, ActionChangeSceneNodeTexture, ActionCloneSceneNode, ActionDeleteSceneNode, ActionExecuteJavaScript, ActionExtensionScript, ActionHandler, ActionIfVariable, ActionMakeSceneNodeInvisible, ActionOpenWebpage, ActionPlayMovie, ActionPlaySound, ActionRestartBehaviors, ActionRestartScene, ActionSetActiveCamera, ActionSetCameraTarget, ActionSetOrChangeAVariable, ActionSetOverlayText, ActionSetSceneNodeAnimation, ActionShoot, ActionStopSound, ActionStopSpecificSound, ActionStoreLoadVariable, ActionSwitchToScene, AnimatedMeshSceneNode, Animator, Animator3rdPersonCamera, AnimatorAnimateTexture, AnimatorCameraFPS, AnimatorCameraModelViewer, AnimatorCollisionResponse, AnimatorExtensionScript, AnimatorFlyCircle, AnimatorFlyStraight, AnimatorFollowPath, AnimatorGameAI, AnimatorKeyboardControlled, AnimatorMobileInput, AnimatorOnClick, AnimatorOnFirstFrame, AnimatorOnKeyPress, AnimatorOnMove, AnimatorOnProximity, AnimatorRotation, AnimatorTimer, BillboardSceneNode, BoundingBoxTriangleSelector, Box3d, CCDocument, CCFileLoader, CLTimer, CameraSceneNode, ColorF, CopperCubeVariable, CopperCubeVariables, CopperLicht, CubeSceneNode, DEGTORAD, DebugPostEffects, DummyTransformationSceneNode, ExtensionScriptProperty, Extensions, FlaceLoader, Free3dScene, Global_PostEffectsDisabled, HALF_PI, HotspotSceneNode, Light, LightSceneNode, Line3d, Material, Matrix4, Mesh, MeshBuffer, MeshCache, MeshSceneNode, MeshTriangleSelector, MetaTriangleSelector, Mobile2DInputSceneNode, NamedAnimationRange, OctTreeTriangleSelector, Overlay2DSceneNode, PI, PI64, Particle, ParticleSystemSceneNode, PathSceneNode, Plane3d, PlayingSound, Quaternion, RADTODEG, RECIPROCAL_PI, Renderer, SAnimatedDummySceneNodeChild, SOctTreeNode, Scene, SceneNode, ScriptingInterface, SkinnedMesh, SkinnedMeshJoint, SkinnedMeshPositionKey, SkinnedMeshRotationKey, SkinnedMeshScaleKey, SkinnedMeshWeight, SkyBoxSceneNode, SoundManager, SoundSceneNode, SoundSource, StringBinary, TOLERANCE, TerrainSceneNode, Texture, TextureManager, Triangle3d, TriangleSelector, UseShadowCascade, Vect2d, Vect3d, Vertex3D, VideoStream, ViewFrustrum, WaterSurfaceSceneNode, base64DecodeChars, base64decode, clamp, cloneVertex3D, convertIntColor, createColor, createColorF, createSimpleVertex, createVertex, degToRad, equals, fract, gCCDebugInfoEnabled, gCurrentJScriptNode, gDocument, gScriptingInterface, gSoundManager, gTextureManager, getAlpha, getBlue, getGreen, getInterpolatedColor, getRed, isone, iszero, max3, min3, radToDeg, sgn, startCopperLichtFromFile, vector3d };
