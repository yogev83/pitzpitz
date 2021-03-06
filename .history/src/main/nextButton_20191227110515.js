import Clickable from "../canvas/renderable/clickable";
import Component from "./components/component";

class NextButton extends Component {
  constructor(onClick) {
    super();

    this.sound = new Audio("assets/click.wav");

    this.onClick = onClick;

    this.setView(
      new Clickable(1600, 1400, {
        imageName: "next.png",
        opacity: 0,
        spritesheet: {
          rowSize: 3
        },
        onClick: this.click.bind(this),
        //BADDDDD!!!!!
        onHover: () => {
          $("canvas").css("cursor", "pointer");
        },
        onLeave: () => {
          $("canvas").css("cursor", "auto");
        }
      })
    );
  }

  putInPlace() {
    this.view.animatePropertyTo("opacity", 1, 800);
    this.view.animatePropertyTo("y", 400, 500);
  }

  click() {
    this.sound.play();
    this.reset();
    this.onClick();
  }

  reset() {
    this.view.animatePropertyTo("opacity", 0, 500, {
      onComplete: () => {
        this.view.setPosition(this.view.x, 1400);
      }
    });
  }
}

export default NextButton;
