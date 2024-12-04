Date.now ||
  (Date.now = function () {
    return new Date().getTime();
  }),
  (function () {
    "use strict";
    for (
      var t = ["webkit", "moz"], e = 0;
      e < t.length && !window.requestAnimationFrame;
      ++e
    ) {
      var i = t[e];
      (window.requestAnimationFrame = window[i + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[i + "CancelAnimationFrame"] ||
          window[i + "CancelRequestAnimationFrame"]);
    }
    if (
      /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) ||
      !window.requestAnimationFrame ||
      !window.cancelAnimationFrame
    ) {
      var s = 0;
      (window.requestAnimationFrame = function (t) {
        var e = Date.now(),
          i = Math.max(s + 16, e);
        return setTimeout(function () {
          t((s = i));
        }, i - e);
      }),
        (window.cancelAnimationFrame = clearTimeout);
    }
  })(),
  (function (t) {
    (t.snowfall = function (e, i) {
      function s(s, n, a, r) {
        (this.x = s),
          (this.y = n),
          (this.size = a),
          (this.speed = r),
          (this.step = 0),
          (this.stepSize = h(1, 10) / 100),
          i.collection && (this.target = m[h(0, m.length - 1)]);

        // Создаем контейнер для инлайн SVG
        let p = document.createElement("div");
        p.innerHTML = i.svg; // Встраиваем SVG в HTML
        p = p.firstElementChild;

        t(p).css({
          width: `${this.size}px`,
          height: `${this.size}px`,
        });

        t(p).attr({ class: "snowfall-flakes" }).css({
          position: i.flakePosition,
          top: this.y,
          left: this.x,
          fontSize: 0,
          zIndex: i.flakeIndex,
        }),
          t(e).get(0).tagName === t(document).get(0).tagName
            ? (t("body").append(t(p)), (e = t("body")))
            : t(e).append(t(p)),
          (this.element = p),
          (this.update = function () {
            (this.y += this.speed),
              this.y > l - (this.size + 6) && this.reset(),
              (this.element.style.top = this.y + "px"),
              (this.element.style.left = this.x + "px"),
              (this.step += this.stepSize),
              y === !1
                ? (this.x += Math.cos(this.step))
                : (this.x += y + Math.cos(this.step)),
              (this.x + this.size > d - c || this.x < c) && this.reset();
          }),
          (this.reset = function () {
            (this.y = 0),
              (this.x = h(c, d - c)),
              (this.stepSize = h(1, 10) / 100),
              (this.size = h(100 * i.minSize, 100 * i.maxSize) / 100),
              (this.speed = h(i.minSpeed, i.maxSpeed));
          });
      }
      function n() {
        for (r = 0; r < a.length; r += 1) a[r].update();
        p = requestAnimationFrame(function () {
          n();
        });
      }
      var a = [],
        o = {
          flakeCount: 35,
          svg: null, // Сюда передается ваш инлайн-SVG
          flakePosition: "absolute",
          flakeIndex: 999999,
          minSize: 10,
          maxSize: 30,
          minSpeed: 1,
          maxSpeed: 5,
        },
        i = t.extend(o, i),
        h = function (t, e) {
          return Math.round(t + Math.random() * (e - t));
        };
      t(e).data("snowfall", this);
      var r = 0,
        l = t(e).height(),
        d = t(e).width(),
        c = 0,
        p = 0;

      for (r = 0; r < i.flakeCount; r += 1)
        a.push(
          new s(
            h(c, d - c),
            h(0, l),
            h(100 * i.minSize, 100 * i.maxSize) / 100,
            h(i.minSpeed, i.maxSpeed)
          )
        );

      n(),
        (this.clear = function () {
          t(e).children(".snowfall-flakes").remove(), cancelAnimationFrame(p);
        });
    }),
      (t.fn.snowfall = function (e) {
        return "object" == typeof e || void 0 == e
          ? this.each(function (i) {
              new t.snowfall(this, e);
            })
          : void 0;
      });
  })(jQuery);

// Пример вызова с инлайн SVG
$("body").snowfall({
  svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="#00bfff" d="M17 0H3C1.346 0 0 1.346 0 3v26c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3zM3 2h14a1 1 0 0 1 1 1v21H2V3a1 1 0 0 1 1-1zm14 28H3a1 1 0 0 1-1-1v-3h16v3a1 1 0 0 1-1 1z"/>
        <path fill="#00bfff" d="M4.707 27.478c.391.365.391.956 0 1.321s-1.024.365-1.414 0c-.391-.365-.391-.956 0-1.321s1.024-.365 1.414 0z"/>      
    </svg>
  `,
  flakeCount: 50,
  maxSize: 25,
});
