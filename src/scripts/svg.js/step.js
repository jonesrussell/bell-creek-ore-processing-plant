"use strict";
/*global SVG */

(function () {
  SVG.Step = SVG.invent({
    create: "g",
    inherit: SVG.G,
    extend: {
      build: function (id) {
        this.scene = {};
        this.heading = {};
        this.zoom = {};
        this._content = this.doc().group().addClass("content");
        this.add(this._content);

        this.attr({ id: id });
        this.addClass("step");
        return this;
      },
      setHeading: function (heading) {
        this.add(heading);
        return this;
      },
      setZoom: function (zoom) {
        this.zoom = zoom;
        this.add(zoom);
        return this;
      },
      setScene: function (scene) {
        this.scene = scene;
        return this;
      },
      content: function (o) {
        this._content.add(o);
        return this;
      },
    },
    construct: {
      step: function (id) {
        return this.put(new SVG.Step()).build(id);
      },
    },
  });
}.call(this));
