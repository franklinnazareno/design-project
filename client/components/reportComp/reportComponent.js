import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import {launchImageLibrary} from 'react-native-image-picker';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import Input from '../inputs'
import SecondaryInput from '../commons/secondaryInput'
import styles from './styles'
import CustomButton from '../CustomButton'


const ReportComponent = () => {
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user } = useAuthContext()
  const { logout } = useLogout()

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
      setImage(response)
    }
  })
}

  const handleSubmit = async () => {
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

      const response = await fetch('http://10.0.2.2:4000/api/report', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data',
          'Authorizaton': `Bearer ${user.token}`,
        },
        body: formData
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log(responseData)
      }
      if (!response.ok) {
        logout()
        return <Login />
      }
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView>
        <Text style={styles.subText}> Got a Problem? Report Now</Text>
        <ImageBackground 
            height={70} 
            width={70} 
            source={require('../../assets/images/Reg4.png')}
            style={[styles.loginImage]}/> 
        <View style={styles.Text}>
            
        <Input
            label='Source'
            value={source}
            onChangeText={setSource}
            icon={<TouchableOpacity >
            <Entypo name = 'location' size={25}></Entypo>
            </TouchableOpacity>}
            iconPosition='right'
            />

        <View>
        <SecondaryInput
        label='Description'
        value={description}
        onChangeText={setDescription}
        icon={<TouchableOpacity >
          <Entypo name = 'location' size={25}></Entypo>
          </TouchableOpacity>}
          iconPosition='right'
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
        {/* {error && <Text style={styles.error}>{error}</Text>} */}
        </View>
        
    
    </SafeAreaView>
  )
}

export default ReportComponent