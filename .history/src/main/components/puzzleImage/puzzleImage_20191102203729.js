class PuzzleImage {
  constructor(image) {
    this.setPuzzleImage(image);
  }

  setPuzzleImage(image) {
    this.puzzle = image.puzzle;
    this.parts = image.parts;
  }
}

export default PuzzleImage;
