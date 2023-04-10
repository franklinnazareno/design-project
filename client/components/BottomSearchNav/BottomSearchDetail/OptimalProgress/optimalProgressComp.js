import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import styles from './styles';
import CustomCircularProgress from '../../../commons/CustomCircle/CustomCircleProgress';
import colors from '../../../../assets/themes/colors';
import SmallCustomCircularProgress from '../../../commons/SmallCustomCircle/SmallCustomCircularProgress';

const OptimalProgressComp = ({ fastestCoverage }) => {

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
    fastestCoverage && (
      <View style={styles.progressBox}>
        {/*  STARTS SAFETY PERCENTAGE */}
        <View style={styles.progressContent}>

        <View style={styles.progresspaddingMAIN}>
          <TouchableOpacity onPress={showModal}>
          <CustomCircularProgress
            title='Safe'
            value={fastestCoverage.average}  
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
            <Text>Progress: SAFE fa</Text>
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
              value={fastestCoverage.landmark}
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
                <Text>Progress: LANDMARK fa</Text>
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
              value={fastestCoverage.lighting}
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
                <Text>Progress: Light fa</Text>
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
              
              value={fastestCoverage.pwd_friendly} 
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
                <Text>Progress: PWD fa</Text>
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
              value={fastestCoverage.cctv}
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
                <Text>Progress: CCTV fa</Text>
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
              value={fastestCoverage.not_major_road}
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
                <Text>Progress: MAJOR ROAD fa</Text>
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
              value={fastestCoverage.not_flood_hazard}
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
                <Text>Progress: fLOOD fast</Text>
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

export default OptimalProgressComp