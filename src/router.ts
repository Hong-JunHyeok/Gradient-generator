import Store from "./store";
import MainPage from "@src/pages/MainPage";
import NotFoundPage from "@src/pages/NotFoundPage";

interface RoutePaths {
  [key: string]: "/" | "/static";
}

const routePaths: RoutePaths = {
  MAIN_PATH: "/",
  STATIC_PATH: "/static"
};

const store = new Store();

function router() {
  const path = location.pathname;

  switch (path) {
    case routePaths.MAIN_PATH:
      console.log(store);
      const mainPage = new MainPage("root", store);
      mainPage.render();
      break;
    default:
      const notFoundPage = new NotFoundPage("root");
      notFoundPage.render();
      break;
  }
}

export default router;
