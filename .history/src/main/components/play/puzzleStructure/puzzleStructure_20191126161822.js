import Structure from "../../structure";
import Puzzle from "../puzzle/puzzle";
import Part from "../part/part";
import Utils from "../../../common/utils";

class PuzzleStructure extends Structure {
  static get solvingTime() {
    return 1000;
  }

  static get bounds() {
    let ctx = puzzle.getRenderer().getContext();

    return {
      MIN_X: 100,
      MAX_X: ctx.canvas.width - 400,
      MIN_Y: 100,
      MAX_Y: ctx.canvas.height - 800
    };
  }

  static get partsDistance() {
    return 200;
  }

  static get farEnoughAttempts() {
    return 10000;
  }

  constructor(puzzleImage, onSolveStart, onSolveComelete) {
    super();
    this.puzzle = null;
    this.right = null;
    this.wrongs = [];
    this.onSolveStart = onSolveStart;
    this.onSolveComelete = onSolveComelete;
    this.parsePuzzleImage(puzzleImage);
  }

  getRightCoordinates() {
    return {
      x: this.right.view.x,
      y: this.right.view.y
    };
  }

  parsePuzzleImage(puzzleImage) {
    let wrongPartBuffer;
    this.puzzle = new Puzzle(
      puzzleImage.puzzle,
      this.solve.bind(this),
      PuzzleStructure.solvingTime
    );
    this.add(this.puzzle);

    let partsCountIncludingRight = puzzleImage.parts.wrongs.length + 1;
    let locations = this.createLocations(
      partsCountIncludingRight,
      puzzleImage.puzzle
    );
    let locationIndex = 0;
    let locationBuffer = locations[locationIndex];

    this.right = new Part(
      locationBuffer.x,
      locationBuffer.y,
      puzzleImage.parts.right,
      (x, y) => {
        if (this.puzzle.trySolving(x, y)) {
          this.right.destroy();
          $.each(this.wrongs, (i, wrong) => {
            wrong.destroy(PuzzleStructure.solvingTime / 4);
          });
        }
      }
    );
    this.add(this.right);

    $.each(puzzleImage.parts.wrongs, (i, image) => {
      locationBuffer = locations[++locationIndex];
      wrongPartBuffer = new Part(locationBuffer.x, locationBuffer.y, image);
      this.wrongs.push(wrongPartBuffer);
      this.add(wrongPartBuffer);
    });
  }

  createLocations(count, puzzle) {
    let locations = [];
    let locationBuffer;
    let attempts = 0;

    for (let i = 0; i < count; i++) {
      locationBuffer = this.getRandomLocation(puzzle);
      attempts = 0;
      while (
        !this.isFarEnough(locationBuffer, locations) &&
        attempts <= PuzzleStructure.farEnoughAttempts
      ) {
        attempts++;
        locationBuffer = this.getRandomLocation(puzzle);
      }
      locations.push(locationBuffer);
    }

    return locations;
  }

  getRandomLocation(puzzleData) {
    let x = Utils.getRandomIntFromRanges([
      [PuzzleStructure.bounds.MIN_X, this.puzzle.x - 300],
      [this.puzzle.x + puzzleData.width, PuzzleStructure.bounds.MAX_X]
    ]);
    let y = Utils.getRandomIntInclusive(
      PuzzleStructure.bounds.MIN_Y,
      PuzzleStructure.bounds.MAX_Y
    );

    return {
      x: x,
      y: y
    };
  }

  isFarEnough(testedLocation, locations) {
    let farEnough = true;
    $.each(locations, (i, location) => {
      farEnough =
        farEnough &&
        PuzzleStructure.partsDistance <
          Utils.distance(
            location.x,
            location.y,
            testedLocation.x,
            testedLocation.y
          );
    });

    return farEnough;
  }

  solve() {
    this.onSolved();
  }
}

export default PuzzleStructure;
