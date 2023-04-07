import React, { useRef, useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import Config from 'react-native-config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import MapBoxPlacesAutocomplete from "react-native-mapbox-places-autocomplete";
import colors from '../../../assets/themes/colors';
import CustomButton from '../../CustomButton';
import Input from '../../inputs';
import styles from './styles';
import OptimalProgressComp from './OptimalProgress/optimalProgressComp';
import SafeProgressComp from './SafeProgress/safeProgressComp';
import { STARTNAV } from '../../../context/initialRoutenNames';

var deviceWidth = Dimensions.get('window').width;

import Tts from 'react-native-tts';

const DetailBlock = ({ preference, location, handleCoordsData, handleCoordsData2, handleLoadingData, handleSafestCoverage, handleFastestCoverage, source, destination, results, results2, safestCoverage, fastestCoverage, error, setError, loading, setLoading, setSource, setDestination, setResults, setResults2, destinationCoords, setDestinationCoords, sourceCoords, setSourceCoords, begin, setBegin, swapped, setSwapped }) => {
  const navigation = useNavigation();

  const toRadians = (degrees) => {
    return degrees * Math.PI / 180
  }

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3
    const phi1 = toRadians(lat1)
    const phi2 = toRadians(lat2)
    const deltaPhi = toRadians(lat2 - lat1)
    const deltaLambda = toRadians(lon2 - lon1)

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // const [isSpeaking, setIsSpeaking] = useState(false);

  // const handleSpeak = () => {
  //   let instructions = '';
  //   for (let i = 0; i < results.steps.length; i++) {
  //     const instructionText = `${i + 1}. ${results.steps[i].instruction}. `;
  //     instructions += instructionText;
  //   }
  //   Tts.speak(instructions);
  //   setIsSpeaking(true);
  // };

  // const handlePause = () => {
  //   Tts.stop();
  //   setIsSpeaking(false);
  // };

  // const handleSpeak2 = () => {
  //   let instructions = '';
  //   for (let i = 0; i < results2.steps.length; i++) {
  //     const instructionText = `${i + 1}. ${results2.steps[i].instruction}. `;
  //     instructions += instructionText;
  //   }
  //   Tts.speak(instructions);
  //   setIsSpeaking(true);
  // };

  // const handlePause2 = () => {
  //   Tts.stop();
  //   setIsSpeaking(false);
  // };

// const MapboxPlacesInput = ({id,placeholder}) => {
//   return (
//     <MapBoxPlacesAutocomplete
//       id={id}
//       placeholder={placeholder}
//       accessToken={Config.MAPBOX_PUBLIC_TOKEN} // MAPBOX_PUBLIC_TOKEN is stored in .env root project folder
//       onPlaceSelect={(data) => {
//         if (id == "source"){
//           setSource(data.place_name)
//           console.log(data.place_name)
//           console.log("Source set")
//           value={source}
//         } else {
//           setDestination(data.place_name)
//           console.log(data.place_name)
//           console.log("Dest set")
//           value={destination}
//         }
//       }}
//       onClearInput={({ id }) => {
//         console.log("cleared")
//         if (id == "source"){
//           if (id == "source"){
//             setSource("")
//           } else {
//             setDestination("")
//           }
//         }
//       }}
//       countryId="ph"
//       //style={{ backgroundColor: 'red', borderRadius: 8, borderWidth: 1, borderColor: '#ccc', padding: 10 }}
//       containerStyle={{
//         width: '100%',
//         margin: 30,
//         alignSelf: 'center',
//         backgroundColor: 'red',
//       }}
//       inputStyle={{ 
//       zIndex:9999,
//       height: 50, // adjust the height value as needed
//       backgroundColor: 'white',
//       borderRadius: 8,
//       borderWidth: 1,
//       borderColor: '#ccc',
//       paddingLeft: 10,
//       paddingRight: 10,
//       fontSize: 16,
//       color: '#333',
//       marginTop: 20,
//       }}

    
//     />
//   );
// }; 

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

  const handleSubmitWithRetry = async (retryCount) => {
    if (retryCount === 0) {
      setError('An error has occured. Please check your network connection and try again.');
      handleLoadingData(false)
      setLoading(false);
      return;
    }
    handleLoadingData(true)
    setLoading(true);


    try {
      const [sourceResponse, destinationResponse] = await Promise.all([
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(source)}&key=${Config.GOOGLE_MAPS_API_KEY}`),
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${Config.GOOGLE_MAPS_API_KEY}`)
          ]);

      const sourceData = await sourceResponse.json();
      const destinationData = await destinationResponse.json();

      if (!sourceResponse.ok || !destinationResponse.ok) {
          setError("Unable to connect to location services.");
          setLoading(false)
          handleLoadingData(false)
      }

      if (sourceData.results.length === 0 || destinationData.results.length === 0) {
          setError("Unable to find the current location. Try another search.");
          setLoading(false)
          handleLoadingData(false)
      }

      const sourceCoords = [sourceData.results[0].geometry.location.lng, sourceData.results[0].geometry.location.lat]
      setSourceCoords(sourceCoords)
      const destCoords = [destinationData.results[0].geometry.location.lng, destinationData.results[0].geometry.location.lat]
      setDestinationCoords(destCoords)
      const preferences = preference.preferences.map(({ name, value }) => ({ name, value }));
      const postData = { preferences, sourceCoords, destCoords };
      console.log(postData)

      const response = await fetch(`${Config.FLASK}/route/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
      });

      const json = await response.json();

      if (!response.ok) {
          handleLoadingData(false)
          setLoading(false);
          setError(json.error);
          return;
      }
      if (response.ok) {
        setResults(json['optimized_route']);
        setResults2(json['shortest_route'])
        setSwapped(json['swap'])
        handleCoordsData(json['optimized_route']['coordinates']);
        handleCoordsData2(json['shortest_route']['coordinates'])
        handleSafestCoverage(json['optimized_route']['coverage'])
        handleFastestCoverage(json['shortest_route']['coverage'])
        handleLoadingData(false)
        setLoading(false);
        setError(null);

        const thresholdDistance = 50
        const distance = haversineDistance(location.latitude, location.longitude, sourceCoords[1], sourceCoords[0])
        if (distance <= thresholdDistance) {
          setBegin(true)
        } else {
          setBegin(false)
        }
        return;
      }
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Network request failed') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await handleSubmitWithRetry(retryCount - 1);
      } else {
        handleLoadingData(false)
        setLoading(false)
        setError("An error has occurred. \n Please ensure that the set locations are within Marikina City")
        Toast.show({
          type: 'error',
          text1: 'An error has occurred',
          text2:'Please ensure that the set locations are within Marikina City',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 90,
          bottomOffset:300,
          onHide: () => setError(''),
          
        });
      }
    }
  }


  const handleSubmit = async () => {
      handleSubmitWithRetry(25);
  };

  
    return (
      
      <View style={styles.container}>
        
        <ScrollView 
        horizontal={true} 
        pagingEnabled={true} 
        showsHorizontalScrollIndicator={false}
        
        >
          
          {/* Find Path Screen */}
          <View style={styles.firstView}>
          
          <View style={styles.Current}>
              <Input
              label="Source"
              placeholder='Location'

              icon={<TouchableOpacity onPress={handleLocation} >
                <MaterialCommunityIcons name = 'map-marker-account' size={40}></MaterialCommunityIcons>
                </TouchableOpacity>}
                iconPosition='right'

              onChangeText={(text) => setSource(text)}
              value={source} />
              {/* <MapboxPlacesInput
                id="source"
                placeholder="Source"
                
                /> */}
              {/* <TouchableOpacity onPress={handleLocation} >
                <MaterialCommunityIcons name = 'location' size={25}></MaterialCommunityIcons>
              </TouchableOpacity> */}
              </View>

              <View style={styles.Destination}>
              <Input
              label="Destination"
              placeholder='Destination'
              onChangeText={(text) => setDestination(text)}
              value={destination} />
              {/* <MapboxPlacesInput
                id="destination"
                placeholder="Destination"
                
                /> */}
              </View>

              {/* Custom Button OnPress does not work use touchableopacity */}
              
              <View style={styles.boxloader}>

              <CustomButton disabled={loading} onPress={handleSubmit} primary title='Find Path'/> 
              {/* {error && <Text style={styles.error}>{error}</Text>}  */}
              <Toast ref={(ref) => Toast.setRef(ref)}  />
      
              
              
              
              </View>
              
          </View>

          {/* Safest Path Instruction */}
          {results && (
            <ScrollView >
              <TouchableOpacity activeOpacity={1}>

              {/* Safest Progress Detail */}
              <SafeProgressComp safestCoverage={safestCoverage} />
                {/* Start your safe nav here */}
                {begin && <View style={styles.beginNav}>
                
                <CustomButton primary title='Begin Journey' 
                onPress={() => navigation.navigate(STARTNAV, {
                  preference: preference,
                  source: sourceCoords,
                  destination: destinationCoords,
                  option: swapped ? 'steps_with_coords_fastest' : 'steps_with_coords_safest'
                })}
                /> 

                </View>}
                
                <View style={styles.secondView}>
                  
                  {results.steps && (
                    <View>
                      <Text style={styles.intruction}>Distance: {results.length / 1000} km</Text>
                      {results.steps.map((step, index) => (
                        <View key={index} >
                          <Text style={styles.intruction}>{index + 1}. {step.instruction}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <View style={styles.marginbox}></View>
              </TouchableOpacity>
            </ScrollView>
          )}



          {/* Optimal Path Instruction */}
          {results2 && (
            
            <ScrollView >
              <TouchableOpacity activeOpacity={1} >

                {/* Fastest Progress Detail */}
                <OptimalProgressComp fastestCoverage={fastestCoverage} />

                {/* Start your FAST nav here */}
                {begin && <View style={styles.beginNav}>
                
                <CustomButton primary title='Begin Journey' 
                onPress={() => navigation.navigate(STARTNAV, {
                  preference: preference,
                  source: sourceCoords,
                  destination: destinationCoords,
                  option: swapped ? 'steps_with_coords_safest' : 'steps_with_coords_fastest'
                })}
                /> 

                </View>}

                <View style={styles.thirdView}>
                  {results2.steps && (
                    <View >
                      <Text style={styles.intruction}>Distance: {results2.length / 1000} km</Text>
                      {results2.steps.map((step, index) => (
                        <View key={index} >
                          <Text style={styles.intruction}>{index + 1}. {step.instruction}</Text>   
                        </View>
                        
                      ))}
                    </View>
                  )}
                </View>
                <View style={styles.marginbox}></View>
              </TouchableOpacity>
            </ScrollView>
            
          )}
    
          {/* <View style={styles.forthView}>
            <Text style={styles.headerText}>Forth View</Text>
          </View> */}
         
        </ScrollView>
       
        
      </View>
      
    );
  }


export default DetailBlock;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#e5e5e5",
//   },
//   headerText: {
//     fontSize: 30,
//     textAlign: "center",
//     margin: 10,
//     color: 'white',
//     fontWeight: "bold"
//   },
//   firstView: {
//     width: deviceWidth,
//     alignSelf:'flex-start'
//   },
//   secondView: {
    
//     height:400,
//     width:385,
//     backgroundColor: colors.grey,
//     borderRadius: 10,
//     alignSelf:'center',
//     marginTop: 1
//   },
//   thirdView: {
//     width: deviceWidth,
//   },
//   forthView: {
//     width: deviceWidth,
//   },
//   Current: {
//     marginTop: -10,
//     width:300,
//     alignSelf:'center'
// },
//     Destination: {
//     marginTop: -25,
//     width:300,
//     alignSelf:'center',
// },
// boxloader:{
//   marginTop:-10,
//   flex:1,
// },
// error: {
//   color: 'red',
//   fontSize: 16,
//   alignSelf:'center'
// },

// });