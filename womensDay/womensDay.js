(function ($) {
  $.fn.womensDay = function (options) {
    // Налаштування за замовчуванням
    const settings = $.extend(
      {
        tulipCount: 12,
        minSize: 10,
        maxSize: 20,
       
      },
      options
    );

    // Адаптація для мобільних пристроїв
    if ($(window).width() <= 768) {
      settings.tulipCount = Math.round(settings.tulipCount * 0.5);
      settings.minSize = 4;
      settings.maxSize = 10;
    }

    // SVG для повільних сердечок
    const slowSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32">
            <path fill="#7cb342" d="M16.332 28.692c-0.905-0.085-2.262-0.025-3.705-0.918-3.432-2.12-5.447-7.098-6.855-10.148-0.285-0.62-0.037-0.727 0.402-0.608 0.737 0.2 2.025 1.005 2.252 1.16 5.865 3.973 9.552 7.787 9.985 9.122 0.46 1.407-1.523 1.442-2.080 1.39z"/>
            <path fill="#bdcf46" d="M19.305 29.030c0-3.4-1.73-4.33-1.73-4.33-5.57-6.805-12.125-8.845-12.125-8.845l-0.063 1.36c1.428 0.052 8.842 6.742 10.87 9.582 0.788 1.102 0.938 1.875 0.938 1.875l2.11 0.358z"/>
            <path fill="#eb4e9d" d="M11.085 6.16c0.15-0.985 1.685-4.617 4.030-4.768 1.61-0.105 3.495 1.367 3.97 3.64 0.457 2.192 1.065 4.475 0.020 6.537-0.87 1.715-2.843 3.74-4.945 2.485-2.36-1.408-3.533-4.96-3.075-7.895z"/>
            <path fill="#f387ab" d="M12.63 6.125c0.095-0.62 1.060-2.9 2.533-2.998 1.012-0.065 2.197 0.857 2.495 2.29 0.288 1.38 0.668 2.815 0.012 4.11-0.547 1.080-1.79 2.352-3.11 1.565-1.482-0.887-2.215-3.123-1.93-4.968z"/>
            <path fill="#7cb342" d="M17.055 27.83c-0.030 0.11-0.070 0.218-0.113 0.323-0.078 0.195-0.155 0.39-0.238 0.585-0.070 0.16-0.14 0.358-0.323 0.425-0.227 0.087-0.512 0.047-0.74-0.020-0.945-0.277-0.613-1.163-0.46-1.85 0.305-1.385 0.595-2.788 0.695-4.203 0.102-1.46 0.005-2.925 0.005-4.387 0-0.027 0.002-0.622-0.020-0.622h1.865v0.685c0 1.060 0.003 2.117-0.020 3.175-0.047 1.96-0.085 3.988-0.652 5.89z"/>
            <path fill="#7cb342" d="M13.485 29.65c0.435-1.335 4.12-5.15 9.985-9.123 0.227-0.155 1.517-0.962 2.253-1.16 0.44-0.12 0.69-0.012 0.402 0.608-1.407 3.050-3.422 8.027-6.855 10.148-1.442 0.89-2.8 0.832-3.705 0.918-0.555 0.050-2.537 0.015-2.080-1.39z"/>
            <path fill="#bdcf46" d="M14.705 31.017s0.15-0.773 0.938-1.875c2.025-2.84 9.443-9.53 10.87-9.582l-0.063-1.36s-6.555 2.040-12.125 8.845c0 0-1.73 0.927-1.73 4.33l2.11-0.358z"/>
            <path fill="#ea4e9c" d="M18.905 3.098c0.622-0.638 1.8-1.695 3.025-0.462-0.4-0.607-0.79-1.012-1.125-1.255-0.51-0.373-1.067-0.435-1.6-0.077-2.438 1.635-4.11 6.095-4.525 10.075-0.012 0.123-0.025 0.405-0.025 0.795 0.197-1.52 0.547-2.805 0.662-3.148 0.807-2.377 2.345-4.652 3.588-5.928z"/>
            <path fill="#f387ab" d="M24.212 10.755c-0.395-4.207-1.36-6.713-2.285-8.12-1.225-1.232-2.402-0.175-3.025 0.462-1.2 1.233-2.677 3.408-3.502 5.702-1.38-1.982-3.215-4.103-4.822-4.457-0.588-0.13-1.29-0.258-1.977 0.785-0.25 0.378-0.51 0.955-0.705 1.755-0.15 1.468-0.138 3.335 0.172 5.687 0.283 2.15 0.922 3.435 1.145 3.883 1.592 3.23 4.897 3.54 5.49 3.54 2.797 0.337 4.663-0.517 4.69-0.53h0.005c0.578-0.133 3.73-1.168 4.565-4.672 0.113-0.48 0.453-1.877 0.25-4.035z"/>
            <path fill="#ea4e9c" d="M10.578 4.343c2.685 0.59 6.012 6.115 6.777 7.692 0.067 0.14 0.245 0.64 0.422 1.325-0.207-1.095-0.47-1.95-0.555-2.183-0.767-2.060-3.635-7.888-6.372-8.938-0.6-0.23-1.13-0.045-1.543 0.433-0.547 0.63-1.178 1.938-1.412 4.21 0.195-0.8 0.455-1.377 0.705-1.755 0.688-1.042 1.39-0.912 1.977-0.785z"/>
          
          </svg>
      
    `;  

    const fastSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32">
          <path fill="#e91e63" d="M10.225.015c-.34.022-.998.105-1.287.162l-.262.05c-.074.015-.178.035-.225.047a11.845 11.845 0 0 0-1.262.373c-.027.013-.157.063-.287.115-.67.26-1.438.667-2.087 1.105-.232.155-.745.548-.925.708-.135.118-.725.708-.865.862-.25.277-.643.817-.848 1.162-.107.18-.355.675-.425.85-.03.075-.065.16-.075.188-.028.063-.155.457-.208.638-.133.465-.242 1.353-.242 1.962 0 .383.052.915.13 1.313.052.273.205.838.268.988l.117.287c.11.277.345.745.49.975.125.197.35.533.368.55.01.008.047.057.09.113.525.71 1.47 1.59 2.377 2.213.315.215.955.633 1.01.658.085.037.51.31.518.332.005.02-.075.06-.442.217l-.2.085c-.213.093-.293.13-.815.385a16.14 16.14 0 0 0-.675.343c-.07.04-.175.102-.237.135-1.095.622-2.125 1.455-2.732 2.207-.077.095-.16.198-.183.223a6.351 6.351 0 0 0-1.107 2.34c-.175.782-.188.92-.188 1.9 0 .74.007.935.045 1.175a9.91 9.91 0 0 0 .313 1.365c.168.508.472 1.16.75 1.6.137.223.422.635.455.66a9.182 9.182 0 0 0 1.303 1.32l.328.267c.112.093.765.517.978.635.05.03.13.073.175.098.128.073.468.245.6.302.277.122.343.15.593.245.555.212 1.07.365 1.5.445.048.01.133.027.188.04.572.13 1.43.253 1.975.282.11.008.203.025.207.038.012.038 1.898.038 1.91 0 .005-.015.155-.035.357-.05.703-.045 1.31-.125 1.925-.253l.313-.063c.255-.045.893-.223 1.338-.37a11.43 11.43 0 0 0 1.872-.855c.122-.073.225-.133.233-.133.005 0 .113-.07.24-.155.128-.087.247-.168.273-.183.07-.043.455-.323.52-.378l.35-.297a9.668 9.668 0 0 0 1.567-1.712 7.36 7.36 0 0 0 1.08-2.212c.11-.358.218-.94.267-1.42.008-.078.025-.137.038-.13.012.01.023-.253.023-.663 0-.383-.01-.672-.023-.665-.027.017-.052-.105-.052-.25 0-.06-.01-.163-.023-.227s-.038-.205-.052-.308a8.307 8.307 0 0 0-.275-1.087c-.01-.027-.035-.09-.05-.137a7.135 7.135 0 0 0-.47-1c-.12-.2-.445-.68-.523-.762-.025-.027-.09-.108-.145-.175a10.3 10.3 0 0 0-.9-.89 11.628 11.628 0 0 0-1.977-1.36 5.983 5.983 0 0 1-.275-.155c-.03-.02-.465-.242-.963-.492-.5-.25-.91-.467-.915-.482-.005-.012.107-.082.248-.152.908-.453 1.557-.863 2.245-1.415a12.016 12.016 0 0 0 1.385-1.377c.205-.255.64-.885.64-.925 0-.01.02-.047.047-.082.047-.07.27-.502.335-.655l.087-.2c.08-.182.247-.695.302-.932.067-.285.078-.345.12-.605.063-.39.063-1.598 0-2.013-.095-.63-.2-1.065-.36-1.513a8.073 8.073 0 0 0-.125-.338 7.149 7.149 0 0 0-.975-1.608 10.636 10.636 0 0 0-1.308-1.317c-.262-.21-.97-.7-1.012-.7a.243.243 0 0 1-.082-.048 6.193 6.193 0 0 0-.367-.198 11.286 11.286 0 0 0-.843-.38c-.137-.057-.77-.255-1.045-.328a8.97 8.97 0 0 0-.9-.182c-.602-.105-.815-.12-1.975-.128-.625-.003-1.2-.003-1.275.003zm1.713 1.723c1.47.218 2.688.988 3.57 2.253.078.112.143.213.143.223s.02.048.047.082c.185.265.51 1.048.603 1.455.15.673.2 1.16.2 1.975 0 .652-.045 1.26-.125 1.755-.073.428-.075.447-.152.787-.157.72-.465 1.525-.793 2.082-.102.175-.37.572-.402.6-.01.008-.09.102-.182.213-.285.345-.67.695-1.133 1.025-.175.125-.207.14-.283.125a.531.531 0 0 1-.127-.037 8.686 8.686 0 0 0-.502-.213 19.615 19.615 0 0 1-.387-.162l-.6-.265a41.053 41.053 0 0 1-2.675-1.322 15.558 15.558 0 0 1-1.225-.793c-.492-.387-.745-.605-.945-.805-.69-.693-1.147-1.463-1.33-2.238-.072-.31-.085-.365-.117-.577-.04-.275-.04-1.268 0-1.55.075-.495.115-.685.228-1.037.105-.332.34-.853.48-1.053.04-.058.072-.115.072-.125s.098-.147.215-.305c.197-.257.657-.752.848-.908.205-.167.435-.348.447-.348.005 0 .077-.042.157-.095.36-.24.837-.455 1.282-.58.063-.018.14-.04.175-.052.117-.04.588-.127.8-.147.33-.032 1.393-.01 1.713.038zM8.415 16.525l.197.087c.043.017.2.085.35.15l.35.15c.043.017.133.058.2.087.07.032.175.078.238.105.152.065.265.115.412.183l.275.125.3.137.287.133c.133.06.38.172.688.317.31.145 1.78.878 1.883.938l.335.2c.125.075.23.137.235.137.012 0 .43.275.537.352.957.698 1.51 1.233 1.947 1.885.247.37.485.878.578 1.247.098.383.117.512.157.977a6.433 6.433 0 0 1-.79 3.633c-.108.188-.32.503-.383.57-.012.015-.065.078-.113.142-.15.198-.705.725-.985.935a6.038 6.038 0 0 1-1.655.87c-.068.02-.155.05-.197.063-.91.293-2.645.392-3.662.207a6.76 6.76 0 0 1-1.718-.535c-.085-.04-.16-.073-.168-.073s-.1-.05-.205-.113a1.9 1.9 0 0 0-.202-.113c-.015 0-.565-.375-.582-.398a.353.353 0 0 0-.065-.055c-.407-.28-1.072-1.02-1.413-1.573a8.74 8.74 0 0 1-.52-1.038 12.994 12.994 0 0 1-.152-.412c-.173-.54-.268-1-.348-1.715-.035-.29-.035-1.535-.003-1.813.08-.672.13-.95.255-1.398.04-.145.082-.297.095-.337.077-.285.37-.938.605-1.358.025-.043.07-.122.098-.175.452-.8 1.695-1.957 2.71-2.523.17-.095.23-.095.427-.008z"/>
  
          </svg>
    `;
    
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();
    const footer = $("footer");

    const updateFooterBounds = () => {
      const footerTop = footer.offset() ? footer.offset().top : $(document).height();
      return footerTop + footer.outerHeight();
    };
    let footerBottom = updateFooterBounds();

    // Оновлюємо розміри при зміні вікна
    $(window).on("resize", function () {
      windowWidth = $(window).width();
      windowHeight = $(window).height();
      footerBottom = updateFooterBounds();

      if (windowWidth <= 768) {
        settings.tulipCount = Math.round(options.tulipCount * 0.5);
        settings.minSize = 4;
        settings.maxSize = 10;
      } else {
        settings.tulipCount = options.tulipCount;
        settings.minSize = options.minSize;
        settings.maxSize = options.maxSize;
      }
    });

    for (let i = 0; i < settings.tulipCount; i++) {
      const isFastNumber = Math.random() < 0.25; // 25% швидких сердечок
      const x = Math.random() * windowWidth;
      const y = Math.random() * windowHeight;
      const size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
      const speed = isFastNumber ? (Math.random() * 1 + 1) * 1.5 : Math.random() * 1 + 1;
      const amplitude = Math.random() * 30 + 10;

      // Вибираємо відповідний SVG залежно від типу сердечка
      const Number = $(isFastNumber ? fastSvg : slowSvg)
        .css({
          position: "fixed",
          top: `${y}px`,
          left: `${x}px`,
          width: `${size}px`,
          height: `${size}px`,
          pointerEvents: "none",
          borderRadius: `${settings.round}px`,
          zIndex: "9999",
          willChange: "transform",
        })
        .appendTo(this);

      animateNumber(Number, size, speed, amplitude, isFastNumber);
    }

    function animateNumber(Number, size, speed, amplitude, isFastNumber, step = 0) {
      let top = parseFloat(Number.css("top"));
      const angleSpeed = Math.random() * 0.05 + 0.01;

      const animate = () => {
        top += speed;
        const oscillationX = Math.sin(step) * amplitude;
        const oscillationY = Math.cos(step * 0.5) * 2;

        Number.css({
          transform: `translate(${oscillationX}px, ${top + oscillationY}px)`,
        });

        step += angleSpeed;

        if (top > windowHeight) {
          top = -size; // Перезапуск зверху
        }

        if (top < footerBottom) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  };

  $.womensDay = function (element, options) {
    $(element).each(function () {
      $(this).womensDay(options);
    });
  };
})(jQuery);