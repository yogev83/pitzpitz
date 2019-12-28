import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  constructor(x, y, partData, onDrop) {
    super();

    if (typeof partData == "object") {
      this.setView(
        new Draggable(x, y, {
          imageName: partData.imageName,
          onDrop: onDrop,
          opacity: 1,
          width: partData.width,
          height: partData.height
        })
      );
    } else {
      this.setView(
        new Draggable(x, y, {
          imageName: partData,
          static: true,
          onDrop: onDrop,
          opacity: 1
        })
      );
    }
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
