import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Profile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joinDate: string;
  preferences: {
    riskLevel: number;
    investmentStyle: string;
    notifications: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastLogin: string;
  };
}

interface ProfileState {
  profile: Profile | null;
  isAuthenticated: boolean;
  setProfile: (profile: Profile) => void;
  updatePreferences: (preferences: Partial<Profile['preferences']>) => void;
  logout: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isAuthenticated: false,
      setProfile: (profile) => set({ profile, isAuthenticated: true }),
      updatePreferences: (preferences) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                preferences: { ...state.profile.preferences, ...preferences },
              }
            : null,
        })),
      logout: () => set({ profile: null, isAuthenticated: false }),
    }),
    {
      name: 'profile-store',
    }
  )
);