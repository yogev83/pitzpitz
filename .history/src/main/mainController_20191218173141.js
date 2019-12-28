import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";

class MainController {
  constructor() {
    this.game = new Game();
    this.canvasView = new CanvasView();
  }

  start() {
    setPreGame().then(() => {
      this.canvasView.initCanvasView();
      this.game.start();
    });
  }
}

export default MainController;
