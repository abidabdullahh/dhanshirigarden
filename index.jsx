import React, { useState, useEffect, useRef } from 'react';
import {
  Leaf, Menu, X, Phone, Mail, MapPin, Camera, Loader2, Sparkles,
  ChevronRight, MessageCircle, Ruler, CheckCircle2, AlertTriangle,
  Sprout, TreePine, Scissors, Droplets, Home, Flower2,
} from 'lucide-react';

/* ---------------------------------------------------------------
   TOKENS — 6 named colors, 4 font roles. See build notes at bottom
   of chat message for the reasoning behind each.
----------------------------------------------------------------*/
const COLORS = {
  forest: '#1b4332',
  emerald: '#2d6a4f',
  bright: '#52b788',
  cream: '#f8f9fa',
  creamAlt: '#f4f1de',
  ink: '#3a5a73',
  charcoal: '#212529',
};

const glassGreen = {
  backgroundColor: 'rgba(82,183,136,0.14)',
  backdropFilter: 'blur(18px) saturate(180%)',
  WebkitBackdropFilter: 'blur(18px) saturate(180%)',
  border: '1px solid rgba(82,183,136,0.35)',
};

/* ---------------------------------------------------------------
   CONTENT
----------------------------------------------------------------*/
const translations = {
  bn: {
    brand: 'ধানসিঁড়ি গার্ডেন',
    nav: { services: 'সেবা', plantDoctor: 'উদ্ভিদ ডাক্তার', pricing: 'মূল্য', contact: 'যোগাযোগ' },
    callNow: 'কল করুন',
    whatsappGenericMsg: 'হ্যালো, আমি আমার বাগান/ল্যান্ডস্কেপ প্রকল্পের জন্য একটি ফ্রি পরামর্শ চাই।',
    heroEyebrow: 'ঢাকা ও নওগাঁ জুড়ে সেবা',
    heroTitle: 'প্রকৃতির সাথে বাসস্থান, জীবন হোক সবুজ ও সুন্দর',
    heroSub: 'সরকারি কৃষি সম্প্রসারণের দশকের অভিজ্ঞতা, এখন আপনার বাড়ির আঙিনায়।',
    ctaPrimary: 'হোয়াটসঅ্যাপে ফ্রি পরামর্শ',
    ctaSecondary: 'প্ল্যান দেখুন',
    statExperience: 'বছরের অভিজ্ঞতা',
    statProjects: 'সম্পন্ন প্রকল্প',
    statNursery: 'নার্সারি গাছ',
    servicesEyebrow: 'আমাদের সেবা',
    servicesTitle: 'সিগনেচার সেবা',
    servicesSub: 'আঙিনা থেকে ছাদ পর্যন্ত — প্রতিটি জায়গার জন্য যত্নসহকারে করা ডিজাইন।',
    services: {
      landscapeDesign: { title: 'ল্যান্ডস্কেপ ডিজাইন', desc: 'খালি জমিকে জীবন্ত নকশায় রূপ দেওয়ার মাস্টারপ্ল্যান।' },
      verticalGarden: { title: 'ভার্টিক্যাল গার্ডেন', desc: 'সংকীর্ণ জায়গার জন্য প্রকৌশলগতভাবে তৈরি সবুজ দেয়াল।' },
      rooftopPlanter: { title: 'রুফটপ প্ল্যান্টার', desc: 'বর্ষাতেও টিকে থাকার মতো মজবুত ছাদ বাগান।' },
      lawnCarpeting: { title: 'লন কার্পেটিং', desc: 'মেঝের মতো নিখুঁতভাবে বিছানো ঘাসের লন।' },
      resortPlantation: { title: 'রিসোর্ট ও ট্রপিক্যাল প্ল্যান্টেশন', desc: 'হসপিটালিটি ও এস্টেট প্রকল্পের জন্য রিসোর্ট-মানের রোপণ।' },
      dripIrrigation: { title: 'ড্রিপ ইরিগেশন', desc: 'অপচয় কমায়, বৃদ্ধি কমায় না — এমন স্বয়ংক্রিয় সেচ ব্যবস্থা।' },
      polyHouse: { title: 'পলি হাউজ', desc: 'সারাবছর ফলনের জন্য জলবায়ু-নিয়ন্ত্রিত পরিবেশ।' },
    },
    bookVia: 'হোয়াটসঅ্যাপে বুক করুন',
    specializedTitle: 'বিশেষায়িত সক্ষমতা',
    specializedSub: 'ডেভেলপার, স্থপতি ও বড় প্রকল্পের জন্য',
    specialized: {
      masterPlanning: 'মাস্টার প্ল্যানিং',
      urbanDesign: 'আরবান ডিজাইন',
      hardscaping: 'হার্ডস্কেপিং ও নির্মাণ',
      treePlantation: 'বৃক্ষরোপণ',
      architecturalLighting: 'স্থাপত্য আলোকসজ্জা',
      seedDistribution: 'বীজ আমদানি ও বিতরণ',
    },
    plantDoctorEyebrow: 'এআই-চালিত রোগ নির্ণয়',
    plantDoctorTitle: 'আপনার গাছের ছবি দিন, সমাধান নিন',
    plantDoctorSub: 'দশকের কৃষি অভিজ্ঞতায় প্রশিক্ষিত — এখন আপনার হাতের মুঠোয়।',
    uploadCta: 'ছবি আপলোড করুন',
    uploadHint: 'স্পষ্ট ছবি দিন (JPG/PNG) — আক্রান্ত পাতা বা গাছের',
    analyzeCta: 'বিশ্লেষণ করুন',
    tryAgain: 'আরেকটি ছবি দিন',
    diagnosisLabel: 'সম্ভাব্য রোগ নির্ণয়',
    careSteps: 'পরিচর্যার ধাপ',
    prevention: 'প্রতিরোধ টিপস',
    bookVisit: 'বিশেষজ্ঞ ভিজিট বুক করুন',
    bookVisitMsgPrefix: 'উদ্ভিদ ডাক্তার রোগ নির্ণয়',
    plantDoctorTrust: 'কয়েক দশকের বাংলাদেশি কৃষি অভিজ্ঞতার ভিত্তিতে তৈরি এআই-সহায়ক রোগ নির্ণয়।',
    loadingMessages: ['পাতার ধরণ বিশ্লেষণ করা হচ্ছে...', 'সম্ভাব্য সমস্যা পরীক্ষা করা হচ্ছে...', 'পরিচর্যার পরামর্শ তৈরি হচ্ছে...'],
    analysisErrorMsg: 'বিশ্লেষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    imageErrorMsg: 'ছবি লোড করা যায়নি। আবার চেষ্টা করুন।',
    pricingEyebrow: 'সাবস্ক্রিপশন প্ল্যান',
    pricingTitle: 'প্রতিটি বাগানের জন্য পরিচর্যা প্ল্যান',
    mostPopular: 'সর্বাধিক জনপ্রিয়',
    plans: {
      daily: { name: 'ডেইলি কেয়ার প্ল্যান', desc: 'একদিনের পরিচর্যা (কীটনাশক ছাড়া)', period: 'ভিজিট' },
      monthly: { name: 'মাসিক প্ল্যান', desc: 'মাসে ৩ বার, সম্পূর্ণ স্বাস্থ্য পরীক্ষা', period: 'মাস' },
      halfYearly: { name: 'ষান্মাসিক প্ল্যান', desc: '৬ মাসে ১৮টি ভিজিট', period: '৬ মাস' },
    },
    corporateOffice: 'কর্পোরেট অফিস',
    nurseryCenter: 'নার্সারি ও উৎপাদন কেন্দ্র',
    dhakaAddress: 'ক-২৬/১, মহাখালী, ঢাকা-১২১২',
    naogaonAddress: 'সুলতানপুর, পণ্ডিত পাড়া, নওগাঁ সদর, নওগাঁ-৬৫০০',
    footerNote: 'ফল, ঔষধি ও কাঠজাতীয় গাছে বিশেষায়িত।',
  },
  en: {
    brand: 'Dhanshiri Garden',
    nav: { services: 'Services', plantDoctor: 'Plant Doctor', pricing: 'Pricing', contact: 'Contact' },
    callNow: 'Call Now',
    whatsappGenericMsg: "Hi, I'd like a free consultation for my garden/landscape project.",
    heroEyebrow: 'Serving Dhaka & Naogaon',
    heroTitle: 'Living with Nature: Crafting Sustainable, Vibrant Green Spaces',
    heroSub: 'Decades of government agronomy expertise, now in your own front yard.',
    ctaPrimary: 'Free Consultation on WhatsApp',
    ctaSecondary: 'Explore Our Plans',
    statExperience: 'Years Experience',
    statProjects: 'Projects Delivered',
    statNursery: 'Nursery Plants',
    servicesEyebrow: 'What We Do',
    servicesTitle: 'Signature Services',
    servicesSub: 'From courtyard to rooftop — considered design for every kind of space.',
    services: {
      landscapeDesign: { title: 'Landscape Design', desc: 'Master plans that turn empty plots into living compositions.' },
      verticalGarden: { title: 'Vertical Garden', desc: "Living walls engineered for Dhaka's tightest footprints." },
      rooftopPlanter: { title: 'Rooftop Planter', desc: 'Structurally-sound rooftop greenery, built for monsoon.' },
      lawnCarpeting: { title: 'Lawn Carpeting', desc: 'Precision-cut turf laid like a finished floor.' },
      resortPlantation: { title: 'Resort & Tropical Plantation', desc: 'Resort-grade tropical planting for hospitality & estates.' },
      dripIrrigation: { title: 'Drip Irrigation', desc: 'Automated watering that cuts waste, not growth.' },
      polyHouse: { title: 'Poly House', desc: 'Climate-controlled growing for year-round yield.' },
    },
    bookVia: 'Book via WhatsApp',
    specializedTitle: 'Specialized Capabilities',
    specializedSub: 'For developers, architects & large-scale estates',
    specialized: {
      masterPlanning: 'Master Planning',
      urbanDesign: 'Urban Design',
      hardscaping: 'Hardscaping & Construction',
      treePlantation: 'Tree Plantation',
      architecturalLighting: 'Architectural Lighting',
      seedDistribution: 'Seed Import & Distribution',
    },
    plantDoctorEyebrow: 'AI-Powered Diagnosis',
    plantDoctorTitle: "Show Us Your Plant, We'll Tell You What It Needs",
    plantDoctorSub: 'Trained on decades of agronomy expertise — right in your pocket.',
    uploadCta: 'Upload a Photo',
    uploadHint: 'JPG or PNG — a clear shot of the affected leaf or plant',
    analyzeCta: 'Analyze Photo',
    tryAgain: 'Try Another Photo',
    diagnosisLabel: 'Likely Diagnosis',
    careSteps: 'Care Steps',
    prevention: 'Prevention Tips',
    bookVisit: 'Book a Professional Visit',
    bookVisitMsgPrefix: 'Plant Doctor diagnosis',
    plantDoctorTrust: 'AI-assisted diagnosis, grounded in decades of Bangladesh agronomy expertise.',
    loadingMessages: ['Analyzing leaf patterns...', 'Checking for common issues...', 'Preparing your care plan...'],
    analysisErrorMsg: 'Something went wrong analyzing the photo. Please try again.',
    imageErrorMsg: 'Could not load image. Please try again.',
    pricingEyebrow: 'Subscription Plans',
    pricingTitle: 'Care Plans for Every Garden',
    mostPopular: 'Most Popular',
    plans: {
      daily: { name: 'Daily Care Plan', desc: 'Single-visit maintenance, no pesticides', period: 'visit' },
      monthly: { name: 'Monthly Plan', desc: '3 visits a month, full health check', period: 'month' },
      halfYearly: { name: 'Half-Yearly Plan', desc: '18 visits across 6 months', period: '6 months' },
    },
    corporateOffice: 'Corporate Office',
    nurseryCenter: 'Nursery & Production Center',
    dhakaAddress: 'K-26/1, Mohakhali, Dhaka 1212',
    naogaonAddress: 'Sultanpur, Pandit Para, Naogaon Sadar, Naogaon 6500',
    footerNote: 'Specialized in fruit, medicinal & timber plants.',
  },
};

