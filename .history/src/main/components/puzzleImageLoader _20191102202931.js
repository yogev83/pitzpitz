class PuzzleImageLoader {
  getRandomImage() {
    let temp = {
      puzzle: "puzzle.jpg",
      parts: ["rightpart.jpg", "wrongpart.jpg", "wrongpart.jpg"]
    };
    return new PuzzleImage(temp);
  }
}

export default new PuzzleImageLoader();
