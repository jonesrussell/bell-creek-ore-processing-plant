'use strict';
/*global SVG, Q */

SVG.RockBreaker = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function(params) {
            this.attr({ id: 'eq-rock-breaker' })
                .move(params.x, params.y)
                .scale(params.scale);

            this.rbArm = this.parent.image('images/rock_breaker/rock_breaker_arm.svg', 26, 26)
                .move(75, -64)
                .addClass('inject-me');
            this.rbBit = this.parent.image('images/rock_breaker/rock_breaker_bit.svg', 33, 106)
                .move(44, -73);
            var rbCircle = this.parent.image('images/rock_breaker/rock_breaker_circle.svg', 15, 33)
                .move(95, -60);
            this.add(this.rbArm)
                .add(this.rbBit)
                .add(rbCircle);

            return this;
        }
    },
    construct: {
        rockBreaker: function(params) { return this.put(new SVG.RockBreaker).build(params); }
    }
});

SVG.extend(SVG.RockBreaker, {
    up: function() {
        var defer = Q.defer();
        this.rbArm.animate(500).transform({ rotation: 5, x: 1, y: -5 })
            .after(function(){
                defer.resolve();
            });
        this.rbBit.animate(500).transform({ rotation: 5, x: -5, y: -10 })
            .after(function(){
            });
        return defer.promise;
    },
    down: function() {
        var defer = Q.defer();
        this.rbArm.animate(250).transform({ rotation: -10, x: -1, y: 5 });
        this.rbBit.animate(250).transform({ rotation: -10, x: 5, y: 10 })
            .after(function(){
                defer.resolve();
            });
        return defer.promise;
    },
    reset: function() {
        var defer = Q.defer();
        this.rbArm.animate(500).transform({ rotation: 0, x: 0, y: 0 });
        this.rbBit.animate(500).transform({ rotation: 0, x: 0, y: 0 })
            .after(function(){defer.resolve('good');});
        return defer.promise;
    },
    go: function() {
        var self = this;
        this.up(self)
            .then(function(){ return self.down(); })
            .then(function(){ return self.reset(); })
            .done(function(){
                self.go();
            });
    }
});
