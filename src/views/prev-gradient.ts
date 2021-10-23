import CoreView from "./core-view";
import template from "./prev-gradient.template";
import { AnyObject } from "../types/common";

class PrevGradient extends CoreView {
  constructor(container: string, data: AnyObject) {
    console.log(data);
    super(
      container,
      template({
        pickColor: data.pickColor,
      })
    );
  }
}

export default PrevGradient;
