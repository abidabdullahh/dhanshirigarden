const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

/** Replace every ASCII digit in a value with its Bangla numeral. */
export const toBn = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)])

/** Keep digits as-is for English, convert to Bangla numerals for Bangla. */
export const localizeDigits = (value, lang) => (lang === 'bn' ? toBn(value) : String(value))

/** 30000 -> "30,000" / "৩০,০০০" */
export const formatNumber = (n, lang) => localizeDigits(Number(n).toLocaleString('en-US'), lang)

/** Fill {placeholders} in a copy string: fill('{done}/{total}', { done: 1, total: 3 }) */
export const fill = (template, vars = {}) =>
  String(template).replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match))
