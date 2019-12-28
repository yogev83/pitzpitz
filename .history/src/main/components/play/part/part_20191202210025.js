import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  static get dropPercent() {
    return 105;
  }

  constructor(x, y, imageName, onDrop) {
    super();

    let startingPoint = this.getStartingPoint(x, y);

    this.setView(
      new Draggable(x, y, {
        imageName: imageName,
        onDrop: (dropX, dropY) => {
          onDrop(dropX, dropY, this);
        },
        opacity: 1,
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

  getStartingPoint(x, y) { 
    return {
      x: 
    };
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
