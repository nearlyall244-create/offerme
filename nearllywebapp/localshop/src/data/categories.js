let categoryColumns = [
  {
    id: 1,
    name: "Food & Drinks",
    categories: [
      { id: 1, name: "Tea Shops", slug: "tea-shops", icon: "🍵", count: 12 },
      { id: 2, name: "Grocery Stores", slug: "grocery-stores", icon: "🛒", count: 8 },
      { id: 3, name: "Bakeries", slug: "bakeries", icon: "🍞", count: 5 },
    ],
  },
  {
    id: 2,
    name: "Services",
    categories: [
      { id: 4, name: "Mobile Repair", slug: "mobile-repair", icon: "📱", count: 6 },
      { id: 5, name: "Tailoring", slug: "tailoring", icon: "🧵", count: 4 },
      { id: 6, name: "Electricians", slug: "electricians", icon: "⚡", count: 3 },
    ],
  },
  {
    id: 3,
    name: "Shops",
    categories: [
      { id: 7, name: "Local Street Shops", slug: "local-street-shops", icon: "🏪", count: 15 },
      { id: 8, name: "Medical Stores", slug: "medical-stores", icon: "💊", count: 7 },
      { id: 9, name: "Stationery", slug: "stationery", icon: "📝", count: 3 },
    ],
  },
];

let categories = categoryColumns.flatMap((col) => col.categories || []);
let categoryGroups = categoryColumns;
let allCategories = categories.map((c) => c.name);

export { categoryColumns, categories, categoryGroups, allCategories };
export default categories;
