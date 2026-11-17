# Handover: araştırma notları

Masa başı araştırma, 16-17 Kasım 2026. Kullanıcı görüşmesi henüz yok. Ayrıntılı pazar raporu: [DJ Öğrenme Pazarı: Boşluk Analizi](https://claude.ai/artifact/WdbAebe58i9NrfbvdGfAnD).

## Pazar

- DJ ekipman pazarı 2026 için yaklaşık 0,6-0,8 milyar $, yıllık ~%6,5-7 büyüme tahmini; yeni DJ'lerin ~%65'i controller ile başlıyor ([Beattribe derlemesi](https://beattribe.io/blog/dj-industry-statistics-2026-28-numbers-behind-the-business)). Rapor şirketi rakamları, yalnızca büyüklük mertebesi.
- ~20.000 katılımcılı 2023 Global DJ Census: yarıya yakını hiç ya da nadiren seyirci önünde çalıyor ([Digital DJ Pool aktarımı](https://digitaldjpool.com/blog/how-to-get-your-first-dj-gig/)).
- Forumlarda tekrar eden sorunlar: yalnız pratik, yönsüzlük, geri bildirim eksikliği, ilk gig'e geçememe ([r/Beatmatch başlığı](https://lr.us.psf.lt/r/Beatmatch/comments/1bjo6tx/mixing_for_two_years_still_not_good_enough)).

## Rakipler

| Ürün | Ne yapıyor | Fiyat | Not |
|---|---|---|---|
| [Tribe DJ / Tribe XR](https://www.tribexr.com/pricing) | Tarayıcıda ders, sanal ya da gerçek FLX4, AI koç soruları | Giriş katmanı ücretsiz; 9,99 $/ay, 79,99 $/yıl, 199,99 $ ömür boyu | Pioneer kendi sitesinden yönlendiriyor. Kullanıcı denemesinde ücretsiz kısım sınırlı çıktı |
| [onset](https://onsetdj.com/) | 30 ders, controller ile anlık MIDI puanlama | Ücretsiz (arama sonucuna göre) | Sitesi açıldığında alakasız sayfa geldi; durumu belirsiz |
| [dj-tutorial](https://github.com/emanb29/dj-tutorial) | Açık kaynak, FLX4 düzeni, Web MIDI, beat'e göre puan | Ücretsiz | Kullanıcısı yok gibi |
| [Beatmatch PRO](https://djmag.com/news/free-app-helps-djs-practice-beatmatching-ear-daily-challenges) | Kulaktan beatmatching, günlük görev | Ücretsiz | Controller yok |
| [Mixgraph](https://www.mixgraph.io/flow-builder) | Set akışı puanlama, enerji eğrisi, canlı öneri | Abonelik | |
| Setflow, KeyMatch, DJ.Studio, Mixed In Key | Key/BPM ile set planlama | Çeşitli | Kalabalık alan |
| [Coach DJ Pro](https://coachdj.net/en/) | Kayıtlı mix'te her geçişe 7 eksenli puan | 27-89 € tek seferlik, 7,99 €/ay | FR/EN; controller girişi yok |
| [Mixscore](https://mixscore.com/) | Kayıtlı mix analizi, kalabalık simülasyonu | 9,99-49,99 €/ay | |
| [B2B Studio](https://b2bstudio.live/) | Tarayıcıda insan-insan uzaktan B2B, kendi kütüphanen, MIDI | Beta | "Yapay zeka yok" diyor |
| pitchride | Kendi deck'lerinle uzaktan B2B | Beta | [DJ Mag](https://djmag.com/news/new-app-lets-djs-play-b2b-sets-separate-locations) |
| [Qosmo AI DJ Project](https://qosmo.jp/en/art/ai-dj-human-dj-b2b) | İnsan ve AI DJ sırayla şarkı seçiyor | – | 2016 sanat projesi, ürün değil |

## Veri ve lisans

| Kaynak | Kullanım | Durum |
|---|---|---|
| Spotify Web API | BPM/key, öneri | 27.11.2024 sonrası yeni uygulamalar için audio-features ve recommendations 403 ([kaynak](https://www.rapidevelopers.com/md/api-automations/how-to-automate-spotify-song-recommendations-using-the-api)) |
| Beatport API | Chart, metadata | Yalnızca onaylı partnerler ([apis.io](https://apis.io/providers/beatport/)) |
| Deezer API | Tür chart'ları, 30 sn önizleme | Ücretsiz, girişsiz; key yok, BPM eksik |
| [GetSongBPM API](https://getsongbpm.com/api) | BPM ve key | Ücretsiz, geri link zorunlu |
| [Audius API](https://docs.audius.org/developers/guides/rest-api) | Tam parça stream | Ücretsiz, sanatçıya atıf; bağımsız katalog |
| SoundCloud API | – | Yeni API anahtarı verilmiyor ([GitHub notu](https://github.com/soundcloud/api)) |
| Apple Music DJ entegrasyonu | – | Büyük DJ yazılımı üreticileriyle ([MBW](https://musicbusinessworldwide.com/apple-music-integrates-with-dj-apps-to-let-subscribers-mix-their-entire-music-library)) |
| Resmi gömülü oynatıcılar | Dinletme | 1001Tracklists yaklaşımı; mix yapılamaz, şartlara uyulmalı |
| Tracklist verisi (aktif setler) | Keşif | Kaynak bulunmadı; en büyük veri riski |

## Teknik

- Web MIDI: Chrome, Edge, Firefox; Safari ve iOS yok ([web-features](https://web-platform-dx.github.io/web-features-explorer/features/web-midi)).
- B2B Studio, tarayıcıda deck + mixer + MIDI'nin yapılabildiğini gösteriyor.

## Açık sorular

- Hobi DJ'leri bir antrenman aracına para verir mi? (V-03 ile görüşmelerde sorulacak)
- Türkiye ve Almanya'da Türkçe/Almanca araç talebi ne kadar?
- Aktif setler için yasal bir tracklist kaynağı var mı?
