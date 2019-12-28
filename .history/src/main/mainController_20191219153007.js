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
      this.startGame();
    });
  }

  startGame() {
    this.canvasView.initCanvasView();
    this.game.start();
  }
}

export default MainController;
