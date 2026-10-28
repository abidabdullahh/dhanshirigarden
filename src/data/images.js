/**
 * Stock photography from Pexels (free licence, attribution optional but given).
 * Enhanced with comprehensive SEO metadata (bilingual Bengali/English titles and alt text)
 * optimized for Google Image Search, local keywords (Dhaka & Naogaon), and accessibility.
 * To swap a photo, change its `id` (the number in the Pexels URL) or replace the
 * whole entry with `{ src: '/your-own.jpg', by: 'Dhanshiri Garden', ... }`.
 */
const CDN = 'https://images.pexels.com/photos'

export const pexelsUrl = (id, width = 1200) =>
  `${CDN}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`

const defs = {
  // Landscape paths & gardens
  gardenPath: {
    id: 8678769,
    by: 'Ksu&Eli Studio',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - ল্যান্ডস্কেপ বাগানপথ ও ওয়াকওয়ে নকশা',
      en: 'Dhanshiri Garden - Landscape Garden Walkway & Paved Pathway Design',
    },
    alt: {
      bn: 'সবুজ ঘাস ও গাছপালায় ঘেরা আধুনিক ল্যান্ডস্কেপ বাগানপথ - ধানসিঁড়ি গার্ডেন ঢাকা',
      en: 'Paved stone garden walkway winding through lush tropical greenery - Dhanshiri Garden Dhaka',
    },
  },
  greenhousePath: {
    id: 10812796,
    by: 'Carlo Jünemann',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - গ্রিনহাউস ও নার্সারি ওয়াকওয়ে',
      en: 'Dhanshiri Garden - Botanical Greenhouse Walkway & Nursery',
    },
    alt: {
      bn: 'গ্রিনহাউস ও নার্সারির ভেতরে ঘন উদ্ভিদের মাঝে পরিপাটি বাগানপথ - ধানসিঁড়ি গার্ডেন',
      en: 'Interior walkway through lush greenhouse plant collection and commercial nursery - Dhanshiri Garden',
    },
  },
  sunnyPath: {
    id: 19053055,
    by: 'Sabine Fischer',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - ফুল ও সবুজে সাজানো ল্যান্ডস্কেপ বাগানপথ',
      en: 'Dhanshiri Garden - Sunlit Flowering Garden Path & Landscape Design',
    },
    alt: {
      bn: 'রোদ-ঝলমলে পরিপাটি বাগানপথে বর্ণিল ফুল ও নান্দনিক ল্যান্ডস্কেপিং - ধানসিঁড়ি গার্ডেন বাংলাদেশ',
      en: 'Sunlit garden path lined with vibrant flowering border shrubs and manicured lawn - Dhanshiri Garden Bangladesh',
    },
  },
  pondGarden: {
    id: 145685,
    by: 'Mike Bird',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - প্রাকৃতিক জলাশয় ও ওয়াটার গার্ডেন ল্যান্ডস্কেপ',
      en: 'Dhanshiri Garden - Ornamental Water Garden & Decorative Pond',
    },
    alt: {
      bn: 'নান্দনিক জলাশয়, ওয়াটার লিলি ও ফুলে ঘেরা প্রাকৃতিক ওয়াটার গার্ডেন - ধানসিঁড়ি গার্ডেন',
      en: 'Peaceful ornamental garden pond surrounded by blooming aquatic flora and lush foliage - Dhanshiri Garden',
    },
  },
  blueprint: {
    id: 834892,
    by: 'JESHOOTS.com',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - ল্যান্ডস্কেপ আর্কিটেকচার ব্লুপ্রিন্ট ও মাস্টারপ্ল্যান',
      en: 'Dhanshiri Garden - Professional Landscape Architecture Blueprint & Master Plan',
    },
    alt: {
      bn: 'পেশাদার ল্যান্ডস্কেপ আর্কিটেকচার ব্লুপ্রিন্ট ও ছাদবাগান মাস্টারপ্ল্যান ড্রয়িং - ধানসিঁড়ি গার্ডেন',
      en: 'Architectural blueprint and landscape master site plan drawing on drafting desk - Dhanshiri Garden',
    },
  },

  // Resort & tropical
  tropicalGazebo: {
    id: 1867660,
    by: 'Bruno Castelli',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - বিলাসবহুল রিসোর্ট ল্যান্ডস্কেপিং ও কাঠের গেজেবো',
      en: 'Dhanshiri Garden - Tropical Resort Landscaping & Outdoor Wooden Gazebo',
    },
    alt: {
      bn: 'বিলাসবহুল রিসোর্ট ও ফার্মহাউসে পাম বাগান ও আরামদায়ক কাঠের গেজেবো সজ্জা - ধানসিঁড়ি গার্ডেন',
      en: 'Tropical resort landscape design featuring royal palms and timber gazebo pavilion - Dhanshiri Garden',
    },
  },
  palmSteps: {
    id: 15114975,
    by: 'Dusan Milojevic',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - টেরেস গার্ডেন সিঁড়ি ও পাম ল্যান্ডস্কেপ',
      en: 'Dhanshiri Garden - Tiered Garden Steps & Tropical Palm Landscaping',
    },
    alt: {
      bn: 'রাজকীয় পাম গাছের সারির মাঝে নান্দনিক পাথুরে সিঁড়িপথ ও স্টেপ ল্যান্ডস্কেপ - ধানসিঁড়ি গার্ডেন',
      en: 'Stone landscape steps flanked by rows of manicured palm trees in a luxury garden - Dhanshiri Garden',
    },
  },

  // Lawn & field
  mowerClose: {
    id: 1407305,
    by: 'Aleksandar Pasaric',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - প্রিমিয়াম বারমুডা কার্পেট ঘাসের লন এস্টেট',
      en: 'Dhanshiri Garden - Premium Bermuda Carpet Grass Estate Lawn',
    },
    alt: {
      bn: 'আধুনিক ল্যান্ডস্কেপ আর্কিটেকচারে নিখুঁত ড্রেনেজ সমৃদ্ধ বারমুডা ও কোরিয়ান কার্পেট ঘাসের লন - ধানসিঁড়ি গার্ডেন ঢাকা',
      en: 'Lush precision-graded Bermuda and Korean carpet grass lawn in contemporary landscape estate - Dhanshiri Garden Dhaka',
    },
  },
  mowing: {
    id: 1300510,
    by: 'Quang Nguyen Vinh',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - বিলাসবহুল ট্রপিক্যাল গার্ডেন ও কার্পেট ঘাসের পরিচর্যা',
      en: 'Dhanshiri Garden - Luxury Tropical Garden & Velvet Turf Maintenance',
    },
    alt: {
      bn: 'সবুজ গালিচা ঘাসের লন, পাম গাছ ও সুবিন্যস্ত আঙিনা সজ্জা - ধানসিঁড়ি গার্ডেন',
      en: 'Manicured green carpet turf lawn bordered by lush tropical palms and architectural garden - Dhanshiri Garden',
    },
  },

  // Vertical & rooftop
  greenWall: {
    id: 34968591,
    by: 'Magda Ehlers',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - বায়োফিলিক ভার্টিক্যাল গার্ডেন ও গ্রিন ওয়াল',
      en: 'Dhanshiri Garden - Biophilic Vertical Garden & Living Green Wall',
    },
    alt: {
      bn: 'আধুনিক বহুতল ভবনে জীবন্ত ভার্টিক্যাল গার্ডেন ও ড্রিপ ইরিগেশন গ্রিন ওয়াল - ধানসিঁড়ি গার্ডেন ঢাকা',
      en: 'Lush living vertical green wall installation on modern architectural facade - Dhanshiri Garden Dhaka',
    },
  },
  hangingPlanter: {
    id: 8610779,
    by: 'Aparna',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - বারান্দা ও অন্দরসজ্জায় নান্দনিক ঝুলন্ত টব',
      en: 'Dhanshiri Garden - Decorative Hanging Planters for Balcony & Wall',
    },
    alt: {
      bn: 'বারান্দা ও দেয়ালে নান্দনিক অর্নামেন্টাল গাছের ঝুলন্ত টব সজ্জা - ধানসিঁড়ি গার্ডেন',
      en: 'Minimalist decorative hanging ceramic planter pot mounted on a modern wall - Dhanshiri Garden',
    },
  },
  balconyPlant: {
    id: 22743737,
    by: 'Peter Steiner',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - অ্যাপার্টমেন্ট ব্যালকনি ও পটেড গার্ডেনিং',
      en: 'Dhanshiri Garden - Urban Balcony Garden & Potted Plant Styling',
    },
    alt: {
      bn: 'শহুরে অ্যাপার্টমেন্টের ব্যালকনিতে সতেজ ইনডোর ও আউটডোর পটেড প্ল্যান্টস - ধানসিঁড়ি গার্ডেন ঢাকা',
      en: 'Lush foliage potted plants arranged on a sunny contemporary apartment balcony - Dhanshiri Garden Dhaka',
    },
  },
  rooftopTerrace: {
    id: 2962019,
    by: 'Athena Sandrini',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - আধুনিক ছাদবাগান ডিজাইন ও টেরেস ল্যান্ডস্কেপিং',
      en: 'Dhanshiri Garden - Modern Rooftop Terrace Garden Design & Landscaping',
    },
    alt: {
      bn: 'ছাদে আধুনিক ড্রেইনেজ, শেড, আলো ও ফুল-গাছে সাজানো দৃষ্টিনন্দন ছাদবাগান - ধানসিঁড়ি গার্ডেন ঢাকা ও নওগাঁ',
      en: 'Modern rooftop terrace garden with atmospheric string lighting, planter boxes, and scenic lounge - Dhanshiri Garden',
    },
  },

  // Poly house & nursery
  greenhouseRows: {
    id: 2886932,
    by: 'Mark Stebnicki',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - বাণিজ্যিক পলিনেট হাউজ ও আধুনিক গ্রিনহাউস',
      en: 'Dhanshiri Garden - Commercial Agricultural Polyhouse & Greenhouse Setup',
    },
    alt: {
      bn: 'নিয়ন্ত্রিত তাপমাত্রার আধুনিক পলিনেট হাউজে সারি সারি ফসলের বৈজ্ঞানিক চাষাবাদ - ধানসিঁড়ি গার্ডেন',
      en: 'Organized rows of healthy horticultural crops growing inside a modern polyhouse - Dhanshiri Garden',
    },
  },
  tomatoGreenhouse: {
    id: 5479520,
    by: 'Yan Krukau',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - পলিনেট হাউজে উচ্চ ফলনশীল টমেটো চাষ',
      en: 'Dhanshiri Garden - High-Yield Greenhouse Tomato Farming',
    },
    alt: {
      bn: 'আধুনিক গ্রিনহাউস ও পলিনেট হাউজে উন্নত জাতের টমেটো উৎপাদন ও কৃষি পরামর্শ - ধানসিঁড়ি গার্ডেন',
      en: 'Clusters of vine-ripened organic tomatoes thriving in a protected greenhouse facility - Dhanshiri Garden',
    },
  },
  seedlingTrays: {
    id: 11678307,
    by: 'Mark Stebnicki',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - নার্সারির প্লাগ ট্রেতে উন্নত চারা উৎপাদন',
      en: 'Dhanshiri Garden - Propagation Plug Trays & High-Grade Nursery Seedlings',
    },
    alt: {
      bn: 'নার্সারির প্লাগ ট্রেতে উৎপাদিত স্বাস্থ্যবান সবজি ও ফুলের চারা - ধানসিঁড়ি গার্ডেন নার্সারি',
      en: 'Vigorous green seedlings thriving in propagation nursery plug trays - Dhanshiri Garden Nursery',
    },
  },
  horticulturists: {
    id: 2886937,
    by: 'Mark Stebnicki',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - পলিনেট হাউজ ও আধুনিক নার্সারি গবেষণা কেন্দ্র',
      en: 'Dhanshiri Garden - High-Tech Polyhouse & Agricultural Nursery Research Facility',
    },
    alt: {
      bn: 'নিয়ন্ত্রিত তাপমাত্রায় উন্নত জাতের চারা উৎপাদন ও বাণিজ্যিক নার্সারি ব্যবস্থাপনা - ধানসিঁড়ি গার্ডেন নওগাঁ',
      en: 'Commercial nursery facility cultivating certified horticultural saplings under controlled microclimates - Dhanshiri Garden',
    },
  },

  // Planting & care
  eggBoxSeedlings: {
    id: 1005058,
    by: 'Huy Phan',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - নান্দনিক টবের গাছ ও অর্নামেন্টাল প্ল্যান্ট কালেকশন',
      en: 'Dhanshiri Garden - Designer Potted Plants & Ornamental Foliage',
    },
    alt: {
      bn: 'ব্যালকনি ও ইনডোর বাগানের জন্য সুস্থ সতেজ জাতের টবের গাছ ও পরিচর্যা - ধানসিঁড়ি গার্ডেন',
      en: 'Healthy thriving indoor and balcony potted ornamental plants with organic media - Dhanshiri Garden',
    },
  },
  soilPouring: {
    id: 7728382,
    by: 'Greta Hoffman',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - আদর্শ পটিং মিক্স ও পুষ্টিকর টবের মাটি তৈরি',
      en: 'Dhanshiri Garden - Organic Potting Soil Mix Preparation & Fertilization',
    },
    alt: {
      bn: 'ছাদবাগান ও নার্সারির জন্য ভার্মিকম্পোস্ট সমৃদ্ধ আদর্শ টবের মাটি প্রস্তুতকরণ - ধানসিঁড়ি গার্ডেন',
      en: 'Gardening specialist preparing nutrient-rich potting soil and seedling substrate - Dhanshiri Garden',
    },
  },
  plantingSeeds: {
    id: 169523,
    by: 'Binyamin Mellish',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - উর্বর মাটিতে বীজ বপন ও কিচেন গার্ডেনিং',
      en: 'Dhanshiri Garden - Sowing High-Quality Seeds for Kitchen & Landscape Gardens',
    },
    alt: {
      bn: 'বাগানের উর্বর মাটিতে উন্নত জাতের বীজ বপন ও বৈজ্ঞানিক বৃক্ষরোপণ - ধানসিঁড়ি গার্ডেন',
      en: 'Gardener carefully sowing premium vegetable seeds into fertile prepared garden soil - Dhanshiri Garden',
    },
  },
  seedPackets: {
    id: 1084199,
    by: 'Min An',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - উন্নত জাতের ফলদ ও শোভাময় গাছের চারা সরবরাহ',
      en: 'Dhanshiri Garden - Certified Fruit & Ornamental Saplings Nursery',
    },
    alt: {
      bn: 'ঢাকা ও নওগাঁর নার্সারিতে প্রস্তুতকৃত সুস্থ সবল ফলদ ও শোভাময় গাছের চারা কালেকশন - ধানসিঁড়ি গার্ডেন',
      en: 'Vigorous tropical fruit and ornamental landscape saplings cultivated in Dhanshiri Garden nursery',
    },
  },
  hoseSprout: {
    id: 4207906,
    by: 'Karola G',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - আধুনিক স্প্রিংকলার ও ড্রিপ সেচ প্রযুক্তি',
      en: 'Dhanshiri Garden - Precision Garden Irrigation & Micro-Watering',
    },
    alt: {
      bn: 'চারার গোড়ায় পরিমিত পানি প্রয়োগ ও স্বয়ংক্রিয় ড্রিপ ইরিগেশন ব্যবস্থা - ধানসিঁড়ি গার্ডেন',
      en: 'Gentle micro-irrigation nozzle watering delicate plant sprouts with precision - Dhanshiri Garden',
    },
  },
  wateringGarden: {
    id: 4750270,
    by: 'Karola G',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - বাগান ও লন নিয়মিত পানি সেচ পরিচর্যা',
      en: 'Dhanshiri Garden - Scheduled Landscape Irrigation & Plant Care Service',
    },
    alt: {
      bn: 'সবুজ আঙিনায় নিয়মিত সঠিক নিয়মে পানি সেচ ও ল্যান্ডস্কেপ মেইনটেন্যান্স - ধানসিঁড়ি গার্ডেন ঢাকা',
      en: 'Comprehensive scheduled watering of ornamental garden plants and residential lawns - Dhanshiri Garden Dhaka',
    },
  },
  wateringPot: {
    id: 4503268,
    by: 'cottonbro studio',
    title: {
      bn: 'ধানসিঁড়ি গার্ডেন - ইনডোর টবের গাছ ও ব্যালকনি প্ল্যান্ট পরিচর্যা',
      en: 'Dhanshiri Garden - Indoor Potted Plant Hydration & Foliage Maintenance',
    },
    alt: {
      bn: 'ইনডোর টবের গাছে সঠিক আর্দ্রতা রক্ষায় স্প্রে ও পানি প্রয়োগ সেবা - ধানসিঁড়ি গার্ডেন',
      en: 'Careful watering and hydration care for indoor ornamental potted houseplants - Dhanshiri Garden',
    },
  },
}

