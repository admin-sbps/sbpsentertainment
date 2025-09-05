import React from 'react'

type SquaresMiniProps = {
  accent?: string // e.g. '#FACC15' (amber-400)
  bg?: string     // board bg
  filled?: Array<[number, number]> // coords to fill (0..9, 0..9)
  badgeText?: string
  width?: number
  height?: number
}

export default function SquaresMini({
  accent = '#FACC15',
  bg = '#ffffff',
  filled = [[1,2],[3,5],[6,7],[2,8],[8,1]],
  badgeText = '50/50',
  width = 220,
  height = 90,
}: SquaresMiniProps) {
  // draw a 10x10 grid but sized small; use crisp SVG lines
  const cols = 10, rows = 10
  const pad = 6
  const w = width, h = height
  const gw = w - pad*2, gh = h - pad*2
  const cw = gw / cols, ch = gh / rows
  const filledKey = new Set(filled.map(([x,y]) => `${x},${y}`))

  return (
    <svg width={w} height={h} role="img" aria-label="Squares Fundraiser Mini Grid">
      <rect x="0" y="0" width={w} height={h} rx="8" fill={bg} />
      {/* grid background */}
      <g transform={`translate(${pad},${pad})`}>
        <rect x="0" y="0" width={gw} height={gh} fill="#ffffff" opacity="0.96" />
        {/* filled cells */}
        {[...Array(rows)].map((_, r) =>
          [...Array(cols)].map((_, c) => {
            const x = c * cw
            const y = r * ch
            const key = `${c},${r}`
            return filledKey.has(key) ? (
              <rect key={key} x={x} y={y} width={cw} height={ch} fill={accent} />
            ) : null
          })
        )}
        {/* grid lines */}
        <g stroke="rgba(0,0,0,0.18)" strokeWidth="1">
          {[...Array(cols+1)].map((_, i) => (
            <line key={`v${i}`} x1={i*cw} y1={0} x2={i*cw} y2={gh} />
          ))}
          {[...Array(rows+1)].map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i*ch} x2={gw} y2={i*ch} />
          ))}
        </g>
      </g>
      {/* “50/50” badge */}
      <g>
        <circle cx={w-28} cy={28} r={20} fill="#111827" />
        <circle cx={w-28} cy={28} r={20} fill="none" stroke={accent} strokeWidth="3" />
        <text x={w-28} y={31} textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">50/50</text>
      </g>
    </svg>
  )
}
