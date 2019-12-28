import Component from "../../component";
import Utils from "../../../common/utils";
import Frameable from "../../../../canvas/renderable/framable";

class Puzzle extends Component {
  constructor(puzzleImage, onSolve, solvingTime) {
    super();

    this.mask = null;

    this.onSolve = onSolve;
    this.solvingTime = solvingTime;
    this.puzzleImage = puzzleImage;

    // this.target = properties.target;
    this.setView(
      new Frameable({
        imageName: this.puzzleImage,
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

  getOffset() {
    return { x: this.view.x, y: this.view.y };
  }

  maskTarget(targetX, targetY, width, height) {
    this.mask = new Component();
    this.mask.setView(
      new Frameable(targetX, targetY, {
        imageName: this.puzzleImage,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        },
        opacity: 0.5,
        width: width,
        height: height,
        mask: {
          x: targetX - this.view.x,
          y: targetY - this.view.y
        }
      })
    );
    this.mask.view.setFrame(1);
    this.mask.view.animatePropertyTo("opacity", 1, 500);
    this.mask.render();
  }

  destroy() {
    this.mask.destroy();
    super.destroy();
  }
}

export default Puzzle;
