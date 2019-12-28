import Timer from "../timer";

class Animation {
  constructor(spritesheet, targetFrame, totalTime, options = {}) {
    this.spritesheet = spritesheet;
    this.targetFrame = targetFrame;
    this.currentFrame = this.spritesheet.getFrame();
    this.startFrame = this.currentFrame;
    this.options = options;

    this.totalDelta = targetFrame - this.currentFrame;
    this.totalTime = totalTime;

    this.timer = new Timer(() => {}, totalTime);
    this.timer.start();
    this.startTime = this.timer.getTime();

    this.done = false;
  }

  step() {
    if (this.done) {
      return;
    }

    let currentTime = this.timer.getTime();
    let normalizedTimePortion = (currentTime - this.startTime) / this.totalTime;
    let currentDelta = Math.floor(normalizedTimePortion * this.totalDelta);

    console.warn(normalizedTimePortion, currentDelta);

    this.currentFrame += currentDelta;
    this.spritesheet.setFrame(this.currentFrame);

    if (normalizedTimePortion >= 1 || this.currentFrame >= this.targetFrame) {
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
