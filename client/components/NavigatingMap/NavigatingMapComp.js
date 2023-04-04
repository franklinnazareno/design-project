import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, Marker, ProviderPropType} from '@splicer97/react-native-osmdroid';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';



const NavigatingMapComp = ({ location, results }) => {
    const { width, height } = Dimensions.get('window')

    console.log(results)
    
    const [region, setRegion] = useState({
      latitude: 14.6507,
      longitude: 121.1029,
      latitudeDelta: 0.01, 
      longitudeDelta: 0.01
    })

    useEffect(() => {
      if (location) {
        const latitude = location.latitude
        const longitude = location.longitude 

        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        })
      }

    }, [location])

    // const {setOptions, toggleDrawer} = useNavigation();
    
    // useEffect(() => {
    //     setOptions({
    //       headerLeft: () => (
    //         <TouchableOpacity
    //           onPress={() => {
    //             toggleDrawer();
    //           }}>
    //           <MaterialIcon style={{padding: 15, color:'white'}} size={30} name="menu"></MaterialIcon>
    //         </TouchableOpacity>
    //       ),
    //     });
    //   }, []);
    
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

        </MapView.Animated>
        
        
        </MapContainer>
          
        
    );
};

export default NavigatingMapComp;