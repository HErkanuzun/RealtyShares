import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { StockDashboard } from './components/StockDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { InvestmentDetailPage } from './pages/investment/InvestmentDetailPage';
import { StartInvestingPage } from './pages/investment/StartInvestingPage';
import { useEffect } from 'react';
import { useStockStore } from './store/useStockStore';

export default function App() {
  const updatePrices = useStockStore(state => state.updatePrices);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 5000);

    return () => clearInterval(interval);
  }, [updatePrices]);

  return (
    <Router>
      <div className="app min-h-screen bg-gradient-to-br from-primary via-primary-light to-secondary text-light">
        <Navbar />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/market" element={<StockDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/investment/:type" element={<InvestmentDetailPage />} />
            <Route path="/start-investing" element={<StartInvestingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}