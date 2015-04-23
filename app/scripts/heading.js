'use strict';
/*global SVG, SVGjsAnim, classie, mill */

SVG.Heading = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function(headingText, video) {
            this.video = video;
            this.addClass('heading');
            this.add(this.doc().image('images/heading.svg', 349, 89));
            var text = this.doc().text(headingText)
                .attr({ fill: '#fff' })
                .font({ family: 'Oswald', size: 28 })
                .move(15, 23);
            this.add(text);

            var videoGroup = this.doc().group()
                .addClass('clickable');

            var icon = this.doc().image('images/video.svg', 24, 17)
                .move(250, 27);
            videoGroup.add(icon);

            var videoTxt = this.doc().text('VIDEO')
                .attr({ fill: '#ddd' })
                .font({ family: 'Oswald', size: 18 })
                .move(285, 27);
            videoGroup.add(videoTxt);

            this.add(videoGroup);

            return this;
        }
    },
    construct: {
        heading: function(headingText, video) {
            return this.put(new SVG.Heading).build(headingText, video);
        }
    }
});

SVG.extend(SVG.Heading, {
     play: function() {
        var overlay = document.querySelector('.overlay');
        var overlayActive = overlay.querySelector('.active');
        if (overlayActive !== null) {
            classie.remove(overlayActive, 'active');
        }

        //var video = document.getElementById(this.data('videoId'));
        classie.add(this.video.container, 'active');
        mill.activeVideo = this.video;
        this.video.play();

        document.getElementById('trigger-overlay').click();
        //event.stopPropagation();
        return this;
    }
});

SVGjsAnim.prototype.showHeadings = function()
{
    this.toggleHeadings(1);
};

SVGjsAnim.prototype.hideHeadings = function()
{
    this.toggleHeadings(0);
};

SVGjsAnim.prototype.toggleHeadings = function(n)
{
    for (var x in this.headings) {
        this.headings[x].animate(1000).attr({ opacity: n } );
    }
};

