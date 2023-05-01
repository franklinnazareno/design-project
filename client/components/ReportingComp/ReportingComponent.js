import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Image, ActivityIndicator} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Config from 'react-native-config';
import {launchImageLibrary} from 'react-native-image-picker';
import { useAuthContext } from '../../hooks/useAuthContext';
import Input from '../commons/inputs'
import SecondaryInput from '../commons/secondaryInput'
import CustomButton from '../commons/CustomButton'
import MapContainer from '../commons/mapContainer/Contain';
import styles from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../assets/themes/colors';

const ReportingComponent = ({ location }) => {
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reportCoords, setReportCoords] = useState(null)
  const [currentLoc, setCurrentLoc] = useState(null)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Closure',
     value: 'closure',
     icon: () => <MaterialIcon name='do-not-disturb-on' size={15}/>},
    {label: 'Hazard',
     value: 'hazard',
     icon: () => <MaterialIcon name='warning' size={15}/>},
    {label: 'Police', 
     value: 'police',
     icon: () => <MaterialIcon name='local-police' size={15}/>},
    {label: 'Crash',
     value: 'crash',
     icon: () => <FontAwesome5 name='car-crash' size={15}/>},
     {label: 'Other',
     value: 'others'}
  ]);

  const { user } = useAuthContext()


  // useEffect(() => {
  //   async function getLocation() {
  //     if (location) {
  //       const longitude = location.longitude
  //       const latitude = location.latitude 

  //       try {
  //         const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`);
  //         const currentLocation = await response.json();
  //         setSource(currentLocation.results[0].formatted_address);
  //       } catch (error) {
  //         setError(error);
  //       }
  //     }
  //   }

  //   getLocation();
  // }, []);
  useEffect(() => {
    if(location){
      const latitude = location.latitude;
      const longitude = location.longitude;
      
      setCurrentLoc({
        name: "Current Location",
        description: "Current Location",
        geometry: {location: {lat: latitude, lng: longitude}}
      });

    }
  }, []);
  const CategorySelect = () => {
    return (
      <DropDownPicker
        style={{marginBottom: open ? 190 : 0}}
        placeholder="Select report category"
        iconContainerStyle={{
          marginRight: 10
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    );
  }
  const GooglePlacesInputSource = () => {
    const ref = useRef(null);

    useEffect(() => {
      ref.current?.setAddressText(source)
      
    }, [source]);

    useEffect(() => {
      if(source == "Current Location"){
        const fetchData = async () => {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${reportCoords[1]},${reportCoords[0]}&key=${Config.GOOGLE_MAPS_API_KEY}`);
            const currentLocation = await response.json();
            const name = currentLocation.results[0].formatted_address;
            console.log(name)
            
            ref.current?.setAddressText(name)
            setSource(name)
        };
        fetchData();}
    })

    return (
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Source"
        onPress={(data, details = null) => {
          setReportCoords([details.geometry.location.lng, details.geometry.location.lat]); 
          console.log("Source:", [details.geometry.location.lng, details.geometry.location.lat])
          setSource(details.name)
          console.log(details.name)
        }}
        query={{key: Config.GOOGLE_MAPS_API_KEY, 
                language: 'en',
                location: '14.6507, 121.1029', //location bias of results
                radius: '8000',
                components: 'country:ph',}}
        fetchDetails={true}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        // currentLocation={true}
        // currentLocationLabel='Current location'
        predefinedPlaces={[currentLoc]}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps={'always'}
        styles={{
          container: {
            flex: 0,
          },
          description: {
            color: '#000',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#3caf50',
          },
          textInput:{
            height:55,
            borderRadius: 10,
            borderWidth: 2,
            borderColor:colors.primary,

          },
        }}
        renderRow={(rowData) => {
          if (rowData.isPredefinedPlace == true){
            const title = rowData.description
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
              <Text style={{fontSize: 14}}>{title}</Text>
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

  // const handleLocation = async () => {
  //   if (location) {
  //       const longitude = location.longitude
  //       const latitude = location.latitude 

  //       try {
  //         const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`);
  //         const currentLocation = await response.json();
  //         setSource(currentLocation.results[0].formatted_address);
  //       } catch (error) {
  //         setError(error);
  //       }
  //     }
  // }

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
          const errorLog = responseData.error
          if (errorLog && errorLog.toString().trim() !== "") {
          Toast.show({
            type: 'error',
            text1: 'An error has occurred.',
            text2: errorLog,
            visibilityTime: 3000,
            autoHide: true,
            onHide: () => setError(null),
            position: 'bottom',
            bottomOffset: 200
          });
          console.log(errorLog)
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
        {/* <ScrollView keyboardShouldPersistTaps='always'> */}
            <Text style={styles.subText}>Help us Improve Our Maps!</Text>
            <ImageBackground  
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
            <GooglePlacesInputSource/>
            <View>
            <CategorySelect/>
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
            </View>
            
            {/* {error && <Text style={styles.error}>Error: {error.message}</Text>} */}
            <Toast ref={(ref) => Toast.setRef(ref)}  />
            {/* {success && <Text style={styles.success}>Report sent successfully!</Text>} */}
            </ImageBackground>
        
        {/* </ScrollView> */}
    
        
    </MapContainer>
  )
}

export default ReportingComponent