import MainController from "./mainController";

(scope => {
  scope.PADDING = 40;
  scope.FRAME_RATE = 24;
  scope.ASSETS_PATH = "./assets/";

  //let mainController = new MainController();

  let canvas = document.getElementsByTagName("canvas")[0];
  let canvasWrapper = document.getElementById("canvas-wrapper");
  let canvasWrapperRect = canvasWrapper.getBoundingClientRect();
  let ctx = canvas.getContext("2d");

  ctx.canvas.width = canvasWrapperRect.width;
  ctx.canvas.height = canvasWrapperRect.height;

  let image = new Image();
  image.src = "./assets/right.png";
  image.onload = () => {
    ctx.drawImage(image, 1300, 300, image.naturalWidth, image.naturalHeight);
  };

  //mainController.start();
})((window.puzzle = {}));
