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
  }

  shoot(onComplete) {
    this.render();

    this.view.animateProperty("x", Star.travalDistance, Star.animationTime);

    this.view.animateProperty("y", Star.travalDistance, Star.animationTime, {
      customFunction: (y0, x) => {
        let distance = -(3 * x) / 2 + (x * x) / 200;
        return y0 + distance;
      }
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
    let a = Utils.getRandomIntInclusive(1, 5);
    let b = Utils.getRandomIntInclusive(100, 1000);
    return () => {};
  }
}

export default Star;
