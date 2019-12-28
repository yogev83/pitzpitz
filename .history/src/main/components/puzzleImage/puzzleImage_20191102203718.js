class PuzzleImage {
  constructor(properties) {
    this.setPuzzleImage(properties);
  }

  setPuzzleImage(properties) {
    this.puzzle = properties.puzzle;
    this.parts = properties.parts;
  }
}

export default PuzzleImage;
