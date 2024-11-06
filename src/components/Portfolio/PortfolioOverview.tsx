import { motion } from 'framer-motion';
import { useStockStore } from '../../store/useStockStore';
import { formatCurrency } from '../../utils/formatters';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

export const PortfolioOverview = () => {
  const { positions, stocks, balance } = useStockStore();
  
  const portfolioValue = positions.reduce((total, position) => {
    const stock = stocks.find(s => s.symbol === position.symbol);
    return total + (stock?.price || 0) * position.shares;
  }, 0);

  const totalReturn = positions.reduce((total, position) => {
    const stock = stocks.find(s => s.symbol === position.symbol);
    if (!stock) return total;
    const currentValue = stock.price * position.shares;
    const costBasis = position.averagePrice * position.shares;
    return total + (currentValue - costBasis);
  }, 0);

  const returnPercentage = (totalReturn / (portfolioValue - totalReturn)) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <h3 className="text-gray-400 text-sm mb-2">Portfolio Value</h3>
        <p className="text-2xl font-bold text-white">{formatCurrency(portfolioValue)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-6 rounded-xl"
      >
        <h3 className="text-gray-400 text-sm mb-2">Available Cash</h3>
        <p className="text-2xl font-bold text-white">{formatCurrency(balance)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6 rounded-xl"
      >
        <h3 className="text-gray-400 text-sm mb-2">Total Return</h3>
        <div className="flex items-center gap-2">
          <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(totalReturn)}
          </p>
          <div className={`flex items-center ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalReturn >= 0 ? <IconTrendingUp size={20} /> : <IconTrendingDown size={20} />}
            <span className="text-sm ml-1">
              {returnPercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};