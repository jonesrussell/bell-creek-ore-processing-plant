"use strict";
/*global SVG, mill, Q */

SVG.JawCrusher = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    build: function () {
      this.attr({ id: "eq-jaw-crusher" }).move(
        mill.jawCrusherX,
        mill.jawCrusherY
      );
      this.jawCrusherLeft = mill.draw
        .image("images/jaw_crusher/crusher_left.svg", 35, 59)
        .move(0, 0);
      this.jawCrusherRight = mill.draw
        .image("images/jaw_crusher/crusher_right.svg", 44, 80)
        .move(42, -22);
      var jawCrusherCircle = mill.draw
        .image("images/jaw_crusher/crusher_circle.svg", 55, 55)
        .move(45, -37);
      this.add(this.jawCrusherLeft)
        .add(jawCrusherCircle)
        .add(this.jawCrusherRight);

      return this;
    },
  },
  construct: {
    jawCrusher: function () {
      return this.put(new SVG.JawCrusher()).build();
    },
  },
});

SVG.extend(SVG.JawCrusher, {
  go: function () {
    var self = this;
    this.open(self)
      .then(function () {
        return self.close();
      })
      .done(function () {
        self.go();
      });
    return this;
  },
  open: function () {
    var defer = Q.defer();
    this.jawCrusherRight
      .animate(250)
      .transform({ rotation: 0, x: 0, y: 0 })
      .after(function () {
        defer.resolve();
      });
    return defer.promise;
  },
  close: function () {
    var defer = Q.defer();
    this.jawCrusherRight
      .animate(250)
      .transform({ rotation: 4, x: -2, y: 2 })
      .after(function () {
        defer.resolve();
      });
    return defer.promise;
  },
});
