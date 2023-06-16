import React, { useRef } from 'react';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './screens/LoginScreen';
import Signup from './screens/SignupScreen';
import DrawNav from './navigation/DrawNav';

const Stack = createNativeStackNavigator();

function App() {
  const { user } = useAuthContext();

  // Render the DrawerNav component only if the user is logged in
  if (user) {
    const navigationRef = useRef(null);
    const routeNameRef = useRef();
    const previousScreenRef = useRef(null);

    const onNavigationStateChange = (state) => {
      const currentRoute = state.routes[state.index];
      const currentScreen = getScreenName(currentRoute);

      if (currentScreen !== routeNameRef.current) {
        routeNameRef.current = currentScreen;
        console.log('Current Screen:', currentScreen);
        console.log('Previous Screen:', previousScreenRef.current);

        if (
          (previousScreenRef.current === 'Map Navigation' &&
          currentScreen === 'Find Path')
        ) {
          resetStack('Map Navigation');
        }

        previousScreenRef.current = currentScreen;
      }
    };

    const getScreenName = (route) => {
      if (route.state) {
        return getScreenName(route.state.routes[route.state.index]);
      }
      return route.name;
    };

    const resetStack = () => {
      navigationRef.current?.reset({
        routes: [{ name: 'Find Path' }],
        index: 0,
      });
    };

    return (
      <NavigationContainer ref={navigationRef} onStateChange={onNavigationStateChange}>
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
