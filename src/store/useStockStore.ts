import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

interface Position {
  symbol: string;
  shares: number;
  averagePrice: number;
}

interface StockState {
  stocks: Stock[];
  selectedStock: Stock | null;
  watchlist: string[];
  balance: number;
  positions: Position[];
  setSelectedStock: (stock: Stock | null) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  buyStock: (symbol: string, shares: number) => void;
  sellStock: (symbol: string, shares: number) => void;
  updatePrices: () => void;
}

const mockPriceUpdate = (currentPrice: number): number => {
  const changePercent = (Math.random() - 0.5) * 0.02; // -1% to +1% change
  return currentPrice * (1 + changePercent);
};

export const useStockStore = create<StockState>()(
  devtools(
    persist(
      (set) => ({
        stocks: [
          { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 2.45, volume: '52.4M' },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 134.99, change: -0.98, volume: '23.1M' },
          { symbol: 'TSLA', name: 'Tesla, Inc.', price: 238.45, change: 3.21, volume: '128.7M' },
          { symbol: 'MSFT', name: 'Microsoft Corp.', price: 332.58, change: 1.67, volume: '19.8M' },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 142.59, change: 1.23, volume: '45.6M' },
          { symbol: 'META', name: 'Meta Platforms Inc.', price: 326.49, change: 0.89, volume: '32.1M' },
          { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 469.50, change: 4.32, volume: '89.3M' },
          { symbol: 'AMD', name: 'Advanced Micro Devices', price: 123.45, change: 2.78, volume: '65.2M' },
        ],
        selectedStock: null,
        watchlist: [],
        balance: 100000,
        positions: [],
        setSelectedStock: (stock) => set({ selectedStock: stock }),
        addToWatchlist: (symbol) => 
          set((state) => ({
            watchlist: [...new Set([...state.watchlist, symbol])]
          })),
        removeFromWatchlist: (symbol) =>
          set((state) => ({
            watchlist: state.watchlist.filter((s) => s !== symbol)
          })),
        buyStock: (symbol, shares) =>
          set((state) => {
            const stock = state.stocks.find(s => s.symbol === symbol);
            if (!stock) return state;

            const totalCost = stock.price * shares;
            if (totalCost > state.balance) return state;

            const existingPosition = state.positions.find(p => p.symbol === symbol);
            const updatedPositions = existingPosition
              ? state.positions.map(p => p.symbol === symbol
                  ? {
                      ...p,
                      shares: p.shares + shares,
                      averagePrice: ((p.averagePrice * p.shares) + (stock.price * shares)) / (p.shares + shares)
                    }
                  : p
                )
              : [...state.positions, { symbol, shares, averagePrice: stock.price }];

            return {
              balance: state.balance - totalCost,
              positions: updatedPositions
            };
          }),
        sellStock: (symbol, shares) =>
          set((state) => {
            const stock = state.stocks.find(s => s.symbol === symbol);
            const position = state.positions.find(p => p.symbol === symbol);
            if (!stock || !position || position.shares < shares) return state;

            const totalProceeds = stock.price * shares;
            const updatedPositions = position.shares === shares
              ? state.positions.filter(p => p.symbol !== symbol)
              : state.positions.map(p => p.symbol === symbol
                  ? { ...p, shares: p.shares - shares }
                  : p
                );

            return {
              balance: state.balance + totalProceeds,
              positions: updatedPositions
            };
          }),
        updatePrices: () =>
          set((state) => ({
            stocks: state.stocks.map(stock => {
              const newPrice = mockPriceUpdate(stock.price);
              const priceChange = ((newPrice - stock.price) / stock.price) * 100;
              return {
                ...stock,
                price: newPrice,
                change: priceChange
              };
            })
          })),
      }),
      {
        name: 'stock-store',
      }
    )
  )
);