import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import Config from 'react-native-config';
import CustomButton from '../../CustomButton';
import Input from '../../inputs';

var deviceWidth = Dimensions.get('window').width;

const TestBlock = ({ preference, handleCoordsData }) => {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const encodedSource = encodeURIComponent(source);
      const sourceResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSource}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
      const sourceData = await sourceResponse.json()
      console.log("sourceData OK")

      const encodedDestination = encodeURIComponent(destination);
      const destinationResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedDestination}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
      const destinationData = await destinationResponse.json()
      console.log("destinationeData OK")

      if (sourceResponse.ok && destinationResponse.ok) {
        if (sourceData.features.length === 0 || destinationData.features.length === 0) {
          setError("Unable to find the current location. Try another search.")
          setLoading(false)
        } else {
          const { center: sourceCoords } = sourceData.features[0]
          const { center: destCoords } = destinationData.features[0]
          const data = preference.preferences
          const preferences = data.map(item => ({
            name: item.name,
            value: item.value
          }))
          const postData = { preferences, sourceCoords, destCoords }
          console.log(postData)
          const response = await fetch('http://10.0.2.2:8888/route/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          })
          const json = await response.json()
          

          if (!response.ok) {
            setLoading(false)
            setError(json.error)
          }

          if (response.ok) {
            console.log(json)
            console.log("routeData OK")
            handleCoordsData(json["coordinates"])
            setLoading(false)
            setError(null)
          }
        }
      } else {
        setError("Unable to connect to location services.")
        setLoading(false)
      }
    } catch (error) {
      setError("Error fetching data", error)
      setLoading(false)
    }
  }
  
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
            <Text style={styles.headerText}>Second View</Text>
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