import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";
import Utils from "../../../common/utils";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  static get offscreenX() {
    return 500;
  }

  static get dropPercent() {
    return 105;
  }

  constructor(x, y, imageName, onDrop) {
    super();

    let ctx = puzzle.getRenderer().getContext();
    let maxX = ctx.width / 2;
    let maxY = ctx.height;
    let offscreenPoint = this.getOffscreenPoint(x, maxX, maxY);
    let rotation = this.getRandomRotation();
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

  getOffscreenPoint(x, maxX, maxY) {
    return {
      x: x < maxX / 2 ? -Part.offscreenX : maxX + Part.offscreenX,
      y: Utils.getRandomIntInclusive(0, maxY)
    };
  }

  getRandomRotation() {
    return Utils.getRandomIntInclusive(-360, 360);
  }

  putInPlace() {
    this.view.animatePropertyTo("x", this.location.x, 500);
    this.view.animatePropertyTo("y", this.location.y, 500);
    this.view.animatePropertyTo("rotation", 0, 500);
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
