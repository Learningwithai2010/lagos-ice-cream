'use client'

import { useState } from 'react'
import { Lock, Save, RefreshCw, CheckCircle, LogOut } from 'lucide-react'
import allFlavors from '../../data/flavors.json'

const PASSCODE = 'LAGO2025'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [passInput, setPassInput] = useState('')
  const [passError, setPassError] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [loadingBoard, setLoadingBoard] = useState(false)

  const login = () => {
    if (passInput === PASSCODE) {
      setAuthed(true)
      fetchCurrent()
    } else {
      setPassError('Wrong passcode. Try again.')
    }
  }

  const fetchCurrent = async () => {
    setLoadingBoard(true)
    try {
      const res = await fetch('/api/flavor-board')
      const data = await res.json()
      if (data.flavors) {
        setSelected(new Set(data.flavors))
      } else {
        // Default: select featured + first 8
        const defaults = [
          ...allFlavors.filter((f) => f.featured),
          ...allFlavors.filter((f) => !f.featured).slice(0, 6),
        ].map((f) => f.id)
        setSelected(new Set(defaults))
      }
    } catch {
      const defaults = allFlavors.filter((f) => f.featured).map((f) => f.id)
      setSelected(new Set(defaults))
    } finally {
      setLoadingBoard(false)
    }
  }

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const save = async () => {
    setLoading(true)
    setSaveSuccess(false)
    try {
      const res = await fetch('/api/flavor-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: PASSCODE, flavors: Array.from(selected) }),
      })
      if (res.ok) setSaveSuccess(true)
    } catch {
      alert('Save failed. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-raspberry-100 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-raspberry-500" />
            </div>
            <h1 className="font-display font-bold text-2xl text-ink">Lago&apos;s Admin</h1>
            <p className="text-stone-warm text-sm mt-2">Flavor Board Manager</p>
          </div>
          <div className="card-base p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-warm uppercase tracking-wide mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 rounded-2xl border border-stone-border bg-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-raspberry-300"
              />
              {passError && <p className="text-red-600 text-xs mt-1.5">{passError}</p>}
            </div>
            <button onClick={login} className="btn-primary w-full justify-center">
              <Lock className="w-4 h-4" /> Enter
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-200 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-ink">Flavor Board</h1>
            <p className="text-stone-warm text-sm mt-1">
              Toggle flavors on/off for today&apos;s &quot;Scooping Today&quot; board.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchCurrent} disabled={loadingBoard}
              className="flex items-center gap-2 text-sm text-stone-warm hover:text-raspberry-600 transition-colors">
              <RefreshCw className={`w-4 h-4 ${loadingBoard ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button onClick={() => setAuthed(false)} className="flex items-center gap-2 text-sm text-stone-warm">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Active count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-ink">
            <span className="text-raspberry-600 font-bold">{selected.size}</span> flavors selected
          </p>
          <div className="flex gap-2">
            <button onClick={() => setSelected(new Set(allFlavors.map((f) => f.id)))}
              className="text-xs text-stone-warm hover:text-ink underline">Select all</button>
            <span className="text-stone-light">·</span>
            <button onClick={() => setSelected(new Set())}
              className="text-xs text-stone-warm hover:text-ink underline">Clear all</button>
          </div>
        </div>

        {/* Flavor grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {allFlavors.map((flavor) => {
            const active = selected.has(flavor.id)
            return (
              <button
                key={flavor.id}
                onClick={() => toggle(flavor.id)}
                className={`text-left p-3 rounded-2xl border-2 transition-all duration-200 ${
                  active
                    ? 'bg-raspberry-50 border-raspberry-400 shadow-sm'
                    : 'bg-white border-stone-border opacity-50 hover:opacity-70'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full mb-2 ${active ? 'bg-raspberry-500' : 'bg-stone-light'}`} />
                <p className="text-xs font-semibold text-ink leading-snug">{flavor.name}</p>
                {flavor.isOriginal && (
                  <p className="text-[10px] text-raspberry-400 mt-0.5">Original</p>
                )}
              </button>
            )
          })}
        </div>

        {/* Save */}
        <div className="sticky bottom-6">
          <div className="max-w-xs mx-auto">
            <button
              onClick={save}
              disabled={loading}
              className="btn-primary w-full justify-center py-4 text-base shadow-raspberry-lg"
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</>
              ) : saveSuccess ? (
                <><CheckCircle className="w-4 h-4" /> Saved! Board updated.</>
              ) : (
                <><Save className="w-4 h-4" /> Save Flavor Board</>
              )}
            </button>
            {saveSuccess && (
              <p className="text-center text-xs text-green-700 mt-2">
                Visitors will see the updated board within seconds.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
