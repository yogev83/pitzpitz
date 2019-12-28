import PuzzleStructure from "./puzzleStructure/puzzleStructure";
import Star from "../play/star/star";

class Play {
  static get delay() {
    return 1000;
  }

  static get numberOfStars() {
    return 5;
  }

  constructor(onPlayEnd) {
    this.puzzleStrucrure = null;
    this.onPlayEnd = onPlayEnd;
  }

  starNewtPlay(puzzleImage) {
    if (this.puzzleStrucrure) {
      this.puzzleStrucrure.destroy();
    }
    this.puzzleStrucrure = new PuzzleStructure(
      puzzleImage,
      this.shootStars.bind(this),
      this.solveCompleted.bind(this)
    );
    this.puzzleStrucrure.render();
  }

  shootStars(x, y) {
    let star = new Star(x, y);
    star.shoot(() => {
      star.destroy();
    });
  }

  solveCompleted() {
    setTimeout(() => {
      this.puzzleStrucrure.destroy();
      this.onPlayEnd();
    }, Play.delay);
  }
}

export default Play;
