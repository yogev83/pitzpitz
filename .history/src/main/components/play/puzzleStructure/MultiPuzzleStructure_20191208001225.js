import PuzzleStructure from "./puzzleStructure";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleImage, onSolveStart, onSolveComelete) {
    super(puzzleImage, onSolveStart, onSolveComelete);
    this.doneCount = 0;
  }

  solve() {
    this.doneCount++;
    if (this.doneCount == this.doneCount) {
      super.solve();
    }
  }
}

export default MultiPuzzleStructure;
