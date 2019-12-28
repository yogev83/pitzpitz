import MouseEventsHandler from "./mouseEventsHandler";

class Renderer {
  constructor(ctx, options = {}) {
    this.intervalID = null;
    this.options = options;
    this.ctx = ctx;

    this.hitCtx = this.createHitCanvas();
    this.colorsHash = {};

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

    //$(hitCanvas).hide();
    $(this.ctx.canvas).hide();
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
    //console.warn(pixel);
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
    let colorKey = this.getUniqeRandomColor();
    let renderableObject = {
      value: renderable,
      z: z
    };

    if (renderable.colorHitTest) {
      renderableObject.colorKey = colorKey;
    }

    this.renderables.push(renderableObject);
    this.colorsHash[colorKey] = renderableObject;

    this.sort();
  }

  getUniqeRandomColor() {
    while (true) {
      const colorKey = this.getRandomColor();
      // if colours is unique
      if (!this.colorsHash[colorKey]) {
        return colorKey;
      }
    }
  }

  getRandomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }

  remove(renderable) {
    for (let i = 0; i < this.renderables.length; i++) {
      if (this.renderables[i].value == renderable) {
        this.renderables.splice(i, 1);
      }
    }
  }

  render() {
    let renderableColorKeyBuffer;
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
      renderableColorKeyBuffer = this.renderables[i].colorKey;
      renderableBuffer.render(this.ctx);

      if (renderableBuffer.colorHitTest) {
        this.hitCtx.globalCompositeOperation = "source-over";
        renderableBuffer.render(this.hitCtx);

        this.hitCtx.globalCompositeOperation = "source-atop";
        this.hitCtx.fillStyle = renderableColorKeyBuffer;
        this.hitCtx.fillRect(
          renderableBuffer.x,
          renderableBuffer.y,
          renderableBuffer.options.width - 50,
          renderableBuffer.options.height - 50
        );
      }
    }

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
