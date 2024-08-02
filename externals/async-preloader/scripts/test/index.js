import AsyncPreloader from "../../dist/async-preloader.js";

// Returns a Promise with an array of LoadedValue
const pItems = AsyncPreloader.loadManifest("assets/manifest.json", "items");

pItems
    .then((items) => {
        const element = AsyncPreloader.items.get("myXmlFile");
        console.log(element);
    })
    .catch((error) => console.error("Error loading items", error));
