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
    
    window.addEventListener('resize', this.fontResizing)
  }

  public fontResizing = () => {
    const parentElement = document.querySelector<HTMLDivElement>('#prev-gradient')!;
    const textElement = document.querySelector<HTMLParagraphElement>('#text-container')!;

    textElement.style.fontSize = DEFAULT_FONT_SIZE;

    fontResizer({
      parentElement,
      textElement
    })

  }

  static backgroundColorChange = ({isLinear, colorList, angle}: IStore) => {
    let inlineStyle = `
    ${isLinear ? 'linear' : 'radial'}-gradient(${isLinear ? `${angle}deg` : `circle`},
    `;
    
    colorList.forEach(({color, stop}) => {
      inlineStyle += `${color} ${stop}%,`
    })
    inlineStyle = inlineStyle.slice(0, -1);
    
    const prevGradient = document.querySelector<HTMLDivElement>('#prev-gradient')!;
    prevGradient.style.background = inlineStyle;
    console.log(prevGradient.style.background);
  }

  static colorChange = (color: string) => {
    const textContainer = document.querySelector<HTMLParagraphElement>('#text-container')!;
    textContainer.style.color = color;
  }
}

export default PrevGradient;
