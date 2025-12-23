const testimonials = {
    tr: [
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
            author: "Al-Thani",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 3,
            text: "Konum harika. Şelalelerin ve nehirlerin su sesleri eşliğinde uyuyorsunuz. Özel ve sakin, muhteşem bir deneyim ✨️",
            author: "Halile",
            location: "Suudi Arabistan",
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
            author: "Memduh",
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
            text: "En iyi deneyimlerimden biriydi. Kulübe nehrin tam karşısında yer alıyor. Konaklamam boyunca misafirperverliği için Emre'ye teşekkür etmek isterim. Not: Konaklama kapasitesi 7 kişiydi.",
            author: "Nasır Moharraq",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 14,
            text: "Harika, anlatması zor. İki kulübeyi birlikte aldığınızda tam bir mahremiyet sağlanıyor. Emre ve babası son derece saygılı insanlar. Tek hata, sadece 4 gün kalmış olmam; aslında 40 gün kalmalıydım.",
            author: "Sâri Alsary",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 15,
            text: "Çok güzel bir kırsal deneyim. Tam anlamıyla kırsal bir yaşam isteyenlere tavsiye ederim; nehre doğrudan manzarası var. Kulübe ile nehrin diğer yakası arasında ahşap bir köprü bulunuyor. Ev sahipleri eşyaların taşınmasında yardımcı oluyor. Ev sahipleri gerçekten çok iyiler.",
            author: "Yasir Abalkhayl",
            location: "Suudi Arabistan",
            rating: 5
        },
        {
            id: 16,
            text: "Kulübe güzel ve yeni, ihtiyacınız olan tüm hizmetler mevcut ve nehir manzaralı. En güzel yanı ise çok iyi yalıtılmış olması; kapıyı kapattığınızda nehir sesi duyulmuyor. Fiyatlar çok uygun ve ulaşımı kolay. Aile son derece ilgili 🤍❤️",
            author: "Rakan Alruwaili",
            location: "Suudi Arabistan",
            rating: 5
        }
    ],
    en: [
        {
            id: 1,
            text: "The river view was magnificent. It was a wonderful experience to spend time there.",
            author: "Mohammed",
            location: "Oman",
            rating: 5
        },
        {
            id: 2,
            text: "A beautiful, peaceful and well-organized place for four people. The outdoor breakfast with the river view and atmosphere was perfect.",
            author: "Al-Thani",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 3,
            text: "The location is fantastic. You sleep with the soothing sound of waterfalls and rivers. Private and calm, a magnificent experience ✨️",
            author: "Khalila",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 4,
            text: "The cleanliness and design of the hotel were very good. All necessities like internet, Netflix, heater, and hairdryer were provided.",
            author: "Abdulaziz",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 5,
            text: "Romantic and wonderful location by the river. The owners are very friendly and helpful. The place is extremely clean and elegant.",
            author: "Yahya",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 12,
            text: "The view is amazing. The staff is very helpful and friendly.",
            author: "Zahra",
            location: "United Arab Emirates",
            rating: 5
        },
        {
            id: 13,
            text: "It was one of my best experiences. The cabin is located right across the river. I would like to thank Emre for his hospitality during my stay. Note: The accommodation capacity was 7 people.",
            author: "Nasir Moharraq",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 14,
            text: "Amazing, hard to describe. When you take both cabins together, you get complete privacy. Emre and his father are extremely respectful people. The only mistake was staying only 4 days; I should have stayed 40 days.",
            author: "Sari Alsary",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 15,
            text: "A very beautiful rural experience. I recommend it to those who want a truly rural life; it has a direct view of the river. There is a wooden bridge between the cabin and the other side of the river. The hosts help with carrying belongings. The hosts are really great.",
            author: "Yasir Abalkhayl",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 16,
            text: "The cabin is beautiful and new, all the services you need are available with a river view. The best part is that it's very well insulated; when you close the door, you can't hear the river. Prices are very reasonable and easy to reach. The family is extremely caring 🤍❤️",
            author: "Rakan Alruwaili",
            location: "Saudi Arabia",
            rating: 5
        }
    ],
    fr: [
        {
            id: 1,
            text: "La vue au bord de la rivière était magnifique. C'était merveilleux de passer du temps là-bas.",
            author: "Mohammed",
            location: "Oman",
            rating: 5
        },
        {
            id: 3,
            text: "L'emplacement est génial. On s'endort au son des cascades et de la rivière. Privé et calme, une expérience magnifique ✨️",
            author: "Khalila",
            location: "Saudi Arabia",
            rating: 5
        },
        {
            id: 4,
            text: "La propreté et le design de l'hôtel étaient excellents. Tous les équipements nécessaires (Internet, Netflix, chauffage) étaient disponibles.",
            author: "Abdulaziz",
            location: "Arabie Saoudite",
            rating: 5
        },
        {
            id: 5,
            text: "Emplacement romantique et magnifique au bord de la rivière. Les propriétaires sont très accueillants et serviables. Très propre.",
            author: "Yahya",
            location: "Arabie Saoudite",
            rating: 5
        },
        {
            id: 2,
            text: "C'est un endroit magnifique, calme et bien organisé pour quatre personnes. Le petit-déjeuner en plein air avec la vue sur la rivière était parfait.",
            author: "Al-Thani",
            location: "Arabie Saoudite",
            rating: 5
        },
        {
            id: 6,
            text: "La vue sur la rivière est très belle. Le chalet est très propre, confortable et le propriétaire est très gentil. Situé à environ 6 km d'Ayder.",
            author: "Memduh",
            location: "Arabie Saoudite",
            rating: 5
        },
        {
            id: 11,
            text: "Un endroit à visiter absolument. J'ai beaucoup aimé, je le recommande à tout le monde.",
            author: "Deniz",
            location: "Turquie",
            rating: 5
        },
        {
            id: 12,
            text: "La vue est magnifique. Le personnel est très serviable.",
            author: "Zehra",
            location: "Émirats Arabes Unis",
            rating: 5
        },
        {
            id: 13,
            text: "C'était l'une de mes meilleures expériences. Le chalet est situé juste en face de la rivière. Je voudrais remercier Emre pour son hospitalité pendant mon séjour. Note : La capacité d'hébergement était de 7 personnes.",
            author: "Nasir Moharraq",
            location: "Arabie Saoudite",
            rating: 5
        },
        {
            id: 14,
            text: "Incroyable, difficile à décrire. Quand vous prenez les deux chalets ensemble, vous avez une intimité totale. Emre et son père sont des personnes extrêmement respectueuses. La seule erreur était de ne rester que 4 jours ; j'aurais dû rester 40 jours.",
            author: "Sari Alsary",
            location: "Arabie Saoudite",
            rating: 5
        },
        {
            id: 15,
            text: "Une très belle expérience rurale. Je le recommande à ceux qui veulent une vraie vie rurale ; il a une vue directe sur la rivière. Il y a un pont en bois entre le chalet et l'autre côté de la rivière. Les hôtes aident à transporter les bagages. Les hôtes sont vraiment géniaux.",
            author: "Yasir Abalkhayl",
            location: "Arabie Saoudite",
            rating: 5
        },
        {
            id: 16,
            text: "Le chalet est beau et neuf, tous les services dont vous avez besoin sont disponibles avec vue sur la rivière. Le meilleur, c'est qu'il est très bien isolé ; quand vous fermez la porte, vous n'entendez pas la rivière. Les prix sont très raisonnables et facile d'accès. La famille est extrêmement attentionnée 🤍❤️",
            author: "Rakan Alruwaili",
            location: "Arabie Saoudite",
            rating: 5
        }
    ],
    ar: [
        {
            id: 1,
            text: "كان المنظر بجانب النهر رائعاً. لقد كانت تجربة مذهلة قضينا فيها وقتاً جميلاً جداً.",
            author: "محمد",
            location: "عمان",
            rating: 5
        },
        {
            id: 2,
            text: "مكان جميل جداً وهادئ ومنظم لقضاء الوقت مع العائلة. طلبت الإفطار وكان رائعاً خاصة مع الأجواء الجميلة بجانب النهر.",
            author: "آل ثاني",
            location: "المملكة العربية السعودية",
            rating: 5
        },
        {
            id: 3,
            text: "الموقع خيالي. تنام على أصوات الشلالات والأنهار. تجربة فريدة وهادئة وخصوصية تامة ✨️",
            author: "خليلة",
            location: "فلسطين",
            rating: 5
        },
        {
            id: 4,
            text: "نظافة الفندق وتصميمه كانا ممتازين جداً. تم توفير جميع الاحتياجات مثل الشاشة والإنترنت وحساب نتفليكس والتدفئة ومجفف الشعر.",
            author: "عبد العزيز",
            location: "المملكة العربية السعودية",
            rating: 5
        },
        {
            id: 5,
            text: "موقع رومانسي ورائع على ضفاف النهر. أصحاب المكان ودودون ومتعاونون للغاية، والمكان نظيف جداً وأنيق.",
            author: "يحيى",
            location: "المملكة العربية السعودية",
            rating: 5
        },
        {
            id: 6,
            text: "إطلالة النهر جميلة جداً. الكوخ نظيف جداً والأثاث مريح وصاحب المكان شخص لطيف للغاية. مكان رائع يبعد حوالي 6 كم عن آيدر.",
            author: "ممدوح",
            location: "المملكة العربية السعودية",
            rating: 5
        },
        {
            id: 12,
            text: "المناظر طبيعية وخلابة. طاقم العمل متعاون جداً والخدمة سريعة.",
            author: "زهراء",
            location: "الإمارات العربية المتحدة",
            rating: 5
        },
        {
            id: 13,
            text: "كانت من أفضل تجاربي. الكوخ يقع مباشرة أمام النهر. أود أن أشكر إمري على كرم ضيافته خلال إقامتي. ملاحظة: سعة الإقامة كانت 7 أشخاص.",
            author: "ناصر محرق",
            location: "المملكة العربية السعودية",
            rating: 5
        },
        {
            id: 14,
            text: "رائع، يصعب وصفه. عندما تأخذ الكوخين معاً تحصل على خصوصية تامة. إمري ووالده أشخاص محترمون للغاية. الخطأ الوحيد كان البقاء 4 أيام فقط؛ كان يجب أن أبقى 40 يوماً.",
            author: "ساري السري",
            location: "المملكة العربية السعودية",
            rating: 5
        },
        {
            id: 15,
            text: "تجربة ريفية جميلة جداً. أنصح بها لمن يريد حياة ريفية حقيقية؛ لها إطلالة مباشرة على النهر. يوجد جسر خشبي بين الكوخ والجانب الآخر من النهر. المضيفون يساعدون في حمل الأمتعة. المضيفون رائعون حقاً.",
            author: "ياسر أبالخيل",
            location: "المملكة العربية السعودية",
            rating: 5
        },
        {
            id: 16,
            text: "الكوخ جميل وجديد، جميع الخدمات التي تحتاجها متوفرة مع إطلالة على النهر. أفضل شيء أنه معزول جيداً؛ عندما تغلق الباب لا تسمع صوت النهر. الأسعار معقولة جداً وسهل الوصول. العائلة حنونة للغاية 🤍❤️",
            author: "راكان الرويلي",
            location: "المملكة العربية السعودية",
            rating: 5
        }
    ]
};

export default testimonials;

