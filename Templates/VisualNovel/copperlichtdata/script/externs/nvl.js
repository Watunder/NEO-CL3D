// var scene = ccbGetRootSceneNode();

// var nvl = new CL3D.DummyTransformationSceneNode();

// var overlay = new CL3D.Overlay2DSceneNode();
// overlay.set2DPosition(10,10,200,70);
// overlay.setText('Hello World!');
// overlay.FontName = "12;default;arial;normal;bold;true";
// overlay.TextColor = CL3D.createColor(255, 150, 232, 249);

// nvl.addChild(overlay);

// scene.addChild(nvl);

var NVL = {};

function unexpected(reject, name = null, info = null)
{
	reject
	(
	`==================================================\n` +
	`Error Unexpected Syntax\n` +
    `File: ${name}\n` +
    `Info: ${info}\n` +
	`==================================================\n`
	);
}

NVL.Importer = function()
{
    this.fileList =
    [
        // ui
        "uibgmmode",
        "uicgmode",
        "uidia",
        "uiendmode",
        "uihistory",
        "uiload",
        "uimenu",
        "uioption",
        "uisave",
        "uislpos",
        "uititle",
        //omake
        "omake",
        "uititle_omake",
    ];

    this.xxList = 
    [
        //
        "namelist",
        "setting"
    ];

    this.fileLoaded = {};
};

NVL.Importer.prototype.loadAll = function()
{
    var me = this;

    Promise.all(me.fileList.map(async (name, index) =>
    {
        var ret = await me.readJSON(name, index);
        if (ret) me.fileLoaded[name] = ret;
    }))
    .then(() =>
    {
        me.createScene(me.fileLoaded);
    })
};

NVL.Importer.prototype.readJSON = function(name, index)
{
    var me = this;

    return new Promise((resolve, reject) =>
    {
        ccbDoHTTPRequest("copperlichtdata/nvl/" + name + ".json",function(data)
        {
            if (data == "")
            {
                unexpected(reject, (name + ".json"), "文件不存在");
                return;
            }

            var ret = JSON.parse(data);
            resolve(ret);
        });
    })
	.catch((e) =>
    {
        console.log(e);
    })
};

