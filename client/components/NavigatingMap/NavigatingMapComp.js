import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, Marker, ProviderPropType} from '@splicer97/react-native-osmdroid';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tts from 'react-native-tts';
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';



const NavigatingMapComp = ({ preference, source, destination, location }) => {
    
    const [region, setRegion] = useState({
      latitude: 14.6507,
      longitude: 121.1029,
      latitudeDelta: 0.001, 
      longitudeDelta: 0.001
    })
    const [coords, setCoords] = useState(null)
    const [steps, setSteps] = useState(null)

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
      const latitude = location.latitude
      const longitude = location.longitude 

      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })

      const drawCoords = async () => {
        const preferences = preference.preferences.map(({ name, value }) => ({ name, value }));
        const postData = { preferences, sourceCoords: [longitude, latitude], destCoords: destination }
        console.log(postData)

        const response = await fetch('http://10.0.2.2:8888/steps_with_coords_safest/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })

        const json = await response.json()

        if (response.ok) {
          setCoords(json['coordinates'])
          const stepsJson = json['steps']
          const stepsTemp = stepsJson.map(step => {
            return {
              coordinates: step.coordinates,
              instruction: step.instruction
            }
          })
          setSteps(stepsTemp)
        }
    }
    drawCoords()

  }, [location])

  useEffect(() => {
    if (steps) {
      const thresholdDistance = 5

      for (const step of steps) {
        const distance = haversineDistance(location.latitude, location.longitude, step.coordinates[0], step.coordinates[1])

        if (distance <= thresholdDistance) {
          Tts.speak(step.instruction)
        }
      }
    }
  })
  
    
    return (
      
      <MapContainer>
        <MapView.Animated
          initialRegion={region}
          region={region}
          style={styles.Mapsize}
          zoomEnabled
          // minZoomLevel={16}
          rotateEnabled={false}
           >

          {location && <Marker 
            title={"Current Location"}
            coordinate={{latitude: location.latitude, longitude: location.longitude}}
            tracksViewChanges={true}>
              <Icon name="my-location" size={30} color="green" />
            </Marker>}

          {coords && <Polyline
              coordinates={coords}
              strokeWidth={4}
              strokeColor="#ff0000"
              tappable
            />}

        </MapView.Animated>
        
        
        </MapContainer>
          
        
    );
};

export default NavigatingMapComp;