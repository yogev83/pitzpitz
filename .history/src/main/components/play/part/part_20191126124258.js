import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  constructor(x, y, imageName, onDrop) {
    super();
    this.setView(
      new Draggable(x, y, {
        imageName: imageName,
        static: true,
        onDrop: () => {
          this.view.animatePropertyTo("x", 300, 1000);
        },
        opacity: 1
      })
    );
  }

  destroy(easetime) {
    console.warn(">", easetime);
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
