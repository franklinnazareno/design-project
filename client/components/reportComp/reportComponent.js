import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {launchImageLibrary} from 'react-native-image-picker';
import Config from 'react-native-config';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import Input from '../inputs'
import SecondaryInput from '../commons/secondaryInput'
import styles from './styles'
import CustomButton from '../CustomButton'
import Container from '../commons/Contain';


const ReportComponent = ({ location }) => {
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user } = useAuthContext()
  const { logout } = useLogout()

  useEffect(() => {
    async function getLocation() {
      if (location) {
        const longitude = location.longitude
        const latitude = location.latitude 

        try {
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`);
          const currentLocation = await response.json();
          setSource(currentLocation.features[0].place_name);
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
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`);
          const currentLocation = await response.json();
          setSource(currentLocation.features[0].place_name);
        } catch (error) {
          setError(error);
        }
      }
  }

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
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setImage(response.assets[0])
    }
  })
}

  const handleSubmit = async () => {
    console.log(user.token)
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('Source', source)
      formData.append('Description', description)
      if (image) {
        formData.append('Image', {
          uri: image.uri,
          name: image.fileName,
          type: image.type
        })
      }

      const response = await fetch(`${Config.EXPRESS}/api/report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        },
        body: formData
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
    <Container>
        <Text style={styles.subText}> Got a Problem? Report Now</Text>
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
        // icon={<TouchableOpacity >
        //   <Entypo name = 'location' size={25}></Entypo>
        //   </TouchableOpacity>}
        //   iconPosition='right'
        />
        </View>

        <View style={styles.ImageUpload}>
        <TouchableOpacity style={styles.saveButton} onPress={handleImageUpload}>
        <Text style={styles.saveButtonText}>Upload Image</Text>
        </TouchableOpacity>
        </View>
        {image && (
          <View style={styles.imagePreview}>
            {image.uri && (
              <Image source={{ uri: image.uri }} style={styles.image} />
            )}
            <Text style={styles.imageName}>{image.fileName}</Text>
          </View>
        )}
        <CustomButton disabled={loading} primary title='Report' onPress={handleSubmit}/>
        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>Report sent successfully!</Text>}
        </View>
        
    </ImageBackground>
    </Container>
  )
}

export default ReportComponent