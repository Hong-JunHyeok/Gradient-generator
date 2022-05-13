import { colorSet } from "@src/data/color-data";

export interface ColorItem {
  stop: number;
  color: string;
  index: number;
}

export type Type = "css" | "xml";
export type CodeType<T = Type> = {
  type: T;
  specialColor: string;
};

export type TextData = {
  textValue: string;
  textColor: string;
};

export interface IStore {
  activeColor: ColorItem;
  colorList: ColorItem[];
  isLinear: boolean;
  colorItemIndex: number;
  codeData: Type;
  codeTypes: CodeType[];
  angle: number;
  textData: TextData;
}

class Store implements IStore {
  public activeColor: ColorItem;
  public colorList: ColorItem[];
  public isLinear: boolean;
  public colorItemIndex: number;
  public codeData: Type;
  public codeTypes: CodeType<Type>[];
  public angle: number;
  public colorSet: any;
  public textData: TextData;

  constructor() {
    this.colorList = [
      {
        color: "rgb(255,163,163)",
        stop: 20,
        index: 0,
      },
      {
        color: "rgb(232,123,255)",
        stop: 50,
        index: 1,
      },
      {
        color: "rgb(133,173,255)",
        stop: 90,
        index: 2,
      },
    ];

    this.activeColor = this.colorList[0];
    this.isLinear = true;
    this.colorItemIndex = this.colorList.length;
    this.codeData = "css";
    this.codeTypes = [{ type: "css", specialColor: "#2965f1" }];
    this.angle = 90;
    this.colorSet = colorSet;
    this.textData = {
      textValue: '',
      textColor: '#000000',
    }
  }
}

export default Store;
