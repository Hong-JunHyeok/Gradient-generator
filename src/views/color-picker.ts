import template from "./color-picker.template";
import CoreView from "./core-view";
import { nextTick } from "../utils";

interface ColorPickerData {}

class ColorPicker extends CoreView {
  private _pickColor: string;

  constructor(container: string, data: ColorPickerData) {
    super(container, template(data));

    nextTick(this.attachEventHandler);
  }

  onChange = (event: any) => {
    this._pickColor = event.target.value;
  };

  attachEventHandler = () => {
    document
      .querySelector(this._container)
      .addEventListener("change", this.onChange);
  };

  get pickColor() {
    return this._pickColor;
  }

  set pickColor(colorHexCode: string) {
    this._pickColor = colorHexCode;
  }
}

export default ColorPicker;
