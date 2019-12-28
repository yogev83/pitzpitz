class Timer {
  static get states() {
    return {
      IDLE: "idle",
      RUNNING: "running",
      // PAUSED: "paused",
      DONE: "done"
    };
  }

  constructor(callback, timeLength) {
    this.startTS;
    this.timeout = null;
    this.timeLength = timeLength;
    this.state = Timer.states.IDLE;
    this.callback = callback;
  }

  start() {
    this.startTS = Date.now();
    this.timeout = setTimeout(() => {
      this.state = Timer.states.DONE;
      this.callback();
    }, this.timeLength);

    this.state = Timer.states.RUNNING;
  }

  //   stop() {
  //     clearTimeout(this.timeout);
  //     this.running = false;
  //   }

  //   pause() {
  //     this.running = false;
  //   }

  getState() {
    return this.state;
  }

  getTime() {
    if (this.state == Timer.states.DONE) {
      return this.timeLength;
    }
    return Date.now() - this.startTS;
  }
}

export default Timer;
