import Scheduler from "./scheduler/scheduler";
import Task from "./scheduler/task";

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
    let renderableColorKeyBuffer;
    let handled = false;
    for (let i = this.renderables.length - 1; 0 <= i; i--) {
      renderableBuffer = this.renderables[i].value;
      if (renderableBuffer.options.hidden) {
        continue;
      }

      renderableColorKeyBuffer = this.renderables[i].colorKey;
      if (
        !handled &&
        renderableBuffer.hitTest(this.ctx, data.offsetX, data.offsetY) &&
        this.colorHitTest(data.offsetX, data.offsetY, renderableColorKeyBuffer)
      ) {
        renderableBuffer[eventName](data);
        handled = true;
      } else if (renderableBuffer.hoverState || renderableBuffer.pressedState) {
        renderableBuffer.onLeave(data);
      }
    }
  }

  colorHitTest(x, y, colorKey) {
    let pixel = this.hitCtx.getImageData(x, y, 1, 1).data;
    let pixelColor = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    // console.warn(pixelColor);
    return colorKey == pixelColor;
  }

  startRendering(fps) {
    if (this.options.scheduler) {
      this.scheduler = new Scheduler();
      this.scheduler.run();
    }
    window.requestAnimationFrame(this.render.bind(this));
  }

  stopRendering() {
    clearInterval(this.intervalID);
    return this;
  }

  scheduleTask(callback, time) {
    if (!this.scheduler) {
      console.error("You did not initatiate this rendere with a schaduler!");
      return;
    }

    let task = new Task(callback, this.scheduler.getTime() + time);
    this.scheduler.schedule(task);
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
    let canvasDataBuffer;

    if (this.scheduler) {
      this.scheduler.tick();
    }

    this.sort();

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.hitCtx.clearRect(
      0,
      0,
      this.hitCtx.canvas.width,
      this.hitCtx.canvas.height
    );

    // console.warn(this.renderables.length);
    for (let i = 0; i < this.renderables.length; i++) {
      renderableBuffer = this.renderables[i].value;

      if (renderableBuffer.options.hidden) {
        continue;
      }

      renderableColorKeyBuffer = this.renderables[i].colorKey;
      renderableBuffer.render(this.ctx);

      if (
        renderableBuffer.colorHitTest &&
        renderableBuffer.options.width &&
        renderableBuffer.options.height
      ) {
        console.warn(renderableBuffer);

        canvasDataBuffer = this.hitCtx.getImageData(
          renderableBuffer.x,
          renderableBuffer.y,
          renderableBuffer.options.width - 50,
          renderableBuffer.options.height - 50
        );

        this.hitCtx.clearRect(
          renderableBuffer.x,
          renderableBuffer.y,
          renderableBuffer.options.width - 50,
          renderableBuffer.options.height - 50
        );
        renderableBuffer.render(this.hitCtx);

        this.hitCtx.globalCompositeOperation = "source-atop";
        this.hitCtx.fillStyle = renderableColorKeyBuffer;
        this.hitCtx.fillRect(
          renderableBuffer.x,
          renderableBuffer.y,
          renderableBuffer.options.width - 50,
          renderableBuffer.options.height - 50
        );

        createImageBitmap(canvasDataBuffer).then(
          this.getRecreationOfColorKeyCallback(renderableBuffer).bind(this)
        );
      }
      this.hitCtx.globalCompositeOperation = "source-over";
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  getRecreationOfColorKeyCallback(renderable) {
    return imgBitmap => {
      this.hitCtx.drawImage(
        imgBitmap,
        renderable.x,
        renderable.y,
        renderable.options.width - 50,
        renderable.options.height - 50
      );
    };
  }

  sort() {
    let az;
    let bz;

    this.renderables.sort((a, b) => {
      az = a.value.options.z || a.z;
      bz = b.value.options.z || b.z;

      if (this.options.dragOnTop) {
        if (a.value.dragging) {
          return 1;
        }

        if (b.value.dragging) {
          return -1;
        }
      }

      return az - bz;
    });
  }
}

export default Renderer;
