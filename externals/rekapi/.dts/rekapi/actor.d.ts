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
export class Actor extends Tweenable {
    constructor(config?: {});
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
    keyframe(millisecond: number, state: (any | rekapi.keyframeFunction), easing?: rekapi.easingOption): rekapi.Actor;
    /**
     * @method rekapi.Actor#hasKeyframeAt
     * @param {number} millisecond Point on the timeline to query.
     * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
     * lookup to a particular track.
     * @return {boolean} Whether or not the actor has any {@link
     * rekapi.KeyframeProperty}s set at `millisecond`.
     */
    hasKeyframeAt(millisecond: number, trackName?: any): boolean;
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
    copyKeyframe(copyFrom: number, copyTo: number): rekapi.Actor;
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
    moveKeyframe(from: number, to: number): boolean;
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
    modifyKeyframe(millisecond: number, state: any, easing?: any): rekapi.Actor;
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
    removeKeyframe(millisecond: number): rekapi.Actor;
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
    removeAllKeyframes(): rekapi.Actor;
    _keyframeProperties: {};
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
    getKeyframeProperty(property: string, millisecond: number): (rekapi.KeyframeProperty | undefined);
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
    modifyKeyframeProperty(property: string, millisecond: number, newProperties: any): rekapi.Actor;
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
    removeKeyframeProperty(property: string, millisecond: number): (rekapi.KeyframeProperty | undefined);
    /**
     *
     * @method rekapi.Actor#getTrackNames
     * @return {Array.<rekapi.KeyframeProperty#name>} A list of all the track
     * names for a {@link rekapi.Actor}.
     */
    getTrackNames(): Array<rekapi.KeyframeProperty>;
    /**
     * Get all of the {@link rekapi.KeyframeProperty}s for a track.
     * @method rekapi.Actor#getPropertiesInTrack
     * @param {rekapi.KeyframeProperty#name} trackName The track name to query.
     * @return {Array(rekapi.KeyframeProperty)}
     */
    getPropertiesInTrack(trackName: any): any[];
    /**
     * @method rekapi.Actor#getStart
     * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
     * lookup to a particular track.
     * @return {number} The millisecond of the first animating state of a {@link
     * rekapi.Actor} (for instance, if the first keyframe is later than
     * millisecond `0`).  If there are no keyframes, this is `0`.
     */
    getStart(trackName?: any): number;
    /**
     * @method rekapi.Actor#getEnd
     * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
     * lookup to a particular keyframe track.
     * @return {number} The millisecond of the last state of an actor (the point
     * in the timeline in which it is done animating).  If there are no
     * keyframes, this is `0`.
     */
    getEnd(trackName?: any): number;
    /**
     * @method rekapi.Actor#getLength
     * @param {rekapi.KeyframeProperty#name} [trackName] Optionally scope the
     * lookup to a particular track.
     * @return {number} The length of time in milliseconds that the actor
     * animates for.
     */
    getLength(trackName?: any): number;
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
    wait(until: number): rekapi.Actor;
    /*!
     * Insert a `KeyframeProperty` into a property track at `index`.  The linked
     * list structure of the property track is maintained.
     * @method rekapi.Actor#_insertKeyframePropertyAt
     * @param {KeyframeProperty} keyframeProperty
     * @param {Array(KeyframeProperty)} propertyTrack
     * @param {number} index
     */
    _insertKeyframePropertyAt(keyframeProperty: any, propertyTrack: any, index: any): void;
    /*!
     * Remove the `KeyframeProperty` at `index` from a property track.  The linked
     * list structure of the property track is maintained.  The removed property
     * is not modified or unlinked internally.
     * @method rekapi.Actor#_deleteKeyframePropertyAt
     * @param {Array(KeyframeProperty)} propertyTrack
     * @param {number} index
     */
    _deleteKeyframePropertyAt(propertyTrack: any, index: any): void;
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
    addKeyframeProperty(keyframeProperty: rekapi.KeyframeProperty): rekapi.Actor;
    /*!
     * TODO: Explain the use case for this method
     * Set the actor to be active or inactive starting at `millisecond`.
     * @method rekapi.Actor#setActive
     * @param {number} millisecond The time at which to change the actor's active state
     * @param {boolean} isActive Whether the actor should be active or inactive
     * @return {rekapi.Actor}
     */
    setActive(millisecond: any, isActive: any): this;
    /*!
     * Calculate and set the actor's position at `millisecond` in the animation.
     * @method rekapi.Actor#_updateState
     * @param {number} millisecond
     * @param {boolean} [resetLaterFnKeyframes] If true, allow all function
     * keyframes later in the timeline to be run again.
     */
    _updateState(millisecond: any, resetLaterFnKeyframes?: boolean): this;
    wasActive: any;
    /*!
     * @method rekapi.Actor#_resetFnKeyframesFromMillisecond
     * @param {number} millisecond
     */
    _resetFnKeyframesFromMillisecond(millisecond: any): void;
    /**
     * Export this {@link rekapi.Actor} to a `JSON.stringify`-friendly `Object`.
     * @method rekapi.Actor#exportTimeline
     * @param {Object} [config]
     * @param {boolean} [config.withId=false] If `true`, include internal `id`
     * values in exported data.
     * @return {rekapi.actorData} This data can later be consumed by {@link
     * rekapi.Actor#importTimeline}.
     */
    exportTimeline({ withId }?: {
        withId?: boolean;
    }): rekapi.actorData;
    /**
     * Import an Object to augment this actor's state.  This does not remove
     * keyframe properties before importing new ones.
     * @method rekapi.Actor#importTimeline
     * @param {rekapi.actorData} actorData Any object that has the same data
     * format as the object generated from {@link rekapi.Actor#exportTimeline}.
     */
    importTimeline(actorData: rekapi.actorData): void;
}
import { Tweenable } from '../shifty/index.js';
