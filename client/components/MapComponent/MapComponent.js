import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Polyline, ProviderPropType} from '@splicer97/react-native-osmdroid';
import Container from '../commons/Contain';
import BottomNavComp from '../BottomSearchNav/BottomMapSearchNav';
// import MapSearchComp from '../MapSearch/MapSearchComp';
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE = 14.6373;
const LONGITUDE = 121.0917;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapComponent = () => {
    const {setOptions, toggleDrawer} = useNavigation();
    React.useEffect(() => {
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
          <Polyline
            coordinates={[
              { latitude: 14.6357955 , longitude: 121.094495},
              { latitude: 14.6357691 , longitude: 121.0948951},
              { latitude: 14.6352725 , longitude: 121.0949322},
              { latitude: 14.6348729 , longitude: 121.0949858},
              { latitude: 14.6341595 , longitude: 121.0951718},
              { latitude: 14.634204 , longitude: 121.095911},
              { latitude: 14.6342782 , longitude: 121.0964006},
              { latitude: 14.6334174 , longitude: 121.0965168},
              { latitude: 14.6335145 , longitude: 121.0971436},
              { latitude: 14.6328436 , longitude: 121.097243},
              { latitude: 14.6328875 , longitude: 121.0975863},
              { latitude: 14.6328966 , longitude: 121.0975956},
              { latitude: 14.6327617 , longitude: 121.097605},
              { latitude: 14.6327617 , longitude: 121.0976225},
              { latitude: 14.632715 , longitude: 121.097652},
              { latitude: 14.6326178 , longitude: 121.0976666},
              { latitude: 14.6326391 , longitude: 121.0978627},
              { latitude: 14.6324256 , longitude: 121.0978867},
              { latitude: 14.6324299 , longitude: 121.097919},
              { latitude: 14.6323211 , longitude: 121.0979298},
              { latitude: 14.6323179 , longitude: 121.0979041},
              { latitude: 14.631728 , longitude: 121.0979744},
              { latitude: 14.6309363 , longitude: 121.0980687},
              { latitude: 14.6305568 , longitude: 121.0981139}
            ]}
            strokeWidth={4}
            strokeColor="#ff0000"
            tappable
            />
        </MapView.Animated>
        </Container>
          
        
    );
};

export default MapComponent;