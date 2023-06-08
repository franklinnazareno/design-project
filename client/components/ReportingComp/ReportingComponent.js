import { View, Text, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Dimensions} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { moderateScale } from 'react-native-size-matters';
import Config from 'react-native-config';
import { launchCamera } from 'react-native-image-picker';
import { useAuthContext } from '../../hooks/useAuthContext';
import SecondaryInput from '../commons/secondaryInput'
import CustomButton from '../commons/CustomButton'
import styles from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../assets/themes/colors';
import SwitchSelector from "react-native-switch-selector";
import NetInfo from "@react-native-community/netinfo"

const windowHeight = Dimensions.get('window').height;

const ReportingComponent = ({ location }) => {
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reportCoords, setReportCoords] = useState(null)
  const [edges, setEdges] = useState('')
  const [currentLoc, setCurrentLoc] = useState(null)
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [finalCategory, setFinalCategory] = useState('');
  const [factorEnabled, setFactorEnabled] = useState(false);
  const [items, setItems] = useState([
    {label: 'Lighting',
     value: 'lighting',
     icon: () => <MaterialIcon name='lightbulb' size={15}/>},
    {label: 'PWD', 
     value: 'pwd',
     icon: () => <MaterialIcon name='directions-walk' size={15}/>},
    {label: 'CCTV',
     value: 'cctv',
     icon: () => <MaterialCommunityIcons name='cctv' size={15}/>},
    {label: 'Flood',
     value: 'flood',
     icon: () => <MaterialCommunityIcons name='home-flood' size={15}/>},
    {label: 'Road Closure',
     value: 'closure',
     icon: () => <MaterialIcon name='do-not-disturb-on' size={15}/>}
  ]);

  const getCategoryOptions = (category) => {
    switch (category) {
      case 'lighting':
        return [
          { label: 'Not Well-lit', value: 'not lighting' },
          { label: 'Well-lit', value: 'lighting' },
        ];
      case 'pwd':
        return [
          { label: 'Not PWD Friendly', value: 'not pwd' },
          { label: 'PWD Friendly', value: 'pwd' },
        ];
      case 'cctv':
        return [
          { label: 'No CCTV', value: 'not cctv' },
          { label: 'CCTV', value: 'cctv' },
        ];
      case 'flood':
        return [
          { label: 'No Flood Hazard', value: 'flood' },
          { label: 'Flood Hazard', value: 'not flood' },
        ];
      default:
        return [];
        }
    }

  const toggleSwitch = () => setFactorEnabled(previousState => !previousState);

  const { user } = useAuthContext();
  const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const handleConnectivityChange = (connectionInfo) => {
        setIsConnected(connectionInfo.isConnected);
        };

        // Subscribe to network connection changes
        const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

        // Cleanup subscription on component unmount
        return () => {
        unsubscribe();
        };
    }, []);

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
        style={{marginTop: 5,marginBottom: open ? 190 : 0}}
        placeholder="Select report category"
        iconContainerStyle={{
          marginRight: 10
        }}
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={(value) => {setCategory(value); setFinalCategory('')}}
        setItems={setItems}
        listMode="SCROLLVIEW"
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
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${reportCoords.latitude},${reportCoords.longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`);
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
          setReportCoords({latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}); 
          console.log("Source:", [details.geometry.location.lng, details.geometry.location.lat])
          setSource(details.name)
          console.log(details.name)
        }}
        textInputProps={{
          clearButtonMode: 'never',
          ref: input => {
            this.textInput = input;
          }
        }}
        renderRightButton={() => {
          if (reportCoords && !loading){
            return(
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              this.textInput.clear();
              setSource('')
              setReportCoords(null)
            }}
          >
            <MaterialIcon
              name="remove-circle"
              size={20}
            />
          </TouchableOpacity>)
          }
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
  const handleImageDelete = () => {
    setImage(null)
  }
  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.1,
    };

    launchCamera(options, (response) => {
      if (response?.didCancel) {
        setSuccess(true)
        console.log('Image capture cancelled');
        Toast.show({
          type: 'info',
          text1: 'Image capture cancelled',
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
          onHide: () => setSuccess(null),
        });
      } else if (response?.errorCode) {
        console.log('Image capture error:', response.errorMessage);
        setError(response.errorMessage);
        Toast.show({
          type: 'error',
          text1: 'Image capture error',
          text2: response.errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
          onHide: () => setError(null),
        });
      } else if (response?.errorCode) {
        console.log('Image capture error:', response.errorMessage);
        setError(response.errorMessage);
      } else {
        // Convert the image to JPG format
        const convertedImage = {
          ...response.assets[0],
          uri: response.assets[0].uri.replace(/\.[^.]+$/, '.jpg'),
          type: 'image/jpeg',
        };

        setImage(convertedImage);
        setSuccess(true)
        Toast.show({
          type: 'success',
          text1: 'Image uploaded successfully',
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
          onHide: () => setSuccess(null),
        });
      }
    });
  };

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
    
    if (isConnected == false) {
      setError('No internet connection found')
      Toast.show({
        type: 'error',
        text1: 'No internet connection found',
        text2: 'Try turning on mobile data',
        visibilityTime: 3000,
        autoHide: true,
        position: 'bottom',
        onHide: () => setError(null),
      });
      setLoading(false)
      return;
    }

    try {
      const coords = [reportCoords.longitude, reportCoords.latitude]
      const flaskPost = { coords }

      const edgesResponse = await fetch(`${Config.FLASK}/route/get_nearest_edge/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flaskPost)
      })

      const edgesJson = await edgesResponse.json()

      if (edgesResponse.ok) {
        const formData = new FormData()
        formData.append('source', source)
        formData.append('coordinates', JSON.stringify(reportCoords))
        formData.append('edges', edgesJson.edges)
        if (category == 'closure'){
            console.log(formData)
            formData.append('category', category)
        }
        else {
            formData.append('category', finalCategory)
        }
        formData.append('description', description)
        console.log(formData)
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
            setSuccess(true)
            Toast.show({
              type: 'success',
              text1: 'Report sent successfully.',
              text2: 'Thank you for contributing!',
              visibilityTime: 5000,
              autoHide: true,
              position: 'bottom',
              onHide: () => setSuccess(null),
            });
            setSource('')
            setDescription(null)
            setCategory(null)
            setImage(null)
            setFactorEnabled(false)
            setFinalCategory('')
          }
          if (!response.ok) {
              setError(true)
              const errorLog = responseData.error
              if (errorLog && errorLog.toString().trim() !== "") {
              Toast.show({
                type: 'error',
                text1: 'An error has occurred.',
                text2: errorLog,
                visibilityTime: 5000,
                autoHide: true,
                onHide: () => setError(null),
                position: 'bottom',
              });
              console.log(errorLog)
            }
          }
          setLoading(false)
      }

    } 
    catch (error) {
      setError(true)
      if (error && error.toString().trim() !== "") {
        Toast.show({
          type: 'error',
          text1: 'An error has occurred.',
          text2: error,
          visibilityTime: 5000,
          autoHide: true,
          onHide: () => setError(null),
          position: 'bottom',
        });
        
      }

      setLoading(false)
    }
  }

  return (
    <View style={{height: windowHeight}}>
        <ImageBackground  
                source={require('../../assets/images/Reg4.png')}
                style={[styles.loginImage]}> 
        {/* <ScrollView keyboardShouldPersistTaps='always'> */}
        <View style={{flex:1, paddingLeft: 30, paddingRight: 30}}>
            <Text style={styles.subText}>Help us Improve Our Maps!</Text>
            <GooglePlacesInputSource/>
            <CategorySelect/>
            {category && category != 'closure' ? 
            <SwitchSelector
                options={getCategoryOptions(category)}
                onPress={(value) => {setFinalCategory(value); }}
                buttonColor={colors.primary}
                style={{marginTop: 10}}
            />
            : null}
                <SecondaryInput
                label='Description'
                value={description}
                onChangeText={setDescription}
                />
            <View style={{flexDirection:'row', justifyContent:'center'}}>
            <TouchableOpacity disabled={loading} style={styles.saveButton} onPress={handleImageUpload}>
              <View style={{flexDirection:'row', alignContent: 'center', justifyContent:'center'}}>
              {image ? 
              <MaterialCommunityIcons name='file-image' size={20} style={{marginRight: 5, color: 'white'}}/> 
              : null}
              <Text style={styles.saveButtonText}>{image ? 'Image saved' : 'Capture Image'}</Text>
              </View>
            </TouchableOpacity>
              {(image && !loading) ? 
              <View style={{justifyContent:'center'}}>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={handleImageDelete}
                  >
                <MaterialCommunityIcons name='close-circle' size={20}/>
              </TouchableOpacity>
              </View> : null}
            </View>
            <View style={{marginTop: 10}}>
            {loading ? <ActivityIndicator size="large" color={colors.primary}/> : source && (finalCategory || category == 'closure') && description && image ? <CustomButton disabled={loading} primary title='Report' onPress={handleSubmit}/> 
            : <CustomButton disabled primary title='Report'/>}
            </View>
            <View style={{flex:1, justifyContent:'flex-end'}}>
              {(success || error) ? <Toast ref={(ref) => Toast.setRef(ref)}/> : null}
            </View>
            {/* I put the toast here for now, it needs fixing too */}
        </View>
            
            {/* {error && <Text style={styles.error}>Error: {error.message}</Text>} */}
            
            {/* {success && <Text style={styles.success}>Report sent successfully!</Text>} */}
            </ImageBackground>
          
        {/* </ScrollView> */}
        {/* You cant use a scrollview here because of the autocomplete */}
    </View>
  )
}

export default ReportingComponent