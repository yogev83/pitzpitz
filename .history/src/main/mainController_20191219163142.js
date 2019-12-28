import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";

class MainController {
  constructor() {
    this.game = new Game();

    this.canvasView = new CanvasView();
    this.$canvasWrapper = null;

    this.theme = new Audio("assets/theme.mp3");
    this.theme.loop = true;

    this.$birthdate = $("#birthdate");
    this.$ready = $("#ready");
    this.$birthdate.hide();
    this.$ready.hide();
  }

  start() {
    let $startBtn = $("#startBtn");
    $startBtn.click(() => {
      $startBtn.remove();

      this.theme.play();
      setTimeout(() => {
        this.$canvasWrapper = this.canvasView.initCanvasView();
        this.intro();
      }, 2500);
    });
  }

  intro($canvasWrapper) {
    this.$birthdate.show();
    this.filckerCanvas(() => {
      setTimeout(() => {
        this.filckerCanvas(() => {
          this.$birthdate.hide();
          this.getReady($canvasWrapper);
        });
      }, 150);
    });
  }

  filckerCanvas(callback) {
    this.$canvasWrapper.show();
    setTimeout(() => {
      callback();
    }, 150);
  }

  getReady($canvasWrapper) {
    this.$ready.show();
    setTimeout(() => {
      $canvasWrapper.show();
      this.$ready.show();
      this.startGame();
    }, 5000);
  }

  startGame() {
    this.game.start();
  }
}

export default MainController;
