import template from "./main.template";
import { title } from "../data/site-meta.json";

export default class MainPage {
  private _template: string;
  private _container: HTMLElement;

  constructor(container: string) {
    this._template = template({ title });
    this._container = document.getElementById(container);
  }

  render = () => {
    this._container.innerHTML = this._template;
  };
}
