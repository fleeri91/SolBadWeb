import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type GeoState = {
  geoLocation: unknown | null
}

type GeoActions = {
  setGeoLocation: (location: unknown) => void
}

const initialState: GeoState = {
  geoLocation: null,
}

export const useGeoStore = create<GeoState & GeoActions>()(
  persist(
    (set) => ({
      ...initialState,
      setGeoLocation: (location) => set({ geoLocation: location }),
    }),
    {
      name: 'geo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
