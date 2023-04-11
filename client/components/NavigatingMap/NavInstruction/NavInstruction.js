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

import styles from "./styles";

var deviceWidth = Dimensions.get('window').width;

const NavInstruction = ({ steps, location }) => {

  const [newSteps, setNewSteps] = useState(steps)
  const [completedSteps, setCompletedSteps] = useState([])
  const [currentStep, setCurrentStep] = useState('')
  const [currentDistance, setCurrentDistance] = useState('')

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

  useEffect(() => {
    const thresholdDistance = 5
    let currentStepIndex = 0

    for (const step of newSteps) {
      const distance = haversineDistance(location.latitude, location.longitude, step.coordinates[0], step.coordinates[1])

      if (distance <= thresholdDistance && !completedSteps.includes(step)) {
        setCompletedSteps(prev => [...prev, step]);
        currentStepIndex++
        setCurrentStep(newSteps[currentStepIndex]?.instruction)
        setCurrentDistance(newSteps[currentStepIndex]?.distance)
      }
    }
  }, [location])

  return (
    <View style={styles.flexView}>
      
      <StatusBar />
      
      <View styles={styles.ButtonView}>
        {/* Ignore this it is for modal */}
        <View style={styles.btnContainer}>
        <Text style={styles.navtext}>Distance: {currentDistance ? currentDistance : 0}m</Text>
        <Text style={styles.navtext2}>Instruction: {currentStep ? currentStep : ''}</Text>
        </View>
      </View>

      
      
    </View>
    
    
  );
}

export default NavInstruction;

