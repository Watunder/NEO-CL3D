import * as CL3D from 'cl3d';
import { parse } from 'html-to-json';
import { SpecialNumber } from './define.js';

/**
 * @param {string} name 
 * @param {string|number|boolean|SpecialNumber|CL3D.Vect3d|CL3D.Texture|CL3D.ActionHandler} value 
 * @param {'int'|'float'|'string'|'bool'|'enum'|'color'|'vect3d'|'texture'|'scenenode'|'action'} type 
 * @returns 
 */
const initExtensionScriptProp = (name, value, type = null) => {
    const prop = new CL3D.ExtensionScriptProperty();

    if (type) {
        prop.Name = name;
        switch (type) {
            case 'int':
                prop.Type = 0;
                prop.IntValue = Number(value);
                break;
            case 'float':
                prop.Type = 1;
                prop.IntValue = Number(value);
                break;
            case 'string':
                prop.Type = 2;
                prop.StringValue = value;
                break;
            case 'bool':
                prop.Type = 3;
                prop.IntValue = Number(value);
                break;
            case 'enum':
                prop.Type = 4;
                prop.IntValue = Number(value);
                break;
            case 'color':
                prop.Type = 5;
                prop.IntValue = Number(value);
                break;
            case 'vect3d':
                prop.Type = 6;
                let values = value.split(',');
                values = values.map(Number);
                let vect3d = new CL3D.Vect3d(values[0], values[1], values[2]);
                prop.VectorValue = vect3d;
                break;
            case 'texture':
                prop.Type = 7;
                prop.TextureValue = CL3D.gTextureManager.getTexture(value, true);
                break;
            case 'scenenode':
                prop.Type = 8;
                prop.IntValue = Number(value);
                break;
            case 'action':
                prop.Type = 9;
                prop.ActionHandlerValue = CL3D.ScriptingInterface.getScriptingInterface().StoredExtensionScriptActionHandlers[value];
                break;

        }
    } else {
        prop.Name = name;
        switch (typeof value) {
            case 'number':
                if (Number.isInteger(value)) {
                    prop.Type = 0;
                    prop.IntValue = value;
                } else {
                    prop.Type = 1;
                    prop.FloatValue = value;
                }
                break;
            case 'string':
                prop.Type = 2;
                prop.StringValue = value;
                break;
            case 'boolean':
                prop.Type = 3;
                prop.IntValue = Number(value);
                break;
            case 'object':
                if (value instanceof CL3D.Vect3d) {
                    prop.Type = 6;
                    prop.VectorValue = value;
                } else if (value instanceof CL3D.Texture) {
                    prop.Type = 7;
                    prop.TextureValue = value;
                } else if (value instanceof CL3D.ActionHandler) {
                    prop.Type = 9;
                    prop.ActionHandlerValue = value;
                } else if (value instanceof SpecialNumber) {
                    switch (value.name) {
                        case 'enum':
                            prop.Type = 4;
                            prop.IntValue = value.number;
                            break;
                        case 'color':
                            prop.Type = 5;
                            prop.IntValue = value.number;
                            break;
                        case 'scenenode':
                            prop.Type = 8;
                            prop.IntValue = value.number;
                            break;
                    }
                }
                break;
        }
    }

    return prop;
}

/**
 * @param {string} type
 * @param {*} props
 */
export const createAnimatorExtensionScriptFromProps = (props) => {
    let animator = new CL3D.AnimatorExtensionScript();

    animator.JsClassName = props['_JsClassName'];

    Object.keys(props).forEach((name) => {
        if (name[0] === '_')
            return;

        const prop = initExtensionScriptProp(name, props[name]);

        animator.Properties.push(prop);
    });

    return animator;
}

/**
 * @typedef {{key: string, value: string?}} Attributes
 * @typedef {{type: string, tagName: string, attributes: Attributes[], children: Element[]}} Element
 */

/**
 * @param {string} html 
 * @returns {CL3D.AnimatorExtensionScript[]}
 */
export const createAnimatorExtensionScriptFromHTML = (html) => {
    let animators = [];

    /**
     * @type {Element[]}
     */
    const josn = parse(html);

    josn.forEach((element) => {
        let animator = new CL3D.AnimatorExtensionScript();

        if (element.tagName === 'behavior') {
            element.attributes.forEach((attributes) => {
                if (attributes.key === 'jsname') {
                    animator.JsClassName = attributes.value;
                }
            });

            element.children.forEach((element) => {
                const property = {
                    name: '',
                    type: '',
                    default: ''
                }

                if (element.tagName === 'property') {
                    element.attributes.forEach((attributes) => {
                        switch (attributes.key) {
                            case 'name':
                                property.name = attributes.value;
                                break;
                            case 'type':
                                property.type = attributes.value;
                                break;
                            case 'default':
                                property.default = attributes.value;
                                break;
                        }
                    });

                    let prop = initExtensionScriptProp(property.name, property.default, property.type);

                    animator.Properties.push(prop);
                }
            });
        }

        animators.push(animator);
    });

    return animators;
}