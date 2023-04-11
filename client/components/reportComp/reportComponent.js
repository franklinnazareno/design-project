import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {launchImageLibrary} from 'react-native-image-picker';
import Config from 'react-native-config';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Input from '../inputs'
import SecondaryInput from '../commons/secondaryInput'
import styles from './styles'
import CustomButton from '../CustomButton'
import Container from '../commons/Contain';
import MapContainer from '../commons/mapContainer/Contain';

navigator.geolocation = require('@react-native-community/geolocation');

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
const GooglePlacesInputSource = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(source)
  }, [source]);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Type or select current location"
      onPress={(data, details = null) => {
        setSource(details.formatted_address)
        console.log(details.name)
      }}
      query={{key: Config.GOOGLE_MAPS_API_KEY,
              language: 'en',
              location: '14.6507, 121.1029', // location bias of results
              radius: '8000', 
              components: 'country:ph',}}
      fetchDetails={true}
      onFail={error => console.log(error)}
      onNotFound={() => console.log('no results')}
      currentLocation={true}
      currentLocationLabel='Current location'
      enablePoweredByContainer={false}
      styles={{
        container: {
          flex: 0,
          paddingVertical: 10
        },
        description: {
          color: '#000',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#3caf50',
        },
      }}
      renderRow={(rowData) => {
        if (rowData.isCurrentLocation == true){
          return(
            <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="map-marker-account" size={30} style={{marginRight: 8}}/>
            <View>
              <Text>Current Location</Text>
            </View>
            </View>
          );
        }
        if (rowData.business_status) {
          return(
            <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="map-marker" size={30} style={{marginRight: 8}}/>
            <View>
              <Text>{rowData.name}</Text>
            </View>
            </View>
          )
        }
        const title = rowData.structured_formatting.main_text;
        const address = rowData.structured_formatting.secondary_text;
        return (
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="map-marker" size={30} style={{marginRight: 8}}/>
            <View>
            <Text style={{fontSize: 14}}>{title}</Text>
            <Text style={{fontSize: 14}}>{address}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

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
    <MapContainer>
      <ScrollView keyboardShouldPersistTaps='always'>
        <Text style={styles.subText}>Help us Improve Our Maps!</Text>
        <ImageBackground 
            height={70} 
            width={70} 
            source={require('../../assets/images/Reg4.png')}
            style={[styles.loginImage]}> 
        <View style={styles.Text}>
            
        {/* <Input
            label='Location'
            value={source}
            onChangeText={setSource}
            icon={<TouchableOpacity onPress={handleLocation} >
            <MaterialCommunityIcons name = 'map-marker-account' size={40}></MaterialCommunityIcons>
            </TouchableOpacity>}
            iconPosition='right'
            /> */}
        <Text>Location</Text>
        <GooglePlacesInputSource/>

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
            <Text style={styles.imageName}>{image.fileName}</Text>
          </View>
        )}
        <CustomButton disabled={loading} primary title='Report' onPress={handleSubmit}/>
        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>Report sent successfully!</Text>}
        </View>
        
    </ImageBackground>
    </ScrollView>
    </MapContainer>
  )
}

export default ReportComponent