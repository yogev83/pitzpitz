import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";

class MainController {
  constructor() {
    this.game = new Game();
    this.canvasView = new CanvasView();
    this.theme = new Audio("assets/theme.mp3");
    this.theme.loop = true;
    this.$birthdate = $("#birthdate");
    this.$ready = $("#ready");
    this.$birthdate.hide();
    this.$ready.hide();
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
      this.$birthdate.show();
      setTimeout(() => {
        $canvasWrapper.show();
        this.$birthdate.hide();
        setTimeout(() => {
          $canvasWrapper.hide();
          this.$birthdate.show();
          this.getReady($canvasWrapper);
        }, 150);
      }, 150);
    }, 150);
  }

  getReady() {}

  startGame() {
    this.game.start();
  }
}

export default MainController;
