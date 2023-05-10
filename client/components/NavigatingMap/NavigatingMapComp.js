import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tts from 'react-native-tts';
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';
import { magnetometer } from 'react-native-sensors';
import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Toast from 'react-native-toast-message';
import { Dimensions } from 'react-native';
setUpdateIntervalForType(SensorTypes.magnetometer, 100)

const NavigatingMapComp = ({ location, coords, steps, option, setLoading }) => {
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerSubscription, setMagnetometerSubscription] = useState(null);
  const [heading, setHeading] = useState(0);
  const [compassEnabled, setCompassEnabled] = useState(true);
  
  const mapRef = useRef(null);
    const [region, setRegion] = useState({
      latitude: 14.6507,
      longitude: 121.1029,
      latitudeDelta: 0.001, 
      longitudeDelta: 0.001
    })
    const [regionTemp, setRegionTemp] = useState();
    const [newCoords, setCoords] = useState(coords)
    const [newSteps, setSteps] = useState(steps)
    const [completedSteps, setCompletedSteps] = useState([])
    const [error, setError] = useState(null)

    const toRadians = (degrees) => {
      return degrees * Math.PI / 180
    }

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3
      const phi1 = toRadians(lat1)
      const phi2 = toRadians(lat2)
      const deltaPhi = toRadians(lat2 - lat1)
      const deltaLambda = toRadians(lon2 - lon1)

      const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    }

    const MAGNETOMETER_SENSITIVITY = 5;
    useEffect(() => {
      try {
      if (compassEnabled) {
        setMagnetometerSubscription(magnetometer.subscribe(({ x, y, z, timestamp }) => {
          const angle = Math.atan2(y, x) * (180 / Math.PI);
          const newHeading = angle >= 0 ? angle + 90 : 450 + angle;
          if (compassEnabled && Math.abs(newHeading - heading) > MAGNETOMETER_SENSITIVITY) {
            setHeading(newHeading)
            if (mapRef.current) {
              const newCamera = {
                  center: { latitude: location.latitude, longitude: location.longitude },
                  heading: heading
              }
              mapRef.current.animateCamera(newCamera, { duration: 500 });
            }
        }
        }))
      }
      if (!compassEnabled){
        magnetometerSubscription.unsubscribe();
        if (!compassEnabled) {
          setHeading(0)
          if (mapRef.current) {
            const newCamera = {
                center: { latitude: location.latitude, longitude: location.longitude },
                heading: heading
            }
            mapRef.current.animateCamera(newCamera, { duration: 500 });
          }
        }
      }
      return () => {
        if (magnetometerSubscription){
          magnetometerSubscription.unsubscribe();
        }
      };
      } catch (error) {
        console.log('No magnetometer found')
      }
    }, [heading, compassEnabled]);

    const toggleCompass = () => {
      setCompassEnabled(!compassEnabled);
      var deviceHeight = Dimensions.get('window').height;
      if(!compassEnabled){
        Toast.show({
          type: 'success',
          text1: 'Following user',
          text2: 'Double-tap to stop following',
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
          bottomOffset: deviceHeight * 0.7
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Stopped following user',
          text2: 'Double-tap to start following again',
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
          bottomOffset: deviceHeight * 0.7
        })
      }
    };

    useEffect(() => {
      const latitude = location.latitude
      const longitude = location.longitude 

      setRegionTemp({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })

      mapRef.current?.animateToRegion(regionTemp)
    }, [location])

    useEffect(() => {
      const thresholdDistance = 10

      for (const step of newSteps) {
        const distance = haversineDistance(location.latitude, location.longitude, step.coordinates[0], step.coordinates[1])

        if (distance <= thresholdDistance && !completedSteps.includes(step)) {
          Tts.speak(step.instruction)
          setCompletedSteps(prev => [...prev, step]);
        }
      }
    }, [location])

    useEffect(() => {
      if (newCoords) {
        setLoading(false)
      }
    }, [newCoords])
  
    
    return (
      
      <MapContainer>
        <MapView.Animated
          ref={mapRef}
          initialRegion={region}
          region={region}
          style={styles.Mapsize}
          zoomEnabled
          rotateEnabled={false}
          compassEnabled={compassEnabled}
          onDoublePress={toggleCompass}
          initialCamera={{
            center: { latitude: location.latitude, longitude: location.longitude },
            zoom: 20,
            heading: 0,
            pitch: 0
          }}
           >

          {location && <Marker 
            title={"Current Location"}
            coordinate={{latitude: location.latitude, longitude: location.longitude}}
            tracksViewChanges={true}>
              <View style={{ borderRadius: 40, backgroundColor: 'white' }}>
                    <Icon name="circle" size={20} color="#1E75E8" />
                </View>
            </Marker>}
          
          {coords && <Marker 
            title={"Destination"}
            coordinate={{latitude: coords[coords.length - 1].latitude, longitude: coords[coords.length - 1].longitude}}
            tracksViewChanges={true}
            >
              <Icon name="location-pin" size={30} color="red" />
            </Marker>}

          {newCoords && <Polyline
              coordinates={newCoords}
              strokeWidth={4}
              strokeColor={
                option === 'steps_with_coords_safest' ? "#D93029" : "#1E75E8"
              }
              tappable
            />}

        </MapView.Animated>
        <Toast ref={(ref) => Toast.setRef(ref)}  />
        </MapContainer>
              
    );
};

export default NavigatingMapComp;