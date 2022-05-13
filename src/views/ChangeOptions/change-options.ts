import { IStore } from "@src/store";
import { saveStoreData } from '@src/utils/localSaver'

import CoreView from "../core-view";
import template from "./change-options.template";
import PrevGradient from "../PrevGradient";

class ChangeOptions extends CoreView {
  private _data: IStore;
  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  private onChangeAangle = (event: Event) => {
    let changeValue = Number((event.target as HTMLInputElement).value);

    this._data.angle = changeValue;

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

    PrevGradient.backgroundColorChange(this._data);
    saveStoreData(this._data);
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

    
    PrevGradient.backgroundColorChange(this._data);
    this.render(template(this._data), this.attachEventHandler);
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

    PrevGradient.backgroundColorChange(this._data);
    this.render(template(this._data));
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
    changeAngle?.addEventListener("pointerup", this.onBlurAngle);
    increase?.addEventListener("click", this.onChangeAngleByButton);
    decrease?.addEventListener("click", this.onChangeAngleByButton);

    saveStoreData(this._data)
  };
}

export default ChangeOptions;
