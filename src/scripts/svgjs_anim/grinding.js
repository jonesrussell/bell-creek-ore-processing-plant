/**
 * grinding.js
 */
SVGjsAnim.prototype.setupGrinding = function () {
  const scale = 0.8;
  const x = 2120;
  const y = 0;
  const w = 1000;
  const h = 600;

  // Heading
  this.wistiaObjs.grinding = this.wistiaEmbed("c8zdqadrm5");
  const heading = this.draw
    .heading("GRINDING", this.wistiaObjs.grinding)
    .move(-50, 60);
  this.headings["sag-mill"] = this.draw.set().add(heading);

  const step = this.draw
    .step("sag-mill")
    .scale(scale)
    .move(x, y)
    .data({ id: "step-sag-mill" })
    .setScene(this.scene)
    .setHeading(heading);

  this.steps["sag-mill"] = step;

  step.content(this.draw.sagMill());

  // Bullets
  const bulletsGroup = this.draw
    .group()
    .attr({ id: "bullets-mill" })
    .move(120, 120)
    .scale(0.85)
    .attr({ opacity: 0 });

  bulletsGroup.add(
    this.draw
      .bullets(
        ["90% OF UNDERFLOW\n(COARSELY GROUND MATERIAL)\nRECIRCULATED"],
        155
      )
      .move(55, 75)
  );

  bulletsGroup.add(
    this.draw
      .bullets(["10% OF UNDERFLOW\nTO GRAVITY GOLD SEPARATOR"], 80)
      .move(107, 193)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        [
          "SAG MILL 22' DIAMETER\nBY 36.6' LENGTH",
          "ORE MIXED WITH WATER\nAND GROUND INTO\nSLURRY",
        ],
        280
      )
      .move(300, 80)
  );

  bulletsGroup.add(
    this.draw.bullets(["SLURRY PUMPED TO\nCYCLONES"], 132).move(542, 16)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        ["CONCENTRATE FROM\nGRAVITY GOLD SEPARATOR\nTO SHAKING TABLE"],
        70
      )
      .move(750, 240)
  );

  bulletsGroup.add(
    this.draw
      .bullets(
        ["OVERFLOW (FINELY GROUND MATERIAL)\nPUMPED TO THICKENER TANK"],
        70
      )
      .move(680, 65)
  );

  this.bullets["sag-mill"] = bulletsGroup;
  step.content(bulletsGroup);

  // Cyclone
  step.content(
    this.draw
      .image("images/cyclone_detail.svg", 31, 31)
      .move(566, 325)
      .attr("id", "cyclone")
  );

  // Zoom-in
  const stepToScale = 3.9;
  const stepToX = -7550;
  let stepToY = 50;

  if (this.isAspectRatio("4:3")) {
    stepToY = 240;
  }

  const zoom = this.draw
    .zoom({
      width: w,
      height: h,
      id: "sag-mill",
      scale: stepToScale,
      zx: stepToX,
      zy: stepToY,
    })
    .video(200, 75);
  step.setZoom(zoom);

  step.myContent.move(12, -30);
  return step;
};

SVGjsAnim.prototype.cycloneGo = function () {
  SVG.get("cyclone").animate(2500, "-", 0).rotate(360).loop();
};
