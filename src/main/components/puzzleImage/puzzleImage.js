class PuzzleImage {
  constructor(imageData) {
    this.puzzle = "";
    this.right = "";
    this.parts = [];
    this.parsePuzzleImage(imageData);
  }

  parsePuzzleImage(image) {
    this.setPuzzle(image.puzzle);
    this.setParts(image.parts);
  }

  setPuzzle(puzzle) {
    this.puzzle = puzzle;
  }

  setParts(parts) {
    this.right = this.puzzle;
    this.wrong;
  }
}

export default PuzzleImage;
