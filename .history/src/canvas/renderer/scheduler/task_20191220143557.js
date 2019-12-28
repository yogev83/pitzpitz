class Task {
  constructor(callback, time) {
    this.callback = callback;
    this.time = time;
  }

  execute(args) {
    this.callback(args);
  }
}
