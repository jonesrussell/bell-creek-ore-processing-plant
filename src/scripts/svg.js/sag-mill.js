'use strict';
/*global SVG */

SVG.SAGMill = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function() {
            this.wheel();
            this.studded();

            return this;
        },
        wheel: function() {
            this.spinner = this.doc().line(0, 0, 0, 145)
                .attr({
                    stroke: '#a7d5e0',
                    'stroke-width': 23.5,
                    'stroke-dasharray': 10,
                    'stroke-dashoffset': 100 
                })
                .move(264.5, 432);
            this.add(this.spinner);
            return this;
        },
        studded: function() {
            var dots = this.doc().group()
                .move(295, 460);
            
            var dot = this.doc().circle(5);
            dots.add(dot);
            var x = 0;
            var y = 0;
            var across = 11;
            var down = 6;
            for (var h=0; h<down; h++) {
                for (var i=0; i<across; i++) {
                    dots.add(dot.clone().move(x, y));
                    /*jshint expr:true */
                    (i < (across-1)) ? x += 14 : x = 0;
                }
                y += 16;
            }

            this.add(dots);
            return this;
        },
    },
    construct: {
        sagMill: function() {
            return this.put(new SVG.SAGMill).build().go();
        }
    }
});

SVG.extend(SVG.SAGMill, {
    go: function() {
        this.spinner.animate(1500, '-', 0).attr({'stroke-dashoffset': 0 }).loop();
        return this;
    },
    pause: function() {
        this.spinner.pause();
        return this;
    },
    play: function() {
        this.spinner.play();
        return this;
    }
});
