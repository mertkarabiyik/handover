/* Henüz tasarlanmamış ekranlar (REVIEW.md, madde 3). */
(function () {
  'use strict';
  var H = window.Handover;

  function empty(id, title, text) {
    H.screens[id] = {
      title: title,
      mount: function (root) {
        root.innerHTML = H.mainHeader(id) +
          '<main class="page"><section class="card empty">' +
            '<span class="demo-note">tasarım bekliyor</span>' +
            '<h1 class="h1">' + title + '</h1>' +
            '<p class="lead">' + text + '</p>' +
            '<a class="btn" href="#/antrenman">Antrenmana dön</a>' +
          '</section></main>';
      }
    };
  }

  empty('kutuphane', 'Kütüphane',
    'Rekordbox XML\'ini içe aktarma ve şarkı dosyalarını cihazdan bağlama burada olacak. Ses dosyaları cihazından hiç çıkmaz.');
  empty('set', 'Set',
    'Set planlayıcı. Şimdilik eski prototipte duruyor: legacy/index.html.');
})();
