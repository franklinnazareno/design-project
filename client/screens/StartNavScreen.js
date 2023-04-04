import { View, Text } from 'react-native'
import React from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import NavigatingMapComp from '../components/NavigatingMap/NavigatingMapComp'

const StartNavScreen = ({ route }) => {
  const { location, results } = route.params
  return (
    <NavigatingMapComp location={location} results={results} >
      
    </NavigatingMapComp>
  )
}

export default StartNavScreen