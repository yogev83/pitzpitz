import SimplePuzzleStructure from "./simplePuzzleStructure";

class LinearPuzzleStructure extends SimplePuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
  }

  //Written very badlly
  parseParts(partsData) {
    if (!this.partsCollection && partsData) {
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
    if (this.partsCollection.length > 0) {
      this.resetPartsLocations();
      this.parseParts();
    } else {
      super.solve();
    }
  }
}

export default LinearPuzzleStructure;
