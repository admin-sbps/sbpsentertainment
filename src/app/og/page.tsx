import { SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { SquaresGrid } from './SquaresGrid'
import { colorsFor } from './nfl-teams'

export const dynamic = 'force-dynamic'

type Props = {
  searchParams?: {
    title?: string
    subtitle?: string
    badge?: string
    handle?: string
    w?: string
    h?: string
    theme?: 'dark' | 'light'
    cta?: string
    accent?: string
    bg?: string
    bullets?: string
    teamTop?: string
    teamSide?: string
    showGrid?: string
    topNums?: string
    sideNums?: string
    team?: string // NEW: NFL team name (uses colors)
  }
}

const toNums = (csv?: string) => {
  const parts = (csv ?? '').split(',').map(s => s.trim()).filter(Boolean)
  return parts.length === 10 ? parts : undefined
}

export default function OGPage({ searchParams }: Props) {
  const {
    title,
    subtitle,
    badge = 'FOOTBALL SEASON',
    handle = '@superbowlpoolsite',
    cta = 'Create a Squares Contest →',
    bg = '',
    bullets = 'Free To Create,Free To Join,Great For Fundraisers',
    teamTop = searchParams?.team ?? 'Steelers',
    teamSide = 'Jets',
    showGrid = '0',
    topNums,
    sideNums,
    team
  } = searchParams ?? {}

  const w = Math.max(320, Number(searchParams?.w ?? 1080))
  const h = Math.max(320, Number(searchParams?.h ?? 1350))
  const dark = (searchParams?.theme ?? 'dark') === 'dark'

  // Team-driven colors
  const teamColors = colorsFor(team ?? teamTop)
  const accent = searchParams?.accent ?? (teamColors?.primary ?? '#FFC107')
  const bgFrom = teamColors?.secondary ?? (dark ? '#0b1220' : '#ffffff')
  const bgTo = teamColors?.primary ?? (dark ? '#3730a3' : '#e2e8f0')

  const finalTitle =
    title ?? (team ? `Create A Squares Contest For Every ${team} Game!` : 'Squares for Every NFL Game')
  const finalSubtitle =
    subtitle ?? 'Run Super Bowl–style squares all season'

  const bulletsArr = bullets.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className={[ 'min-h-screen w-screen grid place-items-center', dark ? 'bg-[#0b1220]' : 'bg-white' ].join(' ')} style={{ overflow: 'hidden' }}>
      <div
        id="card"
        className="relative rounded-2xl p-10 flex flex-col text-white"
        style={{
          width: w,
          height: h,
          background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 70%)`
        }}
      >
        {bg ? (
          <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none"
               style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        ) : null}

        {/* Badge */}
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
                style={{ backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(2px)' }}>
            <SparklesIcon className="h-5 w-5" />
            {badge}
          </span>
        </div>

        {/* Title & subtitle */}
        <div className="mt-6 relative">
          <h1 className="font-display font-bold leading-tight" style={{ fontSize: Math.max(40, Math.min(w * 0.07, 72)) }}>
            {finalTitle}
          </h1>
          <p className="mt-3 text-xl/7 text-white/90">{finalSubtitle}</p>
        </div>

        {/* Bullets */}
        <div className="mt-6 space-y-3 relative">
          {bulletsArr.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <CheckCircleIcon className="h-6 w-6" style={{ color: accent }} />
              <span className="text-lg">{t}</span>
            </div>
          ))}
        </div>

        {/* Optional demo grid */}
        {showGrid === '1' && (
          <div className="mt-8 relative">
            <SquaresGrid
              teamTop={teamTop}
              teamSide={teamSide}
              accent={accent}
              cellPx={72}
              headerPx={48}
              labels
              topNums={toNums(topNums)}
              sideNums={toNums(sideNums)}
            />
          </div>
        )}

        {/* CTA & footer */}
        <div className="mt-8 relative">
          <div className="inline-flex items-center rounded-xl px-5 py-3 text-base font-semibold shadow-sm"
               style={{ backgroundColor: accent, color: '#0b1220' }}>
            {cta}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-8 relative text-white/85">
          <div className="text-base">{handle}</div>
          <div className="text-sm">SBPS • {new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })}</div>
        </div>

        <div className="pointer-events-none absolute inset-10 rounded-2xl border border-white/10" />
      </div>
    </div>
  )
}
