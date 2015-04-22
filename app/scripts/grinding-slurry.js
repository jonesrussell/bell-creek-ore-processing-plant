'use strict';
/*global SVG */

SVG.GrindingSlurry = SVG.invent({
    create: 'g',
    inherit: SVG.G,
    extend: {
        build: function(id) {
            this.lines = {};
            this.attr({ id: id })
                .buildConcentratorTable()
                .buildSAGToCyclone()
                .buildCycloneToThickener()
                .buildMill10()
                .buildMill90()
                .buildCycloneKnelson();
            return this;
        },
        go: function() {
            this.goSAGToCyclone()
                .goConcentratorTable()
                .goCycloneToThickener()
                .goMill10()
                .goMill90()
                .goCycloneKnelson();
            return this;
        }
    },
    construct: {
        grindingSlurry: function(id) {
            return this.put(new SVG.GrindingSlurry)
                .build(id);
        }
    }
});

// SAG to Cyclone 
SVG.extend(SVG.GrindingSlurry, {
    buildSAGToCyclone: function() {
        var id = 'sag-to-cyclone';
        var raw = '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="'+id+'" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M2595 263.895v116.348h-60.5"/></svg>';
        this.lines[id] = this.buildLine(raw, id, 551);
        return this;
    },
    goSAGToCyclone: function() {
        this.goLine(this.lines['sag-to-cyclone'], 3000);
        return this;
    }
});

// Knelson to Table
SVG.extend(SVG.GrindingSlurry, {
    buildConcentratorTable: function() {
        var id = 'knelson-pipe';
        var raw = '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="'+id+'" fill="none" stroke="#BA8E2D" stroke-width="4" stroke-miterlimit="10" d="M3676 303.895H2331.973v-16.927"/></svg>';
        this.lines[id] = this.buildLine(raw, id, 1652);
        return this;
    },
    goConcentratorTable: function() {
        this.goLine(this.lines['knelson-pipe'], 4000);
        return this;
    }
});

// Cyclone to Thickener
SVG.extend(SVG.GrindingSlurry, {
    buildCycloneToThickener: function() {
        var id = 'cyclone-to-thickener';
        var raw = '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="'+id+'" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M3676 188.62H2595v29.348"/></svg>';
        this.lines[id] = this.buildLine(raw, id, 1051);
        return this;
    },
    goCycloneToThickener: function() {
        this.goLine(this.lines['cyclone-to-thickener'], 5000);
        return this;
    }
});

// Mill GrindingSlurry 10
SVG.extend(SVG.GrindingSlurry, {
    buildMill10: function() {
        var id = 'mill-10';
        var raw = '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="'+id+'" fill="none" stroke="#939598" stroke-width="2" stroke-miterlimit="10" d="M2297.402 361.535v-89.788h16.88"/></svg>';
        this.lines[id] = this.buildLine(raw, id, 105);
        return this;
    },
    goMill10: function() {
        this.goLine(this.lines['mill-10'], 1250);
        return this;
    }
});

// Mill GrindingSlurry 90
SVG.extend(SVG.GrindingSlurry, {
    buildMill90: function() {
        var id = 'mill-90';
        var raw = '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="'+id+'" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M2279.402 361.535V248.747h296.265"/></svg>';
        this.lines[id] = this.buildLine(raw, id, 410);
        return this;
    },
    goMill90: function() {
       this.goLine(this.lines['mill-90'], 3000);
       return this;
    }
});

// Cyclone to Knelson 
SVG.extend(SVG.GrindingSlurry, {
    buildCycloneKnelson: function() {
        var id = 'cyclone-knelson';
        var raw = '<svg xmlns="http://www.w3.org/2000/svg" width="3676" height="1255.939" viewBox="0 0 3676 1255.939"><path id="'+id+'" fill="none" stroke="#939598" stroke-width="4" stroke-miterlimit="10" d="M2331.973 263.895v-15.148h246.36"/></svg>';
        this.lines[id] = this.buildLine(raw, id, 500);
        return this;
    },
    goCycloneKnelson: function() {
        this.goLine(this.lines['cyclone-knelson'], 2500);
        return this;
    }
});

/***********
 * Helpers *
 ***********/
SVG.extend(SVG.GrindingSlurry, {
    getObjFromRaw: function(raw, id) {
        var rawObj = this.doc().svg(raw);
        var obj = rawObj.get(id);
        rawObj.remove();
        return obj;
    },
    buildLine: function(raw, id, l) {
        var line = {};
        line.l = l;
        line.obj = this.getObjFromRaw(raw, id);
        line.obj.attr({
            'stroke-dasharray': l,
            'stroke-dashoffset': -(l)
        });
        this.add(line.obj);
        return line;
    },
    goLine: function(line, time) {
        line.obj.animate(time, '-', 0)
            .attr({ 'stroke-dashoffset': line.l })
            .loop();
        return this;
    }
});

