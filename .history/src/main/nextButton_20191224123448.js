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
    this.view.animatePropertyTo("opacity", 1, 800, {
      onComplete: () => {
        this.view.setProperty("y", 1400);
      }
    });
  }

  click() {
    this.reset();
    this.onClick();
  }

  reset() {
    this.view.animatePropertyTo("y", 1400, 500);
    this.view.animatePropertyTo("opacity", 0, 500);
  }
}

export default NextButton;
