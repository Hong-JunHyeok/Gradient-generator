import router from "./router";
import "highlight.js/styles/github.css";

import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);

interface AnyObject {
  [key: string]: any;
}

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
      registerHelper: any;
      hljs: any;
    };
  }
}

//* DOM 렌더링이 완료된 시점에서 router함수를 실행합니다.
window.addEventListener("DOMContentLoaded", () => {
  router();
  document.querySelectorAll("pre  code").forEach((el: Element, _: number) => {
    hljs.highlightElement(el as HTMLElement);
  });
});
