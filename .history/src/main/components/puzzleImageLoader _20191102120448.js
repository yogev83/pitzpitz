class PuzzleImageLoader {
    getRandomImage() {
        let temp = {
            puzzle: "puzzle.jpg",
            part: "part.jpg"
        };
        return new PuzzleImage(temp);
    }
}

export default new PuzzleImageLoader();