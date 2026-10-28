/**
 * Dhanshiri Garden — Comprehensive Botanical Encyclopedia & Plant Wikipedia
 *
 * Specially curated for Bangladesh agro-climatic zones (hot humid monsoon, mild winter, urban rooftop microclimates).
 * Incorporates DAE (Department of Agricultural Extension), AIS (Agriculture Information Service - 'Krishi Kotha'),
 * BARI/BRRI standards, and Mr. Amir Ali's (Former SAAO, DAE) 25+ years of field horticulture expertise.
 */

export const PLANT_CATEGORIES = [
  { id: 'all', en: 'All Plants', bn: 'সকল উদ্ভিদ' },
  { id: 'rooftop-fruit', en: 'Rooftop Fruits', bn: 'ছাদবাগানের ফলদ বৃক্ষ' },
  { id: 'indoor-air', en: 'Indoor Air-Purifying', bn: 'ইনডোর ও বায়ু শোধক' },
  { id: 'lawn-turf', en: 'Lawn & Turf Grass', bn: 'কার্পেট ঘাস ও লন' },
  { id: 'flowering', en: 'Ornamental & Flowering', bn: 'সুগন্ধি ফুল ও শোভাময়' },
  { id: 'medicinal-herb', en: 'Herbal & Kitchen', bn: 'ভেষজ ও কিচেন গার্ডেন' },
]

