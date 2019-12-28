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
    this.onDrop = onDrop;
    this.setView(
      new Draggable(x, y, {
        imageName: imageName,
        onDrop: onDrop,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  drop() {
    let percent = 105;
    this.view.animatePropertyTo("size", percent, 50, {
      onComplete: () => {
        this.view.animatePropertyTo("size", (100 * 100) / percent, 50, {
          onComplete: this.onDrop
        });
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
