import React, { useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import Config from 'react-native-config';
import Entypo from 'react-native-vector-icons/Entypo'
import Swiper from 'react-native-swiper'


import colors from '../../../assets/themes/colors';
import CustomButton from '../../CustomButton';
import Input from '../../inputs';
import styles from './styles';
import OptimalProgressComp from './OptimalProgress/optimalProgressComp';
import SafeProgressComp from './SafeProgress/safeProgressComp';




var deviceWidth = Dimensions.get('window').width;


const DetailBlock = ({ preference, handleCoordsData, handleCoordsData2, handleLoadingData, source, destination, results, results2, error, setError, loading, setLoading, setSource, setDestination, setResults, setResults2 }) => {


  const handleSubmitWithRetry = async (retryCount) => {
    if (retryCount === 0) {
      setError('An error has occured. Please try again.');
      handleLoadingData(false)
      setLoading(false);
      return;
    }
    handleLoadingData(true)
    setLoading(true);
    try {
      const [sourceResponse, destinationResponse] = await Promise.all([
              fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(source)}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`),
              fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
          ]);

      const sourceData = await sourceResponse.json();
      const destinationData = await destinationResponse.json();

      if (!sourceResponse.ok || !destinationResponse.ok) {
          setError("Unable to connect to location services.");
          setLoading(false)
          handleLoadingData(false)
      }

      if (sourceData.features.length === 0 || destinationData.features.length === 0) {
          setError("Unable to find the current location. Try another search.");
          setLoading(false)
          handleLoadingData(false)
      }

      const { center: sourceCoords } = sourceData.features[0];
      const { center: destCoords } = destinationData.features[0];
      const preferences = preference.preferences.map(({ name, value }) => ({ name, value }));
      const postData = { preferences, sourceCoords, destCoords };

      const response = await fetch('http://10.0.2.2:8888/route/', {
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
        handleCoordsData(json['optimized_route']['coordinates']);
        handleCoordsData2(json['shortest_route']['coordinates'])
        handleLoadingData(false)
        setLoading(false);
        setError(null);
        return;
      }
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await handleSubmitWithRetry(retryCount - 1);
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

              icon={<TouchableOpacity >
                <Entypo name = 'location' size={25}></Entypo>
                </TouchableOpacity>}
                iconPosition='right'

              onChangeText={(text) => setSource(text)}
              value={source} />
              </View>

              <View style={styles.Destination}>
              <Input
              label="Destination"
              placeholder='Destination'
              onChangeText={(text) => setDestination(text)}
              value={destination} />
              </View>

              {/* Custom Button OnPress does not work use touchableopacity */}
              
              <View style={styles.boxloader}>

              <CustomButton disabled={loading} onPress={handleSubmit} primary title='Find Path'/> 
              
      
              {error && <Text style={styles.error}>{error}</Text>} 
              
              
              </View>
              
          </View>

          {/* Safest Path Instruction */}
          {results && (
            <ScrollView >
              <TouchableOpacity activeOpacity={1}>

              {/* Safest Progress Detail */}
              <SafeProgressComp></SafeProgressComp>

                <View style={styles.secondView}>
                  
                  {results.steps && (
                    <View>
                      <Text style={styles.intruction}>Distance: {results.length / 1000} km</Text>
                      {results.steps.map((step, index) => (
                        <View key={index}>
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
                <OptimalProgressComp></OptimalProgressComp>

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