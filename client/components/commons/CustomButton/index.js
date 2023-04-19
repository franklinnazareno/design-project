import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import colors from "../../../assets/themes/colors";
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
    const [focused, setFocused] = React.useState(false);
  
    const getbgColor = () => {
      if (disabled) {
        return colors.grey;
      }
      if (primary) {
        return colors.primary;
      }
      if (danger) {
        return colors.danger;
      }
      if (secondary) {
        return colors.secondary;
      }
    };
    return (
        <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.wrapper, { backgroundColor: getbgColor() }]}
      >
        <View style={[styles.loaderSection]}>
          {loading && <ActivityIndicator color={colors.primary} />}
          {title && (
            <Text
              style={{
                color: disabled ? "black" : colors.white,
                paddingLeft: loading ? 5 : 0,
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.white
              }}
            >
              {title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  export default CustomButton;