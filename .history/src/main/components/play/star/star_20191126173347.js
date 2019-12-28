import Component from "../../component";
import Frameable from "../../../../canvas/renderable/framable";
import Utils from "../../../common/utils";

class Star extends Component {
  static get animationTime() {
    return 750;
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
  }

  shoot(onComplete) {
    this.render();

    this.view.animateProperty("x", Star.travalDistance, Star.animationTime);

    this.view.animateProperty("y", Star.travalDistance, Star.animationTime, {
      customFunction: this.customFunction
    });

    this.view.animatePropertyTo("opacity", 1, Star.animationTime / 2, {
      onComplete: () => {
        this.view.animatePropertyTo("opacity", 0, Star.animationTime / 2, {
          onComplete: onComplete
        });
      }
    });
    this.view.animateToFrame(23, Star.animationTime);
  }

  createCustomFunction() {
    let a = Utils.getRandomFloat(1, 5);
    let b = 0.005; //Utils.getRandomIntInclusive(100, 1000);
    return (y0, x) => {
      console.warn(y0 + -a * x + b * x * x);
      return y0 + -a * x + b * x * x;
    };
  }
}

export default Star;
