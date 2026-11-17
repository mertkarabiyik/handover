/* Ana sayfa: bugünkü ders, partner notu, seviye yol haritası. Tasarım: design/Main.dc.html */
(function () {
  'use strict';
  var H = window.Handover;

  // Örnek veri. Gerçeği beceri modelinden gelecek (ARCHITECTURE.md).
  var LEVELS = [
    [1, 'Cue ve phrase sayma', 'done', 92],
    [2, 'Pitch ile beatmatch', 'done', 81],
    [3, 'Fader ve bass swap', 'now', 54],
    [4, 'Filtre ve echo out', 'locked', 0],
    [5, 'Uzun blend', 'locked', 0],
    [6, 'AI partnerle tam B2B', 'locked', 0]
  ];
  var TAG = { done: 'Tamam', now: 'Şimdi', locked: 'Kilitli' };

  function level(l) {
    var state = l[2];
    return '<li class="level ' + state + '">' +
      '<div class="spread"><span class="mono muted" style="font-size:13px">Seviye ' + l[0] + '</span>' +
      '<span class="pill ' + state + '">' + TAG[state] + '</span></div>' +
      '<div class="level-name">' + l[1] + '</div>' +
      '<div class="bar"><div class="' + (state === 'done' ? 'done' : '') + '" style="width:' + l[3] + '%"></div></div>' +
      '<div class="mono muted" style="font-size:13px">Beceri ' + (state === 'locked' ? '–' : l[3] + ' / 100') + '</div>' +
      '</li>';
  }

  H.screens.antrenman = {
    title: 'Antrenman',
    mount: function (root) {
      root.innerHTML = H.mainHeader('antrenman') +
        '<main class="page">' +
          '<div class="spread end">' +
            '<div><p class="eyebrow">Seviye 3 / 6 · Geçişler</p>' +
            '<h1 class="h1" style="margin-top:6px">Bugünkü antrenman</h1></div>' +
            '<div class="stats">' +
              '<div><div class="stat-label">Hedefe</div><div class="stat-value">89 gün</div></div>' +
              '<div><div class="stat-label">Seri</div><div class="stat-value">6 gün</div></div>' +
            '</div>' +
          '</div>' +

          '<div class="row">' +
            '<section class="card grow-big" aria-labelledby="next">' +
              '<div class="spread"><span class="eyebrow cue">Sıradaki ders</span><span class="mono muted" style="font-size:13px">~12 dk</span></div>' +
              '<h2 id="next" class="h2">Bass swap</h2>' +
              '<p class="muted" style="margin:0;max-width:56ch">İki şarkının basını aynı anda çaldırma. Phrase başında A deck\'in basını kes, B deck\'inkini aç. Teknodaki en temel geçiş.</p>' +
              '<div class="segments" role="img" aria-label="Ders ilerlemesi: 4 adımdan 1\'i tamam"><span class="on"></span><span></span><span></span><span></span></div>' +
              '<div class="btns">' +
                '<a class="btn primary" href="#/ders">Derse devam et</a>' +
                '<a class="btn" href="#/b2b">Partnerle B2B</a>' +
              '</div>' +
            '</section>' +

            '<section class="card grow-small" aria-labelledby="partner" style="gap:12px">' +
              '<span class="eyebrow">Partnerden not</span>' +
              '<h2 id="partner" style="margin:0;font-size:18px;font-weight:600">Son B2B\'de 3 geçişin ikisinde bası erken aldın.</h2>' +
              '<p class="muted" style="margin:0">Bugün bass swap\'ı phrase sayarak çalış, sonra tekrar maç yapalım. Bu sefer peak-time techno çalacağım.</p>' +
              '<div class="mono muted" style="margin-top:auto;display:flex;align-items:center;gap:10px;font-size:13px">' +
                '<span class="tag">Peak-time</span>128–132 BPM</div>' +
            '</section>' +
          '</div>' +

          '<section aria-labelledby="path" style="display:flex;flex-direction:column;gap:14px">' +
            '<h2 id="path" class="h3">Yol haritan</h2>' +
            '<ol class="levels">' + LEVELS.map(level).join('') + '</ol>' +
          '</section>' +
        '</main>';
    }
  };
})();
