import PrevGradient from "./prev-gradient";
import CoreView from "./core-view";
import template from "./color-list.template";
import { ColorItem, IStore } from "../store";
import CodeViewer from "./code-viewer";

class ColorList extends CoreView {
  private _data: IStore;

  constructor(container: string, data: IStore) {
    super(container, template(data));
    this._data = data;

    this.attachEventHandler();
  }

  onChangeActive = (event: Event) => {
    const colorItemIndex = Number(
      (event.target as HTMLLIElement).dataset.index
    );

    if (!isNaN(colorItemIndex)) {
      const findActiceColor = this._data.colorList.find(
        (colorItem: ColorItem) => colorItem.index === colorItemIndex
      );

      if (findActiceColor) {
        this._data.activeColor = findActiceColor;
      }

      this.render();
      this.attachEventHandler();
    }
  };

  onDelete = (event: Event) => {
    const handleTarget = Number((event.target as HTMLElement).dataset.index);

    if (this._data.colorList.length === 2) {
      return;
    }

    if (!isNaN(handleTarget)) {
      this._data.colorList = this._data.colorList.filter(
        (colorItem: ColorItem) => colorItem.index !== handleTarget
      );

      this.render();
      this.attachEventHandler();
    }
  };

  onChange = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const changeInputIndex = Number(inputElement.dataset.index);

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    const changeElement = this._data.colorList.find(
      (colorItem: ColorItem) => colorItem.index === changeInputIndex
    );
    const changeElementIndex = this._data.colorList.indexOf(changeElement!);

    this._data.colorList[changeElementIndex] = {
      ...this._data.colorList[changeElementIndex],
      stop: Number(inputElement.value),
    };

    codeViewer.render();
    prevGradient.render(false);
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
    const newColorItem = {
      color: this._data.activeColor.color,
      stop: this._data.colorList[this._data.colorList.length - 1].stop + 1,
      index: this._data.colorItemIndex++,
    };

    this._data.colorList = [...this._data.colorList, newColorItem];

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    codeViewer.render();
    prevGradient.render(false);

    this.render();
    this.attachEventHandler();
  };

  attachEventHandler = () => {
    const colorItems = document.querySelectorAll(`#color-item`);
    colorItems.forEach((colorItem) => {
      colorItem.children[0]?.addEventListener("click", this.onDelete, false);
      colorItem.children[2]?.addEventListener("input", this.onChange, false);
      colorItem.children[3]?.addEventListener(
        "click",
        this.onChangeActive,
        false
      );
    });
    const newColor = document.querySelector("#new-color");
    newColor?.addEventListener("click", this.handleCreateNewColor);
  };

  render = (appendChild: boolean = false) => {
    console.log("=========================");
    this._data.colorList.forEach((colorItem) => console.log(colorItem.index));
    console.log("=========================");
    console.log(this._data.activeColor);
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
