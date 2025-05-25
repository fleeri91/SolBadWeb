import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import { Bath } from '@/types/BathingWater'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 56.1621073,
  lng: 15.5866422,
}

interface MapProps {
  locations: Bath[]
}

const Map = ({ locations }: MapProps) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
      language="sv"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{ disableDefaultUI: true }}
      >
        {locations &&
          locations.map((item, index) => (
            <Marker
              key={index}
              position={{
                lat: item.coordinates.lat,
                lng: item.coordinates.lon,
              }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
