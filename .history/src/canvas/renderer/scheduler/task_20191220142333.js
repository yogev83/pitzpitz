class Task {
  constructor(time, callback) {
    this.time = null;
    this.callback = callback;
  }

  execute(...args) {
    this.callback(...args);
  }
}
