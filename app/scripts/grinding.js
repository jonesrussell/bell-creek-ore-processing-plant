'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.setupGrinding = function()
{
    var scale = 0.8;
    var x = 2120;
    var y = 0;
    var w = 1000;
    var h = 600;

    // Heading
    this.wistiaObjs.grinding = this.wistiaEmbed('c8zdqadrm5');
    var heading = this.draw.heading('GRINDING', this.wistiaObjs.grinding)
        .move(-50, 60);
    this.headings['sag-mill'] = this.draw.set().add(heading);

    var step = this.steps['sag-mill'] = this.draw.step('sag-mill')
        .scale(scale)
        .move(x, y)
        .data({ id: 'step-sag-mill' })
        .setScene(this.scene)
        .setHeading(heading);

    step.content(this.draw.sagMill());

    // Bullets
    var bulletsGroup = this.draw.group()
        .attr({ id: 'bullets-mill' })
        .move(120, 120)
        .scale(0.85)
        .attr({ opacity: 0 });

    bulletsGroup.add(
        this.draw.bullets([
            '90% OF UNDERFLOW\n(COARSELY GROUND MATERIAL)\nRECIRCULATED'
        ], 155)
        .move(55, 75)
    );

    bulletsGroup.add(
        this.draw.bullets([
            '10% OF UNDERFLOW\nTO GRAVITY GOLD SEPARATOR',
        ], 80)
        .move(107, 193)
    );

    bulletsGroup.add(
        this.draw.bullets([
            'SAG MILL 22\' DIAMETER\nBY 36.6\' LENGTH',
            'ORE MIXED WITH WATER\nAND GROUND INTO\nSLURRY',
        ], 280).move(300, 80)
    );

    bulletsGroup.add(
        this.draw.bullets(['SLURRY PUMPED TO\nCYCLONES'], 132)
            .move(542, 16)
    );

    bulletsGroup.add(
        this.draw.bullets(['CONCENTRATE FROM\nGRAVITY GOLD SEPARATOR\nTO SHAKING TABLE'], 70)
            .move(750, 240)
    );

    bulletsGroup.add(
        this.draw.bullets(['OVERFLOW (FINELY GROUND MATERIAL)\nPUMPED TO THICKENER TANK'], 70)
            .move(680, 65)
    );

    this.bullets['sag-mill'] = bulletsGroup;
    step.content(bulletsGroup);

    // Cyclone
    step.content(
        this.draw.image('images/cyclone_detail.svg', 31, 31)
            .move(566, 325)
            .attr('id', 'cyclone')
    );

    // Zoom-in
    var stepToScale = 3.9
      , stepToX = -7500
      , stepToY = -275;
    var zoom = this.draw.zoom({
      width: w
      , height: h
      , id: 'sag-mill'
      , scale: stepToScale
      , zx: stepToX
      , zy: stepToY
    })
    .video(200, 75);
    step.setZoom(zoom);

    step._content.move(12, -30);
    return step;
};

