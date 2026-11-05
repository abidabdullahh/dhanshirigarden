/**
 * Dhanshiri Garden — Comprehensive Landscape Architecture Project Portfolio
 * Covers all 9 specialized engineering categories requested:
 * 1. Residential Gardens (আবাসিক বাগান ও টেরেস)
 * 2. Corporate Landscapes (কর্পোরেট গ্রিনিং ও হেডকোয়ার্টার্স)
 * 3. Lawn & Turf (লন ও কার্পেট ঘাস)
 * 4. Vertical Gardens (বায়োফিলিক গ্রিন ওয়াল ও লিভিং আর্ট)
 * 5. Curtain Creeper (কার্টেন ক্রিপার সবুজ পর্দা)
 * 6. Bamboo Wall (প্রাকৃতিক বাঁশের প্রাচীর ও ফেন্সিং)
 * 7. Trench & Drainage (ফ্রেঞ্চ ড্রেন ও গ্রিন চ্যানেল)
 * 8. Hardscape & Pavers (হার্ডস্কেপ, স্টোন প্যাসেজ ও ওয়াকওয়ে)
 * 9. Waterbody & Fountain (ওয়াটারবডি, লোটাস পন্ড ও ফোয়ারা)
 */

export const PROJECT_TYPES = [
  { id: 'all', label: { bn: 'সকল প্রজেক্ট', en: 'All Projects' } },
  { id: 'residential', label: { bn: 'আবাসিক বাগান', en: 'Residential' } },
  { id: 'corporate', label: { bn: 'কর্পোরেট গ্রিনিং', en: 'Corporate' } },
  { id: 'lawn', label: { bn: 'লন ও কার্পেট ঘাস', en: 'Lawn & Turf' } },
  { id: 'vertical', label: { bn: 'ভার্টিক্যাল গার্ডেন', en: 'Vertical Garden' } },
  { id: 'curtain', label: { bn: 'কার্টেন ক্রিপার', en: 'Curtain Creeper' } },
  { id: 'bamboo', label: { bn: 'বাঁশের প্রাচীর', en: 'Bamboo Wall' } },
  { id: 'trench', label: { bn: 'ড্রেনেজ ও ট্রেঞ্চ', en: 'Trench & Drainage' } },
  { id: 'hardscape', label: { bn: 'হার্ডস্কেপ ও পেভার্স', en: 'Hardscape' } },
  { id: 'waterbody', label: { bn: 'ওয়াটারবডি ও ফোয়ারা', en: 'Waterbody & Pond' } },
]

