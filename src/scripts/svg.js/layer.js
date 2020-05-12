

(function () {
  SVG.Layer = SVG.invent({
    create: "svg",
    inherit: SVG.Nested,
    construct: {
      layer (objects, x, y) {
        return this.put(new SVG.Layer()).build(objects, x, y);
      },
      build (objects, x, y) {
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
      addToInner (o) {
        this.innerLayer.add(o);
        return this;
      },
      moveInner (x, y) {
        this.innerLayer.move(x, y);
        return this;
      },
    },
  });
}.call(this));
