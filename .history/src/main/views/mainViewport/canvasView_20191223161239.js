import Renderer from "../../../canvas/renderer/renderer";

class CanvasView {
  constructor() {
    this.canvasWrapper = document.getElementById("canvas-wrapper");
    this.canvas = document.getElementsByTagName("canvas")[0];
    return this;
  }

  initCanvasView() {
    let canvasWrapperRect = this.canvasWrapper.getBoundingClientRect();
    let ctx = this.canvas.getContext("2d");

    ctx.canvas.width = document.body.clientWidth;
    ctx.canvas.height = document.body.clientHeight;

    console.warn("canvasWrapperRect.height", canvasWrapperRect.height);

    //FIND A BETTER WAY
    let rendererOptions = {
      dragOnTop: true,
      scheduler: true
    };

    let renderer = new Renderer(this.canvas.getContext("2d"), rendererOptions);
    puzzle.getRenderer = () => {
      return renderer;
    };

    renderer.startRendering(puzzle.FRAME_RATE);

    $(this.canvasWrapper).addClass("active");

    return this;
  }

  hide() {
    $(this.canvasWrapper).hide();
  }

  show() {
    $(this.canvasWrapper).show();
  }
}

export default CanvasView;
