import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Crown } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export function Header({ isSubscribed, onSubscribe }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg tracking-tighter">A</span>
              </div>
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-lg blur-xl"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">
                Arch<span className="text-neutral-500">AI</span>
              </span>
              <span className="text-[10px] text-neutral-600 tracking-[0.2em] uppercase">
                Directory
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {["Tools", "Categories", "Resources", "About"].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                className="relative px-5 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-white group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <motion.button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-4 h-4 text-neutral-400" />
            </motion.button>

            {/* Subscribe / Premium Button */}
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2.5 rounded-full"
              >
                <Crown className="w-4 h-4 text-white" />
                <span>Premium</span>
              </motion.div>
            ) : (
              <motion.button
                onClick={onSubscribe}
                className="hidden sm:flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Crown className="w-4 h-4" />
                <span>Go Premium</span>
              </motion.button>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden flex w-10 h-10 items-center justify-center rounded-full border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Expand */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search AI tools for architecture..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-white/5 overflow-hidden bg-neutral-950"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {["Tools", "Categories", "Resources", "About"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="px-4 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                onClick={onSubscribe}
                className="mt-2 flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-3 rounded-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Crown className="w-4 h-4" />
                <span>Go Premium</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}