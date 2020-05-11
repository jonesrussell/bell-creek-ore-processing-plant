/**
 * bullets.js
 */
SVGjsAnim.prototype.drawBullet = function (text, y, height, isLast) {
  var bullet = this.draw.group().attr({ class: "bullet" }).move(0, y);
  bullet.add(this.drawCircle(-5, 0));
  bullet.add(this.drawLine(0, 10, 0, height));
  bullet.add(this.drawText(text, 15, -5));
  if (!isLast) {
    bullet.add(this.drawCircle(-5, height));
  }
  return bullet;
};

SVGjsAnim.prototype.drawBulletPointer = function (text, x, y, len, cx, cy) {
  var bullet = this.drawBullet(text, x, y, len, false);
  bullet.add(this.drawCircle(cx, cy));
  bullet.add(this.drawLine(cx + 10, cy + 5, 1.5, cy + 5));
  return bullet;
};

SVGjsAnim.prototype.showBullets = function () {
  this.toggleBullets(1);
};

SVGjsAnim.prototype.hideBullets = function () {
  this.toggleBullets(0);
};

SVGjsAnim.prototype.toggleBullets = function (n) {
  const myBullets = this.bullets;
  for (const x in myBullets) {
    if (Object.prototype.hasOwnProperty.call(myBullets, x)) {
      myBullets[x].animate(1000).attr({ opacity: n });
    }
  }
};
