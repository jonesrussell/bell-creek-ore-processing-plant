'use strict';
/*global SVG, mill */

SVG.StirStick = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        preload: function() {
            mill.imgStirStick = 'images/solution.svg';
            mill.images.push(mill.imgStirStick);
            mill.preload();
            return this;
        },
        build: function(x, y) {
            this.move(x, y);
            this.stick = mill.draw.image(mill.imgStirStick, 84, 139);
            this.add(this.stick);
            this.add(mill.draw.line(42, 0, 42, 117).stroke({ width: 6, color: '#000' }));

                return this;
        },
        spin: function() {
            this.stick.animate(750)
                .scale(-1, 1)
                .translate(84, 0)
                .loop();

            return this;
        }
    },
    construct: {
        stirStick: function(x, y) {
            return this.put(new SVG.StirStick)
                .preload()
                .build(x, y);
        }
    }
});
