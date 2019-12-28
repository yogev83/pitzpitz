import PuzzleStructure from "./puzzleStructure copy";

class SimplePuzzleStructure extends PuzzleStructure {
  constructor(puzzleImage, onSolveStart, onSolveComelete) {
    super(puzzleImage, onSolveStart, onSolveComelete);
    this.right = null;
    this.wrongs = [];
  }

  parseParts() {
    let wrongPartBuffer;
    let locationBuffer = this.getRandomLocation();
    this.right = new Part(
      locationBuffer.x,
      locationBuffer.y,
      puzzleImage.parts.right,
      this.onRightDropped.bind(this)
    );
    this.add(this.right);

    $.each(puzzleImage.parts.wrongs, (i, wrong) => {
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

  onRightDropped(x, y) {
    if (this.puzzle.trySolving(x, y, true)) {
      this.onSolveStart(
        this.right.view.x + this.right.view.options.width / 2,
        this.right.view.y + this.right.view.options.height / 2
      );
      this.right.destroy();
      $.each(this.wrongs, (i, wrong) => {
        wrong.destroy(PuzzleStructure.solvingTime / 4);
      });
    }
  }

  onWrongDropped(x, y, part) {
    if (this.puzzle.trySolving(x, y)) {
      part.drop();
    }
  }
}

export default SimplePuzzleStructure;
