import router from "./router";

interface AnyObject {
  [key: string]: any;
}

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
      registerHelper: any;
    };
  }
}

//* DOM 렌더링이 완료된 시점에서 router함수를 실행합니다.
window.addEventListener("DOMContentLoaded", router);
