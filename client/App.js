import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// pages & components
import Home from './screens/Home';
import Navbar from './components/Navbar';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <Navbar />,
            title: 'PathFinder',
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
