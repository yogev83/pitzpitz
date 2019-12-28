import PuzzleStructure from "./puzzleStructure/puzzleStructure";

class Play {
  static get delay() {
    return 1000;
  }

  constructor(onPlayEnd) {
    this.puzzleStrucrure = null;
    this.onPlayEnd = onPlayEnd;
  }

  starNewtPlay(puzzleImage) {
    let star = new Star(this.view.x, this.view.y);
    star.shoot();

    if (this.puzzleStrucrure) {
      this.puzzleStrucrure.destroy();
    }
    this.puzzleStrucrure = new PuzzleStructure(puzzleImage, () => {
      setTimeout(() => {
        this.puzzleStrucrure.destroy();
        this.onPlayEnd();
      }, Play.delay);
    });
    this.puzzleStrucrure.render();
  }
}

export default Play;