export const PROJECTS_DATA = [
  // 1. Residential: Gulshan Diplomatic Residence Rooftop
  {
    id: 'gulshan-residence-rooftop',
    type: 'residential',
    title: {
      bn: 'গুলশান লেকভিউ এস্টেট — বায়োফিলিক ছাদবাগান ও সিটিং লাউঞ্জ',
      en: 'Gulshan Lakeview Estate — Biophilic Rooftop Sanctuary',
    },
    location: { bn: 'গুলশান-২, ঢাকা', en: 'Gulshan-2, Dhaka' },
    area: '২,৮০০ বর্গফুট (2,800 sq ft)',
    completionTime: '২১ কার্যদিবস (21 Days)',
    client: { bn: 'ব্যক্তিগত বিলাসবহুল বাসস্থান', en: 'Private Luxury Residence' },
    photoMain: 'https://images.pexels.com/photos/2962019/pexels-photo-2962019.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/19053055/pexels-photo-19053055.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'ছাদের স্ল্যাবের লোড-শেয়ারিং ব্যালান্স করে লাইটওয়েট গ্রোয়িং মিডিয়া, পারগোলা, সুবাসিত ফুল ও কাটিমন আমের ফ্রুট জোন স্থাপন।',
      en: 'Engineered lightweight growing media, timber pergola, fragrant floral borders, and Katimon mango fruit orchard with zero slab leakage.',
    },
    deliverables: {
      bn: ['৭-লেয়ার ওয়াটারপ্রুফিং', 'ড্রেন সেল ও জিওটেক্সটাইল মেমব্রেন', 'অটোমেটেড ড্রিপ ইরিগেশন', 'আমির আলী সয়েল প্রেসক্রিপশন'],
      en: ['7-Layer Elastomeric Waterproofing', 'Drain Cells & Geotextile Membrane', 'Automated Micro-Drip System', 'DAE Calibrated Organic Media'],
    },
  },

  // 2. Corporate: Bashundhara Corporate HQ Green Oasis
  {
    id: 'bashundhara-corporate-hq',
    type: 'corporate',
    title: {
      bn: 'বসুন্ধরা কনকর্ড টাওয়ার — কর্পোরেট টেরেস ওয়েলনেস পার্ক',
      en: 'Bashundhara Concord Tower — Corporate Terrace Wellness Park',
    },
    location: { bn: 'বসুন্ধরা আবাসিক এলাকা, ঢাকা', en: 'Bashundhara R/A, Dhaka' },
    area: '৪,২০০ বর্গফুট (4,200 sq ft)',
    completionTime: '২৮ কার্যদিবস (28 Days)',
    client: { bn: 'শীর্ষস্থানীয় বহুজাতিক গ্রুপ', en: 'Multinational Corporate HQ' },
    photoMain: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/4162016/pexels-photo-4162016.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'কর্মীদের মানসিক প্রশান্তির জন্য ওপেন-এয়ার ক্যাফেটেরিয়া জোন সংলগ্ন গ্রিন লাউঞ্জ ও এয়ার-পিউরিফাইং গাছগাছালি।',
      en: 'Biophilic open-air terrace garden integrated with an executive breakout lounge and high-efficiency air-purifying foliage.',
    },
    deliverables: {
      bn: ['কর্টেন স্টিল প্ল্যান্টার বক্স', 'শব্দ নিরোধক গ্রিন বাফার', 'স্মার্ট টাইমার স্প্রিংকলার', 'বাৎসরিক এএমসি মেইনটেন্যান্স'],
      en: ['Corten Steel Planter Arrays', 'Acoustic Foliage Buffers', 'Smart Timer Sprinklers', 'Annual Maintenance Contract'],
    },
  },

  // 3. Lawn: Banani Private Villa Korean Velvet Lawn
  {
    id: 'banani-villa-korean-lawn',
    type: 'lawn',
    title: {
      bn: 'বনানী পার্ক লেন ভিলা — কোরিয়ান ভেলভেট কার্পেট লন',
      en: 'Banani Park Lane Villa — Korean Velvet Carpet Turf Lawn',
    },
    location: { bn: 'বনানী রোড ১১, ঢাকা', en: 'Banani Road 11, Dhaka' },
    area: '৩,৫০০ বর্গফুট (3,500 sq ft)',
    completionTime: '১৪ কার্যদিবস (14 Days)',
    client: { bn: 'ভিলা ও ব্যক্তিগত এস্টেট', en: 'Private Luxury Villa' },
    photoMain: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'মাটি শোধন করে ৪ ইঞ্চি সিলিকা স্যান্ড ও কম্পোস্ট বেস বিছিয়ে ১০০% প্রি-রুট কোরিয়ান ভেলভেট ঘাস রোল স্থাপন।',
      en: 'Subsoil sterilization with 4-inch river sand and organic compost grading, laid with 100% genuine sodded Korean velvet turf.',
    },
    deliverables: {
      bn: ['লেভেলিং ও লেজার স্লোপ গ্র্যাডিং', 'সাব-সারফেস ফ্রেঞ্চ ড্রেন', 'হান্টার পপ-আপ রোটারি স্প্রিংকলার', 'প্রথম ৩ মাস ফ্রি কাটাই ও সার'],
      en: ['Laser-Grade Slope Leveling', 'Sub-Surface French Drains', 'Hunter Pop-Up Rotary Heads', '3 Months Complimentary Care'],
    },
  },

  // 4. Vertical Garden: Dhanmondi Modern Residence Living Wall
  {
    id: 'dhanmondi-vertical-garden',
    type: 'vertical',
    title: {
      bn: 'ধানমন্ডি লেকভিউ পেন্টহাউস — স্মার্ট বায়োফিলিক গ্রিন ওয়াল',
      en: 'Dhanmondi Lakefront Penthouse — Living Bio-Wall',
    },
    location: { bn: 'ধানমন্ডি ৮/এ, ঢাকা', en: 'Dhanmondi 8/A, Dhaka' },
    area: '৬৫০ বর্গফুট উল্লম্ব প্রাচীর (650 sq ft Wall)',
    completionTime: '১০ কার্যদিবস (10 Days)',
    client: { bn: 'পেন্টহাউস রেসিডেন্স', en: 'Penthouse Residence' },
    photoMain: 'https://images.pexels.com/photos/34968591/pexels-photo-34968591.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'ইউভি-স্টেবিলাইজড মডুলার পকেট ও ভার্টিক্যাল ড্রিপ লাইনে ফিলোরেন্ডন, ফার্ন ও মনস্টেরা সমন্বয়ে জীবন্ত শিল্পকর্ম।',
      en: 'UV-stabilized modular pocket framework featuring Philodendron, Sword Ferns, and Monstera with internal closed-loop fertigation.',
    },
    deliverables: {
      bn: ['মডুলার জিও-ফ্যাব্রিক ফ্রেম', 'ক্লোজড-লুপ রি-সার্কুলেটিং ড্রিপ', 'অ্যালার্জি-মুক্ত উদ্ভিদ নির্বাচন', 'ব্যাকলিট আরজিবি ওয়ার্ম লাইটিং'],
      en: ['Modular Geo-Fabric Cells', 'Automated Closed-Loop Drip', 'Hypoallergenic Plant Palette', 'Integrated Architectural Backlight'],
    },
  },

  // 5. Curtain Creeper: Uttara Sector 4 Cantilever Curtain Creeper
  {
    id: 'uttara-curtain-creeper',
    type: 'curtain',
    title: {
      bn: 'উত্তরা আধুনিক ড্রুপিং কার্টেন ক্রিপার ব্যালকনি স্ক্রিন',
      en: 'Uttara Architectural Hanging Curtain Creeper Veil',
    },
    location: { bn: 'উত্তরা সেক্টর ৪, ঢাকা', en: 'Uttara Sector 4, Dhaka' },
    area: '১৮০ ফুট লিনিয়ার ব্যালকনি (180 linear ft)',
    completionTime: '৭ কার্যদিবস (7 Days)',
    client: { bn: 'মাল্টি-স্টোরি অ্যাপার্টমেন্ট', en: 'Multi-Family Apartment' },
    photoMain: 'https://images.pexels.com/photos/10812796/pexels-photo-10812796.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/2180803/pexels-photo-2180803.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'ছাদের কার্নিশ প্ল্যান্টার থেকে ভার্নোনিয়া কার্টেন ক্রিপার ঝুলিয়ে প্রাকৃতিক সবুজ পর্দা সৃষ্টি ও অভ্যন্তরীণ তাপমাত্রা হ্রাস।',
      en: 'Engineered cantilever planter troughs cultivating Vernonia elaegnifolia draping 25 feet down the façade, slashing solar heat gain.',
    },
    deliverables: {
      bn: ['হালকা ফাইবারগ্লাস ট্রাফ প্ল্যান্টার', 'কন্টিনিউয়াস ড্রিপ লাইন', 'বাতাস নিরোধক টেনশন ওয়্যার', 'সহজ ক্লিপিং ও গ্রুমিং গাইড'],
      en: ['Lightweight Planter Troughs', 'Continuous Drip Irrigation', 'Wind-Resistant Tension Cables', 'Pruning & Shaping Guide'],
    },
  },

  // 6. Bamboo Wall: Purbachal Country House Natural Bamboo Wall
  {
    id: 'purbachal-bamboo-wall',
    type: 'bamboo',
    title: {
      bn: 'পূর্বাচল ইকো ফার্মহাউস — ট্রিটেড বাঁশের প্রাচীর ও গ্রিন ফেন্সিং',
      en: 'Purbachal Eco Villa — Treated Bamboo Wall & Green Fencing',
    },
    location: { bn: 'পূর্বাচল সেক্টর ২১, ঢাকা', en: 'Purbachal Sector 21, Dhaka' },
    area: '৪৫০ লিনিয়ার ফুট (450 Linear ft)',
    completionTime: '১২ কার্যদিবস (12 Days)',
    client: { bn: 'কান্ট্রি হাউস ও উইকেন্ড ভিলা', en: 'Weekend Retreat Villa' },
    photoMain: 'https://images.pexels.com/photos/8678769/pexels-photo-8678769.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/19053055/pexels-photo-19053055.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'ঘুণ ও আর্দ্রতারোধক কেমিক্যাল ট্রিটমেন্টকৃত পাকা বাঁশ এবং লাইভ ব্যাম্বু গ্রোভের সমন্বয়ে প্রাকৃতিক সীমানা প্রাচীর।',
      en: 'Pressure-treated borate seasoned structural bamboo coupled with live Golden Bamboo hedges for organic privacy borders.',
    },
    deliverables: {
      bn: ['১০ বছর অ্যান্টি-টারমাইট গ্যারান্টি', 'মরিচারোধক জিআই ক্লাম্প ও ফ্রেম', 'ন্যাচারাল অয়েল ফিনিশ', 'নাইট স্পটলাইট ইনস্টলেশন'],
      en: ['10-Year Anti-Termite Guarantee', 'Hot-Dipped Galvanized Steel Framing', 'Eco Natural Tung Oil Sealer', 'LED In-Ground Wash Lighting'],
    },
  },

  // 7. Trench: Gazipur Farmhouse French Drain & Bio-Swale Trench
  {
    id: 'gazipur-trench-drainage',
    type: 'trench',
    title: {
      bn: 'গাজীপুর রিসোর্ট এস্টেট — ফ্রেঞ্চ ড্রেন ও রেইন ওয়াটার ট্রেঞ্চ চ্যানেল',
      en: 'Gazipur Estate — Engineered French Drain & Bioswale Trench',
    },
    location: { bn: 'জয়দেবপুর, গাজীপুর', en: 'Joydebpur, Gazipur' },
    area: '৬০০ ফুট ড্রেনেজ চ্যানেল (600 ft Channel)',
    completionTime: '১৬ কার্যদিবস (16 Days)',
    client: { bn: 'রিসোর্ট ও ফার্মহাউস এস্টেট', en: 'Resort & Farmhouse Estate' },
    photoMain: 'https://images.pexels.com/photos/145685/pexels-photo-145685.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/4162016/pexels-photo-4162016.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'বর্ষায় জলাবদ্ধতা দূর করতে পারফোরেটেড পিভিসি পাইপ, জিওটেক্সটাইল ফিল্টার ও নদীজ নুড়িপাথরের দৃষ্টিনন্দন ট্রেঞ্চ খনন।',
      en: 'Perforated corrugated drainage pipes encapsulated in non-woven geotextile and river gravel, preventing monsoon standing water.',
    },
    deliverables: {
      bn: ['ভারী বর্ষণে শূন্য জলাবদ্ধতা', 'গ্রাউন্ডওয়াটার রিচার্জ পিট', 'নুড়িপাথর শোভিত ওয়াক সারফেস', 'স্যান্ড ট্র্যাপ ইন্টারসেপ্টর'],
      en: ['Zero Monsoon Water-logging', 'Aquifer Recharge Pit', 'River Pebble Decorative Top', 'Sediment Silt-Trap Inlets'],
    },
  },

  // 8. Hardscape: Baridhara Diplomatic Zone Natural Pavers & Hardscape
  {
    id: 'baridhara-hardscape-pavers',
    type: 'hardscape',
    title: {
      bn: 'বারিধারা ডিপ্লোমেটিক জোন — ন্যাচারাল স্টোন পেভার্স ও ল্যান্ডস্কেপ প্যাসেজ',
      en: 'Baridhara Diplomatic Enclave — Natural Stone Pavers & Walkway',
    },
    location: { bn: 'বারিধারা, ঢাকা', en: 'Baridhara, Dhaka' },
    area: '১,৮০০ বর্গফুট (1,800 sq ft)',
    completionTime: '১৫ কার্যদিবস (15 Days)',
    client: { bn: 'এম্বাসি রেসিডেন্সিয়াল কম্পাউন্ড', en: 'Embassy Residence' },
    photoMain: 'https://images.pexels.com/photos/8678769/pexels-photo-8678769.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/19053055/pexels-photo-19053055.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'সিলেট স্যান্ডস্টোন ও গ্রানাইট পেভার্সের মাঝে ঘাস ইন্টারলকিং করে আধুনিক টেকসই বাগান ওয়াকওয়ে তৈরি।',
      en: 'Interlocking Sylhet sandstone and flamed granite stepping slabs with grass jointing, creating durable garden pedestrian paths.',
    },
    deliverables: {
      bn: ['কম্প্যাক্টেড বেস ও অ্যান্টি-উইড ব্যারিয়ার', 'অ্যান্টি-স্লিপ সারফেস ট্রিটমেন্ট', 'আন্ডার-পেভার কনডুইট লাইটিং', 'হেভি ফুট ট্রাফিক স্থায়িত্ব'],
      en: ['Compacted Base & Anti-Weed Layer', 'Anti-Slip Flamed Texture', 'Under-Paver Low-Voltage Conduits', 'High Foot-Traffic Durability'],
    },
  },

  // 9. Waterbody: Naogaon Amir Ali Garden Lotus Pond & Waterbody
  {
    id: 'naogaon-waterbody-fountain',
    type: 'waterbody',
    title: {
      bn: 'নওগাঁ মাস্টার গার্ডেন — বায়োলজিক্যাল লোটাস পন্ড ও ক্যাসকেড ফোয়ারা',
      en: 'Naogaon Master Garden — Biological Lotus Pond & Water Cascades',
    },
    location: { bn: 'সুলতানপুর, নওগাঁ', en: 'Sultanpur, Naogaon' },
    area: '৯০০ বর্গফুট জলাশয় (900 sq ft Waterbody)',
    completionTime: '২৫ কার্যদিবস (25 Days)',
    client: { bn: 'ধানসিঁড়ি গার্ডেন রিসার্চ ফ্যাসিলিটি', en: 'Research & Display Nursery' },
    photoMain: 'https://images.pexels.com/photos/145685/pexels-photo-145685.jpeg?auto=compress&cs=tinysrgb&w=1200',
    photoSecondary: 'https://images.pexels.com/photos/2962019/pexels-photo-2962019.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: {
      bn: 'প্রাকৃতিক শাপলা, পদ্ম ও রঙিন কোই মাছের সমন্বয়ে স্বয়ংক্রিয় বায়োফিল্টারযুক্ত ইকোসিস্টেম ওয়াটার গার্ডেন।',
      en: 'Self-balancing biological aquatic ecosystem cultivating native Water Lilies (Shapla), Sacred Lotus, and Koi with continuous bio-filtration.',
    },
    deliverables: {
      bn: ['ইউভি অ্যালগি ক্ল্যারিফায়ার', 'প্রাকৃতিক শিলালিপি ক্যাসকেড ঝরনা', 'শাপলা ও জলজ উদ্ভিদের স্তরবিন্যাস', 'সাবমার্সিবল লো-ওয়াট পাম্প'],
      en: ['UV Clarifier Algae Control', 'Natural Rock Cascade Falls', 'Layered Aquatic Aquatic Plant Zones', 'Energy-Efficient Submersible Pump'],
    },
  },
]
