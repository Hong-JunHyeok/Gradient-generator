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
      (event.target as HTMLElement).parentElement?.dataset.index
    );

    if (colorItemIndex !== undefined) {
      const findActiveColor = this._data.colorList.find(
        (colorItem: ColorItem) => colorItem.index === colorItemIndex
      );

      if (findActiveColor) {
        this._data.activeColor = findActiveColor;
        this.render();
        this.attachEventHandler();
      }
    }
  };

  onDelete = (event: Event) => {
    event.preventDefault();
    const handleTarget = Number((event.target as HTMLElement).dataset.index);

    if (this._data.colorList.length === 2) {
      return;
    }

    if (!isNaN(handleTarget)) {
      this._data.colorList = this._data.colorList.filter(
        (colorItem: ColorItem) => colorItem.index !== handleTarget
      );

      const prevGradient = new PrevGradient("#prev-gradient", this._data);
      const codeViewer = new CodeViewer("#code-viewer", this._data);

      codeViewer.render();
      prevGradient.render(false);

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

    if (changeElement) {
      this._data.colorList[changeElementIndex] = {
        ...changeElement,
        stop: Number(inputElement.value),
      };

      this._data.activeColor = changeElement;
      this._data.colorList.sort((a, b) => a.stop - b.stop);
    }

    inputElement.addEventListener("blur", () => {
      this.render();
      this.attachEventHandler();
    });
    codeViewer.render();
    prevGradient.render(false);
  };

  static convertHexToRgb = (hexCode: string) => {
    const value = hexCode.match(/[A-Za-z0-9]{2}/g);

    return "rgb(" + value?.map((hex) => parseInt(hex, 16)).join(",") + ")";
  };

  onChangeColor = (event: Event) => {
    const inputTarget = event.target as HTMLInputElement;
    const inputTargetIndex = Number(inputTarget.dataset.index);

    this._data.colorList.forEach((colorItem, index, colorListObj) => {
      if (colorItem.index === inputTargetIndex) {
        this._data.activeColor = {
          ...this._data.activeColor,
          index: inputTargetIndex,
          color: ColorList.convertHexToRgb(inputTarget.value),
        };

        colorListObj[index] = this._data.activeColor;
      }
    });

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    codeViewer.render();
    prevGradient.render(false);

    this.onChangeActive(event);
    this.attachEventHandler();
  };

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  onCreateNewColor = () => {
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
      colorItem.addEventListener("click", this.onChangeActive, false);
    });

    const newColor = document.querySelector("#new-color");
    newColor?.addEventListener("click", this.onCreateNewColor);

    const colorInputs = document.querySelectorAll("#color-picker");
    colorInputs.forEach((colorItem) => {
      colorItem.addEventListener("input", this.onChangeColor);
      colorItem.addEventListener("blur", () => {
        this.render();
        this.attachEventHandler();
      });
    });
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
