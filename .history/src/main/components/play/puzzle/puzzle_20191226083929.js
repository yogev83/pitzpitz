import Component from "../../component";
import Utils from "../../../common/utils";
import Frameable from "../../../../canvas/renderable/framable";

class Puzzle extends Component {
  constructor(puzzleImage, onSolve, solvingTime, isFinal) {
    super();

    this.masks = [];

    this.isFinal = isFinal;

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
    this.destroyMasks();

    if (this.isFinal) {
      this.view.easeFrame(1, this.solvingTime);
    } else {
      this.view.easeFrame(1, this.solvingTime, () => {
        this.view.easeFrame(2, this.solvingTime, onComplete);
      });
    }
  }

  getOffset() {
    return { x: this.view.x, y: this.view.y };
  }

  maskTarget(targetX, targetY, width, height) {
    let mask = new Component();
    mask.setView(
      new Frameable(targetX, targetY, {
        imageName: this.puzzleImage,
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
    mask.view.setFrame(1);
    mask.view.animatePropertyTo("opacity", 1, 500);
    //console.warn("render mask");
    mask.render();
    this.masks.push(mask);
  }

  destroyMasks() {
    $.each(this.masks, (i, mask) => {
      mask.destroy();
    });
  }
}

export default Puzzle;
