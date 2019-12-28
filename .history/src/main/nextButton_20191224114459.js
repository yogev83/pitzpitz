import Clickable from "../canvas/renderable/clickable";
import Component from "./components/component";

class NextButton extends Component {
  constructor() {
    super();

    this.setView(
      new Clickable(800, 800, {
        imageName: "next.png",
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }
}

export default NextButton;
