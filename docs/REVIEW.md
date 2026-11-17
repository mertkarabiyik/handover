# Sistem incelemesi

17 Kasım 2026. İncelenen: v0 uygulaması (`index.html`), beş ekran tasarımı (`design/`), gereksinim listesi, Supabase şeması. Tasarımlar ekranda açılarak değil, dosyalar okunarak incelendi.

## Kritik

1. **İki ayrı ürün var.** Yayındaki v0 set planlayıcı merkezli; tasarım antrenman merkezli. Kodda henüz ders, drill, ses motoru, MIDI yok. Karar: v0 prototip olarak kalır, yeni uygulama tasarımdaki yapıyla (ARCHITECTURE.md, kod yapısı) ayrı kurulur.
2. **Veri modeli antrenmanı taşımıyor.** Drill ve B2B için beat grid, ilk downbeat, phrase, cue ve cihazdaki dosya bağlantısı gerekir; ne v0 modelinde ne Supabase şemasında var. İlerleme verisi (deneme, beceri, oturum) için tablo yok. Supabase etkinleştirilmeden önce şema ARCHITECTURE.md'deki modele göre yeniden yazılmalı.
3. **Eksik ekranlar.** Kütüphane (Rekordbox XML içe aktarma, dosyaları bağlama), Set ve ilk kurulum (FLX4 bağlama, tarayıcı uyumu, MIDI izni) tasarlanmadı. Ana menüde Kütüphane ve Set linkleri boş.
4. **Puanlama tanımsız.** Drill ekranı "bas zamanlaması 58" gösteriyor ama hangi sapmanın kaç puan olduğu, toleranslar ve ağırlıklar tanımlı değil. Mühendislik açısından en önemli boşluk; müfredat JSON'unda tanımlanmalı ve birim testlerle sabitlenmeli.

## Orta

5. **Keşif veri kaynağı.** Chart için Deezer var; "aktif setler" ve tracklist'ler için yasal bir kaynak bulunamadı. Bölüm bu haliyle yapılamaz; ya kaynak bulunur ya da bölüm kullanıcıların kendi setlerine dönüşür.
6. **Rekordbox ile çakışma.** FLX4'ü aynı anda iki program okumayabilir (özellikle Windows'ta MIDI portu tek programa açılabiliyor). Handover kullanılırken Rekordbox kapalı olmalı; doğrulanmadı, FLX4 gelince test edilecek.
7. **Platform.** Drill ve B2B bilgisayar ister; N-01 (telefonda tam kullanım) yalnızca planlama ve keşif ekranları için geçerli olacak şekilde güncellenmeli.
8. **Gereksinim listesinde olmayanlar.** Müfredat ve ders içeriği, beceri modeli, Rekordbox XML'den beat grid okuma, ilk kurulum akışı. Eklenmeli.

## Küçük (tasarım)

9–12 tıklanabilir prototipte (`src/ui/`) çözüldü; tasarım tuvali henüz güncellenmedi.

9. Ders ekranındaki "Örneği dinle" düğmesinin kaynağı yok; örnek ses lisans gerektirir. Seçenek: kullanıcının kendi iki şarkısıyla otomatik örnek.
10. B2B ekranında oturumu duraklatma ve bitirme kontrolü yok.
11. Drill ekranı canlı durum ile önceki denemenin sonucunu aynı anda gösteriyor; gerçek akışta deneme sırasında sonuç kartı gizli olmalı.
12. Keşif'te arama alanı için gizli etiket inline stil ile yapıldı; uygulamada ortak bir `sr-only` sınıfı kullanılmalı.

## Sıradaki adım önerisi

1. Puanlama toleranslarını ve ilk üç drill'in tanımını yaz (madde 4).
2. Kütüphane ve ilk kurulum ekranlarını tasarla (madde 3).
3. FLX4 gelince MIDI test sayfası ve Rekordbox ile çakışma testi (madde 6).
