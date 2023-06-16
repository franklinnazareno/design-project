import { View, ActivityIndicator, BackHandler, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { LocationContext } from '../context/LocationContext';
import NavigatingMapComp from '../components/NavigatingMap/NavigatingMapComp';
import NavInstruction from '../components/NavigatingMap/NavInstruction/NavInstruction';
import { useFocusEffect } from '@react-navigation/native';

const StartNavScreen = ({ route, navigation }) => {
  const { preference, source, destination, conditions, coords, steps, option } = route.params;
  const [location] = useContext(LocationContext);
  const [newSteps, setSteps] = useState(steps)
  const [completedSteps, setCompletedSteps] = useState([])
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  const handleBackPress = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to leave navigation mode? You will need to enter your route again.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => exitScreen() },
      ]
    );

    return true;
  };

  const exitScreen = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    location ? (
      <View style={{ position: 'relative', height: '100%' }}>
        <NavigatingMapComp
          preference={preference}
          source={source}
          destination={destination}
          location={location}
          coords={coords}
          newSteps={newSteps}
          completedSteps={completedSteps}
          option={option}
          loading={loading}
          setLoading={setLoading}
          setSteps={setSteps}
          setCompletedSteps={setCompletedSteps}
        ></NavigatingMapComp>
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <NavInstruction newSteps={newSteps} completedSteps={completedSteps} location={location} conditions={conditions} setSteps={setSteps} setCompletedSteps={setCompletedSteps}></NavInstruction>
      </View>
    ) : (
      <View>
        <ActivityIndicator size='large' color={colors.primary} />
        <Text>
          Obtaining current location...
        </Text>
      </View>
    )
  );
};

export default StartNavScreen;
