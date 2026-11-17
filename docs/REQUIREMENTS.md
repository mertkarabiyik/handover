# Gereksinimler

Ana kopya bu dosya. Takip görünümü: [Handover Gereksinim Listesi](https://claude.ai/artifact/FDJjaQJ8RxFu1a5fRC6FZH) (senkron tutulur). Son güncelleme: 17 Kasım 2026.

Tür: Z = Zorunlu, İ = İstek. Öncelik: Y = Yüksek, O = Orta, D = Düşük.

## 0 Doğrulama

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| V-01 | 5-10 DJ öğrenenle görüşme yapılır | Z | Planlandı | Y | En az 3 kişi aynı sorunu söylüyor ve bu sorun ürünün çözmeyi hedeflediği şey |
| V-02 | Uygulama geliştiricinin kendi seti için kullanılır | Z | Planlandı | Y | Şubat 2027 setine kadar düzenli kullanım; eksikler not edilmiş |
| V-03 | Görüşmelerde DJ eğitimi veya aracı için geçmişte para verilip verilmediği sorulur | Z | Planlandı | Y | Her görüşmede cevap ve nedeni not edilmiş; ödeme yapan ve yapmayan sayısı belli |

## 1 Temel (v0)

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-01 | Kullanıcı şarkı ekler, düzenler ve siler (isim, sanatçı, BPM, key, enerji, süre) | Z | Tamam | Y | BPM 40-220 dışı ve boş isim reddedilir, hata mesajı ne yapılacağını söyler |
| F-02 | Geçiş BPM farkı, Camelot key ve enerjiye göre üç seviyede değerlendirilir | Z | Tamam | Y | Her geçişte seviye (Temiz/Dikkat/Zor) ve nedeni görünür; yarı/çift tempo tanınır |
| F-03 | Havuzdaki şarkılar setin son şarkısına uyuma göre sıralanır | Z | Tamam | Y | En uyumlu şarkı listenin başında; her şarkıda geçiş seviyesi yazılı |
| F-04 | Set otomatik dizilir ve işlem geri alınabilir | Z | Tamam | O | Düşük enerjiyle başlar, sona doğru zirve yapar; Geri al önceki sırayı getirir |
| F-05 | Enerji eğrisi ve set özeti gösterilir | Z | Tamam | O | Toplam süre, BPM aralığı ve seviye başına geçiş sayısı güncellenir |
| F-06 | Set listesi metin olarak kopyalanır | Z | Tamam | O | Kopyalama engellenirse metin seçilebilir bir pencerede gösterilir |
| F-07 | BPM tap tempo ile bulunabilir | İ | Tamam | D | En az 3 dokunuştan sonra BPM alanı dolar |
| F-08 | Arayüz Türkçe, İngilizce ve Almanca sunulur | Z | Tamam | Y | Dil menüden değişir, seçim hatırlanır, ilk açılışta tarayıcı diline göre seçilir |
| F-09 | Veriler dosya olarak dışa ve içe aktarılır | Z | Planlandı | Y | Başka tarayıcıda içe aktarılınca şarkılar, set, hedef ve prova kayıtları aynen gelir |
| F-10 | Hedef tanımlanır: tarih, set süresi, ortam türü | Z | Tamam | Y | Hedef kaydedilir ve görünür; ortamlar: house party, etkinlik, open decks |
| F-11 | Zor ve Dikkat geçişleri pratik listesine düşer | Z | Tamam | Y | Set sırası değişince liste kendiliğinden güncellenir |
| F-12 | Her geçiş için prova kaydı tutulur | Z | Tamam | Y | Deneme sayısı ve son sonuç görünür |
| F-13 | Parti öncesi kontrol listesi sunulur | Z | Tamam | O | Maddeler işaretlenebilir |
| F-14 | Hedefe kalan gün ve hazırlık durumu gösterilir | Z | Tamam | O | Kalan gün, çalışılmış geçiş oranı ve kontrol listesi oranı tek bakışta |
| F-15 | Haftalık pratik planı önerilir | İ | Planlandı | D | Kalan haftalara göre hangi geçişin ne zaman çalışılacağı listelenir |
| F-16 | Şarkı listesi Rekordbox'tan içe aktarılır | Z | Planlandı | Y | Rekordbox XML'den isim, sanatçı, BPM, key ve süre doğru okunur |
| N-01 | Planlama ve keşif ekranları telefonda tam kullanılabilir | Z | Devam ediyor | Y | 360 px genişlikte yatay kaydırma ve kesilen metin yok. Drill ve B2B bilgisayar içindir |
| N-02 | İlk kullanım kurulum ve hesap gerektirmez | Z | Tamam | Y | Link açılınca örnek setle çalışır durumda gelir |
| N-03 | Yeni dil eklemek yalnızca çeviri sözlüğü gerektirir | Z | Tamam | O | Program mantığına dokunulmaz |
| N-08 | Sistem ücretsiz katmanlarla çalışır | Z | Devam ediyor | O | Hesaplar aşaması sonuna kadar aylık sabit maliyet 0 € |
| N-09 | Silme ve toplu değişiklikler geri alınabilir | Z | Tamam | O | Silme, örnekleri temizleme ve otomatik dizmeden sonra Geri al sunulur |

## 2 Altyapı

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| T-01 | Kod GitHub'da sürüm kontrolü altında | Z | Tamam | Y | Depo `mertkarabiyik/handover`; her değişiklik bir commit |
| T-02 | Uygulama kendi adresinde HTTPS ile yayınlanır | Z | Planlandı | Y | Depoya gönderilen değişiklik otomatik yayına çıkar; dış servislere bağlantı çalışır |

## 3 FLX4 bağlantısı

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-20 | DDJ-FLX4 Web MIDI ile bağlanır ve tanınır | Z | Planlandı | Y | Chrome/Edge'de takılınca adı ve bağlı durumu görünür |
| F-21 | Fader, EQ, pitch, jog, play/cue hareketleri okunur | Z | Planlandı | Y | Her hareket doğru kontrolde ve doğru değerde görünür |
| F-23 | Web MIDI yoksa açıklama ve elle prova kaydı | Z | Planlandı | O | iPhone ve Safari'de hata yerine açıklama; diğer özellikler çalışır |
| F-63 | İlk kurulum akışı: tarayıcı kontrolü, MIDI izni, FLX4 testi, Rekordbox'ın kapalı olması | Z | Planlandı | Y | Yeni kullanıcı 3 dakikada ilk drill'e hazır; her adımda ne yapacağı yazılı |
| N-07 | MIDI hareketi gecikmesiz işlenir | Z | Planlandı | O | Hareket ile ekrandaki tepki arası 20 ms altında |

## 4 AI partner: seçen

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-17 | Partner bir şarkı atar, kullanıcı havuzundan cevap seçer | Z | Tamam | Y | Şu an rastgele; aynı şarkı art arda gelmez |
| F-18 | Seçimden hemen sonra geri bildirim | Z | Tamam | Y | Seviye ve nedeni; daha uyumlu şarkı varsa hangisi ve neden |
| F-19 | Süre sınırı ve tur sonu özeti | İ | Devam ediyor | O | Süre açılıp kapanır; özet seviye sayıları ve en çok zorlanılan key/BPM aralığı |
| F-50 | Partnerin tarzı seçilir (peak-time, groovy, hard techno) | Z | Planlandı | Y | Tarz, seçilen BPM ve enerji aralığını ölçülebilir şekilde değiştirir |
| F-51 | Partner set akışına göre enerjiyi yükseltir, korur ya da düşürür | Z | Planlandı | Y | Rastgele seçimden daha yüksek Temiz oranı |
| F-52 | Partner seçimini kısaca açıklar | Z | Planlandı | O | Her turda bir cümle |
| F-53 | Zorluk seviyesi | İ | Planlandı | O | Zor modda Temiz cevabı olmayan turlar daha sık |

## 5 AI partner: çalan ve müfredat

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-60 | Müfredat: seviyeler, dersler ve drill'ler toleranslarıyla tanımlanır | Z | Planlandı | Y | İlk 3 drill'in (beatmatch, bass swap, filtre) ölçütleri, toleransları ve ağırlıkları yazılı ve test edilebilir |
| F-62 | Rekordbox XML'den beat grid ve cue noktaları okunur | Z | Planlandı | Y | İlk downbeat ve BPM'den phrase sınırları hesaplanır; Rekordbox'taki grid ile 10 ms içinde uyumlu |
| F-24 | Kullanıcı kendi ses dosyasını cihazında çalar | Z | Planlandı | Y | Dosya sunucuya yüklenmez |
| F-54 | Ses dosyalarında BPM, beat grid ve key tarayıcıda analiz edilir | Z | Planlandı | Y | BPM Rekordbox değerinden en fazla 0,5 farklı (Rekordbox XML'i olmayanlar için) |
| F-55 | Tarayıcıda iki deck çalar ve FLX4 ile kontrol edilir | Z | Planlandı | Y | Play/cue, pitch, EQ, fader, crossfader FLX4'ten; ses kesintisiz |
| F-56 | AI partner kendi geçişini yapar | Z | Planlandı | Y | Beatmatch, phrase'e oturan başlangıç ve bas değişimi otomatik |
| F-57 | Tam B2B oturumu: partner B'de, kullanıcı A'da | Z | Planlandı | Y | En az 10 şarkı kesintisiz; sıra kimde görünür; duraklatma ve bitirme var |
| N-05 | Telifli müzik sunucuda barındırılmaz | Z | Planlandı | Y | Ses dosyaları yalnızca cihazda |

## 6 AI partner: değerlendiren

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-22 | Geçiş provası puanlanır | Z | Planlandı | Y | Beatmatch, EQ ve fader zamanlaması için ayrı puan; her puan bir cümleyle açıklanır |
| F-58 | Geçiş sırasında anında ipucu | Z | Planlandı | O | Bas çakışması ya da kayan beat geçiş bitmeden görünür |
| F-59 | Oturum özeti ve zaman içindeki gelişim | İ | Planlandı | O | Puanlar kaydedilir; önceki oturumlarla karşılaştırma |
| F-61 | Beceri modeli: teknik başına puan, sıradaki egzersizi seçer | Z | Planlandı | Y | Zayıf teknik, güçlü olandan daha sık önerilir; puan son denemelere göre güncellenir |

## 7 Hesaplar

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-30 | E-posta linki ile giriş | Z | Planlandı | O | Şifre yok |
| F-31 | Cihazlar arası senkron | Z | Planlandı | O | Bir cihazdaki değişiklik diğerinde görünür |
| F-32 | Set link ile paylaşılır | İ | Planlandı | D | Salt okunur, girişsiz |
| F-33 | Girişsiz kullanım | Z | Planlandı | Y | Hesapsız kullanıcı tüm yerel özellikleri kullanır |
| N-04 | Veri yalnızca sahibine görünür | Z | Planlandı | Y | Satır düzeyinde güvenlik; şema yeniden tasarlanacak |
| N-06 | Gizlilik bildirimi ve veri silme (DSGVO) | Z | Planlandı | Y | E-posta toplanmadan önce bildirim; hesap ve veri silinebilir |

## 8 Keşif

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-40 | Türe göre güncel listeler ayrı sekmede | İ | Planlandı | O | Kaynak belirtilir |
| F-41 | BPM, key ve sete uyum gösterilir | İ | Planlandı | O | Veri kaynağına link; verisi olmayan işaretlenir |
| F-42 | Resmi gömülü oynatıcıyla dinleme | İ | Planlandı | O | Oynatıcı görünür; şartlara uyulur; ses sunucumuzdan geçmez |
| F-43 | Satın alma linki (Beatport, Bandcamp) | İ | Planlandı | O | Mağaza sayfasına gider |
| F-44 | Satın alınan dosya keşifteki kaydıyla eşleşir | İ | Planlandı | O | İsim ve sanatçıdan eşleşme önerisi |
| F-45 | Eklenen şarkı set, pratik ve B2B'de kullanılır | İ | Planlandı | O | Havuzda ve partnerin kütüphanesinde görünür |
| F-47 | Aktif setler ve tracklist'ler gösterilir | İ | Planlandı | D | Yasal bir veri kaynağı bulunmuş ve belgelenmiş olmalı (bkz. REVIEW madde 5) |

## 9 Büyüme

| ID | Gereksinim | Tür | Durum | Önc. | Kabul kriteri |
|---|---|---|---|---|---|
| F-46 | Mağaza linklerinden affiliate geliri araştırılır | İ | Planlandı | D | Programlar, oranlar ve şartlar belgelenmiş |
