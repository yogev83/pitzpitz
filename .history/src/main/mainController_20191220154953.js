import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";
import Component from "./components/component";
import Renderable from "../canvas/renderable/renderable";

class MainController {
  constructor() {
    this.game = new Game();

    this.canvasView = new CanvasView();
    this.$canvasWrapper = null;

    this.theme = new Audio("assets/theme.mp3");
    this.theme.loop = true;
  }

  start() {
    let $startBtn = $("#startBtn");

    this.$canvasWrapper = this.canvasView.initCanvasView();
    this.$canvasWrapper.hide();

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

    renderer.scheduleTask(this.$canvasWrapper.show.bind(this), 1000);
    renderer.scheduleTask(this.$canvasWrapper.hide.bind(this), 1150);
    renderer.scheduleTask(this.$canvasWrapper.show.bind(this), 1300);
    renderer.scheduleTask(this.$canvasWrapper.hide.bind(this), 1450);
    renderer.scheduleTask(this.startGame.bind(this), 3000);
  }

  getReady() {}

  startGame() {
    this.game.start();
  }
}

export default MainController;
