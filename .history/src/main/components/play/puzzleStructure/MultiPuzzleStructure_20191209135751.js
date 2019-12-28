import PuzzleStructure from "./puzzleStructure";
import Part from "../part/part";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
    this.doneCount = 0;
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    this.parts = partsData;
    $.each(this.parts, (i, part) => {
      new Part(
        locationBuffer.x,
        locationBuffer.y,
        {
          image: part.image
        },
        () => {
          this.onSolvePart(
            this.view.x + this.right.view.options.width / 2,
            this.right.view.y + this.right.view.options.height / 2
          );
        }
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
