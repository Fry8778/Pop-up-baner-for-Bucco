(function() {
  const freeShippingLimit = 1500;
  let progressContainer = null;
  let sumObserver = null;
  let domObserver = null;

  function createProgressBar() {
    const container = document.createElement("div");
    container.className = "free-shipping-progress";
    container.style.cssText = `
      margin: 10px 0 0 0;
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
    staticLabel.textContent = "🚚 Безкоштовна доставка від 1500 грн";
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          font-size: 18px !important;
          font-weight: 700 !important;
          text-align: center !important;
          margin-top: 5px !important;
        }
         .free-shipping-text {
          display: flex;
          align-items: center;
          gap: 10px; /* відстань між текстом і картинкою */
        } 
        .free-shipping-text img {
          max-width: 35px;
          height: auto;         
        }
        @media (max-width: 768px) {
          .free-shipping-text img {
            max-width: 30px; /* менший розмір для мобільних */
          }
        }
        @media (max-width: 1024px) {
          .free-shipping-progress { font-size: 14px !important; }
          .free-shipping-static { font-size: 11px !important; }
          .free-shipping-big { font-size: 15px !important; }
        }
        @media (max-width: 768px) {
          .free-shipping-progress { padding: 8px 10px !important; font-size: 12.5px !important; }
          .free-shipping-static { font-size: 10.5px !important; }
          .free-shipping-big { font-size: 14px !important; }
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
          dynamicText.innerHTML = `
            <span>Ви отримали безкоштовну доставку</span>
      <img class="free-shipping-img" src="data:image/png;base64,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" />
    `;
    staticLabel.style.opacity = "0";
    progressContainer.style.opacity = "0.95";
    dynamicText.classList.add("free-shipping-big");
    bar.classList.add("bar-pulse");
    setTimeout(() => bar.classList.remove("bar-pulse"), 1500);
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
