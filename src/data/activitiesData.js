const activitiesData = [
    {
        id: 'yedigoller',
        name: 'Yedigöller Milli Parkı',
        distance: 25,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Doğa yürüyüşü ve fotoğraf odaklı ziyaretler için geniş parkur seçenekleri sunan, bölgenin en kapsamlı doğal alanlarından biridir.',
        activities: [
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Parkın içindeki işaretlenmiş yürüyüş rotalarında doğayla iç içe vakit geçirin' },
            { icon: '📸', name: 'Fotoğrafçılık', description: 'Her mevsim farklı güzellikte olan gölleri fotoğraflayın' },
            { icon: '�', name: 'Göle Girmek', description: 'Belirlenmiş bölgelerde serinleme ve yüzme imkanı' },
            { icon: '🌲', name: 'Piknik', description: 'Göl kenarlarında ailecek piknik keyfi' }
        ],
        details: 'Yedigöller Milli Parkı, özellikle sonbahar aylarında büyüleyici renk tonlarıyla ünlü, Türkiye\'nin en çok fotoğraflanan doğal alanlarından biridir. Yedi ayrı göl, her biri farklı renk tonlarında, ziyaretçilerini büyüleyen muhteşem manzaralara sahiptir.',
        season: 'İlkbahar, Yaz, Sonbahar',
        duration: 'Tam gün',
        difficulty: 'Zor'
    },
    {
        id: 'firtina-deresi',
        name: 'Fırtına Deresi',
        distance: 25,
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Vadi boyunca uzanan manzarası ve kontrollü doğa aktiviteleriyle Karadeniz\'in en bilinen doğal rotalarından biridir.',
        activities: [
            { icon: '🚣', name: 'Rafting', description: 'Adrenalin dolu rafting deneyimi yaşayın' },
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Dere kenarında muhteşem yürüyüş parkurları' },
            { icon: '📸', name: 'Fotoğraf Çekimi', description: 'Tarihi köprüler ve yeşil doğa' },
            { icon: '🎪', name: 'Eğlence Aktiviteleri', description: 'Salıncak, at binme gibi aktiviteler' }
        ],
        details: 'Fırtına Deresi, Karadeniz\'in en popüler rafting merkezlerinden biridir. Tarihi Osmanlı köprüleri, yemyeşil doğası ve berrak suları ile ziyaretçilerine unutulmaz anlar yaşatır.',
        season: 'İlkbahar, Yaz',
        duration: 'Tam gün',
        difficulty: 'Orta'
    },
    {
        id: 'ayder-yaylasi',
        name: 'Ayder Yaylası',
        distance: 4,
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Termal kaynakları ve yüksek yayla konumuyla bölgeyi ilk kez ziyaret eden misafirler için temel duraklardan biridir.',
        activities: [
            { icon: '♨️', name: 'Termal Banyo', description: 'Doğal termal kaynaklarda şifa bulun' },
            { icon: '🏔️', name: 'Yayla Turu', description: 'Geleneksel ahşap evler arasında gezinti' },
            { icon: '�', name: 'Hediyelik Eşya', description: 'Yayla balı, peyniri ve el sanatları' },
            { icon: '📸', name: 'Fotoğraf Çekmek', description: 'Doğa ve yayla manzaralarını ölümsüzleştirin' }
        ],
        details: 'Ayder Yaylası, 1350 metre yükseklikte yer alan, termal kaynakları ve muhteşem doğasıyla ünlü bir yayla turizm merkezidir. Her mevsim farklı güzellikte olan bu cennet köşesi, dinlenmek isteyenler için idealdir.',
        season: 'Tüm mevsimler',
        duration: 'Tam gün',
        difficulty: 'Kolay'
    },
    {
        id: 'huser-yaylasi',
        name: 'Huser Yaylası',
        distance: 12,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Yüksek rakımı sayesinde geniş manzara açıları sunan, gün doğumu ve gün batımıyla öne çıkan bir yayladır.',
        activities: [
            { icon: '🏕️', name: 'Piknik', description: 'Yüksek yayla atmosferinde ailecek piknik keyfi' },
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Zorlu ama ödüllendirici yürüyüş rotaları' },
            { icon: '📸', name: 'Fotoğrafçılık', description: 'Muhteşem yayla ve doğa manzaraları' },
            { icon: '🌄', name: 'Gün Batımı', description: 'Bulutların üstünde gün batımı' }
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
        shortDescription: 'Fırtına Vadisi\'ne hâkim konumda yer alan bu Ortaçağ kalesi, tarihi ve manzarayı bir arada sunar.',
        activities: [
            { icon: '🏰', name: 'Kale Turu', description: 'Ortaçağ\'dan kalma tarihi kaleyi keşfedin' },
            { icon: '📸', name: 'Panoramik Fotoğraf', description: 'Fırtına Vadisi manzarası' },
            { icon: '🥾', name: 'Tırmanış', description: 'Kaleye çıkış parkuru' },
            { icon: '📚', name: 'Tarih Keşfi', description: 'Ortaçağ dönemi izleri' }
        ],
        details: 'Zilkale, Fırtına Vadisi\'ne hakim bir tepede yer alan, 14. yüzyıldan kalma muhteşem bir Ortaçağ kalesidir.',
        season: 'Tüm mevsimler',
        duration: '2-3 saat',
        difficulty: 'Kolay'
    },
    {
        id: 'palovit-selalesi',
        name: 'Palovit Şelalesi',
        distance: 18,
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Güçlü su akışı ve doğal çevresiyle kısa süreli doğa molaları için tercih edilen etkileyici bir şelaledir.',
        activities: [
            { icon: '💦', name: 'Şelale İzleme', description: '30 metre yükseklikten dökülen şelale' },
            { icon: '🥾', name: 'Doğa Gezintisi', description: 'Şelale çevresinde doğa keşfi' },
            { icon: '📸', name: 'Fotoğrafçılık', description: 'Şelalenin etkileyici görüntülerini çekin' },
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
        shortDescription: 'Fırtına Deresi üzerinde yer alan tarihi taş köprü, mimarisi ve çevresindeki manzarayla dikkat çeker.',
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
        shortDescription: 'Geniş yayla alanları ve yüksek konumuyla geleneksel yayla atmosferini yansıtan bir rotadır.',
        activities: [
            { icon: '🏔️', name: 'Dağ Yürüyüşü', description: 'Zirve tırmanışları ve yayla gezileri' },
            { icon: '👥', name: 'Yerel Halk ile Sohbet', description: 'Geleneksel yayla evlerinde sohbet' },
            { icon: '📸', name: 'Fotoğrafçılık', description: 'Yayla manzaralarını fotoğraflayın' },
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
        shortDescription: 'Ayder\'e yakınlığı sayesinde kolay ulaşılabilen, sakin yapısıyla öne çıkan bir yayladır.',
        activities: [
            { icon: '�', name: 'Fotoğrafçılık', description: 'Yayla manzaralarını ölümsüzleştirin' },
            { icon: '⛰️', name: 'Zirve Yürüyüşü', description: 'Çevredeki zirvelere tırmanış rotaları' },
            { icon: '🐄', name: 'Yayla Yaşamı', description: 'Geleneksel hayvancılık gözlemi' },
            { icon: '🍯', name: 'Yerel Ürünler', description: 'Bal, süt ve diğer yayla ürünleri' }
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
        shortDescription: 'Bulut seviyesine yakın konumu ve açık havalarda sunduğu manzaralarla bilinen popüler bir yayladır.',
        activities: [
            { icon: '☁️', name: 'Bulut Denizi', description: 'Sabah erken saatlerde bulutların üstünde olma deneyimi' },
            { icon: '📸', name: 'Fotoğraf Şöleni', description: 'Sosyal medya için muhteşem kareler' },
            { icon: '🥾', name: 'Trekking', description: 'Çevredeki yaylalara yürüyüş rotaları' },
            { icon: '🌄', name: 'Gün Batımı İzleme', description: 'Bulutların arasından batan güneş' }
        ],
        details: 'Pokut Yaylası, sosyal medyada viral olan, bulut denizi manzarasıyla ünlü bir yayla. 2032 metre yükseklikte, sabah erken saatlerde bulutların üzerinde yürüyormuş hissi verir.',
        season: 'Yaz, Sonbahar',
        duration: 'Tam gün',
        difficulty: 'Zor'
    },
    {
        id: 'tar-deresi',
        name: 'Tar Deresi',
        distance: 10,
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        shortDescription: 'Doğal oluşumları ve serin ortamıyla kısa doğa yürüyüşleri için uygun bir vadi rotasıdır.',
        activities: [
            { icon: '📸', name: 'Fotoğrafçılık', description: 'Berrak su ve doğa manzaralarını çekin' },
            { icon: '💦', name: 'Şelale Turu', description: 'Birbirini takip eden küçük şelaleler' },
            { icon: '🥾', name: 'Doğa Yürüyüşü', description: 'Dere yatağında macera dolu yürüyüş' },
            { icon: '🌳', name: 'Orman Banyosu', description: 'Yemyeşil orman içinde dinlenme' }
        ],
        details: 'Tar Deresi, kristal berraklığındaki suyu ve doğal havuzlarıyla ünlü bir doğa harikası. Yaz aylarında serinlemek isteyenler için cennet gibi bir yer.',
        season: 'Yaz',
        duration: 'Yarım gün',
        difficulty: 'Zor'
    }
]

export default activitiesData
