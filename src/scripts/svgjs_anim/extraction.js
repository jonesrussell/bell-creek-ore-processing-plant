"use strict";
/*global SVGjsAnim */

SVGjsAnim.prototype.setupExtraction = function () {
  var scale = 1;
  var x = 2375;
  var y = 500;
  var w = 800;
  var h = 650;

  this.wistiaObjs.extraction = this.wistiaEmbed("aktom82zan");
  var heading = this.draw
    .heading("EXTRACTION", this.wistiaObjs.extraction)
    .move(200, 25);
  this.headings.extraction = this.draw.set().add(heading);

  var step = this.draw
    .step("extraction")
    .move(x, y)
    .data({ id: "step-extraction" })
    .setScene(this.scene)
    .setHeading(heading)
    .scale(scale);

  this.steps.extraction = step;

  var bulletsGroup = this.draw
    .group()
    .attr({ id: "bullets-extraction", opacity: 0 })
    .scale(0.85)
    .move(24, 50);

  bulletsGroup.add(
    this.draw
      .bullets(
        ["6 TANKS USED FOR\nCARBON IN PULP\nPROCESS", "96% GOLD RECOVERY"],
        150
      )
      .move(78, 105)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        ["3 TANKS ADD\nCLEAN LOADED CARBON", "CARBON ADSORBS\nDISSOLVED GOLD"],
        140
      )
      .move(258, 115)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        ["2 LEACHING TANKS", "SODIUM CYANIDE ADDED\nTO DISOLVE GOLD"],
        150
      )
      .move(438, 105)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        ["3 TANKS ADD\nOXYGEN TO SLURRY", "LIME ADDED TO\nMAINTAIN ~11pH"],
        150
      )
      .move(617, 105)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        [
          "SLURRY INTRODUCED TO\nTHICKENER AT 28% - 35%\nSOLIDS",
          "SLURRY PUMPED FROM\nBOTTOM OF TANK AT 55%\nSOLIDS",
        ],
        240
      )
      .move(819, 15)
  );

  this.bullets.extraction = bulletsGroup;
  bulletsGroup.scale(1);
  step.content(bulletsGroup);

  // Stir Sticks
  this.stir1X = 710;
  this.stir2X = 530;
  this.stir3X = 350;
  this.stir0X = 170;

  var stirSticks = this.draw
    .group()
    .addClass("stir-sticks")
    .scale(1)
    .move(-110, 329);
  stirSticks.add(this.draw.stirStick(this.stir0X, 0).spin());
  stirSticks.add(this.draw.stirStick(this.stir1X, 0).spin());
  stirSticks.add(this.draw.stirStick(this.stir2X, 0).spin());
  stirSticks.add(this.draw.stirStick(this.stir3X, 0).spin());
  step.content(stirSticks);

  var stepToScale = 3,
    stepToX = -6700,
    stepToY = -1600;
  if (this.isAspectRatio("4:3")) {
    stepToY = -1400;
  }
  var zoom = this.draw
    .zoom({
      width: w,
      height: h,
      id: "extraction",
      scale: stepToScale,
      zx: stepToX,
      zy: stepToY,
    })
    .video(450, 40);
  step.setZoom(zoom);

  return step;
};
