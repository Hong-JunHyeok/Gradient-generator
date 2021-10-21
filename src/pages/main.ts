import template from "./main.template";

export default class MainPage {
  private _template: string;
  private _container: HTMLElement;

  constructor(container: string) {
    this._template = template;
    this._container = document.getElementById(container);
  }

  render = () => {
    this._container.innerHTML = this._template;
  };
}
