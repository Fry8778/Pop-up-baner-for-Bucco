document.addEventListener("DOMContentLoaded", function () {
   // Масив сторінок, де буде банер
  const allowedPages = [
    "/magazyn/",
    "/melena-kava/",
    "/zernova-kava/",
    "/rozchynna-kava/",
    "/specialty-coffee-buco-high/",
    "/tea-buco-coffee/",
    "/kakao/",
    "/aksesuary/",
    "/aktsii/",
    "127.0.0.1",
    "localhost"
  ];

  // Перевірка, чи поточна сторінка дозволена
  const currentUrl = window.location.href;
  const showBanner = allowedPages.some(page => currentUrl.includes(page));
  if (!showBanner) return;
  
  const pngBannerSrc = "https://i.postimg.cc/Y0V0w3QF/hoco-Buco.png";
  const targetUrl = "https://bucocoffee.com.ua/solodoshchi/604/";

  // Створюємо контейнер банера
  const bannerDiv = document.createElement("div");
  bannerDiv.id = "chocolate-banner";

  // Кнопка закриття
  const closeBtn = document.createElement("button");
  closeBtn.id = "chocolate-banner-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.title = "Закрити банер";
  closeBtn.onclick = () => bannerDiv.remove();
  bannerDiv.appendChild(closeBtn);

  // Посилання
  const linkElement = document.createElement("a");
  linkElement.href = targetUrl;
  linkElement.rel = "noopener noreferrer";
  linkElement.className = "chocolate-banner__link";

  // Картинка
  const imgElement = document.createElement("img");
  imgElement.src = pngBannerSrc;
  imgElement.alt = "Шоколад від Buco";
  imgElement.className = "chocolate-banner__image";

  // Вкладаємо все
  linkElement.appendChild(imgElement);
  bannerDiv.appendChild(linkElement);
  document.body.appendChild(bannerDiv);

  // Стилі
  const style = document.createElement("style");
  style.textContent = `
    /* === Десктоп (понад 1024px) === */   
    #chocolate-banner {
      position: fixed;
      right: 30px;
      top: 80px;
      z-index: 1000;
      width: 170px;
      background: transparent !important;
      padding: 0;
      overflow: visible;     
      pointer-events: none;
    }

    #chocolate-banner a,
    #chocolate-banner img,
    #chocolate-banner-close {
      pointer-events: auto;
    }


    #chocolate-banner-close {
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
    #chocolate-banner-close:hover {
      background: rgba(0,0,0,0.8);
    }

    .chocolate-banner__link {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      outline: none;
      background: transparent !important;
    }

    .chocolate-banner__image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;
      border-radius: 0;
      background: transparent !important;
      pointer-events: auto;
    }

    .chocolate-banner__link:hover .chocolate-banner__image,
    .chocolate-banner__link:focus .chocolate-banner__image {
      transform: translateY(-5px);
      // filter: drop-shadow(0 8px 20px rgba(0,0,0,0.35)) brightness(1.08);
      filter: drop-shadow(0 8px 15px #743C1E) brightness(1.08);
      transition: transform 0.3s ease, filter 0.3s ease;
    }

    /* === Планшет (768px – 1024px) === */
    @media (max-width: 1024px) and (min-width: 769px) {
      #chocolate-banner {
        left: 20px;
        top: 130px;
        width: 160px;
      }
    }

    /* === Мобільний (до 768px) === */
    @media (max-width: 768px) {
      #chocolate-banner {
        left: 10px;
        top: 100px;
        width: 120px;
      }
      .chocolate-banner__image {
        transition: none;
      }
    }

    /* === Дуже маленькі екрани (до 480px) === */
    @media (max-width: 480px) {
      #chocolate-banner {
        left: 5px;        
        top: 100px;
        width: 100px;
      }
    }
  `;
  document.head.appendChild(style);
});
