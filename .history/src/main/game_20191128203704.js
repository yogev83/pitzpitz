import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";

class Game {
  constructor() {
    this.play = null;
  }

  start() {
    this.play = new Play(this.startPlaying.bind(this));
    this.startPlaying();
  }

  startPlaying() {
    let self = this;
    console.warn("startPlaying");
    puzzleImageLoader.getRandomImage().then(puzzleImage => {
      if (puzzleImage) {
        self.play.starNewtPlay(puzzleImage);
      }
    });
  }
}

export default Game;
