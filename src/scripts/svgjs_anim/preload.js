'use strict';
/*global SVGjsAnim, mill */

SVGjsAnim.prototype.images = [
    'images/circuit-ore-equipment.svg',
    'images/circuit-ore.svg',
    'images/circuit-slurry-equipment.svg',
    'images/circuit-slurry.svg',
    'images/clouds.svg',
    'images/conveyor_wheel.svg',
    'images/cyclone_detail.svg',
    'images/gold_in_pan.svg',
    'images/heading.svg',
    'images/jaw_crusher/crusher_circle.svg',
    'images/jaw_crusher/crusher_left.svg',
    'images/jaw_crusher/crusher_right.svg',
    'images/loading.svg',
    'images/ore/ore_medium_1.svg',
    'images/ore/ore_medium_2.svg',
    'images/ore/ore_pile_1.svg',
    'images/ore/ore_pile_2.svg',
    'images/ore/ore_small_1.svg',
    'images/ore/ore_small_2.svg',
    'images/ore/ore_small_3.svg',
    'images/refinery/carbon.svg',
    'images/refinery/glow.svg',
    'images/refinery/gold_bar.svg',
    'images/refinery/heat.svg',
    'images/refinery/smelted.svg',
    'images/refinery/spray.svg',
    'images/rock_breaker/rock_breaker_arm.svg',
    'images/rock_breaker/rock_breaker_bit.svg',
    'images/rock_breaker/rock_breaker_circle.svg',
    'images/solution.svg',
    'images/tree.svg',
    'images/treescape.svg',
    'images/truck/truck_body.svg',
    'images/truck/truck_dump.svg',
    'images/truck/truck_tires.svg',
    'images/video.svg'
];

SVGjsAnim.prototype.preloadedImages = false;

SVGjsAnim.prototype.preloadFinish = function() {
    mill.howManyLoaded++;
    if (mill.howManyImages ===  mill.howManyLoaded) {
        mill.preloadedImages = true;
    }
};

SVGjsAnim.prototype.preload = function() {
    this.howManyImages = this.images.length;
    this.howManyLoaded = 0;
    while (this.images.length > 0) {
        var img = document.createElement('img');
        img.src = this.images.shift();
        img.addEventListener('load', this.preloadFinish);
    }
};


