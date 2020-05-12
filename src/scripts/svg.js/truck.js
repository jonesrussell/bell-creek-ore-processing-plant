

SVG.Truck = SVG.invent({
  create: "g",
  inherit: SVG.G,
  extend: {
    build (x, y) {
      this.startX = x;
      this.startY = y;
      this.move(x, y);
      this.driveDuration = 13000;

      var truckBody = this.doc().image("images/truck/truck_body.svg", 141, 69);

      this.truckBox = this.doc().group();
      this.truckBucket = this.doc()
        .image("images/truck/truck_dump.svg", 117, 51)
        .move(39, -10);
      this.truckTire1 = this.doc()
        .image("images/truck/truck_tires.svg", 28, 28)
        .move(18, 34);
      this.truckTire2 = this.truckTire1.clone().move(105, 34);

      this.orePile = this.doc()
        .image("images/ore/ore_pile_1.svg", 58, 21)
        .move(60, -25);

      this.oreClip = this.doc().ellipse(75, 50);
      this.add(this.oreClip);
      this.orePile.clipWith(this.oreClip);

      this.truckBox.add(this.orePile);

      this.truckBox.add(this.truckBucket);

      this.add(truckBody)
        .add(this.truckBox)
        .add(this.truckTire1)
        .add(this.truckTire2);

      return this;
    },
    setDumpAt (x, y) {
      this.dumpAtX = x;
      this.dumpAtY = y;
      return this;
    },
  },
  construct: {
    truck (x, y) {
      return this.put(new SVG.Truck()).build(x, y);
    },
  },
});

SVG.extend(SVG.Truck, {
  go () {
    this.showOre();
    var self = this;
    this.travel(self)
      .then(function () {
        return self.up();
      })
      .then(function () {
        return self.dump();
      })
      .then(function () {
        return self.down();
      })
      .then(function () {
        return self.leave();
      })
      .done(function () {
        self.go();
      });
    return this;
  },
  travel () {
    var defer = Q.defer();

    this.truckTire1.animate(this.driveDuration).rotate(600);
    this.truckTire2.animate(this.driveDuration).rotate(600);

    this.animate(this.driveDuration)
      .move(this.dumpAtX, this.dumpAtY)
      .after(function () {
        defer.resolve();
      });

    return defer.promise;
  },
  up () {
    var defer = Q.defer();
    this.truckBox
      .animate(1000)
      .transform({
        rotation: 10,
        x: 5,
        y: -2,
      })
      .after(function () {
        defer.resolve();
      });
    return defer.promise;
  },
  dump () {
    this.oreClipDump();
    return this.orePileDump();
  },
  down () {
    this.orePileReset();
    var defer = Q.defer();

    this.truckBox
      .animate(1000)
      .transform({
        rotation: 0,
        x: 0,
        y: 0,
      })
      .after(function () {
        defer.resolve();
      });

    return defer.promise;
  },
  leave () {
    var defer = Q.defer();

    this.truckTire1.animate(this.driveDuration).rotate(-600);
    this.truckTire2.animate(this.driveDuration).rotate(-600);
    this.animate(this.driveDuration)
      .move(this.startX, this.startY)
      .after(function () {
        defer.resolve();
      });

    return defer.promise;
  },
  showOre () {
    this.oreClip.transform({ x: 60,
y: -27.5 });
    return this;
  },
  oreClipDump () {
    this.oreClip.animate(2000).transform({ x: -150,
y: -60 });
    return this;
  },
  orePileReset () {
    this.orePile.transform({
      rotation: 0,
      x: 0,
      y: 0,
    });
  },
  orePileDump () {
    var defer = Q.defer();
    this.orePile
      .animate(1000)
      .transform({
        rotation: 0,
        x: 150,
        y: 60,
      })
      .after(function () {
        defer.resolve();
      });

    return defer.promise;
  },
});
