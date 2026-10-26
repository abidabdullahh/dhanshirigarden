/**
 * Fails when the Bangla and English copy in src/data/content.js drift apart
 * (different keys, different list lengths, or different {placeholders}).
 * Run with: npm run check:content
 */
import { content } from '../src/data/content.js'

const problems = []

function walk(bn, en, path) {
  if (Array.isArray(bn) || Array.isArray(en)) {
    if (!Array.isArray(bn) || !Array.isArray(en)) {
      problems.push(`${path}: one side is a list, the other is not`)
      return
    }
    if (bn.length !== en.length) problems.push(`${path}: list length ${bn.length} (bn) vs ${en.length} (en)`)
    bn.forEach((item, i) => walk(item, en[i], `${path}[${i}]`))
    return
  }
  if (bn && typeof bn === 'object') {
    if (!en || typeof en !== 'object') {
      problems.push(`${path}: one side is a group, the other is not`)
      return
    }
    const bnKeys = Object.keys(bn)
    const enKeys = Object.keys(en)
    bnKeys.filter((k) => !enKeys.includes(k)).forEach((k) => problems.push(`${path}.${k}: missing in en`))
    enKeys.filter((k) => !bnKeys.includes(k)).forEach((k) => problems.push(`${path}.${k}: missing in bn`))
    bnKeys.filter((k) => enKeys.includes(k)).forEach((k) => walk(bn[k], en[k], `${path}.${k}`))
    return
  }
  if (typeof bn !== typeof en) {
    problems.push(`${path}: type ${typeof bn} (bn) vs ${typeof en} (en)`)
    return
  }
  if (typeof bn === 'string') {
    const find = (text) => (text.match(/\{\w+\}/g) || []).sort().join(' ')
    if (find(bn) !== find(en)) problems.push(`${path}: placeholders differ (${find(bn) || 'none'} vs ${find(en) || 'none'})`)
    if (!bn.trim() && en.trim()) problems.push(`${path}: empty in bn`)
    if (bn.trim() && !en.trim()) problems.push(`${path}: empty in en`)
  }
}

walk(content.bn, content.en, 'content')

if (problems.length) {
  console.error(`Copy check failed (${problems.length}):\n- ${problems.join('\n- ')}`)
  process.exit(1)
}
console.log('Copy check passed: Bangla and English have identical structure.')
