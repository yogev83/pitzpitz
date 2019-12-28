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

    let property = this.propertyName;
    let currentTime = this.timer.getTime();
    let normalizedTimePortion = (currentTime - this.startTime) / this.totalTime;

    let currentDelta = normalizedTimePortion * this.totalDelta;
    let newValue = this.startValue + currentDelta;

    if (property == "x" || property == "y") {
      renderable[property] = newValue;
    } else {
      renderable.options[property] = newValue;
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
