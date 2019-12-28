const Utils = {
  distance(x1, y1, x2, y2) {
    let a = x2 - x1;
    let b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  },

  getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  },

  toArray(object) {
    if (!Array.isArray(object)) {
      object = [object];
    }
    return object;
  }
};

export default Utils;
