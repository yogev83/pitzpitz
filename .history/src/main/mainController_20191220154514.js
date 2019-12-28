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
    $startBtn.click(() => {
      $startBtn.remove();

      this.theme.play();
      this.$canvasWrapper = this.canvasView.initCanvasView();
      this.$canvasWrapper.hide();
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
    renderer.scheduleTask(() => {
      //  console.warn("2812");
      this.startGame();
    }, 1000);
  }

  getReady() {}

  startGame() {
    this.game.start();
  }
}

export default MainController;
