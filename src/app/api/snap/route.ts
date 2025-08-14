// src/app/api/snap/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { chromium } from 'playwright'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const params = new URLSearchParams(url.search)

  // Use localhost so Chromium in the container can reach the app
  const port = process.env.PORT || '3000' // Next dev defaults to 3000 unless you pass -p
  // If you run `npm run dev -- -p 4000`, PORT will be 4000 here.
  const base = `http://127.0.0.1:${port}`
  const ogUrl = `${base}/og?${params.toString()}`

  let browser
  try {
    browser = await chromium.launch({
      // Codespaces / many containers need no-sandbox
      args: ['--no-sandbox', '--disable-gpu'],
    })
    const ctx = await browser.newContext({ deviceScaleFactor: 2 })
    const page = await ctx.newPage()
    await page.goto(ogUrl, { waitUntil: 'networkidle' })
    await page.waitForTimeout(150)
    const card = page.locator('#card')
    await card.waitFor({ state: 'visible' })

    const buf = await card.screenshot()
    const body = new Uint8Array(buf)

    const w = params.get('w') ?? '1200'
    const h = params.get('h') ?? '630'

    await ctx.close()
    return new NextResponse(body, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="card-${w}x${h}.png"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    // Log to the server console so you can see the real error in the dev terminal
    console.error('[snap] failed:', err)
    return NextResponse.json(
      { error: 'Snap failed', details: String(err) },
      { status: 500 }
    )
  } finally {
    if (browser) await browser.close()
  }
}
