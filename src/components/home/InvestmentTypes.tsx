import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedCard } from '../ui/animated-card';
import { AnimatedButton } from '../ui/animated-button';

const investmentTypes = [
  {
    id: 'commercial',
    title: "Commercial Properties",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800",
    description: "Office buildings and retail spaces in prime locations"
  },
  {
    id: 'residential',
    title: "Residential Complexes",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
    description: "Multi-family residential properties and apartment buildings"
  },
  {
    id: 'industrial',
    title: "Industrial Real Estate",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800",
    description: "Warehouses and manufacturing facilities"
  }
];

export const InvestmentTypes = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-light text-center mb-12"
      >
        Investment Opportunities
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {investmentTypes.map((type, index) => (
          <AnimatedCard
            key={type.id}
            className="card-modern overflow-hidden cursor-pointer group"
          >
            <div onClick={() => navigate(`/investment/${type.id}`)}>
              <div className="h-48 relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent group-hover:from-primary/80 transition-all duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-light mb-2 group-hover:text-accent transition-colors">
                  {type.title}
                </h3>
                <p className="text-secondary-light mb-4">{type.description}</p>
                <AnimatedButton className="btn-primary w-full">
                  Learn More
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};