/**
 * heading.js
 */
SVG.Heading = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build (headingText, video) {
      this.video = video;
      this.addClass('heading');
      this.add(this.doc().image('images/heading.svg', 349, 89));
      const text = this.doc()
        .text(headingText)
        .attr({ fill: '#fff' })
        .font({ family: 'Oswald',
size: 28 })
        .move(15, 23);
      this.add(text);

      const videoGroup = this.doc().group().addClass('clickable');

      const icon = this.doc().image('images/video.svg', 24, 17).move(250, 27);
      videoGroup.add(icon);

      const videoTxt = this.doc()
        .text('VIDEO')
        .attr({ fill: '#ddd' })
        .font({
          family: 'Oswald',
          size: 18
        })
        .move(285, 27);
      videoGroup.add(videoTxt);

      this.add(videoGroup);

      return this;
    },
  },
  construct: {
    heading (headingText, video) {
      return this.put(new SVG.Heading()).build(headingText, video);
    },
  },
});

SVG.extend(SVG.Heading, {
  play () {
    var overlay = document.querySelector('.overlay');
    var overlayActive = overlay.querySelector('.active');
    if (overlayActive !== null) {
      classie.remove(overlayActive, 'active');
    }

    //var video = document.getElementById(this.data('videoId'));
    classie.add(this.video.container, 'active');
    window.mill.activeVideo = this.video;
    this.video.play();

    document.getElementById('trigger-overlay').click();
    //event.stopPropagation();
    return this;
  },
});

SVGjsAnim.prototype.showHeadings = function () {
  this.toggleHeadings(1);
};

SVGjsAnim.prototype.hideHeadings = function () {
  this.toggleHeadings(0);
};

SVGjsAnim.prototype.toggleHeadings = function (n) {
  const myHeadings = this.headings;
  for (var x in myHeadings) {
    if (Reflect.apply(myHeadings, x)) {
      myHeadings[x].animate(1000).attr({ opacity: n });
    }
  }
};
