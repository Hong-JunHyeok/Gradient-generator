export interface ColorItem {
  stop: number;
  color: string;
  index: number;
}

export interface IStore {
  activeColor: ColorItem;
  colorList: ColorItem[];
  isLinear: boolean;
  colorItemIndex: number;
}

class Store implements IStore {
  public activeColor: ColorItem;
  public colorList: ColorItem[];
  public isLinear: boolean;
  public colorItemIndex: number;

  constructor() {
    this.colorList = [
      {
        color: "rgba(255, 163, 163, 1)",
        stop: 20,
        index: 0,
      },
      {
        color: "rgba(232,123,255,1)",
        stop: 50,
        index: 1,
      },
      {
        color: "rgba(133,173,255,1)",
        stop: 90,
        index: 2,
      },
    ];

    this.activeColor = this.colorList[0];
    this.isLinear = true;
    this.colorItemIndex = this.colorList.length;
  }
}

export default Store;
