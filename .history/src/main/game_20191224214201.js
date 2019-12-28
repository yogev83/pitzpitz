import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";
import NextButton from "./nextButton";

class Game {
  constructor() {
    this.play = null;
    this.next = new NextButton(() => {
      this.startPlaying();
    });
  }

  start(theme) {
    this.next.render();
    this.play = new Play(this.showNext.bind(this), theme);
    this.startPlaying();
  }

  showNext() {
    this.next.putInPlace();
  }

  startPlaying() {
    let self = this;
    let finalPuzzle;
    puzzleImageLoader.getRandomImage().then(puzzleData => {
      if (puzzleData) {
        self.play.starNewtPlay(puzzleData);
      } else {
        finalPuzzle = puzzleImageLoader.getFinalPuzzle();
        self.play.starNewtPlay(finalPuzzle);
      }
    });
  }
}

export default Game;
