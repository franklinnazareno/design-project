import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Config from 'react-native-config';
import { useAuthContext } from '../../hooks/useAuthContext';
import Input from '../commons/inputs'
import SecondaryInput from '../commons/secondaryInput'
import CustomButton from '../commons/CustomButton'
import MapContainer from '../commons/mapContainer/Contain';
import styles from './styles';

navigator.geolocation = require('@react-native-community/geolocation');

const ReportingComponent = ({ location }) => {
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user } = useAuthContext()

  useEffect(() => {
    async function getLocation() {
      if (location) {
        const longitude = location.longitude
        const latitude = location.latitude 

        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`);
          const currentLocation = await response.json();
          setSource(currentLocation.results[0].formatted_address);
        } catch (error) {
          setError(error);
        }
      }
    }

    getLocation();
  }, []);

  const handleLocation = async () => {
    if (location) {
        const longitude = location.longitude
        const latitude = location.latitude 

        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`);
          const currentLocation = await response.json();
          setSource(currentLocation.results[0].formatted_address);
        } catch (error) {
          setError(error);
        }
      }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const requestBody = {
        Source: source,
        Description: description
    }

    console.log(requestBody)

      const response = await fetch(`${Config.EXPRESS}/api/report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log(responseData)
        setSuccess(true)
      }
      if (!response.ok) {
        console.log(responseData)
      }
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return (
    <MapContainer>
      <ScrollView keyboardShouldPersistTaps='always'>
        <Text style={styles.subText}>Help us Improve Our Maps!</Text>
        <ImageBackground 
            height={70} 
            width={70} 
            source={require('../../assets/images/Reg4.png')}
            style={[styles.loginImage]}> 
        <View style={styles.Text}>
        <Input
            label='Location'
            value={source}
            onChangeText={setSource}
            icon={<TouchableOpacity onPress={handleLocation} >
            <MaterialCommunityIcons name = 'map-marker-account' size={40}></MaterialCommunityIcons>
            </TouchableOpacity>}
            iconPosition='right'
            />
  
        <View>
        <SecondaryInput
        label='Description'
        value={description}
        onChangeText={setDescription}
        />
        </View>
        <CustomButton disabled={loading} primary title='Report' onPress={handleSubmit}/>
        {error && <Text style={styles.error}>Error: {error.message}</Text>}
        {success && <Text style={styles.success}>Report sent successfully!</Text>}
        </View>
        
    </ImageBackground>
    </ScrollView>
    </MapContainer>
  )
}

export default ReportingComponent