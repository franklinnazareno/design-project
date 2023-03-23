import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import BottomNavComp from '../components/BottomSearchNav/BottomMapSearchNav'
import { usePreferencesContext } from '../hooks/usePreferencesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const MapScreen = () => {
  const [loading, setLoading] = useState(true)

  const { preferences, dispatch } = usePreferencesContext()
  const { user } = useAuthContext()

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
        <View style={{ height: 700 }}>
          <MapComponent />
          <BottomNavComp preference={preferences} />
        </View>
      )}
    </View>
  );

}

export default MapScreen