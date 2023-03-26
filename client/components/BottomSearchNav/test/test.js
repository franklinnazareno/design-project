import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import Config from 'react-native-config';
import CustomButton from '../../CustomButton';
import Input from '../../inputs';

var deviceWidth = Dimensions.get('window').width;

const TestBlock = ({ preference, handleCoordsData, source, destination, results, setSource, setDestination, setResults }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleSubmitWithRetry = async (retryCount) => {
    if (retryCount === 0) {
      setError('Maximum retries exceeded');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [sourceResponse, destinationResponse] = await Promise.all([
              fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(source)}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`),
              fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
          ]);

      const sourceData = await sourceResponse.json();
      const destinationData = await destinationResponse.json();

      if (!sourceResponse.ok || !destinationResponse.ok) {
          throw new Error("Unable to connect to location services.");
      }

      if (sourceData.features.length === 0 || destinationData.features.length === 0) {
          throw new Error("Unable to find the current location. Try another search.");
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
          setLoading(false);
          setError(json.error);
      }
      if (response.ok) {
        setResults(json);
        handleCoordsData(json['coordinates']);
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
    try {
      handleSubmitWithRetry(25);
    } catch (error) {
      setError("An error has occurred. Please Try again.")
      setLoading(false)
    }
  };

  
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
          
          {/* Find Path Screen */}
          <View style={styles.firstView}>
          <View style={styles.Current}>
              <Input
              label="Current Location"
              placeholder='Location'
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
          <View style={styles.secondView}>
            {results && results.steps && (
              <View>
                <Text>Distance: {results.length / 1000} km</Text>
                {results.steps.map((step, index) => (
                  <View key={index}>
                    <Text>{index + 1}. {step.instruction}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>


          {/* Optimal Path Instruction */}
          <View style={styles.thirdView}>
            <Text style={styles.headerText}>Third View</Text>
          </View>

          <View style={styles.forthView}>
            <Text style={styles.headerText}>Forth View</Text>
          </View>
        </ScrollView>
      </View>
    );
  }


export default TestBlock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: 'white',
    fontWeight: "bold"
  },
  firstView: {
    width: deviceWidth,
    alignSelf:'flex-start'
  },
  secondView: {
    width: deviceWidth,
  },
  thirdView: {
    width: deviceWidth,
  },
  forthView: {
    width: deviceWidth,
  },
  Current: {
    marginTop: -10,
    width:300,
    alignSelf:'center'
},
    Destination: {
    marginTop: -25,
    width:300,
    alignSelf:'center',
},
boxloader:{
  marginTop:-10,
  flex:1,
},
error: {
  color: 'red',
  fontSize: 16,
  alignSelf:'center'
},

});