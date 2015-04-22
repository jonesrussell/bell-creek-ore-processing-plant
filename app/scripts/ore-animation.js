'use strict';
/*global mill */

/*****************
 * Ore Animation *
 *****************/
function OreAnimation(scene, obj, paths)
{
    this.loop = false;
    if (typeof arguments[3] !== 'undefined' && arguments[3] === true)
    {
        this.loop = true;
    }

    this.obj = obj;
    this.paths = paths;
//    this.pathsCopy = $.extend(true, [], paths);
    this.pathsCopy = JSON.parse(JSON.stringify(paths));
    scene.add(this.obj);

    this.startX = obj.x();
    this.startY = obj.y();
}

OreAnimation.prototype.animate = function()
{
    var path = this.paths.shift();
    if (typeof(path) === 'undefined')
    {
        if (!this.loop) { return; }
        this.obj.move(this.startX, this.startY);
//        this.paths = $.extend(true, [], this.pathsCopy);
        this.paths = JSON.parse(JSON.stringify(this.pathsCopy));
        path = this.paths.shift();
    }

    var oreAnim = this;
//    console.log(path);
    this.obj.animate(path.t, '-', 0)
        .move(path.x, path.y)
        .after(function(){
            oreAnim.animate();
        });
};

