/**
 * Dhanshiri Garden — Comprehensive Bangladeshi Horticultural Plant Catalog
 *
 * Specially curated for Bangladesh subtropical climate, rooftop load limits,
 * residential decor, and commercial landscapes. Verified by Agronomist Mr. Amir Ali.
 *
 * Sizing standard:
 *  - 8" Bag: 8-inch nursery polybag (starter / compact shrubs / indoor foliage)
 *  - 10" Bag: 10-inch nursery polybag (established flowering / medium foliage)
 *  - 12" Tub: 12-inch ceramic/plastic tub (mature flowering & dwarf fruit)
 *  - 1/2 Bag: Half drum / 50L heavy grow-bag (mature fruiting trees / large specimen palms)
 */

export const STORE_CATEGORIES = [
  { id: 'all', bn: 'সকল গাছ ও চারা', en: 'All Plants' },
  { id: 'indoor', bn: 'ইনডোর ও এয়ার-পিউরিফাইং', en: 'Indoor Air-Purifying' },
  { id: 'outdoor', bn: 'আউটডোর ও ল্যান্ডস্কেপ', en: 'Outdoor Landscape' },
  { id: 'floral', bn: 'দেশি ও সুগন্ধি ফুল', en: 'Floral & Fragrant' },
  { id: 'seasonal', bn: 'শীত ও মৌসুমি ফুল', en: 'Seasonal Annuals' },
  { id: 'fruits', bn: 'ছাদবাগানের ফলদ বৃক্ষ', en: 'Rooftop Fruits' },
  { id: 'rooftop', bn: 'রোদ-সহনশীল ছাদগাছ', en: 'Rooftop & Heat-Tolerant' },
  { id: 'medicinal', bn: 'ভেষজ ও আয়ুর্বেদ', en: 'Medicinal & Ayurveda' },
  { id: 'herbs', bn: 'কিচেন গার্ডেন ও হার্বস', en: 'Herbs & Kitchen' },
  { id: 'turf', bn: 'লন ঘাস ও ক্রিপার লতা', en: 'Turf & Creepers' },
]

export const BAG_SIZES = [
  { id: '8-bag', labelBn: '৮" পলিব্যাগ (8" Bag)', labelEn: '8" Bag', mult: 1.0 },
  { id: '10-bag', labelBn: '১০" পলিব্যাগ (10" Bag)', labelEn: '10" Bag', mult: 1.6 },
  { id: '12-tub', labelBn: '১২" টব (12" Tub)', labelEn: '12" Tub', mult: 2.4 },
  { id: 'half-bag', labelBn: '১/২ ব্যাগ / হাফ ড্রাম (1/2 Bag)', labelEn: '1/2 Bag / Drum', mult: 4.5 },
]

