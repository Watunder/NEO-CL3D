import * as Comlink from "../dist/comlink.mjs";

function buildImageUrls()
{
    const names = [''];
    return names.map(name =>
    {
        return `./copperlichtdata/${name}.webp`;
    });
}

function loadImageAsync(imageUrl)
{
    return new Promise((resolve, reject) =>
    {
        fetch(imageUrl).then((response) =>
        {
            return response.blob();
        }).then((blob) =>
        {
            resolve(blob);
        });
    });
}

function callback(value)
{
    console.log(`Result: ${value}`);
}

async function getAllImage()
{
    const imgUrls = buildImageUrls();
    let arrayOfImages = [];

    await Promise.all(imgUrls.map(loadImageAsync)).then(arrayOfImageElements =>
    {
        arrayOfImages = arrayOfImageElements;
    });

    const worker = new Worker('./copperlichtdata/script/worker/canvasprocess.js');
    const obj = Comlink.wrap(worker);
    obj.inc(arrayOfImages, Comlink.proxy(callback));
}

getAllImage();