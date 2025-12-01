document.addEventListener("DOMContentLoaded", function () {
  const bannerClosedKey = "saleBannerClosed"; // ключ у localStorage

  // Перевіряємо, чи банер вже закритий
  if (localStorage.getItem(bannerClosedKey) === "true") return;

  const pngBannerSrc = "https://i.postimg.cc/MHPmWWck/bucobf-04.jpg";
  //  const pngBannerSrc = "https://i.postimg.cc/CxypY5xq/Buco-Coffee-Sale30.png";
  const targetUrl = "https://bucocoffee.com.ua/magazyn/";

  // Створюємо контейнер банера
  const bannerDiv = document.createElement("div");
  bannerDiv.id = "sale-banner";

  // Кнопка закриття
  const closeBtn = document.createElement("button");
  closeBtn.id = "sale-banner-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.title = "Закрити банер";
  closeBtn.onclick = () => {
    bannerDiv.remove();
    localStorage.setItem(bannerClosedKey, "true"); // зберігаємо факт закриття
  };
  bannerDiv.appendChild(closeBtn);

  // Посилання
  const linkElement = document.createElement("a");
  linkElement.href = targetUrl;
  linkElement.rel = "noopener noreferrer";
  linkElement.className = "sale-banner__link";

  // Картинка
  const imgElement = document.createElement("img");
  imgElement.src = pngBannerSrc;
  imgElement.alt = "Знижка 30 %";
  imgElement.className = "sale-banner__image";

  // Вкладаємо все
  linkElement.appendChild(imgElement);
  bannerDiv.appendChild(linkElement);
  document.body.appendChild(bannerDiv);

  // Стилі
  const style = document.createElement("style");
  style.textContent = `
    #sale-banner {
      position: fixed;
      right: 30px;
      top: 140px;
      z-index: 1000;
      width: 250px;
      background: transparent !important;
      padding: 0;
      overflow: visible;
      border-radius: 12px;
    }

    #sale-banner-close {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 20px;
      height: 20px;
      border: none;
      background: rgba(0,0,0,0.6);
      color: white;
      font-size: 16px;
      line-height: 20px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
    }

    #sale-banner-close:hover {
      background: rgba(0,0,0,0.8);
    }

    .sale-banner__link {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      outline: none;
      background: transparent !important;
    }

    .sale-banner__image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;
      border-radius: 12px;
      background: transparent !important;
      pointer-events: auto;
    }

    .sale-banner__link:hover .sale-banner__image {
      transform: translateY(-5px);
      // filter: drop-shadow(0 8px 20px rgba(0,0,0,0.35)) brightness(1.08);
      filter: drop-shadow(0 8px 16px #743C1E) brightness(1.08);
      transition: transform 0.3s ease, filter 0.3s ease;
    }

    @media (max-width: 1024px) and (min-width: 769px) {
      #sale-banner {
        right: 30px;
        top: 80px;
        width: 160px;
      }
    }

    @media (max-width: 768px) {
      #sale-banner {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 45vw;
      }
    }

    @media (max-width: 480px) {
      #sale-banner {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80vw;
      }
    }
  `;
  document.head.appendChild(style);
});
