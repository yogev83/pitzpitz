import MouseEventsHandler from "./mouseEventsHandler";

class Renderer {
  constructor(ctx) {
    this.intervalID = null;
    this.ctx = ctx;
    this.renderables = [];

    this.attacheEvents(this.ctx.canvas);
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
      if (!handled && renderableBuffer.hitTest(data.offsetX, data.offsetY)) {
        renderableBuffer[eventName](data);
        handled = true;
      } else if (renderableBuffer.hoverState || renderableBuffer.pressedState) {
        renderableBuffer.onLeave();
      }
    }
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
    for (let i = 0; i < this.renderables.length; i++) {
      renderableBuffer = this.renderables[i].value;
      renderableBuffer.render(this.ctx);
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  sort() {
    this.renderables.sort((a, b) => {
      console.warn(a, b);
      if (a.dragging) {
        return 1;
      }

      if (b.dragging) {
        return -1;
      }

      return a.z - b.z;
    });
  }
}

export default Renderer;
