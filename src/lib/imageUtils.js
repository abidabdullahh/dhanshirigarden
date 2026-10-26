/**
 * Reads an image file, scales it down so the longest side is <= maxDim and returns
 * a JPEG data URL plus its base64 payload. Keeps uploads small and fast.
 * (The browser applies EXIF orientation when drawing the <img> onto the canvas.)
 */
export function resizeImage(file, maxDim = 1024, quality = 0.86) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      reject(new Error('not-an-image'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('read-failed'))
    reader.onload = (event) => {
      const img = new Image()
      img.onerror = () => reject(new Error('decode-failed'))
      img.onload = () => {
        let { width, height } = img
        const longest = Math.max(width, height)
        if (longest > maxDim) {
          const scale = maxDim / longest
          width = Math.round(width * scale)
          height = Math.round(height * scale)
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        const base64 = dataUrl.split(',')[1] || ''
        resolve({ dataUrl, base64, mediaType: 'image/jpeg', width, height })
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  })
}
