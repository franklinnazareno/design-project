import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tts from 'react-native-tts';
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';
import { magnetometer } from 'react-native-sensors';
import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
setUpdateIntervalForType(SensorTypes.magnetometer, 1000)

const NavigatingMapComp = ({ location, coords, steps, option, setLoading }) => {
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [heading, setHeading] = useState(null);
  const mapRef = useRef(null);
    const [region, setRegion] = useState({
      latitude: 14.6507,
      longitude: 121.1029,
      latitudeDelta: 0.001, 
      longitudeDelta: 0.001
    })
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

    useEffect(() => {
      const magnetometerSubscription = magnetometer.subscribe(({ x, y, z, timestamp }) => {
        setMagnetometerData({ x, y, z });
      });
  
      return () => {
        magnetometerSubscription.unsubscribe();
      };
    }, []);

    useEffect(() => {
      const { x, y, z } = magnetometerData;
      const heading = Math.atan2(y, x) * (180 / Math.PI);
      setHeading(heading);
    }, [magnetometerData]);

    useEffect(() => {
      if (mapRef.current) {
          const newCamera = {
              center: { latitude: location.latitude, longitude: location.longitude },
              heading: heading
          }

          mapRef.current.animateCamera(newCamera, { duration: 2000 });

      }
  }, [heading]);

    useEffect(() => {
      const latitude = location.latitude
      const longitude = location.longitude 

      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })
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
          initialCamera={{
            center: { latitude: location.latitude, longitude: location.longitude },
            zoom: 20,
            heading: 0,
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
        </MapContainer>
              
    );
};

export default NavigatingMapComp;