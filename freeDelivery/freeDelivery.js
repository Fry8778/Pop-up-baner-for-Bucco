document.addEventListener("DOMContentLoaded", function () {
  const freeShippingLimit = 1200;

  const aside = document.querySelector(".checkout-aside");
  const orderHeader = aside?.querySelector(".order-header");

  if (!orderHeader) return;

  // Створюємо контейнер для прогрес-бару
  const progressContainer = document.createElement("div");
  progressContainer.className = "free-shipping-progress";
  progressContainer.style.cssText = `
    margin: 15px 0;
    padding: 10px 15px;
    background: #f9f5f2;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  `;

  // Прогрес-бар
  const barWrap = document.createElement("div");
  barWrap.style.cssText = `
    background: #e0d1c4;
    border-radius: 10px;
    height: 8px;
    margin-top: 6px;
    overflow: hidden;
  `;

  const bar = document.createElement("div");
  bar.style.cssText = `
    background: #7b4f28;
    height: 8px;
    width: 0%;
    border-radius: 10px;
    transition: width 0.4s ease;
  `;

  barWrap.appendChild(bar);
  progressContainer.appendChild(barWrap);

  // Вставляємо під блоком "Ваше замовлення"
  orderHeader.insertAdjacentElement("afterend", progressContainer);

  // Функція оновлення прогресу
  const updateProgress = () => {
    const totalText = document.querySelector(".j-total-sum")?.textContent || "0";
    const total = parseFloat(totalText.replace(/[^\d\.]/g, ""));
    const percent = Math.min((total / freeShippingLimit) * 100, 100);
    bar.style.width = percent + "%";

    // Очищаємо старий текст
    const oldText = progressContainer.querySelector(".free-shipping-text");
    if (oldText) oldText.remove();

    // Додаємо новий текст
    const text = document.createElement("div");
    text.className = "free-shipping-text";
    text.style.marginBottom = "5px";

    if (total >= freeShippingLimit) {
      text.textContent = "✅ Ви отримали безкоштовну доставку!";
    } else {
      const remaining = freeShippingLimit - total;
      text.textContent = `До безкоштовної доставки залишилось ${remaining.toFixed(0)} грн`;
    }

    // Вставляємо перед barWrap
    progressContainer.insertBefore(text, barWrap);
  };

  updateProgress();

  // Спостереження за змінами суми
  const observer = new MutationObserver(updateProgress);
  const totalNode = document.querySelector(".j-total-sum");
  if (totalNode) {
    observer.observe(totalNode, { childList: true, subtree: true });
  }
});

