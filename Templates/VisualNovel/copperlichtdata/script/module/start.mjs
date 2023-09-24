import mitt from './library/mitt.mjs';
import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

Global.emitter = mitt();
Global.getAllImage = getAllImage;

/*
// 创建一个 Worker, 并指定的脚本。
let worker = new Worker('./copperlichtdata/script/worker/canvasprocess.js');

worker.onmessage = ({data}) => {
    // 这里接收Worker线程传来的base64图片
    console.log(data)
};
*/

function callback(value) {
    console.log(`Result: ${value}`);
}

async function getAllImage() {
    const imgUrls = buildImageUrls();
    let arrayOfImages = [];
    await Promise.all(imgUrls.map(loadImageAsync))
        .then(arrayOfImageElements => {
            arrayOfImages = arrayOfImageElements;
        });
    // 因为在web Worker中不支持dom的操作，所以所有的图片都转成blob再传入，其余的都和上面一样
    //worker.postMessage({data: arrayOfImages});
    const worker = new Worker('./copperlichtdata/script/worker/canvasprocess.js');
    const obj = Comlink.wrap(worker);
    obj.inc(arrayOfImages, Comlink.proxy(callback));
}

function loadImageAsync(imageUrl) {
    return new Promise((resolve, reject) => {
        fetch(imageUrl)
            .then((response) => {
                return response.blob();
            }).then((blob) => {
                resolve(blob);
            });
    });
}

function buildImageUrls() {
    // 这里有5张图片
    const names = ['idle'];
    return names.map(name => {
        return `./copperlichtdata/${name}.webp`;
    });
}
