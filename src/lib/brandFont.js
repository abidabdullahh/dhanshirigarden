/**
 * Li Ador Noirrit (the requested Bangla display face) cannot be bundled with this
 * repo: the font is distributed by Lipighor Font Foundry under its own terms.
 *
 * To switch it on, drop the *Unicode* build of the font into src/assets/fonts/ :
 *
 *   LiAdorNoirrit-Regular.woff2   (or .woff / .ttf)
 *   LiAdorNoirrit-SemiBold.woff2  (optional, used for headings)
 *
 * Vite picks the files up at build time (hashed URL, correct GitHub Pages base
 * path, no 404 when absent). Until then Bangla headings fall back to Hind Siliguri.
 */
const files = import.meta.glob('../assets/fonts/*.{woff2,woff,ttf,otf}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const FORMAT_RANK = { woff2: 0, woff: 1, ttf: 2, otf: 3 }

function describe(path) {
  const name = path.split('/').pop().toLowerCase()
  const ext = name.split('.').pop()
  const semibold = /semi-?bold|bold|600|700/.test(name)
  return { ext, weight: semibold ? '600 800' : '400 500', rank: FORMAT_RANK[ext] ?? 9 }
}

export function loadBrandFont() {
  if (typeof document === 'undefined' || !('fonts' in document)) return
  const best = {}
  Object.entries(files).forEach(([path, url]) => {
    const info = describe(path)
    const current = best[info.weight]
    if (!current || info.rank < current.rank) best[info.weight] = { ...info, url }
  })
  Object.values(best).forEach(({ url, weight }) => {
    const face = new FontFace('Li Ador Noirrit', `url(${url})`, { weight, display: 'swap' })
    face
      .load()
      .then((loaded) => document.fonts.add(loaded))
      .catch(() => {
        /* font failed to load: the fallback stack keeps the page readable */
      })
  })
}
