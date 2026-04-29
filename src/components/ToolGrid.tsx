import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowUpRight, Check, Sparkles, ExternalLink } from "lucide-react";
import { Tool } from "../types";

interface ToolGridProps {
  tools: Tool[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-6 h-6 text-neutral-600" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No tools found</h3>
            <p className="text-neutral-500">
              Try adjusting your filters or search query
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-white">
              Collection
            </h2>
            <p className="text-neutral-500 text-sm mt-1">
              {tools.length} {tools.length === 1 ? 'tool' : 'tools'} found
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {tools.map((tool, index) => (
              <motion.article
                key={tool.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative"
              >
                <div className={`relative h-full bg-neutral-900/50 border rounded-2xl overflow-hidden transition-all duration-500 ${
                  tool.featured
                    ? "border-white/20 hover:border-white/40"
                    : "border-white/5 hover:border-white/20"
                }`}>
                  
                  {/* Featured Glow */}
                  {tool.featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Featured Badge */}
                  {tool.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1.5 bg-white text-black text-xs font-medium px-2.5 py-1 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        tool.featured
                          ? "bg-white text-black"
                          : "bg-white/5 border border-white/10"
                      }`}>
                        <span className={`text-lg font-bold ${tool.featured ? "" : "text-white"}`}>
                          {tool.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-neutral-300 transition-colors truncate">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500 bg-white/5 px-2 py-0.5 rounded-md">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-400 leading-relaxed mb-5 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {tool.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-white/5 px-2.5 py-1 rounded-lg"
                        >
                          <Check className="w-3 h-3 text-neutral-600" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-white fill-white" />
                          <span className="text-sm font-medium text-white">
                            {tool.rating}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            tool.pricing === "Free"
                              ? "bg-white/10 text-white"
                              : tool.pricing === "Freemium"
                              ? "bg-white/10 text-neutral-400"
                              : tool.pricing === "Enterprise"
                              ? "bg-white text-black"
                              : "bg-white/10 text-neutral-300"
                          }`}
                        >
                          {tool.pricing}
                        </span>
                      </div>

                      <motion.a
                        href={`https://${tool.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-neutral-400 group-hover:text-white transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}