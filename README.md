# MusicAl

## Proje Genel Bakış

MusicAl, yapay zeka destekli bir müzik uygulamasıdır. Kullanıcılar aylık veya yıllık abonelik planları ile premium özelliklere erişebilir.

## Teknik Altyapı

- HTML5
- TailwindCSS
- JavaScript
- JSON

## Proje Yapısı

src/
├── assets/
│ ├── data/
│ │ ├── data.json # Abonelik planları ve özellikleri
│ │ └── translation.json # Çoklu dil desteği çevirileri
│ └── image/
├── css/
│ ├── input.css # TailwindCSS kaynak dosyası
│ └── output.css # Derlenmiş CSS
├── js/
│ ├── translation.js # Çoklu dil yönetimi
└── pages/
├── settings.html # Ayarlar sayfası
├── subscription.html # Abonelik sayfası
└── profile.html # Profil sayfası

## Çoklu Dil Desteği (translation.js)

Translation.js dosyası, uygulamanın çoklu dil desteğini yönettiğim dosya:

- Varsayılan dil Türkçe olarak ayarladım
- Dil tercihinı localStorage'da sakladım
- HTML elementlerinde `data-translate` attribute'nu kullanarak çeviri anahtarları belirledim
- Sayfa yüklendiğinde ve dil değiştiğinde tüm metinler otomatik güncellenmesini sağladım

```javascript
// Dil yönetimi için temel değişkenleri burada tanımladım
let translations;
let currentLanguage = localStorage.getItem("language") || "tr";

// Çevirileri yükledim
async function loadTranslations() {
  try {
    const response = await fetch("../assets/data/translation.json");
    translations = await response.json();
    updateTexts();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// Sayfadaki metinleri güncelledim
function updateTexts() {
  // data-translate özelliği olan tüm elementleri bulup çevirmek için kullandım
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  elementsToTranslate.forEach((element) => {
    const translationKey = element.getAttribute("data-translate");
    if (translations[currentLanguage][translationKey]) {
      element.textContent = translations[currentLanguage][translationKey];
    }
  });
}
```

## 🔧 Ayarlar Sayfası (settings.js)

Settings.js dosyası, ayarlar sayfasının işlevselliğini yönetir:

```javascript
// Profil biilgilerini güncelledim localde bu verileri tuttum
const updateName = () => {
  const profileData = JSON.parse(localStorage.getItem("profileData") || "{}");
  nameSpan.textContent = profileData.fullName || "Berin Doga Alaca";
};

// Logout butonuna basıldıgında loacaldeki verileri temizledim
document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.clear();
  updateName();
});
```

## 📱 Abonelik Sayfası (subscription.js)

Subscription.js dosyası, abonelik planlarını ve özellikleri yönetir:

```javascript
// Sayfa başlangıçtaki görğntğsğnde gelecek datalar için oluştrudum
async function initializePage() {
  const elements = {
    featuresList: document.getElementById("features-list"),
    planRadios: document.querySelectorAll('input[name="plan"]'),
    actionButton: document.querySelector("#action-button button"),
    // ...
  };

  // Kullanıcının seçtiği planı localden cektim
  const savedPlan = localStorage.getItem("selectedPlan") || "yearly";

  // Secılen veya varsayılan planın özelliklerini data.json'dan yükledim
  const response = await fetch("../assets/data/data.json");
  const data = await response.json();

  // Kullanıcı farklı plan secıp guncelledıgınde hem localdekı degerı de guncelledım
  document.querySelector(`input[value="${savedPlan}"]`).checked = true;
  updateFeatures(data, savedPlan);
}
```

## 👤 Profil Sayfası (profile.js)

Profile.js dosyası, kullanıcı profil yönetimini sağlar:

```javascript
// Form validasyonlarını tanımladım
const validateForm = () => {
  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  // İsim kontrolü
  if (!fullName) {
    showError("nameRequired");
    return false;
  }

  // Telefon kontrolü
  if (!phone) {
    showError("phoneRequired");
    return false;
  }

  // Email kontrolü
  if (!email) {
    showError("emailRequired");
    return false;
  }

  return true;
};

// Kullanıcının gırdıgı degerlere göre verileri güncelledim
const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    // Profil bilgilerini localStorage'a kaydettim
    const profileData = {
      fullName: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
    };
    localStorage.setItem("profileData", JSON.stringify(profileData));
    showSuccess("profileUpdated");
  }
};
```

## 💳 Abonelik Sistemi (subscription.html)

Abonelik sayfası iki plan sunar:

1. Aylık Plan (₺3.99)

   - Temel AI müzik üretimi
   - Aylık 50 şarkıya kadar
   - Standart kalitede dışa aktarma

2. Yıllık Plan (₺19.99)
   - Gelişmiş AI müzik üretimi
   - Sınırsız şarkı üretimi
   - Yüksek kalitede dışa aktarma
   - 7/24 öncelikli destek

```javascript
// Plan özelliklerini data.json'dan yükledim ve bu şekilde sayfada gösterdim
function updateFeatures(data, selectedType) {
  const featuresList = document.getElementById("features-list");
  const selectedPlan = data.plans.find((plan) => plan.type === selectedType);

  if (!selectedPlan || !featuresList) return;

  featuresList.innerHTML = selectedPlan.features
    .map(
      (featureKey) => `
      <li class="flex items-center gap-[17px]">
        <svg>...</svg>
        <span class="text-white">${translations[currentLanguage][featureKey]}</span>
      </li>
    `
    )
    .join("");
}
```

## ⚙️ Ayarlar Sayfası (settings.html)

Ayarlar sayfası şu özellikleri içerir:

- Profil yönetimi
- Abonelik yönetimi
- Dil seçimi
- Çıkış yapma

## Profil Sayfası

Kullanıcı profil bilgilerini yönetme:

- Ad Soyad
- Telefon numarası
- Email
- Form validasyonu
- Profil güncelleme

## Tasarım Özellikleri

- Gradient arka planlar
- Modern ve temiz arayüz
- Responsive tasarım
- Animasyonlar ve geçiş efektleri
- TailwindCSS ile özelleştirilmiş stil

## Veri Yönetimi

- Kullanıcı tercihleri localStorage'da saklanır
- Dil seçimi kalıcı olarak kaydedilir
- Seçilen abonelik planı saklanır
- Profil bilgileri yerel olarak tutulur

## Performans Optimizasyonu

- Lazy loading kullanımı
- Minimal CSS (TailwindCSS)
- Optimize edilmiş görseller
- Modüler JavaScript yapısı

  
