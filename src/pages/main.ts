import template from "./main.template";
import ColorPicker from "../views/color-picker";
import PrevGradient from "../views/prev-gradient";
import ColorList from "../views/color-list";
import ChangeOptions from "../views/change-options";
import CodeViewer from "../views/code-viewer";

import { title } from "../data/site-meta.json";
import { AnyObject } from "../types/common";
import { IStore } from "../store";

export default class MainPage {
  private _template: string;
  private _container: HTMLElement;
  private _fields: AnyObject[] = [];
  private _data: IStore;

  constructor(container: string, data: IStore) {
    this._template = template({ title });
    this._container = document.getElementById(container) as HTMLElement;
    this._data = data;

    this.initialize();
  }

  private initialize() {
    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    // const colorPicker = new ColorPicker("#color-picker", this._data);
    const colorList = new ColorList("#color-list", this._data);
    const changeOptions = new ChangeOptions("#change-option", this._data);
    const codeViewer = new CodeViewer("#code-viewer", this._data);

    this._fields.push(prevGradient);
    // this._fields.push(colorPicker);
    this._fields.push(colorList);
    this._fields.push(changeOptions);
    this._fields.push(codeViewer);
  }

  public render = () => {
    this._container.innerHTML = this._template;
    this._fields.forEach((field) => {
      field.render(false);

      if (field.attachEventHandler) {
        field.attachEventHandler();
      }
    });
  };
}
