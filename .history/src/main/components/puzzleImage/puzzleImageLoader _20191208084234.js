import Utils from "../../common/utils";

class PuzzleImageLoader {
  constructor() {
    this.puzzleImages = null;
  }

  getRandomImage() {
    let image;
    let $deffered = $.Deferred();

    if (this.puzzleImages) {
      image = this.puzzleImages.length > 0 ? this.pickRandom() : undefined;
      $deffered.resolve(image);
    } else {
      $.getJSON("assets/data.json", data => {
        this.puzzleImages = data;
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

  // parseImage(data) {
  //   let images = data.images;
  //   return {
  //     puzzle: {
  //       target: data.target,
  //       imageName: images[0] + ".png"
  //     },
  //     parts: {
  //       right: images[0] + "1.png",
  //       wrongs: [images[1] + "1.png", images[2] + "1.png"]
  //     }
  //   };
  // }

  removeSelected(index) {
    this.puzzleImages.splice(index, 1);
  }
}

export default new PuzzleImageLoader();