NVL.Importer.prototype.createScene = function(obj)
{
    var panelList = Object.keys(obj);

    panelList.forEach(panel =>
    {
        var scene = new CL3D.Scene();
        scene.Name = panel;

        Object.entries(obj[panel]).forEach(param =>
        {
            switch (param[1]["type"])
            {
                case "button":
                {
                    // x
                    // y
                    // use
    
                    // normal
                    // over
                    // on
    
                    // enterse
                    // clickse
    
                    // usetext
                    // fontface
                    // text
                    // textsize
                    // normalcolor
                    // overcolor
                    // oncolor
                }
                break;

                case "slButton":
                {
                    // normal
                    // over
                    // on
    
                    // enterse
                    // clickse
    
                    // usetext
                    // fontface
                    // text
                    // textsize
                    // normalcolor
                    // overcolor
                    // oncolor
                }
                break;

                case "advButton":
                {
                    // width
                    // height
                    // x
                    // y
                    // use
    
                    // normal
                    // over
                    // on

                    // onleave
                    // onenter
                    // enterse
                    // clickse
    
                    // usetext
                    // fontface
                    // text
                    // textsize
                    // normalcolor
                    // overcolor
                    // oncolor

                    // exp
                    // cond
                    // target
                    // storage

                    // btntype
                    // place
                }
                break;

                case "slider":
                case "scroll":
                {
                    // width
                    // height
                    // x
                    // y
                    // use

                    // normal
                    // over
                    // on

                    // button_w
                    // button_h
                    // button_color
                    // button_opacity

                    // back
                    // color
                    // opacity

                }
                break;

                case "checkBox":
                {
                    // x
                    // y
                    // use
    
                    // normal
                    // on_over
                    // over
                    // on
    
                    // enterse
                    // clickse
    
                    // usetext
                    // fontface
                    // text
                    // textsize
                    // normalcolor
                    // overcolor
                    // oncolor

                }
                break;

                case "list":
                {
                    // left
                    // top
                    // x
                    // y
    
                    // normal
                    // over
                    // on

                    // disx
                    // disy

                    // num
                    // line
                    // size

                    // face
                    // color
                    // italic
                    // edge
                    // shadow
                    // bold
                    // shadowcolor
                    // edgecolor
                }
                break;

                case "cgThum":
                {
                    // y
                    // x

                    // normal
                    // over
                    // on

                    // enterse
                    // clickse

                    // thum
                }
                break;

                case "back":
                {
                    // frame

                    // stitle_x
                    // stitle_y
                    // stitle
                }
                break;

                case "message":
                {
                    // left
                    // top
    
                    // marginl
                    // marginb
                    // marginr
                    // margint
    
                    // frame
                }
                break;
                
                case "frame":
                {
                    // left
                    // top
                    // textx
                    // texty
                    // textsize
                    // anchorc
                    // use
    
                    // frame
    
                    // face
                    // bold
                    // italic
    
                    // color
                    // shadow
                    // shadowcolor
                    // edge
                    // edgecolor
                }
                break;

                case "text":
                {

                }
                break;

                case "snap":
                {

                }
                break;

                default:
                {
                    switch (panel)
                    {
                        // case "uibgmmode":

                        case "uicgmode":
                        {
                            switch (param[0])
                            {
                                case "locate":
                                {
                                    // 
                                }
                                break;
                            }
                        }
                        break;

                        case "uidia":
                        {
                            switch (param[0])
                            {
                                case "face":
                                {
                                    // left
                                    // top
                                }
                                break;

                                case "blank":
                                {
                                    // marginb
                                    // marginl
                                    // marginr
                                    // margint
                                }
                                break;
                            }

                        }
                        break;
                        
                        case "uiendmode":
                        {
                            switch (param[0])
                            {
                                case "locate":
                                {
                                    // 
                                }
                                break;
                            }
                        }
                        break;

                        case "uihistory":
                        {
                            switch (param[0])
                            {
                                case "left":
                                {
                                    // 
                                }
                                break;

                                case "top":
                                {
                                    // 
                                }
                                break;
                                
                                case "linespace":
                                {
                                    //
                                }
                                break;

                                case "font":
                                {
                                    // 
                                }
                                break;

                                case "stitle":
                                {

                                }
                                break;

                                case "stitle_x":
                                {

                                }
                                break;

                                case "stitle_y":
                                {

                                }
                                break;

                                case "marginb":
                                {

                                }
                                break;

                                case "marginl":
                                {

                                }
                                break;

                                case "marginr":
                                {

                                }
                                break;

                                case "margint":
                                {

                                }
                                break;
                            }
                        }
                        break;

                        case "uiload":
                        case "uisave":
                        {
                            switch (param[0])
                            {
                                case "num":
                                {

                                }
                                break;

                                case "date":
                                {

                                }
                                break;

                                case "history":
                                {

                                }
                                break;

                                case "draw":
                                {

                                }
                                break;

                                case "talk":
                                {

                                }
                                break;

                                case "pagecolor":
                                {

                                }
                                break;

                                case "lastsavemark":
                                {

                                }
                                break;

                                case "bookmark":
                                {

                                }
                                break;          
                            }
                        }
                        break;

                        // case "uimenu":

                        // case "uioption":

                        case "uislpos":
                        {
                            switch (param[0])
                            {
                                case "num":
                                {

                                }
                                break;

                                case "date":
                                {

                                }
                                break;

                                case "history":
                                {

                                }
                                break;

                                case "up":
                                {

                                }
                                break;

                                case "down":
                                {

                                }
                                break;

                                case "back":
                                {

                                }
                                break;

                                case "drawtalk":
                                {

                                }
                                break;

                                case "drawdate":
                                {

                                }
                                break;

                                case "smallsnap":
                                {

                                }
                                break;

                                case "locate":
                                {
                                    // 
                                }
                                break;

                                case "pagefont":
                                {

                                }
                                break;

                                case "lastsavemark":
                                {

                                }
                                break;

                                case "bookmark":
                                {

                                }
                                break;
                            }
                        }
                        break;

                        case "uititle":
                        {
                            switch (param[0])
                            {
                                case "logo":
                                {
    
                                }
                                break;

                                case "bgm":
                                {
    
                                }
                                break;
                            }
                        }
                        break;

                        case "omake":
                        {
                            switch (param[0])
                            {
                                default:
                                {
                                    param[1];
                                }
                            }
                        }

                        case "uititle_omake":
                        {
                            switch (param[0])
                            {
                                case "logo":
                                {
    
                                }
                                break;

                                case "bgm":
                                {
    
                                }
                                break;
                            }
                        }
                        break;

                        case "namelist":
                        {
                            // [
                            //     {
                            //      "color":"0x999BFF",
                            //      "name":"主角",
                            //      "tag":"主角"
                            //     },
                            //     {
                            //      "color":"0xFFFF95",
                            //      "name":"默认"
                            //     },
                            //     {
                            //      "face":"face01_01",
                            //      "color":"0xCCFFCC",
                            //      "name":"NVL娘",
                            //      "tag":"nvl娘"
                            //     }
                            //    ]
                        }
                        break;

                        case "setting":
                        {
                            // {
                            //     "width":1280,
                            //     "savedata":{
                            //      "num":48,
                            //      "thumbnailwidth":295
                            //     },
                            //     "newgameplus":1,
                            //     "font":{
                            //      "edgecolor":"0x000000",
                            //      "shadowcolor":"0x000000",
                            //      "face":"宋体",
                            //      "color":"0xffffff",
                            //      "shadow":"false",
                            //      "edge":"true",
                            //      "size":22
                            //     },
                            //     "title_omake":"uititle_omake.tjs",
                            //     "history":{
                            //      "face":"宋体",
                            //      "bold":"false",
                            //      "linespace":26,
                            //      "size":20
                            //     },
                            //     "height":720,
                            //     "usemappfont":1,
                            //     "startfrom":"start.story",
                            //     "title":"NEO-CL3D Template"
                            //    }
                        }
                        break;
                    }
                }
            }
        })

        CL3D.engine.addScene(scene);
    });
};
