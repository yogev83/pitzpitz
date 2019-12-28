import Component from "./component";
import Renderable from "../../canvas/renderable/renderable";

class Background extends Component {
  constructor(imageName, ctx) {
    super();
    this.setView(
      new Renderable(0, 0, {
        width: ctx.canvas.width,
        height: ctx.canvas.height,
        imageName: imageName,
        z: -1
      })
    );
  }
}

export default Background;
