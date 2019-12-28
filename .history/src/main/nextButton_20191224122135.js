import Clickable from "../canvas/renderable/clickable";
import Component from "./components/component";

class NextButton extends Component {
  constructor(onClick) {
    super();

    this.onClick = onClick;

    this.setView(
      new Clickable(1600, 1400, {
        imageName: "next.png",
        opacity: 0,
        spritesheet: {
          rowSize: 3
        },
        onClick: this.click.bind(this)
      })
    );
  }

  putInPlace() {
    this.view.animatePropertyTo("y", 400, 500);
    this.view.animatePropertyTo("opacity", 1, 800);
  }

  click() {
    this.reset();
    this.onClick();
  }

  reset() {
    this.view.animatePropertyTo("y", 400, 500);
    this.view.animatePropertyTo("opacity", 1, 800);
  }
}

export default NextButton;
