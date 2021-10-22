import template from "./color-picker.template";

class ColorPicker {
  protected _template: string;
  protected _container: string;

  constructor(container: string) {
    this._container = container;
    this._template = template;
  }

  render = (appendChild: boolean = false) => {
    //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
    const container = document.querySelector(this._container);

    if (container && appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = this._template;
      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this._template;
    }
  };
}

export default ColorPicker;
