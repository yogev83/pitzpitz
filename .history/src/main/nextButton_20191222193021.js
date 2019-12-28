import Clickable from "../canvas/renderable/clickable";

class NextButton extends Component {
  constructor() {
    super();

    this.setView(
      new Clickable(800, 1200, {
        imageName: this.partData.image,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }
}

export default NextButton;
