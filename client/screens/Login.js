import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useLogin } from '../hooks/useLogin'
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()

  const navigation = useNavigation();

  const handleSubmit = async () => {
    await login(email, password)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>

      <Text>Email address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Button disabled={isLoading} title="Log In" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Click here to sign up</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    error: {
        color: 'red',
        fontSize: 16
    }
})

export default Login;
