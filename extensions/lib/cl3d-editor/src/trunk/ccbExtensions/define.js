import * as CL3D from 'cl3d';

/**
 * @typedef {Object} property_behavior_RadioButton
 * @property {'behavior_RadioButton'} _JsClassName
 * @property {} Active_Color
 * @property {} Variable
 * @property {} Value
 * @property {} Action
 * @property {} Use_Image
 * @property {} Active_Image
 * @property {} Scale_Hover
 * @property {} Scale_Click
 */

/**
 * @typedef {Object} property_behavior_ToggleButton
 * @property {'behavior_ToggleButton'} _JsClassName
 * @property {} Bar
 * @property {} Knob
 * @property {} Variable
 * @property {} Bar_ON_Color
 * @property {} Auto_Color_Bar
 * @property {} Knob_ON_Color
 * @property {} Scale_Hover_Knob
 * @property {} Scale_Click_Knob
 * @property {} Additional_Position
 * @property {} Use_Image
 * @property {} Bar_ON_Image
 * @property {} Knob_ON_Image
 * @property {} InitialState
 * @property {} Animated
 */

/**
 * @typedef {Object} property_behavior_Slider
 * @property {'behavior_Slider'} _JsClassName
 * @property {} Bar
 * @property {} Knob
 * @property {} Variable
 * @property {} Initial_Value
 * @property {} Min
 * @property {} Max
 * @property {} SliderFillColor
 * @property {} AutoFillColor
 * @property {} SliderFillHeight
 * @property {} AdditionalHeight
 * @property {} Reverse_SliderFill
 * @property {} FillFromCenter
 * @property {} EnableMouseScroll
 * @property {} ScrollMultiplier
 * @property {} Scale_Hover_Knob
 * @property {} Scale_Click_Knob
 * @property {} Use_Image
 * @property {} SliderFill_Image
 * @property {} Hover_Action
 */

/**
 * @typedef {property_behavior_RadioButton|
 * property_behavior_ToggleButton|
 * property_behavior_Slider} property
 */

/**
 * @param {property} props 
 * @returns 
 */
export function defineProperties(props) {
    return props;
}

export class SpecialNumber {
    /**
     * @param {'color'|'enum'|'scenenode'} name 
     * @param {number} number 
     */
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
};

/**
 * @param {'color'|'enum'|'scenenode'} name 
 * @param {number} number 
 * @returns 
 */
export function defineSpecialNumber(name, number) {
    return new SpecialNumber(name, number);
}

/**
 * @param {CL3D.Action[]} actions 
 */
export function defineActionHandler(actions) {
    let actionHandler = new CL3D.ActionHandler(CL3D.gDocument.getCurrentScene());
    
    actions.forEach((action) => {
        actionHandler.addAction(action);
    });

    return actionHandler;
}
