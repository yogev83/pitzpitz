import Play from "./components/play/play";
import puzzleImageLoader from "./components/puzzleImage/puzzleImageLoader ";
import Component from "./components/component";
import Clickable from "../canvas/renderable/clickable";
import NextButton from "./nextButton";

class Game {
  constructor() {
    this.play = null;
    this.next = new NextButton(() => {});
  }

  start(theme) {
    this.play = new Play(this.showNext.bind(this), theme);
    this.startPlaying();
  }

  showNext() {
    this.next.view.animmateProperty("y", -500);
    this.startPlaying();
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
