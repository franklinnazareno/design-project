import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import styles from './styles';
import CustomCircularProgress from '../../../commons/CustomCircle/CustomCircleProgress';
import colors from '../../../../assets/themes/colors';
import SmallCustomCircularProgress from '../../../commons/SmallCustomCircle/SmallCustomCircularProgress';
  
const data = [
  { title: 'Landmark', key: 'landmark' },
  { title: 'Well-lit Areas', key: 'lighting' },
  { title: 'PWD', key: 'pwd_friendly' },
  { title: 'CCTV', key: 'cctv' },
  { title: 'Major Road', key: 'not_major_road' },
  { title: 'Flood', key: 'not_flood_hazard' },
];



const AlternateProgress = ({ coverage, conditions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const showModal = (index) => {
    setActiveModalIndex(index);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setActiveModalIndex(null);
  };

  const renderModalContent = () => {
    if (activeModalIndex !== null) {
      const item = data[activeModalIndex];
      return (
        <View style={styles.modalContent}>
          <ScrollView>
            <TouchableOpacity>
              <Text style={styles.modaltext}>
                {getModalContent(item.key)}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }

    return null;
  };

  const getModalContent = (key) => {
    switch (key) {
      case 'landmark':
        return 'This value shows how much of the route will pass through a tourist attraction or a notable area.';
      case 'lighting':
        return 'This value shows how much of the route is under well-lit street lights during the night.';
      case 'pwd_friendly':
        return 'This value shows how much of the route is friendly to motor-impaired individuals. This includes PWD ramps, handrails, and wide sidewalks.';
      case 'cctv':
        return 'This value shows how much of the route will be under the view of a government-maintained CCTV camera.';
      case 'not_major_road':
        return 'This value shows how much of the route will be in a major road/thoroughfare. A lesser value is desirable for this safety factor.';
      case 'not_flood_hazard':
        return 'This value shows how much of the route will be under flood hazard in the event of a major rain event. A lesser value is desirable for this safety factor.';
      default:
        return '';
    }
  };

  const renderSmallCustomCircularProgress = () => {
    // const [updatedData, setUpdatedData] = useState(null)
    // let filteredData = data;
    // if (!conditions.weather) {
    //   filteredData = filteredData.filter(item => item.key !== 'not_flood_hazard');
    // } 
    // if (!conditions.lighting) {
    //   filteredData = filteredData.filter(item => item.key !== 'lighting');
    // }
    // setUpdatedData(filteredData);
    return data.map((item, index) => {
      let progressValueColor = colors.primary;
      let percentageTextColor = colors.primary;
      if (item.key === 'not_major_road' || item.key === 'not_flood_hazard') {
        progressValueColor = 'red';
        percentageTextColor = 'red';
      }
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => showModal(index)}>
            <SmallCustomCircularProgress
              title={item.title}
              value={coverage[item.key]}
              progressValueColor={progressValueColor}
              percentageTextColor={percentageTextColor}
              radius={35}
              conditions={conditions}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    coverage && (
      <View>
        {/* STARTS SAFETY PERCENTAGE */}
        <View style={styles.progressContent}>
          <View>
            <TouchableOpacity onPress={() => showModal(-1)}>
              <CustomCircularProgress
                title="Safe"
                value={coverage.average}
                radius={60}
                progressValueColor={colors.primary}
              />
            </TouchableOpacity>

            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="fade"
              onBackdropPress={hideModal}
            >
              {renderModalContent()}
            </Modal>
          </View>

          <View style={styles.Mainprogress}>
            {renderSmallCustomCircularProgress()}
          </View>
        </View>
      </View>
    )
  );
};

export default AlternateProgress;