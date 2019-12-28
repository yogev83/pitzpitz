import { date } from "gulp-util";

class Scheduler {
  constructor() {
    this.startTS = null;
    this.tasks = [];
  }

  run() {
    this.startTS = Date.now();
  }

  tick() {
    let self = this;
    let now = Date.now();
    let time = now - this.startTS;
    let copy = this.tasks;
    $.each(this.tasks, (i, task) => {
      console.warn(this.tasks);
      console.warn(self);
      if (task.time <= time) {
        task.execute();
        copy.splice(i, 1);
      }
    });
    this.tasks = copy.slice();
  }

  schedule(task) {
    this.tasks.push(task);
  }

  getTime() {
    date.now();
  }
}

export default Scheduler;
