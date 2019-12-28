import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";

class MainController {
  constructor() {
    this.game = new Game();
    this.canvasView = new CanvasView();
    this.theme = new Audio("assets/theme.mp3");
    this.theme.loop = true;
  }

  start() {
    let $startBtn = $("#startBtn");
    let $canvasWrapper;
    $startBtn.click(() => {
      $startBtn.remove();
      $canvasWrapper = this.canvasView.initCanvasView();
      this.theme.play();
      setTimeout(() => {
        this.flicker($canvasWrapper);
      }, 2500);
    });
  }

  flicker($canvasWrapper) {
    $canvasWrapper.setTimeout(() => {
      $("#main").removeClass("flicker");
      setTimeout(() => {
        $("#main").addClass("flicker");
        setTimeout(() => {
          $("#main").removeClass("flicker");
          setTimeout(() => {
            this.startGame();
          }, 1000);
        }, 200);
      }, 200);
    }, 200);
  }

  startGame() {
    this.game.start();
  }
}

export default MainController;
