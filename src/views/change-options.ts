import CoreView from "./core-view";
import template from "./change-options.template";
import { AnyObject } from "../types/common";
import PrevGradient from "./prev-gradient";
import ColorList from "./color-list";

class ChangeOptions extends CoreView {
  private _data;
  constructor(container: string, data: AnyObject) {
    super(container, template(data));

    this._data = data;
  }

  onClick = (event: any) => {
    const { id } = event.target as HTMLButtonElement;

    switch (id) {
      case "linear":
        this._data.isLinear = true;
        break;
      case "radial":
        this._data.isLinear = false;
        break;
      default:
        throw new Error("Unhandled Error");
    }

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const colorList = new ColorList("#color-list", this._data);

    prevGradient.render(false);
    colorList.render(false);
    colorList.attachEventHandler();
  };

  attachEventHandler = () => {
    const lieanrButton = document.querySelector(`${this._container} #linear`);
    const radianButton = document.querySelector(`${this._container} #radial`);

    lieanrButton?.addEventListener("click", this.onClick);
    radianButton?.addEventListener("click", this.onClick);
  };

  render = (appendChild: boolean) => {
    //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
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

export default ChangeOptions;
