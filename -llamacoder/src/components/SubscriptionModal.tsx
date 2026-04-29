import { motion } from "framer-motion";
import { X, Crown, Check, Mail, CreditCard, Sparkles, Bell } from "lucide-react";
import { useState } from "react";

interface SubscriptionModalProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export function SubscriptionModal({ onClose, onSuccess }: SubscriptionModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (step === "details" && email && name) {
      setStep("payment");
    } else if (step === "payment") {
      setIsLoading(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsLoading(false);
        setStep("success");
        // Auto close after success
        setTimeout(() => {
          onSuccess(email);
        }, 2500);
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-4 h-4 text-neutral-400" />
        </button>

        {/* Success State */}
        {step === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-8 h-8 text-black" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Welcome to Premium!</h3>
            <p className="text-neutral-400 mb-4">
              You now have access to all premium tools.
            </p>
            
            {/* Monday Newsletter Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Monday Newsletter</p>
                  <p className="text-xs text-neutral-500">Tool of the Week in your inbox</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 text-left">
                Every Monday at 9:00 AM CET, you'll receive our curated AI tool recommendation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-white"
            >
              <Mail className="w-4 h-4" />
              <span>Sent to: {email}</span>
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Go Premium</h3>
                  <p className="text-sm text-neutral-500">Unlock all AI tools</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === "details" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Weekly AI tool recommendations sent every Monday
                    </p>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neutral-400">Plan</span>
                      <span className="text-white font-medium">Premium Monthly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Price</span>
                      <span className="text-white font-bold text-xl">€20/mo</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-neutral-500 mb-3 uppercase tracking-wider">Included with Premium</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "15+ premium tools",
                    "Monday newsletter",
                    "Early access",
                    "Priority support",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm text-neutral-300">
                      <Check className="w-3 h-3 text-white" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <motion.button
                onClick={handleSubmit}
                disabled={isLoading || (step === "details" && (!email || !name))}
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                ) : step === "details" ? (
                  <>
                    <span>Continue to Payment</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4" />
                    <span>Subscribe for €20/mo</span>
                  </>
                )}
              </motion.button>

              {step === "payment" && (
                <button
                  onClick={() => setStep("details")}
                  className="w-full mt-3 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  ← Back to details
                </button>
              )}

              <p className="text-xs text-neutral-600 text-center mt-4">
                Secure payment powered by Stripe. Cancel anytime.
              </p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}