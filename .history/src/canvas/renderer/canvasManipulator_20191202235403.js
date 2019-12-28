class CanvasManipulator {
  constructor(ctx) {
    this.ctx = ctx;
  }

  rotate(degrees) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    this.ctx.save();

    // move to the center of the canvas
    this.ctx.translate(canvas.width / 2, canvas.height / 2);

    // rotate the canvas to the specified degrees
    this.ctx.rotate((degrees * Math.PI) / 180);

    // draw the image
    // since the context is rotated, the image will be rotated also
    this.ctx.drawImage(image, -image.width / 2, -image.width / 2);

    // we’re done with the rotating so restore the unrotated context
    this.ctx.restore();
  }
}

export default new CanvasManipulator();
