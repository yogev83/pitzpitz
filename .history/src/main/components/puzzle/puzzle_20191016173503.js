import Renderable from "../../../canvas/renderable/renderable";
import Component from "../component";

class Puzzle extends Component {
    constructor(imageName) {
        super();
        this.setView(
            new Renderable(0, 0, {
              imageName: imageName;
            })
          );
    }
}

export default Puzzle;