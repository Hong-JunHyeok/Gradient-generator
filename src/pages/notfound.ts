import template from "./notfound.template";

export default class NotFoundPage {
  private _template: string;
  private _container: HTMLElement | null;

  constructor(container: string) {
    this._template = template;
    this._container = document.getElementById(container);
  }

  render(){
    if(this._container) 
      this._container.innerHTML = this._template;
  };
}
