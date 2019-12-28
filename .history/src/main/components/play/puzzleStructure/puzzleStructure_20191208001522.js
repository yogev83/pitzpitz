import Structure from "../../structure";
import Puzzle from "../puzzle/puzzle";
import Part from "../part/part";
import Utils from "../../../common/utils";

class PuzzleStructure extends Structure {
  static get solvingTime() {
    return 1000;
  }

  constructor(puzzleImage, onSolveStart, onSolveComelete) {
    super();
    let ctx = puzzle.getRenderer().getContext();
    this.partsLocations = [
      {
        x: 50,
        y: 50
      },
      {
        x: 50,
        y: ctx.canvas.height - 600
      },
      {
        x: ctx.canvas.width - 500,
        y: 50
      },
      {
        x: ctx.canvas.width - 500,
        y: ctx.canvas.height - 600
      }
    ];
    this.puzzle = null;
    this.right = null;
    this.wrongs = [];
    this.onSolveStart = onSolveStart;
    this.onSolveComelete = onSolveComelete;
    this.parsePuzzleImage(puzzleImage);
  }

  getRightCoordinates() {
    return {
      x: this.right.view.x,
      y: this.right.view.y
    };
  }

  parsePuzzleImage(puzzleImage) {
    let wrongPartBuffer;
    this.puzzle = new Puzzle(
      puzzleImage.puzzle,
      this.solve.bind(this),
      PuzzleStructure.solvingTime
    );
    this.add(this.puzzle);

    this.parseParts();
  }

  getRandomLocation() {
    let index = Utils.getRandomIntInclusive(0, this.partsLocations.length - 1);
    return this.partsLocations.splice(index, 1)[0];
  }

  onRightDropped(x, y) {
    if (this.puzzle.trySolving(x, y, true)) {
      this.onSolveStart(
        this.right.view.x + this.right.view.options.width / 2,
        this.right.view.y + this.right.view.options.height / 2
      );
      this.right.destroy();
      $.each(this.wrongs, (i, wrong) => {
        wrong.destroy(PuzzleStructure.solvingTime / 4);
      });
    }
  }

  onWrongDropped(x, y, part) {
    if (this.puzzle.trySolving(x, y)) {
      part.drop();
    }
  }

  solve() {
    this.onSolveComelete();
  }
}

export default PuzzleStructure;