const coreServices = [
  { key: 'landscapeDesign', icon: Ruler },
  { key: 'verticalGarden', icon: Sprout },
  { key: 'rooftopPlanter', icon: TreePine },
  { key: 'lawnCarpeting', icon: Scissors },
  { key: 'resortPlantation', icon: Flower2 },
  { key: 'dripIrrigation', icon: Droplets },
  { key: 'polyHouse', icon: Home },
];

const specializedKeys = ['masterPlanning', 'urbanDesign', 'hardscaping', 'treePlantation', 'architecturalLighting', 'seedDistribution'];

const navItems = [
  { key: 'services', href: '#services' },
  { key: 'plantDoctor', href: '#plant-doctor' },
  { key: 'pricing', href: '#pricing' },
  { key: 'contact', href: '#contact' },
];

const pricingPlans = [
  { key: 'daily', priceBn: '১,১৯৯', priceEn: '1,199' },
  { key: 'monthly', priceBn: '৪,৪৯৯', priceEn: '4,499' },
  { key: 'halfYearly', priceBn: '২৪,৯৯৯', priceEn: '24,999' },
];

function getWhatsAppLink(message) {
  return `https://wa.me/8801739203981?text=${encodeURIComponent(message)}`;
}

function resizeImageToDataUrl(file, maxDim = 1024) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > h && w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; }
        else if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => reject(new Error('image load failed'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('file read failed'));
    reader.readAsDataURL(file);
  });
}

