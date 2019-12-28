import Renderable from "./renderable";
import Spritesheet from "../image/spritesheet";
import Animation from "../animation/animation";

class Frameable extends Renderable {
  constructor(x, y, options) {
    options.spritesheet = options.spritesheet || {};
    super(x, y, options);
    this.targetFrameAnimation = null;
  }

  /**
   * @overrides
   * */
  initImager() {
    let spritesheetOptions = {
      dWidth: this.options.width,
      dHeight: this.options.height,
      sWidth: this.options.spritesheet.sWidth || this.options.width,
      sHeight: this.options.spritesheet.sHeight || this.options.height,
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
    let targetOpacity = this.options.opacity || 1;

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
}

export default Frameable;
