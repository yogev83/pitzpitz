import BasicImage from "../image/basicImage";
import PropertyAnimation from "../animation/propertyAnimation";

class Renderable {
  constructor(x = 0, y = 0, options = {}) {
    this.animations = [];
    this.dragging = false;
    this.draggingOffset = { x: 0, y: 0 };

    if (!isNaN(x)) {
      this.options = options;
    }

    this.setPosition(x, y);

    if (this.options.imageName) {
      this.initImager();
    }
  }

  initImager() {
    this.imager = new BasicImage(this.options.imageName);
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
    let currentAlpha = ctx.globalAlpha;
    let animationDoneBuffer;

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

    if (this.imager) {
      this.renderImage(ctx);
    }

    ctx.globalAlpha = currentAlpha;
  }

  renderImage(ctx) {
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
