import Component from "./components/component";

class NextButton extends Component {
  constructor() {
    super();

    this.setView(
      new Draggable(offscreenPoint.x, offscreenPoint.y, {
        imageName: this.partData.image,
        onDrop: this.drop.bind(this),
        opacity: 1,
        rotation: rotation,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }
}

export default NextButton;
