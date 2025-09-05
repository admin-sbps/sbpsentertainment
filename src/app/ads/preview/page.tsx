import BannerAd from '../_components/BannerAd'
import SquaresMini from '../_components/SquaresMini'

export const dynamic = 'force-static'

const logo = '/ads/logo.png'

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Ad Preview</h1>
      <p className="text-slate-600 mb-6">
        Click a banner to follow its link. Use the render script to export PNGs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <BannerAd
          size="300x250"
          logoSrc={logo}
          screenshotSrc="" // not used when visual is provided
          visual={<SquaresMini accent="#FACC15" width={220} height={90} />}
          headline="Create Squares Contests in Seconds"
          subStat="Free to start"
          cta="Start Free Today"
          href="https://superbowlpoolsite.com/"
          gradientFrom="from-blue-600"
          gradientTo="to-slate-900"
          borderAccent="border-yellow-300"
          darkCta
        />

        <BannerAd
          size="336x280"
          logoSrc={logo}
          screenshotSrc=""
          visual={<SquaresMini accent="#22D3EE" width={220} height={90} />}
          headline="Perfect for Fundraisers & Friends"
          subStat="Thousands each season"
          cta="Create Yours"
          href="https://superbowlpoolsite.com/"
          gradientFrom="from-indigo-600"
          gradientTo="to-zinc-900"
          borderAccent="border-amber-300"
          darkCta
        />

        <BannerAd
          size="728x90"
          logoSrc={logo}
          screenshotSrc=""
          visual={<SquaresMini accent="#F59E0B" width={160} height={38} />}
          headline="NFL & NCAAF Squares — Free to Start"
          subStat="Instant share link"
          cta="Get Started"
          href="https://superbowlpoolsite.com/"
          gradientFrom="from-blue-700"
          gradientTo="to-slate-900"
          borderAccent="border-yellow-300"
          darkCta
        />

        <BannerAd
          size="160x600"
          logoSrc={logo}
          screenshotSrc=""
          visual={<SquaresMini accent="#FACC15" width={120} height={120} />}
          headline="Create Squares for Every Game"
          subStat="No apps required"
          cta="Start Free"
          href="https://superbowlpoolsite.com/"
          gradientFrom="from-blue-700"
          gradientTo="to-slate-900"
          borderAccent="border-yellow-300"
          darkCta
        />
      </div>
    </main>
  )
}
