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
  },

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  },

  getRandomIntFromRanges(ranges) {
    let range = ranges[Utils.getRandomIntInclusive(range.length - 1)];
    return this.getRandomIntInclusive(range[0], range[1]);
  }
};

export default Utils;
