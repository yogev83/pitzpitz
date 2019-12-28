import Renderer from "../../../canvas/renderer/renderer";
import Background from "../../components/background";

class CanvasView {
  get BACKGROUND_IMAGE() {
    return "background.jpg";
  }

  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];

    //FIND A BETTER WAY
    let rendererOptions = {
      dragOnTop: true
    };

    let renderer = new Renderer(this.canvas.getContext("2d"));
    puzzle.getRenderer = () => {
      return renderer;
    };

    renderer.startRendering(puzzle.FRAME_RATE);

    return this;
  }

  initCanvasView() {
    let canvasWrapper = document.getElementById("canvas-wrapper");
    let canvasWrapperRect = canvasWrapper.getBoundingClientRect();
    let ctx = this.canvas.getContext("2d");

    ctx.canvas.width = canvasWrapperRect.width;
    ctx.canvas.height = canvasWrapperRect.height;

    this.setBackground(this.BACKGROUND_IMAGE, ctx);

    return this;
  }

  setBackground(image, ctx) {
    var background = new Background(image, ctx);
    background.render();
  }
}

export default CanvasView;
