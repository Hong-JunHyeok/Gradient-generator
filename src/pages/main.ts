import template from "./main.template";
import { title } from "../data/site-meta.json";
import ColorPicker from "../views/color-picker";
import GradientBar from "../views/gradient-bar";
import { AnyObject } from "../types/common";
import PrevGradient from "../views/prev-gradient";
import ColorList from "../views/color-list";

export default class MainPage {
  private _template: string;
  private _container: HTMLElement;
  private _fields: AnyObject[] = [];
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    this._template = template({ title });
    this._container = document.getElementById(container) as HTMLElement;
    this._data = data;

    this.initialize();
  }

  private initialize() {
    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const colorPicker = new ColorPicker("#color-picker", this._data);
    const gradientBar = new GradientBar("#gradient-bar", this._data);
    const colorList = new ColorList("#color-list", this._data);

    this._fields.push(prevGradient);
    this._fields.push(colorPicker);
    this._fields.push(gradientBar);
    this._fields.push(colorList);
  }

  onChange = (event: Event) => {
    this._data.pickColor = (event.target as HTMLInputElement).value;
  };

  public render = () => {
    this._container.innerHTML = this._template;
    this._fields.forEach((field) => {
      field.render();

      if (field.attachEventHandler) {
        field.attachEventHandler();
      }
    });
  };
}
