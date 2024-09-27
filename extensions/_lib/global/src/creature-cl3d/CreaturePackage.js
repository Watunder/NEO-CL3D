import * as CL3D from "cl3d";
import Creature from "creature";

export class CreaturePackage {
    constructor(filePath, callback) {
        const index1 = filePath.lastIndexOf("/");
        this.rootPath = filePath.slice(0, index1 + 1);
        const index2 = filePath.lastIndexOf(".");
        this.name = filePath.slice(index1 + 1, index2);

        this.onComplete = callback;
        this.loadFile(filePath);
    }

    /**
     * Load json and parse (then, load textures)
     * @param {string} filePath - CreaturePack file path
     */
    loadFile(filePath) {
        let result = false;

        const loader = new CL3D.CCFileLoader(filePath, true, true);
        loader.load((data) => {
            let byteArray = new Uint8Array(data);
            console.log("Loaded CreaturePack Data with size: " + byteArray.byteLength);

            let loadArray = Creature.wasmHeap(byteArray);
            result = Creature.PackManager.addPackLoader(this.name, loadArray.byteOffset, loadArray.byteLength);

            this.loadTexture();
        });

        if (result == false)
            return;
    }

    loadTexture() {
        let resources = {};

        resources[this.name] = this.rootPath + this.name + ".png";

        // CreaturePackage is ready.
        this.resources = resources;
        this.status = "ready";

        if (this.onComplete !== null)
            this.onComplete();
    }
};
