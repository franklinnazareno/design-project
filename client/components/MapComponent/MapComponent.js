import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, ProviderPropType} from '@splicer97/react-native-osmdroid';
import Container from '../commons/Contain';

// import MapSearchComp from '../MapSearch/MapSearchComp';
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE = 14.6373;
const LONGITUDE = 121.0917;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapComponent = ({ coordsData }) => {
    const {setOptions, toggleDrawer} = useNavigation();
    
    useEffect(() => {
      if (coordsData) {
        console.log(coordsData)
      }
    }, [coordsData])
    
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
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={[{height: height, width: width}, {flex: 1}]}
          zoomEnabled
          minZoomLevel={16}
          rotateEnabled={false} >
          
          {coordsData && <Polyline
                  coordinates={coordsData}
                  strokeWidth={0.1}
                  strokeColor="#ff0000"
                  tappable
                />}
        </MapView.Animated>
        </Container>
          
        
    );
};

export default MapComponent;