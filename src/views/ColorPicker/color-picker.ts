import { IStore } from "@src/store";
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
      PrevGradient.colorChange(colorHex);
      saveStoreData(this._data);
    }
  }

  public attachEventHandler = () => {
    const colorListEl = document.querySelectorAll<HTMLLIElement>('.pallete_color');

    colorListEl.forEach((colorItem) => {
      colorItem.addEventListener('click', this.changeTextColor.bind(this))
    })
  }
}

export default ColorPicker;
