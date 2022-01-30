import CoreView from "../core-view";
import template from "./prev-gradient.template";
import { IStore } from "../../store";
import { fontResizer } from '../../utils';

class PrevGradient extends CoreView {
  private _data: IStore;

  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  render = (appendChild?: boolean) => {
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

    fontResizer({
      parentElement: document.querySelector<HTMLDivElement>('#prev-gradient')!,
      textElement: document.querySelector<HTMLParagraphElement>('#text-container')!
    })
  };
}

export default PrevGradient;
