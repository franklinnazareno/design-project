import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import BottomNavComp from '../components/BottomSearchNav/BottomMapSearchNav'
import { usePreferencesContext } from '../hooks/usePreferencesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import GetLocation from 'react-native-get-location'
import styles from './styles'


const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const [loadingData, setDataLoading] = useState(false)
  const [coords, setCoords] = useState(null)
  const [coords2, setCoords2] = useState(null)
  const [location, setLocation] = useState(null)

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

  useEffect(() => {
    const fetchData = async () => {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      }).catch(error => {
        const { code, message } = error 
        console.warn(code, message)
      })

      setLocation(location)

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

    fetchData()
  }, [dispatch, user])

  if (!user) {
    return <Login />
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        
        
          <View style={{ position: 'relative', height: '100%' }}>
            <MapComponent coordsData={coords} coordsData2={coords2} location={location} />
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
          <BottomNavComp preference={preferences} location={location} handleCoordsData={handleCoordsData} handleCoordsData2={handleCoordsData2} handleLoadingData={handleLoadingData} />
          
          </View>
        
      )}
    </View>
  );

}

export default MapScreen