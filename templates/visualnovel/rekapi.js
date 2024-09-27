/** @typedef {import(".").shifty.easingFunction} shifty.easingFunction */

/*!
 * All equations are adapted from Thomas Fuchs'
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert
 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */

/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */

/**
 * @member Tweenable.formulas
 * @description A static Object of {@link shifty.easingFunction}s that can by
 * used by Shifty. The default values are defined in
 * [`easing-functions.js`](easing-functions.js.html), but you can add your own
 * {@link shifty.easingFunction}s by defining them as keys to this Object.
 *
 * Shifty ships with an implementation of [Robert Penner's easing
 * equations](http://robertpenner.com/easing/), as adapted from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js)'s
 * implementation.
 * <p data-height="934" data-theme-id="0" data-slug-hash="wqObdO"
 * data-default-tab="js,result" data-user="jeremyckahn" data-embed-version="2"
 * data-pen-title="Shifty - Easing formula names" class="codepen">See the Pen <a
 * href="https://codepen.io/jeremyckahn/pen/wqObdO/">Shifty - Easing formula
 * names</a> by Jeremy Kahn (<a
 * href="https://codepen.io/jeremyckahn">@jeremyckahn</a>) on <a
 * href="https://codepen.io">CodePen</a>.</p>
 * <script async
 * src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
 * @type {Object.<shifty.easingFunction>}
 * @static
 */

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const linear = pos => pos;

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInQuad = pos => Math.pow(pos, 2);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutQuad = pos => -(Math.pow(pos - 1, 2) - 1);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutQuad = pos =>
  (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 2) : -0.5 * ((pos -= 2) * pos - 2);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInCubic = pos => Math.pow(pos, 3);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutCubic = pos => Math.pow(pos - 1, 3) + 1;

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutCubic = pos =>
  (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 3) : 0.5 * (Math.pow(pos - 2, 3) + 2);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInQuart = pos => Math.pow(pos, 4);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutQuart = pos => -(Math.pow(pos - 1, 4) - 1);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutQuart = pos =>
  (pos /= 0.5) < 1
    ? 0.5 * Math.pow(pos, 4)
    : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInQuint = pos => Math.pow(pos, 5);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutQuint = pos => Math.pow(pos - 1, 5) + 1;

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutQuint = pos =>
  (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 5) : 0.5 * (Math.pow(pos - 2, 5) + 2);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInSine = pos => -Math.cos(pos * (Math.PI / 2)) + 1;

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutSine = pos => Math.sin(pos * (Math.PI / 2));

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutSine = pos => -0.5 * (Math.cos(Math.PI * pos) - 1);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInExpo = pos => (pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1)));

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutExpo = pos => (pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutExpo = pos => {
  if (pos === 0) {
    return 0
  }

  if (pos === 1) {
    return 1
  }

  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(2, 10 * (pos - 1))
  }

  return 0.5 * (-Math.pow(2, -10 * --pos) + 2)
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInCirc = pos => -(Math.sqrt(1 - pos * pos) - 1);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutCirc = pos => Math.sqrt(1 - Math.pow(pos - 1, 2));

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutCirc = pos =>
  (pos /= 0.5) < 1
    ? -0.5 * (Math.sqrt(1 - pos * pos) - 1)
    : 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutBounce = pos => {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos
  } else if (pos < 2 / 2.75) {
    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75
  } else if (pos < 2.5 / 2.75) {
    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375
  } else {
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375
  }
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInBack = pos => {
  const s = 1.70158;
  return pos * pos * ((s + 1) * pos - s)
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeOutBack = pos => {
  const s = 1.70158;
  return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeInOutBack = pos => {
  let s = 1.70158;
  if ((pos /= 0.5) < 1) {
    return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s))
  }
  return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2)
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const elastic = pos =>
  -1 * Math.pow(4, -8 * pos) * Math.sin(((pos * 6 - 1) * (2 * Math.PI)) / 2) + 1;

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const swingFromTo = pos => {
  let s = 1.70158;
  return (pos /= 0.5) < 1
    ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s))
    : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2)
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const swingFrom = pos => {
  const s = 1.70158;
  return pos * pos * ((s + 1) * pos - s)
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const swingTo = pos => {
  const s = 1.70158;
  return (pos -= 1) * pos * ((s + 1) * pos + s) + 1
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const bounce = pos => {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos
  } else if (pos < 2 / 2.75) {
    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75
  } else if (pos < 2.5 / 2.75) {
    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375
  } else {
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375
  }
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const bouncePast = pos => {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos
  } else if (pos < 2 / 2.75) {
    return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75)
  } else if (pos < 2.5 / 2.75) {
    return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375)
  } else {
    return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375)
  }
};

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeFromTo = pos =>
  (pos /= 0.5) < 1
    ? 0.5 * Math.pow(pos, 4)
    : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeFrom = pos => Math.pow(pos, 4);

/**
 * @memberof Tweenable.formulas
 * @type {shifty.easingFunction}
 * @param {number} pos
 * @returns {number}
 */
const easeTo = pos => Math.pow(pos, 0.25);

var easingFunctions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  bounce: bounce,
  bouncePast: bouncePast,
  easeFrom: easeFrom,
  easeFromTo: easeFromTo,
  easeInBack: easeInBack,
  easeInCirc: easeInCirc,
  easeInCubic: easeInCubic,
  easeInExpo: easeInExpo,
  easeInOutBack: easeInOutBack,
  easeInOutCirc: easeInOutCirc,
  easeInOutCubic: easeInOutCubic,
  easeInOutExpo: easeInOutExpo,
  easeInOutQuad: easeInOutQuad,
  easeInOutQuart: easeInOutQuart,
  easeInOutQuint: easeInOutQuint,
  easeInOutSine: easeInOutSine,
  easeInQuad: easeInQuad,
  easeInQuart: easeInQuart,
  easeInQuint: easeInQuint,
  easeInSine: easeInSine,
  easeOutBack: easeOutBack,
  easeOutBounce: easeOutBounce,
  easeOutCirc: easeOutCirc,
  easeOutCubic: easeOutCubic,
  easeOutExpo: easeOutExpo,
  easeOutQuad: easeOutQuad,
  easeOutQuart: easeOutQuart,
  easeOutQuint: easeOutQuint,
  easeOutSine: easeOutSine,
  easeTo: easeTo,
  elastic: elastic,
  linear: linear,
  swingFrom: swingFrom,
  swingFromTo: swingFromTo,
  swingTo: swingTo
});

/** @typedef {import(".").shifty.easingFunction} shifty.easingFunction */

/**
 * The Bezier magic in this file is adapted/copied almost wholesale from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
 * which was adapted from Apple code (which probably came from
 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
 * Special thanks to Apple and Thomas Fuchs for much of this code.
 */

/**
 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder(s) nor the names of any
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
// port of webkit cubic bezier handling by http://www.netzgesta.de/dev/

/**
 * @param {number} t
 * @param {number} p1x
 * @param {number} p1y
 * @param {number} p2x
 * @param {number} p2y
 * @param {number} duration
 * @returns {Function}
 * @private
 */
function cubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
  let ax = 0,
    bx = 0,
    cx = 0,
    ay = 0,
    by = 0,
    cy = 0;

  const sampleCurveX = t => ((ax * t + bx) * t + cx) * t;

  const sampleCurveY = t => ((ay * t + by) * t + cy) * t;

  const sampleCurveDerivativeX = t => (3 * ax * t + 2 * bx) * t + cx;

  const solveEpsilon = duration => 1 / (200 * duration);

  const fabs = n => (n >= 0 ? n : 0 - n);

  const solveCurveX = (x, epsilon) => {
    let t0, t1, t2, x2, d2, i;

    for (t2 = x, i = 0; i < 8; i++) {
      x2 = sampleCurveX(t2) - x;

      if (fabs(x2) < epsilon) {
        return t2
      }

      d2 = sampleCurveDerivativeX(t2);

      if (fabs(d2) < 1e-6) {
        break
      }

      t2 = t2 - x2 / d2;
    }

    t0 = 0;
    t1 = 1;
    t2 = x;

    if (t2 < t0) {
      return t0
    }

    if (t2 > t1) {
      return t1
    }

    while (t0 < t1) {
      x2 = sampleCurveX(t2);

      if (fabs(x2 - x) < epsilon) {
        return t2
      }

      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }

      t2 = (t1 - t0) * 0.5 + t0;
    }

    return t2 // Failure.
  };

  const solve = (x, epsilon) => sampleCurveY(solveCurveX(x, epsilon));

  cx = 3 * p1x;
  bx = 3 * (p2x - p1x) - cx;
  ax = 1 - cx - bx;
  cy = 3 * p1y;
  by = 3 * (p2y - p1y) - cy;
  ay = 1 - cy - by;

  return solve(t, solveEpsilon(duration))
}
// End ported code

/**
 *  GetCubicBezierTransition(x1, y1, x2, y2) -> Function.
 *
 *  Generates a transition easing function that is compatible
 *  with WebKit's CSS transitions `-webkit-transition-timing-function`
 *  CSS property.
 *
 *  The W3C has more information about CSS3 transition timing functions:
 *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
 *
 *  @param {number} [x1]
 *  @param {number} [y1]
 *  @param {number} [x2]
 *  @param {number} [y2]
 *  @return {Function}
 */
const getCubicBezierTransition = (
  x1 = 0.25,
  y1 = 0.25,
  x2 = 0.75,
  y2 = 0.75
) => pos => cubicBezierAtTime(pos, x1, y1, x2, y2, 1);

/**
 * Create a Bezier easing function and attach it to {@link
 * Tweenable.formulas}.  This function gives you total control over the
 * easing curve.  Matthew Lein's [Ceaser](http://matthewlein.com/ceaser/) is a
 * useful tool for visualizing the curves you can make with this function.
 * @method shifty.setBezierFunction
 * @param {string} name The name of the easing curve.  Overwrites the old
 * easing function on {@link Tweenable.formulas} if it exists.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {shifty.easingFunction} The {@link shifty.easingFunction} that was
 * attached to {@link Tweenable.formulas}.
 */
const setBezierFunction = (name, x1, y1, x2, y2) => {
  const cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);

  cubicBezierTransition.displayName = name;
  cubicBezierTransition.x1 = x1;
  cubicBezierTransition.y1 = y1;
  cubicBezierTransition.x2 = x2;
  cubicBezierTransition.y2 = y2;

  return (Tweenable.formulas[name] = cubicBezierTransition)
};

/** @typedef {import("./index").shifty.filter} shifty.filter */
/** @typedef {import("./index").shifty.tweenConfig} shifty.tweenConfig */
/** @typedef {import("./index").shifty.scheduleFunction} shifty.scheduleFunction */

// CONSTANTS
const DEFAULT_EASING$2 = 'linear';
const DEFAULT_DURATION = 500;
const UPDATE_TIME$1 = 1000 / 60;
const root$1 = typeof window !== 'undefined' ? window : global;

const AFTER_TWEEN = 'afterTween';
const AFTER_TWEEN_END = 'afterTweenEnd';
const BEFORE_TWEEN = 'beforeTween';
const TWEEN_CREATED = 'tweenCreated';
const TYPE_FUNCTION = 'function';
const TYPE_STRING = 'string';

// requestAnimationFrame() shim by Paul Irish (modified for Shifty)
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
let scheduleFunction =
  root$1.requestAnimationFrame ||
  root$1.webkitRequestAnimationFrame ||
  root$1.oRequestAnimationFrame ||
  root$1.msRequestAnimationFrame ||
  (root$1.mozCancelRequestAnimationFrame && root$1.mozRequestAnimationFrame) ||
  setTimeout;

const noop$1 = () => {};

let listHead = null;
let listTail = null;

const formulas = { ...easingFunctions };

/**
 * Calculates the interpolated tween values of an Object for a given
 * timestamp.
 * @param {number} forPosition The position to compute the state for.
 * @param {Object} currentState Current state properties.
 * @param {Object} originalState: The original state properties the Object is
 * tweening from.
 * @param {Object} targetState: The destination state properties the Object
 * is tweening to.
 * @param {number} duration: The length of the tween in milliseconds.
 * @param {number} timestamp: The UNIX epoch time at which the tween began.
 * @param {Record<string, string|Function>} easing: This Object's keys must correspond
 * to the keys in targetState.
 * @returns {Object}
 * @private
 */
const tweenProps = (
  forPosition,
  currentState,
  originalState,
  targetState,
  duration,
  timestamp,
  easing
) => {
  let easedPosition;
  let easingObjectProp;
  let start;

  const normalizedPosition =
    forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;

  let easingFn = null;
  let hasOneEase = false;

  if (easing && easing.call) {
    hasOneEase = true;
    easedPosition = easing(normalizedPosition);
  }

  for (const key in currentState) {
    if (!hasOneEase) {
      easingObjectProp = easing[key];
      easingFn = easingObjectProp.call
        ? easingObjectProp
        : formulas[easingObjectProp];

      easedPosition = easingFn(normalizedPosition);
    }

    start = originalState[key];

    currentState[key] = start + (targetState[key] - start) * easedPosition;
  }

  return currentState
};

const processTween = (tween, currentTime) => {
  let timestamp = tween._timestamp;
  const currentState = tween._currentState;
  const delay = tween._delay;

  if (currentTime < timestamp + delay) {
    return
  }

  let duration = tween._duration;
  const targetState = tween._targetState;

  const endTime = timestamp + delay + duration;
  let timeToCompute = currentTime > endTime ? endTime : currentTime;
  tween._hasEnded = timeToCompute >= endTime;
  const offset = duration - (endTime - timeToCompute);
  const hasFilters = tween._filters.length > 0;

  if (tween._hasEnded) {
    tween._render(targetState, tween._data, offset);
    return tween.stop(true)
  }

  if (hasFilters) {
    tween._applyFilter(BEFORE_TWEEN);
  }

  // If the animation has not yet reached the start point (e.g., there was
  // delay that has not yet completed), just interpolate the starting
  // position of the tween.
  if (timeToCompute < timestamp + delay) {
    timestamp = duration = timeToCompute = 1;
  } else {
    timestamp += delay;
  }

  tweenProps(
    timeToCompute,
    currentState,
    tween._originalState,
    targetState,
    duration,
    timestamp,
    tween._easing
  );

  if (hasFilters) {
    tween._applyFilter(AFTER_TWEEN);
  }

  tween._render(currentState, tween._data, offset);
};

