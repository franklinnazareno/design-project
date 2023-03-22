import React from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";
import colors from "../../../assets/theme/colors";
import styles from "./styles";

const CustomButton = ({
    title,
    secondary,
    primary,
    danger,
    onPress, 
    disabled,
    loading, 
    }) => {
const [focused, setFocused] = React.useState(false)

    const getbgColorr=()=>{

        if (disabled){
            return colors.grey
        }
        if(primary){
            return colors.primary;
        }
        if(danger){
            return colors.danger;
        }
        if (secondary){
            return colors.secondary;

        };
    };
    return (
        <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.wrapper, {backgroundColor:getbgColorr()}]}>

        <View style={[styles.loaderSection]}>
            {loading && <ActivityIndicator color={colors.primary}/>}
            {title && <Text 
            style={{color:disabled?'black':colors.white, 
            paddingLeft:loading?5:0}}>
            {title}
            </Text>}
        </View>

        

        </TouchableOpacity>
    );
};
 
export default CustomButton;