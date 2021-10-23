interface AnyObject {
  [key: string]: any;
}

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
    };
    daum: any;
  }
}
