/* LAHOTE – JavaScript du thème (aucune dépendance, aucun build) */
(function () {
  'use strict';

  // Menu mobile
  var nav = document.querySelector('[data-nav]');
  var toggle = document.querySelector('[data-nav-toggle]');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Prix et disponibilité dynamiques selon la variante choisie
  var select = document.querySelector('[data-variant-select]');
  if (select) {
    var price = document.querySelector('[data-price]');
    var add = document.querySelector('[data-add]');
    var update = function () {
      var o = select.options[select.selectedIndex];
      if (price) price.textContent = o.getAttribute('data-price');
      var ok = o.getAttribute('data-available') === 'true';
      if (add) {
        add.disabled = !ok;
        add.textContent = ok ? add.getAttribute('data-label') : add.getAttribute('data-soldout');
      }
    };
    select.addEventListener('change', update);
    update();
  }

  // Neige décorative (désactivée si « réduire les animations »)
  var canvas = document.getElementById('snow');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = canvas.getContext('2d');
    var w, h;
    var resize = function () { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    var base = parseInt(canvas.getAttribute('data-count'), 10) || 70;
    var n = window.innerWidth < 760 ? Math.round(base / 2) : base;
    var flakes = [];
    for (var i = 0; i < n; i++) {
      flakes.push({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 3, v: 0.3 + Math.random() * 0.9, d: Math.random() * 6.28 });
    }
    var draw = function () {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,.92)';
      ctx.shadowColor = 'rgba(73,55,47,.35)';
      ctx.shadowBlur = 3;
      for (var j = 0; j < flakes.length; j++) {
        var f = flakes[j];
        f.y += f.v; f.d += 0.01; f.x += Math.sin(f.d) * 0.4;
        if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.2832); ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    draw();
  }
})();
