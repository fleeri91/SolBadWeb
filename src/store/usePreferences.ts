import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Coordinates = {
  latitude: number
  longitude: number
}

type PreferencesState = {
  currentLocation: {
    data: Coordinates | null
    details: unknown | null
  }
  distance: number
}

type PreferencesActions = {
  setCurrentLocation: (data: Coordinates, details?: unknown | null) => void
  setDistance: (value: number) => void
}

const initialState: PreferencesState = {
  currentLocation: { data: null, details: null },
  distance: 50,
}

export const usePreferencesStore = create<
  PreferencesState & PreferencesActions
>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentLocation: (data, details = null) =>
        set({ currentLocation: { data, details } }),
      setDistance: (value) => set({ distance: value }),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
