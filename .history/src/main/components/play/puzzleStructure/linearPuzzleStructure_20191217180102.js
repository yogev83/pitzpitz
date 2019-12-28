import SimplePuzzleStructure from "./simplePuzzleStructure";

class LinearPuzzleStructure extends SimplePuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
  }

  parseParts(partsData) {
    //bad idea since we can't instantiate it in the class.
    if (!this.partsCollection) {
      this.partsCollection = partsData;
    }
    super.parseParts(this.partsCollection.shift());
  }

  solvePart(part) {
    super.solvePart(part);
    this.puzzle.maskTarget(
      part.partData.target.x,
      part.partData.target.y,
      part.view.options.width - 50,
      part.view.options.height - 50
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
