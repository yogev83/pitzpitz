import SimplePuzzleStructure from "./simplePuzzleStructure";

class LinearPuzzleStructure extends SimplePuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
    this.doneCount = 0;
  }

  //Written very badlly
  parseParts(partsData) {
    if (!this.partsCollection && partsData) {
      this.partsCollection = partsData;
    }
    this.partsCollection.shift();
    super.parseParts(this.partsCollection);
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
      if (this.partsCollection.length > 1) {
        this.doneCount = 0;
        this.parseParts();
      }
      super.solve();
    }
  }
}

export default LinearPuzzleStructure;
