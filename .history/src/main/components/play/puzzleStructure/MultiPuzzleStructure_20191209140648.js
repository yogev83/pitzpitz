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
        {
          image: part.image
        },
        this.solvePart.bind(this)
      );
      this.parts.push(partBuffer);
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
