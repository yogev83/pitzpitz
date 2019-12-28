import Component from "../component";

class Puzzle extends Component {
    constructor() {
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

export default Puzzle;