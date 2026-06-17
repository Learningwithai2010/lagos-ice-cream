'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, IceCream2, ExternalLink, ArrowRight } from 'lucide-react'
import allFlavors from '../data/flavors.json'
import { business } from '../lib/business-data'

/** An action the concierge can route the visitor to — the "does things" layer. */
type ChatAction =
  | { kind: 'catering'; label: string }
  | { kind: 'filter'; label: string; filterType: 'allergen' | 'category'; filterKey: string }

type Message = { role: 'user' | 'assistant'; content: string; action?: ChatAction }

const MAX_SESSION_MESSAGES = 10
const GOOGLE_REVIEW_URL = business.links.googleReviews

/** Detect intent from the visitor's message and map it to a concrete action. */
function detectAction(message: string): ChatAction | undefined {
  const q = message.toLowerCase()
  if (q.match(/cater|party|parties|wedding|event|corporate|birthday/)) {
    return { kind: 'catering', label: 'Plan your event →' }
  }
  if (q.match(/peanut/)) {
    return { kind: 'filter', label: 'See peanut-free flavors →', filterType: 'allergen', filterKey: 'no-peanuts' }
  }
  if (q.match(/nut/)) {
    return { kind: 'filter', label: 'See nut-free flavors →', filterType: 'allergen', filterKey: 'no-nuts' }
  }
  if (q.match(/gluten/)) {
    return { kind: 'filter', label: 'See gluten-free flavors →', filterType: 'allergen', filterKey: 'no-gluten' }
  }
  if (q.match(/dairy|vegan|lactose/)) {
    return { kind: 'filter', label: 'See dairy-free flavors →', filterType: 'category', filterKey: 'dairy-free' }
  }
  if (q.match(/soy/)) {
    return { kind: 'filter', label: 'See soy-free flavors →', filterType: 'allergen', filterKey: 'no-soy' }
  }
  if (q.match(/egg/)) {
    return { kind: 'filter', label: 'See egg-free flavors →', filterType: 'allergen', filterKey: 'no-egg' }
  }
  if (q.match(/sugar|diabet/)) {
    return { kind: 'filter', label: 'See no-sugar-added flavors →', filterType: 'category', filterKey: 'no-sugar-added' }
  }
  if (q.match(/original|signature/)) {
    return { kind: 'filter', label: "See Lago's Originals →", filterType: 'category', filterKey: 'originals' }
  }
  return undefined
}

