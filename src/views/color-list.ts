import CoreView from "./core-view";
import template from "./color-list.template";
import { AnyObject } from "../types/common";
import { ColorItem } from "../store";

class ColorList extends CoreView {
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    super(container, template(data));
    this._data = data;

    this.attachEventHandler();
  }

  onClick = (event: any) => {
    const colorItemIndex = Number(
      (event.target as HTMLLIElement).dataset.index
    );

    this._data.activeColor = this._data.colorList.find(
      (colorItem: ColorItem) => colorItem.index === colorItemIndex
    );

    this.render();
    this.attachEventHandler();
    //! Render시 이벤트 헨들러가 끊기는 현상이 발생
  };

  attachEventHandler = () => {
    const colorItems = document.querySelectorAll(`#color-item`);

    colorItems.forEach((colorItem) => {
      colorItem?.addEventListener("click", this.onClick);
    });
  };

  render = (appendChild: boolean = false) => {
    //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
    const container = document.querySelector("#color-list");

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template(this._data);

      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        this.attachEventHandler();
        container.innerHTML = template(this._data);
      }
    }
  };
}

export default ColorList;
