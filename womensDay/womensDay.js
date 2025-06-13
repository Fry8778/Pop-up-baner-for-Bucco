  (function ($) {
    $.fn.womensDay = function (options) {
      // Налаштування за замовчуванням
      const settings = $.extend(
        {
          tulipCount: 12,
          minSize: 20,
          maxSize: 25,
         
        },
        options
      );
  
      // Адаптація для мобільних пристроїв
      if ($(window).width() <= 768) {
        settings.tulipCount = Math.round(settings.tulipCount * 0.5);
        settings.minSize = 7;
        settings.maxSize = 12;
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
           <path fill="#7fb241" d="M24.856 19.362a.354.354 0 0 0-.4.044c-.595.513-1.376.357-2.366.159-.864-.173-1.844-.368-2.889-.092-1.28.439-2.642 1.765-2.704 4.17-.144.127-.288.263-.432.404V13.42a.355.355 0 0 0-.71 0v6.492c-.121-.118-.242-.23-.363-.337-.062-2.263-1.347-3.512-2.579-3.934-.965-.253-1.887-.069-2.7.093-.923.184-1.653.33-2.204-.145a.355.355 0 0 0-.584.314c.284 2.225.724 4.315 2.963 5.438.464.206.948.307 1.443.307 1.08 0 2.213-.49 3.308-1.433.236.216.473.455.715.718v10.501a.355.355 0 0 0 .71 0V25.07c.265-.289.525-.55.784-.786 1.164 1.007 2.367 1.532 3.521 1.532.529 0 1.047-.109 1.546-.33 2.358-1.183 2.824-3.402 3.126-5.765a.356.356 0 0 0-.184-.358z"></path>
      <path fill="#e14b4b" d="M17.663.32a.353.353 0 0 0-.521-.052l-1.438 1.316L14.266.268a.351.351 0 0 0-.521.052c-.83 1.134-1.281 2.347-1.342 3.605a.357.357 0 0 0 .022.141c.915 2.424 1.909 3.625 3.037 3.673l.069.001c1.14 0 2.266-1.194 3.438-3.647a.347.347 0 0 0 .034-.168c-.06-1.258-.512-2.471-1.342-3.605z"></path>
      <path fill="#bf3333" d="m15.712 6.955.248-.248-4.72-4.72a.352.352 0 0 0-.497 0 7.025 7.025 0 0 0 0 9.924l.248-.248 4.72-4.707z"></path>
      <path fill="#d03f3e" d="M20.68 1.986a.352.352 0 0 0-.497 0l-9.427 9.427a.35.35 0 0 0 0 .496c1.368 1.368 3.165 2.052 4.962 2.052s3.594-.684 4.962-2.052c1.325-1.325 2.055-3.088 2.055-4.962s-.73-3.637-2.055-4.962z"></path>
    
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