/* ---------------------------------------------------------------
   SMALL COMPONENTS
----------------------------------------------------------------*/
function LangToggle({ lang, setLang, compact }) {
  return (
    <div
      className="relative flex items-center rounded-full p-1"
      style={{ ...glassGreen, width: compact ? '96px' : '108px', height: '40px' }}
    >
      <div
        className="absolute rounded-full transition-transform duration-300"
        style={{
          backgroundColor: COLORS.forest,
          width: compact ? '42px' : '48px',
          height: '32px',
          top: '4px',
          left: '4px',
          transform: lang === 'bn' ? 'translateX(0px)' : `translateX(${compact ? 42 : 48}px)`,
        }}
      />
      <button
        type="button"
        onClick={() => setLang('bn')}
        className="font-display-bn relative z-10 flex-1 text-sm font-semibold transition-colors duration-300"
        style={{ color: lang === 'bn' ? '#ffffff' : 'rgba(33,37,41,0.55)' }}
      >
        বাং
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className="font-body-en relative z-10 flex-1 text-sm font-semibold transition-colors duration-300"
        style={{ color: lang === 'en' ? '#ffffff' : 'rgba(33,37,41,0.55)' }}
      >
        EN
      </button>
    </div>
  );
}

function DimensionStat({ value, label, font }) {
  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex items-center gap-1 mb-2">
        <div style={{ width: '1px', height: '9px', backgroundColor: COLORS.ink }} />
        <div style={{ width: '48px', height: '1px', backgroundColor: COLORS.ink }} />
        <div style={{ width: '1px', height: '9px', backgroundColor: COLORS.ink }} />
      </div>
      <span className="font-utility text-xl md:text-2xl font-semibold" style={{ color: COLORS.forest }}>{value}</span>
      <span className={`${font} text-xs uppercase mt-1 text-center`} style={{ color: 'rgba(33,37,41,0.55)', letterSpacing: '0.03em' }}>{label}</span>
    </div>
  );
}

