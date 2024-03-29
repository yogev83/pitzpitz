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
      this.canvasView.initCanvasView();

      setTimeout(() => {
        this.flicker();
      }, 2500);
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
