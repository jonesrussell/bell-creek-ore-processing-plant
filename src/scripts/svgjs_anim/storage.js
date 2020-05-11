"use strict";
/*global SVGjsAnim */

SVGjsAnim.prototype.setupStorage = function () {
  // Scene
  var scale = 1;
  var x = 1650;
  var y = 0;
  var storageW = 470;
  var storageH = 530;

  this.wistiaObjs.storage = this.wistiaEmbed("snve0g1j7h");
  // Heading
  var heading = this.draw
    .heading("STORAGE", this.wistiaObjs.storage)
    .move(70, 120);
  this.headings["ore-storage-dome"] = this.draw.set().add(heading);

  var step = this.draw
    .step("ore-storage-dome")
    .move(x, y)
    .data({ id: "step-ore-storage-dome" })
    .setScene(this.scene)
    .setHeading(heading)
    .scale(scale);

  this.steps["ore-storage-dome"] = step;

  // Bullets
  var bulletsGroup = this.draw
    .group()
    .attr({ id: "bullets-storage-dome" })
    .move(150, 250)
    .scale(0.75)
    .attr({ opacity: 0 });

  bulletsGroup.add(
    this.draw
      .bullets(["20,000 TONNE STOCKPILE,\n6,000 TONNE LIVE LOAD"], 75)
      .move(125, -40)
  );

  bulletsGroup.add(
    this.draw.bullets(["3 ELECTRIC DRIVE\nAPRON FEEDERS"], 110).move(305, 120)
  );

  bulletsGroup.add(
    this.draw.bullets(["ORE MOVES\nTO SAG MILL"], 120).move(450, -20)
  );

  this.bullets["ore-storage-dome"] = bulletsGroup;
  step.content(bulletsGroup);

  var stepToScale = 4.2,
    stepToX = -6160,
    stepToY = -250;
  if (this.isAspectRatio("4:3")) {
    stepToY = 30;
  }
  var zoom = this.draw
    .zoom({
      width: storageW,
      height: storageH,
      id: "ore-storage-dome",
      scale: stepToScale,
      zx: stepToX,
      zy: stepToY,
    })
    .video(320, 130);
  step.setZoom(zoom);

  return step;
};
