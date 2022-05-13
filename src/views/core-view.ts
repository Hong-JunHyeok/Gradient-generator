import { IStore } from "@src/store";
class CoreView {
  protected _template: string;
  protected _container: string;

  constructor(container: string, template: string) {
    this._container = container;
    this._template = template;
  }

  render = (
    template: string,
    renderCallback?: () => void,
    appendChild?: boolean, 
  ) => {
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template;
      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = template;
      }
    }

    if(renderCallback) renderCallback();
  };
}

export default CoreView;
