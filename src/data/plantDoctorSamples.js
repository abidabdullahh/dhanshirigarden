/**
 * Realistic sample diagnosis cases for the Plant Doctor AI demo.
 * Designed with agronomic accuracy by agricultural standards in Bangladesh.
 */
export const sampleDiagnoses = {
  rose: {
    bn: {
      isPlant: true,
      plantName: 'গোলাপ (Rose Bush)',
      status: 'mild',
      diagnosis: 'পাউডারি মিলডিউ (Powdery Mildew - Oidium sp.)',
      confidence: 'high',
      summary: 'পাতার উপরিভাগে সাদা পাউডারের মতো ছত্রাকের প্রলেপ লক্ষ্য করা গেছে। এটি প্রাথমিক পর্যায়ে রয়েছে এবং দ্রুত জৈব পরিচর্যায় সম্পূর্ণ নিরাময় সম্ভব।',
      causes: [
        'গাছগুলোর মাঝে পর্যাপ্ত আলো-বাতাস চলাচলের অভাব',
        'উষ্ণ দিন ও রাতে অতিরিক্ত আর্দ্রতা (কুয়াশা বা শিশির)',
        'গাছের গোড়ার পরিবর্তে পাতার ওপর সরাসরি পানি ছিটানো',
      ],
      urgency: '২–৩ দিনের মধ্যে ব্যবস্থা নিন',
      treatment: {
        organic: [
          'প্রতি লিটার পানিতে ৫ মি.লি. খাঁটি নিম তেল ও ২ ফোঁটা তরল সাবান মিশিয়ে স্প্রে করুন',
          'আক্রান্ত গুরুতর পাতাগুলো জীবাণুমুক্ত কাঁচি দিয়ে ছেঁটে মাটির নিচে পুঁতে দিন',
          'গাছের গোড়ায় শুকনো কাঠকয়লার গুঁড়া বা সামান্য কাঠের ছাই ছিটিয়ে দিন',
        ],
        chemical: [
          'প্রয়োজনে যেকোনো সালফার-ভিত্তিক বা প্রপিকোনাজল ছত্রাকনাশক অনুমোদিত মাত্রায় সন্ধ্যায় স্প্রে করুন',
        ],
        tools: ['স্প্রে বোতল', 'জীবাণুমুক্ত সিকেটর (কাঁচি)', 'খাঁটি নিম তেল'],
      },
      schedule: [
        { day: 'আজ', action: 'আক্রান্ত পাতা ছাঁটাই এবং প্রথম নিম তেলের স্প্রে প্রয়োগ' },
        { day: '৩য় দিন', action: 'গাছটির আর্দ্রতা পরীক্ষা ও পাতা শুকনো রাখা' },
        { day: '৭ম দিন', action: 'দ্বিতীয় রাউন্ড নিম তেল প্রতিরোধক স্প্রে' },
        { day: '১৪তম দিন', action: 'নতুন কুঁড়ি ও পাতার বৃদ্ধি পর্যবেক্ষণ' },
      ],
      prevention: [
        'গাছের মাঝে পর্যাপ্ত দূরত্ব বজায় রাখুন',
        'সর্বদা ভোরে গাছের গোড়ায় পানি দিন, কখনো সন্ধ্যার পর পাতায় পানি দেবেন না',
        'টবের উপরিভাগের মাটি নিয়মিত হালকা নিড়ানি দিন',
      ],
      needsExpert: false,
    },
    en: {
      isPlant: true,
      plantName: 'Rose Bush',
      status: 'mild',
      diagnosis: 'Powdery Mildew (Oidium sp.)',
      confidence: 'high',
      summary: 'A white powdery fungal coating observed across upper leaf surfaces. Caught in early stages; highly responsive to organic remedies.',
      causes: [
        'Inadequate air circulation around the rose stems',
        'High nocturnal humidity paired with warm daytime temperatures',
        'Overhead leaf watering rather than ground soil watering',
      ],
      urgency: 'Take action within 2-3 days',
      treatment: {
        organic: [
          'Spray 5ml pure cold-pressed neem oil emulsified with mild liquid soap per 1L water',
          'Prune heavily infected leaves with sterilized pruners and dispose away from garden compost',
          'Sprinkle a thin layer of horticultural wood ash around root base',
        ],
        chemical: [
          'If persistent, apply a wettable sulfur or propiconazole fungicide in the evening',
        ],
        tools: ['Pressure spray bottle', 'Sterilized pruning shears', 'Pure neem oil extract'],
      },
      schedule: [
        { day: 'Today', action: 'Prune infected foliage & apply initial neem oil spray' },
        { day: 'Day 3', action: 'Inspect soil moisture and keep foliage completely dry' },
        { day: 'Day 7', action: 'Follow-up second application of protective neem wash' },
        { day: 'Day 14', action: 'Verify clean, healthy new shoot emergence' },
      ],
      prevention: [
        'Ensure open canopy spacing for unhindered airflow',
        'Always water early morning directly at soil level, avoiding wet evening leaves',
        'Lightly aerate topsoil bi-weekly',
      ],
      needsExpert: false,
    },
  },

  tomato: {
    bn: {
      isPlant: true,
      plantName: 'টমেটো গাছ (Tomato Vine)',
      status: 'moderate',
      diagnosis: 'নাবি ধসা বা লেইট ব্লাইট (Late Blight - Phytophthora infestans)',
      confidence: 'high',
      summary: 'পাতার কিনারায় কালচে-বাদামি জলভেজা ছোপ এবং কাণ্ডে ক্ষতচিহ্ন দেখা যাচ্ছে। দ্রুত পদক্ষেপ না নিলে ফল ও সম্পূর্ণ গাছ ক্ষতিগ্রস্ত হতে পারে।',
      causes: [
        'টানা মেঘলা ও অতিরিক্ত স্যাঁতসেঁতে আবহাওয়া',
        'মাটিতে মাত্রাতিরিক্ত আর্দ্রতা ও দুর্বল পানি নিষ্কাশন',
        'পূর্ববর্তী মৌসুমের আক্রান্ত ফসলের অবশিষ্টাংশ',
      ],
      urgency: 'অবিলম্বে (২৪ ঘণ্টার মধ্যে) ব্যবস্থা নিন',
      treatment: {
        organic: [
          'আক্রান্ত অংশ তৎক্ষণাৎ কেটে বাগান থেকে দূরে পুড়িয়ে বা মাটিতে পুঁতে ফেলুন',
          'ট্রাইকোডার্মা ও ট্রাইকো-কম্পোস্ট গাছের গোড়ার মাটিতে মিশিয়ে দিন',
          'বোর্দো মিশ্রণ (কপার সালফেট ও চুন) পাতায় ভালোভাবে স্প্রে করুন',
        ],
        chemical: [
          'তীব্র আক্রমণে ম্যানকোজেব বা মেটালাক্সিল গ্রুপের অনুমোদিত ছত্রাকনাশক স্প্রে করুন',
        ],
        tools: ['সিকেটর বা কাঁচি', 'গার্ডেন গ্লাভস', 'কপার ছত্রাকনাশক'],
      },
      schedule: [
        { day: '১ম দিন', action: 'আক্রান্ত সব পাতা ছাঁটাই ও বোর্ডের স্প্রে' },
        { day: '৪র্থ দিন', action: 'কাণ্ডের ক্ষত পর্যবেক্ষণ ও মাটি শুকনো রাখা' },
        { day: '৮ম দিন', action: 'প্রতিরোধমূলক দ্বিতীয় স্প্রে' },
      ],
      prevention: [
        'ছাদে বা টবে বৃষ্টির জমে থাকা পানি দ্রুত নিষ্কাশন করুন',
        'গাছের গোড়ার নিচের দিকের পাতা ৩-৪ ইঞ্চি পর্যন্ত পরিষ্কার রাখুন',
        'রোগমুক্ত উন্নত জাতের বীজ ও চারা ব্যবহার করুন',
      ],
      needsExpert: true,
    },
    en: {
      isPlant: true,
      plantName: 'Tomato Vine',
      status: 'moderate',
      diagnosis: 'Late Blight (Phytophthora infestans)',
      confidence: 'high',
      summary: 'Irregular dark water-soaked lesions across leaves and developing stem cankers. Prompt action required to prevent fruit contamination.',
      causes: [
        'Prolonged humid overcast monsoon or winter dew periods',
        'Poor container drainage or saturated soil root zone',
        'Fungal spores carried through splashing water',
      ],
      urgency: 'Action required within 24 hours',
      treatment: {
        organic: [
          'Carefully prune out infected foliage and burn/bury away from garden',
          'Incorporate Trichoderma viride bio-fungicide into topsoil',
          'Spray Bordeaux copper mixture evenly across leaves and stems',
        ],
        chemical: [
          'In severe infections, apply Mancozeb or Metalaxyl according to label precautions',
        ],
        tools: ['Pruning shears', 'Protective gloves', 'Copper-based fungicide'],
      },
      schedule: [
        { day: 'Day 1', action: 'Prune infected vines and apply copper fungicidal wash' },
        { day: 'Day 4', action: 'Assess lesion borders and check drainage' },
        { day: 'Day 8', action: 'Secondary protective spray application' },
      ],
      prevention: [
        'Ensure planter boxes have free-flowing drainage holes',
        'Prune bottom 6-8 inches of leaves to prevent soil splash transmission',
        'Select certified disease-resistant tomato varieties',
      ],
      needsExpert: true,
    },
  },

  moneyPlant: {
    bn: {
      isPlant: true,
      plantName: 'মানিপ্ল্যান্ট (Golden Pothos)',
      status: 'mild',
      diagnosis: 'অতিরিক্ত পানিজনিত শিকড় পচন ও নাইট্রোজেন ঘাটতি',
      confidence: 'high',
      summary: 'পাতার কিনারা নরম হয়ে হলুদ হচ্ছে এবং নতুন পাতার বৃদ্ধি থেমে গেছে। এটি প্রধানত টবের তলায় বদ্ধ পানি এবং অত্যধিক ঘন ঘন পানি দেওয়ার ফল।',
      causes: [
        'টবের নিচে ড্রেনেজ ছিদ্র বন্ধ থাকা',
        'মাটি শুকানোর আগেই বারবার পানি দেওয়া',
        'পর্যাপ্ত পরোক্ষ উজ্জ্বল আলোর অভাব',
      ],
      urgency: 'আগামী ৩–৪ দিনের মধ্যে মাটি সংশোধন করুন',
      treatment: {
        organic: [
          'পানি দেওয়া সাময়িকভাবে বন্ধ রাখুন এবং টবের মাটি ২-৩ ইঞ্চি পর্যন্ত শুকাতে দিন',
          'গাছটি বের করে কালো নরম পচা শিকড়গুলো কেটে ফেলুন এবং নতুন হালকা সয়েল মিক্সে প্রতিস্থাপন করুন',
          '১ গ্রাম এপসম সল্ট ও সামান্য ভার্মিকম্পোস্ট টি মিশিয়ে স্প্রে করুন',
        ],
        chemical: ['প্রয়োজন নেই; প্রাকৃতিক পদ্ধতিতে গাছটি দ্রুত সতেজ হবে'],
        tools: ['নতুন হালকা পটিং মিক্স', 'হ্যান্ড ট্রোয়েল', 'পরিচ্ছন্ন টব'],
      },
      schedule: [
        { day: '১ম দিন', action: 'পানি দেওয়া বন্ধ এবং টবের ড্রেনেজ পরিষ্কার করা' },
        { day: '৩য় দিন', action: 'মাটি শুকিয়ে এলে হালকা নিড়ানি দেওয়া' },
        { day: '৭ম দিন', action: 'পরোক্ষ উজ্জ্বল আলোতে রাখা এবং সামান্য পানি দেওয়া' },
      ],
      prevention: [
        'কেবলমাত্র উপরের ২ ইঞ্চি মাটি শুকালে তবেই পানি দিন',
        'টবের নিচে ট্রে-তে জমে থাকা অতিরিক্ত পানি সাথে সাথে ফেলে দিন',
        'বছরে অন্তত দুইবার হালকা কম্পোস্ট সার প্রয়োগ করুন',
      ],
      needsExpert: false,
    },
    en: {
      isPlant: true,
      plantName: 'Golden Pothos / Money Plant',
      status: 'mild',
      diagnosis: 'Overwatering Induced Root Suffocation & Chlorosis',
      confidence: 'high',
      summary: 'Yellowing limp lower leaves with slowed vegetative growth. Primary diagnostic cause is waterlogged potting substrate and blocked aeration.',
      causes: [
        'Clogged drainage holes in indoor planter pot',
        'Frequent watering before the soil layer has aerated',
        'Dim, stagnant indoor light conditions',
      ],
      urgency: 'Dry out root zone over next 3-4 days',
      treatment: {
        organic: [
          'Cease all watering immediately until top 2 inches of potting mix dries',
          'Trim mushy blackened roots and repot into fresh porous potting mix containing perlite/cocopeat',
          'Apply diluted compost tea or light Epsom salt foliar mist',
        ],
        chemical: ['Not required; strictly cultural and hydration adjustments'],
        tools: ['Aerated potting mix', 'Hand trowel', 'Clean ventilated container'],
      },
      schedule: [
        { day: 'Day 1', action: 'Halt irrigation & inspect bottom container drainage' },
        { day: 'Day 3', action: 'Gently aerate upper soil layer' },
        { day: 'Day 7', action: 'Relocate to bright indirect natural light & resume minimal hydration' },
      ],
      prevention: [
        'Always follow the finger-soil moisture test before watering',
        'Empty drainage drip trays within 15 minutes of watering',
        'Feed with light organic liquid fertilizer during active growing periods',
      ],
      needsExpert: false,
    },
  },

  citrus: {
    bn: {
      isPlant: true,
      plantName: 'কাগজি লেবু (Citrus Lemon)',
      status: 'moderate',
      diagnosis: 'লেবুর লিফ মাইনার ও ক্যাংকার (Leaf Miner & Citrus Canker)',
      confidence: 'high',
      summary: 'কচি পাতা কোঁকড়ানো এবং পাতার ভেতরে রুপালি আঁকাবাঁকা সুড়ঙ্গের মতো দাগ দেখা যাচ্ছে। কিছু পাতায় সামান্য ক্যাংকার ব্রাউন স্পট তৈরি হচ্ছে।',
      causes: [
        'কচি পাতার বৃদ্ধির সময় লিফ মাইনার পোকার লার্ভার আক্রমণ',
        'বৃষ্টি বা পানির ফোঁটার মাধ্যমে জ্যান্থোমোনাস ব্যাকটেরিয়ার বিস্তার',
        'পূর্বে আক্রান্ত পাতা ছাঁটাই না করা',
      ],
      urgency: '৪–৫ দিনের মধ্যে প্রতিকারমূলক ব্যবস্থা নিন',
      treatment: {
        organic: [
          'বেশি কোঁকড়ানো ও সুড়ঙ্গযুক্ত আক্রান্ত ডগাগুলো হাত দিয়ে ছেঁটে ফেলুন',
          'নিম তেলের সাথে হালকা সাবান পানি বা নিমের খোল ভেজানো পানি স্প্রে করুন',
          'তাম্রযুক্ত জৈব ছত্রাকনাশক বা বোর্দো পেস্ট কাণ্ডের গোড়ায় লাগিয়ে দিন',
        ],
        chemical: [
          'তীব্র উপদ্রবে ইমিডাক্লোপ্রিড গ্রুপের অনুমোদিত বালাইনাশক প্রতি লিটারে ০.৫ মি.লি. হারে বিকেলে স্প্রে করুন',
        ],
        tools: ['সিকেটর বা ধারালো কাঁচি', 'ভালো মানের স্প্রেয়ার', 'বোর্দো পেস্ট'],
      },
      schedule: [
        { day: '১ম দিন', action: 'আক্রান্ত কচি পাতা ছাঁটাই এবং নিম তেল স্প্রে' },
        { day: '৫ম দিন', action: 'নতুন কুঁড়ি পর্যবেক্ষণ' },
        { day: '১০ম দিন', action: 'প্রতিরোধমূলক তাম্র স্প্রে প্রয়োগ' },
      ],
      prevention: [
        'নতুন পাতার বৃদ্ধির শুরুতে নিয়মিত নিম তেল প্রতিরোধক স্প্রে রাখুন',
        'গাছে অতিরিক্ত নাইট্রোজেন সার দেওয়া থেকে বিরত থাকুন (যা ক্ষতিকর পোকাকে আকর্ষণ করে)',
        'গাছের গোড়া সর্বদা পরিষ্কার ও আগাছামুক্ত রাখুন',
      ],
      needsExpert: false,
    },
    en: {
      isPlant: true,
      plantName: 'Citrus / Lemon Tree',
      status: 'moderate',
      diagnosis: 'Citrus Leaf Miner (Phyllocnistis citrella) & Early Canker',
      confidence: 'high',
      summary: 'Characteristic silvery meandering serpentine mines on fresh flush leaves, with leaf curling and scattered necrotic spots.',
      causes: [
        'Moth larvae tunneling between leaf cuticle layers on tender new flushes',
        'Secondary bacterial entry through mechanical wound tracks',
        'High humidity during seasonal new leaf emergence',
      ],
      urgency: 'Treat within 4-5 days to preserve flower bud set',
      treatment: {
        organic: [
          'Hand-prune severely curled mined tender shoots to disrupt life cycle',
          'Apply cold-pressed neem oil (5ml/L) directly coating young flushes at dusk',
          'Apply copper sulfate paste onto main scaffold branches',
        ],
        chemical: [
          'If heavy commercial infestation, apply systemic Imidacloprid (0.5ml/L) as directed',
        ],
        tools: ['Clean bypass pruners', 'Precision garden sprayer', 'Copper Bordeaux paste'],
      },
      schedule: [
        { day: 'Day 1', action: 'Prune deformed tip shoots & spray protective neem oil' },
        { day: 'Day 5', action: 'Inspect new vegetative flush margins' },
        { day: 'Day 10', action: 'Secondary botanical barrier application' },
      ],
      prevention: [
        'Time neem applications right at early flush emergence before larvae enter leaf',
        'Avoid excessive synthetic nitrogen spurts that produce vulnerable soft shoots',
        'Keep tree base free of fallen leaf debris and weeds',
      ],
      needsExpert: false,
    },
  },
}
