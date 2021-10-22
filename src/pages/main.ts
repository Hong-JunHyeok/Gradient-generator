import template from "./main.template";
import { title } from "../data/site-meta.json";
import ColorPicker from "../views/color-picker";
import GradientBar from "../views/gradient-bar";

export default class MainPage {
  private _template: string;
  private _container: HTMLElement;
  private _fields = [];

  constructor(container: string) {
    this._template = template({ title });
    this._container = document.getElementById(container);

    this.initialize();
  }

  private initialize() {
    const colorPicker = new ColorPicker("#color-picker", {});
    const gradientBar = new GradientBar("#gradient-bar", {});

    this._fields.push(colorPicker);
    this._fields.push(gradientBar);
  }

  render = () => {
    this._container.innerHTML = this._template;
    this._fields.forEach((field) => {
      // console.log(field);
      field.render(true);
    });
  };
}
