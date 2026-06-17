'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, X, ChevronDown, ChevronUp, Flame, Sparkles } from 'lucide-react'
import allFlavors from '../data/flavors.json'
import clsx from 'clsx'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type Flavor = typeof allFlavors[0]

// Real bestsellers / most-asked-for flavors (from research) — drive the
// "Popular" badge and the default "Most Popular" sort.
const POPULAR_IDS = new Set([
  'funky-panda',
  'kahlua-fudge-brownie',
  'black-raspberry',
  'cappuccino-slam',
  'salty-sailor',
  'oreo',
  'peanut-butter-cup',
  'mint-chocolate-chip',
])

const ALLERGEN_FILTERS = [
  { key: 'no-gluten',   label: 'Gluten Free',  allergen: 'gluten' },
  { key: 'no-nuts',     label: 'Nut Free',     allergen: 'nuts' },
  { key: 'no-peanuts',  label: 'Peanut Free',  allergen: 'peanuts' },
  { key: 'no-soy',      label: 'Soy Free',     allergen: 'soy' },
  { key: 'no-egg',      label: 'Egg Free',     allergen: 'egg' },
  { key: 'no-coconut',  label: 'Coconut Free', allergen: 'coconut' },
]

const CATEGORY_FILTERS = [
  { key: 'originals',       label: "Lago's Originals" },
  { key: 'dairy-free',      label: 'Dairy Free' },
  { key: 'no-sugar-added',  label: 'No Sugar Added' },
  { key: 'yogurt',          label: 'Yogurt' },
  { key: 'sherbet',         label: 'Sherbet' },
  { key: 'half-gallon',     label: 'Sold in Half Gallons' },
]

const COLOR_MAP: Record<string, string> = {
  purple: '#7C3AED', chocolate: '#92400E', cream: '#B45309', pink: '#DB2777',
  green: '#059669', brown: '#78350F', amber: '#D97706', yellow: '#CA8A04',
  blue: '#2563EB', orange: '#EA580C', tan: '#A16207',
}

const sectionVars = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUpVars = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const gridVars = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

