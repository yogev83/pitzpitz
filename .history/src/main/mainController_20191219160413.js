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

      this.theme.play();
      setTimeout(() => {
        $canvasWrapper = this.canvasView.initCanvasView();
        this.flicker($canvasWrapper);
      }, 2500);
    });
  }

  flicker($canvasWrapper) {
    setTimeout(() => {
      $canvasWrapper.hide();
      setTimeout(() => {
        $canvasWrapper.show();
        setTimeout(() => {
          $canvasWrapper.hide();
          setTimeout(() => {
            $canvasWrapper.show();
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
