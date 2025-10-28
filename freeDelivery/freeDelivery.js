document.addEventListener("DOMContentLoaded", function () {
  const freeShippingLimit = 1200;

  const aside = document.querySelector(".checkout-aside");
  const orderHeader = aside?.querySelector(".order-header");

  if (!orderHeader) return;

  // Контейнер
  const progressContainer = document.createElement("div");
  progressContainer.className = "free-shipping-progress";
  progressContainer.style.cssText = `
    margin: 15px 0;
    padding: 10px 15px;
    background: #f9f5f2;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.18;   
    letter-spacing: 0.03em;
    color: #000000;
  `;

  // Постійний напис
  const staticLabel = document.createElement("div");
  staticLabel.textContent = "Безкоштовна доставка від 1200 грн";
  staticLabel.style.cssText = `
    font-size: 12px;    
    font-weight: normal;
    margin-bottom: 5px;
    line-height: 1.18;   
    letter-spacing: 0.03em;
    color: #000000;
  `;
  progressContainer.appendChild(staticLabel);

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

  // Вставляємо під блоком "Ваше замовлення"
  orderHeader.insertAdjacentElement("afterend", progressContainer);

  // Текст, що змінюється
  const dynamicText = document.createElement("div");
  dynamicText.className = "free-shipping-text";
  dynamicText.style.marginBottom = "5px";
  progressContainer.appendChild(dynamicText);

  progressContainer.appendChild(barWrap);

  // Оновлення прогресу
  const updateProgress = () => {
    const totalText = document.querySelector(".j-total-sum")?.textContent || "0";
    const total = parseFloat(totalText.replace(/[^\d\.]/g, ""));
    const percent = Math.min((total / freeShippingLimit) * 100, 100);
    bar.style.width = percent + "%";

    if (total >= freeShippingLimit) {
      // Показуємо повідомлення про безкоштовну доставку
      dynamicText.textContent = "✅ Ви отримали безкоштовну доставку!";
      // Ховаємо постійний напис
      staticLabel.style.display = "none";
    } else {
      const remaining = freeShippingLimit - total;
      dynamicText.textContent = `До безкоштовної доставки залишилось ${remaining.toFixed(0)} грн`;
      // Показуємо постійний напис знову
      staticLabel.style.display = "block";
    }
  };

  updateProgress();

  // Спостерігаємо за зміною суми
  const observer = new MutationObserver(updateProgress);
  const totalNode = document.querySelector(".j-total-sum");
  if (totalNode) {
    observer.observe(totalNode, { childList: true, subtree: true });
  }
});
