class Scheduler {
  constructor() {
    this.startTS = null;
    this.tasks = [];
  }

  run() {
    this.startTS = Date.now();
  }

  schedule(task) {
    this.tasks.push(task);
  }
}

export default Scheduler;
