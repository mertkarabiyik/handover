/*
 * Handover – tıklanabilir prototip çekirdeği.
 * Derleme yok: dosyayı tarayıcıda açmak yeterli (file:// dahil).
 * Her ekran src/ui/screens/ altında Handover.screens[ad] = { title, mount(root) } olarak kaydolur.
 */
(function () {
  'use strict';

  var H = (window.Handover = window.Handover || {});
  H.screens = H.screens || {};

  var leaveFns = [];

  /** Ekrandan çıkarken çalışacak temizlik (zamanlayıcılar vb.). */
  H.onLeave = function (fn) { leaveFns.push(fn); };

  /** Ekrandan çıkınca otomatik durdurulan setInterval. */
  H.every = function (ms, fn) {
    var id = setInterval(fn, ms);
    H.onLeave(function () { clearInterval(id); });
    return function stop() { clearInterval(id); };
  };

  H.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  H.icons = {
    back: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    play: '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>',
    search: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>'
  };

  /** FLX4 durumu. Prototipte MIDI yok; gerçek bağlantı src/midi ile gelecek. */
  H.flx4Pill = function (short) {
    return '<span class="status-pill" title="Prototip: MIDI bağlantısı henüz yok">' +
      '<span aria-hidden="true" class="dot"></span>' + (short ? 'FLX4 · demo' : 'DDJ-FLX4 · demo modu') + '</span>';
  };

  var NAV = [
    ['antrenman', 'Antrenman'],
    ['kutuphane', 'Kütüphane'],
    ['set', 'Set'],
    ['kesif', 'Keşif']
  ];

  /** Ana menülü üst bar. right: sağ tarafa konacak HTML (yoksa FLX4 durumu). */
  H.mainHeader = function (active, right) {
    var links = NAV.map(function (n) {
      return '<a href="#/' + n[0] + '"' + (n[0] === active ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
    }).join('');
    return '<header class="topbar"><div class="topbar-left">' +
      '<a class="logo" href="#/antrenman">Hand<span>o</span>ver</a>' +
      '<nav class="nav" aria-label="Ana menü">' + links + '</nav></div>' +
      (right || H.flx4Pill()) + '</header>';
  };

  /** Geri düğmeli üst bar (ders, drill, B2B). */
  H.backHeader = function (href, label, right) {
    return '<header class="topbar"><a class="back" href="' + href + '">' + H.icons.back + H.esc(label) + '</a>' +
      '<div class="topbar-right">' + (right || '') + '</div></header>';
  };

  /** Örnek dalga formu yükseklikleri (px). Sabit tohumla, her açılışta aynı. */
  H.waveHeights = function (count, seed, max) {
    var out = [];
    for (var i = 0; i < count; i++) {
      var h = 18 + Math.abs(Math.sin(i * 0.9 + seed) * 30 + Math.sin(i * 0.23 + seed * 2) * 22);
      if (i % 4 === 0) h += 14;
      out.push(Math.round(Math.min(max, h)));
    }
    return out;
  };

  H.waveHTML = function (cls, heights, played) {
    return '<div class="wave ' + cls + '" aria-hidden="true">' + heights.map(function (h, i) {
      return '<span style="height:' + h + 'px"' + (i < played ? ' class="played"' : '') + '></span>';
    }).join('') + '</div>';
  };

  /** Uyum etiketi: 0 temiz, 1 dikkat, 2 zor. */
  H.fitPill = function (lv) {
    return '<span class="pill ' + ['clean', 'careful', 'hard'][lv] + '">' + ['✓ Temiz', '! Dikkat', '✕ Zor'][lv] + '</span>';
  };

  var toastTimer;
  H.toast = function (msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2600);
  };

  function route() {
    var name = (location.hash.replace(/^#\/?/, '').split('?')[0]) || 'antrenman';
    if (!H.screens[name]) name = 'antrenman';
    return name;
  }

  function render() {
    while (leaveFns.length) {
      try { leaveFns.pop()(); } catch (e) { /* temizlik hatası ekranı bozmasın */ }
    }
    var root = document.getElementById('app');
    var screen = H.screens[route()];
    root.onclick = null;
    root.oninput = null;
    root.innerHTML = '';
    document.title = 'Handover · ' + screen.title;
    screen.mount(root);
    window.scrollTo(0, 0);
    var h1 = root.querySelector('h1');
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }

  H.start = function () {
    window.addEventListener('hashchange', render);
    render();
  };
})();
