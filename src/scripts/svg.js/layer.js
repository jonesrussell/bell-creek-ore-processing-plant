"use strict";
/*global SVG */

(function () {
  SVG.Layer = SVG.invent({
    create: "svg",
    inherit: SVG.Nested,
    construct: {
      layer: function (objects, x, y) {
        return this.put(new SVG.Layer()).build(objects, x, y);
      },
      build: function (objects, x, y) {
        this.addClass("layer");
        this.size(x, y);
        this.innerLayer = this.doc().group().addClass("inner-layer");
        for (var o in objects) {
          this.addClass(o);
          this.innerLayer.add(objects[o]);
        }
        this.add(this.innerLayer);
        return this;
      },
      addToInner: function (o) {
        this.innerLayer.add(o);
        return this;
      },
      moveInner: function (x, y) {
        this.innerLayer.move(x, y);
        return this;
      },
    },
  });
}.call(this));
