import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type PreferencesState = {
  currentLocation: {
    data: unknown | null
    details: unknown | null
  }
  distance: number
}

type PreferencesActions = {
  setCurrentLocation: (data: unknown, details: unknown | null) => void
  setDistance: (value: number) => void
}

const initialState: PreferencesState = {
  currentLocation: { data: null, details: null },
  distance: 50,
}

export const usePreferencesStore = create<PreferencesState & PreferencesActions>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentLocation: (data, details) =>
        set({ currentLocation: { data: data, details: details } }),
      setDistance: (value) => set({ distance: value }),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
