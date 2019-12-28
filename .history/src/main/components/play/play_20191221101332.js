import SimplePuzzleStructure from "./puzzleStructure/simplePuzzleStructure";
import MultiPuzzleStructure from "./puzzleStructure/multiPuzzleStructure";
import Star from "../play/star/star";
import Utils from "../../common/utils";
import LinearPuzzleStructure from "./puzzleStructure/linearPuzzleStructure";

class Play {
  static get delay() {
    return 1000;
  }

  static get numberOfStars() {
    return 20;
  }

  static get starsLocationOffset() {
    return 200;
  }

  constructor(onPlayEnd) {
    this.puzzleStrucrure = null;
    this.onPlayEnd = onPlayEnd;

    this.winSound = new Audio("assets/win.wav");
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
      case "linear":
        constructor = LinearPuzzleStructure;
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
        //   star.destroy();
      });
    }
    this.winSound.play();
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