/**
 * Process all tweens currently managed by Shifty for the current tick. This
 * does not perform any timing or update scheduling; it is the logic that is
 * run *by* the scheduling functionality. Specifically, it computes the state
 * and calls all of the relevant {@link shifty.tweenConfig} functions supplied
 * to each of the tweens for the current point in time (as determined by {@link
 * Tweenable.now}.
 *
 * This is a low-level API that won't be needed in the majority of situations.
 * It is primarily useful as a hook for higher-level animation systems that are
 * built on top of Shifty. If you need this function, it is likely you need to
 * pass something like `() => {}` to {@link
 * Tweenable.setScheduleFunction}, override {@link Tweenable.now}
 * and manage the scheduling logic yourself.
 *
 * @method shifty.processTweens
 * @see https://github.com/jeremyckahn/shifty/issues/109
 */
const processTweens = () => {
  let nextTweenToProcess;

  const currentTime = Tweenable.now();
  let currentTween = listHead;

  while (currentTween) {
    nextTweenToProcess = currentTween._next;
    processTween(currentTween, currentTime);
    currentTween = nextTweenToProcess;
  }
};

const getCurrentTime = Date.now || (() => +new Date());
let now;
let heartbeatIsRunning = false;

/**
 * Determines whether or not a heartbeat tick should be scheduled. This is
 * generally only useful for testing environments where Shifty's continuous
 * heartbeat mechanism causes test runner issues.
 *
 * If you are using Jest, you'll want to put this in a global `afterAll` hook.
 * If you don't already have a Jest setup file, follow the setup in [this
 * StackOverflow post](https://stackoverflow.com/a/57647146), and then add this
 * to it:
 *
 * ```
 * import { shouldScheduleUpdate } from 'shifty'
 *
 * afterAll(() => {
 *   shouldScheduleUpdate(false)
 * })
 * ```
 *
 * @method shifty.shouldScheduleUpdate
 * @param {boolean} doScheduleUpdate
 * @see https://github.com/jeremyckahn/shifty/issues/156
 */
const shouldScheduleUpdate = doScheduleUpdate => {
  if (heartbeatIsRunning) {
    return
  }

  heartbeatIsRunning = doScheduleUpdate;

  {
    scheduleUpdate();
  }
};

/**
 * Handles the update logic for one tick of a tween.
 * @private
 */
const scheduleUpdate = () => {
  now = getCurrentTime();

  if (heartbeatIsRunning) {
    scheduleFunction.call(root$1, scheduleUpdate, UPDATE_TIME$1);
  }

  processTweens();
};

/**
 * Creates a usable easing Object from a string, a function or another easing
 * Object.  If `easing` is an Object, then this function clones it and fills
 * in the missing properties with `"linear"`.
 *
 * If the tween has only one easing across all properties, that function is
 * returned directly.
 * @param {Record<string, string|Function>} fromTweenParams
 * @param {Object|string|Function|Array.<number>} [easing]
 * @param {Object} [composedEasing] Reused composedEasing object (used internally)
 * @return {Record<string, string|Function>|Function}
 * @private
 */
const composeEasingObject = (
  fromTweenParams,
  easing = DEFAULT_EASING$2,
  composedEasing = {}
) => {
  if (Array.isArray(easing)) {
    const cubicBezierTransition = getCubicBezierTransition(...easing);

    return cubicBezierTransition
  }

  let typeofEasing = typeof easing;

  if (formulas[easing]) {
    return formulas[easing]
  }

  if (typeofEasing === TYPE_STRING || typeofEasing === TYPE_FUNCTION) {
    for (const prop in fromTweenParams) {
      composedEasing[prop] = easing;
    }
  } else {
    for (const prop in fromTweenParams) {
      composedEasing[prop] = easing[prop] || DEFAULT_EASING$2;
    }
  }

  return composedEasing
};

// Private declarations used below

const remove = ((previousTween, nextTween) => tween => {
  // Adapted from:
  // https://github.com/trekhleb/javascript-algorithms/blob/7c9601df3e8ca4206d419ce50b88bd13ff39deb6/src/data-structures/doubly-linked-list/DoublyLinkedList.js#L73-L121
  if (tween === listHead) {
    listHead = tween._next;

    if (listHead) {
      listHead._previous = null;
    } else {
      listTail = null;
    }
  } else if (tween === listTail) {
    listTail = tween._previous;

    if (listTail) {
      listTail._next = null;
    } else {
      listHead = null;
    }
  } else {
    previousTween = tween._previous;
    nextTween = tween._next;

    previousTween._next = nextTween;
    nextTween._previous = previousTween;
  }

  // Clean up any references in case the tween is restarted later.
  tween._previous = tween._next = null;
})();

const defaultPromiseCtor = typeof Promise === 'function' ? Promise : null;
/**
 * @class
 * @implements {Promise<unknown>}
 */
class Tweenable {
  //required for Promise implementation
  [Symbol.toStringTag] = 'Promise'
  /**
   * @method Tweenable.now
   * @static
   * @returns {number} The current timestamp.
   */
  static now = () => now

  /**
   * Set a custom schedule function.
   *
   * By default,
   * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
   * is used if available, otherwise
   * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
   * is used.
   * @method Tweenable.setScheduleFunction
   * @param {shifty.scheduleFunction} fn The function to be
   * used to schedule the next frame to be rendered.
   * @return {shifty.scheduleFunction} The function that was set.
   */
  static setScheduleFunction = fn => (scheduleFunction = fn)

  /**
   * The {@link shifty.filter}s available for use.  These filters are
   * automatically applied at tween-time by Shifty. You can define your own
   * {@link shifty.filter}s and attach them to this object.
   * @member Tweenable.filters
   * @type {Record<string, shifty.filter>}
   */
  static filters = {}

  static formulas = formulas

  /**
   * @param {Object} [initialState={}] The values that the initial tween should
   * start at if a `from` value is not provided to {@link
   * Tweenable#tween} or {@link Tweenable#setConfig}.
   * @param {shifty.tweenConfig} [config] Configuration object to be passed to
   * {@link Tweenable#setConfig}.
   * @constructs Tweenable
   * @memberof shifty
   */
  constructor(initialState = {}, config = undefined) {
    /** @private */
    this._config = {};
    /** @private */
    this._data = {};
    /** @private */
    this._delay = 0;
    /** @private */
    this._filters = [];
    /** @private */
    this._next = null;
    /** @private */
    this._previous = null;
    /** @private */
    this._timestamp = null;
    /** @private */
    this._hasEnded = false;
    /** @private */
    this._resolve = null;
    /** @private */
    this._reject = null;
    /** @private */
    this._currentState = initialState || {};
    /** @private */
    this._originalState = {};
    /** @private */
    this._targetState = {};
    /** @private */
    this._start = noop$1;
    /** @private */
    this._render = noop$1;
    /** @private */
    this._promiseCtor = defaultPromiseCtor;

    // To prevent unnecessary calls to setConfig do not set default
    // configuration here.  Only set default configuration immediately before
    // tweening if none has been set.
    if (config) {
      this.setConfig(config);
    }
  }

  /**
   * Applies a filter to Tweenable instance.
   * @param {string} filterName The name of the filter to apply.
   * @private
   */
  _applyFilter(filterName) {
    for (let i = this._filters.length; i > 0; i--) {
      const filterType = this._filters[i - i];
      const filter = filterType[filterName];

      if (filter) {
        filter(this);
      }
    }
  }

  /**
   * Configure and start a tween. If this {@link Tweenable}'s instance
   * is already running, then it will stop playing the old tween and
   * immediately play the new one.
   * @method Tweenable#tween
   * @param {shifty.tweenConfig} [config] Gets passed to {@link
   * Tweenable#setConfig}.
   * @return {Tweenable}
   */
  tween(config = undefined) {
    if (this._isPlaying) {
      this.stop();
    }

    if (config || !this._config) {
      this.setConfig(config);
    }

    /** @private */
    this._pausedAtTime = null;
    this._timestamp = Tweenable.now();
    this._start(this.get(), this._data);

    if (this._delay) {
      this._render(this._currentState, this._data, 0);
    }

    return this._resume(this._timestamp)
  }

  /**
   * Configure a tween that will start at some point in the future. Aside from
   * `delay`, `from`, and `to`, each configuration option will automatically
   * default to the same option used in the preceding tween of this {@link
   * Tweenable} instance.
   * @method Tweenable#setConfig
   * @param {shifty.tweenConfig} [config={}]
   * @return {Tweenable}
   */
  setConfig(config = {}) {
    const { _config } = this;

    for (const key in config) {
      _config[key] = config[key];
    }

    // Configuration options to reuse from previous tweens
    const {
      promise = this._promiseCtor,
      start = noop$1,
      finish,
      render = this._config.step || noop$1,

      // Legacy option. Superseded by `render`.
      step = noop$1,
    } = _config;

    // Attach something to this Tweenable instance (e.g.: a DOM element, an
    // object, a string, etc.);
    this._data = _config.data || _config.attachment || this._data;

    // Init the internal state
    /** @private */
    this._isPlaying = false;
    /** @private */
    this._pausedAtTime = null;
    /** @private */
    this._scheduleId = null;
    /** @private */
    this._delay = config.delay || 0;
    /** @private */
    this._start = start;
    /** @private */
    this._render = render || step;
    /** @private */
    this._duration = _config.duration || DEFAULT_DURATION;
    /** @private */
    this._promiseCtor = promise;

    if (finish) {
      this._resolve = finish;
    }

    const { from, to = {} } = config;
    const { _currentState, _originalState, _targetState } = this;

    for (const key in from) {
      _currentState[key] = from[key];
    }

    let anyPropsAreStrings = false;

    for (const key in _currentState) {
      const currentProp = _currentState[key];

      if (!anyPropsAreStrings && typeof currentProp === TYPE_STRING) {
        anyPropsAreStrings = true;
      }

      _originalState[key] = currentProp;

      // Ensure that there is always something to tween to.
      _targetState[key] = to.hasOwnProperty(key) ? to[key] : currentProp;
    }

    /** @private */
    this._easing = composeEasingObject(
      this._currentState,
      _config.easing,
      this._easing
    );

    this._filters.length = 0;

    if (anyPropsAreStrings) {
      for (const key in Tweenable.filters) {
        if (Tweenable.filters[key].doesApply(this)) {
          this._filters.push(Tweenable.filters[key]);
        }
      }

      this._applyFilter(TWEEN_CREATED);
    }

    return this
  }

