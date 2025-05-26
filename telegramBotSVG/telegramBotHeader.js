document.addEventListener("DOMContentLoaded", function () {
  // Створюємо обгортку для Telegram-іконки
  const telegramSection = document.createElement("div");
  telegramSection.className = "header__section telegram-icon-section";
  telegramSection.innerHTML = `
      <a href="https://t.me/bucocoffee_bot" target="_blank" title="Написати в Telegram" class="telegram-icon-link">
        <svg class="icon icon--telegram" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M9.04 15.64l-.39 5.45c.56 0 .81-.24 1.1-.53l2.65-2.51 5.5 4.02c1.01.55 1.72.26 1.99-.93l3.61-16.88.01-.01c.33-1.55-.56-2.16-1.57-1.79L1.76 9.54C.26 10.13.28 10.96 1.5 11.33l5.5 1.72L19.37 4.8c.6-.39 1.15-.18.7.25L9.04 15.64z"/>
        </svg>
      </a>
    `;

  const headerRight = document.querySelector(".header__column--right");
  if (headerRight) {
    headerRight.insertBefore(telegramSection, headerRight.firstChild);
  }

  const style = document.createElement("style");
  style.textContent = `
      .telegram-icon-section {
        display: flex;
        align-items: center;
        margin-right: 12px;
      }
      .telegram-icon-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #000000;
        color: white;
        transition: background-color 0.3s;
      }
      .telegram-icon-link:hover {
        background-color: #007ab8;
        color: white;
      }
      .telegram-icon-link .icon--telegram {
        width: 20px;
        height: 20px;
      }
    `;
  document.head.appendChild(style);
});
