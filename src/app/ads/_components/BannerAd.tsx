import Image from 'next/image'
import clsx from 'clsx'

type BannerSize = '300x250' | '336x280' | '728x90' | '160x600'

const SIZE_MAP: Record<BannerSize, { w: number; h: number; text: string }> = {
  '300x250': { w: 300, h: 250, text: 'text-base' },
  '336x280': { w: 336, h: 280, text: 'text-base' },
  '728x90':  { w: 728, h: 90,  text: 'text-sm' },
  '160x600': { w: 160, h: 600, text: 'text-sm' },
}

export type BannerAdProps = {
  size: BannerSize
  logoSrc: string
  screenshotSrc: string
  headline: string
  subStat?: string
  cta: string
  href?: string
  gradientFrom?: string  // tailwind color like 'from-blue-600'
  gradientTo?: string    // tailwind color like 'to-slate-900'
  borderAccent?: string  // e.g. 'border-yellow-300'
  darkCta?: boolean
  visual?: React.ReactNode

}

export default function BannerAd({
  size,
  logoSrc,
  screenshotSrc,
  headline,
  subStat,
  cta,
  href = '#',
  gradientFrom = 'from-blue-600',
  gradientTo = 'to-slate-900',
  borderAccent = 'border-yellow-300',
  darkCta = true,
  visual, // ← add this
}: BannerAdProps) {

  const { w, h, text } = SIZE_MAP[size]

  // Layout presets tuned per size for readability
  const isTall = size === '160x600'
  const isWide = size === '728x90'

  return (
    <a
      href={href}
      style={{ width: w, height: h }}
      className={clsx(
        'block relative overflow-hidden rounded-md shadow-md',
        'bg-gradient-to-br text-white',
        gradientFrom,
        gradientTo
      )}
    >
      {/* Padded canvas */}
      <div className={clsx('absolute inset-0 p-3', !isTall && !isWide && 'p-4')}>
        {/* Top row: logo */}
        <div className={clsx('flex items-center', isWide ? 'justify-start' : 'justify-between')}>
          <Image
            src={logoSrc}
            alt="logo"
            width={isWide ? 72 : 64}
            height={24}
            className="h-6 w-auto opacity-95"
          />
          {!isWide && subStat && (
            <div className="text-[11px] bg-white/10 px-2 py-[2px] rounded-md">
              {subStat}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className={clsx('grid gap-2', isTall ? 'mt-3' : 'mt-4')}>
          {/* Headline */}
          <div className={clsx(
            'font-semibold leading-tight',
            text,
            isWide && 'text-base',
            isTall && 'text-[15px]'
          )}>
            {headline}
          </div>
{/* Product visual (custom or fallback image) */}
<div
  className={clsx(
    'rounded-md bg-white/95 text-black flex items-center justify-center',
    isWide ? 'h-[38px] px-2' :
    isTall ? 'h-[120px]' : 'h-[90px]'
  )}
>
  {visual ? (
    <div className="w-full h-full flex items-center justify-center">
      {visual}
    </div>
  ) : (
    <Image
      src={screenshotSrc}
      alt="product"
      width={isWide ? 160 : 220}
      height={isWide ? 38 : 90}
      className="max-h-full w-auto"
    />
  )}
</div>

          {/* CTA */}
          <div className={clsx(
            'mt-1',
            isWide && 'mt-2',
            isTall && 'mt-2'
          )}>
            <div
              className={clsx(
                'w-full text-center font-semibold rounded-md border-2 py-2',
                borderAccent,
                darkCta ? 'bg-black text-white' : 'bg-white text-black'
              )}
            >
              {cta}
            </div>
          </div>
        </div>

        {/* tiny footer stat for wide if not shown above */}
        {isWide && subStat && (
          <div className="absolute right-3 bottom-2 text-[11px] bg-white/10 px-2 py-[2px] rounded-md">
            {subStat}
          </div>
        )}
      </div>
    </a>
  )
}
