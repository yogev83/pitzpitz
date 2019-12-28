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
    let copy = this.tasks;
    $.each(this.tasks, (i, task) => {
      if (task.time <= time) {
        console.warn(this.tasks);
        task.execute();
        //copy.splice(i, 1);
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
