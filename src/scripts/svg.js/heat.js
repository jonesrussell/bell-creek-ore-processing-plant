"use strict";
/*global SVG */

SVG.Heat = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    build: function (x, y) {
      this.heat = this.doc()
        .image("images/refinery/heat.svg", 65, 56)
        .move(x, y + 80);
      var rect = this.doc().rect(65, 80).move(x, y);
      this.heat.clipWith(rect);
      this.heat.animate(2000).move(x, y).opacity(0.5).loop();
      return this;
    },
  },
  construct: {
    heat: function (x, y) {
      return this.put(new SVG.Heat()).build(x, y).heat;
    },
  },
});
