import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { FilterState } from "../types";

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  categories: string[];
  pricingTypes: string[];
}

export function FilterBar({
  filters,
  setFilters,
  categories,
  pricingTypes,
}: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const activeFiltersCount = [
    filters.category !== "All",
    filters.pricing !== "All",
    filters.search !== "",
  ].filter(Boolean).length;

  return (
    <section className="sticky top-20 z-40 bg-neutral-950/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Search */}
          <motion.div 
            className="relative flex-1 w-full lg:max-w-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search tools..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-neutral-400" />
              </button>
            )}
          </motion.div>

          {/* Filter Toggle & Dropdowns */}
          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
            {/* Category Dropdown */}
            <div className="relative flex-1 lg:flex-none min-w-[140px]">
              <motion.button
                onClick={() => setActiveDropdown(activeDropdown === "category" ? null : "category")}
                className={`w-full lg:w-auto flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                  filters.category !== "All"
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/30"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <span className="truncate">{filters.category === "All" ? "Category" : filters.category}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${activeDropdown === "category" ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {activeDropdown === "category" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-full lg:w-56 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-80 overflow-y-auto"
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setFilters({ ...filters, category });
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          filters.category === category
                            ? "bg-white text-black"
                            : "text-neutral-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing Dropdown */}
            <div className="relative flex-1 lg:flex-none min-w-[120px]">
              <motion.button
                onClick={() => setActiveDropdown(activeDropdown === "pricing" ? null : "pricing")}
                className={`w-full lg:w-auto flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                  filters.pricing !== "All"
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/30"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <span className="truncate">{filters.pricing === "All" ? "Pricing" : filters.pricing}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${activeDropdown === "pricing" ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {activeDropdown === "pricing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 lg:left-0 mt-2 w-full lg:w-40 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                  >
                    {pricingTypes.map((pricing) => (
                      <button
                        key={pricing}
                        onClick={() => {
                          setFilters({ ...filters, pricing });
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          filters.pricing === pricing
                            ? "bg-white text-black"
                            : "text-neutral-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {pricing}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clear Filters */}
            <AnimatePresence>
              {activeFiltersCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setFilters({ category: "All", pricing: "All", search: "" })}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}