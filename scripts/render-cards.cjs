const { chromium } = require('playwright')
const fs = require('fs/promises')
const path = require('path')

const PORT = process.env.PORT || 4000
const BASE = `http://localhost:${PORT}`

async function main() {
  const dataPath = path.join(process.cwd(), 'data', 'cards.json')
  const outDir = path.join(process.cwd(), 'out', 'cards')
  await fs.mkdir(outDir, { recursive: true })

  const items = JSON.parse(await fs.readFile(dataPath, 'utf8'))

  const browser = await chromium.launch()
  const ctx = await browser.newContext({ deviceScaleFactor: 2 })

  for (const it of items) {
    const params = new URLSearchParams({
      title: it.title ?? '',
      subtitle: it.subtitle ?? '',
      badge: it.badge ?? '',
      handle: it.handle ?? '',
      w: String(it.w ?? 1200),
      h: String(it.h ?? 630),
      theme: it.theme ?? 'dark'
    })
    const url = `${BASE}/og?${params.toString()}`
    const page = await ctx.newPage()
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(200) // ensure fonts settled
    const card = page.locator('#card')
    await card.waitFor({ state: 'visible' })
    await card.screenshot({ path: path.join(outDir, `${it.slug}.png`) })
    await page.close()
    console.log('✓ saved', path.join('out', 'cards', `${it.slug}.png`))
  }

  await ctx.close()
  await browser.close()
}

main().catch((e) => { console.error(e); process.exit(1) })
