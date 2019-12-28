/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

  getRandomFloat(min, max) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, 3);
    return Math.floor(rand * power) / power;
  },

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  },

  getRandomIntFromRanges(ranges) {
    let range = ranges[Utils.getRandomIntInclusive(0, ranges.length - 1)];
    return this.getRandomIntInclusive(range[0], range[1]);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Utils);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    //console.warn(this.view.options.imageName);
    let renderer = puzzle.getRenderer();
    renderer.remove(this.view);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Component);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_spritesheet__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_animation__ = __webpack_require__(21);




class Frameable extends __WEBPACK_IMPORTED_MODULE_0__renderable__["a" /* default */] {
  constructor(x, y, options = {}) {
    if (!isNaN(x) && typeof options == "object") {
      options.spritesheet = options.spritesheet || {};
    } else {
      options.spritesheet = x.spritesheet || {};
    }

    super(x, y, options);
    this.targetFrameAnimation = null;
    this.colorMapBeforeRendering = null;
  }

  /**
   * @overrides
   * */
  initImager() {
    let spritesheetOptions = {
      sWidth: this.options.spritesheet.sWidth || this.options.width,
      sHeight: this.options.spritesheet.sHeight || this.options.height,
      rowSize: this.options.spritesheet.rowSize,
      columnSize: this.options.spritesheet.columnSize,
      frameMapping: this.options.spritesheet.frameMapping
    };
    this.imager = new __WEBPACK_IMPORTED_MODULE_1__image_spritesheet__["a" /* default */](this.options.imageName, spritesheetOptions);
  }

  animateToFrame(targetFrame, time, options) {
    this.animations.push(
      new __WEBPACK_IMPORTED_MODULE_2__animation_animation__["a" /* default */](this.imager, targetFrame, time, options)
    );
  }

  setFrame(frame) {
    let frameIndex = frame;
    if (isNaN(frameIndex)) {
      frameIndex = this.imager.getFrameIndex(frameIndex);
      frameIndex = Math.max(0, frameIndex);
    }
    this.imager.setFrame(frameIndex);
  }

  easeFrame(frame, time, onComplete) {
    let targetOpacity = 1;

    this.animatePropertyTo("opacity", 0, time, {
      onComplete: () => {
        this.targetFrameAnimation = null;
        this.setFrame(frame);
        this.options.opacity = targetOpacity;
        if (typeof onComplete == "function") {
          onComplete();
        }
      }
    });

    this.targetFrameAnimation = {
      frame: frame,
      opacity: targetOpacity
    };
  }

  drawImage(ctx, imageObject) {
    if (imageObject.frame) {
      this.options.width = this.options.width || imageObject.frame.frameWidth;
      this.options.height =
        this.options.height || imageObject.frame.frameHeight;

      // if (this.options.imageName == "andreaLayingDown.png") {
      //   console.warn(this.x, this.y);
      // }

      // console.warn(this.options.imageName, this.x, this.y);

      if (!this.x && this.options.width) {
        this.center(ctx);
      }

      this.drawFrame(ctx, imageObject.image, imageObject.frame);
      if (
        this.targetFrameAnimation &&
        this.imager.getFrame() !== this.targetFrameAnimation.frame
      ) {
        let currentAlpha = ctx.globalAlpha;
        let currectFrame = this.imager.getFrame();

        ctx.globalAlpha = this.targetFrameAnimation.opacity - ctx.globalAlpha;
        this.setFrame(this.targetFrameAnimation.frame);
        this.renderImage(ctx);
        ctx.globalAlpha = currentAlpha;
        this.setFrame(currectFrame);
      }

      this.onReady();
    } else {
      super.drawImage(ctx, imageObject);
    }
  }

  drawFrame(ctx, image, frame) {
    if (this.options.mask) {
      // console.warn(
      //   frame.frameX + this.options.mask.x,
      //   frame.frameY + this.options.mask.y,
      //   this.options.width,
      //   this.options.height,
      //   this.x,
      //   this.y,
      //   this.options.width,
      //   this.options.height
      // );
      ctx.drawImage(
        image,
        frame.frameX + this.options.mask.x,
        frame.frameY + this.options.mask.y,
        this.options.width,
        this.options.height,
        this.x,
        this.y,
        this.options.width,
        this.options.height
      );
      // console.warn(
      //   "mask",
      //   this.options.imageName,
      //   ctx.globalAlpha,
      //   frame.frameX + this.options.mask.x,
      //   frame.frameY + this.options.mask.y
      // );
    } else {
      // console.warn(
      //   this.options.imageName,
      //   ctx.globalAlpha,
      //   frame.frameX,
      //   frame.frameY
      // );
      ctx.drawImage(
        image,
        frame.frameX,
        frame.frameY,
        frame.frameWidth,
        frame.frameHeight,
        this.x,
        this.y,
        this.options.width,
        this.options.height
      );
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Frameable);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas_renderable_draggable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils__ = __webpack_require__(0);




class Part extends __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */] {
  static get targetTolerance() {
    return 100;
  }

  static get fadeOutTime() {
    return 500;
  }

  static get dropPercent() {
    return 105;
  }

