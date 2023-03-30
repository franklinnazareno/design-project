import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, ProviderPropType} from '@splicer97/react-native-osmdroid';
import Container from '../commons/Contain';
import styles from './styles';

// import MapSearchComp from '../MapSearch/MapSearchComp';

const MapComponent = ({ coordsData, coordsData2 }) => {
    const { width, height } = Dimensions.get('window')
    const aspectRatio = width / height;
    
    const [region, setRegion] = useState({
      latitude: 14.6373,
      longitude: 121.0917,
      latitudeDelta: 0.0922, 
      longitudeDelta: 0.0922 * aspectRatio
    })

    useEffect(() => {
      if (coordsData && coordsData.length > 1) {
        const firstCoords = coordsData[0]
        const lastCoords = coordsData[coordsData.length - 1]
        const R = 6371
        const dLat = ((lastCoords.latitude - firstCoords.latitude) * Math.PI) / 180
        const dLon = ((lastCoords.longitude - firstCoords.longitude) * Math.PI) / 180

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((firstCoords.latitude * Math.PI) / 180) *
            Math.cos((lastCoords.latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c

        const latDelta = distance / (111.32 * aspectRatio)
        const lonDelta = distance / (111.32 * Math.cos(firstCoords.latitude * Math.PI / 180) * aspectRatio)

        const centerLat = (firstCoords.latitude + lastCoords.latitude) / 2
        const centerLon = (firstCoords.longitude + lastCoords.longitude) / 2

        setRegion({
          latitude: centerLat,
          longitude: centerLon,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta
        })
      }

    }, [coordsData])

    const {setOptions, toggleDrawer} = useNavigation();
    
    useEffect(() => {
        setOptions({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                toggleDrawer();
              }}>
              <MaterialIcon style={{padding: 15, color:'white'}} size={30} name="menu"></MaterialIcon>
            </TouchableOpacity>
          ),
        });
      }, []);
    
    return (
      
      <Container>
        <MapView.Animated
          initialRegion={region}
          region={region}
          style={styles.Mapsize}
          zoomEnabled
          // minZoomLevel={16}
          rotateEnabled={false}
           >
          
          {coordsData && <Polyline
                  coordinates={coordsData}
                  strokeWidth={4}
                  strokeColor="#ff0000"
                  tappable
                />}

                {coordsData2 && <Polyline
                  coordinates={coordsData2}
                  strokeWidth={4}
                  strokeColor="#0000ff"
                  tappable
                />}
        </MapView.Animated>
        
        
        </Container>
          
        
    );
};

export default MapComponent;