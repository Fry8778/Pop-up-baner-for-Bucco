<script>
  document.addEventListener("DOMContentLoaded", function () {
    const groups = document.querySelectorAll(".footer__contacts-group");

    if (groups.length >= 2) {
      const telegramGroup = document.createElement("div");
      telegramGroup.className = "footer__contacts-group";

      telegramGroup.innerHTML = `
        <div class="footer__contacts-item" style="display: flex; align-items: center;">
          <svg class="icon icon--telegram" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" style="fill: #0088cc; flex-shrink: 0;">
            <path d="M32 0 0 18l10.227 3.788L26 7 14.002 23.186l.01.004-.012-.004V32l5.735-6.691L27 28l5-28z"/>
          </svg>
          <a class="footer__link" href="https://t.me/bucocoffee_bot" target="_blank" rel="noopener" style="margin-left: 8px; font-family: 'Open Sans', sans-serif;">
            Telegram-бот
          </a>
        </div>
      `;

      // Вставляємо перед другим блоком (email)
      groups[1].parentNode.insertBefore(telegramGroup, groups[1]);
    } else {
      console.warn("Не знайдено достатньо груп у футері.");
    }
  });
</script>
