class Timer {
  constructor() {
    this.startTS = Date.now();
  }

  getTime() {
    return Date.now() - this.startTS;
  }
}

export default new Timer();
