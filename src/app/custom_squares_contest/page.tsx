'use client'

import React, { useMemo, useState, useCallback, useEffect } from 'react'
import Image from 'next/image' // Import the Image component

// Hero Icons as React components
const BeerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M9 2v2m6-2v2M9 20v2m6-2v2m2-10h2m-2 4h2M7 8h10v10H7V8zm0 0V6a2 2 0 012-2h6a2 2 0 012 2v2" />
  </svg>
)

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M12 15v-3m-3 3h6M5 8h2a1 1 0 001-1V5a2 2 0 012-2h4a2 2 0 012 2v2a1 1 0 001 1h2a3 3 0 013 3v1a5 5 0 01-5 5H7a5 5 0 01-5-5v-1a3 3 0 013-3z" />
  </svg>
)

type ScoreLine = {
  q1?: number
  q2?: number
  q3?: number
  q4?: number
  final?: number
}

type SquaresGridProps = {
  teamTop: string
  teamSide: string
  accent?: string
  labels?: boolean
  topNums?: string[]
  sideNums?: string[]
  names?: string[][]
  claimCounts?: number[][]
  scores?: {
    topTeam?: ScoreLine
    sideTeam?: ScoreLine
  }
  allowMultiplePerSquare?: boolean
  onClaim?: (args: { row: number; col: number; email: string; password: string }) => void
}

const defaultNums = Array.from({ length: 10 }, (_, i) => String(i))

// Brand Header Component
function BrandHeader() {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-white/10 backdrop-blur-sm p-1.5 md:p-2 rounded-lg">
            <BeerIcon />
          </div>
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Brewhouse Sports Bar</h1>
            <p className="text-xs md:text-sm text-white/80">Big Game Squares Contest</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-black/20 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
          <TrophyIcon />
          <span className="text-xs md:text-sm font-semibold text-white">$5,000 Prize Pool</span>
        </div>
      </div>
    </div>
  )
}

