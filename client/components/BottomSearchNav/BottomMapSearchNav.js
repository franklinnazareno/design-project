import React, { useState, useEffect } from "react";
import { 
Button,
StatusBar,
StyleSheet,
Text,
View,
TouchableOpacity,
ScrollView,
Image,
TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../CustomButton";
import Input from "../inputs";
import styles from "./styles";
import Config from "react-native-config";
import TestBlock from "./test/test";

const BottomNavComp = ({ preference, handleCoordsData }) => {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const slideModal = () => {
    setModalVisible2(!isModalVisible2);
  };

  // const handleSubmit = async () => {
  //   setLoading(true)
  //   try {
  //     const encodedSource = encodeURIComponent(source);
  //     const sourceResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSource}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
  //     const sourceData = await sourceResponse.json()
    
  //     const encodedDestination = encodeURIComponent(destination);
  //     const destinationResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedDestination}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`)
  //     const destinationData = await destinationResponse.json()

  //     if (sourceResponse.ok && destinationResponse.ok) {
  //       if (sourceData.features.length === 0 || destinationData.features.length === 0) {
  //         setError("Unable to find the current location. Try another search.")
  //         setLoading(false)
  //       } else {
  //         const { center: sourceCoords } = sourceData.features[0]
  //         const { center: destCoords } = destinationData.features[0]
  //         const data = preference.preferences
  //         const preferences = data.map(item => ({
  //           name: item.name,
  //           value: item.value
  //         }))
  //         const postData = { preferences, sourceCoords, destCoords }
  //         console.log(JSON.stringify(postData))
  //         const response = await fetch('http://10.0.2.2:8888/route/', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify(postData)
  //         })
  //         const json = await response.json()

  //         if (!response.ok) {
  //           setLoading(false)
  //           setError(json.error)
  //         }

  //         if (response.ok) {
  //           console.log(json)
  //           setLoading(false)
  //           setError(null)
  //         }
  //       }
  //     } else {
  //       setError("Unable to connect to location services.")
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     setError("Error fetching data", error)
  //     setLoading(false)
  //   }
  // }

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
        propagateSwipe={true}
        // coverScreen={false}
        // hasBackdrop={false}
        backdropOpacity={0}
        transparent={true}
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

        
          
          </View>
             
          <ScrollView horizontal={true}
          pagingEnabled={true} showsHorizontalScrollIndicator={false}> 
            <TouchableOpacity activeOpacity={1}>
          <TestBlock preference={preference} handleCoordsData={handleCoordsData}></TestBlock >
          </TouchableOpacity>
          </ScrollView>
          
        </View>
      </Modal> 
    </View>
    
    
  );
}

export default BottomNavComp;

