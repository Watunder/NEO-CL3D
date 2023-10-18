let CreatureModule =
{
    packageMgr:
    {
        /**
         * Adds a new CreaturePackPlayer.
         * @param {String} fileName - The file name.
         * @returns {Boolean} Whether there is a file.
         */
        addPackLoader(fileName){},
        /**
         * Adds a new CreaturePackPlayer.
         * @param {String} fileName - The file name.
         * @returns {Number} The player id.
         */
        addPackPlayer(fileName){},
        /**
         * Removes an existing CreaturePackPlayer.
         * @param {Number} playerId - The player id.
         */
        removePackPlayer(playerId){},
        /**
         * Sets an active animation.
         * @param {Number} playerId - The player id.
         * @param {String} animationName - The animation name.
         */
        setPlayerActiveAnimation(playerId, animationName){},
        /**
         * Blends into an animation.
         * @param {Number} playerId - The player id.
         * @param {String} animationName - The animation name.
         * @param {Number} blendDelta - [0.0, 1.0]
         */
        setPlayerBlendToAnimation(playerId, animationName, blendDelta){},
        /**
         * Steps the player object.
         * @param {Number} playerId - The player id.
         * @param {Number} delta - The time delta.
         */
        stepPlayer(playerId, delta){},
        /**
         * Sets the absolute time for the player object
         * @param {Number} playerId - The player id.
         * @param {Number} currentTime - The absolute time.
         */
        setPlayerRunTime(playerId, currentTime){},
        /**
         * Gets the absolute time of a player object
         * @param {Number} playerId - The player id.
         * @returns {Number} The absolute time.
         */
        getPlayerRunTime(playerId){},
        /**
         * Applies an offset z to each mesh region.
         * @param {Number} playerId - The player id.
         * @param {Number} offsetZ - Z Offset.
         */
        applyRegionOffsetsZ(playerId, offsetZ){},
        /**
         * Gets the points of the player object.
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The points(X,Y) array.
         */
        getPlayerPoints(playerId){},
        /**
         * Gets the points of the player object.
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The points(X,Y,Z) array.
         */
        getPlayerPoints3D(playerId){},
        /**
         * Gets the colors of the player object.
         * @param {Number} playerId - The player id.
         * @returns {Uint8Array} The colors(R,G,B,A) array.
         */
        getPlayerColors(playerId){},
        /**
         * Gets the uvs of the player ocject.
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The uvs(S,T) array.
         */
        getPlayerUVs(playerId){},
        /**
         * Gets the indices of a player
         * @param {Number} playerId - The player id.
         * @returns {Float32Array} The indices array.
         */
        getPlayerIndices(playerId){},
        /**
         * Gets the bounds of a player.
         * @param {Number} playerId - The player id.
         * @returns {Array} The bounds array.
         */
        getPlayerBounds(playerId){},
        /**
         * Gets the starting time of the currently active animation
         * @param {Number} playerId - The player id.
         * @returns {Number} The absolute time.
         */
        getActiveAnimStartTime(playerId){},
        /**
         * Gets the ending time of the currently active animation
         * @param {Number} playerId - The player id.
         * @returns {Number} The absolute time.
         */    
        getActiveAnimEndTime(playerId){},
        /**
         * Gets the name of the currently active animation.
         * @param {Number} playerId - The player id.
         * @returns {String} The animation name.
         */
        getActiveAnimName(playerId){},
        /**
         * Gets the array of the animations name.
         * @param {Number} playerId - The player id.
         * @returns {Array} The animations name array.
         */
        getAllAnimNames(playerId){},
    },
    /**
     * 
     * @param {String} filePath
     * @param {Function} callback
     */
    loadFile(filePath, callback){},
    /**
     * 
     * @param {Object} wasmModule 
     * @param {Float32Array} typedArray 
     */
    heapBytes(wasmModule, typedArray){}
};
CreatureModule = globalThis.CreatureModule;

export { CreatureModule };