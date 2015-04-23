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
    , scale: 0
    , width: 0
    , height: 0
    , defaultX: 0
    , defaultY: 0
    , defaultScale: 0
    , defaultWidth: 0
    , defaultHeight: 0
  };

  // Browser
  this.windowW = this.getWindowWidth();
  this.windowH = this.getWindowHeight();
  this.aspectRatio = this.calcAspectRatio(this.windowW, this.windowH);

  // Scene
  this.origSceneW = 3676;
  this.origSceneH = 1256;
  this.transform.width = this.transform.defaultWidth = this.windowW;
  this.transform.height = this.transform.defaultHeight = this.windowH;
  var sceneResizePercent = this.calcResizePercent(this.origSceneW, this.transform.width);
  this.transform.scale = 1 - sceneResizePercent;

  var svgHeight = this.origSceneH * this.transform.scale;
  var remainingHeight = this.transform.height - svgHeight;
  this.transform.y = this.transform.defaultY = (remainingHeight / 3) * 1.5;
  this.groundStart = this.transform.y + svgHeight - 1;

  console.log('Aspect Ratio: ' + this.aspectRatio);
  console.log('Resolution: ' + this.windowW + 'x' + this.windowH);
  console.log('scene h: ' + this.transform.height);
  console.log('scene y: ' + this.transform.y);
  console.log('svgHeight: ' + svgHeight);
  console.log(this.x() + ':' + this.y());
};

SVGjsAnim.prototype.x = function(x) {
  x = x || false;
  if (x) { this.transform.x = x; }
  else { return this.transform.x; }
};

SVGjsAnim.prototype.y = function(y) {
  y = y || false;
  if (y) { this.transform.y = y; }
  else { return this.transform.y; }
};

SVGjsAnim.prototype.resetCamera = function() {
  var x = -120 * this.transform.scale;
  this.scene
    .animate(1250)
    .scale(this.transform.scale + (this.transform.scale * 0.08))
    //.move(x, this.transform.defaultY);
    .move(x, this.transform.y);
};

SVGjsAnim.prototype.resize = function() {
  this.draw
    .size(this.transform.width, this.transform.height);
  this.scene
    .move(this.transform.x, this.transform.y)
    .size(this.transform.width, this.transform.height)
    .scale(this.transform.scale);
};

/***********
 * Helpers *
 ***********/
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

SVGjsAnim.prototype.isAspectRatio = function(n) {
  return (this.aspectRatio === n) ? true : false;
};

SVGjsAnim.prototype.calcResizePercent = function(n, n2) {
  return (n - n2) / n;
};

