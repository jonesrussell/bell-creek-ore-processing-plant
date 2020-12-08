

SVG.StirStick = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    preload () {
      window.mill.imgStirStick = "images/solution.svg";
      window.mill.images.push(window.mill.imgStirStick);
      window.mill.preload();
      return this;
    },
    build (x, y) {
      this.move(x, y);
      this.stick = window.mill.draw.image(window.mill.imgStirStick, 84, 139);
      this.add(this.stick);
      this.add(
        window.mill.draw.line(42, 0, 42, 117).stroke({ width: 6,
color: "#000" })
      );

      return this;
    },
    spin () {
      this.stick.animate(750).scale(-1, 1).translate(84, 0).loop();

      return this;
    },
  },
  construct: {
    stirStick (x, y) {
      return this.put(new SVG.StirStick()).preload().build(x, y);
    },
  },
});
