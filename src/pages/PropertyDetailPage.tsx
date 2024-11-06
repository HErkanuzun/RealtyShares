import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconMapPin, IconRuler, IconHome, IconBuildingSkyscraper, IconChartInfographic, IconUsers } from '@tabler/icons-react';
import { useStockStore } from '../store/useStockStore';
import { formatCurrency } from '../utils/formatters';
import { AnimatedCard } from '../components/ui/animated-card';
import { AnimatedButton } from '../components/ui/animated-button';

const properties = {
  'luxury-downtown': {
    id: 'luxury-downtown',
    symbol: 'LDAP',
    name: "Luxury Downtown Apartment Complex",
    location: "New York, NY",
    price: 750000,
    pricePerShare: 75,
    totalShares: 10000,
    availableShares: 8500,
    sqft: 12000,
    type: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000",
    features: [
      "24/7 Concierge Service",
      "Rooftop Pool",
      "Private Parking",
      "Fitness Center"
    ],
    financials: {
      annualReturn: "8.5%",
      occupancyRate: "95%",
      monthlyIncome: 85000,
      expenses: 35000
    },
    description: "Premium residential complex in the heart of Manhattan, featuring luxury amenities and spectacular city views."
  },
  'tech-hub-offices': {
    id: 'tech-hub-offices',
    symbol: 'THOF',
    name: "Tech Hub Office Tower",
    location: "San Francisco, CA",
    price: 2500000,
    pricePerShare: 100,
    totalShares: 25000,
    availableShares: 20000,
    sqft: 35000,
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000",
    features: [
      "Smart Building Technology",
      "Collaborative Spaces",
      "Green Certification",
      "High-Speed Connectivity"
    ],
    financials: {
      annualReturn: "9.2%",
      occupancyRate: "98%",
      monthlyIncome: 225000,
      expenses: 85000
    },
    description: "Modern office complex designed for tech companies, featuring state-of-the-art facilities and sustainable architecture."
  },
  'industrial-complex': {
    id: 'industrial-complex',
    symbol: 'INDC',
    name: "Advanced Industrial Complex",
    location: "Austin, TX",
    price: 1800000,
    pricePerShare: 90,
    totalShares: 20000,
    availableShares: 15000,
    sqft: 50000,
    type: "Industrial",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000",
    features: [
      "Loading Docks",
      "Climate Control",
      "Security System",
      "Storage Units"
    ],
    financials: {
      annualReturn: "7.8%",
      occupancyRate: "92%",
      monthlyIncome: 160000,
      expenses: 60000
    },
    description: "Strategic industrial facility with modern amenities and excellent connectivity to major transportation routes."
  }
};

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shares, setShares] = useState(1);
  const { buyStock, balance } = useStockStore();
  
  const property = id ? properties[id as keyof typeof properties] : null;

  if (!property) {
    return (
      <div className="pt-24 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <AnimatedButton
            onClick={() => navigate('/properties')}
            className="btn-primary"
          >
            View All Properties
          </AnimatedButton>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    if (shares > 0 && shares <= property.availableShares) {
      buyStock(property.symbol, shares);
      navigate('/market');
    }
  };

  const canPurchase = shares > 0 && shares <= property.availableShares && shares * property.pricePerShare <= balance;

  return (
    <div className="pt-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AnimatedCard className="glass rounded-xl overflow-hidden">
          <div className="h-96 relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl font-bold text-white mb-2">{property.name}</h1>
              <div className="flex items-center text-gray-300">
                <IconMapPin className="w-5 h-5 mr-2" />
                {property.location}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Property Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <IconRuler className="w-5 h-5 mr-2 text-accent" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex items-center">
                      <IconHome className="w-5 h-5 mr-2 text-accent" />
                      <span>{property.type}</span>
                    </div>
                    <div className="flex items-center">
                      <IconBuildingSkyscraper className="w-5 h-5 mr-2 text-accent" />
                      <span>{property.financials.occupancyRate} Occupied</span>
                    </div>
                    <div className="flex items-center">
                      <IconChartInfographic className="w-5 h-5 mr-2 text-accent" />
                      <span>{property.financials.annualReturn} Return</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-accent rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300">{property.description}</p>
                </div>
              </div>

              <div>
                <AnimatedCard className="glass p-6 rounded-xl mb-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Investment Details</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Price per Share</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(property.pricePerShare)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Available Shares</span>
                      <span className="text-white font-semibold">
                        {property.availableShares.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Monthly Income</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(property.financials.monthlyIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Monthly Expenses</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(property.financials.expenses)}
                      </span>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard className="glass p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Purchase Shares</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Number of Shares</label>
                      <input
                        type="number"
                        min="1"
                        max={property.availableShares}
                        value={shares}
                        onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
                        className="input-modern w-full"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Cost</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(shares * property.pricePerShare)}
                      </span>
                    </div>
                    <AnimatedButton
                      onClick={handlePurchase}
                      disabled={!canPurchase}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {canPurchase ? 'Purchase Shares' : 'Insufficient Funds'}
                    </AnimatedButton>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};