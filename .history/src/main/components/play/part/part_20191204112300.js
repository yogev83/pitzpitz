import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";
import Utils from "../../../common/utils";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  static get dropPercent() {
    return 105;
  }

  constructor(x, y, imageName, onDrop) {
    super();

    let offscreenPoint = this.getOffscreenPoint(x);
    let rotation = this.getRandomRotation();
    console.warn(rotation);
    this.location = { x: x, y: y };

    this.setView(
      new Draggable(offscreenPoint.x, offscreenPoint.y, {
        imageName: imageName,
        onDrop: (dropX, dropY) => {
          onDrop(dropX, dropY, this);
        },
        opacity: 1,
        rotation: rotation,
        spritesheet: {
          rowSize: 3
        },
        hitTest: (x, y) => {
          return (
            this.view.x < x &&
            x < this.view.x + this.view.options.width - 50 &&
            this.view.y < y &&
            y < this.view.y + this.view.options.height
          );
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
      [-270, -90],
      [90, 270]
    ]);
  }

  putInPlace() {
    let xtime = Utils.getRandomIntInclusive(500, 800);
    let ytime = Utils.getRandomIntInclusive(500, 800);
    let rotationTime = Math.max(xtime, ytime);
    this.view.animatePropertyTo("x", this.location.x, xtime);
    this.view.animatePropertyTo("y", this.location.y, ytime);
    this.view.animatePropertyTo("rotation", 0, rotationTime);
  }

  drop() {
    this.view.animatePropertyTo("size", Part.dropPercent, 50, {
      onComplete: () => {
        this.view.animatePropertyTo("size", (100 * 100) / Part.dropPercent, 50);
      }
    });
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