import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";
import Utils from "../../../common/utils";

class Part extends Component {
  static get targetTolerance() {
    return 100;
  }

  static get fadeOutTime() {
    return 500;
  }

  static get dropPercent() {
    return 105;
  }

  constructor(x, y, partData, onTarget) {
    super();

    let offscreenPoint = this.getOffscreenPoint(x);
    let rotation = this.getRandomRotation();

    this.location = { x: x, y: y };
    this.partData = partData;
    this.onTarget = onTarget;

    this.sound = new Audio("assets/wood.wav");

    this.setView(
      new Draggable(offscreenPoint.x, offscreenPoint.y, {
        imageName: this.partData.image,
        onDrop: this.drop.bind(this),
        opacity: 1,
        rotation: rotation,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  getOffscreenPoint(x) {
    return {
      x: x < 900 ? -500 : 1900 + 500,
      y: Utils.getRandomIntInclusive(0, 900)
    };
  }

  getRandomRotation() {
    return Utils.getRandomIntFromRanges([
      [-180, -90],
      [90, 180]
    ]);
  }

  putInPlace() {
    let xtime = Utils.getRandomIntInclusive(500, 800);
    let ytime = Utils.getRandomIntInclusive(500, 800);
    let rotationTime = Math.max(xtime, ytime);
    this.view.animatePropertyTo("x", this.location.x, xtime);
    this.view.animatePropertyTo("y", this.location.y, ytime);
    this.view.animatePropertyTo("rotation", 0, rotationTime, {
      onComplete: () => {
        this.sound.play();
      }
    });
  }

  drop() {
    let isOnTarget = this.checkIfOnTarget();
    if (isOnTarget) {
      this.onTarget(this);
    } else {
      this.sound.play();
    }
    //Shrinks!!!
    // this.view.animatePropertyTo("size", Part.dropPercent, 50, {
    //   onComplete: () => {
    //     this.view.animatePropertyTo("size", (100 * 100) / Part.dropPercent, 50);
    //     this.checkIfOnTarget();
    //   }
    // });
  }

  checkIfOnTarget() {
    if (!this.partData.target) {
      return false;
    }

    if (
      Utils.distance(
        this.partData.target.x,
        this.partData.target.y,
        this.view.x,
        this.view.y
      ) < Part.targetTolerance
    ) {
      return true;
    }

    return false;
  }

  destroy(easetime) {
    if (easetime) {
      this.view.animatePropertyTo("opacity", 0, Part.fadeOutTime, {
        onComplete: () => {
          super.destroy();
        }
      });
    } else {
      super.destroy();
    }
  }
}

export default Part;
