import { motion } from "framer-motion";
import { Sparkles, Star, ArrowUpRight, Mail } from "lucide-react";
import { Tool } from "../types";

interface ToolOfTheWeekProps {
  tool: Tool;
}

export function ToolOfTheWeek({ tool }: ToolOfTheWeekProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          
          {/* Animated corner accents */}
          <motion.div
            className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-white/30 rounded-tl-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-white/30 rounded-br-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />

          <div className="relative p-8 sm:p-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"
                >
                  <Sparkles className="w-6 h-6 text-black" />
                </motion.div>
                <div>
                  <p className="text-xs text-neutral-500 tracking-widest uppercase mb-1">
                    This Week's Featured Tool
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Tool of the Week
                  </h2>
                </div>
              </div>

              {/* Email CTA */}
              <motion.button
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4" />
                <span>Get Weekly Picks</span>
              </motion.button>
            </div>

            {/* Tool Card */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Tool Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-black">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {tool.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-500 bg-white/5 px-3 py-1 rounded-full">
                        {tool.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-white fill-white" />
                        <span className="text-sm font-medium text-white">
                          {tool.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-400 leading-relaxed mb-6">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 text-sm text-neutral-300 bg-white/5 px-3 py-1.5 rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={`https://${tool.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Visit Tool</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Stats */}
              <div className="lg:w-64 lg:border-l lg:border-white/10 lg:pl-8">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-neutral-500 mb-1">Category</p>
                    <p className="text-sm font-medium text-white">{tool.category}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-neutral-500 mb-1">Pricing</p>
                    <p className="text-sm font-medium text-white">{tool.pricing}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 col-span-2 lg:col-span-1">
                    <p className="text-xs text-neutral-500 mb-1">Website</p>
                    <p className="text-sm font-medium text-white truncate">{tool.website}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}