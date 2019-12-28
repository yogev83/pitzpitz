class Timer {
  static get states() {
    return {
      IDLE: "idle",
      RUNNING: "running",
      // PAUSED: "paused",
      DONE: "done"
    };
  }

  constructor() {
    this.startTS = Date.now();
  }

  start() {
    this.startTS;
  }

  getTime() {
    return Date.now() - this.startTS;
  }
}

export default new Timer();
