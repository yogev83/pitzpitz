import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";
import Component from "./components/component";
import Frameable from "../canvas/renderable/framable";

class Game {
  constructor() {
    this.play = null;
    this.next = new Component();
    this.next.setView(
      new Frameable(800, 800,   imageName: this.partData.image,
        onDrop: this.drop.bind(this),
        opacity: 1,
        rotation: rotation,
        spritesheet: {
          rowSize: 3
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
