import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import ReportComponent from '../components/reportComp/reportComponent';
import Geolocation from '@react-native-community/geolocation';

const ReportScreen = () => {
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const watchId = Geolocation.watchPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ latitude, longitude });
  //       console.log(location)
  //       setLoading(false)
  //     },
  //     error => {
  //       console.warn(error.code, error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       distanceFilter: 5, // update location every meter inputted
  //     }
  //   );

  //   return () => {
  //     Geolocation.clearWatch(watchId);
  //   };
  // }, []);

  return (
    loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <ReportComponent location={location} />
    )
  )

}

export default ReportScreen;