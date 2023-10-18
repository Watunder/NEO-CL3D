export class CreaturePackage
{
    constructor(filePath, callback)
    {
        if (!CreatureModule)
            return;

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
    loadFile(filePath)
    {
        const self = this;
        let result = false;

        CreatureModule.loadFile(filePath, function(data)
        {
            let byteArray = new Uint8Array(data);
            console.log("Loaded CreaturePack Data with size: " + byteArray.byteLength);

            let loadArray = CreatureModule.heapBytes(CreatureModule, byteArray);
            result = CreatureModule.packageMgr.addPackLoader(self.name, loadArray.byteOffset, loadArray.byteLength);
        
            self.loadTexture();
        });

        if (result == false)
            return;
    }

    loadTexture()
    {
        const self = this;
        let resources = new Object();

        resources[self.name] = self.rootPath + self.name + ".png";

        // CreaturePackage is ready.
        self.resources = resources;
        self.status = "ready";

        if (self.onComplete !== null)
            self.onComplete();
    }
};
