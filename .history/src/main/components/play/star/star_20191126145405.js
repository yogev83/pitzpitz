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
}

export default Part;
