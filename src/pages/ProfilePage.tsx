import { motion } from 'framer-motion';
import { useProfileStore } from '../store/useProfileStore';
import { useStockStore } from '../store/useStockStore';
import { formatCurrency } from '../utils/formatters';
import { IconUser, IconBuildingSkyscraper, IconChartLine, IconClock, IconEdit } from '@tabler/icons-react';
import { AnimatedCard } from '../components/ui/animated-card';
import { AnimatedButton } from '../components/ui/animated-button';
import { useState } from 'react';

export const ProfilePage = () => {
  const { profile, updatePreferences } = useProfileStore();
  const { positions, watchlist, balance } = useStockStore();
  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { label: 'Total Trades', value: positions.length, icon: IconChartLine },
    { label: 'Watchlist Items', value: watchlist.length, icon: IconBuildingSkyscraper },
    { label: 'Account Balance', value: formatCurrency(balance), icon: IconClock },
  ];

  const handlePreferencesUpdate = (preferences: any) => {
    updatePreferences(preferences);
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <div className="pt-24 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <AnimatedButton
            onClick={() => window.location.href = '/login'}
            className="btn-primary"
          >
            Go to Login
          </AnimatedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AnimatedCard className="glass rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center">
              <IconUser size={48} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                <AnimatedButton
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-accent hover:text-accent-light"
                >
                  <IconEdit size={20} />
                </AnimatedButton>
              </div>
              <p className="text-gray-400">Member since {profile.joinDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl"
              >
                <stat.icon size={24} className="text-blue-400 mb-2" />
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedCard className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Trading Preferences</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Risk Level</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={profile.preferences.riskLevel}
                      onChange={(e) => handlePreferencesUpdate({
                        ...profile.preferences,
                        riskLevel: parseInt(e.target.value)
                      })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Investment Style</label>
                    <select
                      value={profile.preferences.investmentStyle}
                      onChange={(e) => handlePreferencesUpdate({
                        ...profile.preferences,
                        investmentStyle: e.target.value
                      })}
                      className="input-modern w-full"
                    >
                      <option value="conservative">Conservative</option>
                      <option value="moderate">Moderate</option>
                      <option value="aggressive">Aggressive</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Risk Level</label>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className="bg-blue-400 rounded-full h-2"
                        style={{ width: `${(profile.preferences.riskLevel / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Investment Style</label>
                    <div className="glass p-2 rounded-lg text-white">
                      {profile.preferences.investmentStyle}
                    </div>
                  </div>
                </div>
              )}
            </AnimatedCard>

            <AnimatedCard className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Account Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Two-Factor Authentication</span>
                  <span className={profile.security.twoFactorEnabled ? 'text-green-400' : 'text-red-400'}>
                    {profile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Login</span>
                  <span className="text-white">{profile.security.lastLogin}</span>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};