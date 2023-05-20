import { View, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { LocationContext } from '../context/LocationContext'
import NavigatingMapComp from '../components/NavigatingMap/NavigatingMapComp'
import NavInstruction from '../components/NavigatingMap/NavInstruction/NavInstruction'

const StartNavScreen = ({ route }) => {
  const { preference, source, destination, conditions, coords, steps, option } = route.params
  const [location] = useContext(LocationContext)

  const [loading, setLoading] = useState(true)

  return (
    (location ? <View style={{ position: 'relative', height: '100%' }}>
      <NavigatingMapComp preference={preference} source={source} destination={destination} location={location} coords={coords} steps={steps} option={option} loading={loading} setLoading={setLoading} >
      
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
       <NavInstruction steps={steps} location={location} conditions={conditions}></NavInstruction>
    </View> : 
    <View>
      <ActivityIndicator size='large' color={colors.primary}/>
      <Text>
        Obtaining current location...
      </Text>
    </View>)
  )
}

export default StartNavScreen