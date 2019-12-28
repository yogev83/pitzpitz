import Draggable from "../../../canvas/renderable/draggable";
import Component from "../component";

class Puzzle extends Component {
    constructor(imageName) {
        super();
        this.setView(
            new Draggable(0, 0, {
              imageName: imageName
            })
          );
    }
}

export default Puzzle;