import { motion } from 'framer-motion';
import { useStockStore } from '../../store/useStockStore';
import { formatCurrency } from '../../utils/formatters';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

export const PositionsList = () => {
  const { positions, stocks } = useStockStore();

  if (positions.length === 0) {
    return (
      <div className="glass p-8 rounded-xl text-center">
        <p className="text-gray-400">No positions yet. Start trading to build your portfolio!</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">Your Positions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-gray-400">Symbol</th>
              <th className="text-left p-4 text-gray-400">Shares</th>
              <th className="text-left p-4 text-gray-400">Avg Price</th>
              <th className="text-left p-4 text-gray-400">Current Price</th>
              <th className="text-left p-4 text-gray-400">Market Value</th>
              <th className="text-left p-4 text-gray-400">Return</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => {
              const stock = stocks.find(s => s.symbol === position.symbol);
              if (!stock) return null;

              const marketValue = stock.price * position.shares;
              const costBasis = position.averagePrice * position.shares;
              const return_ = marketValue - costBasis;
              const returnPercentage = (return_ / costBasis) * 100;

              return (
                <motion.tr
                  key={position.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-white/10"
                >
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-white">{position.symbol}</div>
                      <div className="text-sm text-gray-400">{stock.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-white">{position.shares}</td>
                  <td className="p-4 text-white">{formatCurrency(position.averagePrice)}</td>
                  <td className="p-4 text-white">{formatCurrency(stock.price)}</td>
                  <td className="p-4 text-white">{formatCurrency(marketValue)}</td>
                  <td className="p-4">
                    <div className={`flex items-center ${return_ >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {return_ >= 0 ? <IconTrendingUp size={16} /> : <IconTrendingDown size={16} />}
                      <span className="ml-1">
                        {formatCurrency(return_)} ({returnPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};