import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

export default function SimpleMap({
  pointer = { lat: 25, lon: 77 },
  setPointer,
  disable = false,
}) {
  const getLocation = () => {
    if (navigator.geolocation && !disable) {
      navigator.geolocation.watchPosition(function (position) {
        setPointer({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLEAPIKEY,
          language: "en",
          region: "US",
        }}
        center={pointer}
        zoom={10}
        onClick={
          !disable
            ? (e) => {
                setPointer({
                  lat: e.lat,
                  lng: e.lng,
                });
              }
            : null
        }
      >
        <Marker lat={pointer.lat} lng={pointer.lng} markerId={1} />
      </GoogleMapReact>
    </div>
  );
}
