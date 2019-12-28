import PuzzleStructure from "./puzzleStructure copy";

class SinglePuzzleStructure extends PuzzleStructure {
  constructor(puzzleImage, onSolveStart, onSolveComelete) {
    super(puzzleImage, onSolveStart, onSolveComelete);
    this.right = null;
    this.wrongs = [];
  }

  parseParts() {
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
}

export default SinglePuzzleStructure;
