import SimplePuzzleStructure from "./puzzleStructure/simplePuzzleStructure";
import MultiPuzzleStructure from "./puzzleStructure/MultiPuzzleStructure";
import Star from "../play/star/star";
import Utils from "../../common/utils";

class Play {
  static get delay() {
    return 1000;
  }

  static get numberOfStars() {
    return 30;
  }

  static get starsLocationOffset() {
    return 200;
  }

  constructor(onPlayEnd) {
    this.puzzleStrucrure = null;
    this.onPlayEnd = onPlayEnd;
  }

  starNewtPlay(puzzleData) {
    let constructor;

    if (this.puzzleStrucrure) {
      this.puzzleStrucrure.destroy();
    }

    switch (puzzleData.type) {
      case "simple":
        constructor = SimplePuzzleStructure;
        break;
      case "multi":
        constructor = MultiPuzzleStructure;
        break;
    }

    this.puzzleStrucrure = new constructor(
      puzzleData,
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
    return {
      x: Utils.getRandomIntInclusive(
        baseX - Play.starsLocationOffset,
        baseX + Play.starsLocationOffset
      ),
      y: Utils.getRandomIntInclusive(baseY - Play.starsLocationOffset, baseY)
    };
  }

  solveCompleted() {
    setTimeout(() => {
      this.puzzleStrucrure.destroy();
      this.onPlayEnd();
    }, Play.delay);
  }
}

export default Play;
