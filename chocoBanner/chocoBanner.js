document.addEventListener("DOMContentLoaded", function () {
  const pngBannerSrc = "https://i.postimg.cc/d3YvmBHp/image-2024-11-27-19-19-09.png";
  const targetUrl = "https://bucocoffee.com.ua";

  // Створюємо головний контейнер банера
  const bannerDiv = document.createElement("div");
  bannerDiv.id = "discount-banner";

  // Створюємо посилання
  const linkElement = document.createElement("a");
  linkElement.href = targetUrl;
  linkElement.target = "_blank";
  linkElement.rel = "noopener noreferrer";
  linkElement.className = "discount-banner__link";

  // Створюємо зображення
  const imgElement = document.createElement("img");
  imgElement.src = pngBannerSrc;
  imgElement.alt = "Скидка на Чёрную Пятницу";
  imgElement.className = "discount-banner__image";

  // Вкладаємо все
  linkElement.appendChild(imgElement);
  bannerDiv.appendChild(linkElement);
  document.body.appendChild(bannerDiv);

  // Стилі банера
  const style = document.createElement("style");
  style.textContent = `
    #discount-banner {
      position: fixed;
      right: 20px;
      top: 1px;
      z-index: 1000;
      width: 200px;
      max-height: 100vh;
      overflow: hidden;
      box-shadow: none;
      border-radius: 0;
      background-color: transparent;
      padding: 0;
    }

    .discount-banner__link {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
    }

    .discount-banner__image {
      width: 100%;
      height: auto;
      display: block;
    }

    @media (max-width: 1024px),
           (max-width: 768px),
           (max-width: 480px) {
      #discount-banner {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
});
