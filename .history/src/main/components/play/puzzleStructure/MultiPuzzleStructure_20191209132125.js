import PuzzleStructure from "./puzzleStructure";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolveStart, onSolveComelete) {
    super(puzzleData, onSolveStart, onSolveComelete);
    this.doneCount = 0;
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    this.parts = partsData;
  }

  solve() {
    this.doneCount++;
    if (this.parts.lenght == this.doneCount) {
      super.solve();
    }
  }
}

export default MultiPuzzleStructure;
