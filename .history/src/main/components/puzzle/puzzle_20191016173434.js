import Renderable from "../../../canvas/renderable/renderable"
import Component from "../component";

class Puzzle extends Component {
    constructor() {
        super();
        this.setView(
            new Renderable(0, 0, {
              imageName: imageName,
              z: -1
            })
          );
    }
}

export default Puzzle;