(function () {
  const instaHTML = `
    <div id="buco-insta">

      <div class="buco-container">
        <div class="buco-header">
          <div class="buco-title">Приєднуйся до нас в Instagram</div>        
        </div>
      </div>

      <div class="buco-feed">

        ${[
          {
            type: "img",
            src: "https://res.cloudinary.com/dsa6bbv70/image/upload/w_400,f_auto,q_auto:eco/buco1_f7erxm",
          },
          {
            type: "video",
            src: "https://res.cloudinary.com/dsa6bbv70/video/upload/q_auto:low,vc_auto/video1_edmddf.mp4",
          },
          {
            type: "img",
            src: "https://res.cloudinary.com/dsa6bbv70/image/upload/w_400,f_auto,q_auto:eco/buco4_zwsuih",
          },
          {
            type: "video",
            src: "https://res.cloudinary.com/dsa6bbv70/video/upload/q_auto:low,vc_auto/video2_lcjmvi.mp4",
          },
          {
            type: "img",
            src: "https://res.cloudinary.com/dsa6bbv70/image/upload/w_400,f_auto,q_auto:eco/buco2_kgtx1u",
          },
        ]
          .map((item) => {
            if (item.type === "video") {
              return `
              <a href="https://www.instagram.com/buco_coffee/"
              target="_blank"
              class="insta-item insta-video"
              data-video="${item.src}">

              <img
              src="https://res.cloudinary.com/dsa6bbv70/image/upload/w_400,f_auto,q_auto:eco/video-preview"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width="300"
              height="300"
              alt="Instagram відео">

              </a>
              `;
            }

            return `
            <a href="https://www.instagram.com/buco_coffee/" target="_blank" class="insta-item">             
              <img
                src="${item.src}"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                width="300"
                height="300"
                alt="Instagram картинка">
            </a>
          `;
          })
          .join("")}

      </div>

      <div class="buco-container subscribe">
        <div class="subscribe-text">
          Будь в курсі наших акцій та новинок!
        </div>

        <a href="https://t.me/bucocoffee_bot" target="_blank" class="subscribe-btn">
          Підпишись на Buco
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


         text-align: center;
      }

      
.buco-title {    
        width: max-content;
        margin: auto;
        color: #fff;
        background: #1b4281;
        padding: 10px 10px;        
        text-align: center;
        text-transform: uppercase;
        border-radius: 50px;
        font-size: 24px;
        font-family: "Open Sans", sans-serif;              
        line-height: 1.2;
        font-weight: 700;
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
        border-radius: 12px;
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
        text-transform: uppercase;
      }

      .subscribe-btn {       
        overflow: hidden;
        font-size: 15px; 
        font-weight: 700;         
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        line-height: 1.5;          
        background-color: #0089bf;
        background: #1b4281;              
        box-shadow: inset 0 -2px 0 0 #10284e;
        color: #ffffff;
        display: inline-block;
        text-decoration: none;          
        border-radius: 25px;              
        border: none;
        padding: 12px 20px;
        width: auto;       
        transition:
            transform .5s ease,
            opacity .5s ease,
            background-color .5s ease;
      }
          
      .subscribe-btn:hover {       
        position: relative;            
        color: white;
        opacity: 0.9;
        transform: translateY(-2px);
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




      /* ── ПЛАНШЕТ 769px–1024px ── */
@media (max-width:1024px) and (min-width:769px){

  .buco-title {    
    font-size: 18px;
    padding: 10px 12px;
  }

  .subscribe-text {
    font-size: 16px;
  }

  .subscribe-btn {
    font-size: 14px;
    padding: 10px 16px;
  }

  .insta-item {    
    flex: 0 0 30%;
  }
}


/* ── МОБІЛЬНИЙ портрет ── */
@media (max-width:768px) and (orientation:portrait){

  .buco-title {    
    font-size: 14px;
    padding: 10px 10px;
  }

  .insta-item {
    flex: 0 0 70%;   
  }

  .subscribe {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .subscribe-text {
    font-size: 14px;
    max-width: 60%;
    line-height: 1.2;
  }

  .subscribe-btn {
    font-size: 13px;    
    padding: 8px 4px;
    white-space: nowrap;
  }
}


/* ── МОБІЛЬНИЙ ландшафт ── */
@media (max-width:900px) and (orientation:landscape){

  .buco-title {   
    font-size: 14px;
    padding: 10px 10px;
  }

  .subscribe {
    flex-direction: row;
    justify-content: space-between;
  }

  .subscribe-text {
    font-size: 14px;
  }

  .subscribe-btn {
    font-size: 13px;
    padding: 8px 12px;
  }

  .insta-item {
    flex: 0 0 35%;
  }

}
    </style>
  `;

  function inject() {
    const allowedPaths = [
      "/", // головна сторінка
      "/pro-nas", // без /
      "/pro-nas/", // з /
    ];

    const currentPath = window.location.pathname;
    const isAllowed = allowedPaths.includes(currentPath);
    if (!isAllowed) return;

    // const target =
    //   document.querySelector(".main-content") ||
    //   document.querySelector("main") ||
    //   document.body;

    // target.insertAdjacentHTML("beforeend", style + instaHTML);
    const socials = document.querySelector(".socials");
    if (socials) {
      socials.insertAdjacentHTML("beforebegin", style + instaHTML);
    } else {
      const target =
        document.querySelector(".main-content") ||
        document.querySelector("main") ||
        document.body;

      target.insertAdjacentHTML("beforeend", style + instaHTML);
    }
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      inject();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const container = entry.target;

            const videoUrl = container.dataset.video;

            container.innerHTML = `
            <video
              muted
              loop
              autoplay
              playsinline
              preload="metadata">

              <source
                src="${videoUrl}"
                type="video/mp4">

            </video>
          `;

            observer.unobserve(container);
          });
        },
        {
          rootMargin: "200px",
        },
      );

      document
        .querySelectorAll(".insta-video")
        .forEach((el) => observer.observe(el));
    }, 2500);
  });
})();
