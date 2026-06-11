import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'eth-001',
    title: 'Royal Jaipuri Embroidered Anarkali Set',
    sku: 'TEE-FASH-001',
    category: 'Fashion',
    subcategory: 'Ethnic Collection',
    brand: 'The Ethnic Edit Couture',
    price: 189,
    originalPrice: 249,
    discount: 24,
    rating: 4.8,
    reviewCount: 42,
    images: [
      'https://files.catbox.moe/m9a2n4.avif',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'This masterfully crafted Royal Jaipuri Anarkali is styled in premium mulberry silk, adorned with complex hand-gilded Zardozi embroidery, a micro-pleated layout, and tailored fits designed to turn heads at festivals or elite gatherings. Features a luxurious organza dupatta.',
    specifications: {
      'Fabric': 'Mulberry Silk & Fine Organza',
      'Embroidery': 'Handcrafted Zardozi and Gota Patti',
      'Sleeve Type': 'Full churidar sleeves',
      'Dry Clean Only': 'Yes',
      'Includes': '1 Anarkali Kurta, 1 Churidar Pants, 1 Dupatta'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Royal Crimson', hex: '#BE123C' },
      { name: 'Teal Peacock', hex: '#0F766E' },
      { name: 'Amber Gold', hex: '#D97706' }
    ],
    stock: 12,
    isBestSeller: true,
    isFlashSale: true,
    reviews: [
      { id: 'rev-001', userName: 'Ananya S.', rating: 5, date: '2026-05-18', comment: 'Absolutely mesmerizing fit! The gold embroidery lights up beautifully in photographs.', verified: true },
      { id: 'rev-002', userName: 'Meera K.', rating: 4, date: '2026-05-24', comment: 'Material feels very premium. Highly recommend selecting one size up', verified: true }
    ]
  },
  {
    id: 'eth-002',
    title: 'Imperial Banarasi Silk Sherwani',
    sku: 'TEE-FASH-002',
    category: 'Fashion',
    subcategory: 'Men\'s Wear',
    brand: 'The Ethnic Edit Couture',
    price: 299,
    originalPrice: 450,
    discount: 33,
    rating: 4.9,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Crafted from authentic handwoven Banarasi silk brocade, this Sherwani features a tailored high bandhgala collar, luxurious jewel-style brass buttons, and a classic posture-enhancing shoulder cut.',
    specifications: {
      'Fabric': '100% Handwoven Banarasi Brocade Silk',
      'Style': 'Imperial Bandhgala Sherwani',
      'Weave Pattern': 'Jaal-daari gold zari work',
      'Includes': 'Sherwani Jacket, Churidar bottoms, Pocket square'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Ivory Gold', hex: '#FEF08A' },
      { name: 'Midnight Emerald', hex: '#064E3B' }
    ],
    stock: 5,
    isBestSeller: true,
    reviews: [
      { id: 'rev-003', userName: 'Rahul V.', rating: 5, date: '2026-04-12', comment: 'Wore it for my wedding reception. The fabric has an incredibly expensive shine.', verified: true }
    ]
  },
  {
    id: 'elec-001',
    title: 'AuraSound Active ANC Noise Canceling Pro',
    sku: 'TEE-ELEC-001',
    category: 'Electronics',
    subcategory: 'Accessories',
    brand: 'AuraSound',
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.7,
    reviewCount: 154,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Experience audiophile-quality sound with adaptive hybrid active noise cancellation, custom 40mm bio-cellulose dynamic drivers, and a comfortable memory-foam structure designed for marathon listening sessions.',
    specifications: {
      'Battery Life': 'Up to 45 Hours with ANC active',
      'Driver Size': '40mm High-Resolution Dynamic',
      'Bluetooth Range': 'Bluetooth 5.3 (up to 50ft)',
      'Water Resistance': 'IPX5 Sweat & Dustproof'
    },
    colors: [
      { name: 'Obsidian Black', hex: '#000000' },
      { name: 'Champagne Sand', hex: '#D6D3D1' }
    ],
    stock: 25,
    isBestSeller: true,
    isNewArrival: true,
    reviews: [
      { id: 'rev-004', userName: 'Devon M.', rating: 5, date: '2026-05-02', comment: 'ANC blocks the office chatter completely. Rich bass!', verified: true }
    ]
  },
  {
    id: 'elec-002',
    title: 'EthnoVibe Smart Watch Elite',
    sku: 'TEE-ELEC-002',
    category: 'Electronics',
    subcategory: 'Smart Devices',
    brand: 'The Ethnic Edit Technics',
    price: 189,
    originalPrice: 249,
    discount: 24,
    rating: 4.6,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'A stylish merging of state-of-the-art bio-tracking mechanisms with a durable titanium fluid casing. Tracks heart metrics, blood oxygen levels, and dynamic sleep insights while displaying ethnic custom-designed dial complications.',
    specifications: {
      'Display': '1.43" Vivid AMOLED Always-on',
      'Battery Life': '12 Days on standard charge',
      'Health Tracking': 'Heart Rate, SpO2, HRV, Stress Analyzer',
      'Casing': 'Grade 4 Aircraft Titanium, Sapphire Crystal'
    },
    colors: [
      { name: 'Titanium Slate', hex: '#4B5563' },
      { name: 'Rose Gold', hex: '#E11D48' }
    ],
    stock: 18,
    isNewArrival: true,
    reviews: [
      { id: 'rev-005', userName: 'Arjun S.', rating: 4, date: '2026-06-01', comment: 'Battery easily lasts me a week and a half. AMOLED looks gorgeous!', verified: true }
    ]
  },
  {
    id: 'life-001',
    title: 'Golden Aura Handcarved Brass Urli',
    sku: 'TEE-LIFE-001',
    category: 'Lifestyle',
    subcategory: 'Home Decor',
    brand: 'The Ethnic Edit Home',
    price: 79,
    originalPrice: 120,
    discount: 34,
    rating: 4.8,
    reviewCount: 37,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'This ornamental, hand-polished heavy brass urli features subtle filigree details, standard floating candle notches, and a pristine mirror-like antiqued finish designed to anchor focal center tables.',
    specifications: {
      'Material': '100% Solid Heavy-Cast Brass',
      'Diameter': '12 Inches',
      'Crafting Technique': 'Moradabadi sand casting',
      'Weight': '2.4 kg'
    },
    stock: 4,
    isBestSeller: true,
    isFlashSale: true,
    reviews: [
      { id: 'rev-006', userName: 'Kavitha R.', rating: 5, date: '2026-05-30', comment: 'Absolutely brilliant weight and finish. Perfectly completes the foyer table.', verified: true }
    ]
  },
  {
    id: 'fash-003',
    title: 'Mulberry Indigo Cotton Linen Kurta',
    sku: 'TEE-FASH-003',
    category: 'Fashion',
    subcategory: 'Ethnic Collection',
    brand: 'The Ethnic Edit Essentials',
    price: 49,
    originalPrice: 79,
    discount: 38,
    rating: 4.5,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1627483262112-039e9a0a0f16?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'An breathable everyday styling classic. Pure Indigo-dyed, lightweight premium organic cotton-linen blend tailored with a clean Mandarin collar and a simple comfort straight fit.',
    specifications: {
      'Fabric': '70% Cotton, 30% Belgian Linen',
      'Dye Type': 'Natural eco-friendly Indigo dye',
      'Fit': 'Regular Straight-Cut',
      'Side Pockets': 'Dual side integrated seams'
    },
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Indigo Crush', hex: '#1E3A8A' },
      { name: 'Charcoal Linen', hex: '#374151' }
    ],
    stock: 45,
    reviews: [
      { id: 'rev-007', userName: 'Siddharth M.', rating: 5, date: '2026-05-15', comment: 'Extremely airy and comfortable for summer days. Natural indigo looks stellar.', verified: true }
    ]
  },
  {
    id: 'acc-001',
    title: 'Elite Heritage Chronograph Watch',
    sku: 'TEE-ACC-001',
    category: 'Accessories',
    subcategory: 'Watches',
    brand: 'Heritage Chronos',
    price: 245,
    originalPrice: 320,
    discount: 23,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'A masterpiece timepiece that honors vintage detailing. Features precision automatic Seiko movement, pristine domed sapphire crystal face, and a hand-burnished luxury Italian leather strap.',
    specifications: {
      'Movement': 'Precise Self-Winding Japanese Automatic',
      'Crystal': 'Scratch-Proof Curved Sapphire',
      'Strap Material': 'Cognac Tuscan Genuine Grain Leather',
      'Water Resistance': '50 Meters (5 ATM)'
    },
    colors: [
      { name: 'Cognac Gold', hex: '#B45309' },
      { name: 'Silver Slate', hex: '#6B7280' }
    ],
    stock: 6,
    isBestSeller: true,
    reviews: [
      { id: 'rev-008', userName: 'Vikram A.', rating: 5, date: '2026-04-20', comment: 'The sweep hand is incredibly fluid. A brilliant horological collectors piece.', verified: true }
    ]
  },
  {
    id: 'acc-002',
    title: 'Gilded Kundan Peacock Choker Set',
    sku: 'TEE-ACC-002',
    category: 'Accessories',
    subcategory: 'Jewelry',
    brand: 'The Ethnic Edit Heritage',
    price: 135,
    originalPrice: 199,
    discount: 32,
    rating: 4.8,
    reviewCount: 33,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'A timeless visual heirloom. Elaborate gold-washed Kundan setting featuring dynamic hand-applied Meenakari enamel peacock motifs, paired with adjustable matching statement drop earrings.',
    specifications: {
      'Metal Finish': '22k Gold-Electroplated Brass',
      'Gemstones': 'Premium Kundan Glass & Natural Quartz beads',
      'Technique': 'Authentic Rajasthani Jadau and Meenakari',
      'Earring Closure': 'Push back secure post'
    },
    stock: 8,
    isBestSeller: false,
    isFlashSale: true,
    reviews: [
      { id: 'rev-009', userName: 'Smita D.', rating: 5, date: '2026-05-09', comment: 'Unbelievably precise micro details on the back too! Very authentic.', verified: true }
    ]
  },
  {
    id: 'elec-003',
    title: 'ProBook Multi-Core Slate Ultra',
    sku: 'TEE-ELEC-003',
    category: 'Electronics',
    subcategory: 'Laptops',
    brand: 'CoreTech',
    price: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.7,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'A powerful performance notebook designed for modern creatives. Fast processing speeds, a premium anti-glare screen with vivid color representations, and full day smart battery capacities.',
    specifications: {
      'CPU': 'Intel Core i7 14th-Gen (10 Cores)',
      'RAM': '16GB DDR5 High-Speed Dual Channel',
      'SSD Storage': '1TB NVMe PCIe 4.0 SSD',
      'Screen Size': '14.2 Inch Fluid IPS, QHD+'
    },
    stock: 9,
    isNewArrival: true,
    reviews: [
      { id: 'rev-010', userName: 'Nikhil R.', rating: 5, date: '2026-06-03', comment: 'Runs Photoshop and heavy compilers without heating up. Sleek metal chassis!', verified: true }
    ]
  },
  {
    id: 'fash-004',
    title: 'Floral Silk Fusion Kurti',
    sku: 'TEE-FASH-004',
    category: 'Fashion',
    subcategory: 'Women\'s Wear',
    brand: 'The Ethnic Edit Couture',
    price: 59,
    originalPrice: 89,
    discount: 33,
    rating: 4.7,
    reviewCount: 48,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'A playful contemporizing of festive aesthetics. Pure georgette silk-blend tunic featuring beautiful painterly spring floral washes, subtle sequined borders, and bell sleeves.',
    specifications: {
      'Fabric': 'Georgette Silk blend with poly lining',
      'Neckline': 'Elegantly scooped neck with tie elements',
      'Styling': 'Vase-line flare panels',
      'Wash Care': 'Gentle cool machine wash'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mint Sage', hex: '#A7F3D0' },
      { name: 'Peach Sorbet', hex: '#FFEDD5' }
    ],
    stock: 22,
    isNewArrival: true,
    reviews: [
      { id: 'rev-011', userName: 'Leila T.', rating: 4, date: '2026-05-11', comment: 'Flows very gracefully. Received tons of remarks when worn at the office.', verified: true }
    ]
  },
  {
    id: 'life-002',
    title: 'Handmade Jaipur Ceramics Premium Tea Set',
    sku: 'TEE-LIFE-002',
    category: 'Lifestyle',
    subcategory: 'Kitchen',
    brand: 'The Ethnic Edit Home',
    price: 65,
    originalPrice: 95,
    discount: 31,
    rating: 4.6,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Host your guests in traditional luxury. Complete earthenware visual ceramics set, double fired with food-safe lead-free glazes, and detailed with hand-painted sapphire blue traditional arabesque motifs.',
    specifications: {
      'Includes': '1 Royal Teapot (800ml), 6 Cups, 6 Saucers',
      'Material': 'Double-Fired High Glaze Ceramic',
      'Pattern': 'Hand-painted Mughal floral motif',
      'Microwave Safe': 'Yes'
    },
    stock: 14,
    reviews: [
      { id: 'rev-012', userName: 'Sukhdeep B.', rating: 5, date: '2026-05-22', comment: 'Heavy, durable, but incredibly beautiful. Makes evening chai a ceremony!', verified: true }
    ]
  },
  {
    id: 'fash-005',
    title: 'Vedas Embroidered Leather Juttis',
    sku: 'TEE-FASH-005',
    category: 'Fashion',
    subcategory: 'Footwear',
    brand: 'The Ethnic Edit Couture',
    price: 45,
    originalPrice: 65,
    discount: 30,
    rating: 4.4,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Perfect fusion footwear. Genuine handcrafted leather base with dynamic gold and silver zardozi embroidered details, standard cushion inserts for comfort, and structured anti-skid outsoles.',
    specifications: {
      'Sole Material': 'Genuine Cushioned Split Leather',
      'Crafted In': 'Amritsar workshop',
      'Upper Material': 'Raw silk base with micro silver embroidery'
    },
    sizes: ['6', '7', '8', '9', '10'],
    colors: [
      { name: 'Sunlit Gold', hex: '#FBBF24' },
      { name: 'Onyx Black', hex: '#111827' }
    ],
    stock: 10,
    isNewArrival: true,
    reviews: [
      { id: 'rev-013', userName: 'Nandini K.', rating: 4, date: '2026-06-08', comment: 'A bit stiff on day one, but fits comfortably like a mold after 2-3 wears!', verified: true }
    ]
  },
  {
    id: 'acc-003',
    title: 'Artisanal Veg-Tanned Leather Tote Bag',
    sku: 'TEE-ACC-003',
    category: 'Accessories',
    subcategory: 'Bags',
    brand: 'The Ethnic Edit Leathercraft',
    price: 119,
    originalPrice: 159,
    discount: 25,
    rating: 4.8,
    reviewCount: 26,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Made to acquire a luxurious deep vintage patina over years. Hand-conditioned vegetable-tanned thick full grain leather featuring solid copper hardware, strong YKK secure zippers, and padded laptop compartments.',
    specifications: {
      'Laptop Slot': 'Up to 15.6 inch padded support',
      'Hardware': '100% Solid sand-cast jeweler brass',
      'Pockets': '3 internal, 1 secure external front pocket',
      'Leather Type': 'Vegetable-tanned full-grain cowhide'
    },
    colors: [
      { name: 'Saddle Tan', hex: '#78350F' },
      { name: 'Nero Black', hex: '#111827' }
    ],
    stock: 7,
    isBestSeller: true,
    reviews: [
      { id: 'rev-014', userName: 'Jasmine F.', rating: 5, date: '2026-05-25', comment: 'Unbelievable organic leather scent! Sturdy construction and fits my macbook with ease.', verified: true }
    ]
  },
  {
    id: 'beauty-001',
    title: 'Kumkumadi Radiance Elixir Serum',
    sku: 'TEE-BEAU-001',
    category: 'Beauty',
    subcategory: 'Wellness',
    brand: 'The Ethnic Edit Wellness',
    price: 39,
    originalPrice: 49,
    discount: 20,
    rating: 4.7,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Unify your skincare routine. Formulated with authentic Kashmiri Saffron, organic Sandalwood oil, and 26 carefully extracted Ayurvedic roots to reduce pigmentation and generate illuminated glow lines.',
    specifications: {
      'Ingredients': 'Kashmiri Saffron (Kumkum), Goat Milk, Sandalwood extractions',
      'Skin Types': 'Suitable for dry, normal, and combination skin',
      'Scent': 'Exquisite natural herbal saffron base',
      'Paraben-Free': 'Yes'
    },
    stock: 40,
    isBestSeller: true,
    reviews: [
      { id: 'rev-015', userName: 'Aarti Y.', rating: 5, date: '2026-05-14', comment: 'Visible reduction in dark spots within two weeks. Absolutely liquid gold.', verified: true }
    ]
  }
];
