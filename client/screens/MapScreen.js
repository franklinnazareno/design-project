import { View, ActivityIndicator, Text, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import { LocationContext } from '../context/LocationContext'
import { usePreferencesContext } from '../hooks/usePreferencesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config'
import BottomSearchNav from '../components/BottomSearchNav/BottomSearchNav'
import colors from '../assets/themes/colors'

const windowHeight = Dimensions.get('window').height;

const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const [loadingData, setDataLoading] = useState(false)
  const [coords, setCoords] = useState(null)
  const [coords2, setCoords2] = useState(null)
  const [modOpen, setModOpen] = useState(false)
  const [location, setLocation] = useContext(LocationContext)
  const [userView, setUserView] = useState(0)
  const { preferences, dispatch } = usePreferencesContext()
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleCoordsData = (data) => {
    setCoords(data)
  }

  const handleCoordsData2 = (data) => {
    setCoords2(data)
  }

  const handleLoadingData = (data) => {
    setDataLoading(data)
  }

  const handleUserView = (data) => {
    setUserView(data)
  }

  const handleModal = (data) => {
    setModOpen(data)
  }

  // Fetch user preferences
 useEffect(() => {
    const fetchPreference = async () => {
      const response = await fetch(`${Config.EXPRESS}/api/preferences`, {
        headers: {'Authorization': `Bearer ${user.token}`}
      });
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PREFERENCES', payload: json})
      }
      setLoading(false)
    }

    fetchPreference()
  }, [dispatch, user])

  // Get user location
  useEffect(() => {
  const watchId = !modOpen && Geolocation.watchPosition(
    position => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    },
    error => {
      console.warn(error.code, error.message);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 5,
    }
  );

  return () => {
    Geolocation.clearWatch(watchId);
  };
}, [modOpen]);


  if (!user) {
    return <Login />
  }

  return (
    
    <View>
      {console.log(location)}
      {loading ? (
        <View style={{ alignItems:'center', marginTop: windowHeight * 0.3}}>
          <ActivityIndicator size="large" color={colors.primary}/>
          <Text style={{marginTop: 20}}>Loading Map...</Text>
          <Text style={{ marginTop: 10, fontSize: 12, color: 'gray' }}>Please ensure you have an active internet connection.</Text>
        </View>
      ) : (
        
          
          <View style={{ position: 'relative', height: '100%' }}>
            <MapComponent coordsData={coords} coordsData2={coords2} location={location} userView={userView}>
              
            </MapComponent>
            
              {loadingData && (
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  
                </View>
              )}
                <BottomSearchNav
                preference={preferences} 
                location={location} 
                handleCoordsData={handleCoordsData} 
                handleCoordsData2={handleCoordsData2}
                handleLoadingData={handleLoadingData} 
                handleUserView={handleUserView}
                handleModal={handleModal}/>
                
          </View>
        
      )}
    </View>
  );

}

export default MapScreen