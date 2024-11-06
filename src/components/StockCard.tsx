import { useState } from 'react';
import { IconArrowUpRight, IconArrowDownRight, IconStar, IconStarFilled } from '@tabler/icons-react';
import { useStockStore } from '../store/useStockStore';
import { AnimatedCard } from './ui/animated-card';
import { AnimatedButton } from './ui/animated-button';

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

export const StockCard = ({ symbol, name, price, change, volume }: StockCardProps) => {
  const { addToWatchlist, removeFromWatchlist, watchlist, buyStock, sellStock, positions, balance } = useStockStore();
  const [shares, setShares] = useState(1);
  const [showTrade, setShowTrade] = useState(false);
  const isWatched = watchlist.includes(symbol);
  const position = positions.find(p => p.symbol === symbol);
  const isPositive = change >= 0;

  const toggleWatchlist = () => {
    if (isWatched) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  const handleTrade = (action: 'buy' | 'sell') => {
    if (action === 'buy') {
      if (price * shares <= balance) {
        buyStock(symbol, shares);
        setShowTrade(false);
      }
    } else {
      if (position && position.shares >= shares) {
        sellStock(symbol, shares);
        setShowTrade(false);
      }
    }
  };

  return (
    <AnimatedCard className="card-modern p-6">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-light">{symbol}</h3>
            <p className="text-secondary-light">{name}</p>
            {position && (
              <p className="text-sm text-accent-light mt-1">
                Holding: {position.shares} shares
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center ${isPositive ? 'text-accent-light' : 'text-red-400'}`}>
              {isPositive ? <IconArrowUpRight /> : <IconArrowDownRight />}
              <span className="ml-1">{change}%</span>
            </div>
            <AnimatedButton 
              onClick={toggleWatchlist}
              className="text-accent hover:text-accent-light transition-all duration-200"
            >
              {isWatched ? <IconStarFilled size={20} /> : <IconStar size={20} />}
            </AnimatedButton>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-2xl font-bold text-light">${price.toLocaleString()}</div>
          <div className="text-secondary-light">
            Volume: {volume}
          </div>
        </div>

        {showTrade ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={shares}
                onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                className="input-modern w-full"
              />
              <AnimatedButton
                onClick={() => setShowTrade(false)}
                className="px-4 py-2 bg-primary hover:bg-primary-light text-light rounded-lg"
              >
                Cancel
              </AnimatedButton>
            </div>
            <div className="flex gap-2">
              <AnimatedButton
                onClick={() => handleTrade('buy')}
                disabled={price * shares > balance}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy {shares}
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleTrade('sell')}
                disabled={!position || position.shares < shares}
                className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sell {shares}
              </AnimatedButton>
            </div>
          </div>
        ) : (
          <AnimatedButton
            onClick={() => setShowTrade(true)}
            className="btn-primary w-full"
          >
            Trade
          </AnimatedButton>
        )}
      </div>
    </AnimatedCard>
  );
};