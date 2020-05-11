/**
 * ore-animation.js
 */
function OreAnimation(scene, obj, paths) {
  this.loop = false;
  if (typeof arguments[3] !== "undefined" && arguments[3] === true) {
    this.loop = true;
  }

  this.obj = obj;
  this.paths = paths;
  this.pathsCopy = JSON.parse(JSON.stringify(paths));
  scene.add(this.obj);

  this.startX = obj.x();
  this.startY = obj.y();
}

OreAnimation.prototype.animate = function () {
const oreAnim = this;
  let path = oreAnim.paths.shift();
  if (typeof path === "undefined") {
    if (!oreAnim.loop) {
      return;
    }
    oreAnim.obj.move(oreAnim.startX, oreAnim.startY);
    oreAnim.paths = JSON.parse(JSON.stringify(oreAnim.pathsCopy));
    path = oreAnim.paths.shift();
  }

  oreAnim.obj
    .animate(path.t, "-", 0)
    .move(path.x, path.y)
    .after(function () {
      oreAnim.animate();
    });
};
