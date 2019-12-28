class PuzzleImage {
  constructor(image) {
    this.setPuzzleImage(image);
  }

  setPuzzleImage(image) {
    this.puzzle = image.puzzle;
    this.parts = image.parts;
  }

  setPuzzle(puzzle) {
    this.puzzle = puzzle;
  }
}

export default PuzzleImage;
