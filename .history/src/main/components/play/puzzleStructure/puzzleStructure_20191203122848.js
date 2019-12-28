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
    this.partsLocations = [
      {
        x: 100,
        y: 100
      },
      {
        x: 100,
        y: ctx.canvas.height - 600
      },
      {
        x: ctx.canvas.width - 400,
        y: 100
      },
      {
        x: ctx.canvas.width - 400,
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

    let locationBuffer = this.getRandomLocation();
    this.right = new Part(
      locationBuffer.x,
      locationBuffer.y,
      puzzleImage.parts.right,
      this.onRightDropped.bind(this)
    );
    this.add(this.right);

    $.each(puzzleImage.parts.wrongs, (i, wrong) => {
      locationBuffer = locations[++locationIndex];
      wrongPartBuffer = new Part(
        locationBuffer.x,
        locationBuffer.y,
        wrong,
        this.onWrongDropped.bind(this)
      );
      this.wrongs.push(wrongPartBuffer);
      this.add(wrongPartBuffer);
    });

    this.right.putInPlace();
    $.each(this.wrongs, (i, wrong) => {
      wrong.putInPlace();
    });
  }

  getRandomLocation() {
    let index = Utils.getRandomIntInclusive(0, this.locations.length - 1);
    return this.locations.splice(index);
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
