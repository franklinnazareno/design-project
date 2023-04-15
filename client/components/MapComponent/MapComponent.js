import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, memo } from 'react';
import {Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, Marker, ProviderPropType, Geojson} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';
import BottomNavComp from '../BottomSearchNav/BottomMapSearchNav';
import { Button } from 'react-native-paper';
import myBoundary from './boundary';

// import MapSearchComp from '../MapSearch/MapSearchComp';

const MapComponent = ({ coordsData, coordsData2, location, userView }) => {
    const { width, height } = Dimensions.get('window')
    const aspectRatio = width / height;
    
    const [region, setRegion] = useState({
      latitude: 14.6507,
      longitude: 121.1029,
      latitudeDelta: 0.005, 
      longitudeDelta: 0.005
    })

    useEffect(() => {
      if (location){
        const latitude = location.latitude
        const longitude = location.longitude 

        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        })
      }
    }, [location])

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
      
      <MapContainer>
        
        <MapView.Animated
          initialRegion={region}
          region={region}
          style={styles.Mapsize}
          zoomEnabled
          // minZoomLevel={16}
          rotateEnabled={false}
           >
          <Geojson
            geojson={myBoundary}
            strokeColor="red"
            strokeWidth={2}/>

            {location && <Marker 
            title={"Current Location"}
            coordinate={{latitude: location.latitude, longitude: location.longitude}}
            tracksViewChanges={true}>
                <View style={{ borderRadius: 40, backgroundColor: 'white' }}>
                    <Icon name="circle" size={20} color="#1E75E8" />
                </View>
            </Marker>}

          {coordsData && <Marker 
            title={"Source"}
            coordinate={{latitude: coordsData[0].latitude, longitude: coordsData[0].longitude}}
            tracksViewChanges={true}
            >
              <Icon name="location-pin" size={30} color="blue" />
            </Marker>}
            
          {coordsData && <Marker 
            title={"Destination"}
            coordinate={{latitude: coordsData[coordsData.length - 1].latitude, longitude: coordsData[coordsData.length - 1].longitude}}
            tracksViewChanges={true}
            >
              <Icon name="location-pin" size={30} color="red" />
            </Marker>}
          
          {userView === 0 && coordsData && (
            <>
              <Polyline
                coordinates={coordsData}
                strokeWidth={4}
                strokeColor="#D93029"
                tappable
              />
            </>
          )}
          {userView === 0 && coordsData2 && (
            <>
            <Polyline
              coordinates={coordsData2}
              strokeWidth={4}
              strokeColor="#1E75E8"
              tappable
            />
          </>
          )}
          {userView === 1 && coordsData && (
            <Polyline
              coordinates={coordsData}
              strokeWidth={4}
              strokeColor="#D93029"
              tappable
            />
          )}
          {userView === 2 && coordsData2 && (
            <Polyline
              coordinates={coordsData2}
              strokeWidth={4}
              strokeColor="#1E75E8"
              tappable
            />
          )}
          
          {/* {userView === 0 && coordsData && coordsData2 && (
            <>
              <Polyline
                coordinates={coordsData}
                strokeWidth={4}
                strokeColor="#ff0000"
                tappable
              />
              <Polyline
                coordinates={coordsData2}
                strokeWidth={4}
                strokeColor="#0000ff"
                tappable
              />
            </>
          )}
          {userView === 1 && coordsData && (
            <Polyline
              coordinates={coordsData}
              strokeWidth={4}
              strokeColor="#ff0000"
              tappable
            />
          )}
          {userView === 2 && coordsData2 && (
            <Polyline
              coordinates={coordsData2}
              strokeWidth={4}
              strokeColor="#0000ff"
              tappable
            />
          )} */}

        </MapView.Animated>
        
        
        </MapContainer>
          
        
    );
};

export default memo(MapComponent);