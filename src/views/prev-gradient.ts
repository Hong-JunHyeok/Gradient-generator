import CoreView from "./core-view";
import template from "./prev-gradient.template";
import { AnyObject } from "../types/common";

class PrevGradient extends CoreView {
  private _data: AnyObject;
  constructor(container: string, data: AnyObject) {
    super(container, template(data));

    this._data = data;
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
  };
}

export default PrevGradient;
