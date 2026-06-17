'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Lock, LogOut, Search, Trash2, RefreshCw, ChevronDown, Save, CheckCircle,
  PartyPopper, Briefcase, Mail, Bell, IceCream2,
} from 'lucide-react'
import allFlavors from '../../data/flavors.json'

type Row = Record<string, string | null>

type TabKey = 'catering' | 'applications' | 'contact' | 'alerts' | 'board'

interface TabDef {
  key: TabKey
  label: string
  icon: React.ComponentType<{ className?: string }>
  statuses?: string[]
  primary?: (r: Row) => string
  meta?: (r: Row) => string
  contact?: (r: Row) => string
  details?: [string, string][]
}

const TABS: TabDef[] = [
  {
    key: 'catering', label: 'Catering', icon: PartyPopper,
    statuses: ['New', 'Contacted', 'Booked', 'Completed'],
    primary: (r) => r.name || '—',
    meta: (r) => [r.event_type, r.event_date, r.event_size && `${r.event_size} guests`].filter(Boolean).join(' · '),
    contact: (r) => [r.phone, r.email].filter(Boolean).join('  ·  '),
    details: [['Half gallons', 'half_gallons'], ['Notes', 'notes']],
  },
  {
    key: 'applications', label: 'Applications', icon: Briefcase,
    statuses: ['New', 'Interviewing', 'Hired', 'Rejected'],
    primary: (r) => `${r.first_name || ''} ${r.last_name || ''}`.trim() || '—',
    meta: (r) => [r.position, r.employment_type].filter(Boolean).join(' · '),
    contact: (r) => [r.phone, r.email].filter(Boolean).join('  ·  '),
    details: [
      ['Address', 'address'], ['Age', 'age'], ['Start date', 'start_date'],
      ['Days', 'days_available'], ['Hours', 'hours_available'],
      ['Previous employer', 'previous_employer'], ['Experience', 'experience'],
      ['Customer service', 'customer_service'], ['Why Lago’s', 'why_lagos'],
      ['Good fit', 'good_fit'], ['Resume', 'resume_filename'],
    ],
  },
  {
    key: 'contact', label: 'Messages', icon: Mail,
    statuses: ['New', 'Contacted', 'Completed'],
    primary: (r) => r.name || '—',
    meta: (r) => r.email || '',
    contact: (r) => r.email || '',
    details: [['Message', 'message']],
  },
  {
    key: 'alerts', label: 'Flavor Alerts', icon: Bell,
    statuses: ['Active', 'Notified', 'Unsubscribed'],
    primary: (r) => r.name || r.contact || '—',
    meta: (r) => (r.flavor ? `Wants: ${r.flavor}` : ''),
    contact: (r) => r.contact || '',
    details: [],
  },
  { key: 'board', label: 'Flavor Board', icon: IceCream2 },
]

const STATUS_TINT: Record<string, string> = {
  New: 'bg-raspberry-50 text-raspberry-600 border-raspberry-200',
  Active: 'bg-raspberry-50 text-raspberry-600 border-raspberry-200',
  Contacted: 'bg-gold-soft text-gold-dark border-gold-light',
  Interviewing: 'bg-gold-soft text-gold-dark border-gold-light',
  Notified: 'bg-gold-soft text-gold-dark border-gold-light',
  Booked: 'bg-blue-50 text-blue-700 border-blue-200',
  Hired: 'bg-green-50 text-green-700 border-green-200',
  Completed: 'bg-green-50 text-green-700 border-green-200',
  Rejected: 'bg-stone-100 text-stone-warm border-stone-border',
  Unsubscribed: 'bg-stone-100 text-stone-warm border-stone-border',
}

function fmtDate(iso: string | null): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

