import MouseEventsHandler from "./mouseEventsHandler";

class Renderer {
  constructor(ctx, options = {}) {
    this.intervalID = null;
    this.options = options;
    this.ctx = ctx;
    this.hitCtx = this.createHitCanvas();

    this.renderables = [];

    this.attacheEvents(this.ctx.canvas);
  }

  createHitCanvas() {
    let hitCanvas;
    let hitCtx;
    let canvasWrapper = $(this.ctx.canvas).parent();
    let canvasWrapperRect = canvasWrapper[0].getBoundingClientRect();

    canvasWrapper.append("<canvas id='hitCanvas'></canvas>");
    hitCanvas = $("canvas#hitCanvas")[0];
    hitCtx = hitCanvas.getContext("2d");

    hitCtx.canvas.width = canvasWrapperRect.width;
    hitCtx.canvas.height = canvasWrapperRect.height;

    $(hitCanvas).hide();
    //$(this.ctx.canvas).hide();
    return hitCtx;
  }

  getContext() {
    return this.ctx;
  }

  attacheEvents(canvas) {
    canvas.addEventListener("mousedown", e => {
      this.onMouseEvent("onClick", e);
    });
    canvas.addEventListener("mousemove", e => {
      this.onMouseEvent("onMove", e);
    });
    canvas.addEventListener("mouseup", e => {
      this.onMouseEvent("onRelease", e);
    });
  }

  onMouseEvent(eventName, data) {
    let renderableBuffer;
    let handled = false;
    for (let i = this.renderables.length - 1; 0 <= i; i--) {
      renderableBuffer = this.renderables[i].value;
      if (
        !handled &&
        renderableBuffer.hitTest(this.ctx, data.offsetX, data.offsetY) &&
        this.colorHitTest(data.offsetX, data.offsetY)
      ) {
        renderableBuffer[eventName](data);
        handled = true;
      } else if (renderableBuffer.hoverState || renderableBuffer.pressedState) {
        renderableBuffer.onLeave();
      }
    }
  }

  colorHitTest(x, y) {
    let pixel = this.hitCtx.getImageData(x, y, 1, 1);
    console.warn(pixel);
    return true;
  }

  startRendering(fps) {
    window.requestAnimationFrame(this.render.bind(this));

    // this.intervalID = setInterval(() => {
    //   this.render();
    // }, 1000 / fps);
    // return this;
    // let renderNextFrame = timestemp => {
    //   console.warn(timestemp);
    //   this.render();
    //   window.requestAnimationFrame(renderNextFrame);
    // };
    // window.requestAnimationFrame(renderNextFrame);
  }

  stopRendering() {
    clearInterval(this.intervalID);
    return this;
  }

  add(renderable) {
    let z = renderable.options.z || 0;

    this.renderables.push({
      value: renderable,
      z: z
    });

    this.sort();
  }

  remove(renderable) {
    for (let i = 0; i < this.renderables.length; i++) {
      if (this.renderables[i].value == renderable) {
        this.renderables.splice(i, 1);
      }
    }
  }

  render() {
    let renderableBuffer;

    this.sort();

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.hitCtx.clearRect(
      0,
      0,
      this.hitCtx.canvas.width,
      this.hitCtx.canvas.height
    );

    for (let i = 0; i < this.renderables.length; i++) {
      renderableBuffer = this.renderables[i].value;
      renderableBuffer.render(this.ctx);

      this.hitCtx.globalCompositeOperation = "source-over";
      renderableBuffer.render(this.hitCtx);
    }

    this.hitCtx.globalCompositeOperation = "source-in";
    this.hitCtx.fillStyle = "red";
    this.hitCtx.fillRect(0, 0, 1900, 900);

    window.requestAnimationFrame(this.render.bind(this));
  }

  sort() {
    this.renderables.sort((a, b) => {
      if (this.options.dragOnTop) {
        if (a.value.dragging) {
          return 1;
        }

        if (b.value.dragging) {
          return -1;
        }
      }

      return a.z - b.z;
    });
  }
}

export default Renderer;
