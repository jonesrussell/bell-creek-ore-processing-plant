'use strict';
/*global SVG */

SVG.Tree = SVG.invent({
    create: 'image',
    inherit: SVG.Image,
    extend: {
        build: function(x, y, s) {
            this.size(69, 129)
                .move(x, y)
                .scale(s);
            return this;
        }
    },
    construct: {
        tree: function(x, y, s) {
            return this.put(new SVG.Tree).load('images/tree.svg').build(x, y, s);
        }
    }
});


