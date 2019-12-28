class Component {
  constructor() {
    this.view = null;
  }

  render() {
    let renderer = puzzle.getRenderer();
    if (this.view) {
      renderer.add(this.view);
    } else {
      console.warn(
        "WARNING: You are trying to render a component that does not have a view set!"
      );
    }
  }

  setView(view) {
    this.view = view;
    return this.view;
  }

  getView() {
    return this.view;
  }

  destroy() {
    console.warn(this.view);
    let renderer = puzzle.getRenderer();
    renderer.remove(this.view);
  }
}

export default Component;
