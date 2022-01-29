import CoreView from "../core-view";
import template from "./prev-gradient.template";
import { IStore } from "../../store";

class PrevGradient extends CoreView {
  private _data: IStore;

  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  private fontResizer(): void {
    const prevGradient = document.querySelector<HTMLDivElement>('#prev-gradient');
    const textContainer = document.querySelector<HTMLParagraphElement>('#text-container');

    const prevOffset = prevGradient && prevGradient.offsetWidth;
    const textOffset = textContainer && textContainer.offsetWidth;

    let rest = 10;
    if(prevOffset && textOffset) {
      rest = prevOffset / textOffset;
      console.log(`Rest : ${rest}`);
    }


    if(rest < 1.2 && textContainer) {
      // When text overflow
      textContainer.style.fontSize = '80%';
    }
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

    this.fontResizer()
  };
}

export default PrevGradient;
