import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Utensils, 
  ShoppingBag, 
  Sparkles, 
  Smartphone, 
  Dumbbell, 
  Apple, 
  Home, 
  Car, 
  Tag, 
  ArrowRight,
  Sparkles as SparkleIcon
} from 'lucide-react';
import './CategoriesView.css';

const ICON_MAP: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  Utensils,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Dumbbell,
  Apple,
  Home,
  Car
};

export const CategoriesView: React.FC = () => {
  const { categories, offers, setSelectedCategory, setCurrentView } = useApp();

  return (
    <div className="categories-view-wrapper" id="categories-view-root">
      <div className="categories-view-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Tag size={13} />
            <span>Discover by Industry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore All Categories
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Browse through hundreds of verified local shopkeepers, restaurants, salons, and gyms offering exclusive coupons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Tag;
            const categoryOffers = offers.filter((o) => o.category === cat.name && o.status === 'approved');

            return (
              <div
                key={cat.id}
                id={`cat-hero-${cat.slug}`}
                className="category-hero-card"
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setCurrentView('offers');
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-hero-img"
                  referrerPolicy="no-referrer"
                />
                <div className="category-hero-overlay" />

                <div className="category-hero-content">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-black text-white">{cat.name}</h3>
                  <p className="text-xs text-slate-200 line-clamp-1 mb-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                    <span>{categoryOffers.length} Active Deals</span>
                    <span className="flex items-center gap-1">Explore <ArrowRight size={13} /></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
