import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";

class Game {
  constructor() {
    this.play = null;
  }

  start(theme) {
    this.play = new Play(this.startPlaying.bind(this));
    this.startPlaying(theme);
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
