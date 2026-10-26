import { site } from '../data/site'

const templates = {
  bn: {
    generic: 'হ্যালো, আমি আমার বাগান/ল্যান্ডস্কেপ প্রকল্পের জন্য বিনামূল্যে পরামর্শ নিতে চাই।',
    service: (service) => `হ্যালো, আমি “${service}” সেবা সম্পর্কে জানতে চাই।`,
    plan: (plan) => `হ্যালো, আমি “${plan}” বুক করতে চাই।`,
    both: (service, plan) => `হ্যালো, আমি “${service}” সেবার জন্য “${plan}” নিতে চাই।`,
  },
  en: {
    generic: "Hello, I'd like a free consultation for my garden / landscape project.",
    service: (service) => `Hello, I'd like to know more about "${service}".`,
    plan: (plan) => `Hello, I'd like to book the "${plan}".`,
    both: (service, plan) => `Hello, I'd like the "${plan}" for "${service}".`,
  },
}

/** Pre-filled WhatsApp lead link, e.g. getWhatsAppLink('Rooftop Garden', null, 'en'). */
export function getWhatsAppLink(serviceName, planName, lang = 'bn') {
  const tpl = templates[lang] || templates.bn
  let message = tpl.generic
  if (serviceName && planName) message = tpl.both(serviceName, planName)
  else if (planName) message = tpl.plan(planName)
  else if (serviceName) message = tpl.service(serviceName)
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

/** WhatsApp link with a fully custom message (used by Plant Doctor). */
export const getCustomWhatsAppLink = (message) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
