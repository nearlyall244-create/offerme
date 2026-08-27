// ============================================================================
// OfferMe — Centralized Category Data
// Single source of truth for all 29 categories, subcategories, and groupings.
// ============================================================================

export const CATEGORY_GROUPS = [
  { id: 'food-drinks', name: 'Food & Drinks', icon: '🍽️' },
  { id: 'events-bookings', name: 'Events & Bookings', icon: '🎉' },
  { id: 'vehicles', name: 'Vehicles', icon: '🚗' },
  { id: 'daily-essentials', name: 'Daily Essentials', icon: '🛒' },
  { id: 'fashion-personal', name: 'Fashion & Personal Care', icon: '👗' },
  { id: 'electronics-services', name: 'Electronics & Services', icon: '📱' },
  { id: 'home-construction', name: 'Home & Construction', icon: '🏠' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'pets', name: 'Pets', icon: '🐾' },
]

export const CATEGORIES = [
  // ── Food & Drinks ─────────────────────────────────────────────────────
  {
    id: 'restaurant',
    name: 'Restaurant',
    slug: 'restaurant',
    icon: '🍽️',
    description: 'Discover restaurants and eateries near you',
    group: 'food-drinks',
    subcategories: [
      { id: 'veg', name: 'Veg', slug: 'veg', icon: '🥗', description: 'Pure vegetarian restaurants' },
      { id: 'non-veg', name: 'Non Veg', slug: 'non-veg', icon: '🍗', description: 'Non-vegetarian restaurants' },
    ],
  },
  {
    id: 'tea-shops',
    name: 'Tea Shops',
    slug: 'tea-shops',
    icon: '🍵',
    description: 'Local tea shops and chai stalls',
    group: 'food-drinks',
    subcategories: [],
  },
  {
    id: 'soup-shops',
    name: 'Soup Shops',
    slug: 'soup-shops',
    icon: '🍜',
    description: 'Hot and fresh soup shops',
    group: 'food-drinks',
    subcategories: [],
  },
  {
    id: 'snacks-chat',
    name: 'Snacks & Chat',
    slug: 'snacks-chat',
    icon: '🥘',
    description: 'Street food, snacks and chat corners',
    group: 'food-drinks',
    subcategories: [],
  },
  {
    id: 'juice-shops',
    name: 'Juice Shops',
    slug: 'juice-shops',
    icon: '🧃',
    description: 'Fresh juice and smoothie shops',
    group: 'food-drinks',
    subcategories: [],
  },
  {
    id: 'cake-shops',
    name: 'Cake Shops',
    slug: 'cake-shops',
    icon: '🎂',
    description: 'Bakeries and custom cake shops',
    group: 'food-drinks',
    subcategories: [],
  },
  {
    id: 'ice-cream-shops',
    name: 'Ice Cream Shops',
    slug: 'ice-cream-shops',
    icon: '🍦',
    description: 'Ice cream parlours and frozen treats',
    group: 'food-drinks',
    subcategories: [],
  },

  // ── Events & Bookings ─────────────────────────────────────────────────
  {
    id: 'event-bookings',
    name: 'Event Bookings',
    slug: 'event-bookings',
    icon: '🎉',
    description: 'Plan and book events effortlessly',
    group: 'events-bookings',
    subcategories: [
      { id: 'entertainment-djs', name: 'Entertainment / DJs', slug: 'entertainment-djs', icon: '🎧', description: 'DJs, bands and live entertainment' },
      { id: 'photography-videography', name: 'Photography & Videography', slug: 'photography-videography', icon: '📸', description: 'Event photographers and videographers' },
      { id: 'decoration', name: 'Decoration', slug: 'decoration', icon: '🎈', description: 'Event and venue decoration services' },
      { id: 'event-management', name: 'Event Management', slug: 'event-management', icon: '📋', description: 'Full-service event management' },
      { id: 'rentals', name: 'Rentals', slug: 'rentals', icon: '🏗️', description: 'Equipment and venue rentals' },
      { id: 'wedding-services', name: 'Wedding Services', slug: 'wedding-services', icon: '💒', description: 'Complete wedding service providers' },
      { id: 'transport', name: 'Transport', slug: 'transport', icon: '🚐', description: 'Event transport and logistics' },
      { id: 'gifts-favors', name: 'Gifts & Favors', slug: 'gifts-favors', icon: '🎁', description: 'Event gifts, return gifts and favors' },
      { id: 'fashion-beauty', name: 'Fashion & Beauty', slug: 'fashion-beauty', icon: '💄', description: 'Event fashion and beauty services' },
    ],
  },

  // ── Vehicles ───────────────────────────────────────────────────────────
  {
    id: 'vehicles',
    name: 'Vehicles',
    slug: 'vehicles',
    icon: '🚗',
    description: 'Vehicle repair, services and bookings',
    group: 'vehicles',
    subcategories: [
      { id: 'vehicle-repair', name: 'Repair', slug: 'repair', icon: '🔧', description: 'Vehicle repair and mechanics' },
      { id: 'vehicle-services', name: 'Services', slug: 'services', icon: '🛠️', description: 'Vehicle maintenance and servicing' },
      { id: 'vehicle-booking', name: 'Booking', slug: 'booking', icon: '📅', description: 'Vehicle booking and rentals' },
    ],
  },

  // ── Daily Essentials ──────────────────────────────────────────────────
  {
    id: 'medical-shops',
    name: 'Medical Shops',
    slug: 'medical-shops',
    icon: '💊',
    description: 'Pharmacies and medical stores',
    group: 'daily-essentials',
    subcategories: [],
  },
  {
    id: 'daily-essentials',
    name: 'Daily Essentials & Groceries',
    slug: 'daily-essentials',
    icon: '🛒',
    description: 'Supermarkets, vegetables and everyday needs',
    group: 'daily-essentials',
    subcategories: [
      { id: 'supermarket', name: 'Supermarket', slug: 'supermarket', icon: '🏪', description: 'Supermarkets and grocery stores' },
      { id: 'vegetable-shops', name: 'Vegetable Shops', slug: 'vegetable-shops', icon: '🥕', description: 'Fresh vegetable vendors' },
      { id: 'meat-shops', name: 'Meat Shops', slug: 'meat-shops', icon: '🥩', description: 'Fresh meat and poultry shops' },
    ],
  },

  // ── Fashion & Personal Care ───────────────────────────────────────────
  {
    id: 'salons',
    name: 'Salons',
    slug: 'salons',
    icon: '💇',
    description: 'Hair salons and grooming services',
    group: 'fashion-personal',
    subcategories: [
      { id: 'salon-men', name: 'Men', slug: 'men', icon: '💈', description: 'Men\'s grooming and barber shops' },
      { id: 'salon-women', name: 'Women', slug: 'women', icon: '💅', description: 'Women\'s salon and beauty services' },
      { id: 'salon-unisex', name: 'Unisex', slug: 'unisex', icon: '✂️', description: 'Unisex salons for all' },
    ],
  },
  {
    id: 'tailor-shops',
    name: 'Tailor Shops',
    slug: 'tailor-shops',
    icon: '🧵',
    description: 'Tailoring and alteration services',
    group: 'fashion-personal',
    subcategories: [],
  },
  {
    id: 'textiles',
    name: 'Textiles',
    slug: 'textiles',
    icon: '🧶',
    description: 'Textile shops and fabric stores',
    group: 'fashion-personal',
    subcategories: [],
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    slug: 'jewellery',
    icon: '💍',
    description: 'Jewellery shops and accessories',
    group: 'fashion-personal',
    subcategories: [],
  },
  {
    id: 'footwear-shops',
    name: 'Footwear Shops',
    slug: 'footwear-shops',
    icon: '👟',
    description: 'Shoes, sandals and footwear stores',
    group: 'fashion-personal',
    subcategories: [],
  },
  {
    id: 'gift-shops',
    name: 'Gift Shops',
    slug: 'gift-shops',
    icon: '🎁',
    description: 'Gifts, packing and customization',
    group: 'fashion-personal',
    subcategories: [
      { id: 'gift-packing', name: 'Packing', slug: 'packing', icon: '📦', description: 'Gift packing and wrapping services' },
      { id: 'gift-customize', name: 'Customize', slug: 'customize', icon: '🎨', description: 'Customized and personalized gifts' },
      { id: 'gift-booking', name: 'Booking', slug: 'booking', icon: '📅', description: 'Gift pre-booking and orders' },
      { id: 'gift-parcel', name: 'Parcel', slug: 'parcel', icon: '📬', description: 'Gift delivery and parcels' },
    ],
  },

  // ── Electronics & Services ────────────────────────────────────────────
  {
    id: 'mobile',
    name: 'Mobile',
    slug: 'mobile',
    icon: '📱',
    description: 'Mobile repair, services and bookings',
    group: 'electronics-services',
    subcategories: [
      { id: 'mobile-repair', name: 'Repair', slug: 'repair', icon: '🔧', description: 'Mobile phone repair services' },
      { id: 'mobile-services', name: 'Services', slug: 'services', icon: '🛠️', description: 'Mobile accessories and services' },
      { id: 'mobile-booking', name: 'Booking', slug: 'booking', icon: '📅', description: 'Mobile and gadget bookings' },
    ],
  },
  {
    id: 'xerox-printing',
    name: 'Xerox Printing',
    slug: 'xerox-printing',
    icon: '🖨️',
    description: 'Printing, xerox and document services',
    group: 'electronics-services',
    subcategories: [],
  },
  {
    id: 'courier',
    name: 'Courier',
    slug: 'courier',
    icon: '📦',
    description: 'Courier and delivery services',
    group: 'electronics-services',
    subcategories: [],
  },
  {
    id: 'laundry',
    name: 'Laundry',
    slug: 'laundry',
    icon: '👕',
    description: 'Laundry and washing services',
    group: 'electronics-services',
    subcategories: [],
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    slug: 'dry-cleaning',
    icon: '🧥',
    description: 'Professional dry cleaning services',
    group: 'electronics-services',
    subcategories: [],
  },

  // ── Home & Construction ───────────────────────────────────────────────
  {
    id: 'hardware-shops',
    name: 'Hardware Shops',
    slug: 'hardware-shops',
    icon: '🔩',
    description: 'Hardware, tools and construction materials',
    group: 'home-construction',
    subcategories: [],
  },
  {
    id: 'paint-shops',
    name: 'Paint Shops',
    slug: 'paint-shops',
    icon: '🎨',
    description: 'Paints, primers and painting supplies',
    group: 'home-construction',
    subcategories: [],
  },
  {
    id: 'home-services',
    name: 'Home Services',
    slug: 'home-services',
    icon: '🏠',
    description: 'Home repair, cleaning and maintenance',
    group: 'home-construction',
    subcategories: [],
  },

  // ── Education ─────────────────────────────────────────────────────────
  {
    id: 'stationery',
    name: 'Stationery',
    slug: 'stationery',
    icon: '✏️',
    description: 'Stationery and office supplies',
    group: 'education',
    subcategories: [],
  },
  {
    id: 'school-books',
    name: 'School Books & Guides',
    slug: 'school-books',
    icon: '📖',
    description: 'School books, guides and study material',
    group: 'education',
    subcategories: [],
  },
  {
    id: 'learning',
    name: 'Learning / Platforms',
    slug: 'learning',
    icon: '🎓',
    description: 'Tuition centres and coaching platforms',
    group: 'education',
    subcategories: [
      { id: 'tuition-centers', name: 'Tuition Centers', slug: 'tuition-centers', icon: '🏫', description: 'Local tuition and coaching centres' },
      { id: 'neet', name: 'NEET', slug: 'neet', icon: '🩺', description: 'NEET preparation centres' },
      { id: 'jee', name: 'JEE', slug: 'jee', icon: '⚙️', description: 'JEE preparation centres' },
      { id: 'competitive-exams', name: 'Competitive Exams', slug: 'competitive-exams', icon: '📝', description: 'Competitive exam coaching' },
    ],
  },

  // ── Pets ───────────────────────────────────────────────────────────────
  {
    id: 'pet-shops',
    name: 'Pet Shops',
    slug: 'pet-shops',
    icon: '🐾',
    description: 'Pet shops, supplies and accessories',
    group: 'pets',
    subcategories: [
      { id: 'pet-fish', name: 'Fish', slug: 'fish', icon: '🐟', description: 'Aquarium fish and supplies' },
      { id: 'pet-birds', name: 'Birds', slug: 'birds', icon: '🐦', description: 'Pet birds and bird supplies' },
      { id: 'pet-food', name: 'Food', slug: 'food', icon: '🦴', description: 'Pet food and nutrition' },
    ],
  },
]

// ── Helper Functions ──────────────────────────────────────────────────────

/** Get a category object by its slug */
export function getCategoryBySlug(slug) {
  return CATEGORIES.find((cat) => cat.slug === slug) || null
}

/** Get a subcategory by parent slug + sub slug */
export function getSubcategoryBySlug(categorySlug, subSlug) {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return null
  return category.subcategories.find((sub) => sub.slug === subSlug) || null
}

/** Get all categories belonging to a given group id */
export function getCategoriesByGroup(groupId) {
  return CATEGORIES.filter((cat) => cat.group === groupId)
}

/** Get a curated list of popular categories for the homepage */
export function getPopularCategories() {
  const popular = [
    'restaurant', 'event-bookings', 'vehicles', 'tea-shops',
    'daily-essentials', 'salons', 'mobile', 'cake-shops',
    'juice-shops', 'medical-shops', 'gift-shops', 'pet-shops',
  ]
  return popular.map((slug) => getCategoryBySlug(slug)).filter(Boolean)
}
