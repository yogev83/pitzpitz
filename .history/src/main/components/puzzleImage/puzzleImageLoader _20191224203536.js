import Utils from "../../common/utils";

class PuzzleImageLoader {
  constructor() {
    this.puzzleImages = null;
    this.final = null;
  }

  getRandomImage() {
    let image;
    let $deffered = $.Deferred();

    if (this.puzzleImages) {
      image = this.puzzleImages.length > 0 ? this.pickRandom() : undefined;
      $deffered.resolve(image);
    } else {
      $.getJSON("assets/data.json", data => {
        this.puzzleImages = data.puzzles;
        $deffered.resolve(this.pickRandom());
      });
    }

    return $deffered.promise();
  }

  pickRandom() {
    let index = Utils.getRandomIntInclusive(0, this.puzzleImages.length - 1);
    let image = this.puzzleImages[index];
    this.removeSelected(index);
    return image;
  }

  removeSelected(index) {
    this.puzzleImages.splice(index, 1);
  }
}

export default new PuzzleImageLoader();