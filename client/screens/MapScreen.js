import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import BottomNavComp from '../components/BottomSearchNav/BottomMapSearchNav'
import { usePreferencesContext } from '../hooks/usePreferencesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import styles from './styles'


const MapScreen = () => {
  const [loading, setLoading] = useState(true)
  const [coords, setCoords] = useState(null)
  const [coords2, setCoords2] = useState(null)

  const { preferences, dispatch } = usePreferencesContext()
  const { user } = useAuthContext()

  const handleCoordsData = (data) => {
    setCoords(data)
  }

  const handleCoordsData2 = (data) => {
    setCoords2(data)
  }

  useEffect(() => {
    const fetchPreference = async () => {
      const response = await fetch('http://10.0.2.2:4000/api/preferences', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PREFERENCES', payload: json})
      }
      setLoading(false)
    }

    fetchPreference()
  }, [dispatch, user])

  if (!user) {
    return <Login />
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        
        
          <View >
          <MapComponent coordsData={coords} coordsData2={coords2} />
          <BottomNavComp preference={preferences} handleCoordsData={handleCoordsData} handleCoordsData2={handleCoordsData2} />
          
          </View>
        
      )}
    </View>
  );

}

export default MapScreen