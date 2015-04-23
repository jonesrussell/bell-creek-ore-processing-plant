'use strict';
/*global SVG, mill */

;(function(){

// hack for zoom icons in IE
window.addEventListener('load', function() {
    var ua = window.navigator.userAgent;
    var ie = ((ua.indexOf('MSIE ') > -1) || (ua.indexOf('Trident/') > -1)) ? true : false;
    if ( ie ) {
        var css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = '.zoom-in { cursor: url(images/zoom-in.ico), pointer; -ms-cursor: pointer; }';
        css.innerHTML += '.zoom-out { cursor: url(images/zoom-out.ico), pointer; -ms-cursor: pointer; }';
        document.body.appendChild(css);
    }
}, false);

SVG.Zoom = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function(options) {
            var w = options.width;
            var h = options.height;
            this.id = options.id;
            this.zscale = options.scale;
            this.sceneScale = mill.sceneScale;
            this.zx = options.zx;
            this.zy = options.zy;

            var self = this;
            this.zoomer = this.doc().rect().size(w, h)
                .stroke('red')
                .fill('black')
                .opacity(0)
//                .opacity(0.1)
                .click(function(){
                    if (self.zoomed) {
                        self.zoomOut();
                    } else {
                        self.zoomIn();
                    }
                })
                .data({ id: 'zoom-' + this.id })
                .addClass('zoom-in');
            this.add(this.zoomer);
            return this;
        }
    },
    construct: {
        zoom: function(options) {
            return this.put(new SVG.Zoom).build(options);
        }
    }
});

SVG.extend(SVG.Zoom, {
     video: function(x, y) {
        var self = this;
        this.videoRect = this.doc().rect()
            .size(80, 40)
            .move(x, y)
            .stroke('#0000ff')
            .opacity(0)
//                .opacity(0.5)
            .addClass('action')
            .hide()
            .on('click', function(){
                var c = self.parent.children();
                for (var i=0; i<c.length; i++) {
                    if (c[i].hasClass('heading')) {
                        c[i].play();
                    }
                }
            });
        this.add(this.videoRect);
        return this;
    },
    showVideo: function() {
        this.videoRect.show();
        return this;
    },
    hideVideo: function() {
        this.videoRect.hide();
        return this;
    },
    zoomIn: function() {
        mill.currentStep = this;
        this.zoomed = true;
        this.stepX = this.zx;
        this.stepY = this.zy;
        this.stepScale = this.zscale;
        this.zoomer.removeClass('zoom-in')
            .addClass('zoom-out');
        this.showVideo();
        this.toggleExtras();
        this.stepTo();
        return this;
    },
    zoomOut: function() {
        mill.currentStep = 0;
        this.zoomed = false;
        this.zoomer.removeClass('zoom-out')
            .addClass('zoom-in');
        this.hideVideo();
        this.toggleExtras();
        mill.resetCamera();
        return this;
    },
    toggleExtras: function() {
        if (this.zoomed) {
            // @TODO put these in functions
            for (var x in mill.bullets) {
                if (x !== this.id) { mill.bullets[x].animate(1000).attr({ opacity: 0 }); }
                else { mill.bullets[x].animate(1000).attr({ opacity: 1 }); }
            }
            for (var y in mill.headings) {
                if (y !== this.id) { mill.headings[y].animate(1000).attr({ opacity: 0 }); }
                else {
                    mill.headings[y].animate(1000).attr({ opacity: 1 });
                }
            }
        } else {
            mill.showBullets();
            mill.showHeadings();
        }
    },
    stepTo: function() {
      mill.scene
        .animate(1250)
        .scale(mill.calcScale(this.stepScale))
        .dx(mill.calcScale(this.stepX))
        .dy(mill.calcScale(this.stepY));
      return this;
    }
});

}).call(this);
