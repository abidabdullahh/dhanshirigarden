/**
 * Business facts + switches the owner may want to edit. Nothing here is translated;
 * all visible copy lives in content.js.
 */
export const site = {
  website: 'https://www.dhanshirigarden.com',
  domain: 'www.dhanshirigarden.com',

  whatsapp: '8801739203981',

  phones: [
    { number: '01739-203981', tel: '+8801739203981', label: { bn: 'আমির আলী', en: 'Amir Ali' } },
    { number: '01759-592324', tel: '+8801759592324', label: { bn: 'ল্যান্ডস্কেপিং জিজ্ঞাসা', en: 'Landscaping queries' } },
  ],

  email: 'dhanshirigarden@gmail.com',

  stats: { years: 3, projects: 45, plants: 30000 },

  /**
   * The Gallery and Projects photos are Pexels stock images that stand in for real
   * project photography. While this is true, small notes say the photos are illustrative.
   * Replace the photos with your own (see src/data/images.js), then set this to false.
   */
  illustrativePhotos: true,

  /**
   * Social links. Leave a value as '' and its icon is hidden automatically.
   * Fill in the real URLs (e.g. 'https://facebook.com/...') to switch them on.
   */
  social: {
    founder: { facebook: 'https://www.facebook.com/amirali.saao', instagram: '', linkedin: '', youtube: '' },
    company: { facebook: 'https://www.facebook.com/dhanshirigarden/', instagram: '', youtube: '' },
  },

  /**
   * Plant Doctor backend. GitHub Pages is static, so the Anthropic API key can never
   * live in this site. Deploy worker/plant-doctor-worker.js (see README) and set the
   * repository variable PLANT_DOCTOR_ENDPOINT. When empty the feature runs in demo mode.
   */
  plantDoctorEndpoint: (import.meta.env.VITE_PLANT_DOCTOR_ENDPOINT || '').trim(),
}
