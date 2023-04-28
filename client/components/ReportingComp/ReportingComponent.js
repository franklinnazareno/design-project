import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Config from 'react-native-config';
import {launchImageLibrary} from 'react-native-image-picker';
import { useAuthContext } from '../../hooks/useAuthContext';
import Input from '../commons/inputs'
import SecondaryInput from '../commons/secondaryInput'
import CustomButton from '../commons/CustomButton'
import MapContainer from '../commons/mapContainer/Contain';
import styles from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ReportingComponent = ({ location }) => {
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
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

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    }
    launchImageLibrary(options, (response) => {
      console.log('Image response:', response)
      if (response?.didCancel) {
        console.log('Image selection cancelled')
      } else if (response?.error) {
        console.log('Image selection error:', response.error)
        setError(response.error)
      } else {
        console.log('uri -> ', response.assets[0].uri);
        console.log('fileSize -> ', response.assets[0].fileSize);
        setImage(response.assets[0])
      }
    })
  }

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
      const formData = new FormData()
      formData.append('source', source)
      formData.append('description', description)
      formData.append('image', {
        name: image.fileName,
        type: image.type,
        uri: image.uri
      })

      const response = await fetch(`${Config.EXPRESS}/api/report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
          'Accept':'*/*'
        },
        body: formData
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log(responseData)
        Toast.show({
          type: 'success',
          text1: 'Report sent successfully.',
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
          onHide: () => setError(null),
        });
        setSuccess(true)
        setSource(null)
        setDescription(null)
        setImage(null)
      }
      if (!response.ok) {
        console.log(responseData)
          const errorLog = responseData.error
          if (errorLog && errorLog.toString().trim() !== "") {
          Toast.show({
            type: 'error',
            text1: 'An error has occurred.',
            text2: errorLog,
            visibilityTime: 3000,
            autoHide: true,
            onHide: () => setError(null),
            position: 'bottom'
          });
        }
      }
      setLoading(false)
    } catch (error) {
      if (error && error.toString().trim() !== "") {
        Toast.show({
          type: 'error',
          text1: 'An error has occurred.',
          text2: error,
          visibilityTime: 3000,
          autoHide: true,
          onHide: () => setError(null),
          position: 'bottom'
        });
      }

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
        <View style={styles.Imageupload}>
        <TouchableOpacity style={styles.saveButton} onPress={handleImageUpload}>
        <Text style={styles.saveButtonText}>Upload Image</Text>
        </TouchableOpacity>
        </View>
        {image && (
          <View style={styles.imagePreview}>
            {image.uri && (
              <Image source={{ uri: image.uri }} style={styles.image} />
            )}
            <Text style={styles.imageName}>Image uploaded successfully</Text>
          </View>
        )}
        {source && description && image ? <CustomButton disabled={loading} primary title='Report' onPress={handleSubmit}/> 
        : <CustomButton disabled primary title='Report'/>}
        {/* {error && <Text style={styles.error}>Error: {error.message}</Text>} */}
        <Toast ref={(ref) => Toast.setRef(ref)}  />
        {/* {success && <Text style={styles.success}>Report sent successfully!</Text>} */}
        </View>
        
        
    </ImageBackground>
    </ScrollView>
    </MapContainer>
  )
}

export default ReportingComponent