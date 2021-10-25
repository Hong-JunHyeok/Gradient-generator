import CoreView from "./core-view";
import template from "./gradient-bar.template";

interface GradientBarData {}

class GradientBar extends CoreView {
  constructor(container: string, data: GradientBarData) {
    super(container, template(data));
  }

  render = (appendChild: boolean) => {
    //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = this._template;
      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = this._template;
      }
    }
  };
}

export default GradientBar;
