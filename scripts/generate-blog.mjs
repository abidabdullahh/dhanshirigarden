/**
 * Dynamic Automated Blog Post Generator for Dhanshiri Garden (ধানসিঁড়ি গার্ডেন)
 *
 * Designed with dynamic agronomic analyses tailored specifically to Bangladesh:
 * - 6-season cycle (গ্রীষ্ম, বর্ষা, শরৎ, হেমন্ত, শীত, বসন্ত)
 * - Dhaka & Naogaon climatic conditions (urban concrete heat, heavy monsoon downpours, Barind soil)
 * - Soil composition (দোআঁশ, ভার্মিকম্পোস্ট, কোকোপিট, ৩-লেয়ার ড্রেইনেজ)
 * - Local high-demand cultivars (বারি মাল্টা-১, কাটিমন আম, ড্রাগন, বারমুডা কার্পেট ঘাস)
 * - Organics & IPM (নিম তেল, ট্রাইকোডার্মা, সরিষার খোল চা)
 *
 * Usage:
 *   node scripts/generate-blog.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const blogPostsPath = path.join(rootDir, 'src', 'data', 'blogPosts.js')
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')

// Dynamic Bangladeshi Agronomy Topic Bank with Seasonal Trigger Mapping
const TOPIC_BANK = [
  {
    slug: 'dhaka-winter-rooftop-vegetables-guide',
    season: 'winter', // Oct - Feb
    category: 'rooftop',
    readTime: 6,
    featuredImage: 'seedlingTrays',
    meta: {
      keywords: [
        'শীতকালীন সবজি চাষ ছাদবাগান',
        'টবে টমেটো ও ক্যাপসিকাম চাষ ঢাকা',
        'শীতের ছাদবাগান পরিচর্যা',
        'winter rooftop vegetables Dhaka',
        'container tomato strawberry Bangladesh',
      ],
    },
    bn: {
      title: 'কার্তিক ও অগ্রহায়ণে ঢাকার ছাদে শীতকালীন সবজি চাষের সুবর্ণ প্রস্তুতি ও ফলন বৃদ্ধির নিয়ম',
      categoryLabel: 'ছাদবাগান ও ড্রেইনেজ',
      summary: 'টমেটো, ব্রকলি, ক্যাপসিকাম ও স্ট্রবেরির চারা রোপণের সঠিক সময়, পোকার আক্রমণ থেকে কচি চারা রক্ষা এবং দোআঁশ-ভার্মিকম্পোস্টের পুষ্টি শিডিউল।',
      tags: ['শীতকালীন সবজি', 'ছাদবাগান', 'টমেটো চাষ', 'স্ট্রবেরি', 'আমির আলী'],
      author: 'জনাব আমির আলী',
      authorRole: 'প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন',
      sections: [
        {
          heading: '১. শীতের শুরুর আবহাওয়া ও চারা রোপণের মোক্ষম সময়',
          content: 'কার্তিক মাসের মাঝামাঝি (অক্টোবরের শেষ ও নভেম্বর) থেকে ঢাকায় রাতের তাপমাত্রা কমতে শুরু করে এবং বাতাসে আর্দ্রতা হ্রাস পায়। এটিই শীতকালীন শাকসবজি ও বিদেশী ফলদ চারা লাগানোর শ্রেষ্ঠ সময়। বীজতলায় উৎপাদিত চারা যখন ৪-৫ পাতার হবে (২০-২৫ দিন বয়স), তখনই টবে বা গ্রোব্যাগে স্থানান্তর করতে হবে।',
          bulletPoints: [
            'চারা রোপণের জন্য সবসময় পড়ন্ত বিকেল বেছে নিন, যাতে সারারাত কুয়াশার ঠাণ্ডায় শিকড় মাটিতে প্রতিষ্ঠিত হতে পারে।',
            'টমেটো ও বেগুনের জন্য কমপক্ষে ১২-১৪ ইঞ্চি টব এবং ব্রকলি-ক্যাপসিকামের জন্য ১০-১২ ইঞ্চি টব যথেষ্ট।',
            'কচি চারার গোড়ায় অতিরিক্ত রোদ লাগলে প্রথম ৩ দিন হালকা শেড বা সবুজ নেট ব্যবহার করুন।',
          ],
        },
        {
          heading: '২. শীতের সবজির জন্য মাটির পুষ্টি মিশ্রণ',
          content: 'শীতের সবজির জীবনকাল স্বল্প (৬০ থেকে ৯০ দিন), তাই মাটিতে তাৎক্ষণিক শোষণযোগ্য পুষ্টি উপাদান থাকতে হবে।',
          bulletPoints: [
            '৫০% দোআঁশ মাটি + ৩৫% ভার্মিকম্পোস্ট + ১০% কোকোপিট + ৫% কাঠের ছাই ও হাড়ের গুঁড়া।',
            'কাঠের ছাই মাটিকে পটাশিয়াম সরবরাহ করে এবং মাটির ক্ষতিকর ছত্রাক ও পোকা দূর করে।',
            'টবের মাটিতে ট্রাইকোডার্মা গুঁড়া মিশিয়ে দিলে কচি চারার গোড়া পচা রোগ (Damping off) শূন্যে নেমে আসে।',
          ],
          expertTip: 'টমেটো চারার ডালপালা বড় হলে নিচের ১ ফুট অংশের সব পাতা ছেঁটে দিন। এতে মাটির আর্দ্রতা থেকে ছত্রাক পাতায় উঠতে পারে না এবং ফলন ৩০% বৃদ্ধি পায়।',
        },
        {
          heading: '৩. নিয়মিত কুয়াশা ও পোকা থেকে সুরক্ষা',
          content: 'ঘন কুয়াশায় পাতায় ছত্রাকের আক্রমণ বাড়ে। প্রতি ১৫ দিন অন্তর ম্যানকোজেব ছত্রাকনাশক (২ গ্রাম/লিটার) ভোরে স্প্রে করুন এবং জাবপোকা দেখা দিলে তাৎক্ষণিক সাবান-পানি বা নিম তেলের স্প্রে দিন।',
        },
      ],
      faq: [
        {
          q: 'টবের স্ট্রবেরি গাছে ফল বড় হয় না কেন?',
          a: 'স্ট্রবেরি অগভীর শিকড়ের গাছ। এদের জন্য চওড়া তবে কম গভীর টব উপযুক্ত। গাছে ফল ধরার পর মাটির ওপরে খড় বা শুকনো পাতা বিছিয়ে (মালচিং) দিন যাতে ফল মাটিতে লেগে পচে না যায়।',
        },
        {
          q: 'ক্যাপসিকামের ফুল ঝরে যাওয়া কিভাবে ঠেকাবেন?',
          a: 'রাতে তাপমাত্রা অতিরিক্ত কমে গেলে বা দিনে রোদ কম পেলে ফুল ঝরতে পারে। সকালের পূর্ণ রোদযুক্ত স্থানে রাখুন এবং লিটার প্রতি ১ মিলি বোরন স্প্রে করুন।',
        },
      ],
    },
    en: {
      title: 'Winter Rooftop Vegetable Gardening in Dhaka: Soil Prep, Sowing Schedule & High-Yield Tips',
      categoryLabel: 'Rooftop & Drainage',
      summary: 'Detailed cultivation protocols for heirloom tomatoes, bell peppers, broccoli, and strawberries in urban containers under Bangladesh winter climate conditions.',
      tags: ['Winter Vegetables', 'Rooftop Garden', 'Container Tomato', 'Strawberry', 'Amir Ali'],
      author: 'Mr. Amir Ali',
      authorRole: 'Founder & Chief Agronomy Consultant, Dhanshiri Garden',
      sections: [
        {
          heading: '1. Optimal Seasonal Timing and Transplanting Protocol',
          content: 'As ambient night temperatures drop across Dhaka from late October, soil respiration slows and seedling vigor peaks. When nursery seedlings develop 4 to 5 true leaves (approx. 22 days old), transplant them into well-aerated rooftop containers.',
          bulletPoints: [
            'Always transplant saplings during late afternoon so root hairs absorb nocturnal moisture.',
            'Container volume: Minimum 12-14 inches diameter for tomatoes, 10 inches for bell peppers.',
            'Provide lightweight shade net during the initial 72 hours to prevent transplant shock.',
          ],
        },
        {
          heading: '2. High-Octane Organic Soil Preparation',
          content: 'Winter cole crops possess brief 60 to 90-day production cycles requiring immediate biologically available nutrition.',
          bulletPoints: [
            '50% Virgin Silt Loam + 35% Aged Vermicompost + 10% Washed Cocopeat + 5% Horticultural Hardwood Ash & Steamed Bone Meal.',
            'Hardwood ash supplies natural potassium to drive blossom development.',
            'Incorporate Trichoderma viride bio-inoculant into potting soil to prevent seedling damping-off.',
          ],
          expertTip: 'Strip all lower foliage up to 12 inches on indeterminate tomato vines. This prevents soil-borne fungal spores from splashing onto foliage during irrigation.',
        },
        {
          heading: '3. Fog Humidity Mitigation & Organic Pest Protection',
          content: 'Prolonged winter morning fog invites powdery mildew and aphid colonization. Apply copper-based organic protectants and neem emulsified teas at early signs.',
        },
      ],
      faq: [
        {
          q: 'Why do container strawberries rot before ripening?',
          a: 'Strawberry fruit must never rest directly on wet soil. Spread clean straw or dry shredded leaves beneath crowns as organic mulch to keep ripening berries suspended and dry.',
        },
        {
          q: 'How to arrest premature blossom drop on container bell peppers?',
          a: 'Ensure a minimum of 6 hours of direct solar exposure and apply foliar chelated boron at 1g per liter prior to flower opening.',
        },
      ],
    },
  },

  {
    slug: 'bougainvillea-kagoji-ful-pruning-blooming-bangladesh',
    season: 'dry', // Nov - May
    category: 'plantCare',
    readTime: 5,
    featuredImage: 'hangingPlanter',
    meta: {
      keywords: [
        'কাগজ ফুল চাষ ছাদবাগান',
        'বোগেনভিলিয়া ফুল ফোটার উপায়',
        'বাগান ডাল ছাঁটাই সময়',
        'bougainvillea blooming tips Bangladesh',
        'rooftop flowering creepers Dhaka',
      ],
    },
    bn: {
      title: 'শীত ও বসন্তে ছাদবাগানে বোগেনভিলিয়া বা কাগজ ফুলের উপচে পড়া পুষ্পমঞ্জরি পাওয়ার গোপনীয়তা',
      categoryLabel: 'রোগবালাই ও উদ্ভিদ পুষ্টি',
      summary: 'অতিরিক্ত পাতার বদলে পুরো গাছে বর্ণিল ফুলের ঢল নামাতে পানি নিয়ন্ত্রণ, কাটিং প্রুনিং ও পটাশ সার প্রয়োগের বিশেষজ্ঞ কৌশল।',
      tags: ['বোগেনভিলিয়া', 'কাগজ ফুল', 'ছাদবাগান', 'ফুল ফোটার সার', 'আমির আলী'],
      author: 'জনাব আমির আলী',
      authorRole: 'প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন',
      sections: [
        {
          heading: '১. কেন আপনার বোগেনভিলিয়ায় শুধু সবুজ পাতা হয়, ফুল হয় না?',
          content: 'অধিকাংশ মানুষ মনে করেন গাছে যত বেশি পানি ও সার দেবেন, তত ফুল ফুটবে। বোগেনভিলিয়ার ক্ষেত্রে নিয়মটি সম্পূর্ণ উল্টো! বোগেনভিলিয়া হলো রুক্ষ, রোদপ্রিয় ও খরা সহনশীল মরুভূমির গাছ। টবের মাটিতে অতিরিক্ত পানি ও নাইট্রোজেন সার (যেমন ইউরিয়া) দিলে গাছ শুধু সবুজ পাতার জঙ্গল তৈরি করে, কিন্তু ফুলের কুঁড়ি আনে না।',
          bulletPoints: [
            'গাছকে পর্যাপ্ত সরাসরি রোদ (দৈনিক কমপক্ষে ৬ ঘণ্টা) না দিলে কখনোই ফুল আসবে না।',
            'নিয়মিত পানি দেওয়ার কারণে গাছ "ভেজিটেটিভ গ্রোথ" বা পাতা বৃদ্ধিতে ব্যস্ত থাকে।',
            'ফুল আনার জন্য গাছকে নিয়ন্ত্রিত পানির অভাব বা "ওয়াটার স্ট্রেস" (Water Stress) দিতে হবে।',
          ],
        },
        {
          heading: '২. ফুল আনার ৩-ধাপের বৈজ্ঞানিক প্রক্রিয়া',
          content: 'কার্তিক মাসে বর্ষার শেষেই এই প্রক্রিয়া শুরু করতে হয়, যাতে অগ্রহায়ণ-পৌষ থেকে শুরু করে চৈত্র পর্যন্ত গাছ ফুলে ফুলে ভরে থাকে।',
          bulletPoints: [
            'ধাপ ১ (হার্ড প্রুনিং): চিকন ও দুর্বল ডালপালা কেটে গাছকে গোলাকার বা সুদৃশ্য ছাঁটাই করুন। নতুন বের হওয়া শাখাগুলোতেই কেবল ফুল ধরে।',
            'ধাপ ২ (খরা তৈরি): পানি দেওয়া সম্পূর্ণ বন্ধ রাখুন যতক্ষণ না দুপুরের কড়া রোদে গাছের পাতা সামান্য নেতিয়ে পড়ে। এরপর সামান্য পানি দিন যাতে গাছ বাঁচে। এই খরায় গাছ আতঙ্কিত হয়ে দ্রুত বংশবৃদ্ধির তাগিদে অজস্র ফুলের কুঁড়ি জন্ম দেয়।',
            'ধাপ ৩ (পটাশ ও ফসফরাস টনিক): কুঁড়ি দেখা দেওয়া মাত্রই টবের চারপাশের মাটি আলগা করে ১ চামচ পটাশ (MOP/SOP) ও ২ চামচ হাড়ের গুঁড়া প্রয়োগ করুন।',
          ],
          expertTip: 'বোগেনভিলিয়ার টবের ড্রেইনেজ সবচেয়ে পরিষ্কার থাকতে হবে। টবে পানি জমে থাকা এই গাছের জন্য নিশ্চিত মৃত্যু। ধানসিঁড়ি গার্ডেন সব সময় ২০% মোটা লাল বালু ও ইটের খোয়া দিয়ে এর মাটি তৈরি করে।',
        },
      ],
      faq: [
        {
          q: 'বোগেনভিলিয়া গাছ কি সিমেন্টের টবে ভালো হয় নাকি প্লাস্টিকের টবে?',
          a: 'মাটির বা সিমেন্টের টবে সবচেয়ে ভালো হয়, কারণ এদের গায়ে সূক্ষ্ম ছিদ্র থাকায় অতিরিক্ত আর্দ্রতা দ্রুত বাষ্পীভূত হতে পারে। প্লাস্টিকের টবে পানি জমে শিকড় পচে যাওয়ার ঝুঁকি বেশি।',
        },
      ],
    },
    en: {
      title: 'Unlocking Cascading Bougainvillea Blooms on Dhaka Rooftops: Pruning & Water Stress Guide',
      categoryLabel: 'Pests & Plant Nutrition',
      summary: 'Mastering the art of water starvation, terminal tip pinching, and potassium loading to transform green foliage into dense floral blankets in Bangladesh.',
      tags: ['Bougainvillea', 'Flowering Climber', 'Pruning Guide', 'Water Stress', 'Amir Ali'],
      author: 'Mr. Amir Ali',
      authorRole: 'Founder & Chief Agronomy Consultant, Dhanshiri Garden',
      sections: [
        {
          heading: '1. Why Your Bougainvillea Yields Leaves Instead of Flowers',
          content: 'The most counter-intuitive principle in horticulture: lush coddling prevents Bougainvillea blooming. Originating from semi-arid native zones, heavy watering and high-nitrogen fertilizers stimulate vegetative leaf shoots while suppressing flower bract formation.',
          bulletPoints: [
            'Minimum 6 hours of unfiltered direct solar radiation is non-negotiable.',
            'Over-irrigation suppresses reproductive floral signaling.',
            'Deliberate mild water deficit triggers prolific flowering as a survival mechanism.',
          ],
        },
        {
          heading: '2. The 3-Stage Flowering Protocol',
          content: 'Implement this regimen in late Autumn to secure cascading floral bracts throughout dry Bangladeshi winter months.',
          bulletPoints: [
            'Stage 1 (Pruning): Cut back thin, leggy shoots by 30-40%. Blooms only form on new apical growth flushes.',
            'Stage 2 (Water Deficit): Restrict watering until daytime foliage wilts moderately. Give minimal water just to sustain life. Within 12-14 days, numerous flower buds will erupt.',
            'Stage 3 (Potassium Top-Dress): Backfill with organic bone meal and soluble potassium sulfate to deepen flower bract coloration.',
          ],
          expertTip: 'Potted Bougainvilleas demand razor-sharp drainage. Incorporate 20% coarse brick chips into the potting mix to prevent crown wetness.',
        },
      ],
      faq: [
        {
          q: 'Is terracotta or plastic preferred for container Bougainvilleas?',
          a: 'Porous terracotta or unglazed cement pots are vastly superior because sidewall evaporation keeps substrate dry and well-aerated.',
        },
      ],
    },
  },

  {
    slug: 'rooftop-waterproofing-concrete-safety-bangladesh',
    season: 'monsoon', // Year-round / Pre-monsoon
    category: 'rooftop',
    readTime: 7,
    featuredImage: 'rooftopTerrace',
    meta: {
      keywords: [
        'ছাদবাগান ওয়াটারপ্রুফিং ঢাকা',
        'ছাদে বাগানে ছাদ ড্যাম রোধ',
        'ছাদবাগান লোড ক্যালকুলেশন',
        'rooftop waterproofing garden Dhaka',
        'terrace structural safety Bangladesh',
      ],
    },
    bn: {
      title: 'ছাদবাগান করার পূর্বে ছাদের ওয়াটারপ্রুফিং ও কাঠামোগত সুরক্ষার প্রকৌশল নির্দেশিকা',
      categoryLabel: 'ছাদবাগান ও ড্রেইনেজ',
      summary: 'ভবনের সিলিংয়ে শ্যাওলা, নোনা ধরা ও লিকেজ স্থায়ীভাবে রোধ করতে আধুনিক পলিমার ওয়াটারপ্রুফিং, ড্রেইনেজ ঢাল ও কলামে ওজন বিন্যাসের নিয়ম।',
      tags: ['ওয়াটারপ্রুফিং', 'ছাদের নিরাপত্তা', 'ছাদবাগান ঢাকা', 'ড্রেইনেজ গ্রেডিং', 'আমির আলী'],
      author: 'জনাব আমির আলী',
      authorRole: 'প্রতিষ্ঠাতা ও প্রধান কৃষি পরামর্শক, ধানসিঁড়ি গার্ডেন',
      sections: [
        {
          heading: '১. কেন সাধারণ ছাদবাগান থেকে ছাদ চুইয়ে পানি পড়ে?',
          content: 'ঢাকায় বহু বাড়ির মালিক ছাদবাগান করতে গিয়ে কয়েক বছর পর নিচে ড্রয়িংরুমের সিলিংয়ে পলেস্তারা খসে পড়া বা স্যাঁতসেঁতে নোনা ধরার শিকার হন। এর মূল কারণ: মাটির সরাসরি সংস্পর্শ, টবের নিচে পানি জমে থাকা এবং ছাদের ঢাল না মেনে ভুল ড্রেনেজ পাইপ স্থাপন করা। কংক্রিটের ছাদ পুরোপুরি পানিনিরোধক নয়; এতে ক্ষুদ্রাতিক্ষুদ্র কৈশিক ছিদ্র থাকে যা দিয়ে পানি ধীরে ধীরে ভেতরে প্রবেশ করে রডে মরিচা ধরায়।',
          bulletPoints: [
            'টব বা ড্রামকে কখনোই সরাসরি ছাদের মেঝের ওপর রাখবেন না।',
            'ছাদের বৃষ্টির পানি নামার ড্রেন পাইপে জালি বা ফিল্টার না দিলে ঝরা পাতায় লাইন বন্ধ হয়ে ছাদ সুইমিংপুলে পরিণত হয়।',
            'স্থায়ী মাটির বেড করার পূর্বে অবশ্যই ৩ স্তরের পলিমারিক ওয়াটারপ্রুফিং মেমব্রেন স্থাপন করতে হবে।',
          ],
        },
        {
          heading: '২. ৩-স্তরের বৈজ্ঞানিক ওয়াটারপ্রুফিং পদ্ধতি',
          content: 'ধানসিঁড়ি গার্ডেন যেকোনো স্থায়ী ছাদবাগান তৈরির পূর্বে এই প্রমাণিত প্রযুক্তি প্রয়োগ করে:',
          bulletPoints: [
            'স্তর ১: ছাদের মেঝে এসিড-মুক্ত পানি দিয়ে পরিষ্কার করে ক্র্যাক বা ফাটল থাকলে নন-শ্রিঙ্ক গ্রাউট দিয়ে সিল করা।',
            'স্তর ২: ইলাস্টোমেরিক পলিমার মডিফায়েড বিটুমিন বা এক্রিলিক ওয়াটারপ্রুফিং কেমিক্যালের ২ কোট আড়াআড়ি প্রয়োগ।',
            'স্তর ৩: ড্রেইনেজ সেল ও নন-ওভেন জিওটেক্সটাইল মেমব্রেন স্থাপন, যা ছাদ ও মাটির মাঝে ২ ইঞ্চির ফাঁকা এয়ার-গ্যাপ তৈরি করে।',
          ],
          expertTip: 'ভারী সিমেন্টের প্ল্যান্টার ও ফলের হাফ ড্রাম সর্বদা ভবনের প্রধান কলাম ও বিমের ওপর বসান। ছাদের মাঝখানের স্ল্যাব অপেক্ষাকৃত দুর্বল থাকে, সেখানে হালকা টব বা ঝুলন্ত প্ল্যান্টার রাখা নিরাপদ।',
        },
      ],
      faq: [
        {
          q: 'টাইলস করা ছাদে কি ছাদবাগান করা নিরাপদ?',
          a: 'টাইলস করা ছাদে পানি দ্রুত সরে যায় ঠিকই, তবে টাইলসের গ্রাউটিং বা জোড়া দিয়ে পানি চুইয়ে ছাদের স্ল্যাবে ঢুকতে পারে। তাই টাইলসের ওপরেও স্ট্যান্ড দিয়ে টব ওঠানো আবশ্যক।',
        },
      ],
    },
    en: {
      title: 'Rooftop Waterproofing and Structural Slab Load Engineering for Bangladesh Residences',
      categoryLabel: 'Rooftop & Drainage',
      summary: 'Preventing ceiling dampness, concrete carbonation, and efflorescence in Dhaka buildings through elastomeric barriers, drainage cells, and column weight alignment.',
      tags: ['Waterproofing', 'Structural Safety', 'Rooftop Garden', 'Drainage Slope', 'Amir Ali'],
      author: 'Mr. Amir Ali',
      authorRole: 'Founder & Chief Agronomy Consultant, Dhanshiri Garden',
      sections: [
        {
          heading: '1. Root Causes of Ceiling Seepage in Urban Dhaka Terraces',
          content: 'Without proper waterproofing safeguards, constant contact with moist soil causes moisture ingress into micro-capillaries of concrete slabs, oxidizing steel rebar and causing catastrophic spalling.',
          bulletPoints: [
            'Direct pot placement traps stagnant moisture against roof bitumen.',
            'Foliage debris clogging rainwater spouts creates accidental rooftop pooling.',
            'Permanent brick planter beds require certified multi-layer chemical barriers before soil loading.',
          ],
        },
        {
          heading: '2. The 3-Tier Elastomeric Membrane Standard',
          content: 'Dhanshiri Garden mandates an uncompromising waterproofing engineering standard for all turnkey installations:',
          bulletPoints: [
            'Tier 1: High-pressure surface cleaning and non-shrink crystalline grout injection into existing hairline fractures.',
            'Tier 2: Two criss-cross coats of high-elongation elastomeric polymer waterproofing coating.',
            'Tier 3: Installation of dimpled plastic drainage cells covered with 150 GSM non-woven geotextile to create a permanent air buffer beneath soil.',
          ],
          expertTip: 'Position massive container orchards exclusively over structural columns and perimeter bearing beams where deflection is zero. Never overload center span slabs.',
        },
      ],
      faq: [
        {
          q: 'Is tiled roofing automatically waterproof for container gardens?',
          a: 'No. Ceramic tile grouting deteriorates over time under UV rays, allowing seepage into the underlying screed. Planters must still be elevated on 3-inch pedestals.',
        },
      ],
    },
  },
]

export function generateNextBlogPost() {
  console.log('🌱 Starting Dynamic Blog Generator for Dhanshiri Garden...')

  const blogFileContent = fs.readFileSync(blogPostsPath, 'utf8')

  // Find candidate topic not yet present in blogPosts.js
  const candidate = TOPIC_BANK.find((topic) => !blogFileContent.includes(topic.slug))

  if (!candidate) {
    console.log('✓ All pre-analyzed seasonal topics are already published!')
    console.log('✓ Total posts in library are fully active and indexed.')
    return null
  }

  const today = new Date().toISOString().split('T')[0]
  candidate.date = today

  console.log(`✨ Publishing new dynamic post: "${candidate.bn.title}" (${candidate.slug})`)

  // Construct new blog post JS code string
  const newPostJs = `  {
    slug: ${JSON.stringify(candidate.slug)},
    date: ${JSON.stringify(candidate.date)},
    category: ${JSON.stringify(candidate.category)},
    readTime: ${candidate.readTime},
    featuredImage: ${JSON.stringify(candidate.featuredImage)},
    meta: ${JSON.stringify(candidate.meta, null, 6)},
    bn: ${JSON.stringify(candidate.bn, null, 6)},
    en: ${JSON.stringify(candidate.en, null, 6)},
  },
`

  // Insert post at the top of the blogPosts array
  const updatedBlogFileContent = blogFileContent.replace(
    'export const blogPosts = [',
    `export const blogPosts = [\n${newPostJs}`,
  )

  fs.writeFileSync(blogPostsPath, updatedBlogFileContent, 'utf8')
  console.log(`✅ Appended new article to ${blogPostsPath}`)

  // Update sitemap.xml
  updateSitemap(candidate)

  console.log('🎉 Dynamic blog publishing completed successfully!')
  return candidate
}

function updateSitemap(post) {
  if (!fs.existsSync(sitemapPath)) return

  let sitemap = fs.readFileSync(sitemapPath, 'utf8')

  const postUrl = `https://www.dhanshirigarden.com/#blog?post=${post.slug}`

  if (sitemap.includes(post.slug)) {
    console.log(`ℹ️ Sitemap already contains ${post.slug}`)
    return
  }

  const entry = `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`

  // Insert before </urlset>
  sitemap = sitemap.replace('</urlset>', `${entry}</urlset>`)
  fs.writeFileSync(sitemapPath, sitemap, 'utf8')
  console.log(`✅ Updated ${sitemapPath} with new blog URL`)
}

// Execute generator
generateNextBlogPost()
