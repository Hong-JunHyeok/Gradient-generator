import CoreView from "../core-view";
import template from "./prev-gradient.template";
import { IStore } from "../../store";

class PrevGradient extends CoreView {
  private _data: IStore;
  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  render = (appendChild?: boolean) => {
    console.log(this._data.textData)
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
  };
}

export default PrevGradient;
