import Timer from "../timer";

class PropertyAnimation {
  constructor(propertyName, startValue, totalDelta, totalTime, options = {}) {
    this.propertyName = propertyName;
    this.startValue = startValue;
    this.totalDelta = totalDelta;
    this.totalTime = totalTime;
    this.options = options;

    this.timer = new Timer(() => {}, totalTime);
    this.timer.start();
    this.startTime = this.timer.getTime();

    this.done = false;
  }

  step(renderable) {
    if (this.done) {
      return true;
    }

    let currentDelta;
    let property = this.propertyName;
    let currentTime = this.timer.getTime();
    let normalizedTimePortion = (currentTime - this.startTime) / this.totalTime;

    currentDelta = normalizedTimePortion * this.totalDelta;

    if (property == "x" || property == "y") {
      renderable[property] = this.startValue + currentDelta;
    } else {
      renderable.options[property] = this.startValue + currentDelta;
      console.warn(renderable.options[property]);
    }

    if (normalizedTimePortion >= 1) {
      this.done = true;
      if (typeof this.options.onComplete == "function") {
        this.options.onComplete();
      }
      return true;
    }

    return false;
  }
}

export default PropertyAnimation;
