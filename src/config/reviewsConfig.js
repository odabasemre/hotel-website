const reviewsConfig = {
    // Google Places API Key
    apiKey: "AIzaSyAtfWWECh_JsksaGJCgQPJiUCnZtExgOBk",

    // Google Place ID
    // You can find your Place ID here: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
    // Or leave empty if you want to search by name (less accurate)
    placeId: "ChIJCagPAQ0ZZkARwIbiDyDff2Y", // Default placeholder, please update with your actual Place ID

    // Caching settings
    cacheDurationDays: 30, // Update reviews once every 30 days

    // Display settings
    maxReviews: 10,
    minRating: 4, // Only show reviews with 4 or 5 stars

    // Fallback static reviews (shown if API fails or quota exceeded)
    fallbackReviews: [
        {
            id: 1,
            text: "Nehir kenarındaki manzara muhteşemdi. Orada güzel vakit geçirmemiz harika bir şeydi.",
            author: "Muhammed",
            location: "Umman",
            rating: 5
        },
        {
            id: 2,
            text: "Burası dört kişi için çok güzel, sakin ve iyi organize edilmiş bir yer. Kahvaltı sipariş ettik ve özellikle nehir kenarındaki manzarası ve atmosferiyle açık hava kahvaltısı mükemmeldi.",
            author: "Althanian",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 3,
            text: "Konum harika. Şelalelerin ve nehirlerin su sesleri eşliğinde uyuyorsunuz. Özel ve sakin, muhteşem bir deneyim ✨️",
            author: "Halile",
            location: "İsrail",
            rating: 5
        },
        {
            id: 4,
            text: "Otelin temizliği ve tasarımı çok iyiydi. Ayrıca ekran, internet, Netflix hesabı, ısıtıcı, saç kurutma makinesi ve temizlik ekipmanları gibi tüm ihtiyaçlar sağlanmıştı.",
            author: "Abdülaziz",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 5,
            text: "Nehir kenarında romantik ve harika bir konum. Dinlenme alanı mevcut. Mekânın sahipleri cana yakın ve yardımsever, ayrıca mekân çok temiz. Zarif ve güzel kişiliklere hitap eden bir yer.",
            author: "Yahya",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 6,
            text: "Nehrin manzarası çok güzel. Kulübe çok temiz, mobilyalar rahat ve sahibi çok iyi biri. Kamp yapmak için harika bir yer. Ayder şehrine yaklaşık 6 km uzaklıktadır.",
            author: "Mamdûh",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 7,
            text: "En iyi deneyimlerimden biriydi. Kulübe nehrin tam karşısında yer alıyor. Konaklamam boyunca misafirperverliği için İmran’a teşekkür etmek isterim. Not: Konaklama kapasitesi 7 kişiydi.",
            author: "Nasır",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 8,
            text: "Harika, anlatması zor. İki kulübeyi birlikte aldığınızda tam bir mahremiyet sağlanıyor. İmran ve babası son derece saygılı insanlar. Tek hata, sadece 4 gün kalmış olmam; aslında 40 gün kalmalıydım.",
            author: "Sâri",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 9,
            text: "Çok güzel bir kırsal deneyim. Tam anlamıyla kırsal bir yaşam isteyenlere tavsiye ederim; nehre doğrudan manzarası var. Kulübe ile nehrin diğer yakası arasında ahşap bir köprü bulunuyor. Ev sahipleri eşyaların taşınmasında yardımcı oluyor. Ev sahipleri gerçekten çok iyiler.",
            author: "Yasir",
            location: "Umman",
            rating: 5
        },
        {
            id: 10,
            text: "Kulübe güzel ve yeni, ihtiyacınız olan tüm hizmetler mevcut ve nehir manzaralı. En güzel yanı ise çok iyi yalıtılmış olması; kapıyı kapattığınızda nehir sesi duyulmuyor. Fiyatlar çok uygun ve ulaşımı kolay. Aile son derece ilgili 🤍❤️",
            author: "Rakan A.",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 11,
            text: "Gezilip görülmesi gereken bir yer. Ben çok beğendim, herkesin de gidip görmesini isterim.",
            author: "Deniz",
            location: "Türkiye",
            rating: 5
        },
        {
            id: 12,
            text: "Manzara harika. Personel yardımsever.",
            author: "Zehra",
            location: "Birleşik Arap Emirlikleri",
            rating: 5
        },
        {
            id: 13,
            text: "Bu tesiste geçirdiğimiz zaman, stres atmak ve doğayla yeniden bağ kurmak için mükemmeldi.",
            author: "Yiğit",
            location: "Türkiye",
            rating: 5
        },
        {
            id: 14,
            text: "Manzarası çok güzel, çalışanları güler yüzlü ve her problemimizde bize yardımcı oldular.",
            author: "Baki",
            location: "Türkiye",
            rating: 5
        },
        {
            id: 15,
            text: "Ayder yaylasına çok yakın konumda bulunan ve konaklamaktan çok memnun kaldığım bir bungolovdu. Ev sahipleri gerçekten çok nazik ve yardımsever.",
            author: "Sezin",
            location: "Türkiye",
            rating: 5
        }
    ]
}

export default reviewsConfig
