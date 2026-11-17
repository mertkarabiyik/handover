/*
 * Drill: bass swap. Tasarım: design/Drill.dc.html
 * Prototip: vuruş sayacı 128 BPM'de gerçek zamanlı akar; deck hareketleri ve puanlar örnektir.
 * Gerçek puanlar src/scoring içinde MIDI + beat grid ile hesaplanacak (REVIEW.md madde 4).
 * REVIEW.md madde 11: deneme sürerken sonuç kartı gizli.
 */
(function () {
  'use strict';
  var H = window.Handover;

  var BPM = 128;
  var BEATS = 32;
  var SWAP = 17;
  var ATTEMPTS = 5;

  // Örnek sonuçlar: [ad, puan, not]. Deneme numarasına göre sırayla kullanılır.
  var SAMPLE_RESULTS = [
    [['Beatmatch', 94, 'Pitch farkı 0,1 BPM. Beat\'ler deneme boyunca kaymadı.'],
     ['Bas zamanlaması', 58, 'Bası 3 vuruş erken değiştirdin (14. vuruşta). Phrase başını bekle: 17.'],
     ['A\'nın çıkışı', 80, 'Fader\'ı düzgün indirdin, ama 4 vuruş erken bitti.']],
    [['Beatmatch', 91, 'Pitch farkı 0,2 BPM. Son 8 vuruşta hafif kayma var.'],
     ['Bas zamanlaması', 76, 'Bası 1 vuruş erken değiştirdin (16. vuruşta). Yaklaştın.'],
     ['A\'nın çıkışı', 84, 'Fader eğrisi düzgün, 2 vuruş erken bitti.']],
    [['Beatmatch', 95, 'Pitch farkı 0,1 BPM. Kayma yok.'],
     ['Bas zamanlaması', 92, 'Swap tam 17. vuruşta, 40 ms içinde.'],
     ['A\'nın çıkışı', 70, 'Fader\'ı çok hızlı indirdin: 16 yerine 6 vuruşta.']],
    [['Beatmatch', 93, 'Pitch farkı 0,1 BPM. Kayma yok.'],
     ['Bas zamanlaması', 88, 'Swap 17. vuruşta, 90 ms geç.'],
     ['A\'nın çıkışı', 86, 'Fader 32. vuruşta kapandı. Eğri biraz sert.']],
    [['Beatmatch', 96, 'Pitch farkı 0,0 BPM.'],
     ['Bas zamanlaması', 94, 'Swap tam 17. vuruşta.'],
     ['A\'nın çıkışı', 90, 'Fader 16 vuruşta düzgünce kapandı.']]
  ];

  // 1-100 alt puanların ağırlıkları (örnek; gerçek ağırlıklar müfredat JSON'unda tanımlanacak).
  var WEIGHTS = [0.3, 0.45, 0.25];

  function total(result) {
    var t = 0;
    result.forEach(function (r, i) { t += r[1] * WEIGHTS[i]; });
    return Math.round(t);
  }

  function tone(score) { return score >= 80 ? 'good' : score >= 60 ? 'warn' : 'bad'; }

  var waveA = H.waveHeights(80, 1.3, 70);
  var waveB = H.waveHeights(80, 4.1, 70);

  H.screens.drill = {
    title: 'Drill: bass swap',
    mount: function (root) {
      var s = { attempt: 1, phase: 'ready', beat: 0, last: null, stop: null };

      function cueMessage() {
        if (s.phase === 'ready') return 'Hazır olduğunda başlat. 32 vuruş sayacağız; swap 17. vuruşta.';
        if (s.phase === 'done') return 'Deneme bitti. Sonuç aşağıda.';
        var b = s.beat;
        if (b < SWAP - 4) return 'Phrase sayılıyor. B\'nin bası kapalı kalsın.';
        if (b < SWAP) return 'Swap\'a ' + (SWAP - b) + ' vuruş. Hazır ol: A\'nın Low\'u kapanacak, B\'ninki açılacak.';
        if (b === SWAP) return 'Şimdi! Basları değiştir.';
        return 'A\'nın fader\'ını yavaşça indir. Kalan ' + (BEATS - b) + ' vuruş.';
      }

      function deckState() {
        var b = s.phase === 'ready' ? 0 : s.beat;
        var afterSwap = b >= SWAP;
        var fader = afterSwap ? Math.max(0, Math.round(100 * (BEATS - b) / (BEATS - SWAP + 1))) : 100;
        return {
          aLow: afterSwap ? 0 : 100,
          aFader: s.phase === 'done' ? 0 : fader,
          bLow: afterSwap ? 100 : 4,
          played: Math.round((b / BEATS) * 80)
        };
      }

      function dots() {
        var out = '';
        for (var i = 1; i <= BEATS; i++) {
          var cls = [];
          if (s.phase !== 'ready' && i <= s.beat) cls.push('past');
          if (i === SWAP) cls.push('swap');
          out += '<span class="' + cls.join(' ') + '"></span>';
        }
        return out;
      }

      function resultCard() {
        // Deneme sürerken gizli; yalnızca bekleme ve bitiş durumunda gösterilir.
        if (s.phase === 'running') return '';
        if (!s.last) {
          return '<section class="card waiting"><p class="muted" style="margin:0">İlk denemenin sonucu burada görünecek.</p>' +
            '<span class="demo-note">örnek puanlar · gerçeği FLX4 ile ölçülecek</span></section>';
        }
        var r = s.last.result;
        return '<section class="card result" aria-labelledby="res">' +
          '<div class="result-total">' +
            '<h2 id="res" class="eyebrow" style="font-size:13px">Deneme ' + s.last.n + ' sonucu</h2>' +
            '<span class="result-num">' + total(r) + '</span>' +
            '<span class="mono muted">/ 100</span>' +
            '<span class="demo-note" style="margin-top:8px">örnek puan</span>' +
          '</div>' +
          '<ul class="subscores">' + r.map(function (x) {
            var t = tone(x[1]);
            return '<li><div class="spread"><span style="font-weight:600">' + x[0] + '</span><span class="mono c-' + t + '">' + x[1] + '</span></div>' +
              '<div class="bar"><div class="bg-' + t + '" style="width:' + x[1] + '%"></div></div>' +
              '<span class="note">' + x[2] + '</span></li>';
          }).join('') + '</ul>' +
        '</section>';
      }

      function actions() {
        if (s.phase === 'running') {
          return '<button type="button" class="btn danger" data-action="cancel">Denemeyi iptal et</button>';
        }
        if (s.phase === 'done' && s.attempt >= ATTEMPTS) {
          return '<a class="btn primary lg" href="#/antrenman">Drill bitti: antrenmana dön</a>' +
            '<button type="button" class="btn lg" data-action="restart">Baştan başla</button>';
        }
        var n = s.phase === 'done' ? s.attempt + 1 : s.attempt;
        return '<button type="button" class="btn primary lg" data-action="start">Deneme ' + n + ' / ' + ATTEMPTS + '\'i başlat</button>';
      }

      function draw() {
        var focused = document.activeElement && document.activeElement.getAttribute('data-action');
        var d = deckState();
        root.innerHTML = H.backHeader('#/ders', 'Ders',
            '<span class="mono muted" style="font-size:13px">Bass swap · deneme ' + s.attempt + ' / ' + ATTEMPTS + '</span>' + H.flx4Pill(true)) +
          '<main class="page tight">' +
            '<h1 class="sr-only">Drill: bass swap</h1>' +
            '<section class="card live" aria-label="Canlı durum">' +
              '<div class="counter"><span class="counter-num">' + (s.phase === 'ready' ? 0 : s.beat) + '</span>' +
              '<span class="mono muted">/ ' + BEATS + ' vuruş</span></div>' +
              '<div class="live-main"><div class="dots" aria-hidden="true">' + dots() + '</div>' +
              '<p class="cue-msg" aria-live="polite">' + cueMessage() + '</p></div>' +
            '</section>' +

            '<div class="row gap16">' +
              '<section class="card deck grow" aria-label="Deck A">' +
                '<div class="spread baseline"><div><span class="mono muted" style="font-size:13px">DECK A · çalıyor</span>' +
                '<div class="deck-title">[Şarkı A] · [Sanatçı]</div></div>' +
                '<div class="deck-meta"><span>128.0 BPM</span><span class="key">8A</span></div></div>' +
                H.waveHTML('a', waveA, s.phase === 'ready' ? 0 : d.played) +
                '<div class="controls">' +
                  '<div class="control"><span class="muted">Low EQ</span><div class="bar thick"><div style="width:' + d.aLow + '%"></div></div></div>' +
                  '<div class="control"><span class="muted">Fader</span><div class="bar thick fader"><div style="width:' + d.aFader + '%"></div></div></div>' +
                '</div>' +
              '</section>' +

              '<section class="card deck grow accent" aria-label="Deck B">' +
                '<div class="spread baseline"><div><span class="mono" style="font-size:13px;color:var(--cue)">DECK B · giriyor</span>' +
                '<div class="deck-title">[Şarkı B] · [Sanatçı]</div></div>' +
                '<div class="deck-meta"><span>127.9 BPM</span><span class="key">9A</span></div></div>' +
                H.waveHTML('b', waveB, s.phase === 'ready' ? 0 : d.played) +
                '<div class="controls">' +
                  '<div class="control"><span class="muted">Low EQ</span><div class="bar thick"><div style="width:' + d.bLow + '%"></div></div></div>' +
                  '<div class="control"><span class="muted">Pitch farkı</span><span class="c-good">−0,1 BPM · iyi</span></div>' +
                '</div>' +
              '</section>' +
            '</div>' +

            '<div class="btns">' + actions() + '</div>' +
            resultCard() +
          '</main>';
        if (focused) {
          var again = root.querySelector('[data-action="' + focused + '"]') || root.querySelector('[data-action]');
          if (again) again.focus({ preventScroll: true });
        }
      }

      function start() {
        if (s.phase === 'done') s.attempt += 1;
        s.phase = 'running';
        s.beat = 1;
        draw();
        s.stop = H.every(60000 / BPM, function () {
          if (s.beat >= BEATS) {
            s.stop();
            s.phase = 'done';
            s.last = { n: s.attempt, result: SAMPLE_RESULTS[(s.attempt - 1) % SAMPLE_RESULTS.length] };
          } else {
            s.beat += 1;
          }
          draw();
        });
      }

      root.onclick = function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var a = btn.getAttribute('data-action');
        if (a === 'start') start();
        if (a === 'cancel') { s.stop(); s.phase = 'ready'; s.beat = 0; draw(); H.toast('Deneme iptal edildi, sayılmadı.'); }
        if (a === 'restart') { s.attempt = 1; s.phase = 'ready'; s.beat = 0; s.last = null; draw(); }
      };

      draw();
    }
  };
})();
