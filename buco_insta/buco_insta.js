(function () {
  const instaHTML = `
    <div id="buco-insta">

      <div class="buco-container">
        <div class="buco-header">
          <div class="buco-title">Шукай нас в instagram</div>        
        </div>
      </div>

      <div class="buco-feed">

        ${[
          {
            type: "img",
            src: "https://res.cloudinary.com/dsa6bbv70/image/upload/buco1_f7erxm.webp",
          },
          {
            type: "video",
            src: "https://res.cloudinary.com/dsa6bbv70/video/upload/video1_edmddf.mp4",
          },
          {
            type: "img",
            src: "https://res.cloudinary.com/dsa6bbv70/image/upload/buco4_zwsuih.webp",
          },
          {
            type: "video",
            src: "https://res.cloudinary.com/dsa6bbv70/video/upload/video2_lcjmvi.mp4",
          },
          {
            type: "img",
            src: "https://res.cloudinary.com/dsa6bbv70/image/upload/buco2_kgtx1u.webp",
          },
        ]
          .map((item) => {
            if (item.type === "video") {
              return `
              <a href="https://www.instagram.com/buco_coffee/" target="_blank" class="insta-item">
                <video autoplay muted loop playsinline preload="none">
                  <source src="${item.src}" type="video/mp4">
                </video>
              </a>
            `;
            }

            return `
            <a href="https://www.instagram.com/buco_coffee/" target="_blank" class="insta-item">
              <img src="${item.src}" loading="lazy">
            </a>
          `;
          })
          .join("")}

      </div>

      <div class="buco-container subscribe">
        <div class="subscribe-text">
          БУДЬ В КУРСІ НАШИХ<br>АКЦІЙ ТА НОВИНОК!
        </div>

        <a href="https://t.me/bucocoffee_bot" target="_blank" class="subscribe-btn">
          Підпишись на Buco бот
        </a>
      </div>

    </div>
  `;

  const style = `
    <style>
      #buco-insta {
        padding: 40px 0;
        font-family: sans-serif;
      }

      .buco-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
      }

      .buco-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      
.buco-title {
        // font-size: 26px;
        font-weight: 700;
        font-size: 20px;
        border: 0;
        line-height: 1;
        font-weight: bold;
        color: #7a7a7a;
      }

 

      .buco-feed {
        display: flex;
        gap: 10px;
        padding: 0 16px;
        justify-content: space-between;
        overflow: hidden;
        }

       @media (max-width: 768px) {
        .buco-feed {
            overflow-x: auto;
            justify-content: flex-start;
            }
        }

      .insta-item {
        flex: 1;
        aspect-ratio: 1/1;
        border-radius: 12px;
        overflow: hidden;
      }

      .insta-item img,
      .insta-item video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .subscribe {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        gap: 20px;
      }

      .subscribe-text {
        font-size: 20px;
        font-weight: 700;
        border: 0;
        line-height: 1;
        font-weight: bold;
        color: #7a7a7a;
      }

      .subscribe-btn {

        font-weight: 700;

        background: rgb(27, 66, 129);
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 25px;
        transition: transform 0.2s ease, opacity 0.2s ease;    
        }

        .subscribe-btn:hover {
        color: white;
        opacity: 0.9;
        transform: translateY(-3px); /* ← эффект подъёма */
        }

      @media (max-width: 768px) {
        .insta-item {
          flex: 0 0 60%;
        }

        .subscribe {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    </style>
  `;

  function inject() {
    const allowedPaths = [
      "/", // головна
      "/pro-nas", // без /
      "/pro-nas/", // з /
    ];

    const currentPath = window.location.pathname;

    const isAllowed = allowedPaths.includes(currentPath);

    if (!isAllowed) return;

    const target =
      document.querySelector(".main-content") ||
      document.querySelector("main") ||
      document.body;

    target.insertAdjacentHTML("beforeend", style + instaHTML);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