export const PLANT_DATABASE = [
  // 1. BARI Malta-1
  {
    id: 'bari-malta-1',
    name: 'BARI Malta-1 (Sweet Green Citrus)',
    banglaName: 'বারি মাল্টা-১ (মিষ্টি মাল্টা)',
    scientificName: 'Citrus sinensis',
    family: 'Rutaceae (লেবু পরিবার)',
    category: 'rooftop-fruit',
    origin: {
      bn: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI), জয়দেবপুর, গাজীপুর',
      en: 'Bangladesh Agricultural Research Institute (BARI), Gazipur',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'দৈনিক ৬-৮ ঘণ্টা সরাসরি রোদ প্রয়োজন',
      en: '6–8 hours of direct full sunlight daily',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'মাটির উপরিভাগ ১ ইঞ্চি শুকিয়ে এলে সেচ দিন; জলাবদ্ধতা সম্পূর্ণ পরিহার্য',
      en: 'Water when top 1 inch of soil is dry; avoid standing water',
    },
    soil: {
      bn: '৪০% বেলে-দোআঁশ মাটি, ৩০% ভার্মিকম্পোস্ট, ২০% কোকোপিট এবং ১০% নদীর বালু',
      en: '40% sandy-loam soil, 30% vermicompost, 20% cocopeat, 10% river sand',
    },
    plantation: {
      bn: '১৮-২০ ইঞ্চি সাইজের ড্রাম বা সিমেন্টের টব ব্যবহার করুন। তলায় ২ ইঞ্চি ইটের খোয়ার ড্রেনেজ লেয়ার দিন। জোড় কলমের (Grafting) চারা রোপণ করুন যাতে গ্রাফটিং পয়েন্ট মাটির অন্তত ২ ইঞ্চি ওপরে থাকে।',
      en: 'Use an 18–20 inch container or half-drum with a 2-inch crushed brick drainage base. Plant grafted saplings keeping the graft union 2 inches above soil level.',
    },
    bloomingSeason: {
      bn: 'ফাল্গুন – চৈত্র (ফেব্রুয়ারি – মার্চ)',
      en: 'Spring: February – March',
    },
    harvestSeason: {
      bn: 'ভাদ্র – আশ্বিন (সেপ্টেম্বর – অক্টোবর)',
      en: 'Autumn: September – October',
    },
    caringTechniques: {
      bn: 'ফুল আসার সময় সেচ কমিয়ে দিন এবং বোরন (সোলোবর ২ গ্রাম/লিটার) স্প্রে করুন। গুটি বাঁধলে নিয়মিত খৈল পচা পানি দিন। ফল সংগ্রহের পর শুকনো ডাল ছাঁটাই (Pruning) করে কপার অক্সিক্লোরাইড স্প্রে করুন।',
      en: 'Reduce water during initial flowering and apply Boron spray. Apply diluted mustard oil cake tea once fruitlets set. Prune dead twigs post-harvest and spray copper fungicide.',
    },
    temperature: '18°C – 36°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/2090903/pexels-photo-2090903.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'বাংলাদেশের ছাদবাগানে সর্বাধিক জনপ্রিয় মিষ্টি সাইট্রাস ফল। তলার অংশে হালকা হলদেটে দাগ আসলে বুঝতে হবে মাল্টা খাওয়ার উপযুক্ত ও সুমিষ্ট হয়েছে।',
      en: 'The #1 favorite sweet rooftop citrus across urban Bangladesh. Crisp, exceptionally juicy, with a signature pale-yellow ring when ripe.',
    },
    nutrition: {
      bn: 'প্রতি মাসে এক মুঠো ভার্মিকম্পোস্ট, ৫০ গ্রাম হাড়ের গুঁড়া ও ১০ গ্রাম পটাসিয়াম সালফেট দিন।',
      en: 'Monthly top-dressing of vermicompost, 50g bone meal, and 10g potassium sulfate.',
    },
    pests: ['সাইট্রাস ক্যানকার (Citrus Canker)', 'লিফ মাইনার (Leaf Miner)', 'মিলিবাগ (Mealybug)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ফুল ফোটার সময় গাছে কোনো কীটনাশক স্প্রে করবেন না, অন্যথায় পরাগায়নকারী মৌমাছি মারা যাবে এবং ফলন কমে যাবে।',
      en: 'Amir Ali’s Protocol: Never spray insecticides during full bloom; let pollinator bees work undisturbed.',
    },
  },

  // 2. Katimon All-Season Mango
  {
    id: 'katimon-mango',
    name: 'Katimon All-Season Mango',
    banglaName: 'কাটিমন বারোমাসি আম',
    scientificName: 'Mangifera indica',
    family: 'Anacardiaceae (আম পরিবার)',
    category: 'rooftop-fruit',
    origin: {
      bn: 'থাইল্যান্ড (বাংলাদেশের আবহাওয়ায় অভিযোজিত)',
      en: 'Thailand (Acclimatized for Bangladesh)',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'দৈনিক ৭-৮ ঘণ্টা সম্পূর্ণ উন্মুক্ত সূর্যালোক',
      en: '7–8 hours of intense open rooftop sunlight',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'নিয়মিত সেচ; মুকুল অবস্থায় অতিরিক্ত পানি পরিহার্য',
      en: 'Regular deep watering; taper down when panicles emerge',
    },
    soil: {
      bn: '৫০% দোআঁশ মাটি, ২৫% পচা গোবর বা কেঁচো সার, ১৫% কোকোপিট, ১০% বালু',
      en: '50% loamy soil, 25% aged cow dung or vermicompost, 15% cocopeat, 10% sand',
    },
    plantation: {
      bn: '২০-২৪ ইঞ্চি ড্রাম বা হাফ ব্যারেলে লাগান। ড্রামের নিচে ৫-৬টি ছিদ্র রেখে জিওটেক্সটাইল ফিল্টার ও খোয়ার লেয়ার দিন। বর্ষা মৌসুমে বা শরতে চারা লাগানো সবচেয়ে ভালো।',
      en: 'Plant in 20–24 inch half-drums with 5–6 drainage holes and geotextile filtration. Best planted during monsoon or early autumn.',
    },
    bloomingSeason: {
      bn: 'বছরে ৩ বার মুকুল আসে (মাঘ, জ্যৈষ্ঠ ও আশ্বিন)',
      en: 'Three times a year (Jan–Feb, May–Jun, Sep–Oct)',
    },
    harvestSeason: {
      bn: 'বৈশাখ-জ্যৈষ্ঠ, ভাদ্র-আশ্বিন ও পৌষ-মাঘ (সারা বছর আম পাওয়া যায়)',
      en: 'Yields fruit almost year-round across three cycles',
    },
    caringTechniques: {
      bn: 'মুকুল আসার পর হপার পোকা দমনে ইমিডাক্লোপ্রিড (০.৫ মিলি/লিটার) ও অ্যানথ্রাকনোজ দমনে ম্যানকোজেব স্প্রে করুন। ফল মার্বেল আকৃতি হলে টিল্ট বা ছত্রাকনাশক দিন।',
      en: 'Control mango hoppers with Imidacloprid and spray Mancozeb against anthracnose. Thin clusters to 2–3 fruits per panicle for large sizes.',
    },
    temperature: '20°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'বারোমাসি আমের মধ্যে সবচেয়ে মিষ্টি ও জনপ্রিয় জাত। আশবিহীন রসালো শাঁস এবং একই গাছে একই সাথে মুকুল, কাঁচা আম ও পাকা আম দেখা যায়।',
      en: 'The sweetest year-round mango in Bangladesh. Fiberless, aromatic flesh with simultaneous blooms, green fruit, and ripe mangoes on the same tree.',
    },
    nutrition: {
      bn: 'বছরে তিনবার ফল সংগ্রহের পর সুষম সার (টিএসপি, এমপি ও জিপসাম) এবং ভার্মিকম্পোস্ট টপ-ড্রেসিং করুন।',
      en: 'Replenish organic compost, TSP, and potash after each harvest flush.',
    },
    pests: ['আমের হপার পোকা (Mango Hopper)', 'অ্যানথ্রাকনোজ (Anthracnose)', 'ফল মাছি (Fruit Fly)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ফল যখন সুপারি সাইজের হয় তখন পেপার ব্যাগিং (Fruit Bagging) করলে কীটনাশক ছাড়াই মাছি পোকা ও দাগমুক্ত চকচকে আম পাওয়া যায়।',
      en: 'Amir Ali’s Protocol: Use paper fruit bagging when fruits reach marble size to prevent fruit fly damage without chemicals.',
    },
  },

  // 3. Amrapali Mango
  {
    id: 'amrapali-mango',
    name: 'Amrapali Dwarf Mango',
    banglaName: 'আম্রপালি আম',
    scientificName: 'Mangifera indica',
    family: 'Anacardiaceae (আম পরিবার)',
    category: 'rooftop-fruit',
    origin: {
      bn: 'ভারত (দশেরী × নীলম সংকর, বাংলাদেশে ব্যাপকভাবে জনপ্রিয়)',
      en: 'India (Dasheri × Neelum hybrid; nationwide favorite in BD)',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'দৈনিক ৬-৮ ঘণ্টা সরাসরি রোদ',
      en: '6–8 hours full sun',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'মাটি শুকালে সেচ দিন; ফল পাকার ১৫ দিন আগে সেচ বন্ধ করুন',
      en: 'Moderate watering; withhold water 15 days prior to ripening',
    },
    soil: {
      bn: 'দোআঁশ মাটি, কেঁচো কম্পোস্ট, ট্রাইকোডার্মা ও হাড়ের গুঁড়ার মিশ্রণ',
      en: 'Loam soil, vermicompost, Trichoderma, and steamed bone meal',
    },
    plantation: {
      bn: 'খাটো জাত হওয়ায় ছাদবাগানের জন্য আদর্শ। ২০ ইঞ্চি টবে নিয়মিত প্রুনিং করে গাছ ৩-৪ ফুট উচ্চতায় সহজে রাখা যায়।',
      en: 'Naturally dwarfing habit makes it perfect for 20-inch rooftop containers pruned to 4–5 feet.',
    },
    bloomingSeason: {
      bn: 'মাঘ – ফাল্গুন (জানুয়ারি – ফেব্রুয়ারি)',
      en: 'Late winter: January – February',
    },
    harvestSeason: {
      bn: 'আষাঢ় – শ্রাবণ (জুন – জুলাই)',
      en: 'Monsoon: Late June – July',
    },
    caringTechniques: {
      bn: 'বর্ষার পর ডগা প্রুনিং (হালকা ছাঁটাই) করুন যাতে নতুন শাখায় পরবর্তী বছর প্রচুর মুকুল আসে। নিয়মিত সরিষার খৈল পচা পানি দিন।',
      en: 'Perform canopy tip pruning right after monsoon harvest to stimulate uniform winter flowering panicles.',
    },
    temperature: '20°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/2180803/pexels-photo-2180803.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'গাঢ় কমলা রঙের মিষ্টি ও সুস্বাদু শাঁস। নিয়মিত ফলনশীল এবং বাংলাদেশের প্রতিটি ছাদবাগানের অপরিহার্য জাত।',
      en: 'Deep orange, intensely sweet aromatic flesh. Heavy annual bearer ideally suited for rooftop container culture.',
    },
    nutrition: {
      bn: 'প্রতি মাসে ভার্মিকম্পোস্ট ও খৈল পচা পানি; মুকুল আসার আগে ছাই ও পটাশ দিন।',
      en: 'Monthly vermicompost tea; apply wood ash and potassium before bloom.',
    },
    pests: ['হপার পোকা (Hopper)', 'পাউডারি মিলডিউ (Powdery Mildew)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: শীতকালে মুকুল আসার আগে নাইট্রোজেন সার বন্ধ রাখুন, কেবল পটাশ ও ছাই দিন যাতে পাতার বদলে মুকুল বের হয়।',
      en: 'Amir Ali’s Protocol: Stop nitrogen feeds in early winter to force floral buds rather than vegetative flushes.',
    },
  },

  // 4. Thai-7 Guava
  {
    id: 'thai-guava',
    name: 'Thai-7 Sweet Guava',
    banglaName: 'থাই-৭ পেয়ারা (বারোমাসি)',
    scientificName: 'Psidium guajava',
    family: 'Myrtaceae (জাম পরিবার)',
    category: 'rooftop-fruit',
    origin: {
      bn: 'থাইল্যান্ড (বাংলাদেশের জলবায়ুর অন্যতম সফল ফল)',
      en: 'Thailand (Widely cultivated in Bangladesh)',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'রোদ উজ্জ্বল ছাদবাগান (৬-৮ ঘণ্টা)',
      en: 'Full open sunlight (6–8 hours)',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'নিয়মিত সেচ; খরা ও অতিরিক্ত পানি দুটোই ক্ষতিকর',
      en: 'Consistent moisture; avoid drought stress during fruit sizing',
    },
    soil: {
      bn: 'দোআঁশ মাটি, পচা গোবর, কোকোপিট ও নিম খোলের মিশ্রণ',
      en: 'Well-draining loamy potting soil amended with neem cake',
    },
    plantation: {
      bn: '১৮-২০ ইঞ্চি ড্রামে বা টবে বসান। ডাল বাঁকিয়ে দিলে প্রচুর নতুন কুঁড়ি ও ফুল আসে।',
      en: 'Plant in 18-inch containers. Branch bending technique induces prolific lateral flowering nodes.',
    },
    bloomingSeason: {
      bn: 'সারা বছর (প্রধানত ফাল্গুন ও আষাঢ়ে)',
      en: 'Year-round flowering flushes',
    },
    harvestSeason: {
      bn: 'সারা বছর মিষ্টি ও মুচমুচে পেয়ারা পাওয়া যায়',
      en: 'Year-round continuous harvests',
    },
    caringTechniques: {
      bn: 'ফল মার্বেল সাইজ হলে ফোম নেট ও পলিথিন দিয়ে ব্যাগিং করুন। এতে মিলিবাগ বা মাছি পোকা লাগে না এবং পেয়ারা ধবধবে সুন্দর হয়।',
      en: 'Bag fruitlets with foam sleeves and poly bags to ward off fruit flies and achieve pristine white skin.',
    },
    temperature: '18°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'বিচি কম, অত্যন্ত মুচমুচে ও মিষ্টি স্বাদের পেয়ারা। দ্রুত ফলনশীল—চারা রোপণের ৪-৫ মাসের মধ্যেই ফল ধরতে শুরু করে।',
      en: 'Crisp, sweet, low-seed flesh. Rapid fruiting within 4–5 months of planting grafted saplings.',
    },
    nutrition: {
      bn: 'প্রতি মাসে কেঁচো সার ও সরিষার খৈল পচা পানি।',
      en: 'Monthly organic compost and mustard cake liquid fertilizer.',
    },
    pests: ['মিলিবাগ (Mealybug)', 'ফল মাছি (Fruit Fly)', 'সফেদা পোকা'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: পেয়ারা গাছে নিয়মিত ডগা ছাঁটাই (Shoot Pruning) করলে নতুন শাখায় প্রতিটি পাতার গোড়ায় জোড়ায় জোড়ায় পেয়ারা ধরে।',
      en: 'Amir Ali’s Protocol: Tip-prune non-bearing shoots to trigger pairs of fresh fruit buds on new flushes.',
    },
  },

  // 5. Red Velvet Dragon Fruit
  {
    id: 'dragon-fruit',
    name: 'Red Velvet Dragon Fruit (Pitaya)',
    banglaName: 'ভিয়েতনামী লাল ড্রাগন ফল',
    scientificName: 'Selenicereus costaricensis',
    family: 'Cactaceae (ক্যাকটাস পরিবার)',
    category: 'rooftop-fruit',
    origin: {
      bn: 'মধ্য আমেরিকা (ভিয়েতনাম ও থাইল্যান্ড হয়ে বাংলাদেশে তুমুল জনপ্রিয়)',
      en: 'Central America (Popularized via Vietnam in Bangladesh)',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'তীব্র সূর্যালোক (৮+ ঘণ্টা সম্পূর্ণ উন্মুক্ত ছাদ)',
      en: '8+ hours full unshaded sun exposure',
    },
    watering: 'low',
    wateringText: {
      bn: 'মাটি শুকিয়ে যাওয়ার পর পরিমিত পানি দিন; ক্যাকটাস জাতীয় হওয়ায় অতিরিক্ত পানিতে পচন ধরে',
      en: 'Water sparingly only when dry; highly sensitive to root rot',
    },
    soil: {
      bn: '৪০% নদীর লাল বালু, ৩০% দোআঁশ মাটি, ৩০% ভার্মিকম্পোস্ট ও ইটের গুঁড়া',
      en: '40% coarse river sand, 30% loamy soil, 30% organic compost with crushed brick',
    },
    plantation: {
      bn: 'হাফ ড্রামে একটি আরসিসি পিলার বা লোহার পাইপ ও ওপরে পুরনো বাইকের টায়ার দিয়ে ফ্রেম তৈরি করে ৪টি কাটিং চারদিকে বাঁধুন।',
      en: 'Plant 4 cuttings around a central concrete post topped with a round bicycle tire frame in a half-drum.',
    },
    bloomingSeason: {
      bn: 'বৈশাখ – আশ্বিন (মে – অক্টোবর; রাতে প্রস্ফুটিত হয়)',
      en: 'May – October (Night-blooming nocturnal flowers)',
    },
    harvestSeason: {
      bn: 'ফুল ফোটার ৩০-৩৫ দিন পর পাকা লাল ড্রাগন ফল সংগ্রহ করা যায়',
      en: 'Ripens 30–35 days after nocturnal pollination',
    },
    caringTechniques: {
      bn: 'রাতে ফুল ফুটলে হাত দিয়ে কৃত্রিম পরাগায়ন (Hand Pollination) করলে শতভাগ ফল ধরে। অতিরিক্ত শাখা ছাঁটাই করে টায়ারের ওপর ঝুলিয়ে দিন।',
      en: 'Perform nighttime hand pollination with a brush for 100% fruit set. Prune excess suckers below the tire ring.',
    },
    temperature: '20°C – 40°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/1437598/pexels-photo-1437598.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'অ্যান্টিঅক্সিডেন্ট ও পুষ্টিসমৃদ্ধ রানি রঙের মিষ্টি ড্রাগন ফল। ছাদবাগানে কম পরিচর্যায় একটানা ৫-৬ মাস ফল দেয়।',
      en: 'Antioxidant-rich magenta flesh. Highly resilient cactus yielding continuous fruit flushes across hot summer months.',
    },
    nutrition: {
      bn: 'ফুল আসার মৌসুমে প্রতি ড্রামে ১০০ গ্রাম হাড়ের গুঁড়া, ৫০ গ্রাম পটাশ ও গোবর সার প্রয়োগ করুন।',
      en: 'Apply bone meal, potash, and compost during early summer bloom flushes.',
    },
    pests: ['পিপড়া (Ants on buds)', 'ক্যাকটাস কান্ড পচা রোগ (Stem Rot)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ড্রাগন গাছে ড্রেনের ছিদ্র কোনোভাবেই বন্ধ হতে দেবেন না; বর্ষাকালে কান্ডে লালচে দাগ দেখলে ছত্রাকনাশক স্প্রে করুন।',
      en: 'Amir Ali’s Protocol: Never allow stagnant water in drums; spray systemic fungicide if rust spots appear.',
    },
  },

  // 6. Bhagwa Pomegranate
  {
    id: 'anar-pomegranate',
    name: 'Bhagwa Red Pomegranate (Anar/Bedana)',
    banglaName: 'ভগবা লাল বেদানা / ডালিম',
    scientificName: 'Punica granatum',
    family: 'Lythraceae (মেহেন্দী পরিবার)',
    category: 'rooftop-fruit',
    origin: {
      bn: 'ভারত ও মধ্য এশিয়া (বাংলাদেশের ছাদবাগানে সুপ্রসিদ্ধ)',
      en: 'India & Central Asia (Acclimatized for Bangladesh rooftops)',
    },
    difficulty: 'moderate',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'দৈনিক ৬-৮ ঘণ্টা সরাসরি রোদ',
      en: '6–8 hours full sun',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'নিয়মিত সেচ; তবে ফল ফেটে যাওয়া রোধে সেচের পরিমাণ সমান রাখুন',
      en: 'Keep soil moisture consistent to prevent skin splitting',
    },
    soil: {
      bn: 'উর্বর দোআঁশ মাটি, ভার্মিকম্পোস্ট, কোকোপিট ও নিম খৈল',
      en: 'Fertile sandy loam with organic humus and neem meal',
    },
    plantation: {
      bn: '১৮-২০ ইঞ্চি ড্রামে গুটি কলমের চারা রোপণ করুন। নিচ থেকে বের হওয়া সাকার (অপ্রয়োজনীয় চারা) কেটে ফেলুন।',
      en: 'Plant air-layered saplings in 18-inch containers. Regularly remove base suckers.',
    },
    bloomingSeason: {
      bn: 'ফাল্গুন – চৈত্র এবং আষাঢ় – শ্রাবণ',
      en: 'Spring and Early Monsoon',
    },
    harvestSeason: {
      bn: 'ফুল ফোটার ৪-৫ মাস পর ফল পাকে (লাল টকটকে বীজ হয়)',
      en: 'Ripens 4–5 months after bloom with deep red arils',
    },
    caringTechniques: {
      bn: 'ফল ফাটা রোধে ক্যালসিয়াম ও বোরন স্প্রে করুন। ফল পাকার সময় অতিরিক্ত বা অনিয়মিত সেচ দেবেন না।',
      en: 'Spray chelated boron and calcium to prevent fruit cracking during maturation.',
    },
    temperature: '18°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'গাঢ় লাল রঙের নরম বীজের মিষ্টি বেদানা। ছাদবাগানে পুষ্টি ও রক্তস্বল্পতা দূরীকরণে অত্যন্ত উপকারী।',
      en: 'Deep ruby arils with soft seeds and sweet aromatic juice. Exceptional health benefits in home gardens.',
    },
    nutrition: {
      bn: 'মাসে একবার ভার্মিকম্পোস্ট ও খৈল পচা পানি; ফুল এলে পটাশ দিন।',
      en: 'Monthly compost and diluted organic tea; boost potassium during fruiting.',
    },
    pests: ['আনারের প্রজাপতি বা ফল ছিদ্রকারী পোকা (Pomegranate Butterfly)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ডালিম মার্বেলের চেয়ে একটু বড় হলেই পাতলা পলি বা বাটার পেপার ব্যাগ দিয়ে ঢেকে দিলে কোনো কীটনাশক ছাড়াই ১০০% দাগমুক্ত মিষ্টি ফল পাওয়া যায়।',
      en: 'Amir Ali’s Protocol: Bag small pomegranates with butter paper to prevent the borer butterfly entirely.',
    },
  },

  // 7. Kagzi Seedless Lime
  {
    id: 'kagzi-lime',
    name: 'Kagzi Seedless Lime (Baromasi Lebu)',
    banglaName: 'কাগজি সিডলেস লেবু (বারোমাসি)',
    scientificName: 'Citrus aurantiifolia',
    family: 'Rutaceae (লেবু পরিবার)',
    category: 'rooftop-fruit',
    origin: {
      bn: 'বাংলাদেশ ও দক্ষিণ এশিয়া',
      en: 'Bangladesh & South Asia native',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'দৈনিক ৬ ঘণ্টা সরাসরি রোদ',
      en: '6+ hours direct sunlight',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'মাটি শুকালে পানি দিন; অতিরিক্ত পানি ক্ষতিকর',
      en: 'Water when soil feels dry to touch; avoid sogginess',
    },
    soil: {
      bn: 'দোআঁশ মাটি, কম্পোস্ট, কোকোপিট ও বালুর হালকা মিশ্রণ',
      en: 'Well-aerated loamy compost substrate',
    },
    plantation: {
      bn: '১৪-১৬ ইঞ্চি টবেই বারোমাসি কাগজি লেবু প্রচুর ধরে। ড্রেনেজ ছিদ্র ভালো রাখুন।',
      en: 'Thrives in 14–16 inch planters with excellent gravel drainage.',
    },
    bloomingSeason: {
      bn: 'সারা বছর থোকায় থোকায় ফুল ফোটে',
      en: 'Continuous year-round flowering',
    },
    harvestSeason: {
      bn: 'সারা বছর রসালো লেবু সংগ্রহ করা যায়',
      en: 'Continuous ongoing harvesting',
    },
    caringTechniques: {
      bn: 'লেবুর পাতায় ক্যাটারপিলার বা শুঁয়োপোকা দেখলে হাতে বেছে ফেলে দিন। ডাই-ব্যাক বা ডাল শুকিয়ে যাওয়া রোধে শুকনো ডাল কেটে কপার ছত্রাকনাশক পেস্ট লাগান।',
      en: 'Handpick swallowtail caterpillars. Prune die-back twigs and dab with copper paste.',
    },
    temperature: '18°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/1414110/pexels-photo-1414110.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'রসালো, সুগন্ধি ও বিচিবিহীন। প্রতিদিনের খাবারে ভিটামিন সি-এর জোগান দিতে প্রতিটি বাঙালি বাড়ির ছাদে একটি লেবু গাছ থাকা আবশ্যক।',
      en: 'Extremely aromatic, thin-skinned and seedless. A staple Vitamin C source for every Bangladeshi balcony and rooftop.',
    },
    nutrition: {
      bn: 'প্রতি মাসে এক মুঠো ভার্মিকম্পোস্ট ও খৈল পচা পানি।',
      en: 'Monthly organic compost and diluted mustard cake feed.',
    },
    pests: ['লিফ মাইনার (Leaf Miner)', 'সাইট্রাস ক্যাটারপিলার (Citrus Butterfly)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: কচি পাতায় আঁকাবাঁকা সাদা দাগ (লিফ মাইনার) দেখা দিলে বিকেলে নিম তেল স্প্রে করুন।',
      en: 'Amir Ali’s Protocol: Spray cold-pressed neem oil during late afternoon to manage citrus leaf miners organically.',
    },
  },

  // 8. Monstera Deliciosa
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa (Swiss Cheese Plant)',
    banglaName: 'মনস্টেরা ডেলিসিওসা',
    scientificName: 'Monstera deliciosa',
    family: 'Araceae (কচু পরিবার)',
    category: 'indoor-air',
    origin: {
      bn: 'মেক্সিকো ও মধ্য আমেরিকার ক্রান্তীয় বৃষ্টিবন',
      en: 'Tropical rainforests of Southern Mexico & Central America',
    },
    difficulty: 'beginner',
    sunlight: 'partial',
    sunlightText: {
      bn: 'উজ্জ্বল পরোক্ষ আলো (সরাসরি রোদে পাতা পুড়ে যায়)',
      en: 'Bright indirect filtered light; avoid direct scorching rays',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'মাটির উপরিভাগ ২ ইঞ্চি শুকিয়ে গেলে সেচ দিন',
      en: 'Allow top 2 inches of soil to dry between waterings',
    },
    soil: {
      bn: '৫০% কোকোপিট, ৩০% ভার্মিকম্পোস্ট, ১০% পার্লাইট ও ১০% কয়লা',
      en: '50% cocopeat, 30% vermicompost, 10% perlite, 10% biochar',
    },
    plantation: {
      bn: '১২-১৪ ইঞ্চি সিরামিক বা প্লাস্টিক টবে লাগান। মাঝে একটি মসস্টিক (মসের লাঠি) পুঁতে দিন যাতে বায়বীয় শিকড় আঁকড়ে ধরে বড় পাতা ছাড়ে।',
      en: 'Pot in a 12–14 inch container with a central coco-coir pole for aerial root climbing and majestic leaf fenestrations.',
    },
    bloomingSeason: {
      bn: 'ইনডোরে মূলত ফুল ফোটে না; চিরসবুজ মনকাড়া পাতার জন্যই বিখ্যাত',
      en: 'Grown for architectural foliage; rarely blooms indoors',
    },
    harvestSeason: {
      bn: 'সারাবছর দৃষ্টিনন্দন নতুন সবুজ পাতা উন্মোচিত হয়',
      en: 'Continuous year-round leaf unfolding',
    },
    caringTechniques: {
      bn: 'নরম ভেজা সুতি কাপড় দিয়ে পাতার ধুলো মুছে দিন যাতে সালোকসংশ্লেষণ ভালো হয়। শীতকালে সেচ কমিয়ে দিন।',
      en: 'Gently wipe leaves with a damp cloth to remove urban dust. Mist aerial roots weekly.',
    },
    temperature: '18°C – 32°C',
    petSafe: false,
    image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'আধুনিক ফ্ল্যাট ও ড্রয়িং রুমের আভিজাত্যের প্রতীক। বড় চেরা পাতা ঘরের বাতাস আর্দ্র ও সতেজ রাখে।',
      en: 'The quintessential luxury indoor biophilic plant. Dramatic split leaves purify indoor air and elevate room aesthetics.',
    },
    nutrition: {
      bn: 'মাসে একবার তরল জৈব সার স্প্রে করুন।',
      en: 'Monthly balanced liquid foliage feed during warm months.',
    },
    pests: ['স্কেল পোকা (Scale)', 'মাকড় (Spider Mites)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: টবের নিচে ট্রেতে জমে থাকা অতিরিক্ত পানি ৩০ মিনিট পর ফেলে দিন, যাতে শিকড়ে পচন না ধরে।',
      en: 'Amir Ali’s Protocol: Empty the drip tray 30 minutes after watering to prevent bottom saturation.',
    },
  },

  // 9. Snake Plant (Sansevieria)
  {
    id: 'snake-plant',
    name: 'Snake Plant / Mother-in-Law’s Tongue',
    banglaName: 'স্নেক প্ল্যান্ট (স্যানসেভিয়ারিয়া)',
    scientificName: 'Dracaena trifasciata',
    family: 'Asparagaceae (শতমূলী পরিবার)',
    category: 'indoor-air',
    origin: {
      bn: 'পশ্চিম আফ্রিকা (নাইজেরিয়া ও কঙ্গো)',
      en: 'Tropical Western Africa (Nigeria to Congo)',
    },
    difficulty: 'beginner',
    sunlight: 'indoor',
    sunlightText: {
      bn: 'কম আলো থেকে উজ্জ্বল পরোক্ষ আলো—সব পরিবেশেই বেঁচে থাকে',
      en: 'Tolerates low light up to bright indirect light',
    },
    watering: 'low',
    wateringText: {
      bn: '১০-১৫ দিনে একবার পানি দিন; অতিরিক্ত পানিতেই সবচেয়ে বেশি মরে',
      en: 'Water once every 10–14 days; highly drought tolerant',
    },
    soil: {
      bn: '৬০% বালু ও কোকোপিট, ৩০% মাটি, ১০% কয়লার গুঁড়া',
      en: 'Cactus/succulent blend with coarse river sand and charcoal',
    },
    plantation: {
      bn: '৮-১০ ইঞ্চি অগভীর টবে লাগান। পাতা কেটে বালুতে পুঁতলেও নতুন চারা গজায়।',
      en: 'Shallow 8–10 inch ceramic pot. Propagates effortlessly from leaf cuttings.',
    },
    bloomingSeason: {
      bn: 'বসন্তে কদাচিৎ সুগন্ধি সাদা ফুল ফোটে',
      en: 'Rare nocturnal fragrant pale-green flower spikes',
    },
    harvestSeason: {
      bn: 'চিরসবুজ বায়ূশোধক পাতা সারাবছর অটুট থাকে',
      en: 'Year-round architectural foliage',
    },
    caringTechniques: {
      bn: 'অতিরিক্ত যত্নের প্রয়োজন নেই। রাতে অক্সিজেন ত্যাগ করে বলে বেডরুম ও স্টাডি টেবিলের জন্য নাসার সুপারিশকৃত শ্রেষ্ঠ গাছ।',
      en: 'NASA-recommended bedroom oxygenator. Practically indestructible if kept dry.',
    },
    temperature: '15°C – 38°C',
    petSafe: false,
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'বাতাসের বেনজিন, ফর্মালডিহাইড ও ক্ষতিকর টক্সিন দূর করে। শহুরে ব্যস্ত মানুষের জন্য সবচেয়ে দীর্ঘস্থায়ী গাছ।',
      en: 'Filters airborne toxins like formaldehyde and xylene. Perfect for busy urban dwellers.',
    },
    nutrition: {
      bn: 'বছরে দুবার সামান্য ভার্মিকম্পোস্ট প্রয়োগই যথেষ্ট।',
      en: 'Light bi-annual organic compost application.',
    },
    pests: ['শিকড় পচা (Root Rot if overwatered)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: পানি দিতে ভুলে গেলে গাছ মরবে না, কিন্তু অতিরিক্ত পানি দিলে নিশ্চিত মারা যাবে—তাই মাটি শুকনো না হওয়া পর্যন্ত পানি দেবেন না।',
      en: 'Amir Ali’s Protocol: When in doubt, do not water. Neglect is better than overwatering for Sansevieria.',
    },
  },

  // 10. Golden Pothos (Money Plant)
  {
    id: 'golden-pothos',
    name: 'Golden Pothos / Money Plant',
    banglaName: 'মানি প্ল্যান্ট / গোল্ডেন পোথোস',
    scientificName: 'Epipremnum aureum',
    family: 'Araceae (কচু পরিবার)',
    category: 'indoor-air',
    origin: {
      bn: 'ফরাসি পলিনেশিয়া (সোসাইটি দ্বীপপুঞ্জ)',
      en: 'Mo’orea, French Polynesia',
    },
    difficulty: 'beginner',
    sunlight: 'partial',
    sunlightText: {
      bn: 'পরোক্ষ আলো বা সেমি-শেড বারান্দা',
      en: 'Indirect medium to bright light',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'মাটি শুকালে পানি দিন; এমনকি শুধু কাচের বোতলে পানিতেও বাঁচে',
      en: 'Water when dry; thrives in soil or pure water glass vases',
    },
    soil: {
      bn: 'কোকোপিট, দোআঁশ মাটি ও ভার্মিকম্পোস্টের সমান মিশ্রণ',
      en: 'Equal parts cocopeat, garden soil, and compost',
    },
    plantation: {
      bn: 'ঝুলন্ত টবে লাগালে লতা নিচে নামে, আবার মসস্টিকে বাঁধলে পাতা হাত সমান বড় হয়।',
      en: 'Hanging baskets for cascading vines, or moss poles for large mature foliage.',
    },
    bloomingSeason: {
      bn: 'চিরসবুজ সোনালী-সবুজ পাতা',
      en: 'Evergreen variegated golden foliage',
    },
    harvestSeason: {
      bn: 'সারা বছর দ্রুত বৃদ্ধি পায়',
      en: 'Continuous rapid vegetative growth',
    },
    caringTechniques: {
      bn: 'লতা বেশি লম্বা হলে মাথা ছাঁটাই করে সেই ডাল পানিতে রেখে শিকড় গজিয়ে নতুন গাছ তৈরি করুন।',
      en: 'Trim leggy vines and root node cuttings in water for unlimited propagation.',
    },
    temperature: '18°C – 35°C',
    petSafe: false,
    image: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'বাঙালি গৃহকোণের সবচেয়ে চিরচেনা ও ভালোবাসা পাওয়া সবুজ লতা। পানি বা মাটি—উভয় মাধ্যমেই সমান স্বাচ্ছন্দ্যে বেড়ে ওঠে।',
      en: 'The most beloved climbing vine in Bangladesh households. Forgiving, fast-growing, and air-cleansing.',
    },
    nutrition: {
      bn: 'পানিতে থাকলে প্রতি সপ্তাহে পানি পরিবর্তন করুন; মাটিতে মাসে একবার কম্পোস্ট দিন।',
      en: 'Refresh vase water weekly; top-dress potted soil monthly.',
    },
    pests: ['মিলিবাগ (Mealybugs)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: টবের গাছে পাতা হলুদ হয়ে যাওয়া মানে অতিরিক্ত পানি বা ড্রেনেজ বন্ধ; মাটি শুকিয়ে এলে তবেই সেচ দিন।',
      en: 'Amir Ali’s Protocol: Yellowing leaves signify waterlogging; let the root zone breathe.',
    },
  },

  // 11. Areca Palm
  {
    id: 'areca-palm',
    name: 'Areca Palm / Butterfly Palm',
    banglaName: 'অ্যারিকা পাম (সুপারি পাম)',
    scientificName: 'Dypsis lutescens',
    family: 'Arecaceae (পাম পরিবার)',
    category: 'indoor-air',
    origin: {
      bn: 'মাদাগাস্কার (দক্ষিণ এশিয়ায় বহুল প্রচলিত)',
      en: 'Madagascar; naturalized throughout South Asia',
    },
    difficulty: 'beginner',
    sunlight: 'partial',
    sunlightText: {
      bn: 'উজ্জ্বল আলো ও আংশিক রোদ (তীব্র দুপুরের কড়া রোদ পরিহার্য)',
      en: 'Bright filtered sunlight; protect from harsh midday scorch',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'মাটি আর্দ্র রাখুন তবে কাদাময় নয়',
      en: 'Evenly moist soil; never bone dry or waterlogged',
    },
    soil: {
      bn: 'দোআঁশ মাটি, ভার্মিকম্পোস্ট, কোকোপিট ও বালু',
      en: 'Rich organic loam with good porous drainage',
    },
    plantation: {
      bn: '১৪-১৮ ইঞ্চি সিরামিক বা টেরাকোটা টবে লাগান। ড্রয়িং রুম বা ব্যালকনির কোণে ছায়াসুনিবিড় রূপ দেয়।',
      en: 'Plant in 14–18 inch pots for living room corners and covered balcony courtyards.',
    },
    bloomingSeason: {
      bn: 'গ্রীষ্মের শুরুতে হালকা হলুদ মঞ্জরী আসে',
      en: 'Summer yellow panicle inflorescence',
    },
    harvestSeason: {
      bn: 'চিরসবুজ রাজকীয় পাম পাতা সারাবছর সুন্দর থাকে',
      en: 'Year-round lush tropical fronds',
    },
    caringTechniques: {
      bn: 'পাতার ডগা বাদামি হলে বুঝতে হবে বাতাস অতিরিক্ত শুষ্ক বা পানিতে অতিরিক্ত লবণ। মাঝে মাঝে পাতায় পানি স্প্রে (Misting) করুন।',
      en: 'Mist fronds in dry winter air to prevent brown tips. Remove dry brown outer fronds.',
    },
    temperature: '18°C – 35°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'প্রকৃতির হিউমিডিফায়ার—বাতাসে প্রচুর আর্দ্রতা ছড়ায় এবং ঘরে প্রাকৃতিক ট্রপিক্যাল রিসোর্টের আবহ তৈরি করে।',
      en: 'A premier indoor air humidifier and toxin absorber, creating a lush resort ambience.',
    },
    nutrition: {
      bn: 'মাসে একবার হালকা তরল সার বা ভার্মিকম্পোস্ট।',
      en: 'Monthly balanced liquid palm fertilizer.',
    },
    pests: ['মাকড়সা বা স্পাইডার মাইট (Spider Mites)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: শীতকালে অ্যারিকা পামে সেচ অর্ধেক কমিয়ে দিন এবং টব ঘরের এমন কোণে রাখুন যেখানে বাতাস চলাচল ভালো।',
      en: 'Amir Ali’s Protocol: Reduce watering in winter and place in well-ventilated, well-lit spaces.',
    },
  },

  // 12. Bermuda Carpet Grass
  {
    id: 'bermuda-grass',
    name: 'Bermuda Carpet Grass',
    banglaName: 'বারমুডা কার্পেট ঘাস',
    scientificName: 'Cynodon dactylon',
    family: 'Poaceae (ঘাস পরিবার)',
    category: 'lawn-turf',
    origin: {
      bn: 'আফ্রিকা ও দক্ষিণ এশিয়া',
      en: 'African and South Asian indigenous turf',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'তীব্র উন্মুক্ত রোদ (৬-৮ ঘণ্টা)',
      en: 'Full open sunlight (6–8 hours)',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'প্রতিষ্ঠিত হলে সপ্তাহে ২-৩ বার গভীর সেচ',
      en: 'Deep watering 2–3 times weekly once rooted',
    },
    soil: {
      bn: '৭০% নদীর মিহি বালু ও ৩০% পলিমাটি সমৃদ্ধ লেভেলিং বেড',
      en: '70% fine washed sand and 30% sandy-loam rootzone mix',
    },
    plantation: {
      bn: 'মাটি নিড়ানি দিয়ে সমান করে ২ ইঞ্চি বালুর বেড তৈরি করুন। কার্পেট সোড (Carpet Sod) টালি আকারে পরপর বসিয়ে হালকা রোলার চালান এবং প্রথম ১৫ দিন দিনে দুবার সেচ দিন।',
      en: 'Grade base with a 2-inch sand bed. Lay interlocking sod slabs, light roller compact, and irrigate twice daily for 15 days.',
    },
    bloomingSeason: {
      bn: 'ঘাসের লন কাটা থাকলে ফুল হয় না; চিরসবুজ থাকে',
      en: 'Mowed regularly to maintain vegetative green carpet',
    },
    harvestSeason: {
      bn: 'সারা বছর ঘন সবুজ গালিচা',
      en: 'Perennial lush year-round turf cover',
    },
    caringTechniques: {
      bn: 'প্রতি ১৫-২০ দিনে একবার লন মাওয়ার দিয়ে ১.৫-২ ইঞ্চি উচ্চতায় ঘাস কাটাই (Mowing) করুন। কাটাইয়ের পর হালকা ইউরিয়া ও পটাশ প্রয়োগ করুন।',
      en: 'Mow every 15–20 days at 1.5–2 inch height. Apply balanced nitrogen fertilizer after trimming.',
    },
    temperature: '20°C – 42°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'পদদলন সহনশীল এবং তীব্র রোদ ও খরায় অটল। ঢাকার ছাদবাগান, রিসোর্ট ও খেলার মাঠের জন্য সবচেয়ে নির্ভরযোগ্য সবুজ গালিচা।',
      en: 'Tough, drought-hardy, high-traffic resistant turf grass tailored for Bangladesh rooftops and sports estates.',
    },
    nutrition: {
      bn: 'মাসে একবার ইউরিয়া ও ডিএপি সার সেচের সাথে দিন।',
      en: 'Monthly light nitrogen feeding followed immediately by irrigation.',
    },
    pests: ['আগাছা (Weeds)', 'লেদা পোকা (Armyworm)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ছাদের লনে ১.৫% ঢাল ও ৩-লেয়ার ড্রেনেজ ম্যাট নিশ্চিত করুন, যাতে বর্ষায় ঘাসের গোড়ায় পানি জমে শিকড় পচে না যায়।',
      en: 'Amir Ali’s Protocol: Ensure 1.5% drainage slope and drainage cell matting under rooftop turf.',
    },
  },

  // 13. Korean Velvet Turf
  {
    id: 'korean-velvet-turf',
    name: 'Korean Velvet Turf Grass',
    banglaName: 'কোরিয়ান ভেলভেট ঘাস',
    scientificName: 'Zoysia japonica',
    family: 'Poaceae (ঘাস পরিবার)',
    category: 'lawn-turf',
    origin: {
      bn: 'পূর্ব এশিয়া (জাপান ও কোরিয়া)',
      en: 'East Asia (Japan & Korea)',
    },
    difficulty: 'moderate',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'সরাসরি সূর্যালোক (আংশিক ছায়াও সহ্য করে)',
      en: 'Direct full sunlight; tolerates light shade',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'পরিমিত সেচ; গোড়া স্যাঁতসেঁতে রাখবেন না',
      en: 'Moderate consistent moisture; avoid waterlogging',
    },
    soil: {
      bn: 'নদীর বালু ও দোআঁশ মাটির ফিল্টার বেড',
      en: 'Graded river sand bed with organic amendments',
    },
    plantation: {
      bn: 'বিলাসবহুল লন প্রতিষ্ঠায় কোরিয়ান ভেলভেট ঘাসের সোড বসিয়ে হালকা পানি দিন। এটি ধীরগতিতে বাড়ে তাই ঘন ও মখমলের মতো দেখায়।',
      en: 'Installed as precision sod slabs. Slow-growing habit yields a dense, carpet-like emerald finish.',
    },
    bloomingSeason: {
      bn: 'ঘন সবুজ ভেলভেট কভার',
      en: 'Velvety fine-textured vegetative cover',
    },
    harvestSeason: {
      bn: 'সারা বছর নিখুঁত সবুজ সৌন্দর্য',
      en: 'Year-round immaculate ornamental appearance',
    },
    caringTechniques: {
      bn: 'মাসে একবার সুবিন্যস্ত কাটাই (Mowing) প্রয়োজন। ধীরগতির বৃদ্ধির কারণে কম কাটাই করতে হয়।',
      en: 'Low maintenance mowing once every 3–4 weeks. Very fine blade structure.',
    },
    temperature: '15°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'মখমলের মতো নরম ও দৃষ্টিনন্দন। অভিজাত ভিলা, রিসোর্ট ও আধুনিক ছাদবাগানের জন্য প্রিমিয়াম ভেলভেট লন।',
      en: 'Ultra-fine velvety texture. The gold standard for luxury villa landscapes and manicured terrace lawns.',
    },
    nutrition: {
      bn: 'বসন্তে জৈব কম্পোস্ট ও বর্ষার পর পটাশ সার প্রয়োগ করুন।',
      en: 'Spring compost top-dressing and post-monsoon potassium boost.',
    },
    pests: ['ঘাসের ছত্রাক বা ব্রাউন প্যাচ (Brown Patch)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ভেলভেট ঘাসে সকালে সেচ দিন যাতে সারাদিনে পাতা শুকিয়ে যায়; রাতে পানি দিলে ফাঙ্গাস লাগার আশঙ্কা থাকে।',
      en: 'Amir Ali’s Protocol: Irrigate in the early morning so blades dry fast, preventing fungal brown patch.',
    },
  },

  // 14. Bougainvillea
  {
    id: 'bougainvillea',
    name: 'Bougainvillea (Paper Flower)',
    banglaName: 'বাগানবিলাস (কাগজের ফুল)',
    scientificName: 'Bougainvillea spectabilis',
    family: 'Nyctaginaceae (বাগানবিলাস পরিবার)',
    category: 'flowering',
    origin: {
      bn: 'দক্ষিণ আমেরিকা (ব্রাজিল ও পেরু)',
      en: 'South America (Brazil, Peru, Argentina)',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'তীব্র রোদ ও তাপ (যত রোদ পাবে তত বেশি ফুল ফুটবে)',
      en: 'Full intense sun (more sunlight = heavier bloom clusters)',
    },
    watering: 'low',
    wateringText: {
      bn: 'মাটি সম্পূর্ণ শুকানোর পর পানি দিন; বেশি পানি দিলে ফুল না এসে শুধু পাতা গজায়',
      en: 'Water only when dry; overwatering triggers leaves instead of flowers',
    },
    soil: {
      bn: 'বেলে-দোআঁশ মাটি, সামান্য কম্পোস্ট ও ইটের গুঁড়া',
      en: 'Gritty, well-draining sandy loam potting mix',
    },
    plantation: {
      bn: '১৪-১৬ ইঞ্চি টবে লাগিয়ে ছাদের রেলিং বা গেটের পাশে উঠিয়ে দিন। বনসাই বা ঝোপালো আকার দিতে নিয়মিত প্রুনিং করুন।',
      en: 'Plant in 14–16 inch containers along rooftop railings or gates. Superb for bonsai or bush shapes.',
    },
    bloomingSeason: {
      bn: 'কার্তিক – বৈশাখ (অক্টোবর – মে; শীত ও বসন্তে ছাদ রঙিন করে তোলে)',
      en: 'October – May (Massive winter & spring floral displays)',
    },
    harvestSeason: {
      bn: 'সারা বছর আকর্ষণীয় রঙিন ব্র্যাক্টস (গোলাপি, লাল, হলুদ, সাদা, বেগুনী)',
      en: 'Prolific recurring colored floral bracts',
    },
    caringTechniques: {
      bn: 'ফুল ঝরে যাওয়ার পর ডাল ১/৩ অংশ ছেঁটে দিন। ফুল আসার আগে কয়েকদিন সেচ কমিয়ে দিলে গাছটি ফুলে ফুলে ভরে যায়।',
      en: 'Hard-prune tips after bloom flushes. Mild water-stress triggers explosive flower bud development.',
    },
    temperature: '18°C – 42°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/5412431/pexels-photo-5412431.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'ঢাকার ছাদ ও বারান্দার রেলিংয়ের সবচেয়ে চিরচেনা রঙিন ফুল। খরা ও রোদ সহনশীল হওয়ায় পরিচর্যা একেবারেই সহজ।',
      en: 'The most iconic flowering climber across Dhaka rooftops. Drought-tolerant, heat-loving, and explosive blooms.',
    },
    nutrition: {
      bn: 'মাসে একবার হাড়ের গুঁড়া ও পটাশ সার দিন। নাইট্রোজেন সার কম দিন।',
      en: 'Monthly bone meal and potash; keep nitrogen low to prevent foliage dominance.',
    },
    pests: ['শুঁয়োপোকা (Caterpillars on young leaves)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: বাগানবিলাসে ফুল না আসার প্রধান কারণ অতিরিক্ত পানি ও ছায়া। গাছটিকে সবচেয়ে রোদের জায়গায় দিন এবং পানি কমিয়ে দিন।',
      en: 'Amir Ali’s Protocol: Lack of blooms is almost always due to over-watering and shade. Move to full sun and reduce water.',
    },
  },

  // 15. Arabian Jasmine (Beli)
  {
    id: 'beli-flower',
    name: 'Arabian Jasmine (Beli Phul)',
    banglaName: 'বেলি ফুল (সুগন্ধি বেলি)',
    scientificName: 'Jasminum sambac',
    family: 'Oleaceae (জলপাই পরিবার)',
    category: 'flowering',
    origin: {
      bn: 'দক্ষিণ এশিয়া ও ভারত',
      en: 'South Asia & Indian Subcontinent native',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'রোদ ঝলমলে ছাদ বা ব্যালকনি (৫-৬ ঘণ্টা)',
      en: '5–6 hours bright direct sunlight',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'নিয়মিত সেচ; মাটি যেন ভেজা কিন্তু স্যাঁতসেঁতে না থাকে',
      en: 'Regular moisture; well-drained loamy conditions',
    },
    soil: {
      bn: 'দোআঁশ মাটি, ভার্মিকম্পোস্ট ও গোবর সারের পুষ্টিকর মিশ্রণ',
      en: 'Rich loamy garden soil with generous compost',
    },
    plantation: {
      bn: '১০-১২ ইঞ্চি টবে লাগান। বর্ষাকালে ডাল কেটে লাগালেও সহজে নতুন চারা তৈরি হয়।',
      en: 'Plant in 10–12 inch containers. Propagates easily from semi-hardwood cuttings during monsoon.',
    },
    bloomingSeason: {
      bn: 'চৈত্র – আশ্বিন (মার্চ – অক্টোবর; গ্রীষ্ম ও বর্ষায় মন মাতানো সুবাস)',
      en: 'March – October (Heavy summer & monsoon fragrant blooms)',
    },
    harvestSeason: {
      bn: 'সন্ধ্যায় প্রস্ফুটিত তাজা বেলি ফুল সংগ্রহ করা হয়',
      en: 'Dusk harvesting of intensely fragrant white flowers',
    },
    caringTechniques: {
      bn: 'শীতের শেষে (মাঘ মাসে) গাছের ডাল অর্ধেক ছেঁটে দিন এবং গোড়ায় নতুন জৈব সার দিন। এতে বসন্তে ঝাঁকে ঝাঁকে নতুন কুঁড়ি আসবে।',
      en: 'Prune branches back by half in late winter (Jan–Feb) and dress with compost to trigger spring blooms.',
    },
    temperature: '20°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/878846/pexels-photo-878846.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'বাঙালির প্রাণের সুগন্ধি সাদা ফুল। গ্রীষ্মের সন্ধ্যায় বেলি ফুলের ঘ্রাণে সারা ছাদ ও ঘরের বাতাস মোহিত হয়ে ওঠে।',
      en: 'The eternal fragrant white bloom of Bengal. Its intoxicating scent perfumes summer evenings and traditional garlands.',
    },
    nutrition: {
      bn: 'প্রতি মাসে সরিষার খৈল পচা পানি ও এক চামচ হাড়ের গুঁড়া দিন।',
      en: 'Monthly diluted mustard cake tea and bone meal.',
    },
    pests: ['সাদা মাছি (Whitefly)', 'মুকুল ছিদ্রকারী পোকা'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ফুল শুকিয়ে যাওয়ার সাথে সাথে বোঁটা কেটে ফেললে নতুন কুঁড়ি দ্রুত আসে।',
      en: 'Amir Ali’s Protocol: Deadhead spent flower calyxes immediately to stimulate rapid repeat bud clusters.',
    },
  },

  // 16. Orange Jessamine (Kamini)
  {
    id: 'kamini-flower',
    name: 'Orange Jessamine / Kamini',
    banglaName: 'কামিনী ফুল',
    scientificName: 'Murraya paniculata',
    family: 'Rutaceae (লেবু পরিবার)',
    category: 'flowering',
    origin: {
      bn: 'দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়া',
      en: 'South & Southeast Asia native',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'সরাসরি রোদ বা হালকা পরোক্ষ আলো',
      en: 'Full direct sun to partial sun',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'নিয়মিত পরিমিত সেচ',
      en: 'Moderate watering; keep soil well drained',
    },
    soil: {
      bn: 'দোআঁশ মাটি, কোকোপিট ও ভার্মিকম্পোস্টের মিশ্রণ',
      en: 'Loamy compost mix with good aeration',
    },
    plantation: {
      bn: '১২-১৪ ইঞ্চি টবে বসান। টপিয়ারি বা গোল ঝোপের আকারে ছেঁটে সুন্দর রাখা যায়।',
      en: 'Pots 12–14 inches. Excellent for topiary globes or boundary hedges.',
    },
    bloomingSeason: {
      bn: 'গ্রীষ্ম ও বর্ষায় দফায় দফায় (বৃষ্টির পর সারা গাছ ফুলে ভরে যায়)',
      en: 'Repeated fragrant flushes throughout summer and monsoon',
    },
    harvestSeason: {
      bn: 'ফুল ঝরে গেলে শীতকালে ছোট ছোট লাল ফল ধরে',
      en: 'Ornamental bright red berries in winter',
    },
    caringTechniques: {
      bn: 'বৃষ্টির পর গাছে তীব্র মিষ্টি সুবাস ছড়ায়। ফুল ঝরার পর হালকা প্রুনিং করুন।',
      en: 'Lightly trim after each bloom flush to encourage fresh branching.',
    },
    temperature: '18°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'সাদা ছোট ছোট ফুল ও চকচকে সবুজ পাতা। রাতের মৃদু বাতাসে কামিনীর মিষ্টি সুবাস অনেক দূর পর্যন্ত ছড়িয়ে পড়ে।',
      en: 'Glossy dark green leaves and clusters of pure white, citrus-scented flowers that perfume the entire courtyard.',
    },
    nutrition: {
      bn: 'মাসে একবার জৈব সার ও খৈল পচা পানি।',
      en: 'Monthly organic compost and neem cake feed.',
    },
    pests: ['স্কেল পোকা (Scale)', 'মিলিবাগ'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: বর্ষায় বৃষ্টির পানি পেলে কামিনী সবচেয়ে বেশি ফুল দেয়; টবের ড্রেনেজ পরিষ্কার রাখুন।',
      en: 'Amir Ali’s Protocol: Rainwater naturally triggers blooms; ensure drainage is free-flowing.',
    },
  },

  // 17. Night-Blooming Jasmine (Hasnahana)
  {
    id: 'hasnahana-flower',
    name: 'Night-Blooming Jasmine (Hasnahana)',
    banglaName: 'হাসনাহেনা ফুল',
    scientificName: 'Cestrum nocturnum',
    family: 'Solanaceae (বেগুন পরিবার)',
    category: 'flowering',
    origin: {
      bn: 'ওয়েস্ট ইন্ডিজ ও মধ্য আমেরিকা (বাংলাদেশে বহু যুগ ধরে সমাদৃত)',
      en: 'West Indies & Central America; historic favorite in Bengal',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'উন্মুক্ত রোদ বা আংশিক ছায়া',
      en: 'Full sun to dappled sunlight',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'নিয়মিত সেচ দিন; খরা সহ্য করতে পারে না',
      en: 'Consistent watering; moist but well-drained soil',
    },
    soil: {
      bn: 'উর্বর দোআঁশ মাটি ও পচা গোবর সার',
      en: 'Humus-rich loamy soil',
    },
    plantation: {
      bn: '১২-১৪ ইঞ্চি টবে বসান। বারান্দা বা ছাদের এক কোণে রাখলে রাতে পুরো বাড়ি সুবাসিত হবে।',
      en: '12–14 inch container situated near outdoor seating or bedroom windows.',
    },
    bloomingSeason: {
      bn: 'গ্রীষ্ম, বর্ষা ও শরৎকালে রাতে প্রস্ফুটিত হয়',
      en: 'Warm nights from late spring through autumn',
    },
    harvestSeason: {
      bn: 'রাতে নক্ষত্রের মতো সাদা-সবুজাভ ফুলের গুচ্ছ ফোটে',
      en: 'Nocturnal blooms opening at sunset and closing at dawn',
    },
    caringTechniques: {
      bn: 'ফুল ঝরার পর ডাল ছাঁটাই করুন। শীতে গাছ সুপ্তাবস্থায় থাকে তাই পানি কম দিন।',
      en: 'Prune back after flowering flushes. Withhold heavy feeding in cold winter dormancy.',
    },
    temperature: '18°C – 36°C',
    petSafe: false,
    image: 'https://images.pexels.com/photos/207085/pexels-photo-207085.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'রাতের রানি—সূর্যাস্তের পর যখন হাসনাহেনা ফোটে তখন এর তীব্র মাদকতাময় সুবাস চারপাশ মাতিয়ে রাখে।',
      en: 'Legendary night-scented bloomer whose perfume carries hundreds of feet on calm evening breezes.',
    },
    nutrition: {
      bn: 'মাসে একবার কেঁচো কম্পোস্ট ও হাড়ের গুঁড়া দিন।',
      en: 'Monthly vermicompost and steamed bone meal.',
    },
    pests: ['জাব পোকা (Aphids)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: শোবার ঘরের জানালার পাশে বা বারান্দায় হাসনাহেনা রাখলে সান্ধ্যকালীন প্রাকৃতিক সুবাস উপভোগ করা যায়।',
      en: 'Amir Ali’s Protocol: Place near bedroom windows to enjoy natural fragrance drift indoors after dark.',
    },
  },

  // 18. Gandharaj (Gardenia)
  {
    id: 'gandharaj-flower',
    name: 'Gardenia / Cape Jasmine (Gandharaj)',
    banglaName: 'গন্ধরাজ ফুল',
    scientificName: 'Gardenia jasminoides',
    family: 'Rubiaceae (কফি পরিবার)',
    category: 'flowering',
    origin: {
      bn: 'দক্ষিণ এশিয়া ও চীন',
      en: 'South Asia & Southern China',
    },
    difficulty: 'moderate',
    sunlight: 'partial',
    sunlightText: {
      bn: 'সকালের মিষ্টি রোদ (দুপুরের তীব্র রোদ এড়িয়ে চলুন)',
      en: 'Morning direct sun with filtered afternoon shade',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'মাটি আর্দ্র রাখুন তবে জলাবদ্ধ নয়',
      en: 'Consistently moist, slightly acidic soil',
    },
    soil: {
      bn: 'সামান্য অম্লীয় দোআঁশ মাটি (চা পাতার কম্পোস্ট মিশ্রিত)',
      en: 'Slightly acidic loam enriched with tea-leaf compost (pH 5.5–6.5)',
    },
    plantation: {
      bn: '১২-১৪ ইঞ্চি মাটির টবে লাগান। টবের নিচে ড্রেনেজ লেয়ার ভালো রাখুন।',
      en: 'Plant in clay/terracotta 12-inch pots with excellent drainage.',
    },
    bloomingSeason: {
      bn: 'বৈশাখ – শ্রাবণ (মে – আগস্ট; বর্ষার দিনে অপূর্ব ফোটে)',
      en: 'Monsoon blooms: May – August',
    },
    harvestSeason: {
      bn: 'বরফের মতো ধবধবে সাদা পাপড়ির মিষ্টি ফুল',
      en: 'Pristine double-white velvety petals',
    },
    caringTechniques: {
      bn: 'গাছের গোড়ায় ব্যবহৃত শুকনা চা পাতা দিলে মাটি অম্লীয় থাকে এবং প্রচুর ফুল আসে। কুঁড়ি ঝরা রোধে পরিমিত পানি ও অনুখাদ্য স্প্রে করুন।',
      en: 'Top-dress with spent rinsed tea leaves to maintain soil acidity. Mist buds to prevent drying drop.',
    },
    temperature: '18°C – 35°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'ফুলের রাজা গন্ধরাজ—মোমপালিশ করা চকচকে পাতার মাঝে ডাবল পাপড়ির ধবধবে সাদা ফুল ও অতুলনীয় সুবাস।',
      en: 'The aristocrat of fragrant flowers. Velvety double white petals set against glossy evergreen foliage.',
    },
    nutrition: {
      bn: 'মাসে একবার আয়রন কিলেট ও সরিষার খৈল সার প্রয়োগ করুন।',
      en: 'Chelated iron and organic mustard cake tea monthly.',
    },
    pests: ['কুঁড়ি পচা রোগ (Bud Rot)', 'সাদা মাছি (Whitefly)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: পাতা হলুদ হয়ে শিরা সবুজ থাকলে বুঝতে হবে মাটিতে আয়রনের ঘাটতি; আয়রন চিলেট স্প্রে করলে পাতা দ্রুত সবুজ হয়।',
      en: 'Amir Ali’s Protocol: Yellow leaves with green veins indicate iron chlorosis; apply chelated iron spray.',
    },
  },

  // 19. Krishna Tulsi (Holy Basil)
  {
    id: 'tulsi-plant',
    name: 'Krishna Tulsi (Holy Basil)',
    banglaName: 'কৃষ্ণ তুলসী (ভেষজ ও ঔষধি)',
    scientificName: 'Ocimum tenuiflorum',
    family: 'Lamiaceae (পুদিনা পরিবার)',
    category: 'medicinal-herb',
    origin: {
      bn: 'ভারত ও বাংলাদেশ (আবহমানকাল ধরে পূজিত ও ঔষধি বৃক্ষ)',
      en: 'Indian Subcontinent indigenous medicinal herb',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'দৈনিক ৫-৬ ঘণ্টা রোদ প্রয়োজন',
      en: '5–6 hours direct sunlight daily',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'নিয়মিত পরিমিত সেচ; গোড়ায় পানি জমতে দেবেন না',
      en: 'Moist well-drained soil; avoid waterlogged roots',
    },
    soil: {
      bn: 'দোআঁশ মাটি, ভার্মিকম্পোস্ট ও সামান্য নদীর বালু',
      en: 'Light fertile loam amended with organic compost',
    },
    plantation: {
      bn: '৮-১০ ইঞ্চি টবে বীজ বা ডাল থেকে সহজে চারা তৈরি হয়। বারান্দা বা ছাদে খুব কম জায়গায় বাড়ে।',
      en: '8–10 inch pots. Readily grown from seeds or tip cuttings on balconies.',
    },
    bloomingSeason: {
      bn: 'সারা বছর ছোট ছোট বেগুনি রঙের মঞ্জরী আসে',
      en: 'Perennial purple flower spikes throughout the year',
    },
    harvestSeason: {
      bn: 'প্রতিদিন তাজা ভেষজ পাতা সংগ্রহ করা যায়',
      en: 'Daily fresh harvest of medicinal aromatic leaves',
    },
    caringTechniques: {
      bn: 'গাছের মাথায় মঞ্জরী (বীজের ফুল) এলে তা সাথে সাথে চিমটি দিয়ে ভেঙে দিন (Pinching)। এতে গাছ লম্বা না হয়ে চারদিকে ঘন ঝাঁকড়া হয় এবং পাতার উৎপাদন বহুগুণ বাড়ে।',
      en: 'Regularly pinch off flower spikes (manjari) to promote bushy lateral branching and continuous leaf production.',
    },
    temperature: '18°C – 38°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/4040589/pexels-photo-4040589.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'সর্দি-কাশি নিরাময়, রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি ও বাতাসে জীবাণুনাশক উপাদান ছড়ানোর জন্য প্রতিটি বাঙালি গৃহের শ্রেষ্ঠ সঙ্গী।',
      en: 'The queen of Ayurvedic herbs. Renowned for respiratory relief, immunity boosting, and antibacterial qualities.',
    },
    nutrition: {
      bn: 'মাসে একবার সামান্য কেঁচো সার প্রয়োগই যথেষ্ট।',
      en: 'Monthly light vermicompost top-dressing.',
    },
    pests: ['পাতা কোঁকড়ানো পোকা', 'জাব পোকা (Aphids)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: শীতের সকালে তুলসী পাতায় ঠান্ডা কুয়াশা জমলে পাতা কুঁকড়ে যায়; শীতকালে গাছটি হালকা শেডে বা বারান্দার ভেতরে রাখুন।',
      en: 'Amir Ali’s Protocol: Protect from cold winter frost on open rooftops to prevent leaf drop.',
    },
  },

  // 20. Aloe Vera
  {
    id: 'aloe-vera',
    name: 'Aloe Vera (Ghritakumari)',
    banglaName: 'অ্যালোভেরা / ঘৃতকুমারী',
    scientificName: 'Aloe barbadensis miller',
    family: 'Asphodelaceae (অ্যালো পরিবার)',
    category: 'medicinal-herb',
    origin: {
      bn: 'আরব উপদ্বীপ (বাংলাদেশে বহুল সমাদৃত রূপচর্চা ও ঔষধি উদ্ভিদ)',
      en: 'Arabian Peninsula; widely grown across Bangladesh',
    },
    difficulty: 'beginner',
    sunlight: 'partial',
    sunlightText: {
      bn: 'উজ্জ্বল আলো বা সকালের মিষ্টি রোদ (তীব্র দুপুরের রোদে পাতা তামাটে লাল হয়ে যায়)',
      en: 'Bright indirect light or gentle morning sun; harsh sun browns leaves',
    },
    watering: 'low',
    wateringText: {
      bn: 'মাটি সম্পূর্ণ শুকিয়ে গেলে তবেই সামান্য পানি দিন; শীতে ১৫ দিনে একবার',
      en: 'Water deeply only when completely dry; once every 2 weeks in winter',
    },
    soil: {
      bn: '৫০% নদীর বালু, ৩০% দোআঁশ মাটি ও ২০% কেঁচো কম্পোস্ট',
      en: '50% coarse sand, 30% loamy soil, 20% compost (succulent drainage)',
    },
    plantation: {
      bn: '৮-১২ ইঞ্চি অগভীর চওড়া টবে লাগান। গাছের গোড়া থেকে বের হওয়া ছোট চারা (পাপস) আলাদা করে নতুন টবে বসালেই গাছ বৃদ্ধি পায়।',
      en: 'Shallow wide pots. Readily propagated by separating rooted offshoots (pups).',
    },
    bloomingSeason: {
      bn: 'পরিপক্ব গাছে শীতের শেষে লম্বা হলুদ ফুলের মঞ্জরী আসে',
      en: 'Yellow tubular flower stalks on mature plants in late winter',
    },
    harvestSeason: {
      bn: 'সারা বছর পুরু রসালো পাতা থেকে জেল সংগ্রহ করা যায়',
      en: 'Year-round harvesting of thick inner succulent gel',
    },
    caringTechniques: {
      bn: 'টবে পানি জমলে গোড়া পচে যায়। তাই পানি নিষ্কাশন নিশ্চিত করুন। নিচের পরিপক্ব পাতা গোড়া থেকে কেটে জেল ব্যবহার করুন।',
      en: 'Harvest lowest outer mature leaves with a clean knife. Never allow standing water in pots.',
    },
    temperature: '18°C – 38°C',
    petSafe: false,
    image: 'https://images.pexels.com/photos/1331734/pexels-photo-1331734.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'ত্বক ও চুলের রূপচর্চা এবং হজম শক্তি বাড়াতে অ্যালোভেরা জেল জাদুকরী। কম যত্নে ব্যালকনিতে অনায়াসে বাঁচে।',
      en: 'Soothing natural gel for skincare, hair wellness, and cooling digestion. Thrives with minimal care.',
    },
    nutrition: {
      bn: 'বছরে দুবার সামান্য ভার্মিকম্পোস্ট।',
      en: 'Light bi-annual organic feeding.',
    },
    pests: ['গোড়া পচা (Root Rot if overwatered)'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: অ্যালোভেরা পাতা তামাটে বা লালচে হয়ে গেলে বুঝতে হবে গাছটি অতিরিক্ত কড়া রোদ পাচ্ছে; সাথে সাথে হালকা ছায়াযুক্ত ব্যালকনিতে সরিয়ে নিন।',
      en: 'Amir Ali’s Protocol: Brownish/copper leaves mean sun stress; relocate to bright indirect shade to restore vibrant green gel.',
    },
  },

  // 21. Neem Tree
  {
    id: 'neem-tree',
    name: 'Neem Tree (Indian Lilac)',
    banglaName: 'নিম গাছ (প্রাকৃতিক প্রতিষেধক)',
    scientificName: 'Azadirachta indica',
    family: 'Meliaceae (নিম পরিবার)',
    category: 'medicinal-herb',
    origin: {
      bn: 'বাংলাদেশ ও ভারত (বরেন্দ্র ও বরেন্দ্র অঞ্চলের ঐতিহ্যবাহী বৃক্ষ)',
      en: 'Indigenous to Bangladesh & the Indian Subcontinent',
    },
    difficulty: 'beginner',
    sunlight: 'full-sun',
    sunlightText: {
      bn: 'উন্মুক্ত কড়া রোদ (৬-৮ ঘণ্টা)',
      en: 'Full open direct sunlight',
    },
    watering: 'moderate',
    wateringText: {
      bn: 'সহনশীল; মাটি শুকালে পানি দিন',
      en: 'Drought hardy; water moderately when dry',
    },
    soil: {
      bn: 'যেকোনো ধরনের দোআঁশ বা লাল মাটি',
      en: 'Hardy in any well-drained loam or red Barind soil',
    },
    plantation: {
      bn: 'ছাদে ১৮-২০ ইঞ্চি হাফ ড্রামে নিয়মিত প্রুনিং করে ঝোপালো আকারে রাখা যায়। ছাদের এক কোণে নিম গাছ রাখলে মশা-মাছি ও ক্ষতিকর পোকা দূরে থাকে।',
      en: 'Grown in 18–20 inch drums pruned to bush height. Natural organic repellent against urban mosquitoes and pests.',
    },
    bloomingSeason: {
      bn: 'চৈত্র – বৈশাখ (বসন্তে সুগন্ধি সাদা ছোট ছোট নিম ফুল ফোটে)',
      en: 'Spring: March – April (Clusters of honey-scented white blooms)',
    },
    harvestSeason: {
      bn: 'সারা বছর ভেষজ নিম পাতা সংগ্রহ করা যায়',
      en: 'Year-round medicinal foliage harvests',
    },
    caringTechniques: {
      bn: 'নিম পাতা সেদ্ধ পানি ঠাণ্ডা করে অন্যান্য গাছে স্প্রে করলে প্রাকৃতিক কীটনাশক হিসেবে দারুণ কাজ করে। গাছ বড় হলে ডাল ছাঁটাই করুন।',
      en: 'Boil neem leaves in water to create a free organic pesticide spray for all other rooftop plants.',
    },
    temperature: '18°C – 42°C',
    petSafe: true,
    image: 'https://images.pexels.com/photos/808510/pexels-photo-808510.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'গ্রাম-বাংলার পরম বন্ধু ও প্রাকৃতিক ডাক্তার। বাতাস বিশুদ্ধ করতে এবং জৈব কীটনাশক তৈরিতে নিম অপরিহার্য।',
      en: 'The legendary village healer of Bengal. Purifies surrounding air and produces sovereign organic insecticide.',
    },
    nutrition: {
      bn: 'বছরে দুবার কম্পোস্ট সার দিলেই যথেষ্ট।',
      en: 'Twice-yearly organic compost top-dressing.',
    },
    pests: ['সাধারণত পোকা লাগে না; প্রাকৃতিক কীটনাশক'],
    proTip: {
      bn: 'আমির আলীর পরামর্শ: ছাদবাগানে রাসায়নিক কীটনাশক পরিহার করে নিম পাতার নির্যাস ও হালকা সাবান পানি ব্যবহার করলে সম্পূর্ণ বিষমুক্ত নিরাপদ ফল ও সবজি পাওয়া যায়।',
      en: 'Amir Ali’s Protocol: Brew fresh neem leaf extract with mild soap water for 100% chemical-free organic pest control.',
    },
  },
]
