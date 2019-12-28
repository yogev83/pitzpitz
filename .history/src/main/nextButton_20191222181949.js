import Component from "./components/component";
import Clickable from "../canvas/renderable/clickable";

class NextButton extends Component {
  constructor() {
    super();

    this.setView(
      new Clickable(offscreenPoint.x, offscreenPoint.y, {
        imageName: this.partData.image,
        onDrop: this.drop.bind(this),
        opacity: 1,
        rotation: rotation,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }
}

export default NextButton;
