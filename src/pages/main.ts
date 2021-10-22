import template from "./main.template";
import { title } from "../data/site-meta.json";
import ColorPicker from "../views/color-picker";

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
    const colorPicker = new ColorPicker("#color-picker");
    this._fields.push(colorPicker);
  }

  render = () => {
    this._container.innerHTML = this._template;
    this._fields.forEach((field) => {
      // console.log(field);
      field.render(true);
    });
  };
}
