import BasicImage from "./basicImage";

class Spritesheet extends BasicImage {
  constructor(imageName, options = {}) {
    super(imageName);
    this.options = options;
    this.imageName = imageName;
    this.frameMapping = options.frameMapping;
    this.frameIndex = 0;
    this.frameData = null;

    this.setFrame(0);
  }

  getFrameIndex(framename) {
    return this.frameMapping.indexOf(framename);
  }

  setFrame(frameindex) {
    this.frameIndex = frameindex;
    if (this.frameData) {
      this.updateFrameData();
    }
  }

  getFrame() {
    return this.frameIndex;
  }

  getImage(onLoaded) {
    super.getImage(imageObject => {
      if (
        !this.frameData &&
        this.image.naturalWidth &&
        this.image.naturalHeight
      ) {
        this.setSizes();
        this.updateFrameData();
      }

      imageObject.frame = this.frameData;
      onLoaded(imageObject);
    });
  }

  updateFrameData() {
    let rowIndex = Math.floor(this.frameIndex / this.options.rowSize);
    let colIndex = this.frameIndex % this.options.rowSize;
    this.frameData = {
      frameX: this.options.sWidth * colIndex,
      frameY: this.options.sHeight * rowIndex,
      frameWidth: this.options.sWidth,
      frameHeight: this.options.sHeight
    };
  }

  setSizes() {
    if (this.options.rowSize) {
      this.setWidthAndHeight();
    } else {
      this.setRowSizeAndColumnSize();
    }
  }

  setWidthAndHeight() {
    this.options.columnSize = this.options.columnSize || 1;
    this.options.sWidth = Math.floor(
      this.image.naturalWidth / this.options.rowSize
    );
    this.options.sHeight = this.options.sHeight || this.image.naturalHeight;
  }

  setRowSizeAndColumnSize() {
    this.options.sWidth = this.options.sWidth || this.image.naturalWidth;
    this.options.sHeight = this.options.sHeight || this.image.naturalHeight;
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