  /**
   * Overrides any `finish` function passed via a {@link shifty.tweenConfig}.
   * @method Tweenable#then
   * @param {function=} onFulfilled Receives {@link shifty.promisedData} as the
   * first parameter.
   * @param {function=} onRejected Receives {@link shifty.promisedData} as the
   * first parameter.
   * @return {Promise<Object>}
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
   */
  then(onFulfilled, onRejected) {
    /** @private */
    this._promise = new this._promiseCtor((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    return this._promise.then(onFulfilled, onRejected)
  }

  /**
   * @method Tweenable#catch
   * @param {function} onRejected Receives {@link shifty.promisedData} as the
   * first parameter.
   * @return {Promise<Object>}
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
   */
  catch(onRejected) {
    return this.then().catch(onRejected)
  }
  /**
   * @method Tweenable#finally
   * @param {function} onFinally
   * @return {Promise<undefined>}
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
   */
  finally(onFinally) {
    return this.then().finally(onFinally)
  }

  /**
   * @method Tweenable#get
   * @return {Object} The current state.
   */
  get() {
    return { ...this._currentState }
  }

  /**
   * Set the current state.
   * @method Tweenable#set
   * @param {Object} state The state to set.
   */
  set(state) {
    this._currentState = state;
  }

  /**
   * Pause a tween. Paused tweens can be resumed from the point at which they
   * were paused. If a tween is not running, this is a no-op.
   * @method Tweenable#pause
   * @return {Tweenable}
   */
  pause() {
    if (!this._isPlaying) {
      return
    }

    this._pausedAtTime = Tweenable.now();
    this._isPlaying = false;
    remove(this);

    return this
  }

  /**
   * Resume a paused tween.
   * @method Tweenable#resume
   * @return {Tweenable}
   */
  resume() {
    return this._resume()
  }

  /**
   * @private
   * @param {number} currentTime
   * @returns {Tweenable}
   */
  _resume(currentTime = Tweenable.now()) {
    if (this._timestamp === null) {
      return this.tween()
    }

    if (this._isPlaying) {
      return this._promise
    }

    if (this._pausedAtTime) {
      this._timestamp += currentTime - this._pausedAtTime;
      this._pausedAtTime = null;
    }

    this._isPlaying = true;

    if (listHead === null) {
      listHead = this;
      listTail = this;
    } else {
      this._previous = listTail;
      listTail._next = this;

      listTail = this;
    }

    return this
  }

  /**
   * Move the state of the animation to a specific point in the tween's
   * timeline.  If the animation is not running, this will cause {@link
   * shifty.renderFunction} handlers to be called.
   * @method Tweenable#seek
   * @param {number} millisecond The millisecond of the animation to seek
   * to.  This must not be less than `0`.
   * @return {Tweenable}
   */
  seek(millisecond) {
    millisecond = Math.max(millisecond, 0);
    const currentTime = Tweenable.now();

    if (this._timestamp + millisecond === 0) {
      return this
    }

    this._timestamp = currentTime - millisecond;

    // Make sure that any render handlers are run.
    processTween(this, currentTime);

    return this
  }

  /**
   * Stops a tween. If a tween is not running, this is a no-op. This method
   * does not cancel the tween {@link external:Promise}. For that, use {@link
   * Tweenable#cancel}.
   * @param {boolean} [gotoEnd] If `false`, the tween just stops at its current
   * state.  If `true`, the tweened object's values are instantly set to the
   * target values.
   * @method Tweenable#stop
   * @return {Tweenable}
   */
  stop(gotoEnd = false) {
    if (!this._isPlaying) {
      return this
    }

    this._isPlaying = false;

    remove(this);

    const hasFilters = this._filters.length > 0;

    if (gotoEnd) {
      if (hasFilters) {
        this._applyFilter(BEFORE_TWEEN);
      }

      tweenProps(
        1,
        this._currentState,
        this._originalState,
        this._targetState,
        1,
        0,
        this._easing
      );

      if (hasFilters) {
        this._applyFilter(AFTER_TWEEN);
        this._applyFilter(AFTER_TWEEN_END);
      }
    }

    if (this._resolve) {
      this._resolve({
        data: this._data,
        state: this._currentState,
        tweenable: this,
      });
    }

    this._resolve = null;
    this._reject = null;

    return this
  }

  /**
   * {@link Tweenable#stop}s a tween and also `reject`s its {@link
   * external:Promise}. If a tween is not running, this is a no-op. Prevents
   * calling any provided `finish` function.
   * @param {boolean} [gotoEnd] Is propagated to {@link Tweenable#stop}.
   * @method Tweenable#cancel
   * @return {Tweenable}
   * @see https://github.com/jeremyckahn/shifty/issues/122
   */
  cancel(gotoEnd = false) {
    const { _currentState, _data, _isPlaying } = this;

    if (!_isPlaying) {
      return this
    }

    if (this._reject) {
      this._reject({
        data: _data,
        state: _currentState,
        tweenable: this,
      });
    }

    this._resolve = null;
    this._reject = null;

    return this.stop(gotoEnd)
  }

  /**
   * Whether or not a tween is running.
   * @method Tweenable#isPlaying
   * @return {boolean}
   */
  isPlaying() {
    return this._isPlaying
  }

  /**
   * Whether or not a tween has finished running.
   * @method Tweenable#hasEnded
   * @return {boolean}
   */
  hasEnded() {
    return this._hasEnded
  }

  /**
   * @method Tweenable#setScheduleFunction
   * @param {shifty.scheduleFunction} scheduleFunction
   * @deprecated Will be removed in favor of {@link Tweenable.setScheduleFunction} in 3.0.
   */
  setScheduleFunction(scheduleFunction) {
    Tweenable.setScheduleFunction(scheduleFunction);
  }

  /**
   * Get and optionally set the data that gets passed as `data` to {@link
   * shifty.promisedData}, {@link shifty.startFunction} and {@link
   * shifty.renderFunction}.
   * @param {Object} [data]
   * @method Tweenable#data
   * @return {Object} The internally stored `data`.
   */
  data(data = null) {
    if (data) {
      this._data = { ...data };
    }

    return this._data
  }

  /**
   * `delete` all "own" properties.  Call this when the {@link
   * Tweenable} instance is no longer needed to free memory.
   * @method Tweenable#dispose
   */
  dispose() {
    for (const prop in this) {
      delete this[prop];
    }
  }
}

shouldScheduleUpdate(true);

/** @typedef {import("./tweenable").Tweenable} Tweenable */

const R_NUMBER_COMPONENT = /(\d|-|\.)/;
const R_FORMAT_CHUNKS = /([^\-0-9.]+)/g;
const R_UNFORMATTED_VALUES = /[0-9.-]+/g;
const R_RGBA = (() => {
  const number = R_UNFORMATTED_VALUES.source;
  const comma = /,\s*/.source;
  
  return new RegExp(
    `rgba?\\(${number}${comma}${number}${comma}${number}(${comma}${number})?\\)`,
    'g'
  )
})();
const R_RGBA_PREFIX = /^.*\(/;
const R_HEX = /#([0-9]|[a-f]){3,6}/gi;
const VALUE_PLACEHOLDER = 'VAL';

// HELPERS

/**
 * @param {Array.number} rawValues
 * @param {string} prefix
 *
 * @return {Array.<string>}
 * @private
 */
const getFormatChunksFrom = (rawValues, prefix) =>
  rawValues.map((val, i) => `_${prefix}_${i}`);

/**
 * @param {string} formattedString
 *
 * @return {string}
 * @private
 */
const getFormatStringFrom = formattedString => {
  let chunks = formattedString.match(R_FORMAT_CHUNKS);

  if (!chunks) {
    // chunks will be null if there were no tokens to parse in
    // formattedString (for example, if formattedString is '2').  Coerce
    // chunks to be useful here.
    chunks = ['', ''];

    // If there is only one chunk, assume that the string is a number
    // followed by a token...
    // NOTE: This may be an unwise assumption.
  } else if (
    chunks.length === 1 ||
    // ...or if the string starts with a number component (".", "-", or a
    // digit)...
    formattedString.charAt(0).match(R_NUMBER_COMPONENT)
  ) {
    // ...prepend an empty string here to make sure that the formatted number
    // is properly replaced by VALUE_PLACEHOLDER
    chunks.unshift('');
  }

  return chunks.join(VALUE_PLACEHOLDER)
};

/**
 * Convert a base-16 number to base-10.
 *
 * @param {number|string} hex The value to convert.
 *
 * @returns {number} The base-10 equivalent of `hex`.
 * @private
 */
function hexToDec(hex) {
  return parseInt(hex, 16)
}

/**
 * Convert a hexadecimal string to an array with three items, one each for
 * the red, blue, and green decimal values.
 *
 * @param {string} hex A hexadecimal string.
 *
 * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
 * valid string, or an Array of three 0's.
 * @private
 */
const hexToRGBArray = hex => {
  hex = hex.replace(/#/, '');

  // If the string is a shorthand three digit hex notation, normalize it to
  // the standard six digit notation
  if (hex.length === 3) {
    hex = hex.split('');
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  return [
    hexToDec(hex.substr(0, 2)),
    hexToDec(hex.substr(2, 2)),
    hexToDec(hex.substr(4, 2)),
  ]
};

/**
 * @param {string} hexString
 *
 * @return {string}
 * @private
 */
const convertHexToRGB = hexString =>
  `rgb(${hexToRGBArray(hexString).join(',')})`;

/**
 * TODO: Can this be rewritten to leverage String#replace more efficiently?
 * Runs a filter operation on all chunks of a string that match a RegExp.
 *
 * @param {RegExp} pattern
 * @param {string} unfilteredString
 * @param {function(string)} filter
 *
 * @return {string}
 * @private
 */
const filterStringChunks = (pattern, unfilteredString, filter) => {
  const patternMatches = unfilteredString.match(pattern);
  let filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);

  if (patternMatches) {
    patternMatches.forEach(
      match =>
        (filteredString = filteredString.replace(
          VALUE_PLACEHOLDER,
          filter(match)
        ))
    );
  }

  return filteredString
};

/**
 * @param {string} str
 *
 * @return {string}
 * @private
 */
const sanitizeHexChunksToRGB = str =>
  filterStringChunks(R_HEX, str, convertHexToRGB);

/**
 * Convert all hex color values within a string to an rgb string.
 *
 * @param {Object} stateObject
 * @private
 */
const sanitizeObjectForHexProps = stateObject => {
  for (const prop in stateObject) {
    const currentProp = stateObject[prop];

    if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
      stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
    }
  }
};

/**
 * @param {string} rgbChunk
 *
 * @return {string}
 * @private
 */
const sanitizeRGBAChunk = rgbChunk => {
  const rgbaRawValues = rgbChunk.match(R_UNFORMATTED_VALUES);
  const rgbNumbers = rgbaRawValues.slice(0, 3).map(Math.floor);
  const prefix = rgbChunk.match(R_RGBA_PREFIX)[0];

  if (rgbaRawValues.length === 3) {
    return `${prefix}${rgbNumbers.join(',')})`
  } else if (rgbaRawValues.length === 4) {
    return `${prefix}${rgbNumbers.join(',')},${rgbaRawValues[3]})`
  }

  throw new Error(`Invalid rgbChunk: ${rgbChunk}`)
};

/**
 * Check for floating point values within rgb strings and round them.
 *
 * @param {string} formattedString
 *
 * @return {string}
 * @private
 */
const sanitizeRGBChunks = formattedString =>
  filterStringChunks(R_RGBA, formattedString, sanitizeRGBAChunk);

/**
 * Note: It's the duty of the caller to convert the Array elements of the
 * return value into numbers.  This is a performance optimization.
 *
 * @param {string} formattedString
 *
 * @return {Array.<string>|null}
 * @private
 */
const getValuesFrom = formattedString =>
  formattedString.match(R_UNFORMATTED_VALUES);

/**
 * @param {Object} stateObject
 *
 * @return {Object} An Object of formatSignatures that correspond to
 * the string properties of stateObject.
 * @private
 */
const getFormatSignatures = stateObject => {
  const signatures = {};

  for (const propertyName in stateObject) {
    const property = stateObject[propertyName];

    if (typeof property === 'string') {
      signatures[propertyName] = {
        formatString: getFormatStringFrom(property),
        chunkNames: getFormatChunksFrom(getValuesFrom(property), propertyName),
      };
    }
  }

  return signatures
};

/**
 * @param {Object} stateObject
 * @param {Object} formatSignatures
 * @private
 */
const expandFormattedProperties = (stateObject, formatSignatures) => {
  for (const propertyName in formatSignatures) {
    getValuesFrom(stateObject[propertyName]).forEach(
      (number, i) =>
        (stateObject[formatSignatures[propertyName].chunkNames[i]] = +number)
    );

    delete stateObject[propertyName];
  }
};

/**
 * @param {Object} stateObject
 * @param {Array.<string>} chunkNames
 *
 * @return {Object} The extracted value chunks.
 * @private
 */
const extractPropertyChunks = (stateObject, chunkNames) => {
  const extractedValues = {};

  chunkNames.forEach(chunkName => {
    extractedValues[chunkName] = stateObject[chunkName];
    delete stateObject[chunkName];
  });

  return extractedValues
};

/**
 * @param {Object} stateObject
 * @param {Array.<string>} chunkNames
 *
 * @return {Array.<number>}
 * @private
 */
const getValuesList = (stateObject, chunkNames) =>
  chunkNames.map(chunkName => stateObject[chunkName]);

/**
 * @param {string} formatString
 * @param {Array.<number>} rawValues
 *
 * @return {string}
 * @private
 */
const getFormattedValues = (formatString, rawValues) => {
  rawValues.forEach(
    rawValue =>
      (formatString = formatString.replace(
        VALUE_PLACEHOLDER,
        +rawValue.toFixed(4)
      ))
  );

  return formatString
};

/**
 * @param {Object} stateObject
 * @param {Object} formatSignatures
 * @private
 */
const collapseFormattedProperties = (stateObject, formatSignatures) => {
  for (const prop in formatSignatures) {
    const { chunkNames, formatString } = formatSignatures[prop];

    const currentProp = getFormattedValues(
      formatString,
      getValuesList(extractPropertyChunks(stateObject, chunkNames), chunkNames)
    );

    stateObject[prop] = sanitizeRGBChunks(currentProp);
  }
};

/**
 * @param {Object} easingObject
 * @param {Object} tokenData
 * @private
 */
const expandEasingObject = (easingObject, tokenData) => {
  for (const prop in tokenData) {
    const { chunkNames } = tokenData[prop];
    const easing = easingObject[prop];

    if (typeof easing === 'string') {
      const easingNames = easing.split(' ');
      const defaultEasing = easingNames[easingNames.length - 1];

      chunkNames.forEach(
        (chunkName, i) =>
          (easingObject[chunkName] = easingNames[i] || defaultEasing)
      );
    } else {
      // easing is a function
      chunkNames.forEach(chunkName => (easingObject[chunkName] = easing));
    }

    delete easingObject[prop];
  }
};

/**
 * @param {Object} easingObject
 * @param {Object} tokenData
 * @private
 */
const collapseEasingObject = (easingObject, tokenData) => {
  for (const prop in tokenData) {
    const { chunkNames } = tokenData[prop];
    const firstEasing = easingObject[chunkNames[0]];

    if (typeof firstEasing === 'string') {
      easingObject[prop] = chunkNames
        .map(chunkName => {
          const easingName = easingObject[chunkName];
          delete easingObject[chunkName];

          return easingName
        })
        .join(' ');
    } else {
      // firstEasing is a function
      easingObject[prop] = firstEasing;
    }
  }
};

/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 * @returns {boolean}
 */
const doesApply = tweenable => {
  for (const key in tweenable._currentState) {
    if (typeof tweenable._currentState[key] === 'string') {
      return true
    }
  }

  return false
};

/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 */
function tweenCreated(tweenable) {
  const { _currentState, _originalState, _targetState } = tweenable

  ;[_currentState, _originalState, _targetState].forEach(
    sanitizeObjectForHexProps
  );

  tweenable._tokenData = getFormatSignatures(_currentState);
}

/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 */
function beforeTween(tweenable) {
  const {
    _currentState,
    _originalState,
    _targetState,
    _easing,
    _tokenData,
  } = tweenable;

  expandEasingObject(_easing, _tokenData)
  ;[_currentState, _originalState, _targetState].forEach(state =>
    expandFormattedProperties(state, _tokenData)
  );
}

/**
 * @memberof Tweenable.filters.token
 * @param {Tweenable} tweenable
 */
function afterTween(tweenable) {
  const {
    _currentState,
    _originalState,
    _targetState,
    _easing,
    _tokenData,
  } = tweenable
  ;[_currentState, _originalState, _targetState].forEach(state =>
    collapseFormattedProperties(state, _tokenData)
  );

  collapseEasingObject(_easing, _tokenData);
}

var token = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterTween: afterTween,
  beforeTween: beforeTween,
  doesApply: doesApply,
  tweenCreated: tweenCreated
});

/** @typedef {import("./index").shifty.easingFunction} shifty.easingFunction */

// Fake a Tweenable and patch some internals.  This approach allows us to
// skip uneccessary processing and object recreation, cutting down on garbage
// collection pauses.
const mockTweenable = new Tweenable();
const { filters } = Tweenable;

/**
 * Compute the midpoint of two Objects.  This method effectively calculates a
 * specific frame of animation that {@link Tweenable#tween} does many times
 * over the course of a full tween.
 *
 * ```
 * import { interpolate } from 'shifty';
 *
 * const interpolatedValues = interpolate({
 *     width: '100px',
 *     opacity: 0,
 *     color: '#fff'
 *   }, {
 *     width: '200px',
 *     opacity: 1,
 *     color: '#000'
 *   },
 *   0.5
 * );
 *
 * console.log(interpolatedValues); // Logs: {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
 * ```
 *
 * @method shifty.interpolate
 * @template T
 * @param {T} from The starting values to tween from.
 * @param {T} to The ending values to tween to.
 * @param {number} position The normalized position value (between `0.0` and
 * `1.0`) to interpolate the values between `from` and `to` for.  `from`
 * represents `0` and `to` represents `1`.
 * @param {Record<string, string | shifty.easingFunction> | string | shifty.easingFunction} easing
 * The easing curve(s) to calculate the midpoint against.  You can
 * reference any easing function attached to {@link Tweenable.formulas},
 * or provide the {@link shifty.easingFunction}(s) directly.  If omitted, this
 * defaults to "linear".
 * @param {number} [delay=0] Optional delay to pad the beginning of the
 * interpolated tween with.  This increases the range of `position` from (`0`
 * through `1`) to (`0` through `1 + delay`).  So, a delay of `0.5` would
 * increase all valid values of `position` to numbers between `0` and `1.5`.
 * @return {T}
 */
const interpolate = (from, to, position, easing, delay = 0) => {
  const current = { ...from };
  const easingObject = composeEasingObject(from, easing);

  mockTweenable._filters.length = 0;

  mockTweenable.set({});
  mockTweenable._currentState = current;
  mockTweenable._originalState = from;
  mockTweenable._targetState = to;
  mockTweenable._easing = easingObject;

  for (const name in filters) {
    if (filters[name].doesApply(mockTweenable)) {
      mockTweenable._filters.push(filters[name]);
    }
  }

  // Any defined value transformation must be applied
  mockTweenable._applyFilter('tweenCreated');
  mockTweenable._applyFilter('beforeTween');

  const interpolatedValues = tweenProps(
    position,
    current,
    from,
    to,
    1,
    delay,
    easingObject
  );

  // Transform data in interpolatedValues back into its original format
  mockTweenable._applyFilter('afterTween');

  return interpolatedValues
};

/**
 * @namespace shifty
 */


Tweenable.filters.token = token;

/**
 * @external Promise
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */

/**
 * @external thenable
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then}
 */

/**
 * @callback shifty.easingFunction
 * @param {number} position The normalized (0-1) position of the tween.
 * @return {number} The curve-adjusted value.
 */

/**
 * @callback shifty.startFunction
 * @param {Object} state The current state of the tween.
 * @param {Object|undefined} [data] User-defined data provided via a {@link
 * shifty.tweenConfig}.
 * @returns {void}
 */

/**
 * @callback shifty.finishFunction
 * @param {shifty.promisedData} promisedData
 * @returns {void}
 */

/**
 * Gets called for every tick of the tween.  This function is not called on the
 * final tick of the animation.
 * @callback shifty.renderFunction
 * @param {Object} state The current state of the tween.
 * @param {Object|undefined} data User-defined data provided via a {@link
 * shifty.tweenConfig}.
 * @param {number} timeElapsed The time elapsed since the start of the tween.
 * @returns {void}
 */

/**
 * @callback shifty.scheduleFunction
 * @param {Function} callback
 * @param {number} timeout
 * @returns {void}
 */

/**
 * @typedef {Object} shifty.tweenConfig
 * @property {Object} [from] Starting position.  If omitted, {@link
 * Tweenable#get} is used.
 * @property {Object} [to] Ending position.  The keys of this Object should
 * match those of `to`.
 * @property {number} [duration] How many milliseconds to animate for.
 * @property {number} [delay] How many milliseconds to wait before starting the
 * tween.
 * @property {shifty.startFunction} [start] Executes when the tween begins.
 * @property {shifty.finishFunction} [finish] Executes when the tween
 * completes. This will get overridden by {@link Tweenable#then} if that
 * is called, and it will not fire if {@link Tweenable#cancel} is
 * called.
 * @property {shifty.renderFunction} [render] Executes on every tick. Shifty
 * assumes a [retained mode](https://en.wikipedia.org/wiki/Retained_mode)
 * rendering environment, which in practice means that `render` only gets
 * called when the tween state changes. Importantly, this means that `render`
 * is _not_ called when a tween is not animating (for instance, when it is
 * paused or waiting to start via the `delay` option). This works naturally
 * with DOM environments, but you may need to account for this design in more
 * custom environments such as `<canvas>`.
 *
 * Legacy property name: `step`.
 * @property {string|shifty.easingFunction|Object<string|shifty.easingFunction>|Array.<number>} [easing]
 * - `string`: Name of the {@link Tweenable.formulas} to apply to all
 *   properties of the tween.
 * - {@link shifty.easingFunction}: A custom function that computes the rendered
 *   position of the tween for the given normalized position of the tween.
 * - `Object`: Keys are tween property names. Values are the {@link
 *   Tweenable.formulas} to be applied to each tween property, or a {@link
 *   shifty.easingFunction}. Any tween properties not included in the `Object`
 *   default to `'linear'`.
 * - `Array.<number>`: The array must contain four `number` values that
 *   correspond to the `[x1, y1, x2, y2]` values of a [Bezier
 * curve](https://cubic-bezier.com/).
 *
 * You can learn more about this in the {@tutorial
 * easing-function-in-depth} tutorial.
 * @property {Object} [data] Data that is passed to {@link
 * shifty.startFunction}, {@link shifty.renderFunction}, and {@link
 * shifty.promisedData}. Legacy property name: `attachment`.
 * @property {Function} [promise] Promise constructor for when you want
 * to use Promise library or polyfill Promises in unsupported environments.
 */

/**
 * @typedef {Object} shifty.promisedData
 * @property {Object} state The current state of the tween.
 * @property {Object} data The `data` Object that the tween was configured with.
 * @property {Tweenable} tweenable The {@link Tweenable} instance to
 * which the tween belonged.
 */

/**
 * Is called when a tween is created to determine if a filter is needed.
 * Filters are only added to a tween when it is created so that they are not
 * unnecessarily processed if they don't apply during an update tick.
 * @callback shifty.doesApplyFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @return {boolean}
 */

/**
 * Is called when a tween is created.  This should perform any setup needed by
 * subsequent per-tick calls to {@link shifty.beforeTween} and {@link
 * shifty.afterTween}.
 * @callback shifty.tweenCreatedFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @returns {void}
 */

/**
 * Is called right before a tween is processed in a tick.
 * @callback shifty.beforeTweenFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @returns {void}
 */

/**
 * Is called right after a tween is processed in a tick.
 * @callback shifty.afterTweenFilter
 * @param {Tweenable} tweenable The {@link Tweenable} instance.
 * @returns {void}
 */

/**
 * An Object that contains functions that are called at key points in a tween's
 * lifecycle.  Shifty can only process `Number`s internally, but filters can
 * expand support for any type of data.  This is the mechanism that powers
 * [string interpolation]{@tutorial string-interpolation}.
 * @typedef {Object} shifty.filter
 * @property {shifty.doesApplyFilter} doesApply Is called when a tween is
 * created.
 * @property {shifty.tweenCreatedFilter} tweenCreated Is called when a tween is
 * created.
 * @property {shifty.beforeTweenFilter} beforeTween Is called right before a
 * tween starts.
 * @property {shifty.afterTweenFilter} afterTween Is called right after a tween
 * ends.
 */

/**
 * @param {Object} obj
 * @return {Object}
 */
const clone = obj => Object.assign({}, obj);

/**
 * Simplified version of https://lodash.com/docs/4.17.4#forEach, but only for
 * Objects.
 * @param {Object.<any>} obj
 * @param {Function(any)} fn
 */
const each = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key));

