import CoreView from "../core-view";
import template from "./code-viewer.template";
import { IStore, Type } from "../../store";

import "highlight.js/styles/base16/dracula.css";
import hljs from "highlight.js/lib/core";
import css from 'highlight.js/lib/languages/css';

hljs.registerLanguage("css", css);

class CodeViewer extends CoreView {
  private _data: IStore;
  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  private initialize = () => {
    document.querySelectorAll("pre  code").forEach((el: Element, _: number) => {
      hljs.highlightElement(el as HTMLElement);
    });

    document
      .getElementById("copy-text")
      ?.addEventListener("click", this.onCopy);

    document.querySelectorAll("#code-toggle").forEach((toggleItem) => {
      toggleItem.addEventListener("click", this.onToggleCodeType);
    });
  };

  onCopy = (event: Event) => {
    const clipCode = document.querySelector("pre code")?.textContent;
    const tempTextArea = document.createElement("textarea");
    document.body.appendChild(tempTextArea);

    if (clipCode) {
      tempTextArea.value = clipCode.trim();
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);
    }
  };

  onToggleCodeType = (event: Event) => {
    const toggleButtonEl = event.target as HTMLLIElement;
    const buttonDataset = toggleButtonEl.dataset.index as Type;

    if (buttonDataset) {
      this._data.codeData = buttonDataset;
    }

    this.render();
  };

  render = (appendChild: boolean = false) => {
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
