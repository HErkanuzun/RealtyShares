import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatedButton } from '../../components/ui/animated-button';

const investmentTypes = {
  'commercial': {
    title: "Commercial Properties",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800",
    description: "Office buildings and retail spaces in prime locations",
    details: [
      "Class A office buildings in prime business districts",
      "High-traffic retail locations",
      "Mixed-use developments",
      "Long-term tenant agreements"
    ],
    metrics: {
      averageReturn: "8.5%",
      minimumInvestment: "$25,000",
      holdingPeriod: "3-5 years",
      occupancyRate: "95%"
    }
  },
  'residential': {
    title: "Residential Complexes",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
    description: "Multi-family residential properties and apartment buildings",
    details: [
      "Luxury apartment complexes",
      "Student housing near universities",
      "Senior living communities",
      "Transit-oriented developments"
    ],
    metrics: {
      averageReturn: "7.2%",
      minimumInvestment: "$15,000",
      holdingPeriod: "2-4 years",
      occupancyRate: "92%"
    }
  },
  'industrial': {
    title: "Industrial Real Estate",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800",
    description: "Warehouses and manufacturing facilities",
    details: [
      "E-commerce fulfillment centers",
      "Last-mile distribution facilities",
      "Manufacturing plants",
      "Cold storage facilities"
    ],
    metrics: {
      averageReturn: "9.1%",
      minimumInvestment: "$30,000",
      holdingPeriod: "4-7 years",
      occupancyRate: "98%"
    }
  }
};

export const InvestmentDetailPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const investment = type ? investmentTypes[type as keyof typeof investmentTypes] : null;

  if (!investment) {
    return <div>Investment type not found</div>;
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-modern overflow-hidden"
        >
          <div className="h-64 relative">
            <img
              src={investment.image}
              alt={investment.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-light">
              {investment.title}
            </h1>
          </div>

          <div className="p-8">
            <p className="text-xl text-secondary-light mb-8">{investment.description}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card-modern p-6"
              >
                <h2 className="text-2xl font-bold text-light mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {investment.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-secondary-light"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card-modern p-6"
              >
                <h2 className="text-2xl font-bold text-light mb-4">Investment Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(investment.metrics).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 card-modern"
                    >
                      <h3 className="text-secondary-light text-sm mb-1">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h3>
                      <p className="text-2xl font-bold text-light">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <AnimatedButton
                onClick={() => navigate('/start-investing')}
                className="btn-primary px-8 py-3"
              >
                Start Investing Now
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};