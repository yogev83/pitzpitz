import Component from "../../component";
import Utils from "../../../common/utils";
import Frameable from "../../../../canvas/renderable/framable";

class Puzzle extends Component {
  static get tolerance() {
    return 30;
  }

  static get expandedTolerance() {
    return 100;
  }

  constructor(properties, onSolve, solvingTime) {
    super();

    this.onSolve = onSolve;
    this.solvingTime = solvingTime;

    this.target = properties.target;
    this.setView(
      new Frameable({
        imageName: properties.imageName,
        opacity: 1,
        spritesheet: {
          rowSize: 3
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

  // trySolving(x, y, rightPart) {
  //   let hit = this.isInTarget(x, y, !rightPart);
  //   if (hit && rightPart) {
  //     this.view.easeFrame(1, this.solvingTime, () => {
  //       this.view.easeFrame(2, this.solvingTime, () => {
  //         this.onSolve();
  //       });
  //     });
  //   }

  //   return hit;
  // }

  // isInTarget(x, y, expanded) {
  //   return (
  //     Utils.distance(
  //       this.view.x + this.target.x,
  //       this.view.y + this.target.y,
  //       x,
  //       y
  //     ) < (expanded ? Puzzle.expandedTolerance : Puzzle.tolerance)
  //   );
  // }
}

export default Puzzle;
