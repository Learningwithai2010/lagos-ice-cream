'use client'

import { useState, useMemo } from 'react'
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react'
import allFlavors from '../data/flavors.json'
import clsx from 'clsx'

type Flavor = typeof allFlavors[0]

const ALLERGEN_FILTERS = [
  { key: 'no-gluten', label: 'Gluten Free', allergen: 'gluten' },
  { key: 'no-nuts', label: 'Nut Free', allergen: 'nuts' },
  { key: 'no-peanuts', label: 'Peanut Free', allergen: 'peanuts' },
  { key: 'no-soy', label: 'Soy Free', allergen: 'soy' },
  { key: 'no-egg', label: 'Egg Free', allergen: 'egg' },
  { key: 'no-coconut', label: 'Coconut Free', allergen: 'coconut' },
]

const CATEGORY_FILTERS = [
  { key: 'originals', label: "Lago's Originals" },
  { key: 'dairy-free', label: 'Dairy Free' },
  { key: 'no-sugar-added', label: 'No Sugar Added' },
  { key: 'yogurt', label: 'Yogurt' },
  { key: 'sherbet', label: 'Sherbet' },
  { key: 'half-gallon', label: 'Sold in Half Gallons' },
]

const COLOR_MAP: Record<string, string> = {
  purple: '#7C3AED', chocolate: '#92400E', cream: '#B45309', pink: '#DB2777',
  green: '#059669', brown: '#78350F', amber: '#D97706', yellow: '#CA8A04',
  blue: '#2563EB', orange: '#EA580C', tan: '#A16207',
}

function FlavorCard({ flavor }: { flavor: Flavor }) {
  const [expanded, setExpanded] = useState(false)
  const accent = COLOR_MAP[flavor.colorHint] || '#8B2F82'

  return (
    <div className="card-base p-5 flex flex-col gap-3 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-250">
      {/* Color bar */}
      <div className="h-1 rounded-full w-12" style={{ backgroundColor: accent }} />

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-ink text-base leading-snug">{flavor.name}</h3>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {flavor.isOriginal && (
            <span className="text-[10px] font-bold tracking-wider uppercase text-raspberry-500 bg-raspberry-50 px-2 py-0.5 rounded-full">
              Original
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
      // Search
      if (search && !f.name.toLowerCase().includes(search.toLowerCase()) &&
          !f.description.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      // Allergen exclusions
      const allergenArr = Array.from(allergenFilters)
      for (let i = 0; i < allergenArr.length; i++) {
        const af = ALLERGEN_FILTERS.find((a) => a.key === allergenArr[i])
        if (af && f.allergens.some((a) => a.toLowerCase().includes(af.allergen))) return false
      }
      // Category inclusions
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

  return (
    <section className="section-pad bg-cream-200">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label">50+ Homemade Flavors</p>
          <h2 className="font-display text-display-md font-bold text-ink mb-3">
            Find Your Perfect Scoop
          </h2>
          <p className="text-stone-warm max-w-lg mx-auto">
            Search by name or filter by allergen-free and dietary category. Perfect for
            allergy families.
          </p>
        </div>

        {/* Search + filters */}
        <div className="bg-white rounded-3xl shadow-card p-5 md:p-6 mb-8 border border-stone-border/50">
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-light" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flavors (e.g. &quot;coffee&quot;, &quot;oreo&quot;, &quot;caramel&quot;)..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-stone-border bg-cream-100 text-ink placeholder:text-stone-light text-sm focus:outline-none focus:ring-2 focus:ring-raspberry-300 focus:border-raspberry-300 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-100 transition-colors">
                <X className="w-3 h-3 text-stone-warm" />
              </button>
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

          {/* Clear + count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-border/50">
            <p className="text-sm text-stone-warm">
              <span className="font-semibold text-ink">{filtered.length}</span> flavor{filtered.length !== 1 ? 's' : ''} found
            </p>
            {hasFilters && (
              <button onClick={clearAll} className="text-xs text-raspberry-500 hover:text-raspberry-700 font-medium flex items-center gap-1">
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Flavor grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🍦</p>
            <h3 className="font-display font-semibold text-xl text-ink mb-2">No flavors match</h3>
            <p className="text-stone-warm mb-4">Try removing some filters or adjusting your search.</p>
            <button onClick={clearAll} className="btn-secondary text-sm">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((flavor) => (
              <FlavorCard key={flavor.id} flavor={flavor} />
            ))}
          </div>
        )}

        {/* Allergen disclaimer */}
        <p className="text-xs text-stone-light text-center mt-8 max-w-xl mx-auto">
          Allergen information is provided in good faith. Cross-contamination is possible. Please
          confirm with our staff before ordering if you have severe allergies.
        </p>
      </div>
    </section>
  )
}
