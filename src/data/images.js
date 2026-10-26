/**
 * Stock photography from Pexels (free licence, attribution optional but given).
 * Every entry was matched to its Pexels page title/description, but the images
 * could not be previewed in the build sandbox — skim them once on the live site.
 * To swap a photo, change its `id` (the number in the Pexels URL) or replace the
 * whole entry with `{ src: '/your-own.jpg', by: 'Dhanshiri Garden', ... }`.
 */
const CDN = 'https://images.pexels.com/photos'

export const pexelsUrl = (id, width = 1200) =>
  `${CDN}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`

const defs = {
  // Landscape paths & gardens
  gardenPath: { id: 8678769, by: 'Ksu&Eli Studio', alt: { bn: 'সবুজ গাছপালায় ঘেরা পাকা বাগানপথ', en: 'Paved garden path through lush greenery' } },
  greenhousePath: { id: 10812796, by: 'Carlo Jünemann', alt: { bn: 'গ্রিনহাউসের ভেতরে ঘন সবুজের মাঝে পথ', en: 'Walkway through dense plants in a greenhouse' } },
  sunnyPath: { id: 19053055, by: 'Sabine Fischer', alt: { bn: 'রোদ-ঝলমলে বাগানপথে ফুলের সারি', en: 'Sunlit garden path lined with flowers' } },
  pondGarden: { id: 145685, by: 'Mike Bird', alt: { bn: 'ফুলে ভরা বাগান ও শান্ত জলাশয়', en: 'Lush flower garden beside a calm pond' } },
  blueprint: { id: 834892, by: 'JESHOOTS.com', alt: { bn: 'টেবিলে ছড়ানো নকশার কাগজ', en: 'Floor-plan blueprint spread on a table' } },

  // Resort & tropical
  tropicalGazebo: { id: 1867660, by: 'Bruno Castelli', alt: { bn: 'ক্রান্তীয় বাগানে পাম ও গাছপালায় ঘেরা গেজেবো', en: 'Gazebo among palms and trees in a tropical garden' } },
  palmSteps: { id: 15114975, by: 'Dusan Milojevic', alt: { bn: 'পাম গাছের সারির মাঝে সিঁড়িপথ', en: 'Steps between rows of palm trees' } },

  // Lawn & field
  mowerClose: { id: 4162016, by: 'Magda Ehlers', alt: { bn: 'সবুজ ঘাসের ওপর ঘাস কাটার যন্ত্র', en: 'Push lawn mower on fresh green grass' } },
  mowing: { id: 4162011, by: 'Magda Ehlers', alt: { bn: 'লনে ঘাস কাটার কাজ', en: 'Mowing a lawn' } },

  // Vertical & rooftop
  greenWall: { id: 34968591, by: 'Magda Ehlers', alt: { bn: 'আধুনিক ভবনের দেয়ালজুড়ে সবুজ গাছপালা', en: 'Living green wall on a modern building' } },
  hangingPlanter: { id: 8610779, by: 'Aparna', alt: { bn: 'সাদা দেয়ালে ঝুলন্ত টবের গাছ', en: 'Hanging planter against a white wall' } },
  balconyPlant: { id: 22743737, by: 'Peter Steiner', alt: { bn: 'শহরের ভবনের ঝুলবারান্দায় সবুজ গাছ', en: 'Green plant on a city balcony' } },
  rooftopTerrace: { id: 2962019, by: 'Athena Sandrini', alt: { bn: 'রঙিন শামিয়ানা ও আলোয় সাজানো ছাদ-টেরেস', en: 'Rooftop terrace with colourful awnings and string lights' } },

  // Poly house & nursery
  greenhouseRows: { id: 2886932, by: 'Mark Stebnicki', alt: { bn: 'গ্রিনহাউসের ভেতরে সারি সারি ফসল', en: 'Rows of crops inside a greenhouse' } },
  tomatoGreenhouse: { id: 5479520, by: 'Yan Krukau', alt: { bn: 'গ্রিনহাউসে ফলন্ত টমেটো গাছ', en: 'Ripe tomatoes growing in a greenhouse' } },
  seedlingTrays: { id: 11678307, by: 'Mark Stebnicki', alt: { bn: 'ট্রেতে বেড়ে ওঠা সবুজ চারা', en: 'Seedlings growing in trays in a greenhouse' } },
  horticulturists: { id: 6509142, by: 'Tima Miroshnichenko', alt: { bn: 'গ্রিনহাউসে গাছ নিয়ে আলোচনারত দুজন উদ্যানবিদ', en: 'Two horticulturists discussing plants in a greenhouse' } },

  // Planting & care
  eggBoxSeedlings: { id: 22610719, by: 'Kenneth Surillo', alt: { bn: 'ডিমের ট্রেতে অঙ্কুরিত চারা', en: 'Seedlings sprouting in an egg carton' } },
  soilPouring: { id: 7728382, by: 'Greta Hoffman', alt: { bn: 'চারা-ট্রেতে মাটি ভরছেন একজন মালি', en: 'Gardener filling a seedling container with soil' } },
  plantingSeeds: { id: 169523, by: 'Binyamin Mellish', alt: { bn: 'মাটিতে বীজ বপন', en: 'Planting seeds in soil' } },
  seedPackets: { id: 7782153, by: 'RDNE Stock project', alt: { bn: 'গ্লাভস পরা হাতে বীজের প্যাকেট', en: 'Gloved hands holding seed packets' } },
  hoseSprout: { id: 4207906, by: 'Karola G', alt: { bn: 'শুকনো মাটিতে ছোট চারায় পাইপে পানি', en: 'Hose watering a small sprout' } },
  wateringGarden: { id: 4750270, by: 'Karola G', alt: { bn: 'সবুজ বাগানে গাছে পানি দিচ্ছেন একজন', en: 'Watering plants in a lush home garden' } },
  wateringPot: { id: 4503268, by: 'cottonbro studio', alt: { bn: 'টবের গাছে পানি দেওয়া হচ্ছে', en: 'Watering a potted plant' } },
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
