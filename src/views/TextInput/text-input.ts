import { IStore } from "@src/store";
import { saveStoreData } from '@src/utils/localSaver'
import CoreView from "../core-view";
import template from "./text-input.template";
import PrevGradient, { prevGradientTemplate } from "../PrevGradient";

class TextInput extends CoreView {
  private _data: IStore;
  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }
  
  private initialize() {
    const textInputEl = document.querySelector<HTMLInputElement>('#input-text')

    if(this._data.textData.textValue && textInputEl) {
      textInputEl.value = this._data.textData.textValue;
    }
  }

  private onChangeText = (event: Event) => {
    const textValue = (event.target as HTMLInputElement).value;
    
    this._data.textData = { ...this._data.textData , textValue };


    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    prevGradient.render(prevGradientTemplate(this._data));
    saveStoreData(this._data);
  }

  public attachEventHandler = () => {
    const textInputEl = document.querySelector<HTMLInputElement>('#text-input');

    textInputEl?.addEventListener('input', this.onChangeText)
    this.initialize();
  }
}

export default TextInput
