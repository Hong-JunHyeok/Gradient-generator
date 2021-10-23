import template from "./main.template";
import { title } from "../data/site-meta.json";
import ColorPicker from "../views/color-picker";
import GradientBar from "../views/gradient-bar";
import { AnyObject } from "../types/common";
import PrevGradient from "../views/prev-gradient";

export default class MainPage {
  private _template: string;
  private _container: HTMLElement;
  private _fields = [];
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    this._template = template({ title });
    this._container = document.getElementById(container);
    this._data = data;

    this.initialize();
  }

  private initialize() {
    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const colorPicker = new ColorPicker("#color-picker", {});
    const gradientBar = new GradientBar("#gradient-bar", {});

    this._fields.push(prevGradient);
    this._fields.push(colorPicker);
    this._fields.push(gradientBar);
  }

  render = () => {
    this._container.innerHTML = this._template;
    this._fields.forEach((field) => {
      field.render();
    });
  };
}
