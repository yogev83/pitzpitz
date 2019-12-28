import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  constructor(x, y, partData, onDrop) {
    super();
    this.setView(
      new Draggable(x, y, {
        imageName: partData.imageName,
        onDrop: onDrop,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
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
