const activitiesData = [
    {
        id: 'ayder-kuzey-houses',
        name: 'Ayder Kuzey Houses 😊',
        distance: 0,
        image: '/images/activities/ayder-kuzey-houses.jpg',
        shortDescription: 'Zaten buradasınız! En akıllı tercih :)',
        activities: [
            { icon: '🍳', name: 'Serpme Kahvaltı', description: 'Yöresel lezzetlerle dolu, dere manzaralı kahvaltı keyfi' },
            { icon: '📸', name: 'Fotoğraf Çekimi', description: 'Doğa ile iç içe Instagram\'lık kareler yakalayın' },
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Tesisimizden başlayan orman yürüyüş parkurları' },
            { icon: '♨️', name: 'Jakuzi Keyfi', description: 'Dere manzaralı jakuzide huzur bulun' },
            { icon: '☕', name: 'Teras Keyfi', description: 'Nehir sesini dinleyerek çay ve kahve molası' },
            { icon: '🌙', name: 'Yıldız Gözlemi', description: 'Işık kirliliğinden uzak, yıldızlı geceler' }
        ],
        details: 'Ayder Kuzey Houses, doğanın kalbinde, nehir kenarında konumlanan eşsiz bir kaçış noktasıdır. Tesisimizde konaklarken aslında en güzel aktiviteyi zaten yapıyorsunuz: Doğayla iç içe, huzur dolu bir tatil! Bungalovlarımızda jakuzi keyfi, terasımızda nehir manzaralı kahvaltı ve akşam yıldız gözlemi... Daha ne olsun? 😊',
        season: 'Tüm mevsimler',
        duration: 'Konaklama süreniz boyunca',
        difficulty: 'Kolay (Çok kolay aslında, sadece rahatlayın!)'
    },
    {
        id: 'yedigoller',
        name: 'Yedigöller Milli Parkı',
        distance: 25,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Türkiye\'nin en güzel doğal parkı, yürüyüş ve fotoğraf için ideal',
        activities: [
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Parkın içindeki işaretlenmiş yürüyüş rotalarında doğayla iç içe vakit geçirin' },
            { icon: '📸', name: 'Fotoğrafçılık', description: 'Her mevsim farklı güzellikte olan gölleri fotoğraflayın' },
            { icon: '🎣', name: 'Balık Tutma', description: 'Belirlenmiş bölgelerde olta balıkçılığı yapabilirsiniz' },
            { icon: '🌲', name: 'Piknik', description: 'Göl kenarlarında ailecek piknik keyfi' }
        ],
        details: 'Yedigöller Milli Parkı, özellikle sonbahar aylarında büyüleyici renk tonlarıyla ünlü, Türkiye\'nin en çok fotoğraflanan doğal alanlarından biridir. Yedi ayrı göl, her biri farklı renk tonlarında, ziyaretçilerini büyüleyen muhteşem manzaralara sahiptir.',
        season: 'İlkbahar, Yaz, Sonbahar',
        duration: 'Tam gün',
        difficulty: 'Kolay'
    },
    {
        id: 'firtina-deresi',
        name: 'Fırtına Deresi',
        distance: 25,
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Rafting ve doğa yürüyüşü için eşsiz bir rota',
        activities: [
            { icon: '🚣', name: 'Rafting', description: 'Adrenalin dolu rafting deneyimi yaşayın' },
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Dere kenarında muhteşem yürüyüş parkurları' },
            { icon: '📸', name: 'Fotoğraf Çekimi', description: 'Tarihi köprüler ve yeşil doğa' },
            { icon: '☕', name: 'Yerel Çay Bahçeleri', description: 'Dere manzaralı çay keyfi' }
        ],
        details: 'Fırtına Deresi, Karadeniz\'in en popüler rafting merkezlerinden biridir. Tarihi Osmanlı köprüleri, yemyeşil doğası ve berrak suları ile ziyaretçilerine unutulmaz anlar yaşatır.',
        season: 'İlkbahar, Yaz',
        duration: 'Yarım gün - Tam gün',
        difficulty: 'Orta'
    },
    {
        id: 'ayder-yaylasi',
        name: 'Ayder Yaylası',
        distance: 4,
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Termal kaynaklar ve yüksek yayla atmosferi',
        activities: [
            { icon: '♨️', name: 'Termal Banyo', description: 'Doğal termal kaynaklarda şifa bulun' },
            { icon: '🏔️', name: 'Yayla Turu', description: 'Geleneksel ahşap evler arasında gezinti' },
            { icon: '🍯', name: 'Yerel Ürünler', description: 'Yayla balı, peyniri ve tereyağı' },
            { icon: '🌺', name: 'Botanik Gözlem', description: 'Endemik bitki türlerini keşfedin' }
        ],
        details: 'Ayder Yaylası, 1350 metre yükseklikte yer alan, termal kaynakları ve muhteşem doğasıyla ünlü bir yayla turizm merkezidir. Her mevsim farklı güzellikte olan bu cennet köşesi, dinlenmek isteyenler için idealdir.',
        season: 'Tüm mevsimler',
        duration: 'Yarım gün - Tam gün',
        difficulty: 'Kolay'
    },
    {
        id: 'huser-yaylasi',
        name: 'Huser Yaylası',
        distance: 12,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Saklı cennet, kalabalıktan uzak huzur',
        activities: [
            { icon: '🏕️', name: 'Kamp', description: 'Yıldızlar altında kamp yapma imkanı' },
            { icon: '🥾', name: 'Trekking', description: 'Zorlu ama ödüllendirici yürüyüş rotaları' },
            { icon: '🦋', name: 'Kelebek Gözlemi', description: 'Nadir kelebek türlerini görün' },
            { icon: '🌄', name: 'Gün Doğumu', description: 'Bulutların üstünde gün doğumu' }
        ],
        details: 'Huser Yaylası, turistik kalabalıktan uzak, doğal güzelliği bozulmamış bir yayla. 2200 metre yükseklikte bulutların arasında bir cennet köşesi.',
        season: 'Yaz, Sonbahar',
        duration: 'Tam gün',
        difficulty: 'Zor'
    },
    {
        id: 'zilkale',
        name: 'Zilkale',
        distance: 15,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Tarihi Ortaçağ kalesi, muhteşem manzara',
        activities: [
            { icon: '🏰', name: 'Kale Turu', description: 'Ortaçağ\'dan kalma tarihi kaleyi keşfedin' },
            { icon: '📸', name: 'Panoramik Fotoğraf', description: 'Fırtına Vadisi manzarası' },
            { icon: '🥾', name: 'Tırmanış', description: 'Kaleye çıkış parkuru' },
            { icon: '📚', name: 'Tarih Keşfi', description: 'Bizans ve Ceneviz dönemi izleri' }
        ],
        details: 'Zilkale, Fırtına Vadisi\'ne hakim bir tepede yer alan, 14. yüzyıldan kalma muhteşem bir Ortaçağ kalesidir. Game of Thrones dizisine ilham verdiği söylenir.',
        season: 'Tüm mevsimler',
        duration: '2-3 saat',
        difficulty: 'Orta'
    },
    {
        id: 'palovit-selalesi',
        name: 'Palovit Şelalesi',
        distance: 18,
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Etkileyici doğal şelale, serinleme alanı',
        activities: [
            { icon: '💦', name: 'Şelale İzleme', description: '30 metre yükseklikten dökülen şelale' },
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Şelaleye ulaşan doğa parkuru' },
            { icon: '🧘', name: 'Meditasyon', description: 'Şelale sesiyle huzur bulun' },
            { icon: '🌿', name: 'Piknik', description: 'Şelale çevresinde ailecek piknik' }
        ],
        details: 'Palovit Şelalesi, 30 metre yükseklikten dökülen etkileyici bir doğa harikasıdır. Yemyeşil ormanların içinde, serinlik ve huzur arayan ziyaretçilerin gözdesidir.',
        season: 'İlkbahar, Yaz',
        duration: '2-3 saat',
        difficulty: 'Kolay'
    },
    {
        id: 'senyuva-koprusu',
        name: 'Şenyuva Köprüsü',
        distance: 22,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Tarihi taş köprü, Fırtına Deresi üzerinde',
        activities: [
            { icon: '🌉', name: 'Köprü Gezisi', description: 'Osmanlı döneminden kalma taş köprü' },
            { icon: '📸', name: 'Fotoğraf Çekimi', description: 'Kartpostal manzaraları' },
            { icon: '🚶', name: 'Köy Gezisi', description: 'Geleneksel Hemşin köylerini gezin' },
            { icon: '☕', name: 'Yerel Kahve', description: 'Köprü manzaralı çay bahçeleri' }
        ],
        details: 'Şenyuva Köprüsü, Fırtına Deresi üzerinde yer alan tarihi bir Osmanlı taş köprüsüdür. Çevresindeki geleneksel ahşap evler ve yeşil doğa ile birleşince benzersiz bir manzara oluşturur.',
        season: 'Tüm mevsimler',
        duration: '1-2 saat',
        difficulty: 'Kolay'
    },
    {
        id: 'samistal-yaylasi',
        name: 'Samistal Yaylası',
        distance: 15,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Bulutların üstünde bir yayla deneyimi',
        activities: [
            { icon: '🏔️', name: 'Dağ Yürüyüşü', description: 'Zirve tırmanışları ve yayla gezileri' },
            { icon: '🏕️', name: 'Yayla Kampı', description: 'Geleneksel yayla evlerinde konaklama' },
            { icon: '🧀', name: 'Yayla Peyniri', description: 'Taze yapılmış peynir ve tereyağı tadımı' },
            { icon: '🌌', name: 'Yıldız Gözlemi', description: 'Işık kirliliğinden uzak gece gökyüzü' }
        ],
        details: 'Samistal Yaylası, 2500 metre yükseklikte, bulutların üzerinde bir yayla. Doğal güzelliği ve otantik yayla kültürü ile ziyaretçilerini büyüler.',
        season: 'Yaz, Sonbahar',
        duration: 'Tam gün',
        difficulty: 'Orta'
    },
    {
        id: 'kavrun-yaylasi',
        name: 'Kavrun Yaylası',
        distance: 8,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Ayder\'e yakın saklı yayla güzelliği',
        activities: [
            { icon: '🚶', name: 'Kolay Yürüyüş', description: 'Aileler için uygun yürüyüş rotası' },
            { icon: '🌸', name: 'Botanik Gezisi', description: 'Endemik çiçekler ve bitkiler' },
            { icon: '🐄', name: 'Yayla Yaşamı', description: 'Geleneksel hayvancılık gözlemi' },
            { icon: '🥛', name: 'Süt Ürünleri', description: 'Taze süt, yoğurt ve ayran' }
        ],
        details: 'Kavrun Yaylası, Ayder\'e çok yakın, daha az bilinen ama bir o kadar güzel bir yayla. Sakin atmosferi ve doğal güzelliği ile aileler için ideal.',
        season: 'Yaz, Sonbahar',
        duration: 'Yarım gün',
        difficulty: 'Kolay'
    },
    {
        id: 'pokut-yaylasi',
        name: 'Pokut Yaylası',
        distance: 12,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Instagram fenomeni yayla, bulut denizi',
        activities: [
            { icon: '☁️', name: 'Bulut Denizi', description: 'Sabah erken saatlerde bulutların üstünde olma deneyimi' },
            { icon: '📸', name: 'Fotoğraf Şöleni', description: 'Sosyal medya için muhteşem kareler' },
            { icon: '🥾', name: 'Trekking', description: 'Çevredeki yaylalara yürüyüş rotaları' },
            { icon: '🌄', name: 'Gün Doğumu İzleme', description: 'Bulutların arasından doğan güneş' }
        ],
        details: 'Pokut Yaylası, sosyal medyada viral olan, bulut denizi manzarasıyla ünlü bir yayla. 2032 metre yükseklikte, sabah erken saatlerde bulutların üzerinde yürüyormuş hissi verir.',
        season: 'Yaz, Sonbahar',
        duration: 'Tam gün',
        difficulty: 'Orta'
    },
    {
        id: 'tar-deresi',
        name: 'Tar Deresi',
        distance: 10,
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Doğal havuzlar ve şelaleler',
        activities: [
            { icon: '🏊', name: 'Doğal Havuzda Yüzme', description: 'Berrak suda serinleme' },
            { icon: '💦', name: 'Şelale Turu', description: 'Birbirini takip eden küçük şelaleler' },
            { icon: '🥾', name: 'Dere Yürüyüşü', description: 'Dere yatağında macera dolu yürüyüş' },
            { icon: '🌳', name: 'Orman Banyosu', description: 'Yemyeşil orman içinde dinlenme' }
        ],
        details: 'Tar Deresi, kristal berraklığındaki suyu ve doğal havuzlarıyla ünlü bir doğa harikası. Yaz aylarında serinlemek isteyenler için cennet gibi bir yer.',
        season: 'Yaz',
        duration: 'Yarım gün',
        difficulty: 'Kolay'
    }
]

export default activitiesData
