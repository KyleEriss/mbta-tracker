import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
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

const mbtaKey = config.MBTA_API_KEY

function App() {

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.API_KEY
  })

  useEffect(() => {
    setInterval(() => {
      fetch(`https://api-v3.mbta.com/vehicles?${mbtaKey}`)
        .then(res => res.json())
        .then((info) => {
          setMarkers(info.data)
        })
    }, 1000);

    console.log(mbtaKey)
  }, [])

  return isLoaded ? (

    <div className='map'>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={
              {
                lat: marker.attributes.latitude,
                lng: marker.attributes.longitude
              }
            }
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        <></>
      </GoogleMap>

    </div >

  ) : <></>
}

export default App;








// onClick={(event) => {
        //   setMarkers((current) => [
        //     ...current,
        //     {
        //       lat: event.latLng.lat(),
        //       lng:event.latLng.lng()
        //     },
        //   ]);
        // }}
