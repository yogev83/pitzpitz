import Part from "../part/part";

class SimplePuzzleStructure extends PuzzleStructure {
  constructor(puzzleData, onSolveStart, onSolveComelete) {
    super(puzzleData, onSolveStart, onSolveComelete);
    this.right = null;
    this.wrongs = [];
  }

  parseParts(partsData) {
    let wrongPartBuffer;
    let locationBuffer = this.getRandomLocation();
    this.right = new Part(
      locationBuffer.x,
      locationBuffer.y,
      partsData.right,
      this.onSolved.bind(this)
    );
    this.add(this.right);

    $.each(partsData.wrongs, (i, wrong) => {
      locationBuffer = this.getRandomLocation();
      wrongPartBuffer = new Part(
        locationBuffer.x,
        locationBuffer.y,
        wrong,
        this.onWrongDropped.bind(this)
      );
      this.wrongs.push(wrongPartBuffer);
      this.add(wrongPartBuffer);
    });

    this.right.putInPlace();
    $.each(this.wrongs, (i, wrong) => {
      wrong.putInPlace();
    });
  }

  onSolved() {
    this.onSolveStart(
      this.right.view.x + this.right.view.options.width / 2,
      this.right.view.y + this.right.view.options.height / 2
    );
    $.each(this.wrongs, (i, wrong) => {
      wrong.destroy(PuzzleStructure.solvingTime / 4);
    });
  }

  onWrongDropped(x, y, part) {
    if (this.puzzle.isOnPuzzle(x, y)) {
      part.drop();
    }
  }
}

export default SimplePuzzleStructure;
