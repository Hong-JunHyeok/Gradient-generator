export interface IStore {
  pickColor: string;
}

class Store implements IStore {
  _pickColor: string;

  constructor() {
    this._pickColor = "#000";
  }

  get pickColor() {
    return this._pickColor;
  }

  set pickColor(colorHexString: string) {
    this._pickColor = colorHexString;
  }
}

export default Store;
