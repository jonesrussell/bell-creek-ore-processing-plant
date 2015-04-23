'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.setupRefining = function()
{
    var scale = 1.3;
    var x = 0;
    var y = 505;
    var w = 1150;
    var h = 550;

    this.spray1X = 1897;
    this.spray1Y = 868;
    this.spray2X = 1979;
    this.spray2Y = 868;
    this.carbonX = 1866;
    this.carbonY = 900;

    this.wistiaObjs.refining = this.wistiaEmbed('ovdskmla9a');
    var headingX = 200;
    var headingY = -20;
    var heading = this.draw.heading('REFINING', this.wistiaObjs.refining)
        .move(headingX, headingY);
    this.headings.refinery = this.draw.set().add(heading);

    var step = this.steps.refinery = this.draw.step('refinery')
        .move(x, y)
        .data({ id: 'step-refinery' })
        .setScene(this.scene)
        .setHeading(heading)
        .scale(scale);

    var bulletsGroup = this.bullets.refinery = this.draw.group()
        .attr({ id: 'bullets-refinery' })
        .move(155, 117)
        .attr({ opacity: 0 })
        .scale(1);
    step.content(bulletsGroup);

    bulletsGroup.add(
        this.draw.bullets(['INDUCTION FURNACE SMELTS\nGOLD INTO DORÉ BARS'], 50)
            .move(275, 180)
    );

    bulletsGroup.add(
        this.draw.bullets(['OVEN DRIES ELECTROWINNING\nCONCENTRATE FOR SMELTING'], 150)
            .move(535, 50)
    );

    bulletsGroup.add(
        this.draw.bullets([
            'ELECTROWINNING CELL\nRECOVERS GOLD FROM\nSTRIP SOLUTION',
            'PRODUCES CONCENTRATE\n~90% GOLD'
        ], 170)
            .move(700, 200)
    );

    bulletsGroup.add(
        this.draw.bullets([
            'FREE GOLD FED TO SHAKING TABLE\nFROM GRAVITY GOLD SEPARATOR',
            'CONCENTRATES GOLD TO ~75%',
            'CONCENTRATE MELTED\nIN FURNACE',
        ], 190)
            .move(880, -15)
    );

    this.smeltedX = 427;
    this.smeltedY = 450;
    step.content(
        this.draw.image('images/refinery/smelted.svg', 6, 67)
            .move(this.smeltedX, this.smeltedY)
            .attr({ id: 'smelted' })
    );

    var goldPan = this.draw.image('images/gold_in_pan.svg', 82, 22)
        .move(829, 559);
    var rect = this.draw.rect(82, 22)
        .move(829, 580)
        .stroke({ color: '#ff0000', width: 1 });
    goldPan.clipWith(rect);
    rect.animate(4000).move(829, 559).loop();
    step.content(goldPan);

    var gptX = 1064;
    var gptY = 292;
    var goldPanTable = this.draw.image('images/gold_in_pan.svg', 82, 22)
        .move(gptX, gptY);
    var rect2 = this.draw.rect(82, 22)
        .move(gptX, gptY + 21)
        .stroke({ color: '#ff0000', width: 1 });
    goldPanTable.clipWith(rect2);
    rect2.animate(3000, '-', 2000).move(gptX, gptY).loop();
    step.content(goldPanTable);

    this.ovenHeatX = 660;
    this.ovenHeatY = 345;
    var heat = this.draw.heat(this.ovenHeatX, this.ovenHeatY);
    step.content(heat);

    this.goldBarX = 125;
    this.goldBarY = 467;
    step.content(
        this.draw.image('images/refinery/gold_bar.svg', 95, 56)
            .move(this.goldBarX, this.goldBarY)
            .scale(0.805)
    );

   this.goldBarGlowX = 90;
   this.goldBarGlowY = 417;
   step.content(
        this.draw.image('images/refinery/glow.svg', 168, 168)
            .move(this.goldBarGlowX, this.goldBarGlowY)
            .scale(0.805)
    );

    var stepToScale = 2.6
      , stepToX = -500
      , stepToY = -1200;
    if (this.isAspectRatio('4:3')) {
      stepToY = -1100;
    }
     var zoom = this.draw.zoom({
      width: w
      , height: h
      , id: 'refinery'
      , scale: stepToScale
      , zx: stepToX
      , zy: stepToY
    })
    .video(439, 35);
    step.setZoom(zoom);

    step._content.scale(0.79);
    step._content.move(138, -87);
    return step;
};

