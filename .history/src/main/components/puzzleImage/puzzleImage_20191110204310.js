class PuzzleImage {
  constructor(image) {
    this.parsePuzzleImage(image);
  }

  setPuzzleImage(image) {
    this.puzzle = image.puzzle;
    this.parts = image.parts;
  }

  setPuzzle(puzzle) {
    this.puzzle = puzzle;
  }

  setParts(parts) {
    this.parts = parts;
  }
}

export default PuzzleImage;
