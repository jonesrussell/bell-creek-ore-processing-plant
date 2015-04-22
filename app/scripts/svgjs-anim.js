'use strict';
/*global SVG, mill, OreAnimation */

/*
    Features:
        - image preloading
        - stepping
        - zoom
        - animation paths
*/
function SVGjsAnim()
{
    this.draw = SVG('drawing')
        .fixSubPixelOffset();

    this.scene = this.draw.group()
        .attr({ id: 'scene' });

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

//@TODO use a promise
SVGjsAnim.prototype.init = function() {
    var svgjsAnim = mill;
    if (svgjsAnim.preloadedImages) {
        var loadingImage = document.getElementById('anim-loading');
        loadingImage.parentNode.removeChild(loadingImage);
        svgjsAnim.build();
        svgjsAnim.start();
    } else {
        setTimeout(svgjsAnim.init, 100);
    }
};

SVGjsAnim.prototype.resetCamera = function() {
    var x = -120 * this.sceneScale;
    this.scene
        .animate(1250)
        .scale(this.sceneScale + (this.sceneScale * 0.08))
        .move(x, this.defaultY);
};

SVGjsAnim.prototype.build = function() {
    this.defaultX = this.scene.x();
    this.defaultY = this.scene.y();
    this.resetCamera();
    this.setupLayers();

    // Ore Circuit
    var grindingSlurry = this.draw.grindingSlurry('grinding-slurry').go();
    var circuitOre = this.draw.image('images/circuit-ore-equipment.svg')
            .size(this.origSceneW, this.origSceneH);
    var conveyors = this.setupConveyors();
    var receiving = this.setupReceiving();
    var crushing = this.setupCrushing();
    var storage = this.setupStorage();
    var grinding = this.setupGrinding();
    var oreToCrusher = this.setupOreToCrusher();
    var oreToStorage = this.setupOreToStorageDome();
    var oreToGrinding = this.setupOreToSAGMill();

    // left
    var tree = this.draw.tree(700, 385, 0.7);
    var t0001 = this.draw.tree(95, 320, 0.95);
    var t0002 = this.draw.tree(200, 600, 1);
    var t0003 = this.draw.tree(400, 390, 1.5);

    // middle
    var t0004 = this.draw.tree(1000, 400, 1.5);

    // right
/*
    var t0004 = tree.clone().move(2493, 500).scale(0.78);
    var t0005 = tree.clone().move(1830, 540).scale(0.8);
    var t0006 = tree.clone().move(2030, 500);
    var t0007 = tree.clone().move(3030, 420).scale(0.7);
    var t0008 = tree.clone().move(3080, 460);
    var t0009 = tree.clone().move(3130, 490).scale(0.8);
    var t0010 = tree.clone().move(3270, 800).scale(1.3);
    var t0011 = tree.clone().move(1400, 530).scale(0.9);
    var t0012 = tree.clone().move(1530, 650).scale(0.95);
    var t0013 = tree.clone().move(3530, 650).scale(1.2);
    var t0014 = tree.clone().move(3530, 650).scale(1.2);
    var t0015 = tree.clone().move(3530, 650).scale(1.3);
    var t0016 = tree.clone().move(3530, 650).scale(1.3);
    var t0017 = tree.clone().move(3530, 650).scale(1.5);
    var t0018 = tree.clone().move(3530, 650).scale(1.5);*/
    var trees = this.draw.group()
        .add(tree)
        .add(t0002)
        .add(t0003)
        .add(t0004);
/*
        .add(t0004)
        .add(t0005)
        .addToInner(t0006)
        .addToInner(t0007)
        .addToInner(t0008)
        .addToInner(t0009)
        .addToInner(t0010)
        .addToInner(t0011)
        .addToInner(t0012)
        .addToInner(t0013)
        .add(t0014)
        .add(t0015)
        .add(t0016)
        .add(t0017)
        .add(t0018)*/

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
    var slurry = this.draw.slurry('slurrry').go();
    var circuitSlurry = this.draw.image('images/circuit-slurry-equipment.svg')
            .size(this.origSceneW, this.origSceneH);
    var refining = this.setupRefining();
    var electrowinning = this.setupElectrowinning();
    var extraction = this.setupExtraction();

/*    var t1000 = tree.clone().move(150, 410).scale(2);
    var t1001 = tree.clone().move(650, 910).scale(2.5);
    var t1002 = tree.clone().move(3550, 1083).scale(2.3);
    var t1003 = tree.clone().move(3570, 950).scale(2.3);*/

    this.layers.circuitSlurry
        .addToInner(slurry)
        .addToInner(circuitSlurry)
//        .addToInner(t1000)
//        .addToInner(t1001)
//        .addToInner(t1002)
//        .addToInner(t1003)
        .addToInner(refining)
        .addToInner(electrowinning)
        .addToInner(extraction);
};

SVGjsAnim.prototype.setupLayers = function()
{
    var w = this.origSceneW;
    var h = this.origSceneH;

    var cloudsBack = this.draw.image('images/clouds.svg', w, h)
        .transform({ scaleX: -1 });
    var treescape = this.draw.image('images/treescape.svg', w, h);
    var cloudsOnce = this.draw.image('images/clouds.svg', w, h);
    var clouds = this.draw.image('images/clouds.svg', w, h);
    var circuitOre = this.draw.image('images/circuit-ore.svg', w, h);
    var circuitSlurry = this.draw.image('images/circuit-slurry.svg', w, h);

    this.layers.cloudsBack = this.draw.layer({ 'clouds-back': cloudsBack }, w, h)
        .move(-w, 0);
    this.layers.cloudsBackClone = this.draw.layer({ 'clouds-back-clone': cloudsBack.clone() }, w, h)
        .move(-w*2, 0);
    this.layers.treescape = this.draw.layer({ 'treescape': treescape }, w, h);
    this.layers.cloudsOnce = this.draw.layer({ 'clouds-once': cloudsOnce }, w, h);
    this.layers.clouds = this.draw.layer({ 'clouds': clouds }, w, h)
        .move(-w, 0);
    this.layers.cloudsClone = this.draw.layer({ 'clouds-clone': clouds.clone() }, w, h)
        .move(-w*2, 0);

    // Circuit Ore
    this.layers.circuitOre = this.draw.layer(
        { 'circuit-ore': circuitOre },
        w,
        h
    );

    // Circuit Slurry
    var groundExtension = this.draw.group()
        .move(0, 1060)
        .add(
            this.draw.rect(this.origSceneW, 4000)
                .attr({
                    fill: '#4e6a47',
                    id: 'ground'
                })
        );

    this.layers.circuitSlurry = this.draw.layer({
            'circuit-slurry-ground': groundExtension,
            'circuit-slurry': circuitSlurry
        },
        w,
        h + 4000
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

//    var d = 350000;
//    var d2 = 550000;
//    this.layers.cloudsBack.animate(d, '-', 0).move(w, 0).loop();
//    this.layers.cloudsBackClone.animate(d*2, '-', 0).move(w, 0).loop();
//    this.layers.clouds.animate(d2, '-', 0).move(w, 0).loop();
//    this.layers.cloudsClone.animate(d2*2, '-', 0).move(w, 0).loop();

//    this.layers.cloudsOnce.animate(d, '-', 0)
//        .move(w, 0)
//        .after(function(){ this.remove(); });

   return this;
};

SVGjsAnim.prototype.scaled = function(n, scale) {
    var foo = n * scale;
    console.log(foo);
    return (scale < 1) ? n + (n * this.sceneResizePercent) : n - (n * this.sceneResizePercent);
};

SVGjsAnim.prototype.unscaled = function(n) {
    return n * (1+this.sceneResizePercent);
};

SVGjsAnim.prototype.start = function()
{
    this.showBullets();
    this.conveyorGo();
    this.cycloneGo();
    this.dumpTruck.go();
    this.rockBreaker.go();
    this.jawCrusher.go();

    // Ore
    for (var i=0; i<this.animations.length; i++)
    {
        this.animations[i].animate();
    }
};

SVGjsAnim.prototype.setupConveyors = function()
{
    var conveyors = this.draw.group()
        .move(214, 0)
        .attr({ id: 'conveyor-wheels' })
        .scale(1);

    // Truck Dump
    conveyors.add(this.drawBigConveyorWheel(684, 439));
    conveyors.add(this.drawBigConveyorWheel(760, 439));
    conveyors.add(this.drawBigConveyorWheel(791, 439));
    conveyors.add(this.drawBigConveyorWheel(1186, 342));

    // Crusher
    conveyors.add(this.drawBigConveyorWheel(1216, 447.5));
    conveyors.add(this.drawBigConveyorWheel(1661, 333));

    // Ore Storage Dome
    conveyors.add(this.drawSmallConveyorWheel(1554, 452.5));
    conveyors.add(this.drawSmallConveyorWheel(1615, 452.5));
    conveyors.add(this.drawSmallConveyorWheel(1643, 452.5));
    conveyors.add(this.drawSmallConveyorWheel(1704, 452.5));
    conveyors.add(this.drawSmallConveyorWheel(1730, 452.5));
    conveyors.add(this.drawSmallConveyorWheel(1791, 452.5));

    conveyors.add(this.drawBigConveyorWheel(1558, 496.5));
    conveyors.add(this.drawBigConveyorWheel(1995, 345.5));

    // Mill
    conveyors.add(this.drawSmallConveyorWheel(1976, 386.5));
    conveyors.add(this.drawSmallConveyorWheel(2036, 386.5));

    return conveyors;
};

SVGjsAnim.prototype.drawSmallConveyorWheel = function(x, y)
{
    return this.draw.image('images/conveyor_wheel.svg', 8, 9)
        .attr('class', 'conveyor-wheel')
        .move(x, y);
};

SVGjsAnim.prototype.drawBigConveyorWheel = function(x, y)
{
    return this.drawSmallConveyorWheel(x, y).size(10, 11);
};

/*******************
 * TRUCK DUMP
 *******************/
SVGjsAnim.prototype.setupOreToCrusher = function()
{
    var step = this.draw.group()
        .attr({ id: 'ore-to-crusher' })
        .move(900, 420)
        .scale(0.9);

    // ore will travel on 3 x-axis lines above conveyor
    // top x-axis
    this.animations.push( this.oreToCrusherAnim(step,'small1', 25, -10, true) );

    // middle x-axis
    this.animations.push( this.oreToCrusherAnim(step,'medium2', -5, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'small3', 5, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 15, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'small2', 30, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 45, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'small2', 60, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'small3', 70, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium2', 80, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 95, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'small2', 110, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'small1', 120, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium2', 145, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 153, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'small2', 160, -5, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 170, -5, true) );

    // bottom x-axis
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 5, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium2', 30, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 40, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 55, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium2', 75, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 90, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium2', 105, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 120, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium1', 135, 0, true) );
    this.animations.push( this.oreToCrusherAnim(step,'medium2', 150, 0, true) );

    return step;
};

