export { Rekapi } from "./rekapi.js";
export { Actor } from "./actor.js";
export { KeyframeProperty } from "./keyframe-property.js";
export namespace rekapi {
    /**
     * Either the name of an [easing
     * curve](https://jeremyckahn.github.io/shifty/doc/Tweenable.html#.formulas) or
     * an array of four `number`s (`[x1, y1, x2, y2]`) that represent the points of
     * a [Bezier curve](https://cubic-bezier.com/).
     */
    type easingOption = string | Array<number>;
    /**
     * An Object that provides utilities for rendering a {@link rekapi.Actor }.
     */
    type renderer = {
        /**
         * A function that renders a {@link  * rekapi.Actor}.
         */
        render: rekapi.render;
    };
    type propertyData = {
        value: number | string;
        millisecond: number;
        easing: string;
        name: string;
        id: string | undefined;
    };
    type actorData = {
        /**
         * The values of this array must
         * correspond 1:1 to the key names in `propertyTracks`.
         */
        trackNames: Array<string>;
        propertyTracks: any;
        end: number;
        start: number;
        id: string | undefined;
    };
    /**
     * The properties of this object are used as arguments provided to
     * [`shifty.setBezierFunction`](http://jeremyckahn.github.io/shifty/doc/shifty.html#.setBezierFunction).
     */
    type curveData = {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
        displayName: string;
    };
    /**
     * The `JSON.stringify`-friendly data format for serializing a Rekapi
     * animation.
     */
    type timelineData = {
        actors: Array<rekapi.actorData>;
        curves: any;
        duration: number;
    };
    /**
     * A function that is called when an event is fired.  See the events listed
     * below for details on the types of events that Rekapi supports.
     */
    type eventHandler = (rekapi: rekapi.Rekapi, data: any) => any;
    /**
     * A function that gets called every time the actor's state is updated (once
     * every frame). This function should do something meaningful with the state of
     * the actor (for example, visually rendering to the screen).
     */
    type render = (context: any, state: any) => any;
    type keyframeFunction = (actor: rekapi.Actor, drift: number) => any;
    type actorSortFunction = (actor: rekapi.Actor) => number;
}
