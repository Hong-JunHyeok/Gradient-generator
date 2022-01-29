import CoreView from "../core-view";
import template from "./change-options.template";
import PrevGradient from "../PrevGradient";
import ColorList from "../ColorList";
import CodeViewer from "../CodeViewer";
import { IStore } from "../../store";

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

    const angleInner = document.getElementById("angle");

    if (angleInner) {
      angleInner.innerHTML = `Angle : ${this._data.angle}`;
    }

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

  private onChangeAngleByButton = (event: Event) => {
    const buttonTarget = event.target as HTMLButtonElement;
    const targetValue = Number(buttonTarget.dataset.value);

    if (targetValue === -1 && this._data.angle - 1 >= 0) {
      this._data.angle -= 1;
    }

    if (targetValue === 1 && this._data.angle + 1 <= 360) {
      this._data.angle += 1;
    }

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    prevGradient.render(false);
    codeViewer.render();

    this.render(false);
    this.attachEventHandler();
  };

  attachEventHandler = () => {
    const lieanrButton = document.querySelector(`${this._container} #linear`);
    const radianButton = document.querySelector(`${this._container} #radial`);
    const changeAngle = document.getElementById("change-angle");
    const increase = document.getElementById("increase");
    const decrease = document.getElementById("decrease");

    lieanrButton?.addEventListener("click", this.onClick);
    radianButton?.addEventListener("click", this.onClick);
    changeAngle?.addEventListener("input", this.onChangeAangle);
    changeAngle?.addEventListener("mouseup", this.onBlurAngle);
    increase?.addEventListener("click", this.onChangeAngleByButton);
    decrease?.addEventListener("click", this.onChangeAngleByButton);
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
