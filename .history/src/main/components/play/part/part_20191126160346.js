import Component from "../../component";
import Draggable from "../../../../canvas/renderable/draggable";
import Star from "../star/star";

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
        onDrop: onDrop,
        opacity: 1
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
      let star = new Star(500, 500);
      star.shoot();
      super.destroy();
    }
  }
}

export default Part;
