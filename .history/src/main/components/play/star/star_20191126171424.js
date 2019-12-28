import Component from "../../component";
import Frameable from "../../../../canvas/renderable/framable";

class Star extends Component {
  static get animationTime() {
    return 1500;
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
        let distance = -(3 x)/2 + x^2/200
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
}

export default Star;
