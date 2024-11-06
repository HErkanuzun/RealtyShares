import { motion } from 'framer-motion';
import { IconChartPie, IconBuildingBank, IconDeviceMobile } from '@tabler/icons-react';

export const TradingFeatures = () => {
  const features = [
    {
      icon: IconChartPie,
      title: "Portfolio Diversification",
      description: "Spread your investments across various real estate sectors"
    },
    {
      icon: IconBuildingBank,
      title: "Institutional Grade",
      description: "Access to premium properties typically reserved for institutions"
    },
    {
      icon: IconDeviceMobile,
      title: "Mobile Trading",
      description: "Trade and monitor your investments on the go"
    }
  ];

  return (
    <div className="py-20 bg-white/5 rounded-3xl my-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white text-center mb-12"
      >
        Why Choose Us
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 px-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 glass rounded-2xl flex items-center justify-center">
              <feature.icon className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};