import CoreView from "../core-view";
import template from "./prev-gradient.template";
import { IStore } from "../../store";
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from '../../constants';

class PrevGradient extends CoreView {
  private _data: IStore;

  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  public fontResizer(): void {
    const prevGradient = document.querySelector<HTMLDivElement>('#prev-gradient');
    const textContainer = document.querySelector<HTMLParagraphElement>('#text-container');

    let prevOffset = prevGradient && prevGradient.offsetWidth;
    let textOffset = textContainer && textContainer.offsetWidth;
  
    while(textOffset! > prevOffset! && textContainer) {
      const currentFontSize = parseInt(textContainer.style.fontSize, 10);
      let resizedFontSize = currentFontSize - 16;

      if(resizedFontSize <= MIN_FONT_SIZE) break;
      textContainer.style.fontSize = `${resizedFontSize}px`

      prevOffset = prevGradient && prevGradient.offsetWidth;
      textOffset = textContainer && textContainer.offsetWidth;
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
