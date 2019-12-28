import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  constructor(x, y, imageName, onDrop) {
    super();
    this.onDrop = onDrop;
    this.setView(
      new Draggable(x, y, {
        imageName: imageName,
        onDrop: this.drop,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  drop() {
    this.view.animatePropertyTo("size", 110, 500, {
      onComplete: () => {
        this.view.animatePropertyTo("size", 100, 500, {
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
