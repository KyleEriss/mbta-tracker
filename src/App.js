import logo from './logo.svg';
import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import config from './config';
import './App.css';

const containerStyle = {
  position: 'relative',
  width: '900px',
  height: '600px'
};

const center = {
  lat: 42.360850,
  lng: -71.058571
};

function App() {

  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.API_KEY
  })

  return isLoaded ? (
    <div className='map'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={(event) => {
          setMarkers((current) => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng:event.latLng.lng()
            },
          ]);
        }}
      >
        <></>
      </GoogleMap>
    </div >

  ) : <></>
}

export default App;
