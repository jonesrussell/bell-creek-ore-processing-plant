'use strict';
/*global SVG, mill */

SVG.Bullets = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build: function (txt, height) {
      this.bullets = [];

      this.attr({
        class: "bullets",
        opacity: 1,
      }).scale(mill.bulletScale);

      var amount = txt.length;
      var heightLast = null;
      if (amount === 1) {
        height = heightLast = height / amount;
      } else {
        height = height / (amount + 1) + 10;
        heightLast = height * 2 - 30;
      }
      var y = 0;
      for (var i = 0; i < txt.length; i++) {
        var isLast = i + 1 === amount;
        if (isLast) {
          height = heightLast;
        }
        this.add(this.bullet(txt[i], y, height, isLast));
        y = y + height;
      }

      return this;
    },
    //        bullet: function(txt, y, height, isLast) {
    bullet: function (txt, y, height) {
      var bullet = this.doc().group().attr({ class: "bullet" }).move(0, y);
      bullet.add(this.drawCircle(-5, 0));
      bullet.add(this.drawLine(0, 10, 0, height));
      bullet.add(this.drawText(txt, 15, -5));
      //            if (!isLast) { bullet.add(this.drawCircle(-5, height)); }
      bullet.add(this.drawCircle(-5, height));

      return bullet;
    },
    drawCircle: function (x, y) {
      return this.doc()
        .circle(10)
        .stroke({ width: 3, color: "#939598" })
        .fill("none")
        .move(x, y);
    },
    drawLine: function (x1, y1, x2, y2) {
      return this.doc()
        .line(x1, y1, x2, y2)
        .stroke({ width: 3, color: "#939598" });
    },
    drawText: function (t, x, y) {
      return this.doc()
        .text(t)
        .font({
          family: "Oswald",
          size: 13,
        })
        .move(x, y);
    },
  },
  construct: {
    bullets: function (txt, height) {
      return this.put(new SVG.Bullets()).build(txt, height);
    },
  },
});
