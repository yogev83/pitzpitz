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

  onPuzzleReady(x, y) {
    $.each(this.parts, (i, part) => {
      part.setTargetOffset(x, y);
    });
  }

  solvePart(part) {
    super.solvePart(part);
    this.puzzle.maskTarget(
      part.view.x,
      part.view.y,
      part.partData.target.x,
      part.partData.target.y,
      part.view.options.width,
      part.view.options.height
    );
  }

  solve() {
    this.doneCount++;
    if (this.parts.lenght == this.doneCount) {
      super.solve();
    }
  }
}

export default MultiPuzzleStructure;
