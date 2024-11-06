import { motion, useScroll, useTransform } from 'framer-motion';
import { StockCard } from './StockCard';
import { SparklesCore } from './ui/sparkles';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { useStockStore } from '../store/useStockStore';
import { format } from 'date-fns';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { PortfolioOverview } from './Portfolio/PortfolioOverview';
import { PositionsList } from './Portfolio/PositionsList';

const traders = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Top Trader",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?&w=100&h=100&dpr=2&q=80",
  },
  {
    id: 2,
    name: "Marcus Kim",
    designation: "Market Analyst",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=100&h=100&dpr=2&q=80",
  },
  {
    id: 3,
    name: "Emily Johnson",
    designation: "Portfolio Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=100&h=100&dpr=2&q=80",
  },
];

export const StockDashboard = () => {
  const { stocks } = useStockStore();
  const [searchTerm, setSearchTerm] = useState('');
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8 relative overflow-hidden">
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={0.8}
        className="w-full h-full"
        particleColor="#93c5fd"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="mb-8"
          style={{ y: y1, opacity }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-white">
              Market Overview
            </h1>
            <p className="text-gray-300">
              {format(new Date(), 'MMMM d, yyyy')}
            </p>
          </div>

          <PortfolioOverview />

          <div className="glass p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-white">Top Traders</h2>
                <AnimatedTooltip items={traders} />
              </div>
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <PositionsList />
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              {...stock}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};