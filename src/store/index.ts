export interface ColorItem {
  stop: number;
  color: string;
  index: number;
}

export interface IStore {
  colorList: ColorItem[];
}

class Store implements IStore {
  public activeColor: ColorItem;
  public colorList: ColorItem[];

  constructor() {
    this.colorList = [
      {
        color: "rgba(197, 213, 214, 1)",
        stop: 31,
        index: 0,
      },
      {
        color: "rgba(232,123,255,1)",
        stop: 78,
        index: 1,
      },
    ];

    this.activeColor = this.colorList[0];
  }
}

export default Store;
