import template from "./color-picker.template";
import CoreView from "./core-view";

class ColorPicker extends CoreView {
  constructor(container: string) {
    super(container, template);
  }
}

export default ColorPicker;