function localFallback(message: string): string {
  const q = message.toLowerCase()

  if (q.match(/hour|open|clos|when/)) {
    return "Lago's is open 7 days a week from 1–9 PM (seasonal). We're at 71 Lafayette Road, Rye, NH. Call 603-964-9880 to confirm today! 🍦"
  }
  if (q.match(/allerg|gluten|nut|dairy|soy/)) {
    const safe = allFlavors.filter((f) => f.allergens.length === 0).slice(0, 4)
    return `For allergen-free options try: ${safe.map((f) => f.name).join(', ')}. We also have Dairy Free options! Always confirm with our staff for severe allergies. 🌿`
  }
  if (q.match(/best|popular|recommend/)) {
    return "Our #1 best seller is Funky Panda — oreo ice cream with toasted coconut & caramel swirl! Also legendary: Kahlua Fudge Brownie (New England's Best Flavor 1987!), Black Raspberry, and Salty Sailor. 🏆"
  }
  if (q.match(/coffee|espresso|cappuccino/)) {
    return "Coffee lovers — try Cappuccino Slam (espresso + fudge hazelnut swirl, a Lago's Original!), Coffee Oreo, Kahlua Chip, or Coffee Heath Bar Yogurt. ☕"
  }
  if (q.match(/chocolate|fudge|brownie/)) {
    return "Chocolate fans: Cow Pie (brownie batter + fudge!), Kahlua Fudge Brownie, Rocky Road, or Triple Chocolate DF (dairy free!). 🍫"
  }
  if (q.match(/fruit|berry|strawberry|raspberry|blueberry/)) {
    return "Fruity favorites: Black Raspberry (a classic!), Wild Maine Blueberry, Strawberry, Orange Pineapple. All made with real fruit! 🍓"
  }
  if (q.match(/kid|child|fun/)) {
    return "Kids love Cookie Monster (blue vanilla with Oreos!), Cotton Candy, Cake Batter, and M&M! So much fun! 🎉"
  }
  if (q.match(/where|address|location|direction/)) {
    return "We're at 71 Lafayette Road, Rye, NH — Route 1 on the NH Seacoast. Open daily 1–9 PM! 📍"
  }
  return "I'm the Lago's AI Flavor Finder! Tell me what you're craving — coffee + crunchy? Allergy-friendly? Something fruity? I'll find your perfect scoop! 🍦"
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Lago's AI Flavor Finder 🍦 Tell me what you're craving — coffee + crunchy? Allergy-friendly? Fruity? I'll find your perfect scoop!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [showReview, setShowReview] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        inputRef.current?.focus()
      }, 100)
    }
  }, [open, messages])

  useEffect(() => {
    if (sessionCount >= 3 && !showReview) setShowReview(true)
  }, [sessionCount, showReview])

  const sendMessage = async () => {
    if (!input.trim() || loading || sessionCount >= MAX_SESSION_MESSAGES) return
    const userMsg = input.trim()
    setInput('')
    setLoading(true)
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setSessionCount((c) => c + 1)

    const action = detectAction(userMsg)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionCount }),
      })
      const data = await res.json()
      const content = data.fallback || !res.ok ? localFallback(userMsg) : data.response
      setMessages((prev) => [...prev, { role: 'assistant', content, action }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: localFallback(userMsg), action }])
    } finally {
      setLoading(false)
    }
  }

  // Route the visitor to the relevant part of the site — the "concierge does things" layer.
  const runAction = (action: ChatAction) => {
    setOpen(false)
    if (action.kind === 'catering') {
      window.location.hash = '#catering'
      return
    }
    // Filter the explorer, then scroll to it. FlavorExplorer listens for this event.
    window.dispatchEvent(
      new CustomEvent('lago:filter', {
        detail: { filterType: action.filterType, filterKey: action.filterKey },
      })
    )
    const explorer = document.getElementById('flavor-explorer')
    if (explorer) {
      explorer.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Explorer isn't on this page (e.g. a sub-route) — take them to the flavors page.
      window.location.href = `/flavors#flavor-explorer`
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Flavor Finder"
        className={`fixed bottom-24 md:bottom-6 right-5 md:right-6 z-50 w-14 h-14 rounded-full bg-raspberry-500 text-white shadow-raspberry-lg flex items-center justify-center hover:bg-raspberry-600 transition-all duration-300 ${
          open ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100 animate-chat-bounce'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
      </button>

      {/* Window */}
      <div
        className={`fixed bottom-24 md:bottom-6 right-5 md:right-6 z-50 w-[calc(100vw-2.5rem)] max-w-sm bg-white rounded-3xl shadow-2xl border border-stone-border overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
        role="dialog"
        aria-label="AI Flavor Finder"
      >
        {/* Header */}
        <div className="bg-raspberry-gradient px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <IceCream2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">AI Flavor Finder</p>
              <p className="text-white/60 text-xs">Powered by Claude AI</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3 bg-cream-100/40">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[86%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-raspberry-500 text-white rounded-br-sm'
                  : 'bg-white text-ink shadow-sm border border-stone-border/50 rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
              {msg.action && (
                <button
                  onClick={() => runAction(msg.action!)}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-raspberry-500 text-white text-xs font-semibold hover:bg-raspberry-600 transition-colors shadow-sm"
                >
                  {msg.action.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-stone-border/50 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-stone-warm animate-bounce-dot"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {sessionCount >= MAX_SESSION_MESSAGES && (
            <div className="text-center text-xs text-stone-warm bg-stone-100 rounded-2xl p-3">
              Session limit reached. Stop by — our staff loves helping in person! 🍦
            </div>
          )}

          {showReview && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
              <p className="text-xs font-medium text-amber-900 mb-1.5">
                ⭐ Loved your scoop today?
              </p>
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900">
                Rate Lago&apos;s on Google <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-stone-border/50 bg-white">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="What are you craving?"
              className="flex-1 px-4 py-2.5 rounded-2xl border border-stone-border bg-cream-100 text-sm placeholder:text-stone-light focus:outline-none focus:ring-2 focus:ring-raspberry-300 transition-colors"
              disabled={loading || sessionCount >= MAX_SESSION_MESSAGES}
              maxLength={300}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading || sessionCount >= MAX_SESSION_MESSAGES}
              aria-label="Send"
              className="w-10 h-10 rounded-2xl bg-raspberry-500 text-white flex items-center justify-center hover:bg-raspberry-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
