import Renderer from "../../../canvas/renderer/renderer";

class CanvasView {
  constructor() {
    this.canvas = document.getElementsByTagName("canvas")[0];

    return this;
  }

  initCanvasView() {
    let canvasWrapper = document.getElementById("canvas-wrapper");

    let canvasWrapperRect = canvasWrapper.getBoundingClientRect();
    let ctx = this.canvas.getContext("2d");

    ctx.canvas.width = canvasWrapperRect.width;
    ctx.canvas.height = canvasWrapperRect.height;

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
  }
}

export default CanvasView;
