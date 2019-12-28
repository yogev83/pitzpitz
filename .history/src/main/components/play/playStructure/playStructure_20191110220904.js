import Structure from "../../../components/structure";
import Puzzle from "../puzzle/puzzle";
import Part from "../part/part";

class PlayStructure extends Structure {
  constructor(puzzleImage) {
    this.puzzle = null;
    this.right = null;
    this.wrongs = [];
    this.parsePuzzleImage(puzzleImage);
  }

  parsePuzzleImage(puzzleImage) {
    let wrongs = puzzleImage.wrongs;

    this.puzzle = new Puzzle(puzzleImage.puzzle);
    this.right = new Part(300, 50, puzzleImage.right);

    for (let i = 0; i < wrongs.length; i++) {
      partBuffer = new Part(300, 100, wrongs[i]);
      this.wrongs.push(partBuffer);
    }
  }
}

export default PlayStructure;
