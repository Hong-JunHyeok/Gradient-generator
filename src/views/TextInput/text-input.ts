import CoreView from "../core-view";
import template from "./text-input.template";
import { AnyObject } from "../../types/common";

class TextInput extends CoreView {
  private _data: AnyObject;
  constructor(container: string, data: AnyObject) {
    super(container, template(data));

    this._data = data;
  }
  
  private onChangeText = (event: Event) => {
    const textValue = (event.target as HTMLInputElement).value;
  }

  public attachEventHandler = () => {
    const textInputEl = document.querySelector<HTMLInputElement>('#text-input');
    console.log(textInputEl)

    textInputEl?.addEventListener('input', this.onChangeText)
  }

  render = (appendChild: boolean) => {
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template(this._data);
      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = template(this._data);
      }
    }
  }
}

export default TextInput
