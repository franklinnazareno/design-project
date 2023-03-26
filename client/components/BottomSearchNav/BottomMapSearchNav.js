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
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const slideModal = () => {
    setModalVisible2(!isModalVisible2);
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
          <TestBlock preference={preference} handleCoordsData={handleCoordsData} source={source} destination={destination} results={results} setSource={setSource} setDestination={setDestination} setResults={setResults}></TestBlock >
          </TouchableOpacity>
          </ScrollView>
          
        </View>
      </Modal> 
    </View>
    
    
  );
}

export default BottomNavComp;

