# Handover: teknik sistem

Son güncelleme: 17 Kasım 2026

## İlkeler

- Her şey tarayıcıda çalışır; ses dosyaları cihazdan çıkmaz (lisans ve maliyet).
- FLX4 kullanan ekranlar masaüstü Chrome/Edge içindir (Web MIDI; Safari ve iOS desteklemiyor).
- Puanlama kural tabanlı ve ölçülebilirdir; yapay zeka bunun üstüne eklenir.
- Önce tarayıcıda veri; hesaplar gerekince Supabase.

## Bileşenler

| Bileşen | Görev | Teknoloji | Durum |
|---|---|---|---|
| MIDI girişi | FLX4 hareketlerini zaman damgasıyla okur | Web MIDI API | FLX4 bekleniyor |
| Ses motoru | İki deck, pitch (önce key lock yok), 3 bant EQ, filtre, fader, crossfader | Web Audio API | Yok |
| Kütüphane | Şarkı metadatası, dosya bağlantısı | IndexedDB, File System Access | v0'da localStorage |
| Analiz | BPM, key, beat grid, phrase | Önce Rekordbox XML; sonra tarayıcıda analiz (kütüphane lisansı kontrol edilecek) | Yok |
| Puanlama motoru | Görev + MIDI olayları + beat grid → puan ve tek cümlelik düzeltme | Saf TypeScript fonksiyonları, birim testli | Yok |
| Müfredat | Seviyeler, dersler, drill tanımları, kabul toleransları | JSON | Taslak (VISION.md) |
| Beceri modeli | Teknik başına beceri puanı, sıradaki egzersiz seçimi | Basit kural/aralıklı tekrar | Yok |
| AI partner | Şarkı seçimi (tarz + strateji), otomatik geçiş | Kural tabanlı; sonra öğrenen model | v0: rastgele |
| Açıklama katmanı | Puanı ve partner kararını doğal dille anlatma | Dil modeli, küçük sunucu fonksiyonu | Son aşama |
| Keşif | Chart, gömülü oynatıcı, mağaza linkleri | Deezer API, GetSongBPM, resmi embed'ler | Tasarım |
| Hesaplar | Giriş, senkron, paylaşma | Supabase (e-posta linki) | Proje duraklatıldı |
| Yayın | Kendi adres | Vercel (private repo) veya GitHub Pages | Bekliyor |

## Puanlama: ölçülen şeyler (bass swap örneği)

- **Beatmatch:** iki deck'in efektif BPM farkı ve deneme boyunca beat faz kayması (ms).
- **Bas zamanlaması:** A'nın Low EQ'sunun kapandığı ve B'ninkinin açıldığı an, hedef phrase sınırına göre kaç vuruş/ms sapıyor.
- **Çıkış:** A'nın fader eğrisi ve bitiş anı.

Toleranslar ve ağırlıklar müfredat JSON'unda tanımlanır. Açık soru: hangi sapma kaç puan (REVIEW.md, madde 4).

## Veri modeli (hedef)

- `track`: başlık, sanatçı, BPM, key, enerji, süre, dosya tanıtıcısı (cihazda), beat grid (ilk downbeat + BPM ya da işaret listesi), cue noktaları, kaynak (Rekordbox, elle, keşif).
- `lesson`, `drill`: müfredat içeriği ve toleranslar.
- `attempt`: drill, kullanılan şarkılar, MIDI olay özeti, alt puanlar, tarih.
- `skill`: teknik başına puan ve son pratik tarihi.
- `b2b_session`, `b2b_turn`: kim çaldı, hangi şarkı, geçiş puanı.
- `set`, `set_track`, `goal`, `checklist`: v0'daki hazırlık özellikleri.

`supabase/migrations/` içindeki ilk şema yalnızca `tracks`, `sets`, `set_tracks` içeriyor; bu modele göre genişletilmeden etkinleştirilmemeli.

## Yapım sırası

1. FLX4 gelince: MIDI test sayfası (kontrol eşlemesi, gecikme ölçümü).
2. Rekordbox XML içe aktarma ve iki deck'te çalma.
3. Puanlama motoru + ilk drill: beatmatch.
4. Bass swap, filtre ve echo drill'leri.
5. AI partnerle B2B oturumu.
6. Beceri modeli ve ilerleme ekranı; sonra hesaplar ve keşif.

## Kod yapısı (öneri, 2. adımda kurulacak)

- Vite + TypeScript, framework'süz ya da hafif (Preact).
- `src/midi`, `src/audio`, `src/library`, `src/scoring`, `src/curriculum`, `src/partner`, `src/ui`.
- `scoring` ve `partner` saf fonksiyonlar; Vitest ile test.
- `index.html` (v0) `legacy/` altına taşınır.
