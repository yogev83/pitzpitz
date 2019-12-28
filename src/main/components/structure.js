import Utils from "../common/utils";

class Structure {
  constructor(components) {
    this.rendered = false;
    this.components = [];
    if (components) {
      this.add(components);
    }
  }

  add(components) {
    let renderer = puzzle.getRenderer();
    components = Utils.toArray(components);

    if (this.rendered) {
      for (let i = 0; i < components.length; i++) {
        components[i].render(renderer);
      }
    }

    this.components = this.components.concat(components);
  }

  render() {
    this.rendered = true;
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].render();
    }
  }

  destroy() {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].destroy();
    }
  }
}

export default Structure;
