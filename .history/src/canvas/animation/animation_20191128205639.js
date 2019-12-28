class Animation {
  constructor(spritesheet, targetFrame, totalTime, options = {}) {
    this.spritesheet = spritesheet;
    this.targetFrame = targetFrame;
    this.startFrame = this.spritesheet.getFrame();
    this.options = options;

    this.totalDelta = targetFrame - this.startFrame;
    this.totalTime = totalTime;
    this.startTime = Date.now();
    this.done = false;
  }

  step() {
    if (this.done) {
      return;
    }

    let currentTime = Date.now();
    let normalizedTimePortion = (currentTime - this.startTime) / this.totalTime;
    let currentDelta = Math.floor(normalizedTimePortion * this.totalDelta);
    let currentFrame = this.startFrame + currentDelta;

    this.spritesheet.setFrame(currentFrame);

    if (normalizedTimePortion >= 1 || currentFrame >= this.targetFrame) {
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
