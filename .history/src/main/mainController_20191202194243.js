import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

class MainController {
  constructor() {
    this.game = new Game();
    this.canvasView = new CanvasView();
  }

  start() {
    this.canvasView.initCanvasView();
    this.game.start();
  }
}

export default MainController;
