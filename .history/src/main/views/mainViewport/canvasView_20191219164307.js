import Renderer from "../../../canvas/renderer/renderer";

class CanvasView {
  constructor() {
    let canvasWrapper = document.getElementById("canvas-wrapper");
    $(canvasWrapper).hide();

    this.canvas = document.getElementsByTagName("canvas")[0];

    //FIND A BETTER WAY
    let rendererOptions = {
      dragOnTop: true
    };

    let renderer = new Renderer(this.canvas.getContext("2d"), rendererOptions);
    puzzle.getRenderer = () => {
      return renderer;
    };

    renderer.startRendering(puzzle.FRAME_RATE);

    return this;
  }

  initCanvasView() {
    let canvasWrapper = document.getElementById("canvas-wrapper");
    canvasWrapper.show();

    let canvasWrapperRect = canvasWrapper.getBoundingClientRect();
    let ctx = this.canvas.getContext("2d");

    ctx.canvas.width = canvasWrapperRect.width;
    ctx.canvas.height = canvasWrapperRect.height;

    return $(canvasWrapper);
  }
}

export default CanvasView;
