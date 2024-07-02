import { UIConfig } from "../ui/UIConfig";
import { UIPackage } from "../ui/UIPackage";

export class UBBParser {
    private _text: string;
    private _readPos: number = 0;

    protected _handlers: { [index: string]: (tagName: string, end: boolean, attr: string) => string };

    public defaultImgWidth: number = 0;
    public defaultImgHeight: number = 0;
    public linkClass: string = UIConfig.defaultLinkClass;

    public lastColor: string;
    public lastSize: string;

    constructor() {
        this._handlers = {};
        this._handlers["url"] = this.onTag_URL;
        this._handlers["img"] = this.onTag_IMG;
        this._handlers["b"] = this.onTag_B;
        this._handlers["i"] = this.onTag_I;
        this._handlers["u"] = this.onTag_U;
        this._handlers["sup"] = this.onTag_Simple;
        this._handlers["sub"] = this.onTag_Simple;
        this._handlers["color"] = this.onTag_COLOR;
        this._handlers["font"] = this.onTag_FONT;
        this._handlers["size"] = this.onTag_SIZE;
    }

    protected onTag_URL(tagName: string, end: boolean, attr: string): string {
        Event
        if (!end) {
            if (attr == null)
                attr = this.getTagText();

            return "<a class='" + this.linkClass + "' href=\"#\" onclick=\"fguiStage.onClickLink(event, '" + attr + "');\">";
        }
        else
            return "</a>";
    }

    protected onTag_IMG(tagName: string, end: boolean, attr: string): string {
        if (!end) {
            var src: string = this.getTagText(true);
            if (!src)
                return null;

            if (src.startsWith("ui://")) {
                let pi = UIPackage.getItemByURL(src);
                if (pi)
                    src = pi.file;
            }

            if (this.defaultImgWidth)
                return "<img src=\"" + src + "\" width=\"" + this.defaultImgWidth + "\" height=\"" + this.defaultImgHeight + "\"/>";
            else
                return "<img src=\"" + src + "\"/>";
        }
        else
            return null;
    }

    protected onTag_B(tagName: string, end: boolean, attr: string): string {
        return end ? ("</b>") : ("<b>");
    }

    protected onTag_I(tagName: string, end: boolean, attr: string): string {
        return end ? ("</i>") : ("<i>");
    }

    protected onTag_U(tagName: string, end: boolean, attr: string): string {
        return end ? ("</u>") : ("<u>");
    }

    protected onTag_Simple(tagName: string, end: boolean, attr: string): string {
        return end ? ("</" + tagName + ">") : ("<" + tagName + ">");
    }

    protected onTag_COLOR(tagName: string, end: boolean, attr: string): string {
        if (!end) {
            this.lastColor = attr;
            return "<span style=\"color:" + attr + "\">";
        }
        else
            return "</span>";
    }

    protected onTag_FONT(tagName: string, end: boolean, attr: string): string {
        if (!end)
            return "<span style=\"font-family:" + attr + "\">";
        else
            return "</span>";
    }

    protected onTag_SIZE(tagName: string, end: boolean, attr: string): string {
        if (!end) {
            this.lastSize = attr;
            return "<span style=\"font-size:" + attr + "px\">";
        }
        else
            return "</span>";
    }

    protected getTagText(remove?: boolean): string {
        var pos1: number = this._readPos;
        var pos2: number;
        var result: string = "";
        while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
            if (this._text.charCodeAt(pos2 - 1) == 92)//\
            {
                result += this._text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
            }
            else {
                result += this._text.substring(pos1, pos2);
                break;
            }
        }
        if (pos2 == -1)
            return null;

        if (remove)
            this._readPos = pos2;

        return result;
    }

    public parse(text: string, remove?: boolean): string {
        this._text = text;
        this.lastColor = null;
        this.lastSize = null;

        var pos1: number = 0, pos2: number, pos3: number;
        var end: boolean;
        var tag: string, attr: string;
        var repl: string;
        var func: Function;
        var result: string = "";
        while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
            if (pos2 > 0 && this._text.charCodeAt(pos2 - 1) == 92)//\
            {
                result += this._text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
                continue;
            }

            result += this._text.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = this._text.indexOf("]", pos1);
            if (pos2 == -1)
                break;

            end = this._text.charAt(pos1 + 1) == '/';
            tag = this._text.substring(end ? pos1 + 2 : pos1 + 1, pos2);
            this._readPos = pos2 + 1;
            attr = null;
            repl = null;
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                attr = tag.substring(pos3 + 1);
                tag = tag.substring(0, pos3);
            }
            tag = tag.toLowerCase();
            func = this._handlers[tag];
            if (func != null) {
                if (!remove) {
                    repl = func.call(this, tag, end, attr);
                    if (repl != null)
                        result += repl;
                }
            }
            else
                result += this._text.substring(pos1, this._readPos);
            pos1 = this._readPos;
        }

        if (pos1 < this._text.length)
            result += this._text.substr(pos1);

        this._text = null;

        return result;
    }
}

export var defaultParser: UBBParser = new UBBParser();