  constructor(x, y, partData, onTarget) {
    super();

    let offscreenPoint = this.getOffscreenPoint(x);
    let rotation = this.getRandomRotation();

    this.location = { x: x, y: y };
    this.partData = partData;
    this.onTarget = onTarget;

    this.sound = new Audio("assets/wood.wav");

    this.setView(
      new __WEBPACK_IMPORTED_MODULE_1__canvas_renderable_draggable__["a" /* default */](offscreenPoint.x, offscreenPoint.y, {
        imageName: this.partData.image,
        onDrop: this.drop.bind(this),
        opacity: 1,
        rotation: rotation,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  getOffscreenPoint(x) {
    return {
      x: x < 900 ? -500 : 1900 + 500,
      y: __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntInclusive(0, 900)
    };
  }

  getRandomRotation() {
    return __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntFromRanges([
      [-180, -90],
      [90, 180]
    ]);
  }

  putInPlace() {
    let xtime = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntInclusive(500, 800);
    let ytime = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntInclusive(500, 800);
    let rotationTime = Math.max(xtime, ytime);
    this.view.animatePropertyTo("x", this.location.x, xtime);
    this.view.animatePropertyTo("y", this.location.y, ytime);
    this.view.animatePropertyTo("rotation", 0, rotationTime, {
      onComplete: () => {
        this.sound.play();
      }
    });
  }

  drop() {
    // console.warn(this.view.x, this.view.y);
    let isOnTarget = this.checkIfOnTarget();
    if (isOnTarget) {
      this.onTarget(this);
    } else {
      this.sound.play();
    }
    //Shrinks!!!
    // this.view.animatePropertyTo("size", Part.dropPercent, 50, {
    //   onComplete: () => {
    //     this.view.animatePropertyTo("size", (100 * 100) / Part.dropPercent, 50);
    //     this.checkIfOnTarget();
    //   }
    // });
  }

  checkIfOnTarget() {
    if (!this.partData.target) {
      return false;
    }

    if (
      __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].distance(
        this.partData.target.x,
        this.partData.target.y,
        this.view.x,
        this.view.y
      ) < Part.targetTolerance
    ) {
      return true;
    }

    return false;
  }

  destroy(easetime) {
    //VERY VERY BAD!!!!
    //console.warn("part destroy");
    $("canvas").css("cursor", "initial");
    this.view.animatePropertyTo("opacity", 0, Part.fadeOutTime, {
      onComplete: () => {
        super.destroy();
      }
    });
    // if (easetime) {
    //   this.view.animatePropertyTo("opacity", 0, Part.fadeOutTime, {
    //     onComplete: () => {
    //       super.destroy();
    //     }
    //   });
    // } else {
    //   super.destroy();
    // }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Part);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__puzzleStructure__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__part_part__ = __webpack_require__(3);



class SimplePuzzleStructure extends __WEBPACK_IMPORTED_MODULE_0__puzzleStructure__["a" /* default */] {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
    this.right = null;
    this.wrongs = [];
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    let wrongPartBuffer;
    let locationBuffer = this.getRandomLocation();
    this.right = new __WEBPACK_IMPORTED_MODULE_1__part_part__["a" /* default */](
      locationBuffer.x,
      locationBuffer.y,
      partsData.right,
      this.solvePart.bind(this)
    );
    this.add(this.right);

    this.wrongs = [];
    $.each(partsData.wrongs, (i, image) => {
      locationBuffer = this.getRandomLocation();
      wrongPartBuffer = new __WEBPACK_IMPORTED_MODULE_1__part_part__["a" /* default */](locationBuffer.x, locationBuffer.y, {
        image: image
      });
      this.wrongs.push(wrongPartBuffer);
      this.add(wrongPartBuffer);
    });

    this.right.putInPlace();
    $.each(this.wrongs, (i, wrong) => {
      wrong.putInPlace();
    });
  }

  solvePart(part) {
    $.each(this.wrongs, (i, wrong) => {
      wrong.destroy(__WEBPACK_IMPORTED_MODULE_0__puzzleStructure__["a" /* default */].solvingTime / 4);
    });
    super.solvePart(part);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SimplePuzzleStructure);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__structure__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__puzzle_puzzle__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils__ = __webpack_require__(0);




class PuzzleStructure extends __WEBPACK_IMPORTED_MODULE_0__structure__["a" /* default */] {
  static get solvingTime() {
    return 1000;
  }

  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super();
    this.isFinal = puzzleData.final;
    this.partsLocations = [];
    this.puzzle = null;
    this.onSolvePart = onSolvePart;
    this.onSolvePuzzle = onSolvePuzzle;

    this.resetPartsLocations();
  }

  resetPartsLocations() {
    let ctx = puzzle.getRenderer().getContext();
    this.partsLocations = [
      {
        x: 50,
        y: 50
      },
      {
        x: 50,
        y: ctx.canvas.height - 500
      },
      {
        x: ctx.canvas.width - 400,
        y: 50
      },
      {
        x: ctx.canvas.width - 400,
        y: ctx.canvas.height - 500
      }
    ];
  }

  parsePuzzleImage(puzzleData) {
    this.puzzle = new __WEBPACK_IMPORTED_MODULE_1__puzzle_puzzle__["a" /* default */](
      puzzleData.puzzle,
      this.solve.bind(this),
      PuzzleStructure.solvingTime,
      this.isFinal
    );
    this.add(this.puzzle);

    this.parseParts(puzzleData.parts);
  }

  getRandomLocation() {
    let index = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntInclusive(0, this.partsLocations.length - 1);
    return this.partsLocations.splice(index, 1)[0];
  }

  solvePart(part) {
    part.destroy();
    this.onSolvePart(
      part.view.x + part.view.options.width / 2,
      part.view.y + part.view.options.height / 2
    );
    this.solve();
  }

  solve() {
    this.puzzle.onSolved(() => {
      this.onSolvePuzzle();
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PuzzleStructure);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_basicImage__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animation_propertyAnimation__ = __webpack_require__(19);



class Renderable {
  constructor(x = 0, y = 0, options = {}) {
    this.animations = [];
    this.dragging = false;
    this.draggingOffset = { x: 0, y: 0 };
    this.onReadyCalled = false;

    if (!isNaN(x)) {
      this.setPosition(x, y);
      this.options = options;
    } else {
      if (typeof x == "string") {
        this.initImager(x);
      } else {
        this.options = x;
      }
    }

    if (!this.imager && this.options.imageName) {
      this.initImager(this.options.imageName);
    }
  }

  hide() {
    this.options.hidden = true;
  }

  show() {
    this.options.hidden = false;
  }

  initImager(imageName) {
    this.imager = new __WEBPACK_IMPORTED_MODULE_0__image_basicImage__["a" /* default */](imageName);
  }

  center(ctx) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    this.x = canvasWidth / 2 - this.options.width / 2;
    this.y = canvasHeight / 2 - this.options.height / 2;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }

  setProperty(propertyName, value) {
    this.options[propertyName] = value;
  }

  animatePropertyTo(propertyName, target, time, options) {
    if (propertyName == "size") {
      this.animatePropertyTo(
        "width",
        (this.options.width * target) / 100,
        time,
        options
      );
      this.animatePropertyTo(
        "height",
        (this.options.height * target) / 100,
        time
        //  options
      );
      return;
    }

    let currentValue =
      propertyName == "x" || propertyName == "y"
        ? this[propertyName]
        : this.options[propertyName];
    let delta = target - currentValue;

    this.animations.push(
      new __WEBPACK_IMPORTED_MODULE_1__animation_propertyAnimation__["a" /* default */](propertyName, currentValue, delta, time, options)
    );
  }

  animateProperty(propertyName, delta, time, options) {
    let currentValue =
      propertyName == "x" || propertyName == "y"
        ? this[propertyName]
        : this.options[propertyName];

    this.animations.push(
      new __WEBPACK_IMPORTED_MODULE_1__animation_propertyAnimation__["a" /* default */](propertyName, currentValue, delta, time, options)
    );
  }

  render(ctx) {
    let animationDoneBuffer;
    let originalX;
    let originalY;

    ctx.save();

    for (let i = 0; i < this.animations.length; i++) {
      animationDoneBuffer = this.animations[i].step(this);
      if (animationDoneBuffer) {
        this.animations.splice(i, 1);
      }
    }

    if (
      typeof this.options.opacity != "undefined" &&
      this.options.opacity < 1
    ) {
      ctx.globalAlpha = this.options.opacity;
    }

    originalX = this.x;
    originalY = this.y;

    if (
      typeof this.options.rotation != "undefined" &&
      this.options.rotation > 0
    ) {
      ctx.translate(this.x, this.y);
      ctx.translate(this.options.width / 2, this.options.height / 2);
      ctx.rotate((this.options.rotation * Math.PI) / 180);
      this.x = -this.options.width / 2;
      this.y = -this.options.height / 2;
    }

    if (this.imager) {
      this.renderImage(ctx);
    }

    this.x = originalX;
    this.y = originalY;
    ctx.restore();
  }

  renderImage(ctx) {
    if (!this.x && this.options.width) {
      this.center(ctx);
    }

    this.imager.getImage(imageObject => {
      this.drawImage(ctx, imageObject);
    });
  }

  drawImage(ctx, imageObject) {
    this.options.width = this.options.width || imageObject.image.naturalWidth;
    this.options.height =
      this.options.height || imageObject.image.naturalHeight;

    ctx.drawImage(
      imageObject.image,
      this.x,
      this.y,
      this.options.width,
      this.options.height
    );

    this.onReady();
  }

  onReady() {
    if (
      !this.onReadyCalled &&
      this.x &&
      this.options.width &&
      typeof this.options.onReady == "function"
    ) {
      this.onReadyCalled = true;
      this.options.onReady();
    }
  }

  onClick(e) {}

  onMove(e) {}

  onRelease(e) {}

  onLeave(e) {}

  hitTest(ctx, x, y) {
    let inside;

    if (typeof this.options.hitTest == "function") {
      inside = this.options.hitTest(ctx, x, y);
    } else {
      inside =
        this.x < x &&
        x < this.x + this.options.width &&
        this.y < y &&
        y < this.y + this.options.height;
    }

    return inside;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Renderable);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BasicImage {
  constructor(imageName) {
    this.imageName = imageName;
    this.image = null;
  }

  load(onLoaded) {
    this.image = new Image();
    this.image.src = puzzle.ASSETS_PATH + this.imageName;
    this.image.onload = onLoaded;
  }

  getImage(onLoaded) {
    if (this.image) {
      onLoaded({
        image: this.image
      });
    } else {
      this.load(() => {
        onLoaded({
          image: this.image
        });
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BasicImage);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framable__ = __webpack_require__(2);


class Clickable extends __WEBPACK_IMPORTED_MODULE_0__framable__["a" /* default */] {
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
    this.colorHitTest = true;
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

    if (typeof this.options.onClick == "function") {
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

    if (typeof this.options.onHover == "function") {
      this.options.onHover();
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

    if (typeof this.options.onLeave == "function") {
      this.options.onLeave();
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

  hitTest(ctx, x, y) {
    let inside;

    if (typeof this.options.hitTest == "function") {
      inside = this.options.hitTest(ctx, x, y);
    } else {
      inside =
        this.x < x &&
        x < this.x + this.options.width &&
        this.y < y &&
        y < this.y + this.options.height;
    }

    return inside;
  }

  // colorHitTest(ctx, x, y) {
  //   return this.colorMapBeforeRendering[x][y] != ctx.getImageData(x, y, 1, 1);
  // }
}

/* harmony default export */ __webpack_exports__["a"] = (Clickable);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mainController__ = __webpack_require__(10);


(scope => {
  scope.FRAME_RATE = 24;
  scope.ASSETS_PATH = "./assets/";

  let mainController = new __WEBPACK_IMPORTED_MODULE_0__mainController__["a" /* default */]();
  mainController.start();
})((window.puzzle = {}));


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_mainViewport_canvasView__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_play_part_part__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__canvas_renderable_renderable__ = __webpack_require__(6);







class MainController {
  constructor() {
    this.game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */](this.updateCount.bind(this));

    this.canvasView = null;
    this.$canvasWrapper = null;

    this.theme = new Audio("assets/theme.mp3");
    this.theme.loop = true;

    this.count = 0;

    //this.initCanvas();
  }

  initCanvas() {
    this.canvasView = new __WEBPACK_IMPORTED_MODULE_0__views_mainViewport_canvasView__["a" /* default */]();
    this.canvasView.initCanvasView();
    this.canvasView.hide();

    this.birthdate = new __WEBPACK_IMPORTED_MODULE_3__components_component__["a" /* default */]();
    this.birthdate.setView(
      new __WEBPACK_IMPORTED_MODULE_4__canvas_renderable_renderable__["a" /* default */]({ imageName: "2812.png", opacity: 0 })
    );

    this.ready = new __WEBPACK_IMPORTED_MODULE_3__components_component__["a" /* default */]();
    this.ready.setView(
      new __WEBPACK_IMPORTED_MODULE_4__canvas_renderable_renderable__["a" /* default */](600, -300, { imageName: "ready.png", opacity: 0 })
    );
  }

  start() {
    let $startBtn = $("#startBtn");

    $startBtn.click(() => {
      new Audio("assets/click.wav").play();
      $startBtn.remove();

      document.documentElement.requestFullscreen().then(() => {
        setTimeout(() => {
          this.initCanvas();
          this.theme.play();
          this.intro();
          // this.showCanvas();
          // this.game.start(this.theme);
        }, 1500);
      });
    });
  }

  intro() {
    let renderer = puzzle.getRenderer();

    this.birthdate.render();
    this.ready.render();
    this.ready.view.hide();

    renderer.scheduleTask(this.showBirthdate.bind(this, 500, 400), 2900);
    renderer.scheduleTask(this.hideCanvas.bind(this), 3100);
    renderer.scheduleTask(this.showBirthdate.bind(this, 700, 500), 3300);
    renderer.scheduleTask(this.hideCanvas.bind(this), 3500);
    renderer.scheduleTask(this.getReady.bind(this), 6000);
    renderer.scheduleTask(this.startGame.bind(this), 8000);
  }

  showCanvas() {
    this.canvasView.show();
  }

  hideCanvas() {
    this.canvasView.hide();
  }

  showBirthdate(x, y) {
    this.showCanvas();
    let width = this.birthdate.view.options.width;
    let height = this.birthdate.view.options.height;
    this.birthdate.view.setPosition(x, y);
    this.birthdate.view.animatePropertyTo("opacity", 1, 200, {
      onComplete: () => {
        this.birthdate.view.animatePropertyTo("opacity", 0, 200);
      }
    });
    this.birthdate.view.animatePropertyTo("size", 120, 200, {
      onComplete: () => {
        this.birthdate.view.setProperty("width", width);
        this.birthdate.view.setProperty("height", height);
      }
    });
  }

  getReady() {
    this.birthdate.destroy();
    this.ready.view.show();
    this.showCanvas();
    this.ready.view.animatePropertyTo("y", 400, 500);
    this.ready.view.animatePropertyTo("opacity", 1, 200);
    //this.ready.view.show();
    //this.ready.view.animateProperty("y", 800);
  }

  startGame() {
    this.ready.view.animatePropertyTo("opacity", 0, 300);
    this.ready.view.animatePropertyTo("y", 1200, 300, {
      onComplete: () => {
        this.game.start(this.theme);
      }
    });
  }

  updateCount() {
    // $("#count").html(this.count++ + "/10");
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MainController);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_renderer_renderer__ = __webpack_require__(12);


class CanvasView {
  constructor() {
    this.canvasWrapper = document.getElementById("canvas-wrapper");
    this.canvas = document.getElementsByTagName("canvas")[0];
    return this;
  }

  initCanvasView() {
    let ctx = this.canvas.getContext("2d");

    ctx.canvas.width = document.body.clientWidth;
    ctx.canvas.height = document.body.clientHeight;

    //FIND A BETTER WAY
    let rendererOptions = {
      dragOnTop: true,
      scheduler: true
    };

    let renderer = new __WEBPACK_IMPORTED_MODULE_0__canvas_renderer_renderer__["a" /* default */](this.canvas.getContext("2d"), rendererOptions);
    puzzle.getRenderer = () => {
      return renderer;
    };

    renderer.startRendering(puzzle.FRAME_RATE);

    $(this.canvasWrapper).addClass("active");

    return this;
  }

  hide() {
    $(this.canvasWrapper).hide();
  }

  show() {
    $(this.canvasWrapper).show();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CanvasView);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scheduler_scheduler__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_task__ = __webpack_require__(14);



class Renderer {
  constructor(ctx, options = {}) {
    this.intervalID = null;
    this.options = options;
    this.ctx = ctx;

    this.hitCtx = this.createHitCanvas();
    this.colorsHash = {};

    this.renderables = [];

    this.attacheEvents(this.ctx.canvas);
  }

  createHitCanvas() {
    let hitCanvas;
    let hitCtx;
    let canvasWrapper = $(this.ctx.canvas).parent();
    let canvasWrapperRect = canvasWrapper[0].getBoundingClientRect();

    canvasWrapper.append("<canvas id='hitCanvas'></canvas>");
    hitCanvas = $("canvas#hitCanvas")[0];
    hitCtx = hitCanvas.getContext("2d");

    hitCtx.canvas.width = canvasWrapperRect.width;
    hitCtx.canvas.height = canvasWrapperRect.height;

    $(hitCanvas).hide();
    //$(this.ctx.canvas).hide();
    return hitCtx;
  }

  getContext() {
    return this.ctx;
  }

  attacheEvents(canvas) {
    canvas.addEventListener("mousedown", e => {
      this.onMouseEvent("onClick", e);
    });
    canvas.addEventListener("mousemove", e => {
      this.onMouseEvent("onMove", e);
    });
    canvas.addEventListener("mouseup", e => {
      this.onMouseEvent("onRelease", e);
    });
  }

  onMouseEvent(eventName, data) {
    let renderableBuffer;
    let renderableColorKeyBuffer;
    let handled = false;
    for (let i = this.renderables.length - 1; 0 <= i; i--) {
      renderableBuffer = this.renderables[i].value;
      if (renderableBuffer.options.hidden) {
        continue;
      }

      renderableColorKeyBuffer = this.renderables[i].colorKey;
      if (
        !handled &&
        renderableBuffer.hitTest(this.ctx, data.offsetX, data.offsetY) &&
        this.colorHitTest(data.offsetX, data.offsetY, renderableColorKeyBuffer)
      ) {
        renderableBuffer[eventName](data);
        handled = true;
      } else if (renderableBuffer.hoverState || renderableBuffer.pressedState) {
        renderableBuffer.onLeave(data);
      }
    }
  }

  colorHitTest(x, y, colorKey) {
    let pixel = this.hitCtx.getImageData(x, y, 1, 1).data;
    let pixelColor = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    // console.warn(pixelColor);
    return colorKey == pixelColor;
  }

  startRendering(fps) {
    if (this.options.scheduler) {
      this.scheduler = new __WEBPACK_IMPORTED_MODULE_0__scheduler_scheduler__["a" /* default */]();
      this.scheduler.run();
    }
    window.requestAnimationFrame(this.render.bind(this));
  }

  stopRendering() {
    clearInterval(this.intervalID);
    return this;
  }

  scheduleTask(callback, time) {
    if (!this.scheduler) {
      console.error("You did not initatiate this rendere with a schaduler!");
      return;
    }

    let task = new __WEBPACK_IMPORTED_MODULE_1__scheduler_task__["a" /* default */](callback, this.scheduler.getTime() + time);
    this.scheduler.schedule(task);
  }

  add(renderable) {
    let z = renderable.options.z || 0;
    let colorKey = this.getUniqeRandomColor();
    let renderableObject = {
      value: renderable,
      z: z
    };

    if (renderable.colorHitTest) {
      renderableObject.colorKey = colorKey;
    }

    this.renderables.push(renderableObject);
    this.colorsHash[colorKey] = renderableObject;

    this.sort();
  }

  getUniqeRandomColor() {
    while (true) {
      const colorKey = this.getRandomColor();
      // if colours is unique
      if (!this.colorsHash[colorKey]) {
        return colorKey;
      }
    }
  }

  getRandomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }

  remove(renderable) {
    for (let i = 0; i < this.renderables.length; i++) {
      if (this.renderables[i].value == renderable) {
        this.renderables.splice(i, 1);
      }
    }
  }

  render() {
    //console.warn("------------------start-------------------");
    let renderableColorKeyBuffer;
    let renderableBuffer;
    let canvasDataBuffer;

    //Incase we remove something while rendering
    let renderablesCopy = $.extend(true, [], this.renderables);

    if (this.scheduler) {
      this.scheduler.tick();
    }

    this.sort();

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.hitCtx.clearRect(
      0,
      0,
      this.hitCtx.canvas.width,
      this.hitCtx.canvas.height
    );

    //console.warn(this.renderables.length);
    for (let i = 0; i < renderablesCopy.length; i++) {
      renderableBuffer = renderablesCopy[i].value;

      if (renderableBuffer.options.hidden) {
        continue;
      }

      renderableColorKeyBuffer = renderablesCopy[i].colorKey;
      renderableBuffer.render(this.ctx);

      if (
        renderableBuffer.colorHitTest &&
        renderableBuffer.options.width &&
        renderableBuffer.options.height
      ) {
        canvasDataBuffer = this.hitCtx.getImageData(
          renderableBuffer.x,
          renderableBuffer.y,
          renderableBuffer.options.width - 50,
          renderableBuffer.options.height - 50
        );

        this.hitCtx.clearRect(
          renderableBuffer.x,
          renderableBuffer.y,
          renderableBuffer.options.width - 50,
          renderableBuffer.options.height - 50
        );
        renderableBuffer.render(this.hitCtx);

        this.hitCtx.globalCompositeOperation = "source-atop";
        this.hitCtx.fillStyle = renderableColorKeyBuffer;
        this.hitCtx.fillRect(
          renderableBuffer.x,
          renderableBuffer.y,
          renderableBuffer.options.width - 50,
          renderableBuffer.options.height - 50
        );

        createImageBitmap(canvasDataBuffer).then(
          this.getRecreationOfColorKeyCallback(renderableBuffer).bind(this)
        );
      }
      this.hitCtx.globalCompositeOperation = "source-over";
    }

    //console.warn("------------------end-------------------");
    window.requestAnimationFrame(this.render.bind(this));
  }

  getRecreationOfColorKeyCallback(renderable) {
    return imgBitmap => {
      this.hitCtx.drawImage(
        imgBitmap,
        renderable.x,
        renderable.y,
        renderable.options.width - 50,
        renderable.options.height - 50
      );
    };
  }

  sort() {
    let az;
    let bz;

    this.renderables.sort((a, b) => {
      az = a.value.options.z || a.z;
      bz = b.value.options.z || b.z;

      if (this.options.dragOnTop) {
        if (a.value.dragging) {
          return 1;
        }

        if (b.value.dragging) {
          return -1;
        }
      }

      return az - bz;
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Renderer);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Scheduler {
  constructor() {
    this.startTS = null;
    this.tasks = [];
  }

  run() {
    this.startTS = Date.now();
  }

  tick() {
    let now = Date.now();
    let time = now - this.startTS;
    let toRemove = [];
    $.each(this.tasks, (i, task) => {
      if (task.time <= time) {
        task.execute();
        toRemove.push(i);
      }
    });

    $.each(toRemove, (i, index) => {
      this.tasks.splice(index, 1);
    });
  }

  schedule(task) {
    this.tasks.push(task);
  }

  getTime() {
    return Date.now() - this.startTS;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Scheduler);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Task {
  constructor(callback, time) {
    this.callback = callback;
    this.time = time;
  }

  execute(args) {
    this.callback(args);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Task);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_play_play__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_puzzleImage_puzzleImageLoader___ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nextButton__ = __webpack_require__(27);




class Game {
  constructor(onNewPlay) {
    this.play = null;
    this.next = new __WEBPACK_IMPORTED_MODULE_2__nextButton__["a" /* default */](() => {
      this.startPlaying();
    });
    this.onNewPlay = onNewPlay;
  }

  start(theme) {
    this.next.render();
    this.play = new __WEBPACK_IMPORTED_MODULE_0__components_play_play__["a" /* default */](this.showNext.bind(this), theme);
    this.startPlaying();
  }

  showNext() {
    this.next.putInPlace();
  }

  startPlaying() {
    let self = this;
    let finalPuzzle;
    __WEBPACK_IMPORTED_MODULE_1__components_puzzleImage_puzzleImageLoader___["a" /* default */].getRandomImage().then(puzzleData => {
      if (puzzleData) {
        self.play.starNewtPlay(puzzleData);
      } else {
        finalPuzzle = __WEBPACK_IMPORTED_MODULE_1__components_puzzleImage_puzzleImageLoader___["a" /* default */].getFinalPuzzle();
        self.play.starNewtPlay(finalPuzzle);
      }
    });
    this.onNewPlay();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__puzzleStructure_simplePuzzleStructure__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__puzzleStructure_multiPuzzleStructure__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__play_star_star__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__puzzleStructure_linearPuzzleStructure__ = __webpack_require__(25);






class Play {
  static get numberOfStars() {
    return 20;
  }

  static get starsLocationOffset() {
    return 200;
  }

  constructor(onPlayEnd, theme) {
    this.puzzleStrucrure = null;
    this.onPlayEnd = onPlayEnd;

    this.winSound = new Audio("assets/win.mp3");
    this.winSound.volume = 0.7;
    this.winSound.onplay = () => {
      //$(theme).animate({ volume: 0.5 }, 500);
      theme.volume = 0.7;
    };
    this.winSound.onended = () => {
      //$(theme).animate({ volume: 1 }, 500);
      theme.volume = 1;
    };
  }

  starNewtPlay(puzzleData) {
    let constructor;

    if (this.puzzleStrucrure) {
      this.puzzleStrucrure.destroy();
    }

    switch (puzzleData.type) {
      case "simple":
        constructor = __WEBPACK_IMPORTED_MODULE_0__puzzleStructure_simplePuzzleStructure__["a" /* default */];
        break;
      case "multi":
        constructor = __WEBPACK_IMPORTED_MODULE_1__puzzleStructure_multiPuzzleStructure__["a" /* default */];
        break;
      case "linear":
        constructor = __WEBPACK_IMPORTED_MODULE_4__puzzleStructure_linearPuzzleStructure__["a" /* default */];
    }

    this.puzzleStrucrure = new constructor(
      puzzleData,
      this.shootStars.bind(this),
      this.solveCompleted.bind(this)
    );
    this.puzzleStrucrure.render();
  }

  shootStars(x, y) {
    let location;
    for (let i = 0; i < Play.numberOfStars; i++) {
      location = this.getStarLocation(x, y);
      let star = new __WEBPACK_IMPORTED_MODULE_2__play_star_star__["a" /* default */](location.x, location.y);
      star.shoot(() => {
        //console.warn("star end");
        star.destroy();
      });
    }
    this.winSound.play();
  }

  getStarLocation(baseX, baseY) {
    return {
      x: __WEBPACK_IMPORTED_MODULE_3__common_utils__["a" /* default */].getRandomIntInclusive(
        baseX - Play.starsLocationOffset,
        baseX + Play.starsLocationOffset
      ),
      y: __WEBPACK_IMPORTED_MODULE_3__common_utils__["a" /* default */].getRandomIntInclusive(baseY - Play.starsLocationOffset, baseY)
    };
  }

  solveCompleted() {
    this.onPlayEnd();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Play);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(0);


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
    components = __WEBPACK_IMPORTED_MODULE_0__common_utils__["a" /* default */].toArray(components);

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

/* harmony default export */ __webpack_exports__["a"] = (Structure);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__canvas_renderable_framable__ = __webpack_require__(2);




class Puzzle extends __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */] {
  constructor(puzzleImage, onSolve, solvingTime, isFinal) {
    super();

    this.sound = new Audio("assets/yipee.wav");

    this.masks = [];

    this.isFinal = isFinal;

    this.onSolve = onSolve;
    this.solvingTime = solvingTime;
    this.puzzleImage = puzzleImage;

    // this.target = properties.target;
    this.setView(
      new __WEBPACK_IMPORTED_MODULE_2__canvas_renderable_framable__["a" /* default */]({
        imageName: this.puzzleImage,
        opacity: 1,
        spritesheet: {
          rowSize: 3
        }
      })
    );
  }

  isOnPuzzle(x, y) {
    //TODO
    return true;
  }

  onSolved(onComplete) {
    this.sound.play();

    if (this.isFinal) {
      this.view.easeFrame(1, this.solvingTime);
    } else {
      this.view.easeFrame(1, this.solvingTime, () => {
        this.destroyMasks();
        this.view.easeFrame(2, this.solvingTime, onComplete);
      });
    }
  }

  getOffset() {
    return { x: this.view.x, y: this.view.y };
  }

  maskTarget(targetX, targetY, width, height) {
    let mask = new __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */]();
    mask.setView(
      new __WEBPACK_IMPORTED_MODULE_2__canvas_renderable_framable__["a" /* default */](targetX, targetY, {
        imageName: this.puzzleImage,
        spritesheet: {
          rowSize: 3
        },
        opacity: 0.5,
        width: width,
        height: height,
        mask: {
          x: targetX - this.view.x,
          y: targetY - this.view.y
        },
        onReady: () => {
          mask.view.animatePropertyTo("opacity", 1, 500);
        }
      })
    );
    mask.view.setFrame(1);
    //console.warn("render mask");
    mask.render();
    this.masks.push(mask);
  }

  destroyMasks() {
    $.each(this.masks, (i, mask) => {
      mask.destroy();
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Puzzle);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PropertyAnimation {
  constructor(propertyName, startValue, totalDelta, totalTime, options = {}) {
    this.propertyName = propertyName;
    this.startValue = startValue;
    this.totalDelta = totalDelta;
    this.totalTime = totalTime;
    this.options = options;
    this.startTime = Date.now();
    this.done = false;
  }

  step(renderable) {
    if (this.done) {
      return true;
    }

    let property = this.propertyName;
    let currentTime = Date.now();
    let normalizedTimePortion = (currentTime - this.startTime) / this.totalTime;

    let currentDelta = normalizedTimePortion * this.totalDelta;
    let newValue;

    if (normalizedTimePortion >= 1) {
      newValue = this.getNewValue(this.totalDelta);
      property == "x" || property == "y"
        ? (renderable[property] = newValue)
        : (renderable.options[property] = newValue);
      this.done = true;
      if (typeof this.options.onComplete == "function") {
        this.options.onComplete();
      }
      return true;
    } else {
      let newValue = this.getNewValue(currentDelta);
      property == "x" || property == "y"
        ? (renderable[property] = newValue)
        : (renderable.options[property] = newValue);
    }

    return false;
  }

  getNewValue(currentDelta) {
    if (typeof this.options.customFunction == "function") {
      return this.options.customFunction(this.startValue, currentDelta);
    } else {
      return this.startValue + currentDelta;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PropertyAnimation);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basicImage__ = __webpack_require__(7);


class Spritesheet extends __WEBPACK_IMPORTED_MODULE_0__basicImage__["a" /* default */] {
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
    this.options.rowSize
      ? this.setWidthAndHeight()
      : this.setRowSizeAndColumnSize();
  }

  setWidthAndHeight() {
    this.options.columnSize = this.options.columnSize || 1;
    this.options.sWidth = Math.floor(
      this.image.naturalWidth / this.options.rowSize
    );
    this.options.sHeight = Math.floor(
      this.image.naturalHeight / this.options.columnSize
    );
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

/* harmony default export */ __webpack_exports__["a"] = (Spritesheet);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Animation {
  constructor(spritesheet, targetFrame, totalTime, options = {}) {
    this.spritesheet = spritesheet;
    this.targetFrame = targetFrame;
    this.startFrame = this.spritesheet.getFrame();
    this.options = options;

    this.totalDelta = targetFrame - this.startFrame;
    this.totalTime = totalTime;
    this.startTime = Date.now();
    this.done = false;
  }

  step() {
    if (this.done) {
      return;
    }

    let currentTime = Date.now();
    let normalizedTimePortion = (currentTime - this.startTime) / this.totalTime;
    let currentDelta = Math.floor(normalizedTimePortion * this.totalDelta);
    let currentFrame = this.startFrame + currentDelta;

    if (normalizedTimePortion >= 1 || currentFrame >= this.targetFrame) {
      // if (this.properties.loop) {
      //   this.currentFrame = this.properties.from;
      // } else {
      //   this.done = true;
      //   if (typeof this.properties.onDone == "function") {
      //     this.properties.onDone();
      //   }
      //   return;
      // }
      this.spritesheet.setFrame(this.targetFrame);
      this.done = true;
      if (typeof this.options.onComplete == "function") {
        this.options.onComplete();
      }
      return;
    } else {
      this.spritesheet.setFrame(currentFrame);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Animation);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clickable__ = __webpack_require__(8);


class Draggable extends __WEBPACK_IMPORTED_MODULE_0__clickable__["a" /* default */] {
  constructor(x, y, options = {}) {
    super(x, y, options);
    this.dragging = false;
  }

  //A VERY BAD TO DO IT!!!
  onHover() {
    $("canvas").css("cursor", "grab");
    super.onHover();
  }

  onClick(e) {
    this.dragging = true;
    this.draggingOffset.x = e.offsetX - this.x;
    this.draggingOffset.y = e.offsetY - this.y;
    $("canvas").css("cursor", "grabbing");
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
    $("canvas").css("cursor", "grab");
    this.dragging = false;
    if (this.options.onDrop) {
      this.options.onDrop(this.x, this.y);
    }
    super.onRelease(e);
  }

  hitTest(ctx, x, y) {
    return this.dragging || super.hitTest(ctx, x, y);
  }

  onLeave(e) {
    if (this.dragging) {
      this.onMove(e);
    } else {
      $("canvas").css("cursor", "auto");
      super.onLeave();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Draggable);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__puzzleStructure__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__part_part__ = __webpack_require__(3);



class MultiPuzzleStructure extends __WEBPACK_IMPORTED_MODULE_0__puzzleStructure__["a" /* default */] {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
    this.doneCount = 0;
    this.parts = [];
    this.parsePuzzleImage(puzzleData);
  }

  parseParts(partsData) {
    let locationBuffer;
    let partBuffer;
    $.each(partsData, (i, part) => {
      locationBuffer = this.getRandomLocation();
      partBuffer = new __WEBPACK_IMPORTED_MODULE_1__part_part__["a" /* default */](
        locationBuffer.x,
        locationBuffer.y,
        part,
        this.solvePart.bind(this)
      );
      this.add(partBuffer);
      this.parts.push(partBuffer);
      partBuffer.putInPlace();
    });
  }

  solvePart(part) {
    this.puzzle.maskTarget(
      part.partData.target.x,
      part.partData.target.y,
      part.view.options.width - 50,
      part.view.options.height - 50
    );
    super.solvePart(part);
  }

  solve() {
    this.doneCount++;
    if (this.parts.length == this.doneCount) {
      super.solve();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MultiPuzzleStructure);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas_renderable_framable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils__ = __webpack_require__(0);




class Star extends __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */] {
  static get animationTime() {
    return 2000;
  }

  static get travalDistance() {
    return 1000;
  }

  constructor(x, y) {
    super();
    this.setView(
      new __WEBPACK_IMPORTED_MODULE_1__canvas_renderable_framable__["a" /* default */](x, y, {
        imageName: "star.png",
        width: 128,
        height: 128,
        opacity: 1,
        rotation: 0
      })
    );

    this.customFunction = this.createCustomFunction();
    this.direction = this.getDirection();
    this.sizePrecent = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntInclusive(100, 300);
    this.rotation = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntInclusive(0, 360 * 5);
  }

  shoot(onComplete) {
    this.render();

    this.view.animateProperty(
      "x",
      this.direction * Star.travalDistance,
      Star.animationTime
    );

    this.view.animateProperty("y", Star.travalDistance, Star.animationTime, {
      customFunction: this.customFunction
    });

    this.view.animatePropertyTo("size", this.sizePrecent, Star.animationTime);

    this.view.animatePropertyTo("rotation", this.rotation, Star.animationTime);

    this.view.animatePropertyTo("opacity", 1, Star.animationTime / 2, {
      onComplete: () => {
        this.view.animatePropertyTo("opacity", 0, Star.animationTime / 2, {
          onComplete: onComplete
        });
      }
    });

    this.view.animateToFrame(23, Star.animationTime);
  }

  getDirection() {
    let indicator = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomIntInclusive(0, 1);
    return indicator == 0 ? -1 : 1;
  }

  createCustomFunction() {
    let a = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomFloat(2.5, 5.5);
    let b = __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getRandomFloat(0.008, 0.014);
    return (y0, x) => {
      return y0 + -a * x + b * x * x;
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Star);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__simplePuzzleStructure__ = __webpack_require__(4);


class LinearPuzzleStructure extends __WEBPACK_IMPORTED_MODULE_0__simplePuzzleStructure__["a" /* default */] {
  constructor(puzzleData, onSolvePart, onSolvePuzzle) {
    super(puzzleData, onSolvePart, onSolvePuzzle);
  }

  //Written very badlly
  parseParts(partsData) {
    if (!this.partsCollection && partsData) {
      this.partsCollection = partsData;
    }
    super.parseParts(this.partsCollection.shift());
  }

  solvePart(part) {
    this.puzzle.maskTarget(
      part.partData.target.x,
      part.partData.target.y,
      part.view.options.width - 50,
      part.view.options.height - 50
    );
    super.solvePart(part);
  }

  solve() {
    this.doneCount++;
    if (this.partsCollection.length > 0) {
      this.resetPartsLocations();
      this.parseParts();
    } else {
      super.solve();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LinearPuzzleStructure);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(0);


class PuzzleImageLoader {
  constructor() {
    this.puzzleImages = null;
    this.final = null;
  }

  getRandomImage() {
    let image;
    let $deffered = $.Deferred();

    if (this.puzzleImages) {
      image = this.puzzleImages.length > 0 ? this.pickRandom() : undefined;
      $deffered.resolve(image);
    } else {
      $.getJSON("assets/data.json", data => {
        this.puzzleImages = data.puzzles;
        this.final = data.final;
        this.final.final = true;
        $deffered.resolve(data.first);
      });
    }

    return $deffered.promise();
  }

  getFinalPuzzle() {
    return this.final;
  }

  pickRandom() {
    let index = __WEBPACK_IMPORTED_MODULE_0__common_utils__["a" /* default */].getRandomIntInclusive(0, this.puzzleImages.length - 1);
    let image = this.puzzleImages[index];
    this.removeSelected(index);
    return image;
  }

  removeSelected(index) {
    this.puzzleImages.splice(index, 1);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new PuzzleImageLoader());


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_renderable_clickable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_component__ = __webpack_require__(1);



class NextButton extends __WEBPACK_IMPORTED_MODULE_1__components_component__["a" /* default */] {
  constructor(onClick) {
    super();

    this.sound = new Audio("assets/click.wav");

    this.onClick = onClick;

    this.setView(
      new __WEBPACK_IMPORTED_MODULE_0__canvas_renderable_clickable__["a" /* default */](1600, 1400, {
        imageName: "next.png",
        opacity: 0,
        spritesheet: {
          rowSize: 3
        },
        onClick: this.click.bind(this),
        //BADDDDD!!!!!
        onHover: () => {
          $("canvas").css("cursor", "pointer");
        },
        onLeave: () => {
          $("canvas").css("cursor", "auto");
        }
      })
    );
  }

  putInPlace() {
    this.view.animatePropertyTo("opacity", 1, 800);
    this.view.animatePropertyTo("y", 400, 500);
  }

  click() {
    this.sound.play();
    this.reset();
    this.onClick();
  }

  reset() {
    this.view.animatePropertyTo("opacity", 0, 500, {
      onComplete: () => {
        this.view.setPosition(this.view.x, 1400);
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NextButton);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map