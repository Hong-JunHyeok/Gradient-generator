import template from "./color-picker.template";
import CoreView from "./core-view";
import PrevGradient from "./prev-gradient";
import ColorList from "./color-list";
import { AnyObject } from "../types/common";
import { ColorItem } from "../store";
import GradientBar from "./gradient-bar";

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
    const colorList = new ColorList("#color-list", this._data);
    // const gradientBar = new GradientBar("#palette-gradient", this._data);

    prevGradient.render(false);

    colorList.render(false);
    colorList.attachEventHandler();
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

  render = (appendChild: boolean) => {
    //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = this._template;
      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = this._template;
      }
    }
  };
}

export default ColorPicker;
