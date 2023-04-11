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

const NavInstruction = ({ }) => {





  return (
    <View style={styles.flexView}>
      
      <StatusBar />
      
      <View styles={styles.ButtonView}>
        {/* Ignore this it is for modal */}
        <View style={styles.btnContainer}>
        <Text style={styles.navtext}>Distance:</Text>
        <Text style={styles.navtext2}>Instruction:</Text>
        </View>
      </View>

      
      
    </View>
    
    
  );
}

export default NavInstruction;

