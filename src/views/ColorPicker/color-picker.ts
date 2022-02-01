import { IStore } from "@src/store";
import { colorSet } from '@src/data/color-data'
import { saveStoreData } from '@src/utils/localSaver'
import template from "./color-picker.template";
import CoreView from "../core-view";
import PrevGradient from "../PrevGradient";

class ColorPicker extends CoreView {
  private _data: IStore;

  constructor(container: string, data: IStore) {
    super(container, template(data));
    this._data = data;
  }

  changeTextColor(event: Event) {
    const colorItemEl = event.target as HTMLLIElement;
    const colorHex = colorItemEl.dataset.colorhex;


    if(colorHex) {
      this._data.textData.textColor = colorHex

      const prevGradient = new PrevGradient("#prev-gradient", this._data);

      prevGradient.render();
      saveStoreData(this._data);
    }
  }

  public attachEventHandler = () => {
    const colorListEl = document.querySelectorAll<HTMLLIElement>('.pallete_color');

    colorListEl.forEach((colorItem) => {
      colorItem.addEventListener('click', this.changeTextColor.bind(this))
    })    
  }

  render = (appendChild: boolean) => {
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template(this._data);
      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = template({...this._data, colorSet});
      }
    }
  }
}

export default ColorPicker;
