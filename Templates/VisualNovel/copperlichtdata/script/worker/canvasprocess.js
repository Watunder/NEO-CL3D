importScripts("../module/dist/comlink.js");

let ctx = self;
const obj =
{
    inc(data, callback)
    {
        let arrayOfImageElements = data;
        
        // 这里就是用到OffscreenCanvas的地方了,画布大小我这里写死了
        let width=400;
        let height=400;
        let canvas = new OffscreenCanvas(width, height);
        let context = canvas.getContext('2d');

        // 还是和前面一样n*anglePictures张图片
        const anglePictures = 1;
        
        arrayOfImageElements.forEach((imageObj) =>
        {
            // 因为worker中不支持dom 所以传入blob,然后把blob转换成 ImageBitmap，再对ImageBitmap进行操作。
            ctx.createImageBitmap(imageObj).then((imageBitmap) =>
            {
                for (let i = 0; i < anglePictures; ++i)
                {
                    let rotate = i;
                    canvas.width = width;
                    canvas.height = height;

                    context.clearRect(0, 0, canvas.width, canvas.height);

                    if (rotate === 90 || rotate === 270)
                        context.translate(height / 2, width / 2);
                    else
                        context.translate(width / 2, height / 2);

                    context.rotate(rotate * Math.PI / 180);
                    context.drawImage(imageBitmap, -width / 2, -height / 2);

                    // OffscreenCanvas 没有 toDataURL('image/webp') 方法
                    canvas.convertToBlob({type: 'image/webp'}).then((blob) =>
                    {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        
                        return new Promise(resolve =>
                        {
                            reader.onloadend = () =>
                            {
                                resolve(reader.result);
                            };
                        });
                    }).then((base64) =>
                    {
                        callback(base64)
                    })
                }
            })
        })
    }
};
  
Comlink.expose(obj);