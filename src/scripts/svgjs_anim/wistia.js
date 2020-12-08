SVGjsAnim.prototype.wistiaObjs = {};

SVGjsAnim.prototype.wistiaEmbed = function (id) {
  // eslint-disable-next-line no-undef
  return Wistia.embed(id, {
    videoFoam: true,
    videoQuality: "hd-only",
  }).bind("end", function () {
    // TODO pass in an object to click
    this.container.parentNode.parentNode.children[0].click();
  });
};
