import PuzzleStructure from "./puzzleStructure";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolveStart, onSolveComelete) {
    super(puzzleData, onSolveStart, onSolveComelete);
    this.doneCount = 0;
    this.parts = puzzleData.parts;
    this.parsePuzzleImage(puzzleData);
  }

  solve() {
    this.doneCount++;
    if (this.parts.lenght == this.doneCount) {
      super.solve();
    }
  }
}

export default MultiPuzzleStructure;
