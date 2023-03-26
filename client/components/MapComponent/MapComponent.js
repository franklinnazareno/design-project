import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, ProviderPropType} from '@splicer97/react-native-osmdroid';
import Container from '../commons/Contain';

// import MapSearchComp from '../MapSearch/MapSearchComp';

const MapComponent = ({ coordsData }) => {
    const { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height;
    
    const [region, setRegion] = useState({
      latitude: 14.6373,
      longitude: 121.0917,
      latitudeDelta: 0.0922, 
      longitudeDelta: 0.0922 * ASPECT_RATIO
    })

    useEffect(() => {
      if (coordsData) {
        const firstCoords = coordsData[0]
        const lastCoords = coordsData[coordsData.length - 1]
        const latitudeDelta = lastCoords.latitude - firstCoords.latitude 
        const longitudeDelta = lastCoords.longitude - firstCoords.longitude
        console.log(firstCoords, lastCoords, latitudeDelta, longitudeDelta)

        setRegion({
          latitude: firstCoords.latitude,
          longitude: firstCoords.longitude,
          latitudeDelta,
          longitudeDelta
        })

        this.map.animateToRegion(region, 1000)
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
          ref={(map) => { this.map = map }}
          initialRegion={region}
          style={[{height: height, width: width}, {flex: 1}]}
          // zoomEnabled
          // minZoomLevel={16}
          rotateEnabled={false} >
          
          {coordsData && <Polyline
                  coordinates={coordsData}
                  strokeWidth={4}
                  strokeColor="#ff0000"
                  tappable
                />}
        </MapView.Animated>
        </Container>
          
        
    );
};

export default MapComponent;