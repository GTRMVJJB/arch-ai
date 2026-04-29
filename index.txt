import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FilterBar } from "./components/FilterBar";
import { ToolGrid } from "./components/ToolGrid";
import { Footer } from "./components/Footer";
import { PremiumUpsell } from "./components/PremiumUpsell";
import { SubscriptionModal } from "./components/SubscriptionModal";
import { ToolOfTheWeek } from "./components/ToolOfTheWeek";
import { SubscriberDashboard } from "./components/SubscriberDashboard";
import { categories, pricingTypes, freeTools, premiumTools, toolOfTheWeek } from "./utils/data";
import { Tool, FilterState } from "./types";

export default function App() {
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    pricing: "All",
    search: "",
  });
  
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  // Combine free and premium tools based on subscription status
  const allTools = isSubscribed 
    ? [...freeTools, ...premiumTools] 
    : freeTools;

  const filteredTools = allTools.filter((tool: Tool) => {
    const matchesCategory =
      filters.category === "All" || tool.category === filters.category;
    const matchesPricing =
      filters.pricing === "All" || tool.pricing === filters.pricing;
    const matchesSearch =
      filters.search === "" ||
      tool.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      tool.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesPricing && matchesSearch;
  });

  const handleSubscribe = (email: string) => {
    setIsSubscribed(true);
    setSubscriberEmail(email);
    setShowSubscriptionModal(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header 
        isSubscribed={isSubscribed} 
        onSubscribe={() => setShowSubscriptionModal(true)} 
      />
      <Hero />
      
      {/* Show subscriber dashboard with Monday newsletter info */}
      {isSubscribed && (
        <SubscriberDashboard email={subscriberEmail} />
      )}
      
      <ToolOfTheWeek tool={toolOfTheWeek} />
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        pricingTypes={pricingTypes}
      />
      <ToolGrid tools={filteredTools} />
      
      {!isSubscribed && (
        <PremiumUpsell 
          premiumCount={premiumTools.length}
          onSubscribe={() => setShowSubscriptionModal(true)}
        />
      )}
      
      <Footer />
      
      <AnimatePresence>
        {showSubscriptionModal && (
          <SubscriptionModal
            onClose={() => setShowSubscriptionModal(false)}
            onSuccess={handleSubscribe}
          />
        )}
      </AnimatePresence>
    </div>
  );
}