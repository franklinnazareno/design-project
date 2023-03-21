import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeText}>PathFinder</Text>
        </TouchableOpacity>
      </View>
        {user ? (
          <View style={styles.loginSignupContainer}>
          <TouchableOpacity onPress={handleClick}>
            <Text style={styles.loginSignupText}>Log out</Text>
          </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loginSignupContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginSignupText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.loginSignupText}>Signup</Text>
          </TouchableOpacity>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f1f1f1',
  },
  homeContainer: {
    width: '50%',
  },
  homeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },
  loginSignupText: {
    fontSize: 16,
    marginLeft: 20,
  },
});

export default Navbar;
