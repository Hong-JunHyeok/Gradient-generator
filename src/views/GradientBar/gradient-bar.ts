import { AnyObject } from "../../types/common";
import CoreView from "../core-view";
import template from "./gradient-bar.template";

interface GradientBarData {}

class GradientBar extends CoreView {
  private _data: AnyObject;
  constructor(container: string, data: GradientBarData) {
    super(container, template(data));

    this._data = data;
    this.attachEventHandler();
  }

  onDrag = (event: Event, xPosition: number) => {
    const jsDrag = event.target as HTMLDivElement;
  };

  attachEventHandler = () => {
    const jsDrags = document.querySelectorAll(`#js-drag`);

    jsDrags.forEach((jsDrag) => {
      const xPosition = jsDrag.getBoundingClientRect().x;
      jsDrag.addEventListener("drag", (event) => this.onDrag(event, xPosition));
    });
  };

  render = (appendChild: boolean) => {
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template(this._data);
      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = template(this._data);
      }
    }
  };
}

export default GradientBar;
