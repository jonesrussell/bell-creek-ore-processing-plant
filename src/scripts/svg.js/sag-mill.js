/**
 * sag-mill.js
 */
SVG.SAGMill = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    build () {
      this.wheel();
      this.studded();

      return this;
    },
    wheel () {
      this.spinner = this.doc()
        .line(0, 0, 0, 145)
        .attr({
          stroke: "#a7d5e0",
          "stroke-width": 23.5,
          "stroke-dasharray": 10,
          "stroke-dashoffset": 100,
        })
        .move(264.5, 432);
      this.add(this.spinner);
      return this;
    },
    studded () {
      var dots = this.doc().group().move(295, 460);

      var dot = this.doc().circle(5);
      dots.add(dot);
      var x = 0;
      var y = 0;
      var across = 11;
      var down = 6;
      for (var h = 0; h < down; h++) {
        for (var i = 0; i < across; i++) {
          dots.add(dot.clone().move(x, y));
          x += i < across - 1 ? 14 : 0;
        }
        y += 16;
      }

      this.add(dots);
      return this;
    },
  },
  construct: {
    sagMill () {
      return this.put(new SVG.SAGMill()).build().go();
    },
  },
});

SVG.extend(SVG.SAGMill, {
  go () {
    this.spinner.animate(1500, "-", 0).attr({ "stroke-dashoffset": 0 }).loop();
    return this;
  },
  pause () {
    this.spinner.pause();
    return this;
  },
  play () {
    this.spinner.play();
    return this;
  },
});
