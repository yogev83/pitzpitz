import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";
import NextButton from "./nextButton";

class Game {
  constructor() {
    this.play = null;
    this.next = new NextButton(() => {
      this.startPlaying();
      this.next.destroy();
    });
  }

  start(theme) {
    this.play = new Play(this.showNext.bind(this), theme);
    this.startPlaying();
  }

  showNext() {
    this.next.render();
    this.next.putInPlace();
  }

  startPlaying() {
    let self = this;
    puzzleImageLoader.getRandomImage().then(puzzleData => {
      if (puzzleData) {
        self.play.starNewtPlay(puzzleData);
      }
    });
  }
}

export default Game;
