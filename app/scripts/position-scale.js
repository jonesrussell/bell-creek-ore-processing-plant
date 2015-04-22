'use strict';
/*global SVGjsAnim, mill */

window.onresize = function() {
    mill.positionAndScale();
    mill.resize();
};

SVGjsAnim.prototype.positionAndScale = function()
{
    // @TODO This is unnecessary, use the SVG viewbox properly
    // ^ can't remember what this means
    this.windowW = this.getWindowWidth();
    this.windowH = this.getWindowHeight();
    this.aspectRatio = this.calcAspectRatio(this.windowW, this.windowH);
    this.origSceneW = 3676;
    this.origSceneH = 1256;
    this.sceneW = this.windowW;
    this.sceneResizePercent = this.calcResizePercent(this.origSceneW, this.sceneW);
    this.sceneScale = 1 - this.sceneResizePercent;
    this.sceneH = this.windowH;
    this.svgHeight = this.origSceneH * this.sceneScale;
    this.remainingHeight = this.sceneH - this.svgHeight;
    this.skyHeight = (this.remainingHeight / 3) * 1.5;
    this.groundStart = this.skyHeight + this.svgHeight - 1;

    console.log('Aspect Ratio: ' + this.aspectRatio);
    console.log('Resolution: ' + this.windowW + 'x' + this.windowH);
    console.log('sceneH: ' + this.sceneH);
    console.log('skyHeight: ' + this.skyHeight);
    console.log('svgHeight: ' + this.svgHeight);
};

SVGjsAnim.prototype.resize = function() {
  this.draw
    .size(this.sceneW, this.sceneH);
  this.scene
    .move(0, this.skyHeight)
    .size(this.sceneW, this.sceneH)
    .scale(this.sceneScale);
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
    if (n === this.sceneScale) { return n; }
    return n * this.sceneScale;
};

SVGjsAnim.prototype.scaleX = function(x)
{
    return x * this.sceneScale;
};

SVGjsAnim.prototype.scaleY = function(y)
{
    return this.scaleX(y);
};

SVGjsAnim.prototype.calcAspectRatio = function(w, h) {
    var ratio = w / h;
    return (Math.abs(ratio - 4 / 3) < Math.abs(ratio - 16 / 9)) ? '4:3' : '16:9';
};

SVGjsAnim.prototype.calcResizePercent = function(n, n2) {
    return (n - n2) / n;
};

