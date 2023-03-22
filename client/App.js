import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from './hooks/useAuthContext';

// screens & components
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Navbar from './components/Navbar';
import DrawNav from './navigation/DrawNav';
import MenuNav from './navigation/MenuNav';

const Stack = createNativeStackNavigator();

function App() {
  const { user } = useAuthContext();

  // Render the DrawerNav component only if the user is logged in
  if (user) {
    return (
      <NavigationContainer>
        <DrawNav />
      </NavigationContainer>
    );
  }

  // Otherwise, render the authentication screens
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;