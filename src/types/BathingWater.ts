export interface Bath {
  name: string
  coordinates: { lon: number; lat: number }
  id: string
}

export interface BathWithDistance extends Bath {
  distance: number
}

export interface BathWithWeather extends BathWithDistance {
  windSpeed: number | null
  cloudiness: number | null
}
