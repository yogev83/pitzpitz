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
    let toRemove = [];
    $.each(this.tasks, (i, task) => {
      if (task.time <= time) {
        task.execute();
        toRemove.push(i);
      }
    });
    this.tasks = copy.slice();
  }

  schedule(task) {
    this.tasks.push(task);
  }

  getTime() {
    return Date.now() - this.startTS;
  }
}

export default Scheduler;
