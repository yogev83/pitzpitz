import Clickable from "./clickable";

class Draggable extends Clickable {
  constructor(x, y, options = {}) {
    super(x, y, options);
    this.dragging = false;
    this.dragable = true; =
  }

  onClick(e) {
    this.dragging = true;
    this.draggingOffset.x = e.offsetX - this.x;
    this.draggingOffset.y = e.offsetY - this.y;
    super.onClick(e);
  }

  onMove(e) {
    if (this.dragging) {
      this.setPosition(
        e.offsetX - this.draggingOffset.x,
        e.offsetY - this.draggingOffset.y
      );

      if (this.options.onDrag) {
        this.options.onDrag(e);
      }
    } else {
      super.onMove(e);
    }
  }

  onRelease(e) {
    this.dragging = false;
    if (this.options.onDrop) {
      this.options.onDrop(this.x, this.y);
    }
    super.onRelease(e);
  }

  hitTest(ctx, x, y) {
    return this.dragging || super.hitTest(ctx, x, y);
  }
}

export default Draggable;
