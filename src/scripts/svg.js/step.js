/**
 * step.js
 */
SVG.Step = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    build(id) {
      this.scene = {};
      this.heading = {};
      this.zoom = {};
      this.myContent = this.doc().group().addClass("content");
      this.add(this.myContent);

      this.attr({ id });
      this.addClass("step");
      return this;
    },
    setHeading(heading) {
      this.add(heading);
      return this;
    },
    setZoom(zoom) {
      this.zoom = zoom;
      this.add(zoom);
      return this;
    },
    setScene(scene) {
      this.scene = scene;
      return this;
    },
    content(o) {
      this.myContent.add(o);
      return this;
    },
  },
  construct: {
    step(id) {
      return this.put(new SVG.Step()).build(id);
    },
  },
});
