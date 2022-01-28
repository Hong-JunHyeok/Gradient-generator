export {};

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
      registerHelper: any;
      hljs: any;
    };
  }
}