export const STORE_PRODUCTS = [
  // 1. INDOOR: Snake Plant
  {
    id: 'snake-plant',
    name: { bn: 'স্নেক প্ল্যান্ট (স্যানসেভেরিয়া)', en: 'Snake Plant (Sansevieria Trifasciata)' },
    scientificName: 'Dracaena trifasciata',
    category: 'indoor',
    basePrice: 280,
    photo: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'low',
    watering: 'weekly',
    maintenance: 'easy',
    badges: { bn: ['নাসা সার্টিফাইড', 'কম যত্ন'], en: ['NASA Certified', 'Low Care'] },
    desc: {
      bn: 'ঘরের বিষাক্ত বেনজিন ও ট্রাইক্লোরোইথিলিন শোষণ করে রাতেও অক্সিজেন নির্গমন করে। ড্রয়িং ও বেডরুমের জন্য সেরা।',
      en: 'Top NASA-rated indoor purifier releasing oxygen at night. Thrives in low light and irregular watering.',
    },
    tip: {
      bn: 'শীতকালে ১৫ দিনে একবার পানি দিলেই যথেষ্ট। টবের গোড়ায় পানি জমতে দেবেন না।',
      en: 'Water only every 10–14 days in winter. Ensure dry well-drained potting media.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 280 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 450 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 750 },
    ],
  },

  // 2. INDOOR: Monstera Deliciosa
  {
    id: 'monstera-deliciosa',
    name: { bn: 'মনস্টেরা ডেলিসিওসা (সুইস চিজ)', en: 'Monstera Deliciosa (Swiss Cheese Plant)' },
    scientificName: 'Monstera deliciosa',
    category: 'indoor',
    basePrice: 480,
    photo: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'indirect',
    watering: 'twoDays',
    maintenance: 'moderate',
    badges: { bn: ['প্রিমিয়াম ইনডোর', 'আকর্ষণীয় পাতা'], en: ['Premium Living Decor', 'Split Leaves'] },
    desc: {
      bn: 'আধুনিক ফ্ল্যাটের লিভিং রুমের রাজকীয় আকর্ষণ। এর দৃষ্টিনন্দন কাট-আউট পাতা ঘরে ট্রপিক্যাল আবেশ আনে।',
      en: 'Iconic architectural houseplant with perforated glossy green fenestrations. Perfect for stylish living spaces.',
    },
    tip: {
      bn: 'সরাসরি কড়া রোদে পাতা পুড়ে যেতে পারে। ব্যালকনির উজ্জ্বল ছায়াযুক্ত স্থানে সবচেয়ে ভালো বাড়ে।',
      en: 'Keep away from intense midday sun. Mist aerial roots occasionally in dry winter air.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 480 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 780 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 1250 },
    ],
  },

  // 3. INDOOR: Areca Palm
  {
    id: 'areca-palm',
    name: { bn: 'এরিকা পাম (গোল্ডেন কেন পাম)', en: 'Areca Palm (Chrysalidocarpus Lutescens)' },
    scientificName: 'Dypsis lutescens',
    category: 'indoor',
    basePrice: 350,
    photo: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'indirect',
    watering: 'twoDays',
    maintenance: 'easy',
    badges: { bn: ['ন্যাচারাল হিউমিডিফায়ার', 'গ্রিন কর্নার'], en: ['Natural Humidifier', 'Lush Foliage'] },
    desc: {
      bn: 'কর্পোরেট অফিস ও ঘরের কর্নারে রাখার জন্য সবচেয়ে জনপ্রিয় পাম। বাতাস আর্দ্র ও সতেজ রাখে।',
      en: 'Graceful feathery fronds that naturally add moisture to air-conditioned rooms and offices.',
    },
    tip: {
      bn: 'পাতা হলুদ হলে বুঝবেন অতিরিক্ত পানি হয়েছে অথবা টবের নিচে ড্রেনেজ বন্ধ।',
      en: 'Yellow tips indicate overwatering or tap fluoride build-up. Flush soil periodically.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 350 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 580 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 950 },
      { id: 'half-bag', name: '1/2 Bag', label: '১/২ ব্যাগ', price: 1800 },
    ],
  },

  // 4. FRUITS: BARI Malta-1
  {
    id: 'bari-malta-1',
    name: { bn: 'বারি মিষ্টি মাল্টা-১ (কলম চারা)', en: 'BARI Malta-1 Sweet Citrus (Grafted)' },
    scientificName: 'Citrus sinensis',
    category: 'fruits',
    basePrice: 380,
    photo: 'https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'daily',
    maintenance: 'moderate',
    badges: { bn: ['বারি জাত', '১ম বছরেই ফলন'], en: ['BARI Certified', 'Year 1 Fruiting'] },
    desc: {
      bn: 'ছাদবাগানের ড্রামের জন্য বাংলাদেশের সবচেয়ে সফল মিষ্টি সাইট্রাস জাত। তলায় পয়সার মতো স্পষ্ট গোল দাগ থাকে।',
      en: 'The golden standard of rooftop fruit orchards in Bangladesh. High sweetness index and heavy yield in half-drums.',
    },
    tip: {
      bn: 'ফুল আসার সময় পানি কমিয়ে দিন এবং ফুল ঝরা রোধে বোরন ও পিজিআর স্প্রে করুন।',
      en: 'Reduce irrigation slightly during flowering. Apply soluble boron and organic compost post-harvest.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ (গ্রাফটেড চারা)', price: 380 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ (ফলসহ বুশি)', price: 650 },
      { id: 'half-bag', name: '1/2 Bag', label: '১/২ ব্যাগ (পরিপূর্ণ ড্রাম সাইজ)', price: 1650 },
    ],
  },

  // 5. FRUITS: Thai-7 Guava
  {
    id: 'thai-guava',
    name: { bn: 'থাই-৭ ও বারি-৪ পেয়ারা (বারোমাসি)', en: 'Thai-7 All-Season Sweet Guava' },
    scientificName: 'Psidium guajava',
    category: 'fruits',
    basePrice: 320,
    photo: 'https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'daily',
    maintenance: 'easy',
    badges: { bn: ['বারোমাসি ফলন', 'বড় সাইজ'], en: ['Year-Round Harvest', 'Jumbo Size'] },
    desc: {
      bn: 'বছরে ৩ বার মিষ্টি, খাস্তা ও বিচি কম পেয়ারা দেয়। ড্রামে বা ২০ ইঞ্চি টবে ছাদবাগানে অনায়াসে হয়।',
      en: 'Produces crisp, low-seed, crunchy sweet guavas 3 times a year. Thrives in full Dhaka sun.',
    },
    tip: {
      bn: 'ফল ছোট থাকতে পলিথিন ও ফোম ব্যাগিং করলে মাছির আক্রমণমুক্ত বড় সাইজের পেয়ারা পাবেন।',
      en: 'Bag fruitlets with perforated protective sleeves to avoid fruit-fly stings.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 320 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 550 },
      { id: 'half-bag', name: '1/2 Bag', label: '১/২ ব্যাগ', price: 1450 },
    ],
  },

  // 6. FRUITS: Katimon All-Time Mango
  {
    id: 'katimon-mango',
    name: { bn: 'কাটিমন অল-টাইম মিষ্টি আম', en: 'Katimon All-Time Sweet Mango' },
    scientificName: 'Mangifera indica',
    category: 'fruits',
    basePrice: 550,
    photo: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'twoDays',
    maintenance: 'moderate',
    badges: { bn: ['বারোমাসি আম', 'অত্যন্ত মিষ্টি'], en: ['3x Mango Harvest', 'Ultra Sweet'] },
    desc: {
      bn: 'একই গাছে মুকুল, গুটি ও পাকা আম একসাথে পাওয়া যায়। ছাদবাগানের ড্রামের জন্য রাজকীয় জাত।',
      en: 'World-renowned continuous fruiting mango variety bearing blossoms, small fruits, and ripe mangoes simultaneously.',
    },
    tip: {
      bn: 'বর্ষাকালে ছত্রাকনাশক স্প্রে করুন। ড্রামের ড্রেনেজ হোল সবসময় পরিষ্কার রাখুন।',
      en: 'Keep drainage gravel unblocked. Apply well-rotted vermicompost twice a year.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ (কলম)', price: 550 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ (মুকুলযুক্ত)', price: 950 },
      { id: 'half-bag', name: '1/2 Bag', label: '১/২ ব্যাগ (পরিপক্ব ফলবতী)', price: 2400 },
    ],
  },

  // 7. FLORAL: Hasnahena
  {
    id: 'hasnahena',
    name: { bn: 'হাসনাহেনা (রাতের রানী সুবাস)', en: 'Hasnahena Night-Blooming Jasmine' },
    scientificName: 'Cestrum nocturnum',
    category: 'floral',
    basePrice: 220,
    photo: 'https://images.pexels.com/photos/1030973/pexels-photo-1030973.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'daily',
    maintenance: 'easy',
    badges: { bn: ['তীব্র সুবাস', 'বাংলার ঐতিহ্য'], en: ['Nocturnal Scent', 'Bengal Heritage'] },
    desc: {
      bn: 'সন্ধ্যার বাতাসে মাদকতাময় সুবাস ছড়ায়। ছাদবাগান ও ব্যালকনির জন্য বাঙালির চিরচেনা ফুল।',
      en: 'Unmatched nocturnal fragrance that perfumes evening breezes across rooftops and balconies.',
    },
    tip: {
      bn: 'ফুল ঝরে যাওয়ার পর অগ্রভাগ ছাঁটাই (prune) করলে নতুন ডালে প্রচুর কুঁড়ি আসবে।',
      en: 'Prune spent branches lightly to encourage dense branching and heavier floral flushes.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 220 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 380 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 650 },
    ],
  },

  // 8. FLORAL: Gandhoraj
  {
    id: 'gandhoraj',
    name: { bn: 'গন্ধরাজ (সাদা রাজকীয় ফুল)', en: 'Gandhoraj Cape Jasmine' },
    scientificName: 'Gardenia jasminoides',
    category: 'floral',
    basePrice: 260,
    photo: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'partial',
    watering: 'daily',
    maintenance: 'moderate',
    badges: { bn: ['রাজকীয় সুবাস', 'দুধসাদা ফুল'], en: ['Royal Aroma', 'Ivory Bloom'] },
    desc: {
      bn: 'গাঢ় সবুজ মোমের মতো পাতার মাঝে খাঁটি দুধসাদা সুবাসিত ফুল ফুটে। আভিজাত্যের প্রতীক।',
      en: 'Wax-white blossoms with an intoxicating sweet scent nestled in deep lustrous foliage.',
    },
    tip: {
      bn: 'মাটি মৃদু অম্লীয় পছন্দ করে। চা-পাতার লিকার বা ভার্মিকম্পোস্ট দিলে প্রচুর ফুল আসে।',
      en: 'Prefers slightly acidic organic soil. Feed with decomposed tea leaves and organic compost.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 260 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 420 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 720 },
    ],
  },

  // 9. OUTDOOR: Bougainvillea
  {
    id: 'bougainvillea-spectabilis',
    name: { bn: 'বাগানবিলাস / কাগজফুল (রয়্যাল পিংক ও মাল্টিকালার)', en: 'Bougainvillea Royal Pink / Bi-Color' },
    scientificName: 'Bougainvillea spectabilis',
    category: 'outdoor',
    basePrice: 280,
    photo: 'https://images.pexels.com/photos/2180803/pexels-photo-2180803.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'twoDays',
    maintenance: 'easy',
    badges: { bn: ['খরা সহনশীল', 'রঙিন বর্ণচ্ছটা'], en: ['Drought Resilient', 'Explosive Bloom'] },
    desc: {
      bn: 'রেলিং, বাউন্ডারি ওয়াল ও পারগোলায় চোখজুড়ানো রঙের ফোয়ারা। কড়া রোদ পেলে ফুলে ঢেকে যায়।',
      en: 'Dazzling cascades of magenta and bi-color bracts that love intense heat and direct tropical sun.',
    },
    tip: {
      bn: 'বেশি পানি দিলে ফুল না এসে শুধু পাতা বাড়ে। মাটি শুকিয়ে এলে তবেই পানি দিন।',
      en: 'Do not overwater. Slight water deficit triggers spectacular flower bud induction.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 280 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 460 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 820 },
      { id: 'half-bag', name: '1/2 Bag', label: '১/২ ব্যাগ', price: 1650 },
    ],
  },

  // 10. OUTDOOR / CREEPER: Curtain Creeper
  {
    id: 'curtain-creeper',
    name: { bn: 'কার্টেন ক্রিপার (পর্দার মতো ঝুলন্ত লতা)', en: 'Curtain Creeper (Vernonia Elaegnifolia)' },
    scientificName: 'Vernonia elaegnifolia',
    category: 'turf',
    basePrice: 240,
    photo: 'https://images.pexels.com/photos/10812796/pexels-photo-10812796.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'daily',
    maintenance: 'easy',
    badges: { bn: ['সবুজ পর্দা', 'তাপমাত্রা নিয়ন্ত্রণ'], en: ['Living Curtain', 'Thermal Shield'] },
    desc: {
      bn: 'ছাদের বা ব্যালকনির কার্নিশ থেকে প্রাকৃতিক সুতোর মতো নিচে নেমে ঘরের তাপমাত্রা ৩-৪° সে. কমায়।',
      en: 'Cascades down from balcony slabs like a natural botanical curtain, providing privacy and cool insulation.',
    },
    tip: {
      bn: 'লতাগুলোকে সমান দূরত্বে ঝুলতে দিন। বর্ষায় ও শীতে হালকা এনপিকে তরল সার প্রয়োগ করুন।',
      en: 'Allow slender stems to drape evenly. Prune bottom edges to desired architectural window height.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 240 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 420 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 780 },
    ],
  },

  // 11. TURF: Korean Velvet Carpet Grass
  {
    id: 'korean-turf',
    name: { bn: 'কোরিয়ান ভেলভেট কার্পেট ঘাস (প্রতি স্কয়ার ফিট)', en: 'Korean Velvet Carpet Turf (Per Sq. Ft.)' },
    scientificName: 'Zoysia japonica',
    category: 'turf',
    basePrice: 65,
    photo: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'daily',
    maintenance: 'moderate',
    badges: { bn: ['১ নম্বর লাক্সারি ঘাস', 'মখমল নরম'], en: ['#1 Luxury Turf', 'Velvet Texture'] },
    desc: {
      bn: 'বাংলাদেশের বিলাসবহুল ভিলা, রিসোর্ট ও এক্সক্লুসিভ ছাদ লনের জন্য সেরা মখমল সবুজ ঘাস।',
      en: 'The premier dense luxury turf for private estates and rooftop lawns in Dhaka and Naogaon.',
    },
    tip: {
      bn: 'লনের তলায় ৪ ইঞ্চি বেলে-দোআঁশ ও বালুর ড্রেনেজ লেয়ার নিশ্চিত করে রোল বসান।',
      en: 'Install over 4 inches of well-graded sandy loam and sand for pristine root aeration.',
    },
    sizes: [
      { id: '8-bag', name: '10 sq ft Pack', label: '১০ বর্গফুট টাইল প্যাক', price: 650 },
      { id: '10-bag', name: '50 sq ft Pack', label: '৫০ বর্গফুট প্রজেক্ট প্যাক', price: 3100 },
      { id: 'half-bag', name: '100 sq ft Pack', label: '১০০ বর্গফুট মাস্টার প্যাক', price: 6000 },
    ],
  },

  // 12. MEDICINAL: Aloe Vera & Tulsi
  {
    id: 'aloe-vera-tulsi',
    name: { bn: 'ঘৃতকুমারী ও কৃষ্ণ তুলসী কম্বো', en: 'Medicinal Aloe Vera & Krishna Tulsi Duo' },
    scientificName: 'Aloe barbadensis & Ocimum tenuiflorum',
    category: 'medicinal',
    basePrice: 190,
    photo: 'https://images.pexels.com/photos/19053055/pexels-photo-19053055.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'twoDays',
    maintenance: 'easy',
    badges: { bn: ['১০০% ভেষজ গুণ', 'রোগ প্রতিরোধ'], en: ['100% Herbal', 'Immunity Booster'] },
    desc: {
      bn: 'ত্বকের যত্ন, সর্দি-কাশি নিরাময় ও বিশুদ্ধ অক্সিজেনের জন্য প্রতিটি পরিবারের অপরিহার্য দুই ঔষধি উদ্ভিদ।',
      en: 'Essential Ayurvedic botanical duo providing soothing skin gel and respiratory immunity teas.',
    },
    tip: {
      bn: 'ঘৃতকুমারীর গোড়ায় পানি জমলে শিকড় পচে যায়। বালুমিশ্রিত দোআঁশ মাটিতে রোপণ করুন।',
      en: 'Ensure high sand content in potting soil. Avoid overwatering the base rosette.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 190 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 320 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 550 },
    ],
  },

  // 13. HERBS: Pudina & Naga Morich
  {
    id: 'pudina-naga-morich',
    name: { bn: 'পুদিনা ও হাইব্রিড নাগা মরিচ', en: 'Aromatic Pudina Mint & Hot Naga Morich' },
    scientificName: 'Mentha spicata & Capsicum chinense',
    category: 'herbs',
    basePrice: 180,
    photo: 'https://images.pexels.com/photos/8678769/pexels-photo-8678769.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'daily',
    maintenance: 'easy',
    badges: { bn: ['কিচেন হার্বস', 'অরগানিক রান্না'], en: ['Kitchen Fresh', 'Organic Kitchen'] },
    desc: {
      bn: 'রান্নার তাজা সুবাস ও তীব্র ঝাঁঝালো স্বাদের জন্য ব্যালকনি বা ছাদের ছোট টবে দ্রুত বাড়ন্ত হার্বস।',
      en: 'Crisp refreshing mint and fiery fragrant Bangladeshi Naga chili grown organically on your windowsill.',
    },
    tip: {
      bn: 'পুদিনার ডাল নিয়মিত কেটে ব্যবহার করলে চারা ঝোপালো হয় এবং হলুদ হওয়া বন্ধ থাকে।',
      en: 'Pinch mint tips frequently to stimulate lush lateral bush growth.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 180 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 300 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব', price: 500 },
    ],
  },

  // 14. SEASONAL: Marigold & Petunia
  {
    id: 'marigold-winter',
    name: { bn: 'ইনকা গাঁদা ও পেটুনিয়া (শীতকালীন চারা)', en: 'Inca Marigold & Giant Petunia' },
    scientificName: 'Tagetes erecta',
    category: 'seasonal',
    basePrice: 150,
    photo: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'daily',
    maintenance: 'easy',
    badges: { bn: ['শীতের মেলা', 'ঝাঁকে ঝাঁকে ফুল'], en: ['Winter Bloom', 'Vibrant Clusters'] },
    desc: {
      bn: 'শীতকালে ছাদ ও বারান্দাকে সোনালী হলুদ, কমলা ও বেগুনি রঙে রাঙিয়ে তোলে। ফুল দীর্ঘদিন সতেজ থাকে।',
      en: 'Spectacular winter annuals producing golden, tangerine, and velvety petals that last for weeks.',
    },
    tip: {
      bn: 'শুকিয়ে যাওয়া ফুল কাঁচি দিয়ে কেটে দিন (deadheading), এতে নতুন কুঁড়ি দ্রুত ফুটবে।',
      en: 'Remove dead flower heads promptly to stimulate continuous winter bud flushes.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ (প্যাক অব ৩)', price: 150 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ (প্যাক অব ৫)', price: 280 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব (রেডি টু ব্লুম)', price: 480 },
    ],
  },

  // 15. ROOFTOP: Adenium Desert Rose
  {
    id: 'adenium-desert-rose',
    name: { bn: 'অ্যাডেনিয়াম / মরু গোলাপ (গ্রাফটেড)', en: 'Adenium Desert Rose (Grafted Bonsai)' },
    scientificName: 'Adenium obesum',
    category: 'rooftop',
    basePrice: 420,
    photo: 'https://images.pexels.com/photos/2962019/pexels-photo-2962019.jpeg?auto=compress&cs=tinysrgb&w=800',
    sunlight: 'full',
    watering: 'weekly',
    maintenance: 'easy',
    badges: { bn: ['মরু গোলাপ', 'বন্সাই আর্ট'], en: ['Desert Rose', 'Bonsai Specimen'] },
    desc: {
      bn: 'ছাদের প্রচণ্ড প্রখর রোদে সবচেয়ে সুন্দর ফোটে। এর স্ফীত কাণ্ড (Caudex) বন্সাই লুক দেয়।',
      en: 'Sculptural swollen succulent trunk with showy rose-like blooms that love baking in scorching rooftop sun.',
    },
    tip: {
      bn: 'বৃষ্টির দিনে টবের নিচে পানি যেন না জমে। সপ্তাহে একবার পানি দিলেই পর্যাপ্ত।',
      en: 'Use gritty cactus mix with brick chips and perlite. Never let water stagnate.',
    },
    sizes: [
      { id: '8-bag', name: '8" Bag', label: '৮" ব্যাগ', price: 420 },
      { id: '10-bag', name: '10" Bag', label: '১০" ব্যাগ', price: 750 },
      { id: '12-tub', name: '12" Tub', label: '১২" টব (বন্সাই শেপ)', price: 1400 },
    ],
  },
]
