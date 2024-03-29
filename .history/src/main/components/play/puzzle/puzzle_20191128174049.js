import Component from "../../component";
import Utils from "../../../common/utils";
import Frameable from "../../../../canvas/renderable/framable";

class Puzzle extends Component {
  static get tolerance() {
    return 30;
  }

  constructor(properties, onSolve, solvingTime) {
    super();

    let ctx = puzzle.getRenderer().getContext();
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    this.onSolve = onSolve;
    this.solvingTime = solvingTime;

    this.x = canvasWidth / 2; //canvasWidth / 2 - properties.width / 2;
    this.y = canvasHeight / 2; //canvasHeight / 2 - properties.height / 2;

    this.target = properties.target;
    this.setView(
      new Frameable(this.x, this.y, {
        imageName: properties.imageName,
        opacity: 0.7,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  trySolving(x, y) {
    let solved = this.isInTarget(this.target, x, y);
    if (solved) {
      this.view.easeFrame(1, this.solvingTime / 2, () => {
        this.view.easeFrame(2, this.solvingTime / 2);
      });
    }

    return solved;
  }

  isInTarget(target, x, y) {
    return (
      Utils.distance(this.x + target.x, this.y + target.y, x, y) <
      Puzzle.tolerance
    );
  }
}

export default Puzzle;