export default function AdminPage() {
  const [phase, setPhase] = useState<'checking' | 'login' | 'ready'>('checking')
  const [passInput, setPassInput] = useState('')
  const [passError, setPassError] = useState('')
  const [supabaseOn, setSupabaseOn] = useState(true)

  const [tab, setTab] = useState<TabKey>('catering')
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const [boardSel, setBoardSel] = useState<Set<string>>(new Set())
  const [boardSaved, setBoardSaved] = useState(false)
  const [boardLoading, setBoardLoading] = useState(false)

  const def = TABS.find((t) => t.key === tab)!

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => {
        if (r.ok) {
          setPhase('ready')
          return r.json()
        }
        setPhase('login')
        return null
      })
      .then((d) => d && setSupabaseOn(Boolean(d.supabase)))
      .catch(() => setPhase('login'))
  }, [])

  const fetchRows = useCallback(async (type: TabKey) => {
    if (type === 'board') return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/submissions?type=${type}`)
      const data = await res.json()
      setRows(data.rows || [])
      if ('supabase' in data) setSupabaseOn(data.supabase)
    } catch {
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchBoard = useCallback(async () => {
    setBoardLoading(true)
    try {
      const res = await fetch('/api/flavor-board')
      const data = await res.json()
      if (data.flavors) setBoardSel(new Set(data.flavors))
      else setBoardSel(new Set(allFlavors.filter((f) => f.featured).map((f) => f.id)))
    } catch {
      /* ignore */
    } finally {
      setBoardLoading(false)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'ready') return
    setSearch('')
    setStatusFilter('All')
    setExpanded(null)
    if (tab === 'board') fetchBoard()
    else fetchRows(tab)
  }, [phase, tab, fetchRows, fetchBoard])

  const login = async () => {
    setPassError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: passInput }),
    })
    if (res.ok) {
      setPhase('ready')
      const s = await fetch('/api/admin/session').then((r) => r.json()).catch(() => null)
      if (s) setSupabaseOn(Boolean(s.supabase))
    } else {
      setPassError('Wrong passcode. Try again.')
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setPhase('login')
    setPassInput('')
  }

  const changeStatus = async (id: string, status: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: tab, id, status }),
    })
  }

  const deleteRow = async (id: string) => {
    if (!confirm('Delete this submission? This cannot be undone.')) return
    setRows((prev) => prev.filter((r) => r.id !== id))
    await fetch(`/api/admin/submissions?type=${tab}&id=${id}`, { method: 'DELETE' })
  }

  const toggleFlavor = (id: string) =>
    setBoardSel((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const saveBoard = async () => {
    setBoardLoading(true)
    setBoardSaved(false)
    const res = await fetch('/api/flavor-board', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flavors: Array.from(boardSel) }),
    })
    setBoardLoading(false)
    if (res.ok) {
      setBoardSaved(true)
      setTimeout(() => setBoardSaved(false), 2500)
    }
  }

  const filtered = rows.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false
    if (!search) return true
    return Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase())
  })

  if (phase === 'checking') {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-raspberry-500 animate-spin" />
      </div>
    )
  }

  if (phase === 'login') {
    return (
      <div className="min-h-screen bg-navy-gradient flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-gold-light" />
            </div>
            <h1 className="font-display font-bold text-2xl text-white">Lago&apos;s Dashboard</h1>
            <p className="text-white/60 text-sm mt-2">Owner access only</p>
          </div>
          <div className="bg-white rounded-3xl p-6 space-y-4 shadow-card-hover">
            <div>
              <label className="block text-xs font-semibold text-ink-light uppercase tracking-wide mb-1.5">Passcode</label>
              <input
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 rounded-2xl border border-stone-border bg-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-raspberry-300"
                autoFocus
              />
              {passError && <p className="text-red-600 text-xs mt-1.5">{passError}</p>}
            </div>
            <button onClick={login} className="btn-primary w-full justify-center">
              <Lock className="w-4 h-4" /> Enter Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <header className="bg-navy-gradient text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl md:text-2xl">Lago&apos;s Dashboard</h1>
            <p className="text-white/60 text-xs md:text-sm">Catering · Hiring · Messages · Alerts</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-2 sm:px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  tab === key ? 'border-gold-light text-white' : 'border-transparent text-white/55 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {!supabaseOn && tab !== 'board' && (
          <div className="rounded-2xl bg-gold-soft border border-gold-light px-4 py-3 text-sm text-gold-dark mb-5">
            Supabase isn&apos;t connected yet — submissions aren&apos;t being stored. Add the Supabase
            env vars and run the schema to see live data here. (Email notifications still work.)
          </div>
        )}

        {tab === 'board' ? (
          <div>
            <div className="flex items-center justify-between mb-4 gap-3">
              <div>
                <h2 className="font-display font-bold text-xl text-ink">Today&apos;s Flavor Board</h2>
                <p className="text-stone-warm text-sm">{boardSel.size} flavors showing on the website now.</p>
              </div>
              <button onClick={saveBoard} disabled={boardLoading} className="btn-primary py-2.5 px-5 text-sm disabled:opacity-60 flex-shrink-0">
                {boardSaved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {boardSaved ? 'Saved' : boardLoading ? 'Saving…' : 'Save Board'}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {allFlavors.map((f) => {
                const on = boardSel.has(f.id)
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFlavor(f.id)}
                    className={`text-left px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                      on ? 'bg-raspberry-500 text-white border-raspberry-500' : 'bg-white text-ink-light border-stone-border hover:border-raspberry-300'
                    }`}
                  >
                    {on ? '✓ ' : ''}{f.name}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-light" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${def.label.toLowerCase()}…`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-raspberry-300"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-2xl border border-stone-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-raspberry-300"
              >
                <option>All</option>
                {def.statuses?.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => fetchRows(tab)} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-stone-border bg-white text-sm text-stone-warm hover:text-raspberry-600 transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>

            <p className="text-xs text-stone-warm mb-3">
              {loading ? 'Loading…' : `${filtered.length} ${filtered.length === 1 ? 'result' : 'results'}`}
            </p>

            {!loading && filtered.length === 0 ? (
              <div className="text-center py-16 text-stone-warm">
                <p className="text-3xl mb-2">📭</p>
                <p>No {def.label.toLowerCase()} yet.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filtered.map((r) => {
                  const id = r.id as string
                  const isOpen = expanded === id
                  const hasDetails = (def.details?.length ?? 0) > 0
                  return (
                    <div key={id} className="bg-white rounded-2xl border border-stone-border shadow-card overflow-hidden">
                      <div className="flex items-start gap-3 p-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-ink">{def.primary?.(r)}</p>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_TINT[r.status || ''] || 'bg-stone-100 text-stone-warm border-stone-border'}`}>
                              {r.status}
                            </span>
                          </div>
                          {def.meta?.(r) && <p className="text-sm text-stone-warm mt-0.5">{def.meta(r)}</p>}
                          {def.contact?.(r) && <p className="text-sm text-raspberry-600 mt-0.5 break-words">{def.contact(r)}</p>}
                          <p className="text-[11px] text-stone-light mt-1">{fmtDate(r.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {def.statuses && (
                            <div className="relative">
                              <select
                                value={r.status || ''}
                                onChange={(e) => changeStatus(id, e.target.value)}
                                className="appearance-none text-xs font-medium pl-3 pr-7 py-1.5 rounded-full border border-stone-border bg-cream-100 focus:outline-none focus:ring-2 focus:ring-raspberry-300 cursor-pointer"
                              >
                                {def.statuses.map((s) => <option key={s}>{s}</option>)}
                              </select>
                              <ChevronDown className="w-3 h-3 text-stone-warm absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          )}
                          {hasDetails && (
                            <button
                              onClick={() => setExpanded(isOpen ? null : id)}
                              className="p-1.5 rounded-lg hover:bg-cream-200 transition-colors"
                              aria-label="Toggle details"
                            >
                              <ChevronDown className={`w-4 h-4 text-stone-warm transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                          <button onClick={() => deleteRow(id)} className="p-1.5 rounded-lg text-stone-warm hover:bg-red-50 hover:text-red-600 transition-colors" aria-label="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isOpen && def.details && (
                        <div className="border-t border-stone-border bg-cream-100 px-4 py-3 space-y-2">
                          {def.details.filter(([, k]) => r[k]).length === 0 ? (
                            <p className="text-sm text-stone-light">No additional details.</p>
                          ) : (
                            def.details
                              .filter(([, k]) => r[k])
                              .map(([label, k]) => (
                                <div key={k} className="text-sm">
                                  <span className="font-semibold text-ink-light">{label}: </span>
                                  <span className="text-stone-warm whitespace-pre-wrap">{r[k]}</span>
                                </div>
                              ))
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
