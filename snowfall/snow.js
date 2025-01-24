Date.now || (Date.now = function () { return new Date().getTime(); });
(function () {
  "use strict";
  for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
    var i = t[e];
    window.requestAnimationFrame = window[i + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var s = 0;
    window.requestAnimationFrame = function (t) {
      var e = Date.now(),
        i = Math.max(s + 16, e);
      return setTimeout(function () { t((s = i)); }, i - e);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
})();

(function (t) {
  // Добавляем CSS для снежинок в head
  var snowflakeStyle = `
    <style>
      .snowflake {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid #00bfff;
        transform: rotate(45deg);
        box-shadow: 0 0 5px rgba(0, 191, 255, 0.8);
      }
    </style>
  `;
  document.head.insertAdjacentHTML("beforeend", snowflakeStyle);

  t.snowfall = function (e, i) {
    function s(s, n, a, r) {
      this.x = s;
      this.y = n;
      this.size = a;
      this.speed = r;
      this.step = 0;
      this.stepSize = h(1, 10) / 100;
      i.collection && (this.target = m[h(0, m.length - 1)]);
      var p = document.createElement("div");
      t(p).attr({ class: "snowflake snowfall-flakes" }).css({
        top: this.y,
        left: this.x,
        fontSize: 0,
        zIndex: i.flakeIndex,
      });
      t(e).get(0).tagName === t(document).get(0).tagName
        ? (t("body").append(t(p)), (e = t("body")))
        : t(e).append(t(p));
      this.element = p;
      this.update = function () {
        this.y += this.speed;
        if (this.y > l - (this.size + 6)) this.reset();
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
        this.step += this.stepSize;
        y === false ? (this.x += Math.cos(this.step)) : (this.x += y + Math.cos(this.step));
        (this.x + this.size > d - c || this.x < c) && this.reset();
      };
      this.reset = function () {
        this.y = 0;
        this.x = h(c, d - c);
        this.stepSize = h(1, 10) / 100;
        this.size = h(100 * i.minSize, 100 * i.maxSize) / 100;
        this.speed = h(i.minSpeed, i.maxSpeed);
      };
    }

    function n() {
      for (r = 0; r < a.length; r += 1) a[r].update();
      p = requestAnimationFrame(function () { n(); });
    }

    var a = [], o = t.extend({
      flakeCount: 35,
      flakeIndex: 999999,
      minSize: 1,
      maxSize: 2,
      minSpeed: 1,
      maxSpeed: 5,
      round: false,
      shadow: false,
      collection: false,
      collectionHeight: 40,
      deviceorientation: false,
    }, i);
    
    var h = function (t, e) { return Math.round(t + Math.random() * (e - t)); };
    t(e).data("snowfall", this);
    var r = 0, l = t(e).height(), d = t(e).width(), c = 0, p = 0;
    for (r = 0; r < o.flakeCount; r += 1) {
      a.push(new s(h(c, d - c), h(0, l), h(100 * o.minSize, 100 * o.maxSize) / 100, h(o.minSpeed, o.maxSpeed)));
    }
    n();
    this.clear = function () {
      t(".snowfall-flakes").remove();
      cancelAnimationFrame(p);
    };
  };

  t.fn.snowfall = function (e) {
    return typeof e === "object" || e === undefined
      ? this.each(function () { new t.snowfall(this, e); })
      : this.each(function () {
        var i = t(this).data("snowfall");
        i && i.clear();
      });
  };
})(jQuery);
