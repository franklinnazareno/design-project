import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, Marker, ProviderPropType} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tts from 'react-native-tts';
import isEqual from 'lodash/isEqual';
import Config from 'react-native-config';
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';



const NavigatingMapComp = ({ preference, destination, location, coords, steps, swapped, option, setLoading }) => {
    
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
      const latitude = location.latitude
      const longitude = location.longitude 

      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })
    }, [location])



    // useEffect(() => {
    //   const drawCoords = async () => {
    //     const preferences = preference.preferences.map(({ name, value }) => ({ name, value }));
    //     const postData = { preferences, sourceCoords: [location.longitude, location.latitude], destCoords: destination }

    //       let retryCount = 0;
    //       const maxRetries = 25;
    //       while (retryCount <= maxRetries) {
    //         try {
    //           const response = await fetch(`${Config.FLASK}/${option}/`, {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(postData)
    //           });

    //           const json = await response.json();

    //           if (response.ok) {
    //             // Create the Polyline with the fetched coordinates
    //             setCoords(json['coordinates'])
    //             const stepsJson = json['steps']
    //             const stepsTemp = stepsJson.map(step => {
    //               return {
    //                 coordinates: step.coordinates,
    //                 instruction: step.instruction
    //               }
    //             })
    //             setSteps(stepsTemp)
    //             break; // exit the loop if the request is successful
    //           }
    //         } catch (error) {
    //           if (error instanceof TypeError && error.message === 'Network request failed') {
    //             if (retryCount >= maxRetries) {
    //               setError("A network error has occurred. Please try again later.")
    //             } else {
    //               retryCount++;
    //               await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second before retrying
    //             }
    //           } else {
    //             setError("A server error has occurred. Please try again later.")
    //             break;
    //           }
    //         }
    //       }

    //   };
    //     drawCoords()
    // }, [location]);

    useEffect(() => {
      const thresholdDistance = 5

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
                option === 'steps_with_coords_safest'
                  ? swapped
                    ? "#1E75E8"
                    : "#D93029"
                  : swapped
                    ? "#D93029"
                    : "#1E75E8"
              }
              tappable
            />}

        </MapView.Animated>
        
        
        </MapContainer>
          
        
    );
};

export default NavigatingMapComp;