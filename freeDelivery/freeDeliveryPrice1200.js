(function() {
  const freeShippingLimit = 1200;
  let progressContainer = null;
  let sumObserver = null;
  let domObserver = null;

  function createProgressBar() {
    const container = document.createElement("div");
    container.className = "free-shipping-progress";
    container.style.cssText = `
      margin: 10px 0;
      padding: 10px 15px;
      background: rgb(255, 231, 194);
      border-radius: 8px;
      font-size: 18px;
      color: #000;
      transition: all 0.5s ease;
      position: relative;
      z-index: 1000;
      opacity: 0;
      transform: translateY(10px);
      animation: fadeInUp 0.5s forwards;
    `;

    const staticLabel = document.createElement("div");
    staticLabel.className = "free-shipping-static";
    staticLabel.textContent = "🚚 Безкоштовна доставка від 1200 грн";
    staticLabel.style.cssText = `
      font-size: 14px;
      margin-bottom: 5px;
      transition: opacity 0.5s ease;
    `;

    const dynamicText = document.createElement("div");
    dynamicText.className = "free-shipping-text";
    dynamicText.style.cssText = `
      margin-bottom: 5px;
      transition: all 0.5s ease;
      font-weight: bold;
    `;

    const barWrap = document.createElement("div");
    barWrap.className = "free-shipping-bar-wrap";
    barWrap.style.cssText = `
      background: #e0d1c4;
      border-radius: 10px;
      height: 8px;
      overflow: hidden;
    `;

    const bar = document.createElement("div");
    bar.className = "free-shipping-bar";
    bar.style.cssText = `
      background: #7b4f28;
      height: 8px;
      width: 0%;
      border-radius: 10px;
      transition: width 0.5s ease;
    `;

    barWrap.appendChild(bar);
    container.appendChild(staticLabel);
    container.appendChild(dynamicText);
    container.appendChild(barWrap);

    if (!document.getElementById("freeShippingStyles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "freeShippingStyles";
      styleTag.textContent = `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseBar {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.03); }
        }
        .bar-pulse { animation: pulseBar 1.2s ease-in-out 1; }
        .free-shipping-big {
          font-size: 18px !important;
          font-weight: 700 !important;
          text-align: center !important;
          margin-top: 5px !important;
        }
        @media (max-width: 1024px) {
          .free-shipping-progress { font-size: 14px !important; }
          .free-shipping-static { font-size: 11px !important; }
          .free-shipping-big { font-size: 15px !important; }
        }
        @media (max-width: 768px) {
          .free-shipping-progress { padding: 8px 10px !important; font-size: 12.5px !important; }
          .free-shipping-static { font-size: 10.5px !important; }
          .free-shipping-big { font-size: 16px !important; }
        }
      `;
      document.head.appendChild(styleTag);
    }

    return container;
  }

  function updateProgress() {
    if (!progressContainer) return;
    const totalText = document.querySelector(".j-total-sum")?.textContent || "0";
    const total = parseFloat(totalText.replace(/[^\d\.]/g, "")) || 0;
    const percent = Math.min((total / freeShippingLimit) * 100, 100);

    const bar = progressContainer.querySelector(".free-shipping-bar");
    const dynamicText = progressContainer.querySelector(".free-shipping-text");
    const staticLabel = progressContainer.querySelector(".free-shipping-static");

    bar.style.width = percent + "%";

    dynamicText.style.opacity = "0";
    setTimeout(() => {
      if (total >= freeShippingLimit) {
        dynamicText.textContent = "Ви отримали безкоштовну доставку";
        staticLabel.style.opacity = "0";
        progressContainer.style.opacity = "0.95";
        dynamicText.classList.add("free-shipping-big");
        bar.classList.add("bar-pulse");
        setTimeout(() => bar.classList.remove("bar-pulse"), 1200);
      } else {
        const remaining = freeShippingLimit - total;
        dynamicText.textContent = `До безкоштовної доставки залишилось ${remaining.toFixed(0)} грн`;
        staticLabel.style.opacity = "1";
        progressContainer.style.opacity = "1";
        dynamicText.classList.remove("free-shipping-big");
      }
      dynamicText.style.opacity = "1";
    }, 150);
  }

  function insertProgressBar() {
    const isMobile = window.innerWidth <= 768;
    const target = isMobile
      ? document.querySelector(".order-details")
      : document.querySelector(".order-summary");

    if (!target) return false;
    if (!progressContainer) progressContainer = createProgressBar();
    if (progressContainer.parentElement === target.parentElement) return true;

    target.insertAdjacentElement("afterend", progressContainer);
    updateProgress();
    observeTotal();
    return true;
  }

  function observeTotal() {
    if (sumObserver) sumObserver.disconnect();
    const totalNode = document.querySelector(".j-total-sum");
    if (!totalNode) return;
    sumObserver = new MutationObserver(updateProgress);
    sumObserver.observe(totalNode, { childList: true, subtree: true });
  }

  function watchDomChanges() {
    if (domObserver) domObserver.disconnect();
    domObserver = new MutationObserver(() => {
      if (!document.contains(progressContainer)) {
        insertProgressBar();
      }
    });
    domObserver.observe(document.body, { childList: true, subtree: true });
  }

  let tries = 0;
  const wait = setInterval(() => {
    if (insertProgressBar() || tries++ > 20) {
      clearInterval(wait);
      watchDomChanges();
    }
  }, 400);

  window.addEventListener("resize", () => {
    insertProgressBar();
    updateProgress();
  });
})();














