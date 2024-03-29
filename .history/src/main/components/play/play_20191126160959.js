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
    if (this.puzzleStrucrure) {
      this.puzzleStrucrure.destroy();
    }
    this.puzzleStrucrure = new PuzzleStructure(puzzleImage, () => {
      setTimeout(() => {
        this.puzzleStrucrure.destroy();
        this.shootStars();
        this.onPlayEnd();
      }, Play.delay);
    });
    this.puzzleStrucrure.render();
  }

  shootStars() {
    let star = new Star(this.view.x, this.view.y);
    star.shoot();
  }
}

export default Play;
