'use strict';
/*global SVGjsAnim, mill */

window.onresize = function() {
  mill.positionAndScale();
  mill.resize();
};

SVGjsAnim.prototype.positionAndScale = function()
{
  this.transform = {
    x: 0
    , y: 0
    , scale: 1
  };

  // @TODO This is unnecessary, use the SVG viewbox properly
  // ^ can't remember what this means
  this.windowW = this.getWindowWidth();
  this.windowH = this.getWindowHeight();
  this.aspectRatio = this.calcAspectRatio(this.windowW, this.windowH);
  this.origSceneW = 3676;
  this.origSceneH = 1256;
  this.sceneW = this.windowW;
  this.sceneResizePercent = this.calcResizePercent(this.origSceneW, this.sceneW);
  this.transform.scale = 1 - this.sceneResizePercent;
  this.sceneH = this.windowH;
  this.svgHeight = this.origSceneH * this.transform.scale;
  this.remainingHeight = this.sceneH - this.svgHeight;
  this.skyHeight = (this.remainingHeight / 3) * 1.5;
  this.groundStart = this.skyHeight + this.svgHeight - 1;

  console.log('Aspect Ratio: ' + this.aspectRatio);
  console.log('Resolution: ' + this.windowW + 'x' + this.windowH);
  console.log('sceneH: ' + this.sceneH);
  console.log('skyHeight: ' + this.skyHeight);
  console.log('svgHeight: ' + this.svgHeight);
};

SVGjsAnim.prototype.x = function(x) {
  x = x || 0;
  if (x) this.transform.x = x;
  else return this.transform.x;
};

SVGjsAnim.prototype.y = function(y) {
  y = y || 0;
  if (y) this.transform.y = y;
  else return this.transform.y;
};

SVGjsAnim.prototype.resetCamera = function() {
  var x = -120 * this.transform.scale;
  this.scene
  .animate(1250)
  .scale(this.transform.scale + (this.transform.scale * 0.08))
  .move(x, this.defaultY);
};

SVGjsAnim.prototype.scaled = function(n, scale) {
  return (scale < 1) ? n + (n * this.sceneResizePercent) : n - (n * this.sceneResizePercent);
};

SVGjsAnim.prototype.unscaled = function(n) {
  return n * (1+this.sceneResizePercent);
};

SVGjsAnim.prototype.resize = function() {
  this.draw
  .size(this.sceneW, this.sceneH);
  this.scene
  .move(0, this.skyHeight)
  .size(this.sceneW, this.sceneH)
  .scale(this.transform.scale);
};

SVGjsAnim.prototype.getWindowHeight = function() {
  var viewportHeight;
  if (document.compatMode === 'BackCompat') {
    viewportHeight = document.body.clientHeight;
  } else {
    viewportHeight = document.documentElement.clientHeight;
  }
  return viewportHeight;
};

SVGjsAnim.prototype.getWindowWidth = function() {
  var viewportWidth;
  if (document.compatMode === 'BackCompat') {
    viewportWidth = document.body.clientWidth;
  } else {
    viewportWidth = document.documentElement.clientWidth;
  }
  return viewportWidth;
};

SVGjsAnim.prototype.calcScale = function(n)
{
  if (n === this.transform.scale) { return n; }
  return n * this.transform.scale;
};

SVGjsAnim.prototype.calcAspectRatio = function(w, h) {
  var ratio = w / h;
  return (Math.abs(ratio - 4 / 3) < Math.abs(ratio - 16 / 9)) ? '4:3' : '16:9';
};

SVGjsAnim.prototype.calcResizePercent = function(n, n2) {
  return (n - n2) / n;
};

