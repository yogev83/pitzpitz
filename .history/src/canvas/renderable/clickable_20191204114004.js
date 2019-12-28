import Frameable from "./framable";

class Clickable extends Frameable {
  constructor(x, y, options = {}) {
    if (!isNaN(x) && typeof options == "object") {
      options.spritesheet = options.spritesheet || {};
    } else {
      options.spritesheet = x.spritesheet || {};
    }
    options.spritesheet.frameMapping = ["idle", "hover", "pressed"];

    super(x, y, options);
    this.disabled = false;
    this.pressedState = false;
    this.hoverState = false;
  }

  onClick(e) {
    if (this.disabled) {
      return;
    }

    this.pressedState = !this.pressedState;
    this.hoverState = false;

    if (!this.options.static) {
      if (this.pressedState) {
        this.setFrame("pressed");
      } else {
        this.setFrame("idle");
      }
    }

    if (this.options.onClick) {
      this.options.onClick(e);
    }
  }

  onMove() {
    if (this.disabled) {
      return;
    }

    this.onHover();
  }

  onHover() {
    if (!this.pressedState && !this.hoverState) {
      this.hoverState = true;
      if (!this.options.static) {
        this.setFrame("hover");
      }
    }
  }

  onLeave() {
    if (this.disabled) {
      return;
    }

    this.hoverState = false;
    this.pressedState = false;
    if (!this.options.static) {
      this.setFrame("idle");
    }
  }

  onRelease(e) {
    if (this.disabled) {
      return;
    }

    if (!this.options.sticky) {
      this.pressedState = false;
      this.onHover();
    }
  }

  enable() {
    this.disabled = false;
  }

  disable() {
    this.disabled = true;
  }

  hitTest(x, y) {
    let inside;

    if (typeof this.options.hitTest == "function") {
      inside = this.options.hitTest(x, y) && this.colorHitTest(x, y);
    } else {
      inside =
        this.x < x &&
        x < this.x + this.options.width &&
        this.y < y &&
        y < this.y + this.options.height;
    }

    return inside;
  }

  colorHitTest(x, y) {}
}

export default Clickable;
