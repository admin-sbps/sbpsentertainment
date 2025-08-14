// src/app/og/SquaresGrid.tsx
import React from 'react'

type SquaresGridProps = {
  teamTop: string
  teamSide: string
  accent?: string
  /** Size of each square cell (px). Default: 72 (clamped 44–120) */
  cellPx?: number
  /** Header row height (top team + top numbers) and side cols width (side team + side numbers) */
  headerPx?: number
  /** Show numeric headers (0–9) */
  labels?: boolean
  /** Optional 10 numbers for the top header (as strings, e.g. ['0','1',...]) */
  topNums?: string[]
  /** Optional 10 numbers for the side header (as strings) */
  sideNums?: string[]
  /** Optional 10x10 matrix of names to preview claimed squares */
  names?: string[][]
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

const defaultNums = Array.from({ length: 10 }, (_, i) => String(i))

export function SquaresGrid({
  teamTop,
  teamSide,
  accent = '#22d3ee',
  cellPx = 72,
  headerPx = 48,
  labels = true,
  topNums = defaultNums,
  sideNums = defaultNums,
  names,
}: SquaresGridProps) {
  const c = clamp(cellPx, 44, 120)
  const h = clamp(headerPx, 36, 72)

  // exact grid geometry
  const gridPx = c * 10
  const totalW = h /* side team col */ + h /* side nums col */ + gridPx
  const totalH = h /* top team row */ + h /* top nums row */ + gridPx

  // names matrix fallback
  const data =
    names && names.length === 10 && names.every(r => r?.length === 10)
      ? names
      : Array.from({ length: 10 }, () => Array(10).fill(''))

  return (
    <div className="relative" style={{ width: totalW, height: totalH }}>
      {/* Frame */}
      <div className="absolute inset-0 rounded-xl overflow-hidden ring-1 ring-white/10 bg-slate-900/40" />

      {/* Main CSS grid:
          Columns: [side team | side nums | 10 cells]
          Rows:    [top team  | top nums | 10 cells] */}
      <div
        className="absolute inset-0 grid text-white"
        style={{
          gridTemplateColumns: `${h}px ${h}px repeat(10, ${c}px)`,
          gridTemplateRows: `${h}px ${h}px repeat(10, ${c}px)`,
          fontFeatureSettings: '"tnum"',
        }}
      >
        {/* (1,1) top-left corner is blank by design */}
        <div style={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }} className="bg-white/5" />
        {/* (1,2) also blank */}
        <div style={{ gridColumn: '2 / span 1', gridRow: '1 / span 1' }} className="bg-white/5" />

        {/* Row 1: Top team label spans columns 3..12 */}
        <div
          style={{ gridColumn: '3 / span 10', gridRow: '1 / span 1' }}
          className="flex items-center justify-center text-sm font-bold tracking-wide"
        >
          <div
            className="w-full h-full grid place-items-center"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
              WebkitBackdropFilter: 'blur(2px)',
              backdropFilter: 'blur(2px)',
            }}
          >
            {teamTop}
          </div>
        </div>

        {/* Col 1: Side team label spans rows 3..12 (vertical) */}
        <div
          style={{ gridColumn: '1 / span 1', gridRow: '3 / span 10' }}
          className="flex items-center justify-center text-center px-1"
        >
          <div
            className="[writing-mode:vertical-rl] rotate-180 text-sm font-bold"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
              WebkitBackdropFilter: 'blur(2px)',
              backdropFilter: 'blur(2px)',
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {teamSide}
          </div>
        </div>

        {/* Row 2: Top numeric header (0–9) in columns 3..12 */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`top-${i}`}
            style={{ gridColumn: `${3 + i} / span 1`, gridRow: '2 / span 1' }}
            className="grid place-items-center text-xs font-semibold bg-white/8"
          >
            {labels ? (topNums[i] ?? i) : ''}
          </div>
        ))}

        {/* Col 2: Side numeric header (0–9) in rows 3..12 */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`side-${i}`}
            style={{ gridColumn: '2 / span 1', gridRow: `${3 + i} / span 1` }}
            className="grid place-items-center text-xs font-semibold bg-white/8"
          >
            {labels ? (sideNums[i] ?? i) : ''}
          </div>
        ))}

        {/* Main 10×10 board background with crisp 1px grid lines */}
        <div
          style={{ gridColumn: '3 / span 10', gridRow: '3 / span 10' }}
          className="relative"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 1px, transparent 1px, transparent ${c}px),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 1px, transparent 1px, transparent ${c}px)
              `,
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          />
          {/* Cells overlay for names/fills */}
          <div
            className="grid text-[11px] leading-tight"
            style={{
              gridTemplateColumns: `repeat(10, ${c}px)`,
              gridTemplateRows: `repeat(10, ${c}px)`,
              width: gridPx,
              height: gridPx,
            }}
          >
            {data.map((row, r) =>
              row.map((name, col) => {
                const filled = !!name
                return (
                  <div
                    key={`cell-${r}-${col}`}
                    className={[
                      'flex items-center justify-center text-center px-1',
                      filled ? 'font-semibold text-slate-900' : 'text-white/85',
                    ].join(' ')}
                    style={{
                      backgroundColor: filled ? accent : 'transparent',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={name}
                  >
                    {filled ? (name.length > 9 ? name.slice(0, 9) + '…' : name) : ''}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
