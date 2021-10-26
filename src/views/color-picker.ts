import template from "./color-picker.template";
import CoreView from "./core-view";
import PrevGradient from "./prev-gradient";
import ColorList from "./color-list";
import { AnyObject } from "../types/common";
import { ColorItem } from "../store";
import CodeViewer from "./code-viewer";

class ColorPicker extends CoreView {
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    super(container, template(data));
    this._data = data;

    this.attachEventHandler();
  }

  convertHexToRgb = (hexCode: string) => {
    const value = hexCode.match(/[A-Za-z0-9]{2}/g);

    return "rgb(" + value?.map((hex) => parseInt(hex, 16)).join(",") + ")";
  };

  onChange = (event: any) => {
    this._data.activeColor = {
      ...this._data.activeColor,
      color: this.convertHexToRgb(event.target.value),
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
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    codeViewer.render();
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
