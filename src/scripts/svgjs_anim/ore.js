/* eslint-disable max-params */
/**
 * ore.js
 */
SVGjsAnim.prototype.setupOreToCrusher = function () {
  var step = this.draw
    .group()
    .attr({ id: "ore-to-crusher" })
    .move(900, 420)
    .scale(0.9);

  // ore will travel on 3 x-axis lines above conveyor
  // top x-axis
  this.animations.push(this.oreToCrusherAnim(step, "small1", 25, -10, true));

  // middle x-axis
  this.animations.push(this.oreToCrusherAnim(step, "medium2", -5, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "small3", 5, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 15, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "small2", 30, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 45, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "small2", 60, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "small3", 70, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium2", 80, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 95, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "small2", 110, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "small1", 120, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium2", 145, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 153, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "small2", 160, -5, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 170, -5, true));

  // bottom x-axis
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 5, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium2", 30, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 40, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 55, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium2", 75, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 90, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium2", 105, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 120, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium1", 135, 0, true));
  this.animations.push(this.oreToCrusherAnim(step, "medium2", 150, 0, true));

  return step;
};

SVGjsAnim.prototype.setupOreToStorageDome = function () {
  var step = this.draw
    .group()
    .attr({ id: "ore-to-ore-storage-dome" })
    .scale(0.7)
    .move(1430, 440);

  // ore will travel on 3 x-axis lines above conveyor
  // top x-axis
  this.animations.push(
    this.oreToStorageDomeAnim(step, "small1", 25, -10, true)
  );

  // middle x-axis
  this.animations.push(
    this.oreToStorageDomeAnim(step, "medium2", -5, -5, true)
  );
  this.animations.push(this.oreToStorageDomeAnim(step, "small3", 5, -5, true));
  this.animations.push(
    this.oreToStorageDomeAnim(step, "medium1", 15, -5, true)
  );
  this.animations.push(this.oreToStorageDomeAnim(step, "small2", 30, -5, true));
  this.animations.push(
    this.oreToStorageDomeAnim(step, "medium1", 45, -5, true)
  );
  this.animations.push(this.oreToStorageDomeAnim(step, "small2", 60, -5, true));
  this.animations.push(this.oreToStorageDomeAnim(step, "small3", 70, -5, true));
  this.animations.push(
    this.oreToStorageDomeAnim(step, "medium2", 80, -5, true)
  );
  this.animations.push(
    this.oreToStorageDomeAnim(step, "medium1", 95, -5, true)
  );
  this.animations.push(
    this.oreToStorageDomeAnim(step, "small2", 110, -5, true)
  );

  // bottom x-axis
  this.animations.push(this.oreToStorageDomeAnim(step, "medium1", 5, 0, true));
  this.animations.push(this.oreToStorageDomeAnim(step, "medium2", 30, 0, true));
  this.animations.push(this.oreToStorageDomeAnim(step, "medium1", 40, 0, true));
  this.animations.push(this.oreToStorageDomeAnim(step, "medium1", 55, 0, true));
  this.animations.push(this.oreToStorageDomeAnim(step, "medium2", 75, 0, true));
  this.animations.push(this.oreToStorageDomeAnim(step, "medium1", 90, 0, true));
  this.animations.push(
    this.oreToStorageDomeAnim(step, "medium2", 105, 0, true)
  );

  return step;
};

SVGjsAnim.prototype.setupOreToSAGMill = function () {
  var step = this.draw
    .group()
    .attr({ id: "ore-to-sag-mill" })
    .move(1835, 482)
    .scale(0.7);

  // ore will travel on 3 x-axis lines above conveyor
  // top x-axis
  this.animations.push(this.oreToSAGMillAnim(step, "small1", 25, -10, true));

  // middle x-axis
  this.animations.push(this.oreToSAGMillAnim(step, "medium2", -5, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "small3", 5, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium1", 15, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "small2", 30, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium1", 45, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "small2", 60, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "small3", 70, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium2", 80, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium1", 95, -5, true));
  this.animations.push(this.oreToSAGMillAnim(step, "small2", 110, -5, true));

  // bottom x-axis
  this.animations.push(this.oreToSAGMillAnim(step, "medium1", 5, 0, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium2", 30, 0, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium1", 40, 0, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium1", 55, 0, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium2", 75, 0, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium1", 90, 0, true));
  this.animations.push(this.oreToSAGMillAnim(step, "medium2", 105, 0, true));

  return step;
};

/**
 * buildOre
 *
 * TODO create map of 'ore size' => 'filename'
 */
SVGjsAnim.prototype.buildOre = function (s = "medium1", x = 0, y = 0) {
  let ore = this.draw.image("images/ore/ore_medium_1.svg", 7, 8);
  ore.move(x, y);

  if (s === "medium2") {
    ore = this.draw.image("images/ore/ore_medium_2.svg", 7, 8);
  } else if (s === "small1") {
    ore = this.draw.image("images/ore/ore_small_1.svg", 6, 5);
  } else if (s === "small2") {
    ore = this.draw.image("images/ore/ore_small_2.svg", 4, 3);
  } else if (s === "small3") {
    ore = this.draw.image("images/ore/ore_small_3.svg", 2, 2);
  }

  return ore;
};

/**
 * s - size of ore (medium1, medium2, small1, etc...
 * x - x coordinate of ore
 * y - y coordinate of ore
 * loop
 **/
SVGjsAnim.prototype.oreToCrusherAnim = function (scene, s, x, y, loop) {
  const paths = [
    {
      x: 213,
      y: 0 + y,
      t: "10s"
    },
    {
      x: 412,
      y: -101 + y,
      t: "12s"
    },
    {
      x: 550,
      y: -101 + y,
      t: "4.5s"
    },
    {
      x: 625,
      y: -98 + y,
      t: "3s"
    },
    {
      x: 630,
      y: -39 + y,
      t: "2s"
    }
  ];

  paths[0].t = 10000 - x * 50;
  return new OreAnimation(scene, this.buildOre(s, x, y), paths, loop);
};

/**
 * s - size of ore (medium1, medium2, small1, etc...
 * x - x coordinate of ore
 * y - y coordinate of ore
 * loop
 **/
SVGjsAnim.prototype.oreToStorageDomeAnim = function (scene, s, x, y, loop) {
  var paths = [
    { x: 130,
y: -10 + y,
t: 3500 },
    { x: 420,
y: -170 + y,
t: 12000 },
    { x: 660,
y: -170 + y,
t: 6000 },
    { x: 660,
y: -145 + y,
t: 500 },
  ];
  paths[0].t = 10000 - x * 50;
  return new OreAnimation(scene, this.buildOre(s, x, y), paths, loop);
};

/**
 * s - size of ore (medium1, medium2, small1, etc...
 * x - x coordinate of ore
 * y - y coordinate of ore
 * loop
 **/
SVGjsAnim.prototype.oreToSAGMillAnim = function (scene, s, x, y, loop) {
  var paths = [
    { x: 280,
y: 0 + y,
t: 1000 },
    { x: 460,
y: -212 + y,
t: "10s" },
    { x: 555,
y: -212 + y,
t: "2s" },
    { x: 555,
y: -150 + y,
t: "2s" },
    { x: 597,
y: -150 + y,
t: "2s" },
  ];
  paths[0].t = 10000 - x * 50;
  return new OreAnimation(scene, this.buildOre(s, x, y), paths, loop);
};
