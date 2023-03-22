import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../CustomButton";
import Input from "../inputs";
import styles from "./styles";

const BottomNavComp= () =>{
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
        placeholder='Location' />
        </View>

        <View style={styles.Destination}>
        <Input
        label="Destination"
        placeholder='Destination'/>
        </View>

        {/* Custom Button OnPress does not work use touchableopacity */}
       <CustomButton primary title='Find Path'/>   

        {/* remove this */}
       <Image  
            height={70} 
            width={70} 
            source={require('../../assets/images/frank.png')}
            style={[styles.logoImage]}/>

          </View> 
        </View>
      </Modal> 
    </View>
    
  );
}

export default BottomNavComp;