function Scoreboard({
  teamTop,
  teamSide,
  scores,
  isMobile,
}: {
  teamTop: string
  teamSide: string
  scores?: { topTeam?: ScoreLine; sideTeam?: ScoreLine }
  isMobile: boolean
}) {
  const cols = isMobile ? ['Q1', 'Q2', 'Q3', 'Q4', 'F'] : ['Q1', 'Q2', 'Q3', 'Q4', 'Final']
  const top = scores?.topTeam ?? {}
  const side = scores?.sideTeam ?? {}

  const rowify = (s: ScoreLine) => [
    s.q1 ?? '–',
    s.q2 ?? '–',
    s.q3 ?? '–',
    s.q4 ?? '–',
    s.final ?? '–',
  ]

  const topRow = rowify(top)
  const sideRow = rowify(side)

  return (
    <div
      className="w-full mb-2 md:mb-3 rounded-lg md:rounded-xl ring-1 ring-white/10 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden shadow-xl"
      aria-label="Scoreboard"
    >
      <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-1.5 md:p-2">
        <h3 className="text-center text-xs md:text-sm font-bold uppercase tracking-wider text-white/90">
          Live Score
        </h3>
      </div>
      
      <div className="grid grid-cols-6 text-[10px] md:text-xs lg:text-sm">
        <div className="col-span-1 py-1 md:py-1.5 px-2 md:px-3 font-semibold text-slate-200 bg-white/5">
          Team
        </div>
        {cols.map((c) => (
          <div key={c} className="py-1 md:py-1.5 text-center font-semibold text-slate-200 bg-white/5">
            {c}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 border-t border-white/10">
        <div className="col-span-1 py-1 md:py-1.5 px-2 md:px-3 truncate font-medium text-[10px] md:text-xs lg:text-sm">
          {teamTop}
        </div>
        {topRow.map((v, i) => (
          <div key={`top-${i}`} className="py-1 md:py-1.5 text-center font-bold text-cyan-400 text-[10px] md:text-xs lg:text-sm">
            {v}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 border-t border-white/10">
        <div className="col-span-1 py-1 md:py-1.5 px-2 md:px-3 truncate font-medium text-[10px] md:text-xs lg:text-sm">
          {teamSide}
        </div>
        {sideRow.map((v, i) => (
          <div key={`side-${i}`} className="py-1 md:py-1.5 text-center font-bold text-orange-400 text-[10px] md:text-xs lg:text-sm">
            {v}
          </div>
        ))}
      </div>
    </div>
  )
}

function ClaimModal({
  open,
  onClose,
  onSubmit,
  cellLabel,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (email: string, password: string) => void
  cellLabel: string
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Claim square"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 ring-1 ring-white/10 p-6 text-white shadow-2xl">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <TrophyIcon />
            </div>
            <h3 className="text-lg font-bold tracking-tight">Claim Your Square!</h3>
          </div>
          <p className="text-sm text-slate-300">
            You are claiming square <span className="font-bold text-orange-400">{cellLabel}</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            $50 entry fee • Winners split the pot!
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(email.trim(), password)
            setEmail('')
            setPassword('')
          }}
          className="space-y-4"
        >
          <label className="block text-sm">
            <span className="mb-1 block text-slate-200 font-medium">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-slate-800/50 px-3 py-2 outline-none ring-1 ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-200 font-medium">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-slate-800/50 px-3 py-2 outline-none ring-1 ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
              placeholder="••••••••"
            />
          </label>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-bold text-white hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
            >
              Reserve Square
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-center text-slate-400">
            Powered by Brewhouse Sports Bar • Terms Apply
          </p>
        </div>
      </div>
    </div>
  )
}

function SquaresGrid({
  teamTop,
  teamSide,
  accent = '#fb923c',
  labels = true,
  topNums = defaultNums,
  sideNums = defaultNums,
  names,
  claimCounts,
  scores,
  allowMultiplePerSquare = true,
  onClaim,
}: SquaresGridProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, cellSize: 0, headerSize: 0 })

  useEffect(() => {
    const calculateDimensions = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      
      // Account for header, scoreboard, and padding
      const headerHeight = 120 // Approximate header + scoreboard height
      const padding = 32 // Total vertical padding
      const availableHeight = vh - headerHeight - padding
      const availableWidth = vw - 32 // Horizontal padding
      
      // Calculate the maximum grid size that fits
      const maxGridSize = Math.min(availableWidth, availableHeight)
      
      // Calculate cell and header sizes based on available space
      // Grid needs 12 units total (2 headers + 10 cells)
      const unitSize = maxGridSize / 12
      
      // Set minimum and maximum sizes
      const cellSize = Math.max(28, Math.min(80, unitSize))
      const headerSize = Math.max(20, Math.min(60, cellSize * 0.6))
      
      setDimensions({
        width: vw,
        height: vh,
        cellSize: Math.floor(cellSize),
        headerSize: Math.floor(headerSize),
      })
    }

    calculateDimensions()
    window.addEventListener('resize', calculateDimensions)
    return () => window.removeEventListener('resize', calculateDimensions)
  }, [])

  const c = dimensions.cellSize
  const h = dimensions.headerSize
  const isMobile = dimensions.width < 640

  const gridPx = c * 10
  const totalW = h + h + gridPx
  const totalH = h + h + gridPx

  const data = useMemo(() => {
    const fallback = Array.from({ length: 10 }, () => Array(10).fill(''))
    if (!names) return fallback
    const ok =
      Array.isArray(names) &&
      names.length === 10 &&
      names.every((r) => Array.isArray(r) && r.length === 10)
    return ok ? names : fallback
  }, [names])

  const counts = useMemo(() => {
    const zeros = Array.from({ length: 10 }, () => Array(10).fill(0))
    if (!claimCounts) return zeros
    const ok =
      Array.isArray(claimCounts) &&
      claimCounts.length === 10 &&
      claimCounts.every((r) => Array.isArray(r) && r.length === 10)
    return ok ? claimCounts : zeros
  }, [claimCounts])

  const [modalOpen, setModalOpen] = useState(false)
  const [sel, setSel] = useState<{ r: number; c: number } | null>(null)

  const openModal = useCallback((r: number, c: number) => {
    setSel({ r, c })
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  const submitModal = useCallback(
    (email: string, password: string) => {
      if (sel && onClaim) {
        onClaim({ row: sel.r, col: sel.c, email, password })
      }
      setModalOpen(false)
    },
    [onClaim, sel]
  )

  const cellLabel = useMemo(() => {
    if (!sel) return ''
    const top = labels ? topNums[sel.c] ?? String(sel.c) : String(sel.c)
    const side = labels ? sideNums[sel.r] ?? String(sel.r) : String(sel.r)
    return `${teamSide} ${side} × ${teamTop} ${top}`
  }, [labels, sel, sideNums, teamSide, teamTop, topNums])

  if (dimensions.width === 0) return null // Don't render until dimensions are calculated

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-full px-2 md:px-4">
        <Scoreboard 
          teamTop={teamTop} 
          teamSide={teamSide} 
          scores={scores}
          isMobile={isMobile}
        />
      </div>

      <div className="flex items-center justify-center w-full overflow-auto">
        <div className="relative" style={{ width: totalW, height: totalH }}>
          <div className="absolute inset-0 rounded-xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm shadow-2xl" />

          <div
            className="absolute inset-0 grid text-white"
            style={{
              gridTemplateColumns: `${h}px ${h}px repeat(10, ${c}px)`,
              gridTemplateRows: `${h}px ${h}px repeat(10, ${c}px)`,
              fontFeatureSettings: '"tnum"',
            }}
          >
            <div style={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }} className="bg-white/5" />
            <div style={{ gridColumn: '2 / span 1', gridRow: '1 / span 1' }} className="bg-white/5" />

            <div
              style={{ gridColumn: '3 / span 10', gridRow: '1 / span 1' }}
              className="flex items-center justify-center font-bold tracking-wide"
              >
              <div
                className="w-full h-full grid place-items-center text-xs md:text-sm lg:text-base"
                style={{
                  background: 'linear-gradient(to right, rgba(251, 146, 60, 0.15), rgba(251, 146, 60, 0.05))',
                  WebkitBackdropFilter: 'blur(2px)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                {teamTop}
              </div>
            </div>

            <div
              style={{ gridColumn: '1 / span 1', gridRow: '3 / span 10' }}
              className="flex items-center justify-center text-center px-1"
            >
              <div
                className="[writing-mode:vertical-rl] rotate-180 font-bold text-xs md:text-sm lg:text-base"
                style={{
                  background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
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

            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={`top-${i}`}
                style={{ gridColumn: `${3 + i} / span 1`, gridRow: '2 / span 1' }}
                className="grid place-items-center text-[10px] md:text-xs font-bold bg-gradient-to-b from-white/10 to-white/5 text-orange-300"
              >
                {labels ? (topNums[i] ?? String(i)) : ''}
              </div>
            ))}

            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={`side-${i}`}
                style={{ gridColumn: '2 / span 1', gridRow: `${3 + i} / span 1` }}
                className="grid place-items-center text-[10px] md:text-xs font-bold bg-gradient-to-r from-white/10 to-white/5 text-red-400"
              >
                {labels ? (sideNums[i] ?? String(i)) : ''}
              </div>
            ))}

            <div style={{ gridColumn: '3 / span 10', gridRow: '3 / span 10' }} className="relative">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent ${c}px),
                    repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent ${c}px)
                  `,
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              />

              <div
                className="grid"
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
                    const count = counts[r]?.[col] ?? 0
                    const showCountBadge = allowMultiplePerSquare && count > 0
                    const iconSize = Math.max(16, Math.min(24, c * 0.5))

                    return (
                      <button
                        key={`cell-${r}-${col}`}
                        type="button"
                        onClick={() => openModal(r, col)}
                        className={[
                          'relative flex items-center justify-center text-center px-0.5 md:px-1 outline-none transition-all duration-200',
                          filled 
                            ? 'font-bold text-slate-900 hover:brightness-110' 
                            : 'hover:bg-white/10',
                          'focus-visible:ring-2 focus-visible:ring-orange-400/70',
                        ].join(' ')}
                        style={{
                          backgroundColor: filled ? accent : 'transparent',
                          fontSize: c < 40 ? '9px' : c < 60 ? '11px' : '13px',
                        }}
                        title={filled ? name : 'Click to claim'}
                        aria-label={
                          filled
                            ? `Square claimed by ${name}. Click to add your entry.`
                            : 'Unclaimed square. Click to claim.'
                        }
                      >
                        {filled ? (
                          <span className="truncate max-w-full px-0.5">
                            {isMobile && name.length > 5 ? `${name.slice(0, 5)}…` : 
                            name.length > 9 ? `${name.slice(0, 9)}…` : name}
                          </span>
                        ) : (
                          <img
                            src="/images/pizza.svg"
                            alt=""
                            width={iconSize}
                            height={iconSize}
                            className="opacity-20 hover:opacity-30 transition-opacity"
                            style={{ width: iconSize, height: iconSize }}
                          />
                        )}
                        {showCountBadge ? (
                          <span className="pointer-events-none absolute right-0.5 top-0.5 md:right-1 md:top-1 inline-flex items-center justify-center rounded-full bg-black/75 px-1 md:px-1.5 py-0.5 text-[8px] md:text-[10px] font-bold text-white ring-1 ring-white/30 min-w-[16px]">
                            {count}
                          </span>
                        ) : null}
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClaimModal open={modalOpen} onClose={closeModal} onSubmit={submitModal} cellLabel={cellLabel} />
    </div>
  )
}

// Promotional Banner Component
function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-xl p-3 md:p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-orange-500/20 p-1.5 md:p-2 rounded-lg">
            <BeerIcon />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm md:text-base">Join us on Game Day!</h3>
            <p className="text-xs md:text-sm text-slate-300">
              $5 Draft Beers • Half-Price Wings • Live on 20 TVs
            </p>
          </div>
        </div>
        <button className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white font-semibold text-xs md:text-sm hover:from-orange-600 hover:to-red-600 transition-all shadow-lg whitespace-nowrap">
          Reserve a Table
        </button>
      </div>
    </div>
  )
}

/** ---------- Demo Page (default export) ---------- */
export default function CustomSquaresContestPage() {
  // demo team + scoreboard
  const teamTop = 'Cowboys'
  const teamSide = 'Steelers'

  const [scores, setScores] = useState<{
    topTeam: ScoreLine
    sideTeam: ScoreLine
  }>({
    topTeam: { q1: 7, q2: 3, q3: 7, q4: 7, final: 24 },
    sideTeam: { q1: 3, q2: 7, q3: 10, q4: 3, final: 23 },
  })

  // Demo names for some filled squares
  const [names, setNames] = useState<string[][]>(() => {
    const grid = Array.from({ length: 10 }, () => Array(10).fill(''))
    // Add some demo claimed squares
    grid[2][3] = 'Mike R.'
    grid[5][7] = 'Sarah'
    grid[1][1] = 'Tom'
    grid[8][4] = 'Jessica'
    grid[3][9] = 'Dave'
    grid[6][2] = 'Amy K.'
    return grid
  })

  // demo state for lottery counts
  const [claimCounts, setClaimCounts] = useState<number[][]>(() => {
    const counts = Array.from({ length: 10 }, () => Array(10).fill(0))
    counts[2][3] = 3
    counts[5][7] = 2
    counts[1][1] = 5
    return counts
  })

  const handleClaim = useCallback(
    ({ row, col, email }: { row: number; col: number; email: string; password: string }) => {
      // Update the names grid with the email (in production, this would be from API)
      setNames((prev) => {
        const next = prev.map((r) => r.slice())
        const emailName = email.split('@')[0]
        next[row][col] = emailName.charAt(0).toUpperCase() + emailName.slice(1)
        return next
      })
      
      // Update claim counts
      setClaimCounts((prev) => {
        const next = prev.map((r) => r.slice())
        next[row][col] = (next[row][col] ?? 0) + 1
        return next
      })
      
      // Optionally tweak the scoreboard to simulate live updates
      setScores((s) => ({ ...s }))
    },
    []
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <BrandHeader />
      
      <div className="flex-1 flex flex-col px-2 md:px-4 py-2 md:py-4 overflow-hidden">
        <div className="mb-2 md:mb-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="bg-green-500/20 text-green-400 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></span>
            LIVE CONTEST
          </div>
          <div className="text-xs md:text-sm text-slate-400">
            43 squares claimed • 57 available
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
          <SquaresGrid
            teamTop={teamTop}
            teamSide={teamSide}
            scores={scores}
            names={names}
            claimCounts={claimCounts}
            allowMultiplePerSquare
            onClaim={handleClaim}
            accent="#fb923c"
          />
        </div>

        <div className="mt-2 md:mt-4 max-w-4xl mx-auto w-full">
          <PromoBanner />
          
          <div className="mt-3 md:mt-4 text-center">
            <p className="text-[10px] md:text-xs lg:text-sm text-slate-400">
              Contest Rules: Numbers randomly assigned at kickoff • Winners each quarter split 20% of pot • Final score takes 20%
            </p>
            <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-slate-500">
              Must be 21+ to participate • See bartender for official rules • © 2025 Brewhouse Sports Bar
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}