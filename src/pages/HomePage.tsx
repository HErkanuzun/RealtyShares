import { motion } from 'framer-motion';
import { SparklesCore } from '../components/ui/sparkles';
import { IconBuilding, IconTrendingUp, IconUsers, IconChartBar, IconBuildingSkyscraper, IconChartPie } from '@tabler/icons-react';
import { MarketHighlights } from '../components/home/MarketHighlights';
import { TradingFeatures } from '../components/home/TradingFeatures';
import { InvestmentTypes } from '../components/home/InvestmentTypes';
import { AccountCTA } from '../components/home/AccountCTA';

export const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={0.8}
        className="w-full h-full absolute"
        particleColor="#93c5fd"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Invest in Real Estate Stocks
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of investors who trust our platform for premium real estate investment opportunities. Start building your portfolio today.
          </p>
        </motion.div>

        <AccountCTA />
        
        <MarketHighlights />
        
        <TradingFeatures />

        <InvestmentTypes />
      </div>
    </div>
  );
};