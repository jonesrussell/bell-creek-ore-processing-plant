/**
 * position-scale.js
 */
window.onresize = function () {
  window.mill.positionAndScale();
  window.mill.resize();
};

SVGjsAnim.prototype.positionAndScale = function () {
  this.transform = {
    x: 0,
    y: 0,
    scale: 0,
    width: 0,
    height: 0,
    defaultX: 0,
    defaultY: 0,
    defaultScale: 0,
    defaultWidth: 0,
    defaultHeight: 0,
  };

  // Browser
  this.windowW = this.getWindowWidth();
  this.windowH = this.getWindowHeight();
  this.aspectRatio = this.calcAspectRatio(this.windowW, this.windowH);

  // Scene
  this.origSceneW = 3676;
  this.origSceneH = 1256;
  this.transform.width = this.windowW;
  this.transform.defaultWidth = this.windowW;
  this.transform.height = this.windowH;
  this.transform.defaultHeight = this.windowH;
  const sceneResizePercent = this.calcResizePercent(
    this.origSceneW,
    this.transform.width
  );
  this.transform.scale = 1 - sceneResizePercent;

  const svgHeight = this.origSceneH * this.transform.scale;
  const remainingHeight = this.transform.height - svgHeight;
  this.transform.y = remainingHeight / 3 * 1.5;
  this.transform.defaultY = remainingHeight / 3 * 1.5;
  this.groundStart = this.transform.y + svgHeight - 1;
};

SVGjsAnim.prototype.x = function (x) {
  x = x || false;
  if (x) {
    this.transform.x = x;
  }
  return this.transform.x;
};

SVGjsAnim.prototype.y = function (y) {
  y = y || false;
  if (y) {
    this.transform.y = y;
  }
  return this.transform.y;
};

/**
 * resetCamera
 *
 * WTF fix this
 */
SVGjsAnim.prototype.resetCamera = function () {
  const scale = this.transform.scale;
  const x = -120 * scale;
  let newScale = scale * 0.08;
  newScale = scale + newScale;
  this.scene
    .animate(1250)
    .scale(newScale)
    .move(x, this.transform.y);
};

SVGjsAnim.prototype.resize = function () {
  this.draw.size(this.transform.width, this.transform.height);
  this.scene
    .move(this.transform.x, this.transform.y)
    .size(this.transform.width, this.transform.height)
    .scale(this.transform.scale);
};

/***********
 * Helpers *
 ***********/
SVGjsAnim.prototype.getWindowHeight = function () {
  let viewportHeight = null;

  if (document.compatMode === "BackCompat") {
    viewportHeight = document.body.clientHeight;
  } else {
    viewportHeight = document.documentElement.clientHeight;
  }
  return viewportHeight;
};

SVGjsAnim.prototype.getWindowWidth = function () {
  var viewportWidth;
  if (document.compatMode === "BackCompat") {
    viewportWidth = document.body.clientWidth;
  } else {
    viewportWidth = document.documentElement.clientWidth;
  }
  return viewportWidth;
};

SVGjsAnim.prototype.calcScale = function (n) {
  if (n === this.transform.scale) {
    return n;
  }
  return n * this.transform.scale;
};

SVGjsAnim.prototype.calcAspectRatio = function (w, h) {
  var ratio = w / h;
  return Math.abs(ratio - 4 / 3) < Math.abs(ratio - 16 / 9) ? "4:3" : "16:9";
};

SVGjsAnim.prototype.isAspectRatio = function (n) {
  return this.aspectRatio === n;
};

SVGjsAnim.prototype.calcResizePercent = function (n, n2) {
  return (n - n2) / n;
};
