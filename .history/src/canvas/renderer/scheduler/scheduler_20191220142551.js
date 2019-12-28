class Scheduler {
  constructor() {
    this.startTS = null;
    this.tasks = [];
  }

  run() {
    this.startTS = Date.now();
  }

  tick() {
    let now = Date.now();
    let time = now - this.startTS;
    $.each(this.tasks, (i, task) => {});
  }

  schedule(task) {
    this.tasks.push(task);
  }
}

export default Scheduler;
