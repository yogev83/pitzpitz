import PuzzleStructure from "./puzzleStructure";
import Part from "../part/part";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolveStart, onSolveComelete) {
    super(puzzleData, onSolveStart, onSolveComelete);
    this.doneCount = 0;
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    this.parts = partsData;
    $.each(this.parts, (i, part) => {
      new Part(locationBuffer.x, locationBuffer.y, {
        image: part.image
      });
    });
  }

  solve() {
    this.doneCount++;
    if (this.parts.lenght == this.doneCount) {
      super.solve();
    }
  }
}

export default MultiPuzzleStructure;
