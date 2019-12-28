import Component from "../../component";
import Utils from "../../../common/utils";
import Frameable from "../../../../canvas/renderable/framable";

class Puzzle extends Component {
  // static get tolerance() {
  //   return 30;
  // }

  // static get expandedTolerance() {
  //   return 100;
  // }

  constructor(puzzleImage, onSolve, solvingTime, onReady) {
    super();

    this.onSolve = onSolve;
    this.solvingTime = solvingTime;

    // this.target = properties.target;
    this.setView(
      new Frameable({
        imageName: puzzleImage,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        },
        onReady: () => {
          onReady(this.view.x, this.view.y);
        }
      })
    );
  }

  isOnPuzzle(x, y) {
    //TODO
    return true;
  }

  onSolved(onComplete) {
    this.view.easeFrame(1, this.solvingTime, () => {
      this.view.easeFrame(2, this.solvingTime, onComplete);
    });
  }

  getOffset() {
    return { x: this.view.x, y: this.view.y };
  }

  maskTarget(x, y, width, height) {
    let mask = new Frameable({
      imageName: this.options.imageName,
      opacity: 0,
      spritesheet: {
        rowSize: 3
      }
    });

    this.masks.push(mask);
  }
}

export default Puzzle;
