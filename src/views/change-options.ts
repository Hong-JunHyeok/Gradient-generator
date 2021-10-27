import CoreView from "./core-view";
import template from "./change-options.template";
import PrevGradient from "./prev-gradient";
import ColorList from "./color-list";
import CodeViewer from "./code-viewer";
import { IStore } from "../store";

class ChangeOptions extends CoreView {
  private _data: IStore;
  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  private onChangeAangle = (event: Event) => {
    let changeValue = Number((event.target as HTMLInputElement).value);

    this._data.angle = changeValue;

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    const allElementsExceptAngle = document.body.querySelectorAll<HTMLElement>(
      "*:not(#angle-container,#prev-gradient)"
    );

    allElementsExceptAngle.forEach((element) => {
      element.classList.add("translucent");
    });

    codeViewer.render();
    prevGradient.render(false);
  };

  private onBlurAngle = (event: Event) => {
    const allElementsExceptAngle = document.querySelectorAll<HTMLElement>(
      "*:not(#angle-container,#prev-gradient)"
    );

    allElementsExceptAngle.forEach((element) => {
      element.classList.remove("translucent");
    });
  };

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
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    this.render(false);
    this.attachEventHandler();

    codeViewer.render();
    prevGradient.render(false);
    colorList.render(false);
    colorList.attachEventHandler();
  };

  attachEventHandler = () => {
    const lieanrButton = document.querySelector(`${this._container} #linear`);
    const radianButton = document.querySelector(`${this._container} #radial`);
    const changeAngle = document.getElementById("change-angle");

    lieanrButton?.addEventListener("click", this.onClick);
    radianButton?.addEventListener("click", this.onClick);
    changeAngle?.addEventListener("input", this.onChangeAangle);
    changeAngle?.addEventListener("mouseup", this.onBlurAngle);
  };

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

export default ChangeOptions;
