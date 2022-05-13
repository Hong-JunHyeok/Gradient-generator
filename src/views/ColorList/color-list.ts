import { ColorItem, IStore } from "@src/store";
import { saveStoreData } from '@src/utils/localSaver'

import PrevGradient, { prevGradientTemplate } from "../PrevGradient";
import CoreView from "../core-view";
import template from "./color-list.template";
import { colorListTemplate } from ".";

class ColorList extends CoreView {
  private _data: IStore;

  constructor(container: string, data: IStore) {
    super(container, template(data));
    this._data = data;
  }

  onChangeActive = (event: Event) => {
    const colorItemIndex = (event.target as HTMLElement).parentElement?.dataset.index
      
      if (colorItemIndex) {
      const findActiveColor = this._data.colorList.find(
        (colorItem: ColorItem) => colorItem.index === Number(colorItemIndex)
      );

      this._data.activeColor = findActiveColor!;
      if (findActiveColor && (event.target as HTMLInputElement).tagName !==  "INPUT") {
        this._data.activeColor = findActiveColor;
        this.render(template(this._data), this.attachEventHandler);
        saveStoreData(this._data)
      }
    }
  };

  onDelete = (event: Event) => {
    event.preventDefault();
    const handleTarget = Number((event.target as HTMLElement).dataset.index);

    if (this._data.colorList.length === 2) return;

    if (!isNaN(handleTarget)) {
      this._data.colorList = this._data.colorList.filter(
        (colorItem: ColorItem) => colorItem.index !== handleTarget
      );

      PrevGradient.backgroundColorChange(this._data);
      this.render(template(this._data), this.attachEventHandler);
      saveStoreData(this._data)
    }
  };

  onChangeStop = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const changeInputIndex = Number(inputElement.dataset.index);

    const changeElement = this._data.colorList.find(
      (colorItem: ColorItem) => colorItem.index === changeInputIndex
    );
    const changeElementIndex = this._data.colorList.indexOf(changeElement!);

    if (changeElement) {
      this._data.colorList[changeElementIndex] = {
        ...changeElement,
        stop: Number(inputElement.value),
      };
      
      const sortedColorList = [...this._data.colorList]
      .sort((cur, next) => cur.stop - next.stop)

      this._data.colorList = sortedColorList
      this._data.activeColor = changeElement;
    }

    PrevGradient.backgroundColorChange(this._data);
    saveStoreData(this._data)
    // const prevGradient = new PrevGradient("#prev-gradient", this._data);
    // prevGradient.render(prevGradientTemplate(this._data), this.attachEventHandler);
  };

  static convertHexToRgb = (hexCode: string) => {
    const value = hexCode.match(/[A-Za-z0-9]{2}/g);

    return "rgb(" + value?.map((hex) => parseInt(hex, 16)).join(",") + ")";
  };

  onChangeColor = (event: Event) => {
    const inputTarget = event.target as HTMLInputElement;
    const inputTargetIndex = Number(inputTarget.dataset.index);

    this._data.colorList.forEach(({index}, indexNumber, colorListObj) => {
      if(inputTargetIndex === index){
        this._data.activeColor = {
          ...this._data.colorList[indexNumber],
          index:this._data.colorList[indexNumber].index, 
          stop: this._data.colorList[indexNumber].stop,
          color: ColorList.convertHexToRgb(inputTarget.value),
        };
        colorListObj[indexNumber] = this._data.activeColor;
      }
    })

    PrevGradient.backgroundColorChange(this._data);
    this.onChangeActive(event);
    saveStoreData(this._data);
  };

  onBlurColorInput = () => {
    const colorList = new ColorList("#color-list", this._data);
    colorList.render(colorListTemplate(this._data), this.attachEventHandler);
    saveStoreData(this._data);
  }

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
      color: this._data.activeColor!.color,
      stop: this._data.colorList[this._data.colorList.length - 1].stop + 1,
      index: this._data.colorItemIndex++,
    };

    this._data.colorList = [...this._data.colorList, newColorItem];
    PrevGradient.backgroundColorChange(this._data);
    this.render(template(this._data), this.attachEventHandler)
    saveStoreData(this._data)
  };

  onPointerUp = () => {
    this.render(template(this._data))
    this.attachEventHandler();
    saveStoreData(this._data)
  }

  attachEventHandler = () => {
    const colorItems = document.querySelectorAll(`#color-item`);

    colorItems.forEach((colorItem) => {
      colorItem.children[0]?.addEventListener("click", this.onDelete);
      colorItem.children[2]?.addEventListener("input", this.onChangeStop);
      colorItem.children[2]?.addEventListener("pointerup", this.onPointerUp);
      colorItem.addEventListener("click", this.onChangeActive);
    });

    const newColor = document.querySelector("#new-color");
    newColor?.addEventListener("click", this.onCreateNewColor);

    const colorInputs = document.querySelectorAll<HTMLInputElement>("#color-picker-input");
    colorInputs.forEach((colorItem) => {
      colorItem.addEventListener("input", this.onChangeColor.bind(this));
      colorItem.addEventListener("blur", this.onBlurColorInput.bind(this));
    });
  };
}

export default ColorList;
