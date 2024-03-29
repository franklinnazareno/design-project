import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, Dimensions, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { REPORT_DETAIL } from "../../../context/initialRoutenNames";


const NavInstruction = ({ newSteps, location, conditions, setSteps }) => {

  const navigation = useNavigation();
  // const [newSteps, setNewSteps] = useState(steps)
  const [completedSteps, setCompletedSteps] = useState([])
  const [currentCondition, setCurrentCondition] = useState(conditions)
  const [currentStep, setCurrentStep] = useState(newSteps[0].instruction)
  const [currentDistance, setCurrentDistance] = useState(newSteps[0].distance)
  const [safetyFactors, setSafetyFactors] = useState(newSteps[0].factorsPresent)
  const [landmarkEnabled, setLandmarkEnabled] = useState(false)
  const [lightingEnabled, setLightingEnabled] = useState(false)
  const [pwdEnabled, setPWDEnabled] = useState(false)
  const [cctvEnabled, setCctvEnabled] = useState(false)
  const [majorRoadEnabled, setMajorRoadEnabled] = useState(false)
  const [floodEnabled, setFloodEnabled] = useState(false)

  const toRadians = (degrees) => {
    return degrees * Math.PI / 180
  }

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3
    const phi1 = toRadians(lat1)
    const phi2 = toRadians(lat2)
    const deltaPhi = toRadians(lat2 - lat1)
    const deltaLambda = toRadians(lon2 - lon1)

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  useEffect(() => {
    const thresholdDistance = 10;
  
    const processStep = async (step) => {
      const distance = haversineDistance(
        location.latitude,
        location.longitude,
        step.coordinates[0],
        step.coordinates[1]
      );
  
      if (distance <= thresholdDistance && !completedSteps.includes(step)) {
        await sleep(2000); // Pause execution for 2 seconds
        setCurrentStep(step.instruction);
        setCurrentDistance(step.distance);
        setSafetyFactors(step.factorsPresent);
        setCompletedSteps((prev) => [...prev, step]);
        await sleep(2000); // Pause execution for another 2 seconds
      }
    };
  
    if (location) {
      const processSteps = async () => {
        for (const step of newSteps) {
          await processStep(step);
        }
      };
  
      processSteps();
    }
  }, [location]);
  
  useEffect(() => {
    console.log(safetyFactors)
    // Enable or disable landmarkEnabled state based on the presence of 'landmark' key
    setLandmarkEnabled(safetyFactors.includes('landmark'));
    
    // Enable or disable lightingEnabled state based on the presence of 'lighting' key
    setLightingEnabled(safetyFactors.includes('lighting'));

    // Enable or disable pwdEnabled state based on the presence of 'pwd_friendly' key
    setPWDEnabled(safetyFactors.includes('pwd_friendly'));

    // Enable or disable cctvEnabled state based on the presence of 'cctv' key
    setCctvEnabled(safetyFactors.includes('cctv'));

    // Enable or disable majorRoadEnabled state based on the presence of 'not_major_road' key
    setMajorRoadEnabled(safetyFactors.includes('not_major_road'));

    // Enable or disable floodEnabled state based on the presence of 'not_flood_hazard' key
    setFloodEnabled(safetyFactors.includes('not_flood_hazard'));
  }, [safetyFactors])

  return (
    <View>
      <StatusBar />
      <View styles={styles.ButtonView}>
        <View style={styles.btnContainer}>
            {currentStep.includes('Head') ? <MaterialCommunityIcons name="flag-checkered" style={styles.icon}></MaterialCommunityIcons> : null}
            {currentStep.includes('Cross') ? <MaterialCommunityIcons name="walk" style={styles.icon}></MaterialCommunityIcons> : null}
            {currentStep.includes('Continue Straight') ? <MaterialCommunityIcons name="arrow-up-thick" style={styles.icon}></MaterialCommunityIcons> : null}
            {currentStep.includes('Turn Right') ? <MaterialCommunityIcons name="arrow-right-top-bold" style={styles.icon}></MaterialCommunityIcons> : null}
            {currentStep.includes('Turn Left') ? <MaterialCommunityIcons name="arrow-left-top-bold" style={styles.icon}></MaterialCommunityIcons> : null}
            <View style={{alignSelf: 'center', flex: 1}}>
                <Text style={styles.navtext}>{currentDistance ? currentDistance : 0} meters</Text>
                <Text style={styles.navtext2}>{currentStep ? currentStep : ''}</Text>
            </View>
        </View>
      </View>

      
      <View style={styles.FactorView}>
        <View style={styles.FactorContainer}>
          
          {/* Landmark */}
          <TouchableOpacity disabled style={landmarkEnabled ? styles.factoricon : styles.disabledicon}>
            <FontAwesome5 name="landmark" style={styles.iconfactors}></FontAwesome5>
          </TouchableOpacity>

          {/* Well-lit */}
          <TouchableOpacity disabled style={lightingEnabled && conditions.lighting == true ? styles.factoricon : styles.disabledicon}>
            <FontAwesome5 name="lightbulb" style={styles.iconfactors}></FontAwesome5>
          </TouchableOpacity>

          {/* PWD */}
          <TouchableOpacity disabled style={pwdEnabled ? styles.factoricon : styles.disabledicon}>
          <FontAwesome5 name="wheelchair" style={styles.iconfactors}></FontAwesome5>
          </TouchableOpacity>

          {/* CCTV */}
          <TouchableOpacity disabled style={cctvEnabled ? styles.factoricon : styles.disabledicon}>
            <MaterialCommunityIcons name="cctv" style={styles.iconfactors}></MaterialCommunityIcons>
          </TouchableOpacity>

          {/* Major Road */}
          <TouchableOpacity disabled style={!majorRoadEnabled ? styles.Riskfactoricon : styles.disabledicon}>
          <FontAwesome5 name="road" style={styles.iconfactors}></FontAwesome5>
          </TouchableOpacity>
          
          {/* Flood */}
          <TouchableOpacity disabled style={!floodEnabled && conditions.weather == true ? styles.Riskfactoricon : styles.disabledicon}>
          <FontAwesome5 name="water" style={styles.iconfactors}></FontAwesome5>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report Screen */}
      <View style={styles.ButtonView}>
        
          <TouchableOpacity style={styles.ReportContainer} onPress={() => {navigation.navigate(REPORT_DETAIL);}}>
          <FontAwesome name="warning" style={styles.iconReport}></FontAwesome>
          </TouchableOpacity>
        
      </View>
    </View>
    
    
  );
}

export default NavInstruction;

