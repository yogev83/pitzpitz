import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";
import Component from "./components/component";
import Clickable from "../canvas/renderable/clickable";

class Game {
  constructor() {
    this.play = null;
    this.next = new Component();
    this.next.setView(
      new Clickable(800, 1200, {
        imageName: this.partData.image,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  start(theme) {
    this.play = new Play(this.startPlaying.bind(this), theme);
    this.startPlaying();
  }

  showNext() {
    this.next.view.animmateProperty("y", -500);
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
