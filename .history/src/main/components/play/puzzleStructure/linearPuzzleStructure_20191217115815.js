import SimplePuzzleStructure from "./simplePuzzleStructure";

class LinearPuzzleStructure extends SimplePuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
  }

  solvePart(part) {
    super.solvePart(part);
    this.puzzle.maskTarget(
      part.targetOffset.x + part.partData.target.x,
      part.targetOffset.y + part.partData.target.y,
      part.partData.target.x,
      part.partData.target.y,
      part.view.options.width - 80,
      part.view.options.height - 55
    );
    part.destroy();
  }

  solve() {
    this.doneCount++;
    if (this.parts.lenght == this.doneCount) {
      super.solve();
    }
  }
}

export default LinearPuzzleStructure;
