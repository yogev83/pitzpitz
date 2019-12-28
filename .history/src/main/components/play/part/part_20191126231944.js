import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";

class Part extends Component {
  static get fadeOutTime() {
    return 500;
  }

  constructor(x, y, imageName, onDrop) {
    super();

    if (imageName == "a1.png") {
      this.setView(
        new Draggable(x, y, {
          imageName: imageName,
          onDrop: onDrop,
          opacity: 1,
          width: 292,
          height: 574
        })
      );
    } else {
      this.setView(
        new Draggable(x, y, {
          imageName: imageName,
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
