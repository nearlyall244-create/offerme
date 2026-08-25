import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react";
import { navLinks } from "../../data/navigation";
import LocationMegaMenu from "./LocationMegaMenu";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import OffersMegaMenu from "./OffersMegaMenu";
import useOutsideClick from "../../hooks/useOutsideClick";

export const DesktopNavigation = ({
  activeMenu,
  setActiveMenu,
  selectedLocation,
  setSelectedLocation,
  scrolled
}) => {
  const containerRef = useRef(null);

  useOutsideClick(containerRef, () => {
    setActiveMenu(null);
  });

  const handleMenuToggle = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };

  const handleKeyDown = (e, menuId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleMenuToggle(menuId);
    }
  };

  return (
    <div ref={containerRef} className="hidden lg:flex items-center gap-7 relative">
      {navLinks.map((link) => {
        if (link.megaMenu) {
          const isOpen = activeMenu === link.id;
          const isLocation = link.id === "location";

          return (
            <div
              key={link.id}
              className="relative group"
              onMouseEnter={() => setActiveMenu(link.id)}
            >
              <button
                type="button"
                onClick={() => handleMenuToggle(link.id)}
                onKeyDown={(e) => handleKeyDown(e, link.id)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label={`${link.label} Mega Menu`}
                className={`font-display flex items-center gap-1.5 text-sm transition-colors duration-300 font-medium py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-1.5 ${
                  isOpen || (isLocation && selectedLocation)
                    ? "text-emerald-700 font-semibold"
                    : scrolled
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {isLocation && (
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                )}
                <span>
                  {isLocation && selectedLocation ? selectedLocation : link.label}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
              </button>

              {/* Render Open Mega Menu Dropdown */}
              {isOpen && (
                <div
                  className={`absolute top-full z-50 pt-3 ${
                    link.id === "categories"
                      ? "-left-48 lg:-left-60 xl:-left-[260px]"
                      : link.id === "location"
                      ? "left-0"
                      : "-left-48"
                  }`}
                >
                  {link.id === "location" && (
                    <LocationMegaMenu
                      selectedLocation={selectedLocation}
                      onSelectLocation={(loc) => {
                        setSelectedLocation(loc);
                        setActiveMenu(null);
                      }}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}

                  {link.id === "categories" && (
                    <CategoriesMegaMenu onClose={() => setActiveMenu(null)} />
                  )}

                  {link.id === "offers" && (
                    <OffersMegaMenu
                      selectedLocation={selectedLocation}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            key={link.id}
            to={link.to}
            onClick={() => setActiveMenu(null)}
            className={({ isActive }) =>
              `font-display text-sm transition-colors duration-300 relative group font-medium py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg ${
                isActive
                  ? "text-slate-900 font-bold"
                  : scrolled
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
          </NavLink>
        );
      })}
    </div>
  );
};

export default DesktopNavigation;
