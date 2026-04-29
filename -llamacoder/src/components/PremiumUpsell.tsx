import { motion } from "framer-motion";
import { Crown, Lock, Check, Sparkles } from "lucide-react";

interface PremiumUpsellProps {
  premiumCount: number;
  onSubscribe: () => void;
}

export function PremiumUpsell({ premiumCount, onSubscribe }: PremiumUpsellProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8"
              >
                <Crown className="w-10 h-10 text-black" />
              </motion.div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Unlock {premiumCount}+ Premium Tools
              </h2>
              <p className="text-lg text-neutral-400 mb-8 max-w-xl mx-auto">
                Get access to our complete collection of AI tools for architects, 
                including enterprise-grade solutions and early-access releases.
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                {[
                  "Full tool database",
                  "Weekly email picks",
                  "Early access tools",
                ].map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-center gap-2 text-neutral-300"
                  >
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-bold text-white">€20</span>
                  <span className="text-neutral-400 mb-1">/month</span>
                </div>
                <p className="text-sm text-neutral-500">
                  Cancel anytime. No hidden fees.
                </p>
              </div>

              {/* CTA */}
              <motion.button
                onClick={onSubscribe}
                className="inline-flex items-center gap-3 bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Crown className="w-5 h-5" />
                <span>Go Premium</span>
              </motion.button>

              {/* Trust */}
              <p className="mt-6 text-xs text-neutral-600">
                Join 2,500+ architects and designers already subscribed
              </p>
            </div>
          </div>

          {/* Locked Tools Preview */}
          <div className="relative mt-8 border-t border-white/10 pt-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-500">
                Premium tools waiting for you
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {[
                "Hypar Generative",
                "Delve by Sidewalk",
                "Spacemaker",
                "Mirage AI",
                "Twinmotion AI",
              ].map((toolName, i) => (
                <motion.div
                  key={toolName}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                >
                  <Lock className="w-3 h-3 text-neutral-600 flex-shrink-0" />
                  <span className="text-xs text-neutral-500 truncate">{toolName}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}