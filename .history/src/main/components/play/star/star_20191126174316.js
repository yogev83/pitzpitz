import Component from "../../component";
import Frameable from "../../../../canvas/renderable/framable";
import Utils from "../../../common/utils";

class Star extends Component {
  static get animationTime() {
    return 2000;
  }

  static get travalDistance() {
    return 500;
  }

  constructor(x, y) {
    super();
    this.setView(
      new Frameable(x, y, {
        imageName: "star.png",
        width: 128,
        height: 128,
        opacity: 0
      })
    );

    this.customFunction = this.createCustomFunction();
    this.direction = this.getDirection();
  }

  shoot(onComplete) {
    this.render();

    console.warn(this.direction);

    this.view.animateProperty("x", Star.travalDistance, Star.animationTime);

    this.view.animateProperty(
      "y",
      this.direction * Star.travalDistance,
      Star.animationTime,
      {
        customFunction: this.customFunction
      }
    );

    this.view.animatePropertyTo("opacity", 1, Star.animationTime / 2, {
      onComplete: () => {
        this.view.animatePropertyTo("opacity", 0, Star.animationTime / 2, {
          onComplete: onComplete
        });
      }
    });
    this.view.animateToFrame(23, Star.animationTime);
  }

  getDirection() {
    let indicator = Utils.getRandomIntInclusive(0, 1);
    return indicator == 0 ? -1 : 1;
  }

  createCustomFunction() {
    let a = Utils.getRandomFloat(1.5, 6);
    let b = Utils.getRandomFloat(0.005, 0.016);
    return (y0, x) => {
      return y0 + -a * x + b * x * x;
    };
  }
}

export default Star;
