(function ($) {
    $.fn.snowfall = function (options) {
      const settings = $.extend(
        {
          flakeCount: 120,
          minSize: 7,
          maxSize: 15,
          round: 4,
        },
        options
      );
  
      const svgFlake = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32">
            <path fill="#75c4fe" style="fill: var(--color1, #75c4fe)" d="M27.77 19.989c0.052 0.271-0.125 0.533-0.396 0.586l-2.254 0.435 0.54 2.015c0.071 0.267-0.087 0.541-0.354 0.612s-0.541-0.087-0.612-0.354l-0.679-2.534c-0.036-0.134-0.015-0.277 0.059-0.395s0.193-0.199 0.329-0.226l2.781-0.536c0.271-0.052 0.533 0.125 0.586 0.396z"/>
            <path fill="#75c4fe" style="fill: var(--color1, #75c4fe)" d="M7.804 10.573c0.065 0.243-0.060 0.496-0.292 0.592l-2.163 0.893c-0.255 0.105-0.548-0.016-0.653-0.271s0.016-0.548 0.271-0.653l1.757-0.726-0.513-1.915c-0.071-0.267 0.087-0.541 0.354-0.612s0.541 0.087 0.612 0.354l0.627 2.339z"/>
            <path fill="#75c4fe" style="fill: var(--color1, #75c4fe)" d="M25.546 7.874c0.261 0.091 0.398 0.376 0.307 0.637l-0.759 2.166 2.013 0.548c0.266 0.072 0.424 0.347 0.351 0.614s-0.347 0.424-0.614 0.351l-2.531-0.688c-0.134-0.036-0.247-0.127-0.311-0.25s-0.075-0.267-0.029-0.398l0.936-2.673c0.091-0.261 0.377-0.398 0.637-0.307z"/>
            <path fill="#75c4fe" style="fill: var(--color1, #75c4fe)" d="M7.362 20.39c0.242 0.066 0.398 0.301 0.364 0.55l-0.317 2.319c-0.037 0.274-0.29 0.465-0.563 0.428s-0.465-0.29-0.428-0.563l0.257-1.884-1.913-0.52c-0.266-0.072-0.424-0.347-0.351-0.614s0.347-0.424 0.614-0.351l2.337 0.635z"/>
            <path fill="#75c4fe" style="fill: var(--color1, #75c4fe)" d="M13.867 3.716c0.209-0.181 0.524-0.158 0.705 0.050l1.503 1.735 1.475-1.475c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-1.855 1.855c-0.098 0.098-0.233 0.151-0.371 0.146s-0.269-0.067-0.36-0.172l-1.855-2.14c-0.181-0.209-0.158-0.524 0.050-0.705z"/>
            <path fill="#75c4fe" style="fill: var(--color1, #75c4fe)" d="M15.696 25.715c0.178-0.178 0.459-0.196 0.658-0.043l1.855 1.427c0.219 0.168 0.26 0.482 0.091 0.701s-0.482 0.26-0.701 0.091l-1.507-1.159-1.402 1.402c-0.195 0.195-0.512 0.195-0.707 0s-0.195-0.512 0-0.707l1.712-1.712z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M28.165 22.737c-0.184 0.319-0.592 0.428-0.911 0.244l-22.862-13.199c-0.319-0.184-0.428-0.592-0.244-0.911s0.592-0.428 0.911-0.244l22.862 13.199c0.319 0.184 0.428 0.592 0.244 0.911z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M27.017 17.703c0.12 0.348-0.065 0.728-0.413 0.847l-3.603 1.24 0.448 3.715c0.044 0.366-0.217 0.698-0.582 0.742s-0.698-0.217-0.742-0.582l-0.512-4.25c-0.038-0.312 0.148-0.608 0.445-0.71l4.112-1.415c0.348-0.12 0.728 0.065 0.847 0.413z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M10.7 12.178c0.042 0.3-0.123 0.591-0.403 0.708l-3.476 1.454c-0.34 0.142-0.73-0.018-0.872-0.358s0.018-0.73 0.358-0.872l3.001-1.255-0.511-3.617c-0.052-0.365 0.202-0.702 0.567-0.753s0.702 0.202 0.753 0.567l0.583 4.126z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M28.12 8.915c0.183 0.32 0.072 0.727-0.247 0.91l-22.911 13.114c-0.32 0.183-0.727 0.072-0.91-0.247s-0.072-0.727 0.247-0.91l22.911-13.114c0.32-0.183 0.727-0.072 0.91 0.247z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M23.192 7.375c0.361 0.072 0.596 0.423 0.524 0.784l-0.742 3.738 3.436 1.483c0.338 0.146 0.494 0.538 0.348 0.876s-0.538 0.494-0.876 0.348l-3.93-1.696c-0.289-0.124-0.451-0.434-0.39-0.742l0.846-4.266c0.072-0.361 0.423-0.596 0.784-0.524z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M10.207 18.695c0.281 0.114 0.449 0.404 0.409 0.705l-0.493 3.735c-0.048 0.365-0.383 0.622-0.748 0.574s-0.622-0.383-0.574-0.748l0.426-3.224-3.383-1.378c-0.341-0.139-0.505-0.528-0.366-0.869s0.528-0.505 0.869-0.366l3.859 1.572z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M16.050 2c0.368 0 0.667 0.298 0.667 0.667v26.398c0 0.368-0.298 0.667-0.667 0.667s-0.667-0.298-0.667-0.667v-26.398c0-0.368 0.298-0.667 0.667-0.667z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M12.265 5.511c0.242-0.278 0.663-0.307 0.941-0.066l2.875 2.5 2.994-2.245c0.295-0.221 0.712-0.161 0.933 0.133s0.161 0.712-0.133 0.933l-3.425 2.568c-0.251 0.189-0.6 0.176-0.837-0.030l-3.282-2.854c-0.278-0.242-0.307-0.663-0.066-0.941z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M15.639 22.404c0.239-0.187 0.574-0.189 0.815-0.005l2.997 2.283c0.293 0.223 0.349 0.641 0.126 0.934s-0.641 0.349-0.934 0.126l-2.587-1.971-2.877 2.251c-0.29 0.227-0.709 0.176-0.936-0.114s-0.176-0.709 0.114-0.936l3.282-2.569z"/>
            <path fill="#43aefc" style="fill: var(--color2, #43aefc)" d="M12.13 9.235c0.18-0.112 0.403-0.132 0.6-0.053l3.352 1.341 3.631-1.076c0.182-0.054 0.379-0.028 0.541 0.073s0.273 0.265 0.305 0.452l0.533 3.064 2.407 2.274c0.136 0.128 0.211 0.307 0.209 0.494s-0.083 0.363-0.222 0.488l-2.559 2.289-0.949 3.797c-0.048 0.19-0.176 0.35-0.352 0.436s-0.381 0.092-0.561 0.013l-3.052-1.327-3.328 1.065c-0.194 0.062-0.406 0.032-0.575-0.082s-0.277-0.299-0.293-0.502l-0.26-3.374-3.139-1.962c-0.186-0.116-0.303-0.317-0.313-0.537s0.090-0.43 0.266-0.562l3.183-2.387 0.262-3.409c0.016-0.212 0.132-0.403 0.312-0.515zM13.078 10.757l-0.216 2.805c-0.015 0.191-0.111 0.367-0.265 0.482l-2.647 1.985 2.6 1.625c0.18 0.112 0.295 0.303 0.311 0.514l0.221 2.869 2.764-0.884c0.154-0.049 0.321-0.041 0.469 0.024l2.56 1.113 0.808-3.232c0.032-0.129 0.103-0.246 0.202-0.335l2.171-1.942-2.041-1.928c-0.105-0.099-0.174-0.229-0.199-0.37l-0.442-2.544-3.135 0.929c-0.144 0.043-0.298 0.035-0.437-0.020l-2.725-1.090z"/>
            <path fill="#75c4fe" style="fill: var(--color1, #75c4fe)" d="M16.038 10.728c0.189-0.004 0.365 0.098 0.454 0.266l1.128 2.13 2.664-0.254c0.185-0.018 0.364 0.069 0.466 0.224s0.109 0.354 0.019 0.517l-1.279 2.302 1.258 1.887c0.102 0.153 0.112 0.351 0.025 0.513s-0.256 0.264-0.441 0.264h-2.68l-1.149 2.425c-0.083 0.175-0.259 0.286-0.453 0.286s-0.369-0.112-0.452-0.287l-1.022-2.173-2.29-0.255c-0.173-0.019-0.324-0.128-0.398-0.286s-0.060-0.343 0.037-0.489l1.242-1.863-1.527-2.291c-0.107-0.161-0.112-0.369-0.012-0.535s0.286-0.259 0.478-0.24l2.502 0.25 0.991-2.106c0.081-0.171 0.251-0.283 0.441-0.287zM16.076 12.347l-0.715 1.52c-0.090 0.192-0.291 0.306-0.502 0.285l-1.801-0.18 1.126 1.688c0.112 0.168 0.112 0.387 0 0.555l-0.971 1.457 1.752 0.195c0.173 0.019 0.323 0.127 0.397 0.284l0.691 1.468 0.831-1.754c0.083-0.175 0.259-0.286 0.452-0.286h2.062l-0.909-1.363c-0.104-0.156-0.112-0.357-0.021-0.52l0.965-1.738-2.051 0.195c-0.201 0.019-0.395-0.085-0.489-0.264l-0.816-1.541z"/>
                       
            </svg>`; // пример снежинки
  
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
      });
  
      if (windowWidth > 768) {
        for (let i = 0; i < settings.flakeCount; i++) {
          createFlake(this);
        }
      }
  
      function createFlake(container) {
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        const size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
        const speed = Math.random() * 2 + 1;
  
        const flake = $(svgFlake)
          .css({
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`,
            width: `${size}px`,
            height: `${size}px`,
            pointerEvents: "none",
            borderRadius: `${settings.round}px`,
            zIndex: "9999",
            willChange: "transform",
          })
          .appendTo(container);
  
        animateFlake(flake, size, speed);
      }
  
      function animateFlake(flake, size, speed, step = 0) {
        let top = parseFloat(flake.css("top"));
        let left = parseFloat(flake.css("left"));
        const angleSpeed = Math.random() * 0.05 + 0.01;
  
        const animate = () => {
          top += speed;
          const oscillation = Math.sin(step) * 5;
          left += oscillation;
  
          flake.css({
            transform: `translate(${oscillation}px, ${top}px)`,
            left: `${left}px`
          });
  
          step += angleSpeed;
  
          if (top > windowHeight + 50 || left > windowWidth || left < 0) {
            flake.remove(); // Удаляем снежинку за пределами экрана
          } else if (top < footerBottom) {
            requestAnimationFrame(animate);
          }
        };
  
        animate();
      }
    };
  
    $.snowfall = function (element, options) {
      $(element).each(function () {
        $(this).snowfall(options);
      });
    };
  })(jQuery);
  