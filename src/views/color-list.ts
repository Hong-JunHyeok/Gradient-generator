import CoreView from "./core-view";
import template from "./color-list.template";
import { AnyObject } from "../types/common";
import { ColorItem } from "../store";

class ColorList extends CoreView {
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    super(container, template(data));
    this._data = data;
  }

  onClick = (event: any) => {
    const colorItemIndex = Number(
      (event.target as HTMLLIElement).dataset.index
    );

    this._data.activeColor = this._data.colorList.find(
      (colorItem: ColorItem) => colorItem.index === colorItemIndex
    );
  };

  attachEventHandler = () => {
    const colorItems = document.querySelectorAll(`#color-item`);

    colorItems.forEach((colorItem) => {
      colorItem?.addEventListener("click", this.onClick);
    });
  };
}

export default ColorList;
