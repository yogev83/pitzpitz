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

    this.birthdate = new Component();
    this.birthdate.setView(
      new Renderable({ imageName: "2812.png", opacity: 0 })
    );

    this.ready = new Component();
    this.ready.setView(
      new Renderable(600, -300, { hidden: true, imageName: "ready.png" })
    );
  }

  start() {
    let $startBtn = $("#startBtn");

    $startBtn.click(() => {
      $startBtn.remove();

      this.theme.play();
      this.intro();
    });
  }

  intro() {
    let renderer = puzzle.getRenderer();

    this.birthdate.render();

    renderer.scheduleTask(this.showBirthdate.bind(this, 1000, 600), 2900);
    renderer.scheduleTask(this.hideCanvas.bind(this), 3100);
    renderer.scheduleTask(this.showBirthdate.bind(this, 200, 200), 3300);
    renderer.scheduleTask(this.hideCanvas.bind(this), 3500);
    renderer.scheduleTask(this.startGame.bind(this), 8000);
  }

  showCanvas() {
    this.canvasView.show();
  }

  hideCanvas() {
    this.canvasView.hide();
  }

  showBirthdate(x, y) {
    this.showCanvas();
    let width = this.birthdate.view.options.width;
    let height = this.birthdate.view.options.height;
    this.birthdate.view.setPosition(x, y);
    this.birthdate.view.animatePropertyTo("opacity", 1, 200);
    this.birthdate.view.animatePropertyTo("size", 115, 200, {
      onComplete: () => {
        this.birthdate.view.setProperty("width", width);
        this.birthdate.view.setProperty("height", height);
        this.birthdate.view.setProperty("opacity", 0.3);
      }
    });
  }

  getReady() {
    this.ready.view.show();
    this.ready.view.animatePropertyTo("opacity", 1, 200);
  }

  startGame() {
    this.showCanvas();
    // this.birthdate.view.animatePropertyTo("size", 200, 200);
    this.game.start();
  }
}

export default MainController;
