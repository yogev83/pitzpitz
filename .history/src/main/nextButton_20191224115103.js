import Clickable from "../canvas/renderable/clickable";
import Component from "./components/component";

class NextButton extends Component {
  constructor() {
    super();

    this.setView(
      new Clickable(1200, 1500, {
        imageName: "next.png",
        opacity: 0,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }
}

export default NextButton;
