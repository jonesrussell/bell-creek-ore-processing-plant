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


/******************
 * Pipe Animation *
 ******************/
function PipeAnimation(scene, paths)
{
    this.loop = false;
    if (typeof arguments[3] !== 'undefined' && arguments[3] === true) { this.loop = true; }

    this.scene = scene;
    this.paths = paths;
    this.pathsCopy = $.extend(true, [], paths);
}

PipeAnimation.prototype.fill = '#939598';

PipeAnimation.prototype.thickness = 5;

PipeAnimation.prototype.animate = function()
{
    var path = this.paths.shift();
    if (typeof(path) === 'undefined')
    {
        if (!this.loop) { return; }
        this.paths = $.extend(true, [], this.pathsCopy);
        path = this.paths.shift();
    }
    
    // @TODO PipeAnimation has it's own draw?
    // Draw the pipe starting point
    var pipe = mill.draw.rect(1, this.thickness)
                    .move(path.x, path.y)
                    .fill(this.fill);
    this.scene.add(pipe);

    // Let it flow
    var pipeAnim = this;
    pipe.rotate(path.r);
    pipe.animate(path.t, '-', 0)
        .size(path.l, this.thickness)
        .after(function(){
            pipeAnim.animate();
        });
};


