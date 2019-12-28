import Renderable from "./renderable";

class RenderableText extends Renderable {
  constructor(text, x, y, options = {}) {
    super(x, y, options);
    this.text = text;
    this.options.size = this.options.size || 24;
  }

  render(ctx) {
    let currentFillStyle = ctx.fillStyle;

    if (this.options.color) {
      ctx.fillStyle = this.options.color;
    }
    ctx.font = this.options.size + "px Arial";
    ctx.fillText(this.text, this.x, this.y);
    ctx.strokeText(this.text, this.x, this.y);

    ctx.fillStyle = currentFillStyle;
  }
}

export default RenderableText;
