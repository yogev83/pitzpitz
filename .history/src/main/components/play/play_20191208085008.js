import SimplePuzzleStructure from "./puzzleStructure/puzzleStructure";
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

  starNewtPlay(puzzleImage) {
    let constructor;

    if (this.puzzleStrucrure) {
      this.puzzleStrucrure.destroy();
    }

    switch (puzzleImage.type) {
      case "simple":
        constructor = SimplePuzzleStructure;
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
