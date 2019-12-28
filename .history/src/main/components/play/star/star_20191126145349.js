import Component from "../../component";
import Frameable from "../../../../canvas/renderable/framable";

class Star extends Component {
  static get fadeOutTime() {
    return 500;
  }

  constructor(x, y) {
    this.setView(
      new Frameable(x, y, {
        imageName: start.png,
        opacity: 0
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
