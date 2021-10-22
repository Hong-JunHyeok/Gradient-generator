import CoreView from "./core-view";
import template from "./gradient-bar.template";

interface GradientBarData {}

class GradientBar extends CoreView {
  constructor(container: string, data: GradientBarData) {
    super(container, template(data));
  }
}

export default GradientBar;
