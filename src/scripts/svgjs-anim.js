"use strict";
/*global SVG, mill */

/*
    Features:
        - image preloading
        - stepping
        - zoom
        - animation paths
*/
function SVGjsAnim(id) {
  this.draw = SVG(id).fixSubPixelOffset();

  this.scene = this.draw.group().attr({ id: "scene" });

  this.positionAndScale();
  this.resize();

  this.zooms = this.draw.set();
}

SVGjsAnim.prototype.layers = {};
SVGjsAnim.prototype.activeVideo = "";
SVGjsAnim.prototype.zoomed = false;
SVGjsAnim.prototype.stepObjs = [];
SVGjsAnim.prototype.bullets = {};
SVGjsAnim.prototype.headings = {};
SVGjsAnim.prototype.animations = [];
SVGjsAnim.prototype.steps = [];
SVGjsAnim.prototype.stepCurrent = "overview";

SVGjsAnim.prototype.init = function () {
  var svgjsAnim = mill;
  if (svgjsAnim.preloadedImages) {
    var loadingImage = document.getElementById("anim-loading");
    loadingImage.parentNode.removeChild(loadingImage);
    svgjsAnim.build();
    svgjsAnim.start();
  } else {
    setTimeout(svgjsAnim.init, 100);
  }
};

SVGjsAnim.prototype.build = function () {
  this.transform.defaultX = this.scene.x();
  this.transform.defaultY = this.scene.y();
  this.resetCamera();
  this.setupLayers();

  // Ore Circuit
  var grindingSlurry = this.draw.grindingSlurry("grinding-slurry").go();
  var circuitOre = this.draw
    .image("images/circuit-ore-equipment.svg")
    .size(this.origSceneW, this.origSceneH);
  var conveyors = this.setupConveyors();
  var receiving = this.setupReceiving();
  var crushing = this.setupCrushing();
  var storage = this.setupStorage();
  var grinding = this.setupGrinding();
  var oreToCrusher = this.setupOreToCrusher();
  var oreToStorage = this.setupOreToStorageDome();
  var oreToGrinding = this.setupOreToSAGMill();

  // left
  var tree = this.draw.tree(700, 385, 0.7);
  var t0001 = this.draw.tree(95, 320, 0.95);
  var t0002 = this.draw.tree(200, 600, 1);
  var t0003 = this.draw.tree(400, 390, 1.5);

  // middle
  var t0004 = this.draw.tree(1000, 400, 1.5);

  // right
  /*
    var t0004 = tree.clone().move(2493, 500).scale(0.78);
    var t0005 = tree.clone().move(1830, 540).scale(0.8);
    var t0006 = tree.clone().move(2030, 500);
    var t0007 = tree.clone().move(3030, 420).scale(0.7);
    var t0008 = tree.clone().move(3080, 460);
    var t0009 = tree.clone().move(3130, 490).scale(0.8);
    var t0010 = tree.clone().move(3270, 800).scale(1.3);
    var t0011 = tree.clone().move(1400, 530).scale(0.9);
    var t0012 = tree.clone().move(1530, 650).scale(0.95);
    var t0013 = tree.clone().move(3530, 650).scale(1.2);
    var t0014 = tree.clone().move(3530, 650).scale(1.2);
    var t0015 = tree.clone().move(3530, 650).scale(1.3);
    var t0016 = tree.clone().move(3530, 650).scale(1.3);
    var t0017 = tree.clone().move(3530, 650).scale(1.5);
    var t0018 = tree.clone().move(3530, 650).scale(1.5);*/
  var trees = this.draw.group().add(tree).add(t0002).add(t0003).add(t0004);
  /*
        .add(t0004)
        .add(t0005)
        .addToInner(t0006)
        .addToInner(t0007)
        .addToInner(t0008)
        .addToInner(t0009)
        .addToInner(t0010)
        .addToInner(t0011)
        .addToInner(t0012)
        .addToInner(t0013)
        .add(t0014)
        .add(t0015)
        .add(t0016)
        .add(t0017)
        .add(t0018)*/

  this.layers.circuitOre
    .addToInner(grindingSlurry)
    .addToInner(circuitOre)
    .addToInner(trees)
    .addToInner(conveyors)
    .addToInner(receiving)
    .addToInner(t0001)
    .addToInner(crushing)
    .addToInner(storage)
    .addToInner(grinding)
    .addToInner(oreToCrusher)
    .addToInner(oreToStorage)
    .addToInner(oreToGrinding);

  // Slurry Circuit
  var slurry = this.draw.slurry("slurrry").go();
  var circuitSlurry = this.draw
    .image("images/circuit-slurry-equipment.svg")
    .size(this.origSceneW, this.origSceneH);
  var refining = this.setupRefining();
  var electrowinning = this.setupElectrowinning();
  var extraction = this.setupExtraction();

  /*    var t1000 = tree.clone().move(150, 410).scale(2);
    var t1001 = tree.clone().move(650, 910).scale(2.5);
    var t1002 = tree.clone().move(3550, 1083).scale(2.3);
    var t1003 = tree.clone().move(3570, 950).scale(2.3);*/

  this.layers.circuitSlurry
    .addToInner(slurry)
    .addToInner(circuitSlurry)
    //        .addToInner(t1000)
    //        .addToInner(t1001)
    //        .addToInner(t1002)
    //        .addToInner(t1003)
    .addToInner(refining)
    .addToInner(electrowinning)
    .addToInner(extraction);
};

