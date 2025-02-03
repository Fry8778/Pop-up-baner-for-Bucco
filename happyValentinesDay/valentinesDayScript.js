(function ($) {
    $.fn.heartfall = function (options) {
      // Настройки по умолчанию
      const settings = $.extend(
        {
          heartCount: 8,
          minSize: 9,
          maxSize: 16,      
        },
        options
      );
  
      // Адаптация для мобильных устройств
      if ($(window).width() <= 768) {
        settings.heartCount = Math.round(settings.heartCount * 0.5); // Уменьшение количества сердечек
        settings.minSize = 4; // Уменьшение минимального размера сердечек
        settings.maxSize = 10; // Уменьшение максимального размера сердечек
      }
        const svgHeart = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32">
            <path fill="#f00" d="M14.75 28.818c-0.683-0.766-2.39-2.259-3.792-3.318-4.155-3.138-4.72-3.592-6.407-5.145-3.11-2.864-4.431-5.741-4.426-9.642 0.002-1.904 0.132-2.638 0.665-3.76 0.905-1.904 2.238-3.32 3.942-4.185 1.207-0.613 1.802-0.885 3.817-0.897 2.108-0.012 2.552 0.234 3.792 0.915 1.509 0.829 3.063 2.601 3.384 3.86l0.198 0.778 0.489-1.071c2.764-6.051 11.589-5.961 14.661 0.15 0.974 1.939 1.081 6.078 0.217 8.41-1.127 3.042-3.244 5.361-8.137 8.914-3.209 2.331-6.841 5.857-7.094 6.352-0.293 0.575-0.014 0.090-1.31-1.362z"/>
                   
            </svg>`;
                
      let windowWidth = $(window).width();
      let windowHeight = $(window).height();
      const footer = $("footer");
  
      const updateFooterBounds = () => {
        const footerTop = footer.offset() ? footer.offset().top : $(document).height();
        return footerTop + footer.outerHeight();
      };
      let footerBottom = updateFooterBounds();
  
      // Пересчитываем размеры при изменении окна
      $(window).on("resize", function () {
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        footerBottom = updateFooterBounds();
  
        // Пересчитываем настройки при изменении размера окна
        if (windowWidth <= 768) {
          settings.heartCount = Math.round(options.heartCount * 0.5);
          settings.minSize = 4;
          settings.maxSize = 10;
        } else {
          settings.heartCount = options.heartCount;
          settings.minSize = options.minSize;
          settings.maxSize = options.maxSize;
        }
      });
  
      for (let i = 0; i < settings.heartCount; i++) {
        const isFastHeart = Math.random() < 0.25; // 25% быстрых сердечек
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        const size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
        const speed = isFastHeart ? (Math.random() * 1 + 1) * 1.5 : Math.random() * 1 + 1;
        const amplitude = Math.random() * 30 + 10;
  
        const Heart = $(svgHeart)
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
  
        animateHeart(Heart, size, speed, amplitude, isFastHeart);
      }
  
      function animateHeart(Heart, size, speed, amplitude, isFastHeart, step = 0) {
        let top = parseFloat(Heart.css("top"));
        const angleSpeed = Math.random() * 0.05 + 0.01;
  
        const animate = () => {
          top += speed;
          const oscillationX = Math.sin(step) * amplitude;
          const oscillationY = Math.cos(step * 0.5) * 2;
  
          Heart.css({
            transform: `translate(${oscillationX}px, ${top + oscillationY}px)`,
          });
  
          step += angleSpeed;
  
          if (top > windowHeight) {
            top = -size; // Перезапуск сверху
          }
  
          if (top < footerBottom) {
            requestAnimationFrame(animate);
          }
        };
  
        animate();
      }
    };
  
    $.heartfall = function (element, options) {
      $(element).each(function () {
        $(this).heartfall(options);
      });
    };
  })(jQuery);