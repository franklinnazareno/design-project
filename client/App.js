import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from './hooks/useAuthContext';

// screens & components
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Navbar from './components/Navbar';

const Stack = createNativeStackNavigator();

function App() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ header: () => <Navbar /> }}
        />
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
