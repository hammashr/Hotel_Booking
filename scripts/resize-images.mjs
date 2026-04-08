/**
 * resize-images.mjs
 *
 * One-time script — run on the VPS BEFORE `npm run build`.
 * Resizes every JPG/JPEG/PNG in src/assets/homes/ to a maximum of 2048 px
 * on the longest side, at 95% JPEG quality.
 *
 * WHY this approach:
 *   - Camera photos are typically 5000–7000 px wide. No screen ever renders
 *     more than 2560 px, so the extra pixels are wasted bandwidth.
 *   - Resizing to 2048 px at 95% quality is visually identical on any display
 *     while reducing file size by 70–90 %.
 *   - Quality is NOT reduced below 95 % — no compression artefacts.
 *
 * Usage:
 *   node scripts/resize-images.mjs
 *
 * Safe to re-run: already-small images (≤ 2048 px) are skipped automatically.
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ASSETS_DIR = join(__dirname, '..', 'src', 'assets', 'homes')
const MAX_PX    = 2048   // maximum dimension (width OR height)
const QUALITY   = 95     // 95 % — visually lossless, ~70 % smaller file

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (e) => {
      const full = join(dir, e.name)
      if (e.isDirectory()) return getFiles(full)
      const ext = extname(e.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) return [full]
      return []
    })
  )
  return files.flat()
}

async function processImage(filePath) {
  const img    = sharp(filePath)
  const meta   = await img.metadata()
  const { width, height, format } = meta

  // Skip if already within limits
  if (width <= MAX_PX && height <= MAX_PX) {
    console.log(`  skip  ${filePath.split('src/assets/')[1]}  (${width}×${height})`)
    return
  }

  const beforeBytes = (await stat(filePath)).size
  const buf = await img
    .resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer()

  // Only overwrite if the new file is actually smaller (safety check)
  if (buf.length < beforeBytes) {
    const { writeFile } = await import('fs/promises')
    await writeFile(filePath, buf)
    const saving = Math.round((1 - buf.length / beforeBytes) * 100)
    console.log(`  ✓  ${filePath.split('src/assets/')[1].padEnd(45)}  ${(beforeBytes/1024).toFixed(0).padStart(6)} KB  →  ${(buf.length/1024).toFixed(0).padStart(5)} KB  (−${saving}%)`)
  } else {
    console.log(`  skip  ${filePath.split('src/assets/')[1]}  (already optimal)`)
  }
}

console.log(`\n🖼  Resizing images in src/assets/homes/  (max ${MAX_PX}px, quality ${QUALITY}%)\n`)
const files = await getFiles(ASSETS_DIR)
console.log(`Found ${files.length} image(s)\n`)

for (const f of files) {
  await processImage(f)
}

console.log('\n✅  Done. Run `npm run build` next.\n')
