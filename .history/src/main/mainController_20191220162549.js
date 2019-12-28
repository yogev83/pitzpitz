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

    renderer.scheduleTask(this..startGame.bind(this), 1000);
    renderer.scheduleTask(this.startGame.bind(this), 1250);
    renderer.scheduleTask(this.startGame.bind(this), 1500);
    renderer.scheduleTask(this.startGame.bind(this), 1750);
    renderer.scheduleTask(this.startGame.bind(this), 3000);
  }

  getReady() {}

  startGame() {
    this.showCanvas();
    this.game.start();
  }

  showCanvas() {
    this.canvasView.show();
  }
}

export default MainController;
