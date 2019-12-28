import Clickable from "../canvas/renderable/clickable";

class NextButton extends Component {
  constructor() {
    super();

    this.setView(
      new Clickable(800, 1200, {
        imageName: "next.png",
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }
}

export default NextButton;