function FlavorCard({ flavor, isPopular }: { flavor: Flavor; isPopular: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const accent = COLOR_MAP[flavor.colorHint] || '#2E5090'

  return (
    <div className="card-base p-5 flex flex-col gap-3 hover:shadow-card-hover hover:-translate-y-1 hover:border-gold/40 transition-all duration-200">
      {/* Color bar */}
      <div className="h-1.5 rounded-full w-12" style={{ backgroundColor: accent }} />

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-ink text-base leading-snug">{flavor.name}</h3>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {flavor.isOriginal && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-raspberry-500 bg-raspberry-50 px-2 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" /> Original
            </span>
          )}
          {isPopular && !flavor.isOriginal && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-gold-dark bg-gold-soft px-2 py-0.5 rounded-full">
              <Flame className="w-2.5 h-2.5" /> Popular
            </span>
          )}
          {flavor.halfGallon && (
            <span className="text-[10px] font-medium text-stone-warm bg-stone-100 px-2 py-0.5 rounded-full">
              ½ Gal
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-stone-warm leading-relaxed">{flavor.description}</p>

      {/* Tags */}
      {flavor.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {flavor.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-green-100 text-green-800">
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>
      )}

      {/* Allergens toggle */}
      {flavor.allergens.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-stone-light hover:text-ink transition-colors"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            Allergens: {expanded ? 'hide' : `contains ${flavor.allergens.length}`}
          </button>
          {expanded && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {flavor.allergens.map((a) => (
                <span key={a} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {flavor.allergens.length === 0 && (
        <p className="text-xs text-green-700 font-medium">✓ No common allergens</p>
      )}
    </div>
  )
}

export default function FlavorExplorer() {
  const [search, setSearch] = useState('')
  const [allergenFilters, setAllergenFilters] = useState<Set<string>>(new Set())
  const [categoryFilters, setCategoryFilters] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<'popular' | 'az'>('popular')
  const [showSuggest, setShowSuggest] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-60px' })

  // Let the concierge chat (or any UI) pre-apply a filter via a window event.
  useEffect(() => {
    const handler = (e: Event) => {
      const { filterType, filterKey } = (e as CustomEvent).detail || {}
      if (!filterKey) return
      if (filterType === 'allergen') {
        setAllergenFilters(new Set([filterKey]))
        setCategoryFilters(new Set())
      } else if (filterType === 'category') {
        setCategoryFilters(new Set([filterKey]))
        setAllergenFilters(new Set())
      }
      setSearch('')
    }
    window.addEventListener('lago:filter', handler)
    return () => window.removeEventListener('lago:filter', handler)
  }, [])

  const toggleAllergen = (key: string) => {
    setAllergenFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })
  }

  const toggleCategory = (key: string) => {
    setCategoryFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })
  }

  const clearAll = () => {
    setSearch('')
    setAllergenFilters(new Set())
    setCategoryFilters(new Set())
  }

  const hasFilters = search || allergenFilters.size > 0 || categoryFilters.size > 0

  const filtered = useMemo(() => {
    return allFlavors.filter((f) => {
      if (search && !f.name.toLowerCase().includes(search.toLowerCase()) &&
          !f.description.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      const allergenArr = Array.from(allergenFilters)
      for (let i = 0; i < allergenArr.length; i++) {
        const af = ALLERGEN_FILTERS.find((a) => a.key === allergenArr[i])
        if (af && f.allergens.some((a) => a.toLowerCase().includes(af.allergen))) return false
      }
      if (categoryFilters.size > 0) {
        const catArr = Array.from(categoryFilters)
        let match = false
        for (let i = 0; i < catArr.length; i++) {
          const cat = catArr[i]
          if (cat === 'originals' && f.isOriginal) { match = true; break }
          if (cat === 'half-gallon' && f.halfGallon) { match = true; break }
          if ((f.tags as string[]).includes(cat)) { match = true; break }
        }
        if (!match) return false
      }
      return true
    })
  }, [search, allergenFilters, categoryFilters])

  // Sort: "Most Popular" floats bestsellers + originals up; "A–Z" alphabetical.
  const sorted = useMemo(() => {
    const rank = (f: Flavor) => (POPULAR_IDS.has(f.id) ? 0 : f.isOriginal ? 1 : 2)
    return [...filtered].sort((a, b) => {
      if (sort === 'az') return a.name.localeCompare(b.name)
      const r = rank(a) - rank(b)
      return r !== 0 ? r : a.name.localeCompare(b.name)
    })
  }, [filtered, sort])

  // Autocomplete suggestions from the search box.
  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (q.length < 2) return []
    return allFlavors
      .filter((f) => f.name.toLowerCase().includes(q))
      .slice(0, 6)
  }, [search])

  return (
    <section id="flavor-explorer" ref={sectionRef} className="section-pad bg-cream-200">
      <div className="container-wide">

        <motion.div
          variants={sectionVars}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUpVars} className="text-center mb-10">
            <p className="section-label">50+ Homemade Flavors</p>
            <h2 className="font-display text-display-md font-bold text-ink mb-3">
              Find Your Perfect Scoop
            </h2>
            <p className="text-stone-warm max-w-lg mx-auto">
              Search by name or filter by allergen-free and dietary category. Perfect for
              allergy families.
            </p>
          </motion.div>

          {/* Search + filters */}
          <motion.div variants={fadeUpVars} className="bg-white rounded-3xl shadow-card p-5 md:p-6 mb-8 border border-stone-border/50">
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-light z-10" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowSuggest(true) }}
                onFocus={() => setShowSuggest(true)}
                onBlur={() => setTimeout(() => setShowSuggest(false), 120)}
                placeholder="Search flavors (e.g. &quot;coffee&quot;, &quot;oreo&quot;, &quot;caramel&quot;)..."
                className="w-full pl-10 pr-10 py-3 rounded-2xl border border-stone-border bg-cream-100 text-ink placeholder:text-stone-light text-sm focus:outline-none focus:ring-2 focus:ring-raspberry-300 focus:border-raspberry-300 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-100 transition-colors z-10">
                  <X className="w-3 h-3 text-stone-warm" />
                </button>
              )}

              {/* Autocomplete */}
              {showSuggest && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full mt-2 bg-white border border-stone-border rounded-2xl shadow-card-hover overflow-hidden z-20">
                  {suggestions.map((f) => (
                    <li key={f.id}>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); setSearch(f.name); setShowSuggest(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-cream-200 flex items-center justify-between gap-2"
                      >
                        <span>{f.name}</span>
                        {(POPULAR_IDS.has(f.id) || f.isOriginal) && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-gold-dark">
                            {f.isOriginal ? 'Original' : 'Popular'}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Allergen filters */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-stone-warm uppercase tracking-wider mb-2">
                Allergen Free — show only
              </p>
              <div className="flex flex-wrap gap-2">
                {ALLERGEN_FILTERS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => toggleAllergen(key)}
                    className={clsx(
                      'filter-pill',
                      allergenFilters.has(key) ? 'filter-pill-active' : 'filter-pill-inactive'
                    )}
                  >
                    {allergenFilters.has(key) && <span className="mr-1">✓</span>}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filters */}
            <div>
              <p className="text-xs font-semibold text-stone-warm uppercase tracking-wider mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className={clsx(
                      'filter-pill',
                      categoryFilters.has(key) ? 'filter-pill-active' : 'filter-pill-inactive'
                    )}
                  >
                    {categoryFilters.has(key) && <span className="mr-1">✓</span>}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort + clear + count */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-border/50">
              <p className="text-sm text-stone-warm">
                <span className="font-semibold text-ink">{sorted.length}</span> flavor{sorted.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-full border border-stone-border p-0.5 bg-cream-100">
                  {([['popular', 'Most Popular'], ['az', 'A–Z']] as const).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSort(key)}
                      className={clsx(
                        'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                        sort === key ? 'bg-raspberry-500 text-white' : 'text-stone-warm hover:text-ink'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {hasFilters && (
                  <button onClick={clearAll} className="text-xs text-raspberry-500 hover:text-raspberry-700 font-medium flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Flavor grid with AnimatePresence for empty state */}
          <motion.div variants={gridVars}>
            <AnimatePresence mode="wait">
              {sorted.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-center py-20"
                >
                  <p className="text-4xl mb-4">🍦</p>
                  <h3 className="font-display font-semibold text-xl text-ink mb-2">No flavors match</h3>
                  <p className="text-stone-warm mb-4">Try removing some filters or adjusting your search.</p>
                  <button onClick={clearAll} className="btn-secondary text-sm">
                    Clear all filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {sorted.map((flavor) => (
                    <FlavorCard key={flavor.id} flavor={flavor} isPopular={POPULAR_IDS.has(flavor.id)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Allergen disclaimer */}
          <motion.p variants={fadeUpVars} className="text-xs text-stone-light text-center mt-8 max-w-xl mx-auto">
            Allergen information is provided in good faith. Cross-contamination is possible. Please
            confirm with our staff before ordering if you have severe allergies.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
