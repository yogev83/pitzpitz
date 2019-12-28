import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";

class Game {
  constructor() {
    this.play = null;
  }

  start(canvasWidth) {
    this.play = new Play(canvasWidth, this.startPlaying.bind(this));
    this.startPlaying();
  }

  startPlaying() {
    let self = this;
    puzzleImageLoader.getRandomImage().then(puzzleImage => {
      if (puzzleImage) {
        self.play.starNewtPlay(puzzleImage);
      }
    });
  }
}

export default Game;