/**
 * Simplified version of https://lodash.com/docs/4.17.4#pick
 * @param {Object.<any>} obj
 * @param {Array.<string>} keyNames
 */
const pick = (obj, keyNames) =>
  keyNames.reduce(
    (acc, keyName) => {
      const val = obj[keyName];

      if (typeof val !== 'undefined') {
        acc[keyName] = val;
      }

      return acc;
    },
    {}
  );

let incrementer = 0;
/**
 * @param {string} [prefix]
 * @return {string}
 */
const uniqueId = (prefix = '') => prefix + incrementer++;

/**
 * Simplified version of https://lodash.com/docs/4.17.4#without
 * @param {Array.<any>} array
 * @param {...any} values
 * @return {Array.<any>}
 */
const without = (array, ...values) =>
  array.filter(value => !~values.indexOf(value));

const DEFAULT_EASING$1 = 'linear';

/**
 * Represents an individual component of an {@link rekapi.Actor}'s keyframe
 * state.  In most cases you won't need to deal with this object directly, as
 * the {@link rekapi.Actor} APIs abstract a lot of what this Object does away
 * for you.
 * @param {number} millisecond Sets {@link
 * rekapi.KeyframeProperty#millisecond}.
 * @param {string} name Sets {@link rekapi.KeyframeProperty#name}.
 * @param {(number|string|boolean|rekapi.keyframeFunction)} value Sets {@link
 * rekapi.KeyframeProperty#value}.
 * @param {rekapi.easingOption} [easing="linear"] Sets {@link
 * rekapi.KeyframeProperty#easing}.
 * @constructs rekapi.KeyframeProperty
 */
class KeyframeProperty {
  constructor (millisecond, name, value, easing = DEFAULT_EASING$1) {
    /**
     * @member {string} rekapi.KeyframeProperty#id The unique ID of this {@link
     * rekapi.KeyframeProperty}.
     */
    this.id = uniqueId('keyframeProperty_');

    /**
     * @member {boolean} rekapi.KeyframeProperty#hasFired Flag to determine if
     * this {@link rekapi.KeyframeProperty}'s {@link rekapi.keyframeFunction}
     * should be invoked in the current animation loop.
     */
    this.hasFired = null;

    /**
     * @member {(rekapi.Actor|undefined)} rekapi.KeyframeProperty#actor The
     * {@link rekapi.Actor} to which this {@link rekapi.KeyframeProperty}
     * belongs, if any.
     */

    /**
     * @member {(rekapi.KeyframeProperty|null)}
     * rekapi.KeyframeProperty#nextProperty A reference to the {@link
      * rekapi.KeyframeProperty} that follows this one in a {@link
      * rekapi.Actor}'s property track.
     */
    this.nextProperty = null;

    Object.assign(this, {
      /**
       * @member {number} rekapi.KeyframeProperty#millisecond Where on the
       * animation timeline this {@link rekapi.KeyframeProperty} is.
       */
      millisecond,
      /**
       * @member {string} rekapi.KeyframeProperty#name This {@link
       * rekapi.KeyframeProperty}'s name, such as `"x"` or `"opacity"`.
       */
      name,
      /**
       * @member {number|string|boolean|rekapi.keyframeFunction}
       * rekapi.KeyframeProperty#value The value that this {@link
       * rekapi.KeyframeProperty} represents.
       */
      value,
      /**
       * @member {rekapi.easingOption} rekapi.KeyframeProperty#easing The
       * easing curve by which this {@link rekapi.KeyframeProperty} should be
       * animated.
       */
      easing
    });
  }

  /**
   * Modify this {@link rekapi.KeyframeProperty}.
   * @method rekapi.KeyframeProperty#modifyWith
   * @param {Object} newProperties Valid values are:
   * @param {number} [newProperties.millisecond] Sets {@link
   * rekapi.KeyframeProperty#millisecond}.
   * @param {string} [newProperties.name] Sets {@link rekapi.KeyframeProperty#name}.
   * @param {(number|string|boolean|rekapi.keyframeFunction)} [newProperties.value] Sets {@link
   * rekapi.KeyframeProperty#value}.
   * @param {string} [newProperties.easing] Sets {@link
   * rekapi.KeyframeProperty#easing}.
   */
  modifyWith (newProperties) {
    Object.assign(this, newProperties);
  }

  /**
   * Calculate the midpoint between this {@link rekapi.KeyframeProperty} and
   * the next {@link rekapi.KeyframeProperty} in a {@link rekapi.Actor}'s
   * property track.
   *
   * In just about all cases, `millisecond` should be between this {@link
   * rekapi.KeyframeProperty}'s `millisecond` and the `millisecond` of the
   * {@link rekapi.KeyframeProperty} that follows it in the animation
   * timeline, but it is valid to specify a value outside of this range.
   * @method rekapi.KeyframeProperty#getValueAt
   * @param {number} millisecond The millisecond in the animation timeline to
   * compute the state value for.
   * @return {(number|string|boolean|rekapi.keyframeFunction|rekapi.KeyframeProperty#value)}
   */
  getValueAt (millisecond) {
    const nextProperty = this.nextProperty;

    if (typeof this.value === 'boolean') {
      return this.value;
    } else if (nextProperty) {
      const boundedMillisecond = Math.min(
        Math.max(millisecond, this.millisecond),
        nextProperty.millisecond
      );

      const { name } = this;
      const delta = nextProperty.millisecond - this.millisecond;
      const interpolatePosition =
        (boundedMillisecond - this.millisecond) / delta;

      return interpolate(
        { [name]: this.value },
        { [name]: nextProperty.value },
        interpolatePosition,
        nextProperty.easing
      )[name];
    } else {
      return this.value;
    }
  }

  /**
   * Create the reference to the {@link rekapi.KeyframeProperty} that follows
   * this one on a {@link rekapi.Actor}'s property track.  Property tracks
   * are just linked lists of {@link rekapi.KeyframeProperty}s.
   * @method rekapi.KeyframeProperty#linkToNext
   * @param {KeyframeProperty=} nextProperty The {@link
   * rekapi.KeyframeProperty} that should immediately follow this one on the
   * animation timeline.
   */
  linkToNext (nextProperty = null) {
    this.nextProperty = nextProperty;
  }

  /**
   * Disassociates this {@link rekapi.KeyframeProperty} from its {@link
   * rekapi.Actor}.  This is called by various {@link rekapi.Actor} methods
   * and triggers the [removeKeyframeProperty]{@link rekapi.Rekapi#on} event
   * on the associated {@link rekapi.Rekapi} instance.
   * @method rekapi.KeyframeProperty#detach
   * @fires rekapi.removeKeyframeProperty
   */
  detach () {
    const { actor } = this;

    if (actor && actor.rekapi) {
      fireEvent(actor.rekapi, 'removeKeyframeProperty', this);
      delete actor._keyframeProperties[this.id];
      this.actor = null;
    }

    return this;
  }

  /**
   * Export this {@link rekapi.KeyframeProperty} to a `JSON.stringify`-friendly
   * `Object`.
   * @method rekapi.KeyframeProperty#exportPropertyData
   * @param {Object} [config]
   * @param {boolean} [config.withId=false] If `true`, include internal `id`
   * value in exported data.
   * @return {rekapi.propertyData}
   */
  exportPropertyData ({ withId = false } = {}) {
    const props = ['millisecond', 'name', 'value', 'easing'];

    if (withId) {
      props.push('id');
    }

    return pick(this, props);
  }

  /*!
   * Whether or not this is a function keyframe and should be invoked for the
   * current frame.  Helper method for Actor.
   * @method rekapi.KeyframeProperty#shouldInvokeForMillisecond
   * @return {boolean}
   */
  shouldInvokeForMillisecond (millisecond) {
    return (millisecond >= this.millisecond &&
      this.name === 'function' &&
      !this.hasFired
    );
  }

