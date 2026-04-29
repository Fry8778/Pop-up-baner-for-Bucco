(function () {
  var style = document.createElement("style");
  style.innerHTML = `
    body { overflow-x: hidden !important; position: relative !important; }
    #__telerWdTriggerContent { left: 20px !important; right: auto !important; }
    .teler-wd { left: 0px !important; right: auto !important; }
    .teler-wd__stepper { left: 20px !important; right: auto !important; }
  `;
  document.head.appendChild(style);

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function isLandscapeMobile() {
    return window.matchMedia("(max-width: 900px) and (orientation: landscape)")
      .matches;
  }

  function fixTelerBase() {
    const trigger = document.querySelector("#__telerWdTriggerContent");
    const root = document.querySelector(".teler-wd");
    const popup = document.querySelector(".teler-wd__stepper");
    if (!trigger) return;
    trigger.style.setProperty("left", "20px", "important");
    trigger.style.setProperty("right", "auto", "important");
    if (!isMobile() && !isLandscapeMobile()) {
      if (root) {
        root.style.setProperty("left", "0px", "important");
        root.style.setProperty("right", "auto", "important");
      }
      if (popup) {
        popup.style.setProperty("left", "20px", "important");
        popup.style.setProperty("right", "auto", "important");
      }
    } else {
      if (root) {
        root.style.removeProperty("left");
        root.style.removeProperty("right");
      }
      if (popup) {
        popup.style.setProperty("left", "20px", "important");
        popup.style.setProperty("right", "auto", "important");
      }
    }
  }

  fixTelerBase();
  setTimeout(fixTelerBase, 300);
  setTimeout(fixTelerBase, 1200);

  document.addEventListener(
    "click",
    function (e) {
      if (!e.target.closest("#__telerWdTriggerContent")) return;
      setTimeout(fixTelerBase, 100);
      setTimeout(fixTelerBase, 400);
    },
    true,
  );

  let t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(fixTelerBase, 150);
  });
  window.addEventListener("orientationchange", function () {
    setTimeout(fixTelerBase, 350);
  });
})();
