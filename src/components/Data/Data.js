const data = {
    booksList: [
        {
            id: "1",
            name: "প্রোগ্রামিং কনটেস্ট ডেটা স্ট্রাকচার ও অ্যালগরিদম",
            authorName: "মো: মাহবুবুল হাসান",
            category: "কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং",
            prePrice: 480,
            currPrice: 413,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/5c551ac8c_117663.jpg",
            quantity: 1,
            publisher: "দ্বিমিক প্রকাশনী",
            edition: "২০১৬"
        },
        {
            id: "2",
            name: "নগরে নরক",
            authorName: "আরিফ খন্দকার",
            category: "উপন্যাস",
            prePrice: 525,
            currPrice: 452,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Nogore_Norok-Arif_Khondokar-36860-224837.jpg",
            quantity: 1,
            publisher: "শিখা প্রকাশনী",
            edition: "২০২২"
        },
        {
            id: "3",
            name: "আমি পরামানব",
            authorName: "মুহম্মদ জাফর ইকবাল",
            category: "সায়েন্স ফিকশন",
            prePrice: 240,
            currPrice: 206,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Ami_Poramanob-Muhammod_Zafar_Iqbal-0ac3e-222641.jpg",
            quantity: 1,
            publisher: "সময় প্রকাশন",
            edition: "২০২২"
        },
        {
            id: "4",
            name: "অসমাপ্ত আত্মজীবনী",
            authorName: "বঙ্গবন্ধু শেখ মুজিবুর রহমান",
            category: "রাজনীতি",
            prePrice: 525,
            currPrice: 459,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/imgrok_47549.GIF",
            quantity: 1,
            publisher: "দি ইউনিভার্সিটি প্রেস লিমিটেড(ইউ পি এল)",
            edition: "২০২২"
        },
        {
            id: "5",
            name: "পন্ডিতমশাই",
            authorName: "শরৎচন্দ্র চট্টোপাধ্যায়",
            category: "উপন্যাস",
            prePrice: 130,
            currPrice: 100,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Ponditmoshai-Saratchandra_Chattopadhyay-98d64-176051.jpg",
            quantity: 1,
            publisher: "মুঠোবই",
            edition: "২০১৬"
        },
        {
            id: "6",
            name: "হাবলুদের জন্য প্রোগ্রামিং",
            authorName: "ঝংকার মাহবুব",
            category: "কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং",
            prePrice: 267,
            currPrice: 230,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/00ea58560_112222.jpg",
            quantity: 1,
            publisher: "আদর্শ",
            edition: "২০১৬"
        },
        {
            id: "7",
            name: "নফসের বিরুদ্ধে লড়াই",
            authorName: "মাহমুদ বিন নূর",
            category: "ইসলামি বই",
            prePrice: 220,
            currPrice: 165,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Nofser_Biruddhe_Lorai-Mahmud_Bin_Noor-885a9-217630.jpg",
            quantity: 1,
            publisher: "রাইয়ান প্রকাশন",
            edition: "২০২১"
        },
        {
            id: "8",
            name: "ডিপ্লোমা ফার্মাকোলজি",
            authorName: "ডা. মো: আব্দুল মান্নান",
            category: "মেডিকেল",
            prePrice: 350,
            currPrice: 228,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/e493a717d_191810.jpg",
            quantity: 1,
            publisher: "পেঙ্গুইন লাইব্রেরী",
            edition: "২০২১"
        },
        {
            id: "9",
            name: "নবিজি: যার আদর্শে বিমোহিত পৃথিবী",
            authorName: "ড. রাগিব সারজানি",
            category: "ইসলামি বই",
            prePrice: 720,
            currPrice: 450,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/ea5e93f10_205545.jpg",
            quantity: 1,
            publisher: "মুহাম্মদ পাবলিকেশন",
            edition: "২০২০"
        },
        {
            id: "10",
            name: "দেয়াল",
            authorName: "হুমায়ূন আহমেদ",
            category: "উপন্যাস",
            prePrice: 450,
            currPrice: 387,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/1b3707c61_62834.jpg",
            quantity: 1,
            publisher: "অন্যপ্রকাশ",
            edition: "২০১৪"
        }, 
        {
            id: "11",
            name: "পাইথন দিয়ে প্রোগ্রামিং শেখা",
            authorName: "তামিম শাহরিয়ার সুবিন",
            category: "কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং",
            prePrice: 250,
            currPrice: 215,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/dfb303496d64_143309.jpg",
            quantity: 1,
            publisher: "দ্বিমিক প্রকাশনী",
            edition: "২০১৭"
        }, 
        {
            id: "12",
            name: "আমার ডেঞ্জারাস মামী",
            authorName: "মুহম্মদ জাফর ইকবাল",
            category: "শিশু-কিশোর বই",
            prePrice: 300,
            currPrice: 258,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Amar_Dangerous_Mami-Muhammod_Zafar_Iqbal-e7397-219508.jpg",
            quantity: 1,
            publisher: "জ্ঞানকোষ প্রকাশনী",
            edition: "২০২১"
        }, 
        {
            id: "13",
            name: "হিমু",
            authorName: "হুমায়ূন আহমেদ",
            category: "উপন্যাস",
            prePrice: 180,
            currPrice: 159,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/0e743778fca4_1277.gif",
            quantity: 1,
            publisher: "প্রতীক প্রকাশনা সংস্থা",
            edition: "২০১২"
        },
        {
            id: "14",
            name: "হাতে কলমে জাভাস্ক্রিপ্ট",
            authorName: "জুনায়েদ আহমেদ",
            category: "কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং",
            prePrice: 425,
            currPrice: 374,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/e53af8191_202772.jpg",
            quantity: 1,
            publisher: "অদম্য প্রকাশ",
            edition: "২০২২"
        },
        {
            id: "15",
            name: "যন্ত্রকৌশলের যন্ত্রণা",
            authorName: "এমরান হোসেন",
            category: "ইঞ্জিনিয়ারিং",
            prePrice: 467,
            currPrice: 434,
            imageURL: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/c54edc325_199974.jpg",
            quantity: 1,
            publisher: "রাফিয়া বুক সেন্টার",
            edition: "২০২০"
        }
    ]
}

export default data;