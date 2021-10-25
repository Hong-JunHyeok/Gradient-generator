import PrevGradient from "./prev-gradient";
import CoreView from "./core-view";
import template from "./color-list.template";
import { AnyObject } from "../types/common";
import { ColorItem } from "../store";

class ColorList extends CoreView {
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    super(container, template(data));
    this._data = data;

    this.attachEventHandler();
  }

  onClick = (event: any) => {
    const colorItemIndex = Number(
      (event.target as HTMLLIElement).dataset.index
    );

    if (!isNaN(colorItemIndex)) {
      this._data.activeColor = this._data.colorList.find(
        (colorItem: ColorItem) => colorItem.index === colorItemIndex
      );

      this.render();
      this.attachEventHandler();
    }
  };

  onChange = (event: any) => {
    const inputElement = event.target as HTMLInputElement;
    const changeInputIndex = Number(inputElement.dataset.index);

    this._data.colorList.forEach(
      (colorItem: ColorItem, _: number, colorListData: ColorItem[]) => {
        if (colorItem.index === changeInputIndex) {
          colorListData[colorItem.index] = {
            ...colorListData[colorItem.index],
            stop: Number(inputElement.value),
          };
        }
      }
    );

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    // const gradientBar = new GradientBar("#palette-gradient", this._data);

    prevGradient.render(false);
    // gradientBar.render(false);

    // this.render();
    // this.attachEventHandler();
  };

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  handleCreateNewColor = () => {
    this._data.colorList.push({
      color: this._data.activeColor.color,
      stop: this._data.colorList[this._data.colorList.length - 1].stop + 1,
      index: this._data.colorList.length,
    });

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const colorList = new ColorList("#color-list", this._data);

    prevGradient.render(false);

    colorList.render();
    this.attachEventHandler();
  };

  attachEventHandler = () => {
    const colorItems = document.querySelectorAll(`#color-item`);
    colorItems.forEach((colorItem) => {
      colorItem.children[2]?.addEventListener("input", this.onChange, false);
      colorItem.children[3]?.addEventListener("click", this.onClick, false);
    });
    const newColor = document.querySelector("#new-color");
    newColor?.addEventListener("click", this.handleCreateNewColor);
  };

  render = (appendChild: boolean = false) => {
    //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
    const container = document.querySelector("#color-list");

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template(this._data);

      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        this.attachEventHandler();
        container.innerHTML = template(this._data);
      }
    }
  };
}

export default ColorList;
