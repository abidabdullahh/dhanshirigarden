/**
 * Optional real photos. Drop files into src/assets/team/ named after the person:
 *
 *   amir-ali.jpg        founder portrait (jpg, jpeg, png, webp or avif)
 *   horticulturist.jpg  team photos (optional)
 *   architect.jpg
 *   nurserymen.jpg
 *
 * Nothing breaks when a file is missing: the layout shows an illustrated placeholder.
 */
const files = import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => {
    const file = path.split('/').pop() || ''
    return [file.replace(/\.[^.]+$/, '').toLowerCase(), url]
  }),
)

export const teamPhoto = (name) => byName[name.toLowerCase()] || ''
