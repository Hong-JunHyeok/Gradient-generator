import { IStore } from "@src/store";
import {DEFAULT_FONT_SIZE} from '@src/constants';
import { fontResizer } from '@src/utils';
import CoreView from "../core-view";
import template from "./prev-gradient.template";

class PrevGradient extends CoreView {
  private _data: IStore;

  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;

    window.addEventListener('resize', () => {
      const parentElement = document.querySelector<HTMLDivElement>('#prev-gradient')!;
      const textElement = document.querySelector<HTMLParagraphElement>('#text-container')!;

      textElement.style.fontSize = DEFAULT_FONT_SIZE;

      fontResizer({
        parentElement,
        textElement
      })
    })
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
