import PuzzleStructure from "./puzzleStructure";
import Part from "../part/part";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
    this.doneCount = 0;
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    let locationBuffer;
    this.parts = partsData;
    $.each(this.parts, (i, part) => {
      locationBuffer = this.getRandomLocation();
      new Part(
        locationBuffer.x,
        locationBuffer.y,
        {
          image: part.image
        },
        this.solvePart.bind(this)
      );
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
