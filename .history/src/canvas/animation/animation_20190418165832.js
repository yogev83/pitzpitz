import Timer from "../timer";

class Animation {
  constructor(spritesheet, targetFrame, options) {
    this.spritesheet = spritesheet;
    this.targetFrame = targetFrame;
    this.currentFrame = this.spritesheet.getFrame();
    this.options = options;
    this.done = false;
  }

  step() {
    if (this.done) {
      return;
    }

    this.currentFrame++;
    this.spritesheet.setFrame(this.currentFrame);

    if (this.currentFrame == this.targetFrame) {
      // if (this.properties.loop) {
      //   this.currentFrame = this.properties.from;
      // } else {
      //   this.done = true;
      //   if (typeof this.properties.onDone == "function") {
      //     this.properties.onDone();
      //   }
      //   return;
      // }
      this.done = true;
      if (typeof this.options.onComplete == "function") {
        this.options.onComplete();
      }
      return;
    }
  }
}

export default Animation;
