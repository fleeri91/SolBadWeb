import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Coordinates = {
  latitude: number
  longitude: number
}

type GeoState = {
  geoLocation: Coordinates | null
}

type GeoActions = {
  setGeoLocation: (location: Coordinates) => void
  resetGeoLocation: () => void
  getCurrentLocation: () => void
}

const initialState: GeoState = {
  geoLocation: null,
}

export const useGeoStore = create<GeoState & GeoActions>()(
  persist(
    (set) => ({
      ...initialState,
      setGeoLocation: (location) => set({ geoLocation: location }),
      resetGeoLocation: () => set({ geoLocation: null }),
      getCurrentLocation: () => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
          console.warn('Geolocation is not available.')
          return
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords
            set({ geoLocation: { latitude, longitude } })
          },
          (err) => {
            console.error('Geolocation error:', err)
          }
        )
      },
    }),
    {
      name: 'geo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
