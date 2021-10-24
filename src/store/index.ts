export interface ColorItem {
  stop: number;
  color: string;
  index: number;
}

export interface IStore {
  colorList: ColorItem[];
}

class Store implements IStore {
  private _activeColor: ColorItem;
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
    this._activeColor = this.colorList[0];
  }

  get activeColor() {
    return this._activeColor;
  }

  set activeColor(colorItem: ColorItem) {
    this._activeColor = colorItem;
  }
}

export default Store;
