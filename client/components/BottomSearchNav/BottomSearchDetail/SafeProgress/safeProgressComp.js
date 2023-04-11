import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import Modal from "react-native-modal";
import styles from './styles';
import CustomCircularProgress from '../../../commons/CustomCircle/CustomCircleProgress';
import colors from '../../../../assets/themes/colors';
import SmallCustomCircularProgress from '../../../commons/SmallCustomCircle/SmallCustomCircularProgress';


const SafeProgressComp = ({ safestCoverage }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [isModalVisible4, setIsModalVisible4] = useState(false);
    const [isModalVisible5, setIsModalVisible5] = useState(false);
    const [isModalVisible6, setIsModalVisible6] = useState(false);
    const [isModalVisible7, setIsModalVisible7] = useState(false);

    //Modal 1
    const showModal = () => {
      setIsModalVisible(true);
    };  
    //Modal 2
    const showModal2 = () => {
      setIsModalVisible2(true);
    };
    //Modal 3
    const showModal3 = () => {
      setIsModalVisible3(true);
    };
    //Modal 4
    const showModal4 = () => {
      setIsModalVisible4(true);
    };
    //Modal 5
    const showModal5 = () => {
      setIsModalVisible5(true);
    };
    //Modal 6
    const showModal6 = () => {
      setIsModalVisible6(true);
    };
    //Modal 7
    const showModal7 = () => {
      setIsModalVisible7(true);
    };
    

  return (
    safestCoverage && (
      <View style={styles.progressBox}>
        {/*  STARTS SAFETY PERCENTAGE */}
        <View style={styles.progressContent}>

        <View style={styles.progresspaddingMAIN}>
          <TouchableOpacity onPress={showModal}>
          <CustomCircularProgress
            title='Safe'
            value={safestCoverage.average} 
            radius={60}
            progressValueColor={colors.primary}
          />
          </TouchableOpacity>
          
          <Modal
              visible={isModalVisible} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible(false)}>
        
          <View style={styles.modalContent}>
            <ScrollView>
            <TouchableOpacity>
            <Text style={styles.modaltext}>This value shows the total average of all safety factors while taking into consideration your preferences on safety factors.</Text>
            </TouchableOpacity>
            </ScrollView>    
          </View>
        
      </Modal>
          </View>
      {/* ENDS SAFETY PERCENTAGE */}

        

        <View style={styles.Mainprogress}>
          {/* STARTS LANDMARK ROAD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <TouchableOpacity onPress={showModal2}>
            <SmallCustomCircularProgress
              title='Landmark'
              value={safestCoverage.landmark} 
              progressValueColor={colors.primary} 
              radius={35}
            />
            </TouchableOpacity>

            <Modal
              visible={isModalVisible2} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible2(false)}>
        
              <View style={styles.modalContent}>
                <ScrollView>
                <TouchableOpacity>
                <Text style={styles.modaltext}>This value shows how much of the route will pass through a tourist attraction or a notable area.</Text>
                </TouchableOpacity>
                </ScrollView>    
              </View>
            </Modal>

          </View>
        {/* ENDS LANDMARK PERCENTAGE */}

          {/* STARTS LIGHTING PERCENTAGE */}
          <View style={styles.progresspadding}>
          <TouchableOpacity onPress={showModal3}>
            <SmallCustomCircularProgress
              title='Well-lit Areas'
              value={safestCoverage.lighting}
              progressValueColor={colors.primary}  
              radius={35}
            />
            </TouchableOpacity>

            <Modal
              visible={isModalVisible3} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible3(false)}>
        
              <View style={styles.modalContent}>
                <ScrollView>
                <TouchableOpacity>
                <Text style={styles.modaltext}>This value shows how much of the route is under well-lit street lights during the night.</Text>
                </TouchableOpacity>
                </ScrollView>    
              </View>
            </Modal>

          </View>

          {/* ENDS LIGHTING PERCENTAGE */}

          {/* STARTS PWD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <TouchableOpacity onPress={showModal4}>
            <SmallCustomCircularProgress
              title='PWD'
              
              value={safestCoverage.pwd_friendly} 
              progressValueColor={colors.primary}
              radius={35}
            />
            </TouchableOpacity>

            <Modal
              visible={isModalVisible4} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible4(false)}>
        
              <View style={styles.modalContent}>
                <ScrollView>
                <TouchableOpacity>
                <Text style={styles.modaltext}>This value shows how much of the route is friendly to motor-impared individuals. This includes PWD ramps, hand rails, and wide sidewalks.</Text>
                </TouchableOpacity>
                </ScrollView>    
              </View>
            </Modal>

          </View>
          {/*  ENDS PWD PERCENTAGE */}

          {/* STARTS CCTV PERCENTAGE */}
          <View style={styles.progresspadding}>
            <TouchableOpacity onPress={showModal5}>
            <SmallCustomCircularProgress
              title='CCTV'
              value={safestCoverage.cctv}
              progressValueColor={colors.primary} 
              radius={35}
            />
            </TouchableOpacity>

            <Modal
              visible={isModalVisible5} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible5(false)}>
        
              <View style={styles.modalContent}>
                <ScrollView>
                <TouchableOpacity>
                <Text style={styles.modaltext}>This value shows how much of the route will be under the view of a government-maintained CCTV camera.</Text>
                </TouchableOpacity>
                </ScrollView>    
              </View>
            </Modal>
          </View>
          {/* ENDS CCTV PERCENTAGE */}

          {/* STARTS MAJOR ROAD PERCENTAGE */}
          <View style={styles.progresspadding}>
          <TouchableOpacity onPress={showModal6}>
            <SmallCustomCircularProgress 
              title='Major Road'
              percentageTextColor={'red'}
              value={safestCoverage.not_major_road === 0 ? 0 : 100 - safestCoverage.not_major_road } 
              progressValueColor={'red'}
              radius={35}
            />
            </TouchableOpacity>
            <Modal
              visible={isModalVisible6} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible6(false)}>
        
              <View style={styles.modalContent}>
                <ScrollView>
                <TouchableOpacity>
                <Text style={styles.modaltext}>This value shows how much of the route will be in a major road/thoroughfare. A lesser value is desirable for this safety factor.</Text>
                </TouchableOpacity>
                </ScrollView>    
              </View>
            </Modal>
          </View>
          {/* ENDS MAJOR ROAD PERCENTAGE */}

          
          
          {/* STARTS FLOOD PERCENTAGE */}
          <View style={styles.progresspadding}>
          <TouchableOpacity onPress={showModal7}>
            <SmallCustomCircularProgress
              title='Flood' 
              percentageTextColor={'red'}
              value={safestCoverage.not_flood_hazard === 0 ? 0 : 100 - safestCoverage.not_flood_hazard}
              progressValueColor={'red'}  
              radius={35}
            />
            </TouchableOpacity>
            <Modal
              visible={isModalVisible7} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible7(false)}>
        
              <View style={styles.modalContent}>
                <ScrollView>
                <TouchableOpacity>
                <Text style={styles.modaltext}>This value shows how much of the route will be under flood hazard in the event of a major rain event. A lesser value is desirable for this safety factor.</Text>
                </TouchableOpacity>
                </ScrollView>    
              </View>
            </Modal>
          </View>
          {/* ENDS FLOOD PERCENTAGE */}
        </View>
        </View>
      </View>
    )
  )
}

export default SafeProgressComp