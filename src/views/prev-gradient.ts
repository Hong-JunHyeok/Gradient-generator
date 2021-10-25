import CoreView from "./core-view";
import template from "./prev-gradient.template";
import { AnyObject } from "../types/common";

class PrevGradient extends CoreView {
  constructor(container: string, data: AnyObject) {
    super(
      container,
      template({
        colorList: data.colorList,
        isLinear: data.isLinear,
      })
    );
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

export default PrevGradient;
