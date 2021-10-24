interface ColorItem {
  stop: number;
  color: string;
}

export interface IStore {
  pickColor: string;
}

class Store implements IStore {
  private _pickColor: string;
  public colorList: ColorItem[];

  constructor() {
    this._pickColor = "#000";
    this.colorList = [
      {
        color: "rgba(197, 213, 214, 1)",
        stop: 31,
      },
      {
        color: "rgba(232,123,255,1)",
        stop: 78,
      },
    ];
  }

  get pickColor() {
    return this._pickColor;
  }

  set pickColor(colorHexString: string) {
    this._pickColor = colorHexString;
  }

  // get colorList(): ColorItem[] {
  //   return this._colorList;
  // }

  // set colorList(colorItem: ColorItem): void {
  //   this._colorList.push(colorItem);
  // }
}

export default Store;
