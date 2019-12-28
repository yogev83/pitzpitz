import Component from "../../component";
import Frameable from "../../../../canvas/renderable/framable";

class Star extends Component {
  static get fadeOutTime() {
    return 500;
  }

  constructor(x, y) {
    super();
    this.setView(
      new Frameable(x, y, {
        imageName: "star.png",
        width: 128,
        height: 128,
        opacity: 1
      })
    );
  }

  shoot() {
    this.render();
    // this.view.animatePropertyTo("opacity", 1, 500, {
    //   onComplete: () => {
    //     this.view.animatePropertyTo("opacity", 0, 500);
    //   }
    // });
    this.view.animateToFrame(47, 500);
  }
}

export default Star;
