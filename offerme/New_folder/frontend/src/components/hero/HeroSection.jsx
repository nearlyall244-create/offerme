import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, Star, MapPin, ChevronDown } from 'lucide-react'
import { getAllListings } from '@/data/mockListings'
import styles from './HeroSection.module.css'

const LOCATIONS = [
  { value: 'all', label: 'All Locations' },
  { value: 't-nagar', label: 'T Nagar' },
  { value: 'vadapalani', label: 'Vadapalani' },
  { value: 'porur', label: 'Porur' },
]

const AREA_KEYWORDS = {
  't-nagar': ['t. nagar', 't nagar', 'pondy bazaar', 'usman road', 'panagal park'],
  'vadapalani': ['vadapalani', 'habibullah road', 'aristos road'],
  'porur': ['porur', 'kodambakkam', 'aryagowda road'],
}

function matchesLocation(listing, locationValue) {
  if (locationValue === 'all') return true
  const keywords = AREA_KEYWORDS[locationValue] || []
  const addr = listing.address.toLowerCase()
  return keywords.some((kw) => addr.includes(kw))
}

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('all')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)
  const locationRef = useRef(null)
  const navigate = useNavigate()

  const allListings = useMemo(() => getAllListings(), [])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocationDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLocationLabel = LOCATIONS.find((l) => l.value === location)?.label || 'All Locations'

  // Autocomplete suggestions — filtered by location + search query
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()

    // If typing a location name, show matching areas
    const allAreas = ['t nagar', 'vadapalani', 'porur']
    const matchedAreas = allAreas.filter((area) => area.includes(q) && q.length >= 2)

    let results = []

    // Add matching area suggestions
    matchedAreas.forEach((area) => {
      const locEntry = LOCATIONS.find((l) => l.label.toLowerCase() === area)
      if (locEntry) {
        results.push({
          type: 'area',
          id: `area-${locEntry.value}`,
          label: locEntry.label,
          locationValue: locEntry.value,
        })
      }
    })

    // Add matching business suggestions (filtered by location)
    const filteredListings = allListings
      .filter((l) => matchesLocation(l, location))
      .filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q)
      )
      .slice(0, 5 - results.length)

    filteredListings.forEach((l) => {
      results.push({
        type: 'business',
        id: l.id,
        name: l.name,
        category: l.category,
        rating: l.rating,
        address: l.address,
      })
    })

    return results.slice(0, 6)
  }, [query, location, allListings])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('search', query.trim())
    if (location !== 'all') params.set('location', location)
    navigate(`/categories?${params.toString()}`)
  }

  const handleSuggestionClick = (item) => {
    if (item.type === 'area') {
      setLocation(item.locationValue)
      setQuery('')
    } else {
      setQuery(item.name)
      navigate(`/category/${item.category}`)
    }
    setShowSuggestions(false)
  }

  const handleLocationSelect = (value) => {
    setLocation(value)
    setShowLocationDropdown(false)
  }

  const clearSearch = () => {
    setQuery('')
    setShowSuggestions(false)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h1 className={styles.title}>
            Find the Best<br />
            <span className={styles.highlight}>Offers Near You</span>
          </h1>


          {/* Search Bar with Location */}
          <div className={styles.searchWrapper} ref={searchRef}>
            <form onSubmit={handleSearch} className={styles.searchBar}>
              {/* Location Dropdown */}
              <div className={styles.locationDropdown} ref={locationRef}>
                <button
                  type="button"
                  className={styles.locationBtn}
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                >
                  <MapPin size={16} />
                  <span className={styles.locationLabel}>{selectedLocationLabel}</span>
                  <ChevronDown size={14} className={`${styles.locationChevron} ${showLocationDropdown ? styles.locationChevronOpen : ''}`} />
                </button>

                {showLocationDropdown && (
                  <div className={styles.locationMenu}>
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc.value}
                        type="button"
                        className={`${styles.locationOption} ${location === loc.value ? styles.locationOptionActive : ''}`}
                        onClick={() => handleLocationSelect(loc.value)}
                      >
                        <MapPin size={14} />
                        {loc.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.searchDivider} />

              {/* Search Input */}
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search restaurants, shops, offers..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setShowSuggestions(e.target.value.length >= 2)
                }}
                onFocus={() => query.length >= 2 && setShowSuggestions(true)}
              />
              {query && (
                <button type="button" className={styles.clearBtn} onClick={clearSearch} aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
              <button type="submit" className={styles.searchBtn}>
                Search
              </button>
            </form>

            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((item) => {
                  if (item.type === 'area') {
                    return (
                      <button
                        key={item.id}
                        className={styles.suggestionItem}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        <div className={styles.suggestionInfo}>
                          <span className={styles.suggestionName}>
                            <MapPin size={14} className={styles.suggestionPin} />
                            {item.label}
                          </span>
                          <span className={styles.suggestionType}>Location</span>
                        </div>
                      </button>
                    )
                  }
                  return (
                    <button
                      key={item.id}
                      className={styles.suggestionItem}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <div className={styles.suggestionInfo}>
                        <span className={styles.suggestionName}>{item.name}</span>
                        <span className={styles.suggestionMeta}>
                          <Star size={12} />
                          {item.rating} · {item.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <Link to="/auth/signup" className={styles.ctaPrimary}>
              Get Started
            </Link>

          </div>

        </motion.div>
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
        </motion.div>
      </div>
    </section>
  )
}
