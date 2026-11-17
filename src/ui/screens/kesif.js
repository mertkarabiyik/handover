/*
 * Keşif. Tasarım: design/Kesif.dc.html
 * REVIEW.md madde 12: arama etiketi ortak .sr-only sınıfıyla gizlendi.
 * REVIEW.md madde 5: aktif setler için yasal kaynak yok; veriler örnektir.
 */
(function () {
  'use strict';
  var H = window.Handover;

  var GENRES = ['Techno', 'Peak-time techno', 'Hard techno', 'Melodic techno', 'Tech house', 'House', 'Club bangers'];
  var LISTS = ['Bu hafta', 'Yükselenler', 'Setlerde en çok'];

  // [başlık, BPM, key, uyum, hareket]
  var ROWS = [
    ['[Parça 1]', 129, '9A', 0, '+3'], ['[Parça 2]', 130, '8A', 0, '='], ['[Parça 3]', 132, '10A', 1, 'yeni'],
    ['[Parça 4]', 128, '3A', 2, '−2'], ['[Parça 5]', 130, '8B', 0, '+5'], ['[Parça 6]', 134, '11A', 2, '−1'],
    ['[Parça 7]', 131, '7A', 0, '+1'], ['[Parça 8]', 129, '2B', 2, '−4']
  ];

  var SETS = [
    ['Şu an', '[DJ adı] b2b [DJ adı]', '[Kulüp], [Şehir]', '3 saat · 41 parça · 12 ID', true],
    ['Dün', '[DJ adı]', '[Festival] · ana sahne', '2 saat · 28 parça', false],
    ['2 gün önce', '[DJ adı]', '[Radyo programı]', '1 saat · 19 parça', false]
  ];

  H.screens.kesif = {
    title: 'Keşif',
    mount: function (root) {
      var s = { genre: 1, list: 0, playing: 0, query: '' };

      function rows() {
        var q = s.query.trim().toLowerCase();
        var list = ROWS.map(function (r, i) { return { r: r, i: i }; }).filter(function (x) {
          return !q || (x.r[0] + ' [sanatçı] ' + x.r[2]).toLowerCase().indexOf(q) !== -1;
        });
        if (!list.length) return '<li class="muted" style="padding:16px 8px">"' + H.esc(s.query) + '" için sonuç yok.</li>';
        return list.map(function (x) {
          var r = x.r, i = x.i;
          var up = r[4].charAt(0) === '+' || r[4] === 'yeni', down = r[4].charAt(0) === '−';
          return '<li' + (s.playing === i ? ' class="playing"' : '') + '>' +
            '<span class="rank">' + (i + 1) + '</span>' +
            '<span class="move' + (up ? ' up' : down ? ' down' : '') + '">' + r[4] + '</span>' +
            '<button type="button" class="play" data-play="' + i + '" aria-label="' + r[0] + ' dinle"' + (s.playing === i ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' + H.icons.play + '</button>' +
            '<span class="track"><span class="t">' + r[0] + '</span><span class="a">[Sanatçı]</span></span>' +
            '<span class="bpmkey">' + r[1] + ' · <span class="key">' + r[2] + '</span></span>' +
            H.fitPill(r[3]) +
          '</li>';
        }).join('');
      }

      function drawChart() {
        var ol = document.getElementById('chart');
        if (ol) ol.innerHTML = rows();
      }

      function draw() {
        var n = ROWS[s.playing];
        var focused = document.activeElement;
        var focusSel = null;
        if (focused && focused.closest && root.contains(focused)) {
          ['data-genre', 'data-list', 'data-play'].forEach(function (a) {
            if (focused.hasAttribute(a)) focusSel = '[' + a + '="' + focused.getAttribute(a) + '"]';
          });
        }
        root.innerHTML = H.mainHeader('kesif',
            '<label class="search">' + H.icons.search + '<span class="sr-only">Ara</span>' +
            '<input type="search" id="q" placeholder="Parça, sanatçı, DJ ya da set ara" value="' + H.esc(s.query) + '"></label>') +
          '<main class="page" style="padding-top:28px;gap:22px">' +
            '<div class="spread end"><h1 class="h1">Keşif</h1>' +
            '<span class="demo-note">örnek veri · kaynak: [chart kaynağı]</span></div>' +

            '<div class="chips" role="group" aria-label="Türler">' + GENRES.map(function (g, i) {
              return '<button type="button" class="chip" data-genre="' + i + '" aria-pressed="' + (s.genre === i) + '">' + g + '</button>';
            }).join('') + '</div>' +

            '<div class="row" style="align-items:flex-start">' +
              '<section class="card grow-big" aria-labelledby="hot" style="padding:20px;gap:12px;flex-basis:600px">' +
                '<div class="spread baseline"><h2 id="hot" class="h3" style="font-size:16px">Hot list · ' + GENRES[s.genre] + '</h2>' +
                '<div class="tabs" role="group" aria-label="Liste">' + LISTS.map(function (l, i) {
                  return '<button type="button" class="tab" data-list="' + i + '" aria-pressed="' + (s.list === i) + '">' + l + '</button>';
                }).join('') + '</div></div>' +
                '<p class="hint">Uyum sütunu, Set\'indeki son şarkıya göre: 128 BPM · 8A.</p>' +
                '<div class="chart-scroll"><ol class="chart" id="chart">' + rows() + '</ol></div>' +
              '</section>' +

              '<section class="grow-small" aria-labelledby="sets" style="display:flex;flex-direction:column;gap:12px;min-width:0;flex-basis:320px">' +
                '<h2 id="sets" class="h3" style="font-size:16px">Aktif setler</h2>' +
                SETS.map(function (x) {
                  return '<a class="set-card" href="#/kesif" data-set>' +
                    '<span class="set-top"><span>' + x[0] + '</span>' + (x[4] ? '<span class="live-tag">● Canlı</span>' : '') + '</span>' +
                    '<span class="set-dj">' + x[1] + '</span>' +
                    '<span class="muted" style="font-size:14px">' + x[2] + '</span>' +
                    '<span class="mono muted" style="font-size:13px">' + x[3] + '</span>' +
                    '<span class="set-cta">Tracklist\'i aç</span></a>';
                }).join('') +
              '</section>' +
            '</div>' +

            '<section class="card player" aria-labelledby="np">' +
              '<div style="flex:1 1 260px;min-width:0;display:flex;flex-direction:column;gap:4px">' +
                '<h2 id="np" class="eyebrow">Dinleniyor</h2>' +
                '<span style="font-weight:600;font-size:18px">' + n[0] + '</span>' +
                '<span class="muted" style="font-size:14px">[Sanatçı] · ' + n[1] + ' BPM · ' + n[2] + '</span>' +
              '</div>' +
              '<div class="embed">Servisin resmi oynatıcısı burada (SoundCloud, YouTube ya da Beatport önizlemesi). Ses bizim sunucumuzdan geçmez.</div>' +
              '<div style="flex:1 1 220px;display:flex;flex-direction:column;gap:8px">' +
                '<button type="button" class="btn primary" data-action="store">Beatport\'ta al</button>' +
                '<div style="display:flex;gap:8px">' +
                  '<button type="button" class="btn" style="flex:1" data-action="store">Bandcamp</button>' +
                  '<button type="button" class="btn" style="flex:1" data-action="wish">İstek listem</button>' +
                '</div>' +
              '</div>' +
            '</section>' +
          '</main>';
        if (focusSel) {
          var el = root.querySelector(focusSel);
          if (el) el.focus({ preventScroll: true });
        }
      }

      root.onclick = function (e) {
        var t = e.target.closest('[data-genre],[data-list],[data-play],[data-action],[data-set]');
        if (!t) return;
        if (t.hasAttribute('data-genre')) { s.genre = Number(t.getAttribute('data-genre')); draw(); }
        else if (t.hasAttribute('data-list')) { s.list = Number(t.getAttribute('data-list')); draw(); }
        else if (t.hasAttribute('data-play')) { s.playing = Number(t.getAttribute('data-play')); draw(); }
        else if (t.hasAttribute('data-set')) { e.preventDefault(); H.toast('Tracklist kaynağı henüz yok (REVIEW madde 5).'); }
        else {
          var a = t.getAttribute('data-action');
          if (a === 'store') H.toast('Prototip: mağaza bağlantısı gerçek veriyle gelecek.');
          if (a === 'wish') H.toast(ROWS[s.playing][0] + ' istek listene eklendi (demo).');
        }
      };

      // Arama yalnızca listeyi günceller; kutudaki imleç kaybolmaz.
      root.oninput = function (e) {
        if (e.target.id !== 'q') return;
        s.query = e.target.value;
        drawChart();
      };

      draw();
    }
  };
})();
