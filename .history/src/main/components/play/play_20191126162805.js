import PuzzleStructure from "./puzzleStructure/puzzleStructure";
import Star from "../play/star/star";
import Utils from "../../common/utils";

class Play {
  static get delay() {
    return 1000;
  }

  static get numberOfStars() {
    return 5;
  }

  static get starsLocationOffset() {
    return 100;
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
    let location;
    for (let i = 0; i < Play.numberOfStars; i++) {
      location = this.getStarLocation(x, y);
      let star = new Star(location.x, location.y);
      star.shoot(() => {
        star.destroy();
      });
    }
  }

  getStarLocation(baseX, baseY) {
    let x = Utils.getRandomIntInclusive(baseX - 100, bae);
  }

  solveCompleted() {
    setTimeout(() => {
      this.puzzleStrucrure.destroy();
      this.onPlayEnd();
    }, Play.delay);
  }
}

export default Play;
