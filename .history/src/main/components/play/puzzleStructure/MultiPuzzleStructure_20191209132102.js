import PuzzleStructure from "./puzzleStructure";

class MultiPuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolveStart, onSolveComelete) {
    super(puzzleData, onSolveStart, onSolveComelete);
    this.doneCount = 0;
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    let wrongPartBuffer;
    let locationBuffer = this.getRandomLocation();
    this.right = new Part(
      locationBuffer.x,
      locationBuffer.y,
      partsData.right,
      this.startSolving.bind(this)
    );
    this.add(this.right);

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

  solve() {
    this.doneCount++;
    if (this.parts.lenght == this.doneCount) {
      super.solve();
    }
  }
}

export default MultiPuzzleStructure;
