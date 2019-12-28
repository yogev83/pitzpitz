import Component from "../../component";
import Utils from "../../../common/utils";
import Frameable from "../../../../canvas/renderable/framable";

class Puzzle extends Component {
  static get tolerance() {
    return 30;
  }

  constructor(properties, onSolve, solvingTime) {
    super();

    this.onSolve = onSolve;
    this.solvingTime = solvingTime;

    this.target = properties.target;
    this.setView(
      new Frameable({
        imageName: properties.imageName,
        opacity: 0.7,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  trySolving(x, y, rightPart) {
    let hit = this.isInTarget(this.target, x, y);
    if (hit && rightPart) {
      this.view.easeFrame(1, this.solvingTime / 2, () => {
        this.view.easeFrame(2, this.solvingTime / 2, () => {
          console.warn("onSolve");
          this.onSolve();
        });
      });
    }

    return hit;
  }

  isInTarget(target, x, y) {
    return (
      Utils.distance(this.view.x + target.x, this.view.y + target.y, x, y) <
      Puzzle.tolerance
    );
  }
}

export default Puzzle;
