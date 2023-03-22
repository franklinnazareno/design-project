import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const MapScreen = () => {
  const {setOptions, toggleDrawer} = useNavigation();
    React.useEffect(() => {
        setOptions({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                toggleDrawer();
              }}>
              <MaterialIcon style={{padding: 15, color:'white'}} size={30} name="menu">nigga</MaterialIcon>
            </TouchableOpacity>
          ),
        });
      }, []);
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  )
}

export default MapScreen