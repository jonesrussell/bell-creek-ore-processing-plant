/**
 * crushing.js
 */
SVGjsAnim.prototype.setupCrushing = function () {
  var scale = 0.85;
  var x = 1200;
  var y = 0;
  var w = 500;
  var h = 540;

  this.wistiaObjs.crushing = this.wistiaEmbed("3nnwthrq6m");
  var heading = this.draw
    .heading("CRUSHING", this.wistiaObjs.crushing)
    .move(120, 60);
  this.headings.crusher = this.draw.set().add(heading);

  this.steps.crusher = this.draw
    .step("crusher")
    .move(x, y)
    .data({ id: "step-crusher" })
    .setScene(this.scene)
    .setHeading(heading)
    .scale(scale);

  const step = this.steps.crusher;

  var bulletsGroup = this.draw
    .group()
    .attr({ id: "bullets-crusher" })
    .move(160, 230)
    .scale(0.8)
    .attr({ opacity: 0 });

  bulletsGroup.add(
    this.draw
      .bullets(
        [
          "SELF CLEANING\nMAGNET",
          "REMOVES METAL FROM\nUNDERGROUND\nOPERATIONS",
        ],
        200
      )
      .move(-180, -80)
  );

  bulletsGroup.add(
    this.draw.bullets(["500 TONNES\nPER HOUR"], 100).move(-30, 50)
  );

  bulletsGroup.add(
    this.draw
      .bullets(['SCALPING GRIZZLY\nCAPTURES ORE > 3.5"'], 180)
      .move(130, -5)
  );

  bulletsGroup.add(
    this.draw
      .bullets(['JAW CRUSHER BREAKS\nCAPTURED ORE TO 4"'], 100)
      .move(240, 85)
  );

  bulletsGroup.add(
    this.draw.bullets(["SELF CLEANING\nMAGNET"], 190).move(455, -40)
  );

  bulletsGroup.add(
    this.draw.bullets(["ORE MOVES TO\nSTORAGE DOME"], 90).move(560, 60)
  );

  this.bullets.crusher = bulletsGroup;
  step.content(bulletsGroup);

  // Jaw Crusher
  this.jawCrusherX = 279.5;
  this.jawCrusherY = 433;
  this.jawCrusher = this.draw.jawCrusher();
  step.content(this.jawCrusher);

  // Zoom-in
  var stepToScale = 4,
    stepToX = -3870,
    stepToY = 0;
  if (this.isAspectRatio("4:3")) {
    stepToY = 250;
  }
  var zoom = this.draw
    .zoom({
      width: w,
      height: h,
      id: "crusher",
      scale: stepToScale,
      zx: stepToX,
      zy: stepToY,
    })
    .video(360, 93);
  step.setZoom(zoom);

  return step;
};
