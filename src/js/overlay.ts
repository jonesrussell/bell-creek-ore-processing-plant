/**
 * overlay.js
 *
 * Wonderful video overlay lifted from:
 * https://github.com/codrops/FullscreenOverlayStyles
 */
window.addEventListener("load", () => {
  const toggleOverlay = () => {
    if (overlay?.classList.contains("open")) {
      overlay?.classList.remove("open");
      overlay?.classList.add("close");

      const onEndTransitionFn = function (ev: any) {
        console.log('ev', ev);
        console.log('typeof ev', typeof ev);

        if (support?.transitions) {
          if (ev.propertyName !== "visibility") {
            return;
          }

          this.removeEventListener(transEndEventName, onEndTransitionFn);
        }

        overlay?.classList.remove("close");

        // TODO move this elsewhere
        const activeVideo = window.mill?.activeVideo;
        activeVideo?.pause();
        // activeVideo?.currentTime = 0; // rewind
      };

      if (support.transitions) {
        overlay.addEventListener(transEndEventName, onEndTransitionFn);
      } else {
        onEndTransitionFn();
      }
    } else if (!overlay?.classList.contains("close")) {
      overlay?.classList.add("open");
    }
  }

  const triggerBttn = document.querySelector(".trigger-overlay");
  const overlay = document.querySelector("div.overlay");
  const closeBttn = overlay?.querySelector("button.overlay-close");

  const transEndEventNames = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    msTransition: "MSTransitionEnd",
    transition: "transitionend",
  };
  const transEndEventName = transEndEventNames.transition;
  const support = { transitions: true };

  triggerBttn?.addEventListener("click", toggleOverlay);
  closeBttn?.addEventListener("click", toggleOverlay);
});
