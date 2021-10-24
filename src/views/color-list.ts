import CoreView from "./core-view";
import template from "./color-list.template";
import { AnyObject } from "../types/common";

class ColorList extends CoreView {
  private _data: AnyObject;

  constructor(container: string, data: AnyObject) {
    super(container, template(data));
    this._data = data;
  }
}

export default ColorList;
