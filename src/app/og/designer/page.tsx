'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { NFL_TEAM_NAMES } from '../nfl-teams'

function encode(v: string) { return encodeURIComponent(v ?? '') }

export default function Designer() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [badge, setBadge] = useState('FOOTBALL SEASON')
  const [handle, setHandle] = useState('@superbowlpoolsite')
  const [w, setW] = useState(1080)
  const [h, setH] = useState(1350)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const [team, setTeam] = useState('Pittsburgh Steelers')
  const [accent, setAccent] = useState('') // leave empty to auto-use team color
  const [showGrid, setShowGrid] = useState(false)

  const [bullets, setBullets] = useState('Free To Create,Free To Join,Great For Fundraisers')
  const [cta, setCta] = useState('Create a Squares Contest →')
  const [teamTop, setTeamTop] = useState('Steelers')
  const [teamSide, setTeamSide] = useState('Jets')

  const q = useMemo(() => {
    const p = new URLSearchParams()
    p.set('w', String(w)); p.set('h', String(h)); p.set('theme', theme)
    if (title) p.set('title', title)
    if (subtitle) p.set('subtitle', subtitle)
    if (badge) p.set('badge', badge)
    if (handle) p.set('handle', handle)
    if (bullets) p.set('bullets', bullets)
    if (cta) p.set('cta', cta)
    if (team) p.set('team', team)
    if (accent) p.set('accent', accent) // optional override
    p.set('showGrid', showGrid ? '1' : '0')
    if (teamTop) p.set('teamTop', teamTop)
    if (teamSide) p.set('teamSide', teamSide)
    return p.toString()
  }, [w,h,theme,title,subtitle,badge,handle,bullets,cta,team,accent,showGrid,teamTop,teamSide])

  const url = `/og?${q}`
  const apiUrl = `/api/snap?${q}`

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] h-screen">
      {/* Controls */}
      <aside className="p-6 border-b xl:border-b-0 xl:border-r border-slate-200 space-y-5 bg-white">
        <h1 className="text-xl font-semibold">OG Designer</h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Team (NFL)</label>
          <select className="w-full border rounded px-3 py-2"
                  value={team} onChange={e=>setTeam(e.target.value)}>
            {NFL_TEAM_NAMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <p className="text-xs text-slate-500">Leave “Accent” empty to auto-use the team primary color.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Width (px)</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={w} onChange={e=>setW(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Height (px)</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={h} onChange={e=>setH(Number(e.target.value))} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Theme</label>
            <select className="w-full border rounded px-3 py-2" value={theme} onChange={e=>setTheme(e.target.value as any)}>
              <option value="dark">dark</option>
              <option value="light">light</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Accent (hex, optional)</label>
            <input className="w-full border rounded px-3 py-2" placeholder="#FFC107" value={accent} onChange={e=>setAccent(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Title (optional)</label>
          <input className="w-full border rounded px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder={`Create A Squares Contest For Every ${team} Game!`} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Subtitle (optional)</label>
          <input className="w-full border rounded px-3 py-2" value={subtitle} onChange={e=>setSubtitle(e.target.value)} placeholder="Run Super Bowl–style squares all season" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Bullets (comma-separated)</label>
          <input className="w-full border rounded px-3 py-2" value={bullets} onChange={e=>setBullets(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">CTA</label>
          <input className="w-full border rounded px-3 py-2" value={cta} onChange={e=>setCta(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Grid Top Team Label</label>
            <input className="w-full border rounded px-3 py-2" value={teamTop} onChange={e=>setTeamTop(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Grid Side Team Label</label>
            <input className="w-full border rounded px-3 py-2" value={teamSide} onChange={e=>setTeamSide(e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input id="showGrid" type="checkbox" checked={showGrid} onChange={e=>setShowGrid(e.target.checked)} />
          <label htmlFor="showGrid" className="text-sm">Show 10×10 demo grid</label>
        </div>

        <div className="flex gap-2">
          <Link href={url} target="_blank" className="inline-flex items-center px-4 py-2 rounded bg-black text-white">Open</Link>
          <a href={apiUrl} className="inline-flex items-center px-4 py-2 rounded bg-indigo-600 text-white">Download PNG</a>
        </div>
      </aside>

      {/* Preview */}
      <main className="p-6 bg-slate-50 overflow-auto">
        <div className="mb-3 text-sm text-slate-600">Live preview</div>
        <iframe key={url} src={url} className="w-full rounded border border-slate-200 bg-white" style={{ height: Math.min(900, h + 40) }} />
      </main>
    </div>
  )
}