export const photos = Object.fromEntries(
  Object.entries(defs).map(([key, def]) => [
    key,
    {
      key,
      ...def,
      page: def.id ? `https://www.pexels.com/photo/${def.id}/` : undefined,
      src: (width = 1200) => (def.id ? pexelsUrl(def.id, width) : def.src),
      srcSet: def.id
        ? [480, 800, 1200, 1600].map((w) => `${pexelsUrl(def.id, w)} ${w}w`).join(', ')
        : undefined,
    },
  ]),
)

/** Gallery order + category + tile shape (drives the masonry rhythm). */
export const galleryItems = [
  { photo: 'gardenPath', cat: 'landscape', shape: 'tall' },
  { photo: 'mowerClose', cat: 'lawn', shape: 'wide' },
  { photo: 'greenWall', cat: 'vertical', shape: 'tall' },
  { photo: 'tropicalGazebo', cat: 'resort', shape: 'wide' },
  { photo: 'greenhouseRows', cat: 'polyhouse', shape: 'wide' },
  { photo: 'balconyPlant', cat: 'rooftop', shape: 'tall' },
  { photo: 'eggBoxSeedlings', cat: 'care', shape: 'square' },
  { photo: 'sunnyPath', cat: 'landscape', shape: 'wide' },
  { photo: 'hangingPlanter', cat: 'vertical', shape: 'square' },
  { photo: 'palmSteps', cat: 'resort', shape: 'tall' },
  { photo: 'horticulturists', cat: 'polyhouse', shape: 'tall' },
  { photo: 'rooftopTerrace', cat: 'rooftop', shape: 'wide' },
  { photo: 'mowing', cat: 'lawn', shape: 'tall' },
  { photo: 'tomatoGreenhouse', cat: 'polyhouse', shape: 'square' },
  { photo: 'pondGarden', cat: 'landscape', shape: 'wide' },
  { photo: 'soilPouring', cat: 'care', shape: 'tall' },
  { photo: 'seedlingTrays', cat: 'polyhouse', shape: 'wide' },
  { photo: 'greenhousePath', cat: 'landscape', shape: 'square' },
  { photo: 'wateringGarden', cat: 'care', shape: 'tall' },
  { photo: 'plantingSeeds', cat: 'care', shape: 'wide' },
  { photo: 'blueprint', cat: 'landscape', shape: 'wide' },
  { photo: 'hoseSprout', cat: 'care', shape: 'wide' },
  { photo: 'seedPackets', cat: 'care', shape: 'square' },
  { photo: 'wateringPot', cat: 'care', shape: 'square' },
]
