import BasicImage from "../image/basicImage";
import PropertyAnimation from "../animation/propertyAnimation";

class Renderable {
  constructor(x = 0, y = 0, options = {}) {
    this.animations = [];
    this.dragging = false;
    this.draggingOffset = { x: 0, y: 0 };

    if (!isNaN(x)) {
      this.setPosition(x, y);
      this.options = options;
    } else {
      if (typeof x == "string") {
        this.initImager(x);
      } else {
        this.options = x;
      }
    }

    if (!this.imager && this.options.imageName) {
      this.initImager(this.options.imageName);
    }
  }

  initImager(imageName) {
    this.imager = new BasicImage(imageName);
  }

  center(ctx) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    this.x = canvasWidth / 2 - this.options.width / 2;
    this.y = canvasHeight / 2 - this.options.height / 2;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }

  animatePropertyTo(propertyName, target, time, options) {
    if (propertyName == "size") {
      this.animatePropertyTo(
        "width",
        (this.options.width * target) / 100,
        time,
        options
      );
      this.animatePropertyTo(
        "height",
        (this.options.height * target) / 100,
        time,
        options
      );
      return;
    }

    let currentValue =
      propertyName == "x" || propertyName == "y"
        ? this[propertyName]
        : this.options[propertyName];
    let delta = target - currentValue;

    this.animations.push(
      new PropertyAnimation(propertyName, currentValue, delta, time, options)
    );
  }

  animateProperty(propertyName, delta, time, options) {
    let currentValue =
      propertyName == "x" || propertyName == "y"
        ? this[propertyName]
        : this.options[propertyName];

    this.animations.push(
      new PropertyAnimation(propertyName, currentValue, delta, time, options)
    );
  }

  render(ctx) {
    let animationDoneBuffer;

    ctx.save();

    for (let i = 0; i < this.animations.length; i++) {
      animationDoneBuffer = this.animations[i].step(this);
      if (animationDoneBuffer) {
        this.animations.splice(i, 1);
      }
    }

    if (
      typeof this.options.opacity != "undefined" &&
      this.options.opacity < 1
    ) {
      ctx.globalAlpha = this.options.opacity;
    }

    if (this.options.rotation) {
      // ctx.translate(
      //   this.x + this.options.width / 2,
      //   this.y + this.options.height / 2
      // );
      ctx.translate(
        this.x
        this.y
      );
      ctx.rotate((this.options.rotation * Math.PI) / 180);
    }

    if (this.imager) {
      this.renderImage(ctx);
    }

    ctx.restore();
  }

  renderImage(ctx) {
    if (!this.x && this.options.width) {
      this.center(ctx);
    }

    this.imager.getImage(imageObject => {
      this.drawImage(ctx, imageObject);
    });
  }

  drawImage(ctx, imageObject) {
    this.options.width = this.options.width || imageObject.image.naturalWidth;
    this.options.height =
      this.options.height || imageObject.image.naturalHeight;

    ctx.drawImage(
      imageObject.image,
      this.x,
      this.y,
      this.options.width,
      this.options.height
    );
  }

  onClick(e) {}

  onMove(e) {}

  onRelease(e) {}

  hitTest(x, y) {
    let inside;

    if (typeof this.options.hitTest == "function") {
      inside = this.options.hitTest(x, y);
    } else {
      inside =
        this.x < x &&
        x < this.x + this.options.width &&
        this.y < y &&
        y < this.y + this.options.height;
    }

    return inside;
  }
}

export default Renderable;
