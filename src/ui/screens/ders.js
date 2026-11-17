/* Ders: bass swap. Tasarım: design/Ders.dc.html */
(function () {
  'use strict';
  var H = window.Handover;

  var SWAP = 17; // ikinci phrase'in ilk vuruşu

  function beatRow(label, onBefore) {
    var cells = '';
    for (var i = 1; i <= 32; i++) {
      var on = onBefore ? i < SWAP : i >= SWAP;
      cells += '<span class="beat' + (on ? ' on' : '') + (i === SWAP ? ' swap' : '') + '"></span>';
    }
    return '<div class="tl-row"><span class="tl-label">' + label + '</span><div class="tl-grid">' + cells + '</div></div>';
  }

  function numberRow() {
    var cells = '';
    for (var i = 1; i <= 32; i++) {
      var show = i === 1 || i === 9 || i === 17 || i === 25;
      cells += '<span class="tl-num' + (i === SWAP ? ' swap' : '') + '">' + (show ? i : '') + '</span>';
    }
    return '<div class="tl-row" aria-hidden="true"><span class="tl-label"></span><div class="tl-grid">' + cells + '</div></div>';
  }

  var STEPS = [
    ['B\'nin Low EQ\'sunu tamamen kıs', 'Beatmatch\'i önceki seviyedeki gibi yap.'],
    ['B\'yi phrase başında başlat', 'A yeni bir 16\'lık bölüme girerken play\'e bas.'],
    ['16 vuruş say, basları değiştir', '17. vuruşta A\'nın Low\'unu kapat, B\'ninkini aç. Aynı anda.'],
    ['A\'yı yavaşça çıkar', 'Kalan 16 vuruşta A\'nın fader\'ını indir.']
  ];

  H.screens.ders = {
    title: 'Ders: bass swap',
    mount: function (root) {
      root.innerHTML = H.backHeader('#/antrenman', 'Antrenman',
          '<span class="mono muted" style="font-size:13px">Seviye 3 · Ders 1 / 3</span>') +
        '<main class="page">' +
          '<div style="display:flex;flex-direction:column;gap:8px">' +
            '<p class="eyebrow cue" style="font-size:13px">Geçiş stili</p>' +
            '<h1 class="h1 xl">Bass swap</h1>' +
            '<p class="lead" style="margin-top:4px">İki kick ve iki bas aynı anda çalarsa ses çamurlaşır. Bass swap\'ta basları değiştirirsin: phrase başında A\'nın basını kesip B\'ninkini açarsın. Teknoda 16 ya da 32 vuruşluk bölümlerde yapılır.</p>' +
          '</div>' +

          '<section class="card" aria-labelledby="tl">' +
            '<div class="spread baseline"><h2 id="tl" class="h3">32 vuruşluk geçiş</h2>' +
            '<span class="mono muted" style="font-size:13px">her kare 1 vuruş · 4 vuruş = 1 ölçü</span></div>' +
            '<p class="sr-only">A\'nın bası 1 ile 16. vuruşlar arasında açık, 17. vuruşta kapanır. B\'nin bası 17. vuruşta açılır ve 32. vuruşa kadar açık kalır.</p>' +
            '<div class="timeline-scroll" aria-hidden="true"><div class="timeline">' +
              beatRow('A · Low EQ', true) + beatRow('B · Low EQ', false) + numberRow() +
            '</div></div>' +
            '<div class="legend">' +
              '<span><span aria-hidden="true" class="sw on"></span>Bas açık</span>' +
              '<span><span aria-hidden="true" class="sw off"></span>Bas kapalı</span>' +
              '<span><span aria-hidden="true" class="sw line"></span>Swap anı: 17. vuruş, ikinci phrase\'in başı</span>' +
            '</div>' +
          '</section>' +

          '<section aria-labelledby="steps" style="display:flex;flex-direction:column;gap:14px">' +
            '<h2 id="steps" class="h3">Adımlar</h2>' +
            '<ol class="steps">' + STEPS.map(function (s, i) {
              return '<li class="step"><span class="step-n">0' + (i + 1) + '</span><strong>' + s[0] + '</strong><span class="muted">' + s[1] + '</span></li>';
            }).join('') + '</ol>' +
          '</section>' +

          '<div style="display:flex;flex-direction:column;gap:8px">' +
            '<div class="btns">' +
              '<a class="btn primary lg" href="#/drill">Drill\'e başla: 5 deneme</a>' +
              // REVIEW.md madde 9: örnek sesin lisanslı kaynağı yok. Kütüphane gelince kullanıcının kendi iki şarkısıyla üretilecek.
              '<button type="button" class="btn lg" disabled aria-describedby="sample-hint">Örneği dinle</button>' +
            '</div>' +
            '<p id="sample-hint" class="hint">Örnek, kütüphanendeki iki şarkıyla otomatik çalınacak. Kütüphane henüz hazır değil.</p>' +
          '</div>' +
        '</main>';
    }
  };
})();
