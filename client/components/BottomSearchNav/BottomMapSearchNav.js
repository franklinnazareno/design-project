import React, { useState, useEffect, useRef } from "react";
import { 
Button,
StatusBar,
StyleSheet,
Text,
View,
TouchableOpacity,
ScrollView,
Image,
TouchableWithoutFeedback, 
Dimensions} from "react-native";
import Modal from "react-native-modal";
import CustomButton from "../CustomButton";
import Input from "../inputs";
import styles from "./styles";
import Config from "react-native-config";
import DetailBlock from "./BottomSearchDetail/bottomdetail";

var deviceWidth = Dimensions.get('window').width;

const BottomNavComp = ({ preference, location, handleCoordsData, handleCoordsData2, handleLoadingData, handleUserView }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState(null);
  const [results2, setResults2] = useState(null);
  const [safestCoverage, setSafestCoverage] = useState(null)
  const [fastestCoverage, setFastestCoverage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const scrollview = useRef();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const slideModal = () => {
    setModalVisible2(!isModalVisible2);
  };

  const handleSafestCoverage = (data) => {
    setSafestCoverage(data)
  }

  const handleFastestCoverage = (data) => {
    setFastestCoverage(data)
  }

  const handlePress =(viewIndex) => {
    handleUserView(viewIndex)
    scrollview.current.scrollTo({ x: deviceWidth * viewIndex })
  }

  useEffect(() => {
    async function getLocation() {
      if (location) {
        const longitude = location.longitude
        const latitude = location.latitude 

        try {
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${Config.MAPBOX_PUBLIC_TOKEN}`);
          const currentLocation = await response.json();
          setSource(currentLocation.features[0].place_name);
        } catch (error) {
          setError(error);
        }
      }
    }

    getLocation();
  }, [location]);


  return (
    <View style={styles.flexView}>
      
      <StatusBar />
      <View styles={styles.ButtonView}>
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
             
          <ScrollView 
          horizontal={true}
          pagingEnabled={true} 
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          ref={scrollview}
          > 
            <TouchableOpacity activeOpacity={1}>
              
          <DetailBlock 
          preference={preference}
          location={location}
          handleCoordsData={handleCoordsData} 
          handleCoordsData2={handleCoordsData2} 
          handleLoadingData={handleLoadingData} 
          handleSafestCoverage={handleSafestCoverage}
          handleFastestCoverage={handleFastestCoverage}
          safestCoverage={safestCoverage}
          fastestCoverage={fastestCoverage}
          source={source} 
          destination={destination} 
          results={results} 
          results2={results2} 
          error={error} 
          setError={setError} 
          loading={loading} 
          setLoading={setLoading} 
          setSource={setSource} 
          setDestination={setDestination} 
          setResults={setResults} 
          setResults2={setResults2}>
          </DetailBlock >

          </TouchableOpacity>
          </ScrollView>
          
          {/* <View style={styles.safest}>
          <TouchableOpacity 
          onPress={() => scrollview.current.scrollTo({x: 0})}
          style={styles.safeBox}
          >
            <Text style={styles.safetextBox}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => scrollview.current.scrollTo({x: deviceWidth})}
          style={styles.safeBox}
          >
            <Text style={styles.safetextBox}>Safest</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => scrollview.current.scrollTo({x: deviceWidth * 2})}
          style={styles.safeBox}
          >
            <Text style={styles.safetextBox}>Fastest</Text>
          </TouchableOpacity>
          </View> */}

          
          {/* <Button title="yes" 
          onPress={() => scrollview.current.scrollTo({x: deviceWidth})}></Button> */}

          {/* <Button title="yes" 
          onPress={() => scrollview.current.scrollTo({x: deviceWidth * 2})}></Button> */}
        </View>
        {results && (
          <View style={styles.safest}>
          <TouchableOpacity 
          onPress={() => handlePress(0)}
          style={styles.safeBox}
          >
            <Text style={styles.safetextBox}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => handlePress(1)}
          style={styles.safeBox}
          >
            <Text style={styles.safetextBox}>Path 1</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => handlePress(2)}
          style={styles.safeBox}
          >
            <Text style={styles.safetextBox}>Path 2</Text>
          </TouchableOpacity>
          </View>
        )}
      </Modal> 
      
    </View>
    
    
  );
}

export default BottomNavComp;

