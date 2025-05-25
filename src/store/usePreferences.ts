import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Preferences } from '@/types/Preferences'

type PreferencesState = {
  preferences: Preferences
}

type PreferencesActions = {
  setPreferences: (prefs: Partial<Preferences>) => void
}

const initialPreferences: Preferences = {
  distance: 50,
  position: {
    latitude: 0,
    longitude: 0,
  },
  transport: 'Car',
}

export const usePreferencesStore = create<
  PreferencesState & PreferencesActions
>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      setPreferences: (prefs) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...prefs,
          },
        })),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
