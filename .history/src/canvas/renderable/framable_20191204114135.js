import Renderable from "./renderable";
import Spritesheet from "../image/spritesheet";
import Animation from "../animation/animation";

class Frameable extends Renderable {
  constructor(x, y, options = {}) {
    if (!isNaN(x) && typeof options == "object") {
      options.spritesheet = options.spritesheet || {};
    } else {
      options.spritesheet = x.spritesheet || {};
    }

    super(x, y, options);
    this.targetFrameAnimation = null;
    this.colorMapBeforeRendering = null;
  }

  /**
   * @overrides
   * */
  initImager() {
    let spritesheetOptions = {
      sWidth: this.options.spritesheet.sWidth || this.options.width,
      sHeight: this.options.spritesheet.sHeight || this.options.height,
      rowSize: this.options.spritesheet.rowSize,
      columnSize: this.options.spritesheet.columnSize,
      frameMapping: this.options.spritesheet.frameMapping
    };
    this.imager = new Spritesheet(this.options.imageName, spritesheetOptions);
  }

  animateToFrame(targetFrame, time, options) {
    this.animations.push(
      new Animation(this.imager, targetFrame, time, options)
    );
  }

  setFrame(frame) {
    let frameIndex = frame;
    if (isNaN(frameIndex)) {
      frameIndex = this.imager.getFrameIndex(frameIndex);
      frameIndex = Math.max(0, frameIndex);
    }
    this.imager.setFrame(frameIndex);
  }

  easeFrame(frame, time, onComplete) {
    let targetOpacity = 1;

    this.animatePropertyTo("opacity", 0, time, {
      onComplete: () => {
        this.targetFrameAnimation = null;
        this.setFrame(frame);
        this.options.opacity = targetOpacity;
        if (typeof onComplete == "function") {
          onComplete();
        }
      }
    });

    this.targetFrameAnimation = {
      frame: frame,
      opacity: targetOpacity
    };
  }

  drawImage(ctx, imageObject) {
    if (imageObject.frame) {
      this.options.width = this.options.width || imageObject.frame.frameWidth;
      this.options.height =
        this.options.height || imageObject.frame.frameHeight;

      if (!this.x && this.options.width) {
        this.center(ctx);
      }

      this.drawFrame(ctx, imageObject.image, imageObject.frame);
      if (
        this.targetFrameAnimation &&
        this.imager.getFrame() !== this.targetFrameAnimation.frame
      ) {
        let currentAlpha = ctx.globalAlpha;
        let currectFrame = this.imager.getFrame();

        ctx.globalAlpha = this.targetFrameAnimation.opacity - ctx.globalAlpha;
        this.setFrame(this.targetFrameAnimation.frame);
        this.renderImage(ctx);
        ctx.globalAlpha = currentAlpha;
        this.setFrame(currectFrame);
      }
    } else {
      super.drawImage(ctx, imageObject);
    }
  }

  drawFrame(ctx, image, frame) {
    //TODO: SHOULD NOT BE HERE!!!

    let data = ctx.getImageData(
      this.x,
      this.y,
      this.options.width,
      this.options.height
    ).data;
    this.setColorMapBeforeRendering();

    /* */

    ctx.drawImage(
      image,
      frame.frameX,
      frame.frameY,
      frame.frameWidth,
      frame.frameHeight,
      this.x,
      this.y,
      this.options.width,
      this.options.height
    );
  }

  setColorMapBeforeRendering(data) {
    this.colorMapBeforeRendering = data;
  }
}

export default Frameable;
