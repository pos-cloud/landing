(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var words = [
    "restaurante",
    "distribuidora",
    "tienda de ropa",
    "zapatería",
    "ferretería",
    "farmacia",
    "panadería",
    "fábrica",
    "kiosco",
    "vinoteca",
    "óptica",
    "librería",
    "taller",
    "carnicería",
    "heladería",
    "corralón",
    "dietética",
    "mueblería",
    "pet shop",
    "mayorista",
    "cafetería",
    "juguetería",
    "supermercado",
    "verdulería",
    "joyería",
    "bicicletería",
    "perfumería",
    "rotisería"
  ];

  var spin = document.querySelector("[data-spin]");
  if (spin && !reduce) {
    var index = 0;
    window.setInterval(function () {
      index = (index + 1) % words.length;
      spin.classList.add("is-out");
      window.setTimeout(function () {
        spin.textContent = words[index];
        spin.classList.remove("is-out");
      }, 280);
    }, 1500);
  }

  document.querySelectorAll("[data-marquee]").forEach(function (box) {
    var track = box.querySelector(".marquee-track");
    if (!track || reduce) return;
    var clones = Array.prototype.map.call(track.children, function (node) {
      return node.cloneNode(true);
    });
    clones.forEach(function (node) {
      track.appendChild(node);
    });
    track.classList.add("is-on");
  });

  var practices = document.querySelectorAll(".practice");
  if (practices.length && !reduce) {
    var current = 0;
    var light = function () {
      practices.forEach(function (item) {
        item.classList.remove("is-on");
      });
      practices[current].classList.add("is-on");
      current = (current + 1) % practices.length;
    };
    light();
    window.setInterval(light, 1400);
  }

  var screens = document.querySelectorAll(".screen");
  var dots = document.querySelectorAll(".rail a");
  if (!("IntersectionObserver" in window)) return;

  var watcher = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        document.body.dataset.theme = entry.target.dataset.theme || "dark";
        var id = entry.target.id;
        dots.forEach(function (dot) {
          dot.classList.toggle("is-on", dot.getAttribute("href") === "#" + id);
        });
      });
    },
    { threshold: 0.55 }
  );

  screens.forEach(function (screen) {
    watcher.observe(screen);
  });
})();