function CutDivider({ bg }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: '1px', backgroundColor: 'rgba(27,67,50,0.15)' }}>
      <div className="absolute flex items-center justify-center rounded-full" style={{ backgroundColor: bg, width: '36px', height: '36px' }}>
        <Scissors size={16} style={{ color: COLORS.emerald, transform: 'rotate(90deg)' }} />
      </div>
    </div>
  );
}

function SprigAccent({ opacity = 0.14, style }) {
  return (
    <svg viewBox="0 0 200 300" style={{ position: 'absolute', pointerEvents: 'none', opacity, ...style }} fill="none">
      <path d="M100 280 C95 220, 105 160, 100 20" stroke={COLORS.forest} strokeWidth="2" strokeLinecap="round" />
      <path d="M100 220 C130 210, 150 180, 160 140" stroke={COLORS.forest} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 220 C70 210, 50 180, 40 140" stroke={COLORS.forest} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 160 C125 152, 140 130, 148 100" stroke={COLORS.forest} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 160 C75 152, 60 130, 52 100" stroke={COLORS.forest} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 100 C118 94, 128 78, 133 55" stroke={COLORS.forest} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 100 C82 94, 72 78, 67 55" stroke={COLORS.forest} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   MAIN
----------------------------------------------------------------*/
export default function DhanshiriGardenSite() {
  const [lang, setLang] = useState('bn');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [plantPreview, setPlantPreview] = useState(null);
  const [plantImageData, setPlantImageData] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const fileInputRef = useRef(null);

  const t = translations[lang];
  const headingFont = lang === 'bn' ? 'font-display-bn' : 'font-body-en';
  const bodyFont = lang === 'bn' ? 'font-body-bn' : 'font-body-en';
  const labelFont = lang === 'bn' ? 'font-body-bn' : 'font-utility';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!analyzing) return undefined;
    const len = t.loadingMessages.length;
    const interval = setInterval(() => setLoadingMsgIndex((i) => (i + 1) % len), 1400);
    return () => clearInterval(interval);
  }, [analyzing, lang, t.loadingMessages.length]);

  const handleFileSelect = async (file) => {
    if (!file) return;
    setAnalysisError(null);
    setAnalysisResult(null);
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      setPlantPreview(dataUrl);
      const match = dataUrl.match(/^data:(.*);base64,(.*)$/);
      if (match) setPlantImageData({ mediaType: match[1], base64: match[2] });
    } catch (err) {
      setAnalysisError(t.imageErrorMsg);
    }
  };

  const resetPlantDoctor = () => {
    setPlantPreview(null);
    setPlantImageData(null);
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const analyzePlant = async () => {
    if (!plantImageData) return;
    setAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    setLoadingMsgIndex(0);

    const promptBn = 'আপনি একজন অভিজ্ঞ কৃষিবিদ এবং উদ্ভিদ রোগ বিশেষজ্ঞ, যিনি বাংলাদেশের গৃহস্থালি বাগান ও ল্যান্ডস্কেপিং সম্পর্কে গভীর জ্ঞান রাখেন। সংযুক্ত ছবিতে থাকা গাছটি পরীক্ষা করে সবচেয়ে সম্ভাব্য সমস্যা (পোকামাকড়, রোগ, পুষ্টির ঘাটতি, পানির সমস্যা) সনাক্ত করুন, অথবা নিশ্চিত করুন গাছটি সুস্থ আছে কিনা। শুধুমাত্র নিচের কাঠামোয় বৈধ JSON আকারে উত্তর দিন, কোনো markdown, কোড ফেন্স বা অতিরিক্ত মন্তব্য ছাড়া: {"diagnosis": "সংক্ষিপ্ত রোগ নির্ণয়", "explanation": "সহজ ভাষায় ২-৩ বাক্যের ব্যাখ্যা", "careSteps": ["ধাপ ১", "ধাপ ২", "ধাপ ৩"], "preventionTips": ["টিপস ১", "টিপস ২"]} সব মান বাংলায়, সাধারণ গৃহস্থ বাগানির জন্য সহজবোধ্য করে লিখুন।';

    const promptEn = 'You are a senior agronomist and plant pathologist with deep expertise in home gardening and landscaping in Bangladesh. Examine the attached plant photo and identify the most likely issue (pest, disease, nutrient deficiency, or watering problem), or confirm the plant is healthy. Respond ONLY with valid JSON, no markdown, no code fences, no extra commentary, in exactly this shape: {"diagnosis": "short diagnosis name", "explanation": "2-3 sentence plain-language explanation", "careSteps": ["step 1", "step 2", "step 3"], "preventionTips": ["tip 1", "tip 2"]}. Keep it practical for a home gardener.';

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: plantImageData.mediaType, data: plantImageData.base64 } },
              { type: 'text', text: lang === 'bn' ? promptBn : promptEn },
            ],
          }],
        }),
      });
      const data = await response.json();
      const textBlocks = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
      const cleaned = textBlocks.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setAnalysisResult(parsed);
    } catch (err) {
      setAnalysisError(t.analysisErrorMsg);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.cream, color: COLORS.charcoal }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Baloo+Da+2:wght@600;700&display=swap');
        @font-face {
          font-family: 'Li Ador Noirrit';
          src: url('https://db.onlinewebfonts.com/t/3565357604fee3776c402d09091028bb.woff2') format('woff2'),
               url('https://db.onlinewebfonts.com/t/3565357604fee3776c402d09091028bb.woff') format('woff');
          font-display: swap;
        }
        .font-display-bn { font-family: 'Li Ador Noirrit', 'Baloo Da 2', sans-serif; }
        .font-body-bn { font-family: 'Hind Siliguri', sans-serif; }
        .font-body-en { font-family: 'Inter', ui-sans-serif, sans-serif; }
        .font-utility { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .blueprint-grid {
          background-image:
            linear-gradient(rgba(27,67,50,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,67,50,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .mesh-glow {
          background-image:
            radial-gradient(circle at 15% 20%, rgba(82,183,136,0.22), transparent 45%),
            radial-gradient(circle at 85% 65%, rgba(45,106,79,0.16), transparent 50%);
        }
        a:focus-visible, button:focus-visible, input:focus-visible {
          outline: 2px solid #2d6a4f;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ---------------- NAVBAR ---------------- */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={
          scrolled
            ? { ...glassGreen, borderRadius: 0 }
            : { backgroundColor: 'transparent', border: '1px solid transparent' }
        }
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full p-2" style={{ backgroundColor: COLORS.forest }}>
              <Leaf size={16} color={COLORS.cream} />
            </div>
            <span className={`${headingFont} text-lg font-semibold`} style={{ color: COLORS.forest }}>{t.brand}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className={`${bodyFont} relative group text-sm font-medium`} style={{ color: COLORS.charcoal }}>
                <span className="flex items-center gap-1">
                  {item.key === 'plantDoctor' && <Sparkles size={12} style={{ color: COLORS.emerald }} />}
                  {t.nav[item.key]}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: COLORS.bright, transformOrigin: 'left' }}
                />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LangToggle lang={lang} setLang={setLang} />
            <a
              href={getWhatsAppLink(t.whatsappGenericMsg)}
              className={`${bodyFont} flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105`}
              style={{ backgroundColor: COLORS.forest }}
            >
              <Phone size={13} /> {t.callNow}
            </a>
          </div>

          <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} style={{ color: COLORS.forest }} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(27,67,50,0.35)' }} onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 p-6 flex flex-col gap-6" style={{ ...glassGreen, backgroundColor: 'rgba(248,249,250,0.85)' }}>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="self-end" aria-label="Close menu">
              <X size={22} style={{ color: COLORS.forest }} />
            </button>
            {navItems.map((item) => (
              <a key={item.key} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`${bodyFont} text-base font-medium`} style={{ color: COLORS.charcoal }}>
                {t.nav[item.key]}
              </a>
            ))}
            <LangToggle lang={lang} setLang={setLang} />
            <a
              href={getWhatsAppLink(t.whatsappGenericMsg)}
              className={`${bodyFont} flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white`}
              style={{ backgroundColor: COLORS.forest }}
            >
              <Phone size={14} /> {t.callNow}
            </a>
          </div>
        </div>
      )}

      {/* ---------------- HERO ---------------- */}
      <section className="blueprint-grid relative pt-32 pb-16 px-6 overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
        <SprigAccent style={{ right: '2%', top: '8%', width: '220px' }} />
        <SprigAccent style={{ left: '0%', bottom: '-4%', width: '160px', transform: 'scaleX(-1) rotate(8deg)' }} opacity={0.1} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ backgroundColor: COLORS.creamAlt, border: `1px solid ${COLORS.bright}` }}>
            <Leaf size={13} style={{ color: COLORS.emerald }} />
            <span className={`${labelFont} text-xs font-medium uppercase`} style={{ color: COLORS.emerald, letterSpacing: '0.04em' }}>{t.heroEyebrow}</span>
          </div>
          <h1 className={`${headingFont} text-3xl md:text-5xl font-bold leading-tight mb-6`} style={{ color: COLORS.forest }}>
            {t.heroTitle}
          </h1>
          <p className={`${bodyFont} text-base md:text-lg mb-10 max-w-2xl mx-auto`} style={{ color: 'rgba(33,37,41,0.75)' }}>
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href={getWhatsAppLink(t.whatsappGenericMsg)}
              className={`${bodyFont} w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105`}
              style={{ backgroundColor: COLORS.forest }}
            >
              <MessageCircle size={16} /> {t.ctaPrimary}
            </a>
            <a
              href="#pricing"
              className={`${bodyFont} w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-transform hover:scale-105`}
              style={{ border: `1.5px solid ${COLORS.forest}`, color: COLORS.forest }}
            >
              {t.ctaSecondary} <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <DimensionStat value="XX+" label={t.statExperience} font={labelFont} />
            <DimensionStat value="XX+" label={t.statProjects} font={labelFont} />
            <DimensionStat value="XX+" label={t.statNursery} font={labelFont} />
          </div>
        </div>
      </section>

      <CutDivider bg={COLORS.cream} />

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className={`${labelFont} text-xs font-semibold uppercase`} style={{ color: COLORS.emerald, letterSpacing: '0.08em' }}>{t.servicesEyebrow}</span>
            <h2 className={`${headingFont} text-3xl md:text-4xl font-bold mt-3 mb-4`} style={{ color: COLORS.forest }}>{t.servicesTitle}</h2>
            <p className={`${bodyFont} text-sm md:text-base max-w-xl mx-auto`} style={{ color: 'rgba(33,37,41,0.7)' }}>{t.servicesSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {coreServices.map((service) => {
              const Icon = service.icon;
              const item = t.services[service.key];
              return (
                <div key={service.key} className="rounded-2xl p-6 md:p-8 bg-white transition-shadow duration-300 hover:shadow-xl" style={{ border: '1px solid rgba(27,67,50,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="rounded-full flex items-center justify-center mb-5" style={{ width: '48px', height: '48px', backgroundColor: COLORS.creamAlt }}>
                    <Icon size={21} strokeWidth={1.5} style={{ color: COLORS.emerald }} />
                  </div>
                  <h3 className={`${headingFont} text-lg font-semibold mb-2`} style={{ color: COLORS.forest }}>{item.title}</h3>
                  <p className={`${bodyFont} text-sm mb-5`} style={{ color: 'rgba(33,37,41,0.65)' }}>{item.desc}</p>
                  <a href={getWhatsAppLink(item.title)} className={`${bodyFont} inline-flex items-center gap-1.5 text-sm font-semibold`} style={{ color: COLORS.emerald }}>
                    {t.bookVia} <ChevronRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: COLORS.forest }}>
            <h3 className={`${headingFont} text-xl font-semibold text-white mb-1`}>{t.specializedTitle}</h3>
            <p className={`${bodyFont} text-sm mb-6`} style={{ color: 'rgba(255,255,255,0.7)' }}>{t.specializedSub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {specializedKeys.map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <ChevronRight size={14} style={{ color: COLORS.bright }} />
                  <span className={`${bodyFont} text-sm text-white`}>{t.specialized[key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PLANT DOCTOR (signature) ---------------- */}
      <section id="plant-doctor" className="blueprint-grid mesh-glow relative py-20 px-6 overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className={`${labelFont} text-xs font-semibold uppercase`} style={{ color: COLORS.ink, letterSpacing: '0.08em' }}>{t.plantDoctorEyebrow}</span>
            <h2 className={`${headingFont} text-3xl md:text-4xl font-bold mt-3 mb-4`} style={{ color: COLORS.forest }}>{t.plantDoctorTitle}</h2>
            <p className={`${bodyFont} text-sm md:text-base max-w-xl mx-auto`} style={{ color: 'rgba(33,37,41,0.7)' }}>{t.plantDoctorSub}</p>
          </div>

          <div className="rounded-2xl p-6 md:p-10" style={{ ...glassGreen, boxShadow: '0 8px 40px rgba(27,67,50,0.12)' }}>
            {!plantPreview && !analysisError && (
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files[0]); }}
                className="flex flex-col items-center justify-center text-center cursor-pointer rounded-2xl py-16 px-6"
                style={{ border: `2px dashed ${COLORS.bright}` }}
              >
                <div className="rounded-full flex items-center justify-center mb-4" style={{ width: '56px', height: '56px', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                  <Camera size={24} style={{ color: COLORS.emerald }} />
                </div>
                <p className={`${bodyFont} text-sm font-semibold mb-1`} style={{ color: COLORS.forest }}>{t.uploadCta}</p>
                <p className={`${bodyFont} text-xs`} style={{ color: 'rgba(33,37,41,0.55)' }}>{t.uploadHint}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
              </div>
            )}

            {plantPreview && !analysisResult && !analysisError && (
              <div className="flex flex-col items-center">
                <img src={plantPreview} alt="Uploaded plant" className="rounded-2xl mb-6 object-cover" style={{ maxHeight: '260px', width: 'auto' }} />
                {!analyzing && (
                  <div className="flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={analyzePlant} className={`${bodyFont} flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white`} style={{ backgroundColor: COLORS.forest }}>
                      <Sparkles size={15} /> {t.analyzeCta}
                    </button>
                    <button type="button" onClick={resetPlantDoctor} className={`${bodyFont} rounded-full px-6 py-3 text-sm font-semibold`} style={{ border: '1px solid rgba(33,37,41,0.2)', color: COLORS.charcoal }}>
                      {t.tryAgain}
                    </button>
                  </div>
                )}
                {analyzing && (
                  <div className={`${bodyFont} flex items-center gap-3 text-sm font-medium`} style={{ color: COLORS.emerald }}>
                    <Loader2 size={18} className="animate-spin" />
                    <span>{t.loadingMessages[loadingMsgIndex]}</span>
                  </div>
                )}
              </div>
            )}

            {analysisError && (
              <div className="flex flex-col items-center text-center py-6">
                <AlertTriangle size={26} style={{ color: '#b45309' }} className="mb-3" />
                <p className={`${bodyFont} text-sm mb-4`} style={{ color: COLORS.charcoal }}>{analysisError}</p>
                <button type="button" onClick={resetPlantDoctor} className={`${bodyFont} rounded-full px-6 py-2.5 text-sm font-semibold text-white`} style={{ backgroundColor: COLORS.forest }}>{t.tryAgain}</button>
              </div>
            )}

            {analysisResult && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                    <CheckCircle2 size={20} style={{ color: COLORS.emerald }} />
                  </div>
                  <div>
                    <p className={`${labelFont} text-xs font-semibold uppercase`} style={{ color: COLORS.ink, letterSpacing: '0.06em' }}>{t.diagnosisLabel}</p>
                    <h3 className={`${headingFont} text-lg font-bold`} style={{ color: COLORS.forest }}>{analysisResult.diagnosis}</h3>
                  </div>
                </div>
                <p className={`${bodyFont} text-sm mb-6`} style={{ color: 'rgba(33,37,41,0.8)' }}>{analysisResult.explanation}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className={`${labelFont} text-xs font-semibold uppercase mb-2`} style={{ color: COLORS.emerald, letterSpacing: '0.06em' }}>{t.careSteps}</p>
                    <ul className="space-y-2">
                      {(analysisResult.careSteps || []).map((step, i) => (
                        <li key={i} className={`${bodyFont} flex items-start gap-2 text-sm`} style={{ color: COLORS.charcoal }}>
                          <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: COLORS.bright }} />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className={`${labelFont} text-xs font-semibold uppercase mb-2`} style={{ color: COLORS.ink, letterSpacing: '0.06em' }}>{t.prevention}</p>
                    <ul className="space-y-2">
                      {(analysisResult.preventionTips || []).map((tip, i) => (
                        <li key={i} className={`${bodyFont} flex items-start gap-2 text-sm`} style={{ color: COLORS.charcoal }}>
                          <Leaf size={13} className="mt-0.5 flex-shrink-0" style={{ color: COLORS.ink }} />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4" style={{ borderTop: '1px solid rgba(27,67,50,0.12)' }}>
                  <a href={getWhatsAppLink(`${t.bookVisitMsgPrefix}: ${analysisResult.diagnosis}`)} className={`${bodyFont} flex-1 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white`} style={{ backgroundColor: COLORS.forest }}>
                    <MessageCircle size={15} /> {t.bookVisit}
                  </a>
                  <button type="button" onClick={resetPlantDoctor} className={`${bodyFont} flex-1 rounded-full px-6 py-3 text-sm font-semibold`} style={{ border: '1px solid rgba(33,37,41,0.2)', color: COLORS.charcoal, backgroundColor: 'rgba(255,255,255,0.4)' }}>
                    {t.tryAgain}
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className={`${bodyFont} text-center text-xs mt-6`} style={{ color: 'rgba(33,37,41,0.55)' }}>{t.plantDoctorTrust}</p>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className={`${labelFont} text-xs font-semibold uppercase`} style={{ color: COLORS.emerald, letterSpacing: '0.08em' }}>{t.pricingEyebrow}</span>
            <h2 className={`${headingFont} text-3xl md:text-4xl font-bold mt-3`} style={{ color: COLORS.forest }}>{t.pricingTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, idx) => {
              const item = t.plans[plan.key];
              return (
                <div
                  key={plan.key}
                  className="rounded-2xl p-8 bg-white flex flex-col transition-shadow duration-300 hover:shadow-xl"
                  style={{ border: idx === 1 ? `2px solid ${COLORS.forest}` : '1px solid rgba(27,67,50,0.08)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  {idx === 1 && (
                    <span className={`${labelFont} text-xs font-semibold uppercase mb-3 self-start rounded-full px-3 py-1`} style={{ backgroundColor: COLORS.forest, color: 'white', letterSpacing: '0.04em' }}>
                      {t.mostPopular}
                    </span>
                  )}
                  <h3 className={`${headingFont} text-lg font-semibold mb-1`} style={{ color: COLORS.forest }}>{item.name}</h3>
                  <p className={`${bodyFont} text-sm mb-5`} style={{ color: 'rgba(33,37,41,0.6)' }}>{item.desc}</p>
                  <div className="mb-6">
                    <span className="font-utility text-3xl font-semibold" style={{ color: COLORS.forest }}>
                      {lang === 'bn' ? `৳${plan.priceBn}` : `${plan.priceEn} TK`}
                    </span>
                    <span className={`${bodyFont} text-sm`} style={{ color: 'rgba(33,37,41,0.5)' }}> / {item.period}</span>
                  </div>
                  <a href={getWhatsAppLink(item.name)} className={`${bodyFont} mt-auto flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white`} style={{ backgroundColor: COLORS.forest }}>
                    <MessageCircle size={14} /> {t.bookVia}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER (no map) ---------------- */}
      <footer id="contact" className="py-16 px-6" style={{ backgroundColor: COLORS.forest }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="rounded-full p-2" style={{ backgroundColor: COLORS.bright }}>
              <Leaf size={16} style={{ color: COLORS.forest }} />
            </div>
            <span className={`${headingFont} text-lg font-semibold text-white`}>{t.brand}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} style={{ color: COLORS.bright }} />
                <span className={`${labelFont} text-xs font-semibold uppercase text-white`} style={{ letterSpacing: '0.06em' }}>{t.corporateOffice}</span>
              </div>
              <p className={`${bodyFont} text-sm`} style={{ color: 'rgba(255,255,255,0.85)' }}>{t.dhakaAddress}</p>
            </div>
            <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Sprout size={16} style={{ color: COLORS.bright }} />
                <span className={`${labelFont} text-xs font-semibold uppercase text-white`} style={{ letterSpacing: '0.06em' }}>{t.nurseryCenter}</span>
              </div>
              <p className={`${bodyFont} text-sm mb-1`} style={{ color: 'rgba(255,255,255,0.85)' }}>{t.naogaonAddress}</p>
              <p className={`${bodyFont} text-xs`} style={{ color: 'rgba(255,255,255,0.55)' }}>{t.footerNote}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="font-utility flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <a href="tel:+8801739203981" className="flex items-center gap-2"><Phone size={13} /> 01739-203981</a>
              <a href="tel:+8801759592324" className="flex items-center gap-2"><Phone size={13} /> 01759-592324</a>
              <a href="mailto:dhanshirigarden@gmail.com" className="flex items-center gap-2"><Mail size={13} /> dhanshirigarden@gmail.com</a>
            </div>
            <span className="font-utility text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>© 2026 {t.brand}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
