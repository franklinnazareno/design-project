import { View, Text } from 'react-native'
import React, { useContext} from 'react'
import { LocationContext } from '../context/LocationContext'
import MapComponent from '../components/MapComponent/MapComponent'
import NavigatingMapComp from '../components/NavigatingMap/NavigatingMapComp'

const StartNavScreen = ({ route }) => {
  const { preference, source, destination } = route.params
  const [location] = useContext(LocationContext)


  return (
    <NavigatingMapComp preference={preference} source={source} destination={destination} location={location} >
      
    </NavigatingMapComp>
  )
}

export default StartNavScreen