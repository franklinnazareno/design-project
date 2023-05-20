import React, { useState, useRef, memo, useEffect } from "react";
import { 
StatusBar,
Text,
View,
TouchableOpacity,
ScrollView,
Dimensions} from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import BottomSearchDetail from "./BottomSearchDetail/BottomSearchDetail";


var deviceWidth = Dimensions.get('window').width;

const BottomSearchNav = ({ preference, location, handleCoordsData, handleCoordsData2, handleLoadingData, handleUserView, handleModal }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [conditions, setConditions] = useState(null)
  const [results, setResults] = useState(null);
  const [results2, setResults2] = useState(null);
  const [safestCoverage, setSafestCoverage] = useState(null)
  const [fastestCoverage, setFastestCoverage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [sourceCoords, setSourceCoords] = useState(null)
  const [destinationCoords, setDestinationCoords] = useState(null)
  const [begin, setBegin] = useState(false)
  const [bestCoords, setBestCoords] = useState(null)
  const [otherCoords, setOtherCoords] = useState(null)
  const [bestSteps, setBestSteps] = useState(null)
  const [otherSteps, setOtherSteps] = useState(null)
  const [currentLoc, setCurrentLoc] = useState(null)
  const scrollview = useRef();

  const handleCloseModal = () => {
    setModalVisible(false);
    handleModal(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    handleModal(!isModalVisible)
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

  return (
    <View style={styles.flexView}>
      
      <StatusBar />
      <View styles={styles.ButtonView}>
        {/* Ignore this it is for modal */}
        <TouchableOpacity onPress={() => {toggleModal(); handleUserView(0);}} style={styles.btnContainer}>
          <Text style={styles.navtext}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for the up and down bouncy animation */}
      <Modal
        propagateSwipe={true}
        backdropOpacity={0}
        transparent={true}
        onBackdropPress={handleCloseModal}
        onBackButtonPress={handleCloseModal}
        keyboardShouldPersistTaps={true}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        
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
          keyboardShouldPersistTaps={'always'}>
             
          <TouchableOpacity activeOpacity={1}>   
          <BottomSearchDetail 
          preference={preference}
          location={location}
          conditions={conditions}
          setConditions={setConditions}
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
          setResults2={setResults2}
          destinationCoords={destinationCoords}
          setDestinationCoords={setDestinationCoords}
          sourceCoords={sourceCoords}
          setSourceCoords={setSourceCoords}
          begin={begin}
          setBegin={setBegin}
          bestCoords={bestCoords}
          setBestCoords={setBestCoords}
          otherCoords={otherCoords}
          setOtherCoords={setOtherCoords}
          bestSteps={bestSteps}
          setBestSteps={setBestSteps}
          otherSteps={otherSteps}
          setOtherSteps={setOtherSteps}
          currentLoc={currentLoc}
          setCurrentLoc={setCurrentLoc}
          handleModal={handleModal}>
          </BottomSearchDetail>
          </TouchableOpacity>
          </ScrollView>
          
        </View>
         {results !== null && (
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
          <Text style={styles.safetextBox}>Best</Text>
          </TouchableOpacity>

          {results2 !== null && Object.keys(results2).length > 0 && (
            <TouchableOpacity 
              onPress={() => handlePress(2)}
              style={styles.safeBox}
            >
            <Text style={styles.safetextBox}>Other</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      </Modal> 
      
    </View>
    
    
  );
}

export default memo(BottomSearchNav);

