export const DEFAULT_EASING: "linear";
export function fireEvent(rekapi: any, eventName: any, data?: {}): any;
export function invalidateAnimationLength(rekapi: any): boolean;
export function determineCurrentLoopIteration(rekapi: any, timeSinceStart: any): any;
export function calculateTimeSinceStart(rekapi: any): number;
export function isAnimationComplete(rekapi: any, currentLoopIteration: any): boolean;
export function updatePlayState(rekapi: any, currentLoopIteration: any): void;
export function calculateLoopPosition(rekapi: any, forMillisecond: any, currentLoopIteration: any): any;
export function updateToMillisecond(rekapi: any, forMillisecond: any): void;
export function updateToCurrentMillisecond(rekapi: any): void;
/*!
 * @type {Object.<function>} Contains the context init function to be called in
 * the Rekapi constructor.  This array is populated by modules in the
 * renderers/ directory.
 */
export const rendererBootstrappers: any[];
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
export class Rekapi {
    constructor(context?: {});
    /**
     * @member {(Object|CanvasRenderingContext2D|HTMLElement)}
     * rekapi.Rekapi#context The rendering context for an animation.
     * @default {}
     */
    context: {};
    _actors: any[];
    _playState: string;
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
    sort: any;
    _events: {
        animationComplete: any[];
        playStateChange: any[];
        play: any[];
        pause: any[];
        stop: any[];
        beforeUpdate: any[];
        afterUpdate: any[];
        addActor: any[];
        removeActor: any[];
        beforeAddKeyframeProperty: any[];
        addKeyframeProperty: any[];
        removeKeyframeProperty: any[];
        removeKeyframePropertyComplete: any[];
        beforeRemoveKeyframeProperty: any[];
        addKeyframePropertyTrack: any[];
        removeKeyframePropertyTrack: any[];
        timelineModified: any[];
        animationLooped: any[];
    };
    _timesToIterate: number;
    _animationLength: number;
    _animationLengthValid: boolean;
    _loopId: any;
    _loopTimestamp: number;
    _pausedAtTime: number;
    _lastUpdatedMillisecond: number;
    _latestIteration: number;
    _loopPosition: any;
    _scheduleUpdate: any;
    _cancelUpdate: any;
    _updateFn: () => void;
    /**
     * @member {Array.<rekapi.renderer>} rekapi.Rekapi#renderers Instances of
     * {@link rekapi.renderer} classes, as inferred by the `context`
     * parameter provided to the {@link rekapi.Rekapi} constructor.  You can
     * add more renderers to this list manually; see the {@tutorial
     * multiple-renderers} tutorial for an example.
     */
    renderers: any[];
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
    addActor(actor?: (rekapi.Actor | any)): rekapi.Actor;
    /**
     * @method rekapi.Rekapi#getActor
     * @param {number} actorId
     * @return {rekapi.Actor} A reference to an actor from the animation by its
     * `id`.  You can use {@link rekapi.Rekapi#getActorIds} to get a list of IDs
     * for all actors in the animation.
     */
    getActor(actorId: number): rekapi.Actor;
    /**
     * @method rekapi.Rekapi#getActorIds
     * @return {Array.<number>} The `id`s of all {@link rekapi.Actor}`s in the
     * animation.
     */
    getActorIds(): Array<number>;
    /**
     * @method rekapi.Rekapi#getAllActors
     * @return {Array.<rekapi.Actor>} All {@link rekapi.Actor}s in the animation.
     */
    getAllActors(): Array<rekapi.Actor>;
    /**
     * @method rekapi.Rekapi#getActorCount
     * @return {number} The number of {@link rekapi.Actor}s in the animation.
     */
    getActorCount(): number;
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
    removeActor(actor: rekapi.Actor): rekapi.Actor;
    /**
     * Remove all {@link rekapi.Actor}s from the animation.
     * @method rekapi.Rekapi#removeAllActors
     * @return {Array.<rekapi.Actor>} The {@link rekapi.Actor}s that were
     * removed.
     */
    removeAllActors(): Array<rekapi.Actor>;
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
    play(iterations?: number): rekapi.Rekapi;
    /**
     * Move to a specific millisecond on the timeline and play from there.
     *
     * @method rekapi.Rekapi#playFrom
     * @param {number} millisecond
     * @param {number} [iterations] Works as it does in {@link
     * rekapi.Rekapi#play}.
     * @return {rekapi.Rekapi}
     */
    playFrom(millisecond: number, iterations?: number): rekapi.Rekapi;
    /**
     * Play from the last frame that was rendered with {@link
     * rekapi.Rekapi#update}.
     *
     * @method rekapi.Rekapi#playFromCurrent
     * @param {number} [iterations] Works as it does in {@link
     * rekapi.Rekapi#play}.
     * @return {rekapi.Rekapi}
     */
    playFromCurrent(iterations?: number): rekapi.Rekapi;
    /**
     * Pause the animation.  A "paused" animation can be resumed from where it
     * left off with {@link rekapi.Rekapi#play}.
     *
     * @method rekapi.Rekapi#pause
     * @return {rekapi.Rekapi}
     * @fires rekapi.playStateChange
     * @fires rekapi.pause
     */
    pause(): rekapi.Rekapi;
    /**
     * Stop the animation.  A "stopped" animation will start from the beginning
     * if {@link rekapi.Rekapi#play} is called.
     *
     * @method rekapi.Rekapi#stop
     * @return {rekapi.Rekapi}
     * @fires rekapi.playStateChange
     * @fires rekapi.stop
     */
    stop(): rekapi.Rekapi;
    /**
     * @method rekapi.Rekapi#isPlaying
     * @return {boolean} Whether or not the animation is playing (meaning not paused or
     * stopped).
     */
    isPlaying(): boolean;
    /**
     * @method rekapi.Rekapi#isPaused
     * @return {boolean} Whether or not the animation is paused (meaning not playing or
     * stopped).
     */
    isPaused(): boolean;
    /**
     * @method rekapi.Rekapi#isStopped
     * @return {boolean} Whether or not the animation is stopped (meaning not playing or
     * paused).
     */
    isStopped(): boolean;
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
    update(millisecond?: number, doResetLaterFnKeyframes?: boolean): rekapi.Rekapi;
    /**
     * @method rekapi.Rekapi#getLastPositionUpdated
     * @return {number} The normalized timeline position (between 0 and 1) that
     * was last rendered.
     */
    getLastPositionUpdated(): number;
    /**
     * @method rekapi.Rekapi#getLastMillisecondUpdated
     * @return {number} The millisecond that was last rendered.
     */
    getLastMillisecondUpdated(): number;
    /**
     * @method rekapi.Rekapi#getAnimationLength
     * @return {number} The length of the animation timeline, in milliseconds.
     */
    getAnimationLength(): number;
    /**
     * Bind a {@link rekapi.eventHandler} function to a Rekapi event.
     * @method rekapi.Rekapi#on
     * @param {string} eventName
     * @param {rekapi.eventHandler} handler The event handler function.
     * @return {rekapi.Rekapi}
     */
    on(eventName: string, handler: rekapi.eventHandler): rekapi.Rekapi;
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
    trigger(eventName: string, data?: any): rekapi.Rekapi;
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
    off(eventName: string, handler?: rekapi.eventHandler): rekapi.Rekapi;
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
    exportTimeline({ withId }?: {
        withId?: boolean;
    }): rekapi.timelineData;
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
    importTimeline(rekapiData: rekapi.timelineData): void;
    /**
     * @method rekapi.Rekapi#getEventNames
     * @return {Array.<string>} The list of event names that this Rekapi instance
     * supports.
     */
    getEventNames(): Array<string>;
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
    getRendererInstance(rendererConstructor: rekapi.renderer): rekapi.renderer | undefined;
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
    moveActorToPosition(actor: rekapi.Actor, position: any): rekapi.Rekapi;
}
