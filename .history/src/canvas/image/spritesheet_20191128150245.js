import BasicImage from "./basicImage";

class Spritesheet extends BasicImage {
  constructor(imageName, options = {}) {
    super(imageName);
    this.options = options;
    this.imageName = imageName;
    this.frameMapping = options.frameMapping;
    this.frameIndex = 0;
    this.frame = null;

    this.setFrame(0);
  }

  getFrameIndex(framename) {
    return this.frameMapping.indexOf(framename);
  }

  setFrame(frameindex) {
    this.frameIndex = frameindex;
  }

  getFrame() {
    return this.frameIndex;
  }

  getImage(onLoaded) {
    super.getImage(imageObject => {
      let rowIndex;
      let colIndex;

      if (this.frame) {
        imageObject.frame = this.frame;
        onLoaded(imageObject);
      } else {
      }
    });
  }

  setSizes() {
    this.options.rowSize = Math.floor(
      this.image.naturalWidth / this.options.sWidth
    );
    this.options.columnSize = Math.floor(
      this.image.naturalHeight / this.options.sHeight
    );
  }

  getRowSize() {
    return this.options.rowSize;
  }

  getColumnSize() {
    return this.options.columnSize;
  }

  getSize() {
    return this.options.rowSize * this.options.columnSize;
  }
}

export default Spritesheet;
