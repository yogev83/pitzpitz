import PuzzleStructure from "./puzzleStructure/puzzleStructure";
import Star from "../play/star/star";

class Play {
  static get delay() {
    return 1000;
  }

  constructor(onPlayEnd) {
    this.puzzleStrucrure = null;
    this.onPlayEnd = onPlayEnd;
  }

  starNewtPlay(puzzleImage) {
    let star = new Star(500, 500);
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
