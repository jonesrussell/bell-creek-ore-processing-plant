'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.setupCrushing = function()
{
    var scale = 0.85;
    var x = 1200;
    var y = 0;
    var w = 500;
    var h = 540;
    console.log('x: ' + x);
    console.log('y: ' + y);

    this.wistiaObjs.crushing = this.wistiaEmbed('3nnwthrq6m');
    var heading = this.draw.heading('CRUSHING', this.wistiaObjs.crushing)
        .move(110, 80);
    this.headings.crusher = this.draw.set().add(heading);

    var step = this.steps.crusher = this.draw.step('crusher')
        .move(x, y)
        .data({ id: 'step-crusher' })
        .setScene(this.scene)
        .setHeading(heading)
        .scale(scale);

    var bulletsGroup = this.draw.group()
        .attr({ id: 'bullets-crusher' })
        .move(160, 230)
        .scale(0.8)
        .attr({ opacity: 0 });

    bulletsGroup.add(
        this.draw.bullets([
            'SELF CLEANING\nMAGNET',
            'REMOVES METAL FROM\nUNDERGROUND\nOPERATIONS'
        ], 200)
        .move(-180, -80)
    );

    bulletsGroup.add(
        this.draw.bullets(['500 TONNES\nPER HOUR'], 100)
            .move(-30, 50)
    );

    bulletsGroup.add(
        this.draw.bullets(['SCALPING GRIZZLY\nCAPTURES ORE > 3.5"'], 180)
            .move(130, -5)
    );

    bulletsGroup.add(
        this.draw.bullets(['JAW CRUSHER BREAKS\nCAPTURED ORE TO 4"'], 100)
            .move(240, 85)
    );

    bulletsGroup.add(
        this.draw.bullets(['SELF CLEANING\nMAGNET'], 190)
            .move(455, -40)
    );

    bulletsGroup.add(
        this.draw.bullets(['ORE MOVES TO\nSTORAGE DOME'], 90).move(560, 60)
    );

    this.bullets.crusher = bulletsGroup;
    step.content(bulletsGroup);

    // Jaw Crusher 
    this.jawCrusherX = 279.5;
    this.jawCrusherY = 433;
    this.jawCrusher = this.draw.jawCrusher();
    step.content(this.jawCrusher);

    // Zoom-in
    this.stepToCrushingScale = 4;
    this.stepToCrushingX = this.scaleX(-3800);
    this.stepToCrushingY = this.scaleY(0);
    if (this.aspectRatio === '4:3') {
        this.stepToCrushingScale = 5;
        this.stepToCrushingX = this.scaleX(-5400);
        this.stepToCrushingY = this.scaleY(250);
    }
    var zoom = this.draw.zoom({
            width: w,
            height: h,
            id: 'crusher',
            scale: this.stepToCrushingScale,
            zx: this.stepToCrushingX,
            zy: this.stepToCrushingY
        })
        .video(360, 93);
    step.setZoom(zoom);

    return step;
};

