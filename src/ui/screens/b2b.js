/*
 * AI partnerle B2B. Tasarım: design/B2B.dc.html
 * REVIEW.md madde 10: oturumu duraklatma ve bitirme kontrolleri eklendi.
 * Prototip: partner kararları ve uyum etiketleri örnektir; gerçeği src/partner'da kural tabanlı olacak.
 */
(function () {
  'use strict';
  var H = window.Handover;

  var PARTNER_BPM = 130;
  var START_SECONDS = 24 * 60 + 10;
  var START_BEATS = 48;

  // [kim, "BPM · key", uyum: 0 temiz, 1 dikkat, 2 zor, -1 şimdi]
  var HISTORY = [
    ['Sen', '126 · 8A', 0], ['Partner', '127 · 8A', 0], ['Sen', '128 · 9A', 1],
    ['Partner', '128 · 9A', 0], ['Sen', '128 · 10A', 0], ['Partner', '130 · 9A', -1]
  ];

  // [başlık, meta, uyum, neden]
  var OPTIONS = [
    ['[Şarkın 1]', '131 BPM · 10A · E9', 0, 'Komşu key, +1 BPM, enerjiyi bir basamak yukarı taşıyor. Partnerin istediği tam bu.'],
    ['[Şarkın 2]', '130 BPM · 9B · E8', 0, 'Aynı numara, majör eşi: temiz ama enerjiyi yükseltmiyor.'],
    ['[Şarkın 3]', '128 BPM · 8A · E9', 1, 'Key çapraz ve 2 BPM düşük: yapılabilir ama dikkat ister.'],
    ['[Şarkın 4]', '124 BPM · 3A · E6', 2, 'Key çakışıyor, BPM %4,6 düşük ve enerji düşüyor. Partnerin yükselişini keser.']
  ];

  var wave = H.waveHeights(72, 2.2, 62);

  function clock(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  H.screens.b2b = {
    title: 'AI partnerle B2B',
    mount: function (root) {
      var s = { picked: 0, loaded: null, paused: false, ended: false, sec: START_SECONDS, beats: START_BEATS };

      function turnText() {
        if (s.beats > 0) return { label: 'Sıra sana geçiyor', value: s.beats + ' vuruş' };
        return { label: s.loaded === null ? 'Sıra sende, şarkını yükle' : 'Sıra sende, geçişi yap', value: 'Şimdi' };
      }

      function history() {
        return HISTORY.map(function (h, i) {
          var last = i === HISTORY.length - 1;
          return '<li><div class="turn' + (h[0] === 'Partner' ? ' partner' : '') + (last ? ' current' : '') + '">' +
            '<span class="who">' + h[0] + (last ? ' · şimdi' : '') + '</span><span class="meta">' + h[1] + '</span></div>' +
            (last ? '' : H.fitPill(h[2])) + '</li>';
        }).join('');
      }

      function options() {
        return OPTIONS.map(function (o, i) {
          return '<li><button type="button" class="option" data-pick="' + i + '" aria-pressed="' + (s.picked === i) + '">' +
            '<span class="option-text"><span class="t">' + o[0] + (s.loaded === i ? ' · yüklendi' : '') + '</span><span class="m">' + o[1] + '</span></span>' +
            H.fitPill(o[2]) + '</button></li>';
        }).join('');
      }

      function headerRight() {
        if (s.ended) return '<span class="mono muted" style="font-size:13px">B2B · bitti</span>';
        return '<span class="mono muted" style="font-size:13px">B2B · <span id="clock">' + clock(s.sec) + '</span></span>' +
          '<span class="tag">Partner: peak-time</span>' +
          '<span class="session-bar">' +
            '<button type="button" class="btn" data-action="pause">' + (s.paused ? 'Devam et' : 'Duraklat') + '</button>' +
            '<button type="button" class="btn danger" data-action="end">Oturumu bitir</button>' +
          '</span>';
      }

      function summary() {
        var clean = HISTORY.filter(function (h) { return h[0] === 'Sen' && h[2] === 0; }).length;
        var mine = HISTORY.filter(function (h) { return h[0] === 'Sen'; }).length;
        return '<main class="page">' +
          '<section class="card" aria-labelledby="sum">' +
            '<span class="eyebrow cue">Oturum bitti</span>' +
            '<h1 id="sum" class="h1">B2B özeti</h1>' +
            '<div class="summary-grid">' +
              '<div><div class="stat-label">Süre</div><div class="stat-value mono">' + clock(s.sec) + '</div></div>' +
              '<div><div class="stat-label">Senin geçişlerin</div><div class="stat-value mono">' + mine + '</div></div>' +
              '<div><div class="stat-label">Temiz uyum</div><div class="stat-value mono">' + clean + ' / ' + mine + '</div></div>' +
            '</div>' +
            '<div class="bubble"><span class="eyebrow partner" style="text-transform:none;letter-spacing:0">Partner</span>' +
              '<p>128 · 9A\'ya geçişin key açısından riskliydi ama iyi toparladın. Bir dahaki sefere enerjiyi daha erken yükselt.</p></div>' +
            '<div class="btns">' +
              '<a class="btn primary" href="#/antrenman">Antrenmana dön</a>' +
              '<button type="button" class="btn" data-action="restart">Yeni oturum</button>' +
            '</div>' +
            '<span class="demo-note" style="align-self:flex-start">örnek veri</span>' +
          '</section></main>';
      }

      function draw() {
        var focused = document.activeElement;
        var focusKey = focused && (focused.getAttribute('data-action') || (focused.hasAttribute('data-pick') ? 'pick' + focused.getAttribute('data-pick') : null));
        var t = turnText();
        root.innerHTML = H.backHeader('#/antrenman', 'Antrenman', headerRight()) + (s.ended ? summary() :
          '<main class="page tight">' +
            '<h1 class="sr-only">AI partnerle B2B</h1>' +
            (s.paused ? '<div class="paused-banner" role="status"><span><strong>Duraklatıldı.</strong> <span class="muted">Sayaç ve partner bekliyor.</span></span>' +
              '<button type="button" class="btn primary" data-action="pause">Devam et</button></div>' : '') +
            '<section class="history-scroll" aria-label="Oturum akışı"><ol class="history">' + history() + '</ol></section>' +
            '<div class="row gap16">' +
              '<section class="card grow" aria-labelledby="pt">' +
                '<div class="spread"><h2 id="pt" class="eyebrow partner" style="font-size:13px">Partner çalıyor · Deck B</h2>' +
                '<span class="mono muted" style="font-size:13px">130.0 BPM · <span class="key">9A</span> · E8</span></div>' +
                '<div style="font-weight:600;font-size:20px">[Partnerin şarkısı] · [Sanatçı]</div>' +
                H.waveHTML('p short', wave, Math.round(72 * (1 - s.beats / 120))) +
                '<div class="bubble"><span class="eyebrow partner" style="text-transform:none;letter-spacing:0">Partner</span>' +
                '<p>Enerjiyi yükseltiyorum: 130 BPM, 9A. Bir sonraki phrase\'te bas sende. Sert bir şeyle gel.</p></div>' +
                '<div class="spread"><span class="mono muted" id="turn-label">' + t.label + '</span>' +
                '<span class="big-cue" id="turn-value" aria-live="off">' + t.value + '</span></div>' +
              '</section>' +

              '<section class="card grow" aria-labelledby="mine" style="gap:14px">' +
                '<div class="spread baseline"><h2 id="mine" class="eyebrow cue" style="font-size:13px">Cevabın · Deck A\'ya yükle</h2>' +
                '<span class="muted" style="font-size:13px">Uyuma göre sıralı</span></div>' +
                '<ul class="options">' + options() + '</ul>' +
                '<p class="muted" style="margin:0;font-size:14px" aria-live="polite">' + OPTIONS[s.picked][3] + '</p>' +
                '<button type="button" class="btn primary lg" data-action="load"' + (s.paused ? ' disabled' : '') + '>Deck A\'ya yükle ve cue\'la</button>' +
              '</section>' +
            '</div>' +
          '</main>');
        if (focusKey) {
          var sel = focusKey.indexOf('pick') === 0 ? '[data-pick="' + focusKey.slice(4) + '"]' : '[data-action="' + focusKey + '"]';
          var el = root.querySelector(sel);
          if (el) el.focus({ preventScroll: true });
        }
      }

      // Sık güncellenen alanlar tüm ekranı yeniden çizmeden güncellenir.
      function tick() {
        var c = document.getElementById('clock');
        if (c) c.textContent = clock(s.sec);
        var t = turnText();
        var l = document.getElementById('turn-label'), v = document.getElementById('turn-value');
        if (l) l.textContent = t.label;
        if (v) v.textContent = t.value;
      }

      H.every(1000, function () {
        if (s.paused || s.ended) return;
        s.sec += 1;
        tick();
      });
      H.every(60000 / PARTNER_BPM, function () {
        if (s.paused || s.ended || s.beats <= 0) return;
        s.beats -= 1;
        tick();
      });

      root.onclick = function (e) {
        var pick = e.target.closest('[data-pick]');
        if (pick) { s.picked = Number(pick.getAttribute('data-pick')); draw(); return; }
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var a = btn.getAttribute('data-action');
        if (a === 'pause') { s.paused = !s.paused; draw(); }
        if (a === 'end') { s.ended = true; draw(); }
        if (a === 'restart') { s = { picked: 0, loaded: null, paused: false, ended: false, sec: 0, beats: START_BEATS }; draw(); }
        if (a === 'load') {
          s.loaded = s.picked;
          draw();
          H.toast(OPTIONS[s.picked][0] + ' Deck A\'ya yüklendi, ilk downbeat\'e cue\'landı (demo).');
        }
      };

      draw();
    }
  };
})();
