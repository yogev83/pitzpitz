import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";
import Component from "./components/component";
import Renderable from "../canvas/renderable/renderable";

class Game {
  constructor() {
    this.play = null;
    this.next = new Component();
    this.next.setView(
      new Renderable(800, 1200, {
        imageName: this.partData.image
      })
    );
  }

  start(theme) {
    this.play = new Play(this.startPlaying.bind(this), theme);
    this.startPlaying();
  }

  showNext() {}

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
