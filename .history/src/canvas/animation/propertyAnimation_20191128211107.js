class PropertyAnimation {
  constructor(propertyName, startValue, totalDelta, totalTime, options = {}) {
    this.propertyName = propertyName;
    this.startValue = startValue;
    this.totalDelta = totalDelta;
    this.totalTime = totalTime;
    this.options = options;
    this.startTime = Date.now();
    this.done = false;
  }

  step(renderable) {
    if (this.done) {
      return true;
    }

    let property = this.propertyName;
    let currentTime = Date.now();
    let normalizedTimePortion = (currentTime - this.startTime) / this.totalTime;

    let currentDelta = normalizedTimePortion * this.totalDelta;
    let newValue = this.getNewValue(currentDelta);
    if (property == "opacity" && newValue < 0) console.warn(newValue);

    if (normalizedTimePortion >= 1) {
      property == "x" || property == "y"
        ? (renderable[property] = newValue)
        : (renderable.options[property] = newValue);
      this.done = true;
      if (typeof this.options.onComplete == "function") {
        this.options.onComplete();
      }
      return true;
    } else {
      property == "x" || property == "y"
        ? (renderable[property] = newValue)
        : (renderable.options[property] = newValue);
    }

    return false;
  }

  getNewValue(currentDelta) {
    if (typeof this.options.customFunction == "function") {
      return this.options.customFunction(this.startValue, currentDelta);
    } else {
      return this.startValue + currentDelta;
    }
  }
}

export default PropertyAnimation;
