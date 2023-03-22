import { Text, View, Switch } from 'react-native'
import React, { useState } from 'react'
import styles from './styles';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../../assets/themes/colors';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <Switch style={{ transform: [{ 
            scaleX: moderateScale(1, 2.5) }, 
            { scaleY: moderateScale(1, 2.5) }] }}
        trackColor={{false: colors.grey, true: colors.primary}}
        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

export default CustomSwitch