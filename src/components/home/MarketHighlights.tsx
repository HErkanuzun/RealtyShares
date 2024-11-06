import { motion } from 'framer-motion';
import { IconTrendingUp, IconChartBar, IconBuildingSkyscraper } from '@tabler/icons-react';

export const MarketHighlights = () => {
  const highlights = [
    {
      title: "Market Cap",
      value: "$2.4T",
      change: "+5.2%",
      icon: IconChartBar,
      description: "Total real estate market capitalization"
    },
    {
      title: "Trading Volume",
      value: "1.2M",
      change: "+12.8%",
      icon: IconTrendingUp,
      description: "Daily trading volume"
    },
    {
      title: "Listed Properties",
      value: "2,450",
      change: "+3.4%",
      icon: IconBuildingSkyscraper,
      description: "Available investment properties"
    }
  ];

  return (
    <div className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white text-center mb-12"
      >
        Market Highlights
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="glass p-6 rounded-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <highlight.icon className="w-8 h-8 text-blue-400" />
              <span className="text-green-400 text-sm">{highlight.change}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{highlight.title}</h3>
            <p className="text-3xl font-bold text-white mb-2">{highlight.value}</p>
            <p className="text-gray-400 text-sm">{highlight.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};