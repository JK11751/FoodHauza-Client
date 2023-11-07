import React, { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from "expo-location";
import Geolocation from "react-native-geolocation-service";
import Constants from "expo-constants";
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useState } from 'react';

const MapDisplay = ({origin}) => {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!origin ) return
    mapRef?.current?.fitToSuppliedMarkers(['origin'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })
  }, [origin])


  // const popHandler = () => {
  //   navigation.pop();
  // };
  // const pushHandler = () => {
  //   navigation.push("Field officer's note");
  // };
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: -1.095201,
    longitude: 37.0136959,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getLoc = () => {
    //console.log("press",location.coords)
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  const sendLoc = () => {
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    console.log(
      "Use these variables to send current location(",
      latitude,
      ",",
      longitude,
      ")"
    );
  };

  return (
    <MapView
      style={{height: "100%"}}
      showUserLocation={true}
      mapType="standard"
      initialRegion={{
        latitude: -1.095201,
        longitude: 37.0136959,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
     {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
    </MapView>
  );
}

export default MapDisplay
