import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import BottomNavComp from '../components/BottomSearchNav/BottomMapSearchNav'
import { usePreferencesContext } from '../hooks/usePreferencesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import Geolocation from '@react-native-community/geolocation';
import styles from './styles'


const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const [loadingData, setDataLoading] = useState(false)
  const [coords, setCoords] = useState(null)
  const [coords2, setCoords2] = useState(null)
  const [location, setLocation] = useState(null)
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

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const response = await fetch('http://10.0.2.2:4000/api/preferences', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PREFERENCES', payload: json})
      }

      if (!response.ok) {
        logout()
      }
      setLoading(false)
    }

    fetchUserPreferences()
  }, [dispatch, user])

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.warn(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5, // update location every meter inputted
      }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  if (!user) {
    return <Login />
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        
        
          <View style={{ position: 'relative', height: '100%' }}>
            <MapComponent coordsData={coords} coordsData2={coords2} location={location} userView={userView} />
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
          <BottomNavComp preference={preferences} location={location} handleCoordsData={handleCoordsData} handleCoordsData2={handleCoordsData2} handleLoadingData={handleLoadingData} handleUserView={handleUserView} />
          
          </View>
        
      )}
    </View>
  );

}

export default MapScreen