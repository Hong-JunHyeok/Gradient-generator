import template from "./notfound.template";

export default class NotFoundPage {
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
