import CanvasView from "./views/mainViewport/canvasView";
import Game from "./game";

import Part from "./components/play/part/part";
import Component from "./components/component";
import Renderable from "../canvas/renderable/renderable";

class MainController {
  constructor() {
    this.game = new Game(this.updateCount.bind(this));

    this.canvasView = null;
    this.$canvasWrapper = null;

    this.theme = new Audio("assets/theme.mp3");
    this.theme.loop = true;

    this.count = 0;

    //this.initCanvas();
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
      new Renderable(600, -300, { imageName: "ready.png", opacity: 0 })
    );
  }

  start() {
    let $startBtn = $("#startBtn");

    $startBtn.click(() => {
      $startBtn.remove();

      document.documentElement.requestFullscreen().then(() => {
        setTimeout(() => {
          this.initCanvas();
          this.theme.play();
          this.intro();
          // this.showCanvas();
          // this.game.start(this.theme);
        }, 1500);
      });
    });
  }

  intro() {
    let renderer = puzzle.getRenderer();

    this.birthdate.render();
    this.ready.render();
    this.ready.view.hide();

    renderer.scheduleTask(this.showBirthdate.bind(this, 500, 400), 2900);
    renderer.scheduleTask(this.hideCanvas.bind(this), 3100);
    renderer.scheduleTask(this.showBirthdate.bind(this, 700, 500), 3300);
    renderer.scheduleTask(this.hideCanvas.bind(this), 3500);
    renderer.scheduleTask(this.getReady.bind(this), 6000);
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
    this.birthdate.view.animatePropertyTo("opacity", 1, 200, {
      onComplete: () => {
        this.birthdate.view.animatePropertyTo("opacity", 0, 200);
      }
    });
    this.birthdate.view.animatePropertyTo("size", 120, 200, {
      onComplete: () => {
        this.birthdate.view.setProperty("width", width);
        this.birthdate.view.setProperty("height", height);
      }
    });
  }

  getReady() {
    this.birthdate.destroy();
    this.ready.view.show();
    this.showCanvas();
    this.ready.view.animatePropertyTo("y", 400, 500);
    this.ready.view.animatePropertyTo("opacity", 1, 200);
    //this.ready.view.show();
    //this.ready.view.animateProperty("y", 800);
  }

  startGame() {
    this.ready.view.animatePropertyTo("opacity", 0, 300);
    this.ready.view.animatePropertyTo("y", 1200, 300, {
      onComplete: () => {
        this.game.start(this.theme);
      }
    });
  }

  updateCount() {
    let newCount = this.count++;
    $("#count").html(count + "/10");
  }
}

export default MainController;
