import Store from "./store";
import MainPage from "./pages/main";
import NotFoundPage from "./pages/notfound";

interface RoutePaths {
  [key: string]: "/" | "/login";
}

const routePaths: RoutePaths = {
  MAIN_PATH: "/",
  LOGIN_PATH: "/login",
};

const store = new Store();

function router() {
  const path = location.pathname;

  switch (path) {
    case routePaths.MAIN_PATH:
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
