import Structure from "../../structure";
import Puzzle from "../puzzle/puzzle";
import Utils from "../../../common/utils";

class PuzzleStructure extends Structure {
  static get solvingTime() {
    return 1000;
  }

  constructor(puzzleData, onSolveStart, onSolveComelete) {
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
    this.onSolveStart = onSolveStart;
    this.onSolveComelete = onSolveComelete;
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

  solve() {
    this.puzzle.onSolved(() => {
      this.onSolveComelete();
    });
  }
}

export default PuzzleStructure;
