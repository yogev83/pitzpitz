class BasicImage {
  constructor(imageName, options = {}) {
    this.imageName = imageName;
    this.image = null;
    this.options = options;
  }

  load(onLoaded) {
    this.image = new Image();
    this.image.src = puzzle.ASSETS_PATH + this.imageName;
    this.image.onload = onLoaded;
  }

  getImage(onLoaded) {
    if (this.image) {
      onLoaded({
        image: this.image
      });
    } else {
      this.load(() => {
        onLoaded({
          image: this.image
        });
      });
    }
  }
}

export default BasicImage;
