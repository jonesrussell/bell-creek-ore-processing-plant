/**
 * jaw-crusher.js
 */
SVG.JawCrusher = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    build () {
      this.attr({ id: "eq-jaw-crusher" }).move(
        window.mill.jawCrusherX,
        window.mill.jawCrusherY
      );
      this.jawCrusherLeft = window.mill.draw
        .image("images/jaw_crusher/crusher_left.svg", 35, 59)
        .move(0, 0);
      this.jawCrusherRight = window.mill.draw
        .image("images/jaw_crusher/crusher_right.svg", 44, 80)
        .move(42, -22);
      var jawCrusherCircle = window.mill.draw
        .image("images/jaw_crusher/crusher_circle.svg", 55, 55)
        .move(45, -37);
      this.add(this.jawCrusherLeft)
        .add(jawCrusherCircle)
        .add(this.jawCrusherRight);

      return this;
    },
  },
  construct: {
    jawCrusher () {
      return this.put(new SVG.JawCrusher()).build();
    },
  },
});

SVG.extend(SVG.JawCrusher, {
  go () {
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
  open () {
    var defer = Q.defer();
    this.jawCrusherRight
      .animate(250)
      .transform({ rotation: 0,
x: 0,
y: 0 })
      .after(function () {
        defer.resolve();
      });
    return defer.promise;
  },
  close () {
    var defer = Q.defer();
    this.jawCrusherRight
      .animate(250)
      .transform({ rotation: 4,
x: -2,
y: 2 })
      .after(function () {
        defer.resolve();
      });
    return defer.promise;
  },
});
