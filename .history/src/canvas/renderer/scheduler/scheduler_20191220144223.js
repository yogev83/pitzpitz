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
    $.each(this.tasks, (i, task) => {
      if (task.time <= time) {
        task.execute();
        this.tasks.splice(i, 1);
      }
    });
  }

  schedule(task) {
    this.tasks.push(task);
  }
}

export default Scheduler;
