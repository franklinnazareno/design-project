import React, { useRef, useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, Button, KeyboardAvoidingView } from 'react-native';
import Config from 'react-native-config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '../../../assets/themes/colors';
import CustomButton from '../../CustomButton';
import Input from '../../inputs';
import styles from './styles';
import OptimalProgressComp from './OptimalProgress/optimalProgressComp';
import SafeProgressComp from './SafeProgress/safeProgressComp';
import { STARTNAV } from '../../../context/initialRoutenNames';

var deviceWidth = Dimensions.get('window').width;
navigator.geolocation = require('@react-native-community/geolocation');

import Tts from 'react-native-tts';

const DetailBlock = ({ preference, location, handleCoordsData, handleCoordsData2, handleLoadingData, handleSafestCoverage, handleFastestCoverage, source, destination, results, results2, safestCoverage, fastestCoverage, error, setError, loading, setLoading, setSource, setDestination, setResults, setResults2, destinationCoords, setDestinationCoords, sourceCoords, setSourceCoords, begin, setBegin, bestCoords, setBestCoords, otherCoords, setOtherCoords, bestSteps, setBestSteps, otherSteps, setOtherSteps, currentLoc, setCurrentLoc }) => {
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
  useEffect(() => {
    if(location){
      const latitude = location.latitude;
      const longitude = location.longitude;
      
      const fetchData = async () => {
        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAPS_API_KEY}`);
          const currentLocation = await response.json();
          const name = currentLocation.results[0].formatted_address;
          
          setCurrentLoc({
            name: name,
            description: "Current Location",
            geometry: {location: {lat: latitude, lng: longitude}}
          });
          
        } catch(error) {
          setError(error);
        }
      };
      
      fetchData(); // Call the async function
    }
  }, []);
  
  const GooglePlacesInputSource = () => {
    const ref = useRef();

    useEffect(() => {
      ref.current?.setAddressText(source)
    }, [source]);

    return (
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Source"
        onPress={(data, details = null) => {
          setSourceCoords([details.geometry.location.lng, details.geometry.location.lat]); 
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
          // if (rowData.isCurrentLocation == true){
          //   return(
          //     <View
          //     style={{
          //       backgroundColor: 'white',
          //       flex: 1,
          //       height: '100%',
          //       flexDirection: 'row',
          //       alignItems: 'center',
          //     }}>
          //     <MaterialCommunityIcons name="map-marker-account" size={30} style={{marginRight: 8}}/>
          //     <View>
          //       <Text>Current Location</Text>
          //     </View>
          //     </View>
          //   );
          // }
          // if (rowData.business_status) {
          //   return(
          //     <View
          //     style={{
          //       backgroundColor: 'white',
          //       flex: 1,
          //       height: '100%',
          //       flexDirection: 'row',
          //       alignItems: 'center',
          //     }}>
          //     <MaterialCommunityIcons name="map-marker" size={30} style={{marginRight: 8}}/>
          //     <View>
          //       <Text>{rowData.name}</Text>
          //     </View>
          //     </View>
          //   )
          // }
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
  const GooglePlacesInputDestination = () => {
    const ref = useRef();

    useEffect(() => {
      ref.current?.setAddressText(destination)
    }, [destination]);

    return (
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Destination"
        onPress={(data, details = null) => {
          setDestinationCoords([details.geometry.location.lng, details.geometry.location.lat])
          console.log("Destination:", [details.geometry.location.lng, details.geometry.location.lat])
          setDestination(details.name)
          console.log(details.name)
        }}
        value={destination}
        query={{key: Config.GOOGLE_MAPS_API_KEY, 
                language: 'en',
                location: '14.6507, 121.1029', // location bias of results
                radius: '8000',
                components: 'country:ph',}}
        fetchDetails={true}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps={'always'}
        
        styles={{
          container: {
            flex: 0,
            marginBottom: 10
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
  

  const handleSubmitWithRetry = async (retryCount) => {
    if (retryCount === 0) {
      setError('An error has occured. Please check your network connection and try again.');
      handleLoadingData(false)
      setLoading(false);
      return;
    }
    handleLoadingData(true);
    setLoading(true);

    try {
      // const [sourceResponse, destinationResponse] = await Promise.all([
      //         fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(source)}&key=${Config.GOOGLE_MAPS_API_KEY}`),
      //         fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${Config.GOOGLE_MAPS_API_KEY}`)
      //     ]);

      // const sourceData = await sourceResponse.json();
      // const destinationData = await destinationResponse.json();

      // if (!sourceResponse.ok || !destinationResponse.ok) {
      //     setError("Unable to connect to location services.");
      //     setLoading(false)
      //     handleLoadingData(false)
      // }

      // if (sourceData.results.length === 0 || destinationData.results.length === 0) {
      //     setError("Unable to find the current location. Try another search.");
      //     setLoading(false)
      //     handleLoadingData(false)
      // }

      // const sourceCoords = [sourceData.results[0].geometry.location.lng, sourceData.results[0].geometry.location.lat]
      // setSourceCoords(sourceCoords)
      // const destCoords = [destinationData.results[0].geometry.location.lng, destinationData.results[0].geometry.location.lat]
      // setDestinationCoords(destCoords)
      const thresholdDistance = 50
      if (location) {
        const distance = haversineDistance(location.latitude, location.longitude, sourceCoords[1], sourceCoords[0])
        if (distance <= thresholdDistance) {
          setSourceCoords([location.longitude, location.latitude])
          setBegin(true)
        } else {
          setBegin(false)
        }
      }
      const preferences = preference.preferences.map(({ name, value }) => ({ name, value }));
      const destCoords = destinationCoords
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
          Toast.show({
            type: 'error',
            text1: 'An error has occured.',
            text2: json[msg],
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 250,
            bottomOffset:300,
            onHide: () => setError(null),
          });
          return;
      }
      if (response.ok) {
        if (json['shortest_route'] && Object.keys(json['shortest_route']).length > 0){
          setResults(json['optimized_route']);
          setResults2(json['shortest_route'])
          handleCoordsData(json['optimized_route']['coordinates']);
          setBestCoords(json['optimized_route']['coordinates'])
          handleCoordsData2(json['shortest_route']['coordinates'])
          setOtherCoords(json['shortest_route']['coordinates'])
          const stepsJson = json['optimized_route']['steps']
          const stepsTemp = stepsJson.map(step => {
            return {
              coordinates: step.coordinates,
              distance: step.distance,
              instruction: step.instruction
            }
          })
          setBestSteps(stepsTemp)
          const stepsJson2 = json['shortest_route']['steps']
          const stepsTemp2 = stepsJson2.map(step => {
            return {
              coordinates: step.coordinates,
              distance: step.distance,
              instruction: step.instruction
            }
          })
          setOtherSteps(stepsTemp2)
          handleSafestCoverage(json['optimized_route']['coverage'])
          handleFastestCoverage(json['shortest_route']['coverage'])
        } else {
          setResults(json['optimized_route']);
          setResults2(json['shortest_route']);
          handleCoordsData(json['optimized_route']['coordinates']);
          setBestCoords(json['optimized_route']['coordinates']);
          handleCoordsData2(null);
          setOtherCoords(null);
          const stepsJson = json['optimized_route']['steps']
          const stepsTemp = stepsJson.map(step => {
            return {
              coordinates: step.coordinates,
              instruction: step.instruction
            }
          })
          setBestSteps(stepsTemp)
          setOtherSteps(null)
          handleSafestCoverage(json['optimized_route']['coverage'])
          handleFastestCoverage(null)
        }
        handleLoadingData(false)
        setLoading(false);
        setError(null);
        return;
      }
    } catch (error) {
      console.log(error)
      if (error instanceof TypeError && error.message === 'Network request failed') {
        // Toast.show({
        //   type: 'error',
        //   text1: 'A server error has occurred.',
        //   A server error has occurred.
        //   visibilityTime: 3000,
        //   autoHide: true,
        //   topOffset: 250,
        //   bottomOffset:300,
        //   onHide: () => setError(null),
          
        // });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await handleSubmitWithRetry(retryCount - 1);
      } else {
        handleLoadingData(false)
        setLoading(false)
        setError("An error has occurred. \n Please ensure that the set locations are within Marikina City")
        if (error && error.toString().trim() !== "") {
          Toast.show({
            type: 'error',
            text1: 'An error has occurred.',
            //text2: error.toString(),
            text2: 'Please ensure that the set locations are within Marikina City.',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 250,
            bottomOffset: 300,
            onHide: () => setError(null),
          });
        }
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
        keyboardShouldPersistTaps={'always'}
        
        >
          
          {/* Find Path Screen */}

          <View style={styles.firstView}>

          
          <View style={styles.Current}>
          <View style={styles.locationlabel}>
            <Text>Source</Text>
          </View>
              {/* <Input
              label="Source"
              placeholder='Location'

              icon={<TouchableOpacity onPress={handleLocation} >
                <MaterialCommunityIcons name = 'map-marker-account' size={40}></MaterialCommunityIcons>
                </TouchableOpacity>}
                iconPosition='right'

              onChangeText={(text) => setSource(text)}
              value={source} /> */}
              <GooglePlacesInputSource/>
              </View>
              
              
              <View style={styles.Destination}>
              <View style={styles.locationlabel}>
                  <Text>Destination</Text>
              </View> 
              <GooglePlacesInputDestination/>
              
              {/* <Input
              label="Destination"
              placeholder='Destination'
              onChangeText={(text) => setDestination(text)}
              value={destination} /> */}
              </View>
              

              {/* Custom Button OnPress does not work use touchableopacity */}
              
              <View style={styles.boxloader}>

              { sourceCoords && destinationCoords ? <CustomButton disabled={loading} onPress={handleSubmit} primary title='Find Path'/> : <CustomButton disabled primary title='Find Path'/> }
              {/* {error && <Text style={styles.error}>{error}</Text>}  */}
              
      
              
              
              
              </View>
              <Toast ref={(ref) => Toast.setRef(ref)}  />
          </View>

          {/* Safest Path Instruction */}
          {results && (
            <ScrollView >
              <TouchableOpacity activeOpacity={1}>

                {/* Label */}
                <View style={styles.labelbox}>
                <Text style={styles.labeltext}>Best Path</Text>
                </View> 

                {/* Label Distance */}
                <View 
                //style={styles.labelbox}
                >
                <Text style={styles.labelDistance}>Distance:</Text>
                </View> 

              {/* Safest Progress Detail */}
              <SafeProgressComp safestCoverage={safestCoverage} />
                {/* Start your safe nav here */}
                {begin && <View style={styles.beginNav}>
                
                <CustomButton primary title='Start Navigation' 
                onPress={() => navigation.navigate(STARTNAV, {
                  preference: preference,
                  source: sourceCoords,
                  destination: destinationCoords,
                  coords: bestCoords,
                  steps: bestSteps,
                  option: 'steps_with_coords_safest'
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

                {/* Label */}
                <View style={styles.labelbox}>
                <Text style={styles.labeltext}>Alternative Path</Text>
                </View>

                {/* Label Distance */}
                <View 
                //style={styles.labelbox}
                >
                <Text style={styles.labelDistance}>Distance:</Text>
                </View> 

                {/* Fastest Progress Detail */}
                <OptimalProgressComp fastestCoverage={fastestCoverage} />

                {/* Start your FAST nav here */}
                {begin && <View style={styles.beginNav}>
                
                <CustomButton primary title='Start Navigation' 
                onPress={() => navigation.navigate(STARTNAV, {
                  preference: preference,
                  source: sourceCoords,
                  destination: destinationCoords,
                  coords: otherCoords,
                  steps: otherSteps,
                  option: 'steps_with_coords_fastest'
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