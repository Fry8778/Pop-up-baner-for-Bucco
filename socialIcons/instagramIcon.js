document.addEventListener("DOMContentLoaded", function () {
  // Створюємо обгортку для Instagram-іконки
  const instagramSection = document.createElement("div");
  instagramSection.className = "header__section instagram-icon-section";
  instagramSection.innerHTML = `
    <a href="https://www.instagram.com/buco_coffee/" 
       target="_blank" 
       title="Ми в Instagram" 
       class="instagram-icon-link">
      <svg class="icon icon--instagram" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6zm5.25-.75a1 1 0 1 0 0 2a1 1 0 0 0 0-2z"/>
      </svg>
    </a>
  `;

  const headerRight = document.querySelector(".header__column--right");
  const telegramIcon = document.querySelector(".telegram-icon-section");

  if (headerRight && telegramIcon) {
    // Вставляємо Instagram ЗЛІВА від Telegram
    headerRight.insertBefore(instagramSection, telegramIcon);
  }

  const style = document.createElement("style");
  style.textContent = `
    .instagram-icon-section {
      display: flex;
      align-items: center;
      margin-right: 8px;
      position: relative;
      top: -1px;
      left: 5px;
    }

    .instagram-icon-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #000000;
      color: white;
      transition: background-color 0.3s;
    }

    .instagram-icon-link:hover,
    .instagram-icon-link:focus {
      background-color: #E1306C;
      color: white;
    }

    .instagram-icon-link .icon--instagram {
      width: 14px;
      height: 14px;
    }
  `;
  document.head.appendChild(style);
});
