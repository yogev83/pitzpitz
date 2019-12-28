import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";

class MainController {
  constructor() {
    this.game = new Game();
    this.canvasView = new CanvasView();
  }

  start() {
    let $startBtn = $("#startBtn");
    $startBtn.click(() => {
      $startBtn.remove();
      this.flicker();
    });
  }

  flicker() {
    $("#main").addClass("flicker");
    setTimeout(() => {
      $("#main").removeClass("flicker");
      setTimeout(() => {
        $("#main").addClass("flicker");
        setTimeout(() => {
          this.startGame();
        }, 1000);
      }, 100);
    }, 100);
  }

  startGame() {
    this.canvasView.initCanvasView();
    this.game.start();
  }
}

export default MainController;
