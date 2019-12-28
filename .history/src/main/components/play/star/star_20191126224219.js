import Component from "../../component";
import Frameable from "../../../../canvas/renderable/framable";
import Utils from "../../../common/utils";

class Star extends Component {
  static get animationTime() {
    return 1500;
  }

  static get travalDistance() {
    return 1000;
  }

  constructor(x, y) {
    console.warn(y);
    super();
    this.setView(
      new Frameable(x, y, {
        imageName: "star.png",
        width: 128,
        height: 128,
        opacity: 1
      })
    );

    this.customFunction = this.createCustomFunction();
    this.direction = this.getDirection();
  }

  shoot(onComplete) {
    this.render();

    // this.view.animateProperty(
    //   "x",
    //   this.direction * Star.travalDistance,
    //   Star.animationTime
    // );

    this.view.animateProperty("y", Star.travalDistance, Star.animationTime, {
      customFunction: this.customFunction
    });

    this.view.animatePropertyTo("size", 150, 2000);

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
    let a = Utils.getRandomFloat(2.5, 5.5);
    let b = Utils.getRandomFloat(0.008, 0.014);
    return (y0, x) => {
      console.warn(y0 + -a * x + b * x * x);
      return y0 + -a * x + b * x * x;
    };
  }
}

export default Star;
