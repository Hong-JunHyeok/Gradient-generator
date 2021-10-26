import CoreView from "./core-view";
import template from "./code-viewer.template";
import { AnyObject } from "../types/common";

import "highlight.js/styles/base16/dracula";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);

class CodeViewer extends CoreView {
  private _data: AnyObject;
  constructor(container: string, data: AnyObject) {
    super(container, template(data));

    this._data = data;
  }

  private initialize = () => {
    document.querySelectorAll("pre  code").forEach((el: Element, _: number) => {
      hljs.highlightElement(el as HTMLElement);
    });
  };

  render = (appendChild: boolean = false) => {
    //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
    const container = document.querySelector(this._container);

    if (appendChild) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = template(this._data);

      container?.appendChild(divFragment.children[0]);
      this.initialize();
    } else {
      if (container) {
        container.innerHTML = template(this._data);
        this.initialize();
      }
    }
  };
}

export default CodeViewer;
