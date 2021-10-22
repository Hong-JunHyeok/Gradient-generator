import template from "./color-picker.template";
import CoreView from "./core-view";

interface ColorPickerData {}

class ColorPicker extends CoreView {
  constructor(container: string, data: ColorPickerData) {
    super(container, template(data));
  }
}

export default ColorPicker;
