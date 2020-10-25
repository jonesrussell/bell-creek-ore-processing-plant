

SVGjsAnim.prototype.setupConveyors = function () {
  var conveyors = this.draw
    .group()
    .move(214, 0)
    .attr({ id: "conveyor-wheels" })
    .scale(1);

  // Truck Dump
  conveyors.add(this.drawBigConveyorWheel(684, 439));
  conveyors.add(this.drawBigConveyorWheel(760, 439));
  conveyors.add(this.drawBigConveyorWheel(791, 439));
  conveyors.add(this.drawBigConveyorWheel(1186, 342));

  // Crusher
  conveyors.add(this.drawBigConveyorWheel(1216, 447.5));
  conveyors.add(this.drawBigConveyorWheel(1661, 333));

  // Ore Storage Dome
  conveyors.add(this.drawSmallConveyorWheel(1554, 452.5));
  conveyors.add(this.drawSmallConveyorWheel(1615, 452.5));
  conveyors.add(this.drawSmallConveyorWheel(1643, 452.5));
  conveyors.add(this.drawSmallConveyorWheel(1704, 452.5));
  conveyors.add(this.drawSmallConveyorWheel(1730, 452.5));
  conveyors.add(this.drawSmallConveyorWheel(1791, 452.5));

  conveyors.add(this.drawBigConveyorWheel(1558, 496.5));
  conveyors.add(this.drawBigConveyorWheel(1995, 345.5));

  // Mill
  conveyors.add(this.drawSmallConveyorWheel(1976, 386.5));
  conveyors.add(this.drawSmallConveyorWheel(2036, 386.5));

  return conveyors;
};

SVGjsAnim.prototype.drawSmallConveyorWheel = function (x, y) {
  return this.draw
    .image("images/conveyor_wheel.svg", 8, 9)
    .attr("class", "conveyor-wheel")
    .move(x, y);
};

SVGjsAnim.prototype.drawBigConveyorWheel = function (x, y) {
  return this.drawSmallConveyorWheel(x, y).size(10, 11);
};

SVGjsAnim.prototype.conveyorGo = function () {
  var wheels = SVG.get("conveyor-wheels").children();
  for (var i = 0; i < wheels.length; i++) {
    wheels[i].animate(5000, "-", 0).rotate(360).loop();
  }
};
