import React, { useState, useEffect } from "react";
import { Button, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../CustomButton";
import Input from "../inputs";
import styles from "./styles";
import Config from "react-native-config";

const BottomNavComp = ({ preference }) => {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const encodedSource = encodeURIComponent(source);
      const sourceResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSource}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
      const sourceData = await sourceResponse.json()
 
      const encodedDestination = encodeURIComponent(destination);
      const destinationResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedDestination}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
      const destinationData = await destinationResponse.json()

      if (sourceResponse.ok && destinationResponse.ok) {
        if (sourceData.features.length === 0 || destinationData.features.length === 0) {
          setError("Unable to find the current location. Try another search.")
          setLoading(false)
        } else {
          const { center: sourceCenter } = sourceData.features[0]
          const { center: destinationCenter } = destinationData.features[0]
          const data = preference.preferences
          const enabledPreferences = data.filter(item => item.enabled === true)
          const enabledNameValue = enabledPreferences.map(item => ({
            name: item.name,
            value: item.value
          }))
          console.log(enabledNameValue, sourceCenter, destinationCenter)
          setLoading(false)
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
    <View style={styles.flexView}>
      
      <StatusBar />
      <View >
        {/* Ignore this it is for modal */}
        <TouchableOpacity onPress={toggleModal} style={styles.btnContainer}>
          <Text style={styles.navtext}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for the up and down bouncy animation */}
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        {/* Ignore this its just styles for modal */}
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />

        {/* Inputs for map starts here */}
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
       <CustomButton disabled={loading} onPress={handleSubmit} primary title='Find Path'/> 
       {error && <Text style={styles.error}>{error}</Text>}  

        {/* remove this */}
       <Image  
            height={70} 
            width={70} 
            source={require('../../assets/images/frank.png')}
            style={[styles.logoImage]}/>

           
            <ScrollView style={styles.instruction}>
            <Text >
              jdkjgvhdjkshvfgdgdshrfhbdfkghvnadkghdksghdk
              slhgjljgd'gjjgdlgjdgjdgjdlgjgdlgjdsl;gjlsgd
              dgdgjgjfjfgdh
              jdhghhdfghsdfghjksdghdgfhsdgfhdfgh
              sfgdgsafhksafhjk
              
              fskljdfhfasfhalsafhsfhlsafhsadfhssh
              gdfzggggdgfdgfdgfsdgsfdfgsdgsdgsfgdsdgdgsdggddg
              ssdfg
              lgdsgghjdghjdgsfhjkdfghjksdfghjklsdgsfhjkldgfhjkdfd
              hjkdghjfsdfghjsfhjksghjklsdgkhjlglg
              jdkjgvhdjk
              shvfgdgdshrfhbdfkghvnadkghdksghdk
              slhgjljgd'gjjgdlgjdgjdgjdlgjgdlgjdsl;gjlsgd
              dgdgjgjfjfgdhjdhg
              
              
              hhdfghsdfghjksdghdgfhsdgfhdfgh
              sfgdgsafhksafhjkfskljdfhfasfhalsafhsfhlsafhsadfhssh
              gdfzggggdgfdgfdgfsdgsfdfgsdgsdgsfgdsdgdgsdggddg
              ssdfg
              lgdsgghjdghjdgsfhjkdfghjksdfghjklsdgsfhjkldgfhjkdfd
              hjkdghjfsdfghjsfhjksghjklsdgkhjlglg
              jdkjgvhdjkshvfgd
              gdshrfhbdfk
              ghvnadkghdksghdk
              slhgjljg
              
              d'gjjgdlgjdgjdgjdlgjgdlgjdsl;gjlsgd
              dgdgjgjfjfgdhjdhg
              hhdfghsdfghjksdghdgfhsdgfhdfgh
              sfgdgsafhksafhjkfskljdfhfasfhalsafhsfhlsafhsadfhssh
              gdfzggggdgfdgfdgfsdgsfdfgsdgsdgsfgdsdgdgsdggddg
              ssdfg
              lgdsgghjdghjdgsfhjkdfghjksdfghjklsdgsfhjkldgfhjkdfd
              hjkdghjfsdfghjsfhjksghjklsdgkhjlglg
              jdkjgvhdjkshvfgdgdshrfhbdfkghvnadkghdksghdk
              slhgjljgd'
              
              
              gjjgdlgjdgjdgjdlgjgdlgjdsl;gjlsgd
              dgdgjgjfjfgdhjdhghhdfghsdfghjksdghdgfhsdgfhdfgh
              sfgdgsafhksafh
              jkfskljdfhfasfhalsafhsfhlsafhsadfhssh
              gdfzggggdgfdgfdgfsdgsfdfgsdgsdgsfgdsdgdgsdggddg
              ssdfg
              lgdsgghjdghjdgsfhjkdfghjksdfghjklsdgsfhjkldgfhjkdfd
              hjkdghjfsdfghjsfhjksghjklsdgkhjlglg
            </Text>
            </ScrollView>
           

            

            

          </View> 
        </View>
      </Modal> 
      
    </View>
    
    
  );
}

export default BottomNavComp;

