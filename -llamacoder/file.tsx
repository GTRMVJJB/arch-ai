'use client';

import { Crown, Check, ArrowRight } from 'lucide-react';

interface PremiumUpsellProps {
  onSubscribe: () => void;
}

export default function PremiumUpsell({ onSubscribe }: PremiumUpsellProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-6">
              <Crown className="w-8 h-8 text-black" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Unlock 15+ Premium Tools
            </h3>
            
            <p className="text-neutral-400 max-w-xl mx-auto mb-6">
              Get access to enterprise-grade AI tools used by top architecture firms worldwide. Plus, receive weekly tool recommendations in your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <Check className="w-4 h-4 text-white" />
                <span>15+ premium tools</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <Check className="w-4 h-4 text-white" />
                <span>Monday newsletter</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <Check className="w-4 h-4 text-white" />
                <span>Priority support</span>
              </div>
            </div>
            
            <button
              onClick={onSubscribe}
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-neutral-200 transition-colors"
            >
              <span>Subscribe for €20/mo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}