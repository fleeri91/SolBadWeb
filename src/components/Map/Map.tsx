'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useSWR from 'swr';
import { Bath } from '@/types/BathingWater';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 56.1621073,
  lng: 15.5866422,
};

const Map = () => {
  const { data, isLoading, error, mutate } = useSWR<Bath[]>(`/bathingWaters`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>error</h1>
        <button onClick={() => mutate()}>Try again</button>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {data &&
          data.map((item, index) => (
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
  );
};

export default Map;
