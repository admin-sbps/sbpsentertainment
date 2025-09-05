import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.join(process.cwd(), 'out', 'banners')
fs.mkdirSync(OUT_DIR, { recursive: true })

// Map each size to a dedicated route we can screenshot.
// We'll screenshot the exact DOM nodes by data-testid.
const targets = [
  { name: 'sbps-300x250', selector: 'a[style*="width: 300px"][style*="height: 250px"]' },
  { name: 'sbps-336x280', selector: 'a[style*="width: 336px"][style*="height: 280px"]' },
  { name: 'sbps-728x90',  selector: 'a[style*="width: 728px"][style*="height: 90px"]'  },
  { name: 'sbps-160x600', selector: 'a[style*="width: 160px"][style*="height: 600px"]' },
]

const url = process.env.RENDER_URL || 'http://localhost:3000/ads/preview'

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ deviceScaleFactor: 2 }) // Retina crisp
  await page.goto(url, { waitUntil: 'networkidle' })

  for (const t of targets) {
    const el = await page.waitForSelector(t.selector, { state: 'visible', timeout: 10000 })
    const file = path.join(OUT_DIR, `${t.name}.png`)
    await el.screenshot({ path: file })
    console.log('Saved', file)
  }

  await browser.close()
})().catch(err => {
  console.error(err)
  process.exit(1)
})
