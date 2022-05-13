import template from "./main.template";
import PrevGradient, { prevGradientTemplate } from "@src/views/PrevGradient";
import ColorList,{ colorListTemplate } from "@src/views/ColorList";
import ChangeOptions, { changeOptionsTemplate } from "@src/views/ChangeOptions";
import CodeViewer, { codeViewerTemplate } from "@src/views/CodeViewer";
import ColorPicker, { colorPickerTemplate } from "@src/views/ColorPicker";
import TextInput, { textInputTemplate } from '@src/views/TextInput'
import ImageExportButton, { imageExportButtonTemplate } from '@src/views/ImageExportButton'

import { title } from "@src/data/site-meta.json";
import { AnyObject } from "@src/types/common";
import { IStore } from "@src/store";
import { getStoreData } from '@src/utils/localSaver'
import { DEFAULT_FONT_SIZE } from "@src/constants";
import { fontResizer } from "@src/utils";

type FieldType = {
  element: AnyObject,
  template: any
}
export default class MainPage {
  private _template: string;
  private _container: HTMLElement;
  private _fields: FieldType[] = [];
  private _data: IStore;

  constructor(container: string, data: IStore) {
    this._template = template({ title });
    this._container = document.getElementById(container) as HTMLElement;
    this._data = data;

    window.addEventListener('hashchange', () => {
      this.initialize()
      this.render()
    });

    this.initialize()
    this.render()
  }

  private initialize() {
    this._fields = [];
    const existStoreData = getStoreData();
    if(existStoreData){
      this._data = existStoreData;
    }

    const prevGradient = new PrevGradient("#prev-gradient-container", this._data);
    const imageExportButton =  new ImageExportButton("#export-button-flag", this._data);

    this._fields.push({ element: prevGradient, template: prevGradientTemplate })
    this._fields.push({ element: imageExportButton, template: imageExportButtonTemplate })

    if(window.location.hash) {
      // Fragment exists
      const fragment = window.location.hash as "#pallete" | "#text" | "#code";

      switch(fragment) {
        case "#pallete":{
          const colorList = new ColorList("#color-list", this._data);
          const changeOptions = new ChangeOptions("#change-option", this._data);
          
          this._fields.push({ element: colorList, template: colorListTemplate });
          this._fields.push({ element: changeOptions, template: changeOptionsTemplate });
          break;
        }
        case "#text":{
          const textInput = new TextInput("#text-input", this._data);
          const colorPicker = new ColorPicker("#color-picker", this._data);

          this._fields.push({ element: textInput, template: textInputTemplate });
          this._fields.push({ element: colorPicker, template: colorPickerTemplate });
          break;
        }
        case "#code":{
          const codeViewer = new CodeViewer("#code-viewer", this._data);
          this._fields.push({ element: codeViewer, template: codeViewerTemplate });
          break;
        }
        default: {
          console.error("Not found Fragement")
        }
      }
    } else {
      // Fragment doesn't exist
      const colorList = new ColorList("#color-list", this._data);
      const changeOptions = new ChangeOptions("#change-option", this._data);
      
      this._fields.push({ element: colorList, template: colorListTemplate })
      this._fields.push({ element: changeOptions, template: changeOptionsTemplate })
    }
  }

  public render = () => {
    this._container.innerHTML = this._template;
    this._fields.forEach((field) => {
      console.log(this._data);
      field.element.render(field.template(this._data));
      
      if (field.element.attachEventHandler) {
        field.element.attachEventHandler();
      }
    });

    const parentElement = document.querySelector<HTMLDivElement>('#prev-gradient')!;
    const textElement = document.querySelector<HTMLParagraphElement>('#text-container')!;

    textElement.style.fontSize = DEFAULT_FONT_SIZE;

    fontResizer({
      parentElement,
      textElement
    })
    PrevGradient.backgroundColorChange(this._data);
  };
}
