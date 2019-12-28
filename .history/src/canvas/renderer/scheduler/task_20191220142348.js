class Task {
  constructor(time, callback) {
    this.time = time;
    this.callback = callback;
  }

  execute(args) {
    this.callback(args);
  }
}
