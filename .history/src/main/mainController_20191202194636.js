import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

class MainController {
  constructor() {
    this.game = new Game();
    this.canvasView = new CanvasView();
  }

  start() {
    let ctx = this.canvasView.getContext();
    this.canvasView.initCanvasView();
    ctx;
    this.game.start();
  }
}

export default MainController;
