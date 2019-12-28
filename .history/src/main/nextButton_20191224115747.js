import Clickable from "../canvas/renderable/clickable";
import Component from "./components/component";

class NextButton extends Component {
  constructor(onClick) {
    super();

    this.setView(
      new Clickable(1200, 1400, {
        imageName: "next.png",
        opacity: 0.3,
        spritesheet: {
          rowSize: 3
        },
        onClick: onClick
      })
    );
  }

  putInPlace() {
    this.next.view.animatePropertyTo("y", 400, 500);
    this.next.view.animatePropertyTo("opacity", 1, 800);
  }
}

export default NextButton;
