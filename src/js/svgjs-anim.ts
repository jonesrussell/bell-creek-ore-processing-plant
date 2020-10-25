/* eslint-disable no-console */
/**
 * svgjs-anim.js
 */
function SVGjsAnim(id) {
  this.draw = SVG(id).fixSubPixelOffset();

  this.scene = this.draw.group().attr({ id: 'scene' });

  this.positionAndScale();
  this.resize();

  this.zooms = this.draw.set();
}

SVGjsAnim.prototype.layers = {};
SVGjsAnim.prototype.activeVideo = '';
SVGjsAnim.prototype.zoomed = false;
SVGjsAnim.prototype.stepObjs = [];
SVGjsAnim.prototype.bullets = {};
SVGjsAnim.prototype.headings = {};
SVGjsAnim.prototype.animations = [];
SVGjsAnim.prototype.steps = [];
SVGjsAnim.prototype.stepCurrent = 'overview';

SVGjsAnim.prototype.init = function () {
  console.log('init()');
  const svgjsAnim = window.mill;
  if (svgjsAnim.preloadedImages) {
    const loadingImage = document.getElementById('anim-loading');
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
  const grindingSlurry = this.draw.grindingSlurry('grinding-slurry').go();
  const circuitOre = this.draw
    .image('images/circuit-ore-equipment.svg')
    .size(this.origSceneW, this.origSceneH);
  const conveyors = this.setupConveyors();
  const receiving = this.setupReceiving();
  const crushing = this.setupCrushing();
  const storage = this.setupStorage();
  const grinding = this.setupGrinding();
  const oreToCrusher = this.setupOreToCrusher();
  const oreToStorage = this.setupOreToStorageDome();
  const oreToGrinding = this.setupOreToSAGMill();

  // left
  const tree = this.draw.tree(700, 385, 0.7);
  const t0001 = this.draw.tree(95, 320, 0.95);
  const t0002 = this.draw.tree(200, 600, 1);
  const t0003 = this.draw.tree(400, 390, 1.5);

  // middle
  const t0004 = this.draw.tree(1000, 400, 1.5);

  const trees = this.draw
    .group()
    .add(tree)
    .add(t0002)
    .add(t0003)
    .add(t0004);

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
  const slurry = this.draw.slurry('slurrry').go();
  const circuitSlurry = this.draw
    .image('images/circuit-slurry-equipment.svg')
    .size(this.origSceneW, this.origSceneH);
  const refining = this.setupRefining();
  const electrowinning = this.setupElectrowinning();
  const extraction = this.setupExtraction();

  this.layers.circuitSlurry
    .addToInner(slurry)
    .addToInner(circuitSlurry)
    .addToInner(refining)
    .addToInner(electrowinning)
    .addToInner(extraction);
};

SVGjsAnim.prototype.setupLayers = function () {
  const w = this.origSceneW;
  const h = this.origSceneH;

  const cloudsBack = this.draw
    .image('images/clouds.svg', w, h)
    .transform({ scaleX: -1 });
  const treescape = this.draw.image('images/treescape.svg', w, h);
  const cloudsOnce = this.draw.image('images/clouds.svg', w, h);
  const clouds = this.draw.image('images/clouds.svg', w, h);
  const circuitOre = this.draw.image('images/circuit-ore.svg', w, h);
  const circuitSlurry = this.draw.image('images/circuit-slurry.svg', w, h);

  this.layers.cloudsBack = this.draw
    .layer({ 'clouds-back': cloudsBack }, w, h)
    .move(-w, 0);
  this.layers.cloudsBackClone = this.draw
    .layer({ 'clouds-back-clone': cloudsBack.clone() }, w, h)
    .move(-w * 2, 0);
  this.layers.treescape = this.draw.layer({ treescape }, w, h);
  this.layers.cloudsOnce = this.draw.layer({ 'clouds-once': cloudsOnce }, w, h);
  this.layers.clouds = this.draw.layer({ clouds }, w, h).move(-w, 0);
  this.layers.cloudsClone = this.draw
    .layer({ 'clouds-clone': clouds.clone() }, w, h)
    .move(-w * 2, 0);

  // Circuit Ore
  this.layers.circuitOre = this.draw.layer({ 'circuit-ore': circuitOre }, w, h);

  // Circuit Slurry
  const groundExtension = this.draw
    .group()
    .move(0, 1060)
    .add(
      this.draw.rect(this.origSceneW, 4000).attr({
        fill: '#4e6a47',
        id: 'ground',
      }),
    );

  this.layers.circuitSlurry = this.draw
    .layer(
      {
        'circuit-slurry-ground': groundExtension,
        'circuit-slurry': circuitSlurry,
      },
      w,
      h + 4000,
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
  for (let i = 0; i < this.animations.length; i++) {
    this.animations[i].animate();
  }
};

SVGjsAnim.prototype.scale = function (n) {
  n = n || false;
  return n ? this.scene.scale(n) : this.scene.attr('scale');
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
