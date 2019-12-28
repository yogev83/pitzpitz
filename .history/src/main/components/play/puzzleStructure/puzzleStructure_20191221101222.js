import Structure from "../../structure";
import Puzzle from "../puzzle/puzzle";
import Utils from "../../../common/utils";

class PuzzleStructure extends Structure {
  static get solvingTime() {
    return 1000;
  }

  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super();
    this.partsLocations = [];
    this.puzzle = null;
    this.onSolvePart = onSolvePart;
    this.onSolvePuzzle = onSolvePuzzle;

    this.resetPartsLocations();
  }

  resetPartsLocations() {
    let ctx = puzzle.getRenderer().getContext();
    this.partsLocations = [
      {
        x: 50,
        y: 50
      },
      {
        x: 50,
        y: ctx.canvas.height - 400
      },
      {
        x: ctx.canvas.width - 400,
        y: 50
      },
      {
        x: ctx.canvas.width - 400,
        y: ctx.canvas.height - 400
      }
    ];
  }

  parsePuzzleImage(puzzleData) {
    this.puzzle = new Puzzle(
      puzzleData.puzzle,
      this.solve.bind(this),
      PuzzleStructure.solvingTime
    );
    this.add(this.puzzle);

    this.parseParts(puzzleData.parts);
  }

  getRandomLocation() {
    let index = Utils.getRandomIntInclusive(0, this.partsLocations.length - 1);
    return this.partsLocations.splice(index, 1)[0];
  }

  solvePart(part) {
    this.onSolvePart(
      part.view.x + part.view.options.width / 2,
      part.view.y + part.view.options.height / 2
    );
  }

  solve() {
    this.puzzle.onSolved(() => {
      this.onSolvePuzzle();
    });
  }
}

export default PuzzleStructure;
