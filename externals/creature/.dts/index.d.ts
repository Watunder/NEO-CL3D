export { Creature as default };
declare namespace Creature {
    namespace PackManager {
        /**
         * Adds a new CreaturePackLoader.
         * @param {String} fileName - The file name.
         * @param {Number} byteLength - The `Uint8Array.byteLength` from {@link Creature.wasmHeap} result.
         * @param {Number} byteOffset - The `Uint8Array.byteOffset` from {@link Creature.wasmHeap} result.
         * @returns {Boolean} Whether there is a file.
         */
        function addPackLoader(fileName: string, byteLength: number, byteOffset: number): boolean;
        /**
         * Adds a new CreaturePackPlayer.
         * @param {String} fileName - The file name.
         * @returns {Number} The player id.
         */
        function addPackPlayer(fileName: string): number;
        /**
         * Removes an existing CreaturePackPlayer.
         * @param {Number} playerId - The player id.
         */
        function removePackPlayer(playerId: number): void;
        /**
         * Sets an active animation.
         * @param {Number} playerId - The player id.
         * @param {String} animationName - The animation name.
         */
        function setPlayerActiveAnimation(playerId: number, animationName: string): void;
        /**
         * Blends into an animation.
         * @param {Number} playerId - The player id.
         * @param {String} animationName - The animation name.
         * @param {Number} blendDelta - [0.0, 1.0]
         */
        function setPlayerBlendToAnimation(playerId: number, animationName: string, blendDelta: number): void;
        /**
         * Steps the player object.
         * @param {Number} playerId - The player id.
         * @param {Number} delta - The time delta.
         */
        function stepPlayer(playerId: number, delta: number): void;
        /**
         * Sets the absolute time for the player object
         * @param {Number} playerId - The player id.
         * @param {Number} currentTime - The absolute time.
         */
        function setPlayerRunTime(playerId: number, currentTime: number): void;
        /**
         * Gets the absolute time of a player object
         * @param {Number} playerId - The player id.
         * @returns {Number} The absolute time.
         */
        function getPlayerRunTime(playerId: number): number;
        /**
         * Applies an offset z to each mesh region.
         * @param {Number} playerId - The player id.
         * @param {Number} offsetZ - Z Offset.
         */
        function applyRegionOffsetsZ(playerId: number, offsetZ: number): void;
        /**
         * Gets the points of the player object.
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The points(X,Y) array.
         */
        function getPlayerPoints(playerId: number): Float32Array;
        /**
         * Gets the points of the player object.
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The points(X,Y,Z) array.
         */
        function getPlayerPoints3D(playerId: number): Float32Array;
        /**
         * Gets the colors of the player object.
         * @param {Number} playerId - The player id.
         * @returns {Uint8Array} The colors(R,G,B,A) array.
         */
        function getPlayerColors(playerId: number): Uint8Array;
        /**
         * Gets the uvs of the player ocject.
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The uvs(S,T) array.
         */
        function getPlayerUVs(playerId: number): Float32Array;
        /**
         * Gets the indices of a player
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The indices array.
         */
        function getPlayerIndices(playerId: number): Float32Array;
        /**
         * Gets the bounds of a player.
         * @param {Number} playerId - The player id.
         * @returns {Array} The bounds array.
         */
        function getPlayerBounds(playerId: number): any[];
        /**
         * Gets the starting time of the currently active animation
         * @param {Number} playerId - The player id.
         * @returns {Number} The absolute time.
         */
        function getActiveAnimStartTime(playerId: number): number;
        /**
         * Gets the ending time of the currently active animation
         * @param {Number} playerId - The player id.
         * @returns {Number} The absolute time.
         */
        function getActiveAnimEndTime(playerId: number): number;
        /**
         * Gets the name of the currently active animation.
         * @param {Number} playerId - The player id.
         * @returns {String} The animation name.
         */
        function getActiveAnimName(playerId: number): string;
        /**
         * Gets the array of the animations name.
         * @param {Number} playerId - The player id.
         * @returns {Array} The animations name array.
         */
        function getAllAnimNames(playerId: number): any[];
    }
    /**
     * @param {ArrayBuffer} buffer
     * @returns
     */
    function wasmHeap(buffer: ArrayBuffer): Uint8Array;
}
