import MainController from "./mainController";

(scope => {
  scope.PADDING = 40;
  scope.FRAME_RATE = 24;
  scope.ASSETS_PATH = "./assets/";

  let mainController = new MainController();
  console.warn("start");
  mainController.start();
})((window.puzzle = {}));
