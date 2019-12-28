import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";
import Component from "./components/component";
import Renderable from "../canvas/renderable/renderable";

class MainController {
  constructor() {
    this.game = new Game();

    this.canvasView = null;
    this.$canvasWrapper = null;

    this.theme = new Audio("assets/theme.mp3");
    this.theme.loop = true;

    this.initCanvas();
  }

  initCanvas() {
    this.canvasView = new CanvasView();
    this.canvasView.initCanvasView();
    this.canvasView.hide();
  }

  start() {
    let $startBtn = $("#startBtn");

    $startBtn.click(() => {
      $startBtn.remove();

      this.theme.play();
      this.intro();
      // setTimeout(() => {
      //   this.$canvasWrapper = this.canvasView.initCanvasView();
      //   this.intro();
      // }, 2500);
    });
  }

  intro() {
    let renderer = puzzle.getRenderer();
    let birthdate = new Component();
    birthdate.setView(new Renderable(300, 300, { imageName: "2812.png" }));

    renderer.scheduleTask(this.showCanvas.bind(this), 2000);
    renderer.scheduleTask(this.hideCanvas.bind(this), 2150);
    renderer.scheduleTask(this.showCanvas.bind(this), 2300);
    renderer.scheduleTask(this.hideCanvas.bind(this), 2450);
    renderer.scheduleTask(this.startGame.bind(this), 4000);
  }

  getReady() {}

  startGame() {
    this.showCanvas();
    this.game.start();
  }

  showCanvas() {
    this.canvasView.show();
  }

  hideCanvas() {
    this.canvasView.hide();
  }
}

export default MainController;
