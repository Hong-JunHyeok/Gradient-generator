import template from "./color-picker.template";
import CoreView from "./core-view";
import { AnyObject } from "../types/common";

class ColorPicker extends CoreView {
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    super(container, template(data));
    this._data = data;

    this.attachEventHandler();
  }

  onChange = (event: any) => {
    this._data.pickColor = event.target.value;
  };

  attachEventHandler = () => {
    const colorPickerDom = document.querySelector(`${this._container} > input`);

    colorPickerDom?.addEventListener("input", this.onChange);
  };

  get pickColor() {
    return this._data.pickColor;
  }

  set pickColor(colorHexCode: string) {
    this._data.pickColor = colorHexCode;
  }
}

export default ColorPicker;
