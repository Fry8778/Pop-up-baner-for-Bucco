document.addEventListener("DOMContentLoaded", function () {

  // Захист від повторної ініціалізації
  if (document.querySelector(".social-icons-section")) return;

  const socialSection = document.createElement("div");
  socialSection.className = "header__section social-icons-section";
  socialSection.innerHTML = `
    <a href="https://www.instagram.com/buco_coffee/"
       target="_blank"
       title="Ми в Instagram"
       class="social-icon social-icon--instagram">
      <svg viewBox="0 0 24 24" class="icon">
        <path fill="currentColor"
          d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6z"/>
      </svg>
    </a>

    <a href="https://t.me/bucocoffee_bot"
       target="_blank"
       title="Написати в Telegram"
       class="social-icon social-icon--telegram">
      <svg viewBox="0 0 24 24" class="icon">
        <path fill="currentColor"
          d="M9.04 15.64l-.39 5.45c.56 0 .81-.24 1.1-.53l2.65-2.51 5.5 4.02c1.01.55 1.72.26 1.99-.93l3.61-16.88c.33-1.55-.56-2.16-1.57-1.79L1.76 9.54c-1.5.59-1.48 1.42-.26 1.79l5.5 1.72L19.37 4.8c.6-.39 1.15-.18.7.25L9.04 15.64z"/>
      </svg>
    </a>
  `;

  const headerRight = document.querySelector(".header__column--right");
  if (headerRight) {
    headerRight.insertBefore(socialSection, headerRight.firstChild);
  }

  const style = document.createElement("style");
  style.textContent = `
    .social-icons-section {
      display: flex;
      align-items: center;
      gap: 20px;          
    }

    .social-icons-section .social-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #000;
      color: #fff;
      transition: background-color 0.25s ease;
      text-decoration: none;
      flex-shrink: 0;
    }

    .social-icons-section .icon {
      width: 14px;
      height: 14px;
    } 
  
    .social-icon {
      background-color: #000;
      color: #fff;
    }

    .social-icon:visited {
      background-color: #000;
      color: #fff;
    }

    .social-icon--instagram:hover {
      background-color: #E1306C;
    }

    .social-icon--telegram:hover {
      background-color: #007ab8;
    }

    /* прибираємо зайвий focus/active */
    .social-icon:focus,
    .social-icon:active,
    .social-icon:focus-visible {
      outline: none;
    }
  `;
  document.head.appendChild(style);
});
