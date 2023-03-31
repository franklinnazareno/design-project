import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import styles from "./styles";


const MapContainer = ({style, children}) => {
    return (
        <View>
            <View style={[styles.wrapper, style]}>{children}</View>
        </View>
    );
};
 
export default MapContainer;