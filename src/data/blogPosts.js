/**
 * Comprehensive Blog Posts for Dhanshiri Garden (ধানসিঁড়ি গার্ডেন).
 * Tailored with deep agronomy analyses from the Bangladeshi perspective:
 * - Soil composition (দোআঁশ মাটি, ভার্মিকম্পোস্ট, কোকোপিট, নিম খোল)
 * - 3-tier drainage to protect against Dhaka monsoon waterlogging
 * - Roof concrete waterproofing & weight load distribution
 * - Bermuda carpet grass vs Philippine grass in BD climate
 * - Seasonal pest management (জৈব বালাইনাশক, মিলিবাগ, ছত্রাক দমন)
 * 
 * Maintained and automatically updated by scripts/generate-blog.mjs
 */

export const blogCategories = [
  { id: 'all', bn: 'সকল পরামর্শ', en: 'All Guides' },
  { id: 'rooftop', bn: 'ছাদবাগান ও ড্রেইনেজ', en: 'Rooftop & Drainage' },
  { id: 'lawn', bn: 'লন ও কার্পেট ঘাস', en: 'Lawn & Carpet Grass' },
  { id: 'plantCare', bn: 'রোগবালাই ও উদ্ভিদ পুষ্টি', en: 'Pests & Plant Nutrition' },
  { id: 'fruits', bn: 'ফলদ ও ঔষধি গাছ', en: 'Fruits & Medicinal' },
]

