import PuzzleStructure from "./puzzleStructure";
import Part from "../part/part";

class SimplePuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
    this.right = null;
    this.wrongs = [];
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    let wrongPartBuffer;
    let locationBuffer = this.getRandomLocation();
    this.right = new Part(
      locationBuffer.x,
      locationBuffer.y,
      partsData.right,
      this.solvePart.bind(this)
    );
    this.add(this.right);

    this.wrongs = [];
    $.each(partsData.wrongs, (i, image) => {
      locationBuffer = this.getRandomLocation();
      wrongPartBuffer = new Part(locationBuffer.x, locationBuffer.y, {
        image: image
      });
      this.wrongs.push(wrongPartBuffer);
      this.add(wrongPartBuffer);
    });

    this.right.putInPlace();
    $.each(this.wrongs, (i, wrong) => {
      wrong.putInPlace();
    });
  }

  solvePart(part) {
    super.solvePart(part);
    $.each(this.wrongs, (i, wrong) => {
      wrong.destroy(PuzzleStructure.solvingTime / 4);
    });
  }
}

export default SimplePuzzleStructure;
