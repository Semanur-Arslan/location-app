# 📍 Konum Yönetimi ve Rota Oluşturma Uygulaması

Bu uygulama, kullanıcıların harita üzerinden konum eklemesini, bu konumları listelemesini, düzenlemesini ve harita üzerinde rota oluşturmasını sağlayan bir web uygulamasıdır.


https://github.com/user-attachments/assets/f235c87c-f4f3-4f0b-91b5-7039dd1754fd


## 🚀 Kullanılan Teknolojiler

- **Next.js** 
- **Chakra UI** 
- **TypeScript**
- **Google Maps JavaScript API**
- **Redux Toolkit** 
- **Redux Persist**
- **React Toastify**

---

## 🧩 Uygulama Özellikleri

### 📌 Konum Ekleme Sayfası
- Google Haritası üzerinden konum seçimi
- Seçilen noktanın enlem ve boylam bilgilerinin alınması
- Kullanıcı tarafından konum adı girilmesi
- Renk seçici ile marker rengi belirlenmesi
- Tüm bilgiler tarayıcı belleğinde saklanır

### 📋 Konumları Listeleme Sayfası
- Kaydedilen konumların isim ve renkli marker simgeleriyle listelenmesi
- Marker simgelerine tıklanarak enlem ve boylam bilgilerinin gösterilmesi
- Her konum satırındaki buton ile konum bilgilerini güncelleme sayfasına yönlendirme
- Sayfa üstünde yer alan "Show Route" butonuyla rota sayfasına geçiş

### 🛠️ Konum Düzenleme Sayfası
- Harita üzerinden konum bilgisi (koordinatlar) güncellenebilir.
- Form alanında daha önce eklenen konum bilgileri (ad, marker rengi) güncellenebilir.

### 🗺️ Rota Gösterme Sayfası
- Kullanıcının eklediği tüm konumlar, harita üzerinde kendi renkli marker'ları ile gösterilir
- Marker'lara tıklanarak konum adı ve koordinatlar görüntülenir
- Kullanıcının mevcut konumuna en yakın konumdan başlayarak kuş bakışı rota oluşturulur
- Oluşturulan rota sağda bulunan alanda listelenir ve buradan da tıklanarak ilgili konum bilgisine haritadan ulaşılabilir.

## 📌 Uygulama Açılışında

- Uygulama yüklendiğinde tarayıcı üzerinden **konum izni** talep edilir
- Kullanıcının konumu alınarak rota oluşturma sayfasında başlangıç noktası olarak kullanılır

---

## 📦 Kurulum Adımları

```bash
# Depoyu klonlayın
git clone [https://github.com/kullanici-adi/proje-adi.git](https://github.com/Semanur-Arslan/location-app.git)

# Proje klasörüne geçin
cd location-app

# Bağımlılıkları yükleyin
npm install

# Ortam değişkenleri dosyasını oluşturun
cp .env.example .env.local