  /**
   * Calls {@link rekapi.KeyframeProperty#value} if it is a {@link
   * rekapi.keyframeFunction}.
   * @method rekapi.KeyframeProperty#invoke
   * @return {any} Whatever value is returned for this {@link
   * rekapi.KeyframeProperty}'s {@link rekapi.keyframeFunction}.
   */
  invoke () {
    const drift = this.actor.rekapi._loopPosition - this.millisecond;
    const returnValue = this.value(this.actor, drift);
    this.hasFired = true;

    return returnValue;
  }
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol$1 = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeKeys = overArg(Object.keys, Object),
    nativeMin = Math.min;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise$1 = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      var result; 
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value);

  var low = 0,
      high = array ? array.length : 0,
      valIsNaN = value !== value,
      valIsNull = value === null,
      valIsSymbol = isSymbol(value),
      valIsUndefined = value === undefined;

  while (low < high) {
    var mid = nativeFloor((low + high) / 2),
        computed = iteratee(array[mid]),
        othIsDefined = computed !== undefined,
        othIsNull = computed === null,
        othIsReflexive = computed === computed,
        othIsSymbol = isSymbol(computed);

    if (valIsNaN) {
      var setLow = othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (!othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (!othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = (computed < value);
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.sortedIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * var objects = [{ 'x': 4 }, { 'x': 5 }];
 *
 * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
 * // => 0
 */
function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee));
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

const noop = () => {};

/*!
 * @param {Object} obj
 * @return {number} millisecond
 */
const getMillisecond = obj => obj.millisecond;

// TODO: Make this a prototype method
/*!
 * @param {Actor} actor
 * @param {string} event
 * @param {any} [data]
 */
const fire = (actor, event, data) =>
  actor.rekapi && fireEvent(actor.rekapi, event, data);

/*!
 * Retrieves the most recent property cache entry for a given millisecond.
 * @param {Actor} actor
 * @param {number} millisecond
 * @return {(Object|undefined)} undefined if there is no property cache for
 * the millisecond, i.e. an empty cache.
 */
const getPropertyCacheEntryForMillisecond = (actor, millisecond) => {
  const { _timelinePropertyCache } = actor;
  const index = sortedIndexBy(
    _timelinePropertyCache,
    { _millisecond: millisecond },
    obj => obj._millisecond
  );

  if (!_timelinePropertyCache[index]) {
    return;
  }

  return _timelinePropertyCache[index]._millisecond === millisecond ?
    _timelinePropertyCache[index] :
      index >= 1 ?
        _timelinePropertyCache[index - 1] :
        _timelinePropertyCache[0];
};

/*!
 * Search property track `track` and find the correct index to insert a
 * new element at `millisecond`.
 * @param {Array(KeyframeProperty)} track
 * @param {number} millisecond
 * @return {number} index
 */
const insertionPointInTrack = (track, millisecond) =>
  sortedIndexBy(track, { millisecond }, getMillisecond);

/*!
 * Gets all of the current and most recent Rekapi.KeyframeProperties for a
 * given millisecond.
 * @param {Actor} actor
 * @param {number} forMillisecond
 * @return {Object} An Object containing Rekapi.KeyframeProperties
 */
const getLatestProperties = (actor, forMillisecond) => {
  const latestProperties = {};

  each(actor._propertyTracks, (propertyTrack, propertyName) => {
    const index = insertionPointInTrack(propertyTrack, forMillisecond);

    latestProperties[propertyName] =
      propertyTrack[index] && propertyTrack[index].millisecond === forMillisecond ?
        // Found forMillisecond exactly.
        propertyTrack[index] :
          index >= 1 ?
            // forMillisecond doesn't exist in the track and index is
            // where we'd need to insert it, therefore the previous
            // keyframe is the most recent one before forMillisecond.
            propertyTrack[index - 1] :
            // Return first property.  This is after forMillisecond.
            propertyTrack[0];
  });

  return latestProperties;
};

/*!
 * Search property track `track` and find the index to the element that is
 * at `millisecond`.  Returns `undefined` if not found.
 * @param {Array(KeyframeProperty)} track
 * @param {number} millisecond
 * @return {number} index or -1 if not present
 */
const propertyIndexInTrack = (track, millisecond) => {
  const index = insertionPointInTrack(track, millisecond);

  return track[index] && track[index].millisecond === millisecond ?
    index : -1;
};

/*!
 * Mark the cache of internal KeyframeProperty data as invalid.  The cache
 * will be rebuilt on the next call to ensurePropertyCacheValid.
 * @param {Actor}
 */
const invalidateCache = actor => actor._timelinePropertyCacheValid = false;

/*!
 * Empty out and rebuild the cache of internal KeyframeProperty data if it
 * has been marked as invalid.
 * @param {Actor}
 */
const ensurePropertyCacheValid = actor => {
  if (actor._timelinePropertyCacheValid) {
    return;
  }

  actor._timelinePropertyCache = [];
  actor._timelineFunctionCache = [];

  const {
    _keyframeProperties,
    _timelineFunctionCache,
    _timelinePropertyCache
  } = actor;

  // Build the cache map
  const props = Object.keys(_keyframeProperties)
    .map(key => _keyframeProperties[key])
    .sort((a, b) => a.millisecond - b.millisecond);

  let curCacheEntry = getLatestProperties(actor, 0);

  curCacheEntry._millisecond = 0;
  _timelinePropertyCache.push(curCacheEntry);

  props.forEach(property => {
    if (property.millisecond !== curCacheEntry._millisecond) {
      curCacheEntry = clone(curCacheEntry);
      curCacheEntry._millisecond = property.millisecond;
      _timelinePropertyCache.push(curCacheEntry);
    }

    curCacheEntry[property.name] = property;

    if (property.name === 'function') {
      _timelineFunctionCache.push(property);
    }
  });

  actor._timelinePropertyCacheValid = true;
};

/*!
 * Remove any property tracks that are empty.
 * @param {Actor} actor
 * @fires rekapi.removeKeyframePropertyTrack
 */
const removeEmptyPropertyTracks = actor => {
  const { _propertyTracks } = actor;

  Object.keys(_propertyTracks).forEach(trackName => {
    if (!_propertyTracks[trackName].length) {
      delete _propertyTracks[trackName];
      fire(actor, 'removeKeyframePropertyTrack', trackName);
    }
  });
};

/*!
 * Stably sort all of the property tracks of an actor
 * @param {Actor} actor
 */
const sortPropertyTracks = actor => {
  each(actor._propertyTracks, (propertyTrack, trackName) => {
    propertyTrack = propertyTrack.sort(
      (a, b) => a.millisecond - b.millisecond
    );

    propertyTrack.forEach((keyframeProperty, i) =>
      keyframeProperty.linkToNext(propertyTrack[i + 1])
    );

    actor._propertyTracks[trackName] = propertyTrack;
  });
};

/*!
 * Updates internal Rekapi and Actor data after a KeyframeProperty
 * modification method is called.
 *
 * @param {Actor} actor
 * @fires rekapi.timelineModified
 */
const cleanupAfterKeyframeModification = actor => {
  sortPropertyTracks(actor);
  invalidateCache(actor);

  if (actor.rekapi) {
    invalidateAnimationLength(actor.rekapi);
  }

  fire(actor, 'timelineModified');
};

/**
 * A {@link rekapi.Actor} represents an individual component of an animation.
 * An animation may have one or many {@link rekapi.Actor}s.
 *
 * @param {Object} [config={}]
 * @param {(Object|CanvasRenderingContext2D|HTMLElement)} [config.context] Sets
 * {@link rekapi.Actor#context}.
 * @param {Function} [config.setup] Sets {@link rekapi.Actor#setup}.
 * @param {rekapi.render} [config.render] Sets {@link rekapi.Actor#render}.
 * @param {Function} [config.teardown] Sets {@link rekapi.Actor#teardown}.
 * @constructs rekapi.Actor
 */
class Actor extends Tweenable {
  constructor (config = {}) {
    super();

    /**
     * @member {rekapi.Rekapi|undefined} rekapi.Actor#rekapi The {@link
     * rekapi.Rekapi} instance to which this {@link rekapi.Actor} belongs, if
     * any.
     */

    Object.assign(this, {
      _propertyTracks: {},
      _timelinePropertyCache: [],
      _timelineFunctionCache: [],
      _timelinePropertyCacheValid: false,
      _keyframeProperties: {},

      /**
       * @member {string} rekapi.Actor#id The unique ID of this {@link rekapi.Actor}.
       */
      id: uniqueId(),

      /**
        * @member {(Object|CanvasRenderingContext2D|HTMLElement|undefined)}
        * [rekapi.Actor#context] If this {@link rekapi.Actor} was created by or
        * provided as an argument to {@link rekapi.Rekapi#addActor}, then this
        * member is a reference to that {@link rekapi.Rekapi}'s {@link
        * rekapi.Rekapi#context}.
        */
      context: config.context,

      /**
       * @member {Function} rekapi.Actor#setup Gets called when an actor is
       * added to an animation by {@link rekapi.Rekapi#addActor}.
       */
      setup: config.setup || noop,

      /**
       * @member {rekapi.render} rekapi.Actor#render The function that renders
       * this {@link rekapi.Actor}.
       */
      render: config.render || noop,

      /**
       * @member {Function} rekapi.Actor#teardown Gets called when an actor is
       * removed from an animation by {@link rekapi.Rekapi#removeActor}.
       */
      teardown: config.teardown || noop,

      /**
       * @member {boolean} rekapi.Actor#wasActive A flag that records whether
       * this {@link rekapi.Actor} had any state in the previous updated cycle.
       * Handy for immediate-mode renderers (such as {@link
       * rekapi.CanvasRenderer}) to prevent unintended renders after the actor
       * has no state. Also used to prevent redundant {@link
       * rekapi.keyframeFunction} calls.
       */
      wasActive: true
    });
  }

  /**
   * Create a keyframe for the actor.  The animation timeline begins at `0`.
   * The timeline's length will automatically "grow" to accommodate new
   * keyframes as they are added.
   *
   * `state` should contain all of the properties that define this keyframe's
   * state.  These properties can be any value that can be tweened by
   * [Shifty](http://jeremyckahn.github.io/shifty/doc/) (numbers,
   * RGB/hexadecimal color strings, and CSS property strings).  `state` can
   * also be a [function]{@link rekapi.keyframeFunction}, but
   * [this works differently]{@tutorial keyframes-in-depth}.
   *
   * __Note:__ Internally, this creates {@link rekapi.KeyframeProperty}s and
   * places them on a "track." Tracks are automatically named to match the
   * relevant {@link rekapi.KeyframeProperty#name}s.  These {@link
   * rekapi.KeyframeProperty}s are managed for you by the {@link rekapi.Actor}
   * APIs.
   *
   * ## [Click to learn about keyframes in depth]{@tutorial keyframes-in-depth}
   * @method rekapi.Actor#keyframe
   * @param {number} millisecond Where on the timeline to set the keyframe.
   * @param {(Object|rekapi.keyframeFunction)} state The state properties of
   * the keyframe.  If this is an Object, the properties will be interpolated
   * between this and those of the following keyframe for a given point on the
   * animation timeline.  If this is a function ({@link
   * rekapi.keyframeFunction}), it will be called at the keyframe specified by
   * `millisecond`.
   * @param {rekapi.easingOption} [easing] Optional easing string or Object.
   * If `state` is a function, this is ignored.
   * @return {rekapi.Actor}
   * @fires rekapi.timelineModified
   */
  keyframe (millisecond, state, easing = DEFAULT_EASING) {
    if (state instanceof Function) {
      state = { 'function': state };
    }

    each(state, (value, name) =>
      this.addKeyframeProperty(
        new KeyframeProperty(
          millisecond,
          name,
          value,
          typeof easing === 'string' || Array.isArray(easing) ?
            easing :
            (easing[name] || DEFAULT_EASING)
        )
      )
    );

    if (this.rekapi) {
      invalidateAnimationLength(this.rekapi);
    }

    invalidateCache(this);
    fire(this, 'timelineModified');

    return this;
  }

  /**
   * @method rekapi.Actor#hasKeyframeAt
   * @param {number} millisecond Point on the timeline to query.
   * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
   * lookup to a particular track.
   * @return {boolean} Whether or not the actor has any {@link
   * rekapi.KeyframeProperty}s set at `millisecond`.
   */
  hasKeyframeAt (millisecond, trackName = undefined) {
    const { _propertyTracks } = this;

    if (trackName && !_propertyTracks[trackName]) {
      return false;
    }

    const propertyTracks = trackName ?
      pick(_propertyTracks, [trackName]) :
      _propertyTracks;

    return Object.keys(propertyTracks).some(track =>
      propertyTracks.hasOwnProperty(track) &&
      !!this.getKeyframeProperty(track, millisecond)
    );
  }

  /**
   * Copies all of the {@link rekapi.KeyframeProperty}s from one point on the
   * actor's timeline to another. This is particularly useful for animating an
   * actor back to its original position.
   *
   *     actor
   *       .keyframe(0, {
   *         x: 10,
   *         y: 15
   *       }).keyframe(1000, {
   *         x: 50,
   *         y: 75
   *       });
   *
   *     // Return the actor to its original position
   *     actor.copyKeyframe(0, 2000);
   *
   * @method rekapi.Actor#copyKeyframe
   * @param {number} copyFrom The timeline millisecond to copy {@link
   * rekapi.KeyframeProperty}s from.
   * @param {number} copyTo The timeline millisecond to copy {@link
   * rekapi.KeyframeProperty}s to.
   * @return {rekapi.Actor}
   */
  copyKeyframe (copyFrom, copyTo) {
    // Build the configuation objects to be passed to Actor#keyframe
    const sourcePositions = {};
    const sourceEasings = {};

    each(this._propertyTracks, (propertyTrack, trackName) => {
      const keyframeProperty =
        this.getKeyframeProperty(trackName, copyFrom);

      if (keyframeProperty) {
        sourcePositions[trackName] = keyframeProperty.value;
        sourceEasings[trackName] = keyframeProperty.easing;
      }
    });

    this.keyframe(copyTo, sourcePositions, sourceEasings);

    return this;
  }

  /**
   * Moves all of the {@link rekapi.KeyframeProperty}s from one point on the
   * actor's timeline to another.  Although this method does error checking for
   * you to make sure the operation can be safely performed, an effective
   * pattern is to use {@link rekapi.Actor#hasKeyframeAt} to see if there is
   * already a keyframe at the requested `to` destination.
   *
   * @method rekapi.Actor#moveKeyframe
   * @param {number} from The millisecond of the keyframe to be moved.
   * @param {number} to The millisecond of where the keyframe should be moved
   * to.
   * @return {boolean} Whether or not the keyframe was successfully moved.
   */
  moveKeyframe (from, to) {
    if (!this.hasKeyframeAt(from) || this.hasKeyframeAt(to)) {
      return false;
    }

    // Move each of the relevant KeyframeProperties to the new location in the
    // timeline
    each(this._propertyTracks, (propertyTrack, trackName) => {
      const oldIndex = propertyIndexInTrack(propertyTrack, from);

      if (oldIndex !== -1) {
        propertyTrack[oldIndex].millisecond = to;
      }
    });

    cleanupAfterKeyframeModification(this);

    return true;
  }

  /**
   * Augment the `value` or `easing` of the {@link rekapi.KeyframeProperty}s
   * at a given millisecond.  Any {@link rekapi.KeyframeProperty}s omitted in
   * `state` or `easing` are not modified.
   *
   *     actor.keyframe(0, {
   *       'x': 10,
   *       'y': 20
   *     }).keyframe(1000, {
   *       'x': 20,
   *       'y': 40
   *     }).keyframe(2000, {
   *       'x': 30,
   *       'y': 60
   *     })
   *
   *     // Changes the state of the keyframe at millisecond 1000.
   *     // Modifies the value of 'y' and the easing of 'x.'
   *     actor.modifyKeyframe(1000, {
   *       'y': 150
   *     }, {
   *       'x': 'easeFrom'
   *     });
   *
   * @method rekapi.Actor#modifyKeyframe
   * @param {number} millisecond
   * @param {Object} state
   * @param {Object} [easing={}]
   * @return {rekapi.Actor}
   */
  modifyKeyframe (millisecond, state, easing = {}) {
    each(this._propertyTracks, (propertyTrack, trackName) => {
      const property = this.getKeyframeProperty(trackName, millisecond);

      if (property) {
        property.modifyWith({
          value: state[trackName],
          easing: easing[trackName]
        });
      } else if (state[trackName]) {
        this.addKeyframeProperty(
          new KeyframeProperty(
            millisecond,
            trackName,
            state[trackName],
            easing[trackName]
          )
        );
      }
    });

    cleanupAfterKeyframeModification(this);

    return this;
  }

  /**
   * Remove all {@link rekapi.KeyframeProperty}s set
   * on the actor at a given millisecond in the animation.
   *
   * @method rekapi.Actor#removeKeyframe
   * @param {number} millisecond The location on the timeline of the keyframe
   * to remove.
   * @return {rekapi.Actor}
   * @fires rekapi.timelineModified
   */
  removeKeyframe (millisecond) {
    each(this._propertyTracks, (propertyTrack, propertyName) => {
      const index = propertyIndexInTrack(propertyTrack, millisecond);

      if (index !== -1) {
        const keyframeProperty = propertyTrack[index];
        this._deleteKeyframePropertyAt(propertyTrack, index);
        keyframeProperty.detach();
      }
    });

    removeEmptyPropertyTracks(this);
    cleanupAfterKeyframeModification(this);
    fire(this, 'timelineModified');

    return this;
  }

  /**
   * Remove all {@link rekapi.KeyframeProperty}s set
   * on the actor.
   *
   * **NOTE**: This method does _not_ fire the `beforeRemoveKeyframeProperty`
   * or `removeKeyframePropertyComplete` events.  This method is a bulk
   * operation that is more efficient than calling {@link
   * rekapi.Actor#removeKeyframeProperty} many times individually, but
   * foregoes firing events.
   *
   * @method rekapi.Actor#removeAllKeyframes
   * @return {rekapi.Actor}
   */
  removeAllKeyframes () {
    each(this._propertyTracks, propertyTrack =>
      propertyTrack.length = 0
    );

    each(this._keyframeProperties, keyframeProperty =>
      keyframeProperty.detach()
    );

    removeEmptyPropertyTracks(this);
    this._keyframeProperties = {};

    // Calling removeKeyframe performs some necessary post-removal cleanup, the
    // earlier part of this method skipped all of that for the sake of
    // efficiency.
    return this.removeKeyframe(0);
  }

  /**
   * @method rekapi.Actor#getKeyframeProperty
   * @param {string} property The name of the property track.
   * @param {number} millisecond The millisecond of the property in the
   * timeline.
   * @return {(rekapi.KeyframeProperty|undefined)} A {@link
   * rekapi.KeyframeProperty} that is stored on the actor, as specified by the
   * `property` and `millisecond` parameters. This is `undefined` if no
   * properties were found.
   */
  getKeyframeProperty (property, millisecond) {
    const propertyTrack = this._propertyTracks[property];

    return propertyTrack[propertyIndexInTrack(propertyTrack, millisecond)];
  }

  /**
   * Modify a {@link rekapi.KeyframeProperty} stored on an actor.
   * Internally, this calls {@link rekapi.KeyframeProperty#modifyWith} and
   * then performs some cleanup.
   *
   * @method rekapi.Actor#modifyKeyframeProperty
   * @param {string} property The name of the {@link rekapi.KeyframeProperty}
   * to modify.
   * @param {number} millisecond The timeline millisecond of the {@link
   * rekapi.KeyframeProperty} to modify.
   * @param {Object} newProperties The properties to augment the {@link
   * rekapi.KeyframeProperty} with.
   * @return {rekapi.Actor}
   */
  modifyKeyframeProperty (property, millisecond, newProperties) {
    const keyframeProperty = this.getKeyframeProperty(property, millisecond);

    if (keyframeProperty) {
      if ('millisecond' in newProperties &&
          this.hasKeyframeAt(newProperties.millisecond, property)
        ) {
        throw new Error(
          `Tried to move ${property} to ${newProperties.millisecond}ms, but a keyframe property already exists there`
        );
      }

      keyframeProperty.modifyWith(newProperties);
      cleanupAfterKeyframeModification(this);
    }

    return this;
  }

  /**
   * Remove a single {@link rekapi.KeyframeProperty}
   * from the actor.
   * @method rekapi.Actor#removeKeyframeProperty
   * @param {string} property The name of the {@link rekapi.KeyframeProperty}
   * to remove.
   * @param {number} millisecond Where in the timeline the {@link
   * rekapi.KeyframeProperty} to remove is.
   * @return {(rekapi.KeyframeProperty|undefined)} The removed
   * KeyframeProperty, if one was found.
   * @fires rekapi.beforeRemoveKeyframeProperty
   * @fires rekapi.removeKeyframePropertyComplete
   */
  removeKeyframeProperty (property, millisecond) {
    const { _propertyTracks } = this;

    if (_propertyTracks[property]) {
      const propertyTrack = _propertyTracks[property];
      const index = propertyIndexInTrack(propertyTrack, millisecond);
      const keyframeProperty = propertyTrack[index];

      fire(this, 'beforeRemoveKeyframeProperty', keyframeProperty);
      this._deleteKeyframePropertyAt(propertyTrack, index);
      keyframeProperty.detach();

      removeEmptyPropertyTracks(this);
      cleanupAfterKeyframeModification(this);
      fire(this, 'removeKeyframePropertyComplete', keyframeProperty);

      return keyframeProperty;
    }
  }

  /**
   *
   * @method rekapi.Actor#getTrackNames
   * @return {Array.<rekapi.KeyframeProperty#name>} A list of all the track
   * names for a {@link rekapi.Actor}.
   */
  getTrackNames () {
    return Object.keys(this._propertyTracks);
  }

  /**
   * Get all of the {@link rekapi.KeyframeProperty}s for a track.
   * @method rekapi.Actor#getPropertiesInTrack
   * @param {rekapi.KeyframeProperty#name} trackName The track name to query.
   * @return {Array(rekapi.KeyframeProperty)}
   */
  getPropertiesInTrack (trackName) {
    return (this._propertyTracks[trackName] || []).slice(0);
  }

  /**
   * @method rekapi.Actor#getStart
   * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
   * lookup to a particular track.
   * @return {number} The millisecond of the first animating state of a {@link
   * rekapi.Actor} (for instance, if the first keyframe is later than
   * millisecond `0`).  If there are no keyframes, this is `0`.
   */
  getStart (trackName = undefined) {
    const { _propertyTracks } = this;
    const starts = [];

    // Null check to see if trackName was provided and is valid
    if (_propertyTracks.hasOwnProperty(trackName)) {
      const firstKeyframeProperty = _propertyTracks[trackName][0];

      if (firstKeyframeProperty) {
        starts.push(firstKeyframeProperty.millisecond);
      }
    } else {
      // Loop over all property tracks and accumulate the first
      // keyframeProperties from non-empty tracks
      each(_propertyTracks, propertyTrack => {
        if (propertyTrack.length) {
          starts.push(propertyTrack[0].millisecond);
        }
      });
    }

    return starts.length > 0 ?
      Math.min.apply(Math, starts) :
      0;
  }

  /**
   * @method rekapi.Actor#getEnd
   * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
   * lookup to a particular keyframe track.
   * @return {number} The millisecond of the last state of an actor (the point
   * in the timeline in which it is done animating).  If there are no
   * keyframes, this is `0`.
   */
  getEnd (trackName = undefined) {
    const endingTracks = [0];

    const tracksToInspect = trackName ?
      { [trackName]: this._propertyTracks[trackName] } :
      this._propertyTracks;

    each(tracksToInspect, propertyTrack => {
      if (propertyTrack.length) {
        endingTracks.push(propertyTrack[propertyTrack.length - 1].millisecond);
      }
    });

    return Math.max.apply(Math, endingTracks);
  }

  /**
   * @method rekapi.Actor#getLength
   * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
   * lookup to a particular track.
   * @return {number} The length of time in milliseconds that the actor
   * animates for.
   */
  getLength (trackName = undefined) {
    return this.getEnd(trackName) - this.getStart(trackName);
  }

  /**
   * Extend the last state on this actor's timeline to simulate a pause.
   * Internally, this method copies the final state of the actor in the
   * timeline to the millisecond defined by `until`.
   *
   * @method rekapi.Actor#wait
   * @param {number} until At what point in the animation the Actor should wait
   * until (relative to the start of the animation timeline).  If this number
   * is less than the value returned from {@link rekapi.Actor#getLength},
   * this method does nothing.
   * @return {rekapi.Actor}
   */
  wait (until) {
    const end = this.getEnd();

    if (until <= end) {
      return this;
    }

    const latestProps = getLatestProperties(this, this.getEnd());
    const serializedProps = {};
    const serializedEasings = {};

    each(latestProps, (latestProp, propName) => {
      serializedProps[propName] = latestProp.value;
      serializedEasings[propName] = latestProp.easing;
    });

    this.modifyKeyframe(end, serializedProps, serializedEasings);
    this.keyframe(until, serializedProps, serializedEasings);

    return this;
  }

  /*!
   * Insert a `KeyframeProperty` into a property track at `index`.  The linked
   * list structure of the property track is maintained.
   * @method rekapi.Actor#_insertKeyframePropertyAt
   * @param {KeyframeProperty} keyframeProperty
   * @param {Array(KeyframeProperty)} propertyTrack
   * @param {number} index
   */
  _insertKeyframePropertyAt (keyframeProperty, propertyTrack, index) {
    propertyTrack.splice(index, 0, keyframeProperty);
  }

  /*!
   * Remove the `KeyframeProperty` at `index` from a property track.  The linked
   * list structure of the property track is maintained.  The removed property
   * is not modified or unlinked internally.
   * @method rekapi.Actor#_deleteKeyframePropertyAt
   * @param {Array(KeyframeProperty)} propertyTrack
   * @param {number} index
   */
  _deleteKeyframePropertyAt (propertyTrack, index) {
    propertyTrack.splice(index, 1);
  }

  /**
   * Associate a {@link rekapi.KeyframeProperty} to this {@link rekapi.Actor}.
   * Updates {@link rekapi.KeyframeProperty#actor} to maintain a link between
   * the two objects.  This is a lower-level method and it is generally better
   * to use {@link rekapi.Actor#keyframe}.  This is mostly useful for adding a
   * {@link rekapi.KeyframeProperty} back to an actor after it was {@link
   * rekapi.KeyframeProperty#detach}ed.
   * @method rekapi.Actor#addKeyframeProperty
   * @param {rekapi.KeyframeProperty} keyframeProperty
   * @return {rekapi.Actor}
   * @fires rekapi.beforeAddKeyframeProperty
   * @fires rekapi.addKeyframePropertyTrack
   * @fires rekapi.addKeyframeProperty
   */
  addKeyframeProperty (keyframeProperty) {
    if (this.rekapi) {
      fire(this, 'beforeAddKeyframeProperty', keyframeProperty);
    }

    keyframeProperty.actor = this;
    this._keyframeProperties[keyframeProperty.id] = keyframeProperty;

    const { name } = keyframeProperty;
    const { _propertyTracks, rekapi } = this;

    if (!this._propertyTracks[name]) {
      _propertyTracks[name] = [keyframeProperty];

      if (rekapi) {
        fire(this, 'addKeyframePropertyTrack', keyframeProperty);
      }
    } else {
      const index = insertionPointInTrack(_propertyTracks[name], keyframeProperty.millisecond);

      if (_propertyTracks[name][index]) {
        const newMillisecond = keyframeProperty.millisecond;
        const targetMillisecond = _propertyTracks[name][index].millisecond;

        if (targetMillisecond === newMillisecond) {
          throw new Error(
            `Cannot add duplicate ${name} keyframe property @ ${newMillisecond}ms`
          );
        } else if (rekapi && rekapi._warnOnOutOfOrderKeyframes) {
          console.warn(
            new Error(
              `Added a keyframe property before end of ${name} track @ ${newMillisecond}ms (< ${targetMillisecond}ms)`
            )
          );
        }
      }

      this._insertKeyframePropertyAt(keyframeProperty, _propertyTracks[name], index);
      cleanupAfterKeyframeModification(this);
    }

    if (rekapi) {
      fire(this, 'addKeyframeProperty', keyframeProperty);
    }

    return this;
  }

  /*!
   * TODO: Explain the use case for this method
   * Set the actor to be active or inactive starting at `millisecond`.
   * @method rekapi.Actor#setActive
   * @param {number} millisecond The time at which to change the actor's active state
   * @param {boolean} isActive Whether the actor should be active or inactive
   * @return {rekapi.Actor}
   */
  setActive (millisecond, isActive) {
    const hasActiveTrack = !!this._propertyTracks._active;
    const activeProperty = hasActiveTrack
        && this.getKeyframeProperty('_active', millisecond);

    if (activeProperty) {
      activeProperty.value = isActive;
    } else {
      this.addKeyframeProperty(
        new KeyframeProperty(millisecond, '_active', isActive)
      );
    }

    return this;
  }

  /*!
   * Calculate and set the actor's position at `millisecond` in the animation.
   * @method rekapi.Actor#_updateState
   * @param {number} millisecond
   * @param {boolean} [resetLaterFnKeyframes] If true, allow all function
   * keyframes later in the timeline to be run again.
   */
  _updateState (millisecond, resetLaterFnKeyframes = false) {
    const start = this.getStart();
    const end = this.getEnd();
    const interpolatedObject = {};

    millisecond = Math.min(end, millisecond);

    ensurePropertyCacheValid(this);

    const propertyCacheEntry = clone(
      getPropertyCacheEntryForMillisecond(this, millisecond)
    );

    delete propertyCacheEntry._millisecond;

    // All actors are active at time 0 unless otherwise specified;
    // make sure a future time deactivation doesn't deactive the actor
    // by default.
    if (propertyCacheEntry._active
        && millisecond >= propertyCacheEntry._active.millisecond) {

      this.wasActive = propertyCacheEntry._active.getValueAt(millisecond);

      if (!this.wasActive) {
        return this;
      }
    } else {
      this.wasActive = true;
    }

    if (start === end) {
      // If there is only one keyframe, use that for the state of the actor
      each(propertyCacheEntry, (keyframeProperty, propName) => {
        if (keyframeProperty.shouldInvokeForMillisecond(millisecond)) {
          keyframeProperty.invoke();
          keyframeProperty.hasFired = false;
          return;
        }

        interpolatedObject[propName] = keyframeProperty.value;
      });

    } else {
      each(propertyCacheEntry, (keyframeProperty, propName) => {
        if (this._beforeKeyframePropertyInterpolate !== noop) {
          this._beforeKeyframePropertyInterpolate(keyframeProperty);
        }

        if (keyframeProperty.shouldInvokeForMillisecond(millisecond)) {
          keyframeProperty.invoke();
          return;
        }

        interpolatedObject[propName] =
          keyframeProperty.getValueAt(millisecond);

        if (this._afterKeyframePropertyInterpolate !== noop) {
          this._afterKeyframePropertyInterpolate(
            keyframeProperty, interpolatedObject);
        }
      });
    }

    this.set(interpolatedObject);

    if (!resetLaterFnKeyframes) {
      this._resetFnKeyframesFromMillisecond(millisecond);
    }

    return this;
  }

  /*!
   * @method rekapi.Actor#_resetFnKeyframesFromMillisecond
   * @param {number} millisecond
   */
  _resetFnKeyframesFromMillisecond (millisecond) {
    const cache = this._timelineFunctionCache;
    const { length } = cache;
    let index = sortedIndexBy(cache, { millisecond: millisecond }, getMillisecond);

    while (index < length) {
      cache[index++].hasFired = false;
    }
  }

  /**
   * Export this {@link rekapi.Actor} to a `JSON.stringify`-friendly `Object`.
   * @method rekapi.Actor#exportTimeline
   * @param {Object} [config]
   * @param {boolean} [config.withId=false] If `true`, include internal `id`
   * values in exported data.
   * @return {rekapi.actorData} This data can later be consumed by {@link
   * rekapi.Actor#importTimeline}.
   */
  exportTimeline ({ withId = false } = {}) {
    const exportData = {
      start: this.getStart(),
      end: this.getEnd(),
      trackNames: this.getTrackNames(),
      propertyTracks: {}
    };

    if (withId) {
      exportData.id = this.id;
    }

    each(this._propertyTracks, (propertyTrack, trackName) => {
      const track = [];

      propertyTrack.forEach(keyframeProperty => {
        track.push(keyframeProperty.exportPropertyData({ withId }));
      });

      exportData.propertyTracks[trackName] = track;
    });

    return exportData;
  }

  /**
   * Import an Object to augment this actor's state.  This does not remove
   * keyframe properties before importing new ones.
   * @method rekapi.Actor#importTimeline
   * @param {rekapi.actorData} actorData Any object that has the same data
   * format as the object generated from {@link rekapi.Actor#exportTimeline}.
   */
  importTimeline (actorData) {
    each(actorData.propertyTracks, propertyTrack => {
      propertyTrack.forEach(property => {
        this.keyframe(
          property.millisecond,
          { [property.name]: property.value },
          property.easing
        );
      });
    });
  }
}

Object.assign(Actor.prototype, {
  /*!
   * @method rekapi.Actor#_beforeKeyframePropertyInterpolate
   * @param {KeyframeProperty} keyframeProperty
   * @abstract
   */
  _beforeKeyframePropertyInterpolate: noop,

  /*!
   * @method rekapi.Actor#_afterKeyframePropertyInterpolate
   * @param {KeyframeProperty} keyframeProperty
   * @param {Object} interpolatedObject
   * @abstract
   */
  _afterKeyframePropertyInterpolate: noop
});

const UPDATE_TIME = 1000 / 60;

const DEFAULT_EASING = 'linear';

/*!
 * Fire an event bound to a Rekapi.
 * @param {Rekapi} rekapi
 * @param {string} eventName
 * @param {Object} [data={}] Optional event-specific data
 */
const fireEvent = (rekapi, eventName, data = {}) =>
  rekapi._events[eventName].forEach(handler => handler(rekapi, data));

/*!
 * @param {Rekapi} rekapi
 */
const invalidateAnimationLength = rekapi =>
  rekapi._animationLengthValid = false;

/*!
 * Determines which iteration of the loop the animation is currently in.
 * @param {Rekapi} rekapi
 * @param {number} timeSinceStart
 */
const determineCurrentLoopIteration = (rekapi, timeSinceStart) => {
  const animationLength = rekapi.getAnimationLength();

  if (animationLength === 0) {
    return timeSinceStart;
  }

  return Math.floor(timeSinceStart / animationLength);
};

/*!
 * Calculate how many milliseconds since the animation began.
 * @param {Rekapi} rekapi
 * @return {number}
 */
const calculateTimeSinceStart = rekapi =>
  Tweenable.now() - rekapi._loopTimestamp;

/*!
 * Determines if the animation is complete or not.
 * @param {Rekapi} rekapi
 * @param {number} currentLoopIteration
 * @return {boolean}
 */
const isAnimationComplete = (rekapi, currentLoopIteration) =>
  currentLoopIteration >= rekapi._timesToIterate
    && rekapi._timesToIterate !== -1;

/*!
 * Stops the animation if it is complete.
 * @param {Rekapi} rekapi
 * @param {number} currentLoopIteration
 * @fires rekapi.animationComplete
 */
const updatePlayState = (rekapi, currentLoopIteration) => {
  if (isAnimationComplete(rekapi, currentLoopIteration)) {
    rekapi.stop();
    fireEvent(rekapi, 'animationComplete');
  }
};

/*!
 * Calculate how far in the animation loop `rekapi` is, in milliseconds,
 * based on the current time.  Also overflows into a new loop if necessary.
 * @param {Rekapi} rekapi
 * @param {number} forMillisecond
 * @param {number} currentLoopIteration
 * @return {number}
 */
const calculateLoopPosition = (rekapi, forMillisecond, currentLoopIteration) => {
  const animationLength = rekapi.getAnimationLength();

  return animationLength === 0 ?
    0 :
    isAnimationComplete(rekapi, currentLoopIteration) ?
      animationLength :
      forMillisecond % animationLength;
};

/*!
 * Calculate the timeline position and state for a given millisecond.
 * Updates the `rekapi` state internally and accounts for how many loop
 * iterations the animation runs for.
 * @param {Rekapi} rekapi
 * @param {number} forMillisecond
 * @fires rekapi.animationLooped
 */
const updateToMillisecond = (rekapi, forMillisecond) => {
  const currentIteration = determineCurrentLoopIteration(rekapi, forMillisecond);
  const loopPosition = calculateLoopPosition(
    rekapi, forMillisecond, currentIteration
  );

  rekapi._loopPosition = loopPosition;

  const keyframeResetList = [];

  if (currentIteration > rekapi._latestIteration) {
    fireEvent(rekapi, 'animationLooped');

    rekapi._actors.forEach(actor => {

      const { _keyframeProperties } = actor;
      const fnKeyframes = Object.keys(_keyframeProperties).reduce(
        (acc, propertyId) => {
          const property = _keyframeProperties[propertyId];

          if (property.name === 'function') {
            acc.push(property);
          }

          return acc;
        },
        []
      );

      const lastFnKeyframe = fnKeyframes[fnKeyframes.length - 1];

      if (lastFnKeyframe && !lastFnKeyframe.hasFired) {
        lastFnKeyframe.invoke();
      }

      keyframeResetList.push(...fnKeyframes);
    });
  }

  rekapi._latestIteration = currentIteration;
  rekapi.update(loopPosition, true);
  updatePlayState(rekapi, currentIteration);

  keyframeResetList.forEach(fnKeyframe => {
    fnKeyframe.hasFired = false;
  });
};

/*!
 * Calculate how far into the animation loop `rekapi` is, in milliseconds,
 * and update based on that time.
 * @param {Rekapi} rekapi
 */
const updateToCurrentMillisecond = rekapi =>
  updateToMillisecond(rekapi, calculateTimeSinceStart(rekapi));

/*!
 * This is the heartbeat of an animation.  This updates `rekapi`'s state and
 * then calls itself continuously.
 * @param {Rekapi} rekapi
 */
const tick = rekapi =>
  // Need to check for .call presence to get around an IE limitation.  See
  // annotation for cancelLoop for more info.
  rekapi._loopId = rekapi._scheduleUpdate.call ?
    rekapi._scheduleUpdate.call(window, rekapi._updateFn, UPDATE_TIME) :
    setTimeout(rekapi._updateFn, UPDATE_TIME);

/*!
 * @return {Function}
 */
const getUpdateMethod = () =>
  // requestAnimationFrame() shim by Paul Irish (modified for Rekapi)
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  (window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) ||
  window.setTimeout;

/*!
 * @return {Function}
 */
const getCancelMethod = () =>
  window.cancelAnimationFrame           ||
  window.webkitCancelAnimationFrame     ||
  window.oCancelAnimationFrame          ||
  window.msCancelAnimationFrame         ||
  window.mozCancelRequestAnimationFrame ||
  window.clearTimeout;

/*!
 * Cancels an update loop.  This abstraction is needed to get around the fact
 * that in IE, clearTimeout is not technically a function
 * (https://twitter.com/kitcambridge/status/206655060342603777) and thus
 * Function.prototype.call cannot be used upon it.
 * @param {Rekapi} rekapi
 */
const cancelLoop = rekapi =>
  rekapi._cancelUpdate.call ?
    rekapi._cancelUpdate.call(window, rekapi._loopId) :
    clearTimeout(rekapi._loopId);

const STOPPED = 'stopped';
const PAUSED = 'paused';
const PLAYING = 'playing';

/*!
 * @type {Object.<function>} Contains the context init function to be called in
 * the Rekapi constructor.  This array is populated by modules in the
 * renderers/ directory.
 */
const rendererBootstrappers = [];

/**
 * If this is a rendered animation, the appropriate renderer is accessible as
 * `this.renderer`.  If provided, a reference to `context` is accessible
 * as `this.context`.
 * @param {(Object|CanvasRenderingContext2D|HTMLElement)} [context={}] Sets
 * {@link rekapi.Rekapi#context}. This determines how to render the animation.
 * {@link rekapi.Rekapi} will also automatically set up all necessary {@link
 * rekapi.Rekapi#renderers} based on this value:
 *
 * * If this is not provided or is a plain object (`{}`), the animation will
 * not render anything and {@link rekapi.Rekapi#renderers} will be empty.
 * * If this is a
 * [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D),
 * {@link rekapi.Rekapi#renderers} will contain a {@link
 * rekapi.CanvasRenderer}.
 * * If this is a DOM element, {@link rekapi.Rekapi#renderers} will contain a
 * {@link rekapi.DOMRenderer}.
 * @constructs rekapi.Rekapi
 */
class Rekapi {
  constructor (context = {}) {
    /**
     * @member {(Object|CanvasRenderingContext2D|HTMLElement)}
     * rekapi.Rekapi#context The rendering context for an animation.
     * @default {}
     */
    this.context = context;
    this._actors = [];
    this._playState = STOPPED;

    /**
     * @member {(rekapi.actorSortFunction|null)} rekapi.Rekapi#sort Optional
     * function for sorting the render order of {@link rekapi.Actor}s.  If set,
     * this is called each frame before the {@link rekapi.Actor}s are rendered.
     * If not set, {@link rekapi.Actor}s will render in the order they were
     * added via {@link rekapi.Rekapi#addActor}.
     *
     * The following example assumes that all {@link rekapi.Actor}s are circles
     * that have a `radius` {@link rekapi.KeyframeProperty}.  The circles will
     * be rendered in order of the value of their `radius`, from smallest to
     * largest.  This has the effect of layering larger circles on top of
     * smaller circles, thus giving a sense of perspective.
     *
     *     const rekapi = new Rekapi();
     *     rekapi.sort = actor => actor.get().radius;
     * @default null
     */
    this.sort = null;

    this._events = {
      animationComplete: [],
      playStateChange: [],
      play: [],
      pause: [],
      stop: [],
      beforeUpdate: [],
      afterUpdate: [],
      addActor: [],
      removeActor: [],
      beforeAddKeyframeProperty: [],
      addKeyframeProperty: [],
      removeKeyframeProperty: [],
      removeKeyframePropertyComplete: [],
      beforeRemoveKeyframeProperty: [],
      addKeyframePropertyTrack: [],
      removeKeyframePropertyTrack: [],
      timelineModified: [],
      animationLooped: []
    };

    // How many times to loop the animation before stopping
    this._timesToIterate = -1;

    // Millisecond duration of the animation
    this._animationLength = 0;
    this._animationLengthValid = false;

    // The setTimeout ID of `tick`
    this._loopId = null;

    // The UNIX time at which the animation loop started
    this._loopTimestamp = null;

    // Used for maintaining position when the animation is paused
    this._pausedAtTime = null;

    // The last millisecond position that was updated
    this._lastUpdatedMillisecond = 0;

    // The most recent loop iteration a frame was calculated for
    this._latestIteration = 0;

    // The most recent millisecond position within the loop that the animation
    // was updated to
    this._loopPosition = null;

    this._scheduleUpdate = getUpdateMethod();
    this._cancelUpdate = getCancelMethod();

    this._updateFn = () => {
      tick(this);
      updateToCurrentMillisecond(this);
    };

    /**
     * @member {Array.<rekapi.renderer>} rekapi.Rekapi#renderers Instances of
     * {@link rekapi.renderer} classes, as inferred by the `context`
     * parameter provided to the {@link rekapi.Rekapi} constructor.  You can
     * add more renderers to this list manually; see the {@tutorial
     * multiple-renderers} tutorial for an example.
     */
    this.renderers = rendererBootstrappers
      .map(renderer => renderer(this))
      .filter(_ => _);
  }

  /**
   * Add a {@link rekapi.Actor} to the animation.  Decorates the added {@link
   * rekapi.Actor} with a reference to this {@link rekapi.Rekapi} instance as
   * {@link rekapi.Actor#rekapi}.
   *
   * @method rekapi.Rekapi#addActor
   * @param {(rekapi.Actor|Object)} [actor={}] If this is an `Object`, it is used to as
   * the constructor parameters for a new {@link rekapi.Actor} instance that
   * is created by this method.
   * @return {rekapi.Actor} The {@link rekapi.Actor} that was added.
   * @fires rekapi.addActor
   */
  addActor (actor = {}) {
    const rekapiActor = actor instanceof Actor ?
      actor :
      new Actor(actor);

    // You can't add an actor more than once.
    if (~this._actors.indexOf(rekapiActor)) {
      return rekapiActor;
    }

    rekapiActor.context = rekapiActor.context || this.context;
    rekapiActor.rekapi = this;

    // Store a reference to the actor internally
    this._actors.push(rekapiActor);

    invalidateAnimationLength(this);
    rekapiActor.setup();

    fireEvent(this, 'addActor', rekapiActor);

    return rekapiActor;
  }

  /**
   * @method rekapi.Rekapi#getActor
   * @param {number} actorId
   * @return {rekapi.Actor} A reference to an actor from the animation by its
   * `id`.  You can use {@link rekapi.Rekapi#getActorIds} to get a list of IDs
   * for all actors in the animation.
   */
  getActor (actorId) {
    return this._actors.filter(actor => actor.id === actorId)[0];
  }

  /**
   * @method rekapi.Rekapi#getActorIds
   * @return {Array.<number>} The `id`s of all {@link rekapi.Actor}`s in the
   * animation.
   */
  getActorIds () {
    return this._actors.map(actor => actor.id);
  }

  /**
   * @method rekapi.Rekapi#getAllActors
   * @return {Array.<rekapi.Actor>} All {@link rekapi.Actor}s in the animation.
   */
  getAllActors () {
    return this._actors.slice();
  }

  /**
   * @method rekapi.Rekapi#getActorCount
   * @return {number} The number of {@link rekapi.Actor}s in the animation.
   */
  getActorCount () {
    return this._actors.length;
  }

  /**
   * Remove an actor from the animation.  This does not destroy the actor, it
   * only removes the link between it and this {@link rekapi.Rekapi} instance.
   * This method calls the actor's {@link rekapi.Actor#teardown} method, if
   * defined.
   * @method rekapi.Rekapi#removeActor
   * @param {rekapi.Actor} actor
   * @return {rekapi.Actor} The {@link rekapi.Actor} that was removed.
   * @fires rekapi.removeActor
   */
  removeActor (actor) {
    // Remove the link between Rekapi and actor
    this._actors = without(this._actors, actor);
    delete actor.rekapi;

    actor.teardown();
    invalidateAnimationLength(this);

    fireEvent(this, 'removeActor', actor);

    return actor;
  }

  /**
   * Remove all {@link rekapi.Actor}s from the animation.
   * @method rekapi.Rekapi#removeAllActors
   * @return {Array.<rekapi.Actor>} The {@link rekapi.Actor}s that were
   * removed.
   */
  removeAllActors () {
    return this.getAllActors().map(actor => this.removeActor(actor));
  }

  /**
   * Play the animation.
   *
   * @method rekapi.Rekapi#play
   * @param {number} [iterations=-1] If omitted, the animation will loop
   * endlessly.
   * @return {rekapi.Rekapi}
   * @fires rekapi.playStateChange
   * @fires rekapi.play
   */
  play (iterations = -1) {
    cancelLoop(this);

    if (this._playState === PAUSED) {
      // Move the playhead to the correct position in the timeline if resuming
      // from a pause
      this._loopTimestamp += Tweenable.now() - this._pausedAtTime;
    } else {
      this._loopTimestamp = Tweenable.now();
    }

    this._timesToIterate = iterations;
    this._playState = PLAYING;

    // Start the update loop
    tick(this);

    fireEvent(this, 'playStateChange');
    fireEvent(this, 'play');

    return this;
  }

  /**
   * Move to a specific millisecond on the timeline and play from there.
   *
   * @method rekapi.Rekapi#playFrom
   * @param {number} millisecond
   * @param {number} [iterations] Works as it does in {@link
   * rekapi.Rekapi#play}.
   * @return {rekapi.Rekapi}
   */
  playFrom (millisecond, iterations) {
    this.play(iterations);
    this._loopTimestamp = Tweenable.now() - millisecond;

    this._actors.forEach(
      actor => actor._resetFnKeyframesFromMillisecond(millisecond)
    );

    return this;
  }

  /**
   * Play from the last frame that was rendered with {@link
   * rekapi.Rekapi#update}.
   *
   * @method rekapi.Rekapi#playFromCurrent
   * @param {number} [iterations] Works as it does in {@link
   * rekapi.Rekapi#play}.
   * @return {rekapi.Rekapi}
   */
  playFromCurrent (iterations) {
    return this.playFrom(this._lastUpdatedMillisecond, iterations);
  }

  /**
   * Pause the animation.  A "paused" animation can be resumed from where it
   * left off with {@link rekapi.Rekapi#play}.
   *
   * @method rekapi.Rekapi#pause
   * @return {rekapi.Rekapi}
   * @fires rekapi.playStateChange
   * @fires rekapi.pause
   */
  pause () {
    if (this._playState === PAUSED) {
      return this;
    }

    this._playState = PAUSED;
    cancelLoop(this);
    this._pausedAtTime = Tweenable.now();

    fireEvent(this, 'playStateChange');
    fireEvent(this, 'pause');

    return this;
  }

  /**
   * Stop the animation.  A "stopped" animation will start from the beginning
   * if {@link rekapi.Rekapi#play} is called.
   *
   * @method rekapi.Rekapi#stop
   * @return {rekapi.Rekapi}
   * @fires rekapi.playStateChange
   * @fires rekapi.stop
   */
  stop () {
    this._playState = STOPPED;
    cancelLoop(this);

    // Also kill any shifty tweens that are running.
    this._actors.forEach(actor =>
      actor._resetFnKeyframesFromMillisecond(0)
    );

    fireEvent(this, 'playStateChange');
    fireEvent(this, 'stop');

    return this;
  }

  /**
   * @method rekapi.Rekapi#isPlaying
   * @return {boolean} Whether or not the animation is playing (meaning not paused or
   * stopped).
   */
  isPlaying () {
    return this._playState === PLAYING;
  }

  /**
   * @method rekapi.Rekapi#isPaused
   * @return {boolean} Whether or not the animation is paused (meaning not playing or
   * stopped).
   */
  isPaused () {
    return this._playState === PAUSED;
  }

  /**
   * @method rekapi.Rekapi#isStopped
   * @return {boolean} Whether or not the animation is stopped (meaning not playing or
   * paused).
   */
  isStopped () {
    return this._playState === STOPPED;
  }

  /**
   * Render an animation frame at a specific point in the timeline.
   *
   * @method rekapi.Rekapi#update
   * @param {number} [millisecond=this._lastUpdatedMillisecond] The point in
   * the timeline at which to render.  If omitted, this renders the last
   * millisecond that was rendered (it's a re-render).
   * @param {boolean} [doResetLaterFnKeyframes=false] If `true`, allow all
   * {@link rekapi.keyframeFunction}s later in the timeline to be run again.
   * This is a low-level feature, it should not be `true` (or even provided)
   * for most use cases.
   * @return {rekapi.Rekapi}
   * @fires rekapi.beforeUpdate
   * @fires rekapi.afterUpdate
   */
  update (
    millisecond = this._lastUpdatedMillisecond,
    doResetLaterFnKeyframes = false
  ) {
    fireEvent(this, 'beforeUpdate');

    const { sort } = this;

    const renderOrder = sort ?
      this._actors.sort((a, b) => sort(a) - sort(b)) :
      this._actors;

    // Update and render each of the actors
    renderOrder.forEach(actor => {
      actor._updateState(millisecond, doResetLaterFnKeyframes);

      if (actor.wasActive) {
        actor.render(actor.context, actor.get());
      }
    });

    this._lastUpdatedMillisecond = millisecond;
    fireEvent(this, 'afterUpdate');

    return this;
  }

  /**
   * @method rekapi.Rekapi#getLastPositionUpdated
   * @return {number} The normalized timeline position (between 0 and 1) that
   * was last rendered.
   */
  getLastPositionUpdated () {
    return (this._lastUpdatedMillisecond / this.getAnimationLength());
  }

  /**
   * @method rekapi.Rekapi#getLastMillisecondUpdated
   * @return {number} The millisecond that was last rendered.
   */
  getLastMillisecondUpdated () {
    return this._lastUpdatedMillisecond;
  }

  /**
   * @method rekapi.Rekapi#getAnimationLength
   * @return {number} The length of the animation timeline, in milliseconds.
   */
  getAnimationLength () {
    if (!this._animationLengthValid) {
      this._animationLength = Math.max.apply(
        Math,
        this._actors.map(actor => actor.getEnd())
      );

      this._animationLengthValid = true;
    }

    return this._animationLength;
  }

  /**
   * Bind a {@link rekapi.eventHandler} function to a Rekapi event.
   * @method rekapi.Rekapi#on
   * @param {string} eventName
   * @param {rekapi.eventHandler} handler The event handler function.
   * @return {rekapi.Rekapi}
   */
  on (eventName, handler) {
    if (!this._events[eventName]) {
      return this;
    }

    this._events[eventName].push(handler);

    return this;
  }

  /**
   * Manually fire a Rekapi event, thereby calling all {@link
   * rekapi.eventHandler}s bound to that event.
   * @param {string} eventName The name of the event to trigger.
   * @param {any} [data] Optional data to provide to the `eventName` {@link
   * rekapi.eventHandler}s.
   * @method rekapi.Rekapi#trigger
   * @return {rekapi.Rekapi}
   * @fires *
   */
  trigger (eventName, data) {
    fireEvent(this, eventName, data);

    return this;
  }

  /**
   * Unbind one or more handlers from a Rekapi event.
   * @method rekapi.Rekapi#off
   * @param {string} eventName Valid values correspond to the list under
   * {@link rekapi.Rekapi#on}.
   * @param {rekapi.eventHandler} [handler] A reference to the {@link
   * rekapi.eventHandler} to unbind.  If omitted, all {@link
   * rekapi.eventHandler}s bound to `eventName` are unbound.
   * @return {rekapi.Rekapi}
   */
  off (eventName, handler) {
    if (!this._events[eventName]) {
      return this;
    }

    this._events[eventName] = handler ?
      without(this._events[eventName], handler) :
      [];

    return this;
  }

  /**
   * Export the timeline to a `JSON.stringify`-friendly `Object`.
   *
   * @method rekapi.Rekapi#exportTimeline
   * @param {Object} [config]
   * @param {boolean} [config.withId=false] If `true`, include internal `id`
   * values in exported data.
   * @return {rekapi.timelineData} This data can later be consumed by {@link
   * rekapi.Rekapi#importTimeline}.
   */
  exportTimeline ({ withId = false } = {}) {
    const exportData = {
      duration: this.getAnimationLength(),
      actors: this._actors.map(actor => actor.exportTimeline({ withId }))
    };

    const { formulas } = Tweenable;

    const filteredFormulas = Object.keys(formulas).filter(
      formulaName => typeof formulas[formulaName].x1 === 'number'
    );

    const pickProps = ['displayName', 'x1', 'y1', 'x2', 'y2'];

    exportData.curves = filteredFormulas.reduce((acc, formulaName) => {
        const formula = formulas[formulaName];
        acc[formula.displayName] = pick(formula, pickProps);

        return acc;
      },
      {}
    );

    return exportData;
  }

  /**
   * Import data that was created by {@link rekapi.Rekapi#exportTimeline}.
   * This sets up all actors, keyframes, and custom easing curves specified in
   * the `rekapiData` parameter.  These two methods collectively allow you
   * serialize an animation (for sending to a server for persistence, for
   * example) and later recreating an identical animation.
   *
   * @method rekapi.Rekapi#importTimeline
   * @param {rekapi.timelineData} rekapiData Any object that has the same data
   * format as the object generated from {@link rekapi.Rekapi#exportTimeline}.
   */
  importTimeline (rekapiData) {
    each(rekapiData.curves, (curve, curveName) =>
      setBezierFunction(
        curveName,
        curve.x1,
        curve.y1,
        curve.x2,
        curve.y2
      )
    );

    rekapiData.actors.forEach(actorData => {
      const actor = new Actor();
      actor.importTimeline(actorData);
      this.addActor(actor);
    });
  }

  /**
   * @method rekapi.Rekapi#getEventNames
   * @return {Array.<string>} The list of event names that this Rekapi instance
   * supports.
   */
  getEventNames () {
    return Object.keys(this._events);
  }

  /**
   * Get a reference to a {@link rekapi.renderer} that was initialized for this
   * animation.
   * @method rekapi.Rekapi#getRendererInstance
   * @param {rekapi.renderer} rendererConstructor The type of {@link
   * rekapi.renderer} subclass (such as {@link rekapi.CanvasRenderer} or {@link
   * rekapi.DOMRenderer}) to look up an instance of.
   * @return {rekapi.renderer|undefined} The matching {@link rekapi.renderer},
   * if any.
   */
  getRendererInstance (rendererConstructor) {
    return this.renderers.filter(renderer =>
      renderer instanceof rendererConstructor
    )[0];
  }

  /**
   * Move a {@link rekapi.Actor} around within the internal render order list.
   * By default, a {@link rekapi.Actor} is rendered in the order it was added
   * with {@link rekapi.Rekapi#addActor}.
   *
   * This method has no effect if {@link rekapi.Rekapi#sort} is set.
   *
   * @method rekapi.Rekapi#moveActorToPosition
   * @param {rekapi.Actor} actor
   * @param {number} layer This should be within `0` and the total number of
   * {@link rekapi.Actor}s in the animation.  That number can be found with
   * {@link rekapi.Rekapi#getActorCount}.
   * @return {rekapi.Rekapi}
   */
  moveActorToPosition (actor, position) {
    if (position < this._actors.length && position > -1) {
      this._actors = without(this._actors, actor);
      this._actors.splice(position, 0, actor);
    }

    return this;
  }
}

export { Actor, KeyframeProperty, Rekapi };
