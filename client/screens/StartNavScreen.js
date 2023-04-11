import { View, ActivityIndicator, Button } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { LocationContext } from '../context/LocationContext'
import MapComponent from '../components/MapComponent/MapComponent'
import NavigatingMapComp from '../components/NavigatingMap/NavigatingMapComp'

const StartNavScreen = ({ route }) => {
  const { preference, source, destination, coords, steps, swapped, option } = route.params
  const [location] = useContext(LocationContext)

  const [loading, setLoading] = useState(true)

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <NavigatingMapComp preference={preference} source={source} destination={destination} location={location} coords={coords} steps={steps} swapped={swapped} option={option} loading={loading} setLoading={setLoading} >
      
      </NavigatingMapComp>
      {loading && (
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
       
    </View>
  )
}

export default StartNavScreen