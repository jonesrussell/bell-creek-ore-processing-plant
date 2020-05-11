// Wonderful video overlay lifted from:
// https://github.com/codrops/FullscreenOverlayStyles

/**
 * overlay.js
 */
window.addEventListener("load", function () {
  function toggleOverlay() {
    if (classie.has(overlay, "open")) {
      classie.remove(overlay, "open");
      classie.add(overlay, "close");
      var onEndTransitionFn = function (ev) {
        if (support.transitions) {
          if (ev.propertyName !== "visibility") {
            return;
          }
          this.removeEventListener(transEndEventName, onEndTransitionFn);
        }
        classie.remove(overlay, "close");

        // @TODO move this elsewhere
        //                var activeVideo = document.querySelectorAll('.video-container .active')[0];
        const activeVideo = window.mill.activeVideo;
        if (typeof activeVideo !== "undefined") {
          activeVideo.pause();
          //                    activeVideo.currentTime = 0;
        }

        //    var videos = document.getElementsByTagName('video');
        //    var clickClose = function(){ closeBttn.click(); };
        //    for (var i=0; i<videos.length; i++) {
        //        videos[i].addEventListener('ended', clickClose);
        //    }*/
      };
      if (support.transitions) {
        overlay.addEventListener(transEndEventName, onEndTransitionFn);
      } else {
        onEndTransitionFn();
      }
    } else if (!classie.has(overlay, "close")) {
      classie.add(overlay, "open");
    }
  }

  var triggerBttn = document.getElementById("trigger-overlay"),
    overlay = document.querySelector("div.overlay"),
    closeBttn = overlay.querySelector("button.overlay-close"),
    transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd",
      msTransition: "MSTransitionEnd",
      transition: "transitionend",
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed("transition")],
    support = { transitions: Modernizr.csstransitions };

  triggerBttn.addEventListener("click", toggleOverlay);
  closeBttn.addEventListener("click", toggleOverlay);
});