SVGjsAnim.prototype.setupOreToStorageDome = function()
{
    var step = this.draw.group()
        .attr({ id: 'ore-to-ore-storage-dome' })
        .scale(0.7)
        .move(1430, 440);

    // ore will travel on 3 x-axis lines above conveyor
    // top x-axis
    this.animations.push( this.oreToStorageDomeAnim(step,'small1', 25, -10, true) );

    // middle x-axis
    this.animations.push( this.oreToStorageDomeAnim(step,'medium2', -5, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'small3', 5, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium1', 15, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'small2', 30, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium1', 45, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'small2', 60, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'small3', 70, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium2', 80, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium1', 95, -5, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'small2', 110, -5, true) );

    // bottom x-axis
    this.animations.push( this.oreToStorageDomeAnim(step,'medium1', 5, 0, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium2', 30, 0, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium1', 40, 0, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium1', 55, 0, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium2', 75, 0, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium1', 90, 0, true) );
    this.animations.push( this.oreToStorageDomeAnim(step,'medium2', 105, 0, true) );

    return step;
};

SVGjsAnim.prototype.setupOreToSAGMill = function()
{
    var step = this.draw.group()
        .attr({ id: 'ore-to-sag-mill' })
        .move(1835, 482)
        .scale(0.7);

    // ore will travel on 3 x-axis lines above conveyor
    // top x-axis
    this.animations.push( this.oreToSAGMillAnim(step,'small1', 25, -10, true) );

    // middle x-axis
    this.animations.push( this.oreToSAGMillAnim(step,'medium2', -5, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'small3', 5, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium1', 15, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'small2', 30, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium1', 45, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'small2', 60, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'small3', 70, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium2', 80, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium1', 95, -5, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'small2', 110, -5, true) );

    // bottom x-axis
    this.animations.push( this.oreToSAGMillAnim(step,'medium1', 5, 0, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium2', 30, 0, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium1', 40, 0, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium1', 55, 0, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium2', 75, 0, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium1', 90, 0, true) );
    this.animations.push( this.oreToSAGMillAnim(step,'medium2', 105, 0, true) );

    return step;
};

SVGjsAnim.prototype.buildOre = function(s, x, y)
{
    var ore;
    if (s === 'medium1')
    {
        ore = this.draw.image('images/ore/ore_medium_1.svg', 7, 8);
    }
    else if (s === 'medium2')
    {
        ore = this.draw.image('images/ore/ore_medium_2.svg', 7, 8);
    }
    else if (s === 'small1')
    {
        ore = this.draw.image('images/ore/ore_small_1.svg', 6, 5);
    }
    else if (s === 'small2')
    {
        ore = this.draw.image('images/ore/ore_small_2.svg', 4, 3);
    }
    else if (s === 'small3')
    {
        ore = this.draw.image('images/ore/ore_small_3.svg', 2, 2);
    }
    ore.move(x, y);
    return ore;
};

/**
 * s - size of ore (medium1, medium2, small1, etc...
 * x - x coordinate of ore
 * y - y coordinate of ore
 * loop
 **/
SVGjsAnim.prototype.oreToCrusherAnim = function(scene, s, x, y, loop)
{
    var paths = [
        { x: 213, y: 0 + y, t: '10s' },
        { x: 412, y: -101 + y, t: '12s'},
        { x: 550, y: -101 + y, t: '4.5s'},
        { x: 625, y: -98 + y, t: '3s'},
        { x: 630, y: -39 + y, t: '2s'}
    ];
    paths[0].t = 10000 - (x * 50);
    return new OreAnimation(
        scene,
        this.buildOre(s, x, y),
        paths,
        loop
    );
};

/**
 * s - size of ore (medium1, medium2, small1, etc...
 * x - x coordinate of ore
 * y - y coordinate of ore
 * loop
 **/
SVGjsAnim.prototype.oreToStorageDomeAnim = function(scene, s, x, y, loop)
{
    var paths = [
        { x: 130, y: -10 + y, t: 3500 },
        { x: 420, y: -170 + y, t: 12000 },
        { x: 660, y: -170 + y, t: 6000 },
        { x: 660, y: -145 + y, t: 500}
    ];
    paths[0].t = 10000 - (x * 50);
    return new OreAnimation(
        scene,
        this.buildOre(s, x, y),
        paths,
        loop
    );
};

/**
 * s - size of ore (medium1, medium2, small1, etc...
 * x - x coordinate of ore
 * y - y coordinate of ore
 * loop
 **/
SVGjsAnim.prototype.oreToSAGMillAnim = function(scene, s, x, y, loop)
{
    var paths = [
        { x: 280, y: 0 + y, t: 1000 },
        { x: 460, y: -212 + y, t: '10s'},
        { x: 555, y: -212 + y, t: '2s'},
        { x: 555, y: -150 + y, t: '2s'},
        { x: 597, y: -150 + y, t: '2s'},
    ];
    paths[0].t = 10000 - (x * 50);
    return new OreAnimation(
        scene,
        this.buildOre(s, x, y),
        paths,
        loop
    );
};

SVGjsAnim.prototype.conveyorGo = function()
{
    var wheels = SVG.get('conveyor-wheels').children();
    for (var i=0; i<wheels.length; i++) {
        wheels[i].animate(5000, '-', 0).rotate(360).loop();
    }
};

SVGjsAnim.prototype.cycloneGo = function()
{
    SVG.get('cyclone').animate(2500, '-', 0).rotate(360).loop();
};

SVGjsAnim.prototype.scale = function(n) {
    n = n || false;
    return (n) ? this.scene.scale(n) : this.scene.attr('scale');
};

SVGjsAnim.prototype.move = function(x, y) {
    this.scene.move(x, y);
};

SVGjsAnim.prototype.x = function(x) {
    this.scene.x(x);
};

SVGjsAnim.prototype.y = function(y) {
    this.scene.y(y);
};

