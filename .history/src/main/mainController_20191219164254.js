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
      this.startGame();
      this.$canvasWrapper = this.canvasView.initCanvasView();
      this.$canvasWrapper.show();
      // setTimeout(() => {
      //   this.$canvasWrapper = this.canvasView.initCanvasView();
      //   this.intro();
      // }, 2500);
    });
  }

  intro() {
    this.filckerBirthdate(() => {
      setTimeout(() => {
        this.filckerBirthdate(() => {
          setTimeout(() => {
            this.getReady();
          }, 5000);
        });
      }, 150);
    });
  }

  filckerBirthdate(callback) {
    this.$birthdate.show();
    setTimeout(() => {
      this.$birthdate.hide();
      callback();
    }, 150);
  }

  getReady() {
    this.$ready.show();
    setTimeout(() => {
      this.$ready.hide();
      this.$canvasWrapper.show();
      this.startGame();
    }, 6000);
  }

  startGame() {
    this.game.start();
  }
}

export default MainController;
