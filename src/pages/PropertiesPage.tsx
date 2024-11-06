import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconMapPin, IconRuler, IconHome, IconChartInfographic } from '@tabler/icons-react';
import { AnimatedCard } from '../components/ui/animated-card';
import { AnimatedButton } from '../components/ui/animated-button';

const properties = [
  {
    id: 'luxury-downtown',
    name: "Luxury Downtown Apartment Complex",
    location: "New York, NY",
    price: 750000,
    sqft: 12000,
    type: "Residential",
    return: "8.5%",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400",
  },
  {
    id: 'tech-hub-offices',
    name: "Tech Hub Office Tower",
    location: "San Francisco, CA",
    price: 2500000,
    sqft: 35000,
    type: "Commercial",
    return: "9.2%",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400",
  },
  {
    id: 'industrial-complex',
    name: "Advanced Industrial Complex",
    location: "Austin, TX",
    price: 1800000,
    sqft: 50000,
    type: "Industrial",
    return: "7.8%",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=400",
  },
];

export const PropertiesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Available Properties</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our curated selection of premium real estate investment opportunities.
            Each property has been carefully vetted for maximum potential returns.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <AnimatedCard
              key={property.id}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full">
                  {property.type}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                <div className="flex items-center text-gray-300 mb-2">
                  <IconMapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center">
                    <IconRuler className="w-4 h-4 mr-1" />
                    {property.sqft.toLocaleString()} sqft
                  </div>
                  <div className="flex items-center">
                    <IconChartInfographic className="w-4 h-4 mr-1" />
                    {property.return} Return
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">${property.price.toLocaleString()}</div>
                  <AnimatedButton
                    onClick={() => navigate(`/property/${property.id}`)}
                    className="btn-primary"
                  >
                    View Details
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};