abstract class CoreView {
  protected _template: string;
  protected _container: string;

  constructor(container: string, template: string) {
    this._container = container;
    this._template = template;
  }

  abstract render = (appendChild: boolean) => {};
}

export default CoreView;
