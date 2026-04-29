import { motion } from "framer-motion";
import { Bell, Calendar, Mail, Clock, Check, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface SubscriberDashboardProps {
  email: string;
}

export function SubscriberDashboard({ email }: SubscriberDashboardProps) {
  const [nextMonday, setNextMonday] = useState<Date | null>(null);
  const [daysUntil, setDaysUntil] = useState(0);

  useEffect(() => {
    const getNextMonday = () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7 || 7;
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + daysUntilMonday);
      nextMonday.setHours(9, 0, 0, 0);
      return { nextMonday, daysUntil: daysUntilMonday };
    };
    
    const { nextMonday: monday, daysUntil: days } = getNextMonday();
    setNextMonday(monday);
    setDaysUntil(days);
  }, []);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left: Subscriber Info */}
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-14 h-14 bg-white rounded-xl flex items-center justify-center"
                >
                  <Bell className="w-7 h-7 text-black" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">Premium Subscriber</h3>
                    <span className="inline-flex items-center gap-1 bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <Mail className="w-4 h-4" />
                    <span>{email}</span>
                  </div>
                </div>
              </div>

              {/* Right: Next Newsletter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8">
                {/* Countdown */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">
                      Next Newsletter
                    </p>
                    <p className="text-lg font-bold text-white">
                      {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `In ${daysUntil} days`}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">
                      Delivery Time
                    </p>
                    <p className="text-lg font-bold text-white">Monday 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Preview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">This Week's Pick</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/5 rounded-xl p-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-black">V</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">Veras (by Chaos)</h4>
                  <p className="text-sm text-neutral-400">
                    BIM-native AI rendering for Revit & SketchUp
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <Calendar className="w-3 h-3" />
                  <span>Coming Monday</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}