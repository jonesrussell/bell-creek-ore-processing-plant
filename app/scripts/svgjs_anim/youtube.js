'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.youtubeObjs = {};

SVGjsAnim.prototype.youtubeEmbed = function(id) {
    return '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + id + '?si=06VDEVWarV-0B0sq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
};
