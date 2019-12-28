import PuzzleStructure from "./puzzleStructure";
import Part from "../part/part";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
    this.doneCount = 0;
    this.parts = [];
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    let locationBuffer;
    let partBuffer;
    $.each(partsData, (i, part) => {
      locationBuffer = this.getRandomLocation();
      partBuffer = new Part(
        locationBuffer.x,
        locationBuffer.y,
        part,
        this.solvePart.bind(this)
      );
      this.add(partBuffer);
      this.parts.push(partBuffer);
      partBuffer.putInPlace();
    });
  }

  solvePart(part) {
    this.puzzle.maskTarget(
      part.partData.target.x,
      part.partData.target.y,
      part.view.options.width - 50,
      part.view.options.height - 50
    );
    super.solvePart(part);
  }

  solve() {
    this.doneCount++;
    console.warn(this.parts.length, this.doneCount);
    if (this.parts.length == this.doneCount) {
      super.solve();
    }
  }
}

export default MultiPuzzleStructure;