SVGjsAnim.prototype.setupLayers = function () {
  var w = this.origSceneW;
  var h = this.origSceneH;

  var cloudsBack = this.draw
    .image("images/clouds.svg", w, h)
    .transform({ scaleX: -1 });
  var treescape = this.draw.image("images/treescape.svg", w, h);
  var cloudsOnce = this.draw.image("images/clouds.svg", w, h);
  var clouds = this.draw.image("images/clouds.svg", w, h);
  var circuitOre = this.draw.image("images/circuit-ore.svg", w, h);
  var circuitSlurry = this.draw.image("images/circuit-slurry.svg", w, h);

  this.layers.cloudsBack = this.draw
    .layer({ "clouds-back": cloudsBack }, w, h)
    .move(-w, 0);
  this.layers.cloudsBackClone = this.draw
    .layer({ "clouds-back-clone": cloudsBack.clone() }, w, h)
    .move(-w * 2, 0);
  this.layers.treescape = this.draw.layer({ treescape: treescape }, w, h);
  this.layers.cloudsOnce = this.draw.layer({ "clouds-once": cloudsOnce }, w, h);
  this.layers.clouds = this.draw.layer({ clouds: clouds }, w, h).move(-w, 0);
  this.layers.cloudsClone = this.draw
    .layer({ "clouds-clone": clouds.clone() }, w, h)
    .move(-w * 2, 0);

  // Circuit Ore
  this.layers.circuitOre = this.draw.layer({ "circuit-ore": circuitOre }, w, h);

  // Circuit Slurry
  var groundExtension = this.draw
    .group()
    .move(0, 1060)
    .add(
      this.draw.rect(this.origSceneW, 4000).attr({
        fill: "#4e6a47",
        id: "ground",
      })
    );

  this.layers.circuitSlurry = this.draw
    .layer(
      {
        "circuit-slurry-ground": groundExtension,
        "circuit-slurry": circuitSlurry,
      },
      w,
      h + 4000
    )
    .move(0, 585)
    .moveInner(0, -485);

  this.scene
    .add(this.layers.cloudsBack)
    .add(this.layers.cloudsBackClone)
    .add(this.layers.treescape)
    .add(this.layers.cloudsOnce)
    .add(this.layers.clouds)
    .add(this.layers.cloudsClone)
    .add(this.layers.circuitOre)
    .add(this.layers.circuitSlurry);

  //    var d = 350000;
  //    var d2 = 550000;
  //    this.layers.cloudsBack.animate(d, '-', 0).move(w, 0).loop();
  //    this.layers.cloudsBackClone.animate(d*2, '-', 0).move(w, 0).loop();
  //    this.layers.clouds.animate(d2, '-', 0).move(w, 0).loop();
  //    this.layers.cloudsClone.animate(d2*2, '-', 0).move(w, 0).loop();

  //    this.layers.cloudsOnce.animate(d, '-', 0)
  //        .move(w, 0)
  //        .after(function(){ this.remove(); });

  return this;
};

SVGjsAnim.prototype.start = function () {
  this.showBullets();
  this.conveyorGo();
  this.cycloneGo();
  this.dumpTruck.go();
  this.rockBreaker.go();
  this.jawCrusher.go();

  // Ore
  for (var i = 0; i < this.animations.length; i++) {
    this.animations[i].animate();
  }
};

SVGjsAnim.prototype.scale = function (n) {
  n = n || false;
  return n ? this.scene.scale(n) : this.scene.attr("scale");
};

SVGjsAnim.prototype.move = function (x, y) {
  this.scene.move(x, y);
};

SVGjsAnim.prototype.x = function (x) {
  this.scene.x(x);
};

SVGjsAnim.prototype.y = function (y) {
  this.scene.y(y);
};
