import MainPage from "./pages/main";

enum RoutePaths {
  MAIN_PATH = "/",
  LOGIN_PATH = "/login",
  NOT_FOUND_PATH = "/notfound",
}

function router() {
  const path = location.pathname;

  switch (path) {
    case RoutePaths.MAIN_PATH:
      const mainPage = new MainPage("root");
      mainPage.render();
      break;
    default:
      console.log(RoutePaths.NOT_FOUND_PATH);
      break;
  }
}

export default router;
