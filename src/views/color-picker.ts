import template from "./color-picker.template";
import CoreView from "./core-view";
import { AnyObject } from "../types/common";
import PrevGradient from "./prev-gradient";
import { ColorItem } from "../store";

class ColorPicker extends CoreView {
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    super(container, template(data));
    this._data = data;

    this.attachEventHandler();
  }

  onChange = (event: any) => {
    this._data.activeColor = {
      ...this._data.activeColor,
      color: event.target.value,
    };

    this._data.colorList.forEach(
      (colorItem: ColorItem, _: number, colorList: ColorItem[]) => {
        if (colorItem.index === this._data.activeColor.index) {
          colorList[colorItem.index] = this._data.activeColor;
        }
      }
    );

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    prevGradient.render();
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