export const blogPosts = [
  {
    slug: "dhaka-winter-rooftop-vegetables-guide",
    date: "2026-10-27",
    category: "rooftop",
    readTime: 6,
    featuredImage: "seedlingTrays",
    meta: {
      "keywords": [
            "শীতকালীন সবজি চাষ ছাদবাগান",
            "টবে টমেটো ও ক্যাপসিকাম চাষ ঢাকা",
            "শীতের ছাদবাগান পরিচর্যা",
            "winter rooftop vegetables Dhaka",
            "container tomato strawberry Bangladesh"
      ]
},
    bn: {
      "title": "কার্তিক ও অগ্রহায়ণে ঢাকার ছাদে শীতকালীন সবজি চাষের সুবর্ণ প্রস্তুতি ও ফলন বৃদ্ধির নিয়ম",
      "categoryLabel": "ছাদবাগান ও ড্রেইনেজ",
      "summary": "টমেটো, ব্রকলি, ক্যাপসিকাম ও স্ট্রবেরির চারা রোপণের সঠিক সময়, পোকার আক্রমণ থেকে কচি চারা রক্ষা এবং দোআঁশ-ভার্মিকম্পোস্টের পুষ্টি শিডিউল।",
      "tags": [
            "শীতকালীন সবজি",
            "ছাদবাগান",
            "টমেটো চাষ",
            "স্ট্রবেরি",
            "আমির আলী"
      ],
      "author": "জনাব আমির আলী",
      "authorRole": "প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন",
      "sections": [
            {
                  "heading": "১. শীতের শুরুর আবহাওয়া ও চারা রোপণের মোক্ষম সময়",
                  "content": "কার্তিক মাসের মাঝামাঝি (অক্টোবরের শেষ ও নভেম্বর) থেকে ঢাকায় রাতের তাপমাত্রা কমতে শুরু করে এবং বাতাসে আর্দ্রতা হ্রাস পায়। এটিই শীতকালীন শাকসবজি ও বিদেশী ফলদ চারা লাগানোর শ্রেষ্ঠ সময়। বীজতলায় উৎপাদিত চারা যখন ৪-৫ পাতার হবে (২০-২৫ দিন বয়স), তখনই টবে বা গ্রোব্যাগে স্থানান্তর করতে হবে।",
                  "bulletPoints": [
                        "চারা রোপণের জন্য সবসময় পড়ন্ত বিকেল বেছে নিন, যাতে সারারাত কুয়াশার ঠাণ্ডায় শিকড় মাটিতে প্রতিষ্ঠিত হতে পারে।",
                        "টমেটো ও বেগুনের জন্য কমপক্ষে ১২-১৪ ইঞ্চি টব এবং ব্রকলি-ক্যাপসিকামের জন্য ১০-১২ ইঞ্চি টব যথেষ্ট।",
                        "কচি চারার গোড়ায় অতিরিক্ত রোদ লাগলে প্রথম ৩ দিন হালকা শেড বা সবুজ নেট ব্যবহার করুন।"
                  ]
            },
            {
                  "heading": "২. শীতের সবজির জন্য মাটির পুষ্টি মিশ্রণ",
                  "content": "শীতের সবজির জীবনকাল স্বল্প (৬০ থেকে ৯০ দিন), তাই মাটিতে তাৎক্ষণিক শোষণযোগ্য পুষ্টি উপাদান থাকতে হবে।",
                  "bulletPoints": [
                        "৫০% দোআঁশ মাটি + ৩৫% ভার্মিকম্পোস্ট + ১০% কোকোপিট + ৫% কাঠের ছাই ও হাড়ের গুঁড়া।",
                        "কাঠের ছাই মাটিকে পটাশিয়াম সরবরাহ করে এবং মাটির ক্ষতিকর ছত্রাক ও পোকা দূর করে।",
                        "টবের মাটিতে ট্রাইকোডার্মা গুঁড়া মিশিয়ে দিলে কচি চারার গোড়া পচা রোগ (Damping off) শূন্যে নেমে আসে।"
                  ],
                  "expertTip": "টমেটো চারার ডালপালা বড় হলে নিচের ১ ফুট অংশের সব পাতা ছেঁটে দিন। এতে মাটির আর্দ্রতা থেকে ছত্রাক পাতায় উঠতে পারে না এবং ফলন ৩০% বৃদ্ধি পায়।"
            },
            {
                  "heading": "৩. নিয়মিত কুয়াশা ও পোকা থেকে সুরক্ষা",
                  "content": "ঘন কুয়াশায় পাতায় ছত্রাকের আক্রমণ বাড়ে। প্রতি ১৫ দিন অন্তর ম্যানকোজেব ছত্রাকনাশক (২ গ্রাম/লিটার) ভোরে স্প্রে করুন এবং জাবপোকা দেখা দিলে তাৎক্ষণিক সাবান-পানি বা নিম তেলের স্প্রে দিন।"
            }
      ],
      "faq": [
            {
                  "q": "টবের স্ট্রবেরি গাছে ফল বড় হয় না কেন?",
                  "a": "স্ট্রবেরি অগভীর শিকড়ের গাছ। এদের জন্য চওড়া তবে কম গভীর টব উপযুক্ত। গাছে ফল ধরার পর মাটির ওপরে খড় বা শুকনো পাতা বিছিয়ে (মালচিং) দিন যাতে ফল মাটিতে লেগে পচে না যায়।"
            },
            {
                  "q": "ক্যাপসিকামের ফুল ঝরে যাওয়া কিভাবে ঠেকাবেন?",
                  "a": "রাতে তাপমাত্রা অতিরিক্ত কমে গেলে বা দিনে রোদ কম পেলে ফুল ঝরতে পারে। সকালের পূর্ণ রোদযুক্ত স্থানে রাখুন এবং লিটার প্রতি ১ মিলি বোরন স্প্রে করুন।"
            }
      ]
},
    en: {
      "title": "Winter Rooftop Vegetable Gardening in Dhaka: Soil Prep, Sowing Schedule & High-Yield Tips",
      "categoryLabel": "Rooftop & Drainage",
      "summary": "Detailed cultivation protocols for heirloom tomatoes, bell peppers, broccoli, and strawberries in urban containers under Bangladesh winter climate conditions.",
      "tags": [
            "Winter Vegetables",
            "Rooftop Garden",
            "Container Tomato",
            "Strawberry",
            "Amir Ali"
      ],
      "author": "Mr. Amir Ali",
      "authorRole": "Founder & Chief Agronomy Consultant, Dhanshiri Garden",
      "sections": [
            {
                  "heading": "1. Optimal Seasonal Timing and Transplanting Protocol",
                  "content": "As ambient night temperatures drop across Dhaka from late October, soil respiration slows and seedling vigor peaks. When nursery seedlings develop 4 to 5 true leaves (approx. 22 days old), transplant them into well-aerated rooftop containers.",
                  "bulletPoints": [
                        "Always transplant saplings during late afternoon so root hairs absorb nocturnal moisture.",
                        "Container volume: Minimum 12-14 inches diameter for tomatoes, 10 inches for bell peppers.",
                        "Provide lightweight shade net during the initial 72 hours to prevent transplant shock."
                  ]
            },
            {
                  "heading": "2. High-Octane Organic Soil Preparation",
                  "content": "Winter cole crops possess brief 60 to 90-day production cycles requiring immediate biologically available nutrition.",
                  "bulletPoints": [
                        "50% Virgin Silt Loam + 35% Aged Vermicompost + 10% Washed Cocopeat + 5% Horticultural Hardwood Ash & Steamed Bone Meal.",
                        "Hardwood ash supplies natural potassium to drive blossom development.",
                        "Incorporate Trichoderma viride bio-inoculant into potting soil to prevent seedling damping-off."
                  ],
                  "expertTip": "Strip all lower foliage up to 12 inches on indeterminate tomato vines. This prevents soil-borne fungal spores from splashing onto foliage during irrigation."
            },
            {
                  "heading": "3. Fog Humidity Mitigation & Organic Pest Protection",
                  "content": "Prolonged winter morning fog invites powdery mildew and aphid colonization. Apply copper-based organic protectants and neem emulsified teas at early signs."
            }
      ],
      "faq": [
            {
                  "q": "Why do container strawberries rot before ripening?",
                  "a": "Strawberry fruit must never rest directly on wet soil. Spread clean straw or dry shredded leaves beneath crowns as organic mulch to keep ripening berries suspended and dry."
            },
            {
                  "q": "How to arrest premature blossom drop on container bell peppers?",
                  "a": "Ensure a minimum of 6 hours of direct solar exposure and apply foliar chelated boron at 1g per liter prior to flower opening."
            }
      ]
},
  },

  {
    slug: 'dhaka-rooftop-soil-mix-drainage-filter-guide',
    date: '2026-10-25',
    category: 'rooftop',
    readTime: 6,
    featuredImage: 'soilPouring',
    meta: {
      keywords: [
        'ছাদবাগান মাটি তৈরি',
        'টবের ড্রেইনেজ ফিল্টার ঢাকা',
        'ছাদের মাটি প্রস্তুত প্রণালী',
        'rooftop soil mix Dhaka',
        'terrace drainage Bangladesh',
        'ভার্মিকম্পোস্ট ও কোকোপিট অনুপাত',
      ],
    },
    bn: {
      title: 'ঢাকার ছাদবাগানে দীর্ঘস্থায়ী মাটি প্রস্তুত ও ড্রেইনেজ ফিল্টার তৈরির পূর্ণাঙ্গ নির্দেশিকা',
      categoryLabel: 'ছাদবাগান ও ড্রেইনেজ',
      summary: 'অতিবৃষ্টিতে টবে পানি জমে শিকড় পচন রোধ ও ছাদের কংক্রিট সুরক্ষিত রাখতে দোআঁশ মাটি, ভার্মিকম্পোস্ট ও কোকোপিটের বৈজ্ঞানিক অনুপাত এবং ৩-স্তরের ড্রেইনেজ কৌশল।',
      tags: ['ছাদবাগান', 'মাটি প্রস্তুত', 'ড্রেইনেজ', 'ঢাকা'],
      author: 'জনাব আমির আলী',
      authorRole: 'প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন',
      sections: [
        {
          heading: '১. ঢাকার সাধারণ কাদা মাটি ব্যবহারের ঝুঁকি',
          content: 'আমাদের কাছে পরামর্শ চাইতে আসা সিংহভাগ ছাদবাগানির প্রথম ভুলটি হলো সাধারণ খেতের বা বিলের এঁটেল-কাদা মাটি দিয়ে টব ভর্তি করা। ঢাকার তীব্র গ্রীষ্মে (৪০° সে.) এই মাটি শুকিয়ে ইটের মতো শক্ত হয়ে যায়, ফলে গাছের কৈশিক শিকড় ফেটে যায়। আবার আষাঢ়-শ্রাবণের টানা বর্ষণে এই মাটি অতিরিক্ত পানি ধরে রেখে কাদার মতো জমে থাকে, যার ফলে শিকড়ে বাতাস চলাচল বন্ধ হয়ে “রুট রট” বা শিকড় পচা রোগ সৃষ্টি হয়।',
          bulletPoints: [
            'সাধারণ এঁটেল মাটি শিকড়ের অক্সিজেন চলাচল সম্পূর্ণ রুদ্ধ করে দেয়।',
            'টবের ওজন অযাচিতভাবে বৃদ্ধি করে, যা ছাদের কাঠামোগত সুরক্ষার জন্য ঝুঁকিপূর্ণ।',
            'শুকিয়ে গেলে টবের ধার থেকে মাটি সংকুচিত হয়ে ফাঁক তৈরি হয়, পানি দিলে সরাসরি বের হয়ে যায়।',
          ],
        },
        {
          heading: '২. আদর্শ হালকা ও পুষ্টিকর মাটির বৈজ্ঞানিক অনুপাত',
          content: 'ধানসিঁড়ি গার্ডেনের ৩০ বছরের অভিজ্ঞতা অনুযায়ী, ছাদের টব বা হাফ-ড্রামের জন্য মাটি হবে হালকা, বাতাস চলাচলক্ষম এবং স্পঞ্জের মতো আর্দ্রতা ধরে রাখতে সক্ষম।',
          bulletPoints: [
            '৪০% ঝরঝরে নদীর পলিযুক্ত দোআঁশ মাটি (চালা বা পরিষ্কার করা)।',
            '৩০% উন্নতমানের ভার্মিকম্পোস্ট বা কেঁচো সার (জৈব কার্বন ও জীবাণু সক্রিয়তার জন্য)।',
            '২০% ধোয়া কোকোপিট বা কোকো-ডাস্ট (মাটি হালকা রাখা ও শিকড়ের আর্দ্রতা ধরে রাখার জন্য)।',
            '৫% লাল মোটা বালু বা সিলেট বালু (দ্রুত পানি নিষ্কাশনের জন্য)।',
            '৫% নিম খোল, হাড়ের গুঁড়া ও শিং কুচির মিশ্রণ (প্রাকৃতিক নাইট্রোজেন, ফসফরাস ও মাটির পোকা প্রতিরোধী)।',
          ],
          expertTip: 'টবে ব্যবহারের আগে মাটি, ভার্মিকম্পোস্ট ও কোকোপিট একসাথে মিশিয়ে সামান্য পানি ছিটিয়ে ছায়াযুক্ত স্থানে ৭-১০ দিন পলিথিন দিয়ে ঢেকে রাখুন। একে বলা হয় "মাটি শোধন বা কিউরিং", যা মাটির উপকারী ব্যাক্টেরিয়া বৃদ্ধি করে।',
        },
        {
          heading: '৩. ৩-স্তরের ড্রেইনেজ ফিল্টার তৈরির সঠিক পদ্ধতি',
          content: 'টবের নিচের ছিদ্র বন্ধ হওয়া ছাদবাগানের সবচেয়ে বড় শত্রু। ৩-স্তরের ড্রেইনেজ ফিল্টার নিশ্চিত করলে ৫০ বছর পুরনো টবেও পানি জমবে না।',
          bulletPoints: [
            'স্তর ১ (তলার স্তর): টবের ড্রেইনেজ হোলের ওপর উল্টো করে মাটির ভাঙা চাড়া বা টাইলসের টুকরো বসান, এরপর ১.৫ ইঞ্চি ইটের খোয়া বা সুরকি দিন।',
            'স্তর ২ (ফিল্টার স্তর): খোয়ার ওপরে ১ ইঞ্চি সিলেট বালু অথবা এক টুকরো নন-ওভেন জিওটেক্সটাইল কাপড় বিছিয়ে দিন, যাতে ওপরের মাটি চুইয়ে নিচে ড্রেইনেজ বন্ধ না করে।',
            'স্তর ৩ (মধ্যম স্তর): ১ ইঞ্চি নারিকেলের ছোবড়া বা শুষ্ক কাঠকয়লা দিন, যা অতিরিক্ত পানি শুষে নেবে ও ক্ষতিকর ছত্রাক দূর করবে।',
          ],
        },
        {
          heading: '৪. ছাদের মেঝে সুরক্ষিত রাখার নিয়ম',
          content: 'কখনোই টব সরাসরি ছাদের মেঝের ওপর বসাবেন না। টবের তলা ছাদের সাথে লেগে থাকলে মেঝেতে শ্যাওলা ধরে, পানি জমে ছাদ চুইয়ে সিলিং নষ্ট হতে পারে। সর্বদা ৩ ইঞ্চি উঁচু ইট বা মেটাল স্ট্যান্ড ব্যবহার করুন।',
        },
      ],
      faq: [
        {
          q: 'টবের মাটি কতদিন পরপর পরিবর্তন করা উচিত?',
          a: 'সম্পূর্ণ মাটি পরিবর্তনের প্রয়োজন হয় না। বছরে একবার (বিশেষত শরৎ বা শীতের শুরুতে) টবের ওপরের ২-৩ ইঞ্চি মাটি আলতো করে তুলে সেখানে নতুন ভার্মিকম্পোস্ট, নিম খোল ও হাড়ের গুঁড়া দিয়ে ভরাট করে দিলেই গাছ নতুন শক্তি পায়।',
        },
        {
          q: 'কোকোপিটের বদলে কাঠের গুঁড়া ব্যবহার করা যাবে কি?',
          a: 'না। কাঁচা কাঠের গুঁড়া পচনের সময় মাটি থেকে সব নাইট্রোজেন টেনে নেয়, ফলে গাছের পাতা হলুদ হয়ে যায় এবং ক্ষতিকর উইপোকা আকৃষ্ট হয়। সর্বদা ভালো মানের ওয়াশড কোকোপিট ব্যবহার করুন।',
        },
      ],
    },
    en: {
      title: 'Ultimate Guide to Rooftop Garden Soil Mix & 3-Tier Drainage Filter in Dhaka',
      categoryLabel: 'Rooftop & Drainage',
      summary: 'Prevent root rot from torrential monsoon downpours and safeguard roof concrete structural integrity with scientific loam-vermicompost ratios and 3-stage filtration.',
      tags: ['Rooftop Garden', 'Soil Preparation', 'Drainage', 'Dhaka'],
      author: 'Mr. Amir Ali',
      authorRole: 'Founder & Chief Agronomy Consultant, Dhanshiri Garden',
      sections: [
        {
          heading: '1. The Danger of Using Heavy Native Clay on Rooftops',
          content: 'The most frequent mistake urban gardeners make in Dhaka is loading rooftop pots with dense agricultural clay. Under 40°C summer heat, this soil turns hard as brick, tearing delicate feeder roots. During monsoon rains, it retains excess water, suffocating root respiration and causing lethal Pythium root rot.',
          bulletPoints: [
            'Dense clay cuts off critical root oxygen supply.',
            'Adds dangerous dead-weight load onto residential building slabs.',
            'Shrinks away from pot rims when dry, allowing irrigation water to escape without quenching roots.',
          ],
        },
        {
          heading: '2. The Scientific Lightweight Soil Formula',
          content: 'With 30 years of field agronomy across Bangladesh, Dhanshiri Garden recommends a lightweight, aeration-optimized substrate formula.',
          bulletPoints: [
            '40% Sieved River Silt Loam (clean and weed-free).',
            '30% Premium Earthworm Vermicompost (for biological microbial activity).',
            '20% Washed Cocopeat / Coir pith (for moisture equilibrium and weight reduction).',
            '5% Coarse Red Sylhet Sand (to guarantee rapid gravitational drainage).',
            '5% Organic Neem Cake, Bone Meal & Horn Meal (for slow-release phosphorus and soil pest defense).',
          ],
          expertTip: 'Always cure the blended soil mix under shade for 7 to 10 days with light moisture before potting. This activates vital mycorrhizal fungi and beneficial microbes.',
        },
        {
          heading: '3. Constructing the 3-Tier Drainage Filter',
          content: 'Clogged drainage holes are the primary killer of containerized trees. Our 3-tier system keeps root zones well-aerated for years.',
          bulletPoints: [
            'Tier 1 (Base): Cover drainage hole with an arched terracotta shard, followed by 1.5 inches of washed brick chips (khoa).',
            'Tier 2 (Filter membrane): Layer 1 inch of Sylhet coarse sand or non-woven geotextile fabric to prevent potting soil from washing into the base.',
            'Tier 3 (Buffer): Add 1 inch of seasoned coconut husk fiber or horticultural charcoal chunks to neutralize pathogens.',
          ],
        },
        {
          heading: '4. Protecting Roof Waterproofing & Structural Slabs',
          content: 'Never position planter pots directly onto the roof surface. Trapped moisture deteriorates waterproof bitumen and creates ceiling dampness. Always mount pots on 3-inch elevated metal stands or brick pedestals.',
        },
      ],
      faq: [
        {
          q: 'How frequently should rooftop potting soil be refreshed?',
          a: 'You do not need to discard all the soil. Once a year (ideally before winter planting in October/November), gently loosen and remove the top 2-3 inches of soil and backfill with fresh vermicompost, bone meal, and neem cake.',
        },
        {
          q: 'Can raw sawdust be substituted for cocopeat?',
          a: 'No. Raw sawdust undergoes microbial decomposition that robs soil of nitrogen, turning leaves yellow and attracting subterranean termites. Always use washed, desalted cocopeat.',
        },
      ],
    },
  },

  {
    slug: 'bermuda-carpet-grass-lawn-care-bangladesh-climate',
    date: '2026-10-20',
    category: 'lawn',
    readTime: 5,
    featuredImage: 'mowerClose',
    meta: {
      keywords: [
        'কার্পেট ঘাস বাংলাদেশ',
        'বারমুডা ঘাস লন পরিচর্যা',
        'ঘাসের লন তৈরি ঢাকা',
        'carpet grass lawn Bangladesh',
        'Bermuda grass care Dhaka Naogaon',
        'লনের মোথা ঘাস দমন',
      ],
    },
    bn: {
      title: 'বাংলাদেশে বারমুডা কার্পেট ঘাসের লন তৈরি ও বছরব্যাপী পরিচর্যার বৈজ্ঞানিক কৌশল',
      categoryLabel: 'লন ও কার্পেট ঘাস',
      summary: 'ঢাকার আর্দ্র আবহাওয়া এবং নওগাঁ-রাজশাহীর তীব্র খরায় টেকসই সবুজ লন তৈরি, আগাছা দমন, লেভেলিং ও রোলার ব্যবহারের সঠিক সময়সূচি।',
      tags: ['কার্পেট ঘাস', 'লন পরিচর্যা', 'বারমুডা ঘাস', 'নওগাঁ', 'ঢাকা'],
      author: 'জনাব আমির আলী',
      authorRole: 'প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন',
      sections: [
        {
          heading: '১. বাংলাদেশে কোন কার্পেট ঘাসটি সেরা?',
          content: 'বাংলাদেশে বহুল ব্যবহৃত ঘাসের মধ্যে বারমুডা গ্রাস (Cynodon dactylon) এবং জাপানিজ বা ফিলিপাইন কার্পেট গ্রাস অন্যতম। আমাদের আবহাওয়ায় যেখানে বর্ষায় একটানা বৃষ্টি এবং গ্রীষ্মে প্রচণ্ড দাবদাহ থাকে, সেখানে বারমুডা ঘাস সবচেয়ে সহনশীল। এটি তীব্র রোদ সহ্য করতে পারে, গভীর শিকড় তৈরি করে এবং মানুষের হাঁটাচলাতেও নষ্ট হয় না।',
          bulletPoints: [
            'বারমুডা ঘাস: পূর্ণ রোদে সবচেয়ে দ্রুত বাড়ে, খরা সহনশীল এবং টেকসই।',
            'জাপানিজ কার্পেট ঘাস: ঘন ভেলভেটের মতো দেখতে, তবে আংশিক ছায়া ও অতিরিক্ত পানি পছন্দ করে।',
            'সিলেকশন ড্রাফট: ছায়াযুক্ত স্থানে সাধারণ কার্পেট ঘাস না লাগিয়ে ছাদ বা ব্যালকনিতে অলটারনেটিভ গ্রাউন্ডকভার লাগানো শ্রেয়।',
          ],
        },
        {
          heading: '২. মাটি প্রস্তুত ও লেভেলিং (সবচেয়ে গুরুত্বপূর্ণ ধাপ)',
          content: 'লন তৈরির ক্ষেত্রে মাটির লেভেলিংয়ে ১ ইঞ্চি অসমানতা থাকলেও সেখানে পানি জমে ঘাস পচে বাদামী হয়ে যাবে। জমি থেকে পুরাতন সব আগাছা শিকড়সহ তুলে মাটির সাথে ৫০% বালুমাটি ও ভার্মিকম্পোস্ট মিশিয়ে কমপক্ষে ৫০ কেজি রোলার দিয়ে শক্ত ও সমান করতে হয়।',
          bulletPoints: [
            'মাটির পিএইচ (pH) ৬.০ থেকে ৭.০-এর মধ্যে রাখা আদর্শ।',
            'জমিকে মাঝখান থেকে চারদিকে ১-২ ডিগ্রি ঢালু রাখা উচিত যাতে বৃষ্টির পানি সহজেই ড্রেনে নেমে যায়।',
            'ঘাসের কার্পেট বসানোর পর প্রথম ২১ দিন প্রতিদিন সকালে হালকা কুয়াশা স্প্রে আকারে পানি দিতে হবে।',
          ],
          expertTip: 'কার্পেট ঘাস বসানোর পর কখনোই হোসপাইপের তীব্র পানির তোড়ে সেচ দেবেন না। এতে মাটির স্তর ধসে লনের লেভেল নষ্ট হয়ে যায়। স্প্রিংকলার বা শাওয়ার নোজল ব্যবহার করুন।',
        },
        {
          heading: '৩. আগাছা (বিশেষত মোথা ঘাস) দমন ও ছাঁটাই (Mowing)',
          content: 'লনের প্রধান শত্রু হলো সাইপেরাস বা মোথা ঘাস এবং দূর্বা ঘাসের জট। ঘাস প্রতি ১৫-২০ দিন অন্তর ১.৫ থেকে ২ ইঞ্চি উচ্চতায় কাটতে হবে। ১/৩ নিয়মের বেশি ঘাস কখনোই একবারে কাটা উচিত নয়, নতুবা ঘাসের কাণ্ড রোদে পুড়ে হলুদ হয়ে যায়।',
        },
      ],
      faq: [
        {
          q: 'লনের ঘাস হলুদ হয়ে যাওয়ার প্রধান কারণ কী?',
          a: 'প্রধান দুটি কারণ: ১) মাটির নিচে পানি জমে শিকড় পচে যাওয়া (ড্রেইনেজ সমস্যা), অথবা ২) নাইট্রোজেনের ঘাটতি। বর্ষার পর ইউরিয়া ও ভার্মিকম্পোস্টের হালকা টপ ড্রেসিং দিলে ৭ দিনের মধ্যে লন আবার গাঢ় সবুজ রূপ ধারণ করে।',
        },
        {
          q: 'ছায়াযুক্ত বারান্দা বা ছাদে কার্পেট ঘাস বাঁচবে কি?',
          a: 'কার্পেট ঘাসের প্রতিদিন কমপক্ষে ৫-৬ ঘণ্টা সরাসরি রোদ প্রয়োজন। ভবনের ছায়ায় ঘাস পাতলা হয়ে মারা যাবে। সেক্ষেত্রে কৃত্রিম অ্যাস্ট্রোটার্ফ বা ছায়াপ্রিয় ফার্ন ব্যবহার করাই উত্তম।',
        },
      ],
    },
    en: {
      title: 'Scientific Bermuda Carpet Grass Lawn Installation & Year-Round Care in Bangladesh',
      categoryLabel: 'Lawn & Carpet Grass',
      summary: 'Professional guidance for creating lush golf-course quality lawns in Dhaka & Naogaon: soil grading, roller compaction, mowing schedules, and weed elimination.',
      tags: ['Carpet Grass', 'Lawn Care', 'Bermuda Grass', 'Naogaon', 'Dhaka'],
      author: 'Mr. Amir Ali',
      authorRole: 'Founder & Chief Agronomy Consultant, Dhanshiri Garden',
      sections: [
        {
          heading: '1. Selecting the Ideal Turfgrass for Bangladesh Climate',
          content: 'Among turf varieties in Bangladesh, Bermuda Grass (Cynodon dactylon) stands supreme over Japanese or Philippine grass for durability. It tolerates prolonged monsoon humidity, withstands extreme summer heat in Dhaka and the Barind tract of Naogaon, and possesses exceptional self-repair capability against foot traffic.',
          bulletPoints: [
            'Bermuda Grass: Exceptional heat & drought resistance, aggressive rhizomes.',
            'Japanese Carpet: Luxurious velvet texture, but requires consistent irrigation and partial shelter.',
            'Shade caveat: No natural turf flourishes without at least 5 hours of direct solar exposure.',
          ],
        },
        {
          heading: '2. Sub-base Grading and Roller Compaction',
          content: 'Even a 1-inch dip in lawn grade traps standing water, leading to localized yellow blight. Proper subgrade preparation requires deep tilling, amending with 50% coarse silt sand, and rolling with a 50kg turf roller to prevent surface undulations.',
          bulletPoints: [
            'Maintain optimal soil pH between 6.0 and 7.0.',
            'Grade with a subtle 1-2% slope away from building foundations toward perimeter drains.',
            'Irrigate newly laid sod rolls twice daily with fine mist for the first 21 days until roots anchor.',
          ],
          expertTip: 'Never blast newly installed turf sod with high-pressure hose jets. The hydraulic impact displaces root contacts and ruins smooth lawn levels. Use rotary oscillating sprinklers.',
        },
        {
          heading: '3. Weed Suppression (Nut Grass) and Mowing Protocols',
          content: 'Maintain turf height between 1.5 and 2.0 inches with regular bi-weekly trims. Never violate the "one-third rule": never remove more than 1/3 of the grass blade in a single mowing session, or crown shock will cause sun scalding.',
        },
      ],
      faq: [
        {
          q: 'Why is my carpet lawn developing yellow patchy circles?',
          a: 'The two chief culprits are sub-soil waterlogging (poor internal drainage) and acute nitrogen depletion. A balanced top dressing of sifted vermicompost with a light touch of urea restores vibrant emerald color within 7-10 days.',
        },
        {
          q: 'Can natural carpet grass thrive on shaded apartment terraces?',
          a: 'No. Bermuda and carpet turf require 5 to 6 hours of unshaded sunlight daily. For deeply shaded courtyards, ornamental ground covers like Mondo Grass or premium artificial turf are recommended.',
        },
      ],
    },
  },

  {
    slug: 'seasonal-plant-disease-pest-control-bangladesh',
    date: '2026-10-15',
    category: 'plantCare',
    readTime: 7,
    featuredImage: 'tomatoGreenhouse',
    meta: {
      keywords: [
        'গাছের মিলিবাগ দমন',
        'ছাদবাগানে ছত্রাক রোগ',
        'লেবুর পাতা হলুদ ও কোঁকড়ানো',
        'plant disease pest control Bangladesh',
        'mealybug treatment neem oil Dhaka',
        'ড্রাগন ফলের ছত্রাকনাশক',
      ],
    },
    bn: {
      title: 'বর্ষা ও শীত মৌসুমে ছাদবাগানের প্রধান রোগবালাই ও পরিবেশবান্ধব জৈব সমাধান',
      categoryLabel: 'রোগবালাই ও উদ্ভিদ পুষ্টি',
      summary: 'লেবু, ড্রাগন ও ফুলের গাছে মিলিবাগ, সাদা মাছি, ডাই-ব্যাক ও ছত্রাকের আক্রমণ প্রতিরোধে ঘরোয়া ও জৈব বালাইনাশকের সঠিক ব্যবহার পদ্ধতি।',
      tags: ['উদ্ভিদ চিকিৎসা', 'মিলিবাগ দমন', 'জৈব বালাইনাশক', 'ছত্রাকনাশক', 'আমির আলী'],
      author: 'জনাব আমির আলী',
      authorRole: 'প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন',
      sections: [
        {
          heading: '১. ছাদবাগানের ১ নম্বর শত্রু: তুলার মতো সাদা মিলিবাগ (Mealybug)',
          content: 'হিবিস্কাস (জবা), পেঁপে, লেবু, অপরাজিতা ও বেগুন গাছে সাদা তুলার মতো পোকার আক্রমণ ছাদবাগানীদের সবচেয়ে বড় মাথাব্যথা। এই পোকা গাছের কচি ডালের রস চুষে খায় এবং মিষ্টি তরল (হানিডিউ) নিঃসরণ করে, যার ফলে পাতায় কালো সুটিমোল্ড ছত্রাক জন্মে।',
          bulletPoints: [
            'প্রাথমিক লক্ষণ: পাতার নিচে ও ডগায় সাদা সাদা তুলার দলা দেখা দেওয়া।',
            'প্রাকৃতিক শিকারী: পিঁপড়া এই পোকাকে ছড়িয়ে দেয়, তাই টবের চারধারে লক্ষ্মণরেখা বা নিম খোল ছিটান।',
            'জৈব স্প্রে তৈরি: ১ লিটার হালকা গরম পানিতে ৫ মিলি নিম তেল + ২ মিলি তরল ডিশওয়াশ বা শ্যাম্পু মিশিয়ে জোরে ঝাঁকিয়ে স্প্রে করুন।',
          ],
        },
        {
          heading: '২. অতিরিক্ত বৃষ্টি ও শীতের কুয়াশায় ছত্রাকজনিত রোগ (Damping-off & Die-back)',
          content: 'বর্ষায় বা কার্তিক মাসের ঘন কুয়াশায় গোলাপ ও ড্রাগন গাছের ডাল আগা থেকে কালো হয়ে শুকিয়ে আসা (ডাই-ব্যাক) খুব পরিচিত সমস্যা। এটি এক ধরনের ছত্রাকজনিত রোগ। আক্রান্ত অংশ সুস্থ সবুজ অংশের ১ ইঞ্চি নিচ থেকে জীবাণুমুক্ত ধারালো কাটার দিয়ে কেটে সেখানে ছত্রাকনাশকের প্রলেপ দিন।',
          bulletPoints: [
            'কাটা অংশে মেনকোজেব (যেমন রিডোমিল গোল্ড বা সাফ) অথবা হলুদের গুঁড়ার ঘন পেস্ট লাগিয়ে দিন।',
            'মাটিতে ট্রাইকোডার্মা ভিরিডি (Trichoderma) জৈব ছত্রাকনাশক মিশিয়ে দিলে শিকড়ের গোড়া পচা রোধ হয়।',
            'গাছের গোড়ায় কখনোই রাত বা বিকেলে পানি দেবেন না; সবসময় ভোরে পানি দিন যাতে দিনের আলোয় পাতার আর্দ্রতা শুকিয়ে যায়।',
          ],
          expertTip: 'গাছে ফুল ও ফল আসার সময় রাসায়নিক কীটনাশক স্প্রে করবেন না। এতে পরাগায়নকারী মৌমাছি ও উপকারী পোকা মারা যায়, ফলে ফল ঝরে পড়ে। একান্ত প্রয়োজনে বায়ো-কীটনাশক বিকেলে প্রয়োগ করুন।',
        },
        {
          heading: '৩. কাগজী লেবু ও মাল্টার পাতা কোঁকড়ানো (Leaf Miner) প্রতিকার',
          content: 'কচি পাতার ভেতরে শুঁয়োপোকা আঁকাবাঁকা রুপালী রেখা তৈরি করে এবং পাতা কুঁকড়ে যায়। কচি পাতা গজানোর সাথে সাথেই প্রতি ১০ দিন পরপর নিম তেলের স্প্রে প্রয়োগ করলে পোকা ডিম পাড়তে পারে না।',
        },
      ],
      faq: [
        {
          q: 'কীটনাশক বা নিম তেল কি কড়া রোদে স্প্রে করা যাবে?',
          a: 'কখনোই না! সকাল ১০টা থেকে বিকাল ৪টার মধ্যে তীব্র রোদে তেল বা ওষুধ স্প্রে করলে পাতার রন্ধ্র বন্ধ হয়ে সানবার্ন বা পাতা পুড়ে যাবে। সর্বদা পড়ন্ত বিকেলে (সূর্যাস্তের ১ ঘণ্টা আগে) স্প্রে করুন।',
        },
        {
          q: 'আমাদের ধানসিঁড়ি এআই উদ্ভিদ ডাক্তার কীভাবে সাহায্য করতে পারে?',
          a: 'আপনার আক্রান্ত পাতার একটি পরিষ্কার ক্লোজ-আপ ছবি তুলে আমাদের ওয়েবসাইটের “উদ্ভিদ ডাক্তার” ফিচারে আপলোড করুন। এআই তাৎক্ষণিক রোগ শনাক্ত করে চিকিৎসা ব্যবস্থাপনার সুনির্দিষ্ট পরামর্শ প্রদান করবে।',
        },
      ],
    },
    en: {
      title: 'Monsoon & Winter Plant Disease Management: Organic Remedies for Bangladesh Rooftops',
      categoryLabel: 'Pests & Plant Nutrition',
      summary: 'Practical organic protocols to eliminate mealybugs, whiteflies, die-back fungus, and citrus leaf miners on rooftop fruit and ornamental plants.',
      tags: ['Plant Doctor', 'Mealybug Control', 'Organic Pesticide', 'Fungicide', 'Amir Ali'],
      author: 'Mr. Amir Ali',
      authorRole: 'Founder & Chief Agronomy Consultant, Dhanshiri Garden',
      sections: [
        {
          heading: '1. Neutralizing White Cottony Mealybugs (Pseudococcidae)',
          content: 'Mealybugs are the most prevalent pest attacking urban Hibiscus, Citrus, Papaya, and ornamental creepers in Dhaka. By sucking sap from tender terminals, they excrete sticky honeydew that fosters black sooty mold fungus.',
          bulletPoints: [
            'Symbiotic association: Black ants herd mealybugs; dust neem cake or horticultural chalk around pot perimeters to deter ant vectors.',
            'Organic emulsified recipe: Combine 5ml cold-pressed pure neem oil + 2ml gentle biodegradable liquid soap into 1 liter warm water, shake vigorously, and spray directly onto clusters.',
            'Mechanical knockdown: For heavy infestations, knock off egg masses with a pressurized water jet before oil application.',
          ],
        },
        {
          heading: '2. Combating Monsoon Fungal Die-Back & Root Rot',
          content: 'Persistent overcast humidity triggers fungal Die-Back in roses and cactus/dragonfruit stems. Cut affected stems 1 inch into clean green wood using alcohol-sanitized shears and seal the wound.',
          bulletPoints: [
            'Seal pruned wounds immediately with organic turmeric paste or a copper oxychloride / Mancozeb slurry.',
            'Incorporate Trichoderma viride bio-fungicide into root soil to biologically outcompete pathogenic Pythium fungi.',
            'Never water foliage late in the evening; always irrigate during morning hours to facilitate foliage drying.',
          ],
          expertTip: 'Never spray synthetic broad-spectrum insecticides during peak bloom. It decimates essential pollinators like bees and hoverflies, causing sudden blossom drop.',
        },
        {
          heading: '3. Citrus Leaf Miner (Phyllocnistis citrella) Mitigation',
          content: 'Serpentine silvery tracks on young lemon foliage indicate leaf miner larvae tunneling inside leaf tissue. Spray cold-pressed neem oil during new flush emergence every 10 days to deter adult egg-laying moths.',
        },
      ],
      faq: [
        {
          q: 'Can neem oil spray be applied under direct midday sunshine?',
          a: 'Never. Applying oils under intense sun between 10 AM and 4 PM induces phototoxicity and severe leaf burn. Always spray during late dusk hours.',
        },
        {
          q: 'How does Dhanshiri Garden’s AI Plant Doctor tool assist?',
          a: 'Snap a clear photo of the symptomatic leaf and upload it to the "Plant Doctor" section on our website. It instantly analyzes the pathogen pattern and provides tailored agronomic guidance.',
        },
      ],
    },
  },

  {
    slug: 'best-fruit-plants-for-dhaka-rooftop-gardens',
    date: '2026-10-10',
    category: 'fruits',
    readTime: 6,
    featuredImage: 'balconyPlant',
    meta: {
      keywords: [
        'ছাদবাগানে ড্রাগন ফল চাষ',
        'টবে বারি মাল্টা ১ চাষ',
        'ছাদের জন্য সেরা ফলদ গাছ',
        'rooftop fruit gardening Dhaka',
        'best fruits for container terrace Bangladesh',
        'কাগজী লেবু টবে চাষ',
      ],
    },
    bn: {
      title: 'ঢাকার ছাদবাগানে টবে সফলভাবে ফলদ গাছ চাষের পূর্ণাঙ্গ নির্বাচন ও পুষ্টি নির্দেশিকা',
      categoryLabel: 'ফলদ ও ঔষধি গাছ',
      summary: 'বারি মাল্টা-১, থাই কাটিমন আম, ডার্ক রেড ড্রাগন ফল ও এলাচি লেবুর কলম নির্বাচন, হাফ ড্রাম সাইজ ও জৈব সারের মাসিক শিডিউল।',
      tags: ['ফলদ বাগান', 'ড্রাগন ফল', 'বারি মাল্টা', 'ছাদবাগান', 'আমির আলী'],
      author: 'জনাব আমির আলী',
      authorRole: 'প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন',
      sections: [
        {
          heading: '১. ছাদের সীমিত পরিসরে কোন ফলের জাতগুলো বেশি ফলন দেয়?',
          content: 'ছাদবাগানে সাধারণ বীজ থেকে হওয়া গাছ লাগালে ৫ বছরেও ফল পাওয়া যায় না এবং গাছের আকার ছাদের জন্য অতিরিক্ত বড় হয়ে যায়। সর্বদা জোড়কলম (Grafted) অথবা গুটি কলমের বিশ্বস্ত মাতৃগাছের চারা নির্বাচন করতে হবে।',
          bulletPoints: [
            'বারি মাল্টা-১: বাংলাদেশের জলবায়ুর জন্য সবচেয়ে সফল মিষ্টি মাল্টা। ছোট গাছেও প্রচুর ফল ধরে।',
            'থাই কাটিমন ও বানানা ম্যাঙ্গো: বারোমাসি মিষ্টি জাত, যা হাফ ড্রামে চমৎকার ফলন দেয়।',
            'রেড ভেলভেট ড্রাগন ফল: প্রচণ্ড রোদ ভালোবাসে, পানি কম লাগে এবং বছরে ৫-৬ বার ফল সংগ্রহ করা যায়।',
            'কলম্বো ও এলাচি লেবু: নিয়মিত ভিটামিন সি সরবরাহের জন্য প্রতিটি ছাদবাগানের অপরিহার্য উপাদান।',
          ],
        },
        {
          heading: '২. টবের আকার ও ড্রামের মাপ নির্বাচন',
          content: 'লেবু ও ডালিম গাছের জন্য ১৮-২০ ইঞ্চি মাটির বা প্লাস্টিকের টব যথেষ্ট হলেও ড্রাগন, আম ও মাল্টা গাছের জন্য ১০০ লিটারের হাফ ড্রাম অথবা সিমেন্টের স্থায়ী প্ল্যান্টার প্রয়োজন। ছোট টবে মূল শিকড় প্যাঁচিয়ে গেলে (Root bound) ফল আসা চিরতরে বন্ধ হয়ে যায়।',
        },
        {
          heading: '৩. ফল ঝরা রোধ ও ফুল আসার পূর্বে পুষ্টি ব্যবস্থাপনা',
          content: 'অনেকেই অভিযোগ করেন গাছের সব ফুল ঝরে পড়ে ফল দাঁড়ায় না। এর প্রধান কারণ অতিরিক্ত নাইট্রোজেন (কাঁচা গোবর বা অতিরিক্ত ইউরিয়া) প্রয়োগ। গাছে যখন নতুন কুঁড়ি আসবে, তখন নাইট্রোজেন বন্ধ করে পটাশ ও বোরন স্প্রে করতে হবে।',
          bulletPoints: [
            'সরিষার খোল পচানো তরল সার মাসে একবার পাতলা করে (১ ভাগ খোল পানি + ১০ ভাগ সাধারণ পানি) প্রয়োগ করুন।',
            'ফুল ফোটার পূর্বে লিটার প্রতি ২ গ্রাম চিলেটেড জিংক ও বোরন স্প্রে করলে গুটি ঝরা ৯০% কমে যায়।',
            'মাটির আর্দ্রতা সমান রাখুন—ফুল থাকা অবস্থায় মাটি অতিরিক্ত ভেজানো বা খটখটে শুকানো দুটোই ফুল ঝরার কারণ।',
          ],
          expertTip: 'নওগাঁয় আমাদের নিজস্ব নার্সারিতে ৩০ বছরের অভিজ্ঞতায় আমরা সেরা মাতৃগাছের ভেরিফাইড কলম চারা উৎপাদন করি। সঠিক চারার নির্বাচনই ছাদবাগানের সাফল্যের ৫০% নির্ধারণ করে।',
        },
      ],
      faq: [
        {
          q: 'ড্রাগন ফলের টবে কি কংক্রিটের পিলার দেওয়া জরুরি?',
          a: 'হ্যাঁ। ড্রাগন ক্যাকটাস জাতীয় ভারী লতানো গাছ। গাছের মাঝখানে একটি শক্ত কংক্রিট পিলার বা জিআই পাইপ দিয়ে ওপরে বাইসাইকেলের টায়ার বা রিং বেঁধে দিতে হবে, যাতে শাখাগুলো চারদিকে ছড়িয়ে ছাতার মতো ঝুলতে পারে।',
        },
        {
          q: 'ছাদে গাছ বেশি হলে ছাদের কোনো ক্ষতি হবে কি?',
          a: 'সঠিক পরিকল্পনা ও হালকা মাটি (দোআঁশ + ভার্মি + কোকোপিট) ব্যবহার করলে কোনো ক্ষতি হয় না। ভারী ড্রামগুলো ছাদের মূল বিম ও কলামের ওপর স্থাপন করতে হয়, ছাদের মধ্যভাগে নয়।',
        },
      ],
    },
    en: {
      title: 'Top Performing Fruit Trees for Dhaka Container Terraces: Selection & Nutrition Guide',
      categoryLabel: 'Fruits & Medicinal',
      summary: 'Complete guide for BARI Malta-1, Thai Katimon Mango, Red Dragonfruit, and Colombo Lime in rooftop containers: drum sizing and organic flowering schedules.',
      tags: ['Fruit Trees', 'Dragonfruit', 'BARI Malta', 'Rooftop Orchard', 'Amir Ali'],
      author: 'Mr. Amir Ali',
      authorRole: 'Founder & Chief Agronomy Consultant, Dhanshiri Garden',
      sections: [
        {
          heading: '1. Recommended Dwarf & High-Yield Cultivars for Bangladesh',
          content: 'Seedling fruit trees take 5+ years to fruit and develop unruly canopies unsuitable for urban roof slabs. Always secure true-to-type certified grafted (approach or cleft) saplings from mature scion stock.',
          bulletPoints: [
            'BARI Malta-1: The undisputed champion sweet citrus for Bangladesh rooftops with consistent heavy yields.',
            'Thai Katimon & Banana Mango: Reliable all-season dwarf mango varieties thriving in 100-liter containers.',
            'Red Velvet Dragonfruit: Thrives in blazing Dhaka summer sun, drought resilient, yielding 5-6 flushes per season.',
            'Seedless Colombo Lemon: Year-round prolific producer of aromatic vitamin C rich lemons.',
          ],
        },
        {
          heading: '2. Container Volume & Structural Placement',
          content: 'While pomegranate and citrus manage well in 18-20 inch planters, mango and dragonfruit require 100-liter halved food-grade drums or built-in masonry planters. Always align heavy planters directly over structural load-bearing building columns and perimeter beams, never in the flexible center of floor slabs.',
        },
        {
          heading: '3. Blossom Drop Prevention & Micronutrient Sprays',
          content: 'The primary reason blossoms abort without setting fruit is excessive nitrogen (raw manure) causing vegetative flush instead of fruit set. During flower bud swell, switch to potassium and boron supplements.',
          bulletPoints: [
            'Apply well-fermented mustard cake liquid tea monthly, diluted at 1:10 ratio with freshwater.',
            'Foliar spray chelated Zinc (1g/L) and Boron (1.5g/L) two weeks prior to anthesis to strengthen floral ovaries.',
            'Maintain uniform substrate moisture: fluctuating between waterlogged mud and dry drought triggers instant blossom abortion.',
          ],
          expertTip: 'Dhanshiri Garden cultivates verified scion mother-stock at our extensive production nursery in Naogaon. Planting genuine clonal genetics accounts for 50% of your rooftop orchard success.',
        },
      ],
      faq: [
        {
          q: 'Are concrete support trellis posts mandatory for rooftop dragonfruit?',
          a: 'Yes. Dragonfruit produces heavy succulent cladodes that require a central 4-inch reinforced concrete post topped with an automobile tire support ring to allow branches to drape gracefully for flowering.',
        },
        {
          q: 'Will hundreds of pots damage the structural strength of a residential roof?',
          a: 'Not if engineered lightweight substrate (40% loam + 30% vermicompost + 20% cocopeat) is utilized, and planters are positioned above primary structural columns. Dhanshiri Garden offers structural garden layout audits.',
        },
      ],
    },
  },
]

export const getLatestBlogPosts = (limit = 6) => {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit)
}

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find((p) => p.slug === slug)
}
