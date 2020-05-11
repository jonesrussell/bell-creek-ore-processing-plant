"use strict";
/*global SVG */

SVG.Slurry = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    build: function (id) {
      this.lines = {};
      this.attr({ id: id })
        .buildTableConcentrator()
        .buildThickenerCyclone()
        .buildThickenerStrip()
        .buildBarrenHeat()
        .buildHeatStrip()
        .buildStripEW()
        .buildEWPan();
      return this;
    },
    go: function () {
      this.goTableConcentrator()
        .goThickenerCyclone()
        .goThickenerStrip()
        .goBarrenHeat()
        .goHeatStrip()
        .goStripEW()
        .goEWPan();
      return this;
    },
  },
  construct: {
    slurry: function (id) {
      return this.put(new SVG.Slurry()).build(id);
    },
  },
});

// Table
SVG.extend(SVG.Slurry, {
  buildTableConcentrator: function () {
    var id = "table-concentrator";
    var raw =
      '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="' +
      id +
      '" fill="none" stroke="#BA8E2D" stroke-width="4" stroke-miterlimit="10" d="M1298 707.928v-17.95l16.333-30.544h62V631.67H3676"/></svg>';
    this.lines[id] = this.buildLine(raw, id, 1025);
    return this;
  },
  goTableConcentrator: function () {
    this.goLine(this.lines["table-concentrator"], 5000);
    return this;
  },
});

// Thickener from Cyclone
SVG.extend(SVG.Slurry, {
  buildThickenerCyclone: function () {
    var id = "thickener-cyclone";
    var raw =
      '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="' +
      id +
      '" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M3294.133 837.67v-69.797H3676"/></svg>';
    this.lines[id] = this.buildLine(raw, id, 1025);
    return this;
  },
  goThickenerCyclone: function () {
    this.goLine(this.lines["thickener-cyclone"], 5000);
    return this;
  },
});

// Thickener to Strip
SVG.extend(SVG.Slurry, {
  buildThickenerStrip: function () {
    var id = "thickener-strip";
    var raw =
      '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="' +
      id +
      '" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M1765.667 799.86v-19.41h260.327V995h139.473V846.325h260.2V924h99.097V807.874h40.285V967.93h138.57V807.872H2744V967.93h139.19V807.872H2924V967.93h139.052V807.872h40.833V967.93h190.248v-75.962"/></svg>';
    this.lines[id] = this.buildLine(raw, id, 1025);
    return this;
  },
  goThickenerStrip: function () {
    this.goLine(this.lines["thickener-strip"], 5000);
    return this;
  },
});

// Barren Tank to Heat Exchanger
SVG.extend(SVG.Slurry, {
  buildBarrenHeat: function () {
    var id = "barren-heat";
    var raw =
      '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.94" viewBox="0 0 3676 1255.94"><path id="' +
      id +
      '" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M1975.23 995h-70.93V883.8h-18.576"/></svg>';
    this.lines[id] = this.buildLineReverse(raw, id, 1025);
    return this;
  },
  goBarrenHeat: function () {
    this.goLineReverse(this.lines["barren-heat"], 5000);
    return this;
  },
});

// Heat Exchanger to Strip
SVG.extend(SVG.Slurry, {
  buildHeatStrip: function () {
    var id = "heat-strip";
    var raw =
      '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="' +
      id +
      '" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M1755.27 960.376V995h69.723V883.8h18.575"/></svg>';
    this.lines[id] = this.buildLine(raw, id, 1025);
    return this;
  },
  goHeatStrip: function () {
    this.goLine(this.lines["heat-strip"], 5000);
    return this;
  },
});

// Strip Column to EW
SVG.extend(SVG.Slurry, {
  buildStripEW: function () {
    var id = "strip-ew";
    var raw =
      '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="' +
      id +
      '" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M1745.68 802.04v-21.59h-82.475V925h-289.223"/></svg>';
    this.lines[id] = this.buildLineReverse(raw, id, 1025);
    return this;
  },
  goStripEW: function () {
    this.goLineReverse(this.lines["strip-ew"], 5000);
    return this;
  },
});

// Strip Column to EW
SVG.extend(SVG.Slurry, {
  buildEWPan: function () {
    var id = "ew-pan";
    var raw =
      '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="' +
      id +
      '" fill="none" stroke="#BA8E2D" stroke-width="4" stroke-miterlimit="10" d="M1104.674 925h-31.507v55.107"/></svg>';
    this.lines[id] = this.buildLineReverse(raw, id, 1025);
    return this;
  },
  goEWPan: function () {
    this.goLineReverse(this.lines["ew-pan"], 5000);
    return this;
  },
});

/***********
 * Helpers *
 ***********/
SVG.extend(SVG.Slurry, {
  getObjFromRaw: function (raw, id) {
    var rawObj = this.doc().svg(raw);
    var obj = rawObj.get(id);
    rawObj.remove();
    return obj;
  },
  buildLine: function (raw, id, l) {
    var line = {};
    line.l = l;
    line.obj = this.getObjFromRaw(raw, id);
    line.obj.attr({
      "stroke-dasharray": l,
      "stroke-dashoffset": -l,
    });
    this.add(line.obj);
    return line;
  },
  goLine: function (line, time) {
    line.obj.animate(time, "-", 0).attr({ "stroke-dashoffset": line.l }).loop();
    return this;
  },
  buildLineReverse: function (raw, id, l) {
    var line = {};
    line.l = l;
    line.obj = this.getObjFromRaw(raw, id);
    line.obj.attr({
      "stroke-dasharray": l,
      "stroke-dashoffset": l,
    });
    this.add(line.obj);
    return line;
  },
  goLineReverse: function (line, time) {
    line.obj
      .animate(time, "-", 0)
      .attr({ "stroke-dashoffset": -line.l })
      .loop();
    return this;
  },
});
