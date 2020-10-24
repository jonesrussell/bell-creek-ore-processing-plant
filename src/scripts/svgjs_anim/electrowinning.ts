/**
 * electrowinning.js
 */
SVGjsAnim.prototype.setupElectrowinning = function () {
  var scale = 1;
  var x = 1495;
  var y = 530;
  var w = 880;
  var h = 820;

  this.wistiaObjs.electrowinning = this.wistiaEmbed("zlgqw4faj4");
  var heading = this.draw
    .heading("ELECTROWINNING", this.wistiaObjs.electrowinning)
    .move(510, -30);
  this.headings.electrowinning = this.draw.set().add(heading);

  var step = this.draw
    .step("electrowinning")
    .move(x, y)
    .data({ id: "step-electrowinning" })
    .setScene(this.scene)
    .setHeading(heading)
    .scale(scale);

  this.steps.electrowinning = step;

  var bulletsGroup = this.draw
    .group()
    .attr({ id: "bullets-electrowinning" })
    .move(0, 100)
    .scale(0.85)
    .attr({ opacity: 0 });

  bulletsGroup.add(
    this.draw.bullets(["PUMPED TO\nREFINERY"], 100).move(8, 220)
  );

  bulletsGroup.add(
    this.draw.bullets(["PREGNANT\nSOLUTION\nTANK"], 205).move(140, 69)
  );

  bulletsGroup.add(
    this.draw.bullets(["CARBON STRIP\nCOLUMN"], 100).move(306.5, 45)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        [
"HEAT EXCHANGER",
"HIGH TEMPERATURE SOLUTION\nPUMPED TO STRIP COLUMN"
],
        150
      )
      .move(434, 80)
  );

  bulletsGroup.add(
    this.draw
      .bullets([
"BARREN\nSTRIPPING\nSOLUTION",
"PUMPED TO\nSTRIP\nCOLUMN"
], 135)
      .move(525, 200)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        [
          "GOLD LOADED\nCARBON ADDED",
          "HIGH TEMPERATURE/PRESSURE\nSOLUTION REMOVES GOLD",
        ],
        150
      )
      .move(930, 25)
  );

  /*    bulletsGroup.add(
        this.draw.bullets(['LOADED CARBON\nHOPPER'], 440).move(505, 10)
    );*/

  this.bullets.electrowinning = bulletsGroup;
  step.content(bulletsGroup);

  step.content(
    this.draw.image("images/refinery/spray.svg", 31, 13).move(615, 270)
  );

  step.content(
    this.draw.image("images/refinery/spray.svg", 31, 13).move(697.5, 270)
  );

  step.content(
    this.draw.image("images/refinery/carbon.svg", 170, 27).move(585, 300)
  );

  // Zoom-in
  var stepToScale = 3,
    stepToX = -4000,
    stepToY = -1650;
  if (this.isAspectRatio("4:3")) {
    stepToY = -1450;
  }
  var zoom = this.draw
    .zoom({
      width: w,
      height: h,
      id: "electrowinning",
      scale: stepToScale,
      zx: stepToX,
      zy: stepToY,
    })
    .video(760, -15);
  step.setZoom(zoom);

  return step;
};
