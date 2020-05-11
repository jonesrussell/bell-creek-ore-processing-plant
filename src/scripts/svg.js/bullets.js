/**
 * bullets.js
 */
SVG.Bullets = SVG.invent({
  create: 'g',
  inherit: SVG.G,
  extend: {
    build (txt, height) {
      this.bullets = [];

      this.attr({
        class: "bullets",
        opacity: 1,
      }).scale(window.mill.bulletScale);

      const amount = txt.length;
      let heightLast = null;

      if (amount === 1) {
        heightLast = height / 1;
        height /= 1;
      } else {
        height /= amount + 1;
        height += 10;
        heightLast = height * 2;
        heightLast -= 30;
      }

      let y = 0;
      for (let i = 0; i < txt.length; i++) {
        const isLast = i + 1 === amount;
        if (isLast) {
          height = heightLast;
        }
        this.add(this.bullet(txt[i], y, height, isLast));
        y += height;
      }

      return this;
    },
    bullet (txt, y, height) {
      var bullet = this.doc().group().attr({ class: "bullet" }).move(0, y);
      bullet.add(this.drawCircle(-5, 0));
      bullet.add(this.drawLine(0, 10, 0, height));
      bullet.add(this.drawText(txt, 15, -5));
      //            if (!isLast) { bullet.add(this.drawCircle(-5, height)); }
      bullet.add(this.drawCircle(-5, height));

      return bullet;
    },
    drawCircle (x, y) {
      return this.doc()
        .circle(10)
        .stroke({
          width: 3,
          color: "#939598"
        })
        .fill("none")
        .move(x, y);
    },
    drawLine (x1, y1, x2, y2) {
      return this.doc()
        .line(x1, y1, x2, y2)
        .stroke({
          width: 3,
          color: "#939598"
        });
    },
    drawText (t, x, y) {
      return this.doc()
        .text(t)
        .font({
          family: "Oswald",
          size: 13,
        })
        .move(x, y);
    }
  },
  construct: {
    bullets (txt, height) {
      return this.put(new SVG.Bullets()).build(txt, height);
    }
  }
});
