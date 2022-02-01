import domtoimage from 'dom-to-image';
import { IStore } from "@src/store";
import CoreView from "../core-view";
import template from "./image-export-button.template";

class ImageExportButton extends CoreView {
  private _data: IStore;
  constructor(container: string, data: IStore) {
    super(container, template(data));

    this._data = data;
  }

  public attachEventHandler() {
    const prevGradientEl = document.getElementById('prev-gradient');
    const exportButtonEl = document.getElementById('export-button');

    if(exportButtonEl && prevGradientEl) {
      let scale = 2;
      exportButtonEl.addEventListener('click', async() => {
        const data = await domtoimage.toPng(prevGradientEl, {
          width: prevGradientEl.clientWidth * scale,
          height: prevGradientEl.clientHeight * scale,
          style: {
            transform: 'scale('+scale+')',
            transformOrigin: 'top left'
          }
        })
        const link = document.createElement('a');
        link.href = data;
        link.download = 'gradient.png';
        link.click();
        link.remove();
      })
    }
  }

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

export default ImageExportButton;
