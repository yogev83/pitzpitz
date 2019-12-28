import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";

class MainController {
  constructor() {
    this.game = new Game();
    this.canvasView = new CanvasView();
    this.theme = new Audio("assets/theme.mp3");
  }

  start() {
    let $startBtn = $("#startBtn");
    $startBtn.click(() => {
      $startBtn.remove();

      this.theme.play();

      this.setTimeout(() => {
        this.flicker();
      }, 2000);
    });
  }

  flicker() {
    $("#main").addClass("flicker");
    setTimeout(() => {
      $("#main").removeClass("flicker");
      setTimeout(() => {
        $("#main").addClass("flicker");
        setTimeout(() => {
          $("#main").removeClass("flicker");
          setTimeout(() => {
            this.startGame();
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }

  startGame() {
    this.canvasView.initCanvasView();
    this.game.start();
  }
}

export default MainController;
