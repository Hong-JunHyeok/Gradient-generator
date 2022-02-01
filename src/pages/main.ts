import template from "./main.template";
import PrevGradient from "../views/PrevGradient";
import ColorList from "../views/ColorList";
import ChangeOptions from "../views/ChangeOptions";
import CodeViewer from "../views/CodeViewer";
import ColorPicker from "../views/ColorPicker";
import TextInput from '../views/TextInput'
import ImageExportButton from '../views/ImageExportButton'

import { title } from "../data/site-meta.json";
import { AnyObject } from "../types/common";
import { IStore } from "../store";
import { getStoreData } from '../utils/localSaver'

export default class MainPage {
  private _template: string;
  private _container: HTMLElement;
  private _fields: AnyObject[] = [];
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
    const existStoreData = getStoreData();
    if(existStoreData){
      this._data = existStoreData;
    }

    const prevGradient = new PrevGradient("#prev-gradient", this._data);
    const imageExportButton =  new ImageExportButton("#export-button-flag", this._data);

    this._fields = [prevGradient, imageExportButton];

    if(window.location.hash) {
      // Fragment exists
      const fragment = window.location.hash as "#pallete" | "#text" | "#code";

      switch(fragment) {
        case "#pallete":{
          const colorList = new ColorList("#color-list", this._data);
          const changeOptions = new ChangeOptions("#change-option", this._data);
          
          this._fields.push(colorList);
          this._fields.push(changeOptions);
          break;
        }
        case "#text":{
          const textInput = new TextInput("#text-input", this._data);
          const colorPicker = new ColorPicker("#color-picker", this._data);

          this._fields.push(textInput);
          this._fields.push(colorPicker);
          break;
        }
        case "#code":{
          const codeViewer = new CodeViewer("#code-viewer", this._data);
          this._fields.push(codeViewer);
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
      
      this._fields.push(colorList);
      this._fields.push(changeOptions);
    }
  }

  public render = () => {
    this._container.innerHTML = this._template;
    this._fields.forEach((field) => {
      field.render();

      if (field.attachEventHandler) {
        field.attachEventHandler();
      }
    });
  };
